# Jules Niyomwungeri: portfolio

A one-page portfolio built as a black-and-white handheld: a brick-game LCD screen and an old-phone
keypad. Every letter, icon and line on the device is drawn from square pixels. Only the page around it is a
plain grey background.

Built with Vite, React, TypeScript and Sass. No other runtime libraries.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-check and production build into dist/
pnpm preview    # serve the production build
pnpm lint
```

(`npm install` / `npm run dev` work too.)

## Use it

- Keypad `1` About, `2` Skills, `3` Projects, `4` Contact, `0` Home. The keyboard digits do the same.
- `◀` / `▶` (or the keyboard left/right arrows) step through the screens.
- `▲` / `▼` scroll the screen. The mouse wheel also scrolls it, one text line at a time.
- Each screen has its own link: `/#about`, `/#projects`, ...

## Edit the content

All text lives in **`src/content.ts`**. Anything in `[square brackets]` or pointing at `example.com` /
`your-username` is a placeholder.

- **Projects:** edit the three entries in `screens.projects.items`. Each has a pixel icon (`icon`).
- **Contact:** replace the `href` and `display` values of the email, GitHub and LinkedIn links.
- **Name on the home screen:** `screens.home.nameLines`, one entry per line. Lines are drawn big when they
  fit and smaller (or split) when they do not.
- **Key labels:** each screen's `keyLabel`. Keep them to 6 letters at most, so they fit on a phone key.
- The pixel font has capitals only, so text shows in capitals. Screen readers still read it as you wrote it.
  Supported: A–Z, 0–9 and common punctuation. Unknown characters show as `?`.
- **Icons:** names you can use (`heart`, `mail`, `database`, `folder`...) are the sprites in
  `src/common/pixel/pixelIcons.ts`. To add one, draw it there with `#` for lit pixels.
- **Colours:** all in `src/styles/_theme.scss`.

## How it is put together

```
src/
  content.ts                       all editable text
  common/pixel/                    5×7 bitmap font, icon sprites, brick-game blocks, grid → SVG helpers
  components/                      PixelText, PixelParagraph (wrapping pixel text), PixelIcon, DriftLayer
  views/home/device/               Handheld (casing), LcdScreen, Keypad, useScreenNavigation
  views/home/screens/              Home, About, Skills, Projects, Contact screens
  styles/                          theme (colours), Sass tokens/mixins, base styles
```

- **The page is a dot-matrix screen.** One fixed grid of 4px cells starts at the page's top-left corner; each
  cell is either a lit pixel (a 3px square in some colour) or empty. Everything (letters, icons, borders,
  fills, shadows, focus ring) is drawn as solid shapes covering whole cells, and one mask over the page
  (`.dot-matrix` in `src/styles/_base.scss`) cuts every cell down to its pixel. So no pixel can be bigger,
  smaller or out of line.
- **Rules that keep shapes on whole cells:** every size, padding, gap, border and offset is `px(n)` in Sass;
  widths that depend on the screen are rounded down to the grid; big text uses 2×2 pixels per letter dot;
  scrolling the LCD snaps to whole pixels. `PIXEL_SIZE` in `src/common/pixel/pixelSize.ts` and `$pixel` in
  `src/styles/_tokens.scss` must match.
- There are no smooth animations. Keys jump when pressed, the prompt blinks, the screen scrolls by whole
  lines, and the background icons drift in 4px steps.
- Accessibility: all keys are real `<button>`s, all links are real `<a>`s, and the focus ring is dashed and
  visible. Every pixel drawing has real text for screen readers. Screen changes are announced. With
  `prefers-reduced-motion`, the blink and the drift stop.
