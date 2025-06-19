# Rapid7 Quick Explorer

This repository hosts an experimental React application for interacting with the
Rapid7 InsightVM API. The project is in the early stages; see the
[Technical Specification](docs/TECHNICAL_SPECIFICATION.md) for details and the
[Implementation Tasks](docs/IMPLEMENTATION_TASKS.md) for the current roadmap.

## Requirements

- Node.js 18 or newer
- [pnpm](https://pnpm.io/) package manager

## Getting started

```bash
# install dependencies
cd rapid7-client && pnpm install

# copy the example environment file and edit values
cp .env.example .env.local

# launch the development server
pnpm dev
```

The Vite dev server runs on [http://localhost:5173](http://localhost:5173) by
default.

## Useful scripts

- `pnpm lint` – run ESLint checks
- `pnpm format` – format source files with Prettier
- `pnpm test` – execute unit tests with Vitest
- `pnpm e2e` – launch Cypress for end‑to‑end tests

The application reads Rapid7 settings from `.env.local`. Use `.env.example`
as a starting point and keep your personal keys out of version control. When
the dev server starts, you'll be greeted with a login form. Depending on
`VITE_APP_USE_BASIC_AUTH`, enter either your API Key or your Rapid7 username,
password and one-time token. Credentials are forwarded to Rapid7 to obtain a
session token and never validated locally.

Additional scripts and configuration will be added as development progresses.
