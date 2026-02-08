# 📚 Workshop 2: Team Development Simulation

**รายวิชา:** ENGSE207 Software Architecture  
**ระยะเวลา:** 90 นาที  
**เป้าหมาย:** เรียนรู้การพัฒนาซอฟต์แวร์เป็นทีมด้วย Docker + Git + Mock Data Strategy

---

## 🎯 วัตถุประสงค์การเรียนรู้

เมื่อจบ Workshop นี้ นักศึกษาจะสามารถ:

| # | วัตถุประสงค์ | เอกสารที่เกี่ยวข้อง |
|---|-------------|-------------------|
| 1 | อธิบายความสำคัญของ **API Contract** ในการทำงานเป็นทีม | ทั้งสองเอกสาร |
| 2 | ใช้ **Mock Data** เพื่อให้ Frontend ทดสอบได้โดยไม่ต้องรอ Backend | Git Workflow + Team Dev |
| 3 | ปฏิบัติตาม **Git Workflow** สำหรับทีม 3 คน (feature branches) | Git Workflow |
| 4 | ใช้ **Docker Compose** ในการพัฒนาและทดสอบระบบ | Team Development |
| 5 | ค้นพบและแก้ไข Bug ผ่านกระบวนการ **Integration Testing** | ทั้งสองเอกสาร |
| 6 | สร้าง **Release Tag** และเข้าใจ versioning | Git Workflow |

---

## 📁 เอกสารในชุดนี้

### 1. [workshop2_git_workflow.md](./workshop2_git_workflow.md)

**ประเภท:** คู่มืออ้างอิง (Reference Guide)  
**เน้น:** Workflow, Diagrams, คำสั่ง Git

**เนื้อหาหลัก:**
- ✅ Workflow Overview Diagram (5 Phases)
- ✅ Git Branch Diagram (ละเอียด)
- ✅ Parallel Development Diagram
- ✅ สรุปคำสั่ง Git (พื้นฐาน + Branch)
- ✅ Commit Message Format
- ✅ Quick Checklist

**เหมาะสำหรับ:**
- ดูภาพรวมก่อนเริ่มทำ
- Reference ระหว่างทำ Workshop
- ทบทวนหลังเรียน

---

### 2. [workshop2_team_development.md](./workshop2_team_development.md)

**ประเภท:** คู่มือปฏิบัติ (Step-by-Step Guide)  
**เน้น:** Code, Commands, ขั้นตอนละเอียด

**เนื้อหาหลัก:**
- ✅ Complete Source Code (HTML, CSS, JavaScript, Node.js)
- ✅ **Mock Data Implementation** (พร้อม USE_MOCK toggle)
- ✅ Docker Compose Configuration
- ✅ API Contract Template
- ✅ Bug Report Template
- ✅ Test Cases (TC1-TC4)

**เหมาะสำหรับ:**
- ทำตาม Workshop step-by-step
- Copy code ไปใช้งานจริง
- ศึกษา Mock Data pattern

---

## 🔶 Key Concept: Mock Data Strategy

```
┌───────────────────────────────────────────────────────────────┐
│                    MOCK DATA WORKFLOW                         │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Phase 0          Phase 2              Phase 3                │
│  ────────         ────────             ────────               │
│                                                               │
│  ตกลง API    →    Frontend ใช้    →    ปิด Mock Mode            │
│  Contract         Mock Data           ก่อนทดสอบจริง             │
│                   ทดสอบ UI ได้                                 │
│                   ไม่ต้องรอ Backend                             │
│                                                               │
│  const USE_MOCK = true;    →    const USE_MOCK = false;       │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

**ทำไมต้องใช้ Mock Data?**
1. Frontend + Backend ทำงานพร้อมกันได้
2. UI testing ไม่ต้องรอ API
3. Mock ใช้ format เดียวกับ API Contract → merge แล้วทำงานได้ทันที

---

## 📋 Workshop Flow

```
Phase 0 (10 นาที)     ตกลง API Contract
        ↓
Phase 1 (15 นาที)     สมศักดิ์: สร้าง Repository
        ↓
Phase 2 (25 นาที)     สมชาย: Frontend + Mock Data ┐
                     สมหญิง: Backend + API        ┘ พร้อมกัน!
        ↓
Phase 3 (15 นาที)     Merge → ปิด Mock → Test → พบ Bug
        ↓
Phase 4 (10 นาที)     แก้ Bug (Frontend + Backend)
        ↓
Phase 5 (5 นาที)      Retest → Release v2.0
```

---

## 🛠️ เทคโนโลยีที่ใช้

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | PostgreSQL 16 |
| Reverse Proxy | Nginx |
| Container | Docker, Docker Compose |
| Version Control | Git |

---

## 📂 Project Structure (เมื่อทำเสร็จ)

```
contact-manager/
├── docker-compose.yml
├── .env / .env.example
├── .gitignore
│
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js          ← Mock Data + Real API
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── routes/
│       ├── controllers/
│       └── database/
│
├── database/init.sql
├── nginx/default.conf
│
└── docs/
    ├── API_CONTRACT.md
    └── BUG_REPORT.md
```

---

## 🎓 Prerequisites

ก่อนเริ่ม Workshop นี้ นักศึกษาควร:

- [ ] ติดตั้ง Docker Desktop แล้ว
- [ ] ติดตั้ง Git แล้ว
- [ ] ผ่าน Workshop 1: Docker Step-by-Step
- [ ] เข้าใจพื้นฐาน HTML/CSS/JavaScript
- [ ] เข้าใจพื้นฐาน REST API

---

## 📖 วิธีใช้เอกสาร

1. **ก่อนเริ่ม:** อ่าน [workshop2_git_workflow.md](./workshop2_git_workflow.md) เพื่อดูภาพรวม
2. **ระหว่างทำ:** ทำตาม [workshop2_team_development.md](./workshop2_team_development.md) step-by-step
3. **หลังเรียน:** กลับมาดู Git Workflow เพื่อทบทวน

---

## ✅ Checklist

- [ ] Phase 0: ตกลง API Contract
- [ ] Phase 1: สร้าง Repository
- [ ] Phase 2: พัฒนา Frontend (with Mock) + Backend
- [ ] Phase 3: Merge → ปิด Mock → Test
- [ ] Phase 4: แก้ Bug
- [ ] Phase 5: Release v2.0

---

**🚀 พร้อมสำหรับ Week 6 Lab!**
