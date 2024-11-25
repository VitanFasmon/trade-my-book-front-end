import cozyReading from "../../assets/images/cozy_book_reading_1622x1080.jpg";
import arrow from "../../assets/icons/drawn_arrow.png";
import { Routes } from "../../navigation/routes";
import Button from "../buttons/Button";
import Typography from "../Typography";
const CTA = () => {
  const textShadow = "[text-shadow:_0_0_10px_rgb(0_0_0_/_100%)]";
  return (
    <section
      style={{
        backgroundImage: `url(${cozyReading})`,
      }}
      className="w-full h-[1080px] bg-cover bg-center "
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-center gap-4">
        <Typography
          as="h2"
          variant="h2"
          className={`lg:text-[100px] text-[50px] leading-[50px] lg:leading-[120px] text-white ${textShadow}`}
        >
          Turn Your Bookshelf
        </Typography>
        <Typography
          as="h2"
          variant="h2"
          className={`lg:text-[100px] text-[50px] leading-[50px] lg:leading-[120px] text-white ${textShadow}`}
        >
          into a Treasure Trove
        </Typography>
        <Button
          type="secondary"
          link
          href={Routes.Registration}
          className={`lg:text-[70px] text-[40px] leading-[40px] lg:leading-[120px] text-white ${textShadow} relative`}
        >
          <img
            src={arrow}
            alt="arrow"
            className=" absolute  w-40 left-[-160px] bottom-[-70px] lg:w-64 lg:left-[-256px] lg:bottom-[-100px]"
          />
          Start Trading Today!
        </Button>
      </div>
    </section>
  );
};
export default CTA;
