# Batch Image Watermarking App

A professional desktop application for adding watermarks and logos to images in batch, built with Tauri, React, and TypeScript.

## Features

- 🖼️ **Batch Processing**: Upload and process multiple images at once
- 🎨 **Custom Logos**: Add multiple logos with customizable positioning
- 🔄 **Pattern Mode**: Create repeating watermark patterns
- 🌓 **Dark Mode**: Full dark mode support
- 🌍 **Multi-language**: English and Arabic support
- ⚡ **Fast & Lightweight**: Built with Tauri for native performance

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Desktop**: Tauri 2.0
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/       # React components
│   ├── ImageDropzone.tsx
│   ├── ImagePreview.tsx
│   ├── LogoList.tsx
│   └── index.ts
├── hooks/           # Custom React hooks
│   ├── useTheme.ts
│   └── index.ts
├── store/           # Zustand state management
│   ├── useImageStore.ts
│   ├── useLanguageStore.ts
│   └── index.ts
├── lib/             # Utilities and helpers
│   ├── i18n/
│   └── utils.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── constants/       # App constants and config
│   └── index.ts
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run tauri dev

# Build for production
npm run tauri build
```

## Usage

1. **Upload Images**: Click or drag images to the upload area
2. **Add Logos**: Upload logo files you want to use as watermarks
3. **Configure**: Adjust logo position, size, opacity, and rotation
4. **Pattern Mode**: Enable for repeating watermark patterns
5. **Export**: Process and download watermarked images

## License

MIT
