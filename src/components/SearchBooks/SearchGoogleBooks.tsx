import { useState, useEffect, useCallback, useRef } from "react";
import { getGoogleBooksByQuery } from "../../data/googleBooksApiService";
import { GoogleBook } from "../../types/dataTypes";
import SmallBook from "../Book/SmallGoogleBook";
import LoadingSpinner from "../LoadingSpinner";
import Button from "../Buttons/Button";
import Typography from "../Typography";

interface SearchGoogleBooksProps {
  onSelectBookClick: (book: GoogleBook) => void;
}

const SearchGoogleBooks = ({ onSelectBookClick }: SearchGoogleBooksProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<GoogleBook[]>([]);

  const listRef = useRef<HTMLUListElement>(null);

  const handleSearch = async (isLoadMore = false) => {
    setLoading(true);
    setError(null);

    try {
      const results = await getGoogleBooksByQuery(title, author, limit, offset);
      setBooks((prevBooks) =>
        isLoadMore ? [...prevBooks, ...results] : results
      );
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
    setBooks([]);
    setOffset(0);
  };

  const handleScroll = useCallback(() => {
    const listElement = listRef.current;

    if (listElement) {
      const bottom =
        listElement.scrollHeight - listElement.scrollTop <=
        listElement.clientHeight + 10;

      if (bottom && !loading) {
        setOffset((prevOffset) => prevOffset + limit);
      }
    }
  }, [loading, limit]);

  useEffect(() => {
    if (offset > 0) {
      handleSearch(true);
    }
  }, [offset]);

  useEffect(() => {
    if (title || author) {
      handleSearch();
    }
  }, [title, author, limit]);

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      resetSearch();
    }
  };

  return (
    <section className="flex flex-col gap-2 p-4 max-w-[800px] md:w-[800px] bg-lightGray">
      <div className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-1/3 border-2 bg-lightGray border-secondary rounded-lg p-2 text-primary font-bold placeholder:text-gray placeholder:font-bold"
          onKeyUp={handleKeyPress}
        />
        <input
          type="text"
          placeholder="Book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 bg-lightGray border-secondary rounded-lg p-2 w-full text-primary font-bold placeholder:text-gray placeholder:font-bold"
          onKeyUp={handleKeyPress}
        />
        <Button
          type="primary"
          className="w-1/3"
          onClick={() => {
            handleSearch();
          }}
        >
          Search
        </Button>
      </div>
      {loading && <LoadingSpinner />}
      {error && (
        <Typography as="p" variant="p" className="text-red-500">
          {error}
        </Typography>
      )}
      {books?.length > 0 && (
        <ul
          ref={listRef}
          className="flex flex-col gap-2 px-2 h-[500px] overflow-auto"
        >
          {books.map((book) => (
            <li key={book.id} className="">
              <SmallBook
                title={book.volumeInfo?.title}
                authors={book.volumeInfo?.authors?.join(", ")}
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
      )}
    </section>
  );
};

export default SearchGoogleBooks;
