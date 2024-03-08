import * as SQLite from "expo-sqlite";
import { countries } from "./constants/countries";

const db = SQLite.openDatabase("book_travels.db");

function createTable(tx, tableName, tableColumns) {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS ${tableName} (${tableColumns.join(", ")});`,
    [],
    () => console.log("Database table created successfully"),
    (error) => console.error("Error creating database table: ", error)
  );
}

const setupDatabase = () => {
  // Create countries table
  db.transaction((tx) => {
    createTable(tx, "countries", [
      "name TEXT NOT NULL",
      "code VARCHAR(2) NOT NULL UNIQUE PRIMARY KEY",
    ]);

    // Create books table
    createTable(tx, "books", [
      "id INTEGER PRIMARY KEY AUTOINCREMENT",
      "name TEXT NOT NULL",
      "writer TEXT NOT NULL",
      "read BOOLEAN",
      "notes TEXT NOT NULL",
      "country_code VARCHAR(2) NOT NULL",
      "FOREIGN KEY (country_code) REFERENCES countries(code)",
    ]);

    // Insert initial countries
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
  countries.forEach((country) => {
    tx.executeSql(
      `INSERT INTO countries (name, code) VALUES (?, ?);`,
      [country.name, country.code],
      () => console.log(`Inserted ${country.name} into countries table`),
      (error) => console.error(`Error inserting ${country.name}: `, error)
    );
  });
};

function getBooks(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM countries as c LEFT JOIN books as b WHERE c.code = b.;`,
      [],
      (_, { rows: { _array } }) => callback(_array),
      (error) => console.error("Error retrieving items from database: ", error)
    );
  });
}

function uploadBooks(books) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO items (name) VALUES (?);`,
      [name],
      (_, result) => callback(result.insertId),
      (error) => console.error("Error inserting item into database: ", error)
    );
  });
}

function addBook(userId, book) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO items (name) VALUES (?);`,
      [name],
      (_, result) => callback(result.insertId),
      (error) => console.error("Error inserting item into database: ", error)
    );
  });
}

function updateBook(userId, newBook) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO items (name) VALUES (?);`,
      [name],
      (_, result) => callback(result.insertId),
      (error) => console.error("Error inserting item into database: ", error)
    );
  });
}

function createUser(userId) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO items (name) VALUES (?);`,
      [name],
      (_, result) => callback(result.insertId),
      (error) => console.error("Error inserting item into database: ", error)
    );
  });
}

function loginUser(userId) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO items (name) VALUES (?);`,
      [name],
      (_, result) => callback(result.insertId),
      (error) => console.error("Error inserting item into database: ", error)
    );
  });
}

export {
  setupDatabase,
  uploadBooks,
  getBooks,
  addBook,
  updateBook,
  createUser,
  loginUser,
};
