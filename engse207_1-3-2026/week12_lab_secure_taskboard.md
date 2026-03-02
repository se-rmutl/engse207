# 🔐 คู่มือปฏิบัติการ ENGSE207 — สัปดาห์ที่ 12
## Secure Task Board: เพิ่ม Security Architecture ด้วย JWT + Auth Service

**สัปดาห์:** 12 | **ระยะเวลา:** 3 ชั่วโมง | **ระดับความยาก:** ⭐⭐⭐⭐

> 🔗 **ต่อเนื่องจาก:** Week 6 (N-Tier Docker) → Week 7 (Cloud Deploy) → **Week 12 (Secure Architecture)**

---

## 📋 สารบัญ

1. [วัตถุประสงค์การเรียนรู้](#-วัตถุประสงค์การเรียนรู้)
2. [ภาพรวมสถาปัตยกรรม: จาก Week 7 สู่ Week 12](#-ภาพรวมสถาปัตยกรรม)
3. [ทฤษฎีสั้น: JWT คืออะไร?](#-ทฤษฎีสั้น-jwt-คืออะไร)
4. [Part 1: เตรียม Project Structure](#part-1-เตรียม-project-structure-20-นาที)
5. [Part 2: สร้าง Auth Service](#part-2-สร้าง-auth-service-40-นาที)
6. [Part 3: สร้าง User Service](#part-3-สร้าง-user-service-20-นาที)
7. [Part 4: ปรับปรุง Task Service (เพิ่ม JWT Guard)](#part-4-ปรับปรุง-task-service-20-นาที)
8. [Part 5: ปรับปรุง Nginx (API Gateway + Rate Limit)](#part-5-ปรับปรุง-nginx-20-นาที)
9. [Part 6: Structured Logging ด้วย Winston](#part-6-structured-logging-ด้วย-winston-15-นาที)
10. [Part 7: รัน Docker Compose ทั้งระบบ](#part-7-รัน-docker-compose-10-นาที)
11. [Part 8: Security Test Cases](#part-8-security-test-cases-25-นาที)
12. [Part 9: ดู Logs และสรุปผล](#part-9-ดู-logs-และสรุปผล-10-นาที)
13. [Draw.io Architecture Diagrams](#-drawio-architecture-diagrams)
14. [Challenge Activities](#-challenge-activities)
15. [ส่งงาน Git](#-ส่งงาน-git)
16. [สรุปและ Reflection](#-สรุปและ-reflection)

---

## 🎯 วัตถุประสงค์การเรียนรู้

| ✅ | วัตถุประสงค์ | CLO |
|---|------------|-----|
| ☐ | ออกแบบและนำ Auth Service + JWT เข้าสถาปัตยกรรม Microservices ได้ | CLO5, CLO6 |
| ☐ | เข้าใจ Authentication Flow ว่า Token ไหลอย่างไรระหว่าง Services | CLO3 |
| ☐ | ทดสอบ Security โดยเปรียบเทียบ มี/ไม่มี Token ในแต่ละ Endpoint | CLO7 |
| ☐ | เพิ่ม Structured Logging เพื่อ Audit Trail | CLO14 |
| ☐ | ปรับปรุง C4 C2 Diagram ให้สะท้อน Security Components | CLO6 |
| ☐ | เขียน ADR (Architecture Decision Record) สำหรับ Security | CLO7 |

---

## 🔄 ภาพรวมสถาปัตยกรรม

### Week 7 → Week 12: เพิ่ม Security Layer

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 การพัฒนา Architecture จาก Week 7 ถึง Week 12                  │
├───────────────────────────┬─────────────────────────────────────────────────┤
│      WEEK 7 (ไม่มี Security)│          WEEK 12 (Security Architecture)        │
├───────────────────────────┼─────────────────────────────────────────────────┤
│                           │                                                 │
│   🌐 Internet             │   🌐 Internet                                   │
│        │                  │        │                                        │
│        ▼                  │        ▼                                        │
│   ┌─────────┐             │   ┌─────────────────────────────┐               │
│   │  Nginx  │ ← ไม่กรอง    │   │  Nginx (API Gateway)        │               │
│   │  :443   │             │   │  • Rate Limiting 100r/min   │               │
│   └────┬────┘             │   │  • Basic WAF rules          │               │
│        │                  │   │  • Route to services        │               │
│        ▼                  │   └──┬──────────┬──────────┬────┘               │
│   ┌─────────┐             │      │          │          │                    │
│   │  Task   │ ← ใครก็เรียก  │      ▼          ▼          ▼                    │
│   │ Service │   ได้!       │  ┌───────┐  ┌───────┐  ┌───────┐                │
│   └────┬────┘             │  │ Auth  │  │ Task  │  │ User  │                │
│        │                  │  │Service│  │Service│  │Service│                │
│        ▼                  │  └───┬───┘  └───┬───┘  └───┬───┘                │
│   ┌─────────┐             │      │          │          │                    │
│   │Postgres │             │      └─────┬────┘──────────┘                    │
│   │   DB    │             │            │                                    │
│   └─────────┘             │            ▼                                    │
│                           │       ┌─────────┐                               │
│   ⚠️ ปัญหา:                │       │Postgres │ ← เข้าถึงจาก Docker Network     │
│   • ใครก็เรียก API ได้       │       │   DB    │   เท่านั้น                       │
│   • ไม่รู้ว่าใคร Request      │       └─────────┘                               │
│   • ไม่มี Log ที่ตรวจสอบได้    │                                                 │
│                           │   ✅ แก้ปัญหา:                                    │
│                           │   • ทุก Request ต้องมี JWT Token                   │
│                           │   • Auth Service ออก Token ให้                   │
│                           │   • Task/User Service ตรวจสอบ Token             │
│                           │   • Structured Logs ทุก Request                  │
└───────────────────────────┴─────────────────────────────────────────────────┘
```

### สถาปัตยกรรม Task Board Week 12 (C4 C2 — Container Diagram ที่ปรับปรุง)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  C4 Container Diagram (C2) — Week 12                        │
│                  Task Board: Security Architecture                          │
└─────────────────────────────────────────────────────────────────────────────┘

                         ╔════════════════╗
                         ║   👤 Browser   ║  External User
                         ║   (User/Admin) ║
                         ╚═══════╤════════╝
                                 │ HTTPS :443
                  ┌──────────────▼──────────────────────────────────────────┐
                  │         🐳 Docker Network: task-net                     │
                  │                                                         │
                  │  ┌──────────────────────────────────────────────────┐   │
                  │  │  🛡️ Nginx (API Gateway + Rate Limiter)           │   │
                  │  │  Port: 443 (external)                            │   │
                  │  │  • Route /api/auth  → Auth Service :3001         │   │
                  │  │  • Route /api/tasks → Task Service :3002         │   │
                  │  │  • Route /api/users → User Service :3003         │   │
                  │  │  • Rate Limit: 100 req/min per IP                │   │
                  │  └────┬───────────────┬───────────────┬─────────────┘   │
                  │       │               │               │                 │
                  │  ┌────▼─────┐   ┌─────▼──────┐   ┌────▼────┐            │
                  │  │  Auth    │   │   Task     │   │  User   │            │
                  │  │ Service  │   │  Service   │   │ Service │            │
                  │  │ :3001    │   │  :3002     │   │ :3003   │            │
                  │  │          │   │            │   │         │            │
                  │  │• Login   │   │• CRUD Task │   │• Profile│            │
                  │  │• Register│   │• Auth Check│   │• Roles  │            │
                  │  │• JWT     │   │• Validate  │   │• Search │            │
                  │  │• Refresh │   │  Token     │   │         │            │
                  │  └────┬─────┘   └─────┬──────┘   └────┬────┘            │
                  │       │               │               │                 │
                  │       └───────────────┴───────────────┘                 │
                  │                       │                                 │
                  │               ┌───────▼───────┐                         │
                  │               │  🗄️ PostgreSQL│                         │
                  │               │  Port: 5432   │                         │
                  │               │  (Internal)   │                         │
                  │               │  • users DB   │                         │
                  │               │  • tasks DB   │                         │
                  │               └───────────────┘                         │
                  │                                                         │
                  │  📝 Log Files (Docker Volume)                           │
                  │  /logs/auth.log, /logs/task.log, /logs/user.log         │
                  └─────────────────────────────────────────────────────────┘
```

### JWT Authentication Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    JWT Authentication Flow                               │
│                 (ลำดับการทำงานเมื่อ Login และ ใช้งาน API)                    │
└──────────────────────────────────────────────────────────────────────────┘

  Browser           Nginx             Auth Service      Task Service    PostgreSQL
    │                 │                  │                 │               │
    │── POST /api/auth/login ──────────► │                 │               │
    │   {email, password}                │                 │               │
    │                 │                  │                 │               │
    │                 │── Forward ──────►│                 │               │
    │                 │                  │── Query user ──────────────────►│
    │                 │                  │                 │               │
    │                 │                  │◄─ user record  ─────────────────┤
    │                 │                  │                 │               │
    │                 │                  │ bcrypt.compare(pass)            │
    │                 │                  │ jwt.sign(payload, secret)       │
    │                 │                  │                 │               │
    │◄── 200 OK ──────────────────────── │                 │               │
    │   {token: "eyJhbGci..."}           │                 │               │
    │                 │                  │                 │               │
    │  [เก็บ Token ใน localStorage]       │                 │               │
    │                 │                  │                 │               │
    │── GET /api/tasks ────────────────────────────────►   │               │
    │   Authorization: Bearer eyJhbGci...│                 │               │
    │                 │                  │                 │               │
    │                 │                  │            jwt.verify(token)    │
    │                 │                  │            ✅ Valid!            │
    │                 │                  │                 │               │
    │                 │                  │                 │── SELECT ────►│
    │                 │                  │                 │◄─ tasks data ─│
    │                 │                  │                 │               │
    │◄── 200 OK: [{tasks...}] ───────────────────────────  │               │
    │                 │                  │                 │               │
    │── GET /api/tasks ────────────────────────────────►   │               │
    │   (ไม่มี Token!)  │                  │                 │               │
    │                 │                  │            jwt.verify(null)     │
    │                 │                  │            ❌ Unauthorized!     │
    │◄── 401 Unauthorized ───────────────────────────────  │               │
```

---

## 📖 ทฤษฎีสั้น: JWT คืออะไร?

### JWT Structure (3 ส่วน)

```
┌──────────────────────────────────────────────────────────────────────┐
│                         JWT Token Structure                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9                                │
│  └──────────────────────────────────┘                                │
│                HEADER (Base64Url)                                    │
│  {"alg": "HS256", "typ": "JWT"}                                      │
│                                                                      │
│        .eyJzdWIiOiIxMjMiLCJuYW1lIjoiSm9obiIsInJvbGUiOiJ1c2VyIn0      │
│         └────────────────────────────────────────────────────────┘   │
│                        PAYLOAD (Base64Url)                           │
│  {"sub": "123", "name": "John", "role": "user", "exp": 1719000000}   │
│                                                                      │
│              .SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c            │
│               └──────────────────────────────────────────────┘       │
│                         SIGNATURE                                    │
│  HMACSHA256(base64(header) + "." + base64(payload), secret)          │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  🔑 สำคัญมาก:                                                         │
│  • Header + Payload ← ใครก็ Decode อ่านได้! (Base64 ไม่ใช่ Encrypt)       │
│  • Signature ← ตรวจสอบว่าไม่มีใครแก้ไข (ต้องมี Secret Key)                 │
│  • ห้ามใส่ข้อมูลลับใน Payload เช่น Password!                               │
└──────────────────────────────────────────────────────────────────────┘
```

### วิธีที่ Services ตรวจสอบ Token

```
┌──────────────────────────────────────────────────────────────────────┐
│              Token Verification (ไม่ต้องถาม Auth Service!)             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Task Service รับ Request มีพร้อม Token:                                │
│                                                                      │
│  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIx...          │
│                                                                      │
│  ขั้นตอน Verify:                                                       │
│  1. แยก Token ออกจาก Header                                          │
│  2. jwt.verify(token, JWT_SECRET)                                    │
│     ├── ถ้า Signature ถูก + ยังไม่ Expired → ✅ ผ่าน                      │
│     └── ถ้า Signature ผิด หรือ Expired   → ❌ 401                       │
│  3. ดึง user_id และ role จาก payload                                  │
│  4. ตรวจสอบ Authorization (role-based)                               │
│                                                                      │
│  💡 ข้อดี: ไม่ต้อง Query Database ทุก Request (Stateless)                 │
│  💡 ข้อดี: Services ตรวจสอบ Token เองได้โดยไม่ต้องถาม Auth Service        │
│  ⚠️  ข้อเสีย: ถ้า Token รั่ว ใช้ได้จนกว่าจะ Expired                          │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Part 1: เตรียม Project Structure (20 นาที)

### โครงสร้าง Directory ทั้งหมด

```
task-board-secure/                   ← Root Project (Week 12)
├── docker-compose.yml               ← Orchestrate ทุก service
├── .env                             ← Environment Variables (Secret!)
├── nginx/
│   ├── nginx.conf                   ← API Gateway + Rate Limiting
│   └── Dockerfile
├── auth-service/
│   ├── src/
│   │   ├── app.js
│   │   ├── routes/auth.js
│   │   ├── middleware/logger.js
│   │   └── db/database.js
│   ├── package.json
│   └── Dockerfile
├── task-service/
│   ├── src/
│   │   ├── app.js
│   │   ├── routes/tasks.js
│   │   ├── middleware/auth.js       ← JWT Verification Middleware
│   │   ├── middleware/logger.js
│   │   └── db/database.js
│   ├── package.json
│   └── Dockerfile
├── user-service/
│   ├── src/
│   │   ├── app.js
│   │   ├── routes/users.js
│   │   ├── middleware/auth.js
│   │   ├── middleware/logger.js
│   │   └── db/database.js
│   ├── package.json
│   └── Dockerfile
├── logs/                            ← Shared log volume
└── init-db/
    └── init.sql                     ← Database schema
```

### สร้าง Directory Structure

```bash
# สร้าง root project
mkdir -p task-board-secure
cd task-board-secure

# สร้าง directories
mkdir -p nginx
mkdir -p auth-service/src/{routes,middleware,db}
mkdir -p task-service/src/{routes,middleware,db}
mkdir -p user-service/src/{routes,middleware,db}
mkdir -p logs
mkdir -p init-db

echo "✅ สร้าง directory structure เรียบร้อย"
```

---

## Part 2: สร้าง Auth Service (40 นาที)

### 2.1 สร้าง Database Init Script

**ไฟล์: `init-db/init.sql`**

```sql
-- ===================================================
-- Task Board Secure — Database Schema
-- Week 12: เพิ่ม users table สำหรับ Authentication
-- ===================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,       -- bcrypt hash
    name        VARCHAR(255) NOT NULL,
    role        VARCHAR(50) DEFAULT 'member', -- 'admin' | 'member' | 'viewer'
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(500) NOT NULL,
    description TEXT,
    status      VARCHAR(50) DEFAULT 'TODO',  -- 'TODO' | 'IN_PROGRESS' | 'DONE'
    priority    VARCHAR(50) DEFAULT 'medium',
    created_by  INTEGER REFERENCES users(id),
    assigned_to INTEGER REFERENCES users(id),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs table (Security: บันทึกทุก Action)
CREATE TABLE IF NOT EXISTS audit_logs (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER,
    action      VARCHAR(255) NOT NULL,       -- 'LOGIN', 'CREATE_TASK', etc.
    resource    VARCHAR(255),
    ip_address  VARCHAR(50),
    status      VARCHAR(50),                 -- 'SUCCESS' | 'FAILED'
    detail      JSONB,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed: ข้อมูลเริ่มต้น (password = "password123" → bcrypt hash)
INSERT INTO users (email, password, name, role) VALUES
  ('admin@taskboard.com',
   '$2b$10$8K1p/a0dclxGCGSMFVuEsuAzlZ4mTvGBVJJhTdvr1r1RBL91VgcRq',
   'Admin User', 'admin'),
  ('member@taskboard.com',
   '$2b$10$8K1p/a0dclxGCGSMFVuEsuAzlZ4mTvGBVJJhTdvr1r1RBL91VgcRq',
   'Member User', 'member')
ON CONFLICT (email) DO NOTHING;

-- Seed: tasks เริ่มต้น
INSERT INTO tasks (title, description, status, priority, created_by) VALUES
  ('ออกแบบ UI หน้า Login', 'สร้าง wireframe และ prototype', 'TODO', 'high', 1),
  ('เขียน API Documentation', 'เขียน Swagger spec ครบทุก endpoint', 'IN_PROGRESS', 'medium', 1),
  ('ทดสอบ Security', 'ทำ Penetration test เบื้องต้น', 'TODO', 'high', 1)
ON CONFLICT DO NOTHING;
```

### 2.2 Auth Service — package.json

**ไฟล์: `auth-service/package.json`**

```json
{
  "name": "auth-service",
  "version": "1.0.0",
  "description": "Authentication Service for Task Board (Week 12)",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "winston": "^3.11.0",
    "morgan": "^1.10.0",
    "dotenv": "^16.3.1",
    "joi": "^17.11.0"
  }
}
```

### 2.3 Auth Service — Logger Middleware

**ไฟล์: `auth-service/src/middleware/logger.js`**

```javascript
// ============================================================
// Structured Logger ด้วย Winston
// บันทึก Log ในรูปแบบ JSON เพื่อให้ค้นหาและ analyze ได้ง่าย
// ============================================================
const winston = require('winston');
const path = require('path');

// กำหนด Log Format เป็น JSON
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()            // ← Output เป็น JSON
);

// สร้าง Logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'auth-service' },  // ← ทุก log รู้ว่ามาจาก service ไหน
  transports: [
    // เขียน Log ลง Console (ดูได้ผ่าน docker logs)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, service, ...meta }) => {
          return `${timestamp} [${service}] ${level}: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta) : ''
          }`;
        })
      )
    }),
    // เขียน Log ลงไฟล์ (mount ผ่าน Docker Volume)
    new winston.transports.File({
      filename: '/app/logs/auth-error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: '/app/logs/auth-combined.log'
    })
  ]
});

module.exports = logger;
```

### 2.4 Auth Service — Database Connection

**ไฟล์: `auth-service/src/db/database.js`**

```javascript
const { Pool } = require('pg');
const logger = require('../middleware/logger');

// PostgreSQL Connection Pool
const pool = new Pool({
  host:     process.env.DB_HOST || 'postgres',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'taskboard',
  user:     process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 10,            // สูงสุด 10 connections
  idleTimeoutMillis: 30000
});

// ทดสอบ connection เมื่อ start
pool.on('connect', () => {
  logger.info('PostgreSQL connected', { host: process.env.DB_HOST });
});

pool.on('error', (err) => {
  logger.error('PostgreSQL pool error', { error: err.message });
});

module.exports = pool;
```

### 2.5 Auth Service — Routes (หัวใจหลัก!)

**ไฟล์: `auth-service/src/routes/auth.js`**

```javascript
// ============================================================
// Auth Routes — Register, Login, Verify, Refresh Token
// ============================================================
const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const Joi     = require('joi');
const pool    = require('../db/database');
const logger  = require('../middleware/logger');
const router  = express.Router();

const JWT_SECRET          = process.env.JWT_SECRET || 'change-this-in-production';
const JWT_EXPIRES_IN      = process.env.JWT_EXPIRES_IN || '24h';
const JWT_REFRESH_SECRET  = process.env.JWT_REFRESH_SECRET || 'refresh-secret-change-this';

// ───────────────────────────────────────────────────────
// Validation Schemas (Joi)
// ───────────────────────────────────────────────────────
const registerSchema = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name:     Joi.string().min(2).max(100).required()
});

const loginSchema = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().required()
});

// ───────────────────────────────────────────────────────
// Helper: บันทึก Audit Log ลง Database
// ───────────────────────────────────────────────────────
async function auditLog(userId, action, resource, ip, status, detail = {}) {
  try {
    await pool.query(
      `INSERT INTO audit_logs (user_id, action, resource, ip_address, status, detail)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, action, resource, ip, status, JSON.stringify(detail)]
    );
  } catch (err) {
    logger.error('Failed to write audit log', { error: err.message });
  }
}

// ───────────────────────────────────────────────────────
// POST /api/auth/register — สมัครสมาชิก
// ───────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'];

  // 1. Validate Input
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    logger.warn('Register validation failed', { ip, error: error.message });
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password, name } = value;

  try {
    // 2. ตรวจสอบว่า Email ซ้ำหรือไม่
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      await auditLog(null, 'REGISTER_FAILED', 'users', ip, 'FAILED', { email, reason: 'duplicate email' });
      return res.status(409).json({ error: 'Email นี้มีผู้ใช้แล้ว' });
    }

    // 3. Hash Password (bcrypt cost factor = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. บันทึก User ลง Database
    const result = await pool.query(
      `INSERT INTO users (email, password, name, role)
       VALUES ($1, $2, $3, 'member')
       RETURNING id, email, name, role, created_at`,
      [email, hashedPassword, name]
    );

    const newUser = result.rows[0];

    // 5. บันทึก Audit Log
    await auditLog(newUser.id, 'REGISTER_SUCCESS', 'users', ip, 'SUCCESS', { email });

    logger.info('User registered', { userId: newUser.id, email });

    // 6. Response (ไม่ส่ง password กลับ!)
    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ',
      user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }
    });

  } catch (err) {
    logger.error('Register error', { error: err.message, ip });
    res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในระบบ' });
  }
});

// ───────────────────────────────────────────────────────
// POST /api/auth/login — เข้าสู่ระบบ → ได้รับ JWT Token
// ───────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const ip = req.ip || req.headers['x-forwarded-for'];

  // 1. Validate Input
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = value;

  try {
    // 2. หา User จาก Email
    const result = await pool.query(
      'SELECT id, email, password, name, role FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      // ⚠️ Security: ไม่บอกว่า email ไม่มีหรือ password ผิด
      //              บอกแค่ "ข้อมูลไม่ถูกต้อง" เพื่อป้องกัน Enumeration Attack
      await auditLog(null, 'LOGIN_FAILED', 'auth', ip, 'FAILED', { email, reason: 'user not found' });
      logger.warn('Login failed: user not found', { email, ip });
      return res.status(401).json({ error: 'Email หรือ Password ไม่ถูกต้อง' });
    }

    const user = result.rows[0];

    // 3. ตรวจสอบ Password ด้วย bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      await auditLog(user.id, 'LOGIN_FAILED', 'auth', ip, 'FAILED', { email, reason: 'wrong password' });
      logger.warn('Login failed: wrong password', { email, userId: user.id, ip });
      return res.status(401).json({ error: 'Email หรือ Password ไม่ถูกต้อง' });
    }

    // 4. สร้าง JWT Token
    const tokenPayload = {
      sub:   user.id,      // Subject (User ID)
      email: user.email,
      name:  user.name,
      role:  user.role
    };

    const accessToken = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'task-board-auth-service'
    });

    const refreshToken = jwt.sign(
      { sub: user.id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // 5. บันทึก Audit Log
    await auditLog(user.id, 'LOGIN_SUCCESS', 'auth', ip, 'SUCCESS', { email });
    logger.info('User logged in', { userId: user.id, email, role: user.role, ip });

    // 6. Response
    res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      accessToken,
      refreshToken,
      user: {
        id:    user.id,
        email: user.email,
        name:  user.name,
        role:  user.role
      }
    });

  } catch (err) {
    logger.error('Login error', { error: err.message, ip });
    res.status(500).json({ error: 'เกิดข้อผิดพลาดภายในระบบ' });
  }
});

// ───────────────────────────────────────────────────────
// GET /api/auth/verify — ตรวจสอบ Token ว่า Valid หรือไม่
// (ใช้โดย Services อื่น หรือ Frontend)
// ───────────────────────────────────────────────────────
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ valid: false, error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      valid: true,
      user: {
        id:    decoded.sub,
        email: decoded.email,
        name:  decoded.name,
        role:  decoded.role
      },
      expiresAt: new Date(decoded.exp * 1000).toISOString()
    });
  } catch (err) {
    logger.warn('Token verification failed', { error: err.message });
    res.status(401).json({ valid: false, error: err.message });
  }
});

// ───────────────────────────────────────────────────────
// POST /api/auth/refresh — ต่ออายุ Access Token
// ───────────────────────────────────────────────────────
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    // หา User จาก Database (ตรวจสอบว่ายังมี user อยู่)
    const result = await pool.query(
      'SELECT id, email, name, role FROM users WHERE id = $1',
      [decoded.sub]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // ออก Access Token ใหม่
    const newAccessToken = jwt.sign(
      { sub: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN, issuer: 'task-board-auth-service' }
    );

    logger.info('Token refreshed', { userId: user.id });

    res.json({ accessToken: newAccessToken });

  } catch (err) {
    logger.warn('Refresh token failed', { error: err.message });
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// GET /api/auth/me — ดูข้อมูลตัวเอง (ต้องมี Token)
router.get('/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      id:    decoded.sub,
      email: decoded.email,
      name:  decoded.name,
      role:  decoded.role
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
```

### 2.6 Auth Service — Main App

**ไฟล์: `auth-service/src/app.js`**

```javascript
require('dotenv').config();
const express = require('express');
const morgan  = require('morgan');
const logger  = require('./middleware/logger');
const authRoutes = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 3001;

// ───────────────────────────────────────────────────────
// Middleware
// ───────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));  // จำกัด body size

// HTTP Request Logging (morgan → winston)
app.use(morgan('combined', {
  stream: { write: (msg) => logger.http(msg.trim()) }
}));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// ───────────────────────────────────────────────────────
// Routes
// ───────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

// ───────────────────────────────────────────────────────
// Start Server
// ───────────────────────────────────────────────────────
app.listen(PORT, () => {
  logger.info(`Auth Service started`, { port: PORT, env: process.env.NODE_ENV });
});

module.exports = app;
```

### 2.7 Auth Service — Dockerfile

**ไฟล์: `auth-service/Dockerfile`**

```dockerfile
FROM node:20-alpine

# ติดตั้ง dependencies น้อยที่สุดเพื่อความปลอดภัย
WORKDIR /app

# Copy package files ก่อน (ใช้ Docker cache)
COPY package*.json ./
RUN npm install --omit=dev

# Copy source code
COPY src/ ./src/

# สร้าง log directory
RUN mkdir -p /app/logs

# ❌ ห้ามรันด้วย root user → Security Best Practice
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost:3001/health || exit 1

CMD ["node", "src/app.js"]
```

---

## Part 3: สร้าง User Service (20 นาที)

### 3.1 User Service — package.json

**ไฟล์: `user-service/package.json`**

```json
{
  "name": "user-service",
  "version": "1.0.0",
  "main": "src/app.js",
  "scripts": { "start": "node src/app.js" },
  "dependencies": {
    "express":       "^4.18.2",
    "pg":            "^8.11.3",
    "jsonwebtoken":  "^9.0.2",
    "winston":       "^3.11.0",
    "morgan":        "^1.10.0",
    "dotenv":        "^16.3.1"
  }
}
```

### 3.2 JWT Auth Middleware (ใช้ร่วมกันทั้ง Task และ User Service)

**ไฟล์: `user-service/src/middleware/auth.js`** (และ copy ให้ task-service ด้วย)

```javascript
// ============================================================
// JWT Authentication & Authorization Middleware
// ใช้ร่วมกันทั้ง Task Service และ User Service
// ============================================================
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-in-production';

// ───────────────────────────────────────────────────────
// authenticate: ตรวจสอบว่า Token Valid
// → ถ้าผ่าน: req.user = { id, email, name, role }
// → ถ้าไม่ผ่าน: 401 Unauthorized
// ───────────────────────────────────────────────────────
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      error: 'Authentication required',
      hint:  'Add "Authorization: Bearer <token>" header'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // ใส่ข้อมูล user ลงใน request object
    req.user = {
      id:    decoded.sub,
      email: decoded.email,
      name:  decoded.name,
      role:  decoded.role
    };
    next();  // ผ่าน! ไปต่อ
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', hint: 'Please login again' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(401).json({ error: 'Token verification failed' });
  }
}

// ───────────────────────────────────────────────────────
// authorize(roles): ตรวจสอบ Role ว่ามีสิทธิ์หรือไม่
// ใช้หลัง authenticate เสมอ
// ตัวอย่าง: router.delete('/:id', authenticate, authorize(['admin']), handler)
// ───────────────────────────────────────────────────────
function authorize(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden: insufficient permissions',
        yourRole:     req.user.role,
        requiredRoles: allowedRoles
      });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
```

### 3.3 User Service — Routes

**ไฟล์: `user-service/src/routes/users.js`**

```javascript
const express = require('express');
const pool    = require('../db/database');
const logger  = require('../middleware/logger');
const { authenticate, authorize } = require('../middleware/auth');
const router  = express.Router();

// GET /api/users — ดูรายชื่อ users ทั้งหมด (admin เท่านั้น)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, role, created_at FROM users ORDER BY created_at DESC'
    );
    logger.info('Users listed', { requestedBy: req.user.email, count: result.rows.length });
    res.json({ users: result.rows, total: result.rows.length });
  } catch (err) {
    logger.error('Error listing users', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/profile — ดูข้อมูลตัวเอง (ทุก role)
router.get('/profile', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    logger.error('Error getting profile', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/:id — ดูข้อมูล user คนใดคนหนึ่ง (admin หรือ เจ้าของ)
router.get('/:id', authenticate, async (req, res) => {
  const targetId = parseInt(req.params.id);

  // ตรวจสอบสิทธิ์: admin ดูได้ทุกคน, member ดูได้แค่ตัวเอง
  if (req.user.role !== 'admin' && req.user.id !== targetId) {
    return res.status(403).json({ error: 'You can only view your own profile' });
  }

  try {
    const result = await pool.query(
      'SELECT id, email, name, role, created_at FROM users WHERE id = $1',
      [targetId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    logger.error('Error getting user', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/users/:id/role — เปลี่ยน role (admin เท่านั้น)
router.patch('/:id/role', authenticate, authorize(['admin']), async (req, res) => {
  const { role } = req.body;
  const validRoles = ['admin', 'member', 'viewer'];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: `Invalid role. Must be: ${validRoles.join(', ')}` });
  }

  try {
    const result = await pool.query(
      'UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2 RETURNING id, email, name, role',
      [role, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    logger.info('User role changed', {
      targetUser: result.rows[0].email,
      newRole:    role,
      changedBy:  req.user.email
    });
    res.json({ message: 'Role updated', user: result.rows[0] });
  } catch (err) {
    logger.error('Error updating role', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

### 3.4 User Service — app.js และ Dockerfile

**ไฟล์: `user-service/src/db/database.js`** — เหมือนกับ auth-service (copy ได้)

**ไฟล์: `user-service/src/middleware/logger.js`** — เหมือนกันแต่เปลี่ยน service name:
```javascript
// เหมือน auth-service/src/middleware/logger.js แต่เปลี่ยน:
defaultMeta: { service: 'user-service' },
// และ filename:
filename: '/app/logs/user-combined.log'
```

**ไฟล์: `user-service/src/app.js`**

```javascript
require('dotenv').config();
const express = require('express');
const morgan  = require('morgan');
const logger  = require('./middleware/logger');
const userRoutes = require('./routes/users');

const app  = express();
const PORT = process.env.PORT || 3003;

app.use(express.json({ limit: '10kb' }));
app.use(morgan('combined', { stream: { write: (msg) => logger.http(msg.trim()) } }));

app.use('/api/users', userRoutes);
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message });
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => logger.info(`User Service started`, { port: PORT }));
```

**ไฟล์: `user-service/Dockerfile`** — เหมือน auth-service แต่เปลี่ยน PORT เป็น 3003

---

## Part 4: ปรับปรุง Task Service (20 นาที)

### 4.1 Task Service — package.json

**ไฟล์: `task-service/package.json`**

```json
{
  "name": "task-service",
  "version": "1.0.0",
  "main": "src/app.js",
  "scripts": { "start": "node src/app.js" },
  "dependencies": {
    "express":       "^4.18.2",
    "pg":            "^8.11.3",
    "jsonwebtoken":  "^9.0.2",
    "winston":       "^3.11.0",
    "morgan":        "^1.10.0",
    "dotenv":        "^16.3.1",
    "joi":           "^17.11.0"
  }
}
```

### 4.2 Task Service — Routes (พร้อม Authorization)

**ไฟล์: `task-service/src/routes/tasks.js`**

```javascript
// ============================================================
// Task Routes — CRUD พร้อม JWT Protection
// ============================================================
const express = require('express');
const Joi     = require('joi');
const pool    = require('../db/database');
const logger  = require('../middleware/logger');
const { authenticate, authorize } = require('../middleware/auth');
const router  = express.Router();

// Validation Schema
const taskSchema = Joi.object({
  title:       Joi.string().min(1).max(500).required(),
  description: Joi.string().max(2000).optional().allow(''),
  status:      Joi.string().valid('TODO', 'IN_PROGRESS', 'DONE').default('TODO'),
  priority:    Joi.string().valid('low', 'medium', 'high').default('medium'),
  assigned_to: Joi.number().integer().optional().allow(null)
});

// ─────────────────────────────────────────────────────────────
// GET /api/tasks — ดู Task ทั้งหมด
// ✅ ต้องมี Token (member, admin, viewer ดูได้)
// ─────────────────────────────────────────────────────────────
router.get('/', authenticate, async (req, res) => {
  try {
    let query, params;

    if (req.user.role === 'admin') {
      // Admin เห็น task ทั้งหมด
      query  = `SELECT t.*, u.name as creator_name FROM tasks t
                LEFT JOIN users u ON t.created_by = u.id ORDER BY t.created_at DESC`;
      params = [];
    } else {
      // Member/Viewer เห็นเฉพาะ task ที่ตัวเองสร้าง หรือถูก assign
      query  = `SELECT t.*, u.name as creator_name FROM tasks t
                LEFT JOIN users u ON t.created_by = u.id
                WHERE t.created_by = $1 OR t.assigned_to = $1
                ORDER BY t.created_at DESC`;
      params = [req.user.id];
    }

    const result = await pool.query(query, params);
    logger.info('Tasks retrieved', { userId: req.user.id, role: req.user.role, count: result.rows.length });
    res.json({ tasks: result.rows, total: result.rows.length });

  } catch (err) {
    logger.error('Error getting tasks', { error: err.message, userId: req.user.id });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/tasks/:id — ดู Task เดียว
// ─────────────────────────────────────────────────────────────
router.get('/:id', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, u.name as creator_name FROM tasks t
       LEFT JOIN users u ON t.created_by = u.id WHERE t.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = result.rows[0];

    // Authorization: admin เห็นทั้งหมด, member เห็นเฉพาะของตัวเอง
    if (req.user.role !== 'admin' &&
        task.created_by !== req.user.id &&
        task.assigned_to !== req.user.id) {
      return res.status(403).json({ error: 'You do not have access to this task' });
    }

    res.json({ task });
  } catch (err) {
    logger.error('Error getting task', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/tasks — สร้าง Task ใหม่
// ✅ member และ admin สร้างได้ | ❌ viewer สร้างไม่ได้
// ─────────────────────────────────────────────────────────────
router.post('/', authenticate, authorize(['admin', 'member']), async (req, res) => {
  const { error, value } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, status, priority, created_by, assigned_to)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [value.title, value.description, value.status, value.priority,
       req.user.id, value.assigned_to || null]
    );

    const task = result.rows[0];
    logger.info('Task created', { taskId: task.id, title: task.title, createdBy: req.user.email });
    res.status(201).json({ message: 'Task created', task });

  } catch (err) {
    logger.error('Error creating task', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─────────────────────────────────────────────────────────────
// PATCH /api/tasks/:id — อัปเดต Task
// ✅ เจ้าของ task หรือ admin อัปเดตได้ | ❌ viewer อัปเดตไม่ได้
// ─────────────────────────────────────────────────────────────
router.patch('/:id', authenticate, authorize(['admin', 'member']), async (req, res) => {
  const taskId = parseInt(req.params.id);

  try {
    // หา task ก่อน
    const existing = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = existing.rows[0];

    // Authorization: member แก้ได้เฉพาะ task ของตัวเอง
    if (req.user.role === 'member' && task.created_by !== req.user.id) {
      logger.warn('Unauthorized task update attempt', {
        userId: req.user.id,
        taskId,
        taskOwner: task.created_by
      });
      return res.status(403).json({ error: 'You can only update your own tasks' });
    }

    // อัปเดตเฉพาะ field ที่ส่งมา
    const allowedFields = ['title', 'description', 'status', 'priority', 'assigned_to'];
    const updates = [];
    const values  = [];
    let paramCount = 1;

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = $${paramCount}`);
        values.push(req.body[field]);
        paramCount++;
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push(`updated_at = NOW()`);
    values.push(taskId);

    const result = await pool.query(
      `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    logger.info('Task updated', { taskId, updatedBy: req.user.email, fields: Object.keys(req.body) });
    res.json({ message: 'Task updated', task: result.rows[0] });

  } catch (err) {
    logger.error('Error updating task', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─────────────────────────────────────────────────────────────
// DELETE /api/tasks/:id — ลบ Task
// ✅ admin ลบได้ทุก task | member ลบได้เฉพาะของตัวเอง
// ❌ viewer ลบไม่ได้เลย
// ─────────────────────────────────────────────────────────────
router.delete('/:id', authenticate, authorize(['admin', 'member']), async (req, res) => {
  const taskId = parseInt(req.params.id);

  try {
    const existing = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = existing.rows[0];

    if (req.user.role === 'member' && task.created_by !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own tasks' });
    }

    await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);

    logger.info('Task deleted', { taskId, deletedBy: req.user.email, role: req.user.role });
    res.json({ message: 'Task deleted successfully' });

  } catch (err) {
    logger.error('Error deleting task', { error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

### 4.3 Task Service — app.js

**ไฟล์: `task-service/src/app.js`**

```javascript
require('dotenv').config();
const express = require('express');
const morgan  = require('morgan');
const logger  = require('./middleware/logger');
const taskRoutes = require('./routes/tasks');

const app  = express();
const PORT = process.env.PORT || 3002;

app.use(express.json({ limit: '10kb' }));
app.use(morgan('combined', { stream: { write: (msg) => logger.http(msg.trim()) } }));

app.use('/api/tasks', taskRoutes);
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'task-service', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message });
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => logger.info(`Task Service started`, { port: PORT }));
```

---

## Part 5: ปรับปรุง Nginx (20 นาที)

### API Gateway + Rate Limiting

**ไฟล์: `nginx/nginx.conf`**

```nginx
# ============================================================
# Nginx Configuration — API Gateway + Security
# Week 12: เพิ่ม Rate Limiting และ Security Headers
# ============================================================

# Rate Limit Zone: จำกัด request จาก IP เดียวกัน
# 10m = พื้นที่ memory 10MB (~160,000 IPs)
# rate=100r/m = สูงสุด 100 request ต่อนาที ต่อ IP
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=100r/m;

# Rate Limit Zone สำหรับ Auth: เข้มงวดกว่า (ป้องกัน Brute Force)
# rate=10r/m = Login ได้ 10 ครั้งต่อนาที
limit_req_zone $binary_remote_addr zone=auth_limit:10m rate=10r/m;

upstream auth_service  { server auth-service:3001; }
upstream task_service  { server task-service:3002; }
upstream user_service  { server user-service:3003; }

server {
    listen 80;
    server_name localhost;

    # ────────────────────────────────────────────────
    # Security Headers (ป้องกัน Common Web Attacks)
    # ────────────────────────────────────────────────
    add_header X-Frame-Options           "DENY"           always;
    add_header X-Content-Type-Options    "nosniff"        always;
    add_header X-XSS-Protection          "1; mode=block"  always;
    add_header Referrer-Policy           "no-referrer"    always;
    add_header Content-Security-Policy   "default-src 'self'" always;

    # ซ่อน Nginx version (ป้องกันการรู้ version)
    server_tokens off;

    # ────────────────────────────────────────────────
    # Frontend: Static Files
    # ────────────────────────────────────────────────
    location / {
        root   /usr/share/nginx/html;
        index  index.html;
        try_files $uri $uri/ /index.html;
    }

    # ────────────────────────────────────────────────
    # Auth Service Routes (Rate Limit: 10/min — เข้มงวด)
    # ────────────────────────────────────────────────
    location /api/auth/ {
        # Brute Force Protection: 10 requests/min, burst 5
        limit_req zone=auth_limit burst=5 nodelay;
        limit_req_status 429;  # Too Many Requests

        proxy_pass         http://auth_service;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   Connection        "";

        # Timeout settings
        proxy_connect_timeout 5s;
        proxy_read_timeout    10s;
    }

    # ────────────────────────────────────────────────
    # Task Service Routes (Rate Limit: 100/min)
    # ────────────────────────────────────────────────
    location /api/tasks/ {
        limit_req zone=api_limit burst=20 nodelay;
        limit_req_status 429;

        proxy_pass         http://task_service;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   Authorization     $http_authorization;  # ← ส่ง JWT ต่อ
        proxy_set_header   Connection        "";

        proxy_connect_timeout 5s;
        proxy_read_timeout    30s;
    }

    # ────────────────────────────────────────────────
    # User Service Routes (Rate Limit: 100/min)
    # ────────────────────────────────────────────────
    location /api/users/ {
        limit_req zone=api_limit burst=20 nodelay;
        limit_req_status 429;

        proxy_pass         http://user_service;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   Authorization     $http_authorization;
        proxy_set_header   Connection        "";

        proxy_connect_timeout 5s;
        proxy_read_timeout    30s;
    }

    # ────────────────────────────────────────────────
    # Health Check Endpoint
    # ────────────────────────────────────────────────
    location /health {
        access_log off;
        return 200 '{"status":"ok","service":"nginx-gateway"}';
        add_header Content-Type application/json;
    }

    # ────────────────────────────────────────────────
    # Block common malicious paths
    # ────────────────────────────────────────────────
    location ~* \.(env|git|sql|bak)$ {
        deny all;
        return 404;
    }

    # Custom Error Pages
    error_page 429 = @rate_limit_exceeded;
    location @rate_limit_exceeded {
        add_header Content-Type application/json;
        return 429 '{"error":"Too many requests. Please slow down.","code":429}';
    }

    error_page 502 = @bad_gateway;
    location @bad_gateway {
        add_header Content-Type application/json;
        return 502 '{"error":"Service temporarily unavailable","code":502}';
    }
}
```

**ไฟล์: `nginx/Dockerfile`**

```dockerfile
FROM nginx:1.25-alpine

# ลบ default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config
COPY nginx.conf /etc/nginx/conf.d/taskboard.conf

# สร้าง frontend placeholder (ถ้ายังไม่มี)
RUN mkdir -p /usr/share/nginx/html
COPY --chown=nginx:nginx html/ /usr/share/nginx/html/ 2>/dev/null || true

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/health || exit 1
```

---

## Part 6: Structured Logging ด้วย Winston (15 นาที)

### แนวคิด: ทำไมต้องมี Structured Logs?

```
┌──────────────────────────────────────────────────────────────────┐
│              Unstructured vs Structured Logs                     │
├───────────────────────┬──────────────────────────────────────────┤
│  ❌ Plain Text Log    │  ✅ Structured JSON Log                  │
├───────────────────────┼──────────────────────────────────────────┤
│                       │                                          │
│  [INFO] User 5 logged │  {                                       │
│  in from 192.168.1.1  │    "timestamp": "2025-01-10 10:30:00",   │
│                       │    "level": "info",                      │
│  [WARN] Failed login  │    "service": "auth-service",            │
│  attempt for user 5   │    "action": "LOGIN_SUCCESS",            │
│                       │    "userId": 5,                          │
│  → ค้นหายาก           │    "ip": "192.168.1.1"                    │
│  → Filter ยาก         │  }                                       │
│  → ไม่รู้ Context      │                                            │
│                       │  → grep, jq ค้นหาง่าย                      │
│                       │  → Filter ได้ทันที                          │
│                       │  → มี Context ครบ                         │
└───────────────────────┴──────────────────────────────────────────┘
```

### Log Viewer Script — ดู Logs แบบง่าย

**ไฟล์: `view-logs.sh`** (สำหรับ Student ใช้ดู Log ระหว่าง Lab)

```bash
#!/bin/bash
# ============================================================
# Log Viewer Script — Week 12 Lab Helper
# ใช้ดู Logs จาก Docker containers
# ============================================================

echo "╔═══════════════════════════════════════╗"
echo "║       Task Board Log Viewer           ║"
echo "╚═══════════════════════════════════════╝"
echo ""
echo "เลือกดู Log:"
echo "  1) Auth Service Logs (Real-time)"
echo "  2) Task Service Logs (Real-time)"
echo "  3) User Service Logs (Real-time)"
echo "  4) All Services (Real-time)"
echo "  5) ดู Error Logs เท่านั้น"
echo "  6) ดู Login Events"
echo "  7) ดู Failed Auth Attempts"
echo ""
read -p "เลือก (1-7): " choice

case $choice in
  1) docker logs -f task-board-secure-auth-service-1 2>&1 | grep --line-buffered . ;;
  2) docker logs -f task-board-secure-task-service-1 2>&1 | grep --line-buffered . ;;
  3) docker logs -f task-board-secure-user-service-1 2>&1 | grep --line-buffered . ;;
  4) docker compose -f docker-compose.yml logs -f --tail=50 ;;
  5) docker compose logs --tail=100 2>&1 | grep '"level":"error"' ;;
  6) cat logs/auth-combined.log | grep "LOGIN_SUCCESS" | python3 -m json.tool 2>/dev/null || \
     cat logs/auth-combined.log | grep "LOGIN_SUCCESS" ;;
  7) cat logs/auth-combined.log | grep "LOGIN_FAILED" | head -20 ;;
  *) echo "Invalid choice" ;;
esac
```

---

## Part 7: รัน Docker Compose ทั้งระบบ (10 นาที)

### Environment Variables

**ไฟล์: `.env`**

```env
# ============================================================
# Task Board Secure — Environment Variables
# ⚠️  ในการใช้งานจริง: ห้าม Commit ไฟล์นี้ลง Git!
# ============================================================

# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=taskboard
DB_USER=postgres
DB_PASSWORD=Secur3TaskBoard2025!

# JWT Secrets (ควรใช้ random string ยาว 32+ chars จริงๆ)
JWT_SECRET=super-secret-key-change-in-production-min32chars
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=another-super-secret-refresh-key-32chars

# Service Ports
AUTH_PORT=3001
TASK_PORT=3002
USER_PORT=3003

# Log Level
LOG_LEVEL=info
NODE_ENV=development
```

### Docker Compose

**ไฟล์: `docker-compose.yml`**

```yaml
# ============================================================
# Task Board Secure — Docker Compose
# Week 12: Security Architecture
# Services: nginx (gateway), auth, task, user, postgres
# ============================================================

version: '3.8'

services:

  # ─────────────────────────────────────────
  # Nginx: API Gateway + Rate Limiter
  # ─────────────────────────────────────────
  nginx:
    build: ./nginx
    container_name: taskboard-gateway
    ports:
      - "8080:80"         # localhost:8080 → Nginx :80
    depends_on:
      auth-service:
        condition: service_healthy
      task-service:
        condition: service_healthy
      user-service:
        condition: service_healthy
    networks:
      - task-net
    restart: unless-stopped

  # ─────────────────────────────────────────
  # Auth Service: Login, Register, JWT
  # ─────────────────────────────────────────
  auth-service:
    build: ./auth-service
    container_name: taskboard-auth
    environment:
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - JWT_SECRET=${JWT_SECRET}
      - JWT_EXPIRES_IN=${JWT_EXPIRES_IN}
      - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
      - PORT=${AUTH_PORT}
      - LOG_LEVEL=${LOG_LEVEL}
      - NODE_ENV=${NODE_ENV}
    volumes:
      - ./logs:/app/logs      # Mount logs สำหรับดู log ง่ายๆ
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - task-net
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3001/health"]
      interval: 30s
      timeout: 5s
      retries: 3

  # ─────────────────────────────────────────
  # Task Service: CRUD Tasks + JWT Guard
  # ─────────────────────────────────────────
  task-service:
    build: ./task-service
    container_name: taskboard-tasks
    environment:
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - JWT_SECRET=${JWT_SECRET}
      - PORT=${TASK_PORT}
      - LOG_LEVEL=${LOG_LEVEL}
      - NODE_ENV=${NODE_ENV}
    volumes:
      - ./logs:/app/logs
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - task-net
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3002/health"]
      interval: 30s
      timeout: 5s
      retries: 3

  # ─────────────────────────────────────────
  # User Service: Profile, Role Management
  # ─────────────────────────────────────────
  user-service:
    build: ./user-service
    container_name: taskboard-users
    environment:
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - JWT_SECRET=${JWT_SECRET}
      - PORT=${USER_PORT}
      - LOG_LEVEL=${LOG_LEVEL}
      - NODE_ENV=${NODE_ENV}
    volumes:
      - ./logs:/app/logs
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - task-net
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3003/health"]
      interval: 30s
      timeout: 5s
      retries: 3

  # ─────────────────────────────────────────
  # PostgreSQL: Database
  # ─────────────────────────────────────────
  postgres:
    image: postgres:15-alpine
    container_name: taskboard-db
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-db:/docker-entrypoint-initdb.d  # ← run init.sql อัตโนมัติ
    networks:
      - task-net
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 10s
      timeout: 5s
      retries: 5

# ─────────────────────────────────────────
# Networks & Volumes
# ─────────────────────────────────────────
networks:
  task-net:
    driver: bridge
    # Docker internal network — Services ติดต่อกันได้โดยตรง
    # แต่ภายนอกเข้าถึงได้แค่ผ่าน Nginx เท่านั้น

volumes:
  postgres_data:
    driver: local
```

### คำสั่ง Start ระบบ

```bash
# 1. Build และ Start ทุก Services
docker compose up --build -d

# 2. ตรวจสอบสถานะ
docker compose ps

# 3. ดู Logs แบบ real-time
docker compose logs -f

# 4. ตรวจสอบ Health ของแต่ละ Service
curl http://localhost:8080/health
curl http://localhost:8080/api/auth/verify

# 5. หยุดระบบ
docker compose down

# 6. หยุดและลบ Volume (reset ทุกอย่าง)
docker compose down -v
```

---

## Part 8: Security Test Cases (25 นาที) ← สำคัญมาก!

```
┌──────────────────────────────────────────────────────────────────────────────┐
│              Security Test Cases Matrix                                      │
│              นักศึกษาต้องทำทุก Test Case และบันทึกผล                          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 🧪 ชุดที่ 1: Authentication Tests

**TC-AUTH-01: Login สำเร็จ (ข้อมูลถูกต้อง)**

```bash
# ✅ Expected: 200 OK พร้อม JWT Token
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"member@taskboard.com","password":"password123"}'

# บันทึก Token สำหรับใช้ใน Test ต่อๆ ไป
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"member@taskboard.com","password":"password123"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['accessToken'])")

echo "Token: $TOKEN"
```

**TC-AUTH-02: Login ล้มเหลว — Password ผิด**

```bash
# ✅ Expected: 401 Unauthorized
# ❌ ต้องไม่บอกว่า Password ผิด (บอกแค่ "ข้อมูลไม่ถูกต้อง")
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"member@taskboard.com","password":"wrongpassword"}'

# ✅ ตรวจสอบ: Response ต้องไม่บอกว่าเป็น email ที่ถูกต้อง แต่ password ผิด
```

**TC-AUTH-03: Login ล้มเหลว — Email ไม่มีในระบบ**

```bash
# ✅ Expected: 401 Unauthorized (ข้อความเหมือนกับ TC-AUTH-02)
# ⚠️ Security: Response ต้องเหมือนกัน ไม่งั้นจะ enumerate user ได้
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"notexist@example.com","password":"password123"}'
```

**TC-AUTH-04: Token Verification**

```bash
# ✅ Expected: {valid: true, user: {...}}
curl http://localhost:8080/api/auth/verify \
  -H "Authorization: Bearer $TOKEN"
```

**TC-AUTH-05: Tampered Token (แก้ไข Token)**

```bash
# ✅ Expected: 401 Invalid token
# ทดสอบ: นำ Token ที่ได้มาแก้ไขส่วนท้าย 2-3 ตัวอักษร
TAMPERED_TOKEN="${TOKEN}XXXX"

curl http://localhost:8080/api/auth/verify \
  -H "Authorization: Bearer $TAMPERED_TOKEN"
```

---

### 🧪 ชุดที่ 2: Authorization Tests (Role-Based)

**TC-AUTHZ-01: Member ดู Tasks ของตัวเอง — สำเร็จ**

```bash
# Login เป็น member ก่อน
MEMBER_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"member@taskboard.com","password":"password123"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['accessToken'])")

# ✅ Expected: 200 OK — เห็นเฉพาะ task ของตัวเอง
curl http://localhost:8080/api/tasks/ \
  -H "Authorization: Bearer $MEMBER_TOKEN"
```

**TC-AUTHZ-02: ไม่มี Token — ต้อง Reject**

```bash
# ✅ Expected: 401 Unauthorized
curl http://localhost:8080/api/tasks/
```

**TC-AUTHZ-03: Member พยายามลบ Task ของคนอื่น — ต้อง Reject**

```bash
# สมมติ Task ID 1 เป็นของ admin
# ✅ Expected: 403 Forbidden
curl -X DELETE http://localhost:8080/api/tasks/1 \
  -H "Authorization: Bearer $MEMBER_TOKEN"
```

**TC-AUTHZ-04: Admin ดู Users ทั้งหมด — สำเร็จ**

```bash
ADMIN_TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@taskboard.com","password":"password123"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['accessToken'])")

# ✅ Expected: 200 OK — เห็น users ทั้งหมด
curl http://localhost:8080/api/users/ \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

**TC-AUTHZ-05: Member พยายามดู Users ทั้งหมด — ต้อง Reject**

```bash
# ✅ Expected: 403 Forbidden (member ไม่มีสิทธิ์ดู user list)
curl http://localhost:8080/api/users/ \
  -H "Authorization: Bearer $MEMBER_TOKEN"
```

---

### 🧪 ชุดที่ 3: Rate Limiting Tests

**TC-RATE-01: ทดสอบ Rate Limit บน Auth Endpoint**

```bash
# ส่ง Login Request 15 ครั้งติดต่อกัน (เกิน limit 10/min)
echo "ทดสอบ Rate Limiting..."
for i in {1..15}; do
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST http://localhost:8080/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}')
  echo "Request $i: HTTP $RESPONSE"
  sleep 0.5
done

# ✅ Expected: หลังจาก ~10 requests ควรได้ 429 Too Many Requests
```

**TC-RATE-02: ตรวจสอบ Error Message ของ Rate Limit**

```bash
# ✅ Expected: {"error":"Too many requests. Please slow down.","code":429}
curl -v -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"spam@spam.com","password":"spam"}' 2>&1 | grep -E "< HTTP|{.*}"
```

---

### 🧪 ชุดที่ 4: Bonus Security Tests

**TC-SEC-01: SQL Injection Attempt**

```bash
# ✅ Expected: 400 Bad Request (Joi validation block) หรือ 401
# ❌ ไม่ควรได้ข้อมูล Users ออกมา
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"'"'"' OR 1=1 --","password":"anything"}'
```

**TC-SEC-02: ตรวจสอบ Security Headers**

```bash
# ✅ Expected: มี X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
curl -I http://localhost:8080/
```

**TC-SEC-03: ป้องกันการเข้าถึง .env**

```bash
# ✅ Expected: 404 Not Found (ไม่ใช่ข้อมูล .env จริงๆ)
curl http://localhost:8080/.env
curl http://localhost:8080/.git/config
```

---

### 📊 ตารางบันทึกผลการทดสอบ

| Test Case | Description | Expected | Actual Result | Pass/Fail |
|-----------|-------------|----------|---------------|-----------|
| TC-AUTH-01 | Login สำเร็จ | 200 + Token | | |
| TC-AUTH-02 | Password ผิด | 401, msg เดียวกัน | | |
| TC-AUTH-03 | Email ไม่มี | 401, msg เดียวกัน | | |
| TC-AUTH-04 | Verify Token | {valid:true} | | |
| TC-AUTH-05 | Token แก้ไข | 401 Invalid | | |
| TC-AUTHZ-01 | Member ดู Tasks | 200 | | |
| TC-AUTHZ-02 | ไม่มี Token | 401 | | |
| TC-AUTHZ-03 | Delete ของคนอื่น | 403 | | |
| TC-AUTHZ-04 | Admin ดู Users | 200 | | |
| TC-AUTHZ-05 | Member ดู Users | 403 | | |
| TC-RATE-01 | Rate Limit Auth | 429 หลัง ~10 req | | |
| TC-SEC-01 | SQL Injection | 400/401 ไม่รั่ว | | |
| TC-SEC-02 | Security Headers | Headers ครบ | | |
| TC-SEC-03 | Block .env | 404 | | |

---

## Part 9: ดู Logs และสรุปผล (10 นาที)

### คำสั่งดู Logs

```bash
# ดู Log ทั้งหมดของระบบ
docker compose logs --tail=50

# ดู Log เฉพาะ Auth Service
docker compose logs auth-service --tail=30

# ดู Log แบบ real-time (กด Ctrl+C เพื่อหยุด)
docker compose logs -f auth-service task-service

# ดู Log ที่เซฟในไฟล์ (format: JSON)
cat logs/auth-combined.log | tail -20

# ค้นหา Login Events
cat logs/auth-combined.log | grep "LOGIN_SUCCESS"

# ค้นหา Failed Attempts
cat logs/auth-combined.log | grep "LOGIN_FAILED"

# ดู Error เท่านั้น
cat logs/auth-combined.log | python3 -c "
import sys, json
for line in sys.stdin:
    try:
        entry = json.loads(line)
        if entry.get('level') == 'error':
            print(f\"[{entry['timestamp']}] {entry['message']}\")
    except: pass
"
```

### เปรียบเทียบ Log: ก่อนและหลังเพิ่ม Security

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              Log Analysis: ก่อน vs หลัง Security                              │
├─────────────────────────────────┬───────────────────────────────────────────┤
│  Week 7 (ไม่มี Security)          │  Week 12 (มี Security)                     │
├─────────────────────────────────┼───────────────────────────────────────────┤
│  No logs at all 😱              │  {                                        │
│                                 │    "timestamp": "2025-01-10 10:30:00",    │
│  หรือ plain text:                │    "level": "info",                       │
│  "GET /tasks 200"               │    "service": "task-service",             │
│                                 │    "action": "TASK_RETRIEVED",            │
│  ❌ ไม่รู้ว่าใคร Request            │    "userId": 5,                           │
│  ❌ ไม่รู้ว่า Request ไหน Fail      │    "taskCount": 3,                        │
│  ❌ ไม่มี Audit Trail             │    "ip": "192.168.1.1",                   │
│                                 │    "duration": "12ms"                     │
│                                 │  }                                        │
│                                 │                                           │
│                                 │  ✅ รู้ว่าใคร Request                        │
│                                 │  ✅ บันทึก Failed Attempts                  │
│                                 │  ✅ มี Audit Trail ครบ                     │
└─────────────────────────────────┴───────────────────────────────────────────┘
```

---

## 🎯 Challenge Activities

### Challenge 1 (ง่าย): เพิ่ม Endpoint `/api/auth/logout`

สร้าง endpoint สำหรับ logout ที่บันทึก Audit Log ว่า user logout แล้ว

**Hint:**
```javascript
// JWT เป็น Stateless ดังนั้น logout ฝั่ง server ทำได้แค่บันทึก log
// ฝั่ง client ต้องลบ Token ออกจาก localStorage เอง
router.post('/logout', authenticate, async (req, res) => {
  // TODO: บันทึก audit log ว่า user logout
  // TODO: ส่ง response กลับ
});
```

### Challenge 2 (ปานกลาง): เพิ่ม Viewer Role

เพิ่ม User ที่มี role = 'viewer' ที่สามารถดู tasks ได้แต่ไม่สามารถสร้าง/แก้ไข/ลบ tasks ได้

**Hint:**
1. เพิ่ม user ด้วย role 'viewer' ใน `init.sql`
2. ทดสอบว่า viewer ดู tasks ได้ (GET)
3. ทดสอบว่า viewer สร้าง task ไม่ได้ (POST → 403)
4. บันทึกผลใน Test Case Table

### Challenge 3 (ยาก): Simple Log Dashboard

สร้างหน้า HTML ง่ายๆ ที่ดึง log จาก `/logs/*.log` แสดงในหน้าเว็บแบบ real-time

---

## 📤 ส่งงาน Git

### ADR (Architecture Decision Record)

สร้างไฟล์ `docs/adr/ADR-001-jwt-authentication.md`:

```markdown
# ADR-001: ใช้ JWT สำหรับ Authentication ใน Task Board

## Date
2025-01-10

## Status
Accepted

## Context
Task Board System (Week 12) ต้องการ Authentication mechanism
ที่เหมาะกับ Microservices Architecture ที่มี 3 Services อิสระ

## Decision
ใช้ JWT (JSON Web Token) แบบ Stateless สำหรับ Authentication:
- Auth Service ออก JWT เมื่อ Login สำเร็จ
- Task Service และ User Service ตรวจสอบ JWT เอง (ไม่ต้องถาม Auth Service)
- Token Expiry: 24 ชั่วโมง (Access) / 7 วัน (Refresh)

## Consequences

### ข้อดี (+)
- Stateless: ไม่ต้อง Query Database ทุก Request
- Distributed: Services ตรวจสอบ Token เองได้
- Performance: ลด Latency เพราะไม่มี Network Round-trip
- Scalable: Services Horizontal Scale ได้ง่าย

### ข้อเสีย (-)
- Token Revocation ยาก: ถ้า Token รั่ว ต้องรอ Expire
- Secret Management: ต้องจัดการ JWT_SECRET ให้ดี
- Token Size: ใหญ่กว่า Session Cookie

## Alternatives Considered
1. Session + Redis → ต้องมี Redis infrastructure เพิ่ม
2. OAuth2 (ซับซ้อนเกินไปสำหรับขนาดระบบนี้)
```

### Git Commands

```bash
# 1. ตรวจสอบ .gitignore ก่อน (ห้าม commit .env และ node_modules)
cat >> .gitignore << 'EOF'
# Security: ห้าม commit .env
.env
.env.*
!.env.example

# Dependencies
node_modules/
*/node_modules/

# Logs
logs/*.log

# Docker data
postgres_data/
EOF

# 2. สร้าง .env.example (template ให้คนอื่น)
cat > .env.example << 'EOF'
DB_HOST=postgres
DB_PORT=5432
DB_NAME=taskboard
DB_USER=postgres
DB_PASSWORD=your-strong-password-here
JWT_SECRET=your-jwt-secret-min-32-chars
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
LOG_LEVEL=info
NODE_ENV=development
EOF

# 3. Git add และ commit
git add .
git status  # ตรวจสอบว่าไม่มี .env ใน staged files

git commit -m "feat(week12): add security architecture with JWT auth

- Add Auth Service (JWT login/register/verify/refresh)
- Add User Service (profile, role management)  
- Update Task Service with JWT middleware
- Add Nginx rate limiting (100r/m API, 10r/m auth)
- Add structured logging with Winston
- Add security test cases documentation
- Add Docker Compose for all services
- Add ADR-001 for JWT authentication decision

CLO: CLO3, CLO5, CLO6, CLO7, CLO14"

# 4. Push ไป Term Project repository
git push origin main
```

---

## 📊 สรุปและ Reflection

### สิ่งที่ได้เรียนรู้วันนี้

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    Week 12 Lab Summary                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  🔒 Security Components ที่เพิ่มเข้าไป:                                           │
│  ─────────────────────────────────────                                       │
│  1. Auth Service  → Login, Register, JWT Issuing                             │
│  2. JWT Middleware → ทุก Protected Endpoint ต้องผ่าน                            │
│  3. RBAC          → admin / member / viewer มีสิทธิ์ต่างกัน                        │
│  4. Rate Limiting → Nginx จำกัด request ป้องกัน Brute Force                     │
│  5. Audit Logs    → บันทึกทุก Login/Action ลง Database + File                   │
│  6. Security Headers → X-Frame-Options, X-Content-Type-Options               │
│                                                                              │
│  📊 Architecture Decisions:                                                  │
│  ──────────────────────────                                                  │
│  • JWT Stateless → ไม่ต้องมี Session Store, Scale ง่าย                           │
│  • Nginx as API Gateway → Single entry point, centralized security           │
│  • Defense in Depth → หลายชั้นป้องกัน (WAF-like + App Level + DB Level)          │
│  • Structured Logging → JSON format, ค้นหาและวิเคราะห์ง่าย                       │
│                                                                              │
│  ⚖️ Trade-offs ที่พบ:                                                          │
│  ─────────────────                                                           │
│  Security ↑  vs  Performance ↓  (JWT validation เพิ่ม ~5ms ต่อ request)         │
│  Security ↑  vs  Complexity ↑   (+3 containers, +config, +secret mgmt)       │
│  Security ↑  vs  Usability ↓    (ต้อง Login ทุกครั้ง, Token expire)              │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### คำถาม Reflection (ตอบใน README.md หรือ Wiki)

1. **ทำไม JWT ถึงเหมาะกับ Microservices** มากกว่า Session-based authentication?
2. **Rate Limiting** ช่วยป้องกัน Attack ประเภทใดบ้าง?
3. **Security Headers** ที่ใส่ใน Nginx ช่วยป้องกันอะไร?
4. จากผลการทดสอบ **TC-AUTH-02 และ TC-AUTH-03** ทำไม Response ถึงต้องเหมือนกัน?
5. ถ้า JWT Secret รั่วไหล ควรทำอย่างไร?

### Checklist ก่อนส่งงาน

```
☐  docker compose up --build → ทุก service ขึ้น (Healthy)
☐  ทดสอบ TC-AUTH-01 → 05 ครบ และบันทึกผล
☐  ทดสอบ TC-AUTHZ-01 → 05 ครบ และบันทึกผล
☐  ทดสอบ TC-RATE-01 → 02 ครบ
☐  บันทึก Log เห็น Structured JSON format
☐  git commit ไม่มี .env และ node_modules
☐  git push ไป Term Project repo สำเร็จ
☐  Draw.io Diagram C2 อัปเดตแล้ว
☐  ADR-001 สร้างแล้ว
☐  ตอบคำถาม Reflection ใน README.md
```

---

## 📖 อ่านเพิ่มเติม

- **JWT.io** — ทดสอบ Decode/Encode Token: https://jwt.io
- **OWASP Top 10** — https://owasp.org/www-project-top-ten/
- **Nginx Rate Limiting** — https://nginx.org/en/docs/http/ngx_http_limit_req_module.html
- **Winston Logger** — https://github.com/winstonjs/winston
- **bcryptjs** — https://github.com/dcodeIO/bcrypt.js

---

*Document Version: 1.0*
*Last Updated: 2025*
*Course: ENGSE207 Software Architecture*
*Instructor: นายธนิต เกตุแก้ว*
*มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*
