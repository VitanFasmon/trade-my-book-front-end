import shapeImage from "../assets/images/shape2.svg";
const PageNotFound = () => {
  return (
    <section style={{ backgroundImage: `url(${shapeImage})` }}>
      Error 404, page not found.
    </section>
  );
};
export default PageNotFound;
