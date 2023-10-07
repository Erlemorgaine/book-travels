import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import BookModal from "./BookModal";
import AddBook from "./AddBookModal";

const CountryList = ({ countryBooks }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const BookItem = ({ book, writer, countryCode, read, country }) => (
    <Pressable
      key={countryCode}
      style={styles.bookCase.bookItem}
      onPress={() =>
        setSelectedBook({ book, writer, countryCode, read, country })
      }
    >
      <ImageBackground
        source={require(`../assets/book-${read ? "read" : "unread"}.svg`)}
        style={styles.bookCase.bookItem.bookBg}
      >
        <Text style={styles.bookCase.bookItem.code}>{countryCode}</Text>
      </ImageBackground>

      <View>
        <Text
          style={{
            ...styles.bookCase.bookItem.book,
            // color: `var(--primary-${read ? "green" : "red"}-dark)`,
          }}
        >
          {book}
        </Text>
        {writer && (
          <Text style={styles.bookCase.bookItem.writer}>{writer}</Text>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.bookCase}>
      <FlatList
        style={styles.bookCase.bookList}
        data={countryBooks.filter((country) => country.book)}
        renderItem={({ item }) => (
          <BookItem
            book={item.book}
            countryCode={item.code}
            read={item.read}
            writer={item.writer}
            country={item.name}
          />
        )}
      />

      <BookModal
        bookItem={selectedBook}
        closeModal={() => setSelectedBook(null)}
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
