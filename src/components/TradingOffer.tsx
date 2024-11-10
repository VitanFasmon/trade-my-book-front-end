import { useEffect, useState } from "react";
import { BookData, PublicUserData, TradeData } from "../types/dataTypes";
import MediumBook from "./Book/MediumBook";
import Typography from "./Typography";
import {
  acceptTrade,
  cancelTrade,
  fetchUserDataById,
  findBookById,
  rejectTrade,
} from "../data/apiService";
import Button from "./Buttons/Button";
import useAuthStore from "../store/useAuthStore";
import { formatDateString } from "../util/util";
import { useErrorToast, useInfoToast, useSuccessToast } from "./Toast";

interface TradingOfferProps {
  trade: TradeData;
  fetchTrades: () => void;
}
const TradingOffer = ({ trade, fetchTrades }: TradingOfferProps) => {
  const [offeredBook, setOfferedBook] = useState<BookData | null>(null);
  const [requestedBook, setRequestedBook] = useState<BookData | null>(null);
  const { user } = useAuthStore();
  const [otherUser, setOtherUser] = useState<PublicUserData | null>(null);
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();

  const fetchBooks = async () => {
    const newOfferedBook = await findBookById(trade.offered_book_id);
    const newRequestedBook = await findBookById(trade.requested_book_id);
    newOfferedBook.data && setOfferedBook(newOfferedBook.data);
    newRequestedBook.data && setRequestedBook(newRequestedBook.data);
  };
  const getOtherUserData = async () => {
    try {
      const otherUserId =
        user?.user_id == trade.user_from ? trade.user_to : trade.user_from;
      const response = await fetchUserDataById(otherUserId);
      setOtherUser(response.data || null);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const onCancelTradeClick = async () => {
    try {
      await cancelTrade(trade.trade_id);
      showSuccessToast("Trade cancelled successfully.");
      fetchTrades();
    } catch (error) {
      showErrorToast("Error! Unable to cancel trade.");
      console.error("Error cancelling trade:", error);
    }
  };
  const onAcceptTradeClick = async () => {
    try {
      await acceptTrade(trade.trade_id);
      showSuccessToast("Trade accepted successfully.");
      fetchTrades();
    } catch (error) {
      showErrorToast("Error! Unable to accept trade.");
      console.error("Error cancelling trade:", error);
    }
  };
  const onRejectTradeClick = async () => {
    try {
      await rejectTrade(trade.trade_id);
      showSuccessToast("Trade rejected successfully.");
      fetchTrades();
    } catch (error) {
      showErrorToast("Error! Unable to reject trade.");
      console.error("Error rejecting trade:", error);
    }
  };
  useEffect(() => {
    getOtherUserData();
    fetchBooks();
  }, [trade.status]);
  return (
    <div className="flex flex-col gap-2 border-2 border-primary rounded-3xl p-2 md:border-none">
      {requestedBook && offeredBook && user && (
        <>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Typography as="p" variant="p">
              {formatDateString(trade.trade_date, true)}
            </Typography>
          </div>
          <div className="flex lg:flex-row flex-col gap-2 items-center lg:items-start justify-between">
            <div className="flex flex-col gap-2 w-full h-full items-center">
              <Typography as="p" variant="p">
                {`${otherUser?.name}'s book`}
              </Typography>

              <MediumBook
                bookData={
                  requestedBook.added_by_user_id == user.user_id
                    ? offeredBook
                    : requestedBook
                }
              />
            </div>
            <div className="flex flex-col gap-2 h-full justify-center items-center">
              {trade.status == "pending" ? (
                <>
                  {trade.user_to == user.user_id ? (
                    <>
                      <Button type="secondary" onClick={onAcceptTradeClick}>
                        Accept
                      </Button>
                      <Button type="danger" onClick={onRejectTradeClick}>
                        Decline
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button type="danger" onClick={onCancelTradeClick}>
                        Cancel
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Typography as="p" variant="p" className="font-bold p-2 ">
                    {trade.status.toLocaleUpperCase()}
                  </Typography>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full  h-full  items-center">
              <Typography as="p" variant="p">
                Your book
              </Typography>
              <MediumBook
                bookData={
                  requestedBook.added_by_user_id == user.user_id
                    ? requestedBook
                    : offeredBook
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default TradingOffer;
