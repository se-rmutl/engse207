# 📚 LIBRARY MANAGEMENT - BONUS UI PACKAGE
## Client-Server Architecture (Version 1)

---

## 📋 ภาพรวม

เอกสารนี้มี UI สมบูรณ์สำหรับ **Bonus Exam - Library Management** (Client-Server Architecture)

**สำหรับ:** Bonus Version 1 - Library → Client-Server  
**ไม่ใช่:** Student Management (นั่นเป็นอีก Version)

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

**✅ จุดสำคัญ:**
- Allow all origins (`*`)
- Handle preflight (OPTIONS)
- Support ทุก HTTP methods

---

### 2️⃣ แก้ไข server.js

**ไฟล์:** `backend/server.js` (🔧 แก้ไข)

```javascript
// backend/server.js
const express = require('express');
const bookRoutes = require('./src/presentation/routes/bookRoutes');
const corsMiddleware = require('./src/presentation/middlewares/cors');
const errorHandler = require('./src/presentation/middlewares/errorHandler');

const app = express();

// 🆕 CORS must come FIRST
app.use(corsMiddleware);
app.use(express.json());

// ❌ ลบบรรทัดนี้ออก (ไม่ต้องใช้ static files)
// app.use(express.static('public'));

// Routes
app.use('/api/books', bookRoutes);

// Error handling (must be LAST)
app.use(errorHandler);

// 🆕 Listen on 0.0.0.0 (สำคัญสำหรับ VM)
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║  Library API Server (Client-Server)          ║
║  Server running on http://0.0.0.0:${PORT}     ║
║  API Endpoints: http://localhost:${PORT}/api  ║
╚═══════════════════════════════════════════════╝
    `);
});
```

**✅ การเปลี่ยนแปลง:**
1. เพิ่ม `corsMiddleware` ที่บรรทัดแรก
2. ลบ `express.static('public')` ออก
3. Listen on `0.0.0.0` แทน default

---

### 3️⃣ API Tests Document

**ไฟล์:** `backend/API_TESTS.md` (🆕 ใหม่)

```markdown
# API Tests - Library Management

## Base URL
\`\`\`
http://localhost:3000/api
\`\`\`

## Endpoints

### 1. Get All Books
\`\`\`bash
curl http://localhost:3000/api/books
\`\`\`

**Expected:**
\`\`\`json
{
  "books": [...],
  "statistics": {
    "available": 0,
    "borrowed": 0,
    "total": 0
  }
}
\`\`\`

### 2. Create Book
\`\`\`bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884"
  }'
\`\`\`

### 3. Borrow Book
\`\`\`bash
curl -X PATCH http://localhost:3000/api/books/1/borrow
\`\`\`

### 4. Return Book
\`\`\`bash
curl -X PATCH http://localhost:3000/api/books/1/return
\`\`\`

### 5. Delete Book
\`\`\`bash
curl -X DELETE http://localhost:3000/api/books/1
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
    <title>Library Management - Client</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>📚 Library Management System</h1>
            <span class="badge">🌐 Client-Server Architecture</span>
        </header>
        
        <div class="toolbar">
            <button class="btn btn-primary" id="add-btn">
                ➕ Add New Book
            </button>
            
            <div class="filters">
                <button class="filter-btn active" data-filter="all">All Books</button>
                <button class="filter-btn" data-filter="available">Available</button>
                <button class="filter-btn" data-filter="borrowed">Borrowed</button>
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
                <p>Total Books</p>
            </div>
        </div>
        
        <div id="loading" class="loading">Loading books...</div>
        
        <div id="book-list" class="book-grid"></div>
    </div>
    
    <!-- Modal -->
    <div id="book-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">Add New Book</h2>
                <span class="close">&times;</span>
            </div>
            <form id="book-form">
                <input type="hidden" id="book-id">
                
                <div class="form-group">
                    <label for="title">Book Title *</label>
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
                    <button type="submit" class="btn btn-primary">💾 Save</button>
                    <button type="button" class="btn btn-secondary" id="cancel-btn">Cancel</button>
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

```css
/* Same as Layered version - copy from LIBRARY_UI_PACKAGE.md */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    padding: 30px;
}

header {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 3px solid #667eea;
    margin-bottom: 30px;
}

header h1 {
    color: #667eea;
    font-size: 32px;
    margin-bottom: 10px;
}

.badge {
    display: inline-block;
    padding: 5px 15px;
    background: #f3f4f6;
    border-radius: 20px;
    font-size: 14px;
    color: #6b7280;
}

/* ... (copy all CSS from LIBRARY_UI_PACKAGE.md) ... */
```

**💡 Tip:** Copy ทั้งหมดจาก `LIBRARY_UI_PACKAGE.md` ส่วน `public/css/style.css`

---

### ไฟล์ที่ 3: `frontend/js/api.js`

```javascript
// frontend/js/api.js - API Client for Client-Server
class LibraryAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async getAllBooks(status = null) {
        let url = `${this.baseURL}/books`;
        if (status) {
            url += `?status=${status}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        return await response.json();
    }
    
    async getBookById(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book');
        }
        return await response.json();
    }
    
    async createBook(bookData) {
        const response = await fetch(`${this.baseURL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async updateBook(id, bookData) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async borrowBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/borrow`, {
            method: 'PATCH'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async returnBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}/return`, {
            method: 'PATCH'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }
        
        return await response.json();
    }
    
    async deleteBook(id) {
        const response = await fetch(`${this.baseURL}/books/${id}`, {
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

const api = new LibraryAPI(API_BASE_URL);
```

**✅ จุดสำคัญ:**
- ระบุ `baseURL` ชัดเจน
- Error handling ครบ
- เปลี่ยน URL ได้ง่าย (Local vs VM)

---

### ไฟล์ที่ 4: `frontend/js/app.js`

```javascript
// frontend/js/app.js - Same as Layered version
// Copy from LIBRARY_UI_PACKAGE.md ส่วน public/js/app.js
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadBooks();
});

// ... (copy all code from LIBRARY_UI_PACKAGE.md) ...
```

**💡 Tip:** Copy ทั้งหมดจาก `LIBRARY_UI_PACKAGE.md` ส่วน `public/js/app.js`

---

## 🧪 PART 3: วิธีทดสอบ

### 1️⃣ ทดสอบ Backend (API Server)

```bash
# Terminal 1: Start Backend Server
cd backend
npm install
npm start

# ต้องเห็น:
# ╔═══════════════════════════════════════════════╗
# ║  Library API Server (Client-Server)          ║
# ║  Server running on http://0.0.0.0:3000       ║
# ╚═══════════════════════════════════════════════╝

# Terminal 2: Test APIs
curl http://localhost:3000/api/books

# ✅ ต้องได้ JSON response (ไม่ใช่ HTML)
```

---

### 2️⃣ ทดสอบ Frontend (Client)

```bash
# Terminal 3: Start Frontend
cd frontend

# Option 1: Python HTTP Server
python3 -m http.server 8000

# Option 2: Node HTTP Server
npx http-server -p 8000

# Option 3: เปิดไฟล์ตรงๆ
# Double-click index.html (บาง browser อาจมีปัญหา CORS)

# เปิด browser:
# http://localhost:8000
```

---

### 3️⃣ ทดสอบ Client-Server Communication

**ใน Browser (F12 → Network Tab):**

```
1. เปิด Network Tab
2. กด "Add New Book"
3. กรอกข้อมูล → Save

✅ ต้องเห็น:
   - Request: POST http://localhost:3000/api/books
   - Status: 201 Created
   - Response: {...book data...}

4. คลิก "Borrow"

✅ ต้องเห็น:
   - Request: PATCH http://localhost:3000/api/books/1/borrow
   - Status: 200 OK
   - Response: {status: "borrowed"}
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
ip addr show  # หรือ ifconfig

# ตัวอย่าง IP: 192.168.1.100
```

---

### Frontend (Local)

```bash
# 1. แก้ไข frontend/js/api.js
# เปลี่ยนบรรทัด:
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
- [ ] server.js แก้ไขแล้ว (ลบ static, เพิ่ม CORS, listen 0.0.0.0)
- [ ] API ทำงานได้ (test ด้วย curl)
- [ ] มี API_TESTS.md

### Frontend:
- [ ] มี 4 ไฟล์ (index.html, style.css, api.js, app.js)
- [ ] api.js มี baseURL ถูกต้อง
- [ ] รันได้ด้วย http-server
- [ ] เปิด browser ได้

### Communication:
- [ ] Frontend เรียก Backend ได้
- [ ] CORS ไม่มี error
- [ ] Network Tab แสดง requests
- [ ] CRUD ทำงานได้ทั้งหมด

---

## 🎯 สรุป

### สิ่งที่ได้รับ:

| Component | Location | Files |
|-----------|----------|-------|
| **Backend** | backend/ | CORS + server.js แก้ไข |
| **Frontend** | frontend/ | 4 ไฟล์ (HTML, CSS, JS×2) |

### ความแตกต่างจาก Layered:

| Aspect | Layered | Client-Server |
|--------|---------|---------------|
| **โปรเจกต์** | 1 | 2 แยก |
| **CORS** | ไม่ต้อง | ✅ ต้องมี |
| **Deploy** | รวมกัน | แยกกัน |
| **Test** | Easier | ซับซ้อนกว่า |

---

## 📝 Video Demo Requirements

**ต้องแสดง:**
1. ✅ Backend รันบน VM (แสดง terminal + IP)
2. ✅ Frontend รันบน Local (แสดง browser)
3. ✅ Demo CRUD features (Add, Borrow, Return, Delete)
4. ✅ แสดง Network Tab (F12) - Request/Response
5. ✅ อธิบาย Client-Server communication

---

**จัดทำโดย:** อาจารย์ธนิต เกตุแก้ว  
**วิชา:** ENGSE207 สถาปัตยกรรมซอฟต์แวร์  
**สำหรับ:** Bonus Exam - Library Management (Client-Server)
