import { useEffect, useState } from "react";
import Typography from "../components/Typography";
import { getTradesByUser } from "../data/apiService";
import { TradeData } from "../types/dataTypes";
import TradingOffer from "../components/TradingOffer";
import Separator from "../components/Separator";
import Button from "../components/Buttons/Button";
import { Routes } from "../navigation/routes";

const TradingQueue = () => {
  const [tradingQueue, setTradingQueue] = useState<TradeData[] | null>(null);
  const [tradingHistory, setTradingHistory] = useState<TradeData[] | null>(
    null
  );
  const fetchTrades = async () => {
    try {
      const response = await getTradesByUser();
      if (!response.data) return;
      setTradingQueue(response.data);
      setTradingHistory(
        response.data.filter((trade) => {
          return trade.status !== "pending";
        })
      );
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };
  useEffect(() => {
    fetchTrades();
  }, []);
  return (
    <section className="min-h-full flex flex-col py-8 items-center">
      <div className="flex flex-col gap-2 items-center">
        {tradingQueue && tradingQueue.length !== 0 ? (
          <>
            <Typography as="h1" variant="h2">
              {`You have ${
                tradingHistory?.length
                  ? tradingQueue.length - tradingHistory?.length
                  : tradingQueue.length
              } trading offers`}
            </Typography>
            <div className="flex flex-col gap-2 w-full p-8">
              {tradingQueue
                ?.filter((trade) => {
                  return trade.status == "pending";
                })
                .map((trade, index) => {
                  return (
                    <div
                      key={crypto.randomUUID()}
                      className=" hover:shadow-2xl px-0 py-0 transition-shadow duration-300 hover:text-opacity-100"
                    >
                      <TradingOffer trade={trade} fetchTrades={fetchTrades} />
                      {index < tradingQueue.length - 1 && <Separator />}
                    </div>
                  );
                })}
            </div>
            {tradingHistory && (
              <>
                <Typography as="h1" variant="h2">
                  {`Trading history`}
                </Typography>
                <div className="flex flex-col gap-2 w-full p-8">
                  {tradingHistory?.map((trade, index) => {
                    return (
                      <Button
                        type="planePrimary"
                        link
                        href={`${Routes.Trade}/${trade.trade_id}`}
                        key={crypto.randomUUID()}
                        className=" hover:shadow-2xl px-0 py-0 transition-shadow duration-300 hover:text-opacity-100"
                      >
                        <TradingOffer trade={trade} fetchTrades={fetchTrades} />
                        {index < tradingQueue.length - 1 && <Separator />}
                      </Button>
                    );
                  })}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <Typography as="h1" variant="h2">
              You don't have any trading offers
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
