"use client";

import { useMemo, useState } from "react";
import PlaygroundExperiment from "@/components/PlaygroundExperiment";
import SineWaveExperiment from "@/components/SineWaveExperiment";

type Control = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  set: (v: number) => void;
};

export default function PlaygroundPage() {
  const [amplitude, setAmplitude] = useState(40);
  const [frequency, setFrequency] = useState(0.02);
  const [speed, setSpeed] = useState(0.03);

  const controls: Control[] = useMemo(
    () => [
      {
        label: "Amplitude",
        value: amplitude,
        min: 5,
        max: 120,
        step: 1,
        set: setAmplitude,
      },
      {
        label: "Frequency",
        value: frequency,
        min: 0.005,
        max: 0.1,
        step: 0.001,
        set: setFrequency,
      },
      {
        label: "Speed",
        value: speed,
        min: 0.005,
        max: 0.1,
        step: 0.001,
        set: setSpeed,
      },
    ],
    [amplitude, frequency, speed],
  );
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 space-y-10 lg:space-y-12">
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            <span className="text-pink-400">Playground</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 tracking-tight">
            An experimental lab for chaotic maths visuals.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-1 space-y-5 rounded-lg border border-gray-800 bg-gray-950 p-6 lg:p-7">
            <div>
              <h2 className="text-lg font-medium tracking-tight text-white">
                Controls
              </h2>
              <p className="text-sm text-gray-400 tracking-tight">
                Tweak the sine wave live.
              </p>
            </div>
            {/* Experiment selector will go here in Phase 2 */}
            <div className="space-y-5">
              {controls.map((control) => (
                <label key={control.label} className="block space-y-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-400">
                    <span>{control.label}</span>
                    <span className="text-gray-500">
                      {control.value.toFixed(3).replace(/\.?0+$/, "")}
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
                Sine Wave Lab
              </span>
              <span className="text-gray-500">
                Amplitude {amplitude} · Frequency {frequency} · Speed {speed}
              </span>
            </div>
            <div className="h-[320px] lg:h-[380px]">
              <PlaygroundExperiment>
                <SineWaveExperiment
                  amplitude={amplitude}
                  frequency={frequency}
                  speed={speed}
                />
              </PlaygroundExperiment>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
