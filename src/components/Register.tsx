import React, { useState } from "react";
import { registerUser } from "../data/apiService";
import { UserData } from "../types/dataTypes";

const Register = () => {
  const [formData, setFormData] = useState<UserData>({
    name: "Jane Doe",
    email: `${Math.floor(Math.random() * 1000)}john@example.com`,
    phoneNumber: "123456789",
    password: "password123",
    locationId: 1,
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    registerUser(formData)
      .then(
        (res) => setMessage(`User registered: ${res}`)
        //timeout and redirect to login after 3 seconds
      )
      .catch((err) => setMessage(`Registration failed: ${err}`));
  };

  return (
    <section>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
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
        <div>
          <label>Location ID:</label>
          <input
            type="number"
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </section>
  );
};

export default Register;
