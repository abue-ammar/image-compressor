package com.abueammar.imagecompressor

import android.os.Bundle
import androidx.core.view.WindowCompat

class MainActivity : TauriActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Enable proper system bar handling
        WindowCompat.setDecorFitsSystemWindows(window, true)
        
        // Ensure the app responds to system theme changes
        window.statusBarColor = resources.getColor(android.R.color.transparent, theme)
        window.navigationBarColor = resources.getColor(android.R.color.transparent, theme)
    }
}
