import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import ModalWrapper from "./ModalWrapper";
import AppTitle from "./AppTitle";
import InputField from "./InputField";
import AppCheckbox from "./AppCheckbox";
import { updateBook } from "../utilities/db";
import CountryMap from "./CountryMap";
import { COLORS } from "../utilities/styles/colors";

export default function BookModal({
  bookItem,
  closeModal,
  userId,
  onBookListUpdate,
}) {
  const [updatedEntry, setUpdatedEntry] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    setUpdatedEntry({ ...bookItem });
  }, [bookItem]);

  function updateBookInDB() {
    updateBook(updatedEntry, (data) => {
      onBookListUpdate(data);
      setUpdated(true);

      setTimeout(() => {
        setUpdated(false);
      }, 3000);
    });
  }

  return (
    <ModalWrapper key={bookItem} show={!!bookItem} closeModal={closeModal}>
      {updatedEntry && (
        <View style={styles.container}>
          <View>
            {bookItem && (
              <CountryMap
                countryCode={bookItem.countryCode}
                color={bookItem.read ? COLORS.primaryGreen : COLORS.primaryRed}
              />
            )}
            <AppTitle title={updatedEntry.country} />

            <InputField
              label={`You ${
                updatedEntry.read ? "read" : "are planning to read"
              }`}
              value={updatedEntry.title}
              onChange={(title) => setUpdatedEntry({ ...updatedEntry, title })}
              style={{ marginBottom: 10 }}
            />

            <InputField
              label="written by"
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

            {(updatedEntry.read || updatedEntry.notes) && (
              <InputField
                label="Notes"
                placeholder="Write all the things down that you would like to remember about this book"
                value={updatedEntry.notes}
                onChange={(notes) =>
                  setUpdatedEntry({ ...updatedEntry, notes })
                }
                optional
                multiline
              />
            )}

            <ButtonPrimary
              label="Update the book details"
              onPress={updateBookInDB}
            />

            {updated && <Text>Updated!</Text>}
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
