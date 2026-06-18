## Overview

Free and Open Source Image Compressor. Optimizes images `locally`, delivering unmatched efficiency `without storing a single file`. Experience lightning-fast compression, all in one place.

## Live

https://image-compressor-9vj.pages.dev

## Architecture & Code Structure

This project uses a modern, modular architecture with clear separation of concerns. The codebase is organized into focused components, custom hooks, and utility functions for optimal maintainability and testability.

### Project Structure

```
├── public/                     # Static assets and PWA manifest
│   ├── logo.png               # Application logo variants
│   ├── logo.svg               # SVG logo files
│   ├── manifest.json          # PWA manifest configuration
│   └── fonts/                 # Custom font files
├── src/                       # Frontend source code (React + TypeScript)
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components (shadcn/ui)
│   │   ├── action-buttons.tsx         # Download/Reset functionality
│   │   ├── compressed-images-grid.tsx # Grid display for results
│   │   ├── drop-zone.tsx              # File upload interface
│   │   ├── image-preview-card.tsx     # Individual image preview
│   │   ├── image-quality-slider.tsx   # Compression quality control
│   │   ├── loading-spinner.tsx        # Loading states
│   │   ├── theme-provider.tsx         # Dark/light theme support
│   │   └── [other components]
│   ├── hooks/                 # Custom React hooks
│   │   ├── useDragAndDrop.ts         # Drag & drop functionality
│   │   └── useImageCompression.ts    # Core compression logic
│   ├── lib/                   # Utility libraries
│   │   └── utils.ts                  # Common utility functions
│   ├── types/                 # TypeScript type definitions
│   │   └── image-compressor.ts       # Core type interfaces
│   ├── utils/                 # Utility functions
│   │   ├── download.ts              # File download utilities
│   │   ├── file-validation.ts       # File type validation
│   │   ├── image-compression.ts     # Image processing logic
│   │   └── utils.ts                 # General utilities
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── src-tauri/                 # Tauri backend (Rust)
│   ├── src/                  # Rust source code
│   │   ├── lib.rs           # Library functions
│   │   └── main.rs          # Application entry
│   ├── icons/               # Application icons for platforms
│   ├── capabilities/        # Tauri security capabilities
│   ├── gen/                 # Generated build files
│   │   └── android/         # Android-specific build files
│   ├── Cargo.toml          # Rust dependencies
│   ├── tauri.conf.json     # Tauri configuration
│   └── build.rs            # Build script
├── package.json             # Node.js dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── eslint.config.js        # ESLint linting rules
└── components.json         # shadcn/ui components configuration
```

### Core Components

#### `ImageCompressor` (Main Component)

- **Purpose**: Main container that orchestrates the entire compression workflow
- **Size**: Optimized from ~410 lines to ~70 lines through modular design
- **Responsibilities**: Layout management, scroll behavior, component coordination

#### `DropZone`

- **Purpose**: Handles file upload via drag & drop or file input
- **Features**: Visual drag feedback, file validation, multi-file support
- **Integration**: Works with `useDragAndDrop` hook and file validation utilities

#### `ActionButtons`

- **Purpose**: Provides download and reset functionality
- **Features**: ZIP download, individual image download, state reset
- **Platform Support**: Tauri-compatible download handling

#### `CompressedImagesGrid`

- **Purpose**: Displays compressed images in a responsive grid
- **Features**: Empty state handling, individual image actions, responsive layout

### Custom Hooks

#### `useImageCompression`

- **Purpose**: Core compression logic and state management
- **State**: Compressed images, ZIP files, loading states, progress tracking
- **Methods**: `handleImageUpload`, `onImageQualityChange`, `resetCompression`

#### `useDragAndDrop`

- **Purpose**: Drag and drop functionality management
- **Features**: Drag state tracking, event handling, file validation integration

### Utility Functions

#### `file-validation.ts`

- **Exports**: `ALLOWED_FORMATS`, `validateFileType`, `filterValidFiles`
- **Purpose**: Comprehensive file type validation and error handling

#### `image-compression.ts`

- **Exports**: `compressImage`, `processImages`
- **Purpose**: Core image processing with progress tracking

#### `download.ts`

- **Exports**: `downloadZip`, `downloadSingleImage`
- **Purpose**: Cross-platform file download (Tauri & web compatible)

### TypeScript Integration

#### `image-compressor.ts`

- **Exports**: `CompressedImage`, `ImageCompressorState`
- **Purpose**: Type-safe interfaces for all components and utilities

### Key Features

- **🎯 Modular Architecture**: Each component has a single responsibility
- **🔧 Type Safety**: Full TypeScript integration with strict typing
- **📱 Cross-Platform**: Tauri-based desktop app with web fallback
- **🎨 Modern UI**: shadcn/ui components with dark/light theme support
- **⚡ Performance**: Optimized compression with progress tracking
- **🧪 Testable**: Isolated components and utilities for easy testing
- **🔄 Reusable**: Components can be used across different parts of the app

### Usage Examples

```typescript
// Import individual components
import { ImageCompressor, DropZone, ActionButtons } from "./components";
import { useImageCompression, useDragAndDrop } from "./hooks";
import { validateFileType, downloadZip } from "./utils";

// Or import from main index
import {
  ImageCompressor,
  useImageCompression,
  CompressedImage,
} from "./image-compressor";
```

## Getting Started

### Prerequisites

- Node.js version `20+` and `npm` installed on your machine
- For Tauri development: Rust toolchain installed

### Installation

```bash
# Clone the repository
git clone https://github.com/abue-ammar/image-compressor.git
cd image-compressor

# Install dependencies
npm install

# Start development server
npm start
```

Open your browser and go to http://localhost:3000 to use the image compressor.

### Available Scripts

```bash
# Development
npm start          # Start development server
npm run dev        # Alternative development command

# Building
npm run build      # Build for production
npm run preview    # Preview production build

# Tauri (Desktop App)
npm run tauri dev  # Start Tauri development
npm run tauri build # Build desktop application

# Code Quality
npm run lint       # Run ESLint
npm run type-check # Run TypeScript compiler check
```

### Docker Deployment

Run the web application in a container using the included `Dockerfile` or `docker-compose.yaml`. Docker serves the production build with nginx. Image compression still runs entirely in the browser; no files are uploaded to the server.

#### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/) (included with Docker Desktop)

#### Using Docker Compose (recommended)

```bash
# Build and start the container in the background
docker compose up -d --build

# Open http://localhost:8080 in your browser
```

To run on a different host port (for example, 3000):

```bash
PORT=3000 docker compose up -d --build
```

Stop the container:

```bash
docker compose down
```

#### Using Docker directly

```bash
# Build the image
docker build -t image-compressor:latest .

# Run the container
docker run -d --name image-compressor -p 8080:8080 image-compressor:latest

# Open http://localhost:8080 in your browser
```

To map a different host port:

```bash
docker run -d --name image-compressor -p 3000:8080 image-compressor:latest
```

View logs or stop the container:

```bash
docker logs -f image-compressor
docker stop image-compressor && docker rm image-compressor
```

### Development Workflow

1. **Frontend Development**: Use `npm start` for hot-reload React development
2. **Desktop App Development**: Use `npm run tauri dev` for Tauri development
3. **Testing**: Run individual component tests with the modular structure
4. **Building**: Use `npm run build` for web or `npm run tauri build` for desktop
5. **Container Deployment**: Use `docker compose up -d --build` to run the production web build

### Project Highlights

- **Zero Dependencies for Core Functionality**: No external image processing libraries
- **Privacy First**: All processing happens locally, no data leaves your device
- **Cross-Platform**: Runs in browsers and as a desktop application
- **Modern Stack**: React 18, TypeScript, Vite, Tauri, shadcn/ui
- **Optimized Performance**: Efficient compression algorithms with progress tracking

## Features

- **🖼️ Multi-Format Support**: JPEG, PNG, WebP, and more
- **🎚️ Quality Control**: Adjustable compression levels with live preview
- **📦 Batch Processing**: Compress multiple images simultaneously
- **💾 Flexible Downloads**: Download individual images or ZIP archives
- **🖱️ Drag & Drop**: Intuitive file upload interface
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🌙 Dark/Light Theme**: Automatic theme switching support
- **🔒 Privacy Focused**: All processing happens locally in your browser
- **⚡ Fast Performance**: Optimized compression algorithms
- **🖥️ Desktop App**: Available as a native desktop application via Tauri

## Contributing

We welcome contributions! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Install dependencies: `npm install`
4. Start development: `npm start`
5. Make your changes
6. Test thoroughly
7. Commit your changes: `git commit -m 'Add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use the existing component structure
- Maintain the modular architecture
- Add proper type definitions
- Write meaningful commit messages

### Testing

- Test components in isolation
- Verify cross-platform compatibility (web + Tauri)
- Test with various image formats and sizes
- Ensure accessibility standards are met

### Areas for Contribution

- New image formats support
- Performance optimizations
- UI/UX improvements
- Mobile responsiveness
- Accessibility enhancements
- Documentation improvements

## Authors

- [@abue-ammar](https://www.github.com/abue-ammar)
- [@image-compressor](https://www.github.com/image-compressor)

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit/) file for details.
