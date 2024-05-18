/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, processColor } from 'react-native';
import {
    EventFrequency,
    checkForPermission,
    queryEvents,
    queryEventsStats,
    showUsageAccessSettings,
} from '@brighthustle/react-native-usage-stats-manager';
import moment from 'moment';

export default function Monitor() {
    // const [result, setRes ult] = React.useState<any | undefined>('test');
    const startToday = moment().startOf('day');

    const startDateString = startToday.format('YYYY-MM-DD HH:mm:ss');
    const endDateString = new Date();

    const startMilliseconds = new Date(startDateString).getTime();
    const endMilliseconds = new Date(endDateString).getTime();

    const getHours = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        return `${hours} hr : ${minutes} min`;
    };

    function humanReadableMillis(milliSeconds) {
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
    }

    const handleSelect = (event) => {

        console.log(event.nativeEvent);
    };
    const [data, setData] = useState([]);
    useEffect(() => {
        let isMounted = true;

        checkForPermission().then((res) => {
            console.log('permission ::', res);
            if (!res) {
                showUsageAccessSettings('');
            }
        });

        queryEvents(startMilliseconds, endMilliseconds).then((res) => {
            if (isMounted) {
                for (let i = 0; i < 3; i++) {
                    console.log('data ::', res[i]);
                    const dataTemp = {
                        value: res[i].usageTime,
                        label: res[i].name ? res[i].name : res[i].packageName,
                    };
                    setData(prevData => [...prevData, dataTemp]);
                }
            }
        });

        return () => {
            isMounted = false; // Cleanup function to mark component as unmounted
        };
    }, []);

    return (
        <View>

            {data.map((data) => {
                return (
                    <View
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                        key={data.label}
                    >
                        <Text>{data.label}</Text>
                        <Text>{humanReadableMillis(data.value)}</Text>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
    chart: {
        // flex: 1,
        height: 350,
    },
});