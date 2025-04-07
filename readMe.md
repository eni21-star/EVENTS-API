
# CAS-TECH Event API

A full-featured event management REST API built with **Express**, **TypeScript**, **PostgreSQL**, and **Swagger UI** for API documentation. Includes authentication, event management, user invitations, and reviews.

Users can post three types of events: **public**, **private**, or **protected**.
	•	For public events, anyone can attend as long as the event is not full.
	•	For protected events, users must send an invitation request to attend.
	•	For private events, only the event owner can send out invitations.

**Users can also view and download event details as PDF files to show proof of attendance.**

---

## 🚀 Features

- ✅ User Registration & Login (JWT Auth)
- ✅ Event creation, update, search
- ✅ Request/invite/accept event attendance
- ✅ Reviews on events
- ✅ **Download event data as PDF***
- ✅ Swagger API documentation
- ✅ Type-safe and secure with TypeScript
- ✅ Protected routes using middleware

---

## 📦 Tech Stack

- **Backend**: Node.js, Express
- **Language**: TypeScript
- **Database**: PostgreSQL (via TypeORM)
- **Auth**: JWT
- **Docs**: Swagger (YAML + swagger-ui-express)
- **Validation**: Custom validators
- **Dev Tools**: tsx, Yarn

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/eni21-star/EVENTS-API
cd CAS-TECH
```

### 2. Install dependencies

```bash
yarn
```

### 3. Environment Variables

Create a `.env` file in the root with the following:

```
PORT=3000
ACCESS_SECRETKEY=your_secret_key
```

### 4. Run the server (in development)

```bash
yarn dev
```

This runs the server using [`tsx`](https://github.com/esbuild-kit/tsx) with full ESM support.

---

## 📚 API Documentation

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

You can view and test all routes there.

---

## 📁 Project Structure

```
src/
├── controllers/        # Route controllers
├── services/           # Business logic layer
├── routes/             # Express route definitions
├── validators/         # Input validation functions
├── middleware/         # JWT and other middleware
├── errorHandlers/      # Custom error classes
├── docs/swagger.yaml   # Swagger spec file
├── app.ts              # Express app setup
├── server.ts           # Server entry point
```

---

## ✅ Available Scripts

| Script         | Description                         |
|----------------|-------------------------------------|
| `yarn dev`     | Run dev server using `tsx`          |
| `yarn build`   | (Optional) Compile TypeScript       |
| `yarn start`   | (Optional) Run compiled JS          |

---

## ✍️ Author

**Your Name**  
📧 eniolaolagbegi@gmail.com

---

