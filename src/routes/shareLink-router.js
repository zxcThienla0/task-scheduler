const Router = require("express")
const shareLinkController = require("../controllers/shareLink-controller");
const authMiddleware = require("../middleware/authMiddleware")

const shareLinkRouter = new Router()

shareLinkRouter.post('/calendar/:calendarId/share-links', authMiddleware, shareLinkController.createShareLink);
shareLinkRouter.get('/calendar/:calendarId/share-links', authMiddleware, shareLinkController.getShareLinks);
shareLinkRouter.put('/share-links/:id/deactivate', authMiddleware, shareLinkController.deactivateShareLink);
shareLinkRouter.put('/share-links/:id/activate', authMiddleware, shareLinkController.activateShareLink);
shareLinkRouter.delete('/share-links/:id', authMiddleware, shareLinkController.deleteShareLink);

shareLinkRouter.get('/shared/calendar/:token', shareLinkController.getCalendarByToken);
shareLinkRouter.get('/shared/validate/:token', shareLinkController.validateToken);

module.exports = shareLinkRouter;