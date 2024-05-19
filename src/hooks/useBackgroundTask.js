import { useEffect } from 'react';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNotification, handleScreenStateChange } from '../libs';
import { NativeModules } from 'react-native';

/** lib foreground */
ReactNativeForegroundService.register();
const useBackgroundTask = (parentId, childId, hourUsage, minuteUsage) => {
  /** power module */
  const { PowerManager } = NativeModules;

  /**  */
  useEffect(() => {

    ReactNativeForegroundService.add_task(
      async () => {
        PowerManager.isScreenOn(async (isScreenOn) => {
          handleScreenStateChange(isScreenOn);

          if (isScreenOn) {
            // Daily counting logic
            const today = new Date().toISOString().split('T')[0];
            let lastRecordedDate = await AsyncStorage.getItem(
              'lastRecordedDate'
            );
            if (lastRecordedDate !== today) {
              await AsyncStorage.setItem('elapsedTime', '0');
              await AsyncStorage.setItem('lastRecordedDate', today);
              lastRecordedDate = today;
            }

            let elapsedTime =
              parseInt(await AsyncStorage.getItem('elapsedTime')) || 0;
            elapsedTime += 1;
            console.log(elapsedTime);
            await AsyncStorage.setItem('elapsedTime', elapsedTime.toString());

            const timeLimit =
              parseInt(await AsyncStorage.getItem('timeLimit')) || 0;
            const notificationSent = JSON.parse(
              await AsyncStorage.getItem('notificationSent')
            );

            // Check timeLimit and Insert Supabase
            // if (elapsedTime >= timeLimit && timeLimit > 0 && !notificationSent) {
            //   const parentId = '1baf7534-f582-403f-a5ef-f09464b5733e';
            //   const childId = 'b36a72b2-0e6b-4f2e-b530-dc7cb9f3dae6';
            //   const description = 'Time limit reached';
            //   const now = new Date();
            //   const date = now.toLocaleString(); // Convert to local date and time string

            //   console.log('Creating notification with:', { parentId, childId, description, date });
            //   try {
            //     const notificationStatus = await createNotification(parentId, childId, description, date);
            //     await AsyncStorage.setItem('notificationSent', JSON.stringify(true));
            //   } catch (error) {
            //     console.error('Error in notification process:', error);
            //   }
            // }
          }
        });
      },
      {
        delay: 1000,
        onLoop: true,
        taskId: 'elapsedTimeTask',
        onError: (e) => console.log('Error logging:', e),
      }
    );

    ReactNativeForegroundService.start({
      id: 1244,
      title: 'Foreground Service',
      message: 'Tracking screen time',
      icon: 'ic_launcher',
      button: true,
      button2: true,
      buttonText: 'Stop',
      button2Text: 'Cancel',
      buttonOnPress: 'stopService',
      setOnlyAlertOnce: true,
      color: '#000000',
      progress: {
        max: 100,
        curr: 50,
      },
    });
    // return () => {
    //   ReactNativeForegroundService.stop();
    //   ReactNativeForegroundService.remove_task('elapsedTimeTask');
    // };
  }, []);
};

export default useBackgroundTask;
