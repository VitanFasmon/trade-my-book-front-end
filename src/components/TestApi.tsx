import {
  addBook,
  getBooksByLocation,
  loginUser,
  registerUser,
} from "../data/apiService";

const TestApi = () => {
  const onRegisterUserClick = () => {
    // Register a user
    registerUser({
      name: "Jane Doe",
      email: `${Math.floor(Math.random() * 1000)}john@example.com`,
      phone_number: "123456789",
      password: "password123",
      location_id: 1,
    })
      .then((res) => console.log("User registered:", res))
      .catch((err) => console.error("Registration failed:", err));
  };

  const onLoginUserClick = () => {
    // Log in a user
    loginUser({
      email: "john@example.com",
      password: "password123",
    })
      .then((res) => console.log("User logged in:", res))
      .catch((err) => console.error("Login failed:", err));
  };
  const onAddBookClick = () => {
    // Add a new book (after login)
    addBook({
      user_id: 1,
      google_books_api_id: "xyz123",
      condition: 8,
      picture: "http://example.com/path/to/image.jpg",
      trade_status: "available",
    })
      .then((res) => console.log("Book added:", res))
      .catch((err) => console.error("Adding book failed:", err));
  };
  const onGetBooksByLocationClick = () => {
    // Get books by location (after login)
    getBooksByLocation(1)
      .then((books) => console.log("Books found:", books))
      .catch((err) => console.error("Failed to fetch books:", err));
  };

  return (
    <section className="">
      <button onClick={onRegisterUserClick}>Test register API</button>
      <button onClick={onLoginUserClick}>Test login API</button>
      <button onClick={onAddBookClick}>Test add book API</button>
      <button onClick={onGetBooksByLocationClick}>
        Test get books by location API
      </button>
    </section>
  );
};
export default TestApi;
