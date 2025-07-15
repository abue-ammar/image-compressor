# Android Signing Setup for GitHub Actions

This document explains how to set up Android signing for your Tauri app using GitHub Actions.

## Prerequisites

Before setting up GitHub Actions, you need to generate a signing key for your Android app.

### 1. Generate Android Signing Key

If you haven't already, generate a signing key using the `keytool` command:

```bash
keytool -genkey -v -keystore upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

When prompted, provide:

- A strong password for the keystore
- Your app details (name, organization, etc.)
- The same password for the key alias

**Important:** Save the keystore file (`upload-keystore.jks`) and remember the password you set.

### 2. Convert Keystore to Base64

Convert your keystore file to base64 for secure storage in GitHub secrets:

```bash
base64 -i upload-keystore.jks | tr -d '\n' > keystore.base64
```

This creates a `keystore.base64` file with the base64-encoded keystore.

## GitHub Repository Setup

### 3. Add GitHub Secrets

Go to your GitHub repository settings and add the following secrets:

1. **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:

| Secret Name            | Description                                   | Example Value                     |
| ---------------------- | --------------------------------------------- | --------------------------------- |
| `ANDROID_KEY_ALIAS`    | The alias you used when creating the keystore | `upload`                          |
| `ANDROID_KEY_PASSWORD` | The password you set for the keystore         | `your_secure_password`            |
| `ANDROID_KEY_BASE64`   | The base64-encoded keystore content           | Content of `keystore.base64` file |

### 4. Configure Gradle for Signing

The Gradle build configuration has been automatically set up in `src-tauri/gen/android/app/build.gradle.kts` to use the signing key:

```kotlin
import java.io.FileInputStream

// ... other configurations ...

signingConfigs {
    create("release") {
        val keystorePropertiesFile = rootProject.file("keystore.properties")
        val keystoreProperties = Properties()
        if (keystorePropertiesFile.exists()) {
            keystoreProperties.load(FileInputStream(keystorePropertiesFile))
        }

        keyAlias = keystoreProperties["keyAlias"] as String
        keyPassword = keystoreProperties["password"] as String
        storeFile = file(keystoreProperties["storeFile"] as String)
        storePassword = keystoreProperties["password"] as String
    }
}

buildTypes {
    getByName("release") {
        signingConfig = signingConfigs.getByName("release")
        // ... other release configurations ...
    }
}
```

This configuration:

- Reads the keystore properties from `keystore.properties`
- Uses the signing key for release builds
- Automatically signs APKs during the build process

### 5. Security Best Practices

- **Never commit** the `keystore.properties` file to your repository
- **Never commit** the actual `.jks` keystore file
- Use strong passwords for your keystore
- Consider using different keys for debug and release builds
- Keep backups of your keystore file in a secure location

## How It Works

When the GitHub Actions workflow runs:

1. The `Setup Android Signing` step creates a `keystore.properties` file in `src-tauri/gen/android/`
2. It populates the file with values from your GitHub secrets
3. The base64-encoded keystore is decoded and saved as a temporary file
4. The Tauri build process uses these signing credentials to create signed APKs

## Workflow Integration

The signing is integrated into the main GitHub Actions workflow in `.github/workflows/main.yml`. The relevant steps are:

```yaml
- name: Setup Android Signing
  run: |
    cd src-tauri/gen/android
    echo "keyAlias=${{ secrets.ANDROID_KEY_ALIAS }}" > keystore.properties
    echo "password=${{ secrets.ANDROID_KEY_PASSWORD }}" >> keystore.properties
    base64 -d <<< "${{ secrets.ANDROID_KEY_BASE64 }}" > $RUNNER_TEMP/keystore.jks
    echo "storeFile=$RUNNER_TEMP/keystore.jks" >> keystore.properties

- name: Build Signed Android APK
  run: npx tauri android build --apk --split-per-abi
```

## Troubleshooting

### Common Issues

1. **Build fails with "keystore not found"**
   - Ensure all three GitHub secrets are set correctly
   - Verify the base64 encoding is correct (no newlines)

2. **Invalid keystore password**
   - Double-check the `ANDROID_KEY_PASSWORD` secret
   - Ensure the password matches what you used when creating the keystore

3. **Key alias not found**
   - Verify the `ANDROID_KEY_ALIAS` matches the alias used in keystore creation
   - Default alias is usually `upload`

### Verifying Secrets

You can verify your secrets are set correctly by checking the GitHub Actions logs. The workflow will show masked values for security.

## Release Process

Once configured, every push to the `tauri-migration` branch will:

1. Build signed APKs for multiple Android architectures
2. Upload them as artifacts
3. Create a GitHub release with all platform builds
4. Deploy the web version to GitHub Pages

The signed APKs will be available in the GitHub release.
