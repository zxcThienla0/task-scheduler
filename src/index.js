require('dotenv').config({ override: false })
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

process.on('uncaughtException', (error) => {
    console.error('❌ UNCAUGHT EXCEPTION:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ UNHANDLED REJECTION at:', promise, 'reason:', reason);
    process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: [
        'http://46.229.213.50',
        'http://akella24calendar.ru',
        'https://akella24calendar.ru',
        'http://www.akella24calendar.ru',
        'https://www.akella24calendar.ru',
        'http://localhost:3000',
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
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