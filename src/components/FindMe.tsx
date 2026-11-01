import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "../config";
import { DiscordMark, GithubMark } from "./icons";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const socials = [
  {
    ...site.socials.discord,
    icon: <DiscordMark className="h-4 w-4" />,
  },
  {
    ...site.socials.github,
    icon: <GithubMark className="h-4 w-4" />,
  },
  {
    ...site.socials.email,
    icon: <Mail size={16} strokeWidth={1.5} />,
  },
];

export function FindMe() {
  return (
    <section id="find-me" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <SectionLabel index="03">elsewhere</SectionLabel>
        <h2 className="font-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink">
          find me around the internet.
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
          No contact form, no newsletter. Just these three doors.
        </p>
      </Reveal>

      <div className="mt-12 border-t border-line">
        {socials.map((social, index) => (
          <Reveal key={social.label} delay={index * 70}>
            <a
              href={social.href}
              {...(social.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="group flex items-center justify-between gap-4 border-b border-line py-5 sm:py-6"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="font-mono text-[10px] text-ink/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink/50 transition-colors duration-500 ease-spring group-hover:border-sky/40 group-hover:text-sky-deep">
                  {social.icon}
                </span>
                <span className="truncate font-display text-2xl font-medium tracking-[-0.01em] text-ink transition-transform duration-500 ease-spring group-hover:translate-x-1 sm:text-[28px]">
                  {social.label}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-5">
                <span className="hidden font-mono text-[11px] text-ink-soft sm:block">
                  {social.handle}
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="text-ink/30 transition-all duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-deep"
                />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
