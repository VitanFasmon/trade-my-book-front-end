import { useLocation, useNavigate } from "react-router";
import MediumBook from "../components/Book/MediumBook";
import { BookData } from "../types/dataTypes";
import Typography from "../components/Typography";
import Separator from "../components/Separator";
import MyBooks from "./MyBooks";
import { useState } from "react";
import Button from "../components/Buttons/Button";
import { initiateTrade } from "../data/apiService";
import { Routes } from "../navigation/routes";
import { useErrorToast, useSuccessToast } from "../components/Toast";
const TradeBook = () => {
  const location = useLocation();
  const { requestedBook } = location.state as { requestedBook: BookData };
  const [offeredBook, setOfferedBook] = useState<BookData | null>(null);
  const receiveDataOfSelectedBookToLoose = (bookData: BookData) => {
    setOfferedBook(bookData);
  };
  const navigate = useNavigate();

  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const handleTrade = () => {
    if (offeredBook?.book_id && requestedBook.book_id) {
      initiateTrade({
        offered_book_id: offeredBook.book_id,
        requested_book_id: requestedBook.book_id,
      })
        .then((res) => {
          setOfferedBook(null);
          showSuccessToast("Trade initiated successfully.");
          navigate(Routes.TradingQueue);
        })
        .catch((err) => {
          showErrorToast("Error: Could not trade book.");
          console.error({
            message: `Adding book failed: ${err}`,
            type: "error",
          });
        });
    }
  };
  const handleOnCancelButtonClick = () => {
    setOfferedBook(null);
  };
  return (
    <section className="min-h-full">
      {requestedBook ? (
        <div className="flex flex-col gap-8  p-8 ">
          <div className="flex md:flex-row flex-col gap-2 justify-evenly">
            <div className="flex flex-col gap-8 items-center w-full">
              <Typography as="h2" variant="h2">
                You will receive:
              </Typography>
              <MediumBook bookData={requestedBook} />
            </div>
            <div className="flex flex-col items-center justify-center min-w-48 p-2 gap-2">
              {offeredBook && (
                <>
                  <Button type="secondary" onClick={handleTrade}>
                    Propose a trade
                  </Button>
                  <Button
                    type="outlinedSecondary"
                    onClick={handleOnCancelButtonClick}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <Typography as="h2" variant="h2">
                You will loose:
              </Typography>
              {offeredBook && <MediumBook bookData={offeredBook} />}
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <Separator />
            <Typography as="h2" variant="h2">
              Select a book you want to trade for "{requestedBook.title}"
            </Typography>
            <MyBooks
              tradingMode={true}
              sendBookDataToParent={receiveDataOfSelectedBookToLoose}
            />
          </div>
        </div>
      ) : (
        <p>No book selected</p>
      )}
    </section>
  );
};

export default TradeBook;
