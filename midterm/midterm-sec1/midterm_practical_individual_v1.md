# 💻 ENGSE207 Software Architecture - MIDTERM PRACTICAL EXAM (Individual)
## ข้อสอบปฏิบัติเดี่ยว - Version 1

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

บริษัท TechStartup มีระบบ **Library Management System (ระบบจัดการห้องสมุด)** แบบ Monolithic ที่กำลังเริ่มมีปัญหา:

### 🔴 ปัญหาปัจจุบัน:

1. **Code ยุ่งเหยิง** - โค้ดทั้งหมดอยู่ในไฟล์เดียว (server.js) มากกว่า 400 บรรทัด
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
// server.js - Monolithic Library Management System
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Database connection (ปนกับทุกอย่าง)
const db = new sqlite3.Database('./library.db', (err) => {
    if (err) console.error('Database error:', err);
    else console.log('Connected to SQLite database');
});

// Create tables if not exists
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// ===== API ENDPOINTS =====

// GET /api/books - ดึงหนังสือทั้งหมด
app.get('/api/books', (req, res) => {
    // Validation (ปนกับ HTTP handling)
    const { status } = req.query;
    
    // Database query (ปนกับทุกอย่าง)
    let sql = 'SELECT * FROM books';
    let params = [];
    
    if (status) {
        sql += ' WHERE status = ?';
        params.push(status);
    }
    
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        // Business logic: คำนวณสถิติ (ปนกับทุกอย่าง)
        const available = rows.filter(b => b.status === 'available').length;
        const borrowed = rows.filter(b => b.status === 'borrowed').length;
        
        res.json({
            books: rows,
            statistics: { available, borrowed, total: rows.length }
        });
    });
});

// GET /api/books/:id - ดึงหนังสือเล่มเดียว
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Validation
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }
    
    // Database query
    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        res.json(row);
    });
});

// POST /api/books - เพิ่มหนังสือใหม่
app.post('/api/books', (req, res) => {
    const { title, author, isbn } = req.body;
    
    // Validation (ปนกับ HTTP handling)
    if (!title || !author || !isbn) {
        return res.status(400).json({ 
            error: 'Title, author, and ISBN are required' 
        });
    }
    
    // Business logic: validate ISBN format (ปนกับทุกอย่าง)
    const isbnPattern = /^(97[89])?\d{9}[\dXx]$/;
    if (!isbnPattern.test(isbn.replace(/-/g, ''))) {
        return res.status(400).json({ 
            error: 'Invalid ISBN format' 
        });
    }
    
    // Database insert (ปนกับทุกอย่าง)
    const sql = 'INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)';
    
    db.run(sql, [title, author, isbn], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(409).json({ 
                    error: 'ISBN already exists' 
                });
            }
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        // Get the created book
        db.get('SELECT * FROM books WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json(row);
        });
    });
});

// PUT /api/books/:id - อัพเดทหนังสือ
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, isbn } = req.body;
    
    // Validation
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }
    
    if (!title || !author || !isbn) {
        return res.status(400).json({ 
            error: 'Title, author, and ISBN are required' 
        });
    }
    
    // Business logic: validate ISBN
    const isbnPattern = /^(97[89])?\d{9}[\dXx]$/;
    if (!isbnPattern.test(isbn.replace(/-/g, ''))) {
        return res.status(400).json({ error: 'Invalid ISBN format' });
    }
    
    // Check if book exists
    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        // Update book
        const sql = 'UPDATE books SET title = ?, author = ?, isbn = ? WHERE id = ?';
        
        db.run(sql, [title, author, isbn, id], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(409).json({ 
                        error: 'ISBN already exists' 
                    });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            
            // Return updated book
            db.get('SELECT * FROM books WHERE id = ?', [id], (err, updatedRow) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                res.json(updatedRow);
            });
        });
    });
});

// PATCH /api/books/:id/borrow - ยืมหนังสือ
app.patch('/api/books/:id/borrow', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }
    
    // Check if book exists and available
    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        // Business logic: check if already borrowed
        if (row.status === 'borrowed') {
            return res.status(400).json({ 
                error: 'Book is already borrowed' 
            });
        }
        
        // Update status to borrowed
        db.run('UPDATE books SET status = ? WHERE id = ?', 
            ['borrowed', id], 
            function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                
                // Return updated book
                db.get('SELECT * FROM books WHERE id = ?', [id], (err, updatedRow) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }
                    res.json(updatedRow);
                });
            }
        );
    });
});

// PATCH /api/books/:id/return - คืนหนังสือ
app.patch('/api/books/:id/return', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }
    
    // Check if book exists
    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        // Business logic: check if not borrowed
        if (row.status !== 'borrowed') {
            return res.status(400).json({ 
                error: 'Book is not borrowed' 
            });
        }
        
        // Update status to available
        db.run('UPDATE books SET status = ? WHERE id = ?', 
            ['available', id], 
            function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }
                
                // Return updated book
                db.get('SELECT * FROM books WHERE id = ?', [id], (err, updatedRow) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database error' });
                    }
                    res.json(updatedRow);
                });
            }
        );
    });
});

// DELETE /api/books/:id - ลบหนังสือ
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }
    
    // Business logic: cannot delete borrowed book
    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        if (row.status === 'borrowed') {
            return res.status(400).json({ 
                error: 'Cannot delete borrowed book' 
            });
        }
        
        // Delete book
        db.run('DELETE FROM books WHERE id = ?', [id], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            
            res.json({ message: 'Book deleted successfully' });
        });
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Library Management System running on http://localhost:${PORT}`);
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
│   │   │   └── bookRoutes.js     # กำหนด routes
│   │   ├── controllers/
│   │   │   └── bookController.js  # Handle HTTP requests/responses
│   │   └── middlewares/
│   │       └── errorHandler.js    # Error handling middleware
│   │
│   ├── business/                  # Layer 2: Business Logic
│   │   ├── services/
│   │   │   └── bookService.js     # Business logic & rules
│   │   └── validators/
│   │       └── bookValidator.js   # Validation logic
│   │
│   └── data/                      # Layer 3: Data Access
│       ├── repositories/
│       │   └── bookRepository.js  # Database operations
│       └── database/
│           └── connection.js      # Database connection
│
├── server.js                      # Entry point
├── package.json
├── library.db                     # SQLite database
└── README.md                      # Documentation
```

#### **1.2 Implement Presentation Layer (2 คะแนน)**

**📁 `src/presentation/controllers/bookController.js`**

ให้คุณสร้าง Controller ที่:
- รับ HTTP request
- เรียกใช้ Service
- ส่ง HTTP response

**ตัวอย่าง code skeleton ที่ให้:**

```javascript
// src/presentation/controllers/bookController.js
const bookService = require('../../business/services/bookService');

class BookController {
    // TODO: Implement getAllBooks
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;
            // เรียก bookService.getAllBooks()
            // ส่ง response กลับ
        } catch (error) {
            next(error);
        }
    }

    // TODO: Implement getBookById
    async getBookById(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement createBook
    async createBook(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement updateBook
    async updateBook(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement borrowBook
    async borrowBook(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement returnBook
    async returnBook(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement deleteBook
    async deleteBook(req, res, next) {
        // ให้นักศึกษาเขียนเอง
    }
}

module.exports = new BookController();
```

**📁 `src/presentation/routes/bookRoutes.js`**

```javascript
// src/presentation/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// TODO: Define routes
// GET /api/books
router.get('/', bookController.getAllBooks);

// GET /api/books/:id
// POST /api/books
// PUT /api/books/:id
// PATCH /api/books/:id/borrow
// PATCH /api/books/:id/return
// DELETE /api/books/:id

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

**📁 `src/business/services/bookService.js`**

ให้คุณสร้าง Service ที่:
- รับ data จาก Controller
- Validate ผ่าน Validator
- ประมวลผล Business logic
- เรียก Repository เพื่อเข้าถึง Database
- Return ผลลัพธ์กลับไปที่ Controller

**Code skeleton:**

```javascript
// src/business/services/bookService.js
const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');

class BookService {
    // TODO: Implement getAllBooks
    async getAllBooks(status = null) {
        // 1. ถ้ามี status ให้ validate
        // 2. เรียก bookRepository.findAll(status)
        // 3. คำนวณสถิติ (available, borrowed, total)
        // 4. return { books, statistics }
    }

    // TODO: Implement getBookById
    async getBookById(id) {
        // 1. Validate ID
        // 2. เรียก repository
        // 3. ถ้าไม่เจอ throw NotFoundError
        // 4. return book
    }

    // TODO: Implement createBook
    async createBook(bookData) {
        // 1. Validate book data
        // 2. Validate ISBN format
        // 3. เรียก repository.create()
        // 4. return created book
    }

    // TODO: Implement updateBook
    async updateBook(id, bookData) {
        // ให้นักศึกษาเขียนเอง
    }

    // TODO: Implement borrowBook
    async borrowBook(id) {
        // 1. ดึงหนังสือจาก repository
        // 2. ตรวจสอบว่า status = 'available' หรือไม่
        // 3. ถ้า borrowed อยู่แล้ว throw error
        // 4. เรียก repository.updateStatus(id, 'borrowed')
        // 5. return updated book
    }

    // TODO: Implement returnBook
    async returnBook(id) {
        // ให้นักศึกษาเขียนเอง (คล้ายกับ borrowBook)
    }

    // TODO: Implement deleteBook
    async deleteBook(id) {
        // 1. ดึงหนังสือจาก repository
        // 2. ตรวจสอบว่า status ไม่ใช่ 'borrowed'
        // 3. ถ้า borrowed ห้ามลบ throw error
        // 4. เรียก repository.delete(id)
    }
}

module.exports = new BookService();
```

**📁 `src/business/validators/bookValidator.js`**

```javascript
// src/business/validators/bookValidator.js
class BookValidator {
    validateBookData(data) {
        const { title, author, isbn } = data;
        
        if (!title || !author || !isbn) {
            throw new Error('Title, author, and ISBN are required');
        }
        
        return true;
    }
    
    validateISBN(isbn) {
        // TODO: Validate ISBN format
        // Pattern: (978|979) + 9 digits + (digit or X)
        const isbnPattern = /^(97[89])?\d{9}[\dXx]$/;
        const cleanISBN = isbn.replace(/-/g, '');
        
        if (!isbnPattern.test(cleanISBN)) {
            throw new Error('Invalid ISBN format');
        }
        
        return true;
    }
    
    validateId(id) {
        const numId = parseInt(id);
        if (isNaN(numId) || numId <= 0) {
            throw new Error('Invalid book ID');
        }
        return numId;
    }
}

module.exports = new BookValidator();
```

#### **1.4 Implement Data Layer (2 คะแนน)**

**📁 `src/data/database/connection.js`**

```javascript
// src/data/database/connection.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../../library.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        isbn TEXT UNIQUE NOT NULL,
        status TEXT DEFAULT 'available',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
}

module.exports = db;
```

**📁 `src/data/repositories/bookRepository.js`**

```javascript
// src/data/repositories/bookRepository.js
const db = require('../database/connection');

class BookRepository {
    // TODO: Implement findAll
    async findAll(status = null) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM books';
            let params = [];
            
            if (status) {
                sql += ' WHERE status = ?';
                params.push(status);
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
            db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    // TODO: Implement create
    async create(bookData) {
        const { title, author, isbn } = bookData;
        
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)';
            
            db.run(sql, [title, author, isbn], function(err) {
                if (err) {
                    reject(err);
                } else {
                    // Return the created book
                    db.get('SELECT * FROM books WHERE id = ?', [this.lastID], (err, row) => {
                        if (err) reject(err);
                        else resolve(row);
                    });
                }
            });
        });
    }

    // TODO: Implement update
    async update(id, bookData) {
        // ให้นักศึกษาเขียนเอง
        // return Promise
    }

    // TODO: Implement updateStatus
    async updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE books SET status = ? WHERE id = ?', 
                [status, id], 
                function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        // Return updated book
                        db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
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
            db.run('DELETE FROM books WHERE id = ?', [id], function(err) {
                if (err) reject(err);
                else resolve({ message: 'Book deleted successfully' });
            });
        });
    }
}

module.exports = new BookRepository();
```

#### **1.5 Update server.js (Entry Point)**

**📁 `server.js`**

```javascript
// server.js
const express = require('express');
const bookRoutes = require('./src/presentation/routes/bookRoutes');
const errorHandler = require('./src/presentation/middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/books', bookRoutes);

// Error handling (ต้องอยู่ท้ายสุด)
app.use(errorHandler);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Library Management System running on http://localhost:${PORT}`);
});
```

---

### **ส่วนที่ 2: Documentation (3 คะแนน)**

#### **2.1 สร้าง README.md (1.5 คะแนน)**

สร้างไฟล์ `README.md` ที่อธิบาย:

```markdown
# Library Management System - Layered Architecture

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

# 2. ทดสอบ API ทุกตัวด้วย Thunder Client หรือ Postman
# - GET /api/books
# - GET /api/books/:id
# - POST /api/books
# - PUT /api/books/:id
# - PATCH /api/books/:id/borrow
# - PATCH /api/books/:id/return
# - DELETE /api/books/:id

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

#### **Step 5: Verify Submission**

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

#### **Step 6: Submit GitHub Link**

ส่ง GitHub repository URL ผ่านระบบ LMS:
```
https://github.com/RMUTL-ENGSE207/midterm-2568-<รหัสนักศึกษา>
```

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
