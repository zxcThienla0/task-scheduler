const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../exception/api-error');

class employeeService {
    async getEmployees(calendarId, sortByAlphabet = false) {
        try {
            if (sortByAlphabet) {
                const employees = await prisma.employee.findMany({
                    where: {calendarId},
                    orderBy: {name: 'asc'}
                })
                return employees;
            } else {
                const employeeOrders = await prisma.employeeOrder.findMany({
                    where: { calendarId },
                    include: {
                        employee: true
                    },
                    orderBy: { orderIndex: 'asc' }
                });

                if (employeeOrders.length > 0) {
                    return employeeOrders.map(order => order.employee);
                } else {
                    const employees = await prisma.employee.findMany({
                        where: {calendarId},
                        orderBy: {createdAt: 'asc'}
                    })
                    return employees;
                }
            }
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

    async getEmployeeOrder(calendarId) {
        try {
            const employeeOrders = await prisma.employeeOrder.findMany({
                where: { calendarId },
                include: {
                    employee: true
                },
                orderBy: { orderIndex: 'asc' }
            });

            return employeeOrders;
        } catch (err) {
            throw err;
        }
    }

    async saveEmployeeOrder(calendarId, employeeIds) {
        try {
            const calendar = await prisma.calendar.findUnique({
                where: { id: calendarId }
            });

            if (!calendar) {
                throw ApiError.BadRequestError('Календарь не найден');
            }

            const employees = await prisma.employee.findMany({
                where: {
                    id: { in: employeeIds },
                    calendarId: calendarId
                }
            });

            if (employees.length !== employeeIds.length) {
                throw ApiError.BadRequestError('Некоторые сотрудники не принадлежат этому календарю');
            }

            await prisma.employeeOrder.deleteMany({
                where: { calendarId }
            });

            const employeeOrdersData = employeeIds.map((employeeId, index) => ({
                calendarId,
                employeeId,
                orderIndex: index
            }));

            await prisma.employeeOrder.createMany({
                data: employeeOrdersData
            });

            const updatedOrders = await prisma.employeeOrder.findMany({
                where: { calendarId },
                include: {
                    employee: true
                },
                orderBy: { orderIndex: 'asc' }
            });

            return updatedOrders;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new employeeService()