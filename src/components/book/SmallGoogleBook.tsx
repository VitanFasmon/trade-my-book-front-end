import Typography from "../Typography";
import smallBookIcon from "../../assets/icons/book-32x32.png";

interface SmallBookProps {
  title: string;
  authors: string;
  publishedDate: string;
  thumbnail: string;
  onClick?: () => void;
}

const SmallBook = ({
  title,
  publishedDate,
  authors,
  thumbnail,
  onClick,
}: SmallBookProps) => {
  return (
    <div
      className="border rounded-lg flex-row flex gap-2 hover:cursor-pointer w-full bg-white"
      onClick={onClick}
    >
      <img
        className="w-16 p-2 object-contain"
        src={thumbnail || smallBookIcon}
        alt={`${title} cover`}
      />
      <div>
        <Typography as="h3" variant="h3">
          {`${title} ${publishedDate ? `(${publishedDate})` : ""}`}
        </Typography>
        <Typography as="h4" variant="h4">
          {authors}
        </Typography>
      </div>
    </div>
  );
};

export default SmallBook;
