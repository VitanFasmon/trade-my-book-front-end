import { useEffect, useState } from "react";
import Typography from "../Typography";
import { numberRatingToStars } from "../../util/util";
import { getRatingsByTradeId } from "../../data/apiService";
import { RatingData } from "../../types/dataTypes";
import Button from "../buttons/Button";
import { Routes } from "../../navigation/routes";

interface TradeCompactProps {
  tradeId: number;
  userId: number;
}
const TradeCompact = ({ tradeId, userId }: TradeCompactProps) => {
  const [tradeData, setTradeData] = useState<any | null>(null); //FIX ANY
  const [rating, setRating] = useState<number | null>(null);
  const fetchTradeData = async () => {};
  const fetchRatingData = async () => {
    const response = await getRatingsByTradeId(tradeId);
    if (!response.data) return;

    response.data.forEach((rating: RatingData) => {
      console.log(rating);
      if (rating.user_id !== userId) return;
      setRating(rating.rating);
      return;
    });
  };
  useEffect(() => {
    //fetchTradeData();
    //fetchRatingData();
  }, []);
  return (
    <div className="w-full flex flex-row items-center justify-between">
      tradeId:{tradeId}
      <Typography as="p" variant="p">
        {tradeData?.title}
      </Typography>
      <Button link href={Routes.Trade + "/" + tradeId} type="planePrimary">
        View trade
      </Button>
      <Typography as="p" className="font-bold">
        {rating ? numberRatingToStars(rating) : ""}
      </Typography>
    </div>
  );
};
export default TradeCompact;
