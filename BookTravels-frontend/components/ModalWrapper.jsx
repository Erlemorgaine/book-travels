import React, { useState } from "react";
import { StyleSheet, Modal, View, ImageBackground } from "react-native";
import { colors } from "../utilities/colors";
import ButtonIcon from "./ButtonIcon";

const ModalWrapper = ({ children, show, closeModal }) => {
  return (
    <Modal visible={show}>
      <View style={{ ...colors, ...styles.modalWrapper }}>
        <ButtonIcon
          icon="X"
          onPress={closeModal}
          style={styles.modal.modalClose}
        />

        <View style={{ ...styles.modal, ...colors }}>
          <ImageBackground
            source={require("../assets/paper-texture-4.jpeg")}
            style={styles.background}
          >
            <View style={styles.modal.modalContent}>{children}</View>
          </ImageBackground>
        </View>
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
  modalWrapper: {
    flexGrow: 1,
  },
  modal: {
    padding: 10,
    flexGrow: 1,
    backgroundColor: "var(--card-color)",
    modalClose: {
      position: "absolute",
      top: 5,
      right: 5,
      zIndex: 2,
    },
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
