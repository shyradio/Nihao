import type { ReactNode } from "react";

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft">
      <span className="text-sky-deep">{index}</span>
      <span className="h-px w-7 bg-ink/15" />
      <span>{children}</span>
    </p>
  );
}
