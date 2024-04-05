import { StyleSheet } from 'react-native';

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf6e2',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  h1: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    color: 'black',
  },
});

export default globalStyle;
/* fonts */
export const FontFamily = {
  interSemiBold14: "Inter-SemiBold",
  interRegular16: "Inter-Regular",
  interMedium12: "Inter-Medium",
  interBold16: "Inter-Bold",
};
/* font sizes */
export const FontSize = {
  interBold16_size: 16,
  interSemiBold14_size: 14,
  interMedium12_size: 12,
  interBold18_size: 18,
  interBold32_size: 32,
};
/* Colors */
export const Color = {
  colorGhostwhite: "#f9f9fe",
  neutralWhiteFFFFFF: "#fff",
  colorLightGrey8D8D8D: "#8d8d8d",
  neutralBlack0F0F0F: "#0f0f0f",
  colorLightBlue0D53FC: "#0d53fc",
  colorMediumslateblue_100: "rgba(13, 83, 252, 0.2)",
  colorMediumslateblue_200: "rgba(13, 83, 252, 0.5)",
  colorLightGreyAAAAAA: "#aaa",
  colorCornflowerblue: "#53a1fd",
  colorGainsboro: "#dedede",
  colorSilver_100: "#c4c4c4",
  colorSilver_200: "rgba(196, 196, 196, 0)",
  colorLightBlueEBF1F9: "#ebf1f9",
  colorRoyalblue: "#0857de",
  colorLightRedE8505B: "#e8505b",
};
/* Paddings */
export const Padding = {
  p_5xs: 8,
  p_9xs: 4,
  p_base: 16,
};
/* border radiuses */
export const Border = {
  br_7xs: 6,
  br_9xs: 4,
  br_5xl: 24,
  br_81xl: 100,
  br_xs: 12,
};
