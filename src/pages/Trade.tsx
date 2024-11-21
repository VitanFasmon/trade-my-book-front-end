import { useEffect, useState } from "react";
import TradingOffer from "../components/trades/TradingOffer";
import { TradeData } from "../types/dataTypes";
import { addComment, getTradeById } from "../data/apiService";
import { useParams } from "react-router";
import shapeImage from "../assets/images/shape2.svg";
import AddComment from "../components/comments/AddComment";
import Button from "../components/buttons/Button";
import CommentSection from "../components/comments/CommentSection";
const Trade = () => {
  const [trade, setTrade] = useState<TradeData | null>(null);
  const [comment, setComment] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const tradeId = useParams();
  const fetchTrades = async () => {
    try {
      const response = tradeId
        ? await getTradeById(Number(tradeId.tradeId))
        : null;
      if (!response || !response.data) return;
      setTrade(response.data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };
  const onAddCommentClick = async () => {
    if (!trade?.trade_id || !comment || comment.length == 0) {
      return;
    }
    try {
      await addComment(trade.trade_id, comment);
      setRefresh(!refresh);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  useEffect(() => {
    fetchTrades();
  }, []);
  return (
    <section
      className="min-h-screen p-8 flex flex-col items-center gap-4"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      {trade && (
        <>
          <TradingOffer standalone trade={trade} fetchTrades={fetchTrades} />
          <div className="flex flex-col gap-2 max-w-[800px] w-full bg-white p-4  border-lightGray rounded-xl shadow-2xl ">
            <CommentSection trade={trade} refresh={refresh} />
            <div className="flex flex-col gap-2 max-w-[800px] w-full">
              <AddComment comment={comment} setComment={setComment} />
              <Button type="secondary" onClick={onAddCommentClick}>
                Add Comment
              </Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default Trade;
