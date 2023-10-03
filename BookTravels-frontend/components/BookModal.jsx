import React, { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";

export default function BookModal({ bookItem, closeModal }) {
  console.log(bookItem);
  return (
    <Modal visible={!!bookItem}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, I am a Popup!</Text>
        <Pressable onPress={closeModal}>Close Popup</Pressable>
      </View>
    </Modal>
  );
}
