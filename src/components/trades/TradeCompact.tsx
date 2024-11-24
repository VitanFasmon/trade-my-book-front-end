import { useEffect, useState } from "react";
import Typography from "../Typography";
import { formatDateString, numberRatingToStars } from "../../util/util";
import {
  fetchUserDataById,
  getPublicTradeById,
  getRatingsByTradeId,
} from "../../data/apiService";
import {
  PublicTradeData,
  PublicUserData,
  RatingData,
  UserData,
} from "../../types/dataTypes";
import Button from "../buttons/Button";
import { Routes } from "../../navigation/routes";

interface TradeCompactProps {
  tradeId: number;
  userId: number;
}
const TradeCompact = ({ tradeId, userId }: TradeCompactProps) => {
  const [tradeData, setTradeData] = useState<PublicTradeData | null>(null);
  const [otherUser, setOtherUser] = useState<PublicUserData | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const fetchPublicTradeData = async () => {
    const response = await getPublicTradeById(tradeId);
    if (!response.data) return;
    setTradeData(response.data);
    fetchOtherUser(
      response.data.user_from === userId
        ? response.data.user_to
        : response.data.user_from
    );
  };
  const fetchRatingData = async () => {
    const response = await getRatingsByTradeId(tradeId);
    if (!response.data) return;
    assignCorrectRating(response.data);
  };
  const assignCorrectRating = (ratings: RatingData[]) => {
    ratings.forEach((rating: RatingData) => {
      if (rating.user_id !== userId) return;
      setRating(rating.rating);
      return;
    });
  };
  const fetchOtherUser = async (otherUserId: number) => {
    const response = await fetchUserDataById(otherUserId);
    if (!response?.data) return;
    setOtherUser(response.data);
  };
  useEffect(() => {
    fetchPublicTradeData();
    fetchRatingData();
  }, [tradeId]);
  return (
    <div className="w-full flex md:flex-row flex-col items-center justify-between">
      <Typography as="p" variant="p">
        {tradeData?.trade_date && formatDateString(tradeData.trade_date, true)}
      </Typography>
      {otherUser && (
        <div className="flex flex-row items-center">
          <Typography as="p" variant="p">
            Traded with
          </Typography>
          <Button
            type="planePrimary"
            link
            className="px-0"
            href={`${Routes.User}/${otherUser?.user_id}`}
          >
            {otherUser?.name}
          </Button>
        </div>
      )}
      <Typography
        as="p"
        className="font-bold min-w-20 md:text-right text-center"
      >
        {rating ? numberRatingToStars(rating) : "unrated"}
      </Typography>
    </div>
  );
};
export default TradeCompact;
