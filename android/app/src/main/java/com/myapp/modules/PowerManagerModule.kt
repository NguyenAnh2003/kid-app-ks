package com.myapp

import android.content.Context
import android.os.PowerManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback

class PowerManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val powerManager: PowerManager = reactContext.getSystemService(Context.POWER_SERVICE) as PowerManager

    override fun getName(): String {
        return "PowerManager"
    }

    @ReactMethod
    fun isScreenOn(callback: Callback) {
        val isScreenOn = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT_WATCH) {
            powerManager.isInteractive
        } else {
            powerManager.isScreenOn
        }
        callback.invoke(isScreenOn)
    }

}
