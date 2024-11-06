import { BookData } from "../../types/dataTypes";
import { formatDateString, trimString } from "../../util/util";
import Typography from "../Typography";
import BookCategory from "./BookCategory";
import bookIcon from "../../assets/icons/book-512x512.png";
import { useState } from "react";
import { toggleBookTradability } from "../../data/apiService";
import ToggleButton from "../Buttons/ToggleButton";
import AddedOn from "./BookAddedOn";
import Button from "../Buttons/Button";
import Condition from "./BookCondition";

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
  return (
    <div className="flex flex-row gap-8 w-full h-[300px] p-2">
      <img
        src={bookData.cover_url || bookIcon}
        alt={`${bookData.title} cover`}
        className="object-contain rounded-3xl h-full"
      />
      <div className="w-full h-full flex flex-row justify-between gap-8">
        <div className="flex flex-col gap-2 h-full">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 flex-wrap">
              {bookData.categories?.map((category, index) => (
                <>
                  <BookCategory key={index} category={category} />
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between gap-8  h-full">
            <div className="flex flex-col gap-2">
              <Typography as="h3" variant="h3">
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
        <div className="flex flex-col gap-2">
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
  );
};
export default MediumBook;
