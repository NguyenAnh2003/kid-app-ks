package com.myapp

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
// import android.os.Handler
import android.os.IBinder
import androidx.core.app.NotificationCompat
import com.facebook.react.HeadlessJsTaskService
import android.util.Log

class BackgroundService : Service() {

    companion object {
        private const val SERVICE_NOTIFICATION_ID = 12345
        private const val CHANNEL_ID = "HEARTBEAT"
    }

    // private val handler = Handler()
    private val runnableCode = object : Runnable {
        override fun run() {
            val context: Context = applicationContext
            val myIntent = Intent(context, BackgroundHeadlessTaskService::class.java)
            context.startService(myIntent)
            HeadlessJsTaskService.acquireWakeLockNow(context)
            Log.d("BG", "111")
            // handler.postDelayed(this, 2000)
        }
    }

    private fun createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(CHANNEL_ID, "HEARTBEAT", importance).apply {
                description = "CHANNEL DESCRIPTION"
            }
            val notificationManager: NotificationManager =
                getSystemService(NotificationManager::class.java)
            notificationManager.createNotificationChannel(channel)
        }
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    override fun onCreate() {
        super.onCreate()
    }

    override fun onDestroy() {
        super.onDestroy()
        // handler.removeCallbacks(runnableCode)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // handler.post(runnableCode)
        createNotificationChannel()
        val notificationIntent = Intent(this, MainActivity::class.java)
        val contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT)
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Heartbeat service")
            .setContentText("Running...")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentIntent(contentIntent)
            .setOngoing(true)
            .build()
        startForeground(SERVICE_NOTIFICATION_ID, notification)
        return START_STICKY
    }
}
