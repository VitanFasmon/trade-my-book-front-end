import { useState, useEffect } from "react";
import { getGoogleBooksByQuery } from "../../data/googleBooksApiService";
import { GoogleBook } from "../../types/dataTypes";
import SmallBook from "../Book/SmallGoogleBook";

interface SearchGoogleBooksProps {
  onSelectBookClick: (book: GoogleBook) => void;
}

const SearchGoogleBooks = ({ onSelectBookClick }: SearchGoogleBooksProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<GoogleBook[] | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await getGoogleBooksByQuery(title, author, isbn, limit);
      setBooks(results);
    } catch (err) {
      setError("An error occurred while fetching books.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const resetSearch = () => {
    setTitle("");
    setAuthor("");
    setIsbn("");
    setBooks(null);
  };
  useEffect(() => {
    // Debounce effect to prevent search on every keystroke
    const delayDebounce = setTimeout(() => {
      if (title || author || isbn) {
        handleSearch();
      } else {
        setBooks(null); // Clear results if all fields are empty
      }
    }, 500);

    return () => clearTimeout(delayDebounce); // Clean up debounce
  }, [title, author, isbn, limit]); // Trigger search when these fields change

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setTitle("");
      setAuthor("");
      setIsbn("");
      setBooks(null);
    }
  };

  return (
    <section className="flex flex-col gap-2 p-2 max-w-[800px] md:w-[800px]">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded-md"
        onKeyUp={handleKeyPress}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border p-2 rounded-md"
        onKeyUp={handleKeyPress}
      />
      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        className="border p-2 rounded-md"
        onKeyUp={handleKeyPress}
      />
      <input
        type="number"
        placeholder="Limit"
        value={limit}
        onChange={(e) => setLimit(parseInt(e.target.value, 10))}
        className="border p-2 rounded-md"
        onKeyUp={handleKeyPress}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="flex flex-col gap-2 px-2">
        {books?.map((book) => (
          <li key={crypto.randomUUID()} className="">
            <SmallBook
              title={book.volumeInfo?.title}
              publishedDate={book.volumeInfo?.publishedDate}
              thumbnail={book.volumeInfo?.imageLinks?.thumbnail}
              onClick={() => {
                onSelectBookClick(book);
                resetSearch();
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchGoogleBooks;
