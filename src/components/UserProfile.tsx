import { useEffect, useState } from "react";
import { PublicUserData } from "../types/dataTypes";
import { fetchUserData, fetchUserDataByEmail } from "../data/apiService";
import UsersBooks from "./UsersBooks";
import { useParams } from "react-router";

const UserProfile = () => {
  const [userData, setUserData] = useState<PublicUserData | undefined>(
    undefined
  );
  const { email } = useParams();

  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    try {
      const response = email && (await fetchUserDataByEmail(email));
      response && setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {userData?.name}</p>
      <p>Email: {userData?.email}</p>
      <p>Phone Number: {userData?.phone_number}</p>
      <p>Location: {userData?.location_id}</p>
      <UsersBooks />
    </div>
  );
};
export default UserProfile;
