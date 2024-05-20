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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fafafa',
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  textHeading: {
    fontSize: 17,
    color: 'black',
  },
  topBox: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 5,
    paddingBottom: 5,
  },
  avatarChild: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});

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
  const startToday = moment().startOf('day');

  const startDateString = startToday.format('YYYY-MM-DD HH:mm:ss');
  const endDateString = new Date().toISOString();

  const startMilliseconds = new Date(startDateString).getTime();
  const endMilliseconds = new Date(endDateString).getTime();

  // Fetch data and update state
  useEffect(() => {
    const fetchAndInsertData = async () => {
      try {
        const permission = await checkForPermission();
        if (!permission) {
          showUsageAccessSettings('');
          return;
        }
        
        const usageData = await queryEvents(startMilliseconds, endMilliseconds);
        
        const usageDataKeys = Object.keys(usageData);
        const processedUsageData = [];

        for (let i = 0; i < usageDataKeys.length; i++) {
          const key = usageDataKeys[i];
          const { name, packageName, usageTime } = usageData[key];
          const validUsageTime = Number(usageTime);
          const dateUsed = new Date().toISOString().split('T')[0];
          processedUsageData.push({ name, packageName, validUsageTime, dateUsed });
        }
        setActivitiesUsage(processedUsageData);
        
        const fetchedData = await getAllActivities(childId);
        setPackageList(fetchedData);
        const currentDate = new Date().toISOString().split('T')[0];
        const filteredData = packageList.filter(item => item.dateUsed.split('T')[0] === currentDate).map(item => ({
        id: item.id,
        name: item.appName,
        packageName: item.packageName,
        timeUsed: item.timeUsed,
        dateUsed: item.dateUsed.split('T')[0]
    }));
    setActivities(filteredData);
      } catch (error) {
        console.error('Error fetching or inserting data:', error.message);
      }
    };

    fetchAndInsertData();
    const intervalId = setInterval(fetchAndInsertData, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, [childId]);

  // Insert or update activities in the database
  useEffect(() => {
    const insertOrUpdateActivities = async () => {
      try {
        const usageData = await queryEvents(startMilliseconds, endMilliseconds);
        
        const usageDataKeys = Object.keys(usageData);
        const processedUsageData = [];

        for (let i = 0; i < usageDataKeys.length; i++) {
          const key = usageDataKeys[i];
          const { name, packageName, usageTime } = usageData[key];
          const validUsageTime = Number(usageTime);
          const dateUsed = new Date().toISOString().split('T')[0];
          processedUsageData.push({ name, packageName, validUsageTime, dateUsed });
        }

        const fetchedData = await getAllActivities(childId);
        const currentDate = new Date().toISOString().split('T')[0];
        const activities = fetchedData.filter(item => item.dateUsed.split('T')[0] === currentDate).map(item => ({
          id: item.id,
          name: item.appName,
          packageName: item.packageName,
          timeUsed: item.timeUsed,
          dateUsed: item.dateUsed.split('T')[0]
        }));

        // Prepare an array of promises for updating or creating activities
        const promises = processedUsageData.map(async (usageData) => {
          const { name, packageName, validUsageTime, dateUsed } = usageData;
          const existingActivity = activities.find(activity => activity.packageName === packageName);
          console.log("Existing activity:", existingActivity ? existingActivity.packageName : null);
          // You can include your update and create logic here
          // Example:
          if (existingActivity) {
            const updatedTimeUsed = existingActivity.timeUsed; // Adjust time calculation as needed
            await updateActivity(existingActivity.id, updatedTimeUsed);
          } else {
            await createActivity(childId, name, packageName, validUsageTime, dateUsed);
          }
          // Return a resolved promise for each iteration
          return Promise.resolve();
        });
        
        // Wait for all promises to resolve
        await Promise.all(promises);
        
        
        console.log("All activities processed");
      } catch (error) {
        console.error('Error fetching or inserting data:', error.message);
      }
    };

    insertOrUpdateActivities();
    const intervalId = setInterval(insertOrUpdateActivities, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activitiesUsage]);


  const onRefresh = useCallback(() => {
    setRefresh(true);
    setRefresh(false);
  }, []);

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
    const fetchData = async () => {
      const processedPackage = await AppPackaging.preprocessAppPackageInfo(dataBasedonTime);
      if (processedPackage) {
        setActivities(processedPackage);
      }
    };

    fetchData();
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
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
      }
    >
      <View
        style={[globalStyle.container, { paddingTop: 20, paddingBottom: 0 }]}
      >
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={[
                styles.topBox,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  paddingRight: 10,
                  borderBottomWidth: 1,
                  borderColor: '#f2f2f2',
                },
              ]}
            >
              <View style={styles.topBox}>
                <Image
                  source={{ uri: childImage }}
                  style={styles.avatarChild}
                />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.textHeading}>{childName}</Text>
                  <Text style={{ color: '#a5a5a5' }}>{phoneType}</Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={24}
                color={'black'}
                onPress={() =>
                  navigation.navigate('EditChild', {
                    childId: childId,
                  })
                }
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {options.map((i, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ padding: 10, backgroundColor: '#000', minWidth: 80 }}
                  onPress={() => setOption(i)}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 15,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    {i.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={{
                color: 'black',
                marginTop: 15,
                marginLeft: 5,
                fontSize: 20,
                fontWeight: '700',
              }}
            >
              Activities in {option.toUpperCase()}
            </Text>
            <View style={{ maxHeight: 200 }}>
              {activities?.length !== 0 ? (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <View
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 15,
                      backgroundColor: '#fff',
                      flexDirection: 'column',
                      gap: 12,
                    }}
                  >
                    {activities?.map((i, index) => (
                      <ActivityCard
                        key={index}
                        packageName={i.name}
                        packageImage={i.icon}
                        packageTimeUsed={i.timeUsed}
                        packageDateUsed={i.dateUsed}
                      />
                    ))}
                  </View>
                </ScrollView>
              ) : (
                <Text
                  style={{
                    color: 'red',
                    marginTop: 95,
                    marginLeft: 5,
                    fontSize: 20,
                    fontWeight: '500',
                    textAlign: 'center'
                  }}
                >
                  There are no activities in recent
                </Text>
              )}
            </View>
            {activities?.length !== 0 && (
              <>
                <Text
                  style={{
                    color: 'black',
                    marginLeft: 5,
                    fontSize: 20,
                    fontWeight: '600',
                  }}
                >
                  Usage Chart
                </Text>
                {activities && <UsageChart activities={activities} />}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default SingleChildScreen;
