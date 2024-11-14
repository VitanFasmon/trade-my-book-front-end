type UserData = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  location_id: number | null;
};

type PublicUserData = {
  user_id: number;
  name: string;
  email: string;
  phone_number?: string;
  location_id: number;
  is_active: boolean;
};

type UserStore = {
  token: string | null;
  user: PublicUserData | null;
  isAuthenticated: boolean;
  updateUserData: (userData: PublicUserData) => void;
  login: (userData: PublicUserData, token: string) => void;
  logout: () => void;
};

type LoginData = {
  email: string;
  password: string;
};

type BookData = {
  book_id?: number;
  added_by_user_id?: number;
  date_added?: string;
  title: string;
  subtitle: string;
  author: string;
  language: string;
  published_date: string;
  categories: string[];
  description: string;
  isbn: string;
  google_books_id: string;
  cover_url: string;
  book_condition: number;
  tradable: boolean;
};

type GoogleBook = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
      acsTokenLink: string;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
};

type ApiResponse<T = any> = {
  message?: string;
  token?: string;
  data?: T;
};
type EmailConfirmationResponse = {
  message?: string;
};

type LocationData = {
  address: string;
  lat: number;
  lng: number;
};
type LocationResponse = {
  location_id: number;
  address: string;
  latitude: number;
  longitude: number;
};

type LocationStore = {
  locationData: LocationData | null;
  setLocationData: (locationData: LocationData | null) => void;
};
type TradeRequestData = {
  offered_book_id: number;
  requested_book_id: number;
};

type TradeData = {
  trade_id: number;
  offered_book_id: number;
  requested_book_id: number;
  status: "pending" | "accepted" | "rejected" | "canceled";
  trade_date: string;
  user_from: number;
  user_to: number;
};
type CommentData = {
  comment_id: number;
  trade_id: number;
  user_id: number;
  content: string;
  date_posted: string;
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
  LocationStore,
  GoogleBook,
  TradeRequestData,
  TradeData,
  EmailConfirmationResponse,
  CommentData,
};
