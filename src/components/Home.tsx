import Button from "./Button";

const Home = () => {
  return (
    <section className="flex gap-2">
      BUTTONS
      <Button type="primary" className="text-primary ">
        Primary
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
  );
};
export default Home;
