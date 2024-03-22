import { View, Text, Image } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import globalStyle from '../styles/globalStyle';

const SingleChildScreen = ({ route, navigation }) => {
  /** childId -> fetchDataByChildId */
  const { childId, childName, childImage } = route.params;

  /** setup header */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignContent: 'center', gap: 10 }}>
          <Image
            source={{ uri: childImage, width: 30, height: 30 }}
            style={{ marginLeft: -20, borderRadius: 10 }}
          />
          <Text style={{color: "#333", fontSize: 15, fontWeight: '600'}}>{childName}</Text>
        </View>
      ),
    });
  }, [navigation, childId]);

  /** state */
  const [dataa, setDataa] = useState({});

  useEffect(() => {
    /** fetch child data by childId */

    /** remove data */
    return () => {
      setDataa({});
    };
  }, [childId]);

  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.text}>{childId}</Text>
    </View>
  );
};

export default SingleChildScreen;
