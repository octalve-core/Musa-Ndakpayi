# Chanchaga membership registration / super admin release checklist

## Live configuration update — 24 November 2026
- Dedicated project `dawn-rice-17373994`, database `mun_members`, tables verified. The real `superadmin` has been seeded; password change remains mandatory on first login.
- Vercel project `octalve-vault/musa-ndakpayi` is accessible and production `DATABASE_URL`, `ADMIN_CSRF_SECRET`, `REGISTRATION_HASH_SECRET`, `CRON_SECRET` and `PRIVACY_RETENTION_DAYS=365` have been configured.
- **Turnstile is optional.** `TURNSTILE_ENABLED=false` allows standard consent-based registration without a Cloudflare widget. Server-side location validation, strict origin checks, the hidden honeypot, a ten-per-hour visitor-IP limit, a three-per-day contact-phone limit, and duplicate flags remain enforced.
- To enable the external widget later: add `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `TURNSTILE_ALLOWED_HOSTNAMES` then set `TURNSTILE_ENABLED=true` and redeploy. Incomplete credentials block the public registration gate.
- Sensitive political-affiliation information is hosted in Frankfurt, Germany. Verify the privacy-contact email is monitored and the cross-border transfer/privacy safeguards are appropriate before promoting the registration programme.
- Registration becomes active only when `MEMBERSHIP_OPEN=true`, `PRIVACY_CONTROLLER_NAME`, `PRIVACY_CONTACT_EMAIL`, and all other non-Turnstile security settings are present and the seeded admin/database respond. No fake success on failures.


## Dedicated Neon database — provisioned 24 November 2026

- **Neon project:** Musa Ndakpayi Campaign Members (project ID `dawn-rice-17373994`).
- **Owner:** user-managed Neon organisation `Octalve Vault`; this is a **new standalone project**, not the existing Octalve Vault or Octalve Cloud database.
- **Region:** `aws-eu-central-1` (Frankfurt, Germany); PostgreSQL 18.
- **Default branch:** `br-young-wind-bgt8bjb4` (`main`).
- **Database and owner role:** `mun_members` / `mun_app`.
- **Migration status:** all five tables in `scripts/schema.sql` tested on a temporary branch, applied to the default branch and verified. Temporary branch cleaned up.
- **Records:** no demo member records were inserted during setup. The administrator account has now been seeded and Neon-verified.
- **Vercel status:** the connector now has access to `octalve-vault/musa-ndakpayi`, and production sensitive secrets are configured on that project only.
- **Release flag:** `MEMBERSHIP_OPEN` is the controlled production release switch. Turnstile is not compulsory; all other required checks still apply.


## Current scope
- One public registration route `/register` (every registration is a MEMBER; no public approval queue or member accounts).
- Eleven authentic Chanchaga wards, 379 polling unit options from an INEC-derived 2023 dataset. CSV/JSON source: `data/chanchaga-polling-units.json`. **Reconcile against INEC before the next election.**
- Adults-only explicit campaign membership consent; optional contact consent (never preselected); assisted registration with explicit permission.
- Optional Cloudflare Turnstile (feature flag), independent per-IP/per-phone database throttles, origin/CSRF protection and honeypot; registration closed by default until switched on.
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
5. Turnstile is **optional** while `TURNSTILE_ENABLED=false`. When using it later, provision site and secret keys, configure `TURNSTILE_ALLOWED_HOSTNAMES`, set `TURNSTILE_ENABLED=true` and redeploy. Never treat missing widget keys as permission to bypass a challenge when `TURNSTILE_ENABLED=true`.
6. Add **Production** Vercel encrypted env variables (do not expose values):
    `DATABASE_URL`, `ADMIN_CSRF_SECRET`, `REGISTRATION_HASH_SECRET`, `CRON_SECRET`,
    `TURNSTILE_ENABLED=false` (optional; keys and allowed hostnames only when enabled),
    `PRIVACY_RETENTION_DAYS` (e.g. 365), `PRIVACY_CONTROLLER_NAME`,
    `PRIVACY_CONTACT_EMAIL`, and initially `MEMBERSHIP_OPEN=false`.
    Generate independent strong 32+ character secrets (not the same password).
7. Confirm the real public domain, privacy-controller identity, external-storage location and retention procedures. Campaign affiliation is sensitive personal data under Nigeria's Data Protection Act 2023. Validate permitted processing, safeguards and transfer rules before opening the public form.
8. Deploy to a controlled staging or production deployment. Verify that optional Turnstile is not required when disabled; run request validation tests without storing bogus personal records. A real end-to-end consenting adult registration must be independently observed later. Verify dashboard, filters, CSV, logout, forced password rotation, deletion, duplicate flag and cron secret; do not invent successes.
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
- The registration API fails closed if the Neon tables, seeded admin, secrets, privacy config, retention job secret or membership-open toggle are absent. If `TURNSTILE_ENABLED=true`, it also fails closed without a fully configured Turnstile.
- Photo folders should not contain identifying pictures of detained/vulnerable people without lawful rights/permissions.

## Daily retention
Vercel's `vercel.json` schedules `GET /api/maintenance/retention` once per day at 03:00 UTC. Vercel sends `Authorization: Bearer $CRON_SECRET`; the endpoint rejects requests without the exact secret. It deletes members older than the configured `PRIVACY_RETENTION_DAYS` and expired rate limits and sessions. Exported files held by admins must also be deleted according to the campaign's retention policy.

## Deployment gate
Do **not** share a randomly invented admin username/password as if it has already been seeded. Verify the dedicated Neon project, Vercel env linkage and real login first. A GitHub PR/build does not prove live operation.
