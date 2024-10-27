import React, { useState } from "react";
import { LoginData } from "../types/dataTypes";
import { loginUser } from "../data/apiService";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "john@example.com",
    password: "password123",
  });
  const [message, setMessage] = useState<string>("");

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
      .then((res) => {
        setMessage("User logged in:" + res);
        console.log(res);
      })
      .catch((err) => setMessage("Login failed:" + err));
    setMessage("Login successful!");
    //redirect to main page
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
