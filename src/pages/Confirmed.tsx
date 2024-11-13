import { useEffect, useState, useRef } from "react";
import { confirmEmail } from "../data/apiService";
import { useNavigate, useParams } from "react-router";
import { Routes } from "../navigation/routes";
import Typography from "../components/Typography";
import shapeImage from "../assets/images/shape2.svg";

const Confirmed = () => {
  const [message, setMessage] = useState<string | null>(null);
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const hasConfirmed = useRef(false);

  const getEmailConfirmation = async () => {
    try {
      if (hasConfirmed.current) return;
      hasConfirmed.current = true;

      const response = token ? await confirmEmail(token) : null;
      if (response?.message) {
        setMessage(response.message);
      }

      setTimeout(() => {
        //navigate(Routes.Login);
      }, 5000);
    } catch (error) {
      setMessage("Could not activate email.");
      setError(true);
    }
  };

  useEffect(() => {
    getEmailConfirmation();
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col items-center gap-2 py-8 "
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      <div className="flex flex-col items-center bg-white p-8 rounded-xl max-w-[800px] w-full h-[400px] shadow-2xl border-2 border-lightGray justify-center ">
        {error ? (
          <div className="flex flex-col items-center gap-2">
            <Typography as="h2" variant="h2">
              Something went wrong.
            </Typography>
            <Typography as="p" variant="p">
              {message}
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Typography as="h2" variant="h2">
              Email confirmed successfully!
            </Typography>
            <Typography as="p" variant="p">
              Redirecting to login page...
            </Typography>
          </div>
        )}
      </div>
    </section>
  );
};

export default Confirmed;
