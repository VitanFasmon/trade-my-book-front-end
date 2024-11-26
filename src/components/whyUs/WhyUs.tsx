import Typography from "../Typography";
import shapeImage from "../../assets/images/shape2dark.svg";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import SlideFadeIn from "../slideFadeIn/SlideFadeIn";
const WhyUs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref);
  useEffect(() => {
    console.log(isIntersecting);
  }, [isIntersecting]);
  return (
    <section
      className="flex justify-end bg-primary w-full"
      style={{ backgroundImage: `url(${shapeImage})` }}
      id="whyUs"
    >
      <SlideFadeIn
        direction="right"
        className="flex flex-col gap-2 px-8 py-12 max-w-[800px] text-white bg-primary "
      >
        <Typography as="h2" variant="h2" className="text-center p-2">
          Why TradeMyBook?
        </Typography>
        <Typography as="h3" variant="h3">
          📚 Sustainable Reading
        </Typography>
        <Typography as="p" variant="p">
          Every book you trade might help save a tree and gives a second life to
          stories that matter. Embrace the circular economy and make reading
          eco-friendly.
        </Typography>
        <Typography as="h3" variant="h3">
          ✨ Free & Easy to Use
        </Typography>
        <Typography as="p" variant="p">
          No complicated steps, no hidden fees. Simply list, browse, and trade –
          all at your fingertips.
        </Typography>
        <Typography as="h3" variant="h3">
          🌟 Meet Like-Minded Readers
        </Typography>
        <Typography as="p" variant="p">
          Discover a community of passionate book lovers. Exchange not just
          books but also stories and recommendations.
        </Typography>
        <Typography as="h3" variant="h3">
          🔍 Smart Search Filters
        </Typography>
        <Typography as="p" variant="p">
          From bestsellers to hidden gems, find exactly what you’re looking for
          with powerful search and location-based browsing.
        </Typography>
        <Typography as="h3" variant="h3">
          📖 Minimalistic Dashboard
        </Typography>
        <Typography as="p" variant="p">
          Keep track of your trading history, added books, and more with a
          simple and intuitive interface.
        </Typography>
      </SlideFadeIn>
    </section>
  );
};
export default WhyUs;
