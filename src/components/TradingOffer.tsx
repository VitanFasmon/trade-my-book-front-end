import { useEffect, useState } from "react";
import { BookData, TradeData } from "../types/dataTypes";
import MediumBook from "./Book/MediumBook";
import Typography from "./Typography";
import { findBookById } from "../data/apiService";

interface TradingOfferProps {
  trade: TradeData;
}
/*
  trade_id: number;
  offered_book_id: number;
  requested_book_id: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED";
  trade_date: string;
  dateUpdated: string | null;
  user_from: number;
  user_to: number;
*/
const TradingOffer = ({ trade }: TradingOfferProps) => {
  const [offeredBook, setOfferedBook] = useState<BookData | null>(null);
  const [requestedBook, setRequestedBook] = useState<BookData | null>(null);

  const fetchBooks = async () => {
    const offeredBookId = trade.offered_book_id;
    const requestedBookId = trade.requested_book_id;
    const offeredBook = await findBookById(offeredBookId);
    const requestedBook = await findBookById(requestedBookId);
    console.log(offeredBook.data);
    offeredBook.data && setOfferedBook(offeredBook.data);
    requestedBook.data && setRequestedBook(requestedBook.data);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center justify-center">
        <Typography as="p" variant="p">
          Status: {trade.status}
        </Typography>
        <Typography as="p" variant="p">
          Trade added: {trade.trade_date}
        </Typography>
        <Typography as="p" variant="p">
          Last updated: {trade.dateUpdated}
        </Typography>
      </div>
      <div className="flex flex-row gap-2 items-center justify-between">
        {offeredBook ? (
          <MediumBook bookData={offeredBook} />
        ) : (
          <Typography as="p" variant="p">
            Could not display book
          </Typography>
        )}
        {requestedBook ? (
          <MediumBook bookData={requestedBook} />
        ) : (
          <Typography as="p" variant="p">
            Could not display book
          </Typography>
        )}
      </div>
    </div>
  );
};
export default TradingOffer;
