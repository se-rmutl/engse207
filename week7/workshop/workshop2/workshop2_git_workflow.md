# 🔀 Workshop 2: คู่มือ Git Workflow สำหรับทีม 3 คน

**เอกสารเสริมสำหรับ:** Workshop 2: Team Development Simulation  
**รายวิชา:** ENGSE207 Software Architecture  
**วัตถุประสงค์:** เรียนรู้การใช้ Git ทำงานเป็นทีมตั้งแต่เริ่มต้นจนถึง Release

---

## 📋 สารบัญ

1. [ภาพรวม Workflow](#1-ภาพรวม-workflow)
2. [Phase 0: Planning - ตกลง API Contract](#2-phase-0-planning)
3. [Phase 1: Setup - สมศักดิ์สร้าง Repository](#3-phase-1-setup)
4. [Phase 2: Development - ทำงานพร้อมกัน](#4-phase-2-development)
5. [Phase 3: Integration - Merge และ Test](#5-phase-3-integration)
6. [Phase 4: Bug Fix](#6-phase-4-bug-fix)
7. [Phase 5: Release](#7-phase-5-release)
8. [สรุปคำสั่ง Git](#8-สรุปคำสั่ง-git)

---

## 1. ภาพรวม Workflow

### 1.1 ทีมพัฒนา

| บทบาท | ชื่อ | หน้าที่หลัก | Branch |
|-------|------|------------|--------|
| 🧪 **Team Lead** | สมศักดิ์ | Setup repo, Merge, Test, Release | `main` |
| 🎨 **Frontend** | สมชาย | สร้าง UI + **Mock Data** | `feature/frontend` |
| ⚙️ **Backend** | สมหญิง | สร้าง API + Database | `feature/backend` |

### 1.2 คำถามสำคัญ & คำตอบ

| คำถาม | คำตอบ | เหตุผล |
|-------|-------|--------|
| **ใครสร้าง repo ก่อน?** | สมศักดิ์ | ต้องมี base ก่อนแตก branch |
| **แตก branch พร้อมกันได้ไหม?** | ✅ ได้ | เพราะแก้คนละไฟล์ ไม่ชนกัน |
| **Frontend ทดสอบยังไงถ้า API ยังไม่พร้อม?** | ใช้ **Mock Data** | ข้อมูลปลอมใน JavaScript |
| **Merge ใครก่อน?** | Backend ก่อน | API ต้องพร้อมก่อนทดสอบรวม |

### 1.3 Workflow Overview

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                              WORKSHOP 2 WORKFLOW                               │
├────────────────────────────────────────────────────────────────────────────────┤
│                                                                                │
│  Phase 0        Phase 1        Phase 2           Phase 3        Phase 4 & 5    │
│  ────────       ────────       ────────          ────────       ────────────   │
│  PLANNING       SETUP          DEVELOPMENT       INTEGRATION    FIX & RELEASE  │
│                                                                                │
│  ┌────────┐    ┌────────┐    ┌──────────────┐   ┌────────┐    ┌────────────┐   │
│  │  ตกลง  │───►│  สร้าง  │───►│   สมชาย      │──►│ Merge  │───►│  Bug Fix   │   │
│  │  API   │    │  Repo  │    │      +       │   │   +    │    │     +      │   │
│  │Contract│    │   +    │    │   สมหญิง      │   │  Test  │    │  Release   │   │
│  │        │    │  Base  │    │  (พร้อมกัน)    │   │        │    │   v2.0     │   │
│  └────────┘    └────────┘    └──────────────┘   └────────┘    └────────────┘   │
│                                                                                │
│  👥 ทั้งทีม      👤 สมศักดิ์     👥 สมชาย+สมหญิง    👤 สมศักดิ์    👥 ทีม + สมศักดิ์         │
│  ⏱️ 10 นาที     ⏱️ 15 นาที     ⏱️ 25 นาที        ⏱️ 15 นาที    ⏱️ 20 นาที           │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Git Branch Diagram (ละเอียด)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           GIT BRANCH WORKFLOW (DETAILED)                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Timeline:                                                                      │
│  ─────────────────────────────────────────────────────────────────────────────► │
│  Phase 1        │        Phase 2              │ Phase 3  │   Phase 4 & 5        │
│  SETUP          │      DEVELOPMENT            │INTEGRATE │   FIX & RELEASE      │
│  (สมศักดิ์)        │   (สมชาย + สมหญิง พร้อมกัน)    │(สมศักดิ์)   │                      │
│                 │                             │          │                      │
│                 │                             │          │                      │
│  main     ●──●──┼─────────────────────────────┼──●───●───┼────●────────●──► v2.0
│           │  │  │                             │  ↑   ↑   │    ↑        ↑        │
│           │  │  │                             │  │   │   │    │        │        │
│  feature/ │  │  │  ●────●────●────────────────┼──┘   │   │    ●────────┤        │
│  frontend │  │  │  │    │    │                │merge │   │   fix/FE    │        │
│           │  │  │ HTML CSS  JS+Mock           │      │   │             │        │
│           │  │  │                             │      │   │             │        │
│  feature/ │  │  │  ●────●────●────●───────────┼──────┘   │    ●────────┤        │
│  backend  │  │  │  │    │    │    │           │ merge    │   fix/BE    │        │
│           │  │  │  DB  API Ctrl Server        │          │             │        │
│           │  │  │                             │          │             │        │
│           │  │  │                             │   🧪     │      🧪     │        │
│           │  │  │                             │  TEST    │    RETEST   │        │
│           │  │  │                             │ ❌ Bug   │     ✅      │        │
│                 │                             │          │                      │
├─────────────────┼─────────────────────────────┼──────────┼──────────────────────┤
│  สมศักดิ์:         │  สมชาย: แตก branch          │  สมศักดิ์:  │     ทีม: แก้ bug       │
│  • git init     │  • ใช้ Mock Data ทดสอบ UI    │ • merge  │  สมศักดิ์: release      │
│  • สร้างโครงสร้าง │  สมหญิง: แตก branch          │ • ปิด Mock│    • tag v2.0        │
│  • แจ้งทีม        │  • ทดสอบ API ด้วย curl       │ • test   │                      │
│                 │  ⚡ ทำพร้อมกันได้!              │          │                      │
└─────────────────┴─────────────────────────────┴──────────┴──────────────────────┘
```

### 1.5 ทำไม Frontend + Backend ทำพร้อมกันได้?

```
┌────────────────────────────────────────────────────────────────┐
│              ⚡ PARALLEL DEVELOPMENT - ทำพร้อมกันได้!              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│     🎨 สมชาย (Frontend)            ⚙️ สมหญิง (Backend)          │
│   ┌───────────────────┐        ┌──────────────────┐            │
│   │   📁 frontend/    │        │   📁 backend/    │            │
│   │   • index.html    │ ไม่ชนกัน │   • server.js    │            │
│   │   • style.css     │◄──────►│   • routes/      │            │
│   │   • app.js        │        │   • db.js        │            │
│   └───────────────────┘        └──────────────────┘            │
│            │                            │                      │
│            ▼                            ▼                      │
│   ┌───────────────────┐        ┌───────────────────┐           │
│   │  ทดสอบด้วย         │        │  ทดสอบด้วย         │           │
│   │  🔶 Mock Data     │        │  curl / Postman   │           │
│   │  ไม่ต้องรอ API!     │        │  ไม่ต้องรอ UI!      │           │
│   │       ✅          │        │       ✅          │           │
│   └───────────────────┘        └───────────────────┘           │
│                                                                │
│   💡 Key Insight: ใช้ Mock Data ให้ Frontend ทำงานได้โดยไม่ต้องรอ   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 2. Phase 0: Planning

> ⏱️ **เวลา:** 10 นาที  
> 👥 **ผู้ทำ:** ทั้งทีม  
> 🎯 **เป้าหมาย:** ตกลง API Contract ก่อนเริ่มทำ

### 2.1 ปัญหาถ้าไม่ Planning

```
❌ ถ้าไม่ตกลงก่อน:
   สมชาย คิดว่า API return: { "contacts": [...] }
   สมหญิง ทำ API return:    { "success": true, "data": [...] }
   
   → Format ไม่ตรง! Merge แล้วพัง!

✅ ถ้าตกลง API Contract ก่อน:
   ทุกคนใช้ format: { "success": true, "data": [...], "count": 3 }
   
   • สมชาย: ใช้ format นี้ทำ Mock Data
   • สมหญิง: ทำ API ให้ return format นี้
   
   → Format ตรงกัน! Merge แล้วทำงานได้!
```

### 2.2 API Contract ที่ตกลง

| Endpoint | Method | Response |
|----------|--------|----------|
| `/api/contacts` | GET | `{ success, data: [...], count }` |
| `/api/contacts` | POST | `{ success, data, message }` |
| `/api/contacts/:id` | DELETE | `{ success, message }` |
| Error | - | `{ success: false, error: "..." }` |

### 2.3 Checkpoint

```
✅ ทุกคนเข้าใจ API format
✅ สมชายรู้ว่าจะทำ Mock Data แบบไหน
✅ สมหญิงรู้ว่าต้อง return format ไหน
📢 สมศักดิ์: "ไป Phase 1 - ผมจะสร้าง repo ก่อน"
```

---

## 3. Phase 1: Setup

> ⏱️ **เวลา:** 15 นาที  
> 👤 **ผู้ทำ:** สมศักดิ์  
> ⏸️ **สมชาย + สมหญิง:** รอจนกว่าสมศักดิ์จะเสร็จ

### 3.1 สมศักดิ์ทำอะไรบ้าง

| ลำดับ | งาน | คำสั่ง Git |
|-------|-----|-----------|
| 1 | สร้างโฟลเดอร์ | `mkdir contact-manager && cd contact-manager` |
| 2 | Init repo | `git init` |
| 3 | สร้างไฟล์พื้นฐาน | `.gitignore`, `.env.example`, `README.md` |
| 4 | Commit | `git add . && git commit -m "Initial commit"` |
| 5 | สร้างโครงสร้าง | `mkdir frontend backend database nginx docs` |
| 6 | สร้าง docker-compose | `docker-compose.yml`, `nginx/default.conf` |
| 7 | Commit | `git commit -m "Add project structure"` |

### 3.2 คำสั่งที่ใช้

```bash
# 1. สร้างโฟลเดอร์
mkdir -p ~/docker-workshop/contact-manager
cd ~/docker-workshop/contact-manager

# 2. Init Git
git init

# 3. สร้างไฟล์พื้นฐาน
# - .gitignore
# - .env.example
# - README.md

# 4. Commit
git add .
git commit -m "Initial commit: project setup"

# 5. สร้างโครงสร้าง
mkdir -p frontend/css frontend/js
mkdir -p backend/src/routes backend/src/controllers backend/src/database
mkdir -p database nginx docs

# 6. สร้าง docker-compose.yml, nginx config

# 7. Commit
git add .
git commit -m "Add project structure and docker-compose"

# 8. ตรวจสอบ
git log --oneline
```

### 3.3 Checkpoint

```
┌─────────────────────────────────────────────────────────────────┐
│  ✅ Phase 1 COMPLETE                                            │
├─────────────────────────────────────────────────────────────────┤
│  📁 โครงสร้างที่สร้าง:                                              │
│  contact-manager/                                               │
│  ├── .gitignore, .env.example, README.md                        │
│  ├── docker-compose.yml                                         │
│  ├── frontend/     ← สมชายจะทำ                                  │
│  ├── backend/      ← สมหญิงจะทำ                                  │
│  ├── database/, nginx/, docs/                                   │
│                                                                 │
│  📢 สมศักดิ์: "Repo พร้อมแล้ว! แตก branch ได้เลย"                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Phase 2: Development

> ⏱️ **เวลา:** 25 นาที  
> 👥 **ผู้ทำ:** สมชาย + สมหญิง (ทำพร้อมกัน)  
> ⏸️ **สมศักดิ์:** รอทั้งคู่เสร็จ

### 4.1 สมชาย: Frontend + Mock Data

**ขั้นตอน:**

| ลำดับ | งาน | คำสั่ง |
|-------|-----|-------|
| 1 | แตก branch | `git checkout -b feature/frontend` |
| 2 | สร้าง HTML | `frontend/index.html` |
| 3 | Commit | `git commit -m "feat(frontend): add HTML"` |
| 4 | สร้าง CSS | `frontend/css/style.css` |
| 5 | Commit | `git commit -m "feat(frontend): add CSS"` |
| 6 | สร้าง JS + Mock | `frontend/js/app.js` |
| 7 | Commit | `git commit -m "feat(frontend): add JS with Mock Data"` |
| 8 | ทดสอบ | เปิด `index.html` ในเบราว์เซอร์ |


**Mock Data ใน app.js:**

```javascript
// ============================================
// 🔶 MOCK DATA - ทดสอบ UI โดยไม่ต้องรอ Backend
// ============================================
const USE_MOCK = true;  // ⬅️ เปลี่ยนเป็น false เมื่อ merge (API พร้อม)

const MOCK_CONTACTS = [
    { id: 1, name: "ทดสอบ หนึ่ง", email: "test1@example.com", phone: "081-111-1111" },
    { id: 2, name: "ทดสอบ สอง", email: "test2@example.com", phone: "082-222-2222" }
];

async function loadContacts() {
    if (USE_MOCK) {
        console.log("🔶 [MOCK] Loading contacts...");
        renderContacts(MOCK_CONTACTS);
        return;
    }
    // Real API call...
}
```

**ทดสอบ:**
```bash
open frontend/index.html   # macOS
start frontend/index.html  # Windows
```

**ผลลัพธ์:** ✅ เห็น UI + Mock Data ทำงานได้

---

### 4.2 สมหญิง: Backend (ทำพร้อมกับสมชาย)

**ขั้นตอน:**

| ลำดับ | งาน | คำสั่ง |
|-------|-----|-------|
| 1 | กลับ main | `git checkout main` |
| 2 | แตก branch | `git checkout -b feature/backend` |
| 3 | สร้าง DB schema | `database/init.sql` |
| 4 | Commit | `git commit -m "feat(db): add schema"` |
| 5 | สร้าง API | `backend/src/controllers/`, `routes/` |
| 6 | Commit | `git commit -m "feat(backend): add API"` |
| 7 | สร้าง Server | `backend/server.js`, `Dockerfile` |
| 8 | Commit | `git commit -m "feat(backend): add server"` |
| 9 | ทดสอบ | `curl http://localhost:3000/api/contacts` |

**ทดสอบ:**
```bash
docker compose up -d db api
curl http://localhost:3000/api/contacts
```

**ผลลัพธ์:** ✅ API return JSON ถูกต้อง

---

### 4.3 Checkpoint

```
┌─────────────────────────────────────────────────────────────────┐
│  ✅ Phase 2 COMPLETE                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🎨 สมชาย (feature/frontend):                                   │
│     ✅ index.html, style.css, app.js                            │
│     ✅ ทดสอบด้วย Mock Data ผ่าน                                   │
│                                                                 │
│  ⚙️ สมหญิง (feature/backend):                                    │
│     ✅ init.sql, server.js, Dockerfile                          │
│     ✅ ทดสอบด้วย curl ผ่าน                                        │
│                                                                 │
│  📢 ทั้งคู่: "งานเสร็จแล้ว พร้อม merge!"                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Phase 3: Integration

> ⏱️ **เวลา:** 15 นาที  
> 👤 **ผู้ทำ:** สมศักดิ์  
> 🎯 **เป้าหมาย:** Merge, ปิด Mock, Test

### 5.1 Merge Branches

```bash
# กลับ main
git checkout main

# Merge Backend ก่อน (API ต้องพร้อมก่อน)
git merge feature/backend -m "Merge feature/backend"

# Merge Frontend
git merge feature/frontend -m "Merge feature/frontend"

# ดู history
git log --oneline --graph
```

### 5.2 ปิด Mock Mode ⭐

```bash
# แก้ไข frontend/js/app.js
# เปลี่ยนจาก: const USE_MOCK = true;
# เป็น:       const USE_MOCK = false;

git add frontend/js/app.js
git commit -m "chore: disable mock mode for integration"
```

### 5.3 Build & Test

```bash
docker compose down -v
docker compose up -d --build
sleep 15

# Test Cases
curl http://localhost:8080/api/contacts          # TC1: GET ✅
curl -X POST ... -d '{"name":"ทดสอบ"}'           # TC2: POST ปกติ ✅
curl -X POST ... -d '{"name":""}'                # TC3: ชื่อว่าง ✅
curl -X POST ... -d '{"name":"...60 chars..."}'  # TC4: ชื่อยาว ❌ BUG!
```

### 5.4 Bug Found!

```
❌ TC4 FAILED!
Expected: {"success":false,"error":"ชื่อต้องไม่เกิน 50 ตัวอักษร"}
Actual:   {"success":false,"error":"value too long for type character varying(50)"}

→ สร้าง Bug Report
```

---

## 6. Phase 4: Bug Fix

> ⏱️ **เวลา:** 10 นาที  
> 👥 **ผู้ทำ:** สมชาย + สมหญิง (พร้อมกัน)

### 6.1 สมหญิง: แก้ Backend

```bash
git checkout main
git checkout -b fix/backend-validation

# แก้ไข contactController.js - เพิ่ม validation
# เพิ่ม: const MAX_NAME_LENGTH = 50;
# เพิ่ม: if (name.length > MAX_NAME_LENGTH) { return error... }

git add .
git commit -m "fix(backend): add name length validation"
git checkout main
git merge fix/backend-validation
git branch -d fix/backend-validation
```

### 6.2 สมชาย: แก้ Frontend

```bash
git checkout main
git checkout -b fix/frontend-validation

# แก้ไข index.html - เพิ่ม maxlength="50"
# แก้ไข app.js - เพิ่ม validation

git add .
git commit -m "fix(frontend): add name length validation"
git checkout main
git merge fix/frontend-validation
git branch -d fix/frontend-validation
```

---

## 7. Phase 5: Release

> ⏱️ **เวลา:** 5 นาที  
> 👤 **ผู้ทำ:** สมศักดิ์

### 7.1 Retest

```bash
docker compose down
docker compose up -d --build
sleep 15

# TC4 อีกครั้ง
curl -X POST ... -d '{"name":"...60 chars..."}'
# ✅ {"success":false,"error":"ชื่อต้องไม่เกิน 50 ตัวอักษร"}
```

### 7.2 Create Release Tag

```bash
git tag -a v2.0 -m "Release v2.0 - Bug #001 Fixed"
git tag
git show v2.0
```

### 7.3 Final Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    🎉 RELEASE v2.0 COMPLETE!                    │
├─────────────────────────────────────────────────────────────────┤
│  📊 Test Results: ALL PASS ✅                                   │
│  🏷️ Version: v2.0                                               │
│  🌐 URL: http://localhost:8080                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. สรุปคำสั่ง Git

### 8.1 คำสั่งพื้นฐาน

| คำสั่ง | คำอธิบาย | ตัวอย่าง |
|--------|----------|----------|
| `git init` | สร้าง repo | `git init` |
| `git status` | ดูสถานะ | `git status` |
| `git add` | เพิ่มไฟล์ | `git add .` |
| `git commit` | บันทึก | `git commit -m "message"` |
| `git log` | ดูประวัติ | `git log --oneline` |

### 8.2 คำสั่ง Branch

| คำสั่ง | คำอธิบาย | ตัวอย่าง |
|--------|----------|----------|
| `git branch` | ดู branches | `git branch` |
| `git checkout -b` | สร้าง+สลับ | `git checkout -b feature/x` |
| `git checkout` | สลับ | `git checkout main` |
| `git merge` | รวม | `git merge feature/x` |
| `git branch -d` | ลบ | `git branch -d feature/x` |

### 8.3 Commit Message Format

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
```

| Type | ใช้เมื่อ | ตัวอย่าง |
|------|---------|----------|
| `feat` | เพิ่มฟีเจอร์ | `feat(frontend): add login form` |
| `fix` | แก้ bug | `fix(backend): validate input` |
| `docs` | เอกสาร | `docs: add bug report` |
| `chore` | งานอื่นๆ | `chore: disable mock mode` |

---

## 📋 Checklist

### Phase 0: Planning ✓
- [ ] ตกลง API Contract ร่วมกัน

### Phase 1: Setup (สมศักดิ์) ✓
- [ ] `git init`
- [ ] สร้างโครงสร้างโฟลเดอร์
- [ ] สร้าง docker-compose.yml
- [ ] แจ้งทีม

### Phase 2: Development (พร้อมกัน) ✓
- [ ] สมชาย: แตก `feature/frontend`
- [ ] สมชาย: สร้าง HTML, CSS, JS + **Mock Data**
- [ ] สมชาย: ทดสอบด้วย Mock
- [ ] สมหญิง: แตก `feature/backend`
- [ ] สมหญิง: สร้าง DB, API, Server
- [ ] สมหญิง: ทดสอบด้วย curl

### Phase 3: Integration (สมศักดิ์) ✓
- [ ] Merge Backend ก่อน
- [ ] Merge Frontend
- [ ] **ปิด Mock Mode**
- [ ] ทดสอบระบบรวม
- [ ] สร้าง Bug Report

### Phase 4: Bug Fix (พร้อมกัน) ✓
- [ ] สมหญิง: แก้ Backend validation
- [ ] สมชาย: แก้ Frontend validation

### Phase 5: Release (สมศักดิ์) ✓
- [ ] Retest
- [ ] สร้าง Tag v2.0

---

**🎉 Workshop Complete!**
