import { useEffect, useState } from "react";
import TradingOffer from "../components/TradingOffer";
import { TradeData } from "../types/dataTypes";
import { addComment, getTradeById } from "../data/apiService";
import { useParams } from "react-router";
import shapeImage from "../assets/images/shape2.svg";
import AddComment from "../components/AddComment";
import Button from "../components/Buttons/Button";
const Trade = () => {
  const [trade, setTrade] = useState<TradeData | null>(null);
  const [comment, setComment] = useState<string>("");
  const tradeId = useParams();
  const fetchTrades = async () => {
    try {
      const response = tradeId
        ? await getTradeById(Number(tradeId.tradeId))
        : null;
      if (!response) return;
      if (!response.data) return;
      setTrade(response.data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };
  const onAddCommentClick = async () => {
    if (!trade?.trade_id || !comment || comment.length == 0) {
      return;
    }
    console.log(trade.trade_id);
    try {
      const response = await addComment(trade.trade_id, comment);
      console.log(response);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  useEffect(() => {
    fetchTrades();
  }, []);
  return (
    <section
      className="min-h-screen p-8 flex flex-col items-center"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      {trade && (
        <>
          <TradingOffer standalone trade={trade} fetchTrades={fetchTrades} />
          <AddComment comment={comment} setComment={setComment} />
          <Button type="secondary" onClick={onAddCommentClick}>
            Add Comment
          </Button>
        </>
      )}
    </section>
  );
};
export default Trade;
