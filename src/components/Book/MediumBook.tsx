import { BookData, LocationData, PublicUserData } from "../../types/dataTypes";
import { formatAddress, formatDateString, trimString } from "../../util/util";
import Typography from "../Typography";
import BookCategory from "./BookCategory";
import bookIcon from "../../assets/icons/book-512x512.png";
import { useEffect, useState } from "react";
import {
  fetchUserDataById,
  getLocationById,
  toggleBookTradability,
} from "../../data/apiService";
import ToggleButton from "../Buttons/ToggleButton";
import AddedOn from "./BookAddedOn";
import Button from "../Buttons/Button";
import Condition from "./BookCondition";
import { Routes } from "../../navigation/routes";
import ConfirmationModal from "../ConfirmationModal";

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
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
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
      goodToTrade &&
        !ownedByUser &&
        fetchLocationData(response?.data.location_id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchLocationData = async (locationId: number) => {
    try {
      const response = await getLocationById(locationId);
      if (!response?.data) return;
      setUserLocation({
        address: JSON.parse(response.data.address),
        lat: response.data.latitude,
        lng: response.data.longitude,
      });
    } catch (error) {
      console.error("Error fetching user location:", error);
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
      <div className="flex flex-row items-center justify-between gap-2 w-full">
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
        {userLocation && (
          <Typography
            as="p"
            variant="p"
            className="font-bold"
          >{`${userLocation.address.locality}, ${userLocation.address.country}`}</Typography>
        )}
      </div>
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
                  <Button type={"danger"} onClick={() => setModalOpen(true)}>
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
export default MediumBook;
