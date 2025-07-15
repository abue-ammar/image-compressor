# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep WebView JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep line numbers for debugging crash reports
-keepattributes SourceFile,LineNumberTable

# Keep all annotations
-keepattributes *Annotation*