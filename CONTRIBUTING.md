# Contributing

Thanks for helping make this app better. This guide sets standards to keep the codebase clean and the UX polished.

## Setup

- Fork the repo and clone your fork
- Create a branch: `git checkout -b feat/short-description`
- Install deps: `npm install`
- Run locally: `npm run dev` (web) or `npm run tauri dev` (desktop)

## Standards

- TypeScript-first; keep types tight and explicit
- React components small, focused, and composable
- Tailwind CSS utilities for styling; avoid inline styles
- Zustand for global state where appropriate
- i18n keys live in `src/lib/i18n/translations.ts`
- RTL: Arabic UI uses `dir="rtl"`; language chips remain `dir="ltr"`
- Background is unified via global body gradient (light and dark)

## Commits (Conventional Commits)

- `feat:` new feature
- `fix:` bug fix
- `docs:` docs-only changes
- `style:` formatting (no code changes)
- `refactor:` restructuring without features or fixes
- `perf:` performance improvements
- `test:` add or fix tests
- `chore:` tooling, build, dependencies

Example: `feat(welcome): flip Get Started arrow for RTL`

## Branching

- Feature branches: `feat/...`
- Bugfix branches: `fix/...`
- Docs branches: `docs/...`

## Pull Requests

- Include screenshots for any UI change
- Describe the change and how to test it
- Checklist:
  - Verified locally (`npm run dev` or `npm run tauri dev`)
  - No type errors (`tsc --noEmit` if configured)
  - Lint passes (`npm run lint` if available)
  - i18n keys added for all languages when applicable
  - Updated docs (README/QUICKSTART/CHANGELOG) where relevant

## Testing & Verification

- Prefer component-level tests where possible
- Manually verify both light/dark themes
- Test EN and AR; confirm RTL behaviors and LTR language chips
- Check mobile and desktop headers match design

## Release Notes

- Update [CHANGELOG.md](CHANGELOG.md) with notable changes
- Follow semver for versioning (MAJOR.MINOR.PATCH)

## Security & Privacy

- Do not include sensitive data in commits or issues
- Report vulnerabilities privately; see [SECURITY.md](SECURITY.md)

## License

By contributing, you agree that your contributions are licensed under MIT.
