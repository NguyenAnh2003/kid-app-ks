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
    packageName: 'com.facebook.katana',
    timeUsed: 10,
    dateUsed: '22/3/2024',
  },
  {
    id: '2',
    name: 'facebook',
    packageName: 'com.facebook.katana',
    timeUsed: 1,
    dateUsed: '22/3/2024',
  },
  {
    id: '3',
    name: 'instagram',
    packageName: 'com.instagram.android',
    timeUsed: 1,
    dateUsed: '22/3/2024',
  },
  {
    id: '3',
    name: 'zalo',
    packageName: 'com.zing.zalo',
    timeUsed: 1,
    dateUsed: '22/3/2024',
  },
  {
    id: '3',
    name: 'zalo',
    packageName: 'com.zing.zalo',
    timeUsed: 2,
    dateUsed: '22/3/2024',
  },
];

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

  useEffect(() => {
    const fetchDataa = async () => {
      const processedPackage = await AppPackaging.preprocessAppPackageInfo(
        packageList
      );
      if (processedPackage) {
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
            Screen time
          </Text>
          {activities && <UsageChart activities={activities} />}
        </ScrollView>
      </View>
    </View>
  );
};

export default SingleChildScreen;
