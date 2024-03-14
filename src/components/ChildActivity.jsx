import { View, Text } from 'react-native';
import React from 'react';

const ChildActivity = React.memo(({childId, appName, appUsageTime, Date}) => {
  
  /** activity data
   * @param childId
   * @param application name
   * @param app time used
   * @param Date
   */

  return (
    <View>
      <Text>ChildActivity</Text>
    </View>
  );
});

export default ChildActivity;
