package com.myapp

/** needed package */
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise // promise interface
import com.facebook.react.bridge.Callback // call back interface
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.common.MapBuilder

/** */
import android.content.Context // android content
import android.util.Log
import java.lang.Exception

/** time package */
import java.text.SimpleDateFormat
import java.util.ArrayList
import java.util.Calendar
import java.util.HashMap
import java.util.List;


class AppPackageModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext) {
    override fun getName(): String {
        /** @return module name */
        return "AppPackaging"
    }

    /** test function */
    @ReactMethod
    fun preprocessAppPackageInfo(appPackages: ReadableArray,
                                 promise: Promise) {
        try {
            val processedPackages = WritableNativeMap()

            for(i in 0 until appPackages.size()) {
                /** temp var */
                val packageMap = WritableNativeMap()
                val packageInfo = appPackages.getMap(i)
                /** put */
                Log.d("spackages", "${packageInfo}")

                packageMap.putString("id", packageInfo.getString("id"))
                packageMap.putString("name", packageInfo.getString("name"))
                packageMap.putString("packageName", packageInfo.getString("packageName"))
                packageMap.putInt("timeUsed", packageInfo.getInt("timeUsed"))
                packageMap.putString("dateUsed", packageInfo.getString("dateUsed"))
                /** put result */
                processedPackages.putMap(packageInfo.getString("id").toString(),
                        packageMap)
            }

            /** return result */
            promise.resolve(processedPackages)
        } catch (e: java.lang.Exception) {
            promise.reject("${e.message}")
        }
    }

}
