import RoundedContainer from "../RoundedContainer";
import Typography from "../Typography";
interface BookCategoryProps {
  category: string;
}

const BookCategory = ({ category }: BookCategoryProps) => {
  return (
    <RoundedContainer
      borderWidth=""
      className=" bg-lightSecondary w-fit font-bold p-2"
    >
      <Typography as="p" variant="p" key={crypto.randomUUID()}>
        {category}
      </Typography>
    </RoundedContainer>
  );
};
export default BookCategory;
