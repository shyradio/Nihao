import { useCallback, useEffect, useState } from "react";
import type { LanyardData } from "../lib/lanyard";

export type LanyardConnection = "connecting" | "live" | "reconnecting" | "error";

const SOCKET_URL = "wss://api.lanyard.rest/socket";

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [connection, setConnection] = useState<LanyardConnection>("connecting");
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setError(null);
    setConnection("connecting");
    setAttempt((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!userId) {
      setConnection("error");
      setError("No Discord user ID is configured.");
      return;
    }

    let socket: WebSocket | null = null;
    let heartbeat: number | undefined;
    let reconnectTimer: number | undefined;
    let openTimer: number | undefined;
    let cancelled = false;
    let retries = 0;
    let receivedPresence = false;

    const stopHeartbeat = () => {
      if (heartbeat !== undefined) window.clearInterval(heartbeat);
      heartbeat = undefined;
    };

    const applyPresence = (presence: LanyardData) => {
      if (cancelled) return;
      receivedPresence = true;
      setData(presence);
      setConnection("live");
      setError(null);
      retries = 0;
    };

    const scheduleReconnect = () => {
      if (cancelled) return;

      if (!receivedPresence && retries >= 2) {
        setConnection("error");
        setError("Couldn't reach Discord right now.");
      } else {
        setConnection("reconnecting");
      }

      const delay = Math.min(1000 * 2 ** retries, 15000);
      retries += 1;
      reconnectTimer = window.setTimeout(connect, delay);
    };

    const connect = () => {
      if (cancelled) return;

      socket = new WebSocket(SOCKET_URL);

      openTimer = window.setTimeout(() => {
        if (socket && socket.readyState !== WebSocket.OPEN) socket.close();
      }, 10000);

      socket.onopen = () => window.clearTimeout(openTimer);

      socket.onmessage = (event) => {
        let message: { op: number; t?: string; d?: unknown };
        try {
          message = JSON.parse(event.data);
        } catch {
          return;
        }

        if (message.op === 1) {
          const hello = message.d as { heartbeat_interval?: number } | undefined;
          const interval = hello?.heartbeat_interval ?? 30000;
          stopHeartbeat();
          heartbeat = window.setInterval(() => {
            if (socket?.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ op: 3 }));
            }
          }, interval);
          socket?.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
        }

        if (message.op === 0 && message.d) {
          if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
            applyPresence(message.d as LanyardData);
          }
        }
      };

      socket.onclose = (event) => {
        stopHeartbeat();
        if (cancelled) return;
        if (event.code === 4004) {
          setConnection("error");
          setError("This account isn't being tracked by Lanyard yet.");
          return;
        }
        scheduleReconnect();
      };

      socket.onerror = () => {
        socket?.close();
      };
    };

    fetch(`https://api.lanyard.rest/v1/users/${userId}`)
      .then((response) => response.json())
      .then((payload) => {
        if (cancelled) return;
        if (payload?.success && payload.data) {
          receivedPresence = true;
          setData(payload.data as LanyardData);
          setError(null);
        } else {
          setError("Presence is unavailable right now.");
        }
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't reach Discord.");
      });

    connect();

    return () => {
      cancelled = true;
      stopHeartbeat();
      if (reconnectTimer !== undefined) window.clearTimeout(reconnectTimer);
      if (openTimer !== undefined) window.clearTimeout(openTimer);

      const current = socket;
      if (current) {
        if (current.readyState === WebSocket.CONNECTING) {
          current.addEventListener("open", () => current.close(), { once: true });
        } else {
          current.close();
        }
      }
    };
  }, [userId, attempt]);

  return { data, connection, error, retry };
}

export type LanyardState = ReturnType<typeof useLanyard>;
