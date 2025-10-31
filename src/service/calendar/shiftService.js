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
            console.log('🔧 === UPDATE SHIFT DEBUG ===');
            console.log('Shift ID:', shiftId);
            console.log('Shift Type:', shiftType, 'Type:', typeof shiftType);
            console.log('Notes:', notes);

            const validTypes = ['NOT_WORKING', 'DAY_SHIFT', 'NIGHT_SHIFT', 'HOLIDAY', 'LEAVE', 'Dentist_Day', 'Surgery_Day', 'Computed_Tomography'];
            if (!validTypes.includes(shiftType)) {
                throw new Error(`Invalid shift type: ${shiftType}. Valid types: ${validTypes.join(', ')}`);
            }

            console.log('📝 Attempting database update...');
            const shift = await prisma.shift.update({
                where: { id: shiftId },
                data: {
                    shiftType: shiftType,
                    notes: notes || null
                },
                include: { employee: true }
            });

            console.log('✅ Update successful');
            return shift;
        } catch (err) {
            console.error('❌ === UPDATE SHIFT ERROR ===');
            console.error('Error name:', err.name);
            console.error('Error message:', err.message);
            console.error('Error code:', err.code);
            console.error('Error meta:', err.meta);
            console.error('Full error:', err);
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