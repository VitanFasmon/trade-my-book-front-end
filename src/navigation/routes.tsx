import AddBook from "../components/AddBook";
import Home from "../components/Home";
import Login from "../components/Login";
import MyBooks from "../components/MyBooks";
import ProtectedRoute from "../components/ProtectedRoutes";
import Register from "../components/Register";
import SearchBooks from "../components/SearchBooks/SearchBooks";
import UserProfile from "../components/UserProfile";

export const Routes = {
  Home: "/",
  Registration: "/register",
  Login: "/login",
  Profile: "/profile",
  SearchBooks: "/search",
  AddBook: "/add-book",
  MyBooks: "/my-books",
};

const routerChildren = [
  { path: Routes.Home, element: <Home /> },
  { path: Routes.Registration, element: <Register /> },
  { path: Routes.Login, element: <Login /> },
  {
    path: Routes.Profile,
    element: <ProtectedRoute />,
    children: [{ path: Routes.Profile, element: <UserProfile /> }],
  },
  {
    path: Routes.SearchBooks,
    element: <ProtectedRoute />,
    children: [{ path: Routes.SearchBooks, element: <SearchBooks /> }],
  },
  {
    path: Routes.AddBook,
    element: <ProtectedRoute />,
    children: [{ path: Routes.AddBook, element: <AddBook /> }],
  },
  {
    path: Routes.MyBooks,
    element: <ProtectedRoute />,
    children: [{ path: Routes.MyBooks, element: <MyBooks /> }],
  },
];

export default routerChildren;
