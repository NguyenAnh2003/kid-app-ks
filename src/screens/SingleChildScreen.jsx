import {
  View,
  Text,
  Image,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import globalStyle from '../styles/globalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityCard from '../components/cards/ActivityCard';
import UsageChart from '../components/UsageChart';
import { createActivity, getAllActivities, updateActivity } from '../libs';
import {
  checkForPermission,
  queryEvents,
  showUsageAccessSettings,
} from '@brighthustle/react-native-usage-stats-manager';
import moment from 'moment';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: '#fafafa',
//     paddingHorizontal: 8,
//     paddingVertical: 15,
//   },
//   textHeading: {
//     fontSize: 17,
//     color: 'black',
//   },
//   topBox: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 5,
//     paddingBottom: 5,
//   },
//   avatarChild: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//   },
// });

const numDay = 2;
const numWeek = 1;

const SingleChildScreen = ({ route, navigation }) => {
  const { AppPackaging } = NativeModules;
  const { childId, childName, childImage, phoneType } = route.params;
  const [option, setOption] = useState('recent');
  const options = ['recent', '5 days'];

  const [packageList, setPackageList] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activitiesUsage, setActivitiesUsage] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      console.log("Fetching usage data...");
      const permission = await checkForPermission();
      if (!permission) {
        showUsageAccessSettings('');
        return;
      }

      const startToday = moment().startOf('day');
      const startDateString = startToday.format('YYYY-MM-DD HH:mm:ss');
      const endDateString = new Date().toISOString();

      const startMilliseconds = new Date(startDateString).getTime();
      const endMilliseconds = new Date(endDateString).getTime();

      const usageData = await queryEvents(startMilliseconds, endMilliseconds);
      const usageDataKeys = Object.keys(usageData);
      const processedUsageData = [];

      for (let i = 0; i < usageDataKeys.length; i++) {
        const key = usageDataKeys[i];
        const { name, packageName, usageTime } = usageData[key];
        console.log("usageTime: ",usageTime);
        const validUsageTime = Number(usageTime);
        console.log("validUsageTime: ",validUsageTime);
        const dateUsed = new Date().toISOString().split('T')[0];
        processedUsageData.push({ name, packageName, validUsageTime, dateUsed });
      }

      const uniqueUsageData = processedUsageData.filter((value, index, self) =>
        index === self.findIndex((t) => t.packageName === value.packageName)
      );

      console.log("Unique usage data:", uniqueUsageData);
      setActivitiesUsage(uniqueUsageData);

      const fetchedData = await getAllActivities(childId);
      console.log("childId1: ",childId);
      console.log("Fetched activities from DB:", fetchedData);

      const currentDate = new Date().toISOString().split('T')[0];
      const filteredData = fetchedData.filter(item => item.dateUsed.split('T')[0] === currentDate).map(item => ({
        id: item.id,
        name: item.appName,
        packageName: item.packageName,
        timeUsed: item.timeUsed,
        dateUsed: item.dateUsed.split('T')[0]
      }));
      setActivities(filteredData);

      const activityMap = new Map(filteredData.map(item => [item.packageName, item]));

      console.log("Activity map:", Array.from(activityMap.entries()));

      const promises = uniqueUsageData.map(async (usageData) => {
        const { name, packageName, validUsageTime, dateUsed } = usageData;
        const existingActivity = activityMap.get(packageName);

        if (existingActivity) {
          const updatedTimeUsed = existingActivity.timeUsed;
          await updateActivity(existingActivity.id, updatedTimeUsed);
          console.log(`Updated ${name} with new time ${updatedTimeUsed}`);
        } else {
          await createActivity(childId, name, packageName, validUsageTime, dateUsed);
          console.log(`Inserted new activity ${name}`);
        }
      });

      await Promise.all(promises);

      console.log("All activities processed");

      // Refresh activityMap after processing

      // const updatedFetchedData = await getAllActivities(childId);
      // console.log("updatedFetchedData: ", updatedFetchedData);
      // console.log("childId2: ",childId);
      // const updatedFilteredData = updatedFetchedData.filter(item => item.dateUsed.split('T')[0] === currentDate).map(item => ({
      //   id: item.id,
      //   name: item.appName,
      //   packageName: item.packageName,
      //   timeUsed: item.timeUsed,
      //   dateUsed: item.dateUsed.split('T')[0]
      // }));
      // setActivities(updatedFilteredData);
      // console.log("Updated filtered data after processing:", updatedFilteredData);

    } catch (error) {
      console.error('Error fetching or inserting data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    fetchData().finally(() => setRefresh(false));
  }, [childId]);

  const dataBasedonTime = useMemo(() => {
    if (option === 'recent') {
      const today = new Date();
      const today2 = new Date(today);
      today2.setDate(today.getDate() - numDay);

      return packageList.filter(item => {
        const itemDate = new Date(item.dateUsed);
        return itemDate.getTime() >= today2.getTime() && itemDate.getTime() < today.getTime();
      });
    }
    if (option === '5 days') {
      const today = new Date();
      const previousWeek = new Date(today);
      previousWeek.setDate(today.getDate() - 7 * numWeek);

      return packageList.filter(item => {
        const itemDate = new Date(item.dateUsed);
        return itemDate >= previousWeek && itemDate < today;
      });
    }
  }, [option, packageList]);

  useEffect(() => {
    const fetchProcessedData = async () => {
      const processedPackage = await AppPackaging.preprocessAppPackageInfo(dataBasedonTime);
      if (processedPackage) {
        setActivities(processedPackage);
      }
    };

    fetchProcessedData();
  }, [dataBasedonTime, option]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignContent: 'center', gap: 10 }}>
          <Image
            source={{ uri: childImage, width: 30, height: 30 }}
            style={{ marginLeft: -20, borderRadius: 10 }}
          />
          <Text style={{ color: '#333', fontSize: 15, fontWeight: '600' }}>
            {childName}
          </Text>
        </View>
      ),
    });
  }, [childId, navigation]);

  return (
    <ScrollView
    contentContainerStyle={styles.scrollViewContent}
    refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refresh} />}
    >
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.childInfo}>
          <Image source={{ uri: childImage }} style={styles.avatarChild} />
          <View>
            <Text style={styles.textHeading}>{childName}</Text>
            <Text style={styles.phoneType}>{phoneType}</Text>
          </View>
        </View>
        <MaterialCommunityIcons
          name="account-edit-outline"
          size={24}
          color={'black'}
          onPress={() => navigation.navigate('EditChild', { childId })}
        />
      </View>

      <View style={styles.optionsContainer}>
        {options.map((i, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => setOption(i)}
          >
            <Text style={styles.optionButtonText}>{i.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.activitiesTitle}>
        Activities in {option.toUpperCase()}
      </Text>

      <View style={styles.activitiesContainer}>
        {activities?.length ? (
          <ScrollView contentContainerStyle={styles.activitiesContent}>
            {activities.map((activity, index) => (
              <ActivityCard
                key={index}
                packageName={activity.name}
                packageImage={activity.icon}
                packageTimeUsed={activity.timeUsed}
                packageDateUsed={activity.dateUsed}
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noActivitiesText}>
            There are no activities in recent
          </Text>
        )}
      </View>

      {activities?.length > 0 && (
        <>
          <Text style={styles.usageChartTitle}>Usage Chart</Text>
          <UsageChart activities={activities} />
        </>
      )}
    </View>
  </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    ...globalStyle.container,
    paddingTop: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarChild: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textHeading: {
    fontSize: 18,
    fontWeight: '700',
  },
  phoneType: {
    color: '#a5a5a5',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  optionButton: {
    padding: 10,
    backgroundColor: '#000',
    minWidth: 80,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  activitiesTitle: {
    color: 'black',
    marginTop: 15,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '700',
  },
  activitiesContainer: {
    maxHeight: 200,
  },
  activitiesContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    gap: 12,
  },
  noActivitiesText: {
    color: 'red',
    marginTop: 95,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  usageChartTitle: {
    color: 'black',
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '600',
  },
});
export default SingleChildScreen;
