import { Routes } from "../../navigation/routes";
import Typography from "../Typography";
const CtaSmall = () => {
  return (
    <section className="flex flex-col gap-2 items-center text-center bg-primary p-8  text-white ">
      <Typography as="h3" variant="h3">
        Your bookshelf is full of potential.
      </Typography>
      <div className="flex flex-row flex-wrap justify-center items-center">
        <Typography
          as="h4"
          variant="h4"
          className="flex flex-row flex-wrap  items-center"
        >
          Unlock it with TradeMyBook.
        </Typography>
        <Typography
          as="h4"
          variant="h4"
          className="flex flex-row flex-wrap justify-center items-center"
        >
          <a
            href={Routes.Registration}
            className="font-bold mx-1 text-secondary"
          >
            Sign up now
          </a>
          and rediscover the joy of reading through sharing.
        </Typography>
      </div>
    </section>
  );
};
export default CtaSmall;
