# Front-End Beginner Tutorial: How This Site Works

## What this tutorial is for

This guide is meant for someone who is brand new to front-end coding and wants to understand what was built in this project, how the pieces fit together, and what each major file is doing.

The site has two main goals:

1. Present Freddie Valone as a senior front-end architect in a polished portfolio-style website.
2. Add a "digital twin" chat feature that can answer questions about Freddie's career by calling OpenRouter on the server.

This tutorial walks from the big picture down into the code.

---

## Technology summary

Here is the stack in plain English:

| Tool | What it does |
| --- | --- |
| `React` | Builds the user interface out of components. |
| `React Router v8` | Handles pages, routes, and server actions/loaders. |
| `TypeScript` | Adds types so the code is safer and easier to understand. |
| `Vite` | Runs the development server and builds the app for production. |
| `Tailwind CSS` | Styles the app with utility classes like `px-4`, `text-3xl`, and `bg-background`. |
| `shadcn/ui-style components` | Reusable UI building blocks like buttons, cards, badges, and separators. |
| `Vitest` | Runs tests. |
| `OpenRouter` | Sends AI chat requests to the model `openai/gpt-oss-120b:free`. |

There is also a content layer:

| File | Purpose |
| --- | --- |
| `app/content/profile.ts` | Stores Freddie's profile, career history, specialties, and portfolio seeds. |
| `public/assets/systems-hero.png` | The hero image used on the landing page. |
| `public/Freddie-Valone-Resume.pdf` | Resume download. |
| `public/Freddie-Valone-LinkedIn.pdf` | LinkedIn export download. |

---

## High-level walkthrough

Before we dive into code, it helps to understand the architecture at a high level.

### 1. The app has two visible pages

- `/` is the home page.
- `/portfolio` is a future-facing portfolio page.

These are set up in `app/routes.ts`.

```ts
export default [
  index("routes/home.tsx"),
  route("api/chat", "routes/api.chat.ts"),
  route("portfolio", "routes/portfolio.tsx"),
] satisfies RouteConfig;
```

This file tells React Router:

- use `home.tsx` for the main page
- use `portfolio.tsx` for the portfolio page
- use `api.chat.ts` as a server route for chat requests

### 2. The home page is built from sections

The home page is not one giant block of code. It is broken into smaller components:

- `SiteHeader`
- `Hero`
- `About`
- `CareerJourney`
- `PortfolioPreview`
- `DigitalTwinChat`
- `ContactBand`

That makes the page easier to read and maintain.

### 3. The site's content is stored separately from the UI

Instead of hardcoding every job title, metric, and project directly into the page, the project stores most profile data in `app/content/profile.ts`.

That means the UI components can focus on presentation while the content file acts like a small local database.

### 4. The AI chat is server-backed

The browser does **not** call OpenRouter directly with the API key.

Instead:

1. The user types a question in the `DigitalTwinChat` component.
2. The browser sends a request to `/api/chat`.
3. The route in `app/routes/api.chat.ts` reads the OpenRouter API key from `.env`.
4. That route sends the request to OpenRouter.
5. The route streams the response back to the browser.
6. The UI appends the text to the assistant message as it arrives.

This is important because API keys should stay on the server, not in client-side code.

---

## Project structure

Here is the simplified structure:

```text
app/
  app.css
  root.tsx
  routes.ts
  content/
    profile.ts
  components/
    ui/
      badge.tsx
      button.tsx
      card.tsx
      separator.tsx
  routes/
    home.tsx
    portfolio.tsx
    api.chat.ts

public/
  assets/
    systems-hero.png
  favicon.ico
  Freddie-Valone-Resume.pdf
  Freddie-Valone-LinkedIn.pdf
```

Think of those folders like this:

- `app/routes` contains pages and server routes.
- `app/components/ui` contains reusable pieces.
- `app/content` contains data.
- `public` contains files the browser can load directly.

---

## How the page loads

When the site opens in the browser, this happens:

1. `app/root.tsx` creates the page shell.
2. `app/app.css` defines the design tokens and global styles.
3. React Router chooses the correct route based on the URL.
4. If the URL is `/`, it renders `app/routes/home.tsx`.
5. The home route imports profile data and UI components, then renders the sections in order.

Here is the key root file:

```tsx
export default function App() {
  return <Outlet />;
}
```

`<Outlet />` is where the selected route appears.

---

## Detailed code review

This section goes file by file through the most important parts.

## 1. `package.json`

This file defines dependencies and scripts.

```json
{
  "packageManager": "pnpm@11.8.0",
  "engines": {
    "node": ">=22.22.0"
  },
  "scripts": {
    "build": "react-router build",
    "dev": "react-router dev",
    "start": "react-router-serve ./build/server/index.js",
    "test": "vitest run",
    "typecheck": "react-router typegen && tsc"
  }
}
```

What matters here:

- `dev` starts the local development server.
- `build` creates the production version.
- `test` runs the test suite.
- `typecheck` checks TypeScript types.
- `packageManager` locks the repo to pnpm `11.8.0`.
- `engines.node` documents the Node version required by React Router 8.

For a beginner, the biggest idea is this: `package.json` tells the project what libraries it depends on and what commands we use to work on it.

---

## 2. `app/root.tsx`

This is the global page shell.

```tsx
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

Important ideas:

- `Meta` injects route-specific page titles and descriptions.
- `Links` injects things like the favicon.
- `ScrollRestoration` helps preserve or restore scroll position on navigation.
- `Scripts` loads the client-side JavaScript React needs.

This file also includes an `ErrorBoundary`, which is a friendly fallback UI if something goes wrong at runtime.

```tsx
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Unexpected error";
  let details = "Something went sideways while rendering this page.";

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
    details = String(error.data);
  } else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="max-w-xl rounded-lg border bg-card p-8 text-card-foreground">
        <p className="font-mono text-sm text-primary">Runtime signal</p>
        <h1 className="mt-3 text-3xl font-bold">{message}</h1>
        <p className="mt-4 text-muted-foreground">{details}</p>
      </section>
    </main>
  );
}
```

That is good engineering practice because users see a controlled error screen instead of a broken blank page.

---

## 3. `app/app.css`

This file defines the visual design system.

```css
@theme {
  --color-background: oklch(0.118 0.01 248);
  --color-foreground: oklch(0.965 0.006 248);
  --color-primary: oklch(0.78 0.16 178);
  --color-card: oklch(0.17 0.014 248);
  --radius: 0.625rem;
}
```

These are CSS custom properties, also called variables.

Why this matters:

- the UI becomes consistent
- colors can be reused everywhere
- changing the theme becomes much easier

Later in the file, the base styles apply those tokens globally:

```css
body {
  margin: 0;
  min-width: 320px;
  background:
    linear-gradient(180deg, oklch(0.095 0.01 248), var(--color-background) 38rem),
    var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}
```

That is what gives the site its dark, polished, high-contrast look.

Even though Tailwind is used heavily, this file is still important because it defines the overall visual language.

---

## 4. `app/content/profile.ts`

This file is the content backbone of the app.

Example:

```ts
export const profile = {
  name: "Freddie Valone",
  title: "Technical Lead, Senior UI Engineer, Front-end Architect",
  location: "Louisburg, North Carolina",
  email: "freddie.valone@gmail.com",
  linkedIn: "https://www.linkedin.com/in/freddie-valone-73a21a3/",
  resumePdf: "/Freddie-Valone-Resume.pdf",
  linkedInPdf: "/Freddie-Valone-LinkedIn.pdf",
  summary:
    "A senior UI architect with 15+ years building, modernizing, and leading complex web platforms..."
} as const;
```

Then there are arrays for:

- `metrics`
- `specialties`
- `journey`
- `portfolioSeeds`

This is a good pattern because:

- content is centralized
- multiple pages can reuse the same data
- changing a role or metric does not require digging through large JSX files

In beginner terms: `profile.ts` is where the facts live, while page components decide how those facts should look.

---

## 5. `app/components/ui/button.tsx`

This is a reusable button component.

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all ...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
      },
    },
  },
);
```

What is happening here:

- `cva` means "class variance authority"
- it helps define style variations like `default`, `outline`, or `ghost`
- instead of writing raw button CSS everywhere, the app uses a shared component

The component itself:

```tsx
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

Two beginner-friendly ideas here:

1. Reusability:
   One button component gives the app a consistent look.

2. `asChild`:
   This lets the button style wrap another element, such as a link.

For example:

```tsx
<Button asChild>
  <a href={profile.resumePdf}>Resume</a>
</Button>
```

That gives a link the visual appearance of a button.

---

## 6. `app/routes/home.tsx`

This is the most important page in the project.

At the top, it imports the data and UI components it needs:

```tsx
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  journey,
  metrics,
  portfolioSeeds,
  profile,
  specialties,
} from "~/content/profile";
```

The route function itself is very simple:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <About />
      <CareerJourney />
      <PortfolioPreview />
      <DigitalTwinChat />
      <ContactBand />
    </main>
  );
}
```

This is a nice pattern for beginners because it reads almost like an outline of the page.

### `SiteHeader`

This contains:

- logo
- top navigation
- LinkedIn button
- contact button

Example:

```tsx
<a className="transition hover:text-foreground" href="#digital-twin">
  Digital Twin
</a>
```

That link jumps to the chat section lower on the page using the section ID `digital-twin`.

### `Hero`

This is the top section with the main branding statement.

```tsx
<section id="top" className="relative min-h-[88svh] overflow-hidden pt-16">
  <img
    src="/assets/systems-hero.png"
    alt=""
    className="absolute inset-0 size-full object-cover"
  />
```

Important beginner ideas:

- `relative` on the section creates a positioning context
- `absolute` lets the image fill the section
- overlay `div`s add gradients on top of the image

That is how the hero gets a cinematic background while still keeping text readable.

### `About`, `CareerJourney`, and `PortfolioPreview`

These sections are mostly UI composition:

- take structured data from `profile.ts`
- loop over arrays with `.map(...)`
- render cards, badges, and text

Example from `CareerJourney`:

```tsx
{journey.map((item) => (
  <Card key={`${item.company}-${item.period}`}>
    <CardContent>
      <p>{item.period}</p>
      <h3>{item.role}</h3>
      <p>{item.company}</p>
      <p>{item.signal}</p>
    </CardContent>
  </Card>
))}
```

This is a very common React pattern:

1. store related objects in an array
2. map over the array
3. render one UI block per item

That is much better than hardcoding every job entry one by one.

---

## 7. The `DigitalTwinChat` component

This is the most interactive feature in the app.

The component stores three kinds of state:

```tsx
const [messages, setMessages] = useState<ChatMessage[]>([ ... ]);
const [input, setInput] = useState("");
const [isStreaming, setIsStreaming] = useState(false);
const [error, setError] = useState<string | null>(null);
```

What these do:

- `messages` stores the conversation history
- `input` stores what the user is typing
- `isStreaming` tracks whether the AI is currently replying
- `error` stores any connection problem

### Submitting a question

When the user asks a question, `submitQuestion` runs.

The first part validates the input and adds a user message:

```tsx
const userMessage: ChatMessage = {
  id: crypto.randomUUID(),
  role: "user",
  content: trimmed,
};

const assistantId = crypto.randomUUID();
const nextMessages = [...messages, userMessage];
```

Then the code immediately creates a blank assistant message so the UI can show a loading state:

```tsx
setMessages([
  ...nextMessages,
  {
    id: assistantId,
    role: "assistant",
    content: "",
  },
]);
```

That is a nice user experience detail because the interface reacts right away instead of feeling frozen.

### Calling the server route

```tsx
const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    messages: nextMessages.map(({ role, content }) => ({ role, content })),
  }),
});
```

The browser sends the conversation to the app's own server route, not directly to OpenRouter.

### Reading the stream

```tsx
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();

  if (done) {
    break;
  }

  const chunk = decoder.decode(value, { stream: true });
  setMessages((currentMessages) =>
    currentMessages.map((message) =>
      message.id === assistantId
        ? { ...message, content: message.content + chunk }
        : message,
    ),
  );
}
```

This is one of the most important patterns in the app.

Instead of waiting for the full AI answer, the browser:

1. reads a chunk
2. decodes it into text
3. appends it to the assistant message

That creates a streaming effect like modern chat apps.

### Rendering the message text

The `FormattedMessage` helper does basic formatting for paragraphs, bullet lists, bold text, and inline code.

```tsx
if (trimmed.startsWith("- ")) {
  return (
    <ul key={index} className="list-disc space-y-1 pl-5">
      {trimmed.split("\n").map((item) => (
        <li key={item}>{renderInline(item.replace(/^-\s*/, ""))}</li>
      ))}
    </ul>
  );
}
```

This is a lightweight custom renderer. It is not a full Markdown parser, but it is enough to make AI replies more readable.

---

## 8. `app/routes/api.chat.ts`

This is the server route that powers the digital twin.

If you are a beginner, think of this file as the "middle person" between the browser and OpenRouter.

### The route constants

```ts
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b:free";
```

This tells the app where to send the request and which model to use.

### The route action

```ts
export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
```

This makes sure only `POST` requests are accepted.

Then it loads the key:

```ts
const apiKey = getOpenRouterApiKey();
```

And validates the incoming conversation:

```ts
const body = (await request.json()) as { messages?: ClientMessage[] };
const messages = sanitizeMessages(body.messages);
```

### Sending the request to OpenRouter

```ts
const upstream = await fetch(OPENROUTER_URL, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "HTTP-Referer": request.headers.get("origin") ?? "http://localhost:5173",
    "X-OpenRouter-Title": "Freddie Valone Digital Twin",
  },
  body: JSON.stringify({
    model: MODEL,
    stream: true,
    temperature: 0.45,
    max_completion_tokens: 900,
    messages: [
      {
        role: "system",
        content: buildSystemPrompt(),
      },
      ...messages,
    ],
  }),
});
```

Important ideas:

- the API key stays on the server
- `stream: true` asks OpenRouter for a streamed response
- the `system` prompt gives the AI instructions and context

### The system prompt

`buildSystemPrompt()` is what makes the chat feel like a career-specific digital twin instead of a generic chatbot.

It combines:

- Freddie's summary
- specialties
- career journey
- portfolio signals

with behavior instructions like:

```txt
- Do not invent employers, degrees, dates, client names, certifications, metrics, private details, or portfolio outcomes.
- If asked about something not in the context, say what is known and suggest a good follow-up question.
```

This is prompt engineering in a practical form: you shape how the model behaves by telling it what role it is playing and what constraints it must follow.

### Streaming OpenRouter's SSE response

The most technical part of the file is `streamOpenRouterText`.

```ts
function streamOpenRouterText(body: ReadableStream<Uint8Array>) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = body.getReader();
```

OpenRouter sends back server-sent event style chunks. The code:

1. reads bytes from the upstream response
2. decodes bytes into text
3. splits the text into lines
4. looks for lines starting with `data:`
5. parses the JSON
6. pulls out `delta.content`
7. sends plain text chunks back to the browser

The core extraction is here:

```ts
const parsed = JSON.parse(payload) as OpenRouterChunk;
const text = parsed.choices?.[0]?.delta?.content;

if (text) {
  controller.enqueue(encoder.encode(text));
}
```

This is a nice example of "adaptation code": one system's output format gets translated into a simpler format for another part of the app.

---

## 9. `app/routes/portfolio.tsx`

This page is simpler than the home page, but it shows the same design patterns.

It:

- reuses `portfolioSeeds` from `profile.ts`
- reuses `Card`, `Button`, and `Badge`
- gives the site a second route to prove the structure is scalable

Example:

```tsx
{portfolioSeeds.map((project) => (
  <Card key={project.name} className="border-white/10 bg-card/72">
    <CardHeader>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge variant="outline">{project.status}</Badge>
          <CardTitle className="mt-4 text-2xl">{project.name}</CardTitle>
        </div>
      </div>
      <CardDescription>{project.summary}</CardDescription>
    </CardHeader>
  </Card>
))}
```

This is a good sign of healthy code reuse: the page feels connected to the rest of the app because it shares the same design system and content structure.

---

## 10. Testing and verification

The project currently includes a small content test in `app/content/profile.test.ts`. It checks things like:

- Freddie's name is present
- the title contains "Front-end Architect"
- there are enough journey and portfolio entries

The commands used to verify the project are:

```bash
pnpm run typecheck
pnpm test
pnpm run build
```

That covers three different safety nets:

- TypeScript catches type problems
- Vitest catches test failures
- the production build catches route/build issues that sometimes do not appear in development mode

---

## End-to-end mental model

If you want the entire site in one mental picture, this is it:

1. `root.tsx` creates the app shell.
2. `app.css` defines the site's design tokens and global look.
3. `profile.ts` stores the structured content.
4. `home.tsx` turns that content into the main marketing/profile experience.
5. `portfolio.tsx` extends the site with a second page.
6. `api.chat.ts` gives the site a secure server route for AI chat.
7. `DigitalTwinChat` sends questions to the server and streams responses back into the page.

That is the whole loop.

---

## Self-review: five ways this code could be improved

No project is finished forever. Here are five real improvements I would suggest after reviewing the current implementation.

### 1. Replace the custom chat rendering with a proper Markdown renderer

Right now, `FormattedMessage` only handles:

- paragraphs
- bullet lists
- bold
- inline code

That is enough for basic answers, but it is still a hand-rolled parser. A better long-term option would be a real Markdown renderer so the AI can safely return richer formatting.

Why this would help:

- fewer edge cases
- cleaner code
- better handling of headings, links, and more complex formatting

### 2. Move the digital twin logic into its own component or custom hook

`home.tsx` is doing a lot right now:

- page layout
- multiple sections
- all of the chat state
- fetch logic
- streaming logic
- message formatting

That works, but it makes the file large.

A better structure would be:

- `DigitalTwinChat.tsx` for the UI
- `useDigitalTwinChat.ts` for state and streaming logic

Why this would help:

- easier to maintain
- easier to test
- easier for a beginner to understand one concept at a time

### 3. Add better automated tests for the chat route

Current tests mostly check content structure, not AI behavior.

The next level would be:

- unit tests for `sanitizeMessages`
- unit tests for `buildSystemPrompt`
- integration tests for `/api/chat` with a mocked OpenRouter response

Why this would help:

- safer refactors
- fewer silent regressions
- more confidence in the most complex feature

### 4. Normalize content and version references

There is at least one content mismatch: `profile.ts` still lists `"React Router v7"` in `specialties`, while the project has already been upgraded to React Router 8.

Why this matters:

- portfolio content should match the actual codebase
- small inconsistencies reduce trust

This is a good reminder that content files need maintenance just like code.

### 5. Improve the server-side environment strategy

The chat route currently reads `.env` directly as a fallback:

```ts
return process.env.OPENROUTER_API_KEY ?? readEnvFile("OPENROUTER_API_KEY");
```

That was practical for getting the local app working, but it is not ideal as a long-term pattern.

A better approach would be:

- rely on environment variables injected by the runtime
- validate them once at startup
- fail early with a clear error if they are missing

Why this would help:

- cleaner configuration
- fewer surprises between local and deployment environments
- better separation between code and secrets

---

## Final takeaway

The most important lesson from this project is not any single library. It is the way the app is structured:

- content is separated from presentation
- reusable UI primitives keep styling consistent
- routes are split by responsibility
- server code handles secrets and external APIs
- the browser focuses on rendering and user interaction

That is the core shape of a modern front-end application.

If you understand that shape, you are already past the beginner stage in an important way.
