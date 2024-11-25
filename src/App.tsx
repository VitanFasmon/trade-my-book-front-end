import "./App.css";
import Navbar from "./components/sections/Navbar";
import Footer from "./components/sections/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToHash from "./navigation/ScrollToHash";

function App() {
  return (
    <div className="App h-screen">
      <ToastContainer
        position="top-center"
        className="top-3 w-full px-6 md:max-w-90 md:px-0 "
        autoClose={5000}
        closeButton
      />
      <ScrollToHash />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
