import { useEffect, useState } from "react";
import { BookData, PublicUserData, TradeData } from "../../types/dataTypes";
import MediumBook from "../Book/MediumBook";
import Typography from "../Typography";
import {
  acceptTrade,
  cancelTrade,
  createRating,
  fetchUserDataById,
  findBookById,
  getRatingsByTradeId,
  rejectTrade,
  updateRating,
} from "../../data/apiService";
import Button from "../Buttons/Button";
import useAuthStore from "../../store/useAuthStore";
import { formatDateString, numberRatingToStars } from "../../util/util";
import { useErrorToast, useSuccessToast } from "../Toast";
import { Routes } from "../../navigation/routes";
import RatingSlider from "./RatingSlider";

interface TradingOfferProps {
  trade: TradeData;
  fetchTrades: () => void;
  standalone?: boolean;
}
const TradingOffer = ({
  trade,
  fetchTrades,
  standalone = false,
}: TradingOfferProps) => {
  const [offeredBook, setOfferedBook] = useState<BookData | null>(null);
  const [requestedBook, setRequestedBook] = useState<BookData | null>(null);
  const [otherUser, setOtherUser] = useState<PublicUserData | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [otherUserRating, setOtherUserRating] = useState<number | null>(null);
  const [enableRating, setEnableRating] = useState<boolean>(false);
  const [alreadyRated, setAlreadyRated] = useState<boolean>(false);
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const { user } = useAuthStore();

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
  const checkIfAlreadyRated = async () => {
    try {
      const response = await getRatingsByTradeId(trade.trade_id);
      if (!response.data || response.data?.length == 0) return;
      const ratings = response.data;
      ratings.forEach((rating) => {
        if (rating.user_id !== user?.user_id) {
          //each user rates the other
          setAlreadyRated(true);
          setUserRating(rating.rating);
          return;
        }
        setOtherUserRating(rating.rating);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const onConfirmRateTradeClick = async (isUpdate: boolean) => {
    setEnableRating(false);
    try {
      if (trade.status != "accepted") return;
      if (!user) return;
      const otherUserId =
        user?.user_id == trade.user_from ? trade.user_to : trade.user_from;
      console.log(isUpdate);
      if (isUpdate) {
        await updateRating({
          user_id: otherUserId,
          trade_id: trade.trade_id,
          rating: userRating,
        });
      } else {
        await createRating({
          user_id: otherUserId,
          trade_id: trade.trade_id,
          rating: userRating,
        });
      }
      showSuccessToast("Trade rated successfully.");
      fetchTrades();
    } catch (error) {
      showErrorToast("Error! Unable to rate trade.");
      console.error("Error rating trade:", error);
    }
  };
  useEffect(() => {
    getOtherUserData();
    fetchBooks();
    checkIfAlreadyRated();
  }, [trade.status]);
  return (
    <div className="flex flex-col gap-2 border-primary rounded-3xl p-2  bg-white shadow-2xl border-2 md:border-lightGray">
      {requestedBook && offeredBook && user && (
        <>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Typography as="p" variant="p">
              {formatDateString(trade.trade_date, true)}
            </Typography>
          </div>
          <div className="flex lg:flex-row flex-col gap-2 items-center lg:items-stretch	h-full justify-between">
            <div className="flex flex-col gap-2 w-full items-center justify-between">
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
              {otherUserRating ? (
                <>
                  <Typography as="p" variant="p">
                    {`${otherUser?.name} rated this trade: ${
                      otherUserRating
                        ? numberRatingToStars(otherUserRating)
                        : "N/A"
                    }`}
                  </Typography>
                </>
              ) : (
                <Typography as="p" variant="p">
                  {`${otherUser?.name} has not rated this trade yet.`}
                </Typography>
              )}
            </div>
            <div className="flex flex-col gap-2 h-full justify-center items-center md:w-64">
              {!standalone && (
                <Button
                  type="outlinedSecondary"
                  link
                  href={`${Routes.Trade}/${trade.trade_id}`}
                  className="w-fit text-center"
                >
                  View Trade
                </Button>
              )}

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
            <div className="flex flex-col gap-2 w-full items-center justify-between">
              <div className="flex flex-col gap-2 w-full h-full items-center">
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
              {trade.status == "accepted" && (
                <>
                  {alreadyRated ? (
                    <div className="flex items-center gap-2">
                      {!enableRating && (
                        <Typography as="p" variant="p">
                          {`You rated this trade: ${
                            userRating ? numberRatingToStars(userRating) : "N/A"
                          }`}
                        </Typography>
                      )}
                      <div className="flex flex-row gap-2">
                        {!enableRating && (
                          <Button
                            type="outlinedPrimary"
                            onClick={() => {
                              setEnableRating(true);
                            }}
                          >
                            Change Rating
                          </Button>
                        )}

                        {enableRating && (
                          <div className="flex flex-col items-center  justify-start gap-2">
                            <RatingSlider
                              value={userRating}
                              setValue={setUserRating}
                            />
                            <div className="flex justify-evenly flex-row">
                              <Button
                                type="outlinedPrimary"
                                className=" rounded-r-none"
                                onClick={() => {
                                  setEnableRating(false);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="primary"
                                className="w-full rounded-l-none"
                                onClick={() => onConfirmRateTradeClick(true)}
                              >
                                Confirm
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <Button
                        type="outlinedPrimary"
                        onClick={() => {
                          setEnableRating(true);
                        }}
                      >
                        Rate Trade
                      </Button>
                      {enableRating && (
                        <div>
                          <RatingSlider
                            value={userRating}
                            setValue={setUserRating}
                          />
                          <Button
                            type="primary"
                            onClick={() => onConfirmRateTradeClick(false)}
                          >
                            Confirm Rate
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default TradingOffer;
