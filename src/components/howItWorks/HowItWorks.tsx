import Typography from "../Typography";
import shapeImage from "../../assets/images/shape2.svg";
import { Routes } from "../../navigation/routes";
interface HowItWorksProps {
  hideSignUp: boolean;
}
const HowItWorks = ({ hideSignUp }: HowItWorksProps) => {
  return (
    <section
      className="flex justify-start w-full"
      style={{ backgroundImage: `url(${shapeImage})` }}
      id="howItWorks"
    >
      <div className="flex flex-col gap-2 px-8 py-12 max-w-[800px] bg-lightGray">
        <Typography as="h2" variant="h2" className="text-center p-2">
          How It Works
        </Typography>
        {!hideSignUp && (
          <>
            <Typography as="h3" variant="h3">
              Sign Up & Create Your Profile
            </Typography>
            <Typography as="p" variant="p">
              Join our community of book lovers by signing up. Add your address
              and your contact details and you're good to go! You can sign up
              <a href={Routes.Registration} className="font-bold mx-1">
                here.
              </a>
            </Typography>
          </>
        )}
        <Typography as="h3" variant="h3">
          List Your Books
        </Typography>
        <Typography as="p" variant="p">
          Have books you no longer need? Simply search for the book you own in
          the vast library of Google Books and list it for other so see in a
          matter of seconds. Alternatively you can manually upload book details,
          its condition, and a photo of the book. You can also choose whether
          your book is tradable or not.
        </Typography>
        <Typography as="h3" variant="h3">
          Search for Books
        </Typography>
        <Typography as="p" variant="p">
          Browse our vast library of books available near you. You can set a
          distance of how far away you want to search.
        </Typography>
        <Typography as="h3" variant="h3">
          Make a Trade
        </Typography>
        <Typography as="p" variant="p">
          Found something you love? Request a trade by offering one of your
          books in return. Agree on the swap, and you're good to go.
        </Typography>
        <Typography as="h3" variant="h3">
          Exchange & Enjoy
        </Typography>
        <Typography as="p" variant="p">
          Once your trade is confirmed, swap books via mail or meet up locally.
          Don’t forget to rate and leave feedback for your trading partner.
        </Typography>
      </div>
    </section>
  );
};
export default HowItWorks;
