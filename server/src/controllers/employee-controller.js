const employeeService = require('../service/calendar/employeeService')
const calendarService = require("../service/calendar/calendar-service");

class employeeController {
    async getEmployees(req, res, next) {
        try {
            const calendarId = req.params.id
            const employees = await employeeService.getEmployees(calendarId)
            return res.json(employees)
        } catch (err) {
            next(err);
        }
    }

    async createEmployee(req, res, next) {
        try {
            const {name} = req.body;
            const calendarId = req.params.id;

            const employee = await employeeService.createEmployee(calendarId, name);
            return res.json(employee);
        } catch (err) {
            next(err);
        }
    }


    async deleteEmployee(req, res, next) {
        try {
            const {calendarId, id} = req.params
            const employees = await employeeService.deleteEmployee(calendarId, id)
            return res.json(employees)
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new employeeController;