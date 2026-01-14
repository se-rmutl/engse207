# 🎁 ENGSE207 Software Architecture - MIDTERM BONUS EXAM
## ข้อสอบ Bonus: Client-Server Architecture (Version 2)

---

### 📋 ข้อมูลการสอบ
- **รหัสวิชา:** ENGSE207
- **ชื่อวิชา:** สถาปัตยกรรมซอฟต์แวร์ (Software Architecture)
- **ประเภทข้อสอบ:** Bonus - Client-Server Refactoring
- **เวลาที่ใช้:** ไม่จำกัด (ส่งภายใน 3 วัน)
- **คะแนน Bonus:** 10 คะแนน
- **รูปแบบ:** Open Book, Open Internet, Open AI

---

### 👤 ข้อมูลนักศึกษา

**ชื่อ-นามสกุล:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**รหัสนักศึกษา:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**หมู่เรียน:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 🎯 วัตถุประสงค์

ข้อสอบ Bonus นี้เป็นการต่อยอดจาก **ข้อสอบปฏิบัติเดี่ยว** โดยนำระบบ **Student Management** ที่เป็น **Layered Architecture** มา Refactor เป็น **Client-Server Architecture**

### จุดประสงค์:
1. ✅ เรียนรู้วิธี Refactor Layered → Client-Server
2. ✅ แยก Frontend และ Backend เป็นโปรเจกต์แยกกัน
3. ✅ สร้าง RESTful API
4. ✅ เข้าใจการสื่อสารระหว่าง Client-Server ผ่าน HTTP
5. ✅ Deploy Backend บน VM และ Frontend บน Local

---

## 📌 สถานการณ์โจทย์

คุณได้ทำระบบ **Student Management System** ที่เป็น **Layered Architecture** เสร็จแล้วจากข้อสอบปฏิบัติเดี่ยว แต่ตอนนี้:

### 🔴 ข้อจำกัดของ Layered Architecture ปัจจุบัน:

1. **Frontend และ Backend ผูกติดกัน** - ไม่สามารถแยกพัฒนาได้
2. **ไม่มี API สำหรับ Mobile App** - ถ้าต้องการทำ Mobile ต้องเขียนใหม่
3. **Deploy ยาก** - ต้อง deploy ทั้งระบบพร้อมกัน
4. **Scale ไม่ได้** - ไม่สามารถ scale Frontend และ Backend แยกกัน

### 🎯 เป้าหมาย:

Refactor เป็น **Client-Server Architecture** โดย:
- ✅ **Backend (Server)** - REST API บน VM (Node.js + Express + SQLite)
- ✅ **Frontend (Client)** - Web UI บน Local (HTML + CSS + JavaScript)
- ✅ เพิ่ม **CORS** เพื่อให้ Client-Server คุยกันได้
- ✅ แยก **Frontend และ Backend เป็น 2 โปรเจกต์**

---

## 📁 โครงสร้างโปรเจกต์ใหม่

```
midterm-bonus-<รหัสนักศึกษา>/
├── backend/                      # Server (รันบน VM)
│   ├── src/
│   │   ├── presentation/
│   │   │   ├── routes/
│   │   │   │   └── studentRoutes.js
│   │   │   ├── controllers/
│   │   │   │   └── studentController.js
│   │   │   └── middlewares/
│   │   │       ├── cors.js       # 🆕 CORS middleware
│   │   │       └── errorHandler.js
│   │   ├── business/
│   │   │   ├── services/
│   │   │   │   └── studentService.js
│   │   │   └── validators/
│   │   │       └── studentValidator.js
│   │   └── data/
│   │       ├── repositories/
│   │       │   └── studentRepository.js
│   │       └── database/
│   │           └── connection.js
│   ├── server.js                 # 🆕 แก้ไขเพื่อรองรับ CORS
│   ├── package.json
│   ├── students.db
│   └── README.md
│
├── frontend/                     # 🆕 Client (รันบน Local)
│   ├── index.html               # หน้าหลัก
│   ├── css/
│   │   └── style.css           # Styles
│   ├── js/
│   │   ├── api.js              # API Client
│   │   ├── app.js              # Main app logic
│   │   └── components/
│   │       ├── studentList.js   # Student list component
│   │       └── studentForm.js   # Student form component
│   └── README.md
│
└── README.md                     # Project README
```

---

## 📝 งานที่ต้องทำ (คะแนนรวม 10 คะแนน)

### **ส่วนที่ 1: Backend Refactoring (4 คะแนน)**

#### **1.1 เพิ่ม CORS Middleware (1 คะแนน)**

สร้างไฟล์ `backend/src/presentation/middlewares/cors.js`:

```javascript
// backend/src/presentation/middlewares/cors.js
function corsMiddleware(req, res, next) {
    // TODO: ตั้งค่า CORS headers
    // - Access-Control-Allow-Origin: * (หรือระบุ origin ที่อนุญาต)
    // - Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH
    // - Access-Control-Allow-Headers: Content-Type
    
    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
}

module.exports = corsMiddleware;
```

#### **1.2 แก้ไข server.js (1 คะแนน)**

อัปเดตไฟล์ `backend/server.js`:

```javascript
// backend/server.js
const express = require('express');
const studentRoutes = require('./src/presentation/routes/studentRoutes');
const corsMiddleware = require('./src/presentation/middlewares/cors');
const errorHandler = require('./src/presentation/middlewares/errorHandler');

const app = express();

// 🆕 Middleware
app.use(corsMiddleware);  // เพิ่ม CORS
app.use(express.json());

// 🆕 ลบ static files (ไม่ต้องใช้แล้ว)
// app.use(express.static('public'));

// Routes
app.use('/api/students', studentRoutes);

// Error handling
app.use(errorHandler);

// 🆕 แก้ PORT และ Log message
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║  Student Management System API (Server)      ║
║  Server running on http://0.0.0.0:${PORT}     ║
║  API: http://localhost:${PORT}/api/students   ║
╚═══════════════════════════════════════════════╝
    `);
});
```

#### **1.3 ปรับปรุง API Response (1 คะแนน)**

อัปเดต `backend/src/presentation/controllers/studentController.js`:

```javascript
// backend/src/presentation/controllers/studentController.js
const studentService = require('../../business/services/studentService');

class StudentController {
    
    async getAllStudents(req, res, next) {
        try {
            const { major, status } = req.query;
            const result = await studentService.getAllStudents(major, status);
            
            // 🆕 เพิ่ม metadata
            res.json({
                success: true,
                data: result,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            next(error);
        }
    }

    // TODO: อัปเดต methods อื่นๆ ให้เป็นรูปแบบเดียวกัน
    // { success: true, data: {...}, timestamp: ... }
}

module.exports = new StudentController();
```

#### **1.4 ทดสอบ API ด้วย curl หรือ Postman (1 คะแนน)**

สร้างไฟล์ `backend/API_TESTS.md` ที่มีคำสั่ง test:

```markdown
# API Tests

## 1. Get All Students
\`\`\`bash
curl http://localhost:3000/api/students
\`\`\`

## 2. Get Student by ID
\`\`\`bash
curl http://localhost:3000/api/students/1
\`\`\`

## 3. Create Student
\`\`\`bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "student_code": "6531503001",
    "first_name": "สมชาย",
    "last_name": "ใจดี",
    "email": "somchai@rmutl.ac.th",
    "major": "SE"
  }'
\`\`\`

# ... (เพิ่ม tests อื่นๆ)
```

---

### **ส่วนที่ 2: Frontend Development (5 คะแนน)**

#### **2.1 สร้าง API Client (1.5 คะแนน)**

สร้างไฟล์ `frontend/js/api.js`:

```javascript
// frontend/js/api.js
class StudentAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    // TODO: Implement API methods
    
    async getAllStudents(major = null, status = null) {
        // 1. สร้าง URL (เพิ่ม query params ถ้ามี)
        // 2. Fetch API
        // 3. Handle response
        // 4. Return data
    }
    
    async getStudentById(id) {
        // ให้นักศึกษาเขียนเอง
    }
    
    async createStudent(studentData) {
        // ให้นักศึกษาเขียนเอง
        // Method: POST
        // Headers: Content-Type: application/json
        // Body: JSON.stringify(studentData)
    }
    
    async updateStudent(id, studentData) {
        // ให้นักศึกษาเขียนเอง
        // Method: PUT
    }
    
    async updateGPA(id, gpa) {
        // ให้นักศึกษาเขียนเอง
        // Method: PATCH
        // Endpoint: /api/students/:id/gpa
        // Body: { gpa: ... }
    }
    
    async updateStatus(id, status) {
        // ให้นักศึกษาเขียนเอง
        // Method: PATCH
        // Endpoint: /api/students/:id/status
        // Body: { status: ... }
    }
    
    async deleteStudent(id) {
        // ให้นักศึกษาเขียนเอง
        // Method: DELETE
    }
}

// Export for use in other files
const api = new StudentAPI('http://localhost:3000/api');
```

**Code skeleton ตัวอย่าง:**

```javascript
async getAllStudents(major = null, status = null) {
    try {
        let url = `${this.baseURL}/students`;
        const params = [];
        
        if (major) params.push(`major=${major}`);
        if (status) params.push(`status=${status}`);
        
        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result.data;
        
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}
```

#### **2.2 สร้าง UI Components (2 คะแนน)**

**ไฟล์ `frontend/js/components/studentList.js`:**

```javascript
// frontend/js/components/studentList.js
function renderStudentList(students) {
    const container = document.getElementById('student-list');
    
    if (students.length === 0) {
        container.innerHTML = '<p>No students found</p>';
        return;
    }
    
    // TODO: สร้าง HTML สำหรับแสดงรายการนักศึกษา
    // แสดง: student_code, name, email, major, gpa, status
    // ปุ่ม: Update GPA, Change Status, Edit, Delete
    
    const html = students.map(student => `
        <div class="student-card" data-id="${student.id}">
            <div class="student-header">
                <h3>${student.first_name} ${student.last_name}</h3>
                <span class="student-code">${student.student_code}</span>
            </div>
            <div class="student-info">
                <p><strong>Email:</strong> ${student.email}</p>
                <p><strong>Major:</strong> ${student.major}</p>
                <p><strong>GPA:</strong> ${student.gpa.toFixed(2)}</p>
                <p><strong>Status:</strong> 
                    <span class="status ${student.status}">${student.status}</span>
                </p>
            </div>
            <div class="actions">
                <button onclick="showGPAModal(${student.id}, ${student.gpa})">Update GPA</button>
                <button onclick="showStatusModal(${student.id}, '${student.status}')">Change Status</button>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})" class="danger">Delete</button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}
```

**ไฟล์ `frontend/js/components/studentForm.js`:**

```javascript
// frontend/js/components/studentForm.js
function showStudentForm(student = null) {
    // TODO: แสดง Modal Form สำหรับ Create/Edit
    // - ถ้า student = null → Create mode
    // - ถ้า student มีค่า → Edit mode (pre-fill data)
}

function showGPAModal(studentId, currentGPA) {
    // TODO: แสดง Modal สำหรับอัปเดท GPA
    // - Input: GPA (0.0 - 4.0)
}

function showStatusModal(studentId, currentStatus) {
    // TODO: แสดง Modal สำหรับเปลี่ยนสถานะ
    // - Dropdown: active, graduated, suspended, withdrawn
}

function hideAllModals() {
    // TODO: ซ่อน Modal ทั้งหมด
}
```

#### **2.3 สร้าง Main App Logic (1.5 คะแนน)**

**ไฟล์ `frontend/js/app.js`:**

```javascript
// frontend/js/app.js

// Global state
let currentMajorFilter = null;
let currentStatusFilter = null;

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Student Management System - Client');
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
    await loadStudents();
});

function setupEventListeners() {
    // Major filter
    document.getElementById('major-filter').addEventListener('change', (e) => {
        currentMajorFilter = e.target.value || null;
        loadStudents();
    });
    
    // Status filter
    document.getElementById('status-filter').addEventListener('change', (e) => {
        currentStatusFilter = e.target.value || null;
        loadStudents();
    });
    
    // Add student button
    document.getElementById('add-student-btn').addEventListener('click', () => {
        showStudentForm();
    });
    
    // Form submits
    document.getElementById('student-form').addEventListener('submit', handleStudentFormSubmit);
    document.getElementById('gpa-form').addEventListener('submit', handleGPAFormSubmit);
    document.getElementById('status-form').addEventListener('submit', handleStatusFormSubmit);
}

async function loadStudents() {
    try {
        showLoading();
        
        const result = await api.getAllStudents(currentMajorFilter, currentStatusFilter);
        
        updateStatistics(result.statistics);
        renderStudentList(result.students);
        
        hideLoading();
        
    } catch (error) {
        console.error('Error loading students:', error);
        alert('Failed to load students. Please try again.');
        hideLoading();
    }
}

async function deleteStudent(id) {
    try {
        if (!confirm('Delete this student?')) return;
        
        await api.deleteStudent(id);
        alert('Student deleted successfully!');
        await loadStudents();
        
    } catch (error) {
        console.error('Error deleting student:', error);
        alert(error.message || 'Failed to delete student.');
    }
}

// TODO: Implement other functions
// - editStudent(id)
// - handleStudentFormSubmit(event)
// - handleGPAFormSubmit(event)
// - handleStatusFormSubmit(event)
// - updateStatistics(stats)
// - showLoading()
// - hideLoading()
```

---

### **ส่วนที่ 3: UI/UX Design (1 คะแนน)**

#### **3.1 สร้าง HTML Layout (0.5 คะแนน)**

**ไฟล์ `frontend/index.html`:**

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management System</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🎓 Student Management System</h1>
            <p>Client-Server Architecture Demo</p>
        </header>
        
        <div class="toolbar">
            <button id="add-student-btn" class="primary">+ Add Student</button>
            
            <div class="filters">
                <select id="major-filter">
                    <option value="">All Majors</option>
                    <option value="CS">CS</option>
                    <option value="SE">SE</option>
                    <option value="IT">IT</option>
                    <option value="CE">CE</option>
                    <option value="DS">DS</option>
                </select>
                
                <select id="status-filter">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="graduated">Graduated</option>
                    <option value="suspended">Suspended</option>
                    <option value="withdrawn">Withdrawn</option>
                </select>
            </div>
        </div>
        
        <div class="statistics">
            <div class="stat-card">
                <h3 id="stat-active">0</h3>
                <p>Active</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-graduated">0</h3>
                <p>Graduated</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-suspended">0</h3>
                <p>Suspended</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-total">0</h3>
                <p>Total</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-avg-gpa">0.00</h3>
                <p>Avg GPA</p>
            </div>
        </div>
        
        <div id="loading" class="loading" style="display: none;">
            <p>Loading...</p>
        </div>
        
        <div id="student-list" class="student-list">
            <!-- Students will be rendered here -->
        </div>
        
        <!-- Student Form Modal -->
        <div id="student-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="hideAllModals()">&times;</span>
                <h2 id="student-form-title">Add Student</h2>
                
                <form id="student-form">
                    <input type="hidden" id="student-id">
                    
                    <div class="form-group">
                        <label for="student-code">Student Code *</label>
                        <input type="text" id="student-code" required 
                               pattern="[0-9]{10}" 
                               placeholder="10 digits">
                    </div>
                    
                    <div class="form-group">
                        <label for="first-name">First Name *</label>
                        <input type="text" id="first-name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="last-name">Last Name *</label>
                        <input type="text" id="last-name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="major">Major *</label>
                        <select id="major" required>
                            <option value="">Select Major</option>
                            <option value="CS">CS</option>
                            <option value="SE">SE</option>
                            <option value="IT">IT</option>
                            <option value="CE">CE</option>
                            <option value="DS">DS</option>
                        </select>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="primary">Save</button>
                        <button type="button" onclick="hideAllModals()">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- GPA Update Modal -->
        <div id="gpa-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="hideAllModals()">&times;</span>
                <h2>Update GPA</h2>
                
                <form id="gpa-form">
                    <input type="hidden" id="gpa-student-id">
                    
                    <div class="form-group">
                        <label for="gpa">GPA (0.0 - 4.0) *</label>
                        <input type="number" id="gpa" 
                               min="0" max="4" step="0.01" required>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="primary">Update</button>
                        <button type="button" onclick="hideAllModals()">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Status Change Modal -->
        <div id="status-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="hideAllModals()">&times;</span>
                <h2>Change Status</h2>
                
                <form id="status-form">
                    <input type="hidden" id="status-student-id">
                    
                    <div class="form-group">
                        <label for="status">Status *</label>
                        <select id="status" required>
                            <option value="active">Active</option>
                            <option value="graduated">Graduated</option>
                            <option value="suspended">Suspended</option>
                            <option value="withdrawn">Withdrawn</option>
                        </select>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="primary">Change</button>
                        <button type="button" onclick="hideAllModals()">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <!-- Load JS files -->
    <script src="js/api.js"></script>
    <script src="js/components/studentList.js"></script>
    <script src="js/components/studentForm.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

#### **3.2 สร้าง CSS Styles (0.5 คะแนน)**

**ไฟล์ `frontend/css/style.css`:**

```css
/* frontend/css/style.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f5f7fa;
    padding: 20px;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

header {
    text-align: center;
    margin-bottom: 30px;
}

header h1 {
    color: #2563eb;
    margin-bottom: 10px;
}

.statistics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
}

.stat-card {
    background: #f9fafb;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

/* TODO: เพิ่ม styles สำหรับ:
   - .toolbar
   - .filters
   - .student-list
   - .student-card
   - .modal
   - .form-group
   - buttons
   - status badges
   - etc.
*/

/* ให้นักศึกษาออกแบบ CSS เอง */
```

---

### **ส่วนที่ 4: Documentation (1 คะแนน)**

#### **4.1 สร้าง README.md หลัก (0.5 คะแนน)**

**ไฟล์ `README.md`:**

```markdown
# Student Management System - Client-Server Architecture

## Project Information
- **Student Name:** [ชื่อ-นามสกุล]
- **Student ID:** [รหัสนักศึกษา]
- **Course:** ENGSE207 - Bonus Exam

## Architecture

### Before: Layered Architecture
- Single application
- Frontend + Backend ผูกติดกัน

### After: Client-Server Architecture
- **Backend:** REST API (Node.js + Express + SQLite)
- **Frontend:** Web Client (HTML + CSS + JavaScript)
- **Communication:** HTTP/JSON

## Project Structure

\`\`\`
midterm-bonus-<รหัส>/
├── backend/         # Server (VM)
└── frontend/        # Client (Local)
\`\`\`

## How to Run

### Backend (Server - VM)
\`\`\`bash
cd backend
npm install
npm start
# Server: http://localhost:3000
\`\`\`

### Frontend (Client - Local)
\`\`\`bash
cd frontend
# Open index.html in browser
# Or use: python3 -m http.server 8000
\`\`\`

## API Endpoints

[ระบุ endpoints ทั้งหมด]

## Screenshots

[เพิ่ม screenshots ของ UI]
```

#### **4.2 อธิบายความแตกต่าง Layered vs Client-Server (0.5 คะแนน)**

สร้างไฟล์ `ARCHITECTURE_COMPARISON.md`:

```markdown
# Architecture Comparison

## Layered Architecture (Before)

### Pros:
- [ระบุข้อดี]

### Cons:
- [ระบุข้อเสีย]

## Client-Server Architecture (After)

### Pros:
- [ระบุข้อดี]

### Cons:
- [ระบุข้อเสีย]

## Changes Made

### 1. Separation
- แยก Frontend และ Backend เป็น 2 โปรเจกต์

### 2. Communication
- ใช้ REST API (HTTP/JSON)

### 3. CORS
- เพิ่ม CORS middleware เพื่อให้ Client-Server คุยกันได้

### 4. API Response Format
- มาตรฐาน: { success, data, timestamp }
```

---

## 📤 การส่งงาน

### **Step 1-3:** [เหมือน Version 1]

### **Step 4: Record Demo Video (สำคัญ!)**

📹 **ต้องบันทึก Video Demo (2-3 นาที) แสดง:**

1. ✅ Backend รันบน VM (แสดง terminal)
2. ✅ Frontend รันบน Local (แสดง browser)
3. ✅ Demo การใช้งาน:
   - ดูรายการนักศึกษา
   - Filter ตาม Major และ Status
   - เพิ่มนักศึกษา
   - อัปเดท GPA
   - เปลี่ยนสถานะ
   - ลบนักศึกษา
4. ✅ แสดง Network Tab ใน Browser (เห็น API calls)

**Upload Video ไปที่:** YouTube (Unlisted) หรือ Google Drive

### **Step 5: Submit**

ส่งผ่าน LMS:
1. GitHub URL
2. Video Demo URL

---

## 🎯 เกณฑ์การให้คะแนน (10 คะแนน)

| หัวข้อ | คะแนน | รายละเอียด |
|--------|-------|-----------|
| **Backend Refactoring** | 4 | CORS (1), server.js (1), API Response (1), Tests (1) |
| **Frontend Development** | 5 | API Client (1.5), Components (2), App Logic (1.5) |
| **UI/UX Design** | 1 | HTML (0.5), CSS (0.5) |
| **Documentation** | 1 | README (0.5), Comparison (0.5) |
| **Bonus** | +1 | Video Demo ที่ดี |

---

## ✅ Checklist ก่อนส่ง


## ✅ Checklist ก่อนส่ง

### Backend
- [ ] มี CORS middleware
- [ ] API ทุกตัวทำงานได้
- [ ] Response format สม่ำเสมอ
- [ ] มี API_TESTS.md

### Frontend
- [ ] API Client ครบทุก method
- [ ] UI ใช้งานได้จริง
- [ ] แสดง Loading state
- [ ] Error handling

### Documentation
- [ ] README.md อธิบายชัดเจน
- [ ] ARCHITECTURE_COMPARISON.md
- [ ] มี Screenshots

### Demo Video
- [ ] แสดง Backend บน VM
- [ ] แสดง Frontend บน Local
- [ ] Demo การใช้งาน
- [ ] แสดง Network Tab

### Git
- [ ] มี commits หลายครั้ง
- [ ] Push ไปยัง GitHub
- [ ] ส่ง URL ผ่าน email

---

## 💡 Tips

### การ Debug CORS:
```javascript
// ตรวจสอบว่า CORS headers ถูกต้อง
console.log(response.headers.get('Access-Control-Allow-Origin'));
```

### การ Test API:
```bash
# Test จาก local
curl http://localhost:3000/api/books

# Test จาก IP ของ VM
curl http://<VM-IP>:3000/api/books
```

### การรัน Frontend:
```bash
# วิธีที่ 1: เปิดไฟล์ HTML ตรงๆ
open index.html

# วิธีที่ 2: ใช้ local server
python3 -m http.server 8000
# แล้วเปิด http://localhost:8000
```

## ⏰ กำหนดส่ง

**หมดเวลา:** 3 วันหลังประกาศข้อสอบ  
**ส่งช้า:** ไม่รับ

---

**ขอให้ทำงานสนุกและได้คะแนน Bonus! 🎉**

---

**จัดทำโดย:** อาจารย์ธนิต เกตุแก้ว  
**วิชา:** ENGSE207 สถาปัตยกรรมซอฟต์แวร์  
**ภาคเรียนที่:** 2/2568
