import useAuthStore from "../store/useAuthStore";
import {
  ApiResponse,
  AverageRatingResponse,
  BookData,
  CommentData,
  EmailConfirmationResponse,
  LocationData,
  LocationResponse,
  LoginData,
  PublicUserData,
  RatingData,
  TradeData,
  TradeRequestData,
  UserData,
} from "../types/dataTypes";

const API_URL = "http://localhost:3000/api";

const postRequest = async <T>(
  url: string,
  data: any,
  auth = false
): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (auth) {
      const token =
        useAuthStore.getState().token || localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse: ApiResponse<T> = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

const getRequest = async <T>(
  url: string,
  auth = false
): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {};
    if (auth) {
      const token =
        useAuthStore.getState().token || localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorResponse: ApiResponse<T> = await response.json();
      throw new Error(errorResponse.message || "Something went wrong");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};
const deleteRequest = async <T>(
  url: string,
  auth = false
): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {};
    if (auth) {
      const token =
        useAuthStore.getState().token || localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const errorResponse: ApiResponse<T> = await response.json();
      throw new Error(errorResponse.message || "Failed to delete item");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};
const patchRequest = async <T>(
  url: string,
  data: any,
  auth = false
): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (auth) {
      const token =
        useAuthStore.getState().token || localStorage.getItem("token");
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse: ApiResponse<T> = await response.json();
      throw new Error(errorResponse.message || "Failed to update item");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

const registerUser = async (userData: UserData): Promise<ApiResponse> => {
  const url = `${API_URL}/register`;
  return postRequest(url, userData);
};

//USER REQUESTS
const loginUser = async (userData: LoginData): Promise<ApiResponse> => {
  const url = `${API_URL}/login`;
  const result = await postRequest(url, userData);
  if (result.token) {
    useAuthStore.setState({ token: result.token });
    localStorage.setItem("token", result.token);
  }
  return result;
};

const fetchUserData = async (): Promise<ApiResponse<PublicUserData>> => {
  const url = `${API_URL}/user`;
  return getRequest(url, true);
};

const fetchUserDataByEmail = async (
  email: string
): Promise<ApiResponse<PublicUserData>> => {
  const url = `${API_URL}/user/email/${email}`;
  return getRequest(url, true);
};
const fetchUserDataById = async (
  id: number
): Promise<ApiResponse<PublicUserData>> => {
  const url = `${API_URL}/user/id/${id}`;
  return getRequest(url, true);
};
const updateUserLocation = async (
  locationId: number
): Promise<ApiResponse<PublicUserData>> => {
  const url = `${API_URL}/user/location`;
  return patchRequest(url, { location_id: locationId }, true);
};
const updateUserName = async (
  name: string
): Promise<ApiResponse<PublicUserData>> => {
  const url = `${API_URL}/user/name`;
  return patchRequest(url, { name: name }, true);
};
const updateUserPhoneNumber = async (
  phoneNumber: string
): Promise<ApiResponse<PublicUserData>> => {
  const url = `${API_URL}/user/phone`;
  return patchRequest(url, { phone_number: phoneNumber }, true);
};
const confirmEmail = async (
  token: string
): Promise<ApiResponse<EmailConfirmationResponse>> => {
  const url = `${API_URL}/confirm/${token}`;
  return getRequest(url, false);
};
const resendEmail = async (data: {
  email: string;
}): Promise<ApiResponse<EmailConfirmationResponse>> => {
  const url = `${API_URL}/resend-email`;
  return postRequest(url, data, false);
};
const getAcceptedTradesIdsByUserId = async (
  id: number
): Promise<ApiResponse<number[]>> => {
  const url = `${API_URL}/user/trades/accepted/${id}`;
  return getRequest(url, true);
};
//BOOK REQUESTS
const addBook = async (bookData: BookData): Promise<ApiResponse> => {
  const url = `${API_URL}/books`;
  return postRequest(url, bookData, true);
};

const getBooksByLocation = async (
  location_id: number
): Promise<ApiResponse<BookData[]>> => {
  const url = `${API_URL}/books/location/${location_id}`;
  return getRequest(url, true);
};

const getBooksByUserId = async (): Promise<ApiResponse<BookData[]>> => {
  const url = `${API_URL}/books/user`;
  return getRequest(url, true);
};
const deleteBookByBookId = async (bookId: number): Promise<ApiResponse> => {
  const url = `${API_URL}/books/${bookId}`;
  return deleteRequest(url, true);
};
const toggleBookTradability = async (
  bookId: number,
  tradable: boolean
): Promise<ApiResponse> => {
  const url = `${API_URL}/books/tradable/${bookId}/${tradable}`;
  return patchRequest(url, {}, true);
};
const searchBooks = async (
  searchParams: {
    [key: string]: string | number | undefined;
    title?: string;
    author?: string;
    conditionMin?: number;
    conditionMax?: number;
    lat?: number;
    lon?: number;
    radiusKm?: number;
    sortField?: string;
    sortOrder?: "ASC" | "DESC";
    limit?: number;
    offset?: number;
  } = {}
): Promise<ApiResponse<BookData[]>> => {
  const url = new URL(`${API_URL}/books/search`);

  Object.keys(searchParams).forEach((key) => {
    if (searchParams[key] !== undefined) {
      url.searchParams.append(key, String(searchParams[key]));
    }
  });
  return getRequest(url.toString(), true);
};
const findBookById = async (bookId: number): Promise<ApiResponse<BookData>> => {
  const url = `${API_URL}/books/${bookId}`;
  return getRequest(url, true);
};
//LOCATION REQUESTS
const addLocation = async (
  locationData: LocationData
): Promise<ApiResponse<LocationResponse>> => {
  const url = `${API_URL}/location`;
  return postRequest(url, locationData, true);
};
const getLocationById = async (
  location_id: number
): Promise<ApiResponse<LocationResponse>> => {
  const url = `${API_URL}/location/${location_id}`;
  return getRequest(url, true);
};
// TRADE REQUESTS
const initiateTrade = async (
  tradeData: TradeRequestData
): Promise<ApiResponse<TradeData>> => {
  const url = `${API_URL}/trades`;
  return postRequest(url, tradeData, true);
};

const getTradesByUser = async (): Promise<ApiResponse<TradeData[]>> => {
  const url = `${API_URL}/trades/user`;
  return getRequest(url, true);
};

const getTradeById = async (
  tradeId: number
): Promise<ApiResponse<TradeData>> => {
  const url = `${API_URL}/trade/${tradeId}`;
  return getRequest(url, true);
};

const acceptTrade = async (
  tradeId: number
): Promise<ApiResponse<TradeData>> => {
  const url = `${API_URL}/trades/${tradeId}/status`;
  return patchRequest(url, { status: "accepted" }, true);
};

const rejectTrade = async (
  tradeId: number
): Promise<ApiResponse<TradeData>> => {
  const url = `${API_URL}/trades/${tradeId}/status`;
  return patchRequest(url, { status: "rejected" }, true);
};

const cancelTrade = async (
  tradeId: number
): Promise<ApiResponse<TradeData>> => {
  const url = `${API_URL}/trades/${tradeId}/status`;
  return patchRequest(url, { status: "canceled" }, true);
};
//COMMENTS REQUESTS
const getCommentsByTradeId = async (
  trade_id: number
): Promise<ApiResponse<CommentData[]>> => {
  const url = `${API_URL}/comments/${trade_id}`;
  return getRequest(url, true);
};
const getCommentById = async (
  comment_id: number
): Promise<ApiResponse<CommentData>> => {
  const url = `${API_URL}/comment/${comment_id}`;
  return getRequest(url, true);
};
const addComment = async (
  tradeId: number,
  content: string
): Promise<ApiResponse<CommentData>> => {
  const url = ` ${API_URL}/comments`;
  const data = { trade_id: tradeId, content };
  return postRequest(url, data, true);
};
//RATING REQUESTS
const createRating = async (
  ratingData: RatingData
): Promise<ApiResponse<RatingData>> => {
  const url = `${API_URL}/ratings`;
  return postRequest(url, ratingData, true);
};
const updateRating = async (
  ratingData: RatingData
): Promise<ApiResponse<RatingData>> => {
  const url = `${API_URL}/ratings`;
  return patchRequest(url, ratingData, true);
};

const getRatingsByUserId = async (
  userId: number
): Promise<ApiResponse<RatingData[]>> => {
  const url = `${API_URL}/ratings/user/${userId}`;
  return getRequest(url, true);
};

const getRatingsByTradeId = async (
  tradeId: number
): Promise<ApiResponse<RatingData[]>> => {
  const url = `${API_URL}/ratings/trade/${tradeId}`;
  return getRequest(url, true);
};

const getAverageRatingByUserId = async (
  userId: number
): Promise<ApiResponse<AverageRatingResponse>> => {
  const url = `${API_URL}/ratings/user/${userId}/average`;
  return getRequest(url, true);
};
export {
  registerUser,
  loginUser,
  addBook,
  getBooksByLocation,
  getBooksByUserId,
  fetchUserData,
  fetchUserDataByEmail,
  fetchUserDataById,
  addLocation,
  deleteBookByBookId,
  toggleBookTradability,
  searchBooks,
  updateUserLocation,
  getLocationById,
  updateUserName,
  updateUserPhoneNumber,
  initiateTrade,
  getTradesByUser,
  getTradeById,
  acceptTrade,
  rejectTrade,
  cancelTrade,
  findBookById,
  confirmEmail,
  resendEmail,
  getCommentsByTradeId,
  getCommentById,
  addComment,
  getAcceptedTradesIdsByUserId,
  createRating,
  getRatingsByUserId,
  getRatingsByTradeId,
  getAverageRatingByUserId,
  updateRating,
};
