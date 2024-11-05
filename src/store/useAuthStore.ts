// src/store/authStore.ts
import { create } from "zustand";
import { PublicUserData, UserStore } from "../types/dataTypes";

const useAuthStore = create<UserStore>((set) => {
  // Initialize user and token from localStorage
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const initialUser = storedUser
    ? (JSON.parse(storedUser) as PublicUserData)
    : null;
  const isAuthenticated = !!initialUser && !!storedToken;

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
      set({ user: userData, token, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null, isAuthenticated: false });
    },
  };
});

export default useAuthStore;
