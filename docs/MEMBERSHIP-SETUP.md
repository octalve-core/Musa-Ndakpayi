# Chanchaga membership registration / super admin release checklist

## Current scope
- One public registration route `/register` (every registration is a MEMBER; no public approval queue or member accounts).
- Eleven authentic Chanchaga wards, 379 polling unit options from an INEC-derived 2023 dataset. CSV/JSON source: `data/chanchaga-polling-units.json`. **Reconcile against INEC before the next election.**
- Adults-only explicit campaign membership consent; optional contact consent (never preselected); assisted registration with explicit permission.
- Cloudflare Turnstile server-side hostname verification, IP rate limit and honeypot; registration closed by default.
- One dedicated Neon Postgres database, a seeded superadmin with salted scrypt password, first-login password change, revocable HttpOnly sessions, CSRF-guarded exports/deletion.
- Dashboard: real counts, ward and polling-unit filters, date range, search, paginated detail pages, CSV export, member deletion and audit log.
- Vercel daily retention cron removes expired members and unused rate/session rows, with a required CRON_SECRET.

## Critical: account connections
The current Vercel connection must have access to the **Musa Ndakpayi** project. Do not connect this app to the unrelated Octalve Invoice, Octalve Vault or Octalve Cloud databases.

1. Create or select a **dedicated** Neon Postgres project in the Octalve Vercel team via **Vercel Storage / Marketplace → Neon** (a fresh database for campaign members).
2. Link the Neon integration to the actual **Musa Ndakpayi Next.js project**, with one separate `DATABASE_URL` secret. Prefer a pooled serverless connection for request queries; migrations use direct.
3. Run `scripts/schema.sql` exactly once on **that** Neon database in Neon SQL editor; schema creation is additive.
4. Use a secret manager or a private PowerShell environment (not a committed file) to seed the first admin account:
    ```powershell
$env:DATABASE_URL = "<dedicated Neon project connection string>"
$env:ADMIN_SEED_USERNAME = "superadmin"
$env:ADMIN_SEED_PASSWORD = "<random 20+ character one-time password>"
pnpm seed:admin
Remove-Item Env:ADMIN_SEED_PASSWORD
Remove-Item Env:ADMIN_SEED_USERNAME
Remove-Item Env:DATABASE_URL
```
    The seed inserts only when the username does not exist; it never silently overwrites an existing administrator. Password is **never** written to GitHub or printed to logs. The first successful sign-in requires the password to be changed.
5. Configure an official Cloudflare Turnstile widget for the exact domain and obtain **site key** and **secret key**. Add production hostname(s) to `TURNSTILE_ALLOWED_HOSTNAMES` and verify the token in the deployed environment.
6. Add **Production** Vercel encrypted env variables (do not expose values):
    `DATABASE_URL`, `ADMIN_CSRF_SECRET`, `REGISTRATION_HASH_SECRET`, `CRON_SECRET`,
    `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `TURNSTILE_ALLOWED_HOSTNAMES`,
    `PRIVACY_RETENTION_DAYS` (e.g. 365), `PRIVACY_CONTROLLER_NAME`,
    `PRIVACY_CONTACT_EMAIL`, and initially `MEMBERSHIP_OPEN=false`.
    Generate independent strong 32+ character secrets (not the same password).
7. Confirm the real public domain, privacy-controller identity, external-storage location and retention procedures. Campaign affiliation is sensitive personal data under Nigeria's Data Protection Act 2023. Validate permitted processing, safeguards and transfer rules before opening the public form.
8. Deploy to a controlled staging or production deployment. Test one consenting adult registration with a real valid ward / polling unit and working Turnstile; confirm a record appears in the admin dashboard; test filters, CSV, logout, forced password rotation, deletion, duplicate flag and cron secret. This MUST NOT be treated as a successful live deployment until actually observed.
9. Set `MEMBERSHIP_OPEN=true` in Production only after every checkpoint passes, then redeploy. No fake success response: the registration API returns 503 until all prerequisites are ready.

## Admin paths
- `/admin/login` — username and password
- `/admin/change-password` — required first-login rotation
- `/admin/members` — real KPIs, filters, pagination, export
- `/admin/members/<reference>` — private record and audited deletion

## Security/privacy notes
- This form is **NOT** INEC voter registration and does not modify the electoral register.
- Visitors consent to processing that exposes their political membership, independently of optional campaign messages.
- Admin passwords are salted scrypt hashes; sessions are database-backed and expire after eight hours; admin export/delete actions have CSRF and origin checks.
- Do not add public lists of names or polling-unit assignments.
- The registration API fails closed if the Neon tables, seeded admin, secrets, privacy config, Turnstile, retention job secret or membership-open toggle are absent.
- Photo folders should not contain identifying pictures of detained/vulnerable people without lawful rights/permissions.

## Daily retention
Vercel's `vercel.json` schedules `GET /api/maintenance/retention` once per day at 03:00 UTC. Vercel sends `Authorization: Bearer $CRON_SECRET`; the endpoint rejects requests without the exact secret. It deletes members older than the configured `PRIVACY_RETENTION_DAYS` and expired rate limits and sessions. Exported files held by admins must also be deleted according to the campaign's retention policy.

## Deployment gate
Do **not** share a randomly invented admin username/password as if it has already been seeded. Verify the dedicated Neon project, Vercel env linkage and real login first. A GitHub PR/build does not prove live operation.
