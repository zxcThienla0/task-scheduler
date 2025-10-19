const Router = require("express")
const userController = require("../controllers/user-controller");
const {body} = require('express-validator');

const userRouter = new Router()

userRouter.post('/registration',
    body("email").isEmail(),
    body("password").isLength({min:5, max:16}),
    userController.registration)
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)
userRouter.get('/refresh', userController.refresh)

module.exports = userRouter