import { getBooksByLocation } from "../data/apiService";
import useAuthStore from "../store/useAuthStore";
import AddBook from "./AddBook";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile";
import UsersBooks from "./UsersBooks";

const TestApi = () => {
  const { user } = useAuthStore();

  const onGetBooksByLocationClick = () => {
    getBooksByLocation(1)
      .then((books) => console.log("Books found:", books))
      .catch((err) => console.error("Failed to fetch books:", err));
  };

  return (
    <section className="flex flex-col gap-2 p-2">
      <p className="font-bold">
        PAGES:Register,login,add book, view book, user profile,trade book,
        search books
      </p>
      <Register />
      <Login />
      <AddBook />
      <button onClick={onGetBooksByLocationClick}>
        Test get books by location API
      </button>
    </section>
  );
};
export default TestApi;
