import React, { useEffect, useRef, useState } from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { readString } from "react-native-csv";

import BookModal from "./BookModal";
import BookItem from "./BookItem";
import NoBooksView from "./NoBooksView";
import ButtonPrimary from "./ButtonPrimary";
import AddBookModal from "./AddBookModal";
import RadioGroup from "./RadioGroup";

import { COLORS } from "../utilities/styles/colors";
import { FONTS } from "../utilities/styles/fonts";
import { uploadBooks } from "../utilities/db";
import ButtonIcon from "./ButtonIcon";
import { DownloadIcon } from "./Icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CountryList = ({ countryBooks, userId, onBookListUpdate }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [noViewErrorMessage, setNoViewErrorMessage] = useState("");
  const [selectedOrderOption, setSelectedOrderOption] = useState("code");

  const allBooks = useRef([]);

  useEffect(() => {
    allBooks.current = countryBooks.filter((country) => country.title);
    orderBooks(selectedOrderOption);
  }, [countryBooks]);

  function handleJsonData(fileContent) {
    const data = JSON.parse(fileContent);
    uploadInitialData(data);
  }

  /**
   * Downloads and shares the user's books in a csv file
   */
  async function downloadData() {
    const header = Object.keys(countryBooks[0]).join(",") + "\n";

    const csvString = countryBooks
      .filter((book) => book.writer && book.title)
      .reduce((csv, row) => {
        const values = Object.values(row).map(
          (field) => `"${(field || "").toString().replace(/"/g, '""')}"`
        );
        csv += values.join(",") + "\n";
        return csv;
      }, header);

    // Define the file name and URI
    const fileName = "book-travels.csv";
    const fileUri = FileSystem.cacheDirectory + fileName;

    // Write the CSV string to a file in the device's file system
    try {
      await FileSystem.writeAsStringAsync(fileUri, csvString, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log("CSV file written at:", fileUri);

      // Sharing the file (optional)
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        console.log("Sharing not available, file saved at:", fileUri);
      }
    } catch (error) {
      console.error("Error saving CSV file:", error);
    }
  }

  function handleCSVData(fileContent) {
    const data = readString(fileContent, {
      encoding: "utf-8",
      header: true,
      dynamicTyping: true,
    }).data;

    uploadInitialData(data);
  }

  function uploadInitialData(data) {
    if (!Array.isArray(data)) {
      setNoViewErrorMessage(
        "Make sure your JSON file contains an array of objects"
      );
    } else if (data.every((d) => d.writer && d.title && d.writer && d.code)) {
      uploadBooks(data, onBookListUpdate);
    } else {
      setNoViewErrorMessage(
        'Make sure that all objects in your JSON file have the properties "writer" and "title" and "code"'
      );
    }
  }

  async function importExternalFile() {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: ["application/json", "text/csv"],
      });

      if (response.assets?.length) {
        const file = response.assets[0];
        const fileContent = await FileSystem.readAsStringAsync(file.uri);

        if (file.mimeType === "application/json") {
          handleJsonData(fileContent);
        } else if (file.mimeType === "text/csv") {
          handleCSVData(fileContent);
        }
      }
    } catch (error) {
      console.error("Error opening file dialog: ", error);
    }
  }

  function orderBooks(key) {
    setSelectedOrderOption(key);

    switch (key) {
      case "read":
        allBooks.current.sort((a, b) => {
          if (a.read && !b.read) return -1;
          if (!a.read && b.read) return 1;
          return 0;
        });

        break;
      default:
        allBooks.current.sort((a, b) => {
          return a[key].localeCompare(b[key]);
        });
    }
  }

  return (
    <View style={styles.bookCase}>
      <View style={styles.addBtn}>
        {!!allBooks.current.length && (
          <View>
            <View style={styles.topButtons}>
              <ButtonPrimary
                style={{ width: "", flexGrow: 1 }}
                label="Add a book"
                onPress={() => setShowAddModal(true)}
              />
              <ButtonIcon
                style={{
                  marginLeft: 10,
                  marginTop: 15,
                  backgroundColor: COLORS.primaryGreenDark,
                  borderRadius: 5,
                }}
                Icon={DownloadIcon}
                onPress={downloadData}
              />
            </View>

            <RadioGroup
              label="Order by"
              options={["writer", "title", "code", "read"]}
              selectedOption={selectedOrderOption}
              onOptionSelect={orderBooks}
            />
          </View>
        )}
      </View>

      <FlatList
        style={styles.bookCase.bookList}
        data={allBooks.current}
        ListEmptyComponent={
          <NoBooksView
            onAdd={() => setShowAddModal(true)}
            onExternalImport={importExternalFile}
            errorMessage={noViewErrorMessage}
          />
        }
        renderItem={({ item }) => (
          <BookItem
            title={item.title}
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
  topButtons: {
    flexDirection: "row",
    alignItems: "center",
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
        width: 48,
        height: 48,
        justifyContent: "center",
        paddingLeft: 22,
        alignItems: "center",
        fontSize: 18,
        // backgroundColor: COLORS.bgColor,
        borderRadius: 5,
        color: "#fff",
        fontFamily: FONTS.SpecialElite,
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
