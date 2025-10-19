const shareLinkService = require('../service/shareLinkService');

class shareLinkController {

    async createShareLink(req, res, next) {
        try {
            const {calendarId} = req.params;
            const userId = req.user.id;

            const shareLink = await shareLinkService.createShareLink(calendarId, userId);
            return res.json(shareLink);
        } catch (err) {
            next(err);
        }
    }

    async getShareLinks(req, res, next) {
        try {
            const {calendarId} = req.params;
            const userId = req.user.id;

            const shareLinks = await shareLinkService.getShareLinks(calendarId, userId);
            return res.json(shareLinks);
        } catch (err) {
            next(err);
        }
    }

    async deactivateShareLink(req, res, next) {
        try {
            const {id} = req.params;
            const userId = req.user.id;

            const shareLink = await shareLinkService.deactivateShareLink(id, userId);
            return res.json(shareLink);
        } catch (err) {
            next(err);
        }
    }

    async activateShareLink(req, res, next) {
        try {
            const {id} = req.params;
            const userId = req.user.id;

            const shareLink = await shareLinkService.activateShareLink(id, userId);
            return res.json(shareLink);
        } catch (err) {
            next(err);
        }
    }

    async deleteShareLink(req, res, next) {
        try {
            const {id} = req.params;
            const userId = req.user.id;

            const result = await shareLinkService.deleteShareLink(id, userId);
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async getCalendarByToken(req, res, next) {
        try {
            const {token} = req.params;

            const result = await shareLinkService.getCalendarByToken(token);
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async validateToken(req, res, next) {
        try {
            const {token} = req.params;

            const result = await shareLinkService.validateToken(token);
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new shareLinkController();