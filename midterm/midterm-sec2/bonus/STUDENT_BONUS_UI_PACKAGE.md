# 🎓 STUDENT MANAGEMENT - BONUS UI PACKAGE
## Client-Server Architecture (Version 2)

---

## 📋 ภาพรวม

เอกสารนี้มี UI สมบูรณ์สำหรับ **Bonus Exam - Student Management** (Client-Server Architecture)

**สำหรับ:** Bonus Version 2 - Student → Client-Server  

---

## 🎯 ความแตกต่างจาก Practical Exam

| Aspect | Practical (Layered) | Bonus (Client-Server) |
|--------|---------------------|----------------------|
| **โปรเจกต์** | 1 โปรเจกต์ | 2 โปรเจกต์แยก |
| **Frontend** | รันพร้อม Backend | รันแยก (Client) |
| **Backend** | Express + static files | API only + CORS |
| **Deploy** | รวมกัน | แยกกัน (VM + Local) |
| **Communication** | Direct | HTTP/JSON (REST API) |

---

## 🏗️ โครงสร้างโปรเจกต์

```
📦 Bonus Project
│
├── 📁 backend/          # Server (รันบน VM)
│   ├── src/
│   │   ├── presentation/
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   └── middlewares/
│   │   │       ├── cors.js       # 🆕 ใหม่!
│   │   │       └── errorHandler.js
│   │   ├── business/
│   │   └── data/
│   ├── server.js        # 🔧 แก้ไข (เพิ่ม CORS, ลบ static)
│   ├── package.json
│   └── API_TESTS.md
│
└── 📁 frontend/         # 🆕 Client (รันบน Local)
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        ├── api.js       # API Client
        └── app.js       # Main logic
```

---

## 💻 PART 1: BACKEND CHANGES

### 1️⃣ เพิ่ม CORS Middleware

**ไฟล์:** `backend/src/presentation/middlewares/cors.js` (🆕 ใหม่)

```javascript
// backend/src/presentation/middlewares/cors.js
function corsMiddleware(req, res, next) {
    // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    
    // Allow specific headers
    res.setHeader('Access-Control-Allow-Headers', 
        'Content-Type, Authorization');
    
    // Handle preflight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
}

module.exports = corsMiddleware;
```

---

### 2️⃣ แก้ไข server.js

**ไฟล์:** `backend/server.js` (🔧 แก้ไข)

```javascript
// backend/server.js
const express = require('express');
const studentRoutes = require('./src/presentation/routes/studentRoutes');
const corsMiddleware = require('./src/presentation/middlewares/cors');
const errorHandler = require('./src/presentation/middlewares/errorHandler');

const app = express();

// 🆕 CORS must come FIRST
app.use(corsMiddleware);
app.use(express.json());

// ❌ ลบบรรทัดนี้ออก (ไม่ต้องใช้ static files)
// app.use(express.static('public'));

// Routes
app.use('/api/students', studentRoutes);

// Error handling (must be LAST)
app.use(errorHandler);

// 🆕 Listen on 0.0.0.0 (สำคัญสำหรับ VM)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║  Student API Server (Client-Server)          ║
║  Server running on http://0.0.0.0:${PORT}     ║
║  API Endpoints: http://localhost:${PORT}/api  ║
╚═══════════════════════════════════════════════╝
    `);
});
```

---

### 3️⃣ API Tests Document

**ไฟล์:** `backend/API_TESTS.md` (🆕 ใหม่)

```markdown
# API Tests - Student Management

## Base URL
\`\`\`
http://localhost:3000/api
\`\`\`

## Endpoints

### 1. Get All Students
\`\`\`bash
curl http://localhost:3000/api/students
\`\`\`

**Expected:**
\`\`\`json
{
  "students": [...],
  "statistics": {
    "active": 0,
    "graduated": 0,
    "suspended": 0,
    "total": 0,
    "averageGPA": 0.00
  }
}
\`\`\`

### 2. Create Student
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

### 3. Update GPA
\`\`\`bash
curl -X PATCH http://localhost:3000/api/students/1/gpa \
  -H "Content-Type: application/json" \
  -d '{"gpa": 3.75}'
\`\`\`

### 4. Change Status
\`\`\`bash
curl -X PATCH http://localhost:3000/api/students/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "graduated"}'
\`\`\`

### 5. Delete Student
\`\`\`bash
curl -X DELETE http://localhost:3000/api/students/1
\`\`\`
```

---

## 🌐 PART 2: FRONTEND (CLIENT)

### ไฟล์ที่ 1: `frontend/index.html`

```html
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management - Client</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🎓 Student Management System</h1>
            <span class="badge">🌐 Client-Server Architecture</span>
        </header>
        
        <div class="toolbar">
            <button class="btn btn-primary" id="add-btn">
                ➕ Add New Student
            </button>
            
            <div class="filters">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="active">Active</button>
                <button class="filter-btn" data-filter="graduated">Graduated</button>
                <button class="filter-btn" data-filter="suspended">Suspended</button>
                <button class="filter-btn" data-filter="withdrawn">Withdrawn</button>
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
                <h3 id="stat-gpa">0.00</h3>
                <p>Avg GPA</p>
            </div>
        </div>
        
        <div id="loading" class="loading">Loading students...</div>
        
        <div id="student-list" class="student-grid"></div>
    </div>
    
    <!-- Add/Edit Student Modal -->
    <div id="student-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Add New Student</h2>
                <span class="close">&times;</span>
            </div>
            <form id="student-form">
                <input type="hidden" id="student-id">
                
                <div class="form-group">
                    <label for="student_code">Student Code * (10 digits)</label>
                    <input type="text" id="student_code" required pattern="\d{10}">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="first_name">First Name *</label>
                        <input type="text" id="first_name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="last_name">Last Name *</label>
                        <input type="text" id="last_name" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" required>
                </div>
                
                <div class="form-group">
                    <label for="major">Major *</label>
                    <select id="major" required>
                        <option value="">-- Select Major --</option>
                        <option value="CS">Computer Science (CS)</option>
                        <option value="SE">Software Engineering (SE)</option>
                        <option value="IT">Information Technology (IT)</option>
                        <option value="CE">Computer Engineering (CE)</option>
                        <option value="DS">Data Science (DS)</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">💾 Save</button>
                    <button type="button" class="btn btn-secondary" id="cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Update GPA Modal -->
    <div id="gpa-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Update GPA</h2>
                <span class="close" id="gpa-close">&times;</span>
            </div>
            <form id="gpa-form">
                <input type="hidden" id="gpa-student-id">
                
                <div class="form-group">
                    <label for="gpa">New GPA * (0.0 - 4.0)</label>
                    <input type="number" id="gpa" required min="0" max="4" step="0.01">
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Update GPA</button>
                    <button type="button" class="btn btn-secondary" id="gpa-cancel">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Update Status Modal -->
    <div id="status-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Update Status</h2>
                <span class="close" id="status-close">&times;</span>
            </div>
            <form id="status-form">
                <input type="hidden" id="status-student-id">
                
                <div class="form-group">
                    <label for="status">New Status *</label>
                    <select id="status" required>
                        <option value="">-- Select Status --</option>
                        <option value="active">Active</option>
                        <option value="graduated">Graduated</option>
                        <option value="suspended">Suspended</option>
                        <option value="withdrawn">Withdrawn</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Update Status</button>
                    <button type="button" class="btn btn-secondary" id="status-cancel">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    
    <script src="js/api.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

---

### ไฟล์ที่ 2: `frontend/css/style.css`

**💡 Tip:** Copy ทั้งหมดจาก `STUDENT_UI_PACKAGE.md` ส่วน Monolithic UI (style tag)

```css
/* Copy all CSS from STUDENT_UI_PACKAGE.md */
/* โค้ด CSS ยาวมาก ให้ copy จาก Monolithic version */
```

---

### ไฟล์ที่ 3: `frontend/js/api.js`

```javascript
// frontend/js/api.js - API Client for Student Management
class StudentAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async getAllStudents(major = null, status = null) {
        let url = `${this.baseURL}/students`;
        const params = [];
        
        if (major) params.push(`major=${major}`);
        if (status) params.push(`status=${status}`);
        
        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }
        return await response.json();
    }
    
    async getStudentById(id) {
        const response = await fetch(`${this.baseURL}/students/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch student');
        }
        return await response.json();
    }
    
    async createStudent(studentData) {
        const response = await fetch(`${this.baseURL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async updateStudent(id, studentData) {
        const response = await fetch(`${this.baseURL}/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async updateGPA(id, gpa) {
        const response = await fetch(`${this.baseURL}/students/${id}/gpa`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gpa })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async updateStatus(id, status) {
        const response = await fetch(`${this.baseURL}/students/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async deleteStudent(id) {
        const response = await fetch(`${this.baseURL}/students/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
}

// 🆕 สำคัญ! เปลี่ยน URL ตาม environment
const API_BASE_URL = 'http://localhost:3000/api';  // Local testing
// const API_BASE_URL = 'http://<VM-IP>:3000/api';  // Production (ใช้ IP ของ VM)

const api = new StudentAPI(API_BASE_URL);
```

---

### ไฟล์ที่ 4: `frontend/js/app.js`

**💡 Tip:** Copy และแก้ไขจาก `STUDENT_UI_PACKAGE.md` ส่วน Monolithic UI (script tag)

```javascript
// frontend/js/app.js - Main Application Logic
// Copy from STUDENT_UI_PACKAGE.md และแก้ไขเล็กน้อย
```

---

## 🧪 PART 3: วิธีทดสอบ

### 1️⃣ ทดสอบ Backend (API Server)

```bash
# Terminal 1: Start Backend Server
cd backend
npm install
npm start

# Terminal 2: Test APIs
curl http://localhost:3000/api/students

# ✅ ต้องได้ JSON response
```

---

### 2️⃣ ทดสอบ Frontend (Client)

```bash
# Terminal 3: Start Frontend
cd frontend
python3 -m http.server 8000

# เปิด browser:
http://localhost:8000
```

---

### 3️⃣ ทดสอบ Client-Server Communication

**ใน Browser (F12 → Network Tab):**

```
1. เปิด Network Tab
2. กด "Add New Student"
3. กรอกข้อมูล → Save

✅ ต้องเห็น:
   - Request: POST http://localhost:3000/api/students
   - Status: 201 Created
   - Response: {...student data...}

4. คลิก "Update GPA"

✅ ต้องเห็น:
   - Request: PATCH http://localhost:3000/api/students/1/gpa
   - Status: 200 OK
   - Response: {gpa: 3.75}
```

---

## 📊 PART 4: Deployment

### Backend (VM)

```bash
# 1. Upload โปรเจกต์ไปยัง VM
scp -r backend/ user@vm-ip:/home/user/

# 2. SSH เข้า VM
ssh user@vm-ip

# 3. Setup
cd backend
npm install
npm start

# 4. ดู IP ของ VM
ip addr show

# ตัวอย่าง IP: 192.168.1.100
```

---

### Frontend (Local)

```bash
# 1. แก้ไข frontend/js/api.js
const API_BASE_URL = 'http://192.168.1.100:3000/api';  // ใช้ IP ของ VM

# 2. รัน Frontend
cd frontend
python3 -m http.server 8000

# 3. เปิด browser
http://localhost:8000

# ✅ Frontend (Local) → Backend (VM)
```

---

## ✅ Checklist

### Backend:
- [ ] มี CORS middleware
- [ ] server.js แก้ไขแล้ว
- [ ] API ทำงานได้ (test ด้วย curl)
- [ ] มี API_TESTS.md

### Frontend:
- [ ] มี 4 ไฟล์ครบ
- [ ] api.js มี baseURL ถูกต้อง
- [ ] รันได้ด้วย http-server
- [ ] UI แสดงผลถูกต้อง

### Communication:
- [ ] Frontend เรียก Backend ได้
- [ ] CORS ไม่มี error
- [ ] Network Tab แสดง requests
- [ ] CRUD + Update GPA + Change Status ทำงานได้

---

## 🎯 สรุป

### ความแตกต่างจาก Layered:

| Aspect | Layered | Client-Server |
|--------|---------|---------------|
| **โปรเจกต์** | 1 | 2 แยก |
| **CORS** | ไม่ต้อง | ✅ ต้องมี |
| **Deploy** | รวมกัน | แยกกัน |

---

## 📝 Video Demo Requirements

**ต้องแสดง:**
1. ✅ Backend รันบน VM
2. ✅ Frontend รันบน Local
3. ✅ Demo: Add, Update GPA, Change Status, Delete
4. ✅ แสดง Network Tab
5. ✅ อธิบาย Client-Server communication

---

**จัดทำโดย:** อาจารย์ธนิต เกตุแก้ว  
**วิชา:** ENGSE207 สถาปัตยกรรมซอฟต์แวร์  
**สำหรับ:** Bonus Exam - Student Management (Client-Server)
