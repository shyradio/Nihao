import { STATUS_COLORS, type DiscordStatus } from "../lib/lanyard";

type StatusDotProps = {
  status: DiscordStatus;
  pulse?: boolean;
  className?: string;
};

export function StatusDot({ status, pulse = true, className = "" }: StatusDotProps) {
  const color = STATUS_COLORS[status];

  return (
    <span className={`relative inline-flex h-2.5 w-2.5 ${className}`} aria-hidden="true">
      {pulse && status === "online" && (
        <span
          className="status-ring absolute inset-0 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      <span
        className="relative inline-flex h-full w-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}
