# E-Commerce Backend API

A Node.js/Express backend for a full-featured e-commerce platform with user authentication, product management, wallet system, and checkout functionality.

## Features (Planned)
- ✅ User Authentication (Signup & Login)
- 🔄 Product Management
- 🔄 Wallet System
- 🔄 Shopping Cart & Checkout
- 🔄 Payment Gateway Integration

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **Validation**: Joi

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account and project

## Installation

1. Clone the repository:
```bash
git clone https://github.com/E-FANTASMA/Group-6-E-Commerce-App.git
cd Group-6-E-Commerce-App
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your Supabase credentials:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SECRET_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

## Database Setup (Supabase)

Create a `users` table in your Supabase project with the following schema:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT)

## API Endpoints

### Authentication Routes

#### Sign Up
- **URL**: `/api/auth/signup`
- **Method**: POST
- **Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "phoneNumber": "+1234567890"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user-id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "token": "jwt-token"
  }
}
```

#### Login
- **URL**: `/api/auth/login`
- **Method**: POST
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "user-id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "token": "jwt-token"
  }
}
```

#### Verify Token
- **URL**: `/api/auth/verify`
- **Method**: GET
- **Headers**:
```
Authorization: Bearer <token>
```
- **Response**:
```json
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "id": "user-id",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

## Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## Project Structure

```
├── config/
│   └── supabase.js          # Supabase client initialization
├── controllers/
│   └── authController.js    # Authentication logic
├── models/
│   └── User.js              # User database model
├── routes/
│   └── authRoutes.js        # Auth API routes
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── utils/
│   ├── authUtils.js         # Password hashing, JWT functions
│   └── validation.js        # Input validation schemas
├── .env                     # Environment variables (git ignored)
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── index.js                 # Server entry point
└── README.md                # This file
```

## Next Steps
1. ✅ Signup & Login Implementation
2. Create a branch and push to GitHub
3. Implement Product Management
4. Implement Wallet System
5. Implement Checkout & Payment Gateway

## Error Handling

All responses follow a standard format:
```json
{
  "success": boolean,
  "message": "Description of the result",
  "data": {},
  "error": "Error details (if applicable)"
}
```

## License
ISC

## Author
Group 6
