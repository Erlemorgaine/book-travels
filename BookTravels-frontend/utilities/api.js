import { Alert } from "react-native";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export function getBooksForUser(userId) {
  return fetch(`${apiUrl}user/${userId}`)
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function addBookForUser(userId, book) {
  return fetch(`${apiUrl}user/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type of the request
      // Add any other headers as needed (e.g., authentication headers)
    },
    body: JSON.stringify(book), // Convert the data to a JSON string
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function updateBookForUser(userId, newBook) {
  return fetch(`${apiUrl}user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // Set the content type of the request
      // Add any other headers as needed (e.g., authentication headers)
    },
    body: JSON.stringify(newBook), // Convert the data to a JSON string
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function createUser(userId) {
  return (
    fetch(apiUrl + "create/" + userId)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else if (res.status == 409) {
          return false;
        }
      })
      // TODO: Handle status codes
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "API request failed.");

        return false;
      })
  );
}

export function loginUser(userId) {
  return (
    fetch(apiUrl + "login/" + userId)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else if (res.status == 404) {
          return false;
        }
      })
      // TODO: Handle status codes
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "API request failed.");
      })
  );
}
