# Portfolio

Static portfolio site for [Ian Troisi](https://github.com/Cincinnatus101010), built with [Next.js](https://nextjs.org/) and styled with [@troisi/ui](../TroisiUI) (local file dependency).

## Prerequisites

- [Bun](https://bun.sh/) 1.3+
- Clone [TroisiUI](https://github.com/Cincinnatus101010/TroisiUI) as a sibling directory:

  ```
  Developer/
  ├── portfolio/   ← this repo
  └── TroisiUI/      ← required for @troisi/ui
  ```

## Development

Build the UI library once (or after TroisiUI changes):

```bash
cd ../TroisiUI && bun install && bun run build
```

Run the portfolio locally (no `basePath`; full site at `/`):

```bash
cd portfolio
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

GitHub Pages uses `basePath` `/portfolio`. To match CI locally:

```bash
cd ../TroisiUI && bun run build
cd ../portfolio
GITHUB_PAGES=true bun run build
```

Static output is in `out/`.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `bun run dev`     | Next.js dev server       |
| `bun run build`   | Static export to `out/`  |
| `bun run typecheck` | TypeScript check       |
| `bun run lint`    | Biome check              |

## Deployment

Pushes to `main` run [.github/workflows/pages.yml](.github/workflows/pages.yml): checkout portfolio and TroisiUI side by side, build both, deploy `portfolio/out` to GitHub Pages.

Live site: **https://cincinnatus101010.github.io/portfolio/**
