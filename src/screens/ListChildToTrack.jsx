import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import globalStyle from '../styles/globalStyle';
import LocationTracking from '../components/LocationTracking';

const ListChildToTrack = (props) => {
  const items = props.items || {}; 

  const [currentChild, setCurrentChild] = useState('');
  const onPressChild = (item) => {
    console.log("Pressed button " + item);
    setCurrentChild(item)
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {items && items.map((item, index) => (
            <Button style={styles.buttons}
            onPress={() => onPressChild(item)}
            key={index}
            title={item}
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
        ))}
      </View>
      <LocationTracking childId={currentChild}></LocationTracking>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fdf6e2',
    },
    buttons:{

    },
  });

export default ListChildToTrack;