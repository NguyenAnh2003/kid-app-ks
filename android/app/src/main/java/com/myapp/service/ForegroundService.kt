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
import android.app.AppOpsManager
import android.app.Service
import android.os.IBinder
import android.app.ActivityManager
import android.app.ActivityManager.RunningAppProcessInfo
import androidx.core.app.NotificationCompat
//import android.support.v4.app.NotificationCompat;
import android.content.Intent

/** */
import android.content.Context // android content
import android.util.Log
import java.lang.Exception

/** time package */
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.HashMap
import java.util.List;


class ForegroundService : Service() {

    /** */
    override fun onCreate() {
        super.onCreate()
        Log.d("onCreateForeGround", "running")
        /** get process list */

        /** get package */

    }

    /** */
    override fun onBind(intent: Intent): IBinder? {
        return null
    }

    /**  */
    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
        when(intent?.action) {
            Actions.START.toString() -> start()
            Actions.STOP.toString() -> stopSelf()
        }

        /** return? */
         return super.onStartCommand(intent, flags, startId) //
    }

    /** enum class */
    enum class Actions { START, STOP }

    /** start foreground service */
    private fun start() {
        val notification = NotificationCompat.Builder(this, "running_channel")
                .setContentTitle("MyApp is active").setContentText("monitoring app").build()
        Log.d("StartFservice", "starting")
        startForeground(1, notification)
    }

    private fun getRunningApps() {
        /**  */
        val am: ActivityManager = getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val runningAppProcesses: MutableList<ActivityManager.RunningAppProcessInfo> =
                am.getRunningAppProcesses()

        for(process in runningAppProcesses) {
            Log.d("Process", "package ${process.processName}")
        }
    }
}
