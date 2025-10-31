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

const PORT = process.env.PORT || 3000;
const app = express();

process.on('uncaughtException', (error) => {
    console.error('❌ UNCAUGHT EXCEPTION at:', new Date().toISOString(), error);
    setTimeout(() => process.exit(1), 1000);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ UNHANDLED REJECTION at:', new Date().toISOString(), 'reason:', reason);
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

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        memory: process.memoryUsage(),
        uptime: process.uptime()
    });
});

app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

app.use('/api/auth', userRouter);
app.use('/api', calendarRouter);
app.use('/api', employeeRouter);
app.use('/api', shiftRouter);
app.use('/api', shareLinkRouter);

app.use(errorMiddleware);

function gracefulShutdown(signal) {
    console.log(`\n📢 Received ${signal}. Shutting down gracefully...`);
    process.exit(0);
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

const start = async () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`✅ Server started successfully on port ${PORT} at:`, new Date().toISOString());
        });

        server.on('error', (error) => {
            console.error('💥 Server error:', error);
        });

    } catch (err) {
        console.error('💥 Failed to start server:', err);
        process.exit(1);
    }
}

start();