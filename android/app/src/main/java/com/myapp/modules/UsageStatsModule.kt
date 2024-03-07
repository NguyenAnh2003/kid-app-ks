package com.myapp

/** needed package */
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise // promise interface
import com.facebook.react.bridge.Callback // call back interface

import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.common.MapBuilder

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

    /** get total usage time */
    @ReactMethod
    fun getTotalUsage(interval: Int, startTime: Long, endTime: Long, promise: Promise) {
        try {
            /** using promise b.c this function will connect with react native through the bridge
             * Promise function
             * @return list of usage data of every single app
             * */

            // init usage stats manager
            val usageStatsManager = reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager

            // queryUsageStats

            // return usage list

        } catch (e: Throwable) {
            /** log exception */
            // logger
            println("Exception usage module: ${e}") // just print
            // Promise reject error
            promise.reject("Error:", e) //
        }
    }

    /** get usage list function */
    @ReactMethod
    fun getUsagesList(interval: Int, startTime: Double, endTime: Double, promise: Promise) {
        try {
            /** Promise function
             * @param interval - (daily, week, month, year)
             * @param startTime - the time when user move to background state
             * @param endTime - the time user move to active state
             * @return list of usage data of every single app
             * */
            val result = WritableNativeMap()

            // init usage stats manager
            val usageStatsManager = reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager

            /** queryUsageStats (interval, startTime, endTime) */
            val usageStatsList: MutableList<UsageStats> = usageStatsManager.queryUsageStats(interval, startTime.toLong(), endTime.toLong())

            for (us in usageStatsList) {
                val usageStats = WritableNativeMap()
                usageStats.putString("packageName", us.packageName)
                usageStats.putDouble("totalTimeInForeground", us.totalTimeInForeground.toDouble())
                usageStats.putDouble("firstTimeStamp", us.firstTimeStamp.toDouble())
                usageStats.putDouble("lastTimeStamp", us.lastTimeStamp.toDouble())
                usageStats.putDouble("lastTimeUsed", us.lastTimeUsed.toDouble())
                usageStats.putInt("describeContents", us.describeContents())
                result.putMap(us.packageName, usageStats)
            }

            promise.resolve(result) //

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
