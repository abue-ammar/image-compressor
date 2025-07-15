#!/bin/bash

# Android Keystore Generation Script for Tauri App
# This script helps generate the keystore and prepares it for GitHub Actions

set -e

echo "🔑 Android Keystore Generation for Tauri App"
echo "============================================="
echo

# Check if keytool is available
if ! command -v keytool &> /dev/null; then
    echo "❌ Error: keytool not found. Please install Java JDK."
    exit 1
fi

# Default values
KEYSTORE_NAME="upload-keystore.jks"
KEY_ALIAS="upload"
KEY_VALIDITY=10000

echo "📋 This script will:"
echo "   1. Generate a new Android signing keystore"
echo "   2. Convert it to base64 for GitHub Actions"
echo "   3. Show you the values to add to GitHub secrets"
echo

read -p "🤔 Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

echo
echo "🔧 Generating keystore..."
echo "   File: $KEYSTORE_NAME"
echo "   Alias: $KEY_ALIAS"
echo "   Validity: $KEY_VALIDITY days"
echo

# Generate keystore
keytool -genkey -v -keystore "$KEYSTORE_NAME" -keyalg RSA -keysize 2048 -validity $KEY_VALIDITY -alias "$KEY_ALIAS"

if [ ! -f "$KEYSTORE_NAME" ]; then
    echo "❌ Error: Keystore generation failed"
    exit 1
fi

echo
echo "✅ Keystore generated successfully!"
echo

# Convert to base64
echo "🔄 Converting keystore to base64..."
base64 -i "$KEYSTORE_NAME" | tr -d '\n' > "${KEYSTORE_NAME}.base64"

echo "✅ Base64 conversion complete!"
echo

# Show GitHub secrets setup
echo "🔐 GitHub Secrets Setup"
echo "======================"
echo
echo "Add these secrets to your GitHub repository:"
echo "   Repository → Settings → Secrets and variables → Actions"
echo
echo "1. ANDROID_KEY_ALIAS"
echo "   Value: $KEY_ALIAS"
echo
echo "2. ANDROID_KEY_PASSWORD"
echo "   Value: [the password you just entered]"
echo
echo "3. ANDROID_KEY_BASE64"
echo "   Value: [content of ${KEYSTORE_NAME}.base64]"
echo

echo "📁 Files created:"
echo "   - $KEYSTORE_NAME (keep this safe and private!)"
echo "   - ${KEYSTORE_NAME}.base64 (for GitHub secret)"
echo

echo "⚠️  IMPORTANT SECURITY NOTES:"
echo "   - Keep $KEYSTORE_NAME in a secure location"
echo "   - Never commit keystore files to version control"
echo "   - Back up your keystore - you can't regenerate it!"
echo "   - Use a strong password and remember it"
echo

echo "🚀 Next steps:"
echo "   1. Add the three secrets to your GitHub repository"
echo "   2. Push your code to trigger the GitHub Actions workflow"
echo "   3. Your APK will be signed and published automatically"
echo

echo "✨ Setup complete! Your Android app will now be signed in CI/CD."
