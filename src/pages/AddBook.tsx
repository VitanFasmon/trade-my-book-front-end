import { useState } from "react";
import { addBook } from "../data/apiService";
import { BookData, GoogleBook } from "../types/dataTypes";
import SearchGoogleBooks from "../components/searchBooks/SearchGoogleBooks";
import Typography from "../components/Typography";
import bookIcon from "../assets/icons/book-512x512.png";
import BookCategory from "../components/book/BookCategory";
import ToggleButton from "../components/buttons/ToggleButton";
import Button from "../components/buttons/Button";
import { useErrorToast, useSuccessToast } from "../components/Toast";
import shapeImage from "../assets/images/shape2.svg";
import AddBookForm from "../components/addBookForm/AddBookForm";
import BookConditionInput from "../components/book/BookConditionInput";
import ImageUpload from "../components/imageUpload/ImageUpload";

const AddBook = () => {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [infoLink, setInfoLink] = useState<string>("");
  const [bookCondition, setBookCondition] = useState(5);
  const [tradable, setTradable] = useState<boolean>(true);
  const [addManually, setAddManually] = useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const stringArrayToString = (array: string[]) => {
    if (!array) return "";
    return array.join(", ");
  };
  const onAddBookClick = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedBook) return;
    try {
      const response = await addBook(selectedBook);
      if (!response) return;
      setSelectedBook(null);
      showSuccessToast("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      showErrorToast("Adding book failed!");
    }
  };

  const onAddManualBook = async (book: any) => {
    try {
      const response = await addBook(book);
      if (!response) return;
      setSelectedBook(null);
      showSuccessToast("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      showErrorToast("Adding book failed!");
    }
  };
  const handleImageUpload = (imageUrl: string) => {
    if (!selectedBook) return;
    setSelectedBook({ ...selectedBook, cover_url: imageUrl });
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!selectedBook) return;
    const { name, value } = e.target;
    if (name === "categories")
      setSelectedBook({ ...selectedBook, [name]: value.split(",") });
    else setSelectedBook({ ...selectedBook, [name]: value });
  };

  const onSelectBookClick = (book: GoogleBook) => {
    setAddManually(false);
    setInfoLink(book.volumeInfo?.infoLink);
    setSelectedBook({
      title: book.volumeInfo?.title,
      subtitle: book.volumeInfo?.subtitle,
      author: stringArrayToString(book.volumeInfo?.authors),
      language: book.volumeInfo?.language,
      published_date: book.volumeInfo?.publishedDate,
      categories: book.volumeInfo?.categories,
      description: book.volumeInfo?.description,
      isbn: book.volumeInfo?.industryIdentifiers?.[0]?.identifier,
      google_books_id: book.id,
      cover_url: book.volumeInfo?.imageLinks?.thumbnail,
      book_condition: bookCondition,
      tradable: tradable,
    });
  };
  return (
    <section
      className="flex flex-col items-center w-full min-h-full py-8"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      <div className="flex flex-col gap-8 p-8 items-center mb-8 max-w-[800px] bg-white rounded-xl shadow-2xl border-2 border-lightGray">
        <Typography as="h1" variant="h2">
          Search for a book you want to add
        </Typography>
        <SearchGoogleBooks onSelectBookClick={onSelectBookClick} />
        {selectedBook && !addManually && (
          <form className="flex flex-col gap-2 pb-8 w-full">
            <div className="flex md:flex-row flex-col gap-8 w-full">
              <div className="flex flex-col gap-2 justify-between">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={selectedBook.cover_url || bookIcon}
                    alt={`${selectedBook.title} cover`}
                    className="w-64 rounded-xl  object-contain"
                  />
                  <Typography as="p" variant="p">
                    Change image
                  </Typography>
                  <ImageUpload onUpload={handleImageUpload} />
                </div>
                <div>
                  <BookConditionInput
                    bookCondition={bookCondition}
                    setBookCondition={setBookCondition}
                  />

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
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-2 h-full w-full items-stretch">
                  <Button
                    type={"outlinedPrimary"}
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      setToggleEdit(!toggleEdit);
                    }}
                  >
                    {toggleEdit ? "Finish editing" : "Edit"}
                  </Button>
                  {!toggleEdit ? (
                    <>
                      <div className="flex flex-row gap-2">
                        {selectedBook.categories?.map((category, index) => (
                          <BookCategory key={index} category={category} />
                        ))}
                        <Typography
                          as="p"
                          variant="p"
                          className="p-2 bg-gray rounded w-fit font-bold"
                          key={crypto.randomUUID()}
                        >
                          {selectedBook.language}
                        </Typography>
                      </div>
                      <Typography as="h3" variant="h3" className="w-full">
                        {`${selectedBook.title} ${
                          selectedBook.published_date
                            ? `(${selectedBook.published_date})`
                            : ""
                        }`}
                      </Typography>
                      <Typography as="h4" variant="h4">
                        {selectedBook.subtitle}
                      </Typography>
                      <Typography as="p" variant="h3" className="">
                        {selectedBook.author}
                      </Typography>
                      <Typography
                        as="p"
                        variant="p"
                        className="max-h-64 h-full overflow-auto"
                      >
                        {selectedBook.description}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="title">
                          <Typography as="p" variant="p" className="font-bold">
                            Published date*
                          </Typography>
                        </label>
                        <input
                          type="date"
                          name="published_date"
                          required
                          placeholder="Published Date"
                          defaultValue={selectedBook.published_date}
                          onChange={handleChange}
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="title">
                          <Typography as="p" variant="p" className="font-bold">
                            Categories
                          </Typography>
                        </label>
                        <input
                          type="text"
                          name="categories"
                          placeholder="Categories (comma separated)"
                          defaultValue={selectedBook.categories}
                          onChange={handleChange}
                          className="border p-2 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="title">
                          <Typography as="p" variant="p" className="font-bold">
                            Title*
                          </Typography>
                        </label>
                        <input
                          type="text"
                          name="title"
                          defaultValue={selectedBook.title || ""}
                          className="border p-2 rounded w-full"
                          placeholder="Book Title"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="title">
                          <Typography as="p" variant="p" className="font-bold">
                            Subtitle
                          </Typography>
                        </label>
                        <input
                          type="text"
                          name="subtitle"
                          defaultValue={selectedBook.subtitle || ""}
                          className="border p-2 rounded w-full"
                          placeholder="Subtitle"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="title">
                          <Typography as="p" variant="p" className="font-bold">
                            Author*
                          </Typography>
                        </label>
                        <input
                          type="text"
                          name="author"
                          defaultValue={selectedBook.author || ""}
                          className="border p-2 rounded w-full"
                          placeholder="Author"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="title">
                          <Typography as="p" variant="p" className="font-bold">
                            Language
                          </Typography>
                        </label>
                        <input
                          type="text"
                          name="language"
                          defaultValue={selectedBook.language || ""}
                          className="border p-2 rounded w-full"
                          placeholder="Language"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="title">
                          <Typography as="p" variant="p" className="font-bold">
                            Description
                          </Typography>
                        </label>
                        <textarea
                          defaultValue={selectedBook.description || ""}
                          name="description"
                          className="border p-2 rounded w-full h-full"
                          placeholder="Description"
                          rows={10}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="title">
                          <Typography as="p" variant="p" className="font-bold">
                            ISBN
                          </Typography>
                        </label>
                        <input
                          type="text"
                          name="isbn"
                          placeholder="ISBN"
                          defaultValue={selectedBook.isbn}
                          onChange={handleChange}
                          className="border p-2 rounded"
                        />
                      </div>
                    </>
                  )}
                </div>

                <Button type="secondary" link href={infoLink} target="_blank">
                  More info about the book...
                </Button>
              </div>
            </div>
            <Button type="primary" onClick={onAddBookClick}>
              Add Book
            </Button>
          </form>
        )}
        <Button
          type="outlinedPrimary"
          onClick={() => setAddManually(!addManually)}
          className="w-full"
        >
          <Typography as="h2" variant="h2">
            Or add book manually
          </Typography>
        </Button>
        {addManually && <AddBookForm onAddBook={onAddManualBook} />}
      </div>
    </section>
  );
};

export default AddBook;
