import { useEffect, useState } from "react";
import shapeImage from "../assets/images/shape2.svg";
import { PublicUserData } from "../types/dataTypes";
import { fetchUserDataById } from "../data/apiService";
import { useParams } from "react-router";
import Typography from "../components/Typography";
const User = () => {
  const [userData, setUserData] = useState<PublicUserData | null>(null);
  const userId = Number(useParams().userId) || null;
  const fetchUserData = async () => {
    try {
      const response = userId ? await fetchUserDataById(userId) : null;
      if (!response?.data) return;
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
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
      <div className="flex flex-col gap-8 items-center py-8 bg-white p-8 rounded-xl max-w-[800px] w-full h-[400px] shadow-2xl border-2 border-lightGray justify-center">
        <Typography as="p" variant="p">
          {userData?.name}
        </Typography>
        <Typography as="p" variant="p">
          {userData?.email}
        </Typography>
      </div>
    </section>
  );
};
export default User;
