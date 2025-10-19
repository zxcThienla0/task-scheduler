const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const UserDto = require("../../dtos/user-dto")
const tokenService = require("./token-service")
const APIError = require('../../exception/api-error')

class UserService {

    async registration(email, password) {
        try {
            const candidate = await prisma.user.findFirst({where: {email}})
            if (candidate) {
                throw APIError.BadRequestError('User already exists')
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword
                }
            })
            const userDto = new UserDto(user);
            const tokens = await tokenService.generateToken(userDto.toJSON());

            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto
            }

        } catch (error) {
            throw error
        }
    }

    async login(email, password) {
        try {
            const user = await prisma.user.findFirst(
                {where: {email}},
            )

            if (!user) {
                throw new Error('Пользователь с таким Email не найден');
            }

            const isPassEqual = await bcrypt.compare(password, user.password);

            if (!isPassEqual) {
                throw new Error('Неверный пароль')
            }

            const userDto = new UserDto(user);
            const tokens = await tokenService.generateToken(userDto.toJSON());

            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            return {
                ...tokens,
                user: userDto
            }
        } catch (err) {
            throw err
        }
    }

    async logout(refreshToken) {
        try {
            console.log('🔐 Logout - refreshToken:', refreshToken?.substring(0, 20) + '...');

            const tokenFromDb = await prisma.token.findFirst({
                where: { refreshToken }
            });

            if (!tokenFromDb) {
                console.log('❌ Token not found in DB during logout');
                return { success: true };
            }

            await tokenService.removeToken(refreshToken);
            console.log('✅ Logout successful');
            return { success: true };
        } catch (error) {
            console.error('❌ Logout error:', error);
            return { success: true };
        }
    }

    async refresh(refreshToken) {
        console.log(`Refresh token: ${refreshToken}`);
        if (!refreshToken) {
            throw APIError.UnathorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        if (!userData) {
            throw APIError.UnathorizedError();
        }

        const tokenFromDb = await prisma.token.findFirst({
            where: {refreshToken},
            include: {
                user: true
            }
        });

        if (!tokenFromDb || !tokenFromDb.user) {
            throw APIError.UnathorizedError();
        }

        if (tokenFromDb.user.id !== userData.id) {
            throw APIError.UnathorizedError();
        }

        const userDto = new UserDto(tokenFromDb.user);
        const tokens = tokenService.generateToken(userDto.toJSON());

        await prisma.token.update({
            where: {refreshToken},
            data: {refreshToken: tokens.refreshToken}
        });

        return {
            ...tokens,
            user: userDto
        };
    }
}

module.exports = new UserService;