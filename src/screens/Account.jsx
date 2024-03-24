import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Image, Text, View, Pressable } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import globalStyle from '../styles/globalStyle';

const Account = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * @field avatar
   * @field username
   * @field gmail
   * @field country
   * @field phone numer
   */

  const { navigate } = navigation;

  const imageHandler = async () => {
    /** follow this guide: https://www.educative.io/answers/how-to-use-react-native-image-picker */
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  useEffect(() => {
    return () => {
      setSelectedImage('');
    };
  }, []);

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#fdf6e2',
    //   }}
    // >
    //   <View style={[{
    //     position: 'absolute',
    //     width: 412,
    //     height: 100,
    //     top: 90,
    //     left: 0,
    //     borderColor: 'black',
    //     borderWidth: 1,
    //   }]}>
    //     <Image
    //       style={[{
    //         width: 90,
    //         height: 90,
    //         borderRadius: 90,
    //         borderWidth: 1,
    //         borderColor: 'black',
    //         position: 'absolute',
    //         top: 4,
    //         left: 25,
    //       }]}
    //         resizeMode="cover"
    //         // source={("")}
    //     />
    //   </View>
    //   <Text
    //     style={[
    //       globalStyle.h1,
    //       {
    //         position: 'absolute',
    //         top: 20,
    //         left: 125,
    //         marginBottom: 0,
    //         paddingLeft: 20,
    //         paddingRight: 20,
    //         fontSize: 28,
    //         fontFamily: 'Trebuchet MS',
    //         fontWeight: 'bold',
    //         color: 'black',
    //       },
    //     ]}
    //   >
    //     My Profile
    //   </Text>
    //   {selectedImage && (
    //     <Image
    //       source={{ uri: selectedImage }}
    //       style={{ flex: 1, width: 250, height: 250 }}
    //       resizeMode="contain"
    //     />
    //   )}
    //   <Image />
    //   <Text style={globalStyle.h1}>Upload image</Text>
    //   <Button title="Choose photo" onPress={imageHandler} />
    //   {/**<Button title={'Move to home'} onPress={() => navigate('Home')} /> */}
    //   {/**<Button title="Go back" onPress={() => navigation.goBack()} />*/}
    // </View>
    <View style={styles.profileContainer}>
      <View style={styles.imageProfile}>
        <View style={[styles.avatarProfile]}>
          <View style={[styles.avatar]}>
            <Image
              style={styles.avatarImage}
              resizeMode="cover"
              source={require('../assets/lie.png')}
            />
            <Image
              style={styles.avatarEditIcon}
              resizeMode="cover"
              source={require('../assets/lie.png')}
            />
          </View>
          <Text style={[styles.accountName]}>Nomnom</Text>
        </View>
      </View>
      <View style={styles.profileInformation}>
        <View style={styles.borderBox}>
          <View style={[styles.userNameTextView, styles.alignCenter]}>
            <Image
              style={styles.userNameIcon}
              //resizeMode="cover"
              source={require('../assets/lie.png')}
            />

            <Text style={[styles.userName, styles.informationText]}>
              Pham Van Nam
            </Text>
          </View>
        </View>
        <View style={styles.borderBox}>
          <View style={[styles.emailTextView, styles.alignCenter]}>
            <Image
              style={styles.emailIcon}
              source={require('../assets/lie.png')}
            />
            <Text style={[styles.email, styles.informationText]}>
              namnam@gmail.com
            </Text>
          </View>
        </View>
        <View style={styles.borderBox}>
          <View style={[styles.addressTextView, styles.alignCenter]}>
            <Image
              style={styles.addressIcon}
              resizeMode="cover"
              source={require('../assets/lie.png')}
            />
            <Text style={[styles.address, styles.informationText]}>Danang</Text>
          </View>
        </View>
        <View style={styles.borderBox}>
          <View style={[styles.phoneNumberTextView, styles.alignCenter]}>
            <Image
              style={styles.phoneNumberIcon}
              resizeMode="cover"
              source={require('../assets/lie.png')}
            />
            <Text style={[styles.phoneNumber, styles.informationText]}>
              123456789
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  alignCenter: {
    paddingLeft: 14,
    display: 'flex',
    flexDirection: 'row',
  },
  imageProfile: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 32,
  },

  avatar: {
    position: 'relative',
  },

  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 90,
  },

  avatarEditIcon: {
    height: 26,
    width: 26,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  accountName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 20,
  },

  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileInformation: {
    flex: 1,
  },
  informationText: {
    fontSize: 20,
    color: '#333333',
  },

  borderBox: {
    width: '100%',
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    textAlign: 'center',
    marginBottom: 20,
  },
  userNameTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  emailTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  email: {
    color: '#333333',
    fontSize: 16,
  },
  addressTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  address: {
    color: '#333333',
    fontSize: 16,
  },
  phoneNumberTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumberIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  phoneNumber: {
    color: '#333333',
    fontSize: 16,
  },
});

export default Account;
