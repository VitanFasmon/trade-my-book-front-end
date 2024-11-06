import { useLocation } from "react-router";
import MediumBook from "../components/Book/MediumBook";
import { BookData } from "../types/dataTypes";

const TradeBook = () => {
  const location = useLocation();
  const { chosenBook } = location.state as { chosenBook: BookData }; // Type-casting for safety

  return (
    <section className="h-full">
      <h2>Trade Book</h2>
      {chosenBook ? (
        <MediumBook bookData={chosenBook} />
      ) : (
        <p>No book selected</p>
      )}
    </section>
  );
};

export default TradeBook;
