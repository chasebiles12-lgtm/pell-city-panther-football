# Cloudflare migration (in progress)

This branch is a working copy of the AppDeploy portal, **not a production-ready deployment**.

Required before publishing:
1. Replace `@appdeploy/client` in `src/main.tsx` with a same-origin API client.
2. Implement the `/api/*` routes in `cloudflare/worker.ts` using Cloudflare D1 and R2.
3. Migrate the live roster, settings, uploaded images and school logos. Existing AppDeploy signed image URLs are temporary and cannot serve as a permanent migration.
4. Configure administrator authentication and server-side authorization for all write endpoints.
5. Verify public player views, images, edits, and uploads before switching URLs.

Do not deploy this branch yet.
