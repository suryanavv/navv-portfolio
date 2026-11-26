# Portfolio redesign plan

> **Proposed replacement (24 Nov 2026):** the visual and UX direction (§1–§4, §7 component list) is being replaced by [design-concept.md](design-concept.md) ("Platform"), pending your review. The domain (§0), engineering fixes (§5), SEO (§6), content (§8) and "done when" (§10) sections still apply.

Direction: **product engineer**, one page. Dark first, black and white, a monospace accent font, a job timeline, project screenshots, one signature detail, and a floating dock.
Reference points: Gurbinder (identity, timeline, dock), Dev Sethi (project mockups, experiment-lab spirit), Pawann (writing voice and concrete numbers).
Rule for the whole redesign: **one signature detail, everything else quiet.** No pile of gimmicks like harshitr.me has.

---

## 0. Domain ✅

The live domain is **suryanavv.in** (the old `suryanavv.tech` expired). It's set once, as `SITE_URL` in `vite.config.ts`: `index.html` uses `%SITE_URL%`, and `robots.txt` and `sitemap.xml` are generated at build time. Project demos live at `bridgespace`, `framecaption` and `spotlight.suryanavv.in`.

---

## 1. Visual system

| Token | Choice | Notes |
|---|---|---|
| Body font | **Geist Sans** | Neutral and very readable; replaces Manrope |
| Meta font | **Geist Mono** | Dates, handles, tech tags, clock, section labels |
| Display font (name + section titles) | **Doto 900** ✅ chosen | Picked over Departure Mono and Silkscreen in step 2. Latin subset self-hosted at `public/fonts/` (4 KB) and preloaded |
| Background | dark `#0b0b0c`, light `#fafaf9` | Dark first, but respects the visitor's system setting on the first visit |
| Text | 3 steps: primary / muted / faint | Every step must pass contrast (4.5:1 for body). Gurbinder's and Looskie's weakest point |
| Accent | **green** ✅ chosen (`#22c55e` dark / `#16a34a` light) | Only for "available" and focus rings. Nothing else gets colour |
| Column | `max-w-[680px]`, keep your `border-x` lines and full-width section rules | Already your strongest structural choice |
| Radius / borders | 8px, 1px hairlines at 8–10% opacity | |

Load the fonts locally with `@fontsource` or self-hosted `woff2`, use `font-display: swap`, and preload the display font. Remove the Google Fonts `onload` workaround.

---

## 2. Page structure (top to bottom)

1. **Header row**: the greeting (the signature, see §3) · `/ @suryanavv` in mono · a status pill on the right: `● available · 22:08 IST`. The clock shows **your** time in `Asia/Kolkata` with tabular digits.
2. **Name + role**: `SURYA NAVEEN` in the display font. One mono line: `frontend engineer · react · typescript · andhra pradesh`.
3. **Intro**: 2–3 short paragraphs **in your own voice**, with inline links to your current job and projects. Each line should say something specific; drop "minimal, beautiful web interfaces." Buttons: `Email me` (primary), `Résumé` (secondary).
4. **Experience timeline**: horizontal on desktop like Gurbinder's, vertical on mobile. Each entry: logo or initial, company, role, `MMM YY – now` in mono, and one line on what you did. A progress line fills to "now".
5. **Projects** (the main section): 2-column grid of screenshot cards; 1 column on mobile.
   - The screenshot sits on a soft grayscale backdrop, like Dev Sethi's mockups. Every card uses the same treatment.
   - Title · year · **one metric line** (your numbers) · one-line description.
   - Tech as one mono line (`react · supabase · tailwind`), not tag pills.
   - `Live ↗` and `Code ↗` as small icon buttons.
6. **Stack**: shrinks from 4 icon grids to **one quiet row**: a short mono list, or a single row of small monochrome icons with tooltips. It's supporting detail now, not the main section.
7. **Links**: GitHub, LinkedIn, X, Email, Résumé as small keycap-style buttons in one row.
8. **Footer**: `© 2026 Surya Naveen` · `last updated <build date>` · a small "built with" note.
9. **Floating dock** (fixed, bottom centre): `home · work · projects · links`, plus the **theme toggle moved into the dock**. It highlights the section you're reading. A soft blur fades content out at the bottom edge behind the dock. On mobile it must not cover content: add bottom padding equal to the dock's height plus 24px.

---

## 3. The signature detail: the greeting

Keep your multilingual greeting and make it the one memorable thing:
- It cycles once on load, as it does today, and lands on **నమస్కారం (Telugu)**, which ties it to Andhra Pradesh, instead of "Hello".
- Hovering or tapping the greeting cycles it again. A small label shows the language (`telugu`).
- Swap the 2.2 MB `namaste.png` for an SVG or a 96px WebP (about 3 KB).
- With reduced motion turned on, it shows the final greeting with no animation.

Nothing else on the page wobbles, rotates or springs. Hover states are opacity and colour changes only.

---

## 4. Motion rules

- One entrance stagger: sections fade up 8px, 40ms apart, and run once.
- `MotionConfig reducedMotion="user"` at the root, plus a CSS `prefers-reduced-motion` fallback.
- Switch to `LazyMotion` + `m` with `domAnimation` to shrink the bundle (Motion is currently most of the 123 KB gzipped).
- Keep the View Transitions circle reveal for the theme toggle.

---

## 5. Engineering fixes (from the first review, folded in)

- [ ] Put the clock in its own `<Clock/>` component so the whole page no longer re-renders every second.
- [ ] One source of truth for the theme: a small inline `<script>` in `index.html` sets `html.dark` before first paint (no flash), and the toggle only reads and writes that. Delete the duplicate state in `App`.
- [ ] Valid HTML: the `<h1>` holds only the name, not nested in a `<p>`; sections are `<section aria-labelledby>`.
- [ ] Remove `userSelect: none` and stop hiding scrollbars globally.
- [ ] Add `@vitejs/plugin-react` to `vite.config.ts`.
- [ ] Remove the `"use client"` lines, the unused `links` field, `text-md`, and the empty `public/dock` and `public/images` folders.
- [ ] Fix the 21 lint errors (unused `size` props, empty `catch` blocks).
- [ ] Images: screenshots as AVIF/WebP at 1200w and 600w (`srcset`), `loading="lazy"`, explicit width and height.
- [ ] OG image: regenerate at **1200×630, under 300 KB**, in the new visual style.

---

## 6. SEO cleanup

- Remove: `keywords`, the geo tags, `revisit-after`, `rating`, `coverage`, `distribution`, the `pinterest` and `linkedin:owner` tags, and `Crawl-delay`.
- Use `name="twitter:*"` instead of `property=` for the Twitter tags.
- JSON-LD: add `worksFor` (your current employer); fix `occupationLocation` (Andhra Pradesh is a state, not a `City`); add your projects as `CreativeWork` with `url`.
- `sitemap.xml`: `lastmod` set automatically at build time.
- Title: `Surya Naveen — Frontend Engineer`. Description: one human sentence.

---

## 7. Data model (`src/data.ts`)

```ts
type Experience = {
  company: string; role: string; url?: string; logo?: string;
  start: string;            // "2025-01"
  end?: string;             // undefined = present
  type: "full-time" | "internship" | "freelance" | "education";
  summary: string;          // one line, concrete
};

type Project = {
  title: string; year: number; summary: string;
  metric?: string;          // "transfers 200 MB files in under 3 s on LAN"
  stack: string[];
  live: string; repo: string;
  image: string;            // /projects/bridgespace.webp
};
```

Component layout: `Header`, `Greeting`, `Intro`, `Experience`, `ProjectCard`/`Projects`, `Stack`, `Links`, `Dock`, `Clock`, `ThemeToggle`, `Section` (a shared wrapper for section titles and rules).

---

## 8. Content you need to provide

Fill these in. They decide whether the redesign works, more than any visual choice.

**Work history** (newest first):
```
Company — role — type — MMM YYYY to MMM YYYY/now — one line on what you did (with a number if possible)
```

**Project numbers** (one per project):
- BridgeSpace: e.g. max file size, transfer speed, number of users or devices
- FrameCaption: e.g. export time, number of users, stars
- Spotlight: e.g. portfolios created, signups

**Intro**: 2–3 sentences on what you do now, what you're good at, and what you want next. Write it like you'd say it, the way Pawann does.

I'll capture project screenshots from the `*.vercel.app` URLs (all three are up).

---

## 9. Build order

1. ✅ Engineering fixes from §5 (theme script, clock, HTML, lint, Vite plugin). No visual change yet.
2. ✅ Tokens and fonts (§1); a font test page to choose the display font.
3. ✅ Layout shell: `Section`, column, rules, dock with section highlighting, theme toggle inside the dock.
4. Header, greeting, intro.
5. Experience timeline (needs your work history).
6. Project cards and screenshots (needs your numbers).
7. Stack row, links, footer.
8. Motion pass plus reduced motion; `LazyMotion`.
9. SEO and OG image; domain constant.
10. Checks (below).

## 10. Done when

- `npm run build` and `npm run lint` pass with no errors.
- Lighthouse (mobile): Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
- JS bundle under 80 KB gzipped; no image over 200 KB.
- No layout overflow and no dock overlap at 390px wide.
- Both themes pass contrast checks; no flash of the wrong theme on load.
- With reduced motion on, nothing animates except the instant theme switch.
- Every link works.

## Out of scope (for later)

A blog, separate project pages, a now-playing widget, a ⌘K search palette, a guestbook.
