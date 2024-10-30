import React, { useState } from "react";
import { registerUser, addLocation } from "../data/apiService";
import { UserData } from "../types/dataTypes";
import Typography from "./Typography";
import Button from "./Button";
import { fetchLocationData } from "../data/locationApiService";
import { useNavigate } from "react-router";
import { Routes } from "../navigation/routes";

const Register = () => {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    location_id: null,
  });
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(
    null
  );
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

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleLocationSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const location = await fetchLocationData(address);
      if (location) {
        setLatLng({ lat: location.lat, lng: location.lng });
        setMessage("Address confirmed. Ready for next step.");
      } else {
        setMessage("Unable to confirm address. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setMessage("Address lookup failed.");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1 && !address) newErrors.address = "Address is required.";
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
    if (!validateForm() || !latLng) {
      setMessage("Please complete the form and confirm your address.");
      return;
    }

    try {
      const locationRes = await addLocation({
        address,
        lat: latLng.lat,
        lon: latLng.lng,
      });
      if (locationRes.data?.location_id) {
        const userRes = await registerUser({
          ...formData,
          location_id: locationRes.data.location_id,
        });
        setMessage(
          `Registration successful! Welcome, ${formData.name}. Redirecting to login...`
        );
        setTimeout(() => {
          navigate(Routes.Login);
        }, 3000);
      }
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
      <form className="flex flex-col gap-2 max-w-[300px] w-full">
        {step === 1 && (
          <>
            {/* Location Step */}
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              required
              placeholder="Enter address"
              aria-label="Address"
              className="border border-primary p-2 rounded-md w-full"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}

            <Button type="secondary" onClick={handleLocationSubmit}>
              Confirm Address
            </Button>
            {latLng && (
              <div className="text-green-500">
                <p>Latitude: {latLng.lat}</p>
                <p>Longitude: {latLng.lng}</p>
              </div>
            )}
            <Button type="primary" onClick={handleNextStep}>
              Next Step
            </Button>
          </>
        )}

        {step === 2 && (
          <>
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

            <div className="flex justify-between">
              <Button type="secondary" onClick={handleBack}>
                Back
              </Button>
              <Button type="primary" onClick={handleSubmit}>
                Register
              </Button>
            </div>
          </>
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
