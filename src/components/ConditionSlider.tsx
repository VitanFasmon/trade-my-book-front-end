import RoundedContainer from "./RoundedContainer";
import Typography from "./Typography";
interface ConditionSliderProps {
  searchConditionMin: number;
  searchConditionMax: number;
  setSearchConditionMin: (term: number) => void;
  setSearchConditionMax: (term: number) => void;
  onChange?: () => void;
}

const ConditionSlider = ({
  searchConditionMin,
  searchConditionMax,
  setSearchConditionMin,
  setSearchConditionMax,
  onChange,
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
    <RoundedContainer className="flex flex-col gap-2  items-left justify-center w-full bg-lightGray">
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
          onChange={(e) => {
            handleMinChange(e);
            onChange && onChange();
          }}
          className="accent-secondary"
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
          onChange={(e) => {
            handleMaxChange(e);
            onChange && onChange();
          }}
          className="accent-secondary"
        />
      </div>
    </RoundedContainer>
  );
};
export default ConditionSlider;
