import { useEffect, useState } from "react";
import shapeImage from "../assets/images/shape2.svg";
import { PublicUserData } from "../types/dataTypes";
import {
  fetchUserDataById,
  getAcceptedTradesIdsByUserId,
} from "../data/apiService";
import { useParams } from "react-router";
import Typography from "../components/Typography";
import { formatDateString } from "../util/util";
const User = () => {
  const [userData, setUserData] = useState<PublicUserData | null>(null);
  const userId = Number(useParams().userId) || null;
  const [acceptedTradeIds, setAcceptedTradeIds] = useState<number[] | null>();
  const fetchUserData = async () => {
    try {
      const response = userId ? await fetchUserDataById(userId) : null;
      if (!response?.data) return;
      setUserData(response.data);
      fetchAcceptedTradeIds();
    } catch (error) {
      console.error("Error fetching user data:", error);
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
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <section
      className="flex flex-col gap-2 items-center h-full py-8"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      <div className="flex flex-col gap-8 items-center bg-white p-8 rounded-xl max-w-[800px] w-full h-[400px] shadow-2xl border-2 border-lightGray justify-center">
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

            <div className="border-t pt-6">
              <div className="flex justify-between mb-4">
                <Typography as="p" className="font-medium text-gray-700">
                  Phone Number:
                </Typography>
                <Typography as="p" className="text-gray-800">
                  {userData.phone_number || "N/A"}
                </Typography>
              </div>
              <div className="flex justify-between mb-4 gap-1">
                <Typography as="p" className="font-medium text-gray-700">
                  Account Created:
                </Typography>
                <Typography as="p" className="text-gray-800">
                  {formatDateString(userData.registration_date, true)}
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography as="p" className="font-medium text-gray-700">
                  Number of completed trades:
                </Typography>
                <Typography as="p" className="font-bold">
                  {acceptedTradeIds?.length || 0}
                </Typography>
              </div>
              <div className="flex justify-between">
                <Typography as="p" className="font-medium text-gray-700">
                  Rating:
                </Typography>
                <Typography as="p" className="text-yellow-500">
                  ⭐⭐⭐⭐⭐ {/* Replace with dynamic rating if available */}
                </Typography>
              </div>
            </div>
          </>
        ) : (
          <Typography as="h2" className="text-center text-gray-600">
            Loading user data...
          </Typography>
        )}
      </div>
    </section>
  );
};
export default User;
