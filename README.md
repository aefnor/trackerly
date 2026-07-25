# Trackerly

Trackerly is an Expo app that can run on native targets and export a static web build for Vercel.

## Get Started

Install dependencies:

```bash
yarn install
```

Configure the API URL:

```bash
cp .env.example .env.local
```

For local web development, `EXPO_PUBLIC_API_URL=http://localhost:8000` works when the backend is running locally. For a phone or simulator, use the machine's LAN or Tailscale URL instead.

Start the backend and database from the sibling backend repo:

```bash
cd ../trackerly-backend
docker compose up --build
```

This starts Postgres and FastAPI. The API listens on port `8000`.

Start the app:

```bash
yarn start
```

## Vercel

The frontend deploys to Vercel as a static Expo web export.

```bash
yarn build
```

Vercel uses:

- Build command: `yarn build`
- Output directory: `dist`
- Install command: `yarn install --frozen-lockfile`

Set `EXPO_PUBLIC_API_URL` in Vercel to the public HTTPS URL of the deployed backend. Vercel only hosts the frontend here; the FastAPI backend and Postgres database need to run as a separate service.
