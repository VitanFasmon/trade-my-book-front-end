import useAuthStore from "../store/useAuthStore";
import Button from "./buttons/Button";
import Typography from "./Typography";

const Logout: React.FC = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button type="secondary" onClick={handleLogout}>
      <Typography as="p" variant="p" className="font-bold">
        Logout
      </Typography>
    </Button>
  );
};

export default Logout;
