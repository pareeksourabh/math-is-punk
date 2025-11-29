"""
AWS Lambda: Generate daily math-art SVG deterministically from a date seed and save to S3.
"""
import json
import logging
import os
import random
import math
from datetime import datetime, timezone
from typing import Any, Dict

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

s3 = boto3.client("s3")


def _response(body: Dict[str, Any], status: int = 200) -> Dict[str, Any]:
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body),
    }


def _get_date_from_query(query_params: Dict[str, Any]) -> str:
    raw_date = query_params.get("date")
    if raw_date:
        try:
            datetime.strptime(raw_date, "%Y-%m-%d")
            return raw_date
        except ValueError:
            pass
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def _generate_svg(seed: str) -> str:
    random.seed(seed)
    size = 512
    center = size / 2
    points = 140
    layers = []
    layers.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}">')
    layers.append(f'<rect width="{size}" height="{size}" fill="#050505" />')

    for i in range(points):
        angle = (i / points) * math.tau + random.random() * 0.2
        radius = (0.22 + 0.65 * random.random()) * center
        x = center + math.cos(angle) * radius
        y = center + math.sin(angle) * radius
        r = 2.0 + random.random() * 4.5
        opacity = 0.3 + random.random() * 0.5
        layers.append(
            f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{r:.2f}" fill="white" fill-opacity="{opacity:.2f}" />'
        )

    for i in range(4):
        base_r = (0.2 + 0.18 * i) * center
        layers.append(
            f'<circle cx="{center:.2f}" cy="{center:.2f}" r="{base_r:.2f}" fill="none" stroke="#222" stroke-width="0.6" />'
        )

    layers.append("</svg>")
    return "".join(layers)


def generate_daily_art(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    try:
        logger.info("generate_daily_art invoked")
        logger.debug("event: %s", json.dumps(event))

        raw_params = event.get("queryStringParameters") or {}
        query_params = raw_params if isinstance(raw_params, dict) else {}

        date_str = _get_date_from_query(query_params)
        svg = _generate_svg(date_str)

        bucket = os.environ.get("DAILY_ART_BUCKET")
        if not bucket:
            raise RuntimeError("DAILY_ART_BUCKET is not configured")

        key = f"daily-art/{date_str}.svg"

        s3.put_object(
            Bucket=bucket,
            Key=key,
            Body=svg.encode("utf-8"),
            ContentType="image/svg+xml",
        )

        response_body = {
            "message": "daily art generated",
            "date": date_str,
            "bucket": bucket,
            "key": key,
        }

        return _response(response_body, 200)
    except Exception as exc:  # pragma: no cover - defensive logging
        logger.exception("Error in generate_daily_art: %s", exc)
        return _response({"message": "Internal server error", "error": str(exc)}, 500)
