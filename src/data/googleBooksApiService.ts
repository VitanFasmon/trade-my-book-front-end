const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

const getGoogleBooksByQuery = async (
  intitle?: string,
  inauthor?: string,
  limit: number = 10,
  offset: number = 0
) => {
  const query = [
    intitle ? `intitle:${intitle}` : "",
    inauthor ? `inauthor:${inauthor}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const params = new URLSearchParams({
    q: query,
    maxResults: limit.toString(),
    startIndex: offset.toString(),
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
