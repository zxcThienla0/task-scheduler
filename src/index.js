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

const PORT = process.env.PORT || 3000; // Исправьте на 3000 если используете этот порт
const app = express();

// Глобальные обработчики ошибок (ТОЛЬКО ОДИН РАЗ!)
process.on('uncaughtException', (error) => {
    console.error('❌ UNCAUGHT EXCEPTION at:', new Date().toISOString(), error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ UNHANDLED REJECTION at:', new Date().toISOString(), 'reason:', reason);
    process.exit(1);
});

// Middleware ДО определения роутов
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

// Логирование всех запросов
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        memory: process.memoryUsage(),
        uptime: process.uptime()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Роуты
app.use('/api/auth', userRouter);
app.use('/api', calendarRouter);
app.use('/api', employeeRouter);
app.use('/api', shiftRouter);
app.use('/api', shareLinkRouter);

// Error middleware (после всех роутов)
app.use(errorMiddleware);

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`✅ Server started successfully on port ${PORT} at:`, new Date().toISOString());
            console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
        });
    } catch (err) {
        console.error('💥 Failed to start server:', err);
        process.exit(1);
    }
}

// Запуск сервера
start();