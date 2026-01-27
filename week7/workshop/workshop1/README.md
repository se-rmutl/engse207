# 🐳 Workshop 1: Docker Step-by-Step
## เรียนรู้ Docker ทีละขั้นตอน - จากศูนย์สู่ Multi-Container

**รายวิชา:** ENGSE207 Software Architecture  
**ประเภท:** Pre-Lab Workshop (ทำก่อน Week 6 Lab)  
**ระยะเวลา:** 90-120 นาที  
**ระดับความยาก:** ⭐⭐ (เริ่มต้น)

---

## 📋 สารบัญ

1. [แนะนำ Workshop](#แนะนำ-workshop)
2. [Part A: Single Container Journey](#part-a-single-container-journey)
3. [Part B: Multi-Container Journey](#part-b-multi-container-journey)
4. [Part C: Docker Compose](#part-c-docker-compose)
5. [สรุปและเตรียมพร้อมสำหรับ Lab](#สรุปและเตรียมพร้อมสำหรับ-lab)

---

## 🎯 แนะนำ Workshop

### วัตถุประสงค์

Workshop นี้จะพาคุณเรียนรู้ Docker **ทีละขั้นตอน** ผ่านการสร้าง **Simple Note App** ตั้งแต่:
- รันบนเครื่องตัวเอง (ไม่มี Docker)
- ใส่เข้า Container (Single Container)
- เพิ่ม Database (Multi-Container)
- รวมทุกอย่างด้วย Docker Compose

### 🗺️ เส้นทางการเรียนรู้

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         WORKSHOP LEARNING PATH                           │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   PART A: Single Container                                               │
│   ════════════════════════                                               │
│                                                                          │
│   Step 1       Step 2         Step 3         Step 4         Step 5       │
│   ┌─────┐     ┌─────┐        ┌─────┐        ┌─────┐        ┌─────┐       │
│   │Node │ ──► │Write│  ──►   │Build│  ──►   │ Run │  ──►   │Debug│       │
│   │ App │     │Docker        │Image│        │Cont.│        │& Fix│       │
│   └─────┘     │file │        └─────┘        └─────┘        └─────┘       │
│               └─────┘                                                    │
│                                                                          │
│   PART B: Multi-Container                                                │
│   ═══════════════════════                                                │
│                                                                          │
│   Step 6        Step 7         Step 8         Step 9                     │
│   ┌─────┐     ┌─────┐        ┌──────┐        ┌──────┐                    │
│   │ Add │ ──► │Conn-│  ──►   │Docker│  ──►   │Docker│                    │
│   │ DB  │     │ect  │        │Netwrk│        │Volume│                    │
│   └─────┘     └─────┘        └──────┘        └──────┘                    │
│                                                                          │
│   PART C: Docker Compose                                                 │
│   ══════════════════════                                                 │
│                                                                          │
│   Step 10       Step 11        Step 12        Step 13                    │
│   ┌─────┐     ┌─────┐        ┌─────┐        ┌─────┐                      │
│   │Write│ ──► │Deps │  ──►   │ Env │  ──►   │ One │                      │
│   │YAML │     │&Hlth│        │ Vars│        │ Cmd │                      │
│   └─────┘     └─────┘        └─────┘        └─────┘                      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 📁 Project: Simple Note App

เราจะสร้าง app ง่ายๆ สำหรับบันทึก notes:

```
┌────────────────────────────────────────┐
│         📝 Simple Note App             │
├────────────────────────────────────────┤
│                                        │
│  Features:                             │
│  • ดู notes ทั้งหมด (GET /api/notes)      │
│  • เพิ่ม note ใหม่ (POST /api/notes)      │
│  • ลบ note (DELETE /api/notes/:id)     │
│                                        │
│  Tech Stack:                           │
│  • Node.js + Express                   │
│  • PostgreSQL                          │
│  • Docker + Docker Compose             │
│                                        │
└────────────────────────────────────────┘
```

### สิ่งที่ต้องเตรียม

```bash
# ตรวจสอบว่ามี Docker
docker --version
docker compose version

# ตรวจสอบว่ามี Node.js
node --version
npm --version

# ตรวจสอบว่ามี VS Code
code --version
```

---

## 🅰️ Part A: Single Container Journey

> **เป้าหมาย:** เข้าใจการสร้าง Docker Image และ Container จาก Node.js App

### Step 1: สร้าง Node.js App บนเครื่อง (ไม่มี Docker)

ก่อนจะใส่ Docker เราต้องมี app ที่ทำงานได้ก่อน

**1.1 สร้างโฟลเดอร์โปรเจกต์:**

```bash
# สร้างโฟลเดอร์
mkdir -p ~/docker-workshop/simple-note-app
cd ~/docker-workshop/simple-note-app

# เปิดใน VS Code
code .
```

**1.2 สร้าง package.json:**

```bash
cat > package.json << 'EOF'
{
  "name": "simple-note-app",
  "version": "1.0.0",
  "description": "Simple Note App for Docker Workshop",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOF
```

**1.3 สร้าง server.js (Version 1 - In-Memory):**

```bash
cat > server.js << 'EOF'
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ============================================
// 📌 VERSION 1: In-Memory Storage
// ============================================
// ตอนนี้เก็บ notes ไว้ใน memory (array)
// ปัญหา: restart server = ข้อมูลหาย!

let notes = [
    { id: 1, title: 'Note แรก', content: 'เรียนรู้ Docker', createdAt: new Date().toISOString() },
    { id: 2, title: 'Note ที่สอง', content: 'ฝึกเขียน Dockerfile', createdAt: new Date().toISOString() }
];
let nextId = 3;

// ============================================
// Routes
// ============================================

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        storage: 'in-memory'
    });
});

// GET /api/notes - ดู notes ทั้งหมด
app.get('/api/notes', (req, res) => {
    console.log(`📋 GET /api/notes - Found ${notes.length} notes`);
    res.json({
        success: true,
        data: notes,
        count: notes.length
    });
});

// POST /api/notes - เพิ่ม note ใหม่
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
    
    // Validation
    if (!title || !content) {
        return res.status(400).json({
            success: false,
            error: 'กรุณาระบุ title และ content'
        });
    }
    
    const newNote = {
        id: nextId++,
        title,
        content,
        createdAt: new Date().toISOString()
    };
    
    notes.push(newNote);
    console.log(`✅ POST /api/notes - Created note #${newNote.id}: ${title}`);
    
    res.status(201).json({
        success: true,
        data: newNote,
        message: 'สร้าง note สำเร็จ'
    });
});

// DELETE /api/notes/:id - ลบ note
app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = notes.findIndex(n => n.id === id);
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: `ไม่พบ note #${id}`
        });
    }
    
    const deleted = notes.splice(index, 1)[0];
    console.log(`🗑️ DELETE /api/notes/${id} - Deleted: ${deleted.title}`);
    
    res.json({
        success: true,
        message: `ลบ note #${id} สำเร็จ`
    });
});

// ============================================
// Start Server
// ============================================
app.listen(PORT, '0.0.0.0', () => {
    console.log('');
    console.log('╔════════════════════════════════════════════════════╗');
    console.log('║        📝 Simple Note App - Docker Workshop        ║');
    console.log('╠════════════════════════════════════════════════════╣');
    console.log(`║  🚀 Server running on port ${PORT}                 ║`);
    console.log(`║  📊 Storage: In-Memory (${notes.length} notes)     ║`);
    console.log('║  📍 Endpoints:                                     ║');
    console.log('║     GET  /health      - Health check               ║');
    console.log('║     GET  /api/notes   - List all notes             ║');
    console.log('║     POST /api/notes   - Create new note            ║');
    console.log('║     DELETE /api/notes/:id - Delete note            ║');
    console.log('╚════════════════════════════════════════════════════╝');
    console.log('');
});
EOF
```

**1.4 ติดตั้งและทดสอบ:**

```bash
# ติดตั้ง dependencies
npm install

# รัน server
npm start
```

**ผลลัพธ์ที่คาดหวัง:**
```
╔════════════════════════════════════════════════════╗
║        📝 Simple Note App - Docker Workshop        ║
╠════════════════════════════════════════════════════╣
║  🚀 Server running on port 3000                    ║
║  📊 Storage: In-Memory (2 notes)                   ║
...
```

**1.5 ทดสอบ API:**

เปิด terminal ใหม่:

```bash
# ทดสอบ health check
curl http://localhost:3000/health

# ดู notes ทั้งหมด
curl http://localhost:3000/api/notes

# เพิ่ม note ใหม่
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Note ใหม่","content":"สร้างจาก curl"}'

# ดู notes อีกครั้ง (ควรมี 3 notes)
curl http://localhost:3000/api/notes

# ลบ note
curl -X DELETE http://localhost:3000/api/notes/1
```

**✅ Checkpoint 1:** App ทำงานได้บนเครื่อง

```
┌────────────────────────────────────────────────────────────────┐
│  ✅ Step 1 Complete!                                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  สิ่งที่ทำ:                                                        │
│  • สร้าง Node.js app ง่ายๆ                                       │
│  • ใช้ Express.js เป็น web framework                             │
│  • เก็บข้อมูลใน memory (array)                                    │
│  • ทดสอบ API ผ่าน curl                                          │
│                                                                │
│  ⚠️ ปัญหาตอนนี้:                                                  │
│  • ต้องติดตั้ง Node.js บนทุกเครื่อง                                   │
│  • Version อาจต่างกัน                                            │
│  • ต้อง npm install ทุกครั้ง                                       │
│                                                                │
│  ➡️ Docker จะช่วยแก้ปัญหาเหล่านี้!                                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**หยุด server ก่อน:** กด `Ctrl+C`

---

### Step 2: เขียน Dockerfile ทีละบรรทัด

> **เป้าหมาย:** เข้าใจทุกบรรทัดใน Dockerfile

**2.1 สร้าง Dockerfile:**

```bash
cat > Dockerfile << 'EOF'
# ============================================
# 📦 DOCKERFILE - Simple Note App
# ============================================
# Dockerfile คือ "สูตร" สำหรับสร้าง Docker Image
# ทุกบรรทัดคือ instruction ที่สร้าง layer ใหม่

# --------------------------------------------
# Step 1: เลือก Base Image
# --------------------------------------------
# FROM = เริ่มจาก image ไหน?
# node:20-alpine = Node.js version 20 บน Alpine Linux
# Alpine = Linux ขนาดเล็ก (~5MB) เหมาะกับ container
FROM node:20-alpine

# --------------------------------------------
# Step 2: กำหนด Working Directory
# --------------------------------------------
# WORKDIR = โฟลเดอร์ที่จะทำงาน (เหมือน cd)
# ถ้าไม่มีจะสร้างให้อัตโนมัติ
WORKDIR /app

# --------------------------------------------
# Step 3: Copy package.json ก่อน
# --------------------------------------------
# COPY <source> <destination>
# ทำไมต้อง copy package.json แยก?
# → เพื่อใช้ Docker layer caching!
# → ถ้า package.json ไม่เปลี่ยน = ไม่ต้อง npm install ใหม่
COPY package*.json ./

# --------------------------------------------
# Step 4: ติดตั้ง Dependencies
# --------------------------------------------
# RUN = รัน command ตอน build image
# npm ci = clean install (เร็วกว่า npm install)
# --only=production = ไม่ติดตั้ง devDependencies
RUN npm ci --only=production

# --------------------------------------------
# Step 5: Copy Source Code
# --------------------------------------------
# COPY . . = copy ทุกอย่างจาก current directory
# ไปยัง WORKDIR (/app)
COPY . .

# --------------------------------------------
# Step 6: บอกว่าใช้ Port อะไร
# --------------------------------------------
# EXPOSE = documentation ว่า container ใช้ port อะไร
# ไม่ได้ publish port จริงๆ (ต้องใช้ -p ตอน run)
EXPOSE 3000

# --------------------------------------------
# Step 7: Command สำหรับ start container
# --------------------------------------------
# CMD = command ที่รันเมื่อ container start
# ใช้รูปแบบ array ["executable", "param1", "param2"]
CMD ["node", "server.js"]
EOF
```

**2.2 สร้าง .dockerignore:**

```bash
cat > .dockerignore << 'EOF'
# ============================================
# 📋 .dockerignore
# ============================================
# ไฟล์/โฟลเดอร์ที่ไม่ต้อง copy เข้า Docker image
# เหมือน .gitignore แต่สำหรับ Docker

# Dependencies (จะ npm install ใหม่ใน container)
node_modules

# Logs
*.log
npm-debug.log*

# Environment files (อาจมี secrets)
.env
.env.local
.env.*.local

# IDE
.vscode
.idea

# Git
.git
.gitignore

# Docker files (ไม่ต้อง copy ตัวเอง)
Dockerfile
docker-compose.yml
.dockerignore

# OS files
.DS_Store
Thumbs.db
EOF
```

**💡 ทำไมต้องมี .dockerignore?**

```
┌─────────────────────────────────────────────────────────────────┐
│                    ทำไมต้องมี .dockerignore?                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ❌ ไม่มี .dockerignore:                                          │
│  ┌──────────────────────────────────────┐                       │
│  │  Project folder (150 MB)             │                       │
│  │  ├── node_modules/ (140 MB) ← copy! │                        │
│  │  ├── .git/ (5 MB)           ← copy! │                        │
│  │  ├── package.json                    │                       │
│  │  └── server.js                       │                       │
│  └──────────────────────────────────────┘                       │
│  → Build ช้า, image ใหญ่เกินไป                                     │
│                                                                 │
│  ✅ มี .dockerignore:                                            │
│  ┌──────────────────────────────────────┐                       │
│  │  Project folder (10 KB)              │                       │
│  │  ├── package.json                    │                       │
│  │  └── server.js                       │                       │
│  └──────────────────────────────────────┘                       │
│  → Build เร็ว, image เล็ก                                         │
│  → npm install ใน container จะ download ใหม่                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Step 3: Build Docker Image

> **เป้าหมาย:** เข้าใจ docker build และ layer caching

**3.1 Build image ครั้งแรก:**

```bash
# Build image
# -t = tag (ตั้งชื่อ)
# . = build context (โฟลเดอร์ปัจจุบัน)
docker build -t simple-note-app:v1 .
```

**ผลลัพธ์ที่คาดหวัง:**
```
[+] Building 45.2s (10/10) FINISHED
 => [internal] load build definition from Dockerfile
 => [internal] load .dockerignore
 => [internal] load metadata for docker.io/library/node:20-alpine
 => [1/5] FROM docker.io/library/node:20-alpine
 => [2/5] WORKDIR /app
 => [3/5] COPY package*.json ./
 => [4/5] RUN npm ci --only=production
 => [5/5] COPY . .
 => exporting to image
 => => naming to docker.io/library/simple-note-app:v1
```

**3.2 ดู image ที่สร้าง:**

```bash
# ดู images ทั้งหมด
docker images

# ผลลัพธ์:
# REPOSITORY        TAG       IMAGE ID       CREATED          SIZE
# simple-note-app   v1        abc123def456   10 seconds ago   125MB
```

**3.3 ทดลอง Build อีกครั้ง (ไม่แก้อะไร):**

```bash
docker build -t simple-note-app:v1 .
```

**ผลลัพธ์:**
```
[+] Building 0.8s (10/10) FINISHED
 => CACHED [1/5] FROM docker.io/library/node:20-alpine
 => CACHED [2/5] WORKDIR /app
 => CACHED [3/5] COPY package*.json ./
 => CACHED [4/5] RUN npm ci --only=production
 => CACHED [5/5] COPY . .
```

**💡 สังเกต:** ใช้เวลาแค่ 0.8 วินาที! เพราะใช้ **CACHED** layers

**3.4 ทดลองแก้ server.js แล้ว build ใหม่:**

```bash
# เพิ่ม comment ใน server.js
echo "// Updated at $(date)" >> server.js

# Build ใหม่
docker build -t simple-note-app:v2 .
```

**ผลลัพธ์:**
```
 => CACHED [1/5] FROM docker.io/library/node:20-alpine
 => CACHED [2/5] WORKDIR /app
 => CACHED [3/5] COPY package*.json ./
 => CACHED [4/5] RUN npm ci --only=production    ← ยังใช้ cache!
 => [5/5] COPY . .                               ← Build ใหม่เฉพาะนี้
```

```
┌────────────────────────────────────────────────────────────────┐
│               💡 Docker Layer Caching                          │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Layer Caching ทำงานอย่างไร:                                    │
│                                                                │
│  Dockerfile:                  Build Time:                      │
│  ┌───────────────────┐        ┌───────────────────┐            │
│  │ FROM node:alpine  │───────►│ Layer 1 (cached)  │ = 0s       │
│  │ WORKDIR /app      │───────►│ Layer 2 (cached)  │ = 0s       │
│  │ COPY package.json │───────►│ Layer 3 (cached)  │ = 0s       │
│  │ RUN npm ci        │───────►│ Layer 4 (cached)  │ = 0s ⭐    │
│  │ COPY . .          │───────►│ Layer 5 (rebuild) │ = 1s       │
│  └───────────────────┘        └───────────────────┘            │
│                                                                │
│  ⭐ npm ci ใช้เวลา ~30-60 วินาที แต่ถ้า package.json ไม่เปลี่ยน        │
│     = ใช้ cached layer = ไม่ต้อง download ใหม่!                    │
│                                                                │
│  📌 Best Practice: Copy ไฟล์ที่ไม่ค่อยเปลี่ยนก่อน                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**✅ Checkpoint 2:** เข้าใจ Docker Build และ Layer Caching

---

### Step 4: Run Container

> **เป้าหมาย:** เข้าใจ docker run options

**4.1 รัน container แบบ foreground:**

```bash
# รัน container
# --name = ตั้งชื่อ container
# -p 3000:3000 = map port (host:container)
docker run --name note-app -p 3000:3000 simple-note-app:v1
```

**ผลลัพธ์:**
```
╔════════════════════════════════════════════════════╗
║        📝 Simple Note App - Docker Workshop        ║
╠════════════════════════════════════════════════════╣
║  🚀 Server running on port 3000                    ║
...
```

**ทดสอบ:** เปิด browser ไปที่ http://localhost:3000/health

**หยุด container:** กด `Ctrl+C`

**4.2 รัน container แบบ background (detached):**

```bash
# ลบ container เดิมก่อน
docker rm note-app

# รัน background (-d = detached)
docker run -d --name note-app -p 3000:3000 simple-note-app:v1

# ดู containers ที่รันอยู่
docker ps

# ผลลัพธ์:
# CONTAINER ID   IMAGE                COMMAND           STATUS         PORTS
# abc123def456   simple-note-app:v1   "node server.js"  Up 5 seconds   0.0.0.0:3000->3000/tcp
```

**4.3 ดู logs:**

```bash
# ดู logs
docker logs note-app

# ดู logs แบบ follow (เหมือน tail -f)
docker logs -f note-app
# กด Ctrl+C เพื่อออก
```

**4.4 เข้าไปใน container:**

```bash
# เข้า shell ใน container
docker exec -it note-app sh

# ตอนนี้อยู่ใน container แล้ว!
/app # ls
# Dockerfile  node_modules  package-lock.json  package.json  server.js

/app # cat /etc/os-release
# NAME="Alpine Linux"

/app # node --version
# v20.x.x

/app # exit
```

**4.5 Stop และ Remove:**

```bash
# หยุด container
docker stop note-app

# ลบ container
docker rm note-app

# หรือ force remove (หยุดและลบพร้อมกัน)
docker rm -f note-app
```

```
┌─────────────────────────────────────────────────────────────────┐
│                 📝 Docker Run Options สำคัญ                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  docker run [OPTIONS] IMAGE [COMMAND]                           │
│                                                                 │
│  -d, --detach        รัน background                              │
│  --name NAME         ตั้งชื่อ container                             │
│  -p HOST:CONTAINER   map port                                   │
│  -e VAR=value        set environment variable                   │
│  -v HOST:CONTAINER   mount volume                               │
│  --rm                ลบ container เมื่อหยุด                        │
│  -it                 interactive + tty (สำหรับ shell)            │
│                                                                 │
│  ตัวอย่าง:                                                        │
│  docker run -d --name api -p 3000:3000 -e NODE_ENV=prod app:v1  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**✅ Checkpoint 3:** สามารถรัน Container และจัดการได้

---

### Step 5: Debug Container ที่มีปัญหา

> **เป้าหมาย:** เรียนรู้การ debug เมื่อ container ไม่ทำงาน

**5.1 จำลองสถานการณ์ ERROR:**

สร้าง Dockerfile ที่มี error:

```bash
cat > Dockerfile.broken << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
# ⚠️ ERROR: ชื่อไฟล์ผิด!
CMD ["node", "serverrr.js"]
EOF
```

```bash
# Build image
docker build -f Dockerfile.broken -t simple-note-app:broken .

# รัน container
docker run -d --name broken-app -p 3001:3000 simple-note-app:broken

# ดู status
docker ps -a
# STATUS: Exited (1) 2 seconds ago ← ปัญหา!
```

**5.2 Debug:**

```bash
# ดู logs เพื่อหาสาเหตุ
docker logs broken-app

# ผลลัพธ์:
# Error: Cannot find module '/app/serverrr.js'
# ...
```

**5.3 แก้ไข:**

```bash
# ลบ container และ image ที่พัง
docker rm broken-app
docker rmi simple-note-app:broken

# ใช้ Dockerfile ปกติ
docker build -t simple-note-app:v1 .
```

```
┌─────────────────────────────────────────────────────────────────┐
│                   🔧 Debug Checklist                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Container ไม่ทำงาน? ทำตามนี้:                                     │
│                                                                 │
│  1. ดู status: docker ps -a                                      │
│     → ดูว่า Exited หรือ Up                                         │
│                                                                 │
│  2. ดู logs: docker logs <container>                             │
│     → หา error message                                          │
│                                                                 │
│  3. เข้าไปดูใน container:                                         │
│     docker run -it --rm <image> sh                              │
│     → ตรวจสอบไฟล์, permissions, etc.                             │
│                                                                 │
│  4. ตรวจสอบ port:                                               │
│     docker port <container>                                     │
│     → ดูว่า map port ถูกไหม                                        │
│                                                                 │
│  5. ตรวจสอบ network:                                            │
│     docker network inspect bridge                               │
│     → ดู IP ของ container                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Step 6: Live Reload ด้วย Bind Mount

> **เป้าหมาย:** พัฒนาโดยไม่ต้อง rebuild image ทุกครั้ง

**ปัญหา:** ทุกครั้งที่แก้ code ต้อง rebuild image ใหม่

**วิธีแก้:** ใช้ **Bind Mount** เพื่อ mount code จากเครื่องเข้า container

**6.1 รัน container ด้วย Bind Mount:**

```bash
# ลบ container เดิม (ถ้ามี)
docker rm -f note-app

# รัน ด้วย bind mount
# -v $(pwd):/app = mount โฟลเดอร์ปัจจุบันเข้าไปที่ /app ใน container
# แต่! node_modules ใน container จะถูก override
docker run -d --name note-app \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  simple-note-app:v1
```

**💡 อธิบาย:**
- `-v $(pwd):/app` = mount source code
- `-v /app/node_modules` = anonymous volume สำหรับ node_modules (ไม่ให้ถูก override)

**6.2 ทดสอบ Live Reload:**

```bash
# ดู logs
docker logs -f note-app
```

เปิด terminal ใหม่ แล้วแก้ไฟล์:

```bash
# แก้ไข server.js - เปลี่ยนข้อความใน health check
sed -i "s/status: 'ok'/status: 'ok - updated!'/" server.js
```

**⚠️ หมายเหตุ:** Node.js ไม่มี hot reload อัตโนมัติ ต้อง restart container:

```bash
docker restart note-app
```

ทดสอบ:
```bash
curl http://localhost:3000/health
# {"status":"ok - updated!",...}
```

**6.3 ทางเลือก: ใช้ nodemon (auto restart):**

```bash
# Stop container
docker rm -f note-app

# ติดตั้ง nodemon ชั่วคราว
docker run -d --name note-app \
  -p 3000:3000 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -w /app \
  node:20-alpine \
  sh -c "npm install nodemon && npx nodemon server.js"
```

ตอนนี้เมื่อแก้ไฟล์ server จะ restart อัตโนมัติ!

```
┌─────────────────────────────────────────────────────────────────┐
│               📁 Bind Mount vs Volume                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Bind Mount (-v /host/path:/container/path)                     │
│  ──────────────────────────────────────────                     │
│  • Mount โฟลเดอร์จากเครื่อง host เข้า container                     │
│  • ใช้ตอน Development (แก้ code แล้วเห็นผลทันที)                      │
│  • Host สามารถแก้ไฟล์ได้โดยตรง                                     │
│                                                                 │
│  Named Volume (-v volume_name:/container/path)                  │
│  ──────────────────────────────────────────────                 │
│  • Docker จัดการ storage ให้                                      │
│  • ใช้สำหรับ persistent data (เช่น database)                       │
│  • ข้อมูลไม่หายเมื่อลบ container                                     │
│                                                                 │
│  ใช้งาน:                                                         │
│  ┌──────────────────┐     ┌──────────────────┐                  │
│  │   Development    │     │   Production     │                  │
│  ├──────────────────┤     ├──────────────────┤                  │
│  │  Bind Mount      │     │  Named Volume    │                  │
│  │  - Source code   │     │  - Database data │                  │
│  │  - Config files  │     │  - Upload files  │                  │
│  └──────────────────┘     └──────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**✅ Part A Complete!**

```
┌─────────────────────────────────────────────────────────────────┐
│                    ✅ Part A Complete!                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  สิ่งที่เรียนรู้:                                                      │
│  ✅ เขียน Dockerfile และเข้าใจทุก instruction                      │
│  ✅ Build Docker Image และเข้าใจ Layer Caching                   │
│  ✅ Run Container ด้วย options ต่างๆ                              │
│  ✅ Debug Container ที่มีปัญหา                                      │
│  ✅ ใช้ Bind Mount สำหรับ Development                             │
│                                                                 │
│  ⚠️ ปัญหาที่ยังเหลือ:                                                │
│  • ข้อมูลเก็บใน memory = หายเมื่อ restart                            │
│  • ต้องการ Database จริงๆ!                                        │
│                                                                 │
│  ➡️ Part B: เพิ่ม PostgreSQL Container                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Cleanup ก่อนไป Part B:**
```bash
docker rm -f note-app
```

---

## 🅱️ Part B: Multi-Container Journey

> **เป้าหมาย:** เชื่อมต่อ App Container กับ Database Container

### Step 7: เพิ่ม PostgreSQL Container

**7.1 รัน PostgreSQL Container:**

```bash
# รัน PostgreSQL
docker run -d --name note-db \
  -e POSTGRES_USER=noteuser \
  -e POSTGRES_PASSWORD=notepass \
  -e POSTGRES_DB=notedb \
  -p 5432:5432 \
  postgres:16-alpine
```

**7.2 ตรวจสอบว่า PostgreSQL พร้อมใช้งาน:**

```bash
# รอสักครู่แล้วตรวจสอบ
docker logs note-db

# เข้าไปใน container เพื่อทดสอบ
docker exec -it note-db psql -U noteuser -d notedb

# ใน psql:
notedb=# \dt
# ยังไม่มี tables

notedb=# CREATE TABLE test (id INT);
notedb=# \dt
# List of relations
# Schema | Name | Type  | Owner
# --------+------+-------+----------
# public | test | table | noteuser

notedb=# DROP TABLE test;
notedb=# \q
```

**✅ PostgreSQL พร้อมใช้งาน!**

---

### Step 8: อัพเดท App ให้ใช้ PostgreSQL

**8.1 เพิ่ม pg dependency:**

```bash
cat > package.json << 'EOF'
{
  "name": "simple-note-app",
  "version": "2.0.0",
  "description": "Simple Note App with PostgreSQL",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3"
  }
}
EOF
```

**8.2 สร้าง server.js Version 2 (PostgreSQL):**

```bash
cat > server.js << 'EOF'
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ============================================
// 📌 VERSION 2: PostgreSQL Storage
// ============================================

// Database connection
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'noteuser',
    password: process.env.DB_PASSWORD || 'notepass',
    database: process.env.DB_NAME || 'notedb',
});

// Initialize database
async function initDatabase() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // เพิ่ม sample data ถ้ายังไม่มี
        const result = await client.query('SELECT COUNT(*) FROM notes');
        if (parseInt(result.rows[0].count) === 0) {
            await client.query(`
                INSERT INTO notes (title, content) VALUES 
                ('Note แรก', 'เรียนรู้ Docker'),
                ('Note ที่สอง', 'ฝึกใช้ PostgreSQL')
            `);
        }
        
        console.log('✅ Database initialized');
    } finally {
        client.release();
    }
}

// ============================================
// Routes
// ============================================

// Health check
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
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

// GET /api/notes - ดู notes ทั้งหมด
app.get('/api/notes', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM notes ORDER BY created_at DESC'
        );
        console.log(`📋 GET /api/notes - Found ${result.rows.length} notes`);
        res.json({
            success: true,
            data: result.rows,
            count: result.rows.length
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST /api/notes - เพิ่ม note ใหม่
app.post('/api/notes', async (req, res) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                error: 'กรุณาระบุ title และ content'
            });
        }
        
        const result = await pool.query(
            'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        
        console.log(`✅ POST /api/notes - Created: ${title}`);
        res.status(201).json({
            success: true,
            data: result.rows[0],
            message: 'สร้าง note สำเร็จ'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// DELETE /api/notes/:id - ลบ note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(
            'DELETE FROM notes WHERE id = $1 RETURNING *',
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: `ไม่พบ note #${id}`
            });
        }
        
        console.log(`🗑️ DELETE /api/notes/${id}`);
        res.json({
            success: true,
            message: `ลบ note #${id} สำเร็จ`
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ============================================
// Start Server
// ============================================
async function start() {
    try {
        await initDatabase();
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log('');
            console.log('╔════════════════════════════════════════════════════╗');
            console.log('║        📝 Simple Note App - Version 2              ║');
            console.log('╠════════════════════════════════════════════════════╣');
            console.log(`║  🚀 Server running on port ${PORT}                 ║`);
            console.log('║  📊 Storage: PostgreSQL                            ║');
            console.log(`║  🗄️  DB Host: ${process.env.DB_HOST || 'localhost'}║`);
            console.log('╚════════════════════════════════════════════════════╝');
            console.log('');
        });
    } catch (error) {
        console.error('❌ Failed to start:', error);
        process.exit(1);
    }
}

start();
EOF
```

---

### Step 9: เชื่อมต่อ App กับ Database (แบบผิดพลาดก่อน!)

> **เป้าหมาย:** เรียนรู้ว่า containers ไม่สามารถคุยกันผ่าน localhost ได้

**9.1 Build image ใหม่:**

```bash
docker build -t simple-note-app:v2 .
```

**9.2 รัน App Container (จะ Error!):**

```bash
# ลองรัน - จะเชื่อมต่อ DB ไม่ได้!
docker run -d --name note-app \
  -p 3000:3000 \
  -e DB_HOST=localhost \
  simple-note-app:v2

# ดู logs
docker logs note-app
```

**ผลลัพธ์ที่คาดหวัง:**
```
❌ Failed to start: Error: connect ECONNREFUSED 127.0.0.1:5432
```

**❓ ทำไมถึง Error?**

```
┌────────────────────────────────────────────────────────────────┐
│                   ❌ ทำไม localhost ไม่ทำงาน?                   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  แต่ละ Container มี network namespace แยกกัน!                     │
│                                                                │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │   note-app          │    │   note-db           │            │
│  │   Container         │    │   Container         │            │
│  │                     │    │                     │            │
│  │  localhost:5432 ────┼──╳─┼─→ ไม่เจอ DB!         │            │
│  │  (ของ note-app)     │    │  (คนละ network)     │            │
│  │                     │    │                     │            │
│  └─────────────────────┘    └─────────────────────┘            │
│                                                                │
│  localhost ใน container หมายถึง container นั้นเอง                 │
│  ไม่ใช่ host machine หรือ container อื่น!                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**9.3 Cleanup:**

```bash
docker rm -f note-app
```

---

### Step 10: สร้าง Docker Network

**10.1 สร้าง Network:**

```bash
# สร้าง network ชื่อ note-network
docker network create note-network

# ดู networks ทั้งหมด
docker network ls
```

**10.2 เชื่อม Database เข้า Network:**

```bash
# หยุด database container เดิม
docker stop note-db

# เชื่อม database เข้า network
docker network connect note-network note-db

# Start database
docker start note-db

# หรือลบแล้วสร้างใหม่พร้อม network
docker rm -f note-db
docker run -d --name note-db \
  --network note-network \
  -e POSTGRES_USER=noteuser \
  -e POSTGRES_PASSWORD=notepass \
  -e POSTGRES_DB=notedb \
  postgres:16-alpine
```

**10.3 รัน App Container บน Network เดียวกัน:**

```bash
# รัน App บน network เดียวกัน
# DB_HOST=note-db = ใช้ชื่อ container เป็น hostname!
docker run -d --name note-app \
  --network note-network \
  -p 3000:3000 \
  -e DB_HOST=note-db \
  -e DB_USER=noteuser \
  -e DB_PASSWORD=notepass \
  -e DB_NAME=notedb \
  simple-note-app:v2
```

**10.4 ทดสอบ:**

```bash
# ดู logs
docker logs note-app

# ผลลัพธ์ควรเห็น:
# ✅ Database initialized
# ╔════════════════════════════════════════════════════╗
# ║        📝 Simple Note App - Version 2              ║
# ...

# ทดสอบ API
curl http://localhost:3000/health
# {"status":"ok","database":"connected",...}

curl http://localhost:3000/api/notes
# {"success":true,"data":[...],"count":2}
```

```
┌───────────────────────────────────────────────────────────────┐
│                   ✅ Docker Network ทำงานอย่างไร               │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  Docker Network = Virtual Network สำหรับ containers            │
│                                                               │
│  ┌─────────────────── note-network ───────────────────┐       │
│  │                                                    │       │
│  │   ┌─────────────────┐    ┌─────────────────┐       │       │
│  │   │   note-app      │    │   note-db       │       │       │
│  │   │                 │    │                 │       │       │
│  │   │ note-db:5432 ───┼────┼──→ Port 5432    │       │       │
│  │   │ (DNS resolve!)  │    │                 │       │       │
│  │   │                 │    │                 │       │       │
│  │   └─────────────────┘    └─────────────────┘       │       │
│  │                                                    │       │
│  │   Docker จะทำ DNS resolution:                      │       │
│  │   "note-db" → 172.18.0.2 (IP ของ container)        │       │
│  │                                                    │       │
│  └────────────────────────────────────────────────────┘       │
│                                                               │
│  💡 ใช้ชื่อ container แทน IP address ได้เลย!                      │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

### Step 11: Docker Volume สำหรับ Persistent Data

**ปัญหา:** ถ้าลบ database container ข้อมูลจะหายหมด!

**11.1 ทดสอบปัญหา:**

```bash
# เพิ่ม note ใหม่
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Note สำคัญ","content":"ข้อมูลนี้ต้องไม่หาย!"}'

# ดู notes
curl http://localhost:3000/api/notes
# ควรมี 3 notes

# ลบ database container
docker rm -f note-db

# สร้างใหม่
docker run -d --name note-db \
  --network note-network \
  -e POSTGRES_USER=noteuser \
  -e POSTGRES_PASSWORD=notepass \
  -e POSTGRES_DB=notedb \
  postgres:16-alpine

# Restart app เพื่อ reconnect
docker restart note-app

# ดู notes อีกครั้ง
curl http://localhost:3000/api/notes
# ⚠️ กลับไปมีแค่ 2 notes! (Note สำคัญหายไป!)
```

**11.2 แก้ไขด้วย Named Volume:**

```bash
# ลบ containers เดิม
docker rm -f note-app note-db

# สร้าง named volume
docker volume create note-db-data

# รัน database พร้อม volume
docker run -d --name note-db \
  --network note-network \
  -e POSTGRES_USER=noteuser \
  -e POSTGRES_PASSWORD=notepass \
  -e POSTGRES_DB=notedb \
  -v note-db-data:/var/lib/postgresql/data \
  postgres:16-alpine

# รัน app
docker run -d --name note-app \
  --network note-network \
  -p 3000:3000 \
  -e DB_HOST=note-db \
  -e DB_USER=noteuser \
  -e DB_PASSWORD=notepass \
  -e DB_NAME=notedb \
  simple-note-app:v2
```

**11.3 ทดสอบว่าข้อมูลไม่หาย:**

```bash
# รอสักครู่ให้ DB พร้อม
sleep 5

# เพิ่ม note ใหม่
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Note สำคัญ","content":"ข้อมูลนี้ต้องไม่หาย!"}'

# ดู notes
curl http://localhost:3000/api/notes

# ลบและสร้าง database container ใหม่
docker rm -f note-db

docker run -d --name note-db \
  --network note-network \
  -e POSTGRES_USER=noteuser \
  -e POSTGRES_PASSWORD=notepass \
  -e POSTGRES_DB=notedb \
  -v note-db-data:/var/lib/postgresql/data \
  postgres:16-alpine

# Restart app
docker restart note-app

# รอสักครู่
sleep 3

# ดู notes อีกครั้ง
curl http://localhost:3000/api/notes
# ✅ ยังมี 3 notes! ข้อมูลไม่หาย!
```

```
┌────────────────────────────────────────────────────────────────┐
│                   💾 Docker Volume                             │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Without Volume:                 With Volume:                  │
│  ─────────────────               ─────────────────             │
│                                                                │
│  ┌─────────────────┐            ┌─────────────────┐            │
│  │   Container     │            │   Container     │            │
│  │   ┌─────────┐   │            │   ┌─────────┐   │            │
│  │   │  Data   │   │            │   │  Data   │───┼──┐         │
│  │   └─────────┘   │            │   └─────────┘   │  │         │
│  └─────────────────┘            └─────────────────┘  │         │
│           │                                          │         │
│           ▼                              ┌───────────┴───┐     │
│       ❌ ลบ Container                    │  Named Volume │     │
│       = ข้อมูลหาย                          │  note-db-data │     │
│                                          └───────────────┘     │
│                                                  │             │
│                                                  ▼             │
│                                          ✅ ลบ Container       │
│                                          = ข้อมูลยังอยู่!           │
│                                                                │
│  Commands:                                                     │
│  docker volume create <name>    สร้าง volume                    │
│  docker volume ls               ดู volumes                      │
│  docker volume inspect <name>   ดูรายละเอียด                     │
│  docker volume rm <name>        ลบ volume                      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**✅ Part B Complete!**

```
┌─────────────────────────────────────────────────────────────────┐
│                    ✅ Part B Complete!                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  สิ่งที่เรียนรู้:                                                      │
│  ✅ รัน PostgreSQL Container                                     │
│  ✅ เข้าใจว่า localhost ไม่ทำงานข้าม containers                     │
│  ✅ สร้างและใช้ Docker Network                                    │
│  ✅ ใช้ Container name เป็น hostname (DNS)                        │
│  ✅ ใช้ Named Volume เก็บ persistent data                         │
│                                                                 │
│  ⚠️ ปัญหาที่ยังเหลือ:                                                │
│  • ต้องรัน docker run หลายคำสั่ง                                    │
│  • ต้องจำ options มากมาย                                         │
│  • ยากต่อการ share กับทีม                                          │
│                                                                 │
│  ➡️ Part C: Docker Compose รวมทุกอย่างใน 1 ไฟล์!                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Cleanup ก่อนไป Part C:**
```bash
docker rm -f note-app note-db
docker network rm note-network
# ไม่ต้องลบ volume (เก็บไว้ใช้ต่อได้)
```

---

## 🅲 Part C: Docker Compose

> **เป้าหมาย:** รวมทุกอย่างใน 1 ไฟล์ และจัดการด้วย 1 คำสั่ง

### Step 12: เขียน docker-compose.yml

**12.1 สร้าง docker-compose.yml ทีละส่วน:**

```bash
cat > docker-compose.yml << 'EOF'
# ============================================
# 📦 Docker Compose - Simple Note App
# ============================================
# Docker Compose รวมการตั้งค่า containers ทั้งหมดไว้ใน 1 ไฟล์
# แทนที่จะต้องพิมพ์ docker run หลายคำสั่ง

# Version ของ Compose file format
version: '3.8'

# ============================================
# Services = Containers ที่ต้องการรัน
# ============================================
services:
  
  # ------------------------------------------
  # Service 1: API (Node.js Application)
  # ------------------------------------------
  api:
    # build จาก Dockerfile ในโฟลเดอร์ปัจจุบัน
    build: .
    
    # ตั้งชื่อ container (optional)
    container_name: note-api
    
    # Port mapping (host:container)
    ports:
      - "3000:3000"
    
    # Environment variables
    environment:
      - NODE_ENV=development
      - PORT=3000
      - DB_HOST=db           # ใช้ service name!
      - DB_PORT=5432
      - DB_USER=noteuser
      - DB_PASSWORD=notepass
      - DB_NAME=notedb
    
    # Dependencies - รอ db พร้อมก่อน
    depends_on:
      db:
        condition: service_healthy
    
    # Restart policy
    restart: unless-stopped

  # ------------------------------------------
  # Service 2: Database (PostgreSQL)
  # ------------------------------------------
  db:
    # ใช้ official image
    image: postgres:16-alpine
    
    container_name: note-db
    
    # Environment variables
    environment:
      - POSTGRES_USER=noteuser
      - POSTGRES_PASSWORD=notepass
      - POSTGRES_DB=notedb
    
    # Volume สำหรับ persistent data
    volumes:
      - postgres_data:/var/lib/postgresql/data
    
    # Health check - ตรวจสอบว่า DB พร้อมใช้งาน
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U noteuser -d notedb"]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 10s
    
    restart: unless-stopped

# ============================================
# Volumes = Persistent Storage
# ============================================
volumes:
  postgres_data:
    # ใช้ default driver (local)
    # ข้อมูลจะเก็บไว้แม้ลบ container
EOF
```

**💡 อธิบาย docker-compose.yml:**

```
┌─────────────────────────────────────────────────────────────────┐
│                docker-compose.yml Structure                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  version: '3.8'     ← Compose file format version               │
│                                                                 │
│  services:          ← รายการ containers                         │
│    api:             ← ชื่อ service (= hostname ใน network)        │
│      build: .       ← build จาก Dockerfile                      │
│      ports: [...]   ← port mapping                              │
│      environment:   ← env vars                                  │
│      depends_on:    ← รอ service อื่นก่อน                          │
│                                                                 │
│    db:              ← service ที่ 2                               │
│      image: ...     ← ใช้ image จาก registry                     │
│      volumes: [...]                                             │
│      healthcheck:   ← ตรวจสอบว่าพร้อมใช้งาน                        │
│                                                                 │
│  volumes:           ← ประกาศ named volumes                      │
│    postgres_data:                                               │
│                                                                 │
│  networks:          ← (optional) custom networks                │
│                     ← ถ้าไม่ระบุ = สร้าง default network            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### Step 13: depends_on และ healthcheck

**ทำไมต้องมี healthcheck?**

```
┌────────────────────────────────────────────────────────────────┐
│                ⚠️ ปัญหา: depends_on อย่างเดียวไม่พอ                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  depends_on แบบธรรมดา:                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  1. Start db container                                  │   │
│  │  2. Start api container ทันที (ไม่รอ DB พร้อม)              │   │
│  │  3. ❌ API พยายามเชื่อมต่อ DB ที่ยังไม่พร้อม = Error!           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                │
│  depends_on + healthcheck:                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  1. Start db container                                  │   │
│  │  2. รอ healthcheck ผ่าน (DB พร้อมรับ connection)           │   │
│  │  3. Start api container                                 │   │
│  │  4. ✅ API เชื่อมต่อ DB สำเร็จ!                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                │
│  condition: service_healthy                                    │
│  = รอจนกว่า healthcheck จะผ่าน                                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

### Step 14: Environment Variables ด้วย .env file

**14.1 สร้าง .env file:**

```bash
cat > .env << 'EOF'
# ============================================
# 🔐 Environment Variables
# ============================================
# ไฟล์นี้เก็บ configuration ที่อาจเปลี่ยนแปลง
# ⚠️ อย่า commit .env เข้า Git!

# Node.js
NODE_ENV=development

# Database
DB_HOST=db
DB_PORT=5432
DB_USER=noteuser
DB_PASSWORD=notepass
DB_NAME=notedb

# PostgreSQL
POSTGRES_USER=noteuser
POSTGRES_PASSWORD=notepass
POSTGRES_DB=notedb
EOF
```

**14.2 สร้าง .env.example (สำหรับ commit เข้า Git):**

```bash
cat > .env.example << 'EOF'
# ============================================
# 🔐 Environment Variables Template
# ============================================
# Copy ไฟล์นี้เป็น .env แล้วใส่ค่าจริง

NODE_ENV=development

DB_HOST=db
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database

POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
EOF
```

**14.3 อัพเดท docker-compose.yml ใช้ .env:**

```bash
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  api:
    build: .
    container_name: note-api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=${NODE_ENV}
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

  db:
    image: postgres:16-alpine
    container_name: note-db
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
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

**14.4 อัพเดท .gitignore:**

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Environment
.env
.env.local
.env.*.local

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

---

### Step 15: Docker Compose Commands

**15.1 Start ทุก services:**

```bash
# Build และ start ทุก services
docker compose up -d

# ผลลัพธ์:
# [+] Running 3/3
#  ✔ Network simple-note-app_default  Created
#  ✔ Container note-db                Healthy
#  ✔ Container note-api               Started
```

**15.2 ดู status:**

```bash
# ดู services ที่รันอยู่
docker compose ps

# ผลลัพธ์:
# NAME        IMAGE                     SERVICE   CREATED         STATUS                   PORTS
# note-api    simple-note-app-api       api       30 seconds ago  Up 25 seconds            0.0.0.0:3000->3000/tcp
# note-db     postgres:16-alpine        db        35 seconds ago  Up 30 seconds (healthy)  5432/tcp
```

**15.3 ดู logs:**

```bash
# ดู logs ทุก services
docker compose logs

# ดู logs เฉพาะ service
docker compose logs api
docker compose logs db

# Follow logs
docker compose logs -f
docker compose logs -f api
```

**15.4 ทดสอบ API:**

```bash
# Health check
curl http://localhost:3000/health

# ดู notes
curl http://localhost:3000/api/notes

# เพิ่ม note
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Note จาก Compose","content":"Docker Compose ง่ายมาก!"}'
```

**15.5 Stop และ Cleanup:**

```bash
# หยุดทุก services
docker compose stop

# หยุดและลบ containers
docker compose down

# หยุด ลบ containers และ volumes (⚠️ ข้อมูลหาย!)
docker compose down -v

# หยุด ลบ ทั้ง containers, volumes, และ images
docker compose down -v --rmi all
```

```
┌─────────────────────────────────────────────────────────────────┐
│              📋 Docker Compose Commands Cheatsheet              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  START/STOP                                                     │
│  ─────────────────────────────────────────────────────          │
│  docker compose up -d        Start all (detached)               │
│  docker compose up --build   Start + rebuild images             │
│  docker compose stop         Stop all                           │
│  docker compose start        Start stopped containers           │
│  docker compose restart      Restart all                        │
│                                                                 │
│  CLEANUP                                                        │
│  ─────────────────────────────────────────────────────          │
│  docker compose down         Stop + remove containers           │
│  docker compose down -v      + remove volumes                   │
│  docker compose down --rmi all  + remove images                 │
│                                                                 │
│  MONITORING                                                     │
│  ─────────────────────────────────────────────────────          │
│  docker compose ps           List services                      │
│  docker compose logs         View logs                          │
│  docker compose logs -f      Follow logs                        │
│  docker compose top          Show processes                     │
│                                                                 │
│  DEBUGGING                                                      │
│  ─────────────────────────────────────────────────────          │
│  docker compose exec api sh  Shell into service                 │
│  docker compose config       Validate & view config             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ Workshop Summary

```
┌─────────────────────────────────────────────────────────────────┐
│               🎉 WORKSHOP 1 COMPLETE!                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📁 โครงสร้างโปรเจกต์สุดท้าย:                                       │
│                                                                 │
│  simple-note-app/                                               │
│  ├── docker-compose.yml    ← Main orchestration                 │
│  ├── Dockerfile            ← Build instructions                 │
│  ├── .dockerignore         ← Exclude files                      │
│  ├── .env                  ← Environment variables              │
│  ├── .env.example          ← Template (commit นี้)                │
│  ├── .gitignore            ← Git ignore                         │
│  ├── package.json                                               │
│  └── server.js             ← Node.js app                        │
│                                                                 │
│  ✅ สิ่งที่เรียนรู้:                                                   │
│  • Part A: Dockerfile, Build, Run, Debug, Bind Mount            │
│  • Part B: PostgreSQL, Network, Volume                          │
│  • Part C: Docker Compose, depends_on, healthcheck, .env        │
│                                                                 │
│  🎯 พร้อมสำหรับ Week 6 Lab!                                       │
│  ใน Lab จะทำ N-Tier Architecture ที่ซับซ้อนกว่า:                     │
│  • Nginx (Reverse Proxy + SSL)                                  │
│  • Node.js API (Layered Architecture)                           │
│  • PostgreSQL (Database)                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📚 Quick Reference

### Dockerfile Instructions

| Instruction | Description | Example |
|-------------|-------------|---------|
| `FROM` | Base image | `FROM node:20-alpine` |
| `WORKDIR` | Working directory | `WORKDIR /app` |
| `COPY` | Copy files | `COPY package.json ./` |
| `RUN` | Run command (build time) | `RUN npm install` |
| `EXPOSE` | Document port | `EXPOSE 3000` |
| `CMD` | Default command (run time) | `CMD ["node", "server.js"]` |
| `ENV` | Set environment variable | `ENV NODE_ENV=production` |

### Docker CLI Commands

| Command | Description |
|---------|-------------|
| `docker build -t name .` | Build image |
| `docker run -d --name c -p 3000:3000 image` | Run container |
| `docker ps` | List running containers |
| `docker logs container` | View logs |
| `docker exec -it container sh` | Shell into container |
| `docker stop container` | Stop container |
| `docker rm container` | Remove container |
| `docker network create name` | Create network |
| `docker volume create name` | Create volume |

### docker-compose.yml Structure

```yaml
version: '3.8'

services:
  service-name:
    build: .              # or image: image-name
    ports:
      - "host:container"
    environment:
      - KEY=value
    volumes:
      - name:/path
    depends_on:
      other-service:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "command"]
      interval: 5s

volumes:
  name:
```

---

**ต่อไป:** Workshop 2 - Team Development Simulation 🚀
