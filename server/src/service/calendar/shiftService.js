const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../exception/api-error');

class shiftService {
    async getShifts(calendarId) {
        try {
            const shifts = await prisma.shift.findMany({
                where: { calendarId },
                include: {
                    employee: true
                },
                orderBy: { date: 'asc' }
            });
            return shifts;
        } catch (err) {
            throw err;
        }
    }

    async getShiftsByEmployee(employeeId) {
        try {
            const shifts = await prisma.shift.findMany({
                where: { employeeId },
                orderBy: { date: 'asc' }
            });
            return shifts;
        } catch (err) {
            throw err;
        }
    }

    async getShiftsByPeriod(calendarId, startDate, endDate) {
        try {
            const shifts = await prisma.shift.findMany({
                where: {
                    calendarId,
                    date: {
                        gte: new Date(startDate),
                        lte: new Date(endDate)
                    }
                },
                include: {
                    employee: true
                },
                orderBy: { date: 'asc' }
            });
            return shifts;
        } catch (err) {
            throw err;
        }
    }

    async createShift(calendarId, employeeId, date, shiftType, notes = null) {
        try {
            const employee = await prisma.employee.findFirst({
                where: { id: employeeId, calendarId }
            });

            if (!employee) {
                throw ApiError.BadRequestError('Сотрудник не найден в этом календаре');
            }

            const shift = await prisma.shift.create({
                data: {
                    date: new Date(date),
                    shiftType,
                    notes,
                    employeeId,
                    calendarId
                },
                include: {
                    employee: true
                }
            });
            return shift;
        } catch (err) {
            throw err;
        }
    }

    async updateShift(shiftId, shiftType, notes) {
        try {
            const shift = await prisma.shift.update({
                where: { id: shiftId },
                data: {
                    shiftType,
                    notes
                },
                include: {
                    employee: true
                }
            });
            return shift;
        } catch (err) {
            throw err;
        }
    }

    async deleteShift(shiftId) {
        try {
            await prisma.shift.delete({
                where: { id: shiftId }
            });
            return { success: true };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new shiftService();