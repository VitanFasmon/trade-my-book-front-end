import useAuthStore from "../store/useAuthStore";
import Logout from "./Logout";
import logo from "../assets/icons/logo-192x192.png";
import Button from "./Button";
import Typography from "./Typography";
import { Routes } from "../navigation/routes";

const Navbar = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <nav className="flex flex-row gap-2 justify-between p-4  items-center">
      <Button
        type="planePrimary"
        link
        href={Routes.Home}
        className="flex flex-row gap-2 justify-center items-center"
      >
        <img src={logo} alt="logo" className="w-12 " />
        <Typography as="p" variant="h3" className="font-bold">
          TradeMyBook
        </Typography>
      </Button>
      <ul className="flex flex-row gap-2">
        {isAuthenticated && (
          <>
            <li>
              <Button type="planePrimary" link href={Routes.Home}>
                <Typography as="p" variant="p" className="font-bold">
                  Home
                </Typography>
              </Button>
            </li>
            <li>
              <Button type="planePrimary" link href={Routes.SearchBooks}>
                <Typography as="p" variant="p" className="font-bold">
                  Search books
                </Typography>
              </Button>
            </li>
            <li>
              <Button type="planePrimary" link href={Routes.AddBook}>
                <Typography as="p" variant="p" className="font-bold">
                  Add book
                </Typography>
              </Button>
            </li>
          </>
        )}
      </ul>
      <ul className="flex flex-row gap-2">
        {isAuthenticated ? (
          <>
            <li>
              <Button type="outlinedSecondary" link href={Routes.Profile}>
                <Typography as="p" variant="p" className="font-bold">
                  Welcome, {user?.name}
                </Typography>
              </Button>
            </li>

            <li>
              <Button type="secondary">
                <Typography as="p" variant="p" className="font-bold">
                  <Logout />
                </Typography>
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button type="outlinedSecondary" link href={Routes.Registration}>
                <Typography as="p" variant="p" className="font-bold">
                  Sign up
                </Typography>
              </Button>
            </li>
            <li>
              <Button type="secondary" link href={Routes.Login}>
                <Typography as="p" variant="p" className="font-bold">
                  Sign in
                </Typography>
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
