import { useState } from "react";
import Button from "../buttons/Button";
import Typography from "../Typography";
import { BookData } from "../../types/dataTypes";
import ImageUpload from "../imageUpload/ImageUpload";
import ToggleButton from "../buttons/ToggleButton";
import BookConditionInput from "../book/BookConditionInput";

interface AddBookFormProps {
  onAddBook: (book: BookData) => void;
}

const AddBookForm = ({ onAddBook }: AddBookFormProps) => {
  const [selectedBook, setSelectedBook] = useState<BookData>({
    title: "",
    subtitle: "",
    author: "",
    language: "",
    published_date: "",
    categories: [],
    description: "",
    isbn: "",
    book_condition: 5,
    tradable: true,
    cover_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!selectedBook) return;
    const { name, value } = e.target;
    if (name === "categories")
      setSelectedBook({ ...selectedBook, [name]: value.split(",") });
    else setSelectedBook({ ...selectedBook, [name]: value });
  };

  const handleBookConditionChange = (bookCondition: number) => {
    setSelectedBook({ ...selectedBook, book_condition: Number(bookCondition) });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setSelectedBook({ ...selectedBook, tradable: checked });
  };
  const handleImageUpload = (imageUrl: string) => {
    setSelectedBook({ ...selectedBook, cover_url: imageUrl });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedBook.title ||
      !selectedBook.author ||
      !selectedBook.published_date
    ) {
      alert("Title, Author and Published date are required!");
      return;
    }
    onAddBook(selectedBook);
    setSelectedBook({
      title: "",
      subtitle: "",
      author: "",
      language: "",
      published_date: "",
      categories: [],
      description: "",
      isbn: "",
      book_condition: 5,
      tradable: true,
      cover_url: "",
    });
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md "
      onSubmit={handleSubmit}
    >
      <Typography as="h3" variant="h3">
        Book Details
      </Typography>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">
          <Typography as="p" variant="p" className="font-bold">
            Title*
          </Typography>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title (required)"
          required
          value={selectedBook.title}
          onChange={handleChange}
          className="border p-2 rounded"
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
          placeholder="Subtitle"
          value={selectedBook.subtitle}
          onChange={handleChange}
          className="border p-2 rounded"
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
          required
          placeholder="Author (required)"
          value={selectedBook.author}
          onChange={handleChange}
          className="border p-2 rounded"
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
          placeholder="Language"
          value={selectedBook.language}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
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
          value={selectedBook.published_date}
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
          value={selectedBook.categories}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">
          <Typography as="p" variant="p" className="font-bold">
            Description
          </Typography>
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={selectedBook.description}
          onChange={handleChange}
          className="border p-2 rounded"
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
          value={selectedBook.isbn}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-row justify-between items-center p-2">
        <BookConditionInput
          bookCondition={selectedBook.book_condition}
          setBookCondition={handleBookConditionChange}
        />
        <ToggleButton
          textTrue="Tradable"
          textFalse="Not tradable"
          checked={selectedBook.tradable}
          setChecked={handleCheckboxChange}
        />
      </div>
      <ImageUpload onUpload={handleImageUpload} />
      {selectedBook.cover_url && (
        <img
          src={selectedBook.cover_url}
          alt="Uploaded Cover"
          className="w-32 h-32 object-cover rounded"
        />
      )}
      <Button type="primary">Add Book</Button>
    </form>
  );
};

export default AddBookForm;
