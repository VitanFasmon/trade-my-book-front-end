import { useState } from "react";
import { PublicUserData } from "../types/dataTypes";
import { fetchUserData } from "../data/apiService";

const UserInfo = () => {
  const [userData, setUserData] = useState<PublicUserData | undefined>(
    undefined
  );
  const handleOnClick = async () => {
    try {
      const response = await fetchUserData();
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  return (
    <div>
      <h1>User Info</h1>
      <button onClick={handleOnClick}>Load user data</button>
      <p>Name: {userData?.name}</p>
      <p>Email: {userData?.email}</p>
      <p>Phone Number: {userData?.phone_number}</p>
      <p>Location: {userData?.location_id}</p>
    </div>
  );
};
export default UserInfo;
