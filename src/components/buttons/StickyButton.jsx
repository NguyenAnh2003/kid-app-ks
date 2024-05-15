import { View, Text, Button } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const StickyButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#fdf6e2',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 35,
        right: 20,
        alignSelf: 'flex-end',
      }}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="plus"
        size={24}
        color={'red'}
        
      />
    </TouchableOpacity>
  );
};

export default StickyButton;
