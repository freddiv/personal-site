# Repository Guidelines

## Project Structure & Module Organization
The project is built with **React Router v8** (using Vite) and follows a clear separation between data, UI, and routing.

- **`.\app\routes.ts`**: The central source of truth for all routes (pages and API endpoints).
- **`.\app\routes\`**: Contains route-level components (e.g., `.\app\routes\home.tsx`) and server-side routes (e.g., `.\app\routes\api.chat.ts`).
- **`.\app\components\`**: Reusable UI components, following a `shadcn/ui` pattern using Radix UI and Tailwind CSS.
- **`.\app\content\`**: A dedicated data layer (e.g., `.\app\content\profile.ts`) that stores the site's content, separating it from the presentation logic.
- **`.\app\lib\`**: Shared utility functions and library initializations.
- **`.\public\`**: Static assets, including the hero image and downloadable PDFs (Resume, LinkedIn).

## Build, Test, and Development Commands
Use `pnpm` for package management.

- **Development**: `pnpm dev` - Starts the Vite development server with HMR.
- **Build**: `pnpm build` - Compiles the application for production.
- **Serve**: `pnpm start` - Runs the production server from the built files.
- **Testing**: `pnpm test` - Executes the test suite using **Vitest**.
- **Type Safety**: `pnpm typecheck` - Runs `react-router typegen` followed by `tsc` to verify types.

## Coding Style & Naming Conventions
- **Language**: **TypeScript** is used throughout. Maintain strict type safety.
- **Styling**: **Tailwind CSS** is the primary styling tool. Use the `cn()` utility from `.\app\lib\utils.ts` for conditional classes.
- **UI Components**: Built with **Radix UI** primitives and **Lucide-React** for icons.
- **Naming**: Use PascalCase for components and camelCase for utilities and data constants.

## Testing Guidelines
- **Framework**: **Vitest** is the designated test runner.
- **Integration**: Use `@testing-library/react` for component testing.
- **Execution**: Run `pnpm test` to verify changes.

## Commit Guidelines
- Commit messages should be descriptive and concise.
- Examples from history: `"initial chatbot build"`, `"initial build of static content"`.
