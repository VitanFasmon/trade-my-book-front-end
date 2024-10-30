import React, { useState } from "react";
import { registerUser, addLocation } from "../data/apiService";
import { UserData } from "../types/dataTypes";
import Typography from "./Typography";
import Button from "./Button";
import { useNavigate } from "react-router";
import { Routes } from "../navigation/routes";
import MapParent from "./GooglePlacesAutocomplete/MapParent";
import useLocationStore from "../store/useLocationStore";

const Register = () => {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    location_id: null,
  });

  const { setLocationData, locationData } = useLocationStore();

  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1); // Track current form step
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleRepeatPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setRepeatPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      repeatPassword:
        value !== formData.password ? "Passwords do not match" : "",
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1 && !locationData)
      newErrors.address = "Please enter a location.";
    if (step === 2) {
      if (!formData.name) newErrors.name = "Name is required.";
      if (!formData.email) newErrors.email = "Email is required.";
      if (!formData.phone_number)
        newErrors.phone_number = "Phone number is required.";
      if (!formData.password) newErrors.password = "Password is required.";
      if (formData.password !== repeatPassword)
        newErrors.repeatPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      setMessage("Please complete the form and confirm your address.");
      return;
    }

    try {
      const locationRes = locationData ? await addLocation(locationData) : null;

      const userRes = await registerUser({
        ...formData,
        location_id: locationRes?.data?.location_id || null,
      });
      setMessage(
        `Registration successful! Welcome, ${formData.name}. Redirecting to login...`
      );

      setTimeout(() => {
        navigate(Routes.Login);
      }, 3000);
    } catch (error) {
      setMessage(
        `Registration failed: ${(error as Error).message || "Server error"}`
      );
    }
  };

  const handleNextStep = () => {
    if (step === 1 && validateForm()) {
      setStep(2);
      setMessage("");
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  return (
    <section className="flex flex-col gap-8 items-center">
      <Typography as="h2" variant="h2">
        Registration Form
      </Typography>
      <form className="flex flex-col gap-2 max-w-[800px] w-full justify-center align-center items-center">
        {step === 1 && (
          <div className=" max-w-[800px] flex flex-col gap-2  justify-center align-center items-center">
            <Typography as="p" variant="p">
              We need your location in order to show you books near you. You can
              be as specific as you would like.
            </Typography>
            <div className="w-full flex justify-center">
              <MapParent />
            </div>
            {errors.address && <p className="text-red-500">{errors.address}</p>}
            <Button type="primary" onClick={handleNextStep}>
              Next Step
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className=" max-w-[300px] flex flex-col gap-2 w-full">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
              aria-label="Name"
              className="border border-primary p-2 rounded-md w-full"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              aria-label="Email"
              className="border border-primary p-2 rounded-md w-full"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone number"
              aria-label="Phone number"
              className="border border-primary p-2 rounded-md w-full"
            />
            {errors.phone_number && (
              <p className="text-red-500">{errors.phone_number}</p>
            )}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              aria-label="Password"
              className="border border-primary p-2 rounded-md w-full"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}

            <input
              type="password"
              name="repeatPassword"
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
              required
              placeholder="Repeat password"
              aria-label="Repeat password"
              className="border border-primary p-2 rounded-md w-full"
            />
            {errors.repeatPassword && (
              <p className="text-red-500">{errors.repeatPassword}</p>
            )}

            <div className="flex ">
              <Button
                type="secondary"
                onClick={handleBack}
                className="w-full rounded-r-none"
              >
                Back
              </Button>
              <Button
                type="primary"
                onClick={handleSubmit}
                className="w-full rounded-l-none"
              >
                Register
              </Button>
            </div>
          </div>
        )}
      </form>
      {message && (
        <p
          className={
            message.includes("successful") ? "text-green-500" : "text-red-500"
          }
        >
          {message}
        </p>
      )}
    </section>
  );
};

export default Register;
