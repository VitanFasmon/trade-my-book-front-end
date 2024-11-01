import { useEffect, useState } from "react";
import { deleteBookByBookId, getBooksByUserId } from "../data/apiService";
import { BookData } from "../types/dataTypes";
import MediumBook from "./book/MediumBook";

const MyBooks = () => {
  const [books, setBooks] = useState<BookData[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title");
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
        switch (sortOption) {
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
  }, [books, searchTerm, sortOption]);

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
    <section className="flex flex-col gap-2 p-2 max-w-[1200px] items-center">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books by title, author, or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="mr-2">Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="published_date">Published Date</option>
          <option value="condition">Condition</option>
        </select>
      </div>

      <div className="flex flex-col gap-8">
        {filteredBooks?.map((book) => (
          <MediumBook
            key={crypto.randomUUID()}
            bookData={book}
            onDeleteBookButtonClick={onDeleteBookButtonClick}
          />
        ))}
      </div>
    </section>
  );
};

export default MyBooks;
