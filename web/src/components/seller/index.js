import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
const Admin = () => {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("loggedAdmin"))
  );

  if (admin) return <Dashboard setAdmin={setAdmin} admin={admin} />;
  else return <Login setAdmin={setAdmin} />;
};
export default Admin;
