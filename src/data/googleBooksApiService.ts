const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = "AIzaSyAz2ZZrl9tFP_0VaBrNXYVSmzyl2fB68UM";

const getGoogleBooksByQuery = async (query: string, limit: number = 10) => {
  const params = new URLSearchParams({
    q: query.trim(),
    maxResults: limit.toString(),
    key: API_KEY,
  });

  try {
    const response = await fetch(`${BOOKS_API_URL}?${params}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export { getGoogleBooksByQuery };
