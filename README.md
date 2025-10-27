🗓️ Akella24 Calendar - Backend
<div align="center">
<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs">
<img src="https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express">
<img src="https://img.shields.io/badge/Prisma-6.17.1-2D3748?style=for-the-badge&logo=prisma">
<img src="https://img.shields.io/badge/JWT-9.0.2-000000?style=for-the-badge&logo=jsonwebtokens">

Production API: akella24calendar.ru

</div> 

# 📋 О проекте
Backend-часть коммерческого проекта Akella24 Calendar, разработанная на Node.js с использованием Express. Сервер предоставляет REST API для управления пользователями, событиями и календарем.

 
# 🚀 Технологический стек
Основные технологии
Node.js - серверная платформа

Express 5.1.0 - веб-фреймворк

Prisma 6.17.1 - ORM для работы с базой данных

База данных & ORM
Prisma Client - генерация типизированного клиента БД

Миграции - управление схемой базы данных

Безопасность & Аутентификация
JWT 9.0.2 - JSON Web Tokens для аутентификации

bcrypt 6.0.0 - хеширование паролей

crypto 1.0.1 - криптографические функции

Middleware & Валидация
CORS 2.8.5 - обработка кросс-доменных запросов

Cookie Parser 1.4.7 - работа с cookies

Express Validator 7.2.1 - валидация входящих данных

Разработка
Nodemon 3.1.10 - автоматический перезапуск при разработке

dotenv 17.2.3 - управление переменными окружения

# 🛠 Установка и запуск
Предварительные требования
Node.js 18+

PostgreSQL или другая поддерживаемая Prisma БД

npm или yarn

Установка зависимостей

npm install

Переменные окружения 

# Создайте файл .env в корне проекта: 

DATABASE_URL="postgresql://user:password@Host:Port/nameDB" 

JWT_SECRET="your_jwt_secret_key" 

PORT=3000 

NODE_ENV=development 


# Генерация Prisma Client
npx prisma generate

# Создание миграций
npx prisma migrate dev --name init

# Применение миграций к БД 

npx prisma migrate deploy 

Запуск в режиме разработки 

npm run dev 

Сервер будет доступен по адресу: http://localhost:3000 (или другому порту из .env)


# 🔗 API Endpoints

<h3>Аутентификация </h3>

POST /api/auth/registration - регистрация пользователя

POST /api/auth/login - вход в систему

POST /api/auth/logout - выход из системы

GET /api/auth/refresh - обновить accessToken

 
<h3>Календарь  </h3>

GET /api/calendar - получение списка календарей

PUT /api/calendar/:id - изменение названия/описания

POST /api/calendar/ - создание календаря

DELETE /api/calendar/:id - удаление календаря

 
<h3>Работники календаря  </h3>

GET /api/calendar/:id/employees - получение списка работников по id календаря

POST /api/calendar/:id/employees - создание работника в календаре

DELETE /api/calendar/:calendarId/employees/:id - удаление работника

 
<h3>Ссылка на календарь  </h3>

POST /api/calendar/:calendarId/share-links - создать ссылку

GET /api/calendar/:calendarId/share-links - получение ссылки

PUT /api/share-links/:id/deactivate - остановка действия ссылки

PUT /api/share-links/:id/activate - включение действия ссылки

DELETE /api/share-links/:id - удаление ссылки


GET /api/shared/calendar/:token - получить календарь по токену

GET /api/shared/validate/:token - валидация токена


<h3>Управление сменами сотрудников</h3> 

GET /api/calendar/:calendarId/shifts - получение всех смен календаря

GET /api/calendar/:calendarId/shifts/period - получение смен за период

POST /api/calendar/:calendarId/shifts - создание смены

GET /api/employee/:employeeId/shifts - получение смен сотрудника

PUT /api/shifts/:id - изменение смен

DELETE /api/shifts/:id - удаление смены 


# 🌐 Интеграция с Frontend
Проект взаимодействует с frontend-приложением, расположенным в отдельном репозитории:

Frontend репозиторий: Task Scheduler Frontend

Особенности интеграции:
REST API с стандартными HTTP методами

JWT аутентификация через cookies или headers

CORS настроен для домена akella24calendar.ru

Валидация данных на стороне сервера

Обработка ошибок с понятными статус-кодами

# 🛡 Безопасность
Хеширование паролей с bcrypt

JWT токены с секретным ключом

Валидация входящих данных

Защита от CORS атак

Безопасные cookies настройки

# 🎯 Ключевые функции
🔐 Система аутентификации - регистрация, вход, JWT токены

🔒 Возможность поделиться ссылкой на календарь без возможности редактирования другим пользователем

👥 Управление пользователями - профили, настройки

📅 CRUD операции для событий календаря

🗃 Работа с базой данных через Prisma ORM

✅ Валидация данных на стороне сервера

🚨 Обработка ошибок и исключений

🔒 Защита маршрутов middleware аутентификации

📊 База данных
Используется реляционная база данных (PostgreSQL/MySQL) с Prisma ORM:

 
# 🤝 Разработка
CommonJS модули

Асинхронные функции с async/await

Единообразная обработка ошибок

Разделение ответственности по слоям


# 📞 Контакты
Telegram: @Thienla0o0
Email: sburcalev@gmail.com

<div align="center">
Production: akella24calendar.ru | Built with ❤️ using Node.js & Express

</div>
