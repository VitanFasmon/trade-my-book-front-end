import RoundedContainer from "../RoundedContainer";
import Typography from "../Typography";
interface BookConditionProps {
  condition: number;
}
const BookCondition = ({ condition }: BookConditionProps) => {
  return (
    <RoundedContainer
      className="p-2 flex flex-col justify-center items-center border border-secondary rounded-lg"
      borderWidth=""
    >
      <Typography as="p" variant="p" className="font-bold">
        Condition
      </Typography>
      <Typography as="p" variant="p" className="font-bold">
        {condition}/10
      </Typography>
    </RoundedContainer>
  );
};
export default BookCondition;
