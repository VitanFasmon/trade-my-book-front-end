import { useState } from "react";
import Button from "../buttons/Button";
import Typography from "../Typography";

interface AddBookFormProps {
  onAddBook: (book: any) => void;
}

const AddBookForm = ({ onAddBook }: AddBookFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    author: "",
    language: "",
    published_date: "",
    categories: "",
    description: "",
    isbn: "",
    book_condition: 5,
    tradable: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, book_condition: Number(e.target.value) });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, tradable: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      alert("Title and Author are required!");
      return;
    }
    onAddBook(formData);
    setFormData({
      title: "",
      subtitle: "",
      author: "",
      language: "",
      published_date: "",
      categories: "",
      description: "",
      isbn: "",
      book_condition: 5,
      tradable: true,
    });
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="Title (required)"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="subtitle"
        placeholder="Subtitle"
        value={formData.subtitle}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="author"
        placeholder="Author (required)"
        value={formData.author}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="language"
        placeholder="Language"
        value={formData.language}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="date"
        name="published_date"
        placeholder="Published Date"
        value={formData.published_date}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="categories"
        placeholder="Categories (comma separated)"
        value={formData.categories}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="isbn"
        placeholder="ISBN"
        value={formData.isbn}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <div className="flex flex-col items-center gap-2">
        <input
          type="range"
          name="book_condition"
          min="1"
          max="10"
          value={formData.book_condition}
          onChange={handleRangeChange}
          className="w-full accent-secondary"
        />
        <Typography as="p" variant="p">
          Book condition:{" "}
          <Typography as="span" variant="p" className="font-bold">
            {formData.book_condition}
          </Typography>
          /10
        </Typography>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="tradable">Tradable</label>
        <input
          type="checkbox"
          id="tradable"
          name="tradable"
          checked={formData.tradable}
          onChange={handleCheckboxChange}
        />
      </div>
      <Button type="primary">Add Book</Button>
    </form>
  );
};

export default AddBookForm;
