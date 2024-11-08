import { useEffect, useState } from "react";
import Typography from "../components/Typography";
import { getTradesByUser } from "../data/apiService";
import { TradeData } from "../types/dataTypes";
import TradingOffer from "../components/TradingOffer";
import Separator from "../components/Separator";

const TradingQueue = () => {
  const [tradingQueue, setTradingQueue] = useState<TradeData[] | null>(null);
  const fetchTrades = async () => {
    try {
      const response = await getTradesByUser();
      response.data && setTradingQueue(response.data);
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
              {`You have ${tradingQueue.length} trading offers`}
            </Typography>
            <div className="flex flex-col gap-2 w-full p-8">
              <div className="flex flex-row gap-2 w-full items-center justify-evenly my-8">
                <Typography as="h3" variant="h3">
                  You receive
                </Typography>
                <Typography as="h3" variant="h3">
                  You lose
                </Typography>
              </div>
              {tradingQueue?.map((trade, index) => {
                return (
                  <>
                    <TradingOffer trade={trade} key={crypto.randomUUID()} />
                    {index < tradingQueue.length - 1 && <Separator />}
                  </>
                );
              })}
            </div>
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