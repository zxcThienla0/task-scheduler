const Router = require("express")
const employeeController = require("../controllers/employee-controller");
const authMiddleware = require("../middleware/authMiddleware")

const employeeRouter = new Router()

employeeRouter.get('/calendar/:id/employees', authMiddleware, employeeController.getEmployees)
employeeRouter.post('/calendar/:id/employees', authMiddleware, employeeController.createEmployee)
employeeRouter.delete('/calendar/:calendarId/employees/:id', authMiddleware, employeeController.deleteEmployee);

module.exports = employeeRouter