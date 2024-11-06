import { useState } from "react";
import { addBook } from "../data/apiService";
import { GoogleBook } from "../types/dataTypes";
import SearchGoogleBooks from "../components/SearchBooks/SearchGoogleBooks";
import Typography from "../components/Typography";
import bookIcon from "../assets/icons/book-512x512.png";
import BookCategory from "../components/Book/BookCategory";
import ToggleButton from "../components/Buttons/ToggleButton";
import Button from "../components/Buttons/Button";

interface Message {
  message: string;
  type: "success" | "error";
}

const AddBook = () => {
  const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null);
  const [message, setMessage] = useState<Message | null>(null);
  const [bookCondition, setBookCondition] = useState(5);
  const [tradable, setTradable] = useState<boolean>(true);
  const stringArrayToString = (array: string[]) => {
    if (!array) return "";
    return array.join(", ");
  };
  const onAddBookClick = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedBook) return;
    const newBook = {
      title: selectedBook.volumeInfo?.title,
      subtitle: selectedBook.volumeInfo?.subtitle,
      author: stringArrayToString(selectedBook.volumeInfo?.authors),
      language: selectedBook.volumeInfo?.language,
      published_date: selectedBook.volumeInfo?.publishedDate,
      categories: selectedBook.volumeInfo?.categories,
      description: selectedBook.volumeInfo?.description,
      isbn: selectedBook.volumeInfo?.industryIdentifiers?.[0]?.identifier,
      google_books_id: selectedBook.id,
      cover_url: selectedBook.volumeInfo?.imageLinks?.thumbnail,
      book_condition: bookCondition,
      tradable: tradable,
    };

    addBook(newBook)
      .then((res) => {
        setSelectedBook(null);
        setMessage({ message: "Book added successfully!", type: "success" });
      })
      .catch((err) => {
        setMessage({ message: `Adding book failed: ${err}`, type: "error" });
      });
  };
  const onSelectBookClick = (book: GoogleBook) => {
    setSelectedBook(book);
    setMessage(null);
  };
  return (
    <section className="flex flex-col items-center w-full h-full py-8">
      <section className="flex flex-col gap-2 p-2 items-center  max-w-[800px]">
        <Typography as="h1" variant="h2">
          Search for a book you want to add
        </Typography>
        <SearchGoogleBooks onSelectBookClick={onSelectBookClick} />
        {selectedBook && (
          <form className="flex flex-col gap-2">
            <div className="flex flex-row gap-8 w-full">
              <div className="flex flex-col gap-2 justify-between">
                <img
                  src={
                    selectedBook.volumeInfo?.imageLinks?.thumbnail || bookIcon
                  }
                  alt={`${selectedBook.volumeInfo?.title} cover`}
                  className="w-64 rounded-xl  object-contain"
                />
                <div>
                  <div className="flex flex-col gap-2 items-center">
                    <input
                      type="range"
                      id="condition"
                      name="condition"
                      min="1"
                      max="10"
                      className="w-64 accent-secondary"
                      value={bookCondition}
                      onChange={(e) => setBookCondition(Number(e.target.value))}
                    />
                    <label htmlFor="condition">
                      <Typography as="p" variant="p">
                        Book condition (
                        <Typography as="span" variant="p" className="font-bold">
                          {bookCondition}
                        </Typography>
                        /10)
                      </Typography>
                    </label>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <ToggleButton
                      textTrue="Tradable"
                      textFalse="Not tradable"
                      checked={tradable}
                      setChecked={setTradable}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  {selectedBook.volumeInfo?.categories?.map(
                    (category, index) => (
                      <BookCategory key={index} category={category} />
                    )
                  )}
                  <Typography
                    as="p"
                    variant="p"
                    className="p-2 bg-gray rounded w-fit font-bold"
                    key={crypto.randomUUID()}
                  >
                    {selectedBook.volumeInfo?.language}
                  </Typography>
                </div>
                <Typography as="h2" variant="h2">
                  {`${selectedBook.volumeInfo?.title} ${
                    selectedBook.volumeInfo?.publishedDate
                      ? `(${selectedBook.volumeInfo?.publishedDate})`
                      : ""
                  }`}
                </Typography>
                <Typography as="h4" variant="h4">
                  {selectedBook.volumeInfo?.subtitle}
                </Typography>
                <Typography as="h3" variant="h3">
                  {stringArrayToString(selectedBook.volumeInfo?.authors)}
                </Typography>
                <Typography as="p" variant="p" className="h-64 overflow-auto	">
                  {selectedBook.volumeInfo?.description ||
                    "No description available"}
                </Typography>
                <Button
                  type="secondary"
                  link
                  href={selectedBook.volumeInfo?.infoLink}
                  target="_blank"
                >
                  More info about the book...
                </Button>
              </div>
            </div>
            <Button type="primary" onClick={onAddBookClick}>
              Add Book
            </Button>
          </form>
        )}
        {message && (
          <Typography
            as="p"
            variant="h4"
            className={`${
              message.type === "success" ? `text-green-500` : `text-red-500`
            }  font-bold`}
          >
            {message.message}
          </Typography>
        )}
      </section>
    </section>
  );
};

export default AddBook;
