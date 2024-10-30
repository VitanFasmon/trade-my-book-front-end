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
  lng: number;
};
type LocationResponse = {
  location_id: number;
};

type LocationStore = {
  locationData: LocationData | null;
  setLocationData: (locationData: LocationData | null) => void;
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
};
