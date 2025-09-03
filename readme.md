# 🎓 College ERP System (Node.js + Express + MongoDB)

A simple **ERP system for Colleges** where colleges can register themselves, generate a unique ERP ID, and manage their details.  
The ERP ID is hashed and stored in the database while the plain ERP ID is emailed to the college.

---

## ✨ Features
- College registration with:
  - College Name
  - College Email
  - College ID (provided by college)
  - Courses offered
  - Website URL
  - Contact Number
- Auto-generate a **6-digit unique ERP ID** using `short-unique-id`.
- Securely hash ERP ID with `bcryptjs` before saving to DB.
- Send plain ERP ID via **email (Nodemailer)** to the registered college.
- Follows **MVC + Service + Repository** architecture.
- MongoDB schema validation.

---

## 📂 Project Structure
├── controllers
│ └── collegeController.js # Handles request/response
├── model
│ └── CollegeModel.js # Mongoose schema for College
├── repositories
│ └── collegeRepository.js # DB operations (CRUD)
├── routes
│ └── collegeRoute.js # Express routes
├── services
│ └── collegeService.js # Business logic (generate ERP ID, hash, mail)
├── utils
│ ├── dbConnect.js # MongoDB connection
│ ├── hash.js # Hashing utility (bcryptjs)
│ └── sendMail.js # Email utility (nodemailer)
├── .env # Environment variables
├── index.js # Main server file
└── README.md

yaml
Copy code

---

## 🛠️ Tech Stack
- **Node.js** (Backend runtime)
- **Express.js** (Server framework)
- **MongoDB + Mongoose** (Database + ODM)
- **bcryptjs** (Hashing)
- **short-unique-id** (Unique ERP ID generation)
- **nodemailer** (Send ERP ID via email)
- **dotenv** (Environment configuration)

---

## ⚙️ Installation & Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/college-erp.git
   cd college-erp
Install dependencies:

bash
Copy code
npm install
Setup .env file:

env
Copy code
PORT=3000
MONGO_URI=mongodb://localhost:27017/college-erp
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
Run server:

bash
Copy code
npm start
Server should be running at:

arduino
Copy code
http://localhost:3000
📌 API Endpoints
Register College
http
Copy code
POST /register
Request Body (JSON):

json
Copy code
{
  "name": "National Institute of Technology",
  "email": "keshukumar1909@gmail.com",
  "collegeId": "NIT001",
  "courses": [
    { "courseName": "Computer Science", "timePeriod": "4 years" },
    { "courseName": "Mechanical Engineering", "timePeriod": "4 years" },
    { "courseName": "MBA", "timePeriod": "2 years" }
  ],
  "websiteUrl": "https://www.nit-example.edu",
  "contactNumber": "+91-9876543210"
}
Response (JSON):

json
Copy code
{
  "success": true,
  "message": "College registered successfully",
  "data": {
    "_id": "64ef...9d",
    "name": "National Institute of Technology",
    "email": "keshukumar1909@gmail.com",
    "collegeId": "NIT001",
    "uniqueErpId": "$2a$10$...",
    "courses": [...],
    "websiteUrl": "https://www.nit-example.edu",
    "contactNumber": "+91-9876543210",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
⚡ Note: The plain ERP ID will be emailed to the provided college email.

📧 Email Example
kotlin
Copy code
Subject: Your College ERP Registration
Body:
Dear National Institute of Technology,
Your ERP ID is: A1B2C3
Please keep this safe for future login.
🚀 Next Steps
Add student registration & login.

College login using ERP ID + password.

Student-course enrollment management.

Admin dashboard for managing multiple colleges.

yaml
Copy code

---

Do you want me to also **add usage instructions for `short-unique-id` and `nodemailer` setup** inside this README, so new devs won’t get stuck?







Ask ChatGPT




