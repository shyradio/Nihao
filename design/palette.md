# Color Palette

Source: user-provided palette card (saved 2026-11-01). Implemented in `src/index.css` under `@theme`.

| Name      | Hex       | Role                                                  |
| --------- | --------- | ----------------------------------------------------- |
| Sky Blue  | `#0599C6` | Brand accent, dots, illustration, decorative fills     |
| White     | `#FCFFFF` | Page background, surfaces, text on deep blue           |
| Hot Pink  | `#D83995` | Small accents, punctuation, stickers, hover details    |
| Deep Sky  | `#04749A` | Text links, primary button, focus ring (derived shade) |
| Ink       | `#0B1B22` | Headings and primary text (derived neutral)            |
| Ink Soft  | `#4C626B` | Body copy and labels (derived neutral)                 |

## Rules of thumb

- White is the base; large areas stay calm.
- Sky Blue is the brand accent. Deep Sky carries anything that must be read as text or a button.
- Hot Pink is the "pop" — one accent per view, never competing with blue.
- Text on Deep Sky is White. Never set small blue text on white using `#0599C6`.
- Never place Sky Blue text on Hot Pink, or the reverse.

## Contrast notes

- White on `#0599C6` ≈ 3.3:1 — large text and graphics only.
- White on `#04749A` ≈ 5.3:1 — passes AA for normal text.
- White on `#D83995` ≈ 4.25:1 — large text only.
- Ink `#0B1B22` on White ≈ 17:1.
- Ink Soft `#4C626B` on White ≈ 6.4:1.
