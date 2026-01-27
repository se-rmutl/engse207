# 👥 Workshop 2: Team Development Simulation
## จำลองการพัฒนาซอฟต์แวร์เป็นทีมด้วย Docker + Git

**รายวิชา:** ENGSE207 Software Architecture  
**ประเภท:** Pre-Lab Workshop (ทำก่อน Week 6 Lab)  
**ระยะเวลา:** 90 นาที  
**ระดับความยาก:** ⭐⭐⭐ (กลาง)

---

## 📋 สารบัญ

1. [บทนำ: สถานการณ์จำลอง](#บทนำ-สถานการณ์จำลอง)
2. [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
3. [Phase 0: Planning - ตกลง API Contract](#phase-0-planning)
4. [Day 1: แต่ละคนพัฒนางานของตัวเอง](#day-1-แต่ละคนพัฒนางานของตัวเอง)
5. [Day 2: Merge Code และพบ Bug](#day-2-merge-code-และพบ-bug)
6. [Day 3: แก้ Bug และ Release](#day-3-แก้-bug-และ-release)
7. [สรุปและบทเรียนที่ได้](#สรุปและบทเรียนที่ได้)

---

## 🎬 บทนำ: สถานการณ์จำลอง

### 📌 Project: Contact Manager

บริษัท TechStart กำลังพัฒนาระบบ Contact Manager ใหม่ โดยทีมมี 3 คน:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        🏢 TechStart Development Team                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   🎨 Frontend Developer      ⚙️ Backend Developer      🧪 Tester/Team Lead  │
│   ┌─────────────────────┐    ┌─────────────────────┐    ┌────────────────┐  │
│   │      สมชาย          │    │      สมหญิง          │    │    สมศักดิ์       │  │
│   │                     │    │                     │    │                │  │
│   │  หน้าที่:              │    │  หน้าที่:              │    │  หน้าที่:         │  │
│   │  • UI Design        │    │  • REST API         │    │  • Setup Repo  │  │
│   │  • HTML/CSS/JS      │    │  • Database         │    │  • Merge Code  │  │
│   │  • Mock Data ⭐     │    │  • Validation       │    │  • Test & QA   │  │
│   │                     │    │                     │    │                │  │
│   │  Branch:            │    │  Branch:            │    │  Branch:       │  │
│   │  feature/frontend   │    │  feature/backend    │    │  main          │  │
│   └─────────────────────┘    └─────────────────────┘    └────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🗓️ Development Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT WORKFLOW                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Phase 0           Day 1                 Day 2                 Day 3        │
│  ════════          ═══════               ═══════               ═══════      │
│                                                                             │
│  ┌──────────┐     ┌─────────────┐       ┌─────────────┐       ┌──────────┐  │
│  │ Planning │ ──► │ Development │  ──►  │   Merge &   │  ──►  │ Bug Fix  │  │
│  │          │     │   Phase     │       │   Testing   │       │ Release  │  │
│  └──────────┘     └─────────────┘       └─────────────┘       └──────────┘  │
│                                                                             │
│  📋 ตกลง API     🎨 Frontend:          🔄 Merge:             🐛 Bug Fix:    │
│  Contract         • สร้าง UI             • รวม code             • Validation │
│  ก่อนเริ่มทำ         • Mock Data ⭐        • ปิด Mock Mode         • ทั้ง 2 ฝั่ง    │
│                   • ทดสอบได้เลย          • Docker Compose                    │
│                                                                             │
│                  ⚙️ Backend:           🧪 Testing:           ✅ Release:    │ 
│                   • สร้าง API            • TC1-TC4              • Retest     │
│                   • Database            • ❌ พบ Bug!           • Tag v2.0   │
│                   • ทดสอบด้วย curl                                           │
│                                                                             │
│   ⏱️ 10 นาที        ⏱️ 30 นาที              ⏱️ 20 นาที            ⏱️ 20 นาที    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🎯 Learning Objectives

เมื่อจบ Workshop นี้ นักศึกษาจะเข้าใจ:

1. **API Contract** - ทำไมต้องตกลง spec ก่อนเริ่มทำ
2. **Mock Data** - Frontend ทดสอบอย่างไรเมื่อ API ยังไม่พร้อม
3. **Git Workflow** - การทำงานเป็นทีมด้วย branches
4. **Docker ในทีม** - ทุกคนใช้ environment เดียวกัน
5. **Bug Discovery** - พบ bug จาก integration testing
6. **Bug Fix Process** - วิธีแก้ไขและ verify

---

## 📁 โครงสร้างโปรเจกต์

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
│       └── app.js              # ⭐ มี Mock Data!
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
    ├── API.md                  # ⭐ ตกลงก่อนเริ่มทำ!
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

## 🤝 Phase 0: Planning - ตกลง API Contract

> ⏱️ **เวลา:** 10 นาที  
> 👥 **ผู้ทำ:** ทั้งทีม  
> 🎯 **เป้าหมาย:** ตกลง API specification ก่อนเริ่มพัฒนา

### ทำไมต้องตกลง API Contract ก่อน?

```
┌────────────────────────────────────────────────────────────────┐
│  ❌ ถ้าไม่ตกลงก่อน:                                               │
│  สมชาย คิดว่า: { "contacts": [...] }                             │
│  สมหญิง ทำ:    { "success": true, "data": [...] }               │
│                 → Format ไม่ตรง! Merge แล้วพัง!                   │
├────────────────────────────────────────────────────────────────┤
│  ✅ ถ้าตกลงก่อน:                                                 │
│  ทุกคนใช้: { "success": true, "data": [...], "count": 3 }        │
│  • สมชาย: ใช้ format นี้ทำ Mock Data                              │
│  • สมหญิง: ทำ API ให้ return format นี้                            │
│                 → Format ตรงกัน! Merge แล้วทำงานได้!              │
└────────────────────────────────────────────────────────────────┘
```

### สร้างไฟล์ API Contract

```bash
mkdir -p docs
cat > docs/API_CONTRACT.md << 'EOF'
# 📋 API Contract - Contact Manager

**Version:** 1.0  
**ตกลงเมื่อ:** Phase 0 (ก่อนเริ่มพัฒนา)

## Response Format

### Success Response
```json
{ "success": true, "data": <any>, "message": "...", "count": <number> }
```

### Error Response
```json
{ "success": false, "error": "ข้อความ error" }
```

## Endpoints

| Endpoint | Method | Response |
|----------|--------|----------|
| `/api/contacts` | GET | `{ success, data: [...], count }` |
| `/api/contacts` | POST | `{ success, data, message }` |
| `/api/contacts/:id` | DELETE | `{ success, message }` |

### GET /api/contacts
```json
{ "success": true, "data": [...], "count": 3 }
```

### POST /api/contacts
Request: `{ "name": "ชื่อ", "email": "...", "phone": "..." }`
Response: `{ "success": true, "data": {...}, "message": "เพิ่มรายชื่อสำเร็จ" }`

### DELETE /api/contacts/:id
Response: `{ "success": true, "message": "ลบรายชื่อสำเร็จ" }`

---
**ลงชื่อยืนยัน:**
- [x] สมชาย - จะใช้ format นี้ทำ Mock Data
- [x] สมหญิง - จะทำ API ให้ return format นี้
- [x] สมศักดิ์ - จะทดสอบตาม format นี้
EOF
```

📢 **สมศักดิ์:** "API Contract ตกลงเรียบร้อย ผมจะสร้าง repo ก่อน"

---

## 📅 Day 1: แต่ละคนพัฒนางานของตัวเอง

### 🚀 Step 1.1: สมศักดิ์ - สร้าง Repository

> 👤 **ผู้ทำ:** สมศักดิ์  
> ⏸️ **สมชาย + สมหญิง:** รอจนกว่าจะเสร็จ

```bash
# สร้างโฟลเดอร์
mkdir -p ~/docker-workshop/contact-manager
cd ~/docker-workshop/contact-manager

# Init Git
git init
```

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

**สร้าง .env.example และ .env:**

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

cp .env.example .env
```

**Commit:**

```bash
git add .
git commit -m "Initial commit: project setup"
```

**สร้างโครงสร้างโฟลเดอร์:**

```bash
mkdir -p frontend/css frontend/js
mkdir -p backend/src/routes backend/src/controllers backend/src/database
mkdir -p database nginx docs
```

**สร้าง database/init.sql:**

```bash
cat > database/init.sql << 'EOF'
-- ============================================
-- Contact Manager Database Schema
-- ============================================

-- สร้างตาราง contacts
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
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

**สร้าง docker-compose.yml:**

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
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

  api:
    build: ./backend
    container_name: contact-api
    environment:
      - DB_HOST=db
      - DB_PORT=5432
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=${DB_NAME}
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    container_name: contact-db
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
EOF
```

**สร้าง nginx/default.conf:**

```bash
cat > nginx/default.conf << 'EOF'
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }

    location /api/ {
        proxy_pass http://api:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    location /health {
        proxy_pass http://api:3000/health;
    }
}
EOF
```

**Commit และแจ้งทีม:**

```bash
git add .
git commit -m "Add project structure and docker-compose"
git log --oneline
```

📢 **สมศักดิ์แจ้งทีม:** "Repo พร้อมแล้ว! แตก branch ได้เลย"

---

### 🎨 Step 1.2: สมชาย - Frontend Development (พร้อม Mock Data)

> 👤 **ผู้ทำ:** สมชาย  
> ⚡ **ทำพร้อมกับ:** สมหญิง (คนละ branch)

```bash
cd ~/docker-workshop/contact-manager
git checkout -b feature/frontend
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
        <header class="header">
            <h1>📇 Contact Manager</h1>
            <p>ระบบจัดการรายชื่อติดต่อ</p>
            <!-- Mock Mode Indicator -->
            <div id="mockIndicator" class="mock-indicator" style="display: none;">
                🔶 MOCK MODE
            </div>
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
                    <!-- ⚠️ ยังไม่มี maxlength (จะเพิ่มตอน fix bug) -->
                    <input type="text" id="name" required placeholder="ใส่ชื่อ...">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="example@email.com">
                </div>
                <div class="form-group">
                    <label for="phone">เบอร์โทร</label>
                    <input type="text" id="phone" placeholder="08x-xxx-xxxx">
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

git add frontend/index.html
git commit -m "feat(frontend): add index.html structure"
```

**สร้าง frontend/css/style.css:**

```bash
cat > frontend/css/style.css << 'EOF'
/* Contact Manager Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container { max-width: 800px; margin: 0 auto; }

.header { text-align: center; color: white; margin-bottom: 30px; }
.header h1 { font-size: 2.5rem; margin-bottom: 10px; }

/* Mock Indicator */
.mock-indicator {
    background: #ff9800;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    display: inline-block;
    margin-top: 10px;
    font-size: 0.8rem;
    font-weight: bold;
    animation: pulse 2s infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }

.controls { display: flex; gap: 15px; margin-bottom: 20px; }
.search-box { flex: 1; }
.search-box input {
    width: 100%;
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: #4CAF50; color: white; }
.btn-success { background: #28a745; color: white; }
.btn-secondary { background: #6c757d; color: white; }
.btn-danger { background: #dc3545; color: white; }

.form-container {
    background: white;
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}
.form-container h3 { margin-bottom: 20px; color: #333; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; font-weight: 600; color: #555; }
.form-group input {
    width: 100%;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
}
.form-group input:focus { outline: none; border-color: #667eea; }
.form-actions { display: flex; gap: 10px; margin-top: 20px; }

.contact-list { display: grid; gap: 15px; }
.contact-card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.contact-info h3 { color: #333; margin-bottom: 5px; }
.contact-info p { color: #666; font-size: 0.9rem; }

.status-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    display: none;
}
.status-message.success { background: #28a745; display: block; }
.status-message.error { background: #dc3545; display: block; }

.loading { text-align: center; color: white; font-size: 1.2rem; padding: 40px; }
EOF

git add frontend/css/style.css
git commit -m "feat(frontend): add CSS styles"
```

**สร้าง frontend/js/app.js (พร้อม Mock Data) ⭐:**

```bash
cat > frontend/js/app.js << 'EOF'
// ============================================
// Contact Manager - Frontend JavaScript
// Developer: สมชาย
// Version: 1.0 (with Mock Data)
// ============================================

const API_BASE = '/api';

// ============================================
// 🔶 MOCK DATA CONFIGURATION
// ============================================
// ตั้งค่า USE_MOCK = true เพื่อทดสอบ UI โดยไม่ต้องรอ Backend
// เมื่อ Backend พร้อมแล้ว ให้เปลี่ยนเป็น false

const USE_MOCK = true;  // ⬅️ เปลี่ยนเป็น false เมื่อ merge แล้ว

// Mock Data - ใช้ format เดียวกับ API Contract
const MOCK_CONTACTS = [
    { id: 1, name: "ทดสอบ หนึ่ง", email: "test1@example.com", phone: "081-111-1111" },
    { id: 2, name: "ทดสอบ สอง", email: "test2@example.com", phone: "082-222-2222" },
    { id: 3, name: "ทดสอบ สาม", email: "test3@example.com", phone: "083-333-3333" }
];

let mockIdCounter = 4;

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    if (USE_MOCK) {
        console.log("🔶🔶🔶 MOCK MODE ENABLED 🔶🔶🔶");
        console.log("เปลี่ยน USE_MOCK = false เมื่อ API พร้อม");
        document.getElementById('mockIndicator').style.display = 'inline-block';
    }
    
    loadContacts();
    
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterContacts(e.target.value);
    });
});

// ============================================
// API Functions (รองรับทั้ง Mock และ Real)
// ============================================

async function loadContacts() {
    try {
        if (USE_MOCK) {
            console.log("🔶 [MOCK] Loading contacts...");
            await delay(300);
            renderContacts(MOCK_CONTACTS);
            return;
        }
        
        const response = await fetch(`${API_BASE}/contacts`);
        const data = await response.json();
        
        if (data.success) {
            renderContacts(data.data);
        } else {
            showStatus('ไม่สามารถโหลดข้อมูลได้', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showStatus('เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
    }
}

async function addContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    if (!name) {
        showStatus('กรุณาใส่ชื่อ', 'error');
        return;
    }
    
    // ⚠️ Bug: ไม่ได้ validate ความยาวของ name!
    // จะถูกค้นพบตอน Integration Test
    
    try {
        if (USE_MOCK) {
            console.log("🔶 [MOCK] Adding:", { name, email, phone });
            await delay(300);
            
            MOCK_CONTACTS.push({
                id: mockIdCounter++,
                name, email: email || null, phone: phone || null
            });
            
            showStatus('เพิ่มรายชื่อสำเร็จ! (Mock)', 'success');
            hideAddForm();
            clearForm();
            loadContacts();
            return;
        }
        
        const response = await fetch(`${API_BASE}/contacts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showStatus('เพิ่มรายชื่อสำเร็จ!', 'success');
            hideAddForm();
            clearForm();
            loadContacts();
        } else {
            showStatus(data.error || 'ไม่สามารถเพิ่มได้', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showStatus('เกิดข้อผิดพลาด', 'error');
    }
}

async function deleteContact(id) {
    if (!confirm('ต้องการลบรายชื่อนี้?')) return;
    
    try {
        if (USE_MOCK) {
            console.log("🔶 [MOCK] Deleting:", id);
            await delay(300);
            
            const index = MOCK_CONTACTS.findIndex(c => c.id === id);
            if (index > -1) MOCK_CONTACTS.splice(index, 1);
            
            showStatus('ลบรายชื่อสำเร็จ! (Mock)', 'success');
            loadContacts();
            return;
        }
        
        const response = await fetch(`${API_BASE}/contacts/${id}`, { method: 'DELETE' });
        const data = await response.json();
        
        if (data.success) {
            showStatus('ลบรายชื่อสำเร็จ!', 'success');
            loadContacts();
        } else {
            showStatus('ไม่สามารถลบได้', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showStatus('เกิดข้อผิดพลาด', 'error');
    }
}

// ============================================
// UI Functions
// ============================================

function renderContacts(contacts) {
    const list = document.getElementById('contactList');
    
    if (contacts.length === 0) {
        list.innerHTML = '<div class="loading">📭 ไม่มีรายชื่อติดต่อ</div>';
        return;
    }
    
    list.innerHTML = contacts.map(c => `
        <div class="contact-card" data-name="${c.name.toLowerCase()}">
            <div class="contact-info">
                <h3>👤 ${escapeHtml(c.name)}</h3>
                <p>
                    ${c.email ? `📧 ${escapeHtml(c.email)}` : ''}
                    ${c.phone ? ` 📱 ${escapeHtml(c.phone)}` : ''}
                </p>
            </div>
            <button class="btn btn-danger" onclick="deleteContact(${c.id})">🗑️ ลบ</button>
        </div>
    `).join('');
}

function filterContacts(term) {
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach(card => {
        card.style.display = card.dataset.name.includes(term.toLowerCase()) ? 'flex' : 'none';
    });
}

function showAddForm() { document.getElementById('addForm').style.display = 'block'; }
function hideAddForm() { document.getElementById('addForm').style.display = 'none'; }
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}

function showStatus(message, type) {
    const el = document.getElementById('statusMessage');
    el.textContent = message;
    el.className = `status-message ${type}`;
    setTimeout(() => { el.className = 'status-message'; }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
EOF

git add frontend/js/app.js
git commit -m "feat(frontend): add JavaScript with Mock Data support"
```

**ทดสอบด้วย Mock Data:**

```bash
# เปิด HTML โดยตรง (ไม่ต้องรอ Backend!)
open frontend/index.html    # macOS
# หรือ
start frontend/index.html   # Windows
```

✅ **ผลลัพธ์:** เห็น UI พร้อม "🔶 MOCK MODE" ทำงานได้!

📢 **สมชาย:** "Frontend เสร็จแล้ว ทดสอบด้วย Mock ผ่าน!"

---

### ⚙️ Step 1.3: สมหญิง - Backend Development (ทำพร้อมกับสมชาย)

> 👤 **ผู้ทำ:** สมหญิง  
> ⚡ **ทำพร้อมกับ:** สมชาย

```bash
cd ~/docker-workshop/contact-manager
git checkout main
git checkout -b feature/backend
```

**สร้าง backend/package.json:**

```bash
cat > backend/package.json << 'EOF'
{
  "name": "contact-manager-api",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "cors": "^2.8.5"
  }
}
EOF

git add backend/package.json
git commit -m "feat(backend): add package.json"
```

**สร้าง backend/src/database/db.js:**

```bash
cat > backend/src/database/db.js << 'EOF'
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'contactuser',
    password: process.env.DB_PASSWORD || 'contactpass',
    database: process.env.DB_NAME || 'contactdb',
});

pool.on('connect', () => console.log('✅ Connected to PostgreSQL'));
module.exports = pool;
EOF

git add backend/src/database/db.js
git commit -m "feat(backend): add database connection"
```

**สร้าง backend/src/controllers/contactController.js:**

```bash
cat > backend/src/controllers/contactController.js << 'EOF'
// ============================================
// Contact Controller
// Developer: สมหญิง (Backend Dev)
// Version: 1.0 (มี Bug!)
// ⚠️ Bug: ไม่ได้ validate ความยาว name!
// ============================================

const pool = require('../database/db');

exports.getAllContacts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
        res.json({ success: true, data: result.rows, count: result.rows.length });
    } catch (error) {
        res.status(500).json({ success: false, error: 'ไม่สามารถดึงข้อมูลได้' });
    }
};

exports.createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        
        if (!name || name.trim() === '') {
            return res.status(400).json({ success: false, error: 'กรุณาระบุชื่อ' });
        }
        
        // ⚠️ Bug: ไม่ได้ตรวจสอบความยาว name ก่อน INSERT!
        // Database มี VARCHAR(50) แต่ไม่ได้เช็คก่อน
        
        const result = await pool.query(
            'INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [name.trim(), email || null, phone || null]
        );
        
        res.status(201).json({ success: true, data: result.rows[0], message: 'เพิ่มรายชื่อสำเร็จ' });
    } catch (error) {
        // ⚠️ Bug: ส่ง database error ตรงๆ!
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'ไม่พบรายชื่อ' });
        }
        
        res.json({ success: true, message: 'ลบรายชื่อสำเร็จ' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'ไม่สามารถลบได้' });
    }
};
EOF

git add backend/src/controllers/contactController.js
git commit -m "feat(backend): add contact controller"
```

**สร้าง backend/src/routes/contactRoutes.js:**

```bash
cat > backend/src/routes/contactRoutes.js << 'EOF'
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contactController');

router.get('/', ctrl.getAllContacts);
router.post('/', ctrl.createContact);
router.delete('/:id', ctrl.deleteContact);

module.exports = router;
EOF

git add backend/src/routes/contactRoutes.js
git commit -m "feat(backend): add routes"
```

**สร้าง backend/server.js:**

```bash
cat > backend/server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./src/routes/contactRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/contacts', contactRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
EOF

git add backend/server.js
git commit -m "feat(backend): add server"
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

git add backend/Dockerfile
git commit -m "feat(backend): add Dockerfile"
```

**ทดสอบ Backend:**

```bash
docker compose up -d db api
sleep 15
curl http://localhost:3000/api/contacts
```

✅ **ผลลัพธ์:** API return JSON ถูกต้อง

📢 **สมหญิง:** "Backend เสร็จแล้ว ทดสอบด้วย curl ผ่าน!"

---

## 📅 Day 2: Merge Code และพบ Bug

### Step 2.1: สมศักดิ์ - Merge Branches

```bash
git checkout main

# Merge Backend ก่อน
git merge feature/backend -m "Merge feature/backend into main"

# Merge Frontend
git merge feature/frontend -m "Merge feature/frontend into main"
```

### Step 2.2: ปิด Mock Mode ⭐

> 💡 **สำคัญมาก:** ต้องปิด Mock Mode ก่อนทดสอบจริง!

แก้ไข `frontend/js/app.js`:

```javascript
// เปลี่ยนจาก:
const USE_MOCK = true;

// เป็น:
const USE_MOCK = false;  // ⬅️ ปิด Mock Mode
```

```bash
git add frontend/js/app.js
git commit -m "chore: disable mock mode for integration test"
```

### Step 2.3: Build และ Test

```bash
docker compose down -v
docker compose up -d --build
sleep 15
docker compose ps
```

### Step 2.4: Integration Testing

```bash
# TC1: GET contacts ✅
curl http://localhost:8080/api/contacts

# TC2: POST ปกติ ✅
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"ทดสอบ","email":"test@test.com"}'

# TC3: POST ชื่อว่าง ✅
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"test@test.com"}'

# TC4: POST ชื่อยาวเกิน 50 ตัว ❌ BUG!
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"นายสมชายรักเรียนมานะอุตสาหะขยันทำงานรักความยุติธรรมใจกว้างมากๆ","email":"long@test.com"}'
```

**ผลลัพธ์ TC4:**
```json
{"success":false,"error":"value too long for type character varying(50)"}
```

> ❌ **BUG FOUND!** แสดง database error แทน user-friendly message

### Step 2.5: สร้าง Bug Report

```bash
cat > docs/BUG_REPORT.md << 'EOF'
# 🐛 Bug Report

## Bug #001: Name Length Validation Missing

**Reporter:** สมศักดิ์  
**Severity:** High  
**Status:** Open 🔴

### Description
ชื่อยาวเกิน 50 ตัว → แสดง database error แทน user-friendly message

### Expected
```json
{"success":false,"error":"ชื่อต้องไม่เกิน 50 ตัวอักษร"}
```

### Actual
```json
{"success":false,"error":"value too long for type character varying(50)"}
```

### Root Cause
- Backend: ไม่ได้ validate ความยาว name
- Frontend: ไม่มี maxlength

### Assigned to
- สมหญิง (Backend)
- สมชาย (Frontend)
EOF

git add docs/BUG_REPORT.md
git commit -m "docs: add bug report #001"
```

---

## 📅 Day 3: แก้ Bug และ Release

### Step 3.1: สมหญิง - แก้ Backend

```bash
git checkout main
git checkout -b fix/backend-validation
```

แก้ไข `backend/src/controllers/contactController.js`:

```javascript
// เพิ่มที่ต้นไฟล์
const MAX_NAME_LENGTH = 50;

// ใน createContact - เพิ่ม validation ก่อน INSERT
const trimmedName = name.trim();

if (trimmedName.length > MAX_NAME_LENGTH) {
    return res.status(400).json({
        success: false,
        error: `ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร (ปัจจุบัน ${trimmedName.length} ตัวอักษร)`
    });
}
```

```bash
git add backend/src/controllers/contactController.js
git commit -m "fix(backend): add name length validation"
git checkout main
git merge fix/backend-validation
git branch -d fix/backend-validation
```

### Step 3.2: สมชาย - แก้ Frontend

```bash
git checkout main
git checkout -b fix/frontend-validation
```

แก้ไข `frontend/index.html`:
```html
<input type="text" id="name" required maxlength="50" placeholder="ใส่ชื่อ...">
```

แก้ไข `frontend/js/app.js`:
```javascript
const MAX_NAME_LENGTH = 50;

// ใน addContact - เพิ่ม validation
if (name.length > MAX_NAME_LENGTH) {
    showStatus(`ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร`, 'error');
    return;
}
```

```bash
git add frontend/index.html frontend/js/app.js
git commit -m "fix(frontend): add name length validation"
git checkout main
git merge fix/frontend-validation
git branch -d fix/frontend-validation
```

### Step 3.3: Retest และ Release

```bash
docker compose down
docker compose up -d --build
sleep 15

# Retest TC4
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"นายสมชายรักเรียนมานะอุตสาหะขยันทำงานรักความยุติธรรมใจกว้างมากๆ","email":"long@test.com"}'
```

**ผลลัพธ์:**
```json
{"success":false,"error":"ชื่อต้องไม่เกิน 50 ตัวอักษร (ปัจจุบัน 58 ตัวอักษร)"}
```

✅ **TC4 PASS!**

### Step 3.4: Create Release Tag

```bash
git tag -a v2.0 -m "Release v2.0 - Bug #001 Fixed"
git tag
git show v2.0
```

---

## ✅ สรุปและบทเรียนที่ได้

```
┌─────────────────────────────────────────────────────────────────┐
│                    🎉 WORKSHOP 2 COMPLETE!                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📚 บทเรียนสำคัญ:                                                 │
│                                                                 │
│  1. 🤝 API Contract                                             │
│     • ตกลง spec ก่อนเริ่มทำ                                        │
│     • Frontend + Backend ทำงานพร้อมกันได้                          │
│                                                                 │
│  2. 🔶 Mock Data                                                │
│     • Frontend ทดสอบได้โดยไม่ต้องรอ Backend                        │
│     • ปิด Mock Mode ก่อน Integration Test                         │
│                                                                 │
│  3. 🔀 Git Workflow                                             │
│     • Team Lead สร้าง repo ก่อน                                   │
│     • Developers แตก feature branch                             │
│     • ทำพร้อมกันได้ถ้าแก้คนละไฟล์                                     │
│                                                                 │
│  4. 🧪 Testing                                                  │
│     • Unit Test แต่ละส่วน                                         │
│     • Integration Test หลัง merge                                │
│                                                                 │
│  5. 🛡️ Defense in Depth                                         │
│     • Validate ทั้ง Frontend + Backend + Database                 │
│     • ไม่ trust Frontend alone                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 🧹 Cleanup

```bash
docker compose down -v
```

---

**🚀 พร้อมสำหรับ Week 6 Lab!**
