"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import PlaygroundExperiment from "@/components/PlaygroundExperiment";
import PrimeSpiralExperiment from "@/components/PrimeSpiralExperiment";
import SineWaveExperiment from "@/components/SineWaveExperiment";
import StrangeAttractorExperiment from "@/components/StrangeAttractorExperiment";
import GoldenFieldExperiment from "@/components/GoldenFieldExperiment";

type Control = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  set: (v: number) => void;
  format?: (v: number) => string;
};

type GeneratorId = "sine" | "prime" | "attractor" | "golden";

type GeneratorConfig = {
  id: GeneratorId;
  name: string;
  summary: string;
  controls: Control[];
  render: ReactNode;
};

function formatNumber(value: number) {
  const fixed = value.toFixed(3);
  return fixed.replace(/\.?0+$/, "");
}

export default function PlaygroundPage() {
  const [mode, setMode] = useState<GeneratorId>("sine");

  const [amplitude, setAmplitude] = useState(40);
  const [frequency, setFrequency] = useState(0.02);
  const [speed, setSpeed] = useState(0.03);

  const [primePoints, setPrimePoints] = useState(900);
  const [primeScale, setPrimeScale] = useState(7.5);
  const [primeTwist, setPrimeTwist] = useState(137.5);

  const [attractorA, setAttractorA] = useState(-1.9);
  const [attractorB, setAttractorB] = useState(1.7);
  const [attractorC, setAttractorC] = useState(1.3);
  const [attractorD, setAttractorD] = useState(0.9);

  const [goldenCount, setGoldenCount] = useState(550);
  const [goldenSpacing, setGoldenSpacing] = useState(4.2);
  const [goldenWarp, setGoldenWarp] = useState(0.006);

  const generators: GeneratorConfig[] = useMemo(
    () => [
      {
        id: "sine",
        name: "Sine Wave Lab",
        summary: "Classic oscillator with live amplitude, frequency, and speed.",
        controls: [
          {
            id: "amplitude",
            label: "Amplitude",
            value: amplitude,
            min: 5,
            max: 140,
            step: 1,
            set: setAmplitude,
            format: (v) => formatNumber(v),
          },
          {
            id: "frequency",
            label: "Frequency",
            value: frequency,
            min: 0.005,
            max: 0.12,
            step: 0.001,
            set: setFrequency,
            format: (v) => formatNumber(v),
          },
          {
            id: "speed",
            label: "Speed",
            value: speed,
            min: 0.005,
            max: 0.1,
            step: 0.001,
            set: setSpeed,
            format: (v) => formatNumber(v),
          },
        ],
        render: (
          <SineWaveExperiment
            amplitude={amplitude}
            frequency={frequency}
            speed={speed}
          />
        ),
      },
      {
        id: "prime",
        name: "Prime Spiral",
        summary: "Ulam-like spiral with a golden-angle twist to surface prime clusters.",
        controls: [
          {
            id: "primePoints",
            label: "Points",
            value: primePoints,
            min: 200,
            max: 2000,
            step: 50,
            set: setPrimePoints,
            format: (v) => formatNumber(v),
          },
          {
            id: "primeScale",
            label: "Scale",
            value: primeScale,
            min: 3,
            max: 15,
            step: 0.1,
            set: setPrimeScale,
            format: (v) => formatNumber(v),
          },
          {
            id: "primeTwist",
            label: "Twist (deg)",
            value: primeTwist,
            min: 90,
            max: 180,
            step: 0.5,
            set: setPrimeTwist,
            format: (v) => formatNumber(v),
          },
        ],
        render: (
          <PrimeSpiralExperiment
            count={primePoints}
            scale={primeScale}
            twistDegrees={primeTwist}
          />
        ),
      },
      {
        id: "attractor",
        name: "Chaos Attractor",
        summary: "Clifford map painting a dense strange attractor cloud.",
        controls: [
          {
            id: "attractorA",
            label: "Parameter A",
            value: attractorA,
            min: -3,
            max: 3,
            step: 0.01,
            set: setAttractorA,
            format: (v) => formatNumber(v),
          },
          {
            id: "attractorB",
            label: "Parameter B",
            value: attractorB,
            min: -3,
            max: 3,
            step: 0.01,
            set: setAttractorB,
            format: (v) => formatNumber(v),
          },
          {
            id: "attractorC",
            label: "Parameter C",
            value: attractorC,
            min: -3,
            max: 3,
            step: 0.01,
            set: setAttractorC,
            format: (v) => formatNumber(v),
          },
          {
            id: "attractorD",
            label: "Parameter D",
            value: attractorD,
            min: -3,
            max: 3,
            step: 0.01,
            set: setAttractorD,
            format: (v) => formatNumber(v),
          },
        ],
        render: (
          <StrangeAttractorExperiment
            a={attractorA}
            b={attractorB}
            c={attractorC}
            d={attractorD}
          />
        ),
      },
      {
        id: "golden",
        name: "Golden Field",
        summary: "Phyllotaxis whirl built from a golden-angle lattice.",
        controls: [
          {
            id: "goldenCount",
            label: "Points",
            value: goldenCount,
            min: 150,
            max: 1200,
            step: 25,
            set: setGoldenCount,
            format: (v) => formatNumber(v),
          },
          {
            id: "goldenSpacing",
            label: "Spacing",
            value: goldenSpacing,
            min: 2,
            max: 8,
            step: 0.1,
            set: setGoldenSpacing,
            format: (v) => formatNumber(v),
          },
          {
            id: "goldenWarp",
            label: "Warp",
            value: goldenWarp,
            min: 0,
            max: 0.02,
            step: 0.001,
            set: setGoldenWarp,
            format: (v) => formatNumber(v),
          },
        ],
        render: (
          <GoldenFieldExperiment
            count={goldenCount}
            spacing={goldenSpacing}
            warp={goldenWarp}
          />
        ),
      },
    ],
    [
      amplitude,
      frequency,
      speed,
      primePoints,
      primeScale,
      primeTwist,
      attractorA,
      attractorB,
      attractorC,
      attractorD,
      goldenCount,
      goldenSpacing,
      goldenWarp,
    ],
  );

  const activeGenerator =
    generators.find((generator) => generator.id === mode) ?? generators[0];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 space-y-10 lg:space-y-12">
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            <span className="text-pink-400">Playground</span>{" "}
            <span className="text-gray-400">/ Generators Lab</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 tracking-tight">
            Phase 3: swap between generators and push them around in real time.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-1 space-y-5 rounded-lg border border-gray-800 bg-gray-950 p-6 lg:p-7">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-medium tracking-tight text-white">
                  Controls
                </h2>
                <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  Mode
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {generators.map((generator) => {
                  const isActive = generator.id === activeGenerator.id;
                  return (
                    <button
                      key={generator.id}
                      onClick={() => setMode(generator.id)}
                      className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                        isActive
                          ? "border-pink-600 bg-pink-500/10 text-white"
                          : "border-gray-800 bg-black text-gray-300 hover:border-gray-700"
                      }`}
                    >
                      <div className="font-medium leading-tight">
                        {generator.name}
                      </div>
                      <div className="text-[11px] text-gray-500 leading-tight">
                        {generator.summary}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-5 pt-2">
              {activeGenerator.controls.map((control) => (
                <label key={control.id} className="block space-y-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-400">
                    <span>{control.label}</span>
                    <span className="text-gray-500">
                      {control.format
                        ? control.format(control.value)
                        : formatNumber(control.value)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    value={control.value}
                    onChange={(e) => control.set(parseFloat(e.target.value))}
                    className="w-full accent-pink-500"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 min-h-[360px] rounded-lg border border-gray-800 bg-black p-5 lg:p-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1 text-sm text-gray-400 lg:flex-row lg:items-center lg:justify-between">
              <span className="font-medium text-white tracking-tight">
                {activeGenerator.name}
              </span>
              <span className="text-gray-500">
                {activeGenerator.summary}
              </span>
            </div>
            <div className="h-[320px] lg:h-[420px]">
              <PlaygroundExperiment>{activeGenerator.render}</PlaygroundExperiment>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-gray-800 bg-gray-950 px-5 py-6 lg:px-7 lg:py-8 space-y-4">
          <div className="text-sm uppercase tracking-[0.18em] text-gray-500">
            Field Notes · Why these generators matter
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-gray-900 bg-black/60 px-4 py-3 space-y-2">
              <div className="text-white font-semibold">Sine Wave</div>
              <p className="text-sm text-gray-400">
                The simplest oscillator underpins everything from radio to LIGO&apos;s gravitational wave detections—pure periodic motion as the backbone of signal processing.
              </p>
            </div>
            <div className="rounded-md border border-gray-900 bg-black/60 px-4 py-3 space-y-2">
              <div className="text-white font-semibold">Prime Spiral</div>
              <p className="text-sm text-gray-400">
                Ulam&apos;s spiral revealed surprising prime clustering; the pattern still teases cryptographers and quantum chaos researchers who chase structure inside randomness.
              </p>
            </div>
            <div className="rounded-md border border-gray-900 bg-black/60 px-4 py-3 space-y-2">
              <div className="text-white font-semibold">Chaos Attractor</div>
              <p className="text-sm text-gray-400">
                Strange attractors model turbulent plasmas and exoplanet orbits; tiny parameter nudges can mimic the butterfly effect steering whole star systems off course.
              </p>
            </div>
            <div className="rounded-md border border-gray-900 bg-black/60 px-4 py-3 space-y-2">
              <div className="text-white font-semibold">Golden Field</div>
              <p className="text-sm text-gray-400">
                Phyllotaxis packs seeds and antennas efficiently; the same golden-angle lattice shows up in radio telescope arrays and optical metasurfaces designed for deep-space sensing.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
