import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/styles.css";
import type { User } from "../types";

function DashBoard() {
  const [user, setUser] = useState<User>();

  const navigate = useNavigate();
  useEffect(() => {
    async function identify() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token missing");
        }
        const url = "http://localhost:4000/users/identify";
        const init = {
          headers: {
            authorization: token,
          },
        };
        const res = await fetch(url, init);
        if (!res.ok) {
          throw new Error("Token rejected");
        }
        const data = await res.json();
        setUser(data.user);
      } catch {
        navigate("/");
      }
    }
    identify();
  }, [navigate]);

  if (!user) {
    return "Loading...";
  }
  return (
    <>
      <main>
        <h1>Dashboard page</h1>

        <br />
        {user.username}
        <br />
        <button
          onClick={async () => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </button>
        <br />
        <br />
        {user.count}
        <button
          id="count"
          onClick={async () => {
            const newCount = user.count + 1;
            const url = "http://localhost:4000/users/count";
            const init = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: user.username,
                count: newCount,
              }),
            };
            const response = await fetch(url, init);
            if (!response.ok) {
              throw new Error("Unable to increment count");
            }
            setUser({ ...user, count: newCount });
          }}
        >
          Add 1 to counter
        </button>

        <br />
        <button
          onClick={async () => {
            const token = localStorage.getItem("token");
            if (!token) {
              throw new Error("Token missing");
            }
            const url = "http://localhost:4000/users/";
            const init = {
              method: "DELETE",
              headers: {
                authorization: token,
              },
            };
            await fetch(url, init);
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          DELETE MY ACCOUNT
        </button>
      </main>
    </>
  );
}

export default DashBoard;
