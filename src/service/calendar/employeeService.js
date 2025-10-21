const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../exception/api-error');

class employeeService {
    async getEmployees(calendarId) {
        try {
            const employees = await prisma.employee.findMany({
                where: {calendarId}
            })
            return employees;
        } catch (err) {
            throw err
        }
    }

    async createEmployee(calendarId, name) {
        try {
            const employee = await prisma.employee.create({
                data: {
                    name,
                    calendarId,
                }
            })
            return employee
        } catch (err) {
            throw err
        }
    }

    async deleteEmployee(calendarId, employeeId) {
        try {
            const existingEmployee = await prisma.employee.findFirst({
                where: {calendarId, id: employeeId},
            });
            if (!existingEmployee) {
                throw ApiError.BadRequestError('Работник не найден');
            }

            await prisma.employee.delete({
                where: {id: employeeId}
            });

            return {success: true};
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new employeeService()