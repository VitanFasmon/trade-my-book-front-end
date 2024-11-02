import AddBook from "../components/pages/AddBook";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import MyBooks from "../components/pages/MyBooks";
import ProtectedRoute from "../components/ProtectedRoutes";
import Register from "../components/pages/Register";
import UserProfile from "../components/pages/UserProfile";

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
