const apiUrl = process.env.APP_MANIFEST.variables[process.env.NODE_ENV].API_URL;

export function getBooksForUser(userId) {
  return fetch(apiUrl + "user/" + userId)
    .then((res) => res.json())
    .catch((e) => console.log(e));
}

export function addBookForUser(userId, book) {
  return fetch(apiUrl + "user/" + userId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type of the request
      // Add any other headers as needed (e.g., authentication headers)
    },
    body: JSON.stringify(book), // Convert the data to a JSON string
  }).catch((e) => console.log(e));
}

export function createUser(userId) {
  return fetch(apiUrl + "create/" + userId)
    .then((res) => res.json())
    .catch((e) => console.log(e));
}