# Usman Musa Ndakpayi — Chanchaga 2027

An original, mobile-first public-information website for Usman Musa Ndakpayi, INEC-listed NDC House of Representatives candidate for Chanchaga Federal Constituency, Niger State.

Built by **Octalve Holding** using **Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4 and Lucide**.

## Run locally

```bash
corepack enable
pnpm install
pnpm dev
```

Visit http://localhost:3000. Production validation:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Current scope

- Homepage: immersive responsive hero with manual/automatic slides, reusable action cards, about section, priorities, accountable-legislation section, cited news and public-info CTA.
- Public pages: /about, /platforms, /manifesto, /events, /news, /gallery, /contact, /privacy.
- Responsive desktop/mobile navigation, accessible keyboard interactions, visible focus and reduced-motion-aware slideshow.
- No fabricated campaign statistics, event dates, testimonials, biographies, portrait images or social handles.
- No misleading form success: **this initial release does not collect volunteer sign-ups, newsletters or contact submissions**.
- No backend or database required for initial public pages.
- Search/filters on /news operate only in browser.
- All sources and candidate statement limits documented in [Research Notes](docs/RESEARCH.md).

## Structure

```
app/                  Routes and Tailwind global foundation
components/ui/        Reusable Container, SectionHeading, PolicyCard, EditorialCard, ActionCard, PageHero, ButtonLink
components/layout/    Responsive header and footer
components/home/      HeroCarousel and federal-representation explanation
components/agenda/    Interactive agenda tabs
components/news/      Client-side searchable published record
lib/                  Verified site facts, sourced content and design tokens
docs/                 Research, design references, content signoff, deployment and continuation instructions
tests/                Source and route guardrails
```

## Design system

KOH2027 was supplied as a **layout and spacing reference**, not a source of imagery, code, party identity, statistics, testimonials or campaign claims. See [Design Reference Guide](docs/DESIGN-REFERENCE.md). Colors: blue `#073f86`, gold `#ffb71b`, green `#18a65b`, red `#c92230`, with white surfaces and generous max-width 1280px.

The screenshots have been preserved together as a separately downloadable user-supplied design reference ZIP. They are **not committed to GitHub** (20 images ~7.5MB); upload only if authorised and necessary, into a private reference location. Image credits and intellectual-property notes are in the design guide.

## Accuracy and publication

INEC lists the candidate as **USMAN MUSA NDAKPAYI**; avoid substituting an informal name in election records. The policy options listed on the site are clearly separated from published candidate statements. A campaign-signed final manifesto has **not** been supplied.

Site indexing is disabled until the candidate approves content, a permanent domain is configured, and privacy/contact details are final.

## Next phase

Follow [Continuation Prompt](docs/CONTINUATION-PROMPT.md) and [Content Signoff](docs/CONTENT-SIGNOFF.md). Do not push a Vercel Preview for every commit; connect and promote Production once the repository passes CI and content is approved.
