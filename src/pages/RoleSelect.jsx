import { useNavigate } from "react-router-dom";
import "./RoleSelect.css";

function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      <div className="role-card">
        <h1 className="title">Campus Issue System</h1>
        <p className="subtitle">Select your role to continue</p>

        <div className="role-actions">
          <button
            className="role-btn student"
            onClick={() => navigate("/login/student")}
          >
            Student
          </button>

          <button
            className="role-btn admin"
            onClick={() => navigate("/login/admin")}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;
