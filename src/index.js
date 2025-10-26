require('dotenv').config()
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user-router')
const calendarRouter = require('./routes/calendar-router')
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/errorMiddleware');
const employeeRouter = require("./routes/employee-router");
const shiftRouter = require("./routes/shift-router");
const shareLinkRouter = require("./routes/shareLink-router");

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: true
}));

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.use('/api/auth', userRouter);
app.use('/api', calendarRouter);
app.use('/api', employeeRouter);
app.use('/api', shiftRouter);
app.use('/api', shareLinkRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        })
    } catch (err) {
        console.log(err);
    }
}

start();