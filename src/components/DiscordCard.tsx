import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Gamepad2,
  Music2,
  RefreshCw,
  WifiOff,
} from "lucide-react";
import { site } from "../config";
import type { LanyardState } from "../hooks/useLanyard";
import {
  STATUS_COLORS,
  activityImage,
  avatarUrl,
  customEmojiUrl,
  findCustomStatus,
  findPrimaryActivity,
  formatDuration,
  type LanyardActivity,
} from "../lib/lanyard";
import { DiscordMark } from "./icons";

const connectionLabels = {
  connecting: "connecting",
  live: "live",
  reconnecting: "reconnecting",
  error: "unavailable",
} as const;

const activityVerbs: Record<number, string> = {
  0: "playing",
  1: "streaming",
  3: "watching",
  5: "competing in",
};

export function DiscordCard({ presence }: { presence: LanyardState }) {
  const { data, connection, error, retry } = presence;
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (copyTimer.current !== undefined) window.clearTimeout(copyTimer.current);
    };
  }, []);

  const user = data?.discord_user;
  const status = data?.discord_status ?? "offline";
  const customStatus = data ? findCustomStatus(data.activities) : null;
  const activity = data ? findPrimaryActivity(data.activities) : null;
  const spotify = data?.listening_to_spotify ? data.spotify : null;
  const displayName = user?.display_name || user?.global_name || user?.username || "";

  const presenceLine = !data
    ? ""
    : status === "offline"
      ? "currently offline."
      : activity
        ? `${activityVerbs[activity.type] ?? "doing"} ${activity.name}`
        : "currently doing nothing.";

  const copyUsername = async () => {
    if (!user) return;

    try {
      await navigator.clipboard.writeText(user.username);
    } catch {
      const field = document.createElement("textarea");
      field.value = user.username;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    setCopied(true);
    if (copyTimer.current !== undefined) window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-[28px] bg-ink/[0.035] p-1.5 ring-1 ring-ink/5">
      <div className="rounded-[23px] bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-line/80 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            <DiscordMark className="h-3.5 w-3.5 text-ink/40" />
            on discord
          </p>
          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                connection === "live" ? "status-pulse bg-sky" : "bg-ink/20"
              }`}
              aria-hidden="true"
            />
            {connectionLabels[connection]}
          </p>
        </div>

        {!data && connection !== "error" && (
          <div className="animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-ink/[0.06]" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-24 rounded-full bg-ink/[0.07]" />
                <div className="h-2.5 w-16 rounded-full bg-ink/[0.05]" />
                <div className="h-2.5 w-32 rounded-full bg-ink/[0.05]" />
              </div>
            </div>
            <div className="mt-5 h-16 rounded-2xl bg-ink/[0.04]" />
            <p className="sr-only">Loading Discord presence</p>
          </div>
        )}

        {!data && connection === "error" && (
          <div className="flex items-start gap-3 rounded-2xl bg-mist p-4">
            <WifiOff size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-ink/40" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">discord is quiet right now</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                {error ?? "Presence couldn't be loaded."}
              </p>
              <button
                type="button"
                onClick={retry}
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-sky-deep transition-colors duration-500 ease-spring hover:text-[#03627f]"
              >
                <RefreshCw size={13} strokeWidth={1.5} />
                try again
              </button>
            </div>
          </div>
        )}

        {data && user && (
          <>
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div
                  className="rounded-full p-[3px]"
                  style={{ backgroundColor: STATUS_COLORS[status] }}
                >
                  <img
                    src={avatarUrl(user)}
                    alt=""
                    width={64}
                    height={64}
                    loading="lazy"
                    className="h-16 w-16 rounded-full border-[3px] border-white object-cover"
                  />
                </div>
                <span
                  className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-[3px] border-white"
                  style={{ backgroundColor: STATUS_COLORS[status] }}
                >
                  {status === "online" && (
                    <span className="status-ring absolute inset-0 rounded-full bg-[#23a55a]" />
                  )}
                </span>
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="truncate font-display text-lg font-semibold leading-tight text-ink">
                  {displayName}
                </p>
                <p className="truncate font-mono text-[11px] text-ink-soft">@{user.username}</p>
                <p className="mt-1.5 truncate text-[13px] text-ink-soft" aria-live="polite">
                  {presenceLine}
                </p>
              </div>

              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={copyUsername}
                  title={copied ? "Copied" : "Copy username"}
                  aria-label={copied ? "Username copied" : "Copy Discord username"}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ease-spring active:scale-95 ${
                    copied
                      ? "border-sky/40 text-sky-deep"
                      : "border-line text-ink/45 hover:border-sky/40 hover:text-sky-deep"
                  }`}
                >
                  {copied ? (
                    <Check size={14} strokeWidth={1.75} />
                  ) : (
                    <Copy size={14} strokeWidth={1.5} />
                  )}
                </button>
                <a
                  href={site.socials.discord.href}
                  target="_blank"
                  rel="noreferrer"
                  title="Open Discord profile"
                  aria-label="Open Discord profile"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/45 transition-all duration-500 ease-spring hover:border-sky/40 hover:text-sky-deep active:scale-95"
                >
                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {customStatus?.state && (
              <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-mist px-3.5 py-3">
                {customStatus.emoji?.id ? (
                  <img
                    src={customEmojiUrl(customStatus.emoji) ?? ""}
                    alt={customStatus.emoji.name}
                    className="mt-0.5 h-4 w-4 shrink-0 object-contain"
                    loading="lazy"
                  />
                ) : customStatus.emoji?.name ? (
                  <span className="text-[13px] leading-5">{customStatus.emoji.name}</span>
                ) : (
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/30"
                    aria-hidden="true"
                  />
                )}
                <p className="min-w-0 flex-1 text-[13px] leading-relaxed text-ink-soft">
                  {customStatus.state}
                </p>
              </div>
            )}

            {activity && <ActivityRow activity={activity} />}

            {spotify && (
              <a
                href={`https://open.spotify.com/track/${spotify.track_id}`}
                target="_blank"
                rel="noreferrer"
                className="group mt-4 block rounded-2xl bg-mist p-3.5 transition-colors duration-500 ease-spring hover:bg-[#e9f6fa]"
              >
                <div className="flex items-center gap-3">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ink/[0.06]">
                    <img
                      src={spotify.album_art_url}
                      alt={`${spotify.album} album art`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">
                      <Music2 size={11} strokeWidth={1.5} />
                      spotify
                    </p>
                    <p className="truncate text-sm font-medium text-ink transition-colors duration-500 ease-spring group-hover:text-sky-deep">
                      {spotify.song}
                    </p>
                    <p className="truncate text-xs text-ink-soft">{spotify.artist}</p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="shrink-0 text-ink/30 transition-transform duration-500 ease-spring group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <SpotifyProgress
                  start={Number(spotify.timestamps.start)}
                  end={Number(spotify.timestamps.end)}
                />
              </a>
            )}

            <div className="mt-5 flex items-center justify-end gap-3 border-t border-line/70 pt-4">
              <a
                href={site.socials.discord.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors duration-500 ease-spring hover:text-sky-deep"
              >
                open profile
                <ArrowUpRight size={12} strokeWidth={1.5} />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ActivityRow({ activity }: { activity: LanyardActivity }) {
  const image = activityImage(activity);

  return (
    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line/70 px-3.5 py-3">
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-mist text-sky">
        <Gamepad2 size={18} strokeWidth={1.5} />
        {image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.opacity = "0";
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">
          {activityVerbs[activity.type] ?? "doing"}
        </p>
        <p className="truncate text-sm font-medium text-ink">{activity.name}</p>
        {activity.details && (
          <p className="truncate text-xs text-ink-soft">{activity.details}</p>
        )}
        {activity.state && <p className="truncate text-xs text-ink-soft">{activity.state}</p>}
      </div>
    </div>
  );
}

function SpotifyProgress({ start, end }: { start: number; end: number }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = Math.max(end - start, 1);
  const elapsed = Math.min(Math.max(now - start, 0), total);

  return (
    <div className="mt-3">
      <div className="h-[3px] overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full origin-left rounded-full bg-sky transition-transform duration-1000 ease-linear"
          style={{ transform: `scaleX(${elapsed / total})` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[9px] text-ink-soft">
        <span>{formatDuration(elapsed)}</span>
        <span>{formatDuration(total)}</span>
      </div>
    </div>
  );
}
