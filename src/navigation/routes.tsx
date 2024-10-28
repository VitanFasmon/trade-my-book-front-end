import AddBook from "../components/AddBook";
import Home from "../components/Home";
import Login from "../components/Login";
import ProtectedRoute from "../components/ProtectedRoutes";
import Register from "../components/Register";
import SearchBooks from "../components/SearchBooks";
import UserProfile from "../components/UserProfile";

export const Routes = {
  Home: "/",
  Registration: "/register",
  Login: "/login",
  Profile: "/profile",
  SearchBooks: "/search",
  AddBook: "/add-book",
};

const routerChildren = [
  { path: Routes.Home, element: <Home /> },
  { path: Routes.Registration, element: <Register /> },
  { path: Routes.Login, element: <Login /> },
  {
    path: Routes.Profile,
    element: <ProtectedRoute />, // Only logged-in users can access UserProfile
    children: [{ path: Routes.Profile, element: <UserProfile /> }],
  },
  {
    path: Routes.SearchBooks,
    element: <ProtectedRoute />, // Only logged-in users can access SearchBooks
    children: [{ path: Routes.SearchBooks, element: <SearchBooks /> }],
  },
  {
    path: Routes.AddBook,
    element: <ProtectedRoute />, // Only logged-in users can access AddBook
    children: [{ path: Routes.AddBook, element: <AddBook /> }],
  },
];

export default routerChildren;
