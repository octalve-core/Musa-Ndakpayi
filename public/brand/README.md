# Approved Musa Usman Ndakpayi campaign brand assets

Upload the **original, unmodified** PNG images to this folder with these exact filenames:

| Source supplied | Repository filename | Used by |
|---|---|---|
| `MUN logo 1.png` (1420 × 476) | `mun-header.png` | SiteHeader, all widths |
| `MUN logo and tag.png` (1066 × 180) | `mun-footer-2027.png` | SiteFooter, all widths |
| `MUN logo Ico.png` (964 × 963) | `mun-icon.png` | Next.js favicon and touch icon metadata |

All three should remain transparent-background PNGs, without colour edits, forced crops or distortion.

The header image is fitted in the former temporary monogram/name region at **144 × 40 CSS pixels**.
The footer image is fitted within a **183 × 44 CSS pixel** white-backed tile so the artwork's original navy text remains readable on the existing charcoal footer.
Both use `object-contain` and their real source dimensions, preserving aspect ratio.

The Next.js site references the three exact URLs:
- `/brand/mun-header.png`
- `/brand/mun-footer-2027.png`
- `/brand/mun-icon.png`

Do not merge the branding code until all three PNGs are present in `public/brand/`. Do not change page copy or other imagery during this branding replacement.

Other future assets, separately approved:
- `candidate-portrait.webp` (authentic approved high-resolution portrait)
- `candidate-hero.webp` (approved landscape campaign image)
- `party-mark.webp` (party mark only with usage permission)
