# ENGSE207 Software Architecture
# Final Lab (Sec1) — ชุดที่ 2: Microservices + Database-per-Service + Cloud (Railway)

> **งานสอบปฏิบัติ | กลุ่มละ 2 คน | 6 ชั่วโมง | คะแนนเต็ม 100 คะแนน**
>
> **ต่อยอดจาก Final Lab Set 1 โดยตรง** — เริ่มจาก codebase ที่มีอยู่แล้ว ไม่ต้องเริ่มใหม่
>
> **ส่งผ่าน Git Repository เท่านั้น** (Repository ใหม่สำหรับ Set 2)

---

## สารบัญ

1. [ภาพรวมและสิ่งที่ต้องพัฒนาเพิ่ม](#1-ภาพรวมและสิ่งที่ต้องพัฒนาเพิ่ม)
2. [สถาปัตยกรรม Set 2](#2-สถาปัตยกรรม-set-2)
3. [Phase 1: ปรับ Codebase ให้พร้อม Deploy](#3-phase-1-ปรับ-codebase-ให้พร้อม-deploy)
4. [Phase 2: Deploy Auth Service บน Railway](#4-phase-2-deploy-auth-service-บน-railway)
5. [Phase 3: Deploy Task Service บน Railway](#5-phase-3-deploy-task-service-บน-railway)
6. [Phase 4: Deploy User Service บน Railway](#6-phase-4-deploy-user-service-บน-railway)
7. [Phase 5: Frontend + Gateway Strategy](#7-phase-5-frontend--gateway-strategy)
8. [Phase 6: Test Cases และ Screenshots](#8-phase-6-test-cases-และ-screenshots)
9. [วิธีการส่งงาน](#9-วิธีการส่งงาน)
10. [การประเมินผล](#10-การประเมินผล)
11. [เอกสารบังคับ (TEAM_SPLIT / INDIVIDUAL_REPORT)](#11-เอกสารบังคับ)
12. [แนวทางการสัมภาษณ์รายบุคคล](#12-แนวทางการสัมภาษณ์รายบุคคล)

---

## 1. ภาพรวมและสิ่งที่ต้องพัฒนาเพิ่ม

Final Lab Set 2 ต่อยอดจาก Set 1 โดยตรง มีเป้าหมายหลัก 3 ประการ:

1. **เพิ่ม Register API** ให้ Auth Service (Set 1 ไม่มี)
2. **เพิ่ม User Service** (service ใหม่ — จัดการข้อมูลโปรไฟล์)
3. **Deploy ทุก Service ขึ้น Railway Cloud**

### สิ่งที่เปลี่ยนจาก Set 1

| Set 1 | Set 2 |
|---|---|
| 4 services: auth, task, log, frontend | 3 services บน Cloud: auth, task, user |
| Shared PostgreSQL (1 DB) | Database-per-Service (3 DB แยก) |
| Log Service แยก | แต่ละ service log ลง DB ของตัวเอง |
| ไม่มี Register | มี Register API ใน Auth Service |
| Local-only (HTTPS + Nginx) | Deploy บน Railway (HTTPS อัตโนมัติ) |
| Frontend + Nginx เป็น container | Frontend เป็น static file (Railway หรือ local) |

> **หมายเหตุ:** Nginx + HTTPS + Log Service จาก Set 1 ไม่ได้ deploy ขึ้น Railway ในงานชุดนี้  
> Railway จัดการ HTTPS ให้อัตโนมัติ และ Logging จะทำผ่าน DB แต่ละ service แทน

### การแบ่งเวลาโดยประมาณ (6 ชั่วโมง)

| Phase | งาน | เวลา |
|---|---|---:|
| Phase 1 | ปรับ Codebase: Register, User Service, ทดสอบ Local | 90 นาที |
| Phase 2 | Deploy Auth Service + auth-db บน Railway | 50 นาที |
| Phase 3 | Deploy Task Service + task-db บน Railway | 45 นาที |
| Phase 4 | Deploy User Service + user-db บน Railway | 45 นาที |
| Phase 5 | Frontend config, Gateway Strategy, ทดสอบ End-to-End | 60 นาที |
| Phase 6 | README, TEAM_SPLIT, INDIVIDUAL_REPORT, Screenshots, Push | 70 นาที |

### วัตถุประสงค์การเรียนรู้

| วัตถุประสงค์ | CLO |
|---|---|
| ออกแบบ Database-per-Service Pattern ได้ | CLO3, CLO6 |
| ขยายระบบเดิมโดยเพิ่ม Register API และ User Service ได้ | CLO6 |
| Deploy 3 services และ 3 databases บน Railway ได้ | CLO7, CLO14 |
| เลือกและอธิบาย Gateway Strategy สำหรับ Cloud Services ได้ | CLO6, CLO7 |
| ทดสอบระบบแบบ end-to-end บน Cloud ได้ | CLO14 |

---

## 2. สถาปัตยกรรม Set 2

### สถาปัตยกรรม Local (Docker Compose ทดสอบ)

```
Browser / Postman
        │
        ▼
┌──────────────────────────────────────────────────────────────────────┐
│   Docker Compose (Local Test)                                        │
│                                                                      │
│  ┌────────────────┐  ┌──────────────────┐  ┌────────────────────┐    │
│  │ 🔑 Auth Svc    │  │ 📋 Task Svc      │  │ 👤 User Svc        │    │
│  │   :3001        │  │   :3002          │  │   :3003            │    │
│  │                │  │                  │  │                    │    │
│  │ • POST register│  │ • CRUD Tasks     │  │ • GET /me          │    │
│  │ • POST login   │  │ • JWT Guard      │  │ • PUT /me          │    │
│  │ • GET  me      │  │ • log → auth-db  │  │ • GET / (admin)    │    │
│  │ • GET  logs*   │  │                  │  │ • auto-create      │    │
│  └───────┬────────┘  └────────┬─────────┘  └─────────┬──────────┘    │
│          │                   │                       │              │
│          ▼                   ▼                       ▼              │
│  ┌───────────────┐  ┌────────────────────┐  ┌──────────────────────┐ │
│  │  🗄️ auth-db   │  │  🗄️ task-db        │  │  🗄️ user-db          │ │
│  │  :5433        │  │  :5434             │  │  :5435               │ │
│  │  users table  │  │  tasks table       │  │  user_profiles table │ │
│  │  logs table   │  │  logs table        │  │  logs table          │ │
│  └───────────────┘  └────────────────────┘  └──────────────────────┘ │
│                                                                      │
│  JWT_SECRET ใช้ร่วมกันทุก service (ตั้งค่าใน docker-compose)           │
└──────────────────────────────────────────────────────────────────────┘

* GET /api/auth/logs — admin only (ดู logs ของ auth-service)
```

### สถาปัตยกรรม Cloud (Railway)

```
Browser / Postman
        │
        │ HTTPS (Railway จัดการให้อัตโนมัติ)
        ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     Railway Project                                  │
│                                                                      │
│  Auth Service                Task Service         User Service       │
│  https://auth-xxx.railway.app   https://task-xxx…  https://user-xxx…  │
│       │                            │                    │            │
│       ▼                            ▼                    ▼            │
│   auth-db (PostgreSQL)        task-db (PostgreSQL)  user-db (PostgreSQL) │
│   [Railway Plugin]            [Railway Plugin]      [Railway Plugin] │
│                                                                      │
│  Frontend เรียกแต่ละ service โดยตรงผ่าน config.js                      │
└──────────────────────────────────────────────────────────────────────┘
```

> **หมายเหตุสำคัญ:** ใน Set 2 ไม่มี `log-service` แยกต่างหาก แต่ละ service  
> จะเขียน log ลง DB ของตัวเองโดยตรง และ admin สามารถดู log ได้ผ่าน endpoint  
> ของแต่ละ service (เช่น `GET /api/auth/logs`)

---

## 3. Phase 1: ปรับ Codebase ให้พร้อม Deploy

### 3.1 โครงสร้าง Repository ใหม่

```
final-lab-set2-[student1]-[student2]/
├── README.md
├── TEAM_SPLIT.md
├── INDIVIDUAL_REPORT_[studentid].md   (ทุกคน)
├── docker-compose.yml                 (ใช้ทดสอบ local เท่านั้น)
├── .env.example
│
├── auth-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── init.sql                       ← schema + seed users สำหรับ auth-db
│   └── src/
│       ├── index.js
│       ├── db/db.js
│       ├── middleware/jwtUtils.js
│       └── routes/auth.js             ← เพิ่ม /register
│
├── task-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── init.sql                       ← schema สำหรับ task-db
│   └── src/
│       ├── index.js
│       ├── db/db.js
│       ├── middleware/authMiddleware.js
│       ├── middleware/jwtUtils.js
│       └── routes/tasks.js
│
├── user-service/                      ← service ใหม่
│   ├── Dockerfile
│   ├── package.json
│   ├── init.sql                       ← schema สำหรับ user-db
│   └── src/
│       ├── index.js
│       ├── db/db.js
│       ├── middleware/authMiddleware.js
│       ├── middleware/jwtUtils.js
│       └── routes/users.js
│
├── frontend/
│   ├── index.html                     ← ปรับให้มี Register + ใช้ config.js
│   ├── profile.html                   ← หน้าดู/แก้ไข profile
│   └── config.js                      ← Service URLs
│
└── screenshots/
```

### 3.2 DB Schema สำหรับ Set 2

**`auth-service/init.sql`:**
```sql
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(50)  UNIQUE NOT NULL,
  email         VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  DEFAULT 'member',
  created_at    TIMESTAMP    DEFAULT NOW(),
  last_login    TIMESTAMP
);

-- logs table สำหรับ auth-service (แทน Log Service แยก)
CREATE TABLE IF NOT EXISTS logs (
  id         SERIAL       PRIMARY KEY,
  level      VARCHAR(10)  NOT NULL CHECK (level IN ('INFO','WARN','ERROR')),
  event      VARCHAR(100) NOT NULL,
  user_id    INTEGER,
  ip_address VARCHAR(45),
  message    TEXT,
  meta       JSONB,
  created_at TIMESTAMP    DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_auth_logs_created_at ON logs(created_at DESC);

-- Seed users สำหรับทดสอบ (bcrypt hash จริง)
INSERT INTO users (username, email, password_hash, role) VALUES
  ('alice', 'alice@lab.local',
   '$2b$10$PjnT4Aw1VHdFD89uFMsbtOunaa8XXNtp.8aGFlC4Rf2F1zAp3V.KC',
   'member'),
  ('admin', 'admin@lab.local',
   '$2b$10$ZFSu9jujm16MjmDzk3fIYO36TyW7tNXJl3MGQuDkWBoiaiNJ2iFca',
   'admin')
ON CONFLICT (username) DO NOTHING;
```

**`task-service/init.sql`:**
```sql
CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER      NOT NULL,   -- logical ref ไปยัง auth-db.users.id
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  status      VARCHAR(20)  DEFAULT 'TODO' CHECK (status IN ('TODO','IN_PROGRESS','DONE')),
  priority    VARCHAR(10)  DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
  created_at  TIMESTAMP    DEFAULT NOW(),
  updated_at  TIMESTAMP    DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS logs (
  id         SERIAL       PRIMARY KEY,
  level      VARCHAR(10)  NOT NULL CHECK (level IN ('INFO','WARN','ERROR')),
  event      VARCHAR(100) NOT NULL,
  user_id    INTEGER,
  message    TEXT,
  meta       JSONB,
  created_at TIMESTAMP    DEFAULT NOW()
);
```

**`user-service/init.sql`:**
```sql
CREATE TABLE IF NOT EXISTS user_profiles (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER UNIQUE NOT NULL,  -- logical ref ไปยัง auth-db.users.id
  username     VARCHAR(50),
  email        VARCHAR(100),
  role         VARCHAR(20) DEFAULT 'member',
  display_name VARCHAR(100),
  bio          TEXT,
  avatar_url   VARCHAR(255),
  updated_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS logs (
  id         SERIAL       PRIMARY KEY,
  level      VARCHAR(10)  NOT NULL CHECK (level IN ('INFO','WARN','ERROR')),
  event      VARCHAR(100) NOT NULL,
  user_id    INTEGER,
  message    TEXT,
  meta       JSONB,
  created_at TIMESTAMP    DEFAULT NOW()
);
```

> **หมายเหตุ:** ใน Set 2 ไม่มี Foreign Key ข้ามฐานข้อมูล  
> `user_id` ใน `task-db` และ `user-db` เป็น **logical reference** ไปยัง `auth-db.users.id`  
> ค่านี้ได้มาจาก JWT payload (`sub`) ซึ่ง auth-service ออกให้

### 3.3 JWT Payload ที่ทุก Service ใช้ร่วมกัน

```json
{
  "sub": 1,
  "email": "alice@lab.local",
  "username": "alice",
  "role": "member"
}
```

`JWT_SECRET` ต้องมีค่าเหมือนกันทุก service

### 3.4 เพิ่ม Register API ใน Auth Service

เพิ่มใน **`auth-service/src/routes/auth.js`** (ก่อน route `/login`):

```javascript
const bcrypt = require('bcryptjs');
// ... (import ที่มีอยู่แล้ว)

// Helper: บันทึก log ลง DB ของ auth-service เอง
async function logEvent({ level, event, userId, ip, message, meta }) {
  try {
    await pool.query(
      `INSERT INTO logs (level, event, user_id, ip_address, message, meta)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [level, event, userId || null, ip || null, message || null,
       meta ? JSON.stringify(meta) : null]
    );
  } catch (e) {
    console.error('[auth-log]', e.message);
  }
}

// ── POST /api/auth/register ────────────────────────────────────────────
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.ip;

  if (!username || !email || !password)
    return res.status(400).json({ error: 'username, email, password are required' });

  if (password.length < 6)
    return res.status(400).json({ error: 'password ต้องมีอย่างน้อย 6 ตัวอักษร' });

  try {
    const exists = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email.toLowerCase().trim(), username.trim()]
    );
    if (exists.rows.length > 0)
      return res.status(409).json({ error: 'Email หรือ Username ถูกใช้งานแล้ว' });

    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, role)
       VALUES ($1, $2, $3, 'member') RETURNING id, username, email, role, created_at`,
      [username.trim(), email.toLowerCase().trim(), password_hash]
    );
    const user = result.rows[0];

    await logEvent({
      level: 'INFO', event: 'REGISTER_SUCCESS',
      userId: user.id, ip,
      message: `New user registered: ${user.username}`,
      meta: { username: user.username, email: user.email }
    });

    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ',
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error('[auth] Register error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});
```

**ปรับ `logEvent()` ใน Login route** ให้ใช้รูปแบบเดียวกัน (เขียนลง DB แทนเรียก log-service):

```javascript
// แทนที่ fetch('http://log-service:3003/api/logs/internal', ...)
// ด้วยการเขียนลง DB โดยตรง:
await logEvent({
  level: 'WARN', event: 'LOGIN_FAILED',
  userId: user?.id || null, ip,
  message: `Login failed: ${normalizedEmail}`,
  meta: { email: normalizedEmail }
});
```

**เพิ่ม endpoint ดู logs (admin only):**

```javascript
// GET /api/auth/logs — ดู log ของ auth-service (admin only)
router.get('/logs', async (req, res) => {
  const token = (req.headers['authorization'] || '').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const user = verifyToken(token);
    if (user.role !== 'admin') return res.status(403).json({ error: 'admin only' });
    const { limit = 100, offset = 0 } = req.query;
    const result = await pool.query(
      `SELECT * FROM logs ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [parseInt(limit), parseInt(offset)]
    );
    const count = await pool.query('SELECT COUNT(*) FROM logs');
    res.json({ logs: result.rows, total: parseInt(count.rows[0].count) });
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
});
```

### 3.5 ปรับ Task Service ให้ log ลง DB ของตัวเอง

แทนที่ `logEvent()` ที่เรียก `http://log-service:3003/api/logs/internal`  
ด้วย `logEvent()` ที่เขียนลง DB ของ task-service โดยตรง:

**`task-service/src/routes/tasks.js`** — แก้ logEvent helper:

```javascript
// Helper: log ลง task-db โดยตรง (ไม่ใช้ log-service แยก)
async function logEvent({ level, event, userId, message, meta }) {
  try {
    await pool.query(
      `INSERT INTO logs (level, event, user_id, message, meta) VALUES ($1,$2,$3,$4,$5)`,
      [level, event, userId || null, message || null, meta ? JSON.stringify(meta) : null]
    );
  } catch (e) {
    console.error('[task-log]', e.message);
  }
}
```

### 3.6 User Service (Service ใหม่ทั้งหมด)

**`user-service/package.json`:**
```json
{
  "name": "user-service",
  "version": "1.0.0",
  "scripts": { "start": "node src/index.js" },
  "dependencies": {
    "cors":         "^2.8.5",
    "dotenv":       "^16.3.1",
    "express":      "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "pg":           "^8.11.3"
  }
}
```

**`user-service/Dockerfile`:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY src/ ./src/
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 3003
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3003/api/users/health || exit 1
CMD ["node", "src/index.js"]
```

**`user-service/src/db/db.js`:** — เหมือน Set 1 แต่ชี้ไปที่ user-db

```javascript
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
module.exports = { pool };
```

**`user-service/src/middleware/jwtUtils.js`:** — copy จาก auth-service

**`user-service/src/middleware/authMiddleware.js`:**
```javascript
const { verifyToken } = require('./jwtUtils');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });
  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: ' + err.message });
  }
};
```

**`user-service/src/index.js`:**
```javascript
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { pool } = require('./db/db');
const usersRouter = require('./routes/users');

const app  = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);

async function start() {
  let retries = 10;
  while (retries > 0) {
    try {
      await pool.query('SELECT 1');
      // สร้าง table ถ้ายังไม่มี (fallback สำหรับ Railway)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS user_profiles (
          id SERIAL PRIMARY KEY, user_id INTEGER UNIQUE NOT NULL,
          username VARCHAR(50), email VARCHAR(100), role VARCHAR(20) DEFAULT 'member',
          display_name VARCHAR(100), bio TEXT, avatar_url VARCHAR(255),
          updated_at TIMESTAMP DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS logs (
          id SERIAL PRIMARY KEY, level VARCHAR(10) NOT NULL, event VARCHAR(100) NOT NULL,
          user_id INTEGER, message TEXT, meta JSONB, created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      break;
    } catch (e) {
      console.log(`[user] Waiting DB... (${retries} left)`);
      retries--;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  app.listen(PORT, () => console.log(`[user-service] Running on :${PORT}`));
}
start();
```

**`user-service/src/routes/users.js`:**
```javascript
const express     = require('express');
const { pool }    = require('../db/db');
const requireAuth = require('../middleware/authMiddleware');
const { verifyToken } = require('../middleware/jwtUtils');

const router = express.Router();

// Helper: log ลง user-db โดยตรง
async function logEvent({ level, event, userId, message, meta }) {
  try {
    await pool.query(
      `INSERT INTO logs (level, event, user_id, message, meta) VALUES ($1,$2,$3,$4,$5)`,
      [level, event, userId || null, message || null, meta ? JSON.stringify(meta) : null]
    );
  } catch (e) {
    console.error('[user-log]', e.message);
  }
}

// ── Helper: auto-create profile ถ้ายังไม่มี ──────────────────────────
async function ensureProfile(user) {
  const existing = await pool.query(
    'SELECT * FROM user_profiles WHERE user_id = $1', [user.sub]
  );
  if (existing.rows.length > 0) return existing.rows[0];

  // สร้าง profile เริ่มต้นจาก JWT
  const result = await pool.query(
    `INSERT INTO user_profiles (user_id, username, email, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id) DO UPDATE SET updated_at = NOW()
     RETURNING *`,
    [user.sub, user.username, user.email, user.role]
  );
  await logEvent({
    level: 'INFO', event: 'PROFILE_CREATED',
    userId: user.sub, message: `Auto-created profile for ${user.username}`
  });
  return result.rows[0];
}

// GET /api/users/health
router.get('/health', (_, res) => res.json({ status: 'ok', service: 'user-service' }));

// ── ทุก route ต่อจากนี้ต้อง JWT ──
router.use(requireAuth);

// ── GET /api/users/me — ดู profile ของตัวเอง ──────────────────────────
router.get('/me', async (req, res) => {
  try {
    const profile = await ensureProfile(req.user);
    res.json({ profile });
  } catch (err) {
    console.error('[user] GET /me error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── PUT /api/users/me — แก้ไข profile ────────────────────────────────
router.put('/me', async (req, res) => {
  const { display_name, bio, avatar_url } = req.body;
  try {
    await ensureProfile(req.user);  // ให้มี profile ก่อน
    const result = await pool.query(
      `UPDATE user_profiles
       SET display_name = COALESCE($1, display_name),
           bio          = COALESCE($2, bio),
           avatar_url   = COALESCE($3, avatar_url),
           updated_at   = NOW()
       WHERE user_id = $4 RETURNING *`,
      [display_name, bio, avatar_url, req.user.sub]
    );
    await logEvent({
      level: 'INFO', event: 'PROFILE_UPDATED',
      userId: req.user.sub, message: `Profile updated for ${req.user.username}`
    });
    res.json({ profile: result.rows[0] });
  } catch (err) {
    console.error('[user] PUT /me error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/users — รายชื่อผู้ใช้ทั้งหมด (admin only) ────────────────
router.get('/', async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ error: 'Forbidden: admin only' });

  try {
    const result = await pool.query(
      `SELECT * FROM user_profiles ORDER BY user_id`
    );
    res.json({ users: result.rows, count: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

### 3.7 Docker Compose สำหรับทดสอบ Local

**`docker-compose.yml`:**
```yaml
services:

  # ── Databases ──────────────────────────────────────────────────────
  auth-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: authdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123
    ports:
      - "5433:5432"
    volumes:
      - auth_data:/var/lib/postgresql/data
      - ./auth-service/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d authdb"]
      interval: 10s
      timeout: 5s
      retries: 5

  task-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: taskdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123
    ports:
      - "5434:5432"
    volumes:
      - task_data:/var/lib/postgresql/data
      - ./task-service/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d taskdb"]
      interval: 10s
      timeout: 5s
      retries: 5

  user-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: userdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123
    ports:
      - "5435:5432"
    volumes:
      - user_data:/var/lib/postgresql/data
      - ./user-service/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d userdb"]
      interval: 10s
      timeout: 5s
      retries: 5

  # ── Services ───────────────────────────────────────────────────────
  auth-service:
    build: ./auth-service
    environment:
      DATABASE_URL: postgres://admin:secret123@auth-db:5432/authdb
      JWT_SECRET:   ${JWT_SECRET:-dev-shared-secret}
      JWT_EXPIRES:  1h
      PORT:         3001
      NODE_ENV:     development
    ports:
      - "3001:3001"
    depends_on:
      auth-db: { condition: service_healthy }
    restart: unless-stopped

  task-service:
    build: ./task-service
    environment:
      DATABASE_URL: postgres://admin:secret123@task-db:5432/taskdb
      JWT_SECRET:   ${JWT_SECRET:-dev-shared-secret}
      PORT:         3002
      NODE_ENV:     development
    ports:
      - "3002:3002"
    depends_on:
      task-db: { condition: service_healthy }
    restart: unless-stopped

  user-service:
    build: ./user-service
    environment:
      DATABASE_URL: postgres://admin:secret123@user-db:5432/userdb
      JWT_SECRET:   ${JWT_SECRET:-dev-shared-secret}
      PORT:         3003
      NODE_ENV:     development
    ports:
      - "3003:3003"
    depends_on:
      user-db: { condition: service_healthy }
    restart: unless-stopped

volumes:
  auth_data:
  task_data:
  user_data:
```

**`.env.example`:**
```env
JWT_SECRET=engse207-shared-jwt-secret-set2
```

> ⚠️ `JWT_SECRET` ต้องเหมือนกันทุก service — ถ้าต่างกัน service อื่นจะ verify token ไม่ได้

### 3.8 checklist ก่อนขึ้น Cloud

ทดสอบบน local ให้ผ่านก่อน:

```bash
docker compose up --build

# ทดสอบ Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"123456"}'

# ทดสอบ Login
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}' | \
  python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
echo "TOKEN: $TOKEN"

# ทดสอบ User Profile
curl http://localhost:3003/api/users/me -H "Authorization: Bearer $TOKEN"

# ทดสอบ Task CRUD
curl -X POST http://localhost:3002/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task on local","priority":"high"}'

curl http://localhost:3002/api/tasks -H "Authorization: Bearer $TOKEN"
```

- [ ] Register สมัครสมาชิกใหม่ได้ → 201
- [ ] Login ด้วยบัญชีใหม่ได้ → ได้ JWT
- [ ] `GET /api/users/me` → ได้ profile (auto-create ถ้ายังไม่มี)
- [ ] `PUT /api/users/me` → อัปเดต profile ได้
- [ ] `POST /api/tasks` → สร้าง task ได้
- [ ] `GET /api/tasks` → ดู tasks ของตัวเองได้
- [ ] endpoint protected ตอบ 401 เมื่อไม่มี JWT

---

## 4. Phase 2: Deploy Auth Service บน Railway

> อ้างอิงขั้นตอนจาก **Week 7 Lab** (Deploy TaskBoard บน Railway)

### ขั้นตอน

1. ไปที่ [railway.app](https://railway.app) → **New Project**
2. เลือก **Deploy from GitHub** → เลือก Repository ของกลุ่ม
3. กำหนด **Root Directory** = `auth-service`
4. Railway จะ detect `Dockerfile` และ build อัตโนมัติ
5. เพิ่ม **PostgreSQL** Plugin → ตั้งชื่อ `auth-db`
6. ตั้งค่า **Environment Variables:**

```env
DATABASE_URL=${{auth-db.DATABASE_URL}}
JWT_SECRET=your-shared-jwt-secret-set2
JWT_EXPIRES=1h
PORT=3001
NODE_ENV=production
```

> ⚠️ ชื่อ reference `auth-db` ต้องตรงกับชื่อ PostgreSQL Plugin ที่สร้างจริง

7. หลัง Deploy เสร็จ — ตรวจสอบ Deploy Logs ว่าไม่มี error
8. ทดสอบ endpoint:

```bash
AUTH_URL="https://your-auth-service.up.railway.app"

# Register
curl -X POST $AUTH_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@railway.local","password":"123456"}'

# Login
curl -X POST $AUTH_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@railway.local","password":"123456"}'

# Health
curl $AUTH_URL/api/auth/health
```

9. **บันทึก Auth Service URL** → ใช้ใน config.js ของ Frontend

> **หมายเหตุสำหรับ Schema บน Railway:**  
> Railway รัน `init.sql` ผ่าน `docker-entrypoint-initdb.d/` ไม่ได้โดยตรง  
> ให้ใส่ `CREATE TABLE IF NOT EXISTS` ใน `index.js` ด้วย (ดู src/index.js ที่มี initDB แบบ fallback)  
> หรือ import SQL ด้วย Railway CLI: `railway run psql $DATABASE_URL < auth-service/init.sql`

---

## 5. Phase 3: Deploy Task Service บน Railway

1. **New Service** ใน Railway Project เดียวกัน → Deploy from GitHub
2. กำหนด **Root Directory** = `task-service`
3. เพิ่ม **PostgreSQL** Plugin → ตั้งชื่อ `task-db`
4. ตั้งค่า **Environment Variables:**

```env
DATABASE_URL=${{task-db.DATABASE_URL}}
JWT_SECRET=your-shared-jwt-secret-set2
PORT=3002
NODE_ENV=production
```

5. ทดสอบ endpoint:

```bash
TASK_URL="https://your-task-service.up.railway.app"
TOKEN="<JWT จาก Auth Service>"

curl $TASK_URL/api/tasks/health
curl -X POST $TASK_URL/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"First cloud task","priority":"high"}'
curl $TASK_URL/api/tasks -H "Authorization: Bearer $TOKEN"

# ทดสอบ 401
curl $TASK_URL/api/tasks
```

> ⚠️ `JWT_SECRET` ต้องตรงกับ Auth Service — ถ้าต่างกัน task-service จะ verify token ไม่ได้

---

## 6. Phase 4: Deploy User Service บน Railway

1. **New Service** → Deploy from GitHub
2. กำหนด **Root Directory** = `user-service`
3. เพิ่ม **PostgreSQL** Plugin → ตั้งชื่อ `user-db`
4. ตั้งค่า **Environment Variables:**

```env
DATABASE_URL=${{user-db.DATABASE_URL}}
JWT_SECRET=your-shared-jwt-secret-set2
PORT=3003
NODE_ENV=production
```

5. ทดสอบ endpoint:

```bash
USER_URL="https://your-user-service.up.railway.app"
TOKEN="<JWT จาก Auth Service>"

curl $USER_URL/api/users/health
curl $USER_URL/api/users/me -H "Authorization: Bearer $TOKEN"
curl -X PUT $USER_URL/api/users/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"display_name":"Test User","bio":"Hello from Railway!"}'

# ทดสอบ 401
curl $USER_URL/api/users/me

# ทดสอบ admin endpoint
ADMIN_TOKEN="<JWT ของ admin>"
curl $USER_URL/api/users -H "Authorization: Bearer $ADMIN_TOKEN"

# ทดสอบ 403 (member)
curl $USER_URL/api/users -H "Authorization: Bearer $TOKEN"
```

> **Profile Auto-Create:** หากผู้ใช้เพิ่ง register ผ่าน Auth Service แล้วเรียก `GET /api/users/me`  
> ครั้งแรก User Service ต้องสร้าง profile เริ่มต้นให้อัตโนมัติโดยใช้ข้อมูลจาก JWT

---

## 7. Phase 5: Frontend + Gateway Strategy

### Gateway Strategy

นักศึกษาต้องเลือก **1 วิธี** และอธิบายใน README:

| Option | วิธี | ความยาก | แนะนำ |
|---|---|---|---|
| **A** | Frontend เรียก URL ของแต่ละ service โดยตรงผ่าน `config.js` | ง่าย | ✅ |
| **B** | Deploy Nginx เป็น 1 service บน Railway เป็น single entry point | ปานกลาง | |
| **C** | ทำ API Gateway ด้วย Express ทำ proxy ไปแต่ละ service | ปานกลาง | |

**แนะนำ Option A** สำหรับการสอบ — ง่าย deploy เร็ว

### Frontend Config (Option A)

**`frontend/config.js`:**
```javascript
// เปลี่ยน URL เหล่านี้เป็น URL จริงจาก Railway ของกลุ่มนักศึกษา
window.APP_CONFIG = {
  AUTH_URL: 'https://your-auth-service.up.railway.app',
  TASK_URL: 'https://your-task-service.up.railway.app',
  USER_URL: 'https://your-user-service.up.railway.app'
};
```

**`frontend/index.html`** — ปรับ script ให้ใช้ config:

```html
<script src="config.js"></script>
<script>
const AUTH = window.APP_CONFIG.AUTH_URL;
const TASK = window.APP_CONFIG.TASK_URL;
const USER = window.APP_CONFIG.USER_URL;

// Login
async function doLogin() { ... fetch(`${AUTH}/api/auth/login`, ...) }

// Register (ใหม่)
async function doRegister() {
  const { username, email, password } = getFormValues();
  const res = await fetch(`${AUTH}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  ...
}

// Load Tasks (ใช้ TASK URL)
async function loadTasks() {
  const res = await fetch(`${TASK}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  ...
}

// Load Profile (ใช้ USER URL)
async function loadProfile() {
  const res = await fetch(`${USER}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  ...
}
</script>
```

**`frontend/profile.html`** — หน้าดูและแก้ไข profile:

```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>👤 Profile — Final Lab Set 2</title>
  <!-- copy CSS จาก index.html -->
</head>
<body>
<script src="config.js"></script>
<script>
const USER = window.APP_CONFIG.USER_URL;
const token = localStorage.getItem('jwt_token');

async function loadProfile() {
  const res  = await fetch(`${USER}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  // แสดงข้อมูล profile ใน form
  document.getElementById('display_name').value = data.profile.display_name || '';
  document.getElementById('bio').value           = data.profile.bio || '';
}

async function updateProfile() {
  const display_name = document.getElementById('display_name').value;
  const bio          = document.getElementById('bio').value;
  const res = await fetch(`${USER}/api/users/me`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ display_name, bio })
  });
  const data = await res.json();
  if (res.ok) alert('อัปเดต Profile สำเร็จ!');
}

loadProfile();
</script>
</body>
</html>
```

> **Requirement สำคัญ:**
> - Task Service ต้อง reject request ที่ไม่มี JWT → 401
> - User Service ต้อง reject request ที่ไม่มี JWT → 401
> - `GET /api/users` → admin only (member → 403)
> - Auth endpoints (`/register`, `/login`, `/health`) → ไม่ต้องมี JWT

---

## 8. Phase 6: Test Cases และ Screenshots

> ⚠️ **ให้ใช้ภาพหน้าจอจาก Railway (Cloud URL) เท่านั้น** ไม่รับภาพจาก local environment

### curl Commands สำหรับทดสอบบน Cloud

```bash
# ── ตั้งตัวแปร URL จาก Railway ──────────────────────────────────────
AUTH_URL="https://your-auth-xxx.up.railway.app"
TASK_URL="https://your-task-xxx.up.railway.app"
USER_URL="https://your-user-xxx.up.railway.app"

# ── T2: Register ─────────────────────────────────────────────────────
curl -X POST $AUTH_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"clouduser","email":"cloud@test.com","password":"123456"}'

# ── T3: Login → เก็บ token ───────────────────────────────────────────
TOKEN=$(curl -s -X POST $AUTH_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cloud@test.com","password":"123456"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
echo "TOKEN: $TOKEN"

# ── T4: Auth Me ──────────────────────────────────────────────────────
curl $AUTH_URL/api/auth/me -H "Authorization: Bearer $TOKEN"

# ── T5: User Profile (auto-create ครั้งแรก) ──────────────────────────
curl $USER_URL/api/users/me -H "Authorization: Bearer $TOKEN"

# ── T6: Update Profile ────────────────────────────────────────────────
curl -X PUT $USER_URL/api/users/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"display_name":"Cloud User","bio":"Hello from Railway!"}'

# ── T7: Create Task ───────────────────────────────────────────────────
curl -X POST $TASK_URL/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"First task on Railway","priority":"high"}'

# ── T8: Get Tasks ─────────────────────────────────────────────────────
curl $TASK_URL/api/tasks -H "Authorization: Bearer $TOKEN"

# ── T9: ไม่มี JWT → 401 ──────────────────────────────────────────────
curl $TASK_URL/api/tasks

# ── T10: Admin/Member role test ───────────────────────────────────────
# Login เป็น admin (seed user)
ADMIN_TOKEN=$(curl -s -X POST $AUTH_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lab.local","password":"adminpass"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

# Admin เรียกได้ → 200
curl $USER_URL/api/users -H "Authorization: Bearer $ADMIN_TOKEN"

# Member เรียก → 403
curl $USER_URL/api/users -H "Authorization: Bearer $TOKEN"
```

### Test Cases และคะแนน

| Test | รายการ (ทดสอบบน Cloud URL ของ Railway) | คะแนน |
|---|---|---:|
| T1 | Railway Dashboard แสดง 3 services + 3 databases ทุก service Active | 10 |
| T2 | `POST /api/auth/register` → 201 Created พร้อม user object | 10 |
| T3 | `POST /api/auth/login` → ได้ JWT token | 10 |
| T4 | `GET /api/auth/me` ด้วย JWT → ได้ข้อมูลผู้ใช้ | 10 |
| T5 | `GET /api/users/me` → ได้ profile (auto-create ถ้าเพิ่ง register) | 10 |
| T6 | `PUT /api/users/me` → อัปเดต profile สำเร็จ | 10 |
| T7 | `POST /api/tasks` (มี JWT) → 201 Created | 10 |
| T8 | `GET /api/tasks` (มี JWT) → แสดง tasks ของผู้ใช้ได้ | 10 |
| T9 | endpoint protected ตอบ 401 เมื่อไม่มี JWT | 5 |
| T10 | member เรียก `GET /api/users` → 403, admin เรียก → 200 | 5 |
| **รวมคะแนนงานระบบ** | | **90** |

### โครงสร้างโฟลเดอร์ screenshots/

```
screenshots/
├── 01_railway_dashboard.png         ← Railway Project แสดง 3 services + 3 databases
├── 02_auth_register_cloud.png       ← POST register → 201
├── 03_auth_login_cloud.png          ← POST login → JWT token
├── 04_auth_me_cloud.png             ← GET /auth/me → user info
├── 05_user_me_cloud.png             ← GET /users/me → profile
├── 06_user_update_cloud.png         ← PUT /users/me → อัปเดต
├── 07_task_create_cloud.png         ← POST /tasks → 201
├── 08_task_list_cloud.png           ← GET /tasks → task list
├── 09_protected_401.png             ← GET /tasks (ไม่มี JWT) → 401
├── 10_member_403.png                ← GET /users (member) → 403
├── 11_admin_users_200.png           ← GET /users (admin) → 200
└── 12_readme_architecture.png       ← architecture diagram ใน README
```

### Bonus: Availability via Load Balancing

กลุ่มที่ทำโจทย์หลักครบแล้วสามารถเลือกทำส่วนเสริมด้าน **Availability**:

| Bonus | รายการ | คะแนน |
|---|---|---:|
| B1 | ออกแบบ Load Balancing สำหรับ service หนึ่ง และอธิบายใน README พร้อม diagram | 5 |
| B2 | หลักฐานว่า request ถูกกระจายไปมากกว่า 1 instance | 5 |
| B3 | หลักฐานว่าระบบยังตอบสนองได้เมื่อบาง instance ไม่พร้อม | 5 |
| **รวม Bonus** | | **15** |

---

## 9. วิธีการส่งงาน

### Git Repository

1. สร้าง Repository ชื่อ `engse207-final-lab2-[รหัส1]-[รหัส2]`
2. Repository มาจาก Set 1 พัฒนาต่อ (หรือ fork + ปรับโครงสร้าง)
3. อัปเดต `README.md` ให้มี **URL จริงของทุก service** บน Railway
4. ส่ง URL Repository ผ่านระบบของมหาวิทยาลัย

### ไฟล์บังคับ

- `README.md`
- `TEAM_SPLIT.md`
- `INDIVIDUAL_REPORT_[studentid].md` (ทุกคน)
- source code ทั้งหมด (auth-service, task-service, user-service, frontend)
- `docker-compose.yml`
- โฟลเดอร์ `screenshots/`

### README.md ต้องมี

- [ ] ชื่อนักศึกษาทั้ง 2 คน รหัสนักศึกษา
- [ ] **URL จริงของทุก service บน Railway**
- [ ] อธิบายว่า Set 2 ต่อยอดจาก Set 1 อย่างไร
- [ ] Architecture diagram (Cloud version แสดง 3 services + 3 DBs)
- [ ] Gateway Strategy ที่เลือก พร้อมเหตุผล
- [ ] วิธีรัน local ด้วย Docker Compose
- [ ] Environment Variables ที่ใช้
- [ ] วิธีทดสอบด้วย curl (ใช้ URL Cloud จริง)
- [ ] Known limitations เช่น ไม่มี FK ข้าม database, ใช้ `user_id` เป็น logical reference
- [ ] Screenshots ตามที่กำหนด

---

## 10. การประเมินผล

### สัดส่วนคะแนน

| ส่วนประเมิน | รายละเอียด | คะแนน |
|---|---|---:|
| คะแนนงานระบบ (กลุ่ม) | Test Cases T1–T10 | 90 |
| คะแนนเอกสาร (กลุ่ม) | README, TEAM_SPLIT, screenshots ครบและสอดคล้อง | 5 |
| คะแนนสัมภาษณ์ (รายบุคคล) | อธิบาย architecture, flow, ปัญหาและวิธีแก้ | 5 |
| **รวม** | | **100** |
| Bonus | Load Balancing (ถ้าทำ) | สูงสุด +15 |

> คะแนนสัมภาษณ์อาจแตกต่างกันในแต่ละคน แม้อยู่ในกลุ่มเดียวกัน

### หลักเกณฑ์การประเมิน

**รายกลุ่ม:**
- ทุก service deploy บน Railway และทำงานได้จริง
- 3 databases แยกกัน ทำงานได้ถูกต้อง
- Register, Login, Profile, Tasks ทำงานครบ
- README มี URL จริง, diagram, และอธิบาย architecture ชัดเจน

**รายบุคคล:**
- ขอบเขตงานที่รับผิดชอบใน TEAM_SPLIT.md
- INDIVIDUAL_REPORT อธิบายสิ่งที่ทำจริง ปัญหา และสิ่งที่เรียนรู้
- commit history
- ความสามารถในการอธิบายส่วนที่รับผิดชอบ

---

## 11. เอกสารบังคับ

### `TEAM_SPLIT.md`

```markdown
# TEAM_SPLIT.md — Final Lab Set 2

## Team Members
- 650000001 นาย A
- 650000002 นางสาว B

## Work Allocation

### Student 1: นาย A (650000001)
- Auth Service: เพิ่ม Register API + ปรับ logEvent → direct DB
- Deploy Auth Service + auth-db บน Railway
- auth-service/init.sql

### Student 2: นางสาว B (650000002)
- Task Service: ปรับ logEvent → direct DB
- User Service (สร้างใหม่ทั้งหมด)
- Deploy Task + User Service บน Railway
- Frontend: Register form + config.js + profile.html

## Shared Responsibilities
- docker-compose.yml
- Architecture diagram
- End-to-end testing บน Cloud
- README.md + screenshots

## Integration Notes
อธิบายว่างานของทั้งสองคนเชื่อมต่อกันอย่างไร เช่น JWT_SECRET ต้องตรงกัน
และ user_id จาก auth-service ถูกนำไปใช้ใน task-service และ user-service อย่างไร
```

### `INDIVIDUAL_REPORT_[studentid].md`

ต้องมีหัวข้ออย่างน้อย:
1. ข้อมูลผู้จัดทำ
2. ส่วนที่รับผิดชอบ
3. สิ่งที่ลงมือทำจริง
4. ปัญหาที่พบและวิธีแก้ (อย่างน้อย 2 ปัญหา)
5. สิ่งที่เรียนรู้เชิงสถาปัตยกรรมจาก Set 2
6. ส่วนที่ยังไม่สมบูรณ์หรืออยากปรับปรุง

---

## 12. แนวทางการสัมภาษณ์รายบุคคล

ผู้สอนอาจสุ่มถาม:

- Register และ Login flow ทำงานอย่างไร — JWT payload มีอะไรบ้าง
- เหตุใด Set 2 จึงแยกเป็น 3 databases — มีข้อดีและข้อเสียอย่างไรเทียบกับ Set 1
- User Service สร้าง profile เริ่มต้นอย่างไร — ข้อมูลมาจากที่ใด
- Task Service รู้ได้อย่างไรว่า task นี้เป็นของใคร — ทำไมไม่ JOIN กับ users table
- Database-per-Service pattern แตกต่างจาก Shared Database ใน Set 1 อย่างไร
- ถ้า deploy แล้ว service ไม่สามารถต่อ DB ได้ จะตรวจสอบและแก้ไขอย่างไร
- Gateway Strategy ที่เลือกมีข้อดีและข้อจำกัดอย่างไร
- **อะไรคือสิ่งที่ยากที่สุดในการทำ Set 2 และแก้ปัญหานั้นอย่างไร**

---

> **ขอให้วางแผนการทำงานเป็น Phase ทำทีละขั้น และทดสอบทุก endpoint ก่อน deploy ขั้นต่อไป**
>
> *ENGSE207 Software Architecture | มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*
> *อาจารย์ธนิต เกตุแก้ว*

---

## 🔧 ภาคผนวก: คู่มือปรับ Frontend จาก Week 12 (Set 2)

### สิ่งที่ Copy จาก Week 12 ได้โดยตรง

| ส่วน | วิธี |
|---|---|
| CSS ทั้งหมด (`<style>`) | copy ทั้งก้อน ไม่ต้องแก้ |
| HTML layout (sidebar, modal, toast container) | copy ได้ ปรับ nav links |
| `toast()`, `escHtml()`, `closeModal()`, `closeConfirm()` | copy ได้ทั้งหมด |
| `renderJwtInspector()` | copy ได้ทั้งหมด |
| `switchTab()` | copy ได้ (Set 2 มีทั้ง Login และ Register) |
| `openCreateModal()`, `openEditModal()`, `submitTask()`, `confirmDelete()`, `quickStatusUpdate()` | copy ได้ ต้องแก้ URL prefix เป็น `${TASK}` |

### สิ่งที่ต้องแก้ทั้งหมด — Step by Step

#### ขั้นที่ 1: เพิ่ม `config.js` และแก้ URL

```javascript
// ❌ Week 12 — relative URL ผ่าน Nginx
const API = '';

// ✅ Set 2 — เพิ่ม <script src="config.js"></script> ก่อน script หลัก
// แล้วใช้ตัวแปรจาก config.js:
const AUTH = window.APP_CONFIG.AUTH_URL;
const TASK = window.APP_CONFIG.TASK_URL;
const USER = window.APP_CONFIG.USER_URL;
```

#### ขั้นที่ 2: `doLogin()` — แก้ URL

```javascript
// ❌ Week 12
const res = await apiFetch(`${API}/api/auth/login`, { ... });

// ✅ Set 2
const res = await fetch(`${AUTH}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

#### ขั้นที่ 3: `doRegister()` — แก้ field `name` → `username`

Week 12 ส่ง `{ name, email, password }` แต่ Set 2 auth-service รับ `{ username, email, password }`

```javascript
// ❌ Week 12
async function doRegister() {
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  ...
  body: JSON.stringify({ name, email, password })  // ❌ ส่ง name
}

// ✅ Set 2 — แก้ field name และ URL
async function doRegister() {
  const username = document.getElementById('reg-name').value.trim();  // ✅ ใช้ชื่อ element เดิมได้ แต่ต้องส่งเป็น username
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  if (!username || !email || !password) { showAuthMsg('กรุณากรอกข้อมูลให้ครบ', 'error'); return; }

  const res  = await fetch(`${AUTH}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })  // ✅ ส่ง username
  });
  const data = await res.json();
  if (res.ok) {
    // หลัง register สำเร็จ ต้อง login ต่อเพื่อรับ token
    showAuthMsg('✅ สมัครสำเร็จ กำลังเข้าสู่ระบบ...', 'success');
    // login ทันที
    const loginRes  = await fetch(`${AUTH}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();
    if (loginRes.ok) {
      token = loginData.token;
      localStorage.setItem('jwt_token', token);
      initApp(loginData.user);
    }
  } else {
    showAuthMsg('❌ ' + (data.error || 'สมัครไม่สำเร็จ'), 'error');
  }
}
```

#### ขั้นที่ 4: `initApp()` — แก้ `user.name` → `user.username`

```javascript
// ✅ Set 2 — initApp() ที่แก้แล้ว
function initApp(user) {
  currentUser = user;
  document.getElementById('auth-page').classList.add('hidden');
  document.getElementById('app-page').classList.remove('hidden');

  const initials = (user.username || user.email || '?').charAt(0).toUpperCase();  // ✅ .username
  document.getElementById('sidebar-avatar').textContent = initials;
  document.getElementById('sidebar-name').textContent   = user.username || user.email;  // ✅ .username
  const rb = document.getElementById('sidebar-role-badge');
  rb.textContent = user.role;
  rb.className   = `role-badge role-${user.role}`;

  // Users tab — แสดงเฉพาะ admin (ใช้เรียก USER service)
  const navUsers = document.getElementById('nav-users');
  if (navUsers) navUsers.style.display = user.role === 'admin' ? 'flex' : 'none';

  showPage('tasks');
}
```

#### ขั้นที่ 5: `loadTasks()` — แก้ URL

```javascript
// ✅ Set 2
async function loadTasks() {
  const res  = await fetch(`${TASK}/api/tasks`, {  // ✅ TASK URL
    headers: authHeaders()
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) { toast('Session หมดอายุ', 'error'); doLogout(); }
    return;
  }
  allTasks = data.tasks || [];
  updateStats();
  renderTasks();
}
```

#### ขั้นที่ 6: `renderTasks()` — แก้ field เจ้าของ task

```javascript
// ❌ Week 12
<span class="chip chip-owner">👤 ${escHtml(t.owner_id || t.created_by || '?')}</span>

// ✅ Set 2 (task-service JOIN ส่ง username มา)
<span class="chip chip-owner">👤 ${escHtml(t.username || '?')}</span>
```

#### ขั้นที่ 7: `submitTask()` และ `confirmDelete()` — แก้ URL prefix

```javascript
// ✅ Set 2 — ทุก task endpoint ใช้ ${TASK}
// submitTask():
res = await fetch(`${TASK}/api/tasks/${id}`, { method:'PUT', ... });  // edit
res = await fetch(`${TASK}/api/tasks`, { method:'POST', ... });         // create

// confirmDelete():
const res = await fetch(`${TASK}/api/tasks/${deleteTargetId}`, {
  method: 'DELETE', headers: authHeaders()
});
```

#### ขั้นที่ 8: `loadProfile()` — เรียก USER service

```javascript
// ❌ Week 12
const res = await apiFetch(`${API}/api/users/me`, { ... });
const u   = data.user || currentUser;
document.getElementById('prof-name').textContent = u.name || '—';  // ❌ .name

// ✅ Set 2
async function loadProfile() {
  const res  = await fetch(`${USER}/api/users/me`, {  // ✅ USER URL
    headers: authHeaders()
  });
  if (!res.ok) { renderJwtInspector(); return; }
  const data = await res.json();
  const u    = data.profile || currentUser;  // user-service ส่ง { profile: {...} }

  const initial = (u.username || u.email || '?').charAt(0).toUpperCase();
  document.getElementById('prof-avatar').textContent    = initial;
  document.getElementById('prof-name').textContent      = u.display_name || u.username || '—';
  document.getElementById('prof-email').textContent     = u.email;
  document.getElementById('prof-id').textContent        = u.user_id || '—';
  document.getElementById('prof-role').textContent      = u.role;
  const rb = document.getElementById('prof-role-badge');
  rb.textContent = u.role;
  rb.className   = `role-badge role-${u.role}`;
  renderJwtInspector();
}
```

#### ขั้นที่ 9: `loadUsers()` — เรียก USER service (admin only)

```javascript
// ✅ Set 2
async function loadUsers() {
  const res  = await fetch(`${USER}/api/users`, {  // ✅ USER URL
    headers: authHeaders()
  });
  const data = await res.json();

  const adminDiv    = document.getElementById('users-admin-only');
  const forbiddenDiv = document.getElementById('users-forbidden');

  if (res.status === 403) {
    adminDiv?.classList.add('hidden');
    forbiddenDiv?.classList.remove('hidden');
    return;
  }
  if (!res.ok) { toast('❌ Error', 'error'); return; }

  forbiddenDiv?.classList.add('hidden');
  adminDiv?.classList.remove('hidden');

  const users = data.users || [];
  document.getElementById('user-rows').innerHTML = users.map(u => `
    <div class="user-row">
      <div><div style="font-weight:500">${escHtml(u.username||'—')}</div></div>
      <div style="color:var(--muted);font-size:.82rem">${escHtml(u.email||'—')}</div>
      <div><span class="role-badge role-${u.role}">${u.role}</span></div>
      <div style="color:var(--muted);font-size:.82rem">${u.user_id||'—'}</div>
    </div>`).join('');
}
```

#### ขั้นที่ 10: `authHeaders()` และ `doLogout()` — ไม่ต้องแก้

```javascript
// ✅ ใช้ได้เหมือนเดิม (ไม่มี URL dependency)
function authHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
}
function doLogout() {
  localStorage.removeItem('jwt_token');
  token = null; currentUser = null; allTasks = [];
  document.getElementById('app-page').classList.add('hidden');
  document.getElementById('auth-page').classList.remove('hidden');
}
```

#### ขั้นที่ 11: Auto-login — แก้ URL

```javascript
// ✅ Set 2
if (token) {
  (async () => {
    const res  = await fetch(`${AUTH}/api/auth/verify`, {  // ✅ AUTH URL
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.valid) initApp(data.user);
    else { localStorage.removeItem('jwt_token'); token = null; }
  })();
}
```

### profile.html — สร้างใหม่ทั้งหมด

ไม่มี Week 12 equivalent — ให้ใช้โค้ดที่ระบุไว้ในหัวข้อ **Phase 5** ของเอกสารนี้  
CSS copy จาก index.html ได้เลย เพิ่ม form สำหรับแก้ไข `display_name` และ `bio`

### logs.html — ไม่ใช้ใน Set 2

Set 2 ไม่มี Log Service แยก จึงไม่ต้องมี logs.html  
(Admin สามารถดู log ได้ผ่าน `GET /api/auth/logs` โดยตรง ถ้าต้องการ)

