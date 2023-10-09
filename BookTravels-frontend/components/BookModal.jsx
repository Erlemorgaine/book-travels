import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import ModalWrapper from "./ModalWrapper";
import AppTitle from "./AppTitle";
import InputField from "./InputField";
import AppCheckbox from "./AppCheckbox";
import { updateBookForUser } from "../utilities/api";

export default function BookModal({ bookItem, closeModal, userId, onBookListUpdate }) {
  const [updatedEntry, setUpdatedEntry] = useState(null);

  useEffect(() => {
    setUpdatedEntry({ ...bookItem });
  }, [bookItem]);

  function updateBook() {
    updateBookForUser(userId, updatedEntry).then((newData) =>
      onBookListUpdate(newData)
    );
  }

  return (
    <ModalWrapper show={!!bookItem} closeModal={closeModal}>
      {updatedEntry && (
        <View style={styles.container}>
          <View>
            <AppTitle title={updatedEntry.country} />

            <Text style={styles.container.bookText}>
              You {updatedEntry.read ? "read" : "are planning to read"}{" "}
            </Text>

            <InputField
              value={updatedEntry.book}
              onChange={(book) => setUpdatedEntry({ ...updatedEntry, book })}
            />

            <Text style={styles.container.writerText}> written by </Text>

            <InputField
              value={updatedEntry.writer}
              onChange={(writer) =>
                setUpdatedEntry({ ...updatedEntry, writer })
              }
            />

            <AppCheckbox
              setEnabled={() =>
                setUpdatedEntry({ ...updatedEntry, read: !updatedEntry.read })
              }
              isEnabled={updatedEntry.read}
              label="I've read this book"
            />

            <ButtonPrimary
              label="Update the book details"
              onPress={updateBook}
            />
          </View>
        </View>
      )}
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    bookText: {
      paddingBottom: 8,
    },
    writerText: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
});
