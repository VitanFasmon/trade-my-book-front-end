import Typography from "../Typography";
interface ConditionProps {
  condition: number;
}
const Condition = ({ condition }: ConditionProps) => {
  return (
    <div className="p-2 flex flex-col justify-center items-center border border-secondary rounded-lg">
      <Typography as="p" variant="p" className="font-bold">
        Condition
      </Typography>
      <Typography as="p" variant="p" className="font-bold">
        {condition}/10
      </Typography>
    </div>
  );
};
export default Condition;
