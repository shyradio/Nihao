# nihao.tech

A small personal corner of the internet. React, TypeScript, Vite, Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Configure

Everything personal lives in `src/config.ts`:

- `discordId` — the Lanyard user ID used for live presence.
- `socials` — Discord, GitHub and email links.
- `projects` — name, description, tech, optional GitHub/live links.
- `interests`, `status`, `about` — copy used on the page.

## Live Discord presence

Presence comes from [Lanyard](https://github.com/Phineas/lanyard) over a WebSocket, with an initial HTTP fetch and automatic reconnects. No token or backend is involved.

The account must be in the Lanyard Discord server for its presence to be tracked: <https://discord.gg/lanyard>. If it is not, the widget shows a friendly unavailable state.

## Design

Palette and contrast notes: `design/palette.md`.
