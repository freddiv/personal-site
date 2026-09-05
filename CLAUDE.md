# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Freddie Valone's personal site: a React Router v8 (SSR) app styled with Tailwind CSS and shadcn/ui (Radix primitives), including an OpenRouter-backed "digital twin" chat feature that answers questions about Freddie's career using a hardcoded profile as grounding context.

## Commands

- `pnpm dev` — start the Vite dev server with HMR
- `pnpm build` — production build (`react-router build`)
- `pnpm start` — serve the production build (`react-router-serve ./build/server/index.js`)
- `pnpm test` — run the full Vitest suite once
- `pnpm exec vitest` — run tests in watch mode
- `pnpm exec vitest run app/lib/utils.test.ts` — run a single test file
- `pnpm typecheck` — `react-router typegen` followed by `tsc --noEmit`

Package manager is pnpm (see `packageManager` in package.json); this is a single-package pnpm workspace (`pnpm-workspace.yaml`).

## Architecture

- **`app/routes.ts`** is the single source of truth for routes, mapped explicitly to files in `app/routes/` (no filesystem-based routing). Adding a page or API endpoint means adding both the route file and an entry here.
- **`app/routes/api.chat.ts`** is a React Router resource route (no UI) acting as a backend proxy to OpenRouter (`openai/gpt-oss-120b:free`). It builds a system prompt from `app/content/profile.ts`, streams the upstream SSE response, and re-emits it as plain text chunks (see `streamOpenRouterText`). The API key is read from `OPENROUTER_API_KEY` (env var, with a fallback manual parse of a local `.env` file via `getOpenRouterApiKey`/`readEnvFile` — there is no dotenv dependency).
- **`app/content/profile.ts`** is the sole content/data layer — profile info, metrics, specialties, career journey, and portfolio project seeds. Both the UI (`home.tsx`, `portfolio.tsx`) and the chat system prompt (`api.chat.ts`) read from this one file, so it is the place to update when career/content facts change, and edits here have UI and chatbot-behavior implications simultaneously.
- **`app/routes/home.tsx`** is a large, single-file landing page composed of section components (`Hero`, `About`, `CareerJourney`, `PortfolioPreview`, `DigitalTwinChat`, `ContactBand`) defined in the same file rather than split into separate component files. `DigitalTwinChat` is the client side of the chat feature: it streams `/api/chat` responses via `ReadableStream`/`fetch` and renders markdown-lite (bold, inline code, bullet lists) through a hand-rolled `FormattedMessage`/`renderInline` parser (not a markdown library).
- **`app/components/ui/`** holds shadcn/ui (`new-york` style) components generated against `components.json` (base color `zinc`, aliases `~/components`, `~/lib`, `~/hooks`). Use `cn()` from `app/lib/utils.ts` (clsx + tailwind-merge) for conditional class merging, matching existing components' pattern.
- Path alias `~/*` maps to `./app/*` (tsconfig + Vite `tsconfigPaths`).
- SSR is enabled (`react-router.config.ts`); there is no client-only mode.
- The app is dark-themed only (`<html class="dark">` in `app/root.tsx`), styled via CSS variables/oklch colors in `app/app.css` rather than a `tailwind.config` (Tailwind v4 CSS-first config, hence `"config": ""` in `components.json`).

## Testing

Vitest + `@testing-library/react` (jsdom environment, globals enabled — no need to import `describe`/`it`/`expect`). Tests live next to the code they cover (`*.test.ts(x)`), spanning four layers: content integrity (`app/content/profile.test.ts`), lib utils, UI component primitives, and route-level integration tests. `app/routes/api.chat.test.ts` mocks `fetch` and covers request validation, message sanitization, and missing-API-key handling. See `TESTING.md` for the full breakdown.
