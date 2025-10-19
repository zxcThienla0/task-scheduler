const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../exception/api-error');
const crypto = require('crypto');

class shareLinkService {

    generateToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    async createShareLink(calendarId, userId) {
        try {
            const calendar = await prisma.calendar.findFirst({
                where: { id: calendarId, ownerId: userId }
            });

            if (!calendar) {
                throw ApiError.BadRequestError('Календарь не найден или у вас нет доступа');
            }

            const token = this.generateToken();

            const shareLink = await prisma.shareLink.create({
                data: {
                    token,
                    calendarId,
                    userId,
                    isActive: true
                },
                include: {
                    calendar: {
                        select: {
                            id: true,
                            name: true,
                            description: true
                        }
                    },
                    createdBy: {
                        select: {
                            id: true,
                            email: true,
                            name: true
                        }
                    }
                }
            });

            return shareLink;
        } catch (err) {
            throw err;
        }
    }

    async getShareLinks(calendarId, userId) {
        try {
            const calendar = await prisma.calendar.findFirst({
                where: { id: calendarId, ownerId: userId }
            });

            if (!calendar) {
                throw ApiError.BadRequestError('Календарь не найден или у вас нет доступа');
            }

            const shareLinks = await prisma.shareLink.findMany({
                where: { calendarId },
                include: {
                    createdBy: {
                        select: {
                            id: true,
                            email: true,
                            name: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });

            return shareLinks;
        } catch (err) {
            throw err;
        }
    }

    async deactivateShareLink(shareLinkId, userId) {
        try {
            const shareLink = await prisma.shareLink.findFirst({
                where: {
                    id: shareLinkId,
                    userId
                }
            });

            if (!shareLink) {
                throw ApiError.BadRequestError('Ссылка не найдена или у вас нет прав');
            }

            const updatedLink = await prisma.shareLink.update({
                where: { id: shareLinkId },
                data: { isActive: false }
            });

            return updatedLink;
        } catch (err) {
            throw err;
        }
    }

    async activateShareLink(shareLinkId, userId) {
        try {
            const shareLink = await prisma.shareLink.findFirst({
                where: {
                    id: shareLinkId,
                    userId
                }
            });

            if (!shareLink) {
                throw ApiError.BadRequestError('Ссылка не найдена или у вас нет прав');
            }

            const updatedLink = await prisma.shareLink.update({
                where: { id: shareLinkId },
                data: { isActive: true }
            });

            return updatedLink;
        } catch (err) {
            throw err;
        }
    }

    async deleteShareLink(shareLinkId, userId) {
        try {
            const shareLink = await prisma.shareLink.findFirst({
                where: {
                    id: shareLinkId,
                    userId
                }
            });

            if (!shareLink) {
                throw ApiError.BadRequestError('Ссылка не найдена или у вас нет прав');
            }

            await prisma.shareLink.delete({
                where: { id: shareLinkId }
            });

            return { success: true };
        } catch (err) {
            throw err;
        }
    }

    async getCalendarByToken(token) {
        try {
            const shareLink = await prisma.shareLink.findFirst({
                where: {
                    token,
                    isActive: true
                },
                include: {
                    calendar: {
                        include: {
                            employees: {
                                orderBy: { name: 'asc' }
                            },
                            shifts: {
                                include: {
                                    employee: true
                                },
                                orderBy: { date: 'asc' }
                            }
                        }
                    },
                    createdBy: {
                        select: {
                            id: true,
                            email: true,
                            name: true
                        }
                    }
                }
            });

            if (!shareLink) {
                throw ApiError.BadRequestError('Ссылка недействительна или истекла');
            }

            return {
                calendar: shareLink.calendar,
                sharedBy: shareLink.createdBy,
                shareLinkId: shareLink.id
            };
        } catch (err) {
            throw err;
        }
    }

    async validateToken(token) {
        try {
            const shareLink = await prisma.shareLink.findFirst({
                where: {
                    token,
                    isActive: true
                },
                include: {
                    calendar: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });

            return {
                isValid: !!shareLink,
                calendar: shareLink?.calendar,
                shareLink: shareLink ? {
                    id: shareLink.id,
                    createdAt: shareLink.createdAt
                } : null
            };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new shareLinkService();