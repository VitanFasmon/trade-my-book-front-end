import bookshelf from "../../assets/images/bookshelf.jpg";
import Typography from "../Typography";
const Hero = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${bookshelf})`,
      }}
      className="w-full h-[600px] bg-cover bg-center bg-darkGray bg-blend-overlay"
    >
      <div className="w-full h-full flex flex-col justify-center items-center text-center text-lightGray gap-4">
        <Typography as="h1" variant="h1">
          Welcome to TradeMyBook.
        </Typography>
        <Typography as="p" variant="h3">
          Because you need books.
        </Typography>
      </div>
    </section>
  );
};
export default Hero;
