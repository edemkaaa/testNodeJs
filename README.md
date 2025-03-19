# Система обработки обращений

Это REST API для работы с обращениями, разработанное с использованием NestJS, TypeORM и PostgreSQL.

## Функциональность

Система позволяет:

- Создавать обращения
- Брать обращения в работу
- Завершать обработку обращений
- Отменять обращения
- Получать список обращений с фильтрацией по дате
- Отменять все обращения в статусе "в работе"

## Технический стек

- Node.js
- NestJS
- PostgreSQL
- TypeORM
- TypeScript
- Swagger для документации API

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone [https://github.com/edemkaaa/testNodeJs.git]
cd [TestZ]
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте базу данных PostgreSQL:
```bash
createdb request_system
```

4. Настройте переменные окружения:
Создайте файл `.env` со следующим содержимым:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=ваш_пользователь
DB_PASSWORD=ваш_пароль
DB_DATABASE=request_system
```

5. Запустите приложение:
```bash
npm run start:dev
```

## API документация

После запуска приложения Swagger документация доступна по адресу:
```
http://localhost:3000/api
```

## Статусы обращений

- NEW - Новое
- IN_PROGRESS - В работе
- COMPLETED - Завершено
- CANCELLED - Отменено 