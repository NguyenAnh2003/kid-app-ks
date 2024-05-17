package com.myapp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.PowerManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class PowerManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val powerManager: PowerManager = reactContext.getSystemService(Context.POWER_SERVICE) as PowerManager
    private val screenReceiver: BroadcastReceiver

    init {
        screenReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context?, intent: Intent?) {
                when (intent?.action) {
                    Intent.ACTION_SCREEN_ON -> sendScreenStatus(true)
                    Intent.ACTION_SCREEN_OFF -> sendScreenStatus(false)
                }
            }
        }

        val filter = IntentFilter().apply {
            addAction(Intent.ACTION_SCREEN_ON)
            addAction(Intent.ACTION_SCREEN_OFF)
        }
        reactContext.registerReceiver(screenReceiver, filter)
    }

    override fun getName(): String {
        return "PowerManager"
    }

    @ReactMethod
    fun isScreenOn(callback: com.facebook.react.bridge.Callback) {
        val isScreenOn = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT_WATCH) {
            powerManager.isInteractive
        } else {
            powerManager.isScreenOn
        }
        callback.invoke(isScreenOn)
    }

    private fun sendScreenStatus(isScreenOn: Boolean) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("onScreenStatusChanged", isScreenOn)
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        reactApplicationContext.unregisterReceiver(screenReceiver)
    }
}
