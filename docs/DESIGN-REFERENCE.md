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
| 07 | Campaign gallery | A credited constituency image and a publication-ready gallery layout; campaign images await approvals |
| 08 | Manifesto download and AI assistant CTA | Agenda CTA; downloads/chat not simulated |
| 09 | Follow campaign and subscription banner | Public participation CTA; no unimplemented email capture |
| 10 | Full footer, navigation and legal strip | `SiteFooter` |
| 11 | About hero plus candidate introduction | /about |
| 12 | About page core values platform cards | /about and /platforms |
| 13 | Final platform preview and footer | /about and /platforms |
| 14 | Platform overview and tabs | `AgendaTabs` with keyboard controls and hash deep links |
| 15 | Last legislative pillar and footer | /manifesto |
| 16 | Events filtering and empty state | /events (no unverified dates) |
| 17 | News search/filter grid | `NewsList` |
| 18 | News continuation / grid density | `NewsList` |
| 19 | Photo gallery albums | /gallery; publish only licensed imagery |
| 20 | Contact layout and enquiry form | /contact; no false form submission |

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

## Responsive validation

Playwright browser tests run on pull requests at 320, 375, 430, 768, 1024, 1280, 1440 and 1920px, visiting all nine public routes at each width and recording a homepage screenshot per width. A working production build is used as the test server; browser artifacts can be downloaded from the CI run. The tests also cover mobile menu focus/closing, agenda deep links and sourced-news filtering.
