import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, Modal, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SetOnScreenTimeLimit = () => {
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeLimit, setTimeLimit] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const notificationSentRef = useRef(false);

  useEffect(() => {
    const initializeTimes = async () => {
      const storedLimit = await AsyncStorage.getItem('timeLimit');
      const storedElapsed = await AsyncStorage.getItem('elapsedTime');
      const notificationSent = await AsyncStorage.getItem('notificationSent');

      if (storedLimit) setTimeLimit(parseInt(storedLimit));
      if (storedElapsed) setElapsedTime(parseInt(storedElapsed));
      if (notificationSent) notificationSentRef.current = JSON.parse(notificationSent);
    };

    initializeTimes();

    const interval = setInterval(async () => {
      const storedElapsed = await AsyncStorage.getItem('elapsedTime');
      const elapsed = parseInt(storedElapsed) || 0;
      setElapsedTime(elapsed);

      if (timeLimit !== null && elapsed >= timeLimit && !notificationSentRef.current) {
        notifyTimeLimitReached();
        notificationSentRef.current = true;
        await AsyncStorage.setItem('notificationSent', JSON.stringify(true));
      }

      if (timeLimit !== null) {
        setRemainingTime(Math.max(0, timeLimit - elapsed));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLimit]);

  const handleSetUsageLimit = async () => {
    const limitInSeconds = selectedHour * 3600 + selectedMinute * 60;
    setTimeLimit(limitInSeconds);
    setRemainingTime(limitInSeconds);
    await AsyncStorage.setItem('timeLimit', limitInSeconds.toString());
    await AsyncStorage.setItem('notificationSent', JSON.stringify(false));
    console.log('Time Limit Set:', limitInSeconds, 'seconds'); 
    notificationSentRef.current = false;
    setModalVisible(false);
  };

  const notifyTimeLimitReached = () => {
    PushNotification.localNotification({
      channelId: 'channel-timelimit',
      title: 'Time Limit Reached',
      message: 'You have used up your app usage time for today.',
      playSound: true,
      soundName: 'default',
    });
  };

  const formattedTime = () => {
    if (timeLimit === null) return 'Not set';
    const hours = Math.floor(timeLimit / 3600);
    const minutes = Math.floor((timeLimit % 3600) / 60);
    const seconds = timeLimit % 60;
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  const humanReadableTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs} hours, ${mins} minutes, ${secs} seconds`;
  };

  return (
    <View style={styles.container}>
      <Button title="Set limit" onPress={() => setModalVisible(true)} />
      <Text style={styles.margin}>Time Limit Set: {formattedTime()}</Text>
      <Text style={styles.margin}>Remaining Time: {remainingTime !== null ? humanReadableTime(remainingTime) : 'Not set'}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Time Limit</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedHour}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedHour(itemValue)}>
                {[...Array(24).keys()].map(hour => (
                  <Picker.Item key={hour} label={`${hour} hours`} value={hour} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedMinute}
                style={styles.picker}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    margin: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: 150,
    height: 180,
  },
});

export default SetOnScreenTimeLimit;