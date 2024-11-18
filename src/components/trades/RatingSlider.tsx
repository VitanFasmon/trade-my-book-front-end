import { useState } from "react";

interface RatingSliderProps {
  value: number;
  setValue: (value: number) => void;
}

const RatingSlider = ({ value, setValue }: RatingSliderProps) => {
  // A function to handle mouse hover events
  const handleMouseEnter = (rating: number) => {
    setValue(rating);
  };

  // A function to handle the click event for setting the rating
  const handleClick = (rating: number) => {
    setValue(rating);
  };

  const handleMouseLeave = () => {
    setValue(value); // Reset to original value on mouse leave
  };

  const stars = Array.from({ length: 5 }, (_, index) => {
    // Create an array of 5 stars, calculate each star's value (1 through 5)
    const starValue = index + 1;

    // Determine whether the current star is filled, half-filled, or empty
    const isFullStar = starValue <= value;
    const isHalfStar = starValue - 0.5 <= value && value < starValue;

    return (
      <span
        key={starValue}
        className={`star ${isFullStar ? "full" : ""} ${
          isHalfStar ? "half" : ""
        }`}
        onClick={() => handleClick(starValue)} // Set rating on click
        onMouseEnter={() => handleMouseEnter(starValue)} // Preview rating on hover
        onMouseLeave={handleMouseLeave} // Reset on mouse leave
        style={{ cursor: "pointer", fontSize: "30px" }}
      >
        {isFullStar ? "★" : isHalfStar ? "⯪" : "☆"}
      </span>
    );
  });

  return <div>{stars}</div>;
};

export default RatingSlider;
