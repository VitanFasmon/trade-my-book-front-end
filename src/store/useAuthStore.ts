import { create } from "zustand";
import { PublicUserData, UserStore } from "../types/dataTypes";

const useAuthStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData: PublicUserData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
