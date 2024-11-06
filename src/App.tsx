import "./App.css";
import Navbar from "./components/sections/Navbar";
import Footer from "./components/sections/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
