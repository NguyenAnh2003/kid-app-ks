/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import globalStyle from '../styles/globalStyle';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'black',
  },
  box: {
    padding: 10,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
});

const childList = [
  /** childId, childName, ChildAvatar */
  {
    childId: '1',
    childName: 'Nguyen Anh',
    avatarUrl: 'http://1',
  },
  {
    childId: '2',
    childName: 'Bin Bin',
    avatarUrl: 'http://2',
  },
  {
    childId: '3',
    childName: 'Bin Bin',
    avatarUrl: 'http://3',
  },
];

const HomeScreen = ({ user, navigation, route }) => {
  /** @author @NguyenAnh2003
   * can be seen as FamilyScreen
   * create child -> button to create child
   * list of child - get child -> return list of child
   */

  const [data, setData] = useState();

  return (
    <View style={globalStyle.container}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/** list of child */}
          {childList.map((i, index) => (
            <View key={i.childId} style={styles.box}>
              <Text style={styles.text}>{i.avatarUrl}</Text>
            </View>
          ))}
        </View>
        {/** create child button */}
        <Button
          title="Create"
          onPress={() => navigation.navigate('AddChild')}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
