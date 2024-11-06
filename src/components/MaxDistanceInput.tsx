import RoundedContainer from "./RoundedContainer";
interface MaxDistanceInputProps {
  radiusKm: number;
  setRadiusKm: (term: number) => void;
}
const MaxDistanceInput = ({ radiusKm, setRadiusKm }: MaxDistanceInputProps) => {
  return (
    <RoundedContainer className="flex flex-row gap-2  items-center justify-center w-full">
      <label htmlFor="radiusKm" className="block font-bold text-primary w-full">
        Max distance (km)
      </label>
      <input
        type="number"
        id="radiusKm"
        value={radiusKm}
        onChange={(e) => setRadiusKm(Number(e.target.value))}
        min={10}
        step={10}
        className=" text-primary font-normal placeholder:text-gray placeholder:font-bold bg-lightGray w-20 p-2"
      />
    </RoundedContainer>
  );
};
export default MaxDistanceInput;
