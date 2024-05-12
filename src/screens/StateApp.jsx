import React from 'react'
import { View, Pressable, Text } from 'react-native'
import { NativeModules } from 'react-native';
import { AppRegistry } from 'react-native'

const BackgroundHeadlessTask = async () => {
    // Your background task logic here
    console.log('Headless task executed.');
};

// Register the headless task
AppRegistry.registerHeadlessTask('BackgroundHeadlessTask', () => BackgroundHeadlessTask);

const StateApp = () => {
    const { BackgroundManager } = NativeModules;

    const onStartBtnPress = async () => {
        console.log(1);
        console.log(BackgroundManager);
        await BackgroundManager.startBackgroundWork();
    };

    const onCancelBtnPress = async () => {
        console.log(2);
        console.log(BackgroundManager);
        await BackgroundManager.stopBackgroundWork();
    };

    return (<>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
                onPress={() => onStartBtnPress()}
            >
                <Text >
                    Start
                </Text>
            </Pressable>
        
        </View>

    </>)
}
export default StateApp
