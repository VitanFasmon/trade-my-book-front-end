import { useEffect, useState } from "react";
import MediumBook from "./book/MediumBook";
import Separator from "./Separator";
import Sort from "./Sort";
import { BookData } from "../types/dataTypes";
import { getLocationById, searchBooks } from "../data/apiService";
import SearchBooksAdvance from "./searchBooks/SearchBooksAdvance";
import useAuthStore from "../store/useAuthStore";
import useLocationStore from "../store/useLocationStore";
import ConditionSlider from "./ConditionSlider";
import MaxDistanceInput from "./MaxDistanceInput";
import Typography from "./Typography";
import { useNavigate } from "react-router";
import { Routes } from "../navigation/routes";
import LoadingSpinner from "./LoadingSpinner";
import shapeImage from "../assets/images/shape2.svg";

const ShowBooks = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchConditionMin, setSearchConditionMin] = useState(1);
  const [searchConditionMax, setSearchConditionMax] = useState(10);
  const [radiusKm, setRadiusKm] = useState(100);
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [sortOption, setSortOption] = useState("date_added");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
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
          address: JSON.parse(response.data?.address),
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
    if (loading || !hasMore) return;

    setLoading(true);
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
      if (response) {
        const newBooks = response.data || [];
        setBooks((prevBooks) =>
          offset === 0 ? newBooks : [...prevBooks, ...newBooks]
        );
        setHasMore(newBooks.length >= limit);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreBooks = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        loadMoreBooks();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  useEffect(() => {
    setOffset(0);
    setBooks([]);
    locationData
      ? getBooks(locationData.lat, locationData.lng)
      : getUserLocationByLocationId();
  }, [
    searchTitle,
    searchAuthor,
    searchConditionMin,
    searchConditionMax,
    radiusKm,
    sortOption,
    sortDirection,
  ]);

  useEffect(() => {
    if (offset > 0) {
      locationData
        ? getBooks(locationData.lat, locationData.lng)
        : getUserLocationByLocationId();
    }
  }, [offset]);

  const onTradeBookButtonClick = (bookData: BookData) => {
    navigate(Routes.TradeBook, { state: { requestedBook: bookData } });
  };

  return (
    <section
      className="w-full flex justify-center bg-lightGray min-h-screen"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      <div className="flex flex-col gap-8 px-8 w-full items-center py-8 ">
        <Typography as="h1" variant="h2">
          Search for the book you need
        </Typography>
        <div className="flex flex-row gap-2 items-start w-full max-w-[1200px] justify-center bg-lightGray ">
          <SearchBooksAdvance
            searchTitle={searchTitle}
            searchAuthor={searchAuthor}
            setSearchTitle={setSearchTitle}
            setSearchAuthor={setSearchAuthor}
            onKeyUp={() => setHasMore(true)}
          />
        </div>
        <div className="flex lg:flex-row flex-col-reverse gap-2 w-full justify-between md:items-start items-center ">
          <div className="flex-1"></div>
          <div className="flex flex-col gap-8 max-w-[1200px] w-full flex-2 bg-lightGray p-2 rounded-xl  shadow-2xl border-2 border-lightGray">
            {books.length > 0 ? (
              books.map((book, index) => (
                <div key={book.book_id}>
                  <MediumBook
                    bookData={book}
                    goodToTrade={!!user}
                    showLocation
                    sendBookDataToParent={onTradeBookButtonClick}
                  />
                  {index < books.length - 1 && <Separator />}
                </div>
              ))
            ) : (
              <div className=" text-center ">
                <Typography as="p" variant="h3">
                  There are no books to show
                </Typography>
                <Typography as="p" variant="p">
                  Consider changing your max distance or other criteria.
                </Typography>
              </div>
            )}
          </div>
          <div className="flex-1 flex lg:flex-col md:flex-row flex-col gap-4 w-fit min-w-64 lg:items-center md:items-start items-center justify-center ">
            <Typography as="h3" variant="h3" className="font-bold w-full">
              Sort
            </Typography>
            <Sort
              sortOption={sortOption}
              setSortOption={setSortOption}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              className="w-full"
              onChange={() => setHasMore(true)}
            />
            {user && (
              <MaxDistanceInput
                radiusKm={radiusKm}
                setRadiusKm={setRadiusKm}
                onChange={() => setHasMore(true)}
              />
            )}
            <ConditionSlider
              searchConditionMin={searchConditionMin}
              searchConditionMax={searchConditionMax}
              setSearchConditionMin={setSearchConditionMin}
              setSearchConditionMax={setSearchConditionMax}
              onChange={() => setHasMore(true)}
            />
          </div>
        </div>
        {loading && <LoadingSpinner />}
      </div>
    </section>
  );
};

export default ShowBooks;
