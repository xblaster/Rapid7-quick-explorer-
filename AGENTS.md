# AGENTS Instructions for Codex

These guidelines apply to all code changes in this repository.

## Project overview
- React 18 single-page application using MUI v5 for UI components.
- JavaScript (ESNext) as the primary language.
- Vite for build and dev server, with ESLint and Prettier for code quality.
- React Query manages server state, Zustand handles UI state, and React Router provides navigation.
- Axios is used for HTTP requests to Rapid7 InsightVM API endpoints.

## Implementation best practices
1. Keep components functional and hook-based.
2. Store API base URL and credentials via environment variables (`.env.*` files).
3. Use React Query hooks (`useQuery`, `useMutation`) for all API interactions.
4. Maintain a consistent folder structure: `src/components`, `src/pages`, `src/services`, `src/store`.
5. Write unit tests with Vitest and React Testing Library. Place tests next to the files they cover.
6. Ensure the project lints and formats correctly before committing (`pnpm lint`).
7. Document any new scripts or configuration changes in `README.md`.
8. Prefer MUI components and theming utilities over custom CSS when possible.
9. Keep API-related logic isolated in the service layer (`src/services`).

## Testing requirements
- Run `pnpm test` for unit tests and `pnpm lint` for linting before submitting a pull request.
- If E2E tests are present, run `pnpm e2e` locally when modifying critical flows.

