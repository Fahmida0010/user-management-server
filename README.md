# User Management System

A full-stack User Management System built with **TypeScript, React, Express.js, and PostgreSQL**. The application provides secure authentication, user administration, email verification, account blocking/unblocking, and bulk user management through a professional business-oriented interface.

---

## Live Demo

Frontend: https://user-management-client-rust.vercel.app

Backend API: https://user-management-server-rho.vercel.app

---

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Axios
* Tailwind CSS / Bootstrap
* React Icons
* SweetAlert2

### Backend

* Express.js
* TypeScript
* PostgreSQL
* JWT Authentication
* BcryptJS
* Nodemailer

### Database

* PostgreSQL

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Secure Password Hashing using Bcrypt
* Logout Functionality

### Email Verification

* Registration creates an account immediately
* Verification email is sent asynchronously
* Clicking verification link changes status:

  * `unverified → active`
  * `blocked` remains `blocked`

### User Management Panel

Only authenticated and non-blocked users can access the admin panel.

#### User Table

Displays:

* Selection Checkbox
* Name
* Email
* Status
* Last Login Time

Additional features:

* Responsive table layout
* Professional business-oriented UI
* Sort users by Last Login Time
* Multiple selection using checkboxes
* Select All / Deselect All checkbox

### Toolbar Actions

The toolbar is always visible and includes:

* Block Users
* Unblock Users
* Delete Users
* Delete Unverified Users

No action buttons exist inside individual rows.

### User Status

Supported statuses:

* Unverified
* Active
* Blocked

### Security Rules

Before every protected request:

* Server checks whether user exists
* Server checks whether user is blocked
* If blocked or deleted:

  * User session becomes invalid
  * Redirect to Login Page

---

## Database Design

### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'unverified',
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Unique Index Requirement

Email uniqueness is guaranteed at the database level using a Unique Index.

```sql
CREATE UNIQUE INDEX users_email_unique_idx
ON users(email);
```

This ensures:

* Email uniqueness
* Concurrent-safe inserts
* Storage-level validation
* Compliance with project requirements

---

## Project Requirements Implemented

| Requirement                               | Status |
| ----------------------------------------- | ------ |
| React + TypeScript + Express + PostgreSQL | ✅      |
| Unique Index in Database                  | ✅      |
| User Registration                         | ✅      |
| User Login                                | ✅      |
| Email Verification                        | ✅      |
| Protected Routes                          | ✅      |
| User Management Table                     | ✅      |
| Toolbar Actions                           | ✅      |
| Multiple Selection                        | ✅      |
| Select All Checkbox                       | ✅      |
| Sort by Last Login                        | ✅      |
| Block / Unblock Users                     | ✅      |
| Delete Users                              | ✅      |
| Delete Unverified Users                   | ✅      |
| JWT Authentication                        | ✅      |
| Responsive Design                         | ✅      |
| Tooltips                                  | ✅      |
| Status Messages                           | ✅      |
| Professional UI                           | ✅      |

---

## API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

#### Login

```http
POST /api/auth/login
```

#### Verify Email

```http
GET /api/auth/verify/:token
```

---

### Users

#### Get Users

```http
GET /api/users
```

#### Block Users

```http
PATCH /api/users/block
```

#### Unblock Users

```http
PATCH /api/users/unblock
```

#### Delete Users

```http
DELETE /api/users
```

#### Delete Unverified Users

```http
DELETE /api/users/unverified
```

---

## Installation

### Clone Repository

```bash
client side
git clone https://github.com/Fahmida0010/user-management-client.git
server side
git clone https://github.com/Fahmida0010/user-management-server.git

```

```bash
cd user-management-system
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/user_management

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

FRONTEND_URL=http://localhost:5173
```

Run Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

Run Frontend

```bash
npm run dev
```

---

## Folder Structure

```text
project-root
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── routes
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── db
│   ├── utils
│   └── types
│
└── README.md
```

---

## Utility Function

### getUniqIdValue

```ts
export const getUniqIdValue = () => {
  return crypto.randomUUID();
};
```

Used for generating unique identifiers where required.

---

## Notes

* Deleted users are permanently removed from the database.
* Blocked users cannot log in.
* Deleted users can register again using the same email.
* Email uniqueness is enforced by PostgreSQL Unique Index.
* No row-level action buttons are used.
* Toolbar-based bulk actions are implemented.
* The application works on desktop and mobile devices.

---

## Author

Developed as part of the User Management System Assignment using React, TypeScript, Express.js, and PostgreSQL.
