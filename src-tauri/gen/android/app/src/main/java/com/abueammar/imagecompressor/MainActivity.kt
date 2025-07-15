package com.abueammar.imagecompressor

import android.os.Bundle
import androidx.core.view.WindowCompat

class MainActivity : TauriActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Don't enable edge-to-edge for better system theme compatibility
        // WindowCompat.setDecorFitsSystemWindows(window, false)
    }
}
