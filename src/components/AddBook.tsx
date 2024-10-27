import { addBook } from "../data/apiService";

const AddBook = () => {
  const onAddBookClick = () => {
    const newBook = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A novel set in the 1920s.",
      isbn: "9780743273565",
      google_books_id: "xyz123",
      cover_url: "http://example.com/path/to/cover.jpg",
      book_condition: 8,
    };

    addBook(newBook)
      .then((res) => console.log("Book added:", res))
      .catch((err) => console.error("Adding book failed:", err));
  };

  return (
    <section>
      <button onClick={onAddBookClick}>Add Book</button>
    </section>
  );
};

export default AddBook;
