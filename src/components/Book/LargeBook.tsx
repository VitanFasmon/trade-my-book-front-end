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
import ToggleButton from "../Buttons/ToggleButton";
import AddedOn from "./BookAddedOn";
import Button from "../Buttons/Button";
import Condition from "./BookCondition";
import { Routes } from "../../navigation/routes";
import useAuthStore from "../../store/useAuthStore";
import ConfirmationModal from "../ConfirmationModal";
import { useErrorToast, useSuccessToast } from "../Toast";

interface LargeBookProps {
  bookData: BookData;
  onDeleteBookButtonClick?: (book_id: number | undefined) => void;
  sendBookDataToParent?: (updatedBookData: BookData) => void;
}
const LargeBook = ({
  bookData,
  onDeleteBookButtonClick,
  sendBookDataToParent,
}: LargeBookProps) => {
  const [tradable, setTradable] = useState<boolean>(bookData.tradable || false);
  const [updatedBookData, setUpdatedBookData] = useState<BookData>(bookData);
  const [addedBy, setAddedBy] = useState<PublicUserData | null>(null);
  const [ownedByUser, setOwnedByUser] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const { user } = useAuthStore();
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();

  const onToggleTradabilityClick = async () => {
    if (!updatedBookData.book_id) return;
    try {
      const response = await toggleBookTradability(
        updatedBookData.book_id,
        !tradable
      );
      setTradable(response.data.tradable);
    } catch (error) {
      console.error("Error toggling tradability:", error);
    }
  };
  const onConfirmUpdateBookClick = async () => {
    try {
      const response = await updateBook(updatedBookData);
      if (!response.data) return;
      setUpdatedBookData(response.data);
      showSuccessToast("Book updated successfully.");
    } catch (error) {
      console.error("Error updating book:", error);
      showErrorToast("Error! Unable to update book.");
    }
    setToggleEdit(false);
  };
  const onTradeBookButtonClick = () => {
    sendBookDataToParent && sendBookDataToParent(updatedBookData);
  };
  const fetchUserData = async () => {
    if (user?.user_id === updatedBookData.added_by_user_id) {
      setOwnedByUser(true);
      setAddedBy(user);
      return;
    }
    try {
      const response = updatedBookData.added_by_user_id
        ? await fetchUserDataById(updatedBookData.added_by_user_id)
        : null;
      if (!response?.data) return;
      setAddedBy(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleConfirm = () => {
    onDeleteBookButtonClick && onDeleteBookButtonClick(updatedBookData.book_id);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [updatedBookData]);
  return (
    <div className="flex flex-col gap-2 w-full items-start p-2">
      {addedBy && (
        <Button
          link
          type="planePrimary"
          href={`${Routes.User}/${updatedBookData.added_by_user_id}`}
          className="px-0 py-0"
        >
          {`Added by: ${addedBy.name}`}
        </Button>
      )}
      <div className="flex md:flex-row flex-col gap-8 w-full h-full items-center md:items-stretch">
        <div className="rounded-3xl md:w-fit md:h-48 w-60">
          <img
            src={updatedBookData.cover_url || bookIcon}
            alt={`${updatedBookData.title} cover`}
            className="object-contain rounded-3xl h-full w-full"
          />
        </div>
        <div className="w-full h-full flex md:flex-row flex-col justify-between items-center md:items-start gap-8">
          <div className="flex flex-col gap-2 h-full w-full">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2 flex-wrap">
                {updatedBookData.categories?.map((category, index) => (
                  <BookCategory key={crypto.randomUUID()} category={category} />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between gap-8 h-full w-full">
              <div className="flex flex-col gap-2 h-full w-full items-stretch">
                {!toggleEdit ? (
                  <>
                    <Typography as="h3" variant="h3" className="w-full">
                      {`${updatedBookData.title} ${
                        updatedBookData.published_date
                          ? `(${formatDateString(
                              updatedBookData.published_date
                            )})`
                          : ""
                      }`}
                    </Typography>
                    <Typography as="h4" variant="h4">
                      {updatedBookData.subtitle}
                    </Typography>
                    <Typography as="p" variant="p" className="text-darkGray">
                      {`${updatedBookData.author} - ${updatedBookData.language}`}
                    </Typography>
                    <Typography as="p" variant="p" className="text-darkGray">
                      {updatedBookData.description}
                    </Typography>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={updatedBookData.title || ""}
                      className="border p-2 rounded w-full"
                      placeholder="Book Title"
                      onChange={(e) =>
                        setUpdatedBookData({
                          ...updatedBookData,
                          title: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={updatedBookData.subtitle || ""}
                      className="border p-2 rounded w-full"
                      placeholder="Subtitle"
                      onChange={(e) =>
                        setUpdatedBookData({
                          ...updatedBookData,
                          subtitle: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={updatedBookData.author || ""}
                      className="border p-2 rounded w-full"
                      placeholder="Author"
                      onChange={(e) =>
                        setUpdatedBookData({
                          ...updatedBookData,
                          author: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={updatedBookData.language || ""}
                      className="border p-2 rounded w-full"
                      placeholder="Language"
                      onChange={(e) =>
                        setUpdatedBookData({
                          ...updatedBookData,
                          language: e.target.value,
                        })
                      }
                    />
                    <textarea
                      value={updatedBookData.description || ""}
                      className="border p-2 rounded w-full h-full"
                      placeholder="Description"
                      rows={10}
                      onChange={(e) =>
                        setUpdatedBookData({
                          ...updatedBookData,
                          description: e.target.value,
                        })
                      }
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex md:flex-col flex-row gap-2 flex-wrap justify-center">
            {updatedBookData.date_added && (
              <AddedOn date={new Date(updatedBookData.date_added)} />
            )}
            <Condition condition={updatedBookData.book_condition} />
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
