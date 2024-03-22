import { View, Text } from 'react-native';
import React from 'react';

const ChildActivity = React.memo(({ childId, appName, appUsageTime, date }) => {
  /** activity data
   * @description child activity will be described with childId, application (app)
   *  app icon, app usage time, and finally date they use this activity
   * @param childId
   * @param applicationName - appIcon (how to process?)
   * @param appUsageTime
   * @param date
   */

  return (
    <View>
      <Text style={{ color: 'black' }}>ChidId {childId}</Text>
      <Text style={{ color: 'black' }}>appName {appName}</Text>
      <Text style={{ color: 'black' }}>usage {appUsageTime}</Text>
      <Text style={{ color: 'black' }}>{date}</Text>
    </View>
  );
});

export default ChildActivity;
