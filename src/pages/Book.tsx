import { useNavigate, useParams } from "react-router";
import shapeImage from "../assets/images/shape2.svg";
import { deleteBookByBookId, findBookById } from "../data/apiService";
import { useEffect, useState } from "react";
import { BookData } from "../types/dataTypes";
import LargeBook from "../components/book/LargeBook";
import { useErrorToast, useSuccessToast } from "../components/Toast";
import { Routes } from "../navigation/routes";
const Book = () => {
  const bookId = Number(useParams().bookId) || null;
  const [bookData, setBookData] = useState<BookData | null>(null);
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const navigate = useNavigate();
  const fetchBook = async () => {
    try {
      const response = bookId ? await findBookById(bookId) : null;
      if (!response?.data) return;
      setBookData(response.data);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };
  const onDeleteBookButtonClick = (book_id: number | undefined) => {
    if (!book_id) {
      showErrorToast("Could not delete book");
      return;
    }
    deleteBookByBookId(book_id).then(() => {
      showSuccessToast("Book deleted.");
      setBookData(null);
      navigate(Routes.MyBooks);
    });
  };

  useEffect(() => {
    fetchBook();
  });
  return (
    <section
      className="flex flex-col gap-8 items-center min-h-full py-8"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      {bookData && (
        <>
          <div className="flex flex-col gap-8 items-center py-8 bg-white p-8 rounded-xl max-w-[800px] md:max-w-[1200px] w-full h-fit shadow-2xl border-2 border-lightGray justify-center">
            <LargeBook
              bookData={bookData}
              onDeleteBookButtonClick={onDeleteBookButtonClick}
            />
          </div>
        </>
      )}
    </section>
  );
};
export default Book;
