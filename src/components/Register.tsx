import React, { useState } from "react";
import { registerUser } from "../data/apiService";
import { UserData } from "../types/dataTypes";
import Typography from "./Typography";
import Button from "./Button";

const Register = () => {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    location_id: 1,
  });
  /*
  const [formData, setFormData] = useState<UserData>({
    name: "Jane Doe",
    email: `${Math.floor(Math.random() * 1000)}john@example.com`,
    phone_number: "123456789",
    password: "password123",
    location_id: 1,
  });
*/
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (value && value !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeatPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, repeatPassword: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone_number)
      newErrors.phone_number = "Phone number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== repeatPassword)
      newErrors.repeatPassword = "Passwords do not match.";
    if (!formData.location_id)
      newErrors.location_id = "Location ID is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    registerUser(formData)
      .then((res) => {
        setMessage(`Registration successful!`);
        // Optional: Redirect to login after 3 seconds
        setTimeout(() => {
          // Redirect logic can be added here
        }, 3000);
      })
      .catch((err) => setMessage(`Registration failed: ${err}`));
  };

  return (
    <section className="flex flex-col gap-8 items-center">
      <Typography as="h2" variant="h2">
        Registration Form
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 max-w-[300px] w-full"
      >
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
        {errors.password && <p className="text-red-500">{errors.password}</p>}

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

        <label>Location ID:</label>
        <input
          type="number"
          name="location_id"
          value={formData.location_id}
          onChange={handleChange}
          required
          className="border border-primary p-2 rounded-md w-full"
        />
        {errors.location_id && (
          <p className="text-red-500">{errors.location_id}</p>
        )}

        <Button type="primary" className="text-primary ">
          <Typography as="p" variant="p" className="font-bold">
            Register
          </Typography>
        </Button>
      </form>
      {message && <p className="text-green-500">{message}</p>}
    </section>
  );
};

export default Register;
