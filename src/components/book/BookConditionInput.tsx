import Typography from "../Typography";
interface BookConditionInputProps {
  bookCondition: number;
  setBookCondition: (condition: number) => void;
}
const BookConditionInput = ({
  bookCondition,
  setBookCondition,
}: BookConditionInputProps) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <input
        type="range"
        id="condition"
        name="condition"
        min="1"
        max="10"
        className="w-64 accent-secondary"
        value={bookCondition}
        onChange={(e) => setBookCondition(Number(e.target.value))}
      />
      <label htmlFor="condition">
        <Typography as="p" variant="p">
          Book condition (
          <Typography as="span" variant="p" className="font-bold">
            {bookCondition}
          </Typography>
          /10)
        </Typography>
      </label>
    </div>
  );
};
export default BookConditionInput;
