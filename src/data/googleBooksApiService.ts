const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = "AIzaSyAz2ZZrl9tFP_0VaBrNXYVSmzyl2fB68UM";

const getGoogleBooksByQuery = async (
  intitle?: string,
  inauthor?: string,
  isbn?: string,
  limit: number = 10
) => {
  const params = new URLSearchParams({
    q: `${intitle ? `intitle:${intitle}` : ""} ${
      inauthor ? `inauthor:${inauthor}` : ""
    } ${isbn ? `isbn:${isbn}` : ""}`.trim(),
    maxResults: limit.toString(),
    key: API_KEY,
  });

  try {
    console.log(`${BOOKS_API_URL}?${params}`);
    const response = await fetch(`${BOOKS_API_URL}?${params}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export { getGoogleBooksByQuery };
