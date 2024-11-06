import React from "react";
import Typography from "../Typography";
import RoundedContainer from "../RoundedContainer";

interface AddedOnProps {
  date: Date;
}

const AddedOn: React.FC<AddedOnProps> = ({ date }) => {
  const getTimeDifference = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 2) {
      return `${diffInDays} day ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString("en-GB"); // Format: dd:mm:yyyy
    }
  };

  return (
    <RoundedContainer
      className="rounded-lg flex justify-center items-center font-bold"
      borderWidth=""
    >
      <Typography as="span" variant="span">
        {getTimeDifference(date)}
      </Typography>
    </RoundedContainer>
  );
};

export default AddedOn;
