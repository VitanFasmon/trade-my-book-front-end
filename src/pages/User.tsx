import { useEffect, useState } from "react";
import shapeImage from "../assets/images/shape2.svg";
import { LocationData, PublicUserData } from "../types/dataTypes";
import {
  fetchUserDataById,
  getAcceptedTradesIdsByUserId,
  getAverageRatingByUserId,
  getLocationById,
} from "../data/apiService";
import { useNavigate, useParams } from "react-router";
import Typography from "../components/Typography";
import { formatDateString, numberRatingToStars } from "../util/util";
import LoadingSpinner from "../components/LoadingSpinner";
import TradingHistoryCompact from "../components/trades/TradingHistoryCompact";
import ShowAvailableUserBooks from "../components/displayBooks/ShowAvailableUserBooks";
import useAuthStore from "../store/useAuthStore";
import { Routes } from "../navigation/routes";
const User = () => {
  const { user } = useAuthStore();
  const userId = Number(useParams().userId) || null;
  const [userData, setUserData] = useState<PublicUserData | null>(null);
  const [acceptedTradeIds, setAcceptedTradeIds] = useState<number[] | null>();
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const navigate = useNavigate();
  if (user?.user_id === userId) {
    navigate(Routes.Profile);
  }
  const fetchUserData = async () => {
    try {
      const response = userId ? await fetchUserDataById(userId) : null;
      if (!response?.data) return;
      setUserData(response.data);
      fetchLocationData(response.data.location_id);
      fetchAcceptedTradeIds();
      fetchRating();
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
  const fetchAcceptedTradeIds = async () => {
    try {
      const response = userId
        ? await getAcceptedTradesIdsByUserId(userId)
        : null;
      response?.data && setAcceptedTradeIds(response.data);
    } catch (error) {
      console.error("Error fetching accepted trades:", error);
    }
  };

  const fetchRating = async () => {
    try {
      const response = userId ? await getAverageRatingByUserId(userId) : null;
      response?.data && setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [userId]);
  return (
    <section
      className="flex flex-col gap-2 items-center min-h-full py-8"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      <div className="flex flex-col gap-8 items-center bg-white p-8 rounded-xl max-w-[800px] w-full min-h-[500px] h-fit shadow-2xl border-2 border-lightGray justify-center">
        {userData ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-xl font-bold text-white">
                {userData.name?.charAt(0) || "U"}
              </div>
              <Typography as="h1" variant="h3" className="text-center">
                {userData.name}
              </Typography>
              <Typography as="p" className="text-sm text-gray-600">
                {userData.email}
              </Typography>
            </div>

            <div className="border-t pt-6 flex flex-col gap-4">
              {userLocation && (
                <div className="flex justify-between">
                  <Typography as="p" className="font-medium ">
                    Location:
                  </Typography>
                  <Typography
                    as="p"
                    variant="p"
                    className="font-bold"
                  >{`${userLocation.address.locality}, ${userLocation.address.country}`}</Typography>
                </div>
              )}
              <div className="flex justify-between  gap-2">
                <Typography as="p" className="font-medium ">
                  Phone Number:
                </Typography>
                <Typography as="p" className="text-gray-800 font-bold">
                  {userData.phone_number || "N/A"}
                </Typography>
              </div>
              <div className="flex justify-between gap-2">
                <Typography as="p" className="font-medium ">
                  Account Created:
                </Typography>
                <Typography as="p" className="text-gray-800 font-bold">
                  {formatDateString(userData.registration_date, true)}
                </Typography>
              </div>
              <div className="flex justify-between  gap-2">
                <Typography as="p" className="font-medium ">
                  Completed trades:
                </Typography>
                <Typography as="p" className="font-bold">
                  {acceptedTradeIds?.length || 0}
                </Typography>
              </div>
              <div className="flex justify-between  gap-2">
                <Typography as="p" className="font-medium ">
                  Rating:
                </Typography>
                <Typography as="p" className="font-bold">
                  {averageRating ? numberRatingToStars(averageRating) : "N/A"}
                </Typography>
              </div>
            </div>
            {userId && <TradingHistoryCompact userId={userId} />}
            {userId && <ShowAvailableUserBooks userId={userId} />}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </section>
  );
};
export default User;
