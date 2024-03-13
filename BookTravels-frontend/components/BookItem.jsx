import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";

import { COLORS } from "../utilities/styles/colors";
import { FONTS } from "../utilities/styles/fonts";

const BookItem = ({ title, writer, countryCode, read, onBookSelect }) => (
  <Pressable key={countryCode} style={styles.bookItem} onPress={onBookSelect}>
    <ImageBackground
      source={
        read
          ? require("../assets/book-read.webp")
          : require("../assets/book-unread.webp")
      }
      style={styles.bookItem.bookBg}
    >
      <Text style={styles.bookItem.code}>{countryCode}</Text>
    </ImageBackground>

    <View>
      <Text style={styles.bookItem.book}>{title}</Text>
      {writer && <Text style={styles.bookItem.writer}>{writer}</Text>}
    </View>
  </Pressable>
);

export default BookItem;

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    margin: 8,
    flex: 1,

    bookBg: {
      width: 70,
    },
    code: {
      width: 54,
      height: 48,
      paddingTop: 8,
      paddingLeft: 22,
      fontSize: 18,
      borderRadius: 5,
      fontFamily: FONTS.SpecialElite,
      color: COLORS.white,
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
});
