import React, { useState } from "react";
import { View, Alert, StyleSheet, Text } from "react-native";
import { addBookForUser } from "../utilities/api";
import ModalWrapper from "./ModalWrapper";
import ButtonPrimary from "./ButtonPrimary";
import InputField from "./InputField";
import AppTitle from "./AppTitle";
import AppCheckbox from "./AppCheckbox";
import AppDropdown from "./AppDropdown";

const AddBookModal = ({ show, closeModal, userId }) => {
  const [newEntry, setNewEntry] = useState({
    book: "",
    writer: "",
    read: false,
  });

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
    <ModalWrapper show={show} closeModal={closeModal}>
      <View>
        <AppTitle title="Time to add a new book!" />
        <Text style={styles.intro}>
          You can either add a book that you've already read, or save a book
          that sounds interesting and that you want to save for a later book
          travel.{" "}
        </Text>
        <Text style={{ ...styles.intro, paddingTop: 0 }}>
          Read books will show up on the map in{" "}
          <Text style={styles.intro.read}>green</Text>, not-yet-read books will
          show up in <Text style={styles.intro.unread}>red</Text>.
        </Text>

        <InputField
          placeholder="Add a book title"
          value={newEntry.book}
          onChange={(book) => setNewEntry({ ...newEntry, book })}
        />
        <InputField
          placeholder="Add a writer"
          value={newEntry.writer}
          onChange={(writer) => setNewEntry({ ...newEntry, writer })}
        />

        <AppDropdown />

        <AppCheckbox
          setEnabled={() => setNewEntry({ ...newEntry, read: !newEntry.read })}
          isEnabled={newEntry.read}
          label="I've read this book already"
        />

        <ButtonPrimary label="Start reading" onPress={addBook} />
      </View>
    </ModalWrapper>
  );
};

export default AddBookModal;

const styles = StyleSheet.create({
  intro: {
    
    paddingBottom: 12,
    paddingLeft: 5,
    read: {
      color: "var(--primary-green-dark)",
      fontWeight: 700,
    },
    unread: {
      color: "var(--primary-red-dark)",
      fontWeight: 700,
    },
  },
});
