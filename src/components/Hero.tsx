import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "../config";
import { Asterisk } from "./icons";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = event.clientX - rect.left - 260;
        const y = event.clientY - rect.top - 260;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frame = 0;
      });
    };

    section.addEventListener("pointermove", onPointerMove);
    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(5,153,198,0.12),transparent_65%)] md:block"
        style={{ transform: "translate3d(-600px,-600px,0)" }}
      />

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 pb-28 pt-32 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10 md:pb-32 md:pt-36">
        <div>
          <p
            className="intro flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft sm:text-[10px]"
            style={{ animationDelay: "60ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-pink" aria-hidden="true" />
            {site.domain}
            <span className="hidden text-ink/20 sm:inline">/</span>
            <span className="hidden sm:inline">personal corner of the internet</span>
          </p>

          <h1
            id="hero-title"
            className="intro mt-6 font-display text-[clamp(2.7rem,7vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-ink"
            style={{ animationDelay: "140ms" }}
          >
            hey, i&apos;m{" "}
            <span className="relative inline-block">
              nihao
              <svg
                viewBox="0 0 120 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-full text-pink/45"
              >
                <path
                  d="M2 8c18-6 34 2 52-2s34-4 64 1"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-pink">.</span>
          </h1>

          <p
            className="intro mt-7 max-w-md text-[16px] leading-[1.7] text-ink-soft sm:text-[17px]"
            style={{ animationDelay: "220ms" }}
          >
            just a student exploring the internet, building things and figuring stuff out.
          </p>

          <p
            className="intro mt-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-3.5 py-2 text-[13px] text-ink-soft"
            style={{ animationDelay: "300ms" }}
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="status-ring absolute inline-flex h-full w-full rounded-full bg-sky" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky" />
            </span>
            {site.status}
          </p>

          <div
            className="intro mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "380ms" }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-sky-deep py-2 pl-6 pr-2 text-sm font-medium text-white transition-all duration-500 ease-spring hover:bg-[#03627f] active:scale-[0.98]"
            >
              explore my stuff
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-spring group-hover:translate-y-0.5 group-hover:scale-105">
                <ArrowDown size={15} strokeWidth={1.75} />
              </span>
            </a>
            <a
              href="#find-me"
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition-all duration-500 ease-spring hover:border-ink/30 hover:bg-ink/[0.03] active:scale-[0.98]"
            >
              get in touch
              <ArrowUpRight
                size={15}
                strokeWidth={1.75}
                className="text-ink/40 transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div
          className="intro relative mx-auto w-full max-w-[330px] sm:max-w-[380px] md:max-w-[420px]"
          style={{ animationDelay: "300ms" }}
        >
          <div className="relative aspect-[4/5] rounded-[34px] border border-line bg-white p-2 shadow-[0_40px_80px_-60px_rgba(11,27,34,0.55)]">
            <div className="relative h-full overflow-hidden rounded-[26px] bg-mist">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(#0599c6 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(5,153,198,0.12),transparent_58%),radial-gradient(circle_at_76%_86%,rgba(216,57,149,0.07),transparent_55%)]"
              />

              <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2">
                <Asterisk className="slow-spin w-full text-sky/75" />
              </div>

              <span
                aria-hidden="true"
                className="absolute right-[17%] top-[15%] h-3 w-3 rounded-full bg-pink"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-[21%] left-[14%] h-1.5 w-1.5 rounded-full bg-sky"
              />

              <span className="absolute right-4 top-4 -rotate-6 rounded-full border border-line bg-white px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft shadow-[0_8px_20px_-16px_rgba(11,27,34,0.6)]">
                somewhere online
              </span>

              <p className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">
                fig. 01 — a person, probably
              </p>
            </div>
          </div>

          <span
            aria-hidden="true"
            className="absolute -left-3 -top-3 h-7 w-7 rounded-full border border-pink/30"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex">
        <div className="flex flex-col items-center gap-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink/35">
            scroll
          </span>
          <span className="relative block h-10 w-px overflow-hidden bg-ink/10">
            <span className="scroll-cue absolute inset-x-0 top-0 block h-3 bg-sky" />
          </span>
        </div>
      </div>
    </section>
  );
}
