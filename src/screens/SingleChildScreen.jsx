import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import globalStyle from '../styles/globalStyle';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  /** container */
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
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

const SingleChildScreen = ({ route, navigation }) => {
  /**
   * @param childId
   * @param childName
   * @param childImage (avatar)
   * @param activities ? (com.package.name, timeUsed, date)
   */
  /** childId -> fetchDataByChildId */
  const { childId, childName, childImage } = route.params;

  /** state */
  const [dataa, setDataa] = useState({});

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
      <ScrollView style={styles.container}>
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
            </View>
          </View>
          <MaterialCommunityIcons
            name="account-edit-outline"
            size={24}
            color={'black'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleChildScreen;
