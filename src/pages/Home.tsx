import Hero from "../components/sections/Hero";
import SearchAllTradableBooks from "../components/displayBooks/SearchAllTradableBooks";

const Home = () => {
  return (
    <section className="bg-lightGray">
      <Hero />
      <SearchAllTradableBooks />
    </section>
  );
};
export default Home;
