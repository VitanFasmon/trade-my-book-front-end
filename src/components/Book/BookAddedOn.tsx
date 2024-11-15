import React from "react";
import Typography from "../Typography";
import RoundedContainer from "../RoundedContainer";
import { getTimeDifference } from "../../util/util";

interface AddedOnProps {
  date: Date;
}

const AddedOn: React.FC<AddedOnProps> = ({ date }) => {
  return (
    <RoundedContainer
      className="rounded-lg flex flex-col justify-center items-center font-bold"
      borderWidth=""
    >
      <Typography as="span" variant="span">
        {getTimeDifference(date)}
      </Typography>
    </RoundedContainer>
  );
};

export default AddedOn;
