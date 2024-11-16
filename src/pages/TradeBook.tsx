import { useLocation, useNavigate } from "react-router";
import MediumBook from "../components/Book/MediumBook";
import { BookData, LocationData } from "../types/dataTypes";
import Typography from "../components/Typography";
import Separator from "../components/Separator";
import MyBooks from "./MyBooks";
import { useEffect, useState } from "react";
import Button from "../components/Buttons/Button";
import { addComment, getLocationById, initiateTrade } from "../data/apiService";
import { Routes } from "../navigation/routes";
import { useErrorToast, useSuccessToast } from "../components/Toast";
import useAuthStore from "../store/useAuthStore";
import AddComment from "../components/comments/AddComment";
const TradeBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const { requestedBook } = location.state as { requestedBook: BookData };
  const { user } = useAuthStore();
  const [offeredBook, setOfferedBook] = useState<BookData | null>(null);
  const [address, setAddress] = useState<LocationData | null>(null);
  const [detailsConfirmed, setDetailsConfirmed] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const receiveDataOfSelectedBookToLoose = (bookData: BookData) => {
    setOfferedBook(bookData);
  };
  const getUserLocationByLocationId = async () => {
    if (!user?.location_id) {
      return;
    }
    try {
      const response = await getLocationById(user?.location_id);
      if (response.data) {
        setAddress({
          address: response.data?.address,
          lat: response.data?.latitude,
          lng: response.data?.longitude,
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
  const handleTrade = async () => {
    if (!offeredBook?.book_id || !requestedBook.book_id) return;
    try {
      const response = await initiateTrade({
        offered_book_id: offeredBook.book_id,
        requested_book_id: requestedBook.book_id,
      });

      response.data &&
        comment &&
        comment.length > 0 &&
        (await addComment(response.data.trade_id, comment));

      setOfferedBook(null);
      showSuccessToast("Trade initiated successfully.");
      navigate(Routes.ActiveTrades);
    } catch (error) {
      showErrorToast("Error: Could not trade book.");
      console.error({
        message: `Adding book failed: ${error}`,
        type: "error",
      });
    }
  };
  const handleOnCancelButtonClick = () => {
    setOfferedBook(null);
    setDetailsConfirmed(false);
  };
  useEffect(() => {
    getUserLocationByLocationId();
  }, []);
  return (
    <section className="min-h-full">
      {requestedBook ? (
        <div className="flex flex-col gap-8 items-center p-8 ">
          <div className="flex md:flex-row flex-col gap-2 justify-evenly ">
            <div className="flex flex-col gap-8 items-center w-full">
              <Typography as="h2" variant="h2">
                You will receive:
              </Typography>
              <MediumBook bookData={requestedBook} />
            </div>
            <div className="flex flex-col items-center justify-center min-w-48 p-2 gap-2">
              <Button type="danger" onClick={handleOnCancelButtonClick}>
                Cancel Trade
              </Button>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
              <Typography as="h2" variant="h2">
                You will loose:
              </Typography>
              {offeredBook && <MediumBook bookData={offeredBook} />}
            </div>
          </div>
          {offeredBook && (
            <div className="flex flex-col gap-2 items-center max-w-[800px] w-full p-2">
              <AddComment comment={comment} setComment={setComment} />

              <Typography as="h3" variant="h3">
                Your name and shipping address
              </Typography>
              <Typography as="p" variant="p" className="font-bold">
                {`${user?.name}, `}
                {address?.address}
              </Typography>
              <Typography as="p" variant="p">
                You need to confirm your name and address to proceed.
              </Typography>

              <div className="flex flex-row ">
                <Button
                  type="secondary"
                  onClick={() => {
                    setDetailsConfirmed(true);
                  }}
                  className="rounded-r-none"
                >
                  Confirm
                </Button>
                <Button
                  type="primary"
                  link
                  href={Routes.Profile}
                  className="rounded-l-none"
                >
                  Change
                </Button>
              </div>

              {detailsConfirmed && (
                <Button type="secondary" onClick={handleTrade}>
                  Propose a trade
                </Button>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2 items-center w-full">
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
