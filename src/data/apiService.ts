import useAuthStore from "../store/useAuthStore";
import {
  ApiResponse,
  BookData,
  LocationData,
  LocationResponse,
  LoginData,
  PublicUserData,
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
      // Throw an error if status is not OK to handle in catch block
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

const registerUser = async (userData: UserData): Promise<ApiResponse> => {
  const url = `${API_URL}/register`;
  return postRequest(url, userData);
};

const loginUser = async (userData: LoginData): Promise<ApiResponse> => {
  const url = `${API_URL}/login`;
  const result = await postRequest(url, userData);
  if (result.token) {
    useAuthStore.setState({ token: result.token });
    localStorage.setItem("token", result.token);
  }
  return result;
};

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

const addLocation = async (
  locationData: LocationData
): Promise<ApiResponse<LocationResponse>> => {
  const url = `${API_URL}/location`;
  return postRequest(url, locationData, true);
};

export {
  registerUser,
  loginUser,
  addBook,
  getBooksByLocation,
  getBooksByUserId,
  fetchUserData,
  fetchUserDataByEmail,
  addLocation,
};
