import {
  addBook,
  getBooksByLocation,
  loginUser,
  registerUser,
} from "../data/apiService";
import AddBook from "./AddBook";
import Login from "./Login";
import Register from "./Register";
import UserInfo from "./UserInfo";
import UsersBooks from "./UsersBooks";

const TestApi = () => {
  const onGetBooksByLocationClick = () => {
    getBooksByLocation(1)
      .then((books) => console.log("Books found:", books))
      .catch((err) => console.error("Failed to fetch books:", err));
  };

  return (
    <section className="flex flex-col gap-2 p-2">
      <Register />
      <Login />
      <AddBook />
      <UsersBooks />
      <UserInfo />
      <button onClick={onGetBooksByLocationClick}>
        Test get books by location API
      </button>
    </section>
  );
};
export default TestApi;
