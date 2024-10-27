import { ApiResponse, BookData, LoginData, UserData } from "../types/dataTypes";

// Set API URL and token
const API_URL = "http://localhost:3000/api";
let token: string | null = null;

// Helper function for making POST requests
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

// Helper function for making GET requests
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

// API: Register a new user
async function registerUser(userData: UserData): Promise<ApiResponse> {
  const url = `${API_URL}/register`;
  return postRequest(url, userData);
}

// API: Log in an existing user
async function loginUser(userData: LoginData): Promise<ApiResponse> {
  const url = `${API_URL}/login`;
  const result = await postRequest(url, userData);
  if (result.token) {
    token = result.token; // Store JWT token on successful login
    localStorage.setItem("token", token);
  }
  return result;
}

// API: Add a new book
async function addBook(bookData: BookData): Promise<ApiResponse> {
  const url = `${API_URL}/books`;
  return postRequest(url, bookData, true); // Requires authentication
}

// API: Get books by location ID
async function getBooksByLocation(
  location_id: number
): Promise<ApiResponse<BookData[]>> {
  const url = `${API_URL}/books/location/${location_id}`;
  return getRequest(url, true); // Requires authentication
}

export { registerUser, loginUser, addBook, getBooksByLocation };
