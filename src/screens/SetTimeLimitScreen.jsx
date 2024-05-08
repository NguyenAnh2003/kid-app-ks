import React, { useState, useEffect } from 'react';
import { View, Button, Text, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  EventFrequency,
  checkForPermission,
  queryUsageStats,
  showUsageAccessSettings,
} from '@brighthustle/react-native-usage-stats-manager';
import moment from 'moment'; // Added moment for potential time manipulations

const SetTimeLimitScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [usageLimit, setUsageLimit] = useState(null);
  const [remainingMinutes, setRemainingMinutes] = useState(null);

  useEffect(() => {
    checkPermissionAndFetchUsage();
  }, []);

  useEffect(() => {
    if (usageLimit !== null) {
      fetchUsageStats();  // Fetch stats only after usageLimit is updated
    }
  }, [usageLimit]); // Effect triggers on change in usageLimit

  const formattedTime = () => `${selectedHour} hours ${selectedMinute} minutes`;

  const humanReadableMillis = (milliSeconds) => {
    const seconds = Math.floor(milliSeconds / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }
  };

  const checkPermissionAndFetchUsage = async () => {
    const hasPermission = await checkForPermission();
    if (!hasPermission) {
      showUsageAccessSettings("com.myapp");
    }
  };

  const saveUsageLimit = async (minutes) => {
    try {
      await AsyncStorage.setItem('usageLimit', minutes.toString());
      console.log('Usage limit saved:', minutes);
    } catch (error) {
      console.error('Failed to save usage limit:', error);
    }
  };

  const handleSetUsageLimit = async () => {
    const usageLimitMinutes = selectedHour * 60 + selectedMinute;
    await saveUsageLimit(usageLimitMinutes);
    setUsageLimit(usageLimitMinutes);
    setModalVisible(false);
  };

  const fetchUsageStats = async () => {
    const permission = await checkForPermission();
    if (!permission) {
      Alert.alert("Permission Denied", "Please enable usage access for the app.", [
        { text: "Cancel", onPress: () => console.log("Permission denied by user") },
        { text: "Open Settings", onPress: () => showUsageAccessSettings("com.myapp") }
      ]);
      return;
    }
  
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const startOfToday = startDate.getTime();
    const endDate = new Date();
    const endMilliseconds = endDate.getTime();
  
    try {
      const result = await queryUsageStats(
        EventFrequency.INTERVAL_DAILY,
        startOfToday,
        endMilliseconds
      );
  
      console.log("Detailed App Usage Stats:");
      Object.keys(result).forEach(app => {
        const appUsageSeconds = result[app].totalTimeInForeground / 1000;
        console.log(`App: ${app}, Usage: ${appUsageSeconds.toFixed(3)} seconds`);
      });
  
      if (result['com.myapp']) {
        const totalSecondsUsed = result['com.myapp'].totalTimeInForeground / 1000;  // Convert from milliseconds to seconds
        const remaining = (usageLimit * 60) - totalSecondsUsed;  // Calculate remaining seconds
        setRemainingMinutes(Math.max(0, remaining));
  
        const humanReadableRemainingTime = humanReadableMillis(Math.max(0, remaining) * 1000);  // Ensure remaining time cannot be negative in display
  
        Alert.alert("Limit Set", `Your new time limit is ${formattedTime()}. You have ${humanReadableRemainingTime} remaining today.`);
      } else {
        console.log('No usage stats available for com.myapp');
      }
    } catch (error) {
      console.error('Failed to fetch usage stats:', error);
    }
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Set limit" onPress={() => setModalVisible(true)} />
      <Text style={{ margin: 10 }}>Time Limit Set: {formattedTime()}</Text>
      <Text style={{ margin: 10 }}>Remaining Time: {remainingMinutes !== null ? humanReadableMillis(remainingMinutes * 1000) : 'Not set'}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>Set Time Limit</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Picker
                 selectedValue={selectedHour}
                 style={{ width: 150, height: 180 }}
                 onValueChange={(itemValue) => setSelectedHour(itemValue)}>
                 {[...Array(24).keys()].map(hour => (
                   <Picker.Item key={hour} label={`${hour} hours`} value={hour} />
                 ))}
               </Picker>
              <Picker
                 selectedValue={selectedMinute}
                 style={{ width: 160, height: 180 }}
                 onValueChange={(itemValue) => setSelectedMinute(itemValue)}>
                 {[...Array(60).keys()].map(minute => (
                   <Picker.Item key={minute} label={`${minute} minutes`} value={minute} />
                 ))}
              </Picker>
            </View>
            <Button title="Set" onPress={handleSetUsageLimit} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SetTimeLimitScreen;
