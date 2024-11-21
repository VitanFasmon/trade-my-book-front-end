import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import Logout from "../Logout";
import logo from "../../assets/icons/logo-192x192.png";
import Button from "../buttons/Button";
import Typography from "../Typography";
import { Routes } from "../../navigation/routes";
import { checkScreenSize } from "../../util/util";
import hamburgerIcon from "../../assets/icons/hamburger.png";
const Navbar = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [isLargeScreen, setIsLargeScreen] = useState(checkScreenSize("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(checkScreenSize("md"));
      if (checkScreenSize("md")) {
        setMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex flex-row gap-2 justify-between p-4 border-b-2 border-secondary items-center">
      <Button
        type="planePrimary"
        link
        href={Routes.Home}
        className="flex flex-row gap-2 justify-center items-center"
      >
        <img src={logo} alt="logo" className="w-12" />
        <Typography as="p" variant="h3" className="font-bold">
          TradeMyBook
        </Typography>
      </Button>
      {isLargeScreen && (
        <ul className="flex flex-row gap-4">
          {isAuthenticated && (
            <>
              <li>
                <Button type="planePrimary" link href={Routes.Home}>
                  Home
                </Button>
              </li>
              <li>
                <Button type="planePrimary" link href={Routes.AddBook}>
                  Add Book
                </Button>
              </li>
              <li>
                <Button type="planePrimary" link href={Routes.MyBooks}>
                  My Books
                </Button>
              </li>
              <li>
                <Button type="planePrimary" link href={Routes.ActiveTrades}>
                  Active Trades
                </Button>
              </li>
              <li>
                <Button type="planePrimary" link href={Routes.TradingHistory}>
                  Trading History
                </Button>
              </li>
            </>
          )}
        </ul>
      )}
      {isLargeScreen ? (
        <ul className="flex flex-row gap-4">
          {isAuthenticated ? (
            <>
              <li>
                <Button type="outlinedSecondary" link href={Routes.Profile}>
                  {user?.name}
                </Button>
              </li>
              <li>
                <Logout />
              </li>
            </>
          ) : (
            <>
              <li>
                <Button
                  type="outlinedSecondary"
                  link
                  href={Routes.Registration}
                >
                  Sign up
                </Button>
              </li>
              <li>
                <Button type="secondary" link href={Routes.Login}>
                  Sign in
                </Button>
              </li>
            </>
          )}
        </ul>
      ) : (
        <>
          <button onClick={toggleMenu} className="text-xl">
            <img
              src={hamburgerIcon}
              alt="open menu"
              className={`h-10 w-10 ${menuOpen ? "rotate-90" : ""}`}
            />
          </button>
          {menuOpen && (
            <div className="absolute top-16 right-0 w-full bg-white shadow-md z-50 p-4">
              <ul className="flex flex-col gap-4">
                {isAuthenticated && (
                  <>
                    <li>
                      <Button type="planePrimary" link href={Routes.Home}>
                        Home
                      </Button>
                    </li>
                    <li>
                      <Button type="planePrimary" link href={Routes.AddBook}>
                        Add Book
                      </Button>
                    </li>
                    <li>
                      <Button type="planePrimary" link href={Routes.MyBooks}>
                        My Books
                      </Button>
                    </li>
                    <li>
                      <Button
                        type="planePrimary"
                        link
                        href={Routes.ActiveTrades}
                      >
                        Active Trades
                      </Button>
                    </li>
                    <li>
                      <Button
                        type="planePrimary"
                        link
                        href={Routes.TradingHistory}
                      >
                        Trading History
                      </Button>
                    </li>
                  </>
                )}
              </ul>
              <ul className="flex flex-col gap-4 mt-4  items-center">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Button
                        type="outlinedSecondary"
                        link
                        href={Routes.Profile}
                      >
                        {user?.name}
                      </Button>
                    </li>
                    <li>
                      <Logout />
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Button
                        type="outlinedSecondary"
                        link
                        href={Routes.Registration}
                      >
                        Sign up
                      </Button>
                    </li>
                    <li>
                      <Button type="secondary" link href={Routes.Login}>
                        Sign in
                      </Button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
