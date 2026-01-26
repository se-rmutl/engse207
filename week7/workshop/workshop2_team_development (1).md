# 👥 Workshop 2: Team Development Simulation
## จำลองการพัฒนาซอฟต์แวร์เป็นทีมด้วย Docker + Git

**รายวิชา:** ENGSE207 Software Architecture  
**ประเภท:** Pre-Lab Workshop (ทำก่อน Week 6 Lab)  
**ระยะเวลา:** 60-90 นาที  
**ระดับความยาก:** ⭐⭐⭐ (กลาง)

---

## 📋 สารบัญ

1. [บทนำ: สถานการณ์จำลอง](#บทนำ-สถานการณ์จำลอง)
2. [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
3. [Day 1: แต่ละคนพัฒนางานของตัวเอง](#day-1-แต่ละคนพัฒนางานของตัวเอง)
4. [Day 2: Merge Code และพบ Bug](#day-2-merge-code-และพบ-bug)
5. [Day 3: แก้ Bug และ Release](#day-3-แก้-bug-และ-release)
6. [สรุปและบทเรียนที่ได้](#สรุปและบทเรียนที่ได้)

---

## 🎬 บทนำ: สถานการณ์จำลอง

### 📌 Project: Contact Manager (ระบบจัดการรายชื่อติดต่อ)

บริษัท TechStart กำลังพัฒนาระบบ Contact Manager ใหม่ โดยทีมมี 3 คน:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        🏢 TechStart Development Team                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   🎨 Frontend Developer      ⚙️ Backend Developer      🧪 Tester/Team Lead  │
│   ┌─────────────────────┐    ┌─────────────────────┐    ┌────────────────┐  │
│   │                     │    │                     │    │                │  │
│   │      สมชาย          │    │      สมหญิง          │    │    สมศักดิ์       │  │
│   │                     │    │                     │    │                │  │
│   │  หน้าที่:              │    │  หน้าที่:              │    │  หน้าที่:         │  │
│   │  • UI Design        │    │  • REST API         │    │  • Test Cases  │  │
│   │  • HTML/CSS/JS      │    │  • Database         │    │  • Bug Report  │  │
│   │  • API Integration  │    │  • Validation       │    │  • Verify Fix  │  │
│   │                     │    │                     │    │                │  │
│   │  Branch:            │    │  Branch:            │    │  Branch:       │  │
│   │  feature/frontend   │    │  feature/backend    │    │  main          │  │
│   │                     │    │                     │    │                │  │
│   └─────────────────────┘    └─────────────────────┘    └────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🗓️ Timeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Development Timeline                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Day 1                    Day 2                    Day 3                    │
│  ═══════                  ═══════                  ═══════                  │
│                                                                             │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐            │
│  │ Development │   ──►   │   Merge &   │   ──►   │  Bug Fix &  │            │
│  │   Phase     │         │   Testing   │         │   Release   │            │
│  └─────────────┘         └─────────────┘         └─────────────┘            │
│                                                                             │
│  🎨 Frontend:            🔄 Merge:               🧪 Bug Found:              │
│  • สร้าง UI              • รวม code              • ชื่อเกิน 50 ตัวอักษร           │
│  • เรียก API             • Docker Compose       • DB Error!                  │
│                                                                             │
│  ⚙️ Backend:             🧪 Testing:             ⚙️ Fix:                    │
│  • สร้าง API             • Functional Test      • เพิ่ม validation             │
│  • Database              • Integration Test     • Update API                │
│                                                                             │
│                                                  ✅ Release:                │
│                                                  • Test ผ่าน                 │
│                                                  • Deploy!                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🎯 Learning Objectives

เมื่อจบ Workshop นี้ นักศึกษาจะเข้าใจ:

1. **Git Workflow** - การทำงานเป็นทีมด้วย branches
2. **Docker ในทีม** - ทุกคนใช้ environment เดียวกัน
3. **Bug Discovery** - พบ bug จาก integration testing
4. **Bug Fix Process** - วิธีแก้ไขและ verify

---

## 📁 โครงสร้างโปรเจกต์

### Project Structure

```
contact-manager/
├── docker-compose.yml          # 🎯 รวม services ทั้งหมด
├── .env                        # 🔐 Environment variables
├── .env.example               
├── .gitignore                  
├── README.md                   
│
├── frontend/                   # 🎨 สมชาย รับผิดชอบ
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
│
├── backend/                    # ⚙️ สมหญิง รับผิดชอบ
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── routes/
│       │   └── contactRoutes.js
│       ├── controllers/
│       │   └── contactController.js
│       └── database/
│           └── db.js
│
├── database/                   # 🗄️ Database scripts
│   └── init.sql
│
├── nginx/                      # 🌐 Nginx config
│   └── default.conf
│
└── docs/                       # 📚 Documentation
    ├── API.md
    └── BUG_REPORT.md
```

### Requirements

| Feature | Description |
|---------|-------------|
| ดูรายชื่อติดต่อ | แสดง contacts ทั้งหมดเป็น cards |
| เพิ่มรายชื่อ | Form สำหรับเพิ่ม contact ใหม่ |
| ลบรายชื่อ | ปุ่มลบในแต่ละ card |
| ค้นหา | ค้นหาตามชื่อ |

### Database Schema

```sql
-- contacts table
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,        -- ⚠️ จำกัด 50 ตัวอักษร!
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📅 Day 1: แต่ละคนพัฒนางานของตัวเอง

> **สถานการณ์:** ทีมแบ่งงานกัน - Frontend และ Backend พัฒนาแยกกัน

### 🚀 เริ่มต้น: สร้างโปรเจกต์  Team Lead สร้าง Repository (สมศักดิ์)

**ทุกคนเริ่มจากการ clone repository:**

```bash
# ============================================
# 👤 สมศักดิ์ (Tester / Team Lead)
# หน้าที่: สร้าง repository และโครงสร้างเริ่มต้น
# ============================================

# สร้างโฟลเดอร์
mkdir -p ~/docker-workshop/contact-manager
cd ~/docker-workshop/contact-manager

# เปิดใน VS Code
code .
```

### Step 1.1: สร้างโครงสร้างพื้นฐาน (ทำเป็นทีม)

**สร้าง .gitignore:**

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Environment
.env
.env.local

# Logs
*.log
npm-debug.log*

# Database
*.db

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
EOF
```

**สร้าง .env.example:**

```bash
cat > .env.example << 'EOF'
# Database
DB_HOST=db
DB_PORT=5432
DB_USER=contactuser
DB_PASSWORD=contactpass
DB_NAME=contactdb

# PostgreSQL
POSTGRES_USER=contactuser
POSTGRES_PASSWORD=contactpass
POSTGRES_DB=contactdb
EOF
```

**สร้าง .env:**

```bash
cat > .env << 'EOF'
DB_HOST=db
DB_PORT=5432
DB_USER=contactuser
DB_PASSWORD=contactpass
DB_NAME=contactdb

POSTGRES_USER=contactuser
POSTGRES_PASSWORD=contactpass
POSTGRES_DB=contactdb
EOF
```

**สร้าง database/init.sql:**

```bash
mkdir -p database
cat > database/init.sql << 'EOF'
-- ============================================
-- Contact Manager Database Schema
-- ============================================

-- สร้างตาราง contacts
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,        -- ⚠️ จำกัด 50 ตัวอักษร!
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- เพิ่มข้อมูลตัวอย่าง
INSERT INTO contacts (name, email, phone) VALUES 
    ('สมชาย ใจดี', 'somchai@email.com', '081-234-5678'),
    ('สมหญิง รักเรียน', 'somying@email.com', '089-876-5432'),
    ('John Doe', 'john@email.com', '02-123-4567');
EOF
```

---

### 🎨 Step 1.2: สมชาย - Frontend Development

> **สมชาย** รับผิดชอบสร้าง UI และเชื่อมต่อ API

**สร้างโฟลเดอร์ frontend:**

```bash
mkdir -p frontend/css frontend/js
```

**สร้าง frontend/index.html:**

```bash
cat > frontend/index.html << 'EOF'
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📇 Contact Manager</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <h1>📇 Contact Manager</h1>
            <p>ระบบจัดการรายชื่อติดต่อ</p>
        </header>

        <!-- Search & Add -->
        <div class="controls">
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="🔍 ค้นหาชื่อ...">
            </div>
            <button class="btn btn-primary" onclick="showAddForm()">
                ➕ เพิ่มรายชื่อ
            </button>
        </div>

        <!-- Add Contact Form (Hidden by default) -->
        <div id="addForm" class="form-container" style="display: none;">
            <h3>เพิ่มรายชื่อใหม่</h3>
            <form onsubmit="addContact(event)">
                <div class="form-group">
                    <label for="name">ชื่อ *</label>
                    <input type="text" id="name" name="name" required 
                           placeholder="ใส่ชื่อ...">
                    <!-- ⚠️ สมชายไม่ได้จำกัดความยาว! -->
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" 
                           placeholder="example@email.com">
                </div>
                <div class="form-group">
                    <label for="phone">เบอร์โทร</label>
                    <input type="text" id="phone" name="phone" 
                           placeholder="08x-xxx-xxxx">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-success">💾 บันทึก</button>
                    <button type="button" class="btn btn-secondary" onclick="hideAddForm()">
                        ❌ ยกเลิก
                    </button>
                </div>
            </form>
        </div>

        <!-- Contact List -->
        <div id="contactList" class="contact-list">
            <p class="loading">กำลังโหลด...</p>
        </div>

        <!-- Status Message -->
        <div id="statusMessage" class="status-message"></div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
EOF
```

**สร้าง frontend/css/style.css:**

```bash
cat > frontend/css/style.css << 'EOF'
/* ============================================
   Contact Manager Styles
   Designed by: สมชาย (Frontend Dev)
   ============================================ */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
}

/* Header */
.header {
    text-align: center;
    color: white;
    margin-bottom: 30px;
}

.header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.header p {
    opacity: 0.9;
}

/* Controls */
.controls {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
}

.search-box {
    flex: 1;
}

.search-box input {
    width: 100%;
    padding: 12px 15px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Buttons */
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.btn-primary {
    background: #4CAF50;
    color: white;
}

.btn-success {
    background: #28a745;
    color: white;
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-danger {
    background: #dc3545;
    color: white;
    padding: 8px 16px;
    font-size: 0.9rem;
}

/* Form */
.form-container {
    background: white;
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.form-container h3 {
    margin-bottom: 20px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #555;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.form-group input:focus {
    outline: none;
    border-color: #667eea;
}

.form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

/* Contact List */
.contact-list {
    display: grid;
    gap: 15px;
}

.contact-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s;
}

.contact-card:hover {
    transform: translateX(5px);
}

.contact-info h3 {
    color: #333;
    margin-bottom: 5px;
}

.contact-info p {
    color: #666;
    font-size: 0.9rem;
}

.contact-info p span {
    margin-right: 15px;
}

/* Status Message */
.status-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    display: none;
    animation: slideIn 0.3s ease;
}

.status-message.success {
    background: #28a745;
    display: block;
}

.status-message.error {
    background: #dc3545;
    display: block;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Loading */
.loading {
    text-align: center;
    color: white;
    font-size: 1.2rem;
    padding: 40px;
}

/* No Results */
.no-results {
    text-align: center;
    color: white;
    padding: 40px;
    background: rgba(255,255,255,0.1);
    border-radius: 12px;
}
EOF
```

**สร้าง frontend/js/app.js:**

```bash
cat > frontend/js/app.js << 'EOF'
// ============================================
// Contact Manager - Frontend JavaScript
// Developer: สมชาย (Frontend Dev)
// ============================================

const API_BASE = '/api';

// ============================================
// Load Contacts on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterContacts(e.target.value);
    });
});

// ============================================
// API Functions
// ============================================

async function loadContacts() {
    try {
        const response = await fetch(`${API_BASE}/contacts`);
        const data = await response.json();
        
        if (data.success) {
            renderContacts(data.data);
        } else {
            showStatus('ไม่สามารถโหลดข้อมูลได้', 'error');
        }
    } catch (error) {
        console.error('Error loading contacts:', error);
        showStatus('เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
    }
}

async function addContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // ⚠️ สมชายไม่ได้ validate ความยาวของ name!
    // เขาคิดว่า Backend จะจัดการให้
    
    try {
        const response = await fetch(`${API_BASE}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showStatus('เพิ่มรายชื่อสำเร็จ!', 'success');
            hideAddForm();
            loadContacts();
            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
        } else {
            showStatus(data.error || 'ไม่สามารถเพิ่มรายชื่อได้', 'error');
        }
    } catch (error) {
        console.error('Error adding contact:', error);
        showStatus('เกิดข้อผิดพลาด', 'error');
    }
}

async function deleteContact(id) {
    if (!confirm('ต้องการลบรายชื่อนี้?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/contacts/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showStatus('ลบรายชื่อสำเร็จ!', 'success');
            loadContacts();
        } else {
            showStatus('ไม่สามารถลบได้', 'error');
        }
    } catch (error) {
        console.error('Error deleting contact:', error);
        showStatus('เกิดข้อผิดพลาด', 'error');
    }
}

// ============================================
// UI Functions
// ============================================

function renderContacts(contacts) {
    const listElement = document.getElementById('contactList');
    
    if (contacts.length === 0) {
        listElement.innerHTML = `
            <div class="no-results">
                <p>📭 ไม่มีรายชื่อติดต่อ</p>
            </div>
        `;
        return;
    }
    
    listElement.innerHTML = contacts.map(contact => `
        <div class="contact-card" data-name="${contact.name.toLowerCase()}">
            <div class="contact-info">
                <h3>👤 ${escapeHtml(contact.name)}</h3>
                <p>
                    ${contact.email ? `<span>📧 ${escapeHtml(contact.email)}</span>` : ''}
                    ${contact.phone ? `<span>📱 ${escapeHtml(contact.phone)}</span>` : ''}
                </p>
            </div>
            <button class="btn btn-danger" onclick="deleteContact(${contact.id})">
                🗑️ ลบ
            </button>
        </div>
    `).join('');
}

function filterContacts(searchTerm) {
    const cards = document.querySelectorAll('.contact-card');
    const term = searchTerm.toLowerCase();
    
    cards.forEach(card => {
        const name = card.dataset.name;
        card.style.display = name.includes(term) ? 'flex' : 'none';
    });
}

function showAddForm() {
    document.getElementById('addForm').style.display = 'block';
}

function hideAddForm() {
    document.getElementById('addForm').style.display = 'none';
}

function showStatus(message, type) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;
    
    setTimeout(() => {
        statusEl.className = 'status-message';
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
EOF
```

---

### ⚙️ Step 1.3: สมหญิง - Backend Development

> **สมหญิง** รับผิดชอบสร้าง API และ Database

**สร้างโฟลเดอร์ backend:**

```bash
mkdir -p backend/src/routes backend/src/controllers backend/src/database
```

**สร้าง backend/package.json:**

```bash
cat > backend/package.json << 'EOF'
{
  "name": "contact-manager-api",
  "version": "1.0.0",
  "description": "Contact Manager REST API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "cors": "^2.8.5"
  }
}
EOF
```

**สร้าง backend/server.js:**

```bash
cat > backend/server.js << 'EOF'
// ============================================
// Contact Manager - Backend Server
// Developer: สมหญิง (Backend Dev)
// ============================================

const express = require('express');
const cors = require('cors');
const contactRoutes = require('./src/routes/contactRoutes');
const db = require('./src/database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
    next();
});

// Health check
app.get('/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.json({
            status: 'ok',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            error: error.message
        });
    }
});

// Routes
app.use('/api', contactRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});

// Start server
async function start() {
    try {
        await db.initialize();
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log('');
            console.log('╔════════════════════════════════════════════════════╗');
            console.log('║         📇 Contact Manager API                     ║');
            console.log('╠════════════════════════════════════════════════════╣');
            console.log(`║  🚀 Server running on port ${PORT}                 ║`);
            console.log('║  📊 Database: PostgreSQL                           ║');
            console.log('║  📍 Endpoints:                                     ║');
            console.log('║     GET    /health                                 ║');
            console.log('║     GET    /api/contacts                           ║');
            console.log('║     POST   /api/contacts                           ║');
            console.log('║     DELETE /api/contacts/:id                       ║');
            console.log('╚════════════════════════════════════════════════════╝');
            console.log('');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

start();
EOF
```

**สร้าง backend/src/database/db.js:**

```bash
cat > backend/src/database/db.js << 'EOF'
// ============================================
// Database Connection & Initialization
// Developer: สมหญิง (Backend Dev)
// ============================================

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'contactuser',
    password: process.env.DB_PASSWORD || 'contactpass',
    database: process.env.DB_NAME || 'contactdb',
});

async function initialize() {
    const client = await pool.connect();
    try {
        // สร้างตาราง (ถ้ายังไม่มี)
        await client.query(`
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(100),
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // ตรวจสอบว่ามีข้อมูลหรือยัง
        const result = await client.query('SELECT COUNT(*) FROM contacts');
        if (parseInt(result.rows[0].count) === 0) {
            // เพิ่มข้อมูลตัวอย่าง
            await client.query(`
                INSERT INTO contacts (name, email, phone) VALUES 
                    ('สมชาย ใจดี', 'somchai@email.com', '081-234-5678'),
                    ('สมหญิง รักเรียน', 'somying@email.com', '089-876-5432'),
                    ('John Doe', 'john@email.com', '02-123-4567')
            `);
        }
        
        console.log('✅ Database initialized');
    } finally {
        client.release();
    }
}

module.exports = {
    query: (text, params) => pool.query(text, params),
    initialize
};
EOF
```

**สร้าง backend/src/routes/contactRoutes.js:**

```bash
cat > backend/src/routes/contactRoutes.js << 'EOF'
// ============================================
// Contact Routes
// Developer: สมหญิง (Backend Dev)
// ============================================

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET /api/contacts - ดูรายชื่อทั้งหมด
router.get('/contacts', contactController.getAllContacts);

// GET /api/contacts/:id - ดูรายชื่อตาม ID
router.get('/contacts/:id', contactController.getContactById);

// POST /api/contacts - เพิ่มรายชื่อใหม่
router.post('/contacts', contactController.createContact);

// DELETE /api/contacts/:id - ลบรายชื่อ
router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;
EOF
```

**สร้าง backend/src/controllers/contactController.js (Version 1 - มี Bug!):**

```bash
cat > backend/src/controllers/contactController.js << 'EOF'
// ============================================
// Contact Controller
// Developer: สมหญิง (Backend Dev)
// Version: 1.0 (มี Bug!)
// ============================================

const db = require('../database/db');

class ContactController {
    
    // GET /api/contacts
    async getAllContacts(req, res, next) {
        try {
            const result = await db.query(
                'SELECT * FROM contacts ORDER BY created_at DESC'
            );
            
            res.json({
                success: true,
                data: result.rows,
                count: result.rows.length
            });
        } catch (error) {
            next(error);
        }
    }
    
    // GET /api/contacts/:id
    async getContactById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await db.query(
                'SELECT * FROM contacts WHERE id = $1',
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: `ไม่พบรายชื่อ #${id}`
                });
            }
            
            res.json({
                success: true,
                data: result.rows[0]
            });
        } catch (error) {
            next(error);
        }
    }
    
    // POST /api/contacts
    async createContact(req, res, next) {
        try {
            const { name, email, phone } = req.body;
            
            // ============================================
            // ⚠️ BUG: ไม่ได้ validate ความยาวของ name!
            // ============================================
            // สมหญิงตรวจสอบแค่ว่า name ต้องไม่ว่าง
            // แต่ไม่ได้ตรวจสอบว่า name ยาวเกิน 50 ตัวอักษรหรือไม่
            // ทำให้ถ้าส่ง name ยาวเกิน 50 ตัวอักษร
            // จะเกิด Database Error!
            
            if (!name || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'กรุณาระบุชื่อ'
                });
            }
            
            const result = await db.query(
                `INSERT INTO contacts (name, email, phone) 
                 VALUES ($1, $2, $3) 
                 RETURNING *`,
                [name.trim(), email, phone]
            );
            
            console.log(`✅ Created contact: ${name}`);
            
            res.status(201).json({
                success: true,
                data: result.rows[0],
                message: 'เพิ่มรายชื่อสำเร็จ'
            });
        } catch (error) {
            // ⚠️ Error จะเกิดที่นี่ถ้า name ยาวเกิน 50 ตัวอักษร
            // PostgreSQL error: value too long for type character varying(50)
            console.error('Error creating contact:', error.message);
            next(error);
        }
    }
    
    // DELETE /api/contacts/:id
    async deleteContact(req, res, next) {
        try {
            const { id } = req.params;
            
            const result = await db.query(
                'DELETE FROM contacts WHERE id = $1 RETURNING *',
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: `ไม่พบรายชื่อ #${id}`
                });
            }
            
            console.log(`🗑️ Deleted contact #${id}`);
            
            res.json({
                success: true,
                message: `ลบรายชื่อ #${id} สำเร็จ`
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ContactController();
EOF
```

**สร้าง backend/Dockerfile:**

```bash
cat > backend/Dockerfile << 'EOF'
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
EOF
```

**สร้าง backend/.dockerignore:**

```bash
cat > backend/.dockerignore << 'EOF'
node_modules
.git
*.log
.env
EOF
```

---

### 🌐 Step 1.4: สร้าง Nginx Config และ Docker Compose

**สร้าง nginx/default.conf:**

```bash
mkdir -p nginx
cat > nginx/default.conf << 'EOF'
# ============================================
# Nginx Configuration
# Reverse Proxy + Static Files
# ============================================

server {
    listen 80;
    server_name localhost;

    # Serve Frontend (Static Files)
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to Backend
    location /api/ {
        proxy_pass http://api:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Health check endpoint
    location /health {
        proxy_pass http://api:3000/health;
    }
}
EOF
```

**สร้าง docker-compose.yml:**

```bash
cat > docker-compose.yml << 'EOF'
# ============================================
# Docker Compose - Contact Manager
# ============================================

version: '3.8'

services:
  # Nginx - Reverse Proxy & Static Files
  nginx:
    image: nginx:alpine
    container_name: contact-nginx
    ports:
      - "8080:80"
    volumes:
      - ./frontend:/usr/share/nginx/html:ro
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - api
    restart: unless-stopped

  # Node.js API
  api:
    build: ./backend
    container_name: contact-api
    environment:
      - NODE_ENV=development
      - PORT=3000
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=${DB_NAME}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  # PostgreSQL Database
  db:
    image: postgres:16-alpine
    container_name: contact-db
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 10s
    restart: unless-stopped

volumes:
  postgres_data:
EOF
```

---

### ✅ Day 1 Checkpoint

```
┌─────────────────────────────────────────────────────────────────┐
│                    ✅ Day 1 Complete!                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🎨 สมชาย (Frontend):                                           │
│  ✅ index.html - UI สำหรับจัดการ contacts                         │
│  ✅ style.css - Styling สวยงาม                                  │
│  ✅ app.js - Logic เรียก API                                     │
│  ⚠️ ไม่ได้ validate ความยาว name ใน form                          │
│                                                                 │
│  ⚙️ สมหญิง (Backend):                                            │
│  ✅ server.js - Express server                                  │
│  ✅ contactRoutes.js - API routes                               │
│  ✅ contactController.js - Business logic                       │
│  ✅ db.js - Database connection                                 │
│  ⚠️ ไม่ได้ validate ความยาว name ก่อน INSERT                       │
│                                                                 │
│  📦 Infrastructure:                                             │
│  ✅ docker-compose.yml                                          │
│  ✅ nginx/default.conf                                          │
│  ✅ database/init.sql                                           │
│                                                                 │
│  ⚠️ Bug ที่ซ่อนอยู่:                                                 │
│  - Database: name VARCHAR(50) จำกัด 50 ตัวอักษร                    │
│  - Frontend: ไม่ได้จำกัดความยาว input                              │
│  - Backend: ไม่ได้ validate ความยาวก่อน INSERT                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📅 Day 2: Merge Code และพบ Bug

> **สถานการณ์:** ทีม merge code เข้าด้วยกัน แล้วรัน Integration Test

### Step 2.1: ทีมรวม Code และ Start Services

**Start all services:**

```bash
cd ~/docker-workshop/contact-manager

# Build และ Start
docker compose up -d --build

# ดู status
docker compose ps

# รอสักครู่แล้วดู logs
docker compose logs -f
```

**ผลลัพธ์ที่คาดหวัง:**
```
[+] Running 4/4
 ✔ Network contact-manager_default  Created
 ✔ Container contact-db             Healthy
 ✔ Container contact-api            Started
 ✔ Container contact-nginx          Started
```

**ทดสอบ:**
- เปิด browser ไปที่ http://localhost:8080
- ควรเห็นหน้า Contact Manager พร้อมรายชื่อ 3 คน

### Step 2.2: สมศักดิ์ (Tester/Team Lead) - Functional Testing

> **สมศักดิ์** เริ่มทดสอบระบบ

**Test Case 1: ดูรายชื่อทั้งหมด ✅**

```bash
curl http://localhost:8080/api/contacts
```

ผลลัพธ์: `{"success":true,"data":[...],"count":3}` ✅ PASS

**Test Case 2: เพิ่มรายชื่อปกติ ✅**

```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"ทดสอบ","email":"test@email.com","phone":"099-999-9999"}'
```

ผลลัพธ์: `{"success":true,"data":{...},"message":"เพิ่มรายชื่อสำเร็จ"}` ✅ PASS

**Test Case 3: เพิ่มรายชื่อชื่อว่าง ✅**

```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"test@email.com"}'
```

ผลลัพธ์: `{"success":false,"error":"กรุณาระบุชื่อ"}` ✅ PASS

**Test Case 4: เพิ่มรายชื่อที่ชื่อยาวมาก ❌ BUG!**

```bash
# ทดสอบด้วยชื่อ 60 ตัวอักษร (เกิน 50 ที่ DB รองรับ)
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"นายสมชาย รักเรียน มานะอุตสาหะ ขยันทำงาน รักความยุติธรรม ใจกว้าง","email":"long@email.com"}'
```

**ผลลัพธ์:**
```json
{
  "success": false,
  "error": "value too long for type character varying(50)"
}
```

**❌ BUG FOUND!**

---

### Step 2.3: สมศักดิ์ - Bug Report

**สร้าง docs/BUG_REPORT.md:**

```bash
mkdir -p docs
cat > docs/BUG_REPORT.md << 'EOF'
# 🐛 Bug Report

## Bug ID: BUG-001
## Title: ชื่อติดต่อเกิน 50 ตัวอักษรทำให้เกิด Database Error

### 📋 รายละเอียด

**Severity:** High  
**Status:** Open  
**Found by:** สมศักดิ์ (Tester/Team Lead)  
**Date:** Day 2 of Sprint

### 🔄 Steps to Reproduce

1. เปิดหน้า Contact Manager
2. คลิก "เพิ่มรายชื่อ"
3. ใส่ชื่อที่ยาวเกิน 50 ตัวอักษร เช่น:
   "นายสมชาย รักเรียน มานะอุตสาหะ ขยันทำงาน รักความยุติธรรม ใจกว้าง"
4. คลิก "บันทึก"

### ❌ Actual Result

แสดง Error: "value too long for type character varying(50)"

### ✅ Expected Result

- ถ้าชื่อยาวเกิน 50 ตัวอักษร ควรแสดง validation error ที่เข้าใจง่าย
- เช่น "ชื่อต้องไม่เกิน 50 ตัวอักษร"
- ไม่ควรแสดง Database error ให้ user เห็น

### 🔍 Root Cause Analysis

1. **Database:** `name` column เป็น VARCHAR(50) - จำกัด 50 ตัวอักษร
2. **Backend:** ไม่ได้ validate ความยาวก่อน INSERT
3. **Frontend:** Input field ไม่ได้จำกัด maxlength

### 💡 Suggested Fix

#### Frontend (สมชาย):
```html
<input type="text" id="name" maxlength="50" required>
```

#### Backend (สมหญิง):
```javascript
if (name.length > 50) {
    return res.status(400).json({
        success: false,
        error: 'ชื่อต้องไม่เกิน 50 ตัวอักษร'
    });
}
```

### 📎 Attachments

**API Request:**
```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"นายสมชาย รักเรียน มานะอุตสาหะ ขยันทำงาน รักความยุติธรรม ใจกว้าง"}'
```

**Error Response:**
```json
{
  "success": false,
  "error": "value too long for type character varying(50)"
}
```

---

**Assigned to:** สมหญิง (Backend), สมชาย (Frontend)
EOF
```

```
┌─────────────────────────────────────────────────────────────────┐
│                    🐛 BUG ANALYSIS                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ปัญหา: ชื่อที่ยาวเกิน 50 ตัวอักษรทำให้เกิด Database Error                │
│                                                                 │
│  Flow ที่เกิด Bug:                                                 │
│                                                                 │
│  User Input (60 chars)                                          │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────────────┐                                            │
│  │  Frontend       │  ❌ ไม่ได้ validate                          │
│  │  (สมชาย)        │     ไม่มี maxlength                          │
│  └────────┬────────┘                                            │
│           │ POST /api/contacts                                  │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │  Backend        │  ❌ ไม่ได้ validate                          │
│  │  (สมหญิง)        │     ตรวจแค่ว่าไม่ว่าง                          │
│  └────────┬────────┘                                            │
│           │ INSERT INTO contacts                                │
│           ▼                                                     │
│  ┌─────────────────┐                                            │
│  │  PostgreSQL     │  💥 ERROR!                                 │
│  │  VARCHAR(50)    │  "value too long for type..."              │
│  └─────────────────┘                                            │
│                                                                 │
│  ต้องแก้ทั้ง Frontend และ Backend!                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📅 Day 3: แก้ Bug และ Release

> **สถานการณ์:** ทีมแก้ Bug และทดสอบใหม่

### Step 3.1: สมหญิง - แก้ไข Backend

**อัพเดท backend/src/controllers/contactController.js (Version 2 - Fixed):**

```bash
cat > backend/src/controllers/contactController.js << 'EOF'
// ============================================
// Contact Controller
// Developer: สมหญิง (Backend Dev)
// Version: 2.0 (Bug Fixed!)
// ============================================

const db = require('../database/db');

// ============================================
// Constants
// ============================================
const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 100;
const MAX_PHONE_LENGTH = 20;

class ContactController {
    
    // GET /api/contacts
    async getAllContacts(req, res, next) {
        try {
            const result = await db.query(
                'SELECT * FROM contacts ORDER BY created_at DESC'
            );
            
            res.json({
                success: true,
                data: result.rows,
                count: result.rows.length
            });
        } catch (error) {
            next(error);
        }
    }
    
    // GET /api/contacts/:id
    async getContactById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await db.query(
                'SELECT * FROM contacts WHERE id = $1',
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: `ไม่พบรายชื่อ #${id}`
                });
            }
            
            res.json({
                success: true,
                data: result.rows[0]
            });
        } catch (error) {
            next(error);
        }
    }
    
    // POST /api/contacts
    async createContact(req, res, next) {
        try {
            const { name, email, phone } = req.body;
            
            // ============================================
            // ✅ FIX: Validate ความยาวก่อน INSERT
            // ============================================
            
            // Validate name
            if (!name || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'กรุณาระบุชื่อ'
                });
            }
            
            const trimmedName = name.trim();
            
            // ✅ NEW: ตรวจสอบความยาว name
            if (trimmedName.length > MAX_NAME_LENGTH) {
                return res.status(400).json({
                    success: false,
                    error: `ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร (ปัจจุบัน ${trimmedName.length} ตัวอักษร)`
                });
            }
            
            // ✅ NEW: ตรวจสอบความยาว email
            if (email && email.length > MAX_EMAIL_LENGTH) {
                return res.status(400).json({
                    success: false,
                    error: `Email ต้องไม่เกิน ${MAX_EMAIL_LENGTH} ตัวอักษร`
                });
            }
            
            // ✅ NEW: ตรวจสอบความยาว phone
            if (phone && phone.length > MAX_PHONE_LENGTH) {
                return res.status(400).json({
                    success: false,
                    error: `เบอร์โทรต้องไม่เกิน ${MAX_PHONE_LENGTH} ตัวอักษร`
                });
            }
            
            const result = await db.query(
                `INSERT INTO contacts (name, email, phone) 
                 VALUES ($1, $2, $3) 
                 RETURNING *`,
                [trimmedName, email, phone]
            );
            
            console.log(`✅ Created contact: ${trimmedName}`);
            
            res.status(201).json({
                success: true,
                data: result.rows[0],
                message: 'เพิ่มรายชื่อสำเร็จ'
            });
        } catch (error) {
            console.error('Error creating contact:', error.message);
            next(error);
        }
    }
    
    // DELETE /api/contacts/:id
    async deleteContact(req, res, next) {
        try {
            const { id } = req.params;
            
            const result = await db.query(
                'DELETE FROM contacts WHERE id = $1 RETURNING *',
                [id]
            );
            
            if (result.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: `ไม่พบรายชื่อ #${id}`
                });
            }
            
            console.log(`🗑️ Deleted contact #${id}`);
            
            res.json({
                success: true,
                message: `ลบรายชื่อ #${id} สำเร็จ`
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ContactController();
EOF
```

---

### Step 3.2: สมชาย - แก้ไข Frontend

**อัพเดท frontend/index.html (เฉพาะ input field):**

แก้ไขในส่วน form:

```bash
# แก้ไข input name ให้มี maxlength
sed -i 's/<input type="text" id="name" name="name" required/<input type="text" id="name" name="name" required maxlength="50"/' frontend/index.html
```

**อัพเดท frontend/js/app.js (เพิ่ม validation):**

```bash
cat > frontend/js/app.js << 'EOF'
// ============================================
// Contact Manager - Frontend JavaScript
// Developer: สมชาย (Frontend Dev)
// Version: 2.0 (Bug Fixed!)
// ============================================

const API_BASE = '/api';

// ============================================
// Constants
// ============================================
const MAX_NAME_LENGTH = 50;

// ============================================
// Load Contacts on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterContacts(e.target.value);
    });
    
    // ✅ NEW: Show character count for name input
    const nameInput = document.getElementById('name');
    nameInput.addEventListener('input', (e) => {
        updateCharCount(e.target);
    });
});

// ============================================
// API Functions
// ============================================

async function loadContacts() {
    try {
        const response = await fetch(`${API_BASE}/contacts`);
        const data = await response.json();
        
        if (data.success) {
            renderContacts(data.data);
        } else {
            showStatus('ไม่สามารถโหลดข้อมูลได้', 'error');
        }
    } catch (error) {
        console.error('Error loading contacts:', error);
        showStatus('เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
    }
}

async function addContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // ============================================
    // ✅ FIX: Validate ความยาว name ก่อนส่ง API
    // ============================================
    if (name.length > MAX_NAME_LENGTH) {
        showStatus(`ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร`, 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showStatus('เพิ่มรายชื่อสำเร็จ!', 'success');
            hideAddForm();
            loadContacts();
            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            // Reset char count
            const charCount = document.getElementById('charCount');
            if (charCount) charCount.textContent = `0/${MAX_NAME_LENGTH}`;
        } else {
            showStatus(data.error || 'ไม่สามารถเพิ่มรายชื่อได้', 'error');
        }
    } catch (error) {
        console.error('Error adding contact:', error);
        showStatus('เกิดข้อผิดพลาด', 'error');
    }
}

async function deleteContact(id) {
    if (!confirm('ต้องการลบรายชื่อนี้?')) return;
    
    try {
        const response = await fetch(`${API_BASE}/contacts/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showStatus('ลบรายชื่อสำเร็จ!', 'success');
            loadContacts();
        } else {
            showStatus('ไม่สามารถลบได้', 'error');
        }
    } catch (error) {
        console.error('Error deleting contact:', error);
        showStatus('เกิดข้อผิดพลาด', 'error');
    }
}

// ============================================
// UI Functions
// ============================================

function renderContacts(contacts) {
    const listElement = document.getElementById('contactList');
    
    if (contacts.length === 0) {
        listElement.innerHTML = `
            <div class="no-results">
                <p>📭 ไม่มีรายชื่อติดต่อ</p>
            </div>
        `;
        return;
    }
    
    listElement.innerHTML = contacts.map(contact => `
        <div class="contact-card" data-name="${contact.name.toLowerCase()}">
            <div class="contact-info">
                <h3>👤 ${escapeHtml(contact.name)}</h3>
                <p>
                    ${contact.email ? `<span>📧 ${escapeHtml(contact.email)}</span>` : ''}
                    ${contact.phone ? `<span>📱 ${escapeHtml(contact.phone)}</span>` : ''}
                </p>
            </div>
            <button class="btn btn-danger" onclick="deleteContact(${contact.id})">
                🗑️ ลบ
            </button>
        </div>
    `).join('');
}

function filterContacts(searchTerm) {
    const cards = document.querySelectorAll('.contact-card');
    const term = searchTerm.toLowerCase();
    
    cards.forEach(card => {
        const name = card.dataset.name;
        card.style.display = name.includes(term) ? 'flex' : 'none';
    });
}

function showAddForm() {
    document.getElementById('addForm').style.display = 'block';
}

function hideAddForm() {
    document.getElementById('addForm').style.display = 'none';
}

function showStatus(message, type) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;
    
    setTimeout(() => {
        statusEl.className = 'status-message';
    }, 3000);
}

// ✅ NEW: Update character count
function updateCharCount(input) {
    const charCount = document.getElementById('charCount');
    if (charCount) {
        const current = input.value.length;
        charCount.textContent = `${current}/${MAX_NAME_LENGTH}`;
        charCount.style.color = current > MAX_NAME_LENGTH ? '#dc3545' : '#666';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
EOF
```

**อัพเดท frontend/index.html ให้แสดง character count:**

```bash
cat > frontend/index.html << 'EOF'
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📇 Contact Manager</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <h1>📇 Contact Manager</h1>
            <p>ระบบจัดการรายชื่อติดต่อ - v2.0</p>
        </header>

        <!-- Search & Add -->
        <div class="controls">
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="🔍 ค้นหาชื่อ...">
            </div>
            <button class="btn btn-primary" onclick="showAddForm()">
                ➕ เพิ่มรายชื่อ
            </button>
        </div>

        <!-- Add Contact Form (Hidden by default) -->
        <div id="addForm" class="form-container" style="display: none;">
            <h3>เพิ่มรายชื่อใหม่</h3>
            <form onsubmit="addContact(event)">
                <div class="form-group">
                    <label for="name">ชื่อ * <span id="charCount" class="char-count">0/50</span></label>
                    <!-- ✅ FIX: เพิ่ม maxlength="50" -->
                    <input type="text" id="name" name="name" required 
                           maxlength="50"
                           placeholder="ใส่ชื่อ (ไม่เกิน 50 ตัวอักษร)">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" 
                           placeholder="example@email.com">
                </div>
                <div class="form-group">
                    <label for="phone">เบอร์โทร</label>
                    <input type="text" id="phone" name="phone" 
                           maxlength="20"
                           placeholder="08x-xxx-xxxx">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-success">💾 บันทึก</button>
                    <button type="button" class="btn btn-secondary" onclick="hideAddForm()">
                        ❌ ยกเลิก
                    </button>
                </div>
            </form>
        </div>

        <!-- Contact List -->
        <div id="contactList" class="contact-list">
            <p class="loading">กำลังโหลด...</p>
        </div>

        <!-- Status Message -->
        <div id="statusMessage" class="status-message"></div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
EOF
```

**เพิ่ม CSS สำหรับ character count:**

```bash
cat >> frontend/css/style.css << 'EOF'

/* Character Count */
.char-count {
    font-size: 0.85rem;
    font-weight: normal;
    color: #666;
    float: right;
}
EOF
```

---

### Step 3.3: Rebuild และ Test

**Rebuild services:**

```bash
# Rebuild backend (มี code ใหม่)
docker compose up -d --build

# ดู logs
docker compose logs -f api
```

**Test อีกครั้ง:**

```bash
# Test ด้วยชื่อปกติ
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"ทดสอบหลังแก้","email":"fixed@email.com"}'

# ผลลัพธ์: {"success":true,...} ✅

# Test ด้วยชื่อยาวเกิน 50 ตัวอักษร
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"นายสมชาย รักเรียน มานะอุตสาหะ ขยันทำงาน รักความยุติธรรม ใจกว้าง","email":"long@email.com"}'

# ผลลัพธ์: {"success":false,"error":"ชื่อต้องไม่เกิน 50 ตัวอักษร (ปัจจุบัน 60 ตัวอักษร)"} ✅
```

---

### Step 3.4: อัพเดท Bug Report

**อัพเดท docs/BUG_REPORT.md:**

```bash
cat >> docs/BUG_REPORT.md << 'EOF'

---

## Resolution

**Fixed by:** สมหญิง (Backend), สมชาย (Frontend)  
**Fix Date:** Day 3 of Sprint  
**Version:** 2.0

### Changes Made

#### Backend (contactController.js v2.0):
```javascript
const MAX_NAME_LENGTH = 50;

if (trimmedName.length > MAX_NAME_LENGTH) {
    return res.status(400).json({
        success: false,
        error: `ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร (ปัจจุบัน ${trimmedName.length} ตัวอักษร)`
    });
}
```

#### Frontend (index.html):
```html
<input type="text" id="name" maxlength="50" required>
```

#### Frontend (app.js v2.0):
```javascript
if (name.length > MAX_NAME_LENGTH) {
    showStatus(`ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร`, 'error');
    return;
}
```

### Verification

✅ Test Case 4 (ชื่อยาวเกิน 50 ตัวอักษร) - PASS
- API returns: `{"success":false,"error":"ชื่อต้องไม่เกิน 50 ตัวอักษร..."}`
- No database error exposed to user
- Frontend shows character count and prevents input > 50

**Status:** Closed ✅
EOF
```

---

## ✅ สรุปและบทเรียนที่ได้

```
┌─────────────────────────────────────────────────────────────────┐
│                    🎉 WORKSHOP 2 COMPLETE!                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📁 Final Project Structure:                                    │
│                                                                 │
│  contact-manager/                                               │
│  ├── docker-compose.yml                                         │
│  ├── .env / .env.example                                        │
│  ├── frontend/                                                  │
│  │   ├── index.html       (v2.0 - maxlength added)              │
│  │   ├── css/style.css                                          │
│  │   └── js/app.js        (v2.0 - validation added)             │
│  ├── backend/                                                   │
│  │   ├── Dockerfile                                             │
│  │   ├── package.json                                           │
│  │   ├── server.js                                              │
│  │   └── src/                                                   │
│  │       ├── controllers/                                       │
│  │       │   └── contactController.js  (v2.0 - validation)      │
│  │       ├── routes/contactRoutes.js                            │
│  │       └── database/db.js                                     │
│  ├── database/init.sql                                          │
│  ├── nginx/default.conf                                         │
│  └── docs/BUG_REPORT.md                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 📚 บทเรียนสำคัญ

```
┌─────────────────────────────────────────────────────────────────┐
│                    📚 KEY LEARNINGS                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 🐳 Docker ช่วยให้ทีมทำงานร่วมกันได้ง่าย                            │
│     - ทุกคนใช้ environment เดียวกัน                                 │
│     - "Works on my machine" → Works everywhere!                 │
│     - docker compose up = ทุกอย่างพร้อมใช้งาน                       │
│                                                                 │
│  2. 🔄 Git Branch Strategy                                      │
│     - feature/frontend - สมชาย                                  │
│     - feature/backend - สมหญิง                                   │
│     - main - merge แล้วทดสอบ                                     │
│                                                                 │
│  3. 🧪 Testing สำคัญ!                                            │
│     - Functional Test พบ Bug ก่อน Release                        │
│     - ต้องทดสอบ edge cases (ค่าเกินขอบเขต, ค่าว่าง, etc.)            │
│                                                                 │
│  4. 🛡️ Validation ต้องทำทั้ง 2 ที่                                   │
│     - Frontend: UX ที่ดี, ป้องกันเบื้องต้น                              │
│     - Backend: Security, ป้องกัน DB errors                        │
│     - Never trust frontend alone!                               │
│                                                                 │
│  5. 📝 Bug Report ที่ดีช่วยแก้ไขได้เร็ว                                │
│     - Steps to reproduce                                        │
│     - Expected vs Actual result                                 │
│     - Root cause analysis                                       │
│     - Suggested fix                                             │
│                                                                 │
│  6. 🔒 Defense in Depth                                         │
│     - Database: VARCHAR(50) = last line of defense              │
│     - Backend: Validate before INSERT                           │
│     - Frontend: maxlength + JS validation                       │
│     - ป้องกันหลายชั้น = ปลอดภัยกว่า                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 🧹 Cleanup

```bash
# หยุดและลบทุกอย่าง
docker compose down -v

# หรือเก็บไว้ใช้ต่อ
docker compose stop
```

---

## 📊 Git Workflow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            GIT WORKFLOW                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  main ●────────────────●──────────────────●────────────────●──► Release     │
│       │                │                  │                │                │
│       │  Day 1         │   Day 2          │    Day 3       │                │
│       │                │   Merge          │    Bug Fix     │                │
│       │                │                  │                │                │
│       │    ┌───────────┼───┐              │                │                │
│       │    │           │   │              │                │                │
│       │    │           │   │              │                │                │
│feature│    ▼           │   ▼              │                │                │
│/front │ ●──●──●────────┼───●──────────────┼────●───────────┤                │
│ end   │ สมชาย          │   PR             │    Fix         │                │
│       │ UI + JS        │                  │    Frontend    │                │
│       │                │                  │                │                │
│feature│    ▼           │   ▼              │                │                │
│/back  │ ●──●──●────────┼───●──────────────┼────●───────────┤                │
│ end   │ สมหญิง          │   PR             │    Fix         │                │
│       │ API + DB       │                  │    Backend     │                │
│       │                │                  │                │                │
│       │                │   ▼              │                │                │
│       │                │   🧪 Test        │                │                │
│       │                │   ❌ Bug Found   │                │                │
│       │                │                  │                │                │
│       │                │                  │   ▼            │                │
│       │                │                  │   🧪 Retest    │                │
│       │                │                  │   ✅ Pass      │                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 พร้อมสำหรับ Week 6 Lab

หลังจบ Workshop นี้ นักศึกษาพร้อมสำหรับ Week 6 Lab ที่จะทำ:

| Workshop | Week 6 Lab |
|----------|------------|
| Single App + DB | N-Tier (Nginx + API + DB) |
| Simple validation | Layered Architecture |
| Basic Docker Compose | Advanced Compose + SSL |
| 3 containers | 3+ containers |

**สิ่งที่เตรียมพร้อมแล้ว:**
- ✅ เข้าใจ Docker Compose
- ✅ เข้าใจ Multi-container networking
- ✅ เข้าใจ Volume persistence
- ✅ เข้าใจการทำงานเป็นทีม
- ✅ เข้าใจ Bug lifecycle

---

**🚀 พร้อมสำหรับ Week 6 Lab!**
