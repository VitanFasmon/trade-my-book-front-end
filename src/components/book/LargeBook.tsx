import { BookData, PublicUserData } from "../../types/dataTypes";
import { formatDateString, trimString } from "../../util/util";
import Typography from "../Typography";
import BookCategory from "./BookCategory";
import bookIcon from "../../assets/icons/book-512x512.png";
import { useEffect, useState } from "react";
import {
  fetchUserDataById,
  toggleBookTradability,
  updateBook,
} from "../../data/apiService";
import ToggleButton from "../buttons/ToggleButton";
import AddedOn from "./BookAddedOn";
import Button from "../buttons/Button";
import BookCondition from "./BookCondition";
import { Routes } from "../../navigation/routes";
import useAuthStore from "../../store/useAuthStore";
import ConfirmationModal from "../ConfirmationModal";
import { useErrorToast, useSuccessToast } from "../Toast";
import ImageUpload from "../imageUpload/ImageUpload";

interface LargeBookProps {
  bookData: BookData;
  onDeleteBookButtonClick?: (book_id: number | undefined) => void;
  sendBookDataToParent?: (book: BookData) => void;
}
const LargeBook = ({
  bookData,
  onDeleteBookButtonClick,
  sendBookDataToParent,
}: LargeBookProps) => {
  const [tradable, setTradable] = useState<boolean>(bookData.tradable || false);
  const [book, setBook] = useState<BookData>(bookData);
  const [addedBy, setAddedBy] = useState<PublicUserData | null>(null);
  const [ownedByUser, setOwnedByUser] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const { user } = useAuthStore();
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();

  const onToggleTradabilityClick = async () => {
    if (!book.book_id) return;
    try {
      const response = await toggleBookTradability(book.book_id, !tradable);
      setTradable(response.data.tradable);
    } catch (error) {
      console.error("Error toggling tradability:", error);
    }
  };
  const onConfirmUpdateBookClick = async () => {
    try {
      const response = await updateBook(book);
      if (!response.data) return;
      setBook(response.data);
      showSuccessToast("Book updated successfully.");
    } catch (error) {
      console.error("Error updating book:", error);
      showErrorToast("Error! Unable to update book.");
    }
    setToggleEdit(false);
  };
  const onTradeBookButtonClick = () => {
    sendBookDataToParent && sendBookDataToParent(book);
  };

  const handleImageUpload = (imageUrl: string) => {
    if (!book) return;
    setBook({ ...book, cover_url: imageUrl });
  };
  const fetchUserData = async () => {
    if (user?.user_id === book.added_by_user_id) {
      setOwnedByUser(true);
      setAddedBy(user);
      return;
    }
    try {
      const response = book.added_by_user_id
        ? await fetchUserDataById(book.added_by_user_id)
        : null;
      if (!response?.data) return;
      setAddedBy(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleConfirm = () => {
    onDeleteBookButtonClick && onDeleteBookButtonClick(book.book_id);
    setModalOpen(false);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!book) return;
    const { name, value } = e.target;
    if (name === "categories") setBook({ ...book, [name]: value.split(",") });
    else setBook({ ...book, [name]: value });
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [book]);
  return (
    <div className="flex flex-col gap-2 w-full items-start p-2 ">
      {addedBy && (
        <Button
          link
          type="planePrimary"
          href={`${Routes.User}/${book.added_by_user_id}`}
          className="px-0 py-0"
        >
          {`Added by: ${addedBy.name}`}
        </Button>
      )}
      <div className="flex md:flex-row flex-col gap-8 w-full h-full items-center md:items-stretch">
        <div className="rounded-3xl md:w-fit md:h-48 w-60">
          <img
            src={book.cover_url || bookIcon}
            alt={`${book.title} cover`}
            className="object-contain rounded-3xl h-full w-full"
          />
          {toggleEdit && (
            <div className="flex flex-col gap-2 items-center justify-center">
              <Typography as="p" variant="p">
                Change image
              </Typography>
              <ImageUpload onUpload={handleImageUpload} />
            </div>
          )}
        </div>

        <div className="w-full h-full flex md:flex-row flex-col justify-between items-center md:items-start gap-8">
          <div className="flex flex-col gap-2 h-full w-full">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2 flex-wrap">
                {book.categories?.map((category, index) => (
                  <BookCategory key={crypto.randomUUID()} category={category} />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between gap-8 h-full w-full">
              <div className="flex flex-col gap-2 h-full w-full items-stretch">
                {!toggleEdit ? (
                  <>
                    <Typography as="h3" variant="h3" className="w-full">
                      {`${book.title} ${
                        book.published_date
                          ? `(${formatDateString(book.published_date)})`
                          : ""
                      }`}
                    </Typography>
                    <Typography as="h4" variant="h4">
                      {book.subtitle}
                    </Typography>
                    <Typography as="p" variant="p" className="text-darkGray">
                      {`${book.author} - ${book.language}`}
                    </Typography>
                    <Typography as="p" variant="p" className="text-darkGray">
                      {book.description}
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
                        defaultValue={book.published_date}
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
                        defaultValue={book.categories}
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
                        defaultValue={book.title || ""}
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
                        defaultValue={book.subtitle || ""}
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
                        defaultValue={book.author || ""}
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
                        defaultValue={book.language || ""}
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
                        defaultValue={book.description || ""}
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
                        defaultValue={book.isbn}
                        onChange={handleChange}
                        className="border p-2 rounded"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex md:flex-col flex-row gap-2 flex-wrap justify-center">
            {book.date_added && <AddedOn date={new Date(book.date_added)} />}
            <BookCondition condition={book.book_condition} />
            {ownedByUser && (
              <>
                <ToggleButton
                  textTrue="Tradable"
                  textFalse="Tradable"
                  checked={tradable}
                  setChecked={onToggleTradabilityClick}
                />
                {!toggleEdit ? (
                  <Button
                    type={"outlinedPrimary"}
                    onClick={() => setToggleEdit(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button type={"primary"} onClick={onConfirmUpdateBookClick}>
                      Confirm
                    </Button>
                    <Button
                      type={"secondary"}
                      onClick={() => setToggleEdit(false)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {onDeleteBookButtonClick && (
                  <Button type={"danger"} onClick={() => setModalOpen(true)}>
                    Remove
                  </Button>
                )}
              </>
            )}
            {!ownedByUser && tradable && (
              <Button type={"primary"} onClick={onTradeBookButtonClick}>
                Trade
              </Button>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Delete Item?"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
};
export default LargeBook;
