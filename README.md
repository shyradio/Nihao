# nihao.tech

A small personal corner of the internet. One page, a live Discord presence, and a list of things I'm building.

Live: <https://shyradio.github.io/Nihao/>

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide icons
- [Lanyard](https://github.com/Phineas/lanyard) for Discord presence

No backend, no database, no credentials.

## Run locally

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Configure

Everything personal lives in `src/config.ts`:

- `discordId` — the Lanyard user ID used for live presence.
- `socials` — Discord, GitHub and email links.
- `projects` — name, description, tech, optional GitHub/live links.
- `interests`, `status`, `about` — copy used on the page.
- `repo` — used by the footer links.

## Live Discord presence

Presence comes from Lanyard over a WebSocket, with an initial HTTP fetch and automatic reconnects. When the API is unavailable, the widget shows a retry state instead of inventing a status.

The account must be in the Lanyard Discord server for its presence to be tracked: <https://discord.gg/lanyard>.

## Deploy

The site is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

Vite uses a relative base, so the same build works at a project URL (`/Nihao/`) or a custom domain. To point `nihao.tech` at the site, add the domain in the repository's Pages settings and configure the DNS records GitHub provides.

## Accessibility and motion

- Semantic landmarks, a skip link, labelled interactive controls and visible focus rings.
- All motion is disabled or shortened under `prefers-reduced-motion`.
- Colour contrast is documented in `design/palette.md`.

## AI usage

This site was built with AI coding assistants through OpenCode. I supplied the brief, the palette, the Discord details and the final review; the assistants helped write the React components, CSS, copy drafts and configuration. Nothing on the page claims a project, achievement or presence that isn't real, and the live Discord data comes directly from Lanyard.

## Design

Palette and contrast notes: [`design/palette.md`](design/palette.md).
