package com.myapp

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

class BackgroundHeadlessTaskService : HeadlessJsTaskService() {

    override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig? {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channelId = "demo"
            createNotificationChannel(channelId)

            val notification = NotificationCompat.Builder(applicationContext, "demo")
                .setContentTitle("Headless Work")
                .setTicker("runn")
                .setSmallIcon(R.mipmap.ic_launcher)
                .setOngoing(true)
                .build()
            startForeground(1, notification)
        }
        Log.d("BGHeadlessTask", "i am here")
        val extras = intent.extras
        if (extras != null) {
            return HeadlessJsTaskConfig(
                "BackgroundHeadlessTask",
                Arguments.fromBundle(extras),
                5000,
                true
            )
        }
        return null
    }
    @RequiresApi(Build.VERSION_CODES.O)
    private fun createNotificationChannel(channelId: String) {
        val channelName = "Demo Channel"
        val description = "This is a demo notification channel"
        val importance = NotificationManager.IMPORTANCE_DEFAULT
        val channel = NotificationChannel(channelId, channelName, importance).apply {
            this.description = description
        }
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.createNotificationChannel(channel)
    }
}
