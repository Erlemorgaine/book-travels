import React, { useState } from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import BookModal from "./BookModal";
import BookItem from "./BookItem";
import NoBooksView from "./NoBooksView";
import ButtonPrimary from "./ButtonPrimary";
import AddBookModal from "./AddBookModal";

import { COLORS } from "../utilities/styles/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CountryList = ({
  countryBooks,
  userId,
  onBookListUpdate,
  onFirstAdd,
}) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const allBooks = countryBooks.filter((country) => country.book);

  return (
    <View style={styles.bookCase}>
      <View style={styles.addBtn}>
        <ButtonPrimary
          style={{ marginTop: 10 }}
          label="Add a book"
          onPress={() => setShowAddModal(true)}
        />
      </View>

      <FlatList
        style={styles.bookCase.bookList}
        data={allBooks}
        ListEmptyComponent={
          <NoBooksView onAdd={() => setShowAddModal(false)} />
        }
        renderItem={({ item }) => (
          <BookItem
            book={item.book}
            countryCode={item.code}
            read={item.read}
            writer={item.writer}
            country={item.name}
            onBookSelect={() =>
              setSelectedBook({
                ...item,
                countryCode: item.code,
                country: item.name,
              })
            }
          />
        )}
      />

      <BookModal
        bookItem={selectedBook}
        closeModal={() => setSelectedBook(null)}
        userId={userId}
        onBookListUpdate={onBookListUpdate}
      />

      <AddBookModal
        show={showAddModal}
        userId={userId}
        closeModal={() => setShowAddModal(false)}
        onBookListUpdate={onBookListUpdate}
        countries={countryBooks.map((book) => ({
          label: book.name,
          value: book.code,
        }))}
      />
    </View>
  );
};

export default CountryList;

const styles = StyleSheet.create({
  addBtn: {
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  bookCase: {
    backgroundColor: COLORS.cardColor,
    shadowColor: COLORS.cardShadowDark,
    shadowOffset: { width: -2, height: -34 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 30, // Necessary to show shadow for Android!
    borderRadius: 5,
    paddingHorizontal: 5,
    height: windowHeight - windowWidth * 0.85, // TODO: Factor and margin in constant
    bookItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      margin: 8,
      flex: 1,

      bookBg: {
        width: 70,
      },
      code: {
        display: "flex",
        width: 48,
        height: 48,
        justifyContent: "center",
        paddingLeft: 22,
        alignItems: "center",
        fontSize: 18,
        // backgroundColor: COLORS.bgColor,
        borderRadius: 5,
        color: "#fff",
        fontFamily: "SpecialElite-Regular",
      },

      book: {
        fontSize: 16,
        fontWeight: 800,
        paddingBottom: 3,
        color: COLORS.greyDark,
        // fontFamily: "DMSansBold",
      },
      writer: {
        fontSize: 16,
        // fontFamily: "DMSans",
      },
    },
  },
});
