package com.myapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class UsageStatsModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext) {

    /** set name for module */
    override fun getName(): String {
        return "UsageStats"
    }

    @ReactMethod
    fun getSomeStats() {

    }
}
