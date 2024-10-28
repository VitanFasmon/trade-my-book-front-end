import useAuthStore from "../store/useAuthStore";
import {
  ApiResponse,
  BookData,
  LoginData,
  PublicUserData,
  UserData,
} from "../types/dataTypes";

const API_URL = "http://localhost:3000/api";
//let token: string | null = null;
const token = useAuthStore.getState().token;

async function postRequest<T>(
  url: string,
  data: any,
  auth = false
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (auth && token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
}

async function getRequest<T>(
  url: string,
  auth = false
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {};
    if (auth && token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers });
    const result: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
}

async function registerUser(userData: UserData): Promise<ApiResponse> {
  const url = `${API_URL}/register`;
  return postRequest(url, userData);
}

async function loginUser(userData: LoginData): Promise<ApiResponse> {
  const url = `${API_URL}/login`;
  const result = await postRequest(url, userData);
  if (result.token) {
    //token = result.token;
    localStorage.setItem("token", result.token);
  }
  return result;
}

async function addBook(bookData: BookData): Promise<ApiResponse> {
  const url = `${API_URL}/books`;
  return postRequest(url, bookData, true);
}

async function getBooksByLocation(
  location_id: number
): Promise<ApiResponse<BookData[]>> {
  const url = `${API_URL}/books/location/${location_id}`;
  return getRequest(url, true);
}
async function getBooksByUserId(): Promise<ApiResponse<BookData[]>> {
  const url = `${API_URL}/books/user`;
  return getRequest(url, true);
}

async function fetchUserData(): Promise<ApiResponse<PublicUserData>> {
  const url = `${API_URL}/user`;
  return getRequest(url, true);
}
async function fetchUserDataByEmail(
  email: string
): Promise<ApiResponse<PublicUserData>> {
  const url = `${API_URL}/user/email/${email}`;
  return getRequest(url, true);
}
export {
  registerUser,
  loginUser,
  addBook,
  getBooksByLocation,
  getBooksByUserId,
  fetchUserData,
  fetchUserDataByEmail,
};
