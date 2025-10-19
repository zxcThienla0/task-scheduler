const Router = require("express")
const calendarController = require("../controllers/calendar-controller");
const authMiddleware = require("../middleware/authMiddleware")

const calendarRouter = new Router()

calendarRouter.post('/calendar', authMiddleware, calendarController.createCalendar )
calendarRouter.delete('/calendar/:id', authMiddleware, calendarController.deleteCalendar )
calendarRouter.get('/calendar', authMiddleware, calendarController.getCalendar )

module.exports = calendarRouter