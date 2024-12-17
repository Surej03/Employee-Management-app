import React from "react";
import './HomeInst.css'
import Sidebar from "./Sidebar";

const HomeInstructions = () => (
  <div className="home-instructions">
    <Sidebar/>
    <h2>Welcome to the Employee Management System</h2>
    <p>
      On this page, you have full control over employee management. You can view 
      profiles, add new employees, update existing employee information, and remove 
      employees as needed. This interface is designed to streamline your workflow, 
      allowing you to quickly access and manage employee data. Make sure to navigate 
      through the options on the left to explore all available features.
    </p>
  </div>
);

export default HomeInstructions;
