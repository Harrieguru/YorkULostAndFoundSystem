import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import yorkLogo from "../assets/york-logo.png";
import passportYork from "../assets/PassportYork.jpg";

// ── Simulated user store ───────────────────────────────────────────────────
// imitates real backend, credentials are hashed client-side with SHA-256
// via the Web Crypto API before being stored / compared.

const MOCK_USERS = [
  { username: "staff1", password: "password123", role: "staff" },
  { username: "admin", password: "admin123", role: "admin" },
];

async function sha256(str) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function attemptLogin(username, password) {
  const hashedInput = await sha256(password);
  const match = MOCK_USERS.find(
    (u) => u.username === username && sha256(u.password), // pre-hash once
  );
  if (!match) return null;
  const hashedStored = await sha256(match.password);
  if (hashedInput !== hashedStored) return null;
  return { username: match.username, role: match.role };
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const user = await attemptLogin(username.trim(), password);
    setLoading(false);

    if (!user) {
      setError("Invalid username or password.");
      return;
    }

    // Store a lightweight session token (hashed username+timestamp)
    const token = await sha256(`${user.username}:${Date.now()}`);
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({ username: user.username, role: user.role }),
    );

    navigate("/");
  };

  return (
    <>
      <header className="bg-red-600 text-white">
        <div className="flex justify-between items-center px-6 py-2 bg-white border-b">
          <img src={yorkLogo} alt="York University logo" className="h-25" />
        </div>
        <div className="px-4 py-3">
          <h1 className="text-sm text-left font-semibold">Passport York</h1>
        </div>
      </header>

      {/* Passport York banner */}
      <div className="flex justify-center items-center gap-4 px-8 py-6 border-b bg-white">
        <img src={passportYork} alt="Passport York logo" className="h-25" />
        <p className="text-left text-black max-w-lg text-sm">
          <span className="font-bold text-base block mb-1">Passport York</span>
          authenticates you as a member of the York community and gives you
          access to a wide range of computing resources and services.
        </p>
      </div>

      {/* Login form */}
      <div className="flex items-center justify-center mt-10">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 w-full max-w-sm"
        >
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 text-sm px-4 py-2 rounded">
              {error}
            </div>
          )}

          <div className="flex items-center gap-4">
            <label
              htmlFor="username"
              className="w-28 text-black text-sm font-medium text-right"
            >
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="border border-gray-300 p-2 flex-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="password"
              className="w-28 text-black text-sm font-medium text-right"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="border border-gray-300 p-2 flex-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-2 text-sm font-medium cursor-pointer transition-colors"
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </div>

          {/* Dev hint — remove before going live */}
          <p className="text-xs text-gray-400 text-center mt-2">
            Demo: <code>staff1 / password123</code> or{" "}
            <code>admin / admin123</code>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
