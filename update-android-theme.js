#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Update Android theme to follow system theme
const androidResDir = path.join(
  __dirname,
  "src-tauri",
  "gen",
  "android",
  "app",
  "src",
  "main",
  "res"
);
const androidSrcDir = path.join(
  __dirname,
  "src-tauri",
  "gen",
  "android",
  "app",
  "src",
  "main",
  "java",
  "com",
  "abueammar",
  "imagecompressor"
);

// Check if the Android project exists
if (!fs.existsSync(androidResDir)) {
  console.log('Android project not found. Run "tauri android init" first.');
  process.exit(1);
}

// Update day theme
const dayThemeFile = path.join(androidResDir, "values", "themes.xml");
const dayThemeContent = `<resources xmlns:tools="http://schemas.android.com/tools">
    <!-- Base application theme. -->
    <style name="Theme.app" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <!-- Customize your theme here. -->
        
        <!-- Status bar color (transparent to follow system) -->
        <item name="android:statusBarColor">@android:color/transparent</item>
        
        <!-- Navigation bar color (transparent to follow system) -->
        <item name="android:navigationBarColor">@android:color/transparent</item>
        
        <!-- Make status bar icons dark for light theme -->
        <item name="android:windowLightStatusBar" tools:targetApi="M">true</item>
        
        <!-- Make navigation bar icons dark for light theme -->
        <item name="android:windowLightNavigationBar" tools:targetApi="O">true</item>
        
        <!-- Enable edge-to-edge display -->
        <item name="android:windowLayoutInDisplayCutoutMode" tools:targetApi="P">shortEdges</item>
        
        <!-- Window background -->
        <item name="android:windowBackground">@android:color/system_neutral1_0</item>
    </style>
</resources>
`;

// Update night theme
const nightThemeFile = path.join(androidResDir, "values-night", "themes.xml");
const nightThemeContent = `<resources xmlns:tools="http://schemas.android.com/tools">
    <!-- Base application theme. -->
    <style name="Theme.app" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        <!-- Customize your theme here. -->
        
        <!-- Status bar color (transparent to follow system) -->
        <item name="android:statusBarColor">@android:color/transparent</item>
        
        <!-- Navigation bar color (transparent to follow system) -->
        <item name="android:navigationBarColor">@android:color/transparent</item>
        
        <!-- Make status bar icons light for dark theme -->
        <item name="android:windowLightStatusBar" tools:targetApi="M">false</item>
        
        <!-- Make navigation bar icons light for dark theme -->
        <item name="android:windowLightNavigationBar" tools:targetApi="O">false</item>
        
        <!-- Enable edge-to-edge display -->
        <item name="android:windowLayoutInDisplayCutoutMode" tools:targetApi="P">shortEdges</item>
        
        <!-- Window background -->
        <item name="android:windowBackground">@android:color/system_neutral1_900</item>
    </style>
</resources>
`;

// Update MainActivity to handle edge-to-edge properly
const mainActivityFile = path.join(androidSrcDir, "MainActivity.kt");
const mainActivityContent = `package com.abueammar.imagecompressor

import android.os.Bundle
import androidx.core.view.WindowCompat

class MainActivity : TauriActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Enable edge-to-edge display
        WindowCompat.setDecorFitsSystemWindows(window, false)
    }
}
`;

// Write the theme files
fs.writeFileSync(dayThemeFile, dayThemeContent);
fs.writeFileSync(nightThemeFile, nightThemeContent);

// Write the MainActivity
fs.writeFileSync(mainActivityFile, mainActivityContent);

console.log("✅ Android theme updated successfully!");
console.log("📱 Status bar and navigation bar will now follow system theme");
console.log("🌙 Both light and dark themes are configured");
console.log("🔄 Edge-to-edge display enabled");
console.log("📄 MainActivity updated with proper window handling");
