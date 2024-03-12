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
        val am: ActivityManager = reactApplicationContext.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val runningProcesses: MutableList<ActivityManager.RunningAppProcessInfo> = am.getRunningAppProcesses()

        for(rp in runningProcesses) {
            val processName: String = rp.processName
            val pid: Int = rp.pid

            Log.d("RunningProcess", "package: ${processName} - ${pid}")
        }
    }
    
}
