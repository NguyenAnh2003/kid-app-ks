import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Modal, Text, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import PushNotification from 'react-native-push-notification';

const SetTimeLimitScreen = () => {
  const [usageLimit, setUsageLimit] = useState(60); // Limit in seconds
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [usageTime, setUsageTime] = useState(0);
  const [alertShown, setAlertShown] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (appState === 'active') {
      const timerId = setInterval(() => {
        setUsageTime((time) => {
          const newTime = time + 1;
          console.log(`Time used: ${newTime} second(s)`); // Log the updated time to console
          return newTime;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [appState]);

  useEffect(() => {
    if (usageTime >= usageLimit && !alertShown) {
      Alert.alert(
        "Thông báo",
        "Đã quá thời gian cho phép!",
        [{ text: "OK", onPress: () => console.log("Alert closed") }],
        { cancelable: false }
      );
      setAlertShown(true); // Prevent further alerts until limit is reset
    }
  }, [usageTime, alertShown]);

  const handleAppStateChange = (nextAppState) => {
    setAppState(nextAppState);
  };

  const handleSetUsageLimit = () => {
    setModalVisible(true);
    setAlertShown(false); // Reset alert shown flag when setting a new limit
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    const newLimit = selectedHour * 3600 + selectedMinute * 60;
    setUsageLimit(newLimit); // Set limit in seconds
    // setUsageTime(0); // Reset usage time when limit is set
    setAlertShown(false); // Reset alert shown flag
    AsyncStorage.setItem('usageLimit', newLimit.toString()); // Store new usage limit
    setModalVisible(false);
    Alert.alert('Thiết lập thành công', `Hạn chế đã được đặt là ${selectedHour} giờ ${selectedMinute} phút.`);
  };

  const formattedTime = () => {
    const hours = Math.floor(usageLimit / 3600);
    const minutes = Math.floor((usageLimit % 3600) / 60);
    return `${hours} giờ ${minutes} phút`;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Set limit" onPress={handleSetUsageLimit} />
      <Text style={{ margin: 10 }}>Thời gian đã đặt: {formattedTime()}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '50%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>Time Limit</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Picker
                selectedValue={selectedHour}
                style={{ flex: 1 }}
                onValueChange={(itemValue) => setSelectedHour(itemValue)}>
                {[...Array(24).keys()].map((hour) => (
                  <Picker.Item key={hour} label={`${hour} hours`} value={hour} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedMinute}
                style={{ flex: 1 }}
                onValueChange={(itemValue) => setSelectedMinute(itemValue)}>
                {[...Array(60).keys()].map((minute) => (
                  <Picker.Item key={minute} label={`${minute} minutes`} value={minute} />
                ))}
              </Picker>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Button title="Cancel" onPress={handleCancel} />
              <Button title="OK" onPress={handleOk} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SetTimeLimitScreen;
