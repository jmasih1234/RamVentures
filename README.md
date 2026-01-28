# Ram-Venture-Labs
Creating Venture Incubators in the local NoCo Area
## Overview
This repository contains an MVP Next.js app for a university incubator modeled after Y Combinator. It centralizes student startups and senior design projects.

## Features (MVP)
- Ventures directory with filters (skill, major, stage)
- Project pages with open roles and contact/apply
- Pathways for user types (Explorer, Entrepreneur, Civic, Creative, Intrapreneur)
- Alumni mentor & investor signup forms
- Events and demo day listings
- Admin dashboard to add/edit projects and events

## Local setup

Prerequisites: Install Node.js (includes npm). On macOS you can use Homebrew or download from nodejs.org.

Homebrew:

```bash
brew install node
```

Or download and install from:

https://nodejs.org/

1. Install dependencies:

```bash
npm install
```

2. Create a Supabase project and a table `ventures` and `events`. Set environment vars in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Run dev server:

```bash
npm run dev
```

## Docker (optional)
You can build and run the app with Docker. The compose setup reads environment variables from `.env.local`.

Build and run with Docker:

```bash
# build image
docker build -t university-incubator .

# run container (uses the standalone build)
docker run --env-file .env.local -p 3000:3000 university-incubator
```

Or with docker-compose:

```bash
docker compose up --build
```

After starting, open http://localhost:3000

Notes:
- The Dockerfile uses Next.js `output: 'standalone'` to produce a smaller runtime image.
- If you see build errors around `npm run build`, ensure `NEXT_PUBLIC_SUPABASE_*` variables are set in `.env.local`.

### Install Docker Desktop (macOS)
If you don't have Docker installed, install Docker Desktop for macOS.

Homebrew:

```bash
brew install --cask docker
open /Applications/Docker.app
```

Or download from:

https://www.docker.com/products/docker-desktop

After installing, ensure Docker Desktop is running (check the whale icon in the menu bar) and verify:

```bash
docker --version
docker compose version
```

Then build and run the app:

```bash
docker compose up --build
```

Or build and run the image directly:

```bash
docker build -t university-incubator .
docker run --env-file .env.local -p 3000:3000 university-incubator
```

## Deploy to Netlify
This project is compatible with Netlify's Next.js support. The repository includes `netlify.toml` which uses `@netlify/plugin-nextjs`.

Steps to deploy:

1. Push the project to a Git provider (GitHub/GitLab/Bitbucket).
2. In Netlify, select "New site from Git" and connect your repo.
3. In the site settings set the build command to `npm run build` and publish directory to `.next` (these are set in `netlify.toml`).
4. Add the following environment variables in Netlify (Site settings → Build & deploy → Environment):

- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

Optional: use the Netlify CLI to test locally:

```bash
npm install -g netlify-cli
netlify login
netlify init        # link a new site
netlify deploy --build --prod
```

Notes:
- The `@netlify/plugin-nextjs` plugin will handle routing and server-side behavior for Next.js pages and API routes where possible. Keep using Supabase as your hosted backend — set its keys in Netlify env vars.
- If you prefer serverless functions for custom APIs, add them under `netlify/functions`.

Pages:
- `/ventures` — directory
- `/ventures/[id]` — project page
- `/events` — events list
- `/admin` — simple admin forms to create ventures/events

Notes:
- This is an MVP scaffold. Connect Supabase and create the `ventures` and `events` tables with appropriate columns (id, name, description, majors, stage, open_roles (array), contact_email, created_at) to get full functionality.
