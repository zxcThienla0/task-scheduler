const jwt = require("jsonwebtoken");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class tokenService {

    constructor() {
        if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new Error('JWT secrets are not defined in environment variables');
        }
        console.log('JWT secrets loaded:', {
            access: !!process.env.JWT_ACCESS_SECRET,
            refresh: !!process.env.JWT_REFRESH_SECRET
        });
    }

    async generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '365d'});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            if (!token) {
                return null;
            }
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await prisma.token.findFirst({
            where: {user: {id: userId}}
        })
        if (tokenData) {
            const token = await prisma.token.update({
                where: {id: tokenData.id},
                data: {refreshToken: refreshToken}
            })
            return token;
        }
        const token = await prisma.token.create({
            data: {
                refreshToken: refreshToken,
                user: {connect: {id: userId}}
            }
        })
        return token;
    }

    async findToken(refreshToken) {
        const tokenData = await prisma.token.findFirst({
            where: {refreshToken}
        });
        return tokenData;
    }

    async removeToken(refreshToken) {
        try {
            const tokenData = await prisma.token.delete({
                where: {refreshToken}
            });
            return tokenData;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new tokenService;