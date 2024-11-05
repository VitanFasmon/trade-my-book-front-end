import { useState } from "react";
import Button from "../components/Buttons/Button";
import MapParent from "../components/GooglePlacesAutocomplete/MapParent";
import { addLocation, updateUserLocation } from "../data/apiService";
import useAuthStore from "../store/useAuthStore";
import useLocationStore from "../store/useLocationStore";
import Typography from "../components/Typography";

const UserProfile = () => {
  const { user, updateUserData } = useAuthStore();
  const { locationData } = useLocationStore();
  const [message, setMessage] = useState<string>("");

  const onUpdateLocationButtonClick = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(user);
    if (!locationData) {
      setMessage("Please choose a location.");
      return;
    }

    try {
      const locationRes = locationData ? await addLocation(locationData) : null;
      if (!locationRes?.data?.location_id) {
        return;
      }
      const userRes = await updateUserLocation(locationRes?.data?.location_id);
      userRes.data && updateUserData(userRes.data);
      console.log(userRes);
      setMessage(`Location updated successfully!`);
    } catch (error) {
      setMessage(
        `Location updating failed: ${
          (error as Error).message || "Server error"
        }`
      );
    }
  };

  return (
    <div>
      <Typography as="h1" variant="h1">
        {user?.name}
      </Typography>
      <Typography as="p" variant="p">
        Email: {user?.email}
      </Typography>
      <Typography as="p" variant="p">
        Phone Number: {user?.phone_number}
      </Typography>
      <Typography as="p" variant="p">
        Location: {user?.location_id}
      </Typography>
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <Typography as="p" variant="p">
          We need your location in order to show you books near you. You can be
          as specific as you would like.
        </Typography>
        <MapParent />
        <Button
          type="primary"
          onClick={onUpdateLocationButtonClick}
          className="w-fit"
        >
          Update Location
        </Button>
        {message && (
          <p
            className={
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
