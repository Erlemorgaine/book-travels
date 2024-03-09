import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { countries } from "./constants/countries";

const dbName = "book_travels.db";
const db = SQLite.openDatabase(dbName);

function createTable(tx, tableName, tableColumns) {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS ${tableName} (${tableColumns.join(", ")});`,
    [],
    () => console.log("Database table created successfully"),
    (error) => console.error("Error creating database table: ", error)
  );
}

const setupDatabase = (callback) => {
  // Create countries table
  db.transaction((tx) => {
    createTable(tx, "countries", [
      "name TEXT NOT NULL",
      "code VARCHAR(2) NOT NULL UNIQUE PRIMARY KEY",
    ]);

    // Create books table
    createTable(tx, "books", [
      "id INTEGER PRIMARY KEY AUTOINCREMENT",
      "country_code VARCHAR(2) NOT NULL",
      "title TEXT NOT NULL",
      "writer TEXT NOT NULL",
      "read TEXT CHECK (read IN ('true', 'false') OR read IS NULL)",
      "notes TEXT",
      "FOREIGN KEY (country_code) REFERENCES countries(code)",
    ]);

    // If no countries exist, insert initial countries
    tx.executeSql(
      `SELECT * FROM countries LIMIT 1;`,
      [],
      (_, { rows }) => {
        if (rows.length === 0) {
          // If the table is empty, seed it with initial data
          seedCountries(tx);
        }
      },
      (error) => console.error("Error checking countries table: ", error)
    );
  });
};

const seedCountries = (tx) => {
  countries.forEach((country, i) => {
    tx.executeSql(
      `INSERT INTO countries (name, code) VALUES (?, ?);`,
      [country.name, country.code],
      () => {
        if (i === countries.length - 2) console.log("Inserted all countries");
      },
      (error) => console.error(`Error inserting ${country.name}: `, error)
    );
  });
};

function getCountries(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM countries;`,
      [],
      (_, { rows: { _array } }) => {
        callback(_array);
      },
      (error) => console.error("Error retrieving items from database: ", error)
    );
  });
}

function getBooks(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT c.name, c.code, b.title, b.writer, b.read, b.notes, b.id FROM countries c 
      LEFT JOIN books b ON c.code = b.country_code;`,
      [],
      (_, { rows: { _array } }) => {
        callback(
          _array.map((book) => ({
            ...book,
            read: readToBoolean(book.read),
          }))
        );
      },
      (error) => console.error("Error retrieving items from database: ", error)
    );
  });
}

function getBook({ writer, title }, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * from books WHERE writer = ? AND title = ?;`,
      [writer, title],
      (_, { rows: { _array } }) => {
        callback(_array);
      },
      (error) => console.error("Error retrieving items from database: ", error)
    );
  });
}

function uploadBooks(books, callback) {
  console.log("Uploading books...");

  const getBooksOnLastBook = (isLastBook) => {
    if (isLastBook) {
      console.log("Books uploaded");
      getBooks(callback);
    }
  };

  books.forEach((book, index) => {
    const isLastBook = index === books.length - 1;

    getBook(book, (existingBook) => {
      if (!existingBook?.length) {
        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO books (title, writer, read, country_code) VALUES (?, ?, ?, ?);`,
            [book.title, book.writer, readToString(book.read), book.code],
            () => getBooksOnLastBook(isLastBook),
            (error) =>
              console.error("Error inserting item into database: ", error)
          );
        });
      } else {
        getBooksOnLastBook(isLastBook);
      }
    });
  });
}

function addBook(book, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO books (title, writer, read, notes, country_code) VALUES (?, ?, ?, ?, ?);`,
      [
        book.title,
        book.writer,
        readToString(book.read),
        book.notes,
        book.countryCode,
      ],
      (_, result) => getBooks(callback),
      (error) => console.error("Error inserting item into database: ", error)
    );
  });
}

function updateBook(newBook, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE books SET title = ?, writer = ?, read = ?, notes = ? WHERE id = ?;`,
      [
        newBook.title,
        newBook.writer,
        readToString(newBook.read),
        newBook.notes,
        newBook.id,
      ],
      (_, result) => getBooks(callback),
      (error) => console.error("Error inserting item into database: ", error)
    );
  });
}

async function removeDatabase() {
  const databaseFilePath = FileSystem.documentDirectory + dbName;

  try {
    console.log("Removing....");
    await FileSystem.deleteAsync(databaseFilePath);
    console.log("Database removed successfully.");
  } catch (error) {
    console.error("Error removing database:", error);
  }
}

function readToBoolean(read) {
  if (read === "true") return true;
  if (read === "false") return false;
  return undefined;
}

function readToString(read) {
  if (read === true) return "true";
  if (read === false) return "false";
  return undefined;
}

export {
  setupDatabase,
  uploadBooks,
  getCountries,
  getBooks,
  addBook,
  updateBook,
  removeDatabase,
};
