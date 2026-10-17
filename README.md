# Edward Tan — Portfolio

A hands-on portfolio rebuild using React, TypeScript 7, Vite 8, Bun, and Oxlint.
Styling will use CSS Modules. TanStack Router and its Vite plugin are installed;
route configuration and pages are intentionally left for the next learning step.
The app currently renders a blank page.

## Setup

Install Bun 1.4.3 and Node.js 20.19+ or 22.12+ (matching `package.json`).
Bun manages dependencies and scripts; Vite's CLI uses Node.js by default.

```sh
bun install --frozen-lockfile
bun run dev
```

Use Bun for dependency changes and commit `bun.lock`; do not create npm or pnpm lockfiles.
If Bun isn't found after installation, restart your shell or add `$HOME/.bun/bin` to PATH.

## Checks

```sh
bun run typecheck
bun run lint
bun run build
bun run preview
```

- TypeScript checks both the application and Vite configuration.
- Oxlint enables correctness checks plus React Hooks, Fast Refresh, and accessibility rules.
  Warnings fail the lint command. Configuration lives in `.oxlintrc.json`.
- Vite builds the site into `dist/`. CSS Modules work without an additional plugin.

## Writing a blog post

Create `src/blog/my-story/content.md` and `src/blog/my-story/info.json`:

```json
{
  "title": "My Story",
  "date": "2026-07-17",
  "description": "How I got into building things."
}
```

Use lowercase letters, numbers, and hyphens for folder names. The folder name
becomes the URL: `/blog/my-story`. Posts appear at `/blog`, newest date first.
Every folder is a published post; drafts and future-date scheduling are not supported.

Write standard Markdown in `content.md`. The page already displays the title;
start sections with `##`. Raw HTML is ignored. For images, place files under
`public/images/` and reference them as `![Description](/images/example.png)`.

Run `bun run dev` to preview. Commit both files and rebuild/deploy to publish
changes.
