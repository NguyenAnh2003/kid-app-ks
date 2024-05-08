import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventFrequency, queryUsageStats } from '@brighthustle/react-native-usage-stats-manager';
import notifee from '@notifee/react-native';

const BackgroundTask = async () => {
  try {
    const usageLimitInMinutesStr = await AsyncStorage.getItem('usageLimit');
    const usageLimitInMinutes = parseInt(usageLimitInMinutesStr, 10);

    if (!usageLimitInMinutes) {
      console.log('No usage limit set');
      return;
    }

    console.log(`Starting background task with a limit of ${usageLimitInMinutes} minutes.`);
    const startOfToday = new Date().setHours(0, 0, 0, 0);
    const endMilliseconds = new Date().getTime();

    const usageResult = await queryUsageStats(EventFrequency.INTERVAL_DAILY, startOfToday, endMilliseconds);

    if (usageResult['com.myapp']) {
      const totalSecondsUsedToday = usageResult['com.myapp'].totalTimeInForeground / 1000;
      const remainingSeconds = Math.max(0, usageLimitInMinutes * 60 - totalSecondsUsedToday);

      if (remainingSeconds === 0) {
        await notifyTimeLimitExceeded();
      } else {
        const checkInterval = Math.min(remainingSeconds * 1000, 60000); // Check every minute or remaining time if less
        setTimeout(async () => {
          await BackgroundTask(); // Recheck remaining time after interval
        }, checkInterval);
      }
    } else {
      console.log('No usage stats available for com.myapp today.');
    }
  } catch (error) {
    console.error('Error in background task:', error);
  }
};

async function notifyTimeLimitExceeded() {
  console.log('Time limit exceeded. Sending notification.');

  // Display a notification
  await notifee.displayNotification({
    title: 'Time Limit Exceeded',
    body: 'You have exceeded your daily usage limit!',
    android: {
      channelId: 'default',
      importance: 'high',
      sound: 'default',
    },
    ios: {
      sound: 'default',
    },
  });
}

export default BackgroundTask;
