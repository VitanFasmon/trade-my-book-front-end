import { ToastContainer } from "react-toastify";
import Hero from "../components/sections/Hero";
import ShowBooks from "../components/ShowBooks";
import Typography from "../components/Typography";
import ToastUseExample from "../components/useToastExample";

const Home = () => {
  return (
    <section className="bg-lightGray">
      <Hero />
      <ShowBooks />
    </section>
  );
};
export default Home;
