import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, FontFamily, FontSize, Color, Border } from "../styles/globalStyle";

const ForgotPasswordCreateNewP = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.forgotPasswordCreateNewP}>
      <View style={[styles.homeIndicator, styles.toolBarIconPosition]}>
        <View style={styles.homeIndicator1} />
      </View>
      <Image
        style={[styles.toolBarIcon, styles.toolBarIconPosition]}
        resizeMode="cover"
        source={require("../assets/tool-bar.png")}
      />
      <View style={[styles.bigTitle, styles.bigTitlePosition]}>
        <Text style={styles.bigTitle1}>{`Create New Password`}</Text>
        <Text
          style={[styles.yourDescriptionHere, styles.inputTextTypo]}
        >{`Your new password must be different from previous used password.`}</Text>
      </View>
      <View style={[styles.formCreateNewPassword, styles.bigTitlePosition]}>
        <View style={styles.inputParent}>
          <View style={styles.input}>
            <View style={styles.inputField}>
              <View style={[styles.form, styles.bgPosition]} />
              <View style={[styles.iconFormParent, styles.button1Position]}>
                <View style={styles.iconForm}>
                  <View style={[styles.bg, styles.bgPosition]} />
                  <Image
                    style={[styles.vectorIcon, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../assets/vector2.png")}
                  />
                </View>
                <Text style={[styles.inputText, styles.inputTextTypo]}>
                  Email
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.input1}>
            <View style={styles.inputField}>
              <View style={[styles.form, styles.bgPosition]} />
              <View style={[styles.iconFormParent, styles.button1Position]}>
                <View style={styles.iconForm}>
                  <View style={[styles.bg, styles.bgPosition]} />
                  <Image
                    style={[styles.vectorIcon1, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../assets/vector3.png")}
                  />
                </View>
                <Text style={[styles.inputText, styles.inputTextTypo]}>
                  Password
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.input1}>
            <View style={styles.inputField}>
              <View style={[styles.form, styles.bgPosition]} />
              <View style={[styles.iconFormParent, styles.button1Position]}>
                <View style={styles.iconForm}>
                  <View style={[styles.bg, styles.bgPosition]} />
                  <Image
                    style={[styles.vectorIcon1, styles.vectorIconLayout]}
                    resizeMode="cover"
                    source={require("../assets/vector3.png")}
                  />
                </View>
                <Text style={[styles.inputText, styles.inputTextTypo]}>
                  Confirm Password
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("HomeNoActiveAppoinment")}
        >
          <Text style={[styles.button1, styles.button1Position]}>Register</Text>
        </Pressable>
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
  inputTextTypo: {
    fontFamily: FontFamily.interRegular16,
    fontSize: FontSize.interBold16_size,
    textAlign: "left",
  },
  bgPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  button1Position: {
    top: "50%",
    marginTop: -12,
    position: "absolute",
  },
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    left: "8.33%",
    right: "8.33%",
    width: "83.33%",
    position: "absolute",
    overflow: "hidden",
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
    color: Color.colorLightGrey8D8D8D,
    marginTop: 8,
    lineHeight: 24,
  },
  bigTitle: {
    top: 132,
  },
  form: {
    backgroundColor: Color.neutralWhiteFFFFFF,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro,
    borderWidth: 1,
    borderRadius: Border.br_7xs,
  },
  bg: {
    backgroundColor: Color.colorSilver_100,
    display: "none",
  },
  vectorIcon: {
    height: "69.58%",
    top: "12.5%",
    bottom: "17.92%",
  },
  iconForm: {
    width: 24,
    height: 24,
  },
  inputText: {
    color: Color.colorLightGreyAAAAAA,
    marginLeft: 16,
  },
  iconFormParent: {
    left: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    height: 48,
    width: 349,
  },
  input: {
    display: "none",
  },
  vectorIcon1: {
    height: "83.33%",
    top: "8.33%",
    bottom: "8.33%",
  },
  input1: {
    marginTop: 16,
  },
  inputParent: {
    alignItems: "flex-end",
  },
  button1: {
    marginLeft: -32.5,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium12,
    color: Color.neutralWhiteFFFFFF,
    textAlign: "center",
    lineHeight: 24,
    fontSize: FontSize.interBold16_size,
    marginTop: -12,
    left: "50%",
  },
  button: {
    backgroundColor: Color.colorLightBlue0D53FC,
    height: 50,
    marginTop: 32,
    borderRadius: Border.br_7xs,
    width: 349,
  },
  formCreateNewPassword: {
    top: 324,
  },
  forgotPasswordCreateNewP: {
    backgroundColor: Color.colorGhostwhite,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
});

export default ForgotPasswordCreateNewP;
