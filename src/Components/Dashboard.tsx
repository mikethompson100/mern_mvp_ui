import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

function DashBoard() {
  const navigate = useNavigate();

  return (
    <>
      DASHBOARD PAGE
      <br />
      <button
        onClick={async () => {
          localStorage.setItem("token", "");
          navigate("/");
        }}
      >
        Logout
      </button>
    </>
  );
}

export default DashBoard;
