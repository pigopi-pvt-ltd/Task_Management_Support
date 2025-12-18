import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Users from "./Pages/Users";
import ProtectedRoute from "./utils/ProtectedRoute";
import { getToken } from "./utils/auth";

import AllTickets from "./Pages/AllTickets";
import ChatManagement from "./Pages/ChatManagement";

function App() {
  const token = getToken();

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/users" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/users" element={<Users />} />
        <Route path="/all-tickets" element={<AllTickets />} />
        <Route path="/chat-management" element={<ChatManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
