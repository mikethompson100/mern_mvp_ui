import { useState } from "react";
import "./styles/styles.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
            console.log("Token:", response);
            const data = await response.json();
            console.log("data", data);
            localStorage.setItem("token", data.token);
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}
