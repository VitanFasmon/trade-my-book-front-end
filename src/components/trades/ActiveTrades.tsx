import Typography from "../Typography";
import TradingOffer from "./TradingOffer";
import { TradeData } from "../../types/dataTypes";

interface ActiveTradesProps {
  trades: TradeData[];
  fetchTrades: () => void;
}

const ActiveTrades = ({ trades, fetchTrades }: ActiveTradesProps) => {
  return (
    <div className="flex flex-col items-center gap-8 w-full p-8">
      <Typography as="h1" variant="h2">
        {`You have ${trades.length} trading offers`}
      </Typography>
      <div className="flex flex-col items-center gap-2 w-full p-2">
        {trades.map((trade) => (
          <div
            key={crypto.randomUUID()}
            className="hover:shadow-2xl px-0 py-0 transition-shadow duration-300 hover:text-opacity-100 rounded-3xl"
          >
            <TradingOffer trade={trade} fetchTrades={fetchTrades} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveTrades;
