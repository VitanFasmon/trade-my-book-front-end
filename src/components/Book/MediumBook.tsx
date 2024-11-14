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

interface MediumBookProps {
  bookData: BookData;
  ownedByUser?: boolean;
  goodToTrade?: boolean;
  onDeleteBookButtonClick?: (book_id: number | undefined) => void;
  sendBookDataToParent?: (bookData: BookData) => void;
}
const MediumBook = ({
  bookData,
  ownedByUser,
  goodToTrade,
  onDeleteBookButtonClick,
  sendBookDataToParent,
}: MediumBookProps) => {
  const [tradable, setTradable] = useState<boolean>(bookData.tradable || false);
  const [addedBy, setAddedBy] = useState<PublicUserData | null>(null);
  const onToggleTradabilityClick = () => {
    bookData.book_id &&
      toggleBookTradability(bookData.book_id, !tradable)
        .then((response) => {
          setTradable(response.data.tradable);
        })
        .catch((error) => console.error("Error toggling tradability:", error));
  };
  const onTradeBookButtonClick = () => {
    sendBookDataToParent && sendBookDataToParent(bookData);
  };
  const fetchUserData = async () => {
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
        <Button
          link
          href={`${Routes.Book}/${bookData.book_id}`}
          type="planePrimary"
          className="px-0 py-0 rounded-3xl md:w-fit md:h-48 w-60"
        >
          <img
            src={bookData.cover_url || bookIcon}
            alt={`${bookData.title} cover`}
            className="object-contain rounded-3xl h-full w-full"
          />
        </Button>
        <div className="w-full h-full flex md:flex-row flex-col justify-between items-center md:items-start gap-8">
          <Button
            link
            href={`${Routes.Book}/${bookData.book_id}`}
            type="planePrimary"
            className="px-0 py-0"
          >
            <div className="flex flex-col gap-2 h-full">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 flex-wrap">
                  {bookData.categories?.map((category, index) => (
                    <BookCategory
                      key={crypto.randomUUID()}
                      category={category}
                    />
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
                    {trimString(bookData.description)}
                  </Typography>
                </div>
              </div>
            </div>
          </Button>
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
                  <Button
                    type={"danger"}
                    onClick={() => onDeleteBookButtonClick(bookData.book_id)}
                  >
                    Remove
                  </Button>
                )}
              </>
            )}
            {goodToTrade && (
              <Button type={"primary"} onClick={onTradeBookButtonClick}>
                Trade
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MediumBook;
