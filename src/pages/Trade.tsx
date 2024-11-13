import { useEffect, useState } from "react";
import TradingOffer from "../components/TradingOffer";
import { TradeData } from "../types/dataTypes";
import { getTradeById } from "../data/apiService";
import { useParams } from "react-router";
import shapeImage from "../assets/images/shape2.svg";
const Trade = () => {
  const [trade, setTrade] = useState<TradeData | null>(null);
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
  useEffect(() => {
    fetchTrades();
  }, []);
  return (
    <section
      className="min-h-screen p-8 flex flex-col items-center"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      {trade && <TradingOffer trade={trade} fetchTrades={fetchTrades} />}
    </section>
  );
};
export default Trade;
