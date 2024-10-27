type UserData = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  locationId: number;
};

type LoginData = {
  email: string;
  password: string;
};

type BookData = {
  title: string;
  author: string;
  description: string;
  isbn: string;
  google_books_id: string;
  cover_url: string;
  book_condition: number;
};

type ApiResponse<T = any> = {
  message?: string;
  token?: string;
  data?: T;
};
export type { UserData, LoginData, BookData, ApiResponse };
