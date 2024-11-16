import { useEffect, useState } from "react";
import Typography from "../components/Typography";
import { getTradesByUser } from "../data/apiService";
import { TradeData } from "../types/dataTypes";
import ActiveTrades from "../components/Trades/ActiveTrades";
import TradingHistory from "../components/Trades/TradingHistory";
interface TradingQueueProps {
  TradeQueueType: "active" | "history";
}
const TradingQueue = ({ TradeQueueType }: TradingQueueProps) => {
  const [tradingQueue, setTradingQueue] = useState<TradeData[] | null>(null);
  const fetchTrades = async () => {
    try {
      const response = await getTradesByUser();
      if (!response.data) return;
      setTradingQueue(response.data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);
  const trades =
    tradingQueue?.filter((trade) => {
      if (TradeQueueType === "active") return trade.status === "pending";
      if (TradeQueueType === "history") return trade.status !== "pending";
    }) || [];

  return (
    <section className="min-h-full flex flex-col py-8 items-center">
      <div className="flex flex-col gap-2 items-center">
        {tradingQueue && trades.length !== 0 ? (
          <>
            {TradeQueueType === "active" ? (
              <ActiveTrades trades={trades} fetchTrades={fetchTrades} />
            ) : (
              <TradingHistory trades={trades} fetchTrades={fetchTrades} />
            )}
          </>
        ) : (
          <>
            <Typography as="h1" variant="h2">
              You don't have any trading{" "}
              {TradeQueueType === "active" ? "offers" : "history"}
            </Typography>
            <Typography as="h3" variant="h3">
              Search for some books to trade!
            </Typography>
          </>
        )}
      </div>
    </section>
  );
};

export default TradingQueue;
