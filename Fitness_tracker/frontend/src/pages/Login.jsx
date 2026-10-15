import { useState } from "react";

export default function Login({ onBack, onSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Logging in...");

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.text();

      if (response.ok) {
        setMessage("Login successful!");

        setTimeout(() => {
          onSuccess();
        }, 700);
      } else {
        setMessage(data);
      }
    } catch (error) {
      setMessage("Backend server is not running.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>
          FIT<span>FLOW</span>
        </h1>

        <h2>Welcome back</h2>

        <p>
          Login to access your fitness workspace.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            LOGIN
          </button>

        </form>

        <p className="auth-message">
          {message}
        </p>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}