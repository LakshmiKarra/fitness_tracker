
import { useState } from "react";

export default function Register({ onLogin }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("Creating account...");

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
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
        setMessage("Registration successful! Redirecting to login...");
        setForm({ fullName: "", email: "", password: "" });

        setTimeout(() => {
          onLogin();
        }, 1000);
      } else {
        setMessage(data || `Registration failed (${response.status}).`);
      }
    } catch (error) {
      console.error("Registration request failed:", error);

      setMessage(
        "Unable to connect from the website. Check the browser Console for the exact error."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>
          FIT<span>FLOW</span>
        </h1>

        <h2>Create your account</h2>
        <p>Start your fitness journey with FitFlow.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p className="auth-message" role="status">
          {message}
        </p>

        <button
          type="button"
          className="back-button"
          onClick={onLogin}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
