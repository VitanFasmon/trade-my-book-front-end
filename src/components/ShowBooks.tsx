import { useEffect, useState } from "react";
import MediumBook from "./Book/MediumBook";
import SearchBooks from "./SearchBooks/SearchBooks";
import Separator from "./Separator";
import Sort from "./Sort";
import { BookData } from "../types/dataTypes";
import { searchBooks } from "../data/apiService";

const ShowBooks = () => {
  const [books, setBooks] = useState<BookData[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date_added");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filteredBooks, setFilteredBooks] = useState<BookData[] | null>(null);

  // Fetch books based on search and sort options
  const getBooks = async () => {
    try {
      // Use searchBooks API with search and sorting parameters
      const response = await searchBooks({
        title: searchTerm,
        sortField: sortOption,
        sortOrder: sortDirection.toUpperCase() as "ASC" | "DESC",
      });
      if (response && response.data) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, [searchTerm, sortOption, sortDirection]);

  useEffect(() => {
    if (books) {
      setFilteredBooks([...books]); // Initialize filtered books
    }
  }, [books]);

  return (
    <section className="w-full flex justify-center py-8">
      <div className="flex flex-col gap-8 p-2 max-w-[1200px] items-center">
        <div className="flex flex-row gap-2 items-center w-full">
          <SearchBooks searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Sort
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        </div>

        <div className="flex flex-col gap-8">
          {filteredBooks?.map((book, index) => (
            <>
              <MediumBook key={crypto.randomUUID()} bookData={book} />
              {index < filteredBooks.length - 1 && <Separator />}
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowBooks;
