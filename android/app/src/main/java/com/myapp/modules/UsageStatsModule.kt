package com.myapp

/** needed package */
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise // promise interface
import com.facebook.react.bridge.Callback // call back interface
import android.app.usage.UsageEvents
import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context // android content
import android.util.Log
import java.lang.Exception


/** time package */
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;


class UsageStatsModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext) {

    /** @params */


    override fun getName(): String {
        /** @return module name */
        return "UsageStats"
    }

    /** mapping application with duractions */
    fun getAppUsage(context: Context, duration: Int) {

    }


    @ReactMethod
    fun getUsagesList(promise: Promise) {
        try {
            /** using promise b.c this function will connect with react native through the bridge
             * Promise function
             * @return list of usage data of every single app
             * */
            
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
