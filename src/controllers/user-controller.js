const userService = require('../service/user/user-service');

class UserController {
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const refreshToken = req.cookies?.refreshToken;

            if (!refreshToken) {
                return res.status(400).json({message: 'Refresh token is required'});
            }
            const userData = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async registration(req, res, next) {
        try {
            const {email, password} = req.body;

            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }


    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;

            if (!refreshToken) {
                return res.status(401).json({message: 'Refresh token not found'});
            }

            const userData = await userService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'lax'
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new UserController;