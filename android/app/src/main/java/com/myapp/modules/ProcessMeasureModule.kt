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
import android.app.AppOpsManager
import android.provider.Settings;
import android.content.Context // android context
import android.app.ActivityManager

/** */
import android.util.Log
import java.lang.Exception

/** time package */
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.HashMap
import java.util.List;

/**  */
import android.content.Intent;
import java.lang.System


class ProcessMeasureModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext) {

    override fun getName(): String {
        /** @return module name */
        return "ProcessMeasureModule"
    }

    /** process killed measure */
    @ReactMethod
    fun getRunningApps(promise: Promise) {
        try {
            val result = WritableNativeMap()

            val am: ActivityManager = reactApplicationContext.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
            val runningProcesses: MutableList<ActivityManager.RunningAppProcessInfo> = am.getRunningAppProcesses()

            for(rp in runningProcesses) {
                val process = WritableNativeMap()

                val name: String = rp.processName.toString()
                val pid: Int = rp.pid

                process.putString("name", name)
                process.putInt("pId", pid)

                Log.d("RunningProcess", "package: ${name} - ${pid}")

                result.putMap(rp.processName, process)
            }

            promise.resolve(result)
        } catch(e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
    
}
