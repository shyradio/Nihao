import { ArrowUpRight } from "lucide-react";
import { site } from "../config";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-[13px] text-ink-soft">
            made with curiosity by{" "}
            <a
              href="#top"
              className="text-ink underline-offset-4 transition-colors duration-500 ease-spring hover:text-sky-deep hover:underline"
            >
              {site.name.toLowerCase()}
            </a>
            .
          </p>
          <div className="mt-2 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
            <a
              href={site.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-colors duration-500 ease-spring hover:text-sky-deep"
            >
              source
              <ArrowUpRight size={10} strokeWidth={1.5} />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            {site.domain}
          </span>
          <span className="h-3 w-px bg-line" aria-hidden="true" />
          <p className="font-mono text-[10px] tracking-[0.14em] text-ink-soft">
            © 2026 {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
