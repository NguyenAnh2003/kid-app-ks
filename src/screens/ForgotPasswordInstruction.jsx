import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontFamily, FontSize, Color, Border } from "../styles/globalStyle";


const ForgotPasswordInstruction = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.forgotPasswordInstruction}>
      <View style={[styles.homeIndicator, styles.toolBarIconPosition]}>
        <View style={styles.homeIndicator1} />
      </View>
      <Image
        style={[styles.toolBarIcon, styles.toolBarIconPosition]}
        resizeMode="cover"
        source={require("../assets/tool-bar.png")}
      />
      <View style={[styles.bigTitle, styles.bigTitlePosition]}>
        <Text style={styles.bigTitle1}>Check your mail</Text>
        <Text
          style={styles.yourDescriptionHere}
        >{`We have sent a password recovery 
instructions to your email.`}</Text>
      </View>
      <View style={[styles.formConfirmEmail, styles.bigTitlePosition]}>
        <Pressable
          style={[styles.button, styles.buttonLayout]}
          onPress={() => navigation.navigate("ForgotPasswordCreateNewP")}
        >
          <Text style={[styles.button1, styles.buttonTypo]}>Open my email</Text>
        </Pressable>
        <View style={[styles.button2, styles.buttonLayout]}>
          <Text style={[styles.button3, styles.buttonTypo]}>
            Skip, i’ll confirm later
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolBarIconPosition: {
    width: 375,
    left: 0,
    position: "absolute",
  },
  bigTitlePosition: {
    left: 13,
    position: "absolute",
  },
  buttonLayout: {
    height: 50,
    width: 349,
    borderRadius: Border.br_7xs,
  },
  buttonTypo: {
    textAlign: "center",
    fontFamily: FontFamily.interMedium12,
    fontWeight: "500",
    top: "50%",
    marginTop: -12,
    lineHeight: 24,
    fontSize: FontSize.interBold16_size,
    left: "50%",
    position: "absolute",
  },
  homeIndicator1: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.colorLightGreyAAAAAA,
    width: 134,
    height: 5,
    left: "50%",
    position: "absolute",
  },
  homeIndicator: {
    top: 778,
    height: 34,
  },
  toolBarIcon: {
    top: 32,
    height: 56,
  },
  bigTitle1: {
    fontSize: FontSize.interBold32_size,
    lineHeight: 48,
    fontWeight: "700",
    fontFamily: FontFamily.interBold16,
    color: Color.neutralBlack0F0F0F,
    textAlign: "left",
  },
  yourDescriptionHere: {
    fontFamily: FontFamily.interRegular16,
    color: Color.colorLightGrey8D8D8D,
    marginTop: 8,
    lineHeight: 24,
    fontSize: FontSize.interBold16_size,
    textAlign: "left",
  },
  bigTitle: {
    top: 132,
  },
  button1: {
    marginLeft: -57.5,
    color: Color.neutralWhiteFFFFFF,
  },
  button: {
    backgroundColor: Color.colorLightBlue0D53FC,
  },
  button3: {
    marginLeft: -79.5,
    color: Color.colorLightBlue0D53FC,
  },
  button2: {
    backgroundColor: Color.neutralWhiteFFFFFF,
    marginTop: 16,
  },
  formConfirmEmail: {
    top: 276,
  },
  forgotPasswordInstruction: {
    backgroundColor: Color.colorGhostwhite,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default ForgotPasswordInstruction;
