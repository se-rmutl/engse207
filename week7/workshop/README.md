# 🐳 Docker Pre-Lab Workshops
## ENGSE207 Software Architecture - เตรียมความพร้อมสำหรับ Week 6 Lab

**รายวิชา:** ENGSE207 Software Architecture  
**สำหรับ:** นักศึกษาชั้นปีที่ 2 สาขาวิศวกรรมซอฟต์แวร์  
**มหาวิทยาลัย:** มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา

---

## 📋 ภาพรวม

Workshop ชุดนี้ออกแบบมาเพื่อเตรียมความพร้อมนักศึกษาก่อนทำ **Week 6 Lab: N-Tier Docker Deployment** โดยแบ่งเป็น 2 Workshop ที่เสริมกัน:

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     DOCKER PRE-LAB WORKSHOPS                             │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────────────────────┐    ┌─────────────────────────────┐     │
│   │  📘 WORKSHOP 1              │    │  📗 WORKSHOP 2              │     │
│   │  Docker Step-by-Step        │    │  Team Development           │     │
│   │                             │    │  Simulation                 │     │
│   ├─────────────────────────────┤    ├─────────────────────────────┤     │
│   │                             │    │                             │     │
│   │  🎯 เน้น: เทคนิค Docker       │    │  🎯 เน้น: กระบวนการทีม        │     │
│   │                             │    │                             │     │
│   │  📁 Project:                │    │  📁 Project:                │     │
│   │  Simple Note App            │    │  Contact Manager            │     │
│   │                             │    │                             │     │
│   │  ⏱️ เวลา: 90-120 นาที        │    │  ⏱️ เวลา: 60-90 นาที         │     │
│   │                             │    │                             │     │
│   │  ⭐⭐ (เริ่มต้น)               │    │  ⭐⭐⭐ (กลาง)              │     │
│   │                             │    │                             │     │
│   └─────────────────────────────┘    └─────────────────────────────┘     │
│                              │                                           │
│                              ▼                                           │
│                    ┌─────────────────────┐                               │
│                    │  🎓 WEEK 6 LAB      │                               │
│                    │  N-Tier Docker      │                               │
│                    │  Deployment         │                               │
│                    └─────────────────────┘                               │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 📚 รายละเอียด Workshop

### 📘 Workshop 1: Docker Step-by-Step

> **เรียนรู้ Docker ทีละขั้นตอน - จากศูนย์สู่ Multi-Container**

| รายการ | รายละเอียด |
|--------|------------|
| **ไฟล์** | [workshop1_docker_step_by_step.md](./workshop1_docker_step_by_step.md) |
| **ระยะเวลา** | 90-120 นาที |
| **ความยาก** | ⭐⭐ (เริ่มต้น) |
| **Project** | Simple Note App (บันทึก notes) |

#### 🎯 วัตถุประสงค์
- เข้าใจ Docker concepts พื้นฐาน (Image, Container, Dockerfile)
- เขียน Dockerfile และเข้าใจ Layer Caching
- รัน Multi-Container ด้วย Docker Network
- ใช้ Docker Compose orchestrate services

#### 📝 เนื้อหา

| Part | หัวข้อ | สิ่งที่เรียนรู้ |
|------|--------|---------------|
| **A** | Single Container Journey | Node.js App → Dockerfile → Build → Run → Debug → Bind Mount |
| **B** | Multi-Container Journey | PostgreSQL → Connect Error → Docker Network → Docker Volume |
| **C** | Docker Compose | YAML → depends_on → healthcheck → .env → One Command |

#### 💡 ไฮไลท์
- ✅ ทำผิดพลาดแล้วเรียนรู้ (เช่น localhost ข้าม container ไม่ได้)
- ✅ เปรียบเทียบก่อน/หลังใช้ Docker
- ✅ Quick Reference Card ท้าย Workshop

---

### 📗 Workshop 2: Team Development Simulation

> **จำลองการพัฒนาซอฟต์แวร์เป็นทีมด้วย Docker + Git**

| รายการ | รายละเอียด |
|--------|------------|
| **ไฟล์** | [workshop2_team_development.md](./workshop2_team_development.md) |
| **ระยะเวลา** | 60-90 นาที |
| **ความยาก** | ⭐⭐⭐ (กลาง) |
| **Project** | Contact Manager (จัดการรายชื่อติดต่อ) |

#### 🎯 วัตถุประสงค์
- เข้าใจ Git Branch Workflow ในทีม
- เห็นประโยชน์ของ Docker ในการทำงานเป็นทีม
- เรียนรู้กระบวนการ Bug Discovery → Report → Fix → Verify
- เข้าใจ Defense in Depth (Validation หลายชั้น)

#### 📝 เนื้อหา

| Day | สถานการณ์ | กิจกรรม |
|-----|-----------|---------|
| **Day 1** | Development Phase | Frontend (สมชาย) + Backend (สมหญิง) พัฒนาแยกกัน |
| **Day 2** | Merge & Testing | รวม code, Tester (สมศักดิ์) ทดสอบ, พบ Bug! |
| **Day 3** | Fix & Release | แก้ Bug, Retest, Release ✅ |

#### 🐛 Bug Scenario
```
ปัญหา: ชื่อติดต่อเกิน 50 ตัวอักษรทำให้เกิด Database Error

สาเหตุ:
├── Database: VARCHAR(50) จำกัดความยาว
├── Backend: ไม่ได้ validate ก่อน INSERT
└── Frontend: ไม่มี maxlength ใน input

วิธีแก้:
├── Backend: เพิ่ม validation ความยาว
└── Frontend: เพิ่ม maxlength + character count
```

#### 💡 ไฮไลท์
- ✅ จำลองทีม 3 คน (Frontend Dev, Backend Dev, Tester)
- ✅ Bug scenario สมจริง
- ✅ Git Workflow Diagram
- ✅ 6 บทเรียนสำคัญ

---

## 🗺️ ลำดับการเรียน

```
┌───────────────────────────────────────────────────────────────────────┐
│                         RECOMMENDED LEARNING PATH                     │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  STEP 1                STEP 2                STEP 3                   │
│  ════════              ════════              ════════                 │
│                                                                       │
│  ┌────────────┐       ┌────────────┐       ┌────────────┐             │
│  │ Docker     │       │ Team       │       │ Week 6     │             │
│  │ Foundation │  ──►  │ Workshop   │  ──►  │ Lab        │             │
│  │ Lecture    │       │ 1 & 2      │       │ N-Tier     │             │
│  └────────────┘       └────────────┘       └────────────┘             │
│       │                    │                    │                     │
│       ▼                    ▼                    ▼                     │
│  อ่าน/ฟังบรรยาย        ลงมือปฏิบัติ           ทำ Lab จริง                    │
│  เข้าใจ concept        ทดลองด้วยตัวเอง        N-Tier + SSL               │
│                                                                       │
│  ⏱️ 2-3 ชม.            ⏱️ 2-3 ชม.            ⏱️ 3-4 ชม.               │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ สิ่งที่ต้องเตรียม

### Software Requirements

```bash
# ตรวจสอบ Docker
docker --version          # Docker version 24.x หรือใหม่กว่า
docker compose version    # Docker Compose version 2.x

# ตรวจสอบ Node.js
node --version            # v18.x หรือ v20.x
npm --version             # 9.x หรือใหม่กว่า

# ตรวจสอบ Git
git --version             # 2.x

# ตรวจสอบ VS Code
code --version
```

### VS Code Extensions (แนะนำ)

- Docker (ms-azuretools.vscode-docker)
- PostgreSQL (ckolkman.vscode-postgres)
- REST Client (humao.rest-client)

---

## 📁 โครงสร้างไฟล์

```
docker-workshops/
│
├── 📄 README.md                           # ไฟล์นี้
│
├── 📘 workshop1_docker_step_by_step.md    # Workshop 1
│   └── Project: simple-note-app/
│       ├── docker-compose.yml
│       ├── Dockerfile
│       ├── server.js
│       └── package.json
│
└── 📗 workshop2_team_development.md       # Workshop 2
    └── Project: contact-manager/
        ├── docker-compose.yml
        ├── frontend/
        │   ├── index.html
        │   ├── css/style.css
        │   └── js/app.js
        ├── backend/
        │   ├── Dockerfile
        │   ├── server.js
        │   └── src/...
        ├── database/init.sql
        └── nginx/default.conf
```

---

## 📊 เปรียบเทียบ Workshop

| หัวข้อ | Workshop 1 | Workshop 2 |
|--------|------------|------------|
| **โฟกัส** | Docker เทคนิค | กระบวนการทีม |
| **Project** | Simple Note App | Contact Manager |
| **Tech Stack** | Node.js + PostgreSQL | Node.js + PostgreSQL + Nginx |
| **Containers** | 2 (api, db) | 3 (nginx, api, db) |
| **รูปแบบ** | Step-by-Step Tutorial | Scenario-Based Simulation |
| **การเรียนรู้** | ทำทีละขั้น | จำลองสถานการณ์ทีม |
| **Bug Scenario** | Debug container ที่พัง | VARCHAR overflow + validation |


---

## 🎯 Learning Outcomes

เมื่อจบทั้ง 2 Workshop นักศึกษาจะสามารถ:

### Docker Skills
- [x] เขียน Dockerfile และเข้าใจ Layer Caching
- [x] รัน Container ด้วย options ต่างๆ (port, volume, env)
- [x] สร้าง Docker Network เชื่อมต่อ containers
- [x] ใช้ Docker Volume เก็บ persistent data
- [x] เขียน docker-compose.yml orchestrate services
- [x] Debug containers ที่มีปัญหา

### Development Skills
- [x] เข้าใจ Git Branch Workflow
- [x] ทำงานเป็นทีมด้วย Docker (consistent environment)
- [x] เขียน Bug Report ที่ดี
- [x] เข้าใจ Defense in Depth (validation หลายชั้น)

### Architecture Understanding
- [x] เข้าใจ Multi-tier Architecture
- [x] เข้าใจ Container vs VM
- [x] เข้าใจ Network isolation ระหว่าง containers
- [x] เตรียมพร้อมสำหรับ N-Tier Docker Lab

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026 | Initial release |

---

**🚀 ขอให้สนุกกับการเรียนรู้ Docker!**
