import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import BookModal from "./BookModal";
import BookItem from "./BookItem";
import NoBooksView from "./NoBooksView";

const CountryList = ({
  countryBooks,
  userId,
  onBookListUpdate,
  onFirstAdd,
}) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const allBooks = countryBooks.filter((country) => country.book);

  return (
    <View style={styles.bookCase}>
      {!!allBooks.length && (
        <FlatList
          style={styles.bookCase.bookList}
          data={allBooks}
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
      )}

      {!allBooks.length && <NoBooksView onAdd={onFirstAdd} />}

      <BookModal
        bookItem={selectedBook}
        closeModal={() => setSelectedBook(null)}
        userId={userId}
        onBookListUpdate={onBookListUpdate}
      />
    </View>
  );
};

export default CountryList;

const styles = StyleSheet.create({
  bookCase: {
    backgroundColor: "var(--card-color)",
    shadowColor: `var(--card-shadow)`,
    shadowOffset: { width: -2, height: -4 },
    shadowRadius: 15,
    borderRadius: 5,
    padding: 5,
    height: window.innerHeight - window.innerWidth * 0.85, // TODO: Factor and margin in constant

    bookList: {
      flexGrow: 1,
    },
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
        fontWeight: 700,
        fontSize: 18,
        // backgroundColor: "var(--bg-color)",
        borderRadius: 5,
        color: "#fff",
        fontFamily: "Headings",
      },

      book: {
        fontSize: 16,
        fontWeight: 800,
        paddingBottom: 3,
        color: "var(--grey-dark)",
        // fontFamily: "DMSansBold",
      },
      writer: {
        fontSize: 16,
        // fontFamily: "DMSans",
      },
    },
  },
});
