import { site } from "../config";
import type { LanyardState } from "../hooks/useLanyard";
import { DiscordCard } from "./DiscordCard";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function About({ presence }: { presence: LanyardState }) {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionLabel index="01">about</SectionLabel>
            <h2 className="max-w-md font-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink">
              a little about me.
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-[1.75] text-ink-soft">
              {site.about}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-8 flex max-w-lg flex-wrap gap-2">
              {site.interests.map((interest) => (
                <li key={interest}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-[13px] text-ink-soft transition-colors duration-500 ease-spring hover:border-sky/40 hover:text-ink">
                    <span className="h-1 w-1 rounded-full bg-sky/60" aria-hidden="true" />
                    {interest}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-9 max-w-sm text-[13px] leading-relaxed text-ink-soft">
              the rest of me lives on{" "}
              <a
                href={site.socials.discord.href}
                target="_blank"
                rel="noreferrer"
                className="text-sky-deep underline-offset-4 transition-colors duration-500 ease-spring hover:text-[#03627f] hover:underline"
              >
                discord
              </a>
              , mostly after midnight.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:pt-2">
          <div className="max-w-md lg:max-w-none">
            <DiscordCard presence={presence} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
