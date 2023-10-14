import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";

const BookItem = ({ book, writer, countryCode, read, onBookSelect }) => (
  <Pressable key={countryCode} style={styles.bookItem} onPress={onBookSelect}>
    <ImageBackground
      source={require(`../assets/book-${read ? "read" : "unread"}.svg`)}
      style={styles.bookItem.bookBg}
    >
      <Text style={styles.bookItem.code}>{countryCode}</Text>
    </ImageBackground>

    <View>
      <Text
        style={{
          ...styles.bookItem.book,
          // color: `var(--primary-${read ? "green" : "red"}-dark)`,
        }}
      >
        {book}
      </Text>
      {writer && <Text style={styles.bookItem.writer}>{writer}</Text>}
    </View>
  </Pressable>
);

export default BookItem;

const styles = StyleSheet.create({
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
});