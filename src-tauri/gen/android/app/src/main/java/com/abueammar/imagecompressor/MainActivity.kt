package com.abueammar.imagecompressor

import android.os.Bundle
import androidx.core.view.WindowCompat
import app.tauri.activity.TauriActivity

class MainActivity : TauriActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Enable edge-to-edge display
        WindowCompat.setDecorFitsSystemWindows(window, false)
    }
}
