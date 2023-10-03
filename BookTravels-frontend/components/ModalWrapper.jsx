import React, { useState } from "react";
import { StyleSheet, Modal, View, ImageBackground } from "react-native";
import { colors } from "../utilities/colors";

const ModalWrapper = ({ children, show }) => {
  return (
    <Modal visible={show}>
      <View style={{ ...styles.modal, ...colors }}>
        <ImageBackground
          source={require("../assets/paper-texture-4.jpeg")}
          style={styles.background}
        >
          <View style={styles.modal.modalContent}>{children}</View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default ModalWrapper;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  modal: {
    padding: 10,
    flexGrow: 1,
    backgroundColor: "var(--card-color)",
    modalContent: {
      flexGrow: 1,
      padding: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "var(--primary)",
      backgroundColor: "var(--bg-color-50)",
      justifyContent: "center",
    },
  },
});
