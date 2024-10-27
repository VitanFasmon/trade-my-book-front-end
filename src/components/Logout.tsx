import useAuthStore from "../store/useAuthStore";

const Logout: React.FC = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
