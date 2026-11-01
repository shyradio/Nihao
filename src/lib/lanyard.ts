export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export type LanyardActivity = {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
  created_at?: number;
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  emoji?: { name: string; id?: string; animated?: boolean };
};

export type LanyardSpotify = {
  track_id: string;
  timestamps: { start: number; end: number };
  album: string;
  album_art_url: string;
  artist: string;
  song: string;
};

export type LanyardUser = {
  id: string;
  username: string;
  global_name: string | null;
  display_name?: string | null;
  avatar: string | null;
  discriminator: string;
};

export type LanyardData = {
  discord_user: LanyardUser;
  discord_status: DiscordStatus;
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_web: boolean;
};

export const STATUS_COLORS: Record<DiscordStatus, string> = {
  online: "#23a55a",
  idle: "#f0b232",
  dnd: "#f23f43",
  offline: "#8b98a0",
};

export function avatarUrl(user: LanyardUser, size = 160) {
  if (!user.avatar) {
    const index = Number((BigInt(user.id) >> 22n) % 6n);
    return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
  }
  const extension = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}?size=${size}`;
}

export function activityImage(activity: LanyardActivity) {
  const image = activity.assets?.large_image;
  if (!image) return null;
  if (image.startsWith("mp:external/")) {
    return `https://media.discordapp.net/${image.slice(3)}`;
  }
  if (!activity.application_id) return null;
  return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${image}.png`;
}

export function customEmojiUrl(emoji: NonNullable<LanyardActivity["emoji"]>) {
  if (!emoji.id) return null;
  return `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}?size=32`;
}

export function findCustomStatus(activities: LanyardActivity[]) {
  return activities.find((activity) => activity.type === 4) ?? null;
}

export function findPrimaryActivity(activities: LanyardActivity[]) {
  return activities.find((activity) => activity.type !== 4 && activity.type !== 2) ?? null;
}

export function formatDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
