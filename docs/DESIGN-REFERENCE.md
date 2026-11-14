# KOH2027 design reference map

User provided 20 screenshots from koh2027.ng as **visual style references**. The design is intentionally reimplemented as original components, not copied site code, party branding, candidate photos, political claims or testimonials.

## Reference set and interpretation

| Reference | Theme | Local component or page |
|---|---|---|
| 01 | Desktop hero — header, image overlay, arrows, progress | `SiteHeader`, `HeroCarousel` |
| 02 | About section — two columns, supporting image | Homepage About section |
| 03 | Three featured pillars/cards | `PolicyCard` preview |
| 04 | Achievement counters / section transitions | **Replaced** with sourced description of House duties; no fabricated metrics |
| 05 | Latest news cards | `EditorialCard`, published-source links |
| 06 | Testimonials carousel | **Excluded** until named, consented, attributable statements supplied |
| 07 | Campaign gallery | Photo archive layout; publish only licensed/approved imagery |
| 08 | Manifesto download and AI assistant CTA | Agenda CTA; downloads/chat not simulated |
| 09 | Volunteer/subscribe banner | Public participation CTA; no unimplemented email capture |
| 10 | Social-follow panels | Omitted pending verified handles |
| 11 | Dark structured footer | `SiteFooter` |
| 12 | Footer social and legal strip | `SiteFooter` |
| 13 | About hero plus candidate introduction | /about |
| 14 | Six platform cards | /about and /platforms |
| 15 | Last platform plus footer | /platforms |
| 16 | Pillar tabs with descriptions | `AgendaTabs` |
| 17 | Last pillar and document links | /manifesto |
| 18 | Events filtering and empty state | /events (no unverified dates) |
| 19 | News search/filter grid | `NewsList` |
| 20 | Campaign gallery albums and contact forms | /gallery, /contact; no false form submission |

## UI implementation standards

- Distinct Ndakpayi wordmark, not the KOH logo; real logo will replace initials once approved.
- Primary `#073F86`, gold `#FFB71B`, green `#18A65B`, red `#C92230`.
- Containers: maximum 1280px, 20px mobile padding, 32px tablet and 48px desktop.
- White/soft-gray section alternation, 12px radius cards, gentle shadow, minimal gradients.
- Most typography uses medium/semibold weights, controlled line lengths, quiet metadata.
- Mobile: 2-column navigational menu, stacked cards and features, 48px minimum actions, no horizontal clipping.
- Prefer Tailwind CSS 4 utilities and strict TypeScript, Lucide icons; no CSS modules or component file >500 lines.
- No invented counters, testimonials, candidate imagery or backend success.
- Verify 320, 375, 430, 768, 1024, 1280, 1440 and 1920px widths.

### Reference screenshots archive

`Musa-Ndakpayi-KOH-Design-References.zip` was generated from the user-provided screenshots with a contact sheet, 20 PNG images and an index. The downloadable ZIP is delivered in the conversation and can be supplied to the next chat. The full original images are **not stored in GitHub** in this initial commit. To preserve them for future development in the repository, upload the ZIP to a private design-reference location with the proper permissions.

## Media attribution

Minna City Gate photo by F5pillar, Wikimedia Commons, [CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Minna,_Niger_state_City_gate.jpg), used with gradient overlays/cropping. Replace with approved candidate portraits and locally hosted photo assets as soon as supplied. Retain required attribution for Creative Commons imagery.
