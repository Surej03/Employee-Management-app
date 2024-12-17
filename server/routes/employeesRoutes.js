const employeeRouter = require("express").Router();
const employeeController = require("../controllers/empcontrollers");

// Routes
employeeRouter.get("/", employeeController.getAllEmployees)
employeeRouter.post('/', employeeController.addEmployee);
employeeRouter.get('/:id', employeeController.getAnEmployee)
employeeRouter.delete('/:id', employeeController.deleteEmployee)
employeeRouter.put('/:id', employeeController.updateEmployee);

module.exports = employeeRouter;