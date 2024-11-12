import React, { useState } from "react";
import { registerUser, addLocation } from "../data/apiService";
import { UserData } from "../types/dataTypes";
import Typography from "../components/Typography";
import Button from "../components/Buttons/Button";
import MapParent from "../components/GooglePlacesAutocomplete/MapParent";
import useLocationStore from "../store/useLocationStore";
import PhoneNumberInput from "../components/PhoneNumberInput";
import { useErrorToast, useSuccessToast } from "../components/Toast";
import ActivateAccount from "../components/ActivateAccount";
import shapeImage from "../assets/images/shape2.svg";

const Register = () => {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    location_id: null,
  });

  const { locationData } = useLocationStore();

  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const [activationEmailSent, setActivationEmailSent] =
    useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const setPhoneNumber = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      phone_number: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, phone_number: "" }));
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
      showErrorToast("Please complete the form and confirm your address.");
      return;
    }

    try {
      const locationRes = locationData ? await addLocation(locationData) : null;

      await registerUser({
        ...formData,
        location_id: locationRes?.data?.location_id || null,
      });
      showSuccessToast(`Registration successful! Welcome, ${formData.name}.`);
      setActivationEmailSent(true);
    } catch (error) {
      showErrorToast(
        `Registration failed: ${(error as Error).message || "Server error"}`
      );
    }
  };

  const handleNextStep = () => {
    if (step === 1 && validateForm()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  return (
    <section
      className="flex flex-col gap-8 items-center h-full py-8"
      style={{ backgroundImage: `url(${shapeImage})` }}
    >
      {!activationEmailSent ? (
        <div className="flex flex-col gap-8 items-center py-8 bg-white p-8 rounded-xl">
          <Typography as="h2" variant="h2">
            Registration Form
          </Typography>
          <form className="flex flex-col gap-2 max-w-[800px] w-full justify-center align-center items-center">
            {step === 1 && (
              <div className=" max-w-[800px] flex flex-col gap-2  justify-center align-center items-center text-center">
                <Typography as="p" variant="p">
                  We need your address, so that other people that trade with you
                  will be able to send you your traded books and in order to
                  show you books near your location.
                </Typography>
                <div className="w-full flex justify-center">
                  <MapParent edit />
                </div>
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
                <Button type="primary" onClick={handleNextStep}>
                  Next Step
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className=" max-w-[500px] flex flex-col gap-2 w-full h-full">
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

                <PhoneNumberInput
                  phoneNumber={formData.phone_number}
                  setPhoneNumber={setPhoneNumber}
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
        </div>
      ) : (
        <ActivateAccount email={formData.email} />
      )}
    </section>
  );
};

export default Register;
