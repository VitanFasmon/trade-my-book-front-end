import { useState } from "react";
import { getGoogleBooksByQuery } from "../../data/googleBooksApiService";
import { GoogleBook } from "../../types/dataTypes";
import SmallBook from "../book/SmallBook";

const SearchGoogleBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<GoogleBook[] | null>(null);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    getGoogleBooksByQuery(searchQuery, 30).then((books) => {
      setBooks(books);
    });
  };

  return (
    <section className="flex flex-col gap-2 p-2 max-w-[800px]">
      <input
        type="search"
        value={searchQuery}
        onChange={handleSearch}
        className="border border-primary p-2 rounded-md w-full"
      />
      <ul>
        {searchQuery !== "" &&
          books?.map((book) => (
            <li key={book.id} className="my-2">
              <SmallBook
                title={book.volumeInfo?.title}
                description={book.volumeInfo?.description}
                thumbnail={book.volumeInfo?.imageLinks?.thumbnail}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};
export default SearchGoogleBooks;
