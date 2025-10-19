const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../exception/api-error');

class calendarService {
    async getCalendar(ownerId) {
        try {
            const Calendar = await prisma.calendar.findMany({
                where: {ownerId},
                orderBy: {id: 'asc'}
            });
            return Calendar;
        } catch (err) {
            throw err;
        }
    }

    async createCalendar(ownerId, name, description) {
        try {
            const calendar = await prisma.calendar.create({
                data: {
                    name,
                    description: description || null,
                    ownerId
                }
            });
            return calendar;
        } catch (err) {
            throw err;
        }
    }

    async deleteCalendar(ownerId, id) {
        try {
            const existingCalendar = await prisma.calendar.findFirst({
                where: {ownerId, id},
            });
            if (!existingCalendar) {
                throw ApiError.BadRequestError('Календарь не найден');
            }

            await prisma.calendar.delete({
                where: {id: id}
            });

            return {success: true};
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new calendarService()