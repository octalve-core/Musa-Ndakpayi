# Musa Usman Ndakpayi — Chanchaga 2027

The official candidate's public-facing campaign website for Chanchaga Federal Constituency, Niger State. Built by Octalve Holding with Next.js 16 App Router, React 19, TypeScript, Tailwind 4, and pnpm.

## Run locally
1. corepack enable
2. pnpm install
3. pnpm dev
4. Open http://localhost:3000

## Features
- Three-slide original campaign photo hero and authentic candidate portrait photo slot, with original campaign-mark fallback until images are supplied.
- Automatic gallery albums: each subfolder under public/gallery becomes a named gallery; its card previews four representative photos, with equal-sized photo cards and an accessible original-aspect lightbox.
- Existing candidate profile, public priorities, news and contact details.
- Public member registration in Chanchaga only; 11 electoral wards, 379 actual ward-specific polling units. Server revalidates location relationships.
- Optional assisted registration, voluntary adult consent to campaign affiliation, independently optional communication consent, anti-bot protection, rate limits and fail-closed submission.
- Seeded username/password admin (first sign-in requires password change), protected dashboard with actual counts, member search, ward/PU/date filters, CSV export, individual records and audited deletion. No Google OAuth.
- Dedicated Neon Postgres schema; daily protected cleanup for privacy retention.

## Exactly where to put photographs
Home hero (three photos):
- public/images/hero/slide-01.webp
- public/images/hero/slide-02.webp
- public/images/hero/slide-03.webp

Candidate photo (also used on About):
- public/images/candidate/candidate-portrait.webp

Albums:
- public/gallery/visit-to-prisoners/DSC_0001.jpg
- public/gallery/community-outreach/IMG_1234.webp
- public/gallery/[another activity name]/[any picture name].png

Create folders as needed. Filenames can be JPG/JPEG/PNG/WebP/AVIF; new image or album folders require no edits to React source. The four special hero/candidate slots can use .jpg, .jpeg, .png, .webp or .avif — keep the same base name and only one format per slot. Generate index with pnpm media:build. Both pnpm dev and pnpm build automatically regenerate it. On a Vercel Git-linked project, a subsequent push and build will publish new photo folders.

Read docs/PHOTO-UPLOADS.md for full photo instructions and precautions concerning pictures of vulnerable or detained individuals.

## Registration and database
Read docs/MEMBERSHIP-SETUP.md completely before starting registration. The member database MUST be a dedicated Neon project linked to the Musa Ndakpayi Vercel project, not an unrelated Octalve project. Apply scripts/schema.sql to that project and seed only over an authenticated, private environment (scripts/seed-admin.mjs). The temporary seed password never goes into Git or website code.

.env.example lists the required key NAMES and safe flags; never commit real values. MEMBER registration remains CLOSED until:
- A dedicated Neon database, schema and seeded active admin are verified.
- The correct Vercel project contains its encrypted DATABASE_URL.
- Admin CSRF and registration-hash keys are configured; Cloudflare Turnstile is optional and enabled later only when TURNSTILE_ENABLED=true and its site key, secret and host allowlist are present.
- The controller/privacy contact settings, 365-day retention and scheduled cleanup secret are configured. Political membership is sensitive personal data, and international storage requires adequate safeguards and transparent consent.
- End-to-end registration, administration and deletion have been tested.

The current GitHub integration does not on its own prove that these live services are configured.

Admin routes: /admin/login, /admin/change-password, /admin/members, /admin/members/[reference].

## Quality checks
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e

Automated GitHub CI: .github/workflows/ci.yml.
The initial site remains non-indexable until final production sign-off.

## Editorial and photo rights
Do not invent membership totals, political achievements, event dates, or credentials. Only publish campaign photos with consent and publication rights, especially images involving detainees, children, health information or vulnerable people.
