import { useEffect, useState } from "react";
import Button from "../components/Buttons/Button";
import MapParent from "../components/GooglePlacesAutocomplete/MapParent";
import {
  addLocation,
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

const UserProfile = () => {
  const { user, updateUserData } = useAuthStore();
  const { locationData } = useLocationStore();
  const [existingLocationData, setExistingLocationData] =
    useState<LocationData | null>(locationData);
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const [edit, setEdit] = useState<boolean>(false);

  const [name, setName] = useState<string>(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phone_number || ""
  );

  useEffect(() => {
    getUserLocationByLocationId();
  }, []);

  const getUserLocationByLocationId = async () => {
    if (!user?.location_id) return;
    try {
      const response = await getLocationById(user?.location_id);
      if (response.data) {
        setExistingLocationData({
          address: response.data?.address,
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

        showSuccessToast("Location updated successfully!");
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

      showSuccessToast("User info updated successfully!");
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
    <section className="flex flex-col items-center h-full">
      <div className="w-[800px] my-8 flex flex-col gap-2">
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
        </Typography>

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
            {existingLocationData ? existingLocationData?.address : ""}
          </Typography>
        </Typography>

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
