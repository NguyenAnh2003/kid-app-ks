// hooks/useMonitor.js
import { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import moment from 'moment';
import {
  getAllActivities,
  updateActivity,
  createActivity
} from '../libs';
import {
    checkForPermission,
    queryEvents,
    showUsageAccessSettings
} from '@brighthustle/react-native-usage-stats-manager';
const { AppPackaging } = NativeModules;
ReactNativeForegroundService.register();

const useMonitor = (childId) => {
  const [activities, setActivities] = useState([]);
  const [activitiesUsage, setActivitiesUsage] = useState([]);

  useEffect(() => {
    const fetchUsageData = async () => {
      try {
        console.log("Fetching usage data...");
        const permission = await checkForPermission();
        if (!permission) {
          showUsageAccessSettings('');
          return;
        }

        const startToday = moment().startOf('day');
        const startDateString = startToday.format('YYYY-MM-DD HH:mm:ss');
        const endDateString = new Date().toISOString();

        const startMilliseconds = new Date(startDateString).getTime();
        const endMilliseconds = new Date(endDateString).getTime();

        const usageData = await queryEvents(startMilliseconds, endMilliseconds);
        const usageDataKeys = Object.keys(usageData);
        const processedUsageData = [];

        for (let i = 0; i < usageDataKeys.length; i++) {
          const key = usageDataKeys[i];
          const { name, packageName, usageTime } = usageData[key];
          const validUsageTime = Number(usageTime);
          const dateUsed = new Date().toISOString().split('T')[0];
          processedUsageData.push({ name, packageName, validUsageTime, dateUsed });
        }

        const uniqueUsageData = processedUsageData.filter((value, index, self) =>
          index === self.findIndex((t) => t.packageName === value.packageName)
        );

        console.log("Unique usage data:", uniqueUsageData);
        setActivitiesUsage(uniqueUsageData);

        const fetchedData = await getAllActivities(childId);
        console.log("Fetched activities from DB:", fetchedData);

        const currentDate = new Date().toISOString().split('T')[0];
        const filteredData = fetchedData.filter(item => item.dateUsed.split('T')[0] === currentDate).map(item => ({
          id: item.id,
          name: item.appName,
          packageName: item.packageName,
          timeUsed: item.timeUsed,
          dateUsed: item.dateUsed.split('T')[0]
        }));
        setActivities(filteredData);

        const activityMap = new Map(filteredData.map(item => [item.packageName, item]));

        console.log("Activity map:", Array.from(activityMap.entries()));

        const promises = uniqueUsageData.map(async (usageData) => {
          const { name, packageName, validUsageTime, dateUsed } = usageData;
          const existingActivity = activityMap.get(packageName);

          if (existingActivity) {
            const updatedTimeUsed = existingActivity.timeUsed;
            await updateActivity(existingActivity.id, updatedTimeUsed);
            console.log(`Updated ${name} with new time ${updatedTimeUsed}`);
          } else {
            await createActivity(childId, name, packageName, validUsageTime, dateUsed);
            console.log(`Inserted new activity ${name}`);
          }
        });

        await Promise.all(promises);
        console.log("All activities processed");

      } catch (error) {
        console.error('Error fetching or inserting data:', error.message);
      }
    };

    ReactNativeForegroundService.add_task(
      fetchUsageData,
      {
        delay: 30000,
        onLoop: true,
        taskId: 'monitorTask',
        onError: (e) => console.log('Error logging:', e),
      }
    );

    return () => {
      ReactNativeForegroundService.stop();
      ReactNativeForegroundService.remove_task('monitorTask');
    };
  }, [childId]);

  return { activities, activitiesUsage };
};

export default useMonitor;
