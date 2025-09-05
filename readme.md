# 🎓 College ERP System (Node.js + Express + MongoDB)

A simple **ERP system for Colleges** where colleges can register themselves, generate a unique ERP ID, login with authentication, and register students under their database.

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
- College **Login & Auth** using `jsonwebtoken` + `uniqueErpId`.
- Colleges can **register students** under their profile (protected route).
- Follows **MVC + Service + Repository** architecture.
- MongoDB schema validation.

---

## 📂 Project Structure
├── controllers
│ └── collegeController.js # Handles request/response
│ └── studentController.js # Handles student registration
├── model
│ └── CollegeModel.js # Mongoose schema for College
│ └── StudentModel.js # Mongoose schema for Student
├── repositories
│ └── collegeRepository.js # College DB operations
│ └── studentRepository.js # Student DB operations
├── routes
│ └── collegeRoute.js # College routes (register, login)
│ └── studentRoute.js # Student routes (register)
├── services
│ └── collegeService.js # College business logic
├── middleware
│ └── collegeAuthMiddleware.js # Auth verification
├── utils
│ ├── dbConnect.js # MongoDB connection
│ ├── hash.js # Hashing utility (bcryptjs)
│ └── sendMail.js # Email utility (nodemailer)
├── .env # Environment variables
├── index.js # Main server file
└── README.md



## 🛠️ Tech Stack
- **Node.js** (Backend runtime)
- **Express.js** (Server framework)
- **MongoDB + Mongoose** (Database + ODM)
- **bcryptjs** (Hashing)
- **jsonwebtoken** (Auth)
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


npm install
Setup .env file:

env

PORT=3000
MONGO_URI=mongodb://localhost:27017/college-erp
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
Run server:

npm start
Server should be running at:


http://localhost:3000
📌 API Endpoints
🔹 Register College
http


POST /api/college/register
Request Body:


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
✅ Response:

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

🔹 College Login

POST /api/college/login
Request Body:


{
  "collegeId": "NIT001",
  "uniqueErpId": "LAYt4U"
}
✅ Response:


{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
🔹 Register Student (Authenticated)
http

POST /api/student/register
Request Body:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "college": "68b9dc4372793763cf105b17",
  "collegeErpId": "LAYt4U",
  "name": "Amit Kumar",
  "studentId": "STU12345",
  "courseId": "CSE101",
  "totalFee": 100000,
  "paidFee": 45000,
  "totalAttendance": 180,
  "currentAttendance": 150
}
✅ Response:


{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "_id": "6500...7a",
    "name": "Amit Kumar",
    "studentId": "STU12345",
    "courseId": "CSE101",
    "college": "68b9dc4372793763cf105b17",
    "paidFee": 45000,
    "totalFee": 100000,
    "currentAttendance": 150,
    "totalAttendance": 180
  }
}
📧 Email Example
Subject: Your College ERP Registration
Body:


Dear National Institute of Technology,

Your ERP ID is: LAYt4U
Please keep this safe for future login.
🚀 Next Steps
Student login using Student ID + College ERP ID.

Attendance and fee management module.

College dashboard with student insights.

Admin dashboard for managing multiple colleges.






# 📘 College ERP System – Next Features

## ✅ Completed so far (College side)
- College can **register itself**
- College can **log in**
- College can **register students**
- College can **register faculty**

---

## 🔑 Essential Next Features

### 1. 🎓 Student Management
- View all students in the college  
- Update student details (course, year, phone, etc.)  
- Delete student (if they leave the college)  
- Promote students to next academic year  
- Manage student fees (due/paid/remaining)  

---

### 2. 👨‍🏫 Faculty Management
- View all faculty  
- Update faculty details (designation, department, salary, etc.)  
- Remove faculty  
- Track faculty attendance  
- Assign subjects/courses to faculty  

---

### 3. 📚 Course & Department Management
- Add/Edit/Delete courses  
- Assign courses to departments  
- Assign students to courses  
- Map faculty to courses  

---

### 4. 📝 Attendance System
- Mark student attendance  
- Mark faculty attendance  
- Generate attendance reports (per student/faculty/subject)  

---

### 5. 🏫 Exam & Results
- Add exam schedules (Mid, End semester, etc.)  
- Faculty can upload student marks  
- College can publish results  
- Students can view results  

---

### 6. 💰 Payments & Finance
- Student fee management (due/paid/remaining)  
- Faculty salary management  
- Generate fee receipts/pay slips  

---

### 7. 🔐 Authentication & Security
- Student login (to view profile, attendance, results)  
- Faculty login (to mark attendance, upload marks)  
- College admin login (already done ✅)  
- Role-based access control (College vs Faculty vs Student)  

---

### 8. 📊 Reports & Analytics
- Student strength per course  
- Pass/Fail statistics  
- Attendance percentage per department/faculty/student  
- Financial reports  

---

## 🚀 Suggested Next Steps
1. Implement APIs to:  
   - **Get all students**  
   - **Get all faculty**  
   - **Update student/faculty**  
   - **Delete student/faculty**  

2. Start working on the **attendance system** for both students and faculty.  

---
