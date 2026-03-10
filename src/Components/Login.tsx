import { useState } from "react";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <main>
        <h1>Login page</h1>
        <div className="loginBox">
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label>
              Username:
              <input
                id="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </label>
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

                if (!response.ok) {
                  setError(data.message);
                  setPassword("");
                  return;
                }

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

                if (!response.ok) {
                  setError(data.message); // show backend message
                  setUsername("");
                  setPassword("");
                  return;
                }
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
              }}
            >
              Register
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </main>
    </>
  );
}

export default Login;
