<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# User Management API

A complete user management system built with NestJS featuring JWT authentication, secure password handling, and RESTful API design.

## Features

- **User Management**: Full CRUD operations for user accounts
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: BCrypt password hashing
- **Input Validation**: Comprehensive request validation
- **Type Safety**: Full TypeScript implementation
- **SQLite Database**: Easy setup with file-based database
- **Protected Routes**: Role-based route protection

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | User login | No |
| POST | `/users` | Create new user | No |
| GET | `/users` | Get all users | Yes |
| GET | `/users/:id` | Get user by ID | Yes |
| PUT | `/users/:id` | Update user | Yes |
| DELETE | `/users/:id` | Delete user | Yes |
| GET | `/health` | API health check | No |

## Technologies Used

- **NestJS** - Framework
- **TypeScript** - Language
- **TypeORM** - Database ORM
- **SQLite** - Database
- **JWT** - Authentication
- **Passport** - Auth middleware
- **BCrypt** - Password hashing
- **Class Validator** - Input validation

## ⚡ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
# Clone repository
git clone https://github.com/Zefer1/user-management-api
cd user-management-api

# Install dependencies
npm install

# Start development server
npm run start:dev
```


The API will be running at `http://localhost:3001`

## Testing the API

```bash

curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Wick",
    "username": "johnwick",
    "email": "johnWick@example.com",
    "password": "password123"
  }'
```
  Login to Get Token
```bash
 curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johnwick",
    "password": "password123"
  }'
```
  ## Access Protected Routes
```bash
curl http://localhost:3001/users \
  -H "Authorization: Bearer <your-jwt-token>"
```
  ## Project Structure

  src/
├── auth/                 # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── auth.module.ts
├── user/                 # User management module
│   ├── user.entity.ts
│   ├── user.service.ts
│   ├── user.controller.ts
│   ├── create-user.dto.ts
│   └── user.module.ts
├── app.module.ts         # Root module
└── main.ts              # Application entry point

### Development

# Development with hot-reload
npm run start:dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format

### Configuration

Create a .env file for environment variables:

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h