import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import axios from "axios";
import "./login.css";

function Login() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Base URL from environment
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ================= NORMAL LOGIN =================
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password }
      );

      const user = res.data.user;

      if (user.role !== role) {
        alert(`You are not authorized as ${role}`);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", user.role);

      navigate(`/${user.role}`);
    } catch (err) {
      alert("Invalid login");
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const res = await axios.post(
        `${BASE_URL}/api/auth/google`,
        { token: idToken }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "student");

      navigate("/student");
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{role === "admin" ? "Admin Login" : "Student Login"}</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        {role === "student" && (
          <>
            <div className="divider">OR</div>

            <button className="login-btn google" onClick={handleGoogleLogin}>
              Sign in with Google
            </button>

            <button
              className="register-btn"
              onClick={() => navigate("/register/student")}
            >
              Create Student Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
