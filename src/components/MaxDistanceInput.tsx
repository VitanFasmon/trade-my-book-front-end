import RoundedContainer from "./RoundedContainer";
interface MaxDistanceInputProps {
  radiusKm: number;
  setRadiusKm: (term: number) => void;
  onChange?: () => void;
}
const MaxDistanceInput = ({
  radiusKm,
  setRadiusKm,
  onChange,
}: MaxDistanceInputProps) => {
  return (
    <RoundedContainer className="flex flex-row gap-2  items-center justify-center w-full bg-lightGray">
      <label htmlFor="radiusKm" className="block font-bold text-primary w-full">
        Max distance (km)
      </label>
      <input
        type="number"
        id="radiusKm"
        value={radiusKm}
        onChange={(e) => {
          setRadiusKm(Number(e.target.value));
          onChange && onChange();
        }}
        min={10}
        step={10}
        className=" text-primary font-normal placeholder:text-gray placeholder:font-bold bg-lightGray w-20 p-2"
      />
    </RoundedContainer>
  );
};
export default MaxDistanceInput;
