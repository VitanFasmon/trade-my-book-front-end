import { create } from "zustand";
import { PublicUserData, UserStore } from "../types/dataTypes";
import { jwtDecode, JwtPayload } from "jwt-decode";

function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  const { exp } = jwtDecode<JwtPayload>(token);
  if (!exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return exp < currentTime;
}

const useAuthStore = create<UserStore>((set) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const initialUser = storedUser
    ? (JSON.parse(storedUser) as PublicUserData)
    : null;
  const isAuthenticated =
    !!initialUser && !!storedToken && !isTokenExpired(storedToken);

  return {
    user: initialUser,
    token: storedToken,
    isAuthenticated: isAuthenticated,
    updateUserData: (userData: PublicUserData) => {
      localStorage.setItem("user", JSON.stringify(userData));
      set({ user: userData });
    },
    login: (userData: PublicUserData, token: string) => {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      set({ user: userData, token, isAuthenticated: !isTokenExpired(token) });
    },
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null, isAuthenticated: false });
    },
  };
});
export default useAuthStore;
