package com.myapp

/** needed package */
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise // promise interface
import com.facebook.react.bridge.Callback // call back interface

/** usage stats package */
import android.app.usage.UsageEvents
import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager

/** */
import android.content.Context // android content
import android.util.Log
import java.lang.Exception


/** time package */
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.HashMap
import java.util.List;


class UsageStatsModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext) {

    /** @params */


    override fun getName(): String {
        /** @return module name */
        return "UsageStats"
    }

    override fun getConstants(): Map<String, Any> {
        /** constants return (daily, weekly, monthly, yearly)
         * [0: daily, 1: weekly, 2: monthly, 3: yearly] */
        val constants: MutableMap<String, Any> = HashMap()
        constants["INTERVAL_DAILY"] = UsageStatsManager.INTERVAL_DAILY
        constants["INTERVAL_WEEKLY"] = UsageStatsManager.INTERVAL_WEEKLY
        constants["INTERVAL_MONTHLY"] = UsageStatsManager.INTERVAL_MONTHLY
        constants["INTERVAL_YEARLY"] = UsageStatsManager.INTERVAL_YEARLY

        return constants
    }

    /** get usage list function */
    // @ReactMethod(isBlockingSynchronousMethod = True)
    // func showPermission() {}

    /** get usage list function */
    @ReactMethod
    fun getUsagesList(promise: Promise) {
        try {
            /** using promise b.c this function will connect with react native through the bridge
             * Promise function
             * @return list of usage data of every single app
             * */

            // init usage stats manager
            val usageStatsManager = reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
            
            
        } catch (e: Throwable) {
            /** log exception */
            // logger
            println("Exception usage module: ${e}") // just print
            // Promise reject error
            promise.reject("Error:", e) //
        }
    }

    @ReactMethod
    fun testUsage(promise: Promise) {
        /** @sample */
        val stats = "haha-test native module"
        // testing
        promise.resolve(stats)
    }
    
}
