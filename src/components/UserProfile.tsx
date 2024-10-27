import { useEffect, useState } from "react";
import { PublicUserData } from "../types/dataTypes";
import { fetchUserData, fetchUserDataByEmail } from "../data/apiService";
import UsersBooks from "./UsersBooks";
interface UserInfoProps {
  email: string;
}

const UserProfile = ({ email }: UserInfoProps) => {
  const [userData, setUserData] = useState<PublicUserData | undefined>(
    undefined
  );
  useEffect(() => {
    loadUserData();
  }, []);
  const loadUserData = async () => {
    try {
      const response = await fetchUserDataByEmail(email);
      setUserData(response.data);
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
