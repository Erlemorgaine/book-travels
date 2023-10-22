import React from "react";
import { StyleSheet, Modal, View, ImageBackground } from "react-native";
import { COLORS } from "../utilities/styles/colors";
import ButtonIcon from "./ButtonIcon";

const ModalWrapper = ({ children, show, closeModal }) => {
  return (
    <Modal
      animationType="slide"
      visible={show}
      // This is triggered when user uses back button in native Android bottom menu
      onRequestClose={closeModal}
    >
      <View style={styles.modalWrapper}>
        <ButtonIcon
          icon="X"
          onPress={closeModal}
          style={styles.modal.modalClose}
        />

        <View style={styles.modal}>
          <ImageBackground
            source={require("../assets/paper-texture-4.webp")}
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
    justifyContent: "center",
    backgroundColor: COLORS.cardColor,

    modalClose: {
      position: "absolute",
      top: 5,
      right: 5,
      zIndex: 2,
    },
    modalContent: {
      flexGrow: 1,
      padding: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: COLORS.primary,
      backgroundColor: COLORS.bgColor50,
      justifyContent: "center",
    },
  },
});
