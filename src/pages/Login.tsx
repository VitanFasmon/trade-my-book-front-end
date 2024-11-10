import React, { useState } from "react";
import { LoginData } from "../types/dataTypes";
import { loginUser } from "../data/apiService";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router";
import { Routes } from "../navigation/routes";
import Typography from "../components/Typography";
import Button from "../components/Buttons/Button";
import { useErrorToast } from "../components/Toast";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "john@example.com",
    password: "password123",
  });
  const { showErrorToast } = useErrorToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    loginUser(formData)
      .then((response) => {
        login(response.data, response.token || "");
        navigate(Routes.Home);
      })
      .catch((err) => showErrorToast("Login failed: " + err));
  };

  return (
    <section className="flex flex-col gap-8 items-center h-full py-8">
      <Typography as="h2" variant="h2">
        Login
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 max-w-[300px] w-full"
      >
        <div>
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
        </div>
        <div>
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
        </div>
        <Button type="primary" className="text-primary">
          <Typography as="p" variant="p" className="font-bold">
            Submit
          </Typography>
        </Button>
      </form>
    </section>
  );
};

export default Login;
