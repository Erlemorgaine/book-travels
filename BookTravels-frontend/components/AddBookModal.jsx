import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Pressable,
  StyleSheet,
  Modal,
} from "react-native";
import { addBookForUser } from "../utilities/api";
import ModalWrapper from "./ModalWrapper";

const AddBookModal = ({ show, closeModal, userId }) => {
  const [newEntry, setNewEntry] = useState({});

  const addBook = () => {
    addBookForUser(userId)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        closeModal();
        return response.json();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        Alert.alert("Error", "API POST request failed.");
      });
  };

  return (
    <ModalWrapper show={show}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Add a book title"
          value={userId}
          onChangeText={(book) => setNewEntry({ ...newEntry, book })}
        />
        <TextInput
          style={styles.input}
          placeholder="Add a writer"
          value={userId}
          onChangeText={(writer) => setNewEntry({ ...newEntry, writer })}
        />

        <Pressable style={styles.button} onPress={addBook}>
          Start reading
        </Pressable>
      </View>
    </ModalWrapper>
  );
};

export default AddBookModal;

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "var(--white)",
    margin: 10,
    marginTop: 5,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: `var(--card-shadow)`,
  },
  button: {
    textAlign: "center",
    backgroundColor: "var(--primary)",
    color: "var(--white)",
    textTransform: "uppercase",
    padding: 12,
    margin: 10,
    marginTop: 15,
    borderRadius: 5,
    fontFamily: "Headings",
    fontWeight: 700,
  },
});
