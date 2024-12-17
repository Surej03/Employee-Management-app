import { useEffect, useState } from "react";
import axios from "axios";
import "./Employeemgmt.css";
import searchImg from "../Homepage/images/find.png";
import Sidebar from "./SidebarComp/Sidebar";

function Employeemgmt() {
  const [employees, setEmployees] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [popUpModel, setPopUpModel] = useState(false);
  const [employeeData, setEmployeeData] = useState({ id: "", empname: "", age: "", city: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const getAllEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8000/Employee", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEmployees(res.data);
      setFilterEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    document.title = "Home";
    getAllEmployees();
  }, []);

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase().trim();
    const filteredEmployees = employees.filter((employee) =>
      employee.empname.toLowerCase().includes(searchText) ||
      employee.city.toLowerCase().includes(searchText)
    );
    setFilterEmployees(filteredEmployees);
  };

  const closeModal = () => {
    setPopUpModel(false);
    setSuccessMessage("");
    setErrorMessage("");
    setIsEditing(false);
    setEmployeeData({ id: "", empname: "", age: "", city: "" });
  };

  const handleAddEmployee = () => {
    setEmployeeData({ id: "", empname: "", age: "", city: "" });
    setIsEditing(false);
    setPopUpModel(true);
  };

  const handleData = (e) => {
    const { name, value } = e.target;

    const capitalizeWords = (str) =>
      str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    if (name === "empname" || name === "city") {
      const isString = /^[A-Za-z\s]*$/;
      if (!isString.test(value)) {
        setErrorMessage(`${name.charAt(0).toUpperCase() + name.slice(1)} must contain only letters.`);
        return;
      } else {
        setErrorMessage("");
      }
    }

    setEmployeeData({
      ...employeeData,
      [name]: name === "empname" || name === "city" ? capitalizeWords(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios
        .put(`http://localhost:8000/Employee/${employeeData.id}`, employeeData,{
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(() => {
          getAllEmployees();
          setSuccessMessage("Employee updated successfully!");
          closeModal();
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
          setErrorMessage("Failed to update employee.");
        });
    } else {
      await axios
        .post("http://localhost:8000/Employee", employeeData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(() => {
          getAllEmployees();
          setSuccessMessage("Employee added successfully!");
          closeModal();
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
          setErrorMessage("Failed to add employee.");
        });
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      await axios.delete(`http://localhost:8000/Employee/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).then(() => {
        getAllEmployees();
      });
    }
  };

  const updateEmployee = (employee) => {
    setEmployeeData(employee);
    setIsEditing(true);
    setPopUpModel(true);
  };

  return (
    <div className="container">
      <Sidebar />
      <h3>Employee Management System</h3>
      <div className="input-search">
        <div className="search-container">
          <img className="search-img" src={searchImg} alt="Search" />
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Search Text Here"
            onChange={handleSearchChange}
          />
        </div>
        <button className="btn green" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterEmployees.length > 0 ? (
            filterEmployees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.empname}</td>
                <td>{employee.age}</td>
                <td>{employee.city}</td>
                <td>
                  <button className="btn green" onClick={() => updateEmployee(employee)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn red" onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {popUpModel && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{isEditing ? "Edit Employee" : "Add Employee"}</h2>
            <div className="input-grp">
              <label htmlFor="empname">Full Name</label>
              <input
                type="text"
                name="empname"
                id="empname"
                value={employeeData.empname}
                onChange={handleData}
                placeholder="Alphabetic Characters"
                pattern="[A-Za-z\s]+"
              />
            </div>
            <div className="input-grp">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                value={employeeData.age}
                onChange={handleData}
                placeholder="Numerical Values"
              />
            </div>
            <div className="input-grp">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={employeeData.city}
                onChange={handleData}
                placeholder="Alphabetic Characters"
              />
            </div>
            <button className="btn green" onClick={handleSubmit}>
              {isEditing ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Employeemgmt;