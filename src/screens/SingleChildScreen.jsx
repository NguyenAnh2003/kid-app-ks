import { View, Text } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import globalStyle from '../styles/globalStyle';

const SingleChildScreen = ({ route, navigation }) => {
  /** childId -> fetchDataByChildId */
  const { childId, childName, childImage } = route.params;

  /** setup header */
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: `${childName}` });
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
