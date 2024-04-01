import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
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
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fdf6e2',
            }}
        >
            {/** image */}
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage }}
                    style={{ flex: 1, width: 250, height: 250 }}
                    resizeMode="contain"
                />
            )}
            <Image />
            <Text style={globalStyle.h1}>Upload image</Text>
            <Button title="Choose photo" onPress={imageHandler} />
            {/**<Button title={'Move to home'} onPress={() => navigate('Home')} /> */}
            {/**<Button title="Go back" onPress={() => navigation.goBack()} />*/}
        </View>
    );
};

export default Account;