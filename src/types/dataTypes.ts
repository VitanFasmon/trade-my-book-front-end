type UserData = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  location_id: number;
};

type LoginData = {
  email: string;
  password: string;
};

type BookData = {
  user_id: number;
  google_books_api_id: string;
  condition: number;
  picture: string;
  trade_status: "available" | "pending" | "traded";
};

type ApiResponse<T = any> = {
  message?: string;
  token?: string;
  data?: T;
};
export type { UserData, LoginData, BookData, ApiResponse };
