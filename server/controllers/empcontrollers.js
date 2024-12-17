const condb = require('../config/mySqlDb');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await condb('employees').select('*');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: "Error fetching employees", error: err.message });
    }
};
exports.getAnEmployee = async (req, res) => {
    try {
        const {id} = req.params
        const employee = await condb('employees').select('*').where({id}).first();
        res.json(employee);
    } catch (err){
        res.status(500).json({message: "Error fetching employee", error: err.message})
    }
}

// Add a new employee
exports.addEmployee = async (req, res) => {
    console.log("user_id",  req.user.userId) //debug
    const user_id = req.user.userId
    const { empname, age, city } = req.body;
    if (!empname || !age || !city) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if(!user_id) {
        return res.status(403).json({message: 'Please login to add user'});
    }

    try {
        await condb('employees').insert({ empname, age, city, user_id});
        // Fetch the newly added employee
        const newEmployee = await condb('employees')
            .where({ empname, age, city}).first(); 
        res.json(newEmployee);
    } catch (err) {
        res.status(500).json({ message: "Error adding employee", error: err.message });
    }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await condb('employees').where({ id }).del();
        if (result) {
            res.json({ message: "Employee deleted successfully" });
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting employee", error: err.message });
    }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
    const id = Number(req.params.id);
    const { empname, age, city } = req.body;

    if (!empname || !age || !city) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await condb('employees').where({ id }).update({ empname, age, city });
        // Fetch the updated employee
        const updatedEmployee = await condb('employees').where({ id }).first();
        
        if (updatedEmployee) {
            res.json(updatedEmployee);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating employee", error: err.message });
    }
};