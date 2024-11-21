import RoundedContainer from "../RoundedContainer";
import Typography from "../Typography";
interface ConditionProps {
  condition: number;
}
const Condition = ({ condition }: ConditionProps) => {
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
export default Condition;
