# Mobile and Cross-Platform Support

This image compressor app now supports multiple platforms:

## Supported Platforms

### ✅ Web Browser

- Works in any modern web browser
- Uses standard HTML5 download functionality

### ✅ Desktop Applications

- **Windows**: Native Windows application
- **Linux**: Native Linux application
- **macOS**: Native macOS application

### ✅ Mobile Applications

- **Android**: Native Android APK
- **iOS**: Native iOS application (requires macOS for building)

## Platform-Specific Features

### Web Browser

- Files are downloaded to the browser's default download location
- Standard browser download dialog

### Desktop (Windows/Linux/macOS)

- File save dialog allows users to choose save location
- Full file system access

### Android

- Files are automatically saved to the Downloads folder
- Requires storage permissions (automatically requested)
- Optimized for mobile touch interface

## Building for Different Platforms

### Web

```bash
npm run build
npm run preview
```

### Desktop

```bash
npx tauri build
```

### Android

```bash
npx tauri android build
```

### iOS (requires macOS)

```bash
npx tauri ios build
```

## Android Development Setup

1. Install Android Studio
2. Install Android SDK
3. Set up environment variables:

   ```bash
   export ANDROID_HOME=/path/to/android-sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

4. **Important**: Update the bundle identifier in `src-tauri/tauri.conf.json`:

   ```json
   {
     "identifier": "com.yourcompany.yourapp"
   }
   ```

   The default `com.tauri.dev` is not allowed for production.

5. Initialize Android support:

   ```bash
   npx tauri android init
   ```

6. Build debug version:
   ```bash
   npx tauri android build --debug
   ```

**Note**: If you change the bundle identifier after running `android init`, you must delete the `src-tauri/gen/android` folder and run `tauri android init` again.

## File Permissions

### Android

The app requests the following permissions:

- `WRITE_EXTERNAL_STORAGE` - To save compressed images
- `READ_EXTERNAL_STORAGE` - To access image files
- `READ_MEDIA_IMAGES` - For Android 13+ compatibility

### Desktop

- File system access through native dialogs
- User explicitly chooses save locations

### Web

- No special permissions required
- Uses browser's download functionality

## Features Available on All Platforms

- Image compression with quality control
- Batch processing of multiple images
- ZIP file creation for bulk downloads
- Individual image downloads
- Support for JPG, PNG, WEBP formats
- Real-time compression progress
- Drag and drop interface
- Dark/light theme support

## Troubleshooting

### Android Build Issues

1. **Bundle Identifier Error**

   ```
   Error: You must change the bundle identifier in `tauri.conf.json identifier`.
   The default value `com.tauri.dev` is not allowed.
   ```

   **Solution**:
   - Update `src-tauri/tauri.conf.json` with a unique identifier
   - Delete `src-tauri/gen/android` folder
   - Run `npx tauri android init` again

2. **Project Directory Not Found**

   ```
   Error: Project directory /path/to/com/yourcompany/yourapp does not exist.
   ```

   **Solution**:
   - Delete `src-tauri/gen/android` folder
   - Run `npx tauri android init` to regenerate

3. **Android SDK Not Found**

   ```
   Error: Android SDK not found
   ```

   **Solution**:
   - Install Android Studio
   - Set ANDROID_HOME environment variable
   - Add Android SDK tools to PATH

### Desktop Build Issues

1. **Missing Dependencies**
   - Install system dependencies for your OS
   - Check Tauri prerequisites documentation

### General Issues

1. **Build Failures**
   - Run `npm run build` first
   - Check for TypeScript errors
   - Ensure all dependencies are installed

2. **Permission Issues**
   - Check platform-specific permissions
   - Ensure proper capabilities are set in `default.json`
