package com.myapp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise //
import com.facebook.react.bridge.Callback //
import android.app.usage.UsageEvents
import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.util.Log

class UsageStatsModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext) {

    /** @params */


    override fun getName(): String {
        /** @return module name */
        return "UsageStats"
    }


    @ReactMethod
    fun getUsagesList(promise: Promise) {
        /** using promise b.c this function will connect with react native through the bridge
         * Promise function
         * @return list of usage data of every single app
         * */
        
    }

    @ReactMethod
    fun testUsage(promise: Promise) {
        /** @sample */
        val stats = "haha-test native module"
        // testing
        promise.resolve(stats)
    }
    
}
