import { View, Text, Image, StyleSheet, NativeModules } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import globalStyle from '../styles/globalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityCard from '../components/cards/ActivityCard';
import UsageChart from '../components/UsageChart';

const styles = StyleSheet.create({
  /** container */
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fafafa',
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  /** name */
  textHeading: {
    fontSize: 17,
    color: 'black',
  },
  /** flexbox for name and image */
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

const packageList = [
  {
    id: '1',
    name: 'facebook',
    packageName: 'com.myapp',
    timeUsed: 10,
    dateUsed: '2024-04-26',
  },
  {
    id: '2',
    name: 'facebook',
    packageName: 'com.myapp',
    timeUsed: 1,
    dateUsed: '2024-04-23',
  },
  {
    id: '3',
    name: 'instagram',
    packageName: 'com.myapp',
    timeUsed: 1,
    dateUsed: '2024-04-26',
  },
  {
    id: '3',
    name: 'zalo',
    packageName: 'com.myapp',
    timeUsed: 1,
    dateUsed: '2024-04-22',
  },
  {
    id: '3',
    name: 'zalo',
    packageName: 'com.myapp',
    timeUsed: 2,
    dateUsed: '2024-04-24',
  },
];

// đây là số lương ngày và tuần muốn hiển thị, 
// ví dụ numDay = 1 thì hiển thị thống kê trong vòng 1 ngày trước,
// numDay = 2 thì hiển thị thống kê trong vòng 2 ngày trước
const numDay = 1
const numWeek = 1

// t nghĩ cái ni nên bỏ cái trượt như caurosel xong cho coi 
// nhiều ngày hay nhiều tuần đó để coi được nhiều hơn
// mấy cái caurosel với giao diện nớ thì t hơi lỏ :v

const SingleChildScreen = ({ route, navigation }) => {
  /**
   * @param childId
   * @param childName
   * @param childImage (avatar)
   * @param activities ? (com.package.name, timeUsed, date)
   */
  /** native module */
  const { AppPackaging } = NativeModules;

  /** childId -> fetchDataByChildId */
  const { childId, childName, childImage, phoneType } = route.params;

  /** state */
  const [dataa, setDataa] = useState({});
  const [activities, setActivities] = useState(packageList);
  const [activitiesDay, setActivitiesDay] = useState(packageList);
  const [activitiesWeek, setActivitiesWeek] = useState(packageList);

  useEffect(() => {
    const today = new Date();
    
    const previousDay = new Date(today);
    previousDay.setDate(today.getDate() - 1*numDay);
  
    console.log("Today: " + today);
    console.log("Previous Day: " + previousDay);
  
    // Filter data for the previous day
    const previousDayData = packageList.filter(item => {
      const itemDate = new Date(item.dateUsed);
      // Compare timestamps of itemDate and previousDay
      return itemDate.getTime() >= previousDay.getTime() && 
             itemDate.getTime() < today.getTime();
    });
  
    console.log("Previous Day Data: ", previousDayData);
  
    const fetchData = async () => {
      const processedPackage = await AppPackaging.preprocessAppPackageInfo(previousDayData);
      if (processedPackage) {
        setActivitiesDay(processedPackage);
      }
    };
     
    fetchData(); 
  
  }, []);
  


  useEffect(() => {
    const today = new Date();
    
    const previousWeek = new Date(today);
    previousWeek.setDate(today.getDate() - 7*numWeek); 
  
    console.log("Today: " + today);
    console.log("Previous Week: " + previousWeek);
  
    // Filter data for the previous day
    const previousWeekData = packageList.filter(item => {
      const itemDate = new Date(item.dateUsed);
      // Compare timestamps of itemDate and previousWeek
      return itemDate >= previousWeek && 
             itemDate < today;
    });
  
    console.log("Previous Week Data: ", previousWeekData);
  
    const fetchData = async () => {
      const processedPackage = await AppPackaging.preprocessAppPackageInfo(previousWeekData);
      if (processedPackage) {
        setActivitiesWeek(processedPackage);
      }
    };
     
    fetchData(); // Call fetchData function
  
  }, [])

  useEffect(() => {
    const fetchDataa = async () => {
      const processedPackage = await AppPackaging.preprocessAppPackageInfo(
        packageList
      );
      if (processedPackage) {
        // console.log(processedPackage);
        setActivities(processedPackage);
      }
    };
     
    fetchDataa();
  }, []);


  useEffect(() => {
    /** setup header when (childId, navigation) change */
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

    // console.log(activitiesDay[0].dateUsed);

    /** fetch child data by childId */

    /** remove data */
    return () => {
      setDataa({});
    };
  }, [childId, navigation]);

  return (
    <View style={[globalStyle.container, { paddingTop: 20, paddingBottom: 0 }]}>
      {/** child info container */}
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/** child view */}
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
              <Image source={{ uri: childImage }} style={styles.avatarChild} />
              {/** */}
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.textHeading}>{childName}</Text>
                <Text style={{ color: '#a5a5a5' }}>{phoneType}</Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={24}
              color={'black'}
            />
          </View>
          {/** activities view */}
          <Text
            style={{
              color: 'black',
              marginTop: 5,
              marginLeft: 5,
              fontSize: 20,
              fontWeight: '600',
            }}
          >
            Recent activities
          </Text>
          {/** block all activities */}
          <View style={{ height: 280 }}>
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
                {activities &&
                  Array.isArray(activities) &&
                  activities?.map((i, index) => (
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
          </View>
          {/** activities last day view */}
          <Text
            style={{
              color: 'black',
              marginTop: 5,
              marginLeft: 5,
              fontSize: 20,
              fontWeight: '600',
            }}
          >
            Last day activities
          </Text>
          {/** block activities last day */}
          <View style={{ height: 280 }}>
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
                {activitiesDay &&
                  Array.isArray(activitiesDay) &&
                  activitiesDay?.map((i, index) => (
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
          </View>
          {/** activities last week view */}
          <Text
            style={{
              color: 'black',
              marginTop: 5,
              marginLeft: 5,
              fontSize: 20,
              fontWeight: '600',
            }}
          >
            Last Week activities
          </Text>
          {/** block activities last week */}
          <View style={{ height: 280 }}>
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
                {activitiesWeek &&
                  Array.isArray(activitiesWeek) &&
                  activitiesWeek?.map((i, index) => (
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
          </View>
          {/** chart usage - screen time */}
          <Text
            style={{
              color: 'black',
              marginTop: 5,
              marginLeft: 5,
              fontSize: 20,
              fontWeight: '600',
            }}
          >
            Screen time last day
          </Text>
          {activitiesDay && <UsageChart activities={activitiesDay} />}
          <Text
            style={{
              color: 'black',
              marginTop: 5,
              marginLeft: 5,
              fontSize: 20,
              fontWeight: '600',
            }}
          >
            Screen time last week
          </Text>
          {activitiesWeek && <UsageChart activities={activitiesWeek} />}
        </ScrollView>
      </View>
    </View>
  );
};

export default SingleChildScreen;
