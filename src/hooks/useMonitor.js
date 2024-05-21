import { useEffect, useState, useCallback, useMemo } from 'react';
import { NativeModules } from 'react-native';
import ForegroundService from '@supersami/rn-foreground-service';

const { AppPackaging } = NativeModules;
ReactNativeForegroundService.register();
const useMonitor = (childId) => {
  /**  */
  useEffect(() => {
    ReactNativeForegroundService.add_task(
      async () => {

      },
      {
        delay: 30000,
        onLoop: true,
        taskId: 'monitorTask',
        onError: (e) => console.log('Error logging:', e),
      }
    );
    // return () => {
    //   ReactNativeForegroundService.stop();
    //   ReactNativeForegroundService.remove_task('elapsedTimeTask');
    // };
  }, []);
};


export default useMonitor;
