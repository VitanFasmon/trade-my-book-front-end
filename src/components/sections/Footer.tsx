import logoIcon from "../../assets/icons/logo-192x192.png";
import iconFacebook from "../../assets/icons/icon-facebook.svg";
import iconInstagram from "../../assets/icons/icon-instagram.svg";
import iconPinterest from "../../assets/icons/icon-pinterest.svg";
import iconTwitter from "../../assets/icons/icon-twitter.svg";
import Button from "../buttons/Button";
import { Routes } from "../../navigation/routes";
import Typography from "../Typography";
import useAuthStore from "../../store/useAuthStore";

const Footer = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <footer className="flex flex-col lg:flex-row bg-primary justify-between items-center lg:items-start">
      <div className="flex justify-center p-8">
        <Button
          type="planeWhite"
          link
          href={Routes.Home}
          className="flex flex-row gap-2 justify-center items-center"
        >
          <img src={logoIcon} alt="logo" className="w-12" />
          <Typography as="p" variant="h3" className="font-bold ">
            TradeMyBook
          </Typography>
        </Button>
      </div>
      <div className="flex flex-col md:flex-row  items-center md:items-start">
        <div className="flex flex-col gap-8 p-8  items-center md:items-start">
          <h3 className="text-xl font-bold text-white font-poppins">
            Features
          </h3>
          <ul className="flex flex-col gap-4   items-center md:items-start">
            {isAuthenticated ? (
              <>
                <li>
                  <Button
                    link
                    type="planeWhite"
                    href={Routes.Home}
                    className=" text-neutral-grayishViolet font-poppins pl-0"
                  >
                    Home
                  </Button>
                </li>
                <li>
                  <Button
                    link
                    type="planeWhite"
                    className=" text-neutral-grayishViolet font-poppins pl-0"
                    href={Routes.Search}
                  >
                    Search Books
                  </Button>
                </li>
                <li>
                  <Button
                    link
                    type="planeWhite"
                    href={Routes.AddBook}
                    className=" text-neutral-grayishViolet font-poppins pl-0"
                  >
                    Add Book
                  </Button>
                </li>
                <li>
                  <Button
                    link
                    type="planeWhite"
                    href={Routes.MyBooks}
                    className=" text-neutral-grayishViolet font-poppins pl-0"
                  >
                    My Books
                  </Button>
                </li>
                <li>
                  <Button
                    type="planeWhite"
                    link
                    href={Routes.ActiveTrades}
                    className=" text-neutral-grayishViolet font-poppins pl-0"
                  >
                    Active Trades
                  </Button>
                </li>
                <li>
                  <Button
                    type="planeWhite"
                    link
                    href={Routes.TradingHistory}
                    className=" text-neutral-grayishViolet font-poppins pl-0"
                  >
                    Trading History
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button
                    link
                    type="planeWhite"
                    href={Routes.Home}
                    className=" text-neutral-grayishViolet font-poppins pl-0"
                  >
                    Home
                  </Button>
                </li>
                <li>
                  <Button
                    link
                    type="planeWhite"
                    href={Routes.Registration}
                    className=" text-neutral-grayishViolet font-poppins pl-0"
                  >
                    Sign Up
                  </Button>
                </li>
                <li>
                  <Button
                    link
                    type="planeWhite"
                    href={Routes.Login}
                    className=" text-neutral-grayishViolet font-poppins pl-0"
                  >
                    Sign In
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-8 p-8 items-center md:items-start">
          <h3 className="text-xl font-bold text-white font-poppins">Company</h3>
          <ul className="flex flex-col gap-4 items-center md:items-start">
            <li>
              <Button
                link
                type="planeWhite"
                href={`${Routes.Home}#howItWorks`}
                className=" text-neutral-grayishViolet font-poppins pl-0"
              >
                How it works
              </Button>
            </li>
            <li>
              <Button
                link
                type="planeWhite"
                href={`${Routes.Home}#whyUs`}
                className=" text-neutral-grayishViolet font-poppins pl-0"
              >
                Why TradeMyBook
              </Button>
            </li>
            <li>
              <Button
                link
                type="planeWhite"
                href={`${Routes.Home}#faqs`}
                className=" text-neutral-grayishViolet font-poppins pl-0"
              >
                FAQs
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex gap-4 justify-center p-8">
        <Button link href="//www.facebook.com" type="planeWhite">
          <img src={iconFacebook} alt="Facebook icon" />
        </Button>
        <Button link href="//www.twitter.com" type="planeWhite">
          <img src={iconTwitter} alt="Twitter icon" />
        </Button>
        <Button link href="//www.pinterest.com" type="planeWhite">
          <img src={iconPinterest} alt="Pinterest icon" />
        </Button>
        <Button link href="//www.instagram.com" type="planeWhite">
          <img src={iconInstagram} alt="Instagram icon" />
        </Button>
      </div>
    </footer>
  );
};
export default Footer;
