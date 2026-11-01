import { ArrowUpRight } from "lucide-react";
import { site, type Project } from "../config";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <SectionLabel index="02">built</SectionLabel>
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink">
              things i&apos;ve built.
            </h2>
          </div>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            some finished, some still cooking
          </p>
        </div>
      </Reveal>

      <div className="mt-12 border-t border-line">
        {site.projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 70}>
            <ProjectRow project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const hasLinks = Boolean(project.github || project.live);

  return (
    <article className="group border-b border-line">
      <div className="grid gap-4 py-7 sm:grid-cols-[2.5rem_1fr] sm:gap-6 md:grid-cols-[2.5rem_1fr_9rem] md:items-start md:py-8">
        <span className="pt-1 font-mono text-[11px] text-ink/30">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-ink transition-transform duration-500 ease-spring group-hover:translate-x-1 sm:text-[22px]">
              {project.name}
            </h3>
            {project.status && (
              <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
                {project.status}
              </span>
            )}
          </div>

          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-soft">
            {project.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 sm:pl-[3.25rem] md:justify-end md:pl-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[12px] text-ink-soft transition-colors duration-500 ease-spring hover:text-sky-deep"
            >
              github
              <ArrowUpRight size={12} strokeWidth={1.5} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              {...(project.live.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="inline-flex items-center gap-1 text-[12px] text-ink-soft transition-colors duration-500 ease-spring hover:text-sky-deep"
            >
              live
              <ArrowUpRight size={12} strokeWidth={1.5} />
            </a>
          )}
          {!hasLinks && (
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
              no public link yet
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
