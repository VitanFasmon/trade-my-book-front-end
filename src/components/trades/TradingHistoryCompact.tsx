import { getAcceptedTradesIdsByUserId } from "../../data/apiService";
import { useEffect, useState } from "react";
import TradeCompact from "./TradeCompact";
import Typography from "../Typography";
import Separator from "../Separator";

interface TradingHistoryCompactProps {
  userId: number;
}
const TradingHistoryCompact = ({ userId }: TradingHistoryCompactProps) => {
  const [tradeIds, setTradeIds] = useState<number[]>([]);
  const fetchAcceptedTradeIds = async () => {
    const response = await getAcceptedTradesIdsByUserId(userId);
    response?.data && setTradeIds(response.data);
  };
  useEffect(() => {
    fetchAcceptedTradeIds();
  });
  return (
    <section className="flex flex-col gap-2 w-full items-center">
      <Typography as="h3" variant="h3">
        Trading history
      </Typography>
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
    </section>
  );
};
export default TradingHistoryCompact;
