import {
  View,
  Text,
  Image,
  StyleSheet,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
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
    packageName: 'com.facebook.katana',
    timeUsed: 10,
    dateUsed: '2024-04-27',
  },
  {
    id: '2',
    name: 'facebook',
    packageName: 'com.facebook.katana',
    timeUsed: 1,
    dateUsed: '2024-04-23',
  },
  {
    id: '3',
    name: 'instagram',
    packageName: 'com.instagram.android',
    timeUsed: 1,
    dateUsed: '2024-04-27',
  },
  {
    id: '4',
    name: 'zalo',
    packageName: 'com.zing.zalo',
    timeUsed: 1,
    dateUsed: '2024-04-22',
  },
  {
    id: '5',
    name: 'zalo',
    packageName: 'com.zing.zalo',
    timeUsed: 2,
    dateUsed: '2024-04-24',
  },
  {
    id: '6',
    name: 'zalo',
    packageName: 'com.zing.zalo',
    timeUsed: 2,
    dateUsed: '2024-04-26',
  },
  {
    id: '7',
    name: 'zalo',
    packageName: 'com.zing.zalo',
    timeUsed: 2,
    dateUsed: '2024-04-25',
  },
];

const numDay = 2;
const numWeek = 1;

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
  /** option */
  const [option, setOption] = useState('recent');
  const options = ['recent', '7 days'];

  /** state */
  const [activities, setActivities] = useState(packageList);

  const dataBasedonTime = useMemo(() => {
    if (option === 'recent') {
      const today = new Date();
      const today2 = new Date(today);
      today2.setDate(today.getDate() - 1 * numDay);

      const todayUsage = packageList.filter((item) => {
        const itemDate = new Date(item.dateUsed);
        // Compare timestamps of itemDate and previousDay
        return (
          itemDate.getTime() >= today2.getTime() &&
          itemDate.getTime() < today.getTime()
        );
      });

      return todayUsage;
    }
    if (option === '7 days') {
      const today = new Date();

      const previousWeek = new Date(today);
      previousWeek.setDate(today.getDate() - 7 * numWeek);

      // Filter data for the previous day
      const previousWeekData = packageList.filter((item) => {
        const itemDate = new Date(item.dateUsed);
        // Compare timestamps of itemDate and previousWeek
        return itemDate >= previousWeek && itemDate < today;
      });

      return previousWeekData;
    }
  }, [option]);

  useEffect(() => {
    /** */
    const fetchData = async () => {
      const processedPackage = await AppPackaging.preprocessAppPackageInfo(
        dataBasedonTime
      );
      if (processedPackage) {
        setActivities(processedPackage);
      }
    };

    fetchData();
  }, [dataBasedonTime, option]);

  /** setup header when nav & childId change */
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

    /** fetch child data by childId */

    /** remove data */
    return () => {
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
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
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
                    fontWeight: 600,
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
              marginTop: 5,
              marginLeft: 5,
              fontSize: 20,
              fontWeight: '700',
            }}
          >
            Activities in {option.toUpperCase()}
          </Text>
          {/** block activities today */}
          <View style={{ maxHeight: 200 }}>
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
          {/** activities last week view */}
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
          {/** chart usage - screen time */}
          {activities && <UsageChart activities={activities} />}
        </ScrollView>
      </View>
    </View>
  );
};

export default SingleChildScreen;
