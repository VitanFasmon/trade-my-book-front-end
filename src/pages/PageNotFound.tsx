import shapeImage from "../assets/images/shape2.svg";
import Button from "../components/Buttons/Button";
import Typography from "../components/Typography";
import { Routes } from "../navigation/routes";
const PageNotFound = () => {
  return (
    <section
      className="flex flex-col gap-8 items-center h-full py-8"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      <div className="flex flex-col gap-8 items-center py-8 bg-white p-8 rounded-xl max-w-[800px] w-full h-[400px] shadow-2xl border-2 border-lightGray justify-center">
        <Typography as="h1" variant="h1">
          Page Not Found
        </Typography>
        <Button type="secondary" link href={Routes.Home}>
          Go to home page
        </Button>
      </div>
    </section>
  );
};
export default PageNotFound;
