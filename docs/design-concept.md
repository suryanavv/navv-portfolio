# Portfolio design concept: "Platform"

Status: **proposal for review**. Nothing here is built yet. Engineering work from steps 1–3 (theme script, Doto font, `Section`, dock, scroll highlighting, IST clock) carries over; see "What carries over" at the end.

---

## 1. The brief, restated

- **Subject**: Surya Naveen, a frontend engineer in Andhra Pradesh, India, who cares about interface craft.
- **Audience**: hiring managers and founders deciding in under a minute whether to talk to him; developer peers who notice details.
- **Primary job of the site**: prove he ships good interfaces (real projects, real numbers, real work history) and make contacting him effortless.
- **Secondary job**: be memorable, so the link gets forwarded.

> ✋ Confirm this first: if the site's main job is something else (freelance clients, a design-engineer job, showing open source), the hierarchy below changes.

---

## 2. The concept

**An Indian railway station departure board, as the opening of the page.**

Every Indian railway station has a dot-matrix LED board, and it **cycles the same line through English, Hindi and the local language**. In Andhra Pradesh that's Telugu. Your site already cycles "Hello → नमस्ते → నమస్కారం". The board turns that greeting from a gimmick into something that comes from a real place. It also gives the dot-matrix font a reason to exist: on gurbinder.dev, Doto is a style choice for his name. Here it's the actual lettering of an actual object. That's what keeps the site from reading as a copy of his.

The board is the **only loud thing** on the page. Everything below it is a quiet, well-set document.

The metaphor stays light. No train puns, no "Platform 1 / Coach S4" copy. The board is a physical object with its own logic (it lights up, it cycles languages, it keeps time), and the rest of the page is just good typography.

---

## 3. Principles

1. **One loud object.** The board gets all the boldness: lit dots, motion, the display font at size. Nothing else on the page competes with it.
2. **Green means "on".** Green is LED light, never decoration. It appears only where something is live or current: the "available" lamp, a project whose site is up, your current job. If you see green, something is running.
3. **Below the board, it's a document.** Left-aligned, one column, set like a good essay: no card grid, no icon grid, no badges.
4. **Motion answers people.** The board's boot-up when the page loads is the one moment of motion nobody asked for. Every other animation is a response to a click, hover, key press or scroll target.
5. **Proof over adjectives.** Every project row carries one concrete number. Every job carries one specific line. No "passionate", no "beautiful", no "seamless".

---

## 4. Tokens

### Colour

| Name | Hex | Role |
|---|---|---|
| Night | `#131518` | Page background, dark mode (cool graphite, not black, so the board reads as an object on it) |
| Concrete | `#ECEDEA` | Page background, light mode (cool platform-concrete grey, not cream) |
| Ink | `#E8E9E6` / `#15171A` | Body text, dark / light (15:1 on both backgrounds) |
| Muted | `#9BA1A7` / `#5A6066` | Secondary text, dark / light (7.0:1 / 5.4:1) |
| Housing | `#060707` | The board's panel, **the same in both themes** (it's a physical thing) |
| LED | `#5EEA8C` (lit), `#1C221D` (unlit dot) | Board lettering and the "on" lamps. 13:1 on the housing |

Rules: `#2A2E33` (dark) / `#CDD0CB` (light), hairline, used only where they separate rows of a list.

**Light mode keeps the board dark.** In daylight the board is still a black panel with green LEDs. That's the strongest anchor of the design and it shouldn't invert.

### Type

| Face | Role |
|---|---|
| **Doto 900** (already self-hosted) | Board lettering, section titles. Sentence case outside the board; capitals only inside the board, because that's how LED boards write |
| **Geist** (already self-hosted) | Everything else: body, metadata, buttons. Numbers use `tabular-nums` |

**Change from the earlier plan:** Geist Mono is dropped. Mono for small data labels is a template habit; Geist with tabular figures does the job and keeps the page to one family plus one display face.

Scale (classic typographic progression, px): **12 · 14 · 16 · 20 · 24 · 36 · 60**

| Use | Size / leading |
|---|---|
| Board: name | Doto 60 (desktop), 36 (mobile) |
| Board: other lines | Doto 24 / 20 |
| Section titles | Doto 24, sentence case |
| Body | Geist 16 / 1.6, measure 640px (about 75 characters) |
| Row titles | Geist 16, weight 560 |
| Metadata (years, stack) | Geist 14, muted, tabular numbers |
| Fine print (footer) | Geist 12 |

### Layout

- Text column **640px**, left-aligned, starting at the same left edge throughout.
- The board **breaks out to 880px** on desktop, centred on the column, so it reads as an object mounted above the text rather than another paragraph.
- Vertical rhythm on an 8px grid; sections separated by 96px of space plus the title, **no full-width rules between sections** (that was template chrome).
- Corners: board 6px (a metal panel), everything else square or 4px. No single radius applied to everything.

---

## 5. Page structure and wireframes

### Desktop (1280 wide)

```
            ┌────────────────────────────────────────────────────────────┐
            │ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ │  unlit LED grid
            │  నమస్కారం                                       22:41:07  │  line 1: greeting (EN → HI → TE), IST clock
            │                                                            │
            │  SURYA NAVEEN                                              │  line 2: name, the page's h1
            │                                                            │
            │  FRONTEND ENGINEER        ANDHRA PRADESH        ● AVAILABLE│  line 3: role, place, lamp
            └────────────────────────────────────────────────────────────┘
                  880px board, 6px bezel, the only loud thing

                  I build interfaces with React and TypeScript, and I care
                  about the parts people touch. [current role, one line].
                  [what you want next, one line].

                  Email me     Résumé     naveen534245@gmail.com ⧉


                  Work                                       ← Doto 24
                  ●  [Company]        [Role]              2025 – now
                  │  [one specific line]
                  │
                  ○  [Company]        [Role]              2024 – 2025
                  │  [one specific line]
                  │
                  ○  [College]        B.Tech              2020 – 2024


                  Projects
                  ─────────────────────────────────────────────────────
                  ● BridgeSpace     Share files across devices on one Wi-Fi     ＋
                  ─────────────────────────────────────────────────────
                  ● FrameCaption    Put text behind the subject of a photo      －
                    ┌───────────────────────────────────────────────┐
                    │                 [screenshot]                  │
                    └───────────────────────────────────────────────┘
                    [one number]. [what you built, one or two lines]
                    Built with Next.js, React and Tailwind.
                    Visit site     Source code
                  ─────────────────────────────────────────────────────
                  ● Spotlight       Build a portfolio and share it by link      ＋
                  ─────────────────────────────────────────────────────


                  Toolkit
                  I write TypeScript and React every day, reach for Next.js
                  and Tailwind, store data in Postgres and Supabase, and
                  sketch in Figma first.


                  Elsewhere
                  GitHub    LinkedIn    X    Email


                  © 2026 Surya Naveen        Updated 24 Nov 2026

                        ┌───────────────────────────────────────┐
                        │  home   work   projects   contact   ◐ │   dock
                        └───────────────────────────────────────┘
```

### Mobile (390 wide)

```
┌──────────────────────────────┐
│ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░  │  board goes full-bleed (edge to edge)
│ నమస్కారం          22:41    │  seconds hidden
│ SURYA                         │  name breaks over 2 lines, Doto 36
│ NAVEEN                        │
│ FRONTEND ENGINEER             │
│ ● AVAILABLE                   │  place moves into the intro text
└──────────────────────────────┘
  I build interfaces with…
  [Email me]  [Résumé]

  Work
  ● [Company]
    [Role]  2025 – now
    [one line]
  …

  Projects
  ● BridgeSpace              ＋
    Share files across devices…
  ─────────────────────────────
  …
        ( home work projects contact ◐ )
```

### Section order and why

1. **Board + intro + contact**: who, where, available or not, how to reach you. Everything a recruiter needs is above the fold.
2. **Work**: a vertical route. It's a real sequence, so a numbered line is honest here. Your current role's stop is the lit (green) one.
3. **Projects**: rows like a timetable, not cards. One line each until opened, so all three fit on one screen; screenshots appear on demand.
4. **Skills** (was "Toolkit"): the everyday stack as a sentence with inline logos, then every skill as a logo chip grouped by kind of work (official SVG logos from Devicon, Simple Icons, AWS architecture icons and Dokploy; line glyphs for concepts). Recruiters skim it either way; a sentence says how you use the tools.
5. **Elsewhere**: plain text links.
6. **Footer**: copyright and the last-updated date (it signals the site is maintained).

The dock gains **work** and becomes `home · work · projects · contact`.

---

## 6. Micro-interactions

Each one either answers something the visitor did or is the single load moment.

| # | Trigger | What happens | Timing | Reduced motion |
|---|---|---|---|---|
| 1 | **Page load (first visit per session)** | The board "boots": dots light column by column from left to right, characters resolve from random lit patterns into the real text, as an LED board refreshes. The one orchestrated moment | 900ms total, 18ms stagger per column, `steps()` easing (LEDs switch, they don't fade) | Board appears fully lit, no animation |
| 2 | Board idle | Line 1 cycles **English → Hindi → Telugu**, as station boards do. Transition is a column wipe (old text switches off left to right, new text switches on) | Every 4s, wipe 300ms. Pauses on hover/focus, when the tab is hidden, and after 3 full cycles (ends on Telugu) | Static Telugu greeting |
| 3 | Hover or tap the greeting | Jumps to the next language immediately, and a small caption under the board says which ("Telugu") | Same wipe | Instant swap |
| 4 | Pointer over the board (desktop) | Unlit dots within about 60px of the pointer glow faintly, like light catching the panel. Text is untouched | Follows the pointer, eased 80ms | Off |
| 5 | Clock | Seconds tick on the board | 1s | Unchanged (it's information) |
| 6 | Click a project row | The row opens downward: height animates, then the screenshot fades in. `＋` turns into `－`. The URL gains `#framecaption` so it can be shared opened | 220ms ease-out height, 120ms fade | Opens instantly |
| 7 | Hover a project row (desktop, closed) | The title shifts 4px right and the `＋` darkens: a hint that the row opens | 120ms | No shift |
| 8 | Click the email address | Copies it; the address is replaced by "Copied to clipboard" for 1.6s, then returns | 150ms crossfade | Instant swap |
| 9 | Hover a text link | Underline draws left to right | 160ms | Underline shown statically |
| 10 | Dock | The active section's pill slides to the new item (already built) | spring 500/40 | Jumps |
| 11 | Theme toggle | Circular reveal from the toggle (already built). The board doesn't change, because it's the same object in daylight | 700ms | Instant |
| 12 | Keyboard | `h` `w` `p` `c` jump to sections; `t` toggles the theme. A hint appears in the dock when it has keyboard focus | none | Same |
| 13 | Focus (keyboard) | 2px outline in Ink (not green: green means "on") | none | Same |

**Added after the first build (26 Nov 2026)**, each tied to the LED/board language or to a visitor action:

| Trigger | What happens | Reduced motion |
|---|---|---|
| Section title first scrolls into view | Title switches on left to right in 12 hard steps, from a dim "unlit" state | Shown lit, no mask |
| Work list first seen | Route line draws down from the top stop; the current role's lamp breathes slowly | Line shown, no breathing |
| Hover a closed project row (mouse) | A 288px screenshot preview follows the pointer, flipping to stay on screen | Shown, no scale/fade |
| Scroll down / up | Dock tucks away while reading down, returns on any upward scroll, near the ends, on focus, and never hides during its own jumps | Instant |
| Theme toggle | Icon turns half a turn | No turn |
| Board clock on narrow screens (no seconds) | Colon blinks each second, like a station clock | Steady colon |
| Press "Email me" or a dock item | Scales down slightly | No scale |
| Skills section first seen | Logo chips switch on one after another, 12 ms apart | Shown at once |
| Hover a skill chip | Chip brightens, its logo lifts 1px; the other chips in that group dim to 55% | No lift |
| Expertise list first seen | Items switch on in sequence, 40 ms apart; hovering one lifts its glyph into the text colour | Shown at once |

**Deliberately left out**, and why:
- No fade-up on each section as it scrolls in. The board boot is the one moment; repeating it everywhere dilutes it.
- No custom cursor, no magnetic buttons, no tilt cards.
- No playable game, neon sign or guestbook. They're fun on harshitr.me, but they compete with each other and with the work.
- No sound by default. (Possible later: an optional station chime toggle.)

---

## 7. Component inventory

| Component | Notes |
|---|---|
| `Board` | Real DOM text in Doto over a CSS dot-grid background (`radial-gradient`, pitch matched to Doto's dots). The name is the page `<h1>`. Boot and language-wipe animate a per-character clip so it stays crisp. The cycling greeting is `aria-hidden`, with a single static `lang="te"` greeting for screen readers |
| `Lamp` | The green "on" dot, used for availability, live sites and current job. One component so the meaning stays consistent |
| `Route` | Work timeline: vertical line plus stops, current stop lit |
| `ProjectRow` | Disclosure pattern (`<button aria-expanded>` plus a region). One row open at a time on mobile, any number on desktop |
| `CopyEmail` | Button that copies, with a polite live region announcing "Copied to clipboard" |
| `Section` | Exists. Title switches to Doto 24 sentence case, rules removed |
| `Dock` | Exists. Adds "work" and keyboard hints |
| `Clock` | Exists. Moves onto the board |

---

## 8. Self-review: what the first draft got wrong, and what changed

I compared the first draft against what a generic "developer portfolio" prompt produces, and revised these:

| First draft | Why it was a default | Revised to |
|---|---|---|
| Near-black page, bright green accent on links, buttons and focus rings | The most common generated dark look | Green is **only** LED light with one meaning ("on"); the page is cool graphite; links and focus use Ink |
| Geist Mono for dates, tags, labels, joined with "·" | Template chrome | Geist with tabular figures; spacing and alignment instead of separators |
| Projects as a 2-column grid of rounded screenshot cards with tag pills | The SaaS card kit | Timetable rows that open on click; screenshots on demand; stack as one sentence |
| 19-icon skills grid | Every portfolio has one; your favourites don't | One "Toolkit" sentence |
| Full-width ruled section headers | Broadsheet template | Space plus a Doto title; rules only inside lists where they separate rows |
| Fade-up entrance on every section | The generated-site tell | One boot moment on the board; everything else responds to the visitor |
| Doto as a wordmark for the name (as on gurbinder.dev) | Copies a reference | Doto as the lettering of a real object with a local meaning |
| Horizontal timeline (as on gurbinder.dev) | Copies a reference; cramped on mobile | Vertical route, current stop lit |

**The last accessory removed:** the first draft also had a scrolling news-ticker strip in the footer. That would be a second loud LED element, so it's gone.

---

## 9. What carries over from steps 1–3

| Already built | Status in this design |
|---|---|
| Pre-paint theme script, `ThemeToggle` with circle reveal | Kept as-is |
| Doto 900 self-hosted and preloaded | Kept: becomes the board lettering |
| Geist self-hosted | Kept; **Geist Mono removed** |
| Colour tokens in `index.css` | Re-valued to the palette above (same names, plus `housing` and `led`) |
| `Section`, `Dock`, `useActiveSection`, `sections.ts` | Kept; dock gains "work" |
| `Clock` (IST) | Kept; moves onto the board |
| 680px column | Becomes 640px text + 880px board |

---

## 10. What I need from you before building

1. **Confirm the brief** in §1 (who the site is for).
2. **Intro**: 2–3 sentences in your own voice.
3. **Work history**: company, role, dates, one specific line each.
4. **One number per project** (users, speed, size, stars, anything true).
5. **Résumé** link or PDF.

## 11. Suggested build order

1. ✅ Board prototype on its own (boot, language wipe, dots, clock), reviewed in both themes and on mobile, **before** anything else. Built as `src/components/board/`. Greeting bitmaps: English hand-drawn, Hindi and Telugu rasterised from Noto Sans (OFL) at 16 rows. On narrow screens the name stacks onto two lines.
2. ✅ Re-value tokens; drop Geist Mono; restyle `Section`.
3. ✅ Intro and contact (copy email).
4. ✅ Work route.
5. ✅ Project rows and screenshots.
6. ✅ Toolkit, Contact (replaces "Elsewhere"), footer; dock gains "work" and keyboard keys.
7. Reduced-motion pass, performance and SEO, then the "done when" checks in `redesign-plan.md`.
