package com.myapp

/** needed package */
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise // promise interface
import com.facebook.react.bridge.Callback // call back interface
import com.facebook.react.bridge.LifecycleEventListener

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
import android.app.Activity
import android.app.Application
import android.os.Bundle

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


class AppUsageModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext),
        Application.ActivityLifecycleCallbacks,
        LifecycleEventListener {

    private val processManager: ActivityManager = reactApplicationContext.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
    private var lastEndTime: Long = 0 //
    private var lastStartTime: Long = 0 //

    init {
        reactApplicationContext.addLifecycleEventListener(this)
        (reactApplicationContext.applicationContext as Application).registerActivityLifecycleCallbacks(this)
    }

    override fun getName(): String {
        /** @return module name */
        return "AppUsageModule"
    }

    override fun onActivityPaused(activity: Activity) {
        lastEndTime = java.lang.System.currentTimeMillis() // set last end time with paused activity
    }

    override fun onActivityResumed(activity: Activity) {
        lastStartTime = java.lang.System.currentTimeMillis() //
    }

    override fun onActivityCreated(p0: Activity, savedInstanceState: Bundle?) {
        // You can add any specific implementation here if needed
    }

    override fun onHostResume() {
        return
    }

    override fun onHostPause() {
        return
    }

    override fun onHostDestroy() {
        return
    }

    override fun onActivityDestroyed(p0: Activity) {
        // You can add any specific implementation here if needed
    }

    override fun onActivityStarted(activity: Activity) {
        // You can add any specific implementation here if needed
    }

    override fun onActivityStopped(activity: Activity) {
        // You can add any specific implementation here if needed
    }

    override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {

    }
}
