import Typography from "../Typography";

interface SmallBookProps {
  title: string;
  description: string;
  thumbnail: string;
}
const SmallBook = ({ title, description, thumbnail }: SmallBookProps) => {
  const trimString = (longString: string) => {
    if (longString.length > 100) {
      return longString.substring(0, 100) + "...";
    }
    return longString;
  };
  return (
    <div className="border rounded-lg flex-row flex gap-2 hover:cursor-pointer">
      <img src={thumbnail} alt={`${title} cover`} />
      <div>
        <Typography as="h3" variant="h3">
          {title}
        </Typography>
        <Typography as="p" variant="p">
          {trimString(description || "")}
        </Typography>
      </div>
    </div>
  );
};

export default SmallBook;
