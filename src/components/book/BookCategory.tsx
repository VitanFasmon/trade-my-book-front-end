import Typography from "../Typography";
interface BookCategoryProps {
  category: string;
}

const BookCategory = ({ category }: BookCategoryProps) => {
  return (
    <Typography
      as="p"
      variant="p"
      className="p-2 bg-lightSecondary rounded-xl w-fit font-bold"
      key={crypto.randomUUID()}
    >
      {category}
    </Typography>
  );
};
export default BookCategory;
