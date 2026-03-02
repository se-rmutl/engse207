# 🔐 คู่มือปฏิบัติการ ENGSE207 — สัปดาห์ที่ 12
## Security-Aware Architecture: Task Board พร้อม Auth, JWT และ Centralized Logging

**สัปดาห์:** 12 | **ระยะเวลา:** 3 ชั่วโมง | **ระดับความยาก:** ⭐⭐⭐⭐

> 🔗 **ต่อเนื่องจาก:** Week 6 (N-Tier Docker) → Week 7 (Cloud Deploy) → **Week 12 (Secure Architecture)**

---

## 📋 สารบัญ

1. [วัตถุประสงค์และ CLO](#-วัตถุประสงค์การเรียนรู้)
2. [ภาพรวม: จาก Week 6-7 → Week 12](#-ภาพรวม-week-6-7--week-12)
3. [สถาปัตยกรรมที่จะสร้าง](#-สถาปัตยกรรม-task-board-ที่เพิ่ม-security-components-c2-ปรับปรุง)
4. [ทฤษฎีสั้น: JWT, Auth Flow, Zero-Trust พื้นฐาน](#-ทฤษฎีสั้น-ก่อนลงมือทำ)
5. [เตรียม Project Structure](#-สิ่งที่ต้องเตรียม)
6. [Part 1: สร้าง Auth Service](#-part-1-สร้าง-auth-service-40-นาที)
7. [Part 2: สร้าง User Service](#-part-2-สร้าง-user-service-20-นาที)
8. [Part 3: สร้าง Task Service พร้อม JWT Guard](#-part-3-สร้าง-task-service-พร้อม-jwt-guard-20-นาที)
9. [Part 4: API Gateway (Nginx) + Rate Limiting](#-part-4-api-gateway-nginx--rate-limiting-15-นาที)
10. [Part 5: Centralized Logging ด้วย Loki + Grafana พื้นฐาน](#-part-5-centralized-logging-ด้วย-loki--grafana-20-นาที)
11. [Part 6: Docker Compose รวมทุก Service](#-part-6-docker-compose-รวมทุก-service-15-นาที)
12. [Part 7: Security Test Cases (มี/ไม่มี Security)](#-part-7-security-test-cases-40-นาที)
13. [ใบงาน + ส่งงาน Git](#-ใบงาน--การส่งงาน)
14. [Challenge: ต่อยอด](#-challenge-ต่อยอด-ถ้าเวลาเหลือ)
15. [Draw.io Diagrams](#-drawio-xml-diagrams)
16. [Troubleshooting](#-troubleshooting)

---

## 🎯 วัตถุประสงค์การเรียนรู้

| ✅ | วัตถุประสงค์ | CLO |
|---|------------|-----|
| ☐ | อธิบายบทบาทของ Auth Service, JWT, API Gateway ในสถาปัตยกรรมได้ | CLO3, CLO5 |
| ☐ | เพิ่ม Auth Service เข้าใน Docker Compose ของ Task Board ได้ | CLO6, CLO14 |
| ☐ | ออกแบบ JWT Authentication Flow ระหว่าง Services ได้ | CLO6, CLO7 |
| ☐ | ทดสอบ API ทั้งแบบ มี และ ไม่มี JWT Token ได้ | CLO5, CLO14 |
| ☐ | ตั้งค่า Basic Logging เพื่อดู security events ได้ | CLO14 |
| ☐ | เปรียบเทียบ Architecture ก่อน/หลังเพิ่ม Security ได้ | CLO3, CLO6 |

---

## 🔄 ภาพรวม: Week 6-7 → Week 12

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  วิวัฒนาการสถาปัตยกรรม Task Board                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   WEEK 6: N-Tier บน Docker (Local)                                          │
│   ─────────────────────────────────                                         │
│   nginx → api (Node.js) → PostgreSQL                                        │
│   ❌ ไม่มี Authentication                                                     │
│   ❌ ทุกคนเรียก API ได้โดยตรง                                                  │
│   ❌ ไม่มี Logging รวมศูนย์                                                     │
│                                                                             │
│   WEEK 7: Deploy บน Railway (Cloud)                                         │
│   ──────────────────────────────────                                        │
│   Frontend + Backend + DB → Railway PaaS                                    │
│   ⚠️ HTTPS อัตโนมัติ แต่ยังไม่มี Auth                                              │
│                                                                             │
│   ─────────────────────────────────────────────────────────────             │
│                           ↓  Week 12  ↓                                     │
│   ─────────────────────────────────────────────────────────────             │
│                                                                             │
│   WEEK 12: Security-Aware Architecture (Docker Compose)                     │
│   ──────────────────────────────────────────────────────                    │
│   ✅ Auth Service  → ออก JWT Token                                          │
│   ✅ API Gateway   → ตรวจ JWT ทุก Request                                    │
│   ✅ Task Service  → Protected Endpoints                                    │
│   ✅ User Service  → User Management                                        │
│   ✅ Loki+Grafana  → Centralized Logging                                    │
│   ✅ Rate Limiting → กันโจมตี Brute-force                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ สถาปัตยกรรม Task Board ที่เพิ่ม Security Components (C2 ปรับปรุง)

```
┌────────────────────────────────────────────────────────────────────────────┐
│         C2: Container Diagram — Task Board Security Architecture           │
│                     (Week 12 Updated)                                      │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   🌐 Internet                                                              │
│        │                                                                   │
│        │ HTTPS :443                                                        │
│        ▼                                                                   │
│   ┌───────────────────────────────────────────────────────────────────┐    │
│   │   🛡️ Nginx (API Gateway + Rate Limiter)                           │    │
│   │   Port: 80/443   |   Rate: 10 req/s per IP                        │    │
│   │   • ตรวจ JWT Token (validate signature + expiry)                  │    │
│   │   • Route: /api/auth/*  → auth-service:3001                       │    │
│   │   • Route: /api/tasks/* → task-service:3002 (JWT required)        │    │
│   │   • Route: /api/users/* → user-service:3003 (JWT required)        │    │
│   └─────────────────────┬─────────────────────────────────────────────┘    │
│                         │  Docker Network: taskboard-net                   │
│         ┌───────────────┼───────────────────────┐                          │
│         │               │                       │                          │
│         ▼               ▼                       ▼                          │
│   ┌───────────┐   ┌──────────────┐         ┌───────────┐                   │
│   │  🔑 Auth  │   │  📋 Task     │         │  👤 User  │                   │
│   │  Service  │   │  Service     │         │  Service  │                   │
│   │  :3001    │   │  :3002       │         │  :3003    │                   │
│   │           │   │              │         │           │                   │
│   │ • Login   │   │ • CRUD Tasks │         │ • Profile │                   │
│   │ • Register│   │ • JWT verify │         │ • Roles   │                   │
│   │ • Issue   │   │   (middleware│         │ • JWT     │                   │
│   │   JWT     │   │   check)     │         │   verify  │                   │
│   └─────┬─────┘   └──────┬───────┘         └─────┬─────┘                   │
│         │                │                       │                         │
│         ▼                ▼                       ▼                         │
│   ┌───────────┐   ┌─────────────┐         ┌───────────┐                    │
│   │  auth-db  │   │  task-db    │         │  user-db  │                    │
│   │ PostgreSQL│   │ PostgreSQL  │         │ PostgreSQL│                    │
│   │  :5432    │   │  :5433      │         │  :5434    │                    │
│   └───────────┘   └─────────────┘         └───────────┘                    │
│                                                                            │
│   ┌──────────────────────────────────────────────┐                         │
│   │   📊 Logging Stack                           │                         │
│   │   Loki (log storage) + Grafana (dashboard)   │                         │
│   │   ← รับ logs จากทุก Service ผ่าน Docker driver  │                         │
│   └──────────────────────────────────────────────┘                         │
│                                                                            │
│   🔑 Legend:                                                               │
│   • แต่ละ Service มี DB แยก (Database-per-Service pattern)                   │
│   • JWT Secret ใช้ร่วมกัน (shared via Docker env)                             │
│   • ทุก Service Log ผ่าน Docker Logging Driver                               │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 📚 ทฤษฎีสั้น ก่อนลงมือทำ

### 🔐 JWT คืออะไร? (5 นาที)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       JWT ในการปฏิบัติ                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   JWT = Header . Payload . Signature                                        │
│                                                                             │
│   ┌───────────────┐  ┌──────────────────────┐  ┌──────────────────────┐     │
│   │   HEADER      │  │      PAYLOAD         │  │     SIGNATURE        │     │
│   │  (Red)        │  │     (Purple)         │  │      (Blue)          │     │
│   │               │  │                      │  │                      │     │
│   │  {            │  │  {                   │  │  HMACSHA256(         │     │
│   │  "alg":"HS256"│  │  "sub": "user-123",  │  │    base64(header)    │     │
│   │  "typ":"JWT"  │  │  "name":"สมชาย",     │  │  + "."               │     │
│   │  }            │  │  "role":"member",    │  │  + base64(payload),  │     │
│   │               │  │  "iat":1700000000,   │  │    your-secret       │     │
│   │               │  │  "exp":1700003600    │  │  )                   │     │
│   │               │  │  }                   │  │                      │     │
│   └───────────────┘  └──────────────────────┘  └──────────────────────┘     │
│           │                     │                          │                │
│        อ่านได้            อ่านได้ (แค่ encode)         ตรวจสอบว่าถูกปลอมแปลง       │
│                         ❗อย่าใส่ password                   หรือเปล่า          │
│                                                                             │
│   ขั้นตอนการใช้งาน:                                                            │
│                                                                             │
│   1. User Login → Auth Service ตรวจ password → ออก JWT ให้                   │
│   2. User เก็บ JWT (ใน localStorage หรือ Cookie)                              │
│   3. ทุก Request ส่ง JWT ใน Header: Authorization: Bearer <token>             │
│   4. API Gateway / Service ตรวจ JWT: Signature ถูกต้อง? หมดอายุหรือยัง?          │
│   5. ถ้าผ่าน → อนุญาต | ถ้าไม่ผ่าน → 401 Unauthorized                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🏗️ ทำไมต้องมี Auth Service แยก?

```
┌──────────────────────────────────────────────────────┐
│         Without Auth Service (Week 6)                │
│                                                      │
│  Browser ──► Nginx ──► Task API                      │
│                            │                         │
│                       ตรวจ password                  │
│                       ออก token                      │
│                       จัดการ user                     │
│                       จัดการ task  ← too many jobs!   │
│                                                      │
├──────────────────────────────────────────────────────┤
│         With Auth Service (Week 12)                  │
│                                                      │
│  Browser ──► Gateway ──► Auth Service  (login only)  │
│                  │                                   │
│                  ├──────► Task Service (tasks only)  │
│                  │                                   │
│                  └──────► User Service (users only)  │
│                                                      │
│  ✅ Single Responsibility                            │
│  ✅ ถ้า Auth โดน compromise → ไม่กระทบ Task Service    │
│  ✅ Scale Auth Service แยกได้                         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 🔧 สิ่งที่ต้องเตรียม

### Software ที่ต้องมี

```bash
# ตรวจสอบ docker
docker --version         # Docker 24+
docker compose version   # Docker Compose v2+

# ตรวจสอบ node
node --version           # v18+
npm --version            # v9+
```

### โครงสร้าง Project ที่จะสร้าง

```
task-board-security/          ← root ของ project
├── docker-compose.yml        ← รวมทุก service
├── .env                      ← secret ทั้งหมด
├── nginx/
│   ├── nginx.conf            ← API Gateway config
│   └── Dockerfile
├── auth-service/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/auth.js
│   │   ├── middleware/
│   │   └── db/init.sql
│   ├── package.json
│   └── Dockerfile
├── task-service/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/tasks.js
│   │   ├── middleware/authMiddleware.js
│   │   └── db/init.sql
│   ├── package.json
│   └── Dockerfile
├── user-service/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/users.js
│   │   ├── middleware/authMiddleware.js
│   │   └── db/init.sql
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
└── monitoring/
    ├── loki-config.yaml
    ├── promtail-config.yaml      ← ดึง logs จาก Docker → ส่งให้ Loki
    └── grafana/
        └── datasource.yml
```

### เริ่มต้น

```bash
# สร้าง project
mkdir task-board-security && cd task-board-security
git init

# สร้าง folders
mkdir -p nginx auth-service/src/routes auth-service/src/middleware auth-service/src/db
mkdir -p task-service/src/routes task-service/src/middleware task-service/src/db
mkdir -p user-service/src/routes user-service/src/middleware user-service/src/db
mkdir -p frontend/css frontend/js
mkdir -p monitoring/grafana
```

---

## 🔑 Part 1: สร้าง Auth Service (40 นาที)

Auth Service มีหน้าที่เดียว: **ตรวจสอบ username/password → ออก JWT Token**

### 1.1 สร้าง package.json

```bash
cd auth-service
npm init -y
npm install express jsonwebtoken bcryptjs pg dotenv cors morgan
cd ..
```

**`auth-service/package.json`** (แก้ scripts section):
```json
{
  "name": "auth-service",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "pg": "^8.11.3"
  }
}
```

### 1.2 Database Schema

**`auth-service/src/db/init.sql`:**
```sql
-- สร้าง table สำหรับ users (auth data เท่านั้น)
CREATE TABLE IF NOT EXISTS auth_users (
  id        SERIAL PRIMARY KEY,
  user_id   VARCHAR(50) UNIQUE NOT NULL,   -- shared ID กับ user-service
  email     VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role      VARCHAR(20) DEFAULT 'member',  -- member, admin
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- ข้อมูลทดสอบ (password: "password123" → bcrypt hash)
INSERT INTO auth_users (user_id, email, password_hash, role) VALUES
  ('user-001', 'alice@example.com',
   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'member'),
  ('user-002', 'bob@example.com',
   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'member'),
  ('user-admin', 'admin@example.com',
   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin')
ON CONFLICT DO NOTHING;
```

> 📝 **หมายเหตุ:** password hash ข้างบนคือ bcrypt ของ `"password123"` — ใช้ทดสอบเท่านั้น

### 1.3 Database Connection

**`auth-service/src/db/db.js`:**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.DB_HOST     || 'auth-db',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'auth_db',
  user:     process.env.DB_USER     || 'auth_user',
  password: process.env.DB_PASSWORD || 'auth_secret',
});

// Auto-create tables on startup
async function initDB() {
  const fs = require('fs');
  const path = require('path');
  const sql = fs.readFileSync(
    path.join(__dirname, 'init.sql'), 'utf8'
  );
  await pool.query(sql);
  console.log('[auth-db] Tables initialized');
}

module.exports = { pool, initDB };
```

### 1.4 JWT Utility

**`auth-service/src/middleware/jwtUtils.js`:**
```javascript
const jwt = require('jsonwebtoken');

const JWT_SECRET  = process.env.JWT_SECRET  || 'dev-secret-change-in-production';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';

/**
 * สร้าง JWT Token
 * @param {object} payload - ข้อมูลที่จะฝังใน token
 * @returns {string} JWT token string
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

/**
 * ตรวจสอบ JWT Token
 * @param {string} token
 * @returns {object} decoded payload หรือ throw error
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
```

### 1.5 Auth Routes (Login + Register)

**`auth-service/src/routes/auth.js`:**
```javascript
const express  = require('express');
const bcrypt   = require('bcryptjs');
const { pool } = require('../db/db');
const { generateToken, verifyToken } = require('../middleware/jwtUtils');

const router = express.Router();

// ─────────────────────────────────────────────
// POST /api/auth/register — สมัครสมาชิกใหม่
// ─────────────────────────────────────────────
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  // Validate input
  if (!email || !password || !name) {
    return res.status(400).json({
      error: 'กรุณากรอก email, password และ name'
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      error: 'Password ต้องมีอย่างน้อย 6 ตัวอักษร'
    });
  }

  try {
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // สร้าง user_id ง่ายๆ
    const userId = 'user-' + Date.now();

    const result = await pool.query(
      `INSERT INTO auth_users (user_id, email, password_hash, role)
       VALUES ($1, $2, $3, 'member')
       RETURNING id, user_id, email, role`,
      [userId, email.toLowerCase(), passwordHash]
    );

    const user = result.rows[0];

    // ออก JWT ให้เลย
    const token = generateToken({
      sub:    user.user_id,
      email:  user.email,
      role:   user.role,
      name:   name
    });

    console.log(`[AUTH] Register success: ${email}`);
    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ',
      token,
      user: {
        id:    user.user_id,
        email: user.email,
        role:  user.role,
        name
      }
    });

  } catch (err) {
    if (err.code === '23505') {  // unique violation
      return res.status(409).json({ error: 'Email นี้ถูกใช้แล้ว' });
    }
    console.error('[AUTH] Register error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// POST /api/auth/login — เข้าสู่ระบบ
// ─────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'กรุณากรอก email และ password' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM auth_users WHERE email = $1',
      [email.toLowerCase()]
    );

    const user = result.rows[0];

    // ⚠️ Security: ใช้เวลาเท่ากันไม่ว่า user จะมีหรือไม่ (Timing Attack prevention)
    // ใช้ bcrypt hash จริงๆ (ของ string ที่ไม่มีใครรู้) เพื่อป้องกัน Timing Attack
    // ป้องกัน Timing Attack: ใช้ bcrypt.compare กับ dummy hash แม้ว่า user ไม่มีในระบบ
    // ทำให้ response time เท่ากัน ไม่ว่า email จะมีในระบบหรือไม่
    const dummyHash = '$2b$10$invalidhashpadding000000000000000000000000000000000000';
    const passwordHash = user ? user.password_hash : dummyHash;

    const isValid = await bcrypt.compare(password, passwordHash);

    if (!user || !isValid) {
      console.log(`[AUTH] Login failed: ${email} — wrong credentials`);
      return res.status(401).json({ error: 'Email หรือ Password ไม่ถูกต้อง' });
    }

    // อัพเดท last_login
    await pool.query(
      'UPDATE auth_users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // ออก JWT
    const token = generateToken({
      sub:   user.user_id,
      email: user.email,
      role:  user.role
    });

    console.log(`[AUTH] Login success: ${email} (role: ${user.role})`);
    res.json({
      message: 'Login สำเร็จ',
      token,
      user: {
        id:    user.user_id,
        email: user.email,
        role:  user.role
      }
    });

  } catch (err) {
    console.error('[AUTH] Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─────────────────────────────────────────────
// GET /api/auth/verify — ตรวจสอบ token (internal use)
// ─────────────────────────────────────────────
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ valid: false, error: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, error: err.message });
  }
});

// ─────────────────────────────────────────────
// GET /api/auth/health — health check
// ─────────────────────────────────────────────
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service', time: new Date() });
});

module.exports = router;
```

### 1.6 Main App Entry Point

**`auth-service/src/index.js`:**
```javascript
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const { initDB } = require('./db/db');
const authRoutes = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
app.use(cors());
app.use(express.json());

// Morgan: log ทุก request ในรูปแบบที่ Loki อ่านได้
morgan.token('body-size', (req) => {
  return req.body ? JSON.stringify(req.body).length + 'b' : '0b';
});
app.use(morgan(':method :url :status :response-time ms - body::body-size', {
  stream: {
    write: (msg) => console.log(msg.trim())  // stdout → Docker log driver
  }
}));

// ── Routes ──
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ── Start ──
async function start() {
  // รอ DB พร้อม
  let retries = 10;
  while (retries > 0) {
    try {
      await initDB();
      break;
    } catch (err) {
      console.log(`[auth-service] Waiting for DB... (${retries} retries left)`);
      retries--;
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  app.listen(PORT, () => {
    console.log(`[auth-service] Running on port ${PORT}`);
    console.log(`[auth-service] JWT_EXPIRES: ${process.env.JWT_EXPIRES || '1h'}`);
  });
}

start();
```

### 1.7 Dockerfile

**`auth-service/Dockerfile`:**
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY src/ ./src/

# Non-root user (security best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/auth/health || exit 1

CMD ["node", "src/index.js"]
```

---

## 👤 Part 2: สร้าง User Service (20 นาที)

User Service จัดการข้อมูล Profile ของ User (ไม่ใช่ password — อยู่ที่ Auth Service)

### 2.1 Setup

```bash
cd user-service
npm init -y
npm install express jsonwebtoken pg dotenv cors morgan
cd ..
```

### 2.2 Database Schema

**`user-service/src/db/init.sql`:**
```sql
CREATE TABLE IF NOT EXISTS user_profiles (
  id          SERIAL PRIMARY KEY,
  user_id     VARCHAR(50) UNIQUE NOT NULL,  -- ตรงกับ auth_users.user_id
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  role        VARCHAR(20) DEFAULT 'member',
  avatar_url  VARCHAR(500),
  bio         TEXT,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- ข้อมูลทดสอบ (ตรงกับ auth service)
INSERT INTO user_profiles (user_id, name, email, role) VALUES
  ('user-001', 'Alice Smith', 'alice@example.com', 'member'),
  ('user-002', 'Bob Jones',   'bob@example.com',   'member'),
  ('user-admin', 'Admin User', 'admin@example.com', 'admin')
ON CONFLICT DO NOTHING;
```

### 2.3 Auth Middleware (ใช้ร่วมกับ Task Service)

**`user-service/src/middleware/authMiddleware.js`:**
```javascript
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';

/**
 * Middleware ตรวจสอบ JWT Token
 * ถ้าผ่าน → ใส่ req.user = decoded payload
 * ถ้าไม่ผ่าน → ส่ง 401
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'กรุณา Login ก่อน — ไม่พบ Token ใน Authorization header'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // ต่อ pipeline
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token Expired',
        message: 'Token หมดอายุ กรุณา Login ใหม่'
      });
    }
    return res.status(401).json({
      error: 'Invalid Token',
      message: 'Token ไม่ถูกต้อง'
    });
  }
}

/**
 * Middleware ตรวจสอบ Role
 * @param  {...string} roles - roles ที่อนุญาต เช่น 'admin', 'member'
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `ต้องการสิทธิ์: ${roles.join(' หรือ ')} (คุณมีสิทธิ์: ${req.user.role})`
      });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
```

### 2.4 User Routes

**`user-service/src/routes/users.js`:**
```javascript
const express = require('express');
const { pool } = require('../db/db');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/users/me — ดูโปรไฟล์ตัวเอง (ต้อง login)
router.get('/me', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [req.user.sub]
    );
    if (!result.rows[0]) {
      return res.status(404).json({ error: 'ไม่พบข้อมูล profile' });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('[USER] /me error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users — ดู users ทั้งหมด (admin only)
router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, user_id, name, email, role, created_at FROM user_profiles ORDER BY created_at DESC'
    );
    res.json({ users: result.rows, total: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users/health
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-service' });
});

module.exports = router;
```

### 2.5 Main Entry + Dockerfile

**`user-service/src/index.js`:**
```javascript
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const { initDB } = require('./db/db');
const userRoutes = require('./routes/users');

const app  = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(morgan('combined', {
  stream: { write: (msg) => console.log(msg.trim()) }
}));

app.use('/api/users', userRoutes);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

async function start() {
  let retries = 10;
  while (retries > 0) {
    try { await initDB(); break; }
    catch {
      retries--;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  app.listen(PORT, () => console.log(`[user-service] Running on port ${PORT}`));
}

start();
```

**`user-service/src/db/db.js`:** (เหมือน auth-service แต่เปลี่ยน env var prefix)
```javascript
const { Pool } = require('pg');
const fs   = require('fs');
const path = require('path');

const pool = new Pool({
  host:     process.env.DB_HOST     || 'user-db',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'user_db',
  user:     process.env.DB_USER     || 'user_user',
  password: process.env.DB_PASSWORD || 'user_secret',
});

async function initDB() {
  const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
  await pool.query(sql);
  console.log('[user-db] Tables initialized');
}

module.exports = { pool, initDB };
```

**`user-service/Dockerfile`:** (เหมือนกันเปลี่ยนแค่ EXPOSE)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src/ ./src/
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 3003

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3003/api/users/health || exit 1

CMD ["node", "src/index.js"]
```

---

## 📋 Part 3: สร้าง Task Service พร้อม JWT Guard (20 นาที)

### 3.1 Setup

```bash
cd task-service
npm init -y
npm install express jsonwebtoken pg dotenv cors morgan
cd ..
```

### 3.2 Database Schema

**`task-service/src/db/init.sql`:**
```sql
CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  status      VARCHAR(20) DEFAULT 'TODO'
              CHECK (status IN ('TODO','IN_PROGRESS','DONE')),
  priority    VARCHAR(10) DEFAULT 'medium'
              CHECK (priority IN ('low','medium','high')),
  owner_id    VARCHAR(50) NOT NULL,     -- user_id จาก JWT
  assignee_id VARCHAR(50),
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- ข้อมูลทดสอบ
INSERT INTO tasks (title, description, status, priority, owner_id) VALUES
  ('ออกแบบ Database Schema', 'วาด ERD สำหรับ Task Board', 'DONE', 'high', 'user-001'),
  ('สร้าง Auth Service', 'Implement JWT login/register', 'IN_PROGRESS', 'high', 'user-001'),
  ('เขียน Unit Tests', 'เพิ่ม test coverage ให้ถึง 80%', 'TODO', 'medium', 'user-002'),
  ('ทำ Docker Setup', 'สร้าง docker-compose.yml', 'DONE', 'high', 'user-admin')
ON CONFLICT DO NOTHING;
```

### 3.3 Task Routes

**`task-service/src/routes/tasks.js`:**
```javascript
const express = require('express');
const { pool } = require('../db/db');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

const router = express.Router();

// GET /api/tasks — ดู tasks ทั้งหมด (ต้อง login)
router.get('/', requireAuth, async (req, res) => {
  try {
    // member เห็นแค่ tasks ของตัวเอง, admin เห็นทั้งหมด
    let query, params;
    if (req.user.role === 'admin') {
      query  = 'SELECT * FROM tasks ORDER BY created_at DESC';
      params = [];
    } else {
      query  = 'SELECT * FROM tasks WHERE owner_id = $1 OR assignee_id = $1 ORDER BY created_at DESC';
      params = [req.user.sub];
    }

    const result = await pool.query(query, params);
    res.json({ tasks: result.rows, total: result.rowCount });
  } catch (err) {
    console.error('[TASK] GET / error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/tasks — สร้าง task ใหม่ (ต้อง login)
router.post('/', requireAuth, async (req, res) => {
  const { title, description, priority, assignee_id } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title ห้ามว่าง' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, priority, owner_id, assignee_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title.trim(), description || '', priority || 'medium', req.user.sub, assignee_id || null]
    );
    console.log(`[TASK] Created by ${req.user.sub}: "${title}"`);
    res.status(201).json({ task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/tasks/:id — อัพเดท task (ต้อง login + เป็นเจ้าของหรือ admin)
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, assignee_id } = req.body;

  try {
    // ตรวจสอบเจ้าของ task
    const checkResult = await pool.query(
      'SELECT * FROM tasks WHERE id = $1', [id]
    );
    if (!checkResult.rows[0]) {
      return res.status(404).json({ error: 'ไม่พบ Task' });
    }

    const task = checkResult.rows[0];
    // Authorization: admin ทำได้ทุก task, member ทำได้เฉพาะของตัวเอง
    if (req.user.role !== 'admin' && task.owner_id !== req.user.sub) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'คุณไม่มีสิทธิ์แก้ไข Task นี้'
      });
    }

    const result = await pool.query(
      `UPDATE tasks
       SET title       = COALESCE($1, title),
           description = COALESCE($2, description),
           status      = COALESCE($3, status),
           priority    = COALESCE($4, priority),
           assignee_id = COALESCE($5, assignee_id),
           updated_at  = NOW()
       WHERE id = $6
       RETURNING *`,
      [title, description, status, priority, assignee_id, id]
    );
    res.json({ task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/tasks/:id — ลบ task (admin หรือเจ้าของ)
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const checkResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (!checkResult.rows[0]) {
      return res.status(404).json({ error: 'ไม่พบ Task' });
    }

    if (req.user.role !== 'admin' && checkResult.rows[0].owner_id !== req.user.sub) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    console.log(`[TASK] Deleted task ${id} by ${req.user.sub}`);
    res.json({ message: 'ลบ Task สำเร็จ' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/tasks/health
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'task-service' });
});

module.exports = router;
```

### 3.4 Main Entry

**`task-service/src/index.js`:** (copy จาก user-service แก้ PORT=3002 และ routes)
```javascript
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const { initDB } = require('./db/db');
const taskRoutes = require('./routes/tasks');

const app  = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(morgan('combined', {
  stream: { write: (msg) => console.log(msg.trim()) }
}));

app.use('/api/tasks', taskRoutes);
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

async function start() {
  let retries = 10;
  while (retries > 0) {
    try { await initDB(); break; }
    catch { retries--; await new Promise(r => setTimeout(r, 3000)); }
  }
  app.listen(PORT, () => console.log(`[task-service] Running on port ${PORT}`));
}

start();
```

**`task-service/src/db/db.js`:** (เหมือน user-service แก้ env vars เป็น task-db)
```javascript
const { Pool } = require('pg');
const fs   = require('fs');
const path = require('path');

const pool = new Pool({
  host:     process.env.DB_HOST     || 'task-db',
  port:     5432,
  database: process.env.DB_NAME     || 'task_db',
  user:     process.env.DB_USER     || 'task_user',
  password: process.env.DB_PASSWORD || 'task_secret',
});

async function initDB() {
  const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
  await pool.query(sql);
  console.log('[task-db] Tables initialized');
}

module.exports = { pool, initDB };
```

**หมายเหตุ:** Copy `authMiddleware.js` จาก user-service ไปวางใน `task-service/src/middleware/` (ใช้ code เดิมได้เลย)

```bash
cp user-service/src/middleware/authMiddleware.js task-service/src/middleware/authMiddleware.js
```

**`task-service/Dockerfile`:** (เหมือน auth-service เปลี่ยน EXPOSE 3002)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src/ ./src/
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 3002

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3002/api/tasks/health || exit 1

CMD ["node", "src/index.js"]
```

---

## 🚪 Part 4: API Gateway (Nginx) + Rate Limiting (15 นาที)

Nginx ทำหน้าที่เป็น "ประตูเดียว" ที่รับ request ทุกอย่าง ก่อนส่งต่อไปยัง service ที่ถูกต้อง

### 4.1 Nginx Config

**`nginx/nginx.conf`:**
```nginx
# ─────────────────────────────────────────────
# Nginx: API Gateway + Rate Limiter สำหรับ Task Board
# Week 12 Security Architecture
# ─────────────────────────────────────────────

# Rate limiting zones
# auth zone: จำกัด 5 requests/นาที ต่อ IP (กัน Brute-force)
limit_req_zone $binary_remote_addr zone=auth_limit:10m rate=5r/m;
# api zone: จำกัด 30 requests/นาที ต่อ IP
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=30r/m;

upstream auth_service {
    server auth-service:3001;
}

upstream task_service {
    server task-service:3002;
}

upstream user_service {
    server user-service:3003;
}

server {
    listen 80;
    server_name localhost;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer" always;

    # ─── Auth routes (public - ไม่ต้อง JWT) ───
    location /api/auth/ {
        limit_req zone=auth_limit burst=3 nodelay;
        limit_req_status 429;

        proxy_pass         http://auth_service;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # ─── Task routes (protected - ต้อง JWT) ───
    location /api/tasks/ {
        limit_req zone=api_limit burst=10 nodelay;

        # Nginx ส่งต่อ Authorization header ไปด้วย
        # JWT verify จะเกิดที่ task-service middleware
        proxy_pass         http://task_service;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   Authorization $http_authorization;
    }

    # ─── User routes (protected - ต้อง JWT) ───
    location /api/users/ {
        limit_req zone=api_limit burst=10 nodelay;

        proxy_pass         http://user_service;
        proxy_http_version 1.1;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   Authorization $http_authorization;
    }

    # ─── Frontend (static files) ───
    location / {
        root   /usr/share/nginx/html;
        index  index.html;
        try_files $uri $uri/ /index.html;
    }

    # ─── Health check ───
    location /health {
        access_log off;
        return 200 '{"status":"ok","gateway":"nginx"}';
        add_header Content-Type application/json;
    }

    # ─── Rate limit error page ───
    error_page 429 /429.json;
    location /429.json {
        internal;
        return 429 '{"error":"Too Many Requests","message":"ส่ง request มากเกินไป กรุณารอสักครู่"}';
        add_header Content-Type application/json;
    }
}
```

### 4.2 Nginx Dockerfile

**`nginx/Dockerfile`:**
```dockerfile
FROM nginx:alpine

# ลบ config เดิม
RUN rm /etc/nginx/conf.d/default.conf

# Copy config ใหม่
COPY nginx.conf /etc/nginx/conf.d/default.conf

# รอ services ก่อน start
EXPOSE 80
```

---

## 📊 Part 5: Centralized Logging ด้วย Loki + Grafana (20 นาที)

> 🔑 **Stack ที่ใช้:** `Loki` (เก็บ logs) + `Promtail` (ดึง logs จาก Docker) + `Grafana` (แสดงผล)
> ทั้งสามทำงานร่วมกัน — ขาดอันใดอันหนึ่งระบบ logging จะไม่ทำงาน!

### 5.1 ทำไม Loki ไม่ใช่ ELK?

```
┌────────────────────────────────────────────────────────────────┐
│              Loki vs ELK: สำหรับนักศึกษามือใหม่                     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ELK Stack (Elasticsearch + Logstash + Kibana)                 │
│  ✅ Full-text search, มีฟีเจอร์เยอะ                               │
│  ❌ RAM 4GB+, ตั้งค่ายาก, เหมาะ Production scale                  │
│                                                                │
│  Loki + Grafana                                                │
│  ✅ RAM แค่ 512MB, ตั้งค่าง่าย                                      │
│  ✅ เหมาะสำหรับเรียนรู้ระบบ logging                                │
│  ✅ Grafana ใช้ดู Metrics ได้ด้วย (ใช้ต่อยอดได้)                      │
│  ❌ ไม่มี full-text search                                       │
│                                                                │
│  → เราเลือก Loki สำหรับ Lab นี้ 🎯                                 │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 5.2 Loki Config

**`monitoring/loki-config.yaml`:**
```yaml
auth_enabled: false

server:
  http_listen_port: 3100
  grpc_listen_port: 9096

common:
  instance_addr: 127.0.0.1
  path_prefix: /tmp/loki
  storage:
    filesystem:
      chunks_directory: /tmp/loki/chunks
      rules_directory: /tmp/loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

query_range:
  results_cache:
    cache:
      embedded_cache:
        enabled: true
        max_size_mb: 100

schema_config:
  configs:
    - from: 2020-10-24
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

ruler:
  alertmanager_url: http://localhost:9093

limits_config:
  reject_old_samples: true
  reject_old_samples_max_age: 168h
```

### 5.3 Grafana Datasource

**`monitoring/grafana/datasource.yml`:**
```yaml
apiVersion: 1

datasources:
  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100
    isDefault: true
    version: 1
    editable: true
    jsonData:
      timeout: 60
      maxLines: 1000
```

### 5.4 Promtail Config (สำคัญมาก!)

> ⚠️ **Loki ไม่ได้รับ logs จาก Docker โดยอัตโนมัติ** — ต้องมี **Promtail** ทำหน้าที่เป็น log collector ที่อ่าน Docker log files แล้วส่งเข้า Loki

**`monitoring/promtail-config.yaml`:**
```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: docker-containers
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
        filters:
          - name: label
            values: ["com.docker.compose.project=task-board-security"]
    relabel_configs:
      # ใช้ container name เป็น label
      - source_labels: ['__meta_docker_container_name']
        regex: '/(.*)'
        target_label: 'container'
      # ใช้ compose service name
      - source_labels: ['__meta_docker_container_label_com_docker_compose_service']
        target_label: 'service'
    pipeline_stages:
      # แยก level จาก logs (morgan format: GET /api/auth/login 200)
      - regex:
          expression: '(?P<method>GET|POST|PUT|DELETE|PATCH) (?P<path>/\S*) (?P<status>\d{3})'
      - labels:
          method:
          status:
```

### 5.4 วิธีดู Logs ใน Grafana

หลัง `docker compose up` เสร็จ:

```
1. เปิด http://localhost:3000  (Grafana)
2. Login: admin / admin
3. ซ้ายบน → Explore (icon กล้อง)
4. เลือก datasource: Loki
5. ใส่ LogQL query:
```

**Query ที่มีประโยชน์สำหรับ Security:**

```logql
# ดู logs ทั้งหมดจาก auth-service
{container_name="task-board-security-auth-service-1"}

# ดู failed login
{container_name=~".*auth.*"} |= "Login failed"

# ดู 401 errors
{container_name=~".*task.*"} |= "401"

# ดู requests ทุกอย่าง
{compose_service=~"auth-service|task-service|user-service"}

# กรองเฉพาะ error
{compose_service="task-service"} |= "error" | logfmt
```

---

## 🐳 Part 6: Docker Compose รวมทุก Service (15 นาที)

### 6.1 Environment Variables

**`.env`:**
```env
# ─── JWT Config ───
JWT_SECRET=super-secret-key-change-in-production-min-32-chars
JWT_EXPIRES=1h

# ─── Auth DB ───
AUTH_DB_HOST=auth-db
AUTH_DB_NAME=auth_db
AUTH_DB_USER=auth_user
AUTH_DB_PASSWORD=auth_db_password_2024

# ─── Task DB ───
TASK_DB_HOST=task-db
TASK_DB_NAME=task_db
TASK_DB_USER=task_user
TASK_DB_PASSWORD=task_db_password_2024

# ─── User DB ───
USER_DB_HOST=user-db
USER_DB_NAME=user_db
USER_DB_USER=user_user
USER_DB_PASSWORD=user_db_password_2024

# ─── Ports ───
AUTH_SERVICE_PORT=3001
TASK_SERVICE_PORT=3002
USER_SERVICE_PORT=3003
GATEWAY_PORT=80
GRAFANA_PORT=3030   # ← เปลี่ยนจาก 3000 เพื่อไม่สับสนกับ Node.js services
```

### 6.2 Docker Compose

**`docker-compose.yml`:**
```yaml
name: task-board-security

services:

  # ─────────── API Gateway ───────────
  nginx:
    build: ./nginx
    container_name: taskboard-gateway
    ports:
      - "80:80"
    volumes:
      - ./frontend:/usr/share/nginx/html:ro
    depends_on:
      auth-service:
        condition: service_healthy
      task-service:
        condition: service_healthy
      user-service:
        condition: service_healthy
    networks:
      - taskboard-net
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "service=nginx"

  # ─────────── Auth Service ───────────
  auth-service:
    build: ./auth-service
    container_name: taskboard-auth
    environment:
      PORT: 3001
      JWT_SECRET: ${JWT_SECRET}
      JWT_EXPIRES: ${JWT_EXPIRES}
      DB_HOST: auth-db
      DB_NAME: ${AUTH_DB_NAME}
      DB_USER: ${AUTH_DB_USER}
      DB_PASSWORD: ${AUTH_DB_PASSWORD}
    depends_on:
      auth-db:
        condition: service_healthy
    networks:
      - taskboard-net
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        tag: "auth-service"

  auth-db:
    image: postgres:15-alpine
    container_name: taskboard-auth-db
    environment:
      POSTGRES_DB: ${AUTH_DB_NAME}
      POSTGRES_USER: ${AUTH_DB_USER}
      POSTGRES_PASSWORD: ${AUTH_DB_PASSWORD}
    volumes:
      - auth-db-data:/var/lib/postgresql/data
    networks:
      - taskboard-net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${AUTH_DB_USER} -d ${AUTH_DB_NAME}"]
      interval: 5s
      timeout: 5s
      retries: 10

  # ─────────── Task Service ───────────
  task-service:
    build: ./task-service
    container_name: taskboard-task
    environment:
      PORT: 3002
      JWT_SECRET: ${JWT_SECRET}
      DB_HOST: task-db
      DB_NAME: ${TASK_DB_NAME}
      DB_USER: ${TASK_DB_USER}
      DB_PASSWORD: ${TASK_DB_PASSWORD}
    depends_on:
      task-db:
        condition: service_healthy
    networks:
      - taskboard-net
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        tag: "task-service"

  task-db:
    image: postgres:15-alpine
    container_name: taskboard-task-db
    environment:
      POSTGRES_DB: ${TASK_DB_NAME}
      POSTGRES_USER: ${TASK_DB_USER}
      POSTGRES_PASSWORD: ${TASK_DB_PASSWORD}
    volumes:
      - task-db-data:/var/lib/postgresql/data
    networks:
      - taskboard-net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${TASK_DB_USER} -d ${TASK_DB_NAME}"]
      interval: 5s
      timeout: 5s
      retries: 10

  # ─────────── User Service ───────────
  user-service:
    build: ./user-service
    container_name: taskboard-user
    environment:
      PORT: 3003
      JWT_SECRET: ${JWT_SECRET}
      DB_HOST: user-db
      DB_NAME: ${USER_DB_NAME}
      DB_USER: ${USER_DB_USER}
      DB_PASSWORD: ${USER_DB_PASSWORD}
    depends_on:
      user-db:
        condition: service_healthy
    networks:
      - taskboard-net
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        tag: "user-service"

  user-db:
    image: postgres:15-alpine
    container_name: taskboard-user-db
    environment:
      POSTGRES_DB: ${USER_DB_NAME}
      POSTGRES_USER: ${USER_DB_USER}
      POSTGRES_PASSWORD: ${USER_DB_PASSWORD}
    volumes:
      - user-db-data:/var/lib/postgresql/data
    networks:
      - taskboard-net
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${USER_DB_USER} -d ${USER_DB_NAME}"]
      interval: 5s
      timeout: 5s
      retries: 10

  # ─────────── Monitoring: Loki ───────────
  loki:
    image: grafana/loki:2.9.0
    container_name: taskboard-loki
    ports:
      - "3100:3100"
    volumes:
      - ./monitoring/loki-config.yaml:/etc/loki/local-config.yaml:ro
      - loki-data:/tmp/loki
    command: -config.file=/etc/loki/local-config.yaml
    networks:
      - taskboard-net
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:3100/ready || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ─────────── Monitoring: Promtail ─────────────────────────────────────────
  # ⚠️ สำคัญ: Loki ไม่รับ Docker logs โดยตรง — ต้องมี Promtail ดึงให้
  # Promtail อ่าน container log files แล้วส่งไป Loki
  promtail:
    image: grafana/promtail:2.9.0
    container_name: taskboard-promtail
    volumes:
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./monitoring/promtail-config.yaml:/etc/promtail/config.yaml:ro
    command: -config.file=/etc/promtail/config.yaml
    networks:
      - taskboard-net
    depends_on:
      loki:
        condition: service_healthy

  # ─────────── Monitoring: Grafana ───────────
  grafana:
    image: grafana/grafana:10.0.0
    container_name: taskboard-grafana
    ports:
      - "${GRAFANA_PORT:-3000}:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
      GF_USERS_ALLOW_SIGN_UP: "false"
    volumes:
      - grafana-data:/var/lib/grafana
      - ./monitoring/grafana:/etc/grafana/provisioning/datasources:ro
    networks:
      - taskboard-net
    depends_on:
      loki:
        condition: service_healthy

networks:
  taskboard-net:
    driver: bridge

volumes:
  auth-db-data:
  task-db-data:
  user-db-data:
  grafana-data:
  loki-data:
```

### 6.3 เริ่มระบบ

```bash
# Build และ start ทุก service
docker compose up --build

# หรือ background
docker compose up --build -d

# ดู logs
docker compose logs -f

# ดู logs เฉพาะ service
docker compose logs -f auth-service
docker compose logs -f task-service

# ตรวจสอบ containers
docker compose ps

# ตรวจสอบ Loki พร้อมรับ logs หรือยัง
curl http://localhost:3100/ready   # ควรได้: "ready"

# ตรวจสอบ Promtail กำลังดึง logs
curl http://localhost:9080/metrics | grep "promtail_" | head -5
```

**ผล output ที่ถูกต้อง:**
```
NAME                      STATUS
taskboard-gateway         Up
taskboard-auth            Up
taskboard-auth-db         Up (healthy)
taskboard-task            Up
taskboard-task-db         Up (healthy)
taskboard-user            Up
taskboard-user-db         Up (healthy)
taskboard-loki            Up
taskboard-grafana         Up
```

---

## 🧪 Part 7: Security Test Cases (40 นาที)

นี่คือส่วนที่สำคัญที่สุด — นักศึกษาจะเห็นผลต่างระหว่าง **มี** และ **ไม่มี** Security

### 🔧 เครื่องมือทดสอบ

ใช้ **curl** (command line) หรือ **Thunder Client** (VS Code extension) หรือ **Postman**

### Test Case 1: ❌ เรียก Protected API โดยไม่มี Token

```bash
# ทดสอบ: เรียก tasks โดยไม่ login
curl -X GET http://localhost/api/tasks/

# ผลที่คาดหวัง: 401 Unauthorized
```

**Expected Response:**
```json
{
  "error": "Unauthorized",
  "message": "กรุณา Login ก่อน — ไม่พบ Token ใน Authorization header"
}
```

**📝 บันทึก:**
```
Status Code ที่ได้: ______
เป็นไปตามที่คาดหวังหรือไม่: ______
เพราะเหตุใด: ______________________________
```

---

### Test Case 2: ✅ Register และ Login เพื่อรับ Token

**Step 1: Register**
```bash
curl -X POST http://localhost/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "mypassword123",
    "name": "Test User"
  }'
```

**Expected:** `201 Created` พร้อม JWT token

**Step 2: Login ด้วย user ที่มีอยู่แล้ว**
```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "Login สำเร็จ",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-001",
    "email": "alice@example.com",
    "role": "member"
  }
}
```

**📝 บันทึก Token:** (เอาไว้ใช้ Test Cases ต่อไป)
```
TOKEN=<copy token มาใส่ที่นี่>
```

```bash
# Save token เป็น variable (Linux/Mac)
TOKEN=$(curl -s -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}' | \
  python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

echo "Token saved: ${TOKEN:0:30}..."
```

---

### Test Case 3: ✅ เรียก Protected API ด้วย Token

```bash
# ดู tasks ทั้งหมด (ต้องมี token)
curl -X GET http://localhost/api/tasks/ \
  -H "Authorization: Bearer $TOKEN"
```

**Expected:** `200 OK` พร้อมรายการ tasks

**📝 บันทึก:**
```
จำนวน tasks ที่ได้: ______
Tasks แสดงเฉพาะของ alice หรือทั้งหมด: ______
เพราะเหตุใด (ดู authMiddleware.js ประกอบ): ___________
```

---

### Test Case 4: ❌ ใช้ Token ที่หมดอายุหรือ Invalid

```bash
# ทดสอบด้วย token ปลอม
curl -X GET http://localhost/api/tasks/ \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.INVALID.SIGNATURE"
```

**Expected:** `401 Invalid Token`

```bash
# ทดสอบด้วย token ที่ถูกแก้ไข (เพิ่ม x ท้าย token จริง)
curl -X GET http://localhost/api/tasks/ \
  -H "Authorization: Bearer ${TOKEN}xxx"
```

**📝 บันทึก:**
```
ทั้ง 2 กรณีให้ผลอย่างไร: ______
JWT Signature ทำงานอย่างไร: ________________________________
```

---

### Test Case 5: ❌ Authorization — Member ลบ Task ของคนอื่น

```bash
# Login เป็น Alice ก่อน
ALICE_TOKEN=$(curl -s -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}' | \
  python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

# ลอง DELETE task id=4 (เจ้าของคือ user-admin ไม่ใช่ alice)
curl -X DELETE http://localhost/api/tasks/4 \
  -H "Authorization: Bearer $ALICE_TOKEN"
```

**Expected:** `403 Forbidden`

**📝 บันทึก:**
```
ผลที่ได้: ______
Authentication vs Authorization ต่างกันอย่างไรในกรณีนี้: 
_________________________________________________
```

---

### Test Case 6: ✅ Admin ทำได้ทุกอย่าง

```bash
# Login เป็น Admin
ADMIN_TOKEN=$(curl -s -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}' | \
  python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

# Admin ดู tasks ทั้งหมด (ไม่จำกัดเฉพาะของตัวเอง)
curl -X GET http://localhost/api/tasks/ \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Admin ดู users ทั้งหมด
curl -X GET http://localhost/api/users/ \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Alice ลอง ดู users ทั้งหมด (ไม่มีสิทธิ์)
curl -X GET http://localhost/api/users/ \
  -H "Authorization: Bearer $ALICE_TOKEN"
```

**📝 บันทึก:**
```
Admin เห็น tasks กี่รายการ: ______
Alice เห็น tasks กี่รายการ: ______
Alice เรียก /api/users/ ได้ status: ______
สรุป Role-Based Access Control ทำงานอย่างไร: ______
```

---

### Test Case 7: ❌ Brute-force Attack (Rate Limiting)

```bash
# ส่ง login ผิดหลายครั้งติดกัน (เกิน 5 ครั้ง/นาที)
for i in {1..8}; do
  echo "Attempt $i:"
  curl -s -o /dev/null -w "%{http_code}" \
    -X POST http://localhost/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"alice@example.com","password":"wrongpassword"}'
  echo ""
  sleep 0.2
done
```

**Expected:** หลัง attempt ที่ 5 จะได้ `429 Too Many Requests`

**📝 บันทึก:**
```
Attempt ที่เท่าไหร่ที่เริ่มได้ 429: ______
Rate Limiting ช่วยป้องกัน Attack ชนิดใด: ______
ข้อเสียของ Rate Limiting ที่อาจเกิดขึ้น: ______
```

---

### Test Case 8: 🔍 SQL Injection Attempt

```bash
# ลอง SQL Injection ผ่าน login
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com'\''-- ",
    "password": "anything"
  }'

# ลอง SQL Injection ผ่าน task query
curl -X GET "http://localhost/api/tasks/?id=1;DROP TABLE tasks--" \
  -H "Authorization: Bearer $ALICE_TOKEN"
```

**Expected:** ทั้งสองกรณีควรไม่สามารถ inject ได้ เพราะใช้ Parameterized Queries

**📝 บันทึก:**
```
ได้ผลลัพธ์อย่างไร: ______
Parameterized Query ป้องกัน SQL Injection อย่างไร:
_________________________________________________
(ดูใน auth.js: pool.query('...WHERE email = $1', [email]))
```

---

### 📊 สรุปผลการทดสอบ

กรอกตารางนี้หลังทำ Test Cases ครบ:

| Test Case | Expected | Actual | ✅/❌ | หมายเหตุ |
|-----------|----------|--------|------|---------|
| 1. ไม่มี Token | 401 | | | |
| 2. Login สำเร็จ | 200 + Token | | | |
| 3. มี Token ถูกต้อง | 200 + data | | | |
| 4. Token Invalid | 401 | | | |
| 5. Forbidden (403) | 403 | | | |
| 6. Admin access | 200 | | | |
| 7. Rate Limit | 429 | | | |
| 8. SQL Injection | Safe | | | |

---

### 🔍 เปรียบเทียบ: Week 6 vs Week 12

```
┌────────────────────────────────────────────────────────────────┐
│            ก่อน (Week 6)          หลัง (Week 12)                 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  GET /api/tasks          GET /api/tasks                        │
│        │                       │                               │
│        ▼                       ▼                               │
│   ✅ ได้ข้อมูล           ❌ 401 Unauthorized                      │
│   (ไม่มีการตรวจสอบ)        (ถ้าไม่มี token)                         │
│                                                                │
│  ใครก็เรียกได้          ต้อง Login ก่อนเสมอ                         │
│  ลบ task ใครก็ได้        ลบได้เฉพาะของตัวเอง                       │
│  ไม่รู้ว่าใคร access     รู้ชัดเจนว่าใคร access                        │
│  ไม่มี log รวมศูนย์        มี Grafana dashboard                     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Frontend พื้นฐาน (Optional — ถ้าต้องการ UI)

**`frontend/index.html`:**
```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task Board — Week 12 Security</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="app">
    <!-- Login Section -->
    <div id="login-section" class="card">
      <h1>🔐 Task Board Login</h1>
      <p class="hint">Week 12: Security Architecture Demo</p>
      <input id="email" type="email" placeholder="Email" value="alice@example.com">
      <input id="password" type="password" placeholder="Password" value="password123">
      <button onclick="login()">Login</button>
      <div id="login-msg"></div>
    </div>

    <!-- Task Section (hidden until login) -->
    <div id="task-section" style="display:none">
      <div class="header">
        <h2>📋 My Tasks</h2>
        <span id="user-info"></span>
        <button onclick="logout()" class="btn-small">Logout</button>
      </div>

      <div class="add-task">
        <input id="task-title" placeholder="ชื่อ Task ใหม่...">
        <button onclick="createTask()">+ เพิ่ม Task</button>
      </div>

      <div id="task-list"></div>

      <div id="token-debug" class="debug-box">
        <h3>🔍 JWT Token Debug</h3>
        <div id="token-display"></div>
      </div>
    </div>
  </div>

  <script src="js/app.js"></script>
</body>
</html>
```

**`frontend/js/app.js`:**
```javascript
const API = '';  // ผ่าน Nginx proxy
let token = localStorage.getItem('jwt_token');

// ── Login ──
async function login() {
  const email    = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res  = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      token = data.token;
      localStorage.setItem('jwt_token', token);
      showTaskSection(data.user);
      loadTasks();
      showTokenDebug(token);
    } else {
      document.getElementById('login-msg').textContent = '❌ ' + data.error;
    }
  } catch (err) {
    document.getElementById('login-msg').textContent = '❌ Server error';
  }
}

// ── Show Task Section ──
function showTaskSection(user) {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('task-section').style.display  = 'block';
  document.getElementById('user-info').textContent =
    `👤 ${user.email} (${user.role})`;
}

// ── Load Tasks ──
async function loadTasks() {
  const res  = await fetch(`${API}/api/tasks/`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();

  const list = document.getElementById('task-list');
  if (!res.ok) {
    list.innerHTML = `<p class="error">❌ ${data.error || data.message}</p>`;
    return;
  }

  list.innerHTML = data.tasks.map(t => `
    <div class="task-card status-${t.status.toLowerCase()}">
      <span class="badge">${t.status}</span>
      <strong>${t.title}</strong>
      <small>by ${t.owner_id} | ${t.priority}</small>
    </div>
  `).join('');
}

// ── Create Task ──
async function createTask() {
  const title = document.getElementById('task-title').value;
  if (!title) return;

  await fetch(`${API}/api/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, priority: 'medium' })
  });

  document.getElementById('task-title').value = '';
  loadTasks();
}

// ── JWT Debug Display ──
function showTokenDebug(token) {
  const parts   = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  const exp     = new Date(payload.exp * 1000).toLocaleString('th-TH');

  document.getElementById('token-display').innerHTML = `
    <pre>Payload: ${JSON.stringify(payload, null, 2)}</pre>
    <p>⏰ หมดอายุ: ${exp}</p>
  `;
}

// ── Logout ──
function logout() {
  localStorage.removeItem('jwt_token');
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('task-section').style.display  = 'none';
  token = null;
}

// ── Auto login if token exists ──
if (token) {
  fetch(`${API}/api/auth/verify`, {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json()).then(data => {
    if (data.valid) {
      showTaskSection(data.user);
      loadTasks();
      showTokenDebug(token);
    } else {
      localStorage.removeItem('jwt_token');
    }
  });
}
```

**`frontend/css/style.css`:**
```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Segoe UI', sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  min-height: 100vh;
  padding: 2rem;
}
#app { max-width: 800px; margin: 0 auto; }
.card {
  background: #1e293b;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1rem;
}
input {
  width: 100%; padding: 0.75rem;
  margin-bottom: 0.75rem;
  background: #334155; border: 1px solid #475569;
  border-radius: 8px; color: #e2e8f0; font-size: 1rem;
}
button {
  background: #3b82f6; color: white;
  padding: 0.75rem 1.5rem;
  border: none; border-radius: 8px;
  cursor: pointer; font-size: 1rem;
}
button:hover { background: #2563eb; }
.btn-small { padding: 0.4rem 0.8rem; font-size: 0.85rem; }
.header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.task-card {
  background: #1e293b; border-radius: 8px;
  padding: 1rem; margin-bottom: 0.5rem;
  border-left: 4px solid #475569;
}
.status-todo { border-color: #64748b; }
.status-in_progress { border-color: #f59e0b; }
.status-done { border-color: #22c55e; }
.badge {
  font-size: 0.75rem; padding: 2px 8px;
  border-radius: 999px; background: #334155;
  margin-right: 0.5rem;
}
.debug-box {
  background: #0f172a; border: 1px solid #334155;
  border-radius: 8px; padding: 1rem; margin-top: 1rem;
}
pre { font-size: 0.8rem; color: #94a3b8; overflow-x: auto; }
.error { color: #f87171; }
.hint { color: #94a3b8; margin-bottom: 1rem; }
.add-task { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.add-task input { margin-bottom: 0; }
```

---

## 📝 ใบงาน + การส่งงาน

### ใบงาน Week 12: Security Architecture Analysis

กรอกคำตอบลงใน `REPORT.md` ใน git repository

**ส่วนที่ 1: Test Results (40 คะแนน)**
> กรอกตาราง Test Cases 8 ข้อ พร้อม screenshot ของ Response

**ส่วนที่ 2: Architecture Comparison (30 คะแนน)**
> วาด C2 Diagram ก่อน (Week 6) และหลัง (Week 12) ใน draw.io พร้อมอธิบาย:
> - Components ที่เพิ่มมา
> - ทำไมถึงเพิ่ม Component นั้น (จาก STRIDE threats อะไร)

**ส่วนที่ 3: ADR — Architecture Decision Record (30 คะแนน)**
> เขียน ADR สำหรับการตัดสินใจ "เพิ่ม Auth Service แยก" ลงใน `docs/ADR-001-auth-service.md` ตามรูปแบบ:

```markdown
# ADR-001: เพิ่ม Auth Service แยกจาก Task Service

## Status
Accepted

## Context
(อธิบายปัญหาที่เจอ เช่น Task Service ทำ authentication ด้วย...)

## Decision
(บอกว่าตัดสินใจทำอะไร เช่น แยก Auth Service ออกเป็น service แยก...)

## Consequences
**Positive:**
- ...
**Negative:**
- ...
**Trade-offs:**
- ...
```

### การส่งงานผ่าน Git

```bash
# โครงสร้างที่ต้อง commit
task-board-security/
├── docker-compose.yml
├── .env.example              ← .env ต้นฉบับที่ไม่มี secret จริง
├── auth-service/
├── task-service/
├── user-service/
├── nginx/
├── frontend/
├── monitoring/
├── docs/
│   └── ADR-001-auth-service.md
├── REPORT.md                 ← ใบงาน + test results
└── README.md

# ขั้นตอน
git add .
git commit -m "feat: Week 12 - Security Architecture with JWT Auth"
git push origin main
```

> ⚠️ **สำคัญ:** เพิ่ม `.env` ใน `.gitignore` — อย่า push secret จริง!

**`.gitignore`:**
```
# Secrets — ห้าม push ทุกกรณี!
.env
.env.*
!.env.example

# Dependencies
node_modules/
*/node_modules/

# Logs
*.log
logs/

# Docker data volumes
*-db-data/

# OS files
.DS_Store
Thumbs.db
```

---

## 🚀 Challenge: ต่อยอด (ถ้าเวลาเหลือ)

### Challenge 1: Token Refresh (Medium 🔥🔥)
เพิ่ม Refresh Token เพื่อให้ผู้ใช้ไม่ต้อง Login ใหม่ทุกครั้ง token หมดอายุ
```
Hint: ออก 2 tokens:
- accessToken: อายุสั้น (15 นาที)  
- refreshToken: อายุยาว (7 วัน), เก็บใน DB
POST /api/auth/refresh → ตรวจ refreshToken → ออก accessToken ใหม่
```

### Challenge 2: Log Dashboard ใน Grafana (Easy 🔥)
สร้าง Dashboard ใน Grafana แสดง:
- จำนวน login สำเร็จ/ล้มเหลวต่อชั่วโมง
- Top IPs ที่ request มากที่สุด
- Graph แสดง API response time

### Challenge 3: Role Permission System (Hard 🔥🔥🔥)
เพิ่ม Permission table เพื่อให้ Admin กำหนด permission แบบ fine-grained:
```
permissions: create_task, edit_task, delete_task, view_all_tasks
roles: admin (all), lead (all except delete), member (create+edit own)
```

---

## 🖼️ Draw.io XML Diagrams

### Diagram 1: C2 Container Diagram (Week 12)

บันทึกเป็น `docs/c2-security-architecture.drawio`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1"
  tooltips="1" connect="1" arrows="1" fold="1" page="1"
  pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <!-- Title -->
    <mxCell id="title" value="C2: Task Board Security Architecture (Week 12)"
      style="text;html=1;strokeColor=none;fillColor=none;align=center;
             verticalAlign=middle;whiteSpace=wrap;rounded=0;
             fontSize=18;fontStyle=1;" vertex="1" parent="1">
      <mxGeometry x="200" y="20" width="760" height="40" as="geometry" />
    </mxCell>

    <!-- Internet/User -->
    <mxCell id="user" value="🌐 Browser / User" 
      style="shape=mxgraph.c4.person2;whiteSpace=wrap;html=1;
             fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
      <mxGeometry x="40" y="200" width="120" height="80" as="geometry" />
    </mxCell>

    <!-- Nginx API Gateway -->
    <mxCell id="nginx" value="🛡️ Nginx API Gateway&#xa;[Container: nginx:alpine]&#xa;&#xa;- Rate Limiting (5r/m auth)&#xa;- Route /api/auth → auth-svc&#xa;- Route /api/tasks → task-svc&#xa;- Route /api/users → user-svc"
      style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f0a30a;
             fontColor=#000000;strokeColor=#BD7000;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="230" y="170" width="220" height="130" as="geometry" />
    </mxCell>

    <!-- Auth Service -->
    <mxCell id="auth-svc" value="🔑 Auth Service&#xa;[Container: Node.js]&#xa;&#xa;- POST /api/auth/login&#xa;- POST /api/auth/register&#xa;- GET /api/auth/verify&#xa;- Issues JWT Token"
      style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;
             strokeColor=#82b366;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="520" y="80" width="200" height="130" as="geometry" />
    </mxCell>

    <!-- Task Service -->
    <mxCell id="task-svc" value="📋 Task Service&#xa;[Container: Node.js]&#xa;&#xa;- CRUD /api/tasks&#xa;- JWT Middleware&#xa;- Role-based access"
      style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;
             strokeColor=#82b366;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="520" y="235" width="200" height="120" as="geometry" />
    </mxCell>

    <!-- User Service -->
    <mxCell id="user-svc" value="👤 User Service&#xa;[Container: Node.js]&#xa;&#xa;- GET /api/users/me&#xa;- GET /api/users (admin)&#xa;- JWT Middleware"
      style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;
             strokeColor=#82b366;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="520" y="375" width="200" height="120" as="geometry" />
    </mxCell>

    <!-- Auth DB -->
    <mxCell id="auth-db" value="🗄️ auth-db&#xa;[PostgreSQL]&#xa;auth_users table"
      style="shape=mxgraph.flowchart.database;whiteSpace=wrap;html=1;
             fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="1">
      <mxGeometry x="790" y="100" width="120" height="90" as="geometry" />
    </mxCell>

    <!-- Task DB -->
    <mxCell id="task-db" value="🗄️ task-db&#xa;[PostgreSQL]&#xa;tasks table"
      style="shape=mxgraph.flowchart.database;whiteSpace=wrap;html=1;
             fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="1">
      <mxGeometry x="790" y="250" width="120" height="90" as="geometry" />
    </mxCell>

    <!-- User DB -->
    <mxCell id="user-db" value="🗄️ user-db&#xa;[PostgreSQL]&#xa;user_profiles table"
      style="shape=mxgraph.flowchart.database;whiteSpace=wrap;html=1;
             fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="1">
      <mxGeometry x="790" y="390" width="120" height="90" as="geometry" />
    </mxCell>

    <!-- Loki -->
    <mxCell id="loki" value="📊 Loki + Grafana&#xa;[Monitoring Stack]&#xa;&#xa;- Centralized Logs&#xa;- Security Events&#xa;- Failed logins alert"
      style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;
             strokeColor=#9673a6;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="230" y="370" width="200" height="110" as="geometry" />
    </mxCell>

    <!-- Edges -->
    <mxCell id="e1" value="HTTPS :80" style="edgeStyle=orthogonalEdgeStyle;"
      edge="1" source="user" target="nginx" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e2" value="/api/auth/*" style="edgeStyle=orthogonalEdgeStyle;"
      edge="1" source="nginx" target="auth-svc" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e3" value="/api/tasks/* (JWT)" style="edgeStyle=orthogonalEdgeStyle;"
      edge="1" source="nginx" target="task-svc" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e4" value="/api/users/* (JWT)" style="edgeStyle=orthogonalEdgeStyle;"
      edge="1" source="nginx" target="user-svc" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e5" edge="1" source="auth-svc" target="auth-db" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e6" edge="1" source="task-svc" target="task-db" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e7" edge="1" source="user-svc" target="user-db" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e8" value="stdout logs" style="dashed=1;"
      edge="1" source="auth-svc" target="loki" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e9" value="stdout logs" style="dashed=1;"
      edge="1" source="task-svc" target="loki" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
  </root>
</mxGraphModel>
```

---

## 🔧 Troubleshooting

### ปัญหา: Service ไม่ start เพราะ DB ยังไม่พร้อม

```bash
# รอแล้วลอง restart
docker compose restart auth-service

# หรือ recreate
docker compose up --force-recreate auth-service
```

### ปัญหา: 401 ทั้งที่ส่ง Token ถูกต้อง

```bash
# ตรวจสอบ JWT_SECRET เหมือนกันทุก service
docker compose exec auth-service printenv JWT_SECRET
docker compose exec task-service printenv JWT_SECRET

# ต้องตรงกัน! ถ้าไม่ตรง:
# แก้ .env แล้ว docker compose up --force-recreate
```

### ปัญหา: Grafana ไม่แสดง logs

```bash
# ตรวจว่า Loki พร้อมหรือยัง
curl http://localhost:3100/ready

# ดู Grafana logs
docker compose logs grafana

# ลอง query ใน Grafana ด้วย: {job="varlogs"}
```

### ปัญหา: Rate Limit ติด 429 ระหว่างทดสอบ

```bash
# รอ 1 นาที หรือ restart nginx เพื่อ reset counter
docker compose restart nginx
```

### ปัญหา: Port conflict

```bash
# ตรวจว่า port 80, 3000, 3100 ถูกใช้งานหรือไม่
sudo lsof -i :80
sudo lsof -i :3000

# แก้ ports ใน docker-compose.yml ถ้าจำเป็น
# เช่น "8080:80" แทน "80:80"
```

---

## 📊 สรุปสิ่งที่เรียนรู้

```
┌────────────────────────────────────────────────────────────────────┐
│                Week 12 Lab: สรุปสิ่งที่เรียนรู้                            │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ✅ Authentication vs Authorization                                │
│     • AuthN = พิสูจน์ตัวตน (JWT Login)                                 │
│     • AuthZ = ตรวจสิทธิ์ (Role-based access)                          │
│                                                                    │
│  ✅ JWT Token Structure                                            │
│     • Header.Payload.Signature                                     │
│     • Payload อ่านได้ แต่ปลอมแปลงไม่ได้                                 │
│     • มีอายุ (exp) — token หมดอายุ ต้อง login ใหม่                      │
│                                                                    │
│  ✅ Auth Service Pattern                                           │
│     • แยก Authentication ออกเป็น service เดียว                       │
│     • Single Responsibility Principle                              │
│     • JWT Secret ใช้ร่วมกันผ่าน environment variable                   │
│                                                                    │
│  ✅ Defense in Depth                                               │
│     • Rate Limiting (Nginx) — ชั้นที่ 1                                │
│     • JWT Validation — ชั้นที่ 2                                       │
│     • Role-based Authorization — ชั้นที่ 3                             │
│     • Parameterized Queries (SQL Injection) — ชั้นที่ 4                │
│                                                                    │
│  ✅ Centralized Logging                                            │
│     • ทุก service log ผ่าน stdout                                    │
│     • Docker log driver รวบรวม logs                                │
│     • Loki + Grafana ดูและค้นหา logs ได้                              │
│                                                                    │
│  ✅ Trade-offs ที่พบ                                                 │
│     • Complexity เพิ่ม (9 containers แทน 3)                          │
│     • JWT adds ~5ms latency ต่อ request                             │
│     • Rate Limit อาจกวนผู้ใช้ที่ใช้งานปกติ                                │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

*Document Version: 1.1 (Revised — Promtail Added, Bug Fixes Applied)*
*Course: ENGSE207 Software Architecture — Week 12 Lab*
*Instructor: นายธนิต เกตุแก้ว*
*มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*
