import "./App.css";
import TestApi from "./components/TestApi";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import AppRouterProvider from "./navigation/AppRouterProvider";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
