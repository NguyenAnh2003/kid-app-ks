export const handleScreenStateChange = async (isScreenOn) => {
  const lastScreenState = await AsyncStorage.getItem('lastScreenState');
  if (lastScreenState === null || JSON.parse(lastScreenState) !== isScreenOn) {
    console.log(`Screen is ${isScreenOn ? 'ON' : 'OFF'}`);
    await AsyncStorage.setItem('lastScreenState', JSON.stringify(isScreenOn));
  }
};
