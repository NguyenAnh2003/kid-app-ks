import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
const Child = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: "#fff",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
        },
        logo: {
            width: 60,
            height: 60

        },
        text: {
            width: '65%',
            padding: 10

        }
    })
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Image style={styles.logo} source={{
                        uri: 'https://th.bing.com/th/id/OIP.My0OSWlA46A52F7Dkw-AzAHaEo?rs=1&pid=ImgDetMain',
                    }}></Image>
                </View>
                <View style={styles.text}>
                    <Text>Tên child </Text>
                </View>

            </View>
        </>


    )
}
export default Child;