import { useEffect, useState } from "react";
import { deleteBookByBookId, getBooksByUserId } from "../data/apiService";
import { BookData } from "../types/dataTypes";
import MediumBook from "../components/Book/MediumBook";
import Separator from "../components/Separator";
import Sort from "../components/Sort";
import SearchBooks from "../components/SearchBooks/SearchBooks";

const MyBooks = () => {
  const [books, setBooks] = useState<BookData[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date_added");
  const [sortDirection, setSortDirection] = useState<"desc" | "asc">("asc");
  const [filteredBooks, setFilteredBooks] = useState<BookData[] | null>(null);

  const getBooks = () => {
    getBooksByUserId().then((response) => {
      response.data && setBooks(response.data);
    });
  };

  useEffect(() => {
    if (books) {
      let updatedBooks = [...books];

      if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        updatedBooks = updatedBooks.filter((book) =>
          `${book.title} ${book.author} ${book.categories.join(" ")}`
            .toLowerCase()
            .includes(lowercasedTerm)
        );
      }

      updatedBooks.sort((a, b) => {
        if (sortDirection === "desc") {
          const c = a;
          a = b;
          b = c;
        }
        switch (sortOption) {
          case "date_added":
            if (!a.date_added || !b.date_added) return 0;
            return b.date_added.localeCompare(a.date_added);

          case "title":
            return a.title.localeCompare(b.title);
          case "author":
            return a.author.localeCompare(b.author);
          case "published_date":
            return (
              new Date(a.published_date).getTime() -
              new Date(b.published_date).getTime()
            );
          case "condition":
            return b.book_condition - a.book_condition;
          default:
            return 0;
        }
      });

      setFilteredBooks(updatedBooks);
    }
  }, [books, searchTerm, sortOption, sortDirection]);

  useEffect(() => {
    getBooks();
  }, []);

  const onDeleteBookButtonClick = (book_id: number | undefined) => {
    book_id &&
      deleteBookByBookId(book_id).then(() => {
        getBooks();
      });
  };

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
              <MediumBook
                key={crypto.randomUUID()}
                bookData={book}
                onDeleteBookButtonClick={onDeleteBookButtonClick}
              />
              {index < filteredBooks.length - 1 && <Separator />}
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyBooks;
