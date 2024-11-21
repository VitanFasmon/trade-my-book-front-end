import { useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import MapParent from "../components/googlePlacesAutocomplete/MapParent";
import {
  addLocation,
  getAcceptedTradesIdsByUserId,
  getAverageRatingByUserId,
  getLocationById,
  resendEmail,
  updateUserLocation,
  updateUserName,
  updateUserPhoneNumber,
} from "../data/apiService";
import useAuthStore from "../store/useAuthStore";
import useLocationStore from "../store/useLocationStore";
import Typography from "../components/Typography";
import { LocationData } from "../types/dataTypes";
import PhoneNumberInput from "../components/PhoneNumberInput";
import { useErrorToast, useSuccessToast } from "../components/Toast";
import shapeImage from "../assets/images/shape2.svg";
import { formatAddress, numberRatingToStars } from "../util/util";

const UserProfile = () => {
  const { user, updateUserData } = useAuthStore();
  const { locationData } = useLocationStore();
  const [existingLocationData, setExistingLocationData] =
    useState<LocationData | null>(locationData);
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const [edit, setEdit] = useState<boolean>(false);
  const [acceptedTradeIds, setAcceptedTradeIds] = useState<number[] | null>();
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const [name, setName] = useState<string>(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phone_number || ""
  );
  const fetchAcceptedTradeIds = async () => {
    try {
      const response = user?.user_id
        ? await getAcceptedTradesIdsByUserId(user.user_id)
        : null;
      response?.data && setAcceptedTradeIds(response.data);
    } catch (error) {
      console.error("Error fetching accepted trades:", error);
    }
  };
  const fetchRating = async () => {
    try {
      const response = user?.user_id
        ? await getAverageRatingByUserId(user.user_id)
        : null;
      response?.data && setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error fetching rating:", error);
    }
  };

  useEffect(() => {
    getUserLocationByLocationId();
    fetchAcceptedTradeIds();
    fetchRating();
  }, []);

  const getUserLocationByLocationId = async () => {
    if (!user?.location_id) return;
    try {
      const response = await getLocationById(user?.location_id);
      if (response.data) {
        setExistingLocationData({
          address: JSON.parse(response.data?.address),
          lat: response.data?.latitude,
          lng: response.data?.longitude,
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const onUpdateUserInfo = async () => {
    if (locationData) {
      try {
        const locationRes = locationData
          ? await addLocation(locationData)
          : null;
        if (!locationRes?.data?.location_id) return;

        setExistingLocationData(locationData);

        const userRes = await updateUserLocation(
          locationRes?.data?.location_id
        );
        userRes.data && updateUserData(userRes.data);
      } catch (error) {
        showErrorToast(
          `Location updating failed: ${
            (error as Error).message || "Server error"
          }`
        );
      }
    }

    try {
      const userNameRes = await updateUserName(name);
      const userPhoneNumberRes = await updateUserPhoneNumber(phoneNumber);

      userNameRes.data &&
        userPhoneNumberRes.data &&
        updateUserData(userPhoneNumberRes.data);

      showSuccessToast("Your info updated successfully!");
    } catch (error) {
      showErrorToast(
        `User info updating failed: ${
          (error as Error).message || "Server error"
        }`
      );
    }
    setEdit(false);
  };

  const handleOnEditButtonClick = () => {
    setEdit(!edit);
  };
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const onResendButtonClick = async () => {
    if (!user?.email) return;
    try {
      const response = await resendEmail({ email: user?.email });
      response?.message && setResendMessage(response.message);
    } catch (error) {
      console.error("Error: Could not resend email link.", error);
    }
  };
  return (
    <section
      className="flex flex-col items-center min-h-full"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      <div className="w-[800px] my-8 flex flex-col gap-2 bg-white p-4 rounded-xl shadow-2xl border-2 border-lightGray">
        <div className="flex flex-row justify-between gap-2">
          <Typography as="h2" variant="h2">
            {edit ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-2 py-1"
              />
            ) : (
              user?.name
            )}
          </Typography>
          <div className="flex flex-row">
            <Button
              type="outlinedSecondary"
              onClick={handleOnEditButtonClick}
              className={edit ? " rounded-r-none " : ""}
            >
              <Typography as="p" variant="p" className={"font-bold"}>
                {edit ? "Cancel" : "Edit"}
              </Typography>
            </Button>
            {edit && (
              <Button
                type="secondary"
                onClick={onUpdateUserInfo}
                className="w-fit rounded-l-none"
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
        <Typography as="p" variant="p">
          {`Email: `}
          <Typography as="span" variant="p" className="font-bold">
            {user?.email} {user?.is_active ? "(ACTIVATED)" : "(NOT ACTIVATED)"}
          </Typography>
        </Typography>
        {!user?.is_active && (
          <div className="flex flex-col gap-2 items-start my-2">
            <Button type="outlinedSecondary" onClick={onResendButtonClick}>
              Resend activation email
            </Button>
            {resendMessage && (
              <Typography as="p" variant="h5">
                {resendMessage}
              </Typography>
            )}
          </div>
        )}
        <Typography as="p" variant="p">
          {`Phone Number: `}
          {edit ? (
            <PhoneNumberInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          ) : (
            <Typography as="span" variant="p" className="font-bold">
              {(user?.phone_number !== "" && user?.phone_number) ||
                "No phone number added."}
            </Typography>
          )}
        </Typography>
        <Typography as="p" variant="p">
          {`Location: `}
          <Typography as="span" variant="p" className="font-bold">
            {existingLocationData
              ? formatAddress(existingLocationData?.address)
              : ""}
          </Typography>
        </Typography>

        <div className="flex gap-1">
          <Typography as="p" className="font-medium text-gray-700">
            Number of completed trades:
          </Typography>
          <Typography as="p" className="font-bold">
            {acceptedTradeIds?.length || 0}
          </Typography>
        </div>
        <div className="flex gap-1">
          <Typography as="p" className="font-medium text-gray-700">
            Rating:
          </Typography>
          <Typography as="p" className="font-bold">
            {averageRating ? numberRatingToStars(averageRating) : "N/A"}
          </Typography>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <Typography as="h3" variant="h3">
            {edit && "Change location"}
          </Typography>
          {edit && (
            <Typography as="p" variant="p">
              We need your location in order to show you books near you. You can
              be as specific as you would like.
            </Typography>
          )}

          <MapParent
            defaultCenter={
              existingLocationData
                ? {
                    lat: Number(existingLocationData?.lat),
                    lng: Number(existingLocationData?.lng),
                  }
                : null
            }
            defaultZoom={10}
            edit={edit}
          />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
