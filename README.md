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

Additional scripts and configuration will be added as development progresses.
