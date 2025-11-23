import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PlaygroundExperiment({ children }: Props) {
  return (
    <div className="h-full w-full rounded-md border border-gray-900 bg-neutral-950 p-3">
      {children}
    </div>
  );
}
