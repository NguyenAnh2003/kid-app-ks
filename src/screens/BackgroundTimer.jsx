import React, { useEffect, useState } from 'react';
import { View, Text, AppState } from 'react-native';

const BackgroundTimer = () => {
  const [screenTime, setScreenTime] = useState(0);
  const [isScreenOn, setIsScreenOn] = useState(true);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      setIsScreenOn(nextAppState === 'active');
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    let intervalId;

    const calculateScreenTime = () => {
      if (isScreenOn) {
        setScreenTime((prevTime) => prevTime + 1);
      }
    };

    intervalId = setInterval(calculateScreenTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isScreenOn]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Screen Time: {formatTime(screenTime)}</Text>
    </View>
  );
};

export default BackgroundTimer;

