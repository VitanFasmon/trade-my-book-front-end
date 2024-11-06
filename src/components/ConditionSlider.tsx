import RoundedContainer from "./RoundedContainer";
import Typography from "./Typography";
interface ConditionSliderProps {
  searchConditionMin: number;
  searchConditionMax: number;
  setSearchConditionMin: (term: number) => void;
  setSearchConditionMax: (term: number) => void;
}

const ConditionSlider = ({
  searchConditionMin,
  searchConditionMax,
  setSearchConditionMin,
  setSearchConditionMax,
}: ConditionSliderProps) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Math.min(Number(e.target.value), 10);
    setSearchConditionMin(newMinValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Math.max(Number(e.target.value), 1);
    setSearchConditionMax(newMaxValue);
  };

  return (
    <RoundedContainer className="flex flex-col gap-2  items-left justify-center w-full">
      <Typography as="p" variant="p" className="font-bold">
        Condition
      </Typography>
      <div className="flex flex-row gap-2">
        <Typography as="span" variant="span">
          Min: {searchConditionMin}/10
        </Typography>
        <input
          type="range"
          min={1}
          max={10}
          value={searchConditionMin}
          onChange={handleMinChange}
          className=""
        />
      </div>
      <div className="flex flex-row gap-2">
        <Typography as="span" variant="span">
          Max: {searchConditionMax}/10
        </Typography>
        <input
          type="range"
          min={1}
          max={10}
          value={searchConditionMax}
          onChange={handleMaxChange}
          className=""
        />
      </div>
    </RoundedContainer>
  );
};
export default ConditionSlider;
