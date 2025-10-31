const shiftService = require('../service/calendar/shiftService')

class shiftController {
    async getShifts(req, res, next) {
        try {
            const calendarId = req.params.calendarId;
            const shifts = await shiftService.getShifts(calendarId);
            return res.json(shifts);
        } catch (err) {
            next(err);
        }
    }

    async getEmployeeShifts(req, res, next) {
        try {
            const employeeId = req.params.employeeId;
            const shifts = await shiftService.getShiftsByEmployee(employeeId);
            return res.json(shifts);
        } catch (err) {
            next(err);
        }
    }

    async getShiftsByPeriod(req, res, next) {
        try {
            const calendarId = req.params.calendarId;
            const {startDate, endDate} = req.query; // Даты из query параметров

            const shifts = await shiftService.getShiftsByPeriod(calendarId, startDate, endDate);
            return res.json(shifts);
        } catch (err) {
            next(err);
        }
    }

    async createShift(req, res, next) {
        try {
            const calendarId = req.params.calendarId;
            const {employeeId, date, shiftType, notes} = req.body;

            const shift = await shiftService.createShift(calendarId, employeeId, date, shiftType, notes);
            return res.json(shift);
        } catch (err) {
            next(err);
        }
    }

    async updateShift(req, res, next) {
        try {
            const shiftId = req.params.id;
            const {shiftType, notes} = req.body;

            console.log('=== UPDATE SHIFT REQUEST ===');
            console.log('Shift ID:', shiftId);
            console.log('Shift Type:', shiftType);
            console.log('Notes:', notes);
            console.log('Headers:', req.headers);
            console.log('================');


            const shift = await shiftService.updateShift(shiftId, shiftType, notes);
            return res.json(shift);
        } catch (err) {
            next(err);
        }
    }

    async deleteShift(req, res, next) {
        try {
            const shiftId = req.params.id;
            await shiftService.deleteShift(shiftId);
            return res.json({success: true});
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new shiftController;