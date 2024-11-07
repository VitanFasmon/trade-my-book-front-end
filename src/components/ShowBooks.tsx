import { useEffect, useState } from "react";
import MediumBook from "./Book/MediumBook";
import Separator from "./Separator";
import Sort from "./Sort";
import { BookData } from "../types/dataTypes";
import { getLocationById, searchBooks } from "../data/apiService";
import SearchBooksAdvance from "./SearchBooks/SearchBooksAdvance";
import RoundedContainer from "./RoundedContainer";
import useAuthStore from "../store/useAuthStore";
import useLocationStore from "../store/useLocationStore";
import ConditionSlider from "./ConditionSlider";
import MaxDistanceInput from "./MaxDistanceInput";
import Typography from "./Typography";
import { useNavigate } from "react-router";
import { Routes } from "../navigation/routes";

const ShowBooks = () => {
  const [books, setBooks] = useState<BookData[] | null>(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchConditionMin, setSearchConditionMin] = useState(1);
  const [searchConditionMax, setSearchConditionMax] = useState(10);
  const [radiusKm, setRadiusKm] = useState(100);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [sortOption, setSortOption] = useState("date_added");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filteredBooks, setFilteredBooks] = useState<BookData[] | null>(null);
  const { user } = useAuthStore();
  const { locationData, setLocationData } = useLocationStore();
  const navigate = useNavigate();
  const getUserLocationByLocationId = async () => {
    if (!user?.location_id) {
      getBooks();
      return;
    }
    try {
      const response = await getLocationById(user?.location_id);
      if (response.data) {
        setLocationData({
          address: response.data?.address,
          lat: response.data?.latitude,
          lng: response.data?.longitude,
        });
        getBooks(response.data?.latitude, response.data?.longitude);
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      getBooks();
    }
  };

  const getBooks = async (lat?: number, lng?: number) => {
    try {
      const response = await searchBooks({
        title: searchTitle,
        author: searchAuthor,
        conditionMin: searchConditionMin,
        conditionMax: searchConditionMax,
        lat: lat,
        lon: lng,
        radiusKm: radiusKm,
        limit: limit,
        offset: offset,
        sortField: sortOption,
        sortOrder: sortDirection.toUpperCase() as "ASC" | "DESC",
      });
      if (response && response.data) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    locationData
      ? getBooks(locationData.lat, locationData.lng)
      : getUserLocationByLocationId();
  }, [
    searchTitle,
    searchAuthor,
    searchConditionMin,
    searchConditionMax,
    radiusKm,
    limit,
    offset,
    sortOption,
    sortDirection,
  ]);

  useEffect(() => {
    if (books) {
      setFilteredBooks([...books]);
    }
  }, [books]);

  const onTradeBookButtonClick = (bookData: BookData) => {
    navigate(Routes.TradeBook, { state: { requestedBook: bookData } });
  };
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-8 px-8 w-full items-center py-8">
        <div className="flex flex-row gap-2 items-start w-full max-w-[1200px] justify-center  bg-lightGray">
          <SearchBooksAdvance
            searchTitle={searchTitle}
            searchAuthor={searchAuthor}
            setSearchTitle={setSearchTitle}
            setSearchAuthor={setSearchAuthor}
          />
        </div>
        <div className="flex flex-row gap-2 w-full justify-between items-start">
          <div className="w-fit"></div>
          <div className="flex flex-col gap-8 max-w-[1200px]">
            {filteredBooks?.map((book, index) => (
              <>
                <MediumBook
                  bookData={book}
                  key={crypto.randomUUID()}
                  goodToTrade={user ? true : false}
                  sendBookDataToParent={onTradeBookButtonClick}
                />
                {index < filteredBooks.length - 1 && <Separator />}
              </>
            ))}
          </div>
          <div className="flex flex-col gap-4 w-fit min-w-64 items-center justify-center">
            <Typography as="p" variant="p" className="font-bold w-full">
              Sort
            </Typography>
            <Sort
              sortOption={sortOption}
              setSortOption={setSortOption}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              className="w-full"
            />
            <ConditionSlider
              searchConditionMin={searchConditionMin}
              searchConditionMax={searchConditionMax}
              setSearchConditionMin={setSearchConditionMin}
              setSearchConditionMax={setSearchConditionMax}
            />
            {user && (
              <MaxDistanceInput radiusKm={radiusKm} setRadiusKm={setRadiusKm} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowBooks;
