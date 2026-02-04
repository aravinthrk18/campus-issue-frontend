import { useNavigate } from "react-router-dom";

function Header({ role }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        color: "white",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>Campus Issue System</h3>

      <div>
        <span style={{ marginRight: "15px" }}>
          {role} Dashboard
        </span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Header;
