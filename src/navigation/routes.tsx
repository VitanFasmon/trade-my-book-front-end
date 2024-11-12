import ProtectedRoute from "../components/ProtectedRoutes";
import AddBook from "../pages/AddBook";
import Confirmed from "../pages/Confirmed";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyBooks from "../pages/MyBooks";
import Register from "../pages/Register";
import TradeBook from "../pages/TradeBook";
import TradingQueue from "../pages/TradingQueue";
import UserProfile from "../pages/UserProfile";

export const Routes = {
  Home: "/",
  Registration: "/register",
  Login: "/login",
  Profile: "/profile",
  AddBook: "/add-book",
  MyBooks: "/my-books",
  TradeBook: "/trade-book",
  TradingQueue: "/trading-queue",
  Confirmed: "/confirm/:token",
};

const routerChildren = [
  { path: Routes.Home, element: <Home /> },
  { path: Routes.Registration, element: <Register /> },
  { path: Routes.Login, element: <Login /> },
  { path: Routes.Confirmed, element: <Confirmed /> },
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
  {
    path: Routes.TradeBook,
    element: <ProtectedRoute />,
    children: [{ path: Routes.TradeBook, element: <TradeBook /> }],
  },
  {
    path: Routes.TradingQueue,
    element: <ProtectedRoute />,
    children: [{ path: Routes.TradingQueue, element: <TradingQueue /> }],
  },
];

export default routerChildren;
