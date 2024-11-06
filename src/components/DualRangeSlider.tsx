import React, { useState, useEffect } from "react";

interface DualRangeSliderProps {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChange: (minValue: number, maxValue: number) => void;
}

const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
  min,
  max,
  valueMin,
  valueMax,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(valueMin);
  const [maxValue, setMaxValue] = useState(valueMax);

  useEffect(() => {
    if (minValue > maxValue) {
      setMinValue(maxValue);
    }
  }, [minValue, maxValue]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Math.min(Number(e.target.value), maxValue);
    setMinValue(newMinValue);
    onChange(newMinValue, maxValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Math.max(Number(e.target.value), minValue);
    setMaxValue(newMaxValue);
    onChange(minValue, newMaxValue);
  };

  return (
    <div className="">
      <div className="">
        <span>Min: {minValue}</span>
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className=""
        />
      </div>
      <div className="">
        <span>Max: {maxValue}</span>
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className=""
        />
      </div>
    </div>
  );
};

export default DualRangeSlider;
