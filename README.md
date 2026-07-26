# Will You Be Mine? 💖

A 7-page animated proposal website built with React + Vite + Tailwind CSS + Framer Motion + canvas-confetti.

## 1. Install & run

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). To build a deployable production bundle:

```bash
npm run build
npm run preview   # preview the production build locally
```

The `dist/` folder from `npm run build` can be uploaded to any static host (Vercel, Netlify, GitHub Pages, etc.).

## 2. Replace the photos

The project ships with soft gradient **placeholder images** so it builds and runs out of the box. Swap them for real photos:

| What | Where | Used on |
|---|---|---|
| Framed portrait | `src/assets/cotton-candy.png` | Page 1 (Home) |
| Moon face photo | `src/assets/moon-photo.png` | Page 3 (Moon Reveal) — pick a photo where her face is roughly centered, it gets masked into a circle |
| Memory gallery | `public/gallery/1.jpg` … `public/gallery/6.jpg` | Page 4 (Gallery) — add, remove, or rename entries in the `PHOTOS` array at the top of `src/pages/Gallery.jsx` |

Just overwrite these files with your own images of the same name (any resolution is fine, they're cropped automatically), or update the import/paths if you rename them.

## 3. Replace the text

Every page's copy lives directly in its component under `src/pages/`, near the top or inline in the JSX — search for the visible text and edit it directly:

- `Home.jsx` — headline + subtitle
- `Proposal.jsx` — the question + "NO" button phrases (`NO_PHRASES` array)
- `MoonReveal.jsx` — the moon caption
- `Gallery.jsx` — captions (`PHOTOS` array)
- `LoveCounter.jsx` — **set `START_DATE`** to the real date you fell for her
- `Reasons.jsx` — the `REASONS` array (add/remove cards freely)
- `FinalPage.jsx` — closing message

## 4. Add background music (optional)

Drop an mp3 file at `public/background-music.mp3`. The 🔇/🔊 button in the bottom-right corner (visible on every page) will play/pause it. If no file is present, the button simply does nothing — no errors.

## 5. How the pages connect

`src/App.jsx` holds a single `pageIndex` and renders one page at a time with a fade transition. Every page component receives an `onContinue` prop it calls to advance — that's the only thing wiring them together, so pages can be reordered, removed, or duplicated by editing the `PAGES` array in `App.jsx`.

## 6. The unbeatable "NO" button

In `Proposal.jsx`, the NO button:
- Watches mouse/touch position anywhere on screen and teleports to a new random spot inside its "playground" the instant the pointer gets within ~110px (`escapeThreshold`).
- On touch devices (no hover), it dodges on the very first `touchstart`, before a tap can register as a click — so it can never be pressed on mobile either.
- Cycles through a few playful labels (`NO_PHRASES`) each time it escapes.

The YES button is always stationary and clickable, and triggers the confetti/balloon celebration.

## 7. Tech notes

- Tailwind handles layout/spacing/color utility classes; a few pages keep small inline `style` objects for values Tailwind's default scale doesn't cover (e.g. `clamp()` responsive type).
- `framer-motion` powers essentially all animation (page transitions, hover/tap states, floating hearts, orbiting hearts on the moon, lanterns, fireflies).
- `canvas-confetti` powers the confetti bursts, "fireworks," and final heart-burst celebration.
- Reduced-motion users (`prefers-reduced-motion: reduce`) get near-instant animations via a global CSS override in `src/index.css`.
- No external GSAP/Lottie dependency was needed in the end — Framer Motion covers every animation in the brief — but both can be added later (`npm install gsap lottie-react`) if you want to hand-tune something further.

Enjoy, and good luck 💍
