import React from "react";
import Typography from "./Typography";

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
    <Typography
      as="span"
      variant="span"
      className="p-2 border border-primary rounded-lg flex justify-center items-center"
    >
      {getTimeDifference(date)}
    </Typography>
  );
};

export default AddedOn;
