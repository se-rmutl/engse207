# 🔀 Workshop 2: Git Workflow ละเอียด
## คำสั่ง Git ทุกขั้นตอนสำหรับทีม 3 คน

**เอกสารเสริมสำหรับ:** Workshop 2: Team Development Simulation  
**รายวิชา:** ENGSE207 Software Architecture

---

## 📋 สารบัญ

1. [ภาพรวม Git Workflow](#ภาพรวม-git-workflow)
2. [การเตรียมพร้อมก่อนเริ่ม](#การเตรียมพร้อมก่อนเริ่ม)
3. [Day 1: Development Phase](#day-1-development-phase)
4. [Day 2: Merge & Testing Phase](#day-2-merge--testing-phase)
5. [Day 3: Bug Fix & Release Phase](#day-3-bug-fix--release-phase)
6. [Git Commands Reference](#git-commands-reference)

---

## 🗺️ ภาพรวม Git Workflow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           GIT BRANCH WORKFLOW                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  main ●──────────────────●──────────────────●────────────────●────────► v2.0    │
│       │                  │                  │                │                  │
│       │   Day 1          │    Day 2         │    Day 3       │                  │
│       │   Setup          │    Merge         │    Bug Fix     │                  │
│       │                  │                  │                │                  │
│       ├─────────────┐    │                  │                │                  │
│       │             │    │                  │                │                  │
│feature│    ┌────────┼────┤                  │                │                  │
│/front │    ▼        │    ▼                  │                │                  │
│ end   │ ●──●──●─────┼────●                  │    ●───────────┤                  │
│       │ UI  CSS JS  │    PR                 │    Fix FE      │                  │
│       │             │                       │                │                  │
│feature│    ┌────────┤                       │                │                  │
│/back  │    ▼        │    ▼                  │                │                  │
│ end   │ ●──●──●──●──┼────●                  │    ●───────────┤                  │
│       │ API Ctrl DB │    PR                 │    Fix BE      │                  │
│       │             │                       │                │                  │
│       │             │    ▼                  │                │                  │
│       │             │    🧪 Test            │                │                  │
│       │             │    ❌ Bug Found       │                │                  │
│       │             │                       │    ✅ Retest   │                  │
│       │             │                       │                │                  │
└─────────────────────────────────────────────────────────────────────────────────┘

Legend:
  ● = Commit
  ─ = Branch
  ▼ = Merge
```

---

## 🛠️ การเตรียมพร้อมก่อนเริ่ม

### ตั้งค่า Git (ทุกคนต้องทำ)

```bash
# ============================================
# 🔧 Git Configuration (ทำครั้งเดียว)
# ============================================

# ตั้งค่าชื่อและ email
git config --global user.name "ชื่อของคุณ"
git config --global user.email "email@example.com"

# ตั้งค่า default branch เป็น main
git config --global init.defaultBranch main

# ตั้งค่า editor (optional)
git config --global core.editor "code --wait"

# ตรวจสอบการตั้งค่า
git config --list
```

### ความหมายของคำสั่ง Git พื้นฐาน

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GIT COMMANDS OVERVIEW                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Working Directory    Staging Area       Local Repository    Remote        │
│  (โฟลเดอร์ทำงาน)        (พื้นที่เตรียม)        (Git local)         (GitHub)    │
│                                                                             │
│       ┌───┐              ┌───┐              ┌───┐            ┌───┐         │
│       │   │  git add     │   │  git commit  │   │  git push  │   │         │
│       │   │ ──────────►  │   │ ──────────►  │   │ ────────►  │   │         │
│       │   │              │   │              │   │            │   │         │
│       │   │  ◄────────── │   │              │   │ ◄──────────│   │         │
│       │   │  git restore │   │              │   │  git pull  │   │         │
│       └───┘              └───┘              └───┘            └───┘         │
│                                                                             │
│  git status  : ดูสถานะไฟล์                                                   │
│  git log     : ดูประวัติ commits                                             │
│  git branch  : ดู/สร้าง branch                                               │
│  git checkout: สลับ branch                                                  │
│  git merge   : รวม branch                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📅 Day 1: Development Phase

### 🏗️ Phase 0: Team Lead สร้าง Repository (สมศักดิ์)

```bash
# ============================================
# 👤 สมศักดิ์ (Tester / Team Lead)
# หน้าที่: สร้าง repository และโครงสร้างเริ่มต้น
# ============================================

# สร้างโฟลเดอร์โปรเจกต์
mkdir -p ~/projects/contact-manager
cd ~/projects/contact-manager

# เริ่มต้น Git repository
git init

# ตรวจสอบสถานะ
git status
# Output: On branch main, No commits yet

# สร้างไฟล์ README.md
cat > README.md << 'EOF'
# 📇 Contact Manager

ระบบจัดการรายชื่อติดต่อ - TechStart Company

## Team Members
- 🎨 สมชาย - Frontend Developer
- ⚙️ สมหญิง - Backend Developer
- 🧪 สมศักดิ์ - Tester

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL
- Container: Docker Compose

## How to Run
```
docker compose up -d
```
Open: http://localhost:8080
EOF

# สร้าง .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Environment
.env
*.log

# OS
.DS_Store
Thumbs.db
EOF

# สร้าง .env.example
cat > .env.example << 'EOF'
DB_HOST=db
DB_PORT=5432
DB_USER=contactuser
DB_PASSWORD=contactpass
DB_NAME=contactdb
POSTGRES_USER=contactuser
POSTGRES_PASSWORD=contactpass
POSTGRES_DB=contactdb
EOF

# ดูสถานะ - มีไฟล์ใหม่ 3 ไฟล์
git status
# Output:
# Untracked files:
#   .env.example
#   .gitignore
#   README.md

# เพิ่มไฟล์ทั้งหมดเข้า staging
git add .

# หรือเพิ่มทีละไฟล์
# git add README.md
# git add .gitignore
# git add .env.example

# ดูสถานะหลัง add
git status
# Output:
# Changes to be committed:
#   new file: .env.example
#   new file: .gitignore
#   new file: README.md

# Commit ครั้งแรก
git commit -m "Initial commit: project setup"
# Output:
# [main (root-commit) abc1234] Initial commit: project setup
#  3 files changed, 45 insertions(+)
#  create mode 100644 .env.example
#  create mode 100644 .gitignore
#  create mode 100644 README.md

# ดูประวัติ commits
git log --oneline
# Output: abc1234 Initial commit: project setup

# สร้างโครงสร้างโฟลเดอร์พื้นฐาน
mkdir -p frontend/css frontend/js
mkdir -p backend/src/{routes,controllers,database}
mkdir -p database
mkdir -p nginx
mkdir -p docs

# สร้าง placeholder files
touch frontend/.gitkeep
touch backend/.gitkeep
touch database/.gitkeep
touch nginx/.gitkeep
touch docs/.gitkeep

# Commit โครงสร้างโฟลเดอร์
git add .
git status
git commit -m "Add project folder structure"

# ดูประวัติ
git log --oneline
# Output:
# def5678 Add project folder structure
# abc1234 Initial commit: project setup

echo "✅ สมศักดิ์: Repository พร้อมแล้ว!"
echo "📢 แจ้งทีม: ให้ clone และสร้าง feature branch ได้เลย"
```

---

### 🎨 Phase 1A: สมชาย - Frontend Development

```bash
# ============================================
# 👤 สมชาย (Frontend Developer)
# หน้าที่: สร้าง UI (HTML, CSS, JavaScript)
# Branch: feature/frontend
# ============================================

# Clone repository (ถ้าทำบนเครื่องเดียวกันให้ copy folder)
# git clone <repository-url> contact-manager-somchai
# cd contact-manager-somchai

# หรือถ้าทำบนเครื่องเดียวกัน
cd ~/projects/contact-manager

# ดู branches ที่มี
git branch
# Output: * main

# ดู branches ทั้งหมด (รวม remote)
git branch -a
# Output: * main

# สร้าง feature branch สำหรับ Frontend
git checkout -b feature/frontend
# Output: Switched to a new branch 'feature/frontend'

# ตรวจสอบว่าอยู่ branch ไหน
git branch
# Output:
#   main
# * feature/frontend

# ============================================
# 📝 สร้างไฟล์ Frontend
# ============================================

# ----- 1. สร้าง index.html -----
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
        </header>

        <div class="controls">
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="🔍 ค้นหาชื่อ...">
            </div>
            <button class="btn btn-primary" onclick="showAddForm()">
                ➕ เพิ่มรายชื่อ
            </button>
        </div>

        <div id="addForm" class="form-container" style="display: none;">
            <h3>เพิ่มรายชื่อใหม่</h3>
            <form onsubmit="addContact(event)">
                <div class="form-group">
                    <label for="name">ชื่อ *</label>
                    <!-- ⚠️ BUG: ไม่มี maxlength! -->
                    <input type="text" id="name" name="name" required 
                           placeholder="ใส่ชื่อ...">
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

        <div id="contactList" class="contact-list">
            <p class="loading">กำลังโหลด...</p>
        </div>

        <div id="statusMessage" class="status-message"></div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
EOF

# ดูสถานะหลังสร้างไฟล์
git status
# Output:
# On branch feature/frontend
# Changes not staged for commit:
#   modified: frontend/.gitkeep (ถ้ามี)
# Untracked files:
#   frontend/index.html

# Commit ไฟล์ HTML
git add frontend/index.html
git commit -m "feat(frontend): add index.html structure"
# Output: [feature/frontend 1a2b3c4] feat(frontend): add index.html structure

# ----- 2. สร้าง style.css -----
cat > frontend/css/style.css << 'EOF'
/* Contact Manager Styles - by สมชาย */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
}

.header {
    text-align: center;
    color: white;
    margin-bottom: 30px;
}

.header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

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

.btn-primary {
    background: #4CAF50;
    color: white;
}

.btn-primary:hover {
    background: #45a049;
    transform: translateY(-2px);
}

.btn-success {
    background: #2196F3;
    color: white;
}

.btn-secondary {
    background: #9e9e9e;
    color: white;
}

.btn-danger {
    background: #f44336;
    color: white;
}

.form-container {
    background: white;
    padding: 25px;
    border-radius: 15px;
    margin-bottom: 20px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #333;
}

.form-group input {
    width: 100%;
    padding: 10px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
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

.contact-list {
    display: grid;
    gap: 15px;
}

.contact-card {
    background: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.contact-info h3 {
    color: #333;
    margin-bottom: 5px;
}

.contact-info p {
    color: #666;
    font-size: 14px;
}

.contact-actions {
    display: flex;
    gap: 10px;
}

.loading {
    text-align: center;
    color: white;
    padding: 40px;
}

.status-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    display: none;
}

.status-message.success {
    background: #4CAF50;
    display: block;
}

.status-message.error {
    background: #f44336;
    display: block;
}
EOF

# Commit CSS
git add frontend/css/style.css
git status
git commit -m "feat(frontend): add CSS styles"

# ดูประวัติ commits บน branch นี้
git log --oneline
# Output:
# 2b3c4d5 feat(frontend): add CSS styles
# 1a2b3c4 feat(frontend): add index.html structure
# def5678 Add project folder structure
# abc1234 Initial commit: project setup

# ----- 3. สร้าง app.js -----
cat > frontend/js/app.js << 'EOF'
// ============================================
// Contact Manager Frontend - by สมชาย
// Version: 1.0 (มี Bug!)
// ============================================

const API_URL = '/api';

// ============================================
// API Functions
// ============================================

async function loadContacts() {
    try {
        const response = await fetch(`${API_URL}/contacts`);
        const data = await response.json();
        
        if (data.success) {
            renderContacts(data.data);
        } else {
            showStatus('ไม่สามารถโหลดข้อมูลได้', 'error');
        }
    } catch (error) {
        console.error('Load error:', error);
        showStatus('เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
    }
}

async function addContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // ⚠️ BUG: ไม่ได้ตรวจสอบความยาวของ name!
    if (!name) {
        showStatus('กรุณาใส่ชื่อ', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/contacts`, {
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
            clearForm();
            loadContacts();
        } else {
            showStatus(data.error || 'เกิดข้อผิดพลาด', 'error');
        }
    } catch (error) {
        console.error('Add error:', error);
        showStatus('เกิดข้อผิดพลาดในการบันทึก', 'error');
    }
}

async function deleteContact(id) {
    if (!confirm('ต้องการลบรายชื่อนี้?')) return;
    
    try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showStatus('ลบรายชื่อสำเร็จ!', 'success');
            loadContacts();
        } else {
            showStatus(data.error || 'เกิดข้อผิดพลาด', 'error');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showStatus('เกิดข้อผิดพลาดในการลบ', 'error');
    }
}

// ============================================
// UI Functions
// ============================================

function renderContacts(contacts) {
    const container = document.getElementById('contactList');
    
    if (contacts.length === 0) {
        container.innerHTML = '<p class="loading">ไม่มีรายชื่อ</p>';
        return;
    }
    
    container.innerHTML = contacts.map(contact => `
        <div class="contact-card">
            <div class="contact-info">
                <h3>👤 ${escapeHtml(contact.name)}</h3>
                <p>📧 ${contact.email || '-'}</p>
                <p>📱 ${contact.phone || '-'}</p>
            </div>
            <div class="contact-actions">
                <button class="btn btn-danger" onclick="deleteContact(${contact.id})">
                    🗑️ ลบ
                </button>
            </div>
        </div>
    `).join('');
}

function showAddForm() {
    document.getElementById('addForm').style.display = 'block';
}

function hideAddForm() {
    document.getElementById('addForm').style.display = 'none';
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
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

// ============================================
// Search Function
// ============================================

document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.contact-card');
    
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(searchTerm) ? 'flex' : 'none';
    });
});

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', loadContacts);
EOF

# Commit JavaScript
git add frontend/js/app.js
git commit -m "feat(frontend): add JavaScript functionality"

# ลบไฟล์ .gitkeep ที่ไม่ต้องการแล้ว
rm frontend/.gitkeep 2>/dev/null || true
git add -A
git commit -m "chore: remove placeholder files"

# ============================================
# 📊 ดูสรุปงานที่ทำบน Branch นี้
# ============================================

# ดูจำนวน commits
git log --oneline
# Output:
# 4d5e6f7 chore: remove placeholder files
# 3c4d5e6 feat(frontend): add JavaScript functionality
# 2b3c4d5 feat(frontend): add CSS styles
# 1a2b3c4 feat(frontend): add index.html structure
# def5678 Add project folder structure
# abc1234 Initial commit: project setup

# ดูความแตกต่างกับ main
git log main..feature/frontend --oneline
# Output:
# 4d5e6f7 chore: remove placeholder files
# 3c4d5e6 feat(frontend): add JavaScript functionality
# 2b3c4d5 feat(frontend): add CSS styles
# 1a2b3c4 feat(frontend): add index.html structure

# ดูไฟล์ที่เปลี่ยนแปลง
git diff --stat main
# Output:
#  frontend/css/style.css | 150 +++++++++++++++
#  frontend/index.html    |  60 +++++++
#  frontend/js/app.js     | 130 +++++++++++++
#  3 files changed, 340 insertions(+)

echo ""
echo "✅ สมชาย: Frontend เสร็จแล้ว!"
echo "📁 ไฟล์ที่สร้าง:"
echo "   - frontend/index.html"
echo "   - frontend/css/style.css"
echo "   - frontend/js/app.js"
echo ""
echo "⚠️ หมายเหตุ: ยังไม่ได้เพิ่ม maxlength ใน input name"
echo "📢 รอ merge กับ Backend ก่อน"
```

---

### ⚙️ Phase 1B: สมหญิง - Backend Development

```bash
# ============================================
# 👤 สมหญิง (Backend Developer)
# หน้าที่: สร้าง REST API และ Database
# Branch: feature/backend
# ============================================

# ไปที่โฟลเดอร์โปรเจกต์
cd ~/projects/contact-manager

# อัพเดท main ก่อน (ถ้ามีคนอื่น push)
git checkout main
git pull origin main 2>/dev/null || echo "No remote configured"

# ดู branches ทั้งหมด
git branch
# Output:
#   feature/frontend (ของสมชาย)
# * main

# สร้าง feature branch สำหรับ Backend
git checkout -b feature/backend
# Output: Switched to a new branch 'feature/backend'

# ตรวจสอบ branch
git branch
# Output:
#   feature/frontend
# * feature/backend
#   main

# ============================================
# 📝 สร้างไฟล์ Backend
# ============================================

# ----- 1. สร้าง database/init.sql -----
cat > database/init.sql << 'EOF'
-- ============================================
-- Contact Manager Database Schema
-- Created by: สมหญิง (Backend Dev)
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

-- แสดงข้อมูลที่เพิ่ม
SELECT * FROM contacts;
EOF

# Commit database schema
git add database/init.sql
git commit -m "feat(db): add database schema and seed data"

# ----- 2. สร้าง backend/package.json -----
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
  },
  "author": "สมหญิง",
  "license": "MIT"
}
EOF

git add backend/package.json
git commit -m "feat(backend): add package.json with dependencies"

# ----- 3. สร้าง backend/src/database/db.js -----
cat > backend/src/database/db.js << 'EOF'
// ============================================
// Database Connection - by สมหญิง
// ============================================

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'contactuser',
    password: process.env.DB_PASSWORD || 'contactpass',
    database: process.env.DB_NAME || 'contactdb',
});

// Test connection
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Database error:', err);
});

module.exports = pool;
EOF

git add backend/src/database/db.js
git commit -m "feat(backend): add database connection module"

# ----- 4. สร้าง backend/src/controllers/contactController.js -----
cat > backend/src/controllers/contactController.js << 'EOF'
// ============================================
// Contact Controller - by สมหญิง
// Version: 1.0 (มี Bug!)
// ============================================

const pool = require('../database/db');

// GET /api/contacts - ดึงรายชื่อทั้งหมด
exports.getAllContacts = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM contacts ORDER BY created_at DESC'
        );
        
        console.log(`📋 GET /api/contacts - Found ${result.rows.length} contacts`);
        
        res.json({
            success: true,
            data: result.rows,
            count: result.rows.length
        });
    } catch (error) {
        console.error('❌ Error getting contacts:', error);
        res.status(500).json({
            success: false,
            error: 'ไม่สามารถดึงข้อมูลได้'
        });
    }
};

// POST /api/contacts - เพิ่มรายชื่อใหม่
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        
        // Basic validation
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'กรุณาระบุชื่อ'
            });
        }
        
        // ⚠️ BUG: ไม่ได้ตรวจสอบความยาวของ name!
        // Database มี VARCHAR(50) แต่ไม่ได้ validate ก่อน
        
        const trimmedName = name.trim();
        
        const result = await pool.query(
            'INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [trimmedName, email || null, phone || null]
        );
        
        console.log(`✅ POST /api/contacts - Created: ${trimmedName}`);
        
        res.status(201).json({
            success: true,
            data: result.rows[0],
            message: 'เพิ่มรายชื่อสำเร็จ'
        });
    } catch (error) {
        console.error('❌ Error creating contact:', error);
        
        // ⚠️ BUG: ส่ง database error ตรงๆ ให้ user!
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// DELETE /api/contacts/:id - ลบรายชื่อ
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query(
            'DELETE FROM contacts WHERE id = $1 RETURNING *',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'ไม่พบรายชื่อที่ต้องการลบ'
            });
        }
        
        console.log(`🗑️ DELETE /api/contacts/${id} - Deleted`);
        
        res.json({
            success: true,
            message: 'ลบรายชื่อสำเร็จ'
        });
    } catch (error) {
        console.error('❌ Error deleting contact:', error);
        res.status(500).json({
            success: false,
            error: 'ไม่สามารถลบข้อมูลได้'
        });
    }
};
EOF

git add backend/src/controllers/contactController.js
git commit -m "feat(backend): add contact controller with CRUD operations"

# ----- 5. สร้าง backend/src/routes/contactRoutes.js -----
cat > backend/src/routes/contactRoutes.js << 'EOF'
// ============================================
// Contact Routes - by สมหญิง
// ============================================

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET /api/contacts
router.get('/', contactController.getAllContacts);

// POST /api/contacts
router.post('/', contactController.createContact);

// DELETE /api/contacts/:id
router.delete('/:id', contactController.deleteContact);

module.exports = router;
EOF

git add backend/src/routes/contactRoutes.js
git commit -m "feat(backend): add contact routes"

# ----- 6. สร้าง backend/server.js -----
cat > backend/server.js << 'EOF'
// ============================================
// Contact Manager API Server
// Created by: สมหญิง
// Version: 1.0
// ============================================

const express = require('express');
const cors = require('cors');
const contactRoutes = require('./src/routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.url}`);
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'contact-manager-api'
    });
});

// API Routes
app.use('/api/contacts', contactRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('💥 Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('=====================================');
    console.log('📇 Contact Manager API');
    console.log(`🚀 Server running on port ${PORT}`);
    console.log('=====================================');
});
EOF

git add backend/server.js
git commit -m "feat(backend): add Express server with middleware"

# ----- 7. สร้าง backend/Dockerfile -----
cat > backend/Dockerfile << 'EOF'
# ============================================
# Contact Manager API Dockerfile
# Created by: สมหญิง
# ============================================

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start server
CMD ["node", "server.js"]
EOF

git add backend/Dockerfile
git commit -m "feat(backend): add Dockerfile"

# ลบ placeholder
rm backend/.gitkeep 2>/dev/null || true
rm database/.gitkeep 2>/dev/null || true
git add -A
git commit -m "chore: remove placeholder files" 2>/dev/null || true

# ============================================
# 📊 ดูสรุปงาน
# ============================================

git log --oneline
# Output:
# 8f9g0h1 chore: remove placeholder files
# 7e8f9g0 feat(backend): add Dockerfile
# 6d7e8f9 feat(backend): add Express server with middleware
# 5c6d7e8 feat(backend): add contact routes
# 4b5c6d7 feat(backend): add contact controller with CRUD operations
# 3a4b5c6 feat(backend): add database connection module
# 2z3a4b5 feat(backend): add package.json with dependencies
# 1y2z3a4 feat(db): add database schema and seed data
# def5678 Add project folder structure
# abc1234 Initial commit: project setup

# ดูไฟล์ที่สร้าง
git diff --stat main
# Output:
#  backend/Dockerfile                       | 25 ++++
#  backend/package.json                     | 18 +++
#  backend/server.js                        | 55 ++++++++
#  backend/src/controllers/contactController.js | 90 +++++++++++++
#  backend/src/database/db.js               | 25 ++++
#  backend/src/routes/contactRoutes.js      | 18 +++
#  database/init.sql                        | 20 +++
#  7 files changed, 251 insertions(+)

echo ""
echo "✅ สมหญิง: Backend เสร็จแล้ว!"
echo "📁 ไฟล์ที่สร้าง:"
echo "   - database/init.sql"
echo "   - backend/package.json"
echo "   - backend/src/database/db.js"
echo "   - backend/src/controllers/contactController.js"
echo "   - backend/src/routes/contactRoutes.js"
echo "   - backend/server.js"
echo "   - backend/Dockerfile"
echo ""
echo "⚠️ หมายเหตุ: ยังไม่ได้ validate ความยาว name ก่อน INSERT"
echo "📢 รอ merge กับ Frontend ก่อน"
```

---

### 🏗️ Phase 1C: สมศักดิ์ - Infrastructure Setup

```bash
# ============================================
# 👤 สมศักดิ์ (Tester / Team Lead)
# หน้าที่: สร้าง Docker Compose และ Nginx config
# Branch: main (Infrastructure)
# ============================================

cd ~/projects/contact-manager

# อยู่ที่ main branch
git checkout main

# สร้าง docker-compose.yml
cat > docker-compose.yml << 'EOF'
# ============================================
# Contact Manager - Docker Compose
# Created by: สมศักดิ์
# ============================================

version: '3.8'

services:
  # Nginx Reverse Proxy
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

  # Backend API
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
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  postgres_data:
EOF

git add docker-compose.yml
git commit -m "feat(infra): add docker-compose.yml"

# สร้าง nginx/default.conf
cat > nginx/default.conf << 'EOF'
# ============================================
# Nginx Configuration
# Created by: สมศักดิ์
# ============================================

server {
    listen 80;
    server_name localhost;

    # Frontend static files
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://api:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }

    # Health check for API
    location /health {
        proxy_pass http://api:3000/health;
    }
}
EOF

git add nginx/default.conf
git commit -m "feat(infra): add nginx configuration"

# สร้าง .env (copy จาก .env.example)
cp .env.example .env

# ลบ placeholder
rm nginx/.gitkeep 2>/dev/null || true
git add -A
git commit -m "chore: remove placeholder files" 2>/dev/null || true

# ดูสรุป commits บน main
git log --oneline

echo ""
echo "✅ สมศักดิ์: Infrastructure พร้อมแล้ว!"
echo "📁 ไฟล์ที่สร้าง:"
echo "   - docker-compose.yml"
echo "   - nginx/default.conf"
echo ""
echo "📢 แจ้งทีม: Infrastructure พร้อม รอ merge code"
```

---

## 📅 Day 2: Merge & Testing Phase

### 🔄 Phase 2A: Merge Feature Branches

```bash
# ============================================
# 👤 สมศักดิ์ (Team Lead)
# หน้าที่: Merge code จากทุกคนเข้า main
# ============================================

cd ~/projects/contact-manager
git checkout main

# ดู branches ทั้งหมด
git branch
# Output:
#   feature/backend
#   feature/frontend
# * main

# ============================================
# 🔀 Merge Frontend (สมชาย)
# ============================================

echo "📥 Merging feature/frontend..."

# Preview การ merge
git log main..feature/frontend --oneline
# Output:
# 4d5e6f7 chore: remove placeholder files
# 3c4d5e6 feat(frontend): add JavaScript functionality
# 2b3c4d5 feat(frontend): add CSS styles
# 1a2b3c4 feat(frontend): add index.html structure

# Merge
git merge feature/frontend -m "Merge branch 'feature/frontend' into main"
# Output:
# Merge made by the 'ort' strategy.
#  frontend/css/style.css | 150 ++++++++++++
#  frontend/index.html    |  60 +++++
#  frontend/js/app.js     | 130 ++++++++++
#  3 files changed, 340 insertions(+)

echo "✅ Frontend merged!"

# ============================================
# 🔀 Merge Backend (สมหญิง)
# ============================================

echo "📥 Merging feature/backend..."

# Preview การ merge
git log main..feature/backend --oneline
# Output:
# 8f9g0h1 chore: remove placeholder files
# 7e8f9g0 feat(backend): add Dockerfile
# ... (more commits)

# Merge
git merge feature/backend -m "Merge branch 'feature/backend' into main"
# Output:
# Merge made by the 'ort' strategy.
#  backend/Dockerfile                       | 25 ++++
#  backend/package.json                     | 18 +++
#  backend/server.js                        | 55 ++++++++
#  backend/src/controllers/contactController.js | 90 +++++++
#  backend/src/database/db.js               | 25 ++++
#  backend/src/routes/contactRoutes.js      | 18 +++
#  database/init.sql                        | 20 +++
#  7 files changed, 251 insertions(+)

echo "✅ Backend merged!"

# ============================================
# 📊 ตรวจสอบผลการ merge
# ============================================

# ดูประวัติแบบกราฟ
git log --oneline --graph --all
# Output:
# *   abc123 Merge branch 'feature/backend' into main
# |\  
# | * 8f9g0h1 chore: remove placeholder files
# | * 7e8f9g0 feat(backend): add Dockerfile
# | * ... (backend commits)
# * |   def456 Merge branch 'feature/frontend' into main
# |\ \  
# | * | 4d5e6f7 chore: remove placeholder files
# | * | 3c4d5e6 feat(frontend): add JavaScript functionality
# | * | ... (frontend commits)
# |/ /  
# * | ... (main commits)

# ดูไฟล์ทั้งหมดในโปรเจกต์
ls -la
# Output:
# .env
# .env.example
# .gitignore
# README.md
# backend/
# database/
# docker-compose.yml
# docs/
# frontend/
# nginx/

# ดูโครงสร้างโปรเจกต์
find . -type f -name "*.js" -o -name "*.html" -o -name "*.css" -o -name "*.sql" | head -20
# Output:
# ./frontend/index.html
# ./frontend/css/style.css
# ./frontend/js/app.js
# ./backend/server.js
# ./backend/src/database/db.js
# ./backend/src/controllers/contactController.js
# ./backend/src/routes/contactRoutes.js
# ./database/init.sql

echo ""
echo "✅ ทุก Branch merge เรียบร้อย!"
echo ""
echo "📊 สรุป:"
echo "   - Frontend: 3 files (HTML, CSS, JS)"
echo "   - Backend: 7 files (API, DB)"
echo "   - Infrastructure: 2 files (compose, nginx)"
echo ""
echo "🚀 พร้อมสำหรับ Docker Compose up!"
```

### 🐳 Phase 2B: Build และ Start Services

```bash
# ============================================
# 👤 สมศักดิ์ (Tester)
# หน้าที่: Build และทดสอบ
# ============================================

cd ~/projects/contact-manager

# ตรวจสอบว่ามี .env
cat .env

# Build และ Start ทุก services
docker compose up -d --build
# Output:
# [+] Building 15.2s
# [+] Running 4/4
#  ✔ Network contact-manager_default  Created
#  ✔ Container contact-db             Healthy
#  ✔ Container contact-api            Started
#  ✔ Container contact-nginx          Started

# ดูสถานะ services
docker compose ps
# Output:
# NAME             STATUS          PORTS
# contact-api      Up 10 seconds   3000/tcp
# contact-db       Up 15 seconds   5432/tcp
# contact-nginx    Up 5 seconds    0.0.0.0:8080->80/tcp

# ดู logs
docker compose logs -f api
# Output:
# contact-api  | =====================================
# contact-api  | 📇 Contact Manager API
# contact-api  | 🚀 Server running on port 3000
# contact-api  | =====================================
# contact-api  | ✅ Connected to PostgreSQL

# Ctrl+C เพื่อออกจาก logs

# ทดสอบ Health Check
curl http://localhost:8080/health
# Output:
# {"status":"ok","timestamp":"...","service":"contact-manager-api"}

echo ""
echo "✅ ทุก Services รันสำเร็จ!"
echo "🌐 เปิดเบราว์เซอร์: http://localhost:8080"
```

### 🧪 Phase 2C: Testing และพบ Bug

```bash
# ============================================
# 👤 สมศักดิ์ (Tester)
# หน้าที่: รัน Test Cases
# ============================================

echo "🧪 Starting Test Cases..."
echo ""

# ============================================
# Test Case 1: ดูรายชื่อทั้งหมด
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TC1: GET /api/contacts"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

curl -s http://localhost:8080/api/contacts | jq .
# Expected: success: true, data: [...], count: 3
# Result: ✅ PASS

echo "✅ TC1: PASS"
echo ""

# ============================================
# Test Case 2: เพิ่มรายชื่อปกติ
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TC2: POST /api/contacts (ชื่อปกติ)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

curl -s -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"ทดสอบ ทดสอบ","email":"test@test.com","phone":"099-999-9999"}' | jq .
# Expected: success: true
# Result: ✅ PASS

echo "✅ TC2: PASS"
echo ""

# ============================================
# Test Case 3: ชื่อว่าง
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TC3: POST /api/contacts (ชื่อว่าง)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

curl -s -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"test@test.com"}' | jq .
# Expected: success: false, error: "กรุณาระบุชื่อ"
# Result: ✅ PASS

echo "✅ TC3: PASS"
echo ""

# ============================================
# Test Case 4: ชื่อยาวเกิน 50 ตัวอักษร ⚠️
# ============================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TC4: POST /api/contacts (ชื่อยาวเกิน 50 ตัว)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

LONG_NAME="นายสมชายรักเรียนมานะอุตสาหะขยันทำงานรักความยุติธรรมใจกว้างมากๆ"
echo "ความยาวชื่อ: ${#LONG_NAME} ตัวอักษร"

curl -s -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$LONG_NAME\",\"email\":\"long@test.com\"}" | jq .

# Expected: success: false, error: "ชื่อต้องไม่เกิน 50 ตัวอักษร"
# Actual: {"success":false,"error":"value too long for type character varying(50)"}

echo ""
echo "❌ TC4: FAILED!"
echo ""
echo "🐛 BUG FOUND!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Expected: Friendly error message"
echo "Actual: Raw database error exposed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

### 📝 Phase 2D: สร้าง Bug Report

```bash
# ============================================
# 👤 สมศักดิ์ (Tester)
# หน้าที่: สร้าง Bug Report
# ============================================

cd ~/projects/contact-manager

# สร้าง Bug Report
mkdir -p docs
cat > docs/BUG_REPORT.md << 'EOF'
# 🐛 Bug Report

## Bug #001: Name Length Validation Missing

**Reporter:** สมศักดิ์ (Tester)  
**Date:** Day 2  
**Severity:** High  
**Status:** Open 🔴

---

### Description

เมื่อใส่ชื่อที่มีความยาวเกิน 50 ตัวอักษร ระบบแสดง Database error
แทนที่จะแสดง error message ที่เป็นมิตรกับผู้ใช้

### Steps to Reproduce

1. เปิดเว็บ http://localhost:8080
2. คลิก "➕ เพิ่มรายชื่อ"
3. ใส่ชื่อยาวๆ เช่น "นายสมชายรักเรียนมานะอุตสาหะขยันทำงานรักความยุติธรรมใจกว้างมากๆ"
4. กด "💾 บันทึก"

### Expected Result

```json
{
  "success": false,
  "error": "ชื่อต้องไม่เกิน 50 ตัวอักษร"
}
```

### Actual Result

```json
{
  "success": false,
  "error": "value too long for type character varying(50)"
}
```

### Root Cause Analysis

1. **Database:** `contacts.name` เป็น `VARCHAR(50)` ซึ่งถูกต้อง
2. **Backend:** ไม่ได้ validate ความยาวก่อน INSERT
3. **Frontend:** ไม่มี `maxlength` attribute ใน input

### Impact

- ❌ User เห็น database error (security concern)
- ❌ UX ไม่ดี - ผู้ใช้ไม่รู้ว่าชื่อจำกัดกี่ตัว
- ❌ อาจถูกโจมตีด้วย SQL injection (ถ้าไม่ระวัง)

### Suggested Fix

#### Backend (สมหญิง)
```javascript
// ใน contactController.js
const MAX_NAME_LENGTH = 50;

if (trimmedName.length > MAX_NAME_LENGTH) {
    return res.status(400).json({
        success: false,
        error: `ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร (ปัจจุบัน ${trimmedName.length} ตัวอักษร)`
    });
}
```

#### Frontend (สมชาย)
```html
<!-- ใน index.html -->
<input type="text" id="name" maxlength="50" required>
```

```javascript
// ใน app.js
const MAX_NAME_LENGTH = 50;

if (name.length > MAX_NAME_LENGTH) {
    showStatus(`ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร`, 'error');
    return;
}
```

---

**Assigned to:** สมชาย (Frontend), สมหญิง (Backend)  
**Due:** Day 3
EOF

# Commit Bug Report
git add docs/BUG_REPORT.md
git commit -m "docs: add bug report #001 - name length validation"

echo ""
echo "📝 Bug Report สร้างเรียบร้อย!"
echo "📁 ไฟล์: docs/BUG_REPORT.md"
echo ""
echo "📢 แจ้ง สมชาย และ สมหญิง ให้แก้ไข"
```

---

## 📅 Day 3: Bug Fix & Release Phase

### 🔧 Phase 3A: สมหญิง แก้ Backend

```bash
# ============================================
# 👤 สมหญิง (Backend Developer)
# หน้าที่: แก้ Bug - เพิ่ม validation
# ============================================

cd ~/projects/contact-manager

# อัพเดท main ล่าสุด
git checkout main
git pull origin main 2>/dev/null || true

# ดู Bug Report
cat docs/BUG_REPORT.md

# สร้าง branch สำหรับ fix
git checkout -b fix/backend-validation
# Output: Switched to a new branch 'fix/backend-validation'

# ============================================
# 📝 แก้ไฟล์ contactController.js
# ============================================

cat > backend/src/controllers/contactController.js << 'EOF'
// ============================================
// Contact Controller - by สมหญิง
// Version: 2.0 (Bug Fixed!)
// ============================================

const pool = require('../database/db');

// ค่าคงที่สำหรับ validation
const MAX_NAME_LENGTH = 50;

// GET /api/contacts - ดึงรายชื่อทั้งหมด
exports.getAllContacts = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM contacts ORDER BY created_at DESC'
        );
        
        console.log(`📋 GET /api/contacts - Found ${result.rows.length} contacts`);
        
        res.json({
            success: true,
            data: result.rows,
            count: result.rows.length
        });
    } catch (error) {
        console.error('❌ Error getting contacts:', error);
        res.status(500).json({
            success: false,
            error: 'ไม่สามารถดึงข้อมูลได้'
        });
    }
};

// POST /api/contacts - เพิ่มรายชื่อใหม่
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        
        // ============================================
        // ✅ FIX: เพิ่ม validation ความยาว
        // ============================================
        
        // ตรวจสอบว่ามีชื่อหรือไม่
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'กรุณาระบุชื่อ'
            });
        }
        
        const trimmedName = name.trim();
        
        // ✅ ตรวจสอบความยาวของชื่อ
        if (trimmedName.length > MAX_NAME_LENGTH) {
            return res.status(400).json({
                success: false,
                error: `ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร (ปัจจุบัน ${trimmedName.length} ตัวอักษร)`
            });
        }
        
        const result = await pool.query(
            'INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
            [trimmedName, email || null, phone || null]
        );
        
        console.log(`✅ POST /api/contacts - Created: ${trimmedName}`);
        
        res.status(201).json({
            success: true,
            data: result.rows[0],
            message: 'เพิ่มรายชื่อสำเร็จ'
        });
    } catch (error) {
        console.error('❌ Error creating contact:', error);
        
        // ✅ FIX: ไม่ส่ง database error ตรงๆ
        res.status(500).json({
            success: false,
            error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
        });
    }
};

// DELETE /api/contacts/:id - ลบรายชื่อ
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate ID
        if (!id || isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'ID ไม่ถูกต้อง'
            });
        }
        
        const result = await pool.query(
            'DELETE FROM contacts WHERE id = $1 RETURNING *',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'ไม่พบรายชื่อที่ต้องการลบ'
            });
        }
        
        console.log(`🗑️ DELETE /api/contacts/${id} - Deleted`);
        
        res.json({
            success: true,
            message: 'ลบรายชื่อสำเร็จ'
        });
    } catch (error) {
        console.error('❌ Error deleting contact:', error);
        res.status(500).json({
            success: false,
            error: 'ไม่สามารถลบข้อมูลได้'
        });
    }
};
EOF

# ดูความเปลี่ยนแปลง
git diff backend/src/controllers/contactController.js
# Output: แสดงสิ่งที่เปลี่ยน (สีเขียว = เพิ่ม, สีแดง = ลบ)

# Commit การแก้ไข
git add backend/src/controllers/contactController.js
git status
# Output:
# On branch fix/backend-validation
# Changes to be committed:
#   modified: backend/src/controllers/contactController.js

git commit -m "fix(backend): add name length validation (max 50 chars)

- Add MAX_NAME_LENGTH constant
- Validate name length before INSERT
- Return user-friendly error message
- Don't expose database errors to client

Fixes: Bug #001"

# ดูประวัติ
git log --oneline -3
# Output:
# abc1234 fix(backend): add name length validation (max 50 chars)
# def5678 docs: add bug report #001
# ghi9012 Merge branch 'feature/backend' into main

echo ""
echo "✅ สมหญิง: Backend fix เสร็จแล้ว!"
echo "📁 แก้ไข: backend/src/controllers/contactController.js"
echo ""
echo "🔄 กลับไป main และ merge..."

# Merge กลับ main
git checkout main
git merge fix/backend-validation -m "Merge fix/backend-validation: name length validation"

# ลบ branch ที่ไม่ใช้แล้ว
git branch -d fix/backend-validation
# Output: Deleted branch fix/backend-validation

echo "✅ Backend fix merged to main!"
```

### 🎨 Phase 3B: สมชาย แก้ Frontend

```bash
# ============================================
# 👤 สมชาย (Frontend Developer)
# หน้าที่: แก้ Bug - เพิ่ม maxlength และ validation
# ============================================

cd ~/projects/contact-manager

# อัพเดท main (มี backend fix แล้ว)
git checkout main
git pull origin main 2>/dev/null || true

# สร้าง branch สำหรับ fix
git checkout -b fix/frontend-validation
# Output: Switched to a new branch 'fix/frontend-validation'

# ============================================
# 📝 แก้ไฟล์ index.html
# ============================================

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
            <p>ระบบจัดการรายชื่อติดต่อ v2.0</p>
        </header>

        <div class="controls">
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="🔍 ค้นหาชื่อ...">
            </div>
            <button class="btn btn-primary" onclick="showAddForm()">
                ➕ เพิ่มรายชื่อ
            </button>
        </div>

        <div id="addForm" class="form-container" style="display: none;">
            <h3>เพิ่มรายชื่อใหม่</h3>
            <form onsubmit="addContact(event)">
                <div class="form-group">
                    <label for="name">ชื่อ * <span id="nameCount" class="char-count">(0/50)</span></label>
                    <!-- ✅ FIX: เพิ่ม maxlength="50" -->
                    <input type="text" id="name" name="name" required 
                           maxlength="50"
                           placeholder="ใส่ชื่อ (ไม่เกิน 50 ตัวอักษร)..."
                           oninput="updateCharCount()">
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

        <div id="contactList" class="contact-list">
            <p class="loading">กำลังโหลด...</p>
        </div>

        <div id="statusMessage" class="status-message"></div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
EOF

git add frontend/index.html
git commit -m "fix(frontend): add maxlength and character counter to name input"

# ============================================
# 📝 เพิ่ม CSS สำหรับ character count
# ============================================

# เพิ่ม style ต่อท้ายไฟล์เดิม
cat >> frontend/css/style.css << 'EOF'

/* ============================================
   Character Count Styles (v2.0 Fix)
   ============================================ */

.char-count {
    font-size: 12px;
    color: #666;
    font-weight: normal;
}

.char-count.warning {
    color: #ff9800;
}

.char-count.error {
    color: #f44336;
}

.form-group input.error {
    border-color: #f44336;
}
EOF

git add frontend/css/style.css
git commit -m "fix(frontend): add character count styling"

# ============================================
# 📝 แก้ไฟล์ app.js
# ============================================

cat > frontend/js/app.js << 'EOF'
// ============================================
// Contact Manager Frontend - by สมชาย
// Version: 2.0 (Bug Fixed!)
// ============================================

const API_URL = '/api';
const MAX_NAME_LENGTH = 50;  // ✅ ค่าคงที่สำหรับ validation

// ============================================
// API Functions
// ============================================

async function loadContacts() {
    try {
        const response = await fetch(`${API_URL}/contacts`);
        const data = await response.json();
        
        if (data.success) {
            renderContacts(data.data);
        } else {
            showStatus('ไม่สามารถโหลดข้อมูลได้', 'error');
        }
    } catch (error) {
        console.error('Load error:', error);
        showStatus('เกิดข้อผิดพลาดในการเชื่อมต่อ', 'error');
    }
}

async function addContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // ============================================
    // ✅ FIX: เพิ่ม validation ความยาว
    // ============================================
    
    if (!name) {
        showStatus('กรุณาใส่ชื่อ', 'error');
        return;
    }
    
    // ✅ ตรวจสอบความยาวของชื่อ
    if (name.length > MAX_NAME_LENGTH) {
        showStatus(`ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร (ปัจจุบัน ${name.length} ตัวอักษร)`, 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/contacts`, {
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
            clearForm();
            loadContacts();
        } else {
            showStatus(data.error || 'เกิดข้อผิดพลาด', 'error');
        }
    } catch (error) {
        console.error('Add error:', error);
        showStatus('เกิดข้อผิดพลาดในการบันทึก', 'error');
    }
}

async function deleteContact(id) {
    if (!confirm('ต้องการลบรายชื่อนี้?')) return;
    
    try {
        const response = await fetch(`${API_URL}/contacts/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showStatus('ลบรายชื่อสำเร็จ!', 'success');
            loadContacts();
        } else {
            showStatus(data.error || 'เกิดข้อผิดพลาด', 'error');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showStatus('เกิดข้อผิดพลาดในการลบ', 'error');
    }
}

// ============================================
// UI Functions
// ============================================

function renderContacts(contacts) {
    const container = document.getElementById('contactList');
    
    if (contacts.length === 0) {
        container.innerHTML = '<p class="loading">ไม่มีรายชื่อ</p>';
        return;
    }
    
    container.innerHTML = contacts.map(contact => `
        <div class="contact-card">
            <div class="contact-info">
                <h3>👤 ${escapeHtml(contact.name)}</h3>
                <p>📧 ${contact.email || '-'}</p>
                <p>📱 ${contact.phone || '-'}</p>
            </div>
            <div class="contact-actions">
                <button class="btn btn-danger" onclick="deleteContact(${contact.id})">
                    🗑️ ลบ
                </button>
            </div>
        </div>
    `).join('');
}

function showAddForm() {
    document.getElementById('addForm').style.display = 'block';
    updateCharCount(); // ✅ อัพเดท counter
}

function hideAddForm() {
    document.getElementById('addForm').style.display = 'none';
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    updateCharCount(); // ✅ reset counter
}

// ============================================
// ✅ NEW: Character Count Function
// ============================================

function updateCharCount() {
    const nameInput = document.getElementById('name');
    const countSpan = document.getElementById('nameCount');
    const currentLength = nameInput.value.length;
    
    countSpan.textContent = `(${currentLength}/${MAX_NAME_LENGTH})`;
    
    // เปลี่ยนสีตามจำนวน
    countSpan.classList.remove('warning', 'error');
    nameInput.classList.remove('error');
    
    if (currentLength > MAX_NAME_LENGTH) {
        countSpan.classList.add('error');
        nameInput.classList.add('error');
    } else if (currentLength > MAX_NAME_LENGTH * 0.8) {
        countSpan.classList.add('warning');
    }
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

// ============================================
// Search Function
// ============================================

document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.contact-card');
    
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = name.includes(searchTerm) ? 'flex' : 'none';
    });
});

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    updateCharCount();
});
EOF

git add frontend/js/app.js
git commit -m "fix(frontend): add name length validation in JavaScript

- Add MAX_NAME_LENGTH constant
- Validate before API call
- Add updateCharCount() function
- Show warning when approaching limit

Fixes: Bug #001"

# ดูประวัติ commits บน branch นี้
git log --oneline -5
# Output:
# abc1234 fix(frontend): add name length validation in JavaScript
# def5678 fix(frontend): add character count styling
# ghi9012 fix(frontend): add maxlength and character counter

echo ""
echo "✅ สมชาย: Frontend fix เสร็จแล้ว!"
echo "📁 แก้ไข:"
echo "   - frontend/index.html"
echo "   - frontend/css/style.css"
echo "   - frontend/js/app.js"
echo ""
echo "🔄 กลับไป main และ merge..."

# Merge กลับ main
git checkout main
git merge fix/frontend-validation -m "Merge fix/frontend-validation: name length validation"

# ลบ branch
git branch -d fix/frontend-validation

echo "✅ Frontend fix merged to main!"
```

### 🧪 Phase 3C: Retest และ Release

```bash
# ============================================
# 👤 สมศักดิ์ (Tester)
# หน้าที่: Retest และ Release
# ============================================

cd ~/projects/contact-manager
git checkout main

# ดูประวัติ commits ทั้งหมด
git log --oneline --graph -15
# Output: แสดง merge commits และ fix commits

# Rebuild และ restart services
echo "🔄 Rebuilding services..."
docker compose down
docker compose up -d --build

# รอ services พร้อม
sleep 10

# ============================================
# 🧪 Retest - TC4
# ============================================

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 RETEST: TC4 - ชื่อยาวเกิน 50 ตัว"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

LONG_NAME="นายสมชายรักเรียนมานะอุตสาหะขยันทำงานรักความยุติธรรมใจกว้างมากๆ"
echo "ความยาวชื่อ: ${#LONG_NAME} ตัวอักษร"

RESULT=$(curl -s -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$LONG_NAME\",\"email\":\"long@test.com\"}")

echo "Response:"
echo "$RESULT" | jq .

# ตรวจสอบผลลัพธ์
if echo "$RESULT" | grep -q "ชื่อต้องไม่เกิน"; then
    echo ""
    echo "✅ TC4: PASS - แสดง error message ที่ถูกต้อง!"
else
    echo ""
    echo "❌ TC4: FAILED"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 TEST SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ TC1: GET /api/contacts - PASS"
echo "✅ TC2: POST (ชื่อปกติ) - PASS"
echo "✅ TC3: POST (ชื่อว่าง) - PASS"
echo "✅ TC4: POST (ชื่อเกิน 50) - PASS"
echo ""
echo "🎉 ALL TESTS PASSED!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ============================================
# 📝 Update Bug Report
# ============================================

cat > docs/BUG_REPORT.md << 'EOF'
# 🐛 Bug Report

## Bug #001: Name Length Validation Missing

**Reporter:** สมศักดิ์ (Tester)  
**Date:** Day 2  
**Severity:** High  
**Status:** Closed ✅

---

### Description

เมื่อใส่ชื่อที่มีความยาวเกิน 50 ตัวอักษร ระบบแสดง Database error
แทนที่จะแสดง error message ที่เป็นมิตรกับผู้ใช้

### Resolution

#### Backend Fix (สมหญิง)
```javascript
const MAX_NAME_LENGTH = 50;

if (trimmedName.length > MAX_NAME_LENGTH) {
    return res.status(400).json({
        success: false,
        error: `ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร (ปัจจุบัน ${trimmedName.length} ตัวอักษร)`
    });
}
```

#### Frontend Fix (สมชาย)
```html
<input type="text" id="name" maxlength="50" required>
```

```javascript
const MAX_NAME_LENGTH = 50;

if (name.length > MAX_NAME_LENGTH) {
    showStatus(`ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร`, 'error');
    return;
}
```

### Verification

✅ TC4 (ชื่อยาวเกิน 50 ตัวอักษร) - PASS
- API returns: `{"success":false,"error":"ชื่อต้องไม่เกิน 50 ตัวอักษร..."}`
- No database error exposed to user
- Frontend shows character count and prevents input > 50

**Closed Date:** Day 3  
**Verified By:** สมศักดิ์
EOF

git add docs/BUG_REPORT.md
git commit -m "docs: close bug #001 - verified fixed"

# ============================================
# 🏷️ Create Release Tag
# ============================================

echo ""
echo "🏷️ Creating release tag..."

git tag -a v2.0 -m "Release v2.0 - Bug #001 Fixed

Changes:
- Added name length validation (max 50 chars)
- Added character counter in UI
- Improved error handling

Fixed by:
- สมหญิง (Backend)
- สมชาย (Frontend)

Tested by:
- สมศักดิ์"

# ดู tags
git tag
# Output: v2.0

# ดูรายละเอียด tag
git show v2.0
# Output: แสดงรายละเอียด tag และ commit

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 RELEASE v2.0 COMPLETE!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Final Statistics:"
git log --oneline | wc -l
echo "Total commits"
echo ""
git shortlog -s -n
# Output: commits per author
echo ""
echo "🌐 Application URL: http://localhost:8080"
echo "📋 Version: v2.0"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

---

## 📚 Git Commands Reference

### คำสั่งพื้นฐาน

| คำสั่ง | คำอธิบาย | ตัวอย่าง |
|--------|----------|----------|
| `git init` | สร้าง repository ใหม่ | `git init` |
| `git clone` | Clone repository | `git clone <url>` |
| `git status` | ดูสถานะไฟล์ | `git status` |
| `git add` | เพิ่มไฟล์เข้า staging | `git add .` |
| `git commit` | บันทึกการเปลี่ยนแปลง | `git commit -m "message"` |
| `git log` | ดูประวัติ commits | `git log --oneline` |

### คำสั่ง Branch

| คำสั่ง | คำอธิบาย | ตัวอย่าง |
|--------|----------|----------|
| `git branch` | ดู/สร้าง branch | `git branch feature/xxx` |
| `git checkout` | สลับ branch | `git checkout main` |
| `git checkout -b` | สร้างและสลับ | `git checkout -b feature/xxx` |
| `git merge` | รวม branch | `git merge feature/xxx` |
| `git branch -d` | ลบ branch | `git branch -d feature/xxx` |

### คำสั่ง Remote

| คำสั่ง | คำอธิบาย | ตัวอย่าง |
|--------|----------|----------|
| `git remote` | ดู remotes | `git remote -v` |
| `git push` | ส่งไป remote | `git push origin main` |
| `git pull` | ดึงจาก remote | `git pull origin main` |
| `git fetch` | ดึง metadata | `git fetch origin` |

### คำสั่ง Tag

| คำสั่ง | คำอธิบาย | ตัวอย่าง |
|--------|----------|----------|
| `git tag` | ดู tags | `git tag` |
| `git tag -a` | สร้าง annotated tag | `git tag -a v1.0 -m "msg"` |
| `git show` | ดูรายละเอียด tag | `git show v1.0` |

### Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: ฟีเจอร์ใหม่
- `fix`: แก้ bug
- `docs`: แก้เอกสาร
- `style`: แก้ formatting
- `refactor`: refactor code
- `test`: เพิ่ม tests
- `chore`: งานอื่นๆ

**Examples:**
```bash
git commit -m "feat(frontend): add contact form"
git commit -m "fix(backend): validate name length"
git commit -m "docs: update README"
```

---

## 🎯 สรุป Git Workflow ของทีม

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TEAM GIT WORKFLOW SUMMARY                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1️⃣ SETUP                                                                    │
│     └── Team Lead: git init → Initial commit → Create structure            │
│                                                                             │
│  2️⃣ DEVELOPMENT                                                              │
│     ├── Developer A: git checkout -b feature/xxx                           │
│     │               └── work → git add → git commit → ...                  │
│     │                                                                       │
│     └── Developer B: git checkout -b feature/yyy                           │
│                     └── work → git add → git commit → ...                  │
│                                                                             │
│  3️⃣ INTEGRATION                                                              │
│     └── Team Lead: git checkout main                                       │
│                   └── git merge feature/xxx                                │
│                   └── git merge feature/yyy                                │
│                                                                             │
│  4️⃣ TESTING                                                                  │
│     └── Tester: docker compose up → run tests → report bugs               │
│                                                                             │
│  5️⃣ BUG FIX                                                                  │
│     ├── Developer: git checkout -b fix/bug-xxx                             │
│     │             └── fix → git commit → git checkout main                 │
│     │             └── git merge fix/bug-xxx                                │
│     │                                                                       │
│     └── Tester: retest → verify → close bug                               │
│                                                                             │
│  6️⃣ RELEASE                                                                  │
│     └── Team Lead: git tag -a v1.0 -m "Release v1.0"                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

**🎉 Workshop Complete!**

นักศึกษาได้เรียนรู้:
- ✅ Git branch workflow
- ✅ การทำงานเป็นทีม
- ✅ Bug discovery และ fix process
- ✅ Version tagging
- ✅ Commit message conventions
