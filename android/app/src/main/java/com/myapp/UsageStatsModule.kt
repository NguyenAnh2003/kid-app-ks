package com.myapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class UsageStatsModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext) {
    /**  */

    override fun getName(): String {
        return "UsageStats"
    }

    @ReactMethod
    fun getUsageList(promise: Promise) {
        /* using promise b.c this function will connect with react native through the bridge */
        
    }

    @ReactMethod
    fun testUsage(promise: Promise) {
        val stats = "haha-test native module"
        // testing
        promise.resolve(stats)
    }
    
}
