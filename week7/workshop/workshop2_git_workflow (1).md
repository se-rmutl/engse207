# 🔀 Workshop 2: คู่มือ Git Workflow สำหรับทีม 3 คน

**เอกสารเสริมสำหรับ:** Workshop 2: Team Development Simulation  
**รายวิชา:** ENGSE207 Software Architecture  
**วัตถุประสงค์:** เรียนรู้การใช้ Git ทำงานเป็นทีมตั้งแต่เริ่มต้นจนถึง Release

---

## 📋 สารบัญ

1. [ภาพรวม Workflow](#1-ภาพรวม-workflow)
2. [Phase 0: Planning (ทำร่วมกัน)](#2-phase-0-planning-ทำร่วมกัน)
3. [Phase 1: Setup (สมศักดิ์)](#3-phase-1-setup-สมศักดิ์)
4. [Phase 2: Development (สมชาย + สมหญิง ทำพร้อมกัน)](#4-phase-2-development-สมชาย--สมหญิง-ทำพร้อมกัน)
5. [Phase 3: Integration (สมศักดิ์)](#5-phase-3-integration-สมศักดิ์)
6. [Phase 4: Bug Fix (สมชาย + สมหญิง)](#6-phase-4-bug-fix-สมชาย--สมหญิง)
7. [Phase 5: Release (สมศักดิ์)](#7-phase-5-release-สมศักดิ์)
8. [สรุปคำสั่ง Git](#8-สรุปคำสั่ง-git)

---

## 1. ภาพรวม Workflow

### 1.1 ทีมพัฒนา

| บทบาท | ชื่อ | หน้าที่หลัก | Branch |
|-------|------|------------|--------|
| 🧪 **Team Lead / Tester** | สมศักดิ์ | Setup repo, Merge, Test, Release | `main` |
| 🎨 **Frontend Developer** | สมชาย | สร้าง UI (HTML, CSS, JS) | `feature/frontend` |
| ⚙️ **Backend Developer** | สมหญิง | สร้าง API และ Database | `feature/backend` |

### 1.2 Workflow Diagram (ภาพรวม)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                         TEAM GIT WORKFLOW - OVERVIEW                           │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  Phase 0        Phase 1         Phase 2          Phase 3       Phase 4 & 5     │  
│  PLANNING       SETUP         DEVELOPMENT      INTEGRATION    BUG FIX/RELEASE  │
│  (ร่วมกัน)       (สมศักดิ์)          (พร้อมกัน)         (สมศักดิ์)           (ทีม)        │
│                                                                                │
│  ┌────────┐     ┌───────┐     ┌─────────────┐    ┌───────┐     ┌──────────┐    │
│  │ตกลง    │     │สร้าง   │     │             │    │ Merge │     │ Fix Bug  │    │
│  │API     │────►│ Repo  │────►│  สมชาย      │───►│  +    │────►│    +     │    │
│  │Contract│     │  +    │     │     +       │    │ Test  │     │ Release  │    │
│  │        │     │ Base  │     │  สมหญิง      │    │       │     │  v2.0    │    │
│  └────────┘     └───────┘     └─────────────┘    └───────┘     └──────────┘    │
│                                                                                │
│  ⏱️ 15 นาที      ⏱️ 15 นาที      ⏱️ 30 นาที          ⏱️ 15 นาที     ⏱️ 15 นาที      │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Workflow Diagram (ละเอียด - Git Branches)

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                         GIT BRANCH WORKFLOW - DETAILED                         │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  Timeline:  Phase 1    │     Phase 2          │  Phase 3  │    Phase 4 & 5     │
│             SETUP      │   DEVELOPMENT        │INTEGRATION│   BUG FIX/RELEASE  │
│                        │   (ทำพร้อมกัน)         │           │                    │
│                        │                      │           │                    │
│  main      ●──●──●─────┼──────────────────────┼──●────●───┼───●───────●──► v2.0│
│            │  │  │     │                      │  │    │   │   │       │        │
│            │  │  │     │                      │  │    │   │   │       │        │
│            │  │  └─────┼─────────┐            │  │    │   │   │       │        │
│            │  │        │         │            │  │    │   │   │       │        │
│  feature/  │  │        │  ●──●──●┼────────────┼──┘    │   │   ●───────┤        │
│  frontend  │  │        │  │  │  ││            │ merge │   │  fix FE   │        │
│            │  │        │  │  │  ││            │       │   │           │        │
│            │  │        │  HTML  ││            │       │   │           │        │
│            │  │        │     CSS││            │       │   │           │        │
│            │  │        │        JS (mock)     │       │   │           │        │
│            │  │        │        ││            │       │   │           │        │
│  feature/  │  │        │  ●──●──●┼──●─────────┼───────┘   │   ●───────┤        │
│  backend   │  │        │  │  │  │  │          │  merge    │  fix BE   │        │
│            │  │        │  │  │  │  │          │           │           │        │
│            │  │        │  DB API│ Server      │           │           │        │
│            │  │        │     Ctrl│ Docker     │           │           │        │
│            │  │        │        │             │           │           │        │
│            │  │        │        │             │    🧪     │    🧪     │        │
│            │  │        │        │             │   TEST    │  RETEST   │        │
│            │  │        │        │             │  ❌ Bug   │   ✅      │        │
│                        │                      │           │                    │
├────────────────────────┼──────────────────────┼───────────┼────────────────────┤
│  สมศักดิ์:                │  สมชาย: แตก branch   │  สมศักดิ์:   │  ทีม: แก้ bug        │
│  • git init            │  สมหญิง: แตก branch   │  • merge  │  สมศักดิ์: release    │
│  • สร้างโครงสร้าง        │  ⚡ ทำพร้อมกันได้!       │  • test   │                    │
│  • แจ้งทีม               │                      │  • report │                    │
└────────────────────────┴──────────────────────┴───────────┴────────────────────┘
```

### 1.4 คำถามที่พบบ่อย

| คำถาม | คำตอบ |
|-------|-------|
| **ใครสร้าง repo ก่อน?** | **สมศักดิ์** - ต้องเตรียม base ให้ทีมก่อน |
| **สมชาย + สมหญิง แตก branch พร้อมกันได้ไหม?** | **ได้** - เพราะแก้คนละไฟล์ ไม่ชนกัน |
| **Frontend ทดสอบยังไงถ้า API ยังไม่พร้อม?** | **ใช้ Mock Data** - ข้อมูลปลอมใน JavaScript |
| **Merge ใครก่อน?** | **Backend ก่อน** - เพราะ API ต้องพร้อมก่อนทดสอบรวม |

---

## 2. Phase 0: Planning (ทำร่วมกัน)

> ⏱️ **เวลา:** 15 นาที  
> 👥 **ผู้ทำ:** ทั้งทีม (สมศักดิ์ + สมชาย + สมหญิง)  
> 🎯 **เป้าหมาย:** ตกลง API Contract เพื่อให้ทำงานพร้อมกันได้

### 2.1 ทำไมต้อง Planning ก่อน?

```
┌─────────────────────────────────────────────────────────────────┐
│                    ❓ ปัญหา: ถ้าไม่มี Planning                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   สมชาย (Frontend)              สมหญิง (Backend)                 │
│   คิดว่า API จะ return:          ทำ API ให้ return:                │
│                                                                 │
│   {                             {                               │
│     "contacts": [...]             "success": true,              │
│   }                               "data": [...]                 │
│                                 }                               │
│                                                                 │
│                        ❌ ไม่ตรงกัน!                              │
│                        😱 Merge แล้วพัง!                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    ✅ วิธีแก้: ตกลง API Contract ก่อน               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ทั้งทีมตกลงกันว่า API จะ return แบบนี้:                              │
│                                                                 │
│   {                                                             │
│     "success": true,                                            │
│     "data": [...],                                              │
│     "count": 3                                                  │
│   }                                                             │
│                                                                 │
│   สมชาย: ใช้ format นี้ทำ Mock                                     │
│   สมหญิง: ทำ API ให้ return format นี้                              │
│                                                                 │
│                        ✅ ตรงกัน!                                │
│                        🎉 Merge แล้วทำงานได้!                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 API Contract ที่ตกลงกัน

ทั้งทีมประชุมและตกลง API specification ดังนี้:

#### Endpoint 1: GET /api/contacts (ดูรายชื่อทั้งหมด)

```
Request:  GET /api/contacts
Response: 
{
  "success": true,
  "data": [
    { "id": 1, "name": "สมชาย", "email": "a@test.com", "phone": "081-111-1111" },
    { "id": 2, "name": "สมหญิง", "email": "b@test.com", "phone": "082-222-2222" }
  ],
  "count": 2
}
```

#### Endpoint 2: POST /api/contacts (เพิ่มรายชื่อ)

```
Request:  POST /api/contacts
Body:     { "name": "ใหม่", "email": "new@test.com", "phone": "083-333-3333" }
Response: 
{
  "success": true,
  "data": { "id": 3, "name": "ใหม่", "email": "new@test.com", "phone": "083-333-3333" },
  "message": "เพิ่มรายชื่อสำเร็จ"
}
```

#### Endpoint 3: DELETE /api/contacts/:id (ลบรายชื่อ)

```
Request:  DELETE /api/contacts/1
Response: 
{
  "success": true,
  "message": "ลบรายชื่อสำเร็จ"
}
```

#### Error Response (กรณี error)

```json
{
  "success": false,
  "error": "ข้อความ error"
}
```

### 2.3 Checkpoint: ก่อนไปต่อ

✅ ทุกคนเข้าใจ API Contract แล้ว  
✅ สมชายรู้ว่าจะทำ Mock Data แบบไหน  
✅ สมหญิงรู้ว่าต้อง return format ไหน  
📢 **สมศักดิ์แจ้งทีม:** "ไป Phase 1 - ผมจะสร้าง repo ก่อน"

---

## 3. Phase 1: Setup (สมศักดิ์)

> ⏱️ **เวลา:** 15 นาที  
> 👤 **ผู้ทำ:** สมศักดิ์ (Team Lead)  
> 🎯 **เป้าหมาย:** สร้าง repository และโครงสร้างเริ่มต้น  
> ⏸️ **สมชาย + สมหญิง:** รอจนกว่าสมศักดิ์จะเสร็จ

### 3.1 ขั้นตอนที่สมศักดิ์ต้องทำ

#### ขั้นตอนที่ 1: สร้างโฟลเดอร์โปรเจกต์

```bash
mkdir -p ~/docker-workshop/contact-manager
cd ~/docker-workshop/contact-manager
```

#### ขั้นตอนที่ 2: เริ่มต้น Git repository

```bash
git init
```

**ผลลัพธ์:**
```
Initialized empty Git repository in .../contact-manager/.git/
```

#### ขั้นตอนที่ 3: สร้างไฟล์พื้นฐาน

สร้างไฟล์ `README.md`:

```bash
cat > README.md << 'EOF'
# 📇 Contact Manager

ระบบจัดการรายชื่อติดต่อ - TechStart Company

## Team
- 🎨 สมชาย - Frontend Developer
- ⚙️ สมหญิง - Backend Developer  
- 🧪 สมศักดิ์ - Tester / Team Lead

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL
- Container: Docker Compose
EOF
```

สร้างไฟล์ `.gitignore`:

```bash
cat > .gitignore << 'EOF'
node_modules/
.env
*.log
.DS_Store
EOF
```

สร้างไฟล์ `.env.example`:

```bash
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
```

#### ขั้นตอนที่ 4: Commit ไฟล์พื้นฐาน

```bash
git add .
git commit -m "Initial commit: project setup"
```

**ผลลัพธ์:**
```
[main (root-commit) a1b2c3d] Initial commit: project setup
 3 files changed, 25 insertions(+)
```

#### ขั้นตอนที่ 5: สร้างโครงสร้างโฟลเดอร์

```bash
mkdir -p frontend/css frontend/js
mkdir -p backend/src/routes backend/src/controllers backend/src/database
mkdir -p database
mkdir -p nginx
mkdir -p docs
```

#### ขั้นตอนที่ 6: สร้าง docker-compose.yml และ nginx config

*(สร้างตามเนื้อหาใน Workshop 2 หลัก)*

#### ขั้นตอนที่ 7: Commit โครงสร้าง

```bash
git add .
git commit -m "Add project structure and docker-compose"
```

#### ขั้นตอนที่ 8: ตรวจสอบประวัติ

```bash
git log --oneline
```

**ผลลัพธ์:**
```
b2c3d4e Add project structure and docker-compose
a1b2c3d Initial commit: project setup
```

### 3.2 Checkpoint: สมศักดิ์เสร็จแล้ว

```
┌─────────────────────────────────────────────────────────────────┐
│  ✅ Phase 1 COMPLETE                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📁 โครงสร้างที่สร้าง:                                             │
│                                                                 │
│  contact-manager/                                               │
│  ├── README.md                                                  │
│  ├── .gitignore                                                 │
│  ├── .env.example                                               │
│  ├── docker-compose.yml                                         │
│  ├── frontend/          ← สมชายจะทำงานที่นี่                       │
│  │   ├── css/                                                   │
│  │   └── js/                                                    │
│  ├── backend/           ← สมหญิงจะทำงานที่นี่                       │
│  │   └── src/                                                   │
│  ├── database/                                                  │
│  ├── nginx/                                                     │
│  └── docs/                                                      │
│                                                                 │
│  📢 สมศักดิ์แจ้งทีม:                                               │
│  "Repository พร้อมแล้ว! ให้ สมชาย และ สมหญิง                       │
│   แตก branch และเริ่มทำงานได้เลย"                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Phase 2: Development (สมชาย + สมหญิง ทำพร้อมกัน)

> ⏱️ **เวลา:** 30 นาที  
> 👥 **ผู้ทำ:** สมชาย + สมหญิง (ทำพร้อมกัน)  
> 🎯 **เป้าหมาย:** พัฒนา Frontend และ Backend แยกกัน  
> ⏸️ **สมศักดิ์:** รอทั้งคู่เสร็จ

```
┌─────────────────────────────────────────────────────────────────┐
│              ⚡ Phase 2: ทำพร้อมกันได้!                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│     🎨 สมชาย                        ⚙️ สมหญิง                     │
│   ┌───────────────┐              ┌───────────────┐              │
│   │   Frontend    │              │    Backend    │              │
│   │               │              │               │              │
│   │  • HTML       │   ทำพร้อมกัน   │  • Database   │              │
│   │  • CSS        │ ◄──────────► │  • API        │              │
│   │  • JS + Mock  │              │  • Server     │              │
│   │               │              │               │              │
│   │  ทดสอบด้วย     │              │  ทดสอบด้วย     │              │
│   │  Mock Data ✅ │              │  curl/Postman │              │
│   │               │              │  ✅           │              │
│   └───────────────┘              └───────────────┘              │
│                                                                 │
│   💡 ทั้งคู่แก้คนละไฟล์ → ไม่มี conflict!                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 4.1 สมชาย: พัฒนา Frontend (พร้อมกับสมหญิง)

#### ขั้นตอนที่ 1: แตก branch จาก main

```bash
cd ~/docker-workshop/contact-manager
git checkout -b feature/frontend
```

**ผลลัพธ์:**
```
Switched to a new branch 'feature/frontend'
```

#### ขั้นตอนที่ 2: ตรวจสอบ branch

```bash
git branch
```

**ผลลัพธ์:**
```
* feature/frontend
  main
```

#### ขั้นตอนที่ 3: สร้าง index.html

สร้างไฟล์ `frontend/index.html` *(ดูเนื้อหาจาก Workshop 2 หลัก)*

#### ขั้นตอนที่ 4: Commit HTML

```bash
git add frontend/index.html
git commit -m "feat(frontend): add index.html structure"
```

#### ขั้นตอนที่ 5: สร้าง style.css

สร้างไฟล์ `frontend/css/style.css` *(ดูเนื้อหาจาก Workshop 2 หลัก)*

#### ขั้นตอนที่ 6: Commit CSS

```bash
git add frontend/css/style.css
git commit -m "feat(frontend): add CSS styles"
```

#### ขั้นตอนที่ 7: สร้าง app.js (พร้อม Mock Data) ⭐

> 💡 **สำคัญ:** ใช้ Mock Data เพื่อทดสอบ UI โดยไม่ต้องรอ Backend!

สร้างไฟล์ `frontend/js/app.js` *(ดูเนื้อหาจาก Workshop 2 หลัก - ใช้ version ที่มี Mock Data)*

**ส่วนสำคัญของ app.js:**

```javascript
// ============================================
// 🔶 MOCK DATA - ใช้ทดสอบตอน Backend ยังไม่พร้อม
// ============================================
const USE_MOCK = true;  // ← เปลี่ยนเป็น false เมื่อ API พร้อม

const MOCK_CONTACTS = [
    { id: 1, name: "ทดสอบ หนึ่ง", email: "test1@example.com", phone: "081-111-1111" },
    { id: 2, name: "ทดสอบ สอง", email: "test2@example.com", phone: "082-222-2222" },
    { id: 3, name: "ทดสอบ สาม", email: "test3@example.com", phone: "083-333-3333" }
];

async function loadContacts() {
    // 🔶 Mock Mode
    if (USE_MOCK) {
        console.log("🔶 [MOCK] Loading contacts...");
        renderContacts(MOCK_CONTACTS);
        return;
    }
    
    // 🟢 Real API (ใช้เมื่อ Backend พร้อม)
    const response = await fetch(`${API_URL}/contacts`);
    // ...
}
```

#### ขั้นตอนที่ 8: Commit JavaScript

```bash
git add frontend/js/app.js
git commit -m "feat(frontend): add JavaScript with Mock Data support"
```

#### ขั้นตอนที่ 9: ทดสอบด้วย Mock Data

```bash
# เปิด index.html ในเบราว์เซอร์โดยตรง (ไม่ต้องรอ Backend!)
open frontend/index.html    # macOS
start frontend/index.html   # Windows
```

**ผลลัพธ์:**
- ✅ เห็น Contact List พร้อมข้อมูล Mock
- ✅ สามารถเพิ่ม/ลบ contact ได้ (เก็บใน memory)
- ✅ Console แสดง `🔶 [MOCK]` ทุกครั้งที่เรียก

#### ขั้นตอนที่ 10: ตรวจสอบ commits

```bash
git log --oneline
```

**ผลลัพธ์:**
```
d4e5f6a feat(frontend): add JavaScript with Mock Data support
c3d4e5f feat(frontend): add CSS styles
b2c3d4e feat(frontend): add index.html structure
...
```

---

### 4.2 สมหญิง: พัฒนา Backend (พร้อมกับสมชาย)

> ⚡ **หมายเหตุ:** สมหญิงทำพร้อมกับสมชายได้เลย ไม่ต้องรอกัน

#### ขั้นตอนที่ 1: แตก branch จาก main

```bash
cd ~/docker-workshop/contact-manager
git checkout main              # กลับไป main ก่อน
git checkout -b feature/backend
```

**ผลลัพธ์:**
```
Switched to a new branch 'feature/backend'
```

#### ขั้นตอนที่ 2: ตรวจสอบ branches ทั้งหมด

```bash
git branch -a
```

**ผลลัพธ์:**
```
* feature/backend
  feature/frontend   ← สมชายกำลังทำอยู่
  main
```

#### ขั้นตอนที่ 3-8: สร้างไฟล์ Backend

| ลำดับ | ไฟล์ | Commit message |
|-------|------|----------------|
| 3 | `database/init.sql` | `feat(db): add database schema` |
| 4 | `backend/package.json` | `feat(backend): add package.json` |
| 5 | `backend/src/database/db.js` | `feat(backend): add database connection` |
| 6 | `backend/src/controllers/contactController.js` | `feat(backend): add contact controller` |
| 7 | `backend/src/routes/contactRoutes.js` | `feat(backend): add routes` |
| 8 | `backend/server.js` + `Dockerfile` | `feat(backend): add server and Dockerfile` |

*(ดูเนื้อหาไฟล์จาก Workshop 2 หลัก)*

#### ขั้นตอนที่ 9: ทดสอบ Backend (ไม่ต้องรอ Frontend)

```bash
# รัน database + backend ด้วย docker compose
docker compose up -d db api

# รอ services พร้อม
sleep 10

# ทดสอบด้วย curl
curl http://localhost:3000/api/contacts
```

**ผลลัพธ์:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "สมชาย ใจดี", ... }
  ],
  "count": 3
}
```

#### ขั้นตอนที่ 10: ตรวจสอบ commits

```bash
git log --oneline
```

---

### 4.3 Checkpoint: Phase 2 เสร็จแล้ว

```
┌─────────────────────────────────────────────────────────────────┐
│  ✅ Phase 2 COMPLETE                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🎨 สมชาย (feature/frontend):                                    │
│     ✅ index.html                                               │
│     ✅ style.css                                                │
│     ✅ app.js + Mock Data                                       │
│     ✅ ทดสอบ UI ด้วย Mock แล้ว                                    │
│                                                                 │
│  ⚙️ สมหญิง (feature/backend):                                    │
│     ✅ init.sql                                                 │
│     ✅ package.json                                             │
│     ✅ db.js, controller, routes                                │
│     ✅ server.js + Dockerfile                                   │
│     ✅ ทดสอบ API ด้วย curl แล้ว                                   │
│                                                                 │
│  📢 ทั้งคู่แจ้งสมศักดิ์:                                            │
│  "งานเสร็จแล้ว พร้อม merge!"                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Phase 3: Integration (สมศักดิ์)

> ⏱️ **เวลา:** 15 นาที  
> 👤 **ผู้ทำ:** สมศักดิ์  
> 🎯 **เป้าหมาย:** Merge code และทดสอบระบบรวม  
> ⏸️ **สมชาย + สมหญิง:** รอผลการทดสอบ

### 5.1 Merge Backend ก่อน

> 💡 **ทำไม Backend ก่อน?** เพราะ API ต้องพร้อมก่อนทดสอบ Frontend จริง

#### ขั้นตอนที่ 1: กลับไป main

```bash
git checkout main
```

#### ขั้นตอนที่ 2: ดู preview ก่อน merge

```bash
git log main..feature/backend --oneline
```

#### ขั้นตอนที่ 3: Merge Backend

```bash
git merge feature/backend -m "Merge feature/backend into main"
```

### 5.2 Merge Frontend

#### ขั้นตอนที่ 4: Merge Frontend

```bash
git merge feature/frontend -m "Merge feature/frontend into main"
```

### 5.3 ปิด Mock Mode ⭐

> 💡 **สำคัญ:** ต้องปิด Mock Mode ก่อนทดสอบจริง!

#### ขั้นตอนที่ 5: แก้ไข app.js

เปิดไฟล์ `frontend/js/app.js` และเปลี่ยน:

```javascript
// จาก:
const USE_MOCK = true;

// เป็น:
const USE_MOCK = false;  // ← ปิด Mock Mode
```

#### ขั้นตอนที่ 6: Commit การปิด Mock

```bash
git add frontend/js/app.js
git commit -m "chore(frontend): disable mock mode for integration"
```

### 5.4 Build และ Test

#### ขั้นตอนที่ 7: รัน Docker Compose ทั้งหมด

```bash
docker compose up -d --build
```

#### ขั้นตอนที่ 8: รอ services พร้อมและทดสอบ

```bash
sleep 15
docker compose ps
curl http://localhost:8080/health
```

### 5.5 ทดสอบระบบ

| Test Case | คำสั่ง | ผลลัพธ์ |
|-----------|--------|---------|
| TC1: GET contacts | `curl http://localhost:8080/api/contacts` | ✅ PASS |
| TC2: POST ปกติ | `curl -X POST ... -d '{"name":"ทดสอบ",...}'` | ✅ PASS |
| TC3: POST ชื่อว่าง | `curl -X POST ... -d '{"name":"",...}'` | ✅ PASS |
| TC4: POST ชื่อยาว | `curl -X POST ... -d '{"name":"...60 chars...",...}'` | ❌ BUG! |

> ❌ **BUG FOUND!** ชื่อยาวเกิน 50 ตัว → แสดง database error

### 5.6 สร้าง Bug Report และแจ้งทีม

```bash
git add docs/BUG_REPORT.md
git commit -m "docs: add bug report #001 - name length validation"
```

📢 **สมศักดิ์แจ้งทีม:** "พบ Bug #001 - ให้ สมหญิง + สมชาย แก้ไข"

---

## 6. Phase 4: Bug Fix (สมชาย + สมหญิง)

> ⏱️ **เวลา:** 10 นาที  
> 👥 **ผู้ทำ:** สมชาย + สมหญิง (ทำพร้อมกันได้)  
> 🎯 **เป้าหมาย:** แก้ Bug #001

### 6.1 สมหญิง: แก้ Backend

```bash
git checkout main
git checkout -b fix/backend-validation
```

แก้ไข `contactController.js`:

```javascript
const MAX_NAME_LENGTH = 50;

if (trimmedName.length > MAX_NAME_LENGTH) {
    return res.status(400).json({
        success: false,
        error: `ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร`
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

### 6.2 สมชาย: แก้ Frontend

```bash
git checkout main
git checkout -b fix/frontend-validation
```

แก้ไข `index.html`:
```html
<input type="text" id="name" maxlength="50" required>
```

แก้ไข `app.js`:
```javascript
const MAX_NAME_LENGTH = 50;

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

---

## 7. Phase 5: Release (สมศักดิ์)

> ⏱️ **เวลา:** 5 นาที  
> 👤 **ผู้ทำ:** สมศักดิ์  
> 🎯 **เป้าหมาย:** Retest และ Release v2.0

### 7.1 Rebuild และ Retest

```bash
docker compose down
docker compose up -d --build
sleep 15
```

### 7.2 Retest TC4

```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"ชื่อยาวมากกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกกก"}'
```

**ผลลัพธ์:**
```json
{"success":false,"error":"ชื่อต้องไม่เกิน 50 ตัวอักษร"}
```

✅ **TC4: PASS!**

### 7.3 Create Release Tag

```bash
git tag -a v2.0 -m "Release v2.0 - Bug #001 Fixed"
```

### 7.4 Final Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    🎉 RELEASE v2.0 COMPLETE!                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📊 Test Results: ALL PASS ✅                                    │
│                                                                 │
│  🏷️ Version: v2.0                                                │
│  🌐 URL: http://localhost:8080                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. สรุปคำสั่ง Git

### 8.1 คำสั่งพื้นฐาน

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `git init` | สร้าง repository |
| `git status` | ดูสถานะไฟล์ |
| `git add .` | เพิ่มทุกไฟล์ |
| `git commit -m "msg"` | บันทึก commit |
| `git log --oneline` | ดูประวัติ |

### 8.2 คำสั่ง Branch

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `git branch` | ดู branches |
| `git checkout -b <branch>` | สร้างและสลับ branch |
| `git checkout <branch>` | สลับ branch |
| `git merge <branch>` | รวม branch |
| `git branch -d <branch>` | ลบ branch |

### 8.3 Commit Message Convention

| Type | ความหมาย |
|------|----------|
| `feat` | ฟีเจอร์ใหม่ |
| `fix` | แก้ bug |
| `docs` | เอกสาร |
| `chore` | งานอื่นๆ |

---

## 📋 Checklist

- [ ] **Phase 0:** ตกลง API Contract ร่วมกัน
- [ ] **Phase 1:** สมศักดิ์สร้าง repo และโครงสร้าง
- [ ] **Phase 2:** สมชาย + สมหญิง พัฒนาพร้อมกัน (ใช้ Mock Data)
- [ ] **Phase 3:** สมศักดิ์ merge + ปิด Mock + ทดสอบ
- [ ] **Phase 4:** แก้ Bug (ทำพร้อมกันได้)
- [ ] **Phase 5:** Retest + Release Tag v2.0

---

**🎉 Workshop Complete!**
