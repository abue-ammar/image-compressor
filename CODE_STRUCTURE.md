# Image Compressor Code Structure

This document describes the refactored code structure for the Image Compressor component.

## Overview

The original `ImageCompressor` component has been split into smaller, focused components and utilities to improve maintainability, testability, and reusability.

## File Structure

```
src/
├── components/
│   ├── image-compressor.tsx          # Main component (refactored)
│   ├── drop-zone.tsx                 # File drop zone component
│   ├── action-buttons.tsx            # Download/Reset buttons
│   ├── compressed-images-grid.tsx    # Grid display for compressed images
│   └── ui/                           # UI components (unchanged)
├── hooks/
│   ├── useImageCompression.ts        # Image compression logic hook
│   └── useDragAndDrop.ts            # Drag and drop functionality hook
├── utils/
│   ├── file-validation.ts           # File type validation utilities
│   ├── image-compression.ts         # Image compression utilities
│   └── download.ts                  # Download functionality utilities
├── types/
│   └── image-compressor.ts          # TypeScript interfaces
└── image-compressor/
    └── index.ts                     # Re-export all components and utilities
```

## Components

### `ImageCompressor` (Main Component)

- **Purpose**: Main container component that orchestrates the image compression workflow
- **Responsibilities**:
  - Manages component layout and structure
  - Handles scroll behavior
  - Coordinates child components
- **Size**: Reduced from ~410 lines to ~70 lines

### `DropZone`

- **Purpose**: Handles file upload via drag & drop or file input
- **Responsibilities**:
  - File drag and drop interactions
  - File input handling
  - Visual feedback for drag states
  - File validation integration

### `ActionButtons`

- **Purpose**: Displays download and reset buttons
- **Responsibilities**:
  - Download ZIP file functionality
  - Reset application state
  - Conditional rendering based on state

### `CompressedImagesGrid`

- **Purpose**: Displays the grid of compressed images
- **Responsibilities**:
  - Grid layout for compressed images
  - Empty state display
  - Individual image download integration

## Hooks

### `useImageCompression`

- **Purpose**: Manages the core image compression logic and state
- **State Management**:
  - Compressed images list
  - ZIP file generation
  - Loading states
  - Progress tracking
  - Quality settings
- **Methods**:
  - `handleImageUpload`: Process new file uploads
  - `onImageQualityChange`: Update compression quality
  - `resetCompression`: Clear all state

### `useDragAndDrop`

- **Purpose**: Handles drag and drop functionality
- **Responsibilities**:
  - Drag state management
  - Event handlers for drag/drop interactions
  - File validation integration

## Utilities

### `file-validation.ts`

- **Purpose**: File type validation logic
- **Exports**:
  - `ALLOWED_FORMATS`: Supported image formats
  - `validateFileType`: Single file validation
  - `filterValidFiles`: Batch file validation with error handling

### `image-compression.ts`

- **Purpose**: Core image compression functionality
- **Exports**:
  - `compressImage`: Compress a single image
  - `processImages`: Process multiple images with progress tracking

### `download.ts`

- **Purpose**: File download functionality
- **Exports**:
  - `downloadZip`: Download ZIP file (Tauri & web compatible)
  - `downloadSingleImage`: Download individual image

## Types

### `image-compressor.ts`

- **Purpose**: TypeScript interfaces and types
- **Exports**:
  - `CompressedImage`: Structure for compressed image data
  - `ImageCompressorState`: State interface for the main component

## Benefits of Code Splitting

1. **Maintainability**: Each component has a single responsibility
2. **Testability**: Smaller components are easier to test in isolation
3. **Reusability**: Components can be reused in other parts of the application
4. **Performance**: Potential for better tree-shaking and code splitting
5. **Development Experience**: Easier to navigate and understand the codebase
6. **Type Safety**: Better TypeScript integration with focused interfaces

## Usage

You can import individual components and utilities:

```typescript
import { ImageCompressor, DropZone, ActionButtons } from "./image-compressor";
import { useImageCompression, useDragAndDrop } from "./hooks";
import { validateFileType, downloadZip } from "./utils";
```

Or import everything from the main index:

```typescript
import {
  ImageCompressor,
  useImageCompression,
  CompressedImage,
} from "./image-compressor";
```

## Migration Notes

- **No Breaking Changes**: The main `ImageCompressor` component maintains the same API
- **Backward Compatibility**: All existing functionality is preserved
- **Enhanced Modularity**: New structure allows for better code organization
- **Future Extensions**: Easy to add new features or modify existing ones

## Testing Strategy

With the new structure, you can now:

1. **Unit Test Utilities**: Test compression, validation, and download logic independently
2. **Hook Testing**: Test custom hooks with React Testing Library
3. **Component Testing**: Test individual components in isolation
4. **Integration Testing**: Test the full workflow with the main component
