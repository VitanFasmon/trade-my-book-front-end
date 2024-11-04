import ProtectedRoute from "../components/ProtectedRoutes";
import AddBook from "../pages/AddBook";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyBooks from "../pages/MyBooks";
import Register from "../pages/Register";
import UserProfile from "../pages/UserProfile";

export const Routes = {
  Home: "/",
  Registration: "/register",
  Login: "/login",
  Profile: "/profile",
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
