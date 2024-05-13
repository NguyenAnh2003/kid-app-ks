/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyle from '../styles/globalStyle';
import ChildCard from '../components/cards/ChildCard';
import AntDesign from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  btnText: {
    color: 'white',
  },
});

const childList = [
  /** childId, childName, ChildAvatar */
  {
    childId: '7ce14780-1a03-438a-9596-973d81725fa7',
    childName: 'Nguyen Anh',
    childPNumber: '0358423237',
    avatarUrl:
      'https://scontent.fdad4-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG9i1qn6l43gkgamWlIFfcBso2H55p0AlGyjYfnmnQCUWkluqxxNCGvGVG1PVYHXNR6aK5qtqLm_qilNbC_bMV0&_nc_ohc=19M80UHL7OUAX-2OV9R&_nc_ht=scontent.fdad4-1.fna&oh=00_AfD76oKUeKfB5Wu8k0a_3MdD4Sou2SzL54HRcJ17vFGTlA&oe=6624F0B8',
    phoneType: 'Sam Sung',
  },
  {
    childId: '7ce14780-1a03-438a-9596-973d81725fk7',
    childName: 'Bin Bin',
    childPNumber: '0358423237',
    avatarUrl:
      'https://scontent.fdad4-1.fna.fbcdn.net/v/t39.30808-1/416167704_2320873964969530_3091803937576343392_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFXUgMaHDLADOcW1y8ihn69FjXwQ_1c8q4WNfBD_VzyrszQ0F2EhicA5IfGKJ_2MwOgAi3W8hVCLN4vAF34CrrF&_nc_ohc=c_IFlPPF8gUAX_s3ex-&_nc_ht=scontent.fdad4-1.fna&oh=00_AfCUdFhSbBJ4__9Xa99Ct5hWJz3N9JJ33g7362OFilnYDQ&oe=6602BBC1',
    phoneType: 'Sam Sung',
  },
  {
    childId: '7ce14780-1a03-438a-9596-973d81725fa0',
    childName: 'Bin Bin',
    childPNumber: '0358423237',
    avatarUrl:
      'https://scontent.fdad4-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG9i1qn6l43gkgamWlIFfcBso2H55p0AlGyjYfnmnQCUWkluqxxNCGvGVG1PVYHXNR6aK5qtqLm_qilNbC_bMV0&_nc_ohc=19M80UHL7OUAX-2OV9R&_nc_ht=scontent.fdad4-1.fna&oh=00_AfD76oKUeKfB5Wu8k0a_3MdD4Sou2SzL54HRcJ17vFGTlA&oe=6624F0B8',
    phoneType: 'Sam Sung',
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
    <View style={[globalStyle.container, { flex: 1, paddingHorizontal: 10 }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'column', gap: 10, width: '100%' }}>
          {/** list of child */}
          {childList.map((i, index) => (
            <TouchableOpacity
              key={i.childId}
              onPress={() =>
                navigation.navigate('SingleChild', {
                  childId: i.childId,
                  childName: i.childName,
                  childImage: i.avatarUrl,
                  phoneType: i.phoneType,
                })
              }
            >
              <ChildCard
                key={i.childId}
                childName={i.childName}
                childPhoneNumber={i.childPNumber}
                childAvatar={i.avatarUrl}
                phoneType={i.phoneType}
              />
            </TouchableOpacity>
          ))}
        </View>
        {/** create child button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddChild')}
        >
          <AntDesign name="pluscircleo" size={30} color={'white'} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
