import { useEffect, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "../config";
import { useActiveSection } from "../hooks/useActiveSection";
import type { LanyardState } from "../hooks/useLanyard";
import type { DiscordStatus } from "../lib/lanyard";
import { DiscordMark, GithubMark } from "./icons";
import { StatusDot } from "./StatusDot";

const links = [
  { id: "home", href: "#home", label: "home" },
  { id: "about", href: "#about", label: "about" },
  { id: "projects", href: "#projects", label: "projects" },
  { id: "find-me", href: "#find-me", label: "contact" },
];

const statusLabels: Record<DiscordStatus, string> = {
  online: "online",
  idle: "idle",
  dnd: "busy",
  offline: "offline",
};

export function Nav({ presence }: { presence: LanyardState }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const { data } = presence;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className="relative z-50 mx-auto flex w-full max-w-2xl items-center justify-between gap-3 rounded-full border border-line/80 bg-paper/80 py-2 pl-5 pr-2 shadow-[0_20px_50px_-38px_rgba(11,27,34,0.55)] backdrop-blur-xl"
      >
        <a
          href="#top"
          className="font-display text-[17px] font-semibold tracking-tight text-ink"
        >
          nihao<span className="text-pink">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = active === link.id;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`rounded-full px-3 py-1.5 text-[13px] transition-colors duration-500 ease-spring ${
                    isActive
                      ? "bg-ink/[0.055] text-ink"
                      : "text-ink-soft hover:bg-ink/[0.04] hover:text-ink"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.socials.discord.href}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 transition-colors duration-500 ease-spring hover:border-sky/40 hover:text-sky-deep sm:flex"
          >
            {data ? (
              <StatusDot status={data.discord_status} pulse={false} />
            ) : (
              <span className="h-2 w-2 rounded-full border border-ink/25" aria-hidden="true" />
            )}
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              {data ? statusLabels[data.discord_status] : "discord"}
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-500 ease-spring hover:bg-ink/[0.04] md:hidden"
          >
            <span
              className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-spring ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-current transition-transform duration-500 ease-spring ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close menu"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-paper/95 backdrop-blur-2xl"
          />

          <div className="relative flex h-full flex-col justify-between px-7 pb-10 pt-28">
            <ul className="space-y-1">
              {links.map((link, index) => {
                const isActive = active === link.id;

                return (
                  <li
                    key={link.href}
                    className="menu-link"
                    style={{ animationDelay: `${120 + index * 70}ms` }}
                  >
                    <a
                      href={link.href}
                      onClick={close}
                      aria-current={isActive ? "location" : undefined}
                      className={`flex items-center justify-between border-b border-line/70 py-4 font-display text-[2rem] font-medium tracking-tight ${
                        isActive ? "text-sky-deep" : "text-ink"
                      }`}
                    >
                      {link.label}
                      {isActive ? (
                        <span className="h-2 w-2 rounded-full bg-pink" aria-hidden="true" />
                      ) : (
                        <ArrowUpRight size={20} strokeWidth={1.5} className="text-ink/30" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div
              className="menu-link space-y-5"
              style={{ animationDelay: "380ms" }}
            >
              <div className="flex flex-col gap-2">
                <a
                  href={site.socials.github.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <GithubMark className="h-[15px] w-[15px]" />
                  {site.socials.github.handle}
                </a>
                <a
                  href={site.socials.email.href}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <Mail size={15} strokeWidth={1.5} />
                  {site.socials.email.handle}
                </a>
                <a
                  href={site.socials.discord.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <DiscordMark className="h-[15px] w-[15px]" />
                  {site.socials.discord.handle}
                </a>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                {site.domain}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
