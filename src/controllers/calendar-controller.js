const calendarService = require('../service/calendar/calendar-service')

class calendarController {
    async getCalendar(req, res, next) {
        try {
            const ownerId = req.user.id;
            const calendar = await calendarService.getCalendar(ownerId)
            return res.json(calendar);
        } catch (err) {
            next(err)
        }
    }

    async createCalendar(req, res, next) {
        try {
            const {name, description} = req.body;
            const ownerId = await req.user?.id;
            const calendar = await calendarService.createCalendar(ownerId, name, description);
            return res.json(calendar);
        } catch (err) {
            next(err);
        }
    }

    async deleteCalendar(req, res, next) {
        try {
            const {id} = req.params
            const ownerId = req.user.id;
            const calendar = await calendarService.deleteCalendar(ownerId, id)
            return res.json(calendar);
        } catch (err) {
            next(err)
        }
    }

    async updateCalendar(req, res, next) {
        try {
            const {id} = req.params;
            const ownerId = req.user.id;
            const data = req.body;

            const calendar = await calendarService.updateCalendar(ownerId, id, data);
            return res.json(calendar);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new calendarController;