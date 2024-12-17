// Sidebar.jsx
import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import signOut from "../../Components/LoginSignUp/SignOut";
import MyEmployees from "./MyEmployees";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/homepage">All Employees</Link>
        </li>
        <li>
        <Link to="/user/employees">My Employees</Link>
        </li>
        <li><button onClick={signOut} className="signout-btn">Sign out</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
