import { useParams } from "react-router";
import shapeImage from "../assets/images/shape2.svg";
import { findBookById } from "../data/apiService";
import { useEffect, useState } from "react";
import { BookData } from "../types/dataTypes";
const Book = () => {
  const bookId = Number(useParams().bookId) || null;
  const [bookData, setBookData] = useState<BookData | null>(null);
  const fetchBook = async () => {
    try {
      const response = bookId ? await findBookById(bookId) : null;
      if (!response?.data) return;
      setBookData(response.data);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };
  useEffect(() => {
    fetchBook();
  });
  return (
    <section
      className="flex flex-col gap-8 items-center h-full py-8"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      <div className="flex flex-col gap-8 items-center py-8 bg-white p-8 rounded-xl max-w-[800px] w-full h-[400px] shadow-2xl border-2 border-lightGray justify-center">
        {bookData?.title}
      </div>
    </section>
  );
};
export default Book;
