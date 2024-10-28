import Button from "./Button";
import Typography from "./Typography";

const Home = () => {
  return (
    <section className="p-4">
      <section className="flex gap-2">
        BUTTONS
        <Button type="primary" className="text-primary ">
          <Typography as="p" variant="p" className="font-bold">
            Primary
          </Typography>
        </Button>
        <Button type="secondary" className="text-secondary font-bold">
          secondary
        </Button>
        <Button type="outlinedPrimary" className="text-darkGray font-bold">
          darkGray
        </Button>
        <Button type="outlinedSecondary" className="text-gray font-bold">
          gray
        </Button>
        <Button type="planePrimary" className="text-lightGray font-bold">
          lightGray
        </Button>
        <Button type="planeSecondary" className="text-lightGray font-bold">
          lightGray
        </Button>
        <Button
          type="planeSecondary"
          className="text-lightGray font-bold "
          link
          href="/profile"
        >
          lightGray LINK
        </Button>
      </section>
      <section className="flex flex-col gap-4">
        <Typography as="h1" variant="h1">
          This is a Title
        </Typography>
        <Typography as="h2" variant="h2">
          This is a Title
        </Typography>
        <Typography as="h3" variant="h3">
          This is a Title
        </Typography>
        <Typography as="h4" variant="h4">
          This is a Title
        </Typography>
        <Typography as="h5" variant="h5">
          This is a Title
        </Typography>
        <Typography as="h6" variant="h6">
          This is a Title
        </Typography>
        <Typography as="p" variant="p">
          This is a Title
        </Typography>
        <Typography as="p" variant="p" className="font-bold">
          This is a Title
        </Typography>
        <Typography as="span" variant="span">
          This is a Title
        </Typography>
      </section>
    </section>
  );
};
export default Home;
