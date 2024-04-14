import React from "react";
import { Svg, Path } from "react-native-svg";
import { StyleSheet } from "react-native";
import { COLORS } from "../utilities/styles/colors";

export const CloseIcon = () => {
  return (
    <Svg
      width="28"
      height="28"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M14.0056 3.20857L12.797 2L8.00555 6.79143L3.21413 2L2.00555 3.20857L6.79698 8L2.00555 12.7914L3.21413 14L8.00555 9.20857L12.797 14L14.0056 12.7914L9.21413 8L14.0056 3.20857Z"
        fill={COLORS.primaryGreenDark}
        stroke={COLORS.primaryGreenDark}
        strokeWidth="0.5"
      />
    </Svg>
  );
};

export const DownloadIcon = () => {
  return (
    <Svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.4145 23.234C12.4908 23.3124 12.5808 23.3762 12.68 23.4221C12.8876 23.4955 13.1141 23.4955 13.3217 23.4221C13.421 23.3762 13.511 23.3124 13.5873 23.234L21.177 15.6553C21.5006 15.3314 21.5006 14.8065 21.177 14.4826C21.0229 14.3244 20.8115 14.2352 20.5907 14.2352C20.3698 14.2352 20.1584 14.3244 20.0043 14.4826L13.8307 20.6009V0.829787C13.8307 0.371508 13.4592 0 13.0009 0C12.5426 0 12.1711 0.371508 12.1711 0.829787V20.6009L5.99747 14.4383C5.84337 14.2801 5.63191 14.1909 5.41109 14.1909C5.19027 14.1909 4.97881 14.2801 4.82471 14.4383C4.50114 14.7623 4.50114 15.2871 4.82471 15.6111L12.4145 23.234Z"
        fill={COLORS.white}
      />
      <Path
        d="M25.1702 24.3403H0.829787C0.371508 24.3403 0 24.7118 0 25.1701C0 25.6284 0.371508 25.9999 0.829787 25.9999H25.1702C25.6285 25.9999 26 25.6284 26 25.1701C26 24.7118 25.6285 24.3403 25.1702 24.3403Z"
        fill={COLORS.white}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 84,
    aspectRatio: 1,
  },
});
