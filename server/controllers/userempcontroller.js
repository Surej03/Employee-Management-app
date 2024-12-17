const useremployeemodel = require("../models/employeemodels")

// Get employees for the authenticated user
exports.getUserEmployees = async (req, res) => {
    const userId = req.user.userId;
    try {
        const employees = await useremployeemodel.getByUserId(userId)
        res.json({data : employees});
    } catch (error){
        res.status(500).json({ message: "Error fetching employees", error: error.message });
    }
};
