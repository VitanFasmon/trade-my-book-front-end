import React, { useState } from "react";
import { LoginData } from "../types/dataTypes";
import { loginUser } from "../data/apiService";
import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "john@example.com",
    password: "password123",
  });
  const [message, setMessage] = useState<string>("");
  const { login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(formData)
      .then((response) => {
        setMessage("User logged in:" + response);
        console.log(response.data);
        login(response.data, response.token || "");
        //Navigate("/");
      })
      .then(() => {})
      .catch((err) => setMessage("Login failed:" + err));
  };

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
};

export default Login;
