import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routerChildren from "./routes";
import App from "../App";

const appRouter = createBrowserRouter([
  { path: "/", children: [...routerChildren], element: <App /> },
]);

const AppRouterProvider = () => <RouterProvider router={appRouter} />;

export default AppRouterProvider;
