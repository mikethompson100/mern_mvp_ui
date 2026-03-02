import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/Login.tsx"
import Dashboard from "./Components/Dashboard"
import "./styles/styles.css";

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
