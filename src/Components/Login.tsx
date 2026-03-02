import { useState } from "react";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="loginBox">
        Username:
        <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <br />
        Password:
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <br />
        <button
          onClick={async () => {
            const url = "http://localhost:4000/users/login";
            const init = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            };
            const response = await fetch(url, init);
            const data = await response.json();
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
          }}
        >
          Login
        </button>
        <button
          onClick={async () => {
            const url = "http://localhost:4000/users";
            const init = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, password }),
            };
            const response = await fetch(url, init);
            const data = await response.json();
            localStorage.setItem("token", data.token);
          }}
        >
          Register
        </button>
      </div>
    </>
  );
}

export default Login;
