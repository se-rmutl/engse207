# 🎁 ENGSE207 Software Architecture - MIDTERM BONUS EXAM
## ข้อสอบ Bonus: Client-Server Architecture (Version 1)

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

ข้อสอบ Bonus นี้เป็นการต่อยอดจาก **ข้อสอบปฏิบัติเดี่ยว** โดยนำระบบ **Library Management** ที่เป็น **Layered Architecture** มา Refactor เป็น **Client-Server Architecture**

### จุดประสงค์:
1. ✅ เรียนรู้วิธี Refactor Layered → Client-Server
2. ✅ แยก Frontend และ Backend เป็นโปรเจกต์แยกกัน
3. ✅ สร้าง RESTful API
4. ✅ เข้าใจการสื่อสารระหว่าง Client-Server ผ่าน HTTP
5. ✅ Deploy Backend บน VM และ Frontend บน Local

---

## 📌 สถานการณ์โจทย์

คุณได้ทำระบบ **Library Management System** ที่เป็น **Layered Architecture** เสร็จแล้วจากข้อสอบปฏิบัติเดี่ยว แต่ตอนนี้:

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
│   │   │   │   └── bookRoutes.js
│   │   │   ├── controllers/
│   │   │   │   └── bookController.js
│   │   │   └── middlewares/
│   │   │       ├── cors.js       # 🆕 CORS middleware
│   │   │       └── errorHandler.js
│   │   ├── business/
│   │   │   ├── services/
│   │   │   │   └── bookService.js
│   │   │   └── validators/
│   │   │       └── bookValidator.js
│   │   └── data/
│   │       ├── repositories/
│   │       │   └── bookRepository.js
│   │       └── database/
│   │           └── connection.js
│   ├── server.js                 # 🆕 แก้ไขเพื่อรองรับ CORS
│   ├── package.json
│   ├── library.db
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
│   │       ├── bookList.js     # Book list component
│   │       └── bookForm.js     # Book form component
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
const bookRoutes = require('./src/presentation/routes/bookRoutes');
const corsMiddleware = require('./src/presentation/middlewares/cors');
const errorHandler = require('./src/presentation/middlewares/errorHandler');

const app = express();

// 🆕 Middleware
app.use(corsMiddleware);  // เพิ่ม CORS
app.use(express.json());

// 🆕 ลบ static files (ไม่ต้องใช้แล้ว)
// app.use(express.static('public'));

// Routes
app.use('/api/books', bookRoutes);

// Error handling
app.use(errorHandler);

// 🆕 แก้ PORT และ Log message
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║  Library Management System API (Server)      ║
║  Server running on http://0.0.0.0:${PORT}     ║
║  API: http://localhost:${PORT}/api/books      ║
╚═══════════════════════════════════════════════╝
    `);
});
```

#### **1.3 ปรับปรุง API Response (1 คะแนน)**

อัปเดต `backend/src/presentation/controllers/bookController.js`:

```javascript
// backend/src/presentation/controllers/bookController.js
const bookService = require('../../business/services/bookService');

class BookController {
    
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;
            const result = await bookService.getAllBooks(status);
            
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

module.exports = new BookController();
```

#### **1.4 ทดสอบ API ด้วย curl หรือ Postman (1 คะแนน)**

สร้างไฟล์ `backend/API_TESTS.md` ที่มีคำสั่ง test:

```markdown
# API Tests

## 1. Get All Books
\`\`\`bash
curl http://localhost:3000/api/books
\`\`\`

## 2. Get Book by ID
\`\`\`bash
curl http://localhost:3000/api/books/1
\`\`\`

## 3. Create Book
\`\`\`bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884"
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
class LibraryAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    // TODO: Implement API methods
    
    async getAllBooks(status = null) {
        // 1. สร้าง URL (เพิ่ม ?status= ถ้ามี)
        // 2. Fetch API
        // 3. Handle response
        // 4. Return data
    }
    
    async getBookById(id) {
        // ให้นักศึกษาเขียนเอง
    }
    
    async createBook(bookData) {
        // ให้นักศึกษาเขียนเอง
        // Method: POST
        // Headers: Content-Type: application/json
        // Body: JSON.stringify(bookData)
    }
    
    async updateBook(id, bookData) {
        // ให้นักศึกษาเขียนเอง
        // Method: PUT
    }
    
    async borrowBook(id) {
        // ให้นักศึกษาเขียนเอง
        // Method: PATCH
        // Endpoint: /api/books/:id/borrow
    }
    
    async returnBook(id) {
        // ให้นักศึกษาเขียนเอง
        // Method: PATCH
        // Endpoint: /api/books/:id/return
    }
    
    async deleteBook(id) {
        // ให้นักศึกษาเขียนเอง
        // Method: DELETE
    }
}

// Export for use in other files
const api = new LibraryAPI('http://localhost:3000/api');
```

**Code skeleton ตัวอย่าง:**

```javascript
async getAllBooks(status = null) {
    try {
        let url = `${this.baseURL}/books`;
        
        if (status) {
            url += `?status=${status}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result.data; // ส่งกลับ data จาก { success, data, timestamp }
        
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}
```

#### **2.2 สร้าง UI Components (2 คะแนน)**

**ไฟล์ `frontend/js/components/bookList.js`:**

```javascript
// frontend/js/components/bookList.js
function renderBookList(books) {
    const container = document.getElementById('book-list');
    
    if (books.length === 0) {
        container.innerHTML = '<p>No books found</p>';
        return;
    }
    
    // TODO: สร้าง HTML สำหรับแสดงรายการหนังสือ
    // แสดง: title, author, isbn, status
    // ปุ่ม: Borrow/Return, Edit, Delete
    
    const html = books.map(book => `
        <div class="book-card" data-id="${book.id}">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>ISBN:</strong> ${book.isbn}</p>
            <p><strong>Status:</strong> 
                <span class="status ${book.status}">${book.status}</span>
            </p>
            <div class="actions">
                ${book.status === 'available' 
                    ? `<button onclick="borrowBook(${book.id})">Borrow</button>`
                    : `<button onclick="returnBook(${book.id})">Return</button>`
                }
                <button onclick="editBook(${book.id})">Edit</button>
                <button onclick="deleteBook(${book.id})" class="danger">Delete</button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}
```

**ไฟล์ `frontend/js/components/bookForm.js`:**

```javascript
// frontend/js/components/bookForm.js
function showBookForm(book = null) {
    // TODO: แสดง Modal Form สำหรับ Create/Edit
    // - ถ้า book = null → Create mode
    // - ถ้า book มีค่า → Edit mode (pre-fill data)
}

function hideBookForm() {
    // TODO: ซ่อน Modal Form
}
```

#### **2.3 สร้าง Main App Logic (1.5 คะแนน)**

**ไฟล์ `frontend/js/app.js`:**

```javascript
// frontend/js/app.js

// Global state
let currentFilter = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Library Management System - Client');
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
    await loadBooks();
});

function setupEventListeners() {
    // Filter buttons
    document.getElementById('filter-all').addEventListener('click', () => {
        currentFilter = 'all';
        loadBooks();
    });
    
    document.getElementById('filter-available').addEventListener('click', () => {
        currentFilter = 'available';
        loadBooks('available');
    });
    
    document.getElementById('filter-borrowed').addEventListener('click', () => {
        currentFilter = 'borrowed';
        loadBooks('borrowed');
    });
    
    // Add book button
    document.getElementById('add-book-btn').addEventListener('click', () => {
        showBookForm();
    });
    
    // Form submit
    document.getElementById('book-form').addEventListener('submit', handleFormSubmit);
}

async function loadBooks(status = null) {
    try {
        // TODO: แสดง loading state
        showLoading();
        
        // Call API
        const result = await api.getAllBooks(status);
        
        // TODO: อัปเดต statistics
        updateStatistics(result.statistics);
        
        // TODO: Render book list
        renderBookList(result.books);
        
        // TODO: ซ่อน loading state
        hideLoading();
        
    } catch (error) {
        console.error('Error loading books:', error);
        alert('Failed to load books. Please try again.');
        hideLoading();
    }
}

async function borrowBook(id) {
    try {
        if (!confirm('Borrow this book?')) return;
        
        await api.borrowBook(id);
        alert('Book borrowed successfully!');
        await loadBooks(currentFilter === 'all' ? null : currentFilter);
        
    } catch (error) {
        console.error('Error borrowing book:', error);
        alert('Failed to borrow book. Please try again.');
    }
}

// TODO: Implement other functions
// - returnBook(id)
// - deleteBook(id)
// - editBook(id)
// - handleFormSubmit(event)
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
    <title>Library Management System</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>📚 Library Management System</h1>
            <p>Client-Server Architecture Demo</p>
        </header>
        
        <div class="toolbar">
            <button id="add-book-btn" class="primary">+ Add Book</button>
            
            <div class="filters">
                <button id="filter-all" class="active">All</button>
                <button id="filter-available">Available</button>
                <button id="filter-borrowed">Borrowed</button>
            </div>
        </div>
        
        <div class="statistics">
            <div class="stat-card">
                <h3 id="stat-available">0</h3>
                <p>Available</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-borrowed">0</h3>
                <p>Borrowed</p>
            </div>
            <div class="stat-card">
                <h3 id="stat-total">0</h3>
                <p>Total</p>
            </div>
        </div>
        
        <div id="loading" class="loading" style="display: none;">
            <p>Loading...</p>
        </div>
        
        <div id="book-list" class="book-list">
            <!-- Books will be rendered here -->
        </div>
        
        <!-- Modal Form -->
        <div id="modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="hideBookForm()">&times;</span>
                <h2 id="form-title">Add Book</h2>
                
                <form id="book-form">
                    <input type="hidden" id="book-id">
                    
                    <div class="form-group">
                        <label for="title">Title *</label>
                        <input type="text" id="title" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="author">Author *</label>
                        <input type="text" id="author" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="isbn">ISBN *</label>
                        <input type="text" id="isbn" required>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="primary">Save</button>
                        <button type="button" onclick="hideBookForm()">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <!-- Load JS files -->
    <script src="js/api.js"></script>
    <script src="js/components/bookList.js"></script>
    <script src="js/components/bookForm.js"></script>
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
    max-width: 1200px;
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

/* TODO: เพิ่ม styles สำหรับ:
   - .toolbar
   - .filters button
   - .statistics
   - .stat-card
   - .book-list
   - .book-card
   - .modal
   - .form-group
   - buttons
   - etc.
*/

/* ให้นักศึกษาออกแบบ CSS เอง */
```

---

### **ส่วนที่ 4: Documentation (1 คะแนน)**

#### **4.1 สร้าง README.md หลัก (0.5 คะแนน)**

**ไฟล์ `README.md`:**

```markdown
# Library Management System - Client-Server Architecture

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

### **Step 1: Organize Project**

```bash
# สร้างโครงสร้างตามที่กำหนด
midterm-bonus-<รหัสนักศึกษา>/
├── backend/
├── frontend/
└── README.md
```

### **Step 2: Git Setup**

```bash
# ใน root folder
cd midterm-bonus-<รหัสนักศึกษา>

# Initialize Git
git init

# สร้าง .gitignore
cat > .gitignore << 'EOF'
backend/node_modules/
backend/*.db
backend/.env
.DS_Store
EOF

# Add remote
git remote add origin https://github.com/RMUTL-ENGSE207/midterm-bonus-2567-<รหัส>.git
```

### **Step 3: Commit & Push**

```bash
git add .
git commit -m "feat: refactor layered to client-server architecture"

git add .
git commit -m "feat: implement frontend with API client"

git add .
git commit -m "docs: add documentation"

git push -u origin main
```

### **Step 4: Record Demo Video (สำคัญ!)**

📹 **ต้องบันทึก Video Demo (2-3 นาที) แสดง:**

1. ✅ Backend รันบน VM (แสดง terminal)
2. ✅ Frontend รันบน Local (แสดง browser)
3. ✅ Demo การใช้งาน:
   - ดูรายการหนังสือ
   - เพิ่มหนังสือ
   - ยืมหนังสือ
   - คืนหนังสือ
   - ลบหนังสือ
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
- [ ] ส่ง URL ผ่าน LMS

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

---

## ⏰ กำหนดส่ง

**หมดเวลา:** 3 วันหลังประกาศข้อสอบ  
**ส่งช้า:** ไม่รับ

---

**ขอให้ทำงานสนุกและได้คะแนน Bonus! 🎉**

---

**จัดทำโดย:** อาจารย์ธนิต เกตุแก้ว  
**วิชา:** ENGSE207 สถาปัตยกรรมซอฟต์แวร์  
**ภาคเรียนที่:** 2/2568
