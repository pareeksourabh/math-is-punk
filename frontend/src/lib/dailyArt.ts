/**
 * Daily art URL helper: builds the S3 URL for a given seed/date.
 */
const DAILY_ART_BUCKET = "math-is-punk-daily-art-886511165479";
const DAILY_ART_REGION = "ap-southeast-1";

export function getDailyArtUrl(seed: string): string {
  return `https://${DAILY_ART_BUCKET}.s3.${DAILY_ART_REGION}.amazonaws.com/daily-art/${seed}.svg`;
}
