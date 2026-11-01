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

Vite uses a relative base, so the same build works at a project URL (`/Nihao/`) or a custom domain.

### Custom domain

The site is served from <https://shyradio.github.io/Nihao/> until `nihao.tech` is pointed at GitHub Pages. To connect it:

1. Add these apex `A` records for `nihao.tech`:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
2. Add a `CNAME` record for `www` pointing to `shyradio.github.io`.
3. In **Settings → Pages**, enter `nihao.tech` as the custom domain and enable **Enforce HTTPS**.

Do not add a `CNAME` file to the repository before DNS is ready — GitHub Pages will start redirecting the working `github.io` URL to the unfinished domain.

## Accessibility and motion

- Semantic landmarks, a skip link, labelled interactive controls and visible focus rings.
- All motion is disabled or shortened under `prefers-reduced-motion`.
- Colour contrast is documented in `design/palette.md`.

## AI usage

This site was built with AI coding assistants through OpenCode. I supplied the brief, the palette, the Discord details and the final review; the assistants helped write the React components, CSS, copy drafts and configuration. Nothing on the page claims a project, achievement or presence that isn't real, and the live Discord data comes directly from Lanyard.

## Design

Palette and contrast notes: [`design/palette.md`](design/palette.md).
