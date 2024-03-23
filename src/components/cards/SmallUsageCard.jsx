import { View, Text } from 'react-native';
import React from 'react';

const SmallUsageCard = React.memo(({ color, name, timeUsed }) => {
  console.log(color);
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between',
        width: 300,
        paddingVertical: 8
      }}
    >
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: 'hsl(180, 100%, 50%)',
          }}
        ></View>
        <Text style={{ color: 'black' }}>{name} </Text>
      </View>
      <Text style={{ color: 'black' }}>{timeUsed} mins</Text>
    </View>
  );
});

export default SmallUsageCard;
