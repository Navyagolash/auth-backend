Description - JWT Authentication Backend built with Node.js, Express.js, MongoDB, and bcrypt for secure user registration, login, and protected routes.

# 🔐 Auth Backend

A secure authentication backend built with Node.js, Express.js, MongoDB, JWT, and bcrypt. This API provides user registration, login, protected routes, and token-based authentication.

## 🚀 Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes Middleware
- MongoDB Database Integration
- Environment Variable Configuration
- Error Handling
- RESTful API Design

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt.js
- dotenv
- CORS

## 📁 Project Structure

```bash
auth-Backend/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── .env
├── server.js
├── package.json
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd auth-Backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start Server

```bash
npm start
```

For development:

```bash
npm run dev
```

## 🔑 API Endpoints

### Register User

```http
POST /api/auth/register
```

Request Body:

```json
{
  "name": "Navya",
  "email": "navya@example.com",
  "password": "123456"
}
```

### Login User

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "navya@example.com",
  "password": "123456"
}
```

### Get User Profile

```http
GET /api/auth/profile
```

Headers:

```http
Authorization: Bearer <token>
```

## 🔒 Authentication Flow

1. User registers with email and password.
2. Password is hashed using bcrypt.
3. User logs in using credentials.
4. Server validates user data.
5. JWT token is generated.
6. Protected routes verify token before granting access.

## 📌 Key Concepts Implemented

- REST API Development
- Authentication & Authorization
- JWT Token Management
- Password Encryption
- MongoDB CRUD Operations
- Middleware Usage
- Environment Variables
- Error Handling

## 📈 Future Enhancements

- Forgot Password
- Email Verification
- Refresh Tokens
- Role-Based Authentication
- OAuth (Google/GitHub Login)

## 👨‍💻 Author

**Navya Golash**

Frontend Developer | Angular Developer | MERN Stack Enthusiast
