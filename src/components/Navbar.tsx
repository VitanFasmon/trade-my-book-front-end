import useAuthStore from "../store/useAuthStore";
import Logout from "./Logout";

const Navbar = () => {
  const { isAuthenticated, user } = useAuthStore();
  return (
    <nav className="flex flex-row gap-2 justify-between p-4">
      <ul className="flex flex-row gap-2">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/search">Search books</a>
        </li>
        <li>
          <a href="/add-book">Add book</a>
        </li>
      </ul>
      <ul className="flex flex-row gap-2">
        {isAuthenticated ? (
          <>
            <li>
              <p>
                Welcome, <a href="/profile">{user?.name}</a>
              </p>
            </li>

            <li>
              <Logout />
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
