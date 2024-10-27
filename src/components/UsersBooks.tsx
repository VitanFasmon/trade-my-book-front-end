import { useState } from "react";
import { getBooksByUserId } from "../data/apiService";
import { BookData } from "../types/dataTypes";

const UsersBooks = () => {
  const [books, setBooks] = useState<BookData[] | undefined>([]);

  async function fetchUserBooks() {
    try {
      const response = await getBooksByUserId();
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  return (
    <section>
      <button onClick={fetchUserBooks}>Fetch User's Books</button>
      <h2>Books</h2>
      {books ? (
        books.map((book) => (
          <div key={book.book_id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <img src={book.cover_url} alt={`${book.title} cover`} />{" "}
            {/* Display cover image */}
          </div>
        ))
      ) : (
        <p>No books found.</p>
      )}
    </section>
  );
};

export default UsersBooks;
