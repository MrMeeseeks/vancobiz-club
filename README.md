# VancoBiz Club · Members (design prototype)

A static prototype of the Club members page: black and gold, engraved gold-foil member
cards, same stack and design tokens as the main site
([MrMeeseeks/vancobiz](https://github.com/MrMeeseeks/vancobiz)): Next.js 16 App Router,
TypeScript, Tailwind 4, Syne ExtraBold + Inter, obsidian `#09090B` ground, 28px card radius,
rounded-full buttons. Gold replaces the main site's orange/purple accents.

No login, no database. Everything comes from `data/members.json`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Edit members

`data/members.json` is a list of members:

```json
{
  "name": "Zohreh Parsaeian",
  "category": "Gold and Jewelry",
  "phone": "604 555 0100",
  "instagram": "@handle",
  "photo": "/members/zohreh.jpg"
}
```

- `name` and `category` are required.
- `phone`, `instagram` and `photo` are optional. Leave a field out and the card hides it.
- `instagram` takes `@handle`, `handle` or a full instagram.com URL.
- `photo`: put the image in `public/members/` and reference it as `/members/file.jpg`.
  A square image of at least 300 x 300 px works best. With no photo, the medallion
  shows the member's initials.

## The Club logo

`public/vbc-logo.png` is the Club logo, used unchanged. The current file was taken from
vancobiz.com. Replace it with your master file if you have one (same name).

## Porting the card to WordPress / Elementor

The card is plain HTML + CSS on purpose.

1. **Patterns, once per page.** Render the page locally, open it in the browser,
   inspect the first hidden `<svg>` right after `<body>` (it holds `<defs>` with
   `vbc-foil`, `vbc-glow`, `vbc-rays`, `vbc-guilloche`, `vbc-border-motif` and `vbc-frame`),
   copy its outer HTML and paste it into an Elementor **HTML** widget at the top of the page.
   Every card references these by id, so they must appear exactly once.
2. **CSS.** Paste `components/member-card/member-card.css` into
   *Appearance → Customize → Additional CSS* (or the page's custom CSS). Every class is
   prefixed `vbc-card`, so it won't collide with the theme.
3. **One card per member.** Copy a rendered `<article class="vbc-card">…</article>` from
   the page and paste it into an HTML widget (or an Elementor loop item template), then
   change the name, category, initials or `<img>`, phone and Instagram link.
4. **Fonts.** The CSS uses Syne (800) and Inter. Add them with Elementor's custom fonts or a
   Google Fonts link. Without them it falls back to the system sans-serif.
5. **Tilt and light (optional).** `components/member-card/member-card-tilt.js` is plain JS
   with no dependencies. Remove the `export` keyword, paste it into a footer script
   (or an HTML widget inside `<script>…</script>`) and add `vbcCardTilt();` after it.
   Without the script the cards still look right; they just don't tilt.

The tilt and moving light run only with a mouse and are off for touch screens and for visitors
with "reduce motion" enabled. The script only sets CSS variables (`--vbc-rx`, `--vbc-ry`,
`--vbc-mx`, `--vbc-my`, `--vbc-angle`, `--vbc-ring`, `--vbc-on`); everything visual is in the CSS:

- the card leans toward the cursor (up to 9°, like the main site's service cards)
- a glare spot follows the cursor across the plate
- a warm foil band shifts angle and position, so different parts of the engraving light up
- a glint runs around the ornamental border on the side facing the light
- the medallion ring glows as the cursor gets close to it

## Accessibility

- Text sits on the dark card body, never gold on gold: names `#F9F9F9`, categories
  `#B9B9C0` (9.6:1) and links `#F3D98B` (12.6:1) on `#121214`, all above WCAG AA.
- Links are real `<a>` elements with a visible gold focus ring. Photos need alt text
  (generated from the member's name). The decorative SVG is hidden from screen readers.
