# Contributing Guidelines

Thank you for considering contributing to the Batch Image Watermarking App!

## Code Style

- Use TypeScript for all new code
- Follow the existing code structure and naming conventions
- Use functional components with hooks
- Keep components small and focused
- Add JSDoc comments for complex functions

## Project Structure

- `src/components/` - Reusable UI components
- `src/hooks/` - Custom React hooks
- `src/store/` - Zustand state management
- `src/lib/` - Utility functions and helpers
- `src/types/` - TypeScript type definitions
- `src/constants/` - Application constants

## Naming Conventions

- **Components**: PascalCase (e.g., `ImageDropzone.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTheme.ts`)
- **Utilities**: camelCase (e.g., `loadImage.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_IMAGE_SIZE`)
- **Types/Interfaces**: PascalCase (e.g., `Logo`, `ImageFile`)

## Commit Messages

Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

- Test your changes thoroughly before submitting
- Ensure the app builds without errors
- Check both light and dark modes
- Test with different image formats and sizes
