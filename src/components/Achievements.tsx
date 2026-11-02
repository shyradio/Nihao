import { site } from "../config";
import { Asterisk } from "./icons";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Achievements() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-title"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32"
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <SectionLabel index="02">achievements</SectionLabel>
            <h2
              id="achievements-title"
              className="font-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink"
            >
              things i&apos;ve achieved.
            </h2>
          </div>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            small wins, questionable bragging rights
          </p>
        </div>
      </Reveal>

      <div className="mt-12 border-t border-line">
        {site.achievements.map((achievement, index) => (
          <Reveal key={achievement} delay={index * 70}>
            <article className="group border-b border-line">
              <div className="flex items-center gap-4 py-7 sm:gap-6 md:py-8">
                <span className="font-mono text-[11px] text-ink/30">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Asterisk className="h-3 w-3 shrink-0 text-pink/60 transition-transform duration-700 ease-spring group-hover:rotate-90" />

                <h3 className="min-w-0 flex-1 font-display text-xl font-semibold tracking-[-0.01em] text-ink transition-all duration-500 ease-spring group-hover:translate-x-1 group-hover:text-sky-deep sm:text-[22px]">
                  {achievement}
                </h3>

                <span className="hidden rounded-full border border-line px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft transition-colors duration-500 ease-spring group-hover:border-pink/30 group-hover:text-pink sm:inline-flex">
                  unlocked
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
