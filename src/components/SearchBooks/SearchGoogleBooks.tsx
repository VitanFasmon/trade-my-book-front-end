import { useState } from "react";
import { getGoogleBooksByQuery } from "../../data/googleBooksApiService";
import { GoogleBook } from "../../types/dataTypes";
import SmallBook from "../book/SmallGoogleBook";
interface SearchGoogleBooksProps {
  onSelectBookClick: (book: GoogleBook) => void;
}
const SearchGoogleBooks = ({ onSelectBookClick }: SearchGoogleBooksProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<GoogleBook[] | null>(null);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    getGoogleBooksByQuery(searchQuery, 30).then((books) => {
      setBooks(books);
    });
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setSearchQuery("");
    }
  };
  return (
    <section className="flex flex-col gap-2 p-2 max-w-[800px] md:w-[800px]">
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        className="border border-primary p-2 rounded-md w-full"
        onKeyUp={handleKeyPress}
      />
      <ul className="flex flex-col gap-2 px-2">
        {searchQuery !== "" &&
          books?.map((book) => (
            <li key={crypto.randomUUID()} className="">
              <SmallBook
                title={book.volumeInfo?.title}
                publishedDate={book.volumeInfo?.publishedDate}
                thumbnail={book.volumeInfo?.imageLinks?.thumbnail}
                onClick={() => {
                  onSelectBookClick(book);
                  setSearchQuery("");
                }}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};
export default SearchGoogleBooks;
