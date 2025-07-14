#!/bin/bash
# Test script for Android build

echo "Building the web application..."
npm run build

echo "Testing Android build..."
npx tauri android build --debug

echo "Android build test completed!"
