import React, { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import ModalWrapper from "./ModalWrapper";

export default function BookModal({ bookItem, closeModal }) {
  console.log(bookItem);
  return (
    <ModalWrapper show={!!bookItem} closeModal={closeModal}>
      {bookItem && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            From <Text>{bookItem.country}</Text> you{" "}
            {bookItem.read ? "read" : "are planning to read"}{" "}
            <Text>{bookItem.book}</Text> by <Text>{bookItem.writer}</Text>
          </Text>

          <ButtonPrimary label="Go back to the map" onPress={closeModal} />
        </View>
      )}
    </ModalWrapper>
  );
}
