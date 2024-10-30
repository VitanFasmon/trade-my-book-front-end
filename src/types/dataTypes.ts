type UserData = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  location_id: number | null;
};

type PublicUserData = {
  name: string;
  email: string;
  phone_number?: string;
  location_id: number;
};

type UserStore = {
  token: string | null;
  user: PublicUserData | null;
  isAuthenticated: boolean;
  login: (userData: PublicUserData, token: string) => void;
  logout: () => void;
};

type LoginData = {
  email: string;
  password: string;
};

type BookData = {
  added_by_user?: string;
  author: string;
  book_condition: number;
  book_id?: number;
  title: string;
  description: string;
  isbn: string;
  google_books_id: string;
  cover_url: string;
};

type ApiResponse<T = any> = {
  message?: string;
  token?: string;
  data?: T;
};

type LocationData = {
  address: string;
  lat: number;
  lon: number;
};
type LocationResponse = {
  location_id: number;
};

export type {
  UserData,
  LoginData,
  BookData,
  ApiResponse,
  PublicUserData,
  UserStore,
  LocationData,
  LocationResponse,
};
