import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { addBookForUser } from "../utilities/api";
import ModalWrapper from "./ModalWrapper";
import ButtonPrimary from "./ButtonPrimary";
import InputField from "./InputField";
import AppTitle from "./AppTitle";
import AppCheckbox from "./AppCheckbox";
import AppDropdown from "./AppDropdown";
import { COLORS } from "../utilities/colors";

const AddBookModal = ({
  show,
  userId,
  countries,
  closeModal,
  onBookListUpdate,
}) => {
  const [newEntry, setNewEntry] = useState({
    book: "",
    writer: "",
    countryCode: "",
    read: false,
  });

  const addBook = () => {
    addBookForUser(userId, newEntry).then((newData) => {
      onBookListUpdate(newData);
      closeModal();
    });
  };

  return (
    <ModalWrapper show={show} closeModal={closeModal}>
      <View>
        <Image
          style={styles.bookworm}
          source={require("../assets/bookworm_traveling.svg")}
          alt="A happy traveling bookworm with a little backpack on its back"
        />
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

        <AppDropdown
          label="Select a country"
          data={countries}
          value={newEntry.countryCode}
          onValueChange={(countryCode) =>
            setNewEntry({ ...newEntry, countryCode })
          }
        />

        <AppCheckbox
          setEnabled={() => setNewEntry({ ...newEntry, read: !newEntry.read })}
          isEnabled={newEntry.read}
          label="I've read this book already"
        />

        <ButtonPrimary
          label="Start reading"
          onPress={addBook}
          disabled={!newEntry.book || !newEntry.writer || !newEntry.countryCode}
        />
      </View>
    </ModalWrapper>
  );
};

export default AddBookModal;

const styles = StyleSheet.create({
  bookworm: {
    width: 187 * 0.8,
    height: 128 * 0.8,

    margin: "auto",
    marginTop: 0,
    marginBottom: 24,
  },
  intro: {
    paddingBottom: 12,
    paddingLeft: 5,
    read: {
      color: COLORS.primaryGreendark,
      fontWeight: 700,
    },
    unread: {
      color: COLORS.primaryReddark,
      fontWeight: 700,
    },
  },
});
