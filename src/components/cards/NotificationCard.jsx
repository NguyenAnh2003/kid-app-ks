import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NotificationCard = ({ id, childData, date, description }) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 5,
        paddingVertical: 13,
        flexDirection: 'row',
        alignContent: 'center',
      }}
    >
      <AntDesign name="bells" color={'#000'} size={45} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: '#000',
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Name
        </Text>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ color: '#000', fontSize: 12 }}>{description}</Text>
          <Text style={{ color: '#000', fontSize: 12 }}>{date.toString()}</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
