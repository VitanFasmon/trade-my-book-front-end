import Typography from "../Typography";
import shapeImage from "../../assets/images/shape2.svg";
import SlideFadeIn from "../slideFadeIn/SlideFadeIn";
const FAQs = () => {
  return (
    <section
      className="flex justify-start w-full"
      style={{ backgroundImage: `url(${shapeImage})` }}
      id="faqs"
    >
      <SlideFadeIn
        direction="left"
        className="flex flex-col gap-2 px-8 py-12 max-w-[800px] bg-lightGray"
      >
        <Typography as="h2" variant="h2" className="text-center p-2">
          FAQs
        </Typography>
        <Typography as="h3" variant="h3">
          Q: Is it really free to use TradeMyBook?
        </Typography>
        <Typography as="p" variant="p">
          A: Absolutely! Listing, browsing, and trading books are completely
          free. You only pay for shipping if you're mailing a book.
        </Typography>
        <Typography as="h3" variant="h3">
          Q: Can I trade internationally?
        </Typography>
        <Typography as="p" variant="p">
          A: While most trades happen locally, international trades are possible
          if both users agree on shipping terms.
        </Typography>
        <Typography as="h3" variant="h3">
          Q: How do you ensure the safety of trades?
        </Typography>
        <Typography as="p" variant="p">
          A: All users are verified, and our rating system provides transparent
          exchanges. Plus, you can always report any suspicious activity. The
          system does however rely on trust and we can not guarantee 100% that
          there will be no bad apples. But we also believe that sometimes in
          life, if we take a leap of faith, to be part of something beautiful.
        </Typography>
      </SlideFadeIn>
    </section>
  );
};
export default FAQs;
