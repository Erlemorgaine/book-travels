import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { addBook } from "../utilities/db";
import ModalWrapper from "./ModalWrapper";
import ButtonPrimary from "./ButtonPrimary";
import InputField from "./InputField";
import AppTitle from "./AppTitle";
import AppCheckbox from "./AppCheckbox";
import AppDropdown from "./AppDropdown";
import { COLORS } from "../utilities/styles/colors";

const AddBookModal = ({
  show,
  userId,
  countries,
  closeModal,
  onBookListUpdate,
}) => {
  const [newEntry, setNewEntry] = useState({
    title: "",
    writer: "",
    countryCode: "",
    isbn: "",
    notes: "",
    read: false,
  });

  const addBookInDB = () => {
    addBook(newEntry, (newData) => {
      console.log(newData);
      onBookListUpdate(newData);
      closeModal();
    });
  };

  return (
    <ModalWrapper show={show} closeModal={closeModal}>
      <Image
        style={styles.bookworm}
        source={require("../assets/bookworm_traveling.webp")}
        alt="A happy traveling bookworm with a little backpack on its back"
      />
      <AppTitle title="Time to add a new book!" />
      <Text style={styles.intro}>
        You can either add a book that you've already read, or save a book that
        you want to keep in mind for a later book travel.{" "}
      </Text>
      <Text style={{ ...styles.intro, paddingTop: 0 }}>
        Read books will show up on the map in{" "}
        <Text style={styles.read}>blue</Text>, not-yet-read books will show up
        in <Text style={styles.unread}>cerise</Text>.
      </Text>

      <InputField
        label="Book title"
        placeholder="Add a book title"
        value={newEntry.title}
        onChange={(title) => setNewEntry({ ...newEntry, title })}
      />
      <InputField
        label="Writer"
        placeholder="Add the name of the writer"
        value={newEntry.writer}
        onChange={(writer) => setNewEntry({ ...newEntry, writer })}
      />

      <AppDropdown
        label="Select a country"
        data={countries}
        value={newEntry.countryCode}
        onValueChange={(countryCode) =>
          setNewEntry({ ...newEntry, countryCode })
        }
      />

      <InputField
        label="ISBN number"
        placeholder="Add the book's ISBN number"
        value={newEntry.isbn}
        onChange={(isbn) => setNewEntry({ ...newEntry, isbn })}
        optional
      />

      <AppCheckbox
        setEnabled={() => setNewEntry({ ...newEntry, read: !newEntry.read })}
        isEnabled={newEntry.read}
        label="I've read this book already"
      />

      {newEntry.read && (
        <InputField
          label="Notes"
          placeholder="Write all the things down that you would like to remember about the book"
          value={newEntry.notes}
          onChange={(notes) => setNewEntry({ ...newEntry, notes })}
          optional
        />
      )}

      <ButtonPrimary
        label="Start reading"
        onPress={addBookInDB}
        disabled={!newEntry.title || !newEntry.writer || !newEntry.countryCode}
      />
    </ModalWrapper>
  );
};

export default AddBookModal;

const styles = StyleSheet.create({
  bookworm: {
    width: 187 * 0.8,
    height: 128 * 0.8,
    marginTop: 0,
    marginBottom: 24,
    marginLeft: "auto",
    marginRight: "auto",
  },
  intro: {
    paddingBottom: 12,
    paddingLeft: 5,
  },
  read: {
    color: COLORS.primaryGreenDark,
    fontWeight: "bold",
  },
  unread: {
    color: COLORS.primaryRedDark,
    fontWeight: "bold",
  },
});
