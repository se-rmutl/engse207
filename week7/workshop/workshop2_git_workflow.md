# 🔀 Workshop 2: คู่มือ Git Workflow สำหรับทีม 3 คน

**เอกสารเสริมสำหรับ:** Workshop 2: Team Development Simulation  
**รายวิชา:** ENGSE207 Software Architecture  
**วัตถุประสงค์:** เรียนรู้การใช้ Git ทำงานเป็นทีมตั้งแต่เริ่มต้นจนถึง Release

---

## 📋 สารบัญ

1. [ภาพรวมและแนวคิด](#1-ภาพรวมและแนวคิด)
2. [การเตรียมพร้อม](#2-การเตรียมพร้อม)
3. [Day 1: Development Phase](#3-day-1-development-phase)
4. [Day 2: Merge และ Testing](#4-day-2-merge-และ-testing)
5. [Day 3: Bug Fix และ Release](#5-day-3-bug-fix-และ-release)
6. [สรุปคำสั่ง Git](#6-สรุปคำสั่ง-git)

---

## 1. ภาพรวมและแนวคิด

### 1.1 Git Branch Workflow ของทีม

```
                              Day 1              Day 2              Day 3
                           Development          Merge            Bug Fix
    ───────────────────────────────────────────────────────────────────────►

    main         ●─────────────────────────●────────●────────────●────► v2.0
                 │                         │        │            │
                 │                         │        │            │
    feature/     ├──●──●──●────────────────┤        │            │
    frontend     │  │  │  │                │        │     ●──────┤
                 │  │  │  │                │        │     │      │
    feature/     │  │  │  │                │        │     │      │
    backend      └──┼──┼──●──●──●──────────┘        │     ●──────┤
                    │  │     │  │                   │     │      │
                    │  │     │  │                   │     │      │
                    ▼  ▼     ▼  ▼                   ▼     ▼      ▼
                   HTML CSS API DB               Test   Fix   Release
```

**หลักการ:**
- `main` = branch หลัก เก็บ code ที่พร้อมใช้งาน
- `feature/*` = branch สำหรับพัฒนาฟีเจอร์ใหม่
- `fix/*` = branch สำหรับแก้ bug

### 1.2 บทบาทของแต่ละคน

| บทบาท | ชื่อ | หน้าที่ | Branch ที่ใช้ |
|-------|------|--------|---------------|
| 🎨 Frontend Dev | สมชาย | สร้าง UI (HTML, CSS, JS) | `feature/frontend` |
| ⚙️ Backend Dev | สมหญิง | สร้าง API และ Database | `feature/backend` |
| 🧪 Tester/Lead | สมศักดิ์ | Setup, Merge, Test, Release | `main` |

---

## 2. การเตรียมพร้อม

### 2.1 ตั้งค่า Git (ทำครั้งเดียว)

ก่อนเริ่มทำงาน ทุกคนต้องตั้งค่า Git ของตัวเอง

**ขั้นตอนที่ 1:** ตั้งชื่อและ email

```bash
git config --global user.name "ชื่อของคุณ"
git config --global user.email "email@example.com"
```

**ขั้นตอนที่ 2:** ตั้งค่า default branch เป็น main

```bash
git config --global init.defaultBranch main
```

**ขั้นตอนที่ 3:** ตรวจสอบการตั้งค่า

```bash
git config --list
```

### 2.2 คำสั่ง Git พื้นฐานที่ต้องรู้

| คำสั่ง | ความหมาย | ใช้เมื่อไหร่ |
|--------|----------|-------------|
| `git status` | ดูสถานะไฟล์ | เช็คว่ามีไฟล์อะไรเปลี่ยนบ้าง |
| `git add <file>` | เพิ่มไฟล์เข้า staging | เตรียมไฟล์ก่อน commit |
| `git add .` | เพิ่มทุกไฟล์ | เพิ่มทุกไฟล์ที่เปลี่ยน |
| `git commit -m "msg"` | บันทึกการเปลี่ยนแปลง | บันทึกงานที่ทำเสร็จ |
| `git log --oneline` | ดูประวัติ commits | เช็คว่า commit อะไรไปบ้าง |
| `git branch` | ดู branches ทั้งหมด | เช็คว่าอยู่ branch ไหน |
| `git checkout <branch>` | สลับไป branch อื่น | ย้ายไปทำงาน branch อื่น |
| `git checkout -b <branch>` | สร้าง branch ใหม่และสลับไป | เริ่มงานใหม่ |
| `git merge <branch>` | รวม branch เข้ามา | รวม code เข้า main |

---

## 3. Day 1: Development Phase

### 3.1 สมศักดิ์: สร้าง Repository และโครงสร้างเริ่มต้น

> 🎯 **เป้าหมาย:** สร้าง repository และโครงสร้างโฟลเดอร์เริ่มต้น

---

#### ขั้นตอนที่ 1: สร้างโฟลเดอร์โปรเจกต์

```bash
mkdir -p ~/projects/contact-manager
cd ~/projects/contact-manager
```

---

#### ขั้นตอนที่ 2: เริ่มต้น Git repository

```bash
git init
```

**ผลลัพธ์ที่จะเห็น:**
```
Initialized empty Git repository in .../contact-manager/.git/
```

---

#### ขั้นตอนที่ 3: สร้างไฟล์ README.md

สร้างไฟล์ `README.md` ด้วย text editor หรือคำสั่ง:

```bash
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
EOF
```

---

#### ขั้นตอนที่ 4: สร้างไฟล์ .gitignore

```bash
cat > .gitignore << 'EOF'
node_modules/
.env
*.log
.DS_Store
EOF
```

---

#### ขั้นตอนที่ 5: ตรวจสอบสถานะ

```bash
git status
```

**ผลลัพธ์ที่จะเห็น:**
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        README.md

nothing added to commit but untracked files present
```

> 💡 **อธิบาย:** Git บอกว่ามี 2 ไฟล์ใหม่ที่ยังไม่ได้ track (Untracked files)

---

#### ขั้นตอนที่ 6: เพิ่มไฟล์และ Commit

```bash
git add .
git commit -m "Initial commit: project setup"
```

**ผลลัพธ์ที่จะเห็น:**
```
[main (root-commit) abc1234] Initial commit: project setup
 2 files changed, 20 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
```

---

#### ขั้นตอนที่ 7: สร้างโครงสร้างโฟลเดอร์

```bash
mkdir -p frontend/css frontend/js
mkdir -p backend/src/routes backend/src/controllers backend/src/database
mkdir -p database
mkdir -p nginx
mkdir -p docs
```

---

#### ขั้นตอนที่ 8: Commit โครงสร้างโฟลเดอร์

```bash
git add .
git commit -m "Add project folder structure"
```

---

#### ขั้นตอนที่ 9: ตรวจสอบประวัติ

```bash
git log --oneline
```

**ผลลัพธ์ที่จะเห็น:**
```
def5678 Add project folder structure
abc1234 Initial commit: project setup
```

---

> ✅ **เสร็จสิ้น:** สมศักดิ์สร้าง repository และโครงสร้างเรียบร้อย
> 
> 📢 **แจ้งทีม:** "Repository พร้อมแล้ว ให้ทุกคนสร้าง feature branch และเริ่มทำงานได้"

---

### 3.2 สมชาย: พัฒนา Frontend

> 🎯 **เป้าหมาย:** สร้าง UI ประกอบด้วย HTML, CSS, JavaScript

---

#### ขั้นตอนที่ 1: ไปที่โฟลเดอร์โปรเจกต์

```bash
cd ~/projects/contact-manager
```

---

#### ขั้นตอนที่ 2: สร้าง feature branch

```bash
git checkout -b feature/frontend
```

**ผลลัพธ์ที่จะเห็น:**
```
Switched to a new branch 'feature/frontend'
```

> 💡 **อธิบาย:** คำสั่ง `checkout -b` คือการสร้าง branch ใหม่และสลับไปใช้งานพร้อมกัน

---

#### ขั้นตอนที่ 3: ตรวจสอบว่าอยู่ branch ถูกต้อง

```bash
git branch
```

**ผลลัพธ์ที่จะเห็น:**
```
* feature/frontend
  main
```

> 💡 **อธิบาย:** เครื่องหมาย `*` บอกว่าตอนนี้อยู่ที่ branch `feature/frontend`

---

#### ขั้นตอนที่ 4: สร้างไฟล์ index.html

สร้างไฟล์ `frontend/index.html` ด้วย text editor (VS Code) โดยใส่เนื้อหา HTML ของโปรเจกต์

*(ดูเนื้อหาไฟล์จาก Workshop 2 หลัก)*

---

#### ขั้นตอนที่ 5: Commit ไฟล์ HTML

```bash
git add frontend/index.html
git commit -m "feat(frontend): add index.html structure"
```

**ผลลัพธ์ที่จะเห็น:**
```
[feature/frontend 1a2b3c4] feat(frontend): add index.html structure
 1 file changed, 60 insertions(+)
 create mode 100644 frontend/index.html
```

---

#### ขั้นตอนที่ 6: สร้างไฟล์ style.css

สร้างไฟล์ `frontend/css/style.css` ด้วย text editor

*(ดูเนื้อหาไฟล์จาก Workshop 2 หลัก)*

---

#### ขั้นตอนที่ 7: Commit ไฟล์ CSS

```bash
git add frontend/css/style.css
git commit -m "feat(frontend): add CSS styles"
```

---

#### ขั้นตอนที่ 8: สร้างไฟล์ app.js

สร้างไฟล์ `frontend/js/app.js` ด้วย text editor

*(ดูเนื้อหาไฟล์จาก Workshop 2 หลัก)*

---

#### ขั้นตอนที่ 9: Commit ไฟล์ JavaScript

```bash
git add frontend/js/app.js
git commit -m "feat(frontend): add JavaScript functionality"
```

---

#### ขั้นตอนที่ 10: ตรวจสอบงานที่ทำบน branch นี้

```bash
git log --oneline
```

**ผลลัพธ์ที่จะเห็น:**
```
3c4d5e6 feat(frontend): add JavaScript functionality
2b3c4d5 feat(frontend): add CSS styles
1a2b3c4 feat(frontend): add index.html structure
def5678 Add project folder structure
abc1234 Initial commit: project setup
```

---

#### ขั้นตอนที่ 11: ดูว่า branch นี้ต่างจาก main อย่างไร

```bash
git log main..feature/frontend --oneline
```

**ผลลัพธ์ที่จะเห็น:**
```
3c4d5e6 feat(frontend): add JavaScript functionality
2b3c4d5 feat(frontend): add CSS styles
1a2b3c4 feat(frontend): add index.html structure
```

> 💡 **อธิบาย:** แสดง commits ที่มีใน `feature/frontend` แต่ยังไม่มีใน `main`

---

> ✅ **เสร็จสิ้น:** สมชายพัฒนา Frontend เสร็จแล้ว
> 
> 📁 **ไฟล์ที่สร้าง:**
> - `frontend/index.html`
> - `frontend/css/style.css`
> - `frontend/js/app.js`
>
> ⚠️ **หมายเหตุ:** ยังมี Bug! ไม่ได้เพิ่ม maxlength ใน input name

---

### 3.3 สมหญิง: พัฒนา Backend

> 🎯 **เป้าหมาย:** สร้าง REST API และ Database schema

---

#### ขั้นตอนที่ 1: ไปที่โฟลเดอร์โปรเจกต์และสลับไป main

```bash
cd ~/projects/contact-manager
git checkout main
```

---

#### ขั้นตอนที่ 2: สร้าง feature branch

```bash
git checkout -b feature/backend
```

**ผลลัพธ์ที่จะเห็น:**
```
Switched to a new branch 'feature/backend'
```

---

#### ขั้นตอนที่ 3: ตรวจสอบ branches ทั้งหมด

```bash
git branch
```

**ผลลัพธ์ที่จะเห็น:**
```
* feature/backend
  feature/frontend
  main
```

---

#### ขั้นตอนที่ 4: สร้างไฟล์ database/init.sql

สร้างไฟล์ `database/init.sql` ด้วย text editor

*(ดูเนื้อหาไฟล์จาก Workshop 2 หลัก)*

---

#### ขั้นตอนที่ 5: Commit database schema

```bash
git add database/init.sql
git commit -m "feat(db): add database schema and seed data"
```

---

#### ขั้นตอนที่ 6-10: สร้างไฟล์ Backend อื่นๆ

ทำขั้นตอนเดียวกัน (สร้างไฟล์ → `git add` → `git commit`) สำหรับ:

| ลำดับ | ไฟล์ | Commit message |
|-------|------|----------------|
| 6 | `backend/package.json` | `feat(backend): add package.json` |
| 7 | `backend/src/database/db.js` | `feat(backend): add database connection` |
| 8 | `backend/src/controllers/contactController.js` | `feat(backend): add contact controller` |
| 9 | `backend/src/routes/contactRoutes.js` | `feat(backend): add contact routes` |
| 10 | `backend/server.js` | `feat(backend): add Express server` |
| 11 | `backend/Dockerfile` | `feat(backend): add Dockerfile` |

---

#### ขั้นตอนที่ 12: ตรวจสอบงานทั้งหมด

```bash
git log --oneline
```

**ผลลัพธ์ที่จะเห็น:**
```
7e8f9g0 feat(backend): add Dockerfile
6d7e8f9 feat(backend): add Express server
5c6d7e8 feat(backend): add contact routes
4b5c6d7 feat(backend): add contact controller
3a4b5c6 feat(backend): add database connection
2z3a4b5 feat(backend): add package.json
1y2z3a4 feat(db): add database schema and seed data
def5678 Add project folder structure
abc1234 Initial commit: project setup
```

---

> ✅ **เสร็จสิ้น:** สมหญิงพัฒนา Backend เสร็จแล้ว
>
> 📁 **ไฟล์ที่สร้าง:**
> - `database/init.sql`
> - `backend/package.json`
> - `backend/src/database/db.js`
> - `backend/src/controllers/contactController.js`
> - `backend/src/routes/contactRoutes.js`
> - `backend/server.js`
> - `backend/Dockerfile`
>
> ⚠️ **หมายเหตุ:** ยังมี Bug! ไม่ได้ validate ความยาว name ก่อน INSERT

---

### 3.4 สมศักดิ์: สร้าง Infrastructure

> 🎯 **เป้าหมาย:** สร้าง docker-compose.yml และ nginx config

---

#### ขั้นตอนที่ 1: สลับไป main branch

```bash
git checkout main
```

---

#### ขั้นตอนที่ 2: สร้างไฟล์ docker-compose.yml

สร้างไฟล์ `docker-compose.yml` ด้วย text editor

*(ดูเนื้อหาไฟล์จาก Workshop 2 หลัก)*

---

#### ขั้นตอนที่ 3: Commit docker-compose

```bash
git add docker-compose.yml
git commit -m "feat(infra): add docker-compose.yml"
```

---

#### ขั้นตอนที่ 4: สร้างไฟล์ nginx/default.conf

สร้างไฟล์ `nginx/default.conf` ด้วย text editor

*(ดูเนื้อหาไฟล์จาก Workshop 2 หลัก)*

---

#### ขั้นตอนที่ 5: Commit nginx config

```bash
git add nginx/default.conf
git commit -m "feat(infra): add nginx configuration"
```

---

> ✅ **เสร็จสิ้น Day 1:** ทุกคนพัฒนางานของตัวเองเสร็จแล้ว

---

## 4. Day 2: Merge และ Testing

### 4.1 สมศักดิ์: Merge Feature Branches

> 🎯 **เป้าหมาย:** รวม code จากทุกคนเข้า main branch

---

#### ขั้นตอนที่ 1: ตรวจสอบว่าอยู่ที่ main

```bash
git checkout main
```

---

#### ขั้นตอนที่ 2: ดู branches ทั้งหมด

```bash
git branch
```

**ผลลัพธ์ที่จะเห็น:**
```
  feature/backend
  feature/frontend
* main
```

---

#### ขั้นตอนที่ 3: Preview ก่อน merge Frontend

ดูว่า `feature/frontend` มี commits อะไรบ้างที่จะเข้ามา:

```bash
git log main..feature/frontend --oneline
```

**ผลลัพธ์ที่จะเห็น:**
```
3c4d5e6 feat(frontend): add JavaScript functionality
2b3c4d5 feat(frontend): add CSS styles
1a2b3c4 feat(frontend): add index.html structure
```

---

#### ขั้นตอนที่ 4: Merge Frontend

```bash
git merge feature/frontend -m "Merge branch 'feature/frontend' into main"
```

**ผลลัพธ์ที่จะเห็น:**
```
Merge made by the 'ort' strategy.
 frontend/css/style.css | 150 +++++++++++++++++++++
 frontend/index.html    |  60 +++++++++
 frontend/js/app.js     | 130 ++++++++++++++++++
 3 files changed, 340 insertions(+)
 create mode 100644 frontend/css/style.css
 create mode 100644 frontend/index.html
 create mode 100644 frontend/js/app.js
```

---

#### ขั้นตอนที่ 5: Preview ก่อน merge Backend

```bash
git log main..feature/backend --oneline
```

---

#### ขั้นตอนที่ 6: Merge Backend

```bash
git merge feature/backend -m "Merge branch 'feature/backend' into main"
```

**ผลลัพธ์ที่จะเห็น:**
```
Merge made by the 'ort' strategy.
 backend/Dockerfile                          | 25 +++++
 backend/package.json                        | 18 ++++
 backend/server.js                           | 55 +++++++++
 backend/src/controllers/contactController.js| 90 +++++++++++++++
 backend/src/database/db.js                  | 25 +++++
 backend/src/routes/contactRoutes.js         | 18 ++++
 database/init.sql                           | 20 ++++
 7 files changed, 251 insertions(+)
```

---

#### ขั้นตอนที่ 7: ดูประวัติแบบกราฟ

```bash
git log --oneline --graph --all
```

**ผลลัพธ์ที่จะเห็น:** (แสดงเป็นแผนภาพ branches)
```
*   abc123 Merge branch 'feature/backend' into main
|\  
| * 7e8f9g0 feat(backend): add Dockerfile
| * 6d7e8f9 feat(backend): add Express server
| * ...
* |   def456 Merge branch 'feature/frontend' into main
|\ \  
| * | 3c4d5e6 feat(frontend): add JavaScript functionality
| * | 2b3c4d5 feat(frontend): add CSS styles
| * | 1a2b3c4 feat(frontend): add index.html structure
|/ /  
* | ... (main commits)
```

---

> ✅ **เสร็จสิ้น:** Merge code จากทุกคนเรียบร้อย

---

### 4.2 สมศักดิ์: Build และ Run Application

---

#### ขั้นตอนที่ 1: สร้างไฟล์ .env

```bash
cp .env.example .env
```

---

#### ขั้นตอนที่ 2: Build และ Start services

```bash
docker compose up -d --build
```

**ผลลัพธ์ที่จะเห็น:**
```
[+] Building 15.2s
[+] Running 4/4
 ✔ Network contact-manager_default  Created
 ✔ Container contact-db             Healthy
 ✔ Container contact-api            Started
 ✔ Container contact-nginx          Started
```

---

#### ขั้นตอนที่ 3: ตรวจสอบ services

```bash
docker compose ps
```

**ผลลัพธ์ที่จะเห็น:**
```
NAME             STATUS          PORTS
contact-api      Up 10 seconds   3000/tcp
contact-db       Up 15 seconds   5432/tcp
contact-nginx    Up 5 seconds    0.0.0.0:8080->80/tcp
```

---

#### ขั้นตอนที่ 4: ทดสอบ Health Check

```bash
curl http://localhost:8080/health
```

**ผลลัพธ์ที่จะเห็น:**
```json
{"status":"ok","timestamp":"...","service":"contact-manager-api"}
```

---

### 4.3 สมศักดิ์: ทำ Testing

> 🎯 **เป้าหมาย:** ทดสอบ API ทุก endpoint

---

#### Test Case 1: ดูรายชื่อทั้งหมด

```bash
curl http://localhost:8080/api/contacts
```

**ผลลัพธ์ที่คาดหวัง:**
```json
{
  "success": true,
  "data": [...],
  "count": 3
}
```

**สถานะ:** ✅ PASS

---

#### Test Case 2: เพิ่มรายชื่อปกติ

```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"ทดสอบ ปกติ","email":"test@test.com"}'
```

**ผลลัพธ์ที่คาดหวัง:**
```json
{
  "success": true,
  "message": "เพิ่มรายชื่อสำเร็จ"
}
```

**สถานะ:** ✅ PASS

---

#### Test Case 3: ชื่อว่าง

```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"test@test.com"}'
```

**ผลลัพธ์ที่คาดหวัง:**
```json
{
  "success": false,
  "error": "กรุณาระบุชื่อ"
}
```

**สถานะ:** ✅ PASS

---

#### Test Case 4: ชื่อยาวเกิน 50 ตัวอักษร ⚠️

```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"นายสมชายรักเรียนมานะอุตสาหะขยันทำงานรักความยุติธรรมใจกว้างมากๆ","email":"long@test.com"}'
```

**ผลลัพธ์ที่คาดหวัง:**
```json
{
  "success": false,
  "error": "ชื่อต้องไม่เกิน 50 ตัวอักษร"
}
```

**ผลลัพธ์ที่ได้จริง:**
```json
{
  "success": false,
  "error": "value too long for type character varying(50)"
}
```

**สถานะ:** ❌ FAILED - พบ Bug!

---

### 4.4 สมศักดิ์: สร้าง Bug Report

---

#### ขั้นตอนที่ 1: สร้างไฟล์ Bug Report

สร้างไฟล์ `docs/BUG_REPORT.md` ด้วย text editor:

```markdown
# 🐛 Bug Report

## Bug #001: Name Length Validation Missing

**Reporter:** สมศักดิ์  
**Date:** Day 2  
**Severity:** High  
**Status:** Open 🔴

### Description
เมื่อใส่ชื่อที่มีความยาวเกิน 50 ตัวอักษร ระบบแสดง Database error
แทนที่จะแสดง error message ที่เป็นมิตรกับผู้ใช้

### Steps to Reproduce
1. เปิดเว็บ http://localhost:8080
2. คลิก "➕ เพิ่มรายชื่อ"
3. ใส่ชื่อยาวเกิน 50 ตัวอักษร
4. กด "💾 บันทึก"

### Expected Result
แสดง error message: "ชื่อต้องไม่เกิน 50 ตัวอักษร"

### Actual Result
แสดง database error: "value too long for type character varying(50)"

### Assigned to
- สมหญิง (Backend)
- สมชาย (Frontend)
```

---

#### ขั้นตอนที่ 2: Commit Bug Report

```bash
git add docs/BUG_REPORT.md
git commit -m "docs: add bug report #001 - name length validation"
```

---

> ✅ **เสร็จสิ้น Day 2:** พบ Bug และสร้าง Bug Report แล้ว
>
> 📢 **แจ้งทีม:** "พบ Bug #001 - กรุณาแก้ไขตาม Bug Report"

---

## 5. Day 3: Bug Fix และ Release

### 5.1 สมหญิง: แก้ไข Backend

> 🎯 **เป้าหมาย:** เพิ่ม validation ความยาวชื่อก่อน INSERT

---

#### ขั้นตอนที่ 1: อัพเดท main และสร้าง fix branch

```bash
git checkout main
git checkout -b fix/backend-validation
```

**ผลลัพธ์ที่จะเห็น:**
```
Switched to a new branch 'fix/backend-validation'
```

---

#### ขั้นตอนที่ 2: แก้ไขไฟล์ contactController.js

เปิดไฟล์ `backend/src/controllers/contactController.js` และเพิ่ม validation:

```javascript
// เพิ่มบรรทัดนี้ที่ต้นไฟล์
const MAX_NAME_LENGTH = 50;

// เพิ่ม validation ใน function createContact (ก่อนบรรทัด INSERT)
if (trimmedName.length > MAX_NAME_LENGTH) {
    return res.status(400).json({
        success: false,
        error: `ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร (ปัจจุบัน ${trimmedName.length} ตัวอักษร)`
    });
}
```

---

#### ขั้นตอนที่ 3: ดูความเปลี่ยนแปลง

```bash
git diff backend/src/controllers/contactController.js
```

**ผลลัพธ์ที่จะเห็น:** (แสดงบรรทัดที่เพิ่ม/ลบ)
```diff
+const MAX_NAME_LENGTH = 50;
+
+if (trimmedName.length > MAX_NAME_LENGTH) {
+    return res.status(400).json({
+        success: false,
+        error: `ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร`
+    });
+}
```

---

#### ขั้นตอนที่ 4: Commit การแก้ไข

```bash
git add backend/src/controllers/contactController.js
git commit -m "fix(backend): add name length validation (max 50 chars)"
```

---

#### ขั้นตอนที่ 5: Merge กลับ main

```bash
git checkout main
git merge fix/backend-validation -m "Merge fix/backend-validation"
```

---

#### ขั้นตอนที่ 6: ลบ branch ที่ไม่ใช้แล้ว (optional)

```bash
git branch -d fix/backend-validation
```

**ผลลัพธ์ที่จะเห็น:**
```
Deleted branch fix/backend-validation (was abc1234).
```

---

> ✅ **เสร็จสิ้น:** สมหญิงแก้ Backend เรียบร้อย

---

### 5.2 สมชาย: แก้ไข Frontend

> 🎯 **เป้าหมาย:** เพิ่ม maxlength และ validation ใน UI

---

#### ขั้นตอนที่ 1: อัพเดท main และสร้าง fix branch

```bash
git checkout main
git checkout -b fix/frontend-validation
```

---

#### ขั้นตอนที่ 2: แก้ไข index.html

เปิดไฟล์ `frontend/index.html` และเพิ่ม `maxlength`:

```html
<!-- แก้จาก -->
<input type="text" id="name" name="name" required>

<!-- เป็น -->
<input type="text" id="name" name="name" required maxlength="50">
```

---

#### ขั้นตอนที่ 3: Commit HTML

```bash
git add frontend/index.html
git commit -m "fix(frontend): add maxlength to name input"
```

---

#### ขั้นตอนที่ 4: แก้ไข app.js

เปิดไฟล์ `frontend/js/app.js` และเพิ่ม validation:

```javascript
// เพิ่มที่ต้นไฟล์
const MAX_NAME_LENGTH = 50;

// เพิ่มใน function addContact (ก่อนเรียก API)
if (name.length > MAX_NAME_LENGTH) {
    showStatus(`ชื่อต้องไม่เกิน ${MAX_NAME_LENGTH} ตัวอักษร`, 'error');
    return;
}
```

---

#### ขั้นตอนที่ 5: Commit JavaScript

```bash
git add frontend/js/app.js
git commit -m "fix(frontend): add name length validation in JavaScript"
```

---

#### ขั้นตอนที่ 6: Merge กลับ main

```bash
git checkout main
git merge fix/frontend-validation -m "Merge fix/frontend-validation"
```

---

#### ขั้นตอนที่ 7: ลบ branch

```bash
git branch -d fix/frontend-validation
```

---

> ✅ **เสร็จสิ้น:** สมชายแก้ Frontend เรียบร้อย

---

### 5.3 สมศักดิ์: Retest และ Release

> 🎯 **เป้าหมาย:** ทดสอบว่า Bug แก้ไขแล้วและ Release version ใหม่

---

#### ขั้นตอนที่ 1: Rebuild application

```bash
docker compose down
docker compose up -d --build
```

---

#### ขั้นตอนที่ 2: รอ services พร้อม

```bash
sleep 10
docker compose ps
```

---

#### ขั้นตอนที่ 3: Retest - TC4

```bash
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"นายสมชายรักเรียนมานะอุตสาหะขยันทำงานรักความยุติธรรมใจกว้างมากๆ","email":"long@test.com"}'
```

**ผลลัพธ์ที่คาดหวัง:**
```json
{
  "success": false,
  "error": "ชื่อต้องไม่เกิน 50 ตัวอักษร (ปัจจุบัน 58 ตัวอักษร)"
}
```

**สถานะ:** ✅ PASS - Bug แก้ไขแล้ว!

---

#### ขั้นตอนที่ 4: อัพเดท Bug Report

แก้ไขไฟล์ `docs/BUG_REPORT.md`:
- เปลี่ยน Status เป็น "Closed ✅"
- เพิ่ม Resolution และ Verification

```bash
git add docs/BUG_REPORT.md
git commit -m "docs: close bug #001 - verified fixed"
```

---

#### ขั้นตอนที่ 5: สร้าง Release Tag

```bash
git tag -a v2.0 -m "Release v2.0 - Bug #001 Fixed"
```

> 💡 **อธิบาย:** Tag คือการ "ติดป้าย" ให้กับ commit เพื่อระบุ version

---

#### ขั้นตอนที่ 6: ดู tags ทั้งหมด

```bash
git tag
```

**ผลลัพธ์ที่จะเห็น:**
```
v2.0
```

---

#### ขั้นตอนที่ 7: ดูรายละเอียด tag

```bash
git show v2.0
```

**ผลลัพธ์ที่จะเห็น:**
```
tag v2.0
Tagger: สมศักดิ์ <...>
Date:   ...

Release v2.0 - Bug #001 Fixed

commit abc123...
Author: ...
Date:   ...

    docs: close bug #001 - verified fixed
```

---

#### ขั้นตอนที่ 8: ดูสถิติโปรเจกต์

```bash
git log --oneline | wc -l
```

แสดงจำนวน commits ทั้งหมด

```bash
git shortlog -s -n
```

แสดงจำนวน commits ต่อคน:
```
    10  สมหญิง
     5  สมชาย
     8  สมศักดิ์
```

---

> 🎉 **Release v2.0 เสร็จสมบูรณ์!**
>
> **สรุปผลการทดสอบ:**
> - ✅ TC1: GET /api/contacts - PASS
> - ✅ TC2: POST (ชื่อปกติ) - PASS
> - ✅ TC3: POST (ชื่อว่าง) - PASS
> - ✅ TC4: POST (ชื่อเกิน 50) - PASS

---

## 6. สรุปคำสั่ง Git

### 6.1 คำสั่งพื้นฐาน

| คำสั่ง | คำอธิบาย | ตัวอย่าง |
|--------|----------|----------|
| `git init` | สร้าง repository ใหม่ | `git init` |
| `git status` | ดูสถานะไฟล์ | `git status` |
| `git add <file>` | เพิ่มไฟล์เข้า staging | `git add index.html` |
| `git add .` | เพิ่มทุกไฟล์ | `git add .` |
| `git commit -m "msg"` | บันทึก commit | `git commit -m "feat: add login"` |
| `git log --oneline` | ดูประวัติ | `git log --oneline` |
| `git diff` | ดูความเปลี่ยนแปลง | `git diff` |

### 6.2 คำสั่ง Branch

| คำสั่ง | คำอธิบาย | ตัวอย่าง |
|--------|----------|----------|
| `git branch` | ดู branches | `git branch` |
| `git branch <name>` | สร้าง branch | `git branch feature/login` |
| `git checkout <branch>` | สลับ branch | `git checkout main` |
| `git checkout -b <branch>` | สร้างและสลับ | `git checkout -b feature/login` |
| `git merge <branch>` | รวม branch | `git merge feature/login` |
| `git branch -d <branch>` | ลบ branch | `git branch -d feature/login` |

### 6.3 คำสั่ง Tag

| คำสั่ง | คำอธิบาย | ตัวอย่าง |
|--------|----------|----------|
| `git tag` | ดู tags | `git tag` |
| `git tag -a <name> -m "msg"` | สร้าง tag | `git tag -a v1.0 -m "Release"` |
| `git show <tag>` | ดูรายละเอียด tag | `git show v1.0` |

### 6.4 รูปแบบ Commit Message

```
<type>(<scope>): <description>
```

**Types ที่ใช้บ่อย:**

| Type | ความหมาย | ตัวอย่าง |
|------|----------|----------|
| `feat` | ฟีเจอร์ใหม่ | `feat(login): add login form` |
| `fix` | แก้ bug | `fix(api): validate input length` |
| `docs` | เอกสาร | `docs: update README` |
| `style` | รูปแบบ code | `style: format code` |
| `refactor` | ปรับปรุง code | `refactor: simplify logic` |
| `test` | เพิ่ม test | `test: add unit tests` |
| `chore` | งานอื่นๆ | `chore: update dependencies` |

---

## 📋 Checklist สำหรับนักศึกษา

### Day 1 ✓
- [ ] สมศักดิ์: สร้าง repository และโครงสร้าง
- [ ] สมชาย: สร้าง `feature/frontend` branch
- [ ] สมชาย: Commit HTML, CSS, JS
- [ ] สมหญิง: สร้าง `feature/backend` branch
- [ ] สมหญิง: Commit Database, API files
- [ ] สมศักดิ์: สร้าง docker-compose และ nginx

### Day 2 ✓
- [ ] สมศักดิ์: Merge `feature/frontend` เข้า `main`
- [ ] สมศักดิ์: Merge `feature/backend` เข้า `main`
- [ ] สมศักดิ์: `docker compose up -d --build`
- [ ] สมศักดิ์: ทดสอบ TC1-TC4
- [ ] สมศักดิ์: สร้าง Bug Report

### Day 3 ✓
- [ ] สมหญิง: สร้าง `fix/backend-validation` branch
- [ ] สมหญิง: แก้ไข และ merge กลับ `main`
- [ ] สมชาย: สร้าง `fix/frontend-validation` branch
- [ ] สมชาย: แก้ไข และ merge กลับ `main`
- [ ] สมศักดิ์: Rebuild และ Retest
- [ ] สมศักดิ์: สร้าง Release Tag v2.0

---

**🎉 Workshop Complete!**
