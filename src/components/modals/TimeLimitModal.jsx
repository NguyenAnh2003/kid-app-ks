import { View, Text, Button, Modal } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { createTimeLim } from '../../libs';

const TimeLimitModal = ({ childId, modalVisible, setModalVisible }) => {
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  /** submit handler */
  const submitHandler = async () => {
    try {
      const status = await createTimeLim(childId, selectedHour, selectedMinute);
      console.log('c', status);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: '#333',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                marginBottom: 10,
                color: 'black',
              }}
            >
              Set Time Limit
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Picker
                selectedValue={selectedHour}
                style={{ width: 150, height: 180 }}
                onValueChange={(itemValue) => setSelectedHour(itemValue)}
              >
                {[...Array(24).keys()].map((hour) => (
                  <Picker.Item
                    key={hour}
                    label={`${hour} hours`}
                    value={hour}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedMinute}
                style={{ width: 160, height: 180 }}
                onValueChange={(itemValue) => setSelectedMinute(itemValue)}
              >
                {[...Array(60).keys()].map((minute) => (
                  <Picker.Item
                    key={minute}
                    label={`${minute} minutes`}
                    value={minute}
                  />
                ))}
              </Picker>
            </View>
            <Button title="Set" onPress={submitHandler} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TimeLimitModal;
