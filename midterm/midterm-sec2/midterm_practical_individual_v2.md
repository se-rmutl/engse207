# 💻 ENGSE207 Software Architecture - MIDTERM PRACTICAL EXAM (Individual)
## ข้อสอบปฏิบัติเดี่ยว - Version 2

---

### 📋 ข้อมูลการสอบ
- **รหัสวิชา:** ENGSE207
- **ชื่อวิชา:** สถาปัตยกรรมซอฟต์แวร์ (Software Architecture)
- **ประเภทข้อสอบ:** ปฏิบัติเดี่ยว (Individual Practical)
- **เวลาที่ใช้:** 180 นาที (3 ชั่วโมง)
- **คะแนนเต็ม:** 15 คะแนน
- **รูปแบบ:** Open Book, Open Internet, Open AI

---

### 👤 ข้อมูลนักศึกษา

**ชื่อ-นามสกุล:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**รหัสนักศึกษา:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**หมู่เรียน:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 📌 สถานการณ์โจทย์

บริษัท EduSoft มีระบบ **Student Management System (ระบบจัดการนักศึกษา)** แบบ Monolithic ที่กำลังเริ่มมีปัญหา:

### 🔴 ปัญหาปัจจุบัน:

1. **Code ยุ่งเหยิง** - โค้ดทั้งหมดอยู่ในไฟล์เดียว (server.js) มากกว่า 450 บรรทัด
2. **ยากต่อการบำรุงรักษา** - แก้โค้ดส่วนหนึ่ง ต้องระวังไม่ให้กระทบส่วนอื่น
3. **ทำงานร่วมกันยาก** - Developer หลายคนแก้ไฟล์เดียวกัน เกิด conflict บ่อย
4. **ไม่มี Separation of Concerns** - Business logic ปนกับ Data access ปนกับ HTTP handling

### 🎯 เป้าหมาย:

คุณได้รับมอบหมายให้ **Refactor** ระบบจาก **Monolithic** เป็น **Layered Architecture (3-tier)** เพื่อ:
- ✅ แยก Concerns ชัดเจน (Presentation, Business, Data)
- ✅ ง่ายต่อการบำรุงรักษา
- ✅ ทีมสามารถทำงานแยกกันได้ (แต่ละ layer)
- ✅ เตรียมพร้อมสำหรับการขยายระบบในอนาคต

---

## 💻 โค้ดเริ่มต้น (Monolithic - มีปัญหา)

### ไฟล์: `server.js` (Monolithic)

```javascript
// server.js - Monolithic Student Management System
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Database connection (ปนกับทุกอย่าง)
const db = new sqlite3.Database('./students.db', (err) => {
    if (err) console.error('Database error:', err);
    else console.log('Connected to SQLite database');
});

// Create tables if not exists
db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_code TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    major TEXT NOT NULL,
    gpa REAL DEFAULT 0.0,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// ===== API ENDPOINTS =====

// GET /api/students - ดึงนักศึกษาทั้งหมด
app.get('/api/students', (req, res) => {
    // Validation (ปนกับ HTTP handling)
    const { major, status } = req.query;
    
    // Database query (ปนกับทุกอย่าง)
    let sql = 'SELECT * FROM students';
    let params = [];
    let conditions = [];
    
    if (major) {
        conditions.push('major = ?');
        params.push(major);
    }
    
    if (status) {
        conditions.push('status = ?');
        params.push(status);
    }
    
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        // Business logic: คำนวณสถิติ (ปนกับทุกอย่าง)
        const active = rows.filter(s => s.status === 'active').length;
        const graduated = rows.filter(s => s.status === 'graduated').length;
        const suspended = rows.filter(s => s.status === 'suspended').length;
        const avgGPA = rows.length > 0 
            ? (rows.reduce((sum, s) => sum + s.gpa, 0) / rows.length).toFixed(2)
            : 0;
        
        res.json({
            students: rows,
            statistics: { 
                active, 
                graduated, 
                suspended, 
                total: rows.length,
                averageGPA: parseFloat(avgGPA)
            }
        });
    });
});

// GET /api/students/:id - ดึงนักศึกษาคนเดียว
app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Validation
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid student ID' });
    }
    
    // Database query
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.json(row);
    });
});

// POST /api/students - เพิ่มนักศึกษาใหม่
app.post('/api/students', (req, res) => {
    const { student_code, first_name, last_name, email, major } = req.body;
    
    // Validation (ปนกับ HTTP handling)
    if (!student_code || !first_name || !last_name || !email || !major) {
        return res.status(400).json({ 
            error: 'student_code, first_name, last_name, email, and major are required' 
        });
    }
    
    // Business logic: validate student code format (ปนกับทุกอย่าง)
    // Format: YYXXXXX (e.g., 6531503001)
    const codePattern = /^\d{10}$/;
    if (!codePattern.test(student_code)) {
        return res.status(400).json({ 
            error: 'Invalid student code format (must be 10 digits)' 
        });
    }
    
    // Business logic: validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ 
            error: 'Invalid email format' 
        });
    }
    
    // Business logic: validate major
    const validMajors = ['CS', 'SE', 'IT', 'CE', 'DS'];
    if (!validMajors.includes(major)) {
        return res.status(400).json({ 
            error: 'Invalid major. Must be one of: CS, SE, IT, CE, DS' 
        });
    }
    
    // Database insert (ปนกับทุกอย่าง)
    const sql = 'INSERT INTO students (student_code, first_name, last_name, email, major) VALUES (?, ?, ?, ?, ?)';
    
    db.run(sql, [student_code, first_name, last_name, email, major], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(409).json({ 
                    error: 'Student code or email already exists' 
                });
            }
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        // Get the created student
        db.get('SELECT * FROM students WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json(row);
        });
    });
});

// PUT /api/students/:id - อัพเดทนักศึกษา
app.put('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { student_code, first_name, last_name, email, major } = req.body;
    
    // Validation
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid student ID' });
    }
    
    if (!student_code || !first_name || !last_name || !email || !major) {
        return res.status(400).json({ 
            error: 'All fields are required' 
        });
    }
    
    // Business logic: validate formats
    const codePattern = /^\d{10}$/;
    if (!codePattern.test(student_code)) {
        return res.status(400).json({ 
            error: 'Invalid student code format' 
        });
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ 
            error: 'Invalid email format' 
        });
    }
    
    const validMajors = ['CS', 'SE', 'IT', 'CE', 'DS'];
    if (!validMajors.includes(major)) {
        return res.status(400).json({ 
            error: 'Invalid major' 
        });
    }
    
    // Check if student exists
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        // Update student
        const sql = 'UPDATE students SET student_code = ?, first_name = ?, last_name = ?, email = ?, major = ? WHERE id = ?';
        
        db.run(sql, [student_code, first_name, last_name, email, major, id], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(409).json({ 
                        error: 'Student code or email already exists' 
                    });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            
            // Return updated student
            db.get('SELECT * FROM students WHERE id = ?', [id], (err, updatedRow) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                res.json(updatedRow);
            });
        });
    });
});

// PATCH /api/students/:id/gpa - อัพเดท GPA
app.patch('/api/students/:id/gpa', (req, res) => {
    const id = parseInt(req.params.id);
    const { gpa } = req.body;
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid student ID' });
    }
    
    // Business logic: validate GPA range
    if (gpa === undefined || gpa < 0 || gpa > 4.0) {
        return res.status(400).json({ 
            error: 'GPA must be between 0.0 and 4.0' 
        });
    }
    
    // Check if student exists
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        // Update GPA
        db.run('UPDATE students SET gpa = ? WHERE id = ?', 
            [gpa, id], 
            function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                
                // Return updated student
                db.get('SELECT * FROM students WHERE id = ?', [id], (err, updatedRow) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }
                    res.json(updatedRow);
                });
            }
        );
    });
});

// PATCH /api/students/:id/status - เปลี่ยนสถานะ
app.patch('/api/students/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid student ID' });
    }
    
    // Business logic: validate status
    const validStatuses = ['active', 'graduated', 'suspended', 'withdrawn'];
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ 
            error: 'Invalid status. Must be one of: active, graduated, suspended, withdrawn' 
        });
    }
    
    // Check if student exists
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        // Business logic: cannot change status of withdrawn student
        if (row.status === 'withdrawn') {
            return res.status(400).json({ 
                error: 'Cannot change status of withdrawn student' 
            });
        }
        
        // Update status
        db.run('UPDATE students SET status = ? WHERE id = ?', 
            [status, id], 
            function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                
                // Return updated student
                db.get('SELECT * FROM students WHERE id = ?', [id], (err, updatedRow) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }
                    res.json(updatedRow);
                });
            }
        );
    });
});

// DELETE /api/students/:id - ลบนักศึกษา
app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid student ID' });
    }
    
    // Business logic: cannot delete active student
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        if (row.status === 'active') {
            return res.status(400).json({ 
                error: 'Cannot delete active student. Change status first.' 
            });
        }
        
        // Delete student
        db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            
            res.json({ message: 'Student deleted successfully' });
        });
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Student Management System running on http://localhost:${PORT}`);
});
```

---

## 📝 งานที่ต้องทำ (คะแนนรวม 15 คะแนน)

### **ส่วนที่ 1: Refactor เป็น Layered Architecture (7 คะแนน)**

คุณต้อง Refactor โค้ด Monolithic ข้างต้นเป็น **Layered Architecture (3-tier)** โดยแบ่งเป็น:

#### **1.1 สร้างโครงสร้างโฟลเดอร์ (1 คะแนน)**

สร้างโครงสร้างดังนี้:

```
midterm-individual-<รหัสนักศึกษา>/
├── src/
│   ├── presentation/              # Layer 1: Presentation
│   │   ├── routes/
│   │   │   └── studentRoutes.js   # กำหนด routes
│   │   ├── controllers/
│   │   │   └── studentController.js # Handle HTTP requests/responses
│   │   └── middlewares/
│   │       └── errorHandler.js     # Error handling middleware
│   │
│   ├── business/                  # Layer 2: Business Logic
│   │   ├── services/
│   │   │   └── studentService.js   # Business logic & rules
│   │   └── validators/
│   │       └── studentValidator.js # Validation logic
│   │
│   └── data/                      # Layer 3: Data Access
│       ├── repositories/
│       │   └── studentRepository.js # Database operations
│       └── database/
│           └── connection.js       # Database connection
│
├── server.js                      # Entry point
├── package.json
├── students.db                    # SQLite database
└── README.md                      # Documentation
```

#### **1.2 Implement Presentation Layer (2 คะแนน)**

**📁 `src/presentation/controllers/studentController.js`**

```javascript
// src/presentation/controllers/studentController.js
const studentService = require('../../business/services/studentService');

class StudentController {
    // TODO: Implement getAllStudents
    async getAllStudents(req, res, next) {
        try {
            const { major, status } = req.query;
            // เรียก studentService.getAllStudents()
            // ส่ง response กลับ
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement getStudentById
    async getStudentById(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement createStudent
    async createStudent(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement updateStudent
    async updateStudent(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement updateGPA
    async updateGPA(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement updateStatus
    async updateStatus(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement deleteStudent
    async deleteStudent(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }
}

module.exports = new StudentController();
```

**📁 `src/presentation/routes/studentRoutes.js`**

```javascript
// src/presentation/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// TODO: Define routes
// GET /api/students
router.get('/', studentController.getAllStudents);

// GET /api/students/:id
// POST /api/students
// PUT /api/students/:id
// PATCH /api/students/:id/gpa
// PATCH /api/students/:id/status
// DELETE /api/students/:id

// ให้นักศึกษาเขียนเองต่อที่นี่

module.exports = router;
```

**📁 `src/presentation/middlewares/errorHandler.js`**

```javascript
// src/presentation/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    
    // TODO: Handle different error types
    // - ValidationError → 400
    // - NotFoundError → 404
    // - ConflictError → 409
    // - Default → 500
    
    res.status(500).json({
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;
```

#### **1.3 Implement Business Layer (2 คะแนน)**

**📁 `src/business/services/studentService.js`**

ให้คุณสร้าง Service ที่:
- รับ data จาก Controller
- Validate ผ่าน Validator
- ประมวลผล Business logic
- เรียก Repository เพื่อเข้าถึง Database
- Return ผลลัพธ์กลับไปที่ Controller

**Code skeleton:**

```javascript
// src/business/services/studentService.js
const studentRepository = require('../../data/repositories/studentRepository');
const studentValidator = require('../validators/studentValidator');

class StudentService {
    // TODO: Implement getAllStudents
    async getAllStudents(major = null, status = null) {
        // 1. Validate filters (if provided)
        // 2. เรียก studentRepository.findAll(major, status)
        // 3. คำนวณสถิติ (active, graduated, suspended, total, avgGPA)
        // 4. return { students, statistics }
    }

    // TODO: Implement getStudentById
    async getStudentById(id) {
        // 1. Validate ID
        // 2. เรียก repository
        // 3. ถ้าไม่เจอ throw NotFoundError
        // 4. return student
    }

    // TODO: Implement createStudent
    async createStudent(studentData) {
        // 1. Validate student data
        // 2. Validate student_code format
        // 3. Validate email format
        // 4. Validate major
        // 5. เรียก repository.create()
        // 6. return created student
    }

    // TODO: Implement updateStudent
    async updateStudent(id, studentData) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement updateGPA
    async updateGPA(id, gpa) {
        // 1. Validate GPA range (0.0 - 4.0)
        // 2. ดึงนักศึกษาจาก repository
        // 3. เรียก repository.updateGPA(id, gpa)
        // 4. return updated student
    }

    // TODO: Implement updateStatus
    async updateStatus(id, status) {
        // 1. Validate status
        // 2. ดึงนักศึกษาจาก repository
        // 3. ตรวจสอบ business rule: ไม่สามารถเปลี่ยนสถานะ withdrawn ได้
        // 4. เรียก repository.updateStatus(id, status)
        // 5. return updated student
    }

    // TODO: Implement deleteStudent
    async deleteStudent(id) {
        // 1. ดึงนักศึกษาจาก repository
        // 2. ตรวจสอบ business rule: ไม่สามารถลบ active student
        // 3. เรียก repository.delete(id)
    }
}

module.exports = new StudentService();
```

**📁 `src/business/validators/studentValidator.js`**

```javascript
// src/business/validators/studentValidator.js
class StudentValidator {
    validateStudentData(data) {
        const { student_code, first_name, last_name, email, major } = data;
        
        if (!student_code || !first_name || !last_name || !email || !major) {
            throw new Error('All fields are required');
        }
        
        return true;
    }
    
    validateStudentCode(code) {
        // TODO: Validate student code format
        // Format: YYXXXXX (10 digits)
        const codePattern = /^\d{10}$/;
        
        if (!codePattern.test(code)) {
            throw new Error('Invalid student code format (must be 10 digits)');
        }
        
        return true;
    }
    
    validateEmail(email) {
        // TODO: Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(email)) {
            throw new Error('Invalid email format');
        }
        
        return true;
    }
    
    validateMajor(major) {
        // TODO: Validate major
        const validMajors = ['CS', 'SE', 'IT', 'CE', 'DS'];
        
        if (!validMajors.includes(major)) {
            throw new Error('Invalid major. Must be one of: CS, SE, IT, CE, DS');
        }
        
        return true;
    }
    
    validateGPA(gpa) {
        // TODO: Validate GPA range
        if (gpa < 0 || gpa > 4.0) {
            throw new Error('GPA must be between 0.0 and 4.0');
        }
        
        return true;
    }
    
    validateStatus(status) {
        // TODO: Validate status
        const validStatuses = ['active', 'graduated', 'suspended', 'withdrawn'];
        
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid status. Must be one of: active, graduated, suspended, withdrawn');
        }
        
        return true;
    }
    
    validateId(id) {
        const numId = parseInt(id);
        if (isNaN(numId) || numId <= 0) {
            throw new Error('Invalid student ID');
        }
        return numId;
    }
}

module.exports = new StudentValidator();
```

#### **1.4 Implement Data Layer (2 คะแนน)**

**📁 `src/data/database/connection.js`**

```javascript
// src/data/database/connection.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../../students.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_code TEXT UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        major TEXT NOT NULL,
        gpa REAL DEFAULT 0.0,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

module.exports = db;
```

**📁 `src/data/repositories/studentRepository.js`**

```javascript
// src/data/repositories/studentRepository.js
const db = require('../database/connection');

class StudentRepository {
    // TODO: Implement findAll
    async findAll(major = null, status = null) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM students';
            let params = [];
            let conditions = [];
            
            if (major) {
                conditions.push('major = ?');
                params.push(major);
            }
            
            if (status) {
                conditions.push('status = ?');
                params.push(status);
            }
            
            if (conditions.length > 0) {
                sql += ' WHERE ' + conditions.join(' AND ');
            }
            
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    // TODO: Implement findById
    async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    // TODO: Implement create
    async create(studentData) {
        const { student_code, first_name, last_name, email, major } = studentData;
        
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO students (student_code, first_name, last_name, email, major) VALUES (?, ?, ?, ?, ?)';
            
            db.run(sql, [student_code, first_name, last_name, email, major], function(err) {
                if (err) {
                    reject(err);
                } else {
                    // Return the created student
                    db.get('SELECT * FROM students WHERE id = ?', [this.lastID], (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            });
        });
    }

    // TODO: Implement update
    async update(id, studentData) {
        // ให้นักศึกษาเขียนเอง
        // return Promise
    }

    // TODO: Implement updateGPA
    async updateGPA(id, gpa) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE students SET gpa = ? WHERE id = ?', 
                [gpa, id], 
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        // Return updated student
                        db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        });
                    }
                }
            );
        });
    }

    // TODO: Implement updateStatus
    async updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE students SET status = ? WHERE id = ?', 
                [status, id], 
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        // Return updated student
                        db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        });
                    }
                }
            );
        });
    }

    // TODO: Implement delete
    async delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                else resolve({ message: 'Student deleted successfully' });
            });
        });
    }
}

module.exports = new StudentRepository();
```

#### **1.5 Update server.js (Entry Point)**

**📁 `server.js`**

```javascript
// server.js
const express = require('express');
const studentRoutes = require('./src/presentation/routes/studentRoutes');
const errorHandler = require('./src/presentation/middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/students', studentRoutes);

// Error handling (ต้องอยู่ท้ายสุด)
app.use(errorHandler);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Student Management System running on http://localhost:${PORT}`);
});
```

---

### **ส่วนที่ 2: Documentation (3 คะแนน)**

#### **2.1 สร้าง README.md (1.5 คะแนน)**

สร้างไฟล์ `README.md` ที่อธิบาย:

```markdown
# Student Management System - Layered Architecture

## 📋 Project Information
- **Student Name:** [ชื่อ-นามสกุล]
- **Student ID:** [รหัสนักศึกษา]
- **Course:** ENGSE207 Software Architecture

## 🏗️ Architecture Style
Layered Architecture (3-tier)

## 📂 Project Structure
[อธิบายโครงสร้างโฟลเดอร์]

## 🎯 Refactoring Summary

### ปัญหาของ Monolithic (เดิม):
- [ระบุปัญหา 3-5 ข้อ]

### วิธีแก้ไขด้วย Layered Architecture:
- [อธิบายวิธีแก้แต่ละปัญหา]

### ประโยชน์ที่ได้รับ:
- [ระบุประโยชน์ 3-5 ข้อ]

## 🚀 How to Run

\`\`\`bash
# 1. Clone repository
git clone [your-repo-url]

# 2. Install dependencies
npm install

# 3. Run server
npm start

# 4. Test API
# Open browser: http://localhost:3000
\`\`\`

## 📝 API Endpoints
[ระบุ API endpoints ทั้งหมด]
```

#### **2.2 สร้าง Architecture Diagram (1.5 คะแนน)**
**แนวทางทำเอกสาร** [WORKSHOP_ARCHITECTURE_GUIDE](../workshop_exam_guide/WORKSHOP_ARCHITECTURE_GUIDE.md)

สร้างไฟล์ `ARCHITECTURE.md` ที่มี:

1. **C1 Context** 
2. **C2 Contrainer Diagram แสดงโครงสร้าง Layered Architecture**

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  ┌──────────────────────────────┐   │
│  │ Routes → Controllers         │   │
│  │ (HTTP Handling)              │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Business Logic Layer            │
│  ┌──────────────────────────────┐   │
│  │ Services → Validators        │   │
│  │ (Business Rules)             │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Data Access Layer               │
│  ┌──────────────────────────────┐   │
│  │ Repositories → Database      │   │
│  │ (SQL Queries)                │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
          ┌──────────┐
          │  SQLite  │
          └──────────┘
```

3. **อธิบาย Responsibilities ของแต่ละ Layer**

4. **อธิบาย Data Flow** (Request → Response)

---

## 📤 การส่งงาน (CRITICAL - อ่านให้ละเอียด!)

### **ขั้นตอนการส่งงาน:**

#### **Step 1: Setup Git Repository**

```bash
# 1. สร้างโฟลเดอร์ตามรูปแบบ
mkdir midterm-individual-<รหัสนักศึกษา>
cd midterm-individual-<รหัสนักศึกษา>

# ตัวอย่าง:
# midterm-individual-6531503001

# 2. Initialize Git
git init

# 3. สร้าง .gitignore
echo "node_modules/
*.db
.env
.DS_Store" > .gitignore

# 4. Add remote (ใช้ repo ที่อาจารย์กำหนด)
git remote add origin https://github.com/RMUTL-ENGSE207/midterm-2568-<รหัสนักศึกษา>.git
```

#### **Step 2: Develop & Commit**

```bash
# 1. สร้างโครงสร้างโฟลเดอร์และไฟล์ทั้งหมด

# 2. Commit แต่ละส่วนที่ทำเสร็จ
git add .
git commit -m "feat: implement presentation layer"

git add .
git commit -m "feat: implement business layer"

git add .
git commit -m "feat: implement data layer"

git add .
git commit -m "docs: add README and architecture diagram"
```

#### **Step 3: Test Before Submit**

```bash
# 1. ทดสอบว่า server รันได้
npm start

# 2. ทดสอบ API ทุกตัว
# - GET /api/students
# - GET /api/students/:id
# - POST /api/students
# - PUT /api/students/:id
# - PATCH /api/students/:id/gpa
# - PATCH /api/students/:id/status
# - DELETE /api/students/:id

# 3. ตรวจสอบว่าไม่มี error
```

#### **Step 4: Final Push**

```bash
# 1. Commit ครั้งสุดท้าย
git add .
git commit -m "chore: final submission"

# 2. Push to GitHub
git push -u origin main

# ถ้า push ไม่ได้ (force push):
# git push -u origin main --force
```

#### **Step 5: Verify & Submit**

```bash
# 1. เปิด GitHub repository
# 2. ตรวจสอบว่าไฟล์ครบถ้วน:
#    ✅ src/ folder (ทั้ง 3 layers)
#    ✅ server.js
#    ✅ package.json
#    ✅ README.md
#    ✅ ARCHITECTURE.md
#    ✅ .gitignore
#
# 3. ตรวจสอบ commits (ควรมีอย่างน้อย 4-5 commits)
```

### **Step 6: ส่ง URL ผ่าน email**

1. เข้า email ของมหาวิทยาลัย และส่ง email ที่ thanit@rmutl.ac.th พร้อมรายละเอียด ชื่อ-นามสกุล รหัสนักศึกษา และ sec ที่เรียน
2. ชื่อหัวข้อ email คือ
 Assignment: "ENGSE207 - Midterm Practical Exam (Individual)"
3. วาง GitHub URL:
   ```
   https://github.com/RMUTL-ENGSE207/midterm-2568-<รหัสนักศึกษา>
   ```
4. กด send
---

## ✅ Checklist ก่อนส่งงาน

ตรวจสอบว่าทำครบทุกข้อก่อนส่ง:

### Code Implementation (7 คะแนน)
- [ ] สร้างโครงสร้างโฟลเดอร์ครบถ้วน (1 คะแนน)
- [ ] Presentation Layer ทำงานได้ครบทุก API (2 คะแนน)
- [ ] Business Layer ทำงานได้ถูกต้อง (2 คะแนน)
- [ ] Data Layer ทำงานได้ถูกต้อง (2 คะแนน)

### Documentation (3 คะแนน)
- [ ] README.md ครบถ้วน (1.5 คะแนน)
- [ ] ARCHITECTURE.md มี Diagram และคำอธิบาย (1.5 คะแนน)

### Git & Submission
- [ ] ชื่อโฟลเดอร์ถูกต้อง: `midterm-individual-<รหัสนักศึกษา>`
- [ ] มี .gitignore (ไม่ commit node_modules/, *.db)
- [ ] มี commits หลายๆ ครั้ง (ไม่ใช่ 1 commit เดียว)
- [ ] Push ไปที่ GitHub สำเร็จ
- [ ] ส่ง GitHub URL ผ่าน LMS

### Testing
- [ ] Server รันได้ (`npm start`)
- [ ] API ทุกตัวทำงานได้ถูกต้อง
- [ ] ไม่มี error ใน console

---

## 🎯 เกณฑ์การให้คะแนน

### ส่วนที่ 1: Code Implementation (7 คะแนน)

| หัวข้อ | คะแนน | เกณฑ์ |
|--------|-------|-------|
| **โครงสร้างโฟลเดอร์** | 1 | - สร้างครบถ้วนตามที่กำหนด (0.5)<br>- แยก layer ชัดเจน (0.5) |
| **Presentation Layer** | 2 | - Controller ครบทุก function (0.8)<br>- Routes ถูกต้อง (0.4)<br>- Error handling (0.4)<br>- Code clean & readable (0.4) |
| **Business Layer** | 2 | - Service logic ถูกต้อง (0.8)<br>- Validation ครบถ้วน (0.6)<br>- Business rules (borrow/return/delete) (0.6) |
| **Data Layer** | 2 | - Repository functions ครบ (0.8)<br>- Database queries ถูกต้อง (0.6)<br>- Promise handling ถูกต้อง (0.6) |

### ส่วนที่ 2: Documentation (3 คะแนน)

| หัวข้อ | คะแนน | เกณฑ์ |
|--------|-------|-------|
| **README.md** | 1.5 | - ครบถ้วนทุกหัวข้อ (0.6)<br>- อธิบายปัญหาและวิธีแก้ชัดเจน (0.5)<br>- มี API endpoints (0.4) |
| **ARCHITECTURE.md** | 1.5 | - มี Architecture Diagram (0.7)<br>- อธิบาย responsibilities ของแต่ละ layer (0.4)<br>- อธิบาย data flow (0.4) |

### หักคะแนน

| ข้อผิดพลาด | หักคะแนน |
|------------|----------|
| ไม่มี .gitignore หรือ commit node_modules/ | -0.5 |
| Commit เดียวจบ (ไม่ commit เป็นระยะ) | -0.5 |
| ชื่อโฟลเดอร์ผิด | -0.3 |
| Code ไม่รันได้ | -2 |
| API บางตัวไม่ทำงาน | -0.5 ต่อ API |
| ส่งงานช้ากว่ากำหนด | -1 ต่อวัน |

---

## 💡 Tips & Hints

### สำหรับการ Refactor:

1. **เริ่มจาก Data Layer** - ทำ Repository และ Database connection ก่อน
2. **ต่อด้วย Business Layer** - ย้าย Business logic และ Validation
3. **จบที่ Presentation Layer** - ย้าย HTTP handling

### สำหรับ Debugging:

```javascript
// เพิ่ม console.log เพื่อ debug
console.log('[Controller] Received request:', req.body);
console.log('[Service] Processing:', data);
console.log('[Repository] Query result:', result);
```

### สำหรับ Error Handling:

```javascript
// ใช้ try-catch ทุก async function
try {
    const result = await someAsyncFunction();
    return result;
} catch (error) {
    console.error('Error:', error);
    throw error; // ส่งต่อไปให้ error handler
}
```

---

## ⏰ Time Management (90 นาที)

| Task | Time | คำแนะนำ |
|------|------|---------|
| อ่านโจทย์และทำความเข้าใจ | 10 นาที | อ่านให้ละเอียด! |
| Setup Git & โครงสร้าง | 10 นาที | สร้างโฟลเดอร์ครบก่อน |
| Data Layer | 20 นาที | ทำ Repository ก่อน |
| Business Layer | 20 นาที | Validator + Service |
| Presentation Layer | 20 นาที | Controller + Routes |
| Documentation | 10 นาที | README + Diagram |
| Testing & Git Push | 10 นาที | ทดสอบและส่งงาน |

---

## 🆘 ถ้ามีปัญหา

1. **Server ไม่รัน** → ตรวจสอบ `require()` path ทั้งหมด
2. **API ไม่ทำงาน** → ตรวจสอบ routes mapping
3. **Database error** → ตรวจสอบ connection.js
4. **Git push ไม่ได้** → ใช้ `--force` flag (ระวัง!)
5. **ไม่แน่ใจ** → ถามอาจารย์ผู้คุมสอบ

---

## 📞 ติดต่อ

หากมีปัญหาในการส่งงาน:
- 📧 Email: [อีเมลอาจารย์]
- 💬 LINE: [LINE ID อาจารย์]

---

## 🔔 หมายเหตุสำคัญ

1. **ห้ามลอกงานเพื่อน** - ระบบตรวจจับการลอก (plagiarism detection)
2. **Open Book/Internet/AI** - ใช้ได้ แต่ต้องเข้าใจโค้ดที่เขียน
3. **ส่งงานตรงเวลา** - เลยเวลาหักคะแนน
4. **Test ก่อนส่ง** - Code ที่ไม่รันได้จะถูกหักคะแนนหนัก

---

**ขอให้สอบเป็นไปด้วยดีและโชคดี! 🍀**

---

**จัดทำโดย:** อาจารย์ธนิต เกตุแก้ว  
**วิชา:** ENGSE207 สถาปัตยกรรมซอฟต์แวร์  
**ภาคเรียนที่:** 2/2568
