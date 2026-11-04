# Realtask

Phone-first PWA task tracker for college, personal tasks, deadlines, and weekly planning.

## Run locally

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The Firebase client config is read from environment variables. Add the Sarvam key only as a server-side Vercel variable; it must not be prefixed with `VITE_` or bundled into the browser.

Authentication supports Google and email/password. In Firebase Console, open Authentication → Sign-in method and enable Google and Email/Password before testing sign-in.

## Shared backend model

All frontends should use the same Firestore collections: `users`, `tasks`, `classes`, and `roadmaps`. Tasks should carry `ownerId`, `title`, `type`, `startAt`, `dueAt`, `status`, and `sharedWith`. Firebase Security Rules should enforce owner access by default and explicit access through `sharedWith`.

## Deploy

Import the repo into Vercel, set the `VITE_FIREBASE_*` variables, and add `SARVAM_API_KEY` as a server-side environment variable for the future assistant endpoint.
