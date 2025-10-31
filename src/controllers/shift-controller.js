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
            console.log('🔧 === UPDATE SHIFT API CALL ===');
            console.log('Method:', req.method);
            console.log('URL:', req.url);
            console.log('Params:', req.params);
            console.log('Body:', req.body);
            console.log('Headers:', req.headers);

            const shiftId = req.params.id;
            const {shiftType, notes} = req.body;

            console.log('📦 Extracted data:', { shiftId, shiftType, notes });

            const shift = await shiftService.updateShift(shiftId, shiftType, notes);

            console.log('✅ API Response sent');
            return res.json(shift);
        } catch (err) {
            console.error('❌ === API ERROR ===');
            console.error('Error in controller:', err);
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