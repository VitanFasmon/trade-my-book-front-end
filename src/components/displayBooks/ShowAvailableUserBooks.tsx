import { useEffect, useState } from "react";
import { BookData } from "../../types/dataTypes";
import Typography from "../Typography";
import Button from "../buttons/Button";
import { getPublicBooksByUserId } from "../../data/apiService";
import MediumBook from "../book/MediumBook";
import { useNavigate } from "react-router";
import { Routes } from "../../navigation/routes";

interface ShowAvailableUserBooksProps {
  userId: number;
}
const ShowAvailableUserBooks = ({ userId }: ShowAvailableUserBooksProps) => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [showBooks, setShowBooks] = useState<boolean>(false);
  const navigate = useNavigate();
  const fetchBooks = async () => {
    const response = await getPublicBooksByUserId(userId);
    if (!response.data) return;
    console.log(response.data);
    setBooks(response.data);
  };

  const onTradeBookButtonClick = (bookData: BookData) => {
    navigate(Routes.TradeBook, { state: { requestedBook: bookData } });
  };

  useEffect(() => {
    fetchBooks();
  }, [userId]);
  return (
    <section className="flex flex-col gap-2 w-full items-center">
      <Button
        type="planePrimary"
        onClick={() => {
          setShowBooks(!showBooks);
        }}
      >
        <Typography as="h3" variant="h3">
          Available Books {showBooks ? "▲" : "▼"}
        </Typography>
      </Button>
      {showBooks && (
        <div className="flex flex-col gap-2 w-full items-center  h-fit p-2">
          {books.length ? (
            books.map((book) => (
              <MediumBook
                bookData={book}
                goodToTrade={true}
                sendBookDataToParent={onTradeBookButtonClick}
              />
            ))
          ) : (
            <Typography as="p" variant="p">
              No books found.
            </Typography>
          )}
        </div>
      )}
    </section>
  );
};
export default ShowAvailableUserBooks;
