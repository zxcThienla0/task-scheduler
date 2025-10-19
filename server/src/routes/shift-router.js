const Router = require("express")
const shiftController = require("../controllers/shift-controller");
const authMiddleware = require("../middleware/authMiddleware")

const shiftRouter = new Router()

shiftRouter.get('/calendar/:calendarId/shifts', authMiddleware, shiftController.getShifts);
shiftRouter.get('/calendar/:calendarId/shifts/period', authMiddleware, shiftController.getShiftsByPeriod);
shiftRouter.post('/calendar/:calendarId/shifts', authMiddleware, shiftController.createShift);

shiftRouter.get('/employee/:employeeId/shifts', authMiddleware, shiftController.getEmployeeShifts);

shiftRouter.put('/shifts/:id', authMiddleware, shiftController.updateShift);
shiftRouter.delete('/shifts/:id', authMiddleware, shiftController.deleteShift);

module.exports = shiftRouter;