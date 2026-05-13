# Mini E-Commerce App

> CSC 202 – Computer Programming II | Group 6 Project  
> Department of Software Engineering | Second Semester

## Project Description

This is a full-stack Mini E-Commerce web application that allows users to browse products, add items to a cart, and make purchases. 

The application is built using modern JavaScript technologies including React for the frontend and Node.js for the backend.

## Team Members

| Name | Matric No. | Role |
|------|------------|------|
| AJAYI, Cathynell | 24120112007 | Frontend|
| BALOGUN, Halima | 24120112014 |Frontend |
| FEMI-SIPE, Oluwatamilore | 24120112022 | F|
| GABRIEL-LOUIS, Onyedikachi | 24120112023 | Dev|
| MBAMA, Elsie | 24120112029 | |
| OJO, Jeremiah | 25120112060 |Backend |
| OSEGHALE, Nehireme | 24120112048 | QA/Documentation||
| AGOLO, Oghenerukevwe | 24120112006 | QA/Documentation|
| YAKUBU, Emmanuel | 24120112059 | |

## Features

- User registration and login
- Browse available products
- Add and remove items from cart
- Checkout functionality
- Responsive UI

## Tech Stack

Frontend:
- React
- JavaScript (ES6)

Backend:
- Node.js
- Express.js

Database:
- Supabase SQL

Tools:
- Git & GitHub

## Installation and Setup


### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)



1. Clone the repository:
   git clone https://github.com/E-FANTASMA/Group-6-E-Commerce-App.git
   
2. Navigate into the project folder:
   cd Group-6-E-Commerce-App

3. Backend Setup:
```bash
# Navigate to backend folder
cd backend

# Install dependencies
```bash
npm install
```

# Create a .env file and add your Supabase credentials
```
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
SUPABASE_SECRET_KEY=your_secret_key
JWT_SECRET=your_secret
PORT=5000
DB_URL=http://localhost:5000`
```

 Run the server:
```bash
npm run dev
```


4. Frontend Setup:
   cd frontend
   npm install

5. Start frontend:
   npm start


## API Endpoints


## Testing

Testing is currently beinf handled by the QA team. See the full details in:
- [`BUG_REPORT.md`](./BUG_REPORT.md) — list of bugs found and their status
- [`QA_CHECKLIST.md`](./QA_CHECKLIST.md) — checklist of features tested

Bugs were documented and resolved using GitHub Issues.

##  Git Workflow

- `main` — production-ready code only
- `feature/*` — new features
- `qa/*` — testing and documentation branches
- All changes go through **Pull Requests** before merging

## Project Status
In Development 

## License

This project was built for academic purposes — COS 202, University project.





## Live Demo