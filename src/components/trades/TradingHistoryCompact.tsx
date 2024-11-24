import { getAcceptedTradesIdsByUserId } from "../../data/apiService";
import { useEffect, useState } from "react";
import TradeCompact from "./TradeCompact";
import Typography from "../Typography";
import Separator from "../Separator";
import Button from "../buttons/Button";

interface TradingHistoryCompactProps {
  userId: number;
}
const TradingHistoryCompact = ({ userId }: TradingHistoryCompactProps) => {
  const [tradeIds, setTradeIds] = useState<number[]>([]);
  const [showTradingHistory, setShowTradingHistory] = useState<boolean>(false);
  const fetchAcceptedTradeIds = async () => {
    const response = await getAcceptedTradesIdsByUserId(userId);
    response?.data && setTradeIds(response.data);
  };
  useEffect(() => {
    fetchAcceptedTradeIds();
  }, [userId]);

  return (
    <section className="flex flex-col gap-2 w-full items-center">
      <Button
        type="planePrimary"
        onClick={() => {
          setShowTradingHistory(!showTradingHistory);
        }}
      >
        <Typography as="h3" variant="h3">
          Trading history {showTradingHistory ? "▲" : "▼"}
        </Typography>
      </Button>
      {showTradingHistory && (
        <div className="flex flex-col gap-2 w-full items-center max-h-[300px] h-fit overflow-auto p-2">
          {tradeIds ? (
            tradeIds?.map((tradeId, index) => {
              return (
                <div key={crypto.randomUUID()} className="w-full">
                  <TradeCompact tradeId={tradeId} userId={userId} />
                  {index < tradeIds.length - 1 && <Separator />}
                </div>
              );
            })
          ) : (
            <Typography as="p" variant="p">
              No trades found.
            </Typography>
          )}
        </div>
      )}
    </section>
  );
};
export default TradingHistoryCompact;
