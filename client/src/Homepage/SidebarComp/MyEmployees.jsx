import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './Sidebar.css';

const MyEmployees = () => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8000/auth/user/employees',{
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
                });
                setEmployees(response.data.data);
            } catch (err) {
                console.error("Error fetching employees:", err);
            }
        };
        fetchEmployees();
    }, []);

    return (
        <>
            <div><Sidebar /></div>
            <div className='myemployee'>
                <h3>My Employees:</h3>
                {employees.length > 0 ? (
                    employees.map(employee => (
                        <div key={employee.id} className='employee-card'>
                            <p><strong>Name:</strong> {employee.empname}</p>
                            <p><strong>Age:</strong> {employee.age}</p>
                            <p><strong>City:</strong> {employee.city}</p>
                        </div>
                    ))
                ) : (
                    <p className='myemployeepara'>No employees added yet.</p>
                )}
            </div>
        </>
    );
}
export default MyEmployees;