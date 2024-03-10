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

const styles = StyleSheet.create({
  icon: {
    width: 84,
    aspectRatio: 1,
  },
});
