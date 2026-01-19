# 🏗️ คู่มือปฏิบัติการ ENGSE207 - สัปดาห์ที่ 6
## N-Tier Architecture: Multi-Tier on Single VM (Version 1)

**สัปดาห์:** 6 | **ระยะเวลา:** 4 ชั่วโมง | **ระดับความยาก:** ⭐⭐⭐⭐

---

## 📋 สารบัญ

1. [วัตถุประสงค์การเรียนรู้](#วัตถุประสงค์การเรียนรู้)
2. [สิ่งที่ต้องเตรียม](#สิ่งที่ต้องเตรียม)
3. [ภาพรวมสถาปัตยกรรม](#ภาพรวมสถาปัตยกรรม)
4. [ส่วนที่ 1: ทำความเข้าใจ N-Tier (30 นาที)](#ส่วนที่-1-ทำความเข้าใจ-n-tier)
5. [ส่วนที่ 2: ออกแบบ Architecture - C4 Model (30 นาที)](#ส่วนที่-2-ออกแบบ-architecture)
6. [ส่วนที่ 3: ติดตั้ง PostgreSQL และ Nginx (40 นาที)](#ส่วนที่-3-ติดตั้ง-postgresql-และ-nginx)
7. [ส่วนที่ 4: Migrate Database และปรับ Backend (50 นาที)](#ส่วนที่-4-migrate-database-และปรับ-backend)
8. [ส่วนที่ 5: ตั้งค่า HTTPS และ Nginx Reverse Proxy (40 นาที)](#ส่วนที่-5-ตั้งค่า-https-และ-nginx)
9. [ส่วนที่ 6: Testing และ Verification (30 นาที)](#ส่วนที่-6-testing-และ-verification)
10. [ส่วนที่ 7: การวิเคราะห์และเปรียบเทียบ (40 นาที)](#ส่วนที่-7-การวิเคราะห์และเปรียบเทียบ) ⭐ **ต้องทำเอง**
11. [การส่งงานและเกณฑ์การให้คะแนน](#การส่งงานและเกณฑ์การให้คะแนน)
12. [การบ้าน: Multi-VM Version](#การบ้าน-multi-vm-version)
13. [แก้ปัญหาเบื้องต้น](#แก้ปัญหาเบื้องต้น)

---

## 🎯 วัตถุประสงค์การเรียนรู้

เมื่อจบ Lab นี้ นักศึกษาจะสามารถ:

✅ อธิบายความแตกต่างระหว่าง Tier (Physical) กับ Layer (Logical) ได้  
✅ ติดตั้งและตั้งค่า N-Tier Architecture บน Single VM ได้  
✅ ใช้งาน Nginx เป็น Reverse Proxy และ SSL Termination ได้  
✅ Migrate ฐานข้อมูลจาก SQLite เป็น PostgreSQL ได้  
✅ สร้าง Self-signed SSL Certificate สำหรับ HTTPS ได้  
✅ วาด C4 Diagrams (C1, C2) สำหรับ N-Tier Architecture ได้  
✅ **วิเคราะห์และเปรียบเทียบ 4 Architectures (Week 3-6) ได้** ⭐

---

## 📚 สิ่งที่ต้องเตรียม

### ต้องมีก่อนเริ่ม Lab:

✅ **สัปดาห์ที่ 5 Client-Server App** - ทำสำเร็จและทำงานได้  
✅ **Ubuntu VM** - จากสัปดาห์ที่ 5 (หรือ WSL2/Ubuntu Desktop)  
✅ **Node.js 20+** - ติดตั้งแล้ว  
✅ **Git** - สำหรับ version control  
✅ **VS Code** - พร้อม Remote-SSH extension  
✅ **ความเข้าใจพื้นฐาน** - REST API, SQL, Linux commands

### คัดลอกโปรเจกต์จากสัปดาห์ที่ 5:

```bash
# สร้างโฟลเดอร์ใหม่
mkdir -p ~/engse207-labs/week6-ntier
cd ~/engse207-labs/week6-ntier

# คัดลอกไฟล์จาก Week 5
cp -r ~/engse207-labs/week5-client-server/* .

# เริ่มต้น Git
git init
git add .
git commit -m "Week 6: เริ่มต้น - คัดลอกจาก Week 5 Client-Server"
```

---

## 🏗️ ภาพรวมสถาปัตยกรรม

### ความแตกต่างระหว่าง Tier vs Layer

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         TIER vs LAYER                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   LAYER (Logical Separation)         TIER (Physical Separation)        │
│   ───────────────────────────        ─────────────────────────────     │
│                                                                         │
│   • แยกตาม Responsibility            • แยกตาม Physical Location         │
│   • รันใน Process เดียวกันได้        • รันคนละ Process/Machine         │
│   • Compile-time separation         • Runtime separation              │
│   • เช่น MVC, 3-Layer               • เช่น Web Server, App Server     │
│                                                                         │
│   Week 4:                            Week 6:                            │
│   ┌──────────────┐                   ┌─────┐   ┌─────┐   ┌─────┐       │
│   │ Controller   │                   │Nginx│ → │Node │ → │ DB  │       │
│   │ Service      │  = 1 Process      │     │   │     │   │     │       │
│   │ Repository   │                   │Port │   │Port │   │Port │       │
│   └──────────────┘                   │ 443 │   │3000 │   │5432 │       │
│                                      └─────┘   └─────┘   └─────┘       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### เปรียบเทียบ Week 5 vs Week 6

**สัปดาห์ที่ 5 - Client-Server:**
```
┌─────────────────────────────────────────────────────┐
│  เครื่อง Local (Host)                               │
│  ┌─────────────────────────────────────────────┐   │
│  │  Frontend (Browser)                         │   │
│  │  - HTML/CSS/JavaScript                      │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                         │
                         │ HTTP (Port 3000)
                         │ ไม่มี HTTPS!
                         ▼
┌─────────────────────────────────────────────────────┐
│  VM (Ubuntu Server)                                 │
│  ┌─────────────────────────────────────────────┐   │
│  │  Backend (Node.js + Express)                │   │
│  │  - Port 3000 รับ request โดยตรง              │   │
│  │  - ไม่มี Load Balancing                      │   │
│  │  - Static files served by Node.js           │   │
│  └─────────────────────────────────────────────┘   │
│                         │                          │
│                         ▼                          │
│  ┌─────────────────────────────────────────────┐   │
│  │  SQLite Database                            │   │
│  │  - Single file database                     │   │
│  │  - ไม่รองรับ Concurrent Write ดี             │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**สัปดาห์ที่ 6 - N-Tier (Single VM):**
```
┌─────────────────────────────────────────────────────┐
│  เครื่อง Local (Host)                               │
│  ┌─────────────────────────────────────────────┐   │
│  │  Frontend (Browser)                         │   │
│  │  - เข้าผ่าน HTTPS                            │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                         │
                         │ HTTPS (Port 443) ← New!
                         ▼
┌─────────────────────────────────────────────────────┐
│  VM (Ubuntu Server) - 3 Tiers                       │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  ⭐ TIER 1: Nginx (Web Server)              │   │  
│  │  - SSL Termination (HTTPS → HTTP)           │   │
│  │  - Reverse Proxy → Backend                  │   │
│  │  - Static Files Serving                     │   │
│  │  - Port 80 (redirect), 443 (HTTPS)          │   │
│  └─────────────────────────────────────────────┘   │
│                         │                          │
│                         │ HTTP (localhost:3000)    │
│                         ▼                          │
│  ┌─────────────────────────────────────────────┐   │
│  │  ⭐ TIER 2: Node.js + Express (App Server)  │   │
│  │  - REST API Endpoints                       │   │
│  │  - Business Logic (Layered Architecture)    │   │
│  │  - Port 3000 (internal only)                │   │
│  └─────────────────────────────────────────────┘   │
│                         │                          │
│                         │ TCP (localhost:5432)     │
│                         ▼                          │
│  ┌─────────────────────────────────────────────┐   │
│  │  ⭐ TIER 3: PostgreSQL (Database Server)    │   │
│  │  - Production-grade Database                │   │
│  │  - ACID Transactions                        │   │
│  │  - Concurrent Access Support                │   │
│  │  - Port 5432 (internal only)                │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### ตารางเปรียบเทียบ Week 5 vs Week 6:

| ด้าน | Week 5 (Client-Server) | Week 6 (N-Tier) |
|------|------------------------|-----------------|
| **Protocol** | HTTP | HTTPS (SSL) |
| **Web Server** | Node.js (direct) | Nginx (Reverse Proxy) |
| **Database** | SQLite | PostgreSQL |
| **Static Files** | Express.static | Nginx |
| **Security** | ❌ ไม่มี SSL | ✅ SSL Certificate |
| **Scalability** | ❌ ยาก | ✅ เตรียมพร้อม Load Balance |
| **Production-ready** | ❌ ไม่พร้อม | ✅ พร้อมมากขึ้น |

### โครงสร้างโปรเจกต์สัปดาห์ที่ 6:

```
week6-ntier/
├── server.js                      # จุดเริ่มต้นโปรแกรม
├── package.json
├── .env                           # Environment variables
├── .env.example                   # Template
├── database/
│   ├── schema.sql                 # SQLite schema (เดิม)
│   ├── tasks.db                   # SQLite file (เดิม)
│   └── postgres-init.sql          # ⭐ New: PostgreSQL schema
├── src/
│   ├── config/
│   │   └── database.js            # ⭐ Modified: PostgreSQL connection
│   ├── controllers/
│   │   └── taskController.js
│   ├── services/
│   │   └── taskService.js
│   ├── repositories/
│   │   └── taskRepository.js      # ⭐ Modified: PostgreSQL queries
│   ├── models/
│   │   └── Task.js
│   └── middleware/
│       ├── errorHandler.js
│       └── validator.js
├── public/                        # Frontend (unchanged)
│   ├── index.html
│   ├── style.css
│   └── app.js
├── nginx/                         # ⭐ New: Nginx configuration
│   └── taskboard.conf
├── scripts/                       # ⭐ New: Helper scripts
│   ├── setup.sh
│   ├── generate-ssl.sh
│   └── start-all.sh
├── docs/                          # ⭐ New: Documentation
│   ├── ARCHITECTURE.md
│   ├── ANALYSIS.md                # ⭐ นักศึกษาต้องทำ
│   └── C4-diagrams/
├── .gitignore
└── README.md
```

---

## ส่วนที่ 1: ทำความเข้าใจ N-Tier (30 นาที)

### 1.1 N-Tier Architecture คืออะไร?

**N-Tier Architecture** คือการแบ่งระบบออกเป็น **Physical Tiers** (ชั้นทางกายภาพ) ที่แยกจากกัน โดยแต่ละ Tier สามารถ:
- รันบนเครื่องคนละเครื่องได้
- Scale อิสระจากกัน
- พัฒนาและ maintain แยกกัน

### 1.2 รูปแบบ N-Tier ที่นิยม

| Tiers | โครงสร้าง | ตัวอย่างการใช้งาน |
|-------|----------|-------------------|
| **2-Tier** | Client → Database | Desktop App + SQL Server |
| **3-Tier** | Client → App Server → Database | Web App ทั่วไป |
| **4-Tier** | Client → Web Server → App Server → Database | Enterprise Apps |
| **N-Tier** | หลาย Tier ตามความต้องการ | Microservices, Cloud |

### 1.3 Week 6: 3-Tier Architecture

**Tier 1: Web Server (Nginx)**
- **หน้าที่:** รับ request จาก client, SSL termination, serve static files
- **Technology:** Nginx
- **Port:** 80 (HTTP), 443 (HTTPS)

**Tier 2: Application Server (Node.js)**
- **หน้าที่:** Business logic, API endpoints, data processing
- **Technology:** Node.js + Express.js
- **Port:** 3000 (internal)

**Tier 3: Database Server (PostgreSQL)**
- **หน้าที่:** Data storage, queries, transactions
- **Technology:** PostgreSQL
- **Port:** 5432 (internal)

### 1.4 ทำไมต้องใช้ N-Tier?

**✅ ข้อดี:**

| ข้อดี | คำอธิบาย |
|-------|---------|
| **Scalability** | Scale แต่ละ Tier อิสระ (เพิ่ม App Server โดยไม่ต้องเพิ่ม DB) |
| **Security** | แยก Network Zones, Database ไม่ถูกเข้าถึงโดยตรง |
| **Maintainability** | แก้ไข/Update แต่ละ Tier แยกกัน |
| **Performance** | Nginx จัดการ Static Files, Caching ได้ดีกว่า Node.js |
| **Reliability** | ถ้า Tier หนึ่งล่ม ไม่กระทบ Tier อื่น |
| **Flexibility** | เปลี่ยน Technology ของแต่ละ Tier ได้ |

**❌ ข้อเสีย:**

| ข้อเสีย | คำอธิบาย |
|--------|---------|
| **Complexity** | ซับซ้อนขึ้น, ต้องจัดการหลาย Components |
| **Network Latency** | มี Hop ระหว่าง Tiers (เพิ่ม delay) |
| **Cost** | ต้องใช้ Resources มากขึ้น |
| **Debugging** | ตามหาปัญหายากขึ้น (log หลายที่) |
| **Configuration** | ต้องตั้งค่าหลาย services |

### 🎯 แบบฝึกหัด 1: Tier Decision (10 นาที)

**คำถาม:** Component ต่อไปนี้ควรอยู่ใน Tier ไหน?

1. **SSL Certificate handling**
   - [ ] Web Tier (Nginx)
   - [ ] App Tier (Node.js)
   - [ ] Data Tier (PostgreSQL)
   - **คำตอบ:** ________________
   - **เหตุผล:** ________________

2. **Business rule: "HIGH priority task ต้องมี description"**
   - [ ] Web Tier (Nginx)
   - [ ] App Tier (Node.js)
   - [ ] Data Tier (PostgreSQL)
   - **คำตอบ:** ________________
   - **เหตุผล:** ________________

3. **Caching static files (CSS, JS, images)**
   - [ ] Web Tier (Nginx)
   - [ ] App Tier (Node.js)
   - [ ] Data Tier (PostgreSQL)
   - **คำตอบ:** ________________
   - **เหตุผล:** ________________

4. **FOREIGN KEY constraint**
   - [ ] Web Tier (Nginx)
   - [ ] App Tier (Node.js)
   - [ ] Data Tier (PostgreSQL)
   - **คำตอบ:** ________________
   - **เหตุผล:** ________________

---

## ส่วนที่ 2: ออกแบบ Architecture (30 นาที)

### 2.1 C4 Level 1: System Context Diagram

**วาดใน Draw.io หรือวาดด้วย ASCII:**

```
┌─────────────────────────────────────────────────────────────────┐
│                     SYSTEM CONTEXT DIAGRAM                      │
│                      Task Board System                          │
└─────────────────────────────────────────────────────────────────┘

                        ┌─────────────────┐
                        │                 │
                        │   👤 User       │
                        │   (Developer)   │
                        │                 │
                        └────────┬────────┘
                                 │
                                 │ ใช้งานผ่าน Web Browser
                                 │ HTTPS (Port 443)
                                 ▼
                ┌────────────────────────────────┐
                │                                │
                │    📋 Task Board System        │
                │    [Software System]           │
                │                                │
                │    ระบบจัดการ Tasks สำหรับ      │
                │    ทีมพัฒนาซอฟต์แวร์            │
                │                                │
                └────────────────────────────────┘
```

### 2.2 C4 Level 2: Container Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTAINER DIAGRAM                                    │
│                    Task Board System (N-Tier V1)                            │
│                         [Single VM]                                         │
└─────────────────────────────────────────────────────────────────────────────┘

                           ┌─────────────────┐
                           │   👤 User       │
                           │   (Browser)     │
                           └────────┬────────┘
                                    │
                                    │ HTTPS (Port 443)
                                    ▼
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║                        Ubuntu VM                                       ║
    ║  ┌─────────────────────────────────────────────────────────────────┐  ║
    ║  │  🌐 Nginx [Web Server]                                          │  ║
    ║  │  - SSL Termination                                              │  ║
    ║  │  - Reverse Proxy → :3000                                        │  ║
    ║  │  - Static Files (HTML, CSS, JS)                                 │  ║
    ║  │  Port: 80, 443                                                  │  ║
    ║  └──────────────────────┬──────────────────────────────────────────┘  ║
    ║                         │ HTTP (localhost:3000)                        ║
    ║                         ▼                                              ║
    ║  ┌─────────────────────────────────────────────────────────────────┐  ║
    ║  │  ⚙️ Backend API [Node.js + Express]                             │  ║
    ║  │  - REST API Endpoints                                           │  ║
    ║  │  - Business Logic (Layered Architecture)                        │  ║
    ║  │  - Data Validation                                              │  ║
    ║  │  Port: 3000                                                     │  ║
    ║  └──────────────────────┬──────────────────────────────────────────┘  ║
    ║                         │ TCP (localhost:5432)                         ║
    ║                         ▼                                              ║
    ║  ┌─────────────────────────────────────────────────────────────────┐  ║
    ║  │  🗄️ PostgreSQL [Database Server]                                │  ║
    ║  │  - Tasks Table                                                  │  ║
    ║  │  - ACID Transactions                                            │  ║
    ║  │  - Concurrent Access                                            │  ║
    ║  │  Port: 5432                                                     │  ║
    ║  └─────────────────────────────────────────────────────────────────┘  ║
    ╚═══════════════════════════════════════════════════════════════════════╝
```

### 2.3 Request Flow Diagram

```
Request Flow: POST /api/tasks (สร้าง Task ใหม่)
═══════════════════════════════════════════════════

   Browser                  Nginx                   Node.js                PostgreSQL
      │                       │                       │                       │
      │  1. HTTPS POST        │                       │                       │
      │  /api/tasks           │                       │                       │
      │──────────────────────>│                       │                       │
      │                       │                       │                       │
      │                       │  2. SSL Decrypt       │                       │
      │                       │  (HTTPS → HTTP)       │                       │
      │                       │                       │                       │
      │                       │  3. Proxy to :3000    │                       │
      │                       │──────────────────────>│                       │
      │                       │                       │                       │
      │                       │                       │  4. Parse Request     │
      │                       │                       │  Validate Input       │
      │                       │                       │                       │
      │                       │                       │  5. Business Logic    │
      │                       │                       │  Check rules          │
      │                       │                       │                       │
      │                       │                       │  6. SQL INSERT        │
      │                       │                       │──────────────────────>│
      │                       │                       │                       │
      │                       │                       │  7. Return new task   │
      │                       │                       │<──────────────────────│
      │                       │                       │                       │
      │                       │  8. JSON Response     │                       │
      │                       │<──────────────────────│                       │
      │                       │                       │                       │
      │  9. SSL Encrypt       │                       │                       │
      │  HTTPS Response       │                       │                       │
      │<──────────────────────│                       │                       │
      │                       │                       │                       │
```

---

## ส่วนที่ 3: ติดตั้ง PostgreSQL และ Nginx (40 นาที)

### 3.1 ติดตั้ง PostgreSQL (15 นาที)

**เข้า VM ผ่าน SSH:**
```bash
ssh devlab@VM_IP
```

**ติดตั้ง PostgreSQL:**
```bash
# อัพเดท packages
sudo apt update

# ติดตั้ง PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# ตรวจสอบ version
psql --version
# ควรได้: psql (PostgreSQL) 14.x หรือสูงกว่า

# เริ่มต้น service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# ตรวจสอบ status
sudo systemctl status postgresql
```

**สร้าง Database และ User:**
```bash
# เข้า PostgreSQL shell
sudo -u postgres psql

# ใน psql shell:
```

```sql
-- สร้าง user สำหรับ application
CREATE USER taskboard WITH PASSWORD 'taskboard123';

-- สร้าง database
CREATE DATABASE taskboard_db OWNER taskboard;

-- ให้สิทธิ์
GRANT ALL PRIVILEGES ON DATABASE taskboard_db TO taskboard;

-- ออกจาก psql
\q
```

**ทดสอบ connection:**
```bash
# ทดสอบ login
psql -h localhost -U taskboard -d taskboard_db

# ใส่ password: taskboard123
# ถ้า login ได้แสดงว่าสำเร็จ
# พิมพ์ \q เพื่อออก
```

### 3.2 ติดตั้ง Nginx (15 นาที)

```bash
# ติดตั้ง Nginx
sudo apt install -y nginx

# ตรวจสอบ version
nginx -v
# ควรได้: nginx version: 1.24.x

# เริ่มต้น service
sudo systemctl start nginx
sudo systemctl enable nginx

# ตรวจสอบ status
sudo systemctl status nginx
```

**ทดสอบ Nginx:**
```bash
# ทดสอบจากใน VM
curl http://localhost

# ควรเห็น "Welcome to nginx!" HTML
```

**เปิด Firewall ports:**
```bash
# ตรวจสอบ firewall status
sudo ufw status

# อนุญาต HTTP และ HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# ตรวจสอบอีกครั้ง
sudo ufw status
```

### 3.3 สร้าง SSL Certificate (Self-signed) (10 นาที)

```bash
# สร้าง directory สำหรับ SSL
sudo mkdir -p /etc/nginx/ssl

# สร้าง Self-signed Certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/taskboard.key \
    -out /etc/nginx/ssl/taskboard.crt \
    -subj "/C=TH/ST=ChiangMai/L=ChiangMai/O=RMUTL/OU=SoftwareEngineering/CN=taskboard.local"

# ตรวจสอบ certificates
sudo ls -la /etc/nginx/ssl/
# ควรเห็น taskboard.key และ taskboard.crt

# ตรวจสอบ certificate info
sudo openssl x509 -in /etc/nginx/ssl/taskboard.crt -text -noout | head -20
```

**เพิ่ม hosts file:**
```bash
# แก้ไข hosts file ใน VM
echo "127.0.0.1    taskboard.local" | sudo tee -a /etc/hosts

# แก้ไข hosts file ในเครื่อง local ด้วย
# Windows: C:\Windows\System32\drivers\etc\hosts
# Mac/Linux: /etc/hosts
# เพิ่ม: VM_IP    taskboard.local
```

---

## ส่วนที่ 4: Migrate Database และปรับ Backend (50 นาที)

### 4.1 สร้าง PostgreSQL Schema

**สร้างไฟล์ `database/postgres-init.sql`:**

```sql
-- database/postgres-init.sql
-- Task Board Database Schema for PostgreSQL

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS tasks;

-- Create tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'TODO',
    priority VARCHAR(10) DEFAULT 'MEDIUM',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_status CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE')),
    CONSTRAINT chk_priority CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH'))
);

-- Create indexes
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);

-- Create function for auto-updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO tasks (title, description, status, priority) VALUES
    ('Setup N-Tier Architecture', 'Install Nginx, PostgreSQL on Ubuntu VM', 'DONE', 'HIGH'),
    ('Configure SSL Certificate', 'Create self-signed cert for HTTPS', 'DONE', 'HIGH'),
    ('Migrate to PostgreSQL', 'Update repository to use PostgreSQL driver', 'IN_PROGRESS', 'HIGH'),
    ('Setup Nginx Reverse Proxy', 'Configure nginx.conf for API proxy', 'IN_PROGRESS', 'MEDIUM'),
    ('Test HTTPS Connection', 'Verify SSL works correctly', 'TODO', 'MEDIUM'),
    ('Write Architecture Documentation', 'Create C4 diagrams and docs', 'TODO', 'LOW'),
    ('Complete ANALYSIS.md', 'Compare 4 architectures from Week 3-6', 'TODO', 'HIGH');

-- Verify data
SELECT * FROM tasks ORDER BY created_at;
```

**รัน SQL Script:**
```bash
# รัน script
PGPASSWORD=taskboard123 psql -h localhost -U taskboard -d taskboard_db -f database/postgres-init.sql
```

### 4.2 ติดตั้ง PostgreSQL Driver

```bash
cd ~/engse207-labs/week6-ntier

# ติดตั้ง pg driver
npm install pg

# อัพเดท package.json
```

### 4.3 แก้ไข Environment Variables

**แก้ไขไฟล์ `.env`:**

```env
# Database Configuration (Changed from SQLite to PostgreSQL)
DB_TYPE=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskboard_db
DB_USER=taskboard
DB_PASSWORD=taskboard123

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=https://taskboard.local
```

### 4.4 แก้ไข Database Connection

**แก้ไขไฟล์ `src/config/database.js`:**

```javascript
// src/config/database.js
// PostgreSQL Database Connection

const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'taskboard_db',
    user: process.env.DB_USER || 'taskboard',
    password: process.env.DB_PASSWORD || 'taskboard123',
    
    // Pool configuration
    max: 10,                    // Maximum connections
    idleTimeoutMillis: 30000,   // Close idle after 30 seconds
    connectionTimeoutMillis: 2000
});

// Test connection
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ Database error:', err);
    process.exit(-1);
});

// Helper function
const query = async (text, params) => {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`📊 Query: ${duration}ms, Rows: ${result.rowCount}`);
    return result;
};

// Health check
const healthCheck = async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        return { status: 'healthy', timestamp: result.rows[0].now };
    } catch (error) {
        return { status: 'unhealthy', error: error.message };
    }
};

module.exports = { pool, query, healthCheck };
```

### 4.5 แก้ไข Task Repository

**แก้ไขไฟล์ `src/repositories/taskRepository.js`:**

```javascript
// src/repositories/taskRepository.js
// PostgreSQL Data Access Layer

const { query } = require('../config/database');

class TaskRepository {
    
    async findAll() {
        const sql = `
            SELECT id, title, description, status, priority, 
                   created_at, updated_at 
            FROM tasks 
            ORDER BY 
                CASE priority 
                    WHEN 'HIGH' THEN 1 
                    WHEN 'MEDIUM' THEN 2 
                    WHEN 'LOW' THEN 3 
                END,
                created_at DESC
        `;
        const result = await query(sql);
        return result.rows;
    }
    
    async findById(id) {
        const sql = 'SELECT * FROM tasks WHERE id = $1';
        const result = await query(sql, [id]);
        return result.rows[0] || null;
    }
    
    async findByStatus(status) {
        const sql = `
            SELECT * FROM tasks 
            WHERE status = $1 
            ORDER BY priority, created_at DESC
        `;
        const result = await query(sql, [status]);
        return result.rows;
    }
    
    async create(taskData) {
        const { title, description, status = 'TODO', priority = 'MEDIUM' } = taskData;
        const sql = `
            INSERT INTO tasks (title, description, status, priority) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        const result = await query(sql, [title, description, status, priority]);
        return result.rows[0];
    }
    
    async update(id, taskData) {
        const { title, description, status, priority } = taskData;
        
        // Build dynamic update query
        const updates = [];
        const values = [];
        let paramIndex = 1;
        
        if (title !== undefined) {
            updates.push(`title = $${paramIndex++}`);
            values.push(title);
        }
        if (description !== undefined) {
            updates.push(`description = $${paramIndex++}`);
            values.push(description);
        }
        if (status !== undefined) {
            updates.push(`status = $${paramIndex++}`);
            values.push(status);
        }
        if (priority !== undefined) {
            updates.push(`priority = $${paramIndex++}`);
            values.push(priority);
        }
        
        if (updates.length === 0) {
            return this.findById(id);
        }
        
        values.push(id);
        const sql = `
            UPDATE tasks 
            SET ${updates.join(', ')} 
            WHERE id = $${paramIndex} 
            RETURNING *
        `;
        const result = await query(sql, values);
        return result.rows[0] || null;
    }
    
    async delete(id) {
        const sql = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
        const result = await query(sql, [id]);
        return result.rows[0] || null;
    }
    
    async getStatistics() {
        const sql = `
            SELECT 
                status,
                COUNT(*) as count,
                COUNT(*) FILTER (WHERE priority = 'HIGH') as high_priority,
                COUNT(*) FILTER (WHERE priority = 'MEDIUM') as medium_priority,
                COUNT(*) FILTER (WHERE priority = 'LOW') as low_priority
            FROM tasks 
            GROUP BY status
        `;
        const result = await query(sql);
        return result.rows;
    }
}

module.exports = new TaskRepository();
```

### 4.6 ทดสอบ Backend

```bash
# รัน backend
npm start

# ทดสอบ API
curl http://localhost:3000/api/health
curl http://localhost:3000/api/tasks
```

**Git commit:**
```bash
git add .
git commit -m "Week 6: Migrate SQLite to PostgreSQL"
```

---

## ส่วนที่ 5: ตั้งค่า HTTPS และ Nginx (40 นาที)

### 5.1 Deploy Frontend ไปยัง Nginx

```bash
# สร้าง directory สำหรับ frontend
sudo mkdir -p /var/www/taskboard

# Copy frontend files
sudo cp -r ~/engse207-labs/week6-ntier/public/* /var/www/taskboard/

# Set permissions
sudo chown -R www-data:www-data /var/www/taskboard
sudo chmod -R 755 /var/www/taskboard

# ตรวจสอบ
ls -la /var/www/taskboard/
```

### 5.2 สร้าง Nginx Configuration

**สร้างไฟล์ `/etc/nginx/sites-available/taskboard`:**

```bash
sudo nano /etc/nginx/sites-available/taskboard
```

**เนื้อหา:**

```nginx
# Nginx Configuration for Task Board - N-Tier Architecture

# HTTP Server (redirect to HTTPS)
server {
    listen 80;
    server_name taskboard.local;
    
    # Redirect all HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name taskboard.local;

    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/taskboard.crt;
    ssl_certificate_key /etc/nginx/ssl/taskboard.key;
    
    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Root for static files
    root /var/www/taskboard;
    index index.html;

    # Logging
    access_log /var/log/nginx/taskboard_access.log;
    error_log /var/log/nginx/taskboard_error.log;

    # Static files
    location / {
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
            expires 7d;
            add_header Cache-Control "public, immutable";
        }
    }

    # API Proxy to Backend
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        
        # Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check
    location /health {
        access_log off;
        return 200 'OK';
        add_header Content-Type text/plain;
    }
}
```

### 5.3 Enable Configuration

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/taskboard /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx
```

### 5.4 อัพเดท Frontend API URL

**แก้ไขไฟล์ `public/app.js`:**

```javascript
// เปลี่ยนจาก
const API_BASE_URL = 'http://VM_IP:3000/api';

// เป็น (relative path)
const API_BASE_URL = '/api';
```

**Copy ไฟล์ใหม่:**
```bash
sudo cp ~/engse207-labs/week6-ntier/public/app.js /var/www/taskboard/
```

**Git commit:**
```bash
git add .
git commit -m "Week 6: Configure Nginx as reverse proxy with HTTPS"
```

---

## ส่วนที่ 6: Testing และ Verification (30 นาที)

### 6.1 Test Checklist

```
┌────────────────────────────────────────────────────────────────────┐
│                    ✅ TEST CHECKLIST                               │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  [ ] 1. PostgreSQL Connection                                      │
│  [ ] 2. Backend API (direct)                                       │
│  [ ] 3. Nginx Serving Static Files                                 │
│  [ ] 4. HTTP → HTTPS Redirect                                      │
│  [ ] 5. HTTPS/SSL Working                                          │
│  [ ] 6. API Proxy (Nginx → Backend)                                │
│  [ ] 7. Full CRUD Operations                                       │
│  [ ] 8. Frontend UI                                                │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### 6.2 Test Commands

**Test 1: PostgreSQL Connection**
```bash
psql -h localhost -U taskboard -d taskboard_db -c "SELECT COUNT(*) FROM tasks;"
# Password: taskboard123
```

**Test 2: Backend API (direct)**
```bash
# Health check
curl http://localhost:3000/api/health | jq

# Get tasks
curl http://localhost:3000/api/tasks | jq
```

**Test 3: HTTP → HTTPS Redirect**
```bash
curl -I http://taskboard.local
# ควรเห็น: HTTP/1.1 301 Moved Permanently
# Location: https://taskboard.local/
```

**Test 4: HTTPS Working**
```bash
# -k = ignore self-signed cert warning
curl -k https://taskboard.local/api/health | jq
curl -k https://taskboard.local/api/tasks | jq
```

**Test 5: Create Task via HTTPS**
```bash
curl -k -X POST https://taskboard.local/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test HTTPS Task","priority":"HIGH"}' | jq
```

**Test 6: SSL Certificate Info**
```bash
openssl s_client -connect taskboard.local:443 -servername taskboard.local < /dev/null 2>/dev/null | openssl x509 -noout -subject
```

### 6.3 Open Browser Test

1. เปิด Browser
2. ไปที่ `https://taskboard.local`
3. Accept SSL Warning (เพราะ Self-signed)
4. ทดสอบ:
   - [ ] ดู Tasks ทั้งหมด
   - [ ] สร้าง Task ใหม่
   - [ ] Update Status
   - [ ] Edit Task
   - [ ] Delete Task

### 6.4 Service Verification

```bash
# ตรวจสอบ Services ทั้งหมด
echo "=== Service Status ==="
sudo systemctl status postgresql --no-pager | head -5
echo ""
sudo systemctl status nginx --no-pager | head -5
echo ""
pm2 status

# ตรวจสอบ Ports
echo ""
echo "=== Listening Ports ==="
sudo ss -tlnp | grep -E "80|443|3000|5432"
```

**Expected Output:**
```
LISTEN  *:80       nginx
LISTEN  *:443      nginx
LISTEN  127.0.0.1:3000  node
LISTEN  127.0.0.1:5432  postgres
```

---

## ส่วนที่ 7: การวิเคราะห์และเปรียบเทียบ (40 นาที) ⭐

### 🎯 สำคัญมาก: นักศึกษาต้องทำเอง!

**สร้างไฟล์ `docs/ANALYSIS.md` และตอบคำถามต่อไปนี้:**

---

### คำถาม 1: เปรียบเทียบ 4 Architectures (15 คะแนน)

**สร้างตารางเปรียบเทียบ:**

| ด้าน | Week 3 (Monolithic) | Week 4 (Layered) | Week 5 (Client-Server) | Week 6 (N-Tier) |
|------|---------------------|------------------|------------------------|-----------------|
| **Database** | | | | |
| **Web Server** | | | | |
| **Protocol** | | | | |
| **Separation** | | | | |
| **Scalability** | | | | |
| **Security** | | | | |
| **Complexity** | | | | |
| **Deploy Difficulty** | | | | |

**คำตอบของคุณ:**
```
(กรอกตารางให้ครบ)



```

---

### คำถาม 2: Quality Attributes Radar Chart (10 คะแนน)

**ให้คะแนน 1-5 สำหรับแต่ละ Quality Attribute:**

| Quality Attribute | Week 3 | Week 4 | Week 5 | Week 6 |
|-------------------|--------|--------|--------|--------|
| **Performance** | | | | |
| **Scalability** | | | | |
| **Security** | | | | |
| **Maintainability** | | | | |
| **Testability** | | | | |
| **Deployability** | | | | |

**อธิบายเหตุผลการให้คะแนน:**
```
1. Performance:
   - Week 3: ... เพราะ ...
   - Week 4: ... เพราะ ...
   - Week 5: ... เพราะ ...
   - Week 6: ... เพราะ ...

2. Scalability:
   ...

3. Security:
   ...

(ทำให้ครบทุก attribute)
```

---

### คำถาม 3: สถานการณ์การใช้งาน (10 คะแนน)

**สำหรับแต่ละสถานการณ์ ให้เลือก Architecture ที่เหมาะสมและอธิบายเหตุผล:**

**สถานการณ์ A: Startup MVP**
- งบประมาณ: 50,000 บาท
- ทีม: 2 คน (Junior developers)
- Timeline: 1 เดือน
- Users: 100 คน
- **Architecture ที่เลือก:** ________________
- **เหตุผล:**
```


```

**สถานการณ์ B: E-commerce Platform**
- งบประมาณ: 2,000,000 บาท
- ทีม: 10 คน (Mixed experience)
- Timeline: 6 เดือน
- Users: 100,000 คน
- **Architecture ที่เลือก:** ________________
- **เหตุผล:**
```


```

**สถานการณ์ C: Internal Tool**
- งบประมาณ: 200,000 บาท
- ทีม: 3 คน (Mid-level)
- Timeline: 2 เดือน
- Users: 50 คน (พนักงานบริษัท)
- **Architecture ที่เลือก:** ________________
- **เหตุผล:**
```


```

**สถานการณ์ D: Banking Application**
- งบประมาณ: 10,000,000 บาท
- ทีม: 20 คน (Senior + Mid)
- Timeline: 12 เดือน
- Users: 1,000,000 คน
- Security: Critical (ข้อมูลการเงิน)
- **Architecture ที่เลือก:** ________________
- **เหตุผล:**
```


```

---

### คำถาม 4: ประสบการณ์จากการทำ Lab (5 คะแนน)

**ก. ปัญหาที่พบในการทำ Week 6:**
```
1. 
2. 
3. 
```

**ข. วิธีแก้ไขปัญหา:**
```
1. 
2. 
3. 
```

**ค. สิ่งที่ได้เรียนรู้ใหม่:**
```
1. 
2. 
3. 
```

---

### คำถาม 5: Evolution Path (5 คะแนน)

**วาด Flowchart แสดงว่าเมื่อไหร่ควร evolve จาก Architecture หนึ่งไปอีกแบบ:**

```
เริ่มต้น
    │
    ▼
[Monolithic]
    │
    │ เมื่อ: _______________
    ▼
[Layered]
    │
    │ เมื่อ: _______________
    ▼
[Client-Server]
    │
    │ เมื่อ: _______________
    ▼
[N-Tier]
    │
    │ เมื่อ: _______________
    ▼
[Microservices]
```

---

### คำถาม 6: บทเรียนสำคัญ (5 คะแนน)

**Top 3 บทเรียนจาก Week 3-6:**
```
1. 

2. 

3. 
```

**ถ้าเริ่มทำใหม่ จะทำอะไรต่างไป:**
```
1. 

2. 

3. 
```

---

## 📤 การส่งงานและเกณฑ์การให้คะแนน

### Checklist การส่งงาน:

**Infrastructure:**
- [ ] PostgreSQL ติดตั้งและทำงาน
- [ ] Nginx ติดตั้งและทำงาน
- [ ] SSL Certificate สร้างแล้ว
- [ ] Firewall ตั้งค่าแล้ว

**Application:**
- [ ] Backend migrate ไป PostgreSQL แล้ว
- [ ] Frontend deploy ไป Nginx แล้ว
- [ ] HTTPS ทำงาน
- [ ] API Proxy ทำงาน
- [ ] CRUD operations ทั้งหมดทำงาน

**Documentation:** ⭐
- [ ] **ANALYSIS.md เสร็จสมบูรณ์** (สำคัญมาก!)
- [ ] README.md อัพเดท
- [ ] C4 Diagrams (Context, Container)
- [ ] Screenshots

### Screenshots ที่ต้องส่ง:

1. **Services Status**
   ```bash
   sudo systemctl status postgresql nginx
   pm2 status
   ```

2. **HTTPS in Browser** (แสดง lock icon)

3. **API Response via HTTPS**
   ```bash
   curl -k https://taskboard.local/api/tasks
   ```

4. **Task Board UI** (สร้าง/แก้ไข task)

5. **Nginx Logs**
   ```bash
   sudo tail -20 /var/log/nginx/taskboard_access.log
   ```

### เกณฑ์การให้คะแนน (40 คะแนน):

| หัวข้อ | คะแนน | รายละเอียด |
|-------|------|-----------|
| **1. Infrastructure** | 5 | PostgreSQL, Nginx, SSL ติดตั้งถูกต้อง |
| **2. Database Migration** | 4 | SQLite → PostgreSQL สำเร็จ |
| **3. Nginx Configuration** | 4 | Reverse Proxy, HTTPS ทำงาน |
| **4. Functionality** | 3 | CRUD operations ทำงานครบ |
| **5. การวิเคราะห์** ⭐ | **15** | **ANALYSIS.md** |
|    - คำถาม 1 | 15 | ตารางเปรียบเทียบ 4 architectures |
|    - คำถาม 2 | 10 | Quality Attributes Radar |
|    - คำถาม 3 | 10 | สถานการณ์การใช้งาน |
|    - คำถาม 4-5 | 5 | ประสบการณ์และ Evolution |
|    - คำถาม 6 | 5 | บทเรียนสำคัญ |
| **6. Documentation** | 3 | README, Diagrams, Screenshots |
| **7. Code Quality** | 3 | โค้ดสะอาด, organized |
| **8. Git** | 3 | Commits มีความหมาย |
| **รวม** | **40** | |

**หมายเหตุ:** การวิเคราะห์ (ข้อ 5) มีน้ำหนัก **37.5%** ของคะแนนทั้งหมด

---

## 📝 การบ้าน: Multi-VM Version

### Assignment: แยก N-Tier เป็น 3 VMs

**เปลี่ยนจาก Single VM เป็น:**

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│    VM 1     │      │    VM 2     │      │    VM 3     │
│             │      │             │      │             │
│   🌐 Nginx  │─────►│  ⚙️ Node.js │─────►│ 🗄️ PostgreSQL│
│   Port 443  │      │   Port 3000 │      │   Port 5432 │
│             │      │             │      │             │
│  10.0.0.10  │      │  10.0.0.20  │      │  10.0.0.30  │
└─────────────┘      └─────────────┘      └─────────────┘
    Web Tier           App Tier            Data Tier
```

### Requirements:

| VM | Component | IP | Configuration |
|----|-----------|-----|---------------|
| **VM1** | Nginx | 10.0.0.10 | Proxy to VM2:3000 |
| **VM2** | Node.js | 10.0.0.20 | DB_HOST=10.0.0.30 |
| **VM3** | PostgreSQL | 10.0.0.30 | Allow VM2 connection |

### Deliverables:

1. ✅ 3 VMs ทำงานได้
2. ✅ Network communication ระหว่าง VMs
3. ✅ CRUD operations ผ่าน HTTPS
4. ✅ Documentation อัพเดท
5. ✅ MULTI_VM_SETUP.md

### Bonus Points (+5):

- [ ] ใช้ Vagrant หรือ Terraform สร้าง VMs
- [ ] เพิ่ม Load Balancer (2 App Servers)
- [ ] เพิ่ม Database Replication

---

## 🛠️ แก้ปัญหาเบื้องต้น

### PostgreSQL Issues

**ไม่สามารถ connect:**
```bash
# ตรวจสอบ service
sudo systemctl status postgresql

# ตรวจสอบ logs
sudo tail -50 /var/log/postgresql/postgresql-14-main.log

# ตรวจสอบ port
sudo ss -tlnp | grep 5432
```

**Authentication failed:**
```bash
# Reset password
sudo -u postgres psql
ALTER USER taskboard WITH PASSWORD 'taskboard123';
\q
```

### Nginx Issues

**502 Bad Gateway:**
```bash
# Backend ไม่ทำงาน
pm2 status
pm2 restart task-board

# ตรวจสอบ proxy_pass
sudo cat /etc/nginx/sites-available/taskboard | grep proxy_pass
```

**SSL Certificate Error:**
```bash
# ตรวจสอบ certificate
sudo openssl x509 -in /etc/nginx/ssl/taskboard.crt -noout -dates

# สร้างใหม่ถ้าหมดอายุ
sudo openssl req -x509 -nodes -days 365 ...
```

### Connection Issues

**Cannot access from browser:**
```bash
# ตรวจสอบ firewall
sudo ufw status
sudo ufw allow 443/tcp

# ตรวจสอบ hosts file
cat /etc/hosts | grep taskboard

# ตรวจสอบ nginx listening
sudo ss -tlnp | grep nginx
```

---

## 🎯 Best Practices ที่ได้เรียนรู้

### 1. Security
- ใช้ HTTPS เสมอ (แม้แต่ development)
- Database ไม่ควรถูกเข้าถึงจากภายนอกโดยตรง
- ใช้ Environment Variables สำหรับ credentials

### 2. Performance
- Nginx serve static files ดีกว่า Node.js
- ใช้ Connection Pooling สำหรับ database
- Enable Gzip compression

### 3. Maintainability
- แยก Tier ชัดเจน
- Document ทุก configuration
- ใช้ version control

### 4. Deployment
- Test locally ก่อน deploy
- มี rollback plan
- Monitor logs

---

## 📚 สัปดาห์หน้า: N-Tier Version 2 (Docker)

**Preview Week 7:**
- Docker Containerization
- Docker Compose
- Container Networking
- Environment Variables
- Health Checks
- Container Orchestration

**เตรียมตัว:**
- ติดตั้ง Docker Desktop
- อ่าน Docker basics
- ทบทวน Week 6 code

---

## 🎉 ยินดีด้วย!

คุณได้สำเร็จ:
- ✅ ติดตั้ง N-Tier Architecture บน Single VM
- ✅ ใช้งาน PostgreSQL แทน SQLite
- ✅ ตั้งค่า Nginx เป็น Reverse Proxy
- ✅ สร้าง SSL Certificate สำหรับ HTTPS
- ✅ **วิเคราะห์และเปรียบเทียบ 4 Architectures** ⭐

**ทักษะเหล่านี้ใช้จริงใน:**
- Cloud deployments (AWS, GCP, Azure)
- Enterprise applications
- Production web services
- DevOps practices

---

*ENGSE207 - Software Architecture*  
*มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*  
*ภาควิชาวิศวกรรมซอฟต์แวร์*
