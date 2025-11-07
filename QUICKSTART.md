# Quick Start 🚀

Get productive in minutes.

## Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)
- Rust + Cargo (for Tauri desktop builds)

## Install

```bash
git clone <your-repo-url>
cd watermarking-app
npm install
```

## Develop

```bash
# Web preview (runs Vite dev server)
npm run dev

# Desktop preview (runs Tauri dev)
npm run tauri dev
```

## Build

```bash
# Web build
npm run build      # outputs to dist/

# Desktop build
npm run tauri build  # outputs to src-tauri/target/release
```

## Use the App

1. Upload images (drag & drop or click)
2. Add one or more logos
3. Configure position, size, opacity, rotation
4. Toggle Pattern Mode for grid-style watermarks
5. Export to download the results

## Tips

- Use lower opacity for subtle watermarks
- Pattern Mode helps cover the full image
- Theme toggle supports light/dark
- Language chips are fixed LTR while Arabic UI is RTL

## Docs

- Read the [README](README.md) for features, design, and structure
- See [CONTRIBUTING](CONTRIBUTING.md) for standards and PR guidance
