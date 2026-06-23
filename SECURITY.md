# Security

The `/admin` panel writes site content. It is protected by:

- A password (PBKDF2 hash stored as `ADMIN_PASSWORD_HASH`).
- A magic link sent to `ADMIN_EMAIL` after a correct password, valid for 10 minutes, single-use.
- A signed session cookie (JWT, HS256, `ADMIN_SESSION_SECRET`) plus a server-side session record in Upstash Redis (`session:<sid>`).
- Rate limits via `@upstash/ratelimit` on every admin endpoint.
- An `Origin` header check on every state-changing request.

## Env vars

Set in Vercel Production + Preview (never client-side):

- `ADMIN_PASSWORD_HASH` — generate with `node scripts/hash-password.mjs`
- `ADMIN_SESSION_SECRET` — 32+ random bytes (the script prints one)
- `ADMIN_EMAIL` — destination for magic links
- `RESEND_API_KEY` — from https://resend.com (free tier is fine)
- `RESEND_FROM` — optional sender. Defaults to Resend's onboarding sender (sufficient for personal use).
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — already set for visitor counter

## Rotation

| What | How | Effect |
|------|-----|--------|
| Password | Re-run `node scripts/hash-password.mjs`, update `ADMIN_PASSWORD_HASH` in Vercel | Old password no longer works |
| Session secret | Replace `ADMIN_SESSION_SECRET` in Vercel | **Logs out every session, including yours** |
| All pending magic links | In Upstash, delete keys matching `magic:*` | All outstanding links are invalidated |
| All sessions | In Upstash, delete keys matching `session:*` | Same as rotating session secret |

## Incident response

If you suspect compromise:

1. Rotate `ADMIN_SESSION_SECRET` in Vercel → forces re-login everywhere.
2. Rotate `ADMIN_PASSWORD_HASH` → invalidates the password.
3. Delete `magic:*` and `session:*` keys in Upstash.
4. Audit recent content writes via Vercel function logs and the contents of `content:*` keys.
5. Check `audit:login` (Redis list) for failed login traces.

Content can be reverted by deleting the corresponding `content:<section>` key in Upstash — pages fall back to the defaults baked into `lib/content/defaults.ts`.

## What's intentionally out of scope

- No relational DB → no SQL injection.
- No file uploads → no path traversal or image-processing RCE. Images are referenced by URL only.
- No public registration / password reset → no account-enumeration or recovery-flow abuse.
- No third-party OAuth → no upstream token leakage.

## Reporting

Email `rishaanjain188@gmail.com` if you find a security issue. Please do not file a public GitHub issue.
