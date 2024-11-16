import { BookData, PublicUserData } from "../../types/dataTypes";
import { formatDateString, trimString } from "../../util/util";
import Typography from "../Typography";
import BookCategory from "./BookCategory";
import bookIcon from "../../assets/icons/book-512x512.png";
import { useEffect, useState } from "react";
import {
  fetchUserDataById,
  toggleBookTradability,
} from "../../data/apiService";
import ToggleButton from "../Buttons/ToggleButton";
import AddedOn from "./BookAddedOn";
import Button from "../Buttons/Button";
import Condition from "./BookCondition";
import { Routes } from "../../navigation/routes";
import useAuthStore from "../../store/useAuthStore";
import ConfirmationModal from "../ConfirmationModal";

interface LargeBookProps {
  bookData: BookData;
  onDeleteBookButtonClick?: (book_id: number | undefined) => void;
  sendBookDataToParent?: (bookData: BookData) => void;
}
const LargeBook = ({
  bookData,
  onDeleteBookButtonClick,
  sendBookDataToParent,
}: LargeBookProps) => {
  const [tradable, setTradable] = useState<boolean>(bookData.tradable || false);
  const [addedBy, setAddedBy] = useState<PublicUserData | null>(null);
  const [ownedByUser, setOwnedByUser] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { user } = useAuthStore();

  const onToggleTradabilityClick = async () => {
    if (!bookData.book_id) return;
    try {
      const response = await toggleBookTradability(bookData.book_id, !tradable);
      setTradable(response.data.tradable);
    } catch (error) {
      console.error("Error toggling tradability:", error);
    }
  };

  const onTradeBookButtonClick = () => {
    sendBookDataToParent && sendBookDataToParent(bookData);
  };
  const fetchUserData = async () => {
    if (user?.user_id === bookData.added_by_user_id) {
      setOwnedByUser(true);
      setAddedBy(user);
      return;
    }
    try {
      const response = bookData.added_by_user_id
        ? await fetchUserDataById(bookData.added_by_user_id)
        : null;
      if (!response?.data) return;
      setAddedBy(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleConfirm = () => {
    onDeleteBookButtonClick && onDeleteBookButtonClick(bookData.book_id);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="flex flex-col gap-2 w-full items-start p-2">
      {addedBy && (
        <Button
          link
          type="planePrimary"
          href={`${Routes.User}/${bookData.added_by_user_id}`}
          className="px-0 py-0"
        >
          {`Added by: ${addedBy.name}`}
        </Button>
      )}
      <div className="flex md:flex-row flex-col gap-8 w-full h-fit items-center md:items-stretch">
        <div className="rounded-3xl md:w-fit md:h-48 w-60">
          <img
            src={bookData.cover_url || bookIcon}
            alt={`${bookData.title} cover`}
            className="object-contain rounded-3xl h-full w-full"
          />
        </div>
        <div className="w-full h-full flex md:flex-row flex-col justify-between items-center md:items-start gap-8">
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2 flex-wrap">
                {bookData.categories?.map((category, index) => (
                  <BookCategory key={crypto.randomUUID()} category={category} />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between gap-8  h-full">
              <div className="flex flex-col gap-2">
                <Typography as="h3" variant="h3" className="w-full">
                  {`${bookData.title} ${
                    bookData.published_date
                      ? `(${formatDateString(bookData.published_date)})`
                      : ""
                  }`}
                </Typography>
                <Typography as="h4" variant="h4">
                  {bookData.subtitle}
                </Typography>
                <Typography as="p" variant="p" className="text-darkGray">
                  {`${bookData.author} - ${bookData.language}`}
                </Typography>
                <Typography as="p" variant="p" className="text-darkGray">
                  {bookData.description}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col flex-row gap-2 flex-wrap justify-center">
            {bookData.date_added && (
              <AddedOn date={new Date(bookData.date_added)} />
            )}
            <Condition condition={bookData.book_condition} />
            {ownedByUser && (
              <>
                <ToggleButton
                  textTrue="Tradable"
                  textFalse="Tradable"
                  checked={tradable}
                  setChecked={onToggleTradabilityClick}
                />
                <Button type={"primary"} onClick={() => {}}>
                  Edit
                </Button>
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
