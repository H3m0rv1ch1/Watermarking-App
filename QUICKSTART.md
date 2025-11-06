# Quick Start Guide 🚀

Get up and running with the Batch Image Watermarking App in minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Rust (for Tauri builds)

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd watermarking-app

# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run tauri dev
```

The app will open in a native window with hot-reload enabled.

## Building

```bash
# Build for production
npm run tauri build
```

Builds will be available in `src-tauri/target/release/`

## Project Structure

```
src/
├── components/     # UI components
├── hooks/         # Custom hooks
├── store/         # State management
├── lib/           # Utilities
├── types/         # TypeScript types
└── constants/     # Configuration
```

## Key Features

1. **Upload Images** - Drag & drop or click to upload
2. **Add Logos** - Upload watermark logos
3. **Configure** - Adjust size, position, opacity
4. **Pattern Mode** - Create repeating patterns
5. **Export** - Download processed images

## Tips

- Use Pattern Mode for full-image watermarks
- Adjust opacity for subtle watermarks
- Multiple logos can be layered
- Dark mode available in header
- Supports EN/AR languages

## Need Help?

Check the [README.md](README.md) for detailed documentation or [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.
