# ENGSE207 Software Architecture
# Final Lab — ชุดที่ 1: Microservices + HTTPS + Basic Logging

> **เอกสารสำหรับนักศึกษา**
> **รูปแบบงาน:** งานกลุ่ม กลุ่มละ 2 คน
> **ลักษณะงาน:** Take-home Assignment
> **คะแนนเต็ม:** 100 คะแนน (90 + Bonus 10)
> **แหล่งอ้างอิง:** ใช้โค้ดจาก Week 6, Week 7 และ Week 12 เป็นฐานได้
> **วิธีส่งงาน:** ส่งผ่าน Git Repository เท่านั้น

---

## สารบัญ

1. [ภาพรวมและวัตถุประสงค์](#1-ภาพรวมและวัตถุประสงค์)
2. [สถาปัตยกรรมที่ต้องสร้าง](#2-สถาปัตยกรรมที่ต้องสร้าง)
3. [โครงสร้าง Repository](#3-โครงสร้าง-repository)
4. [Part 1: HTTPS Nginx (API Gateway)](#4-part-1-https-nginx-api-gateway)
5. [Part 2: Database Schema + Seed Users](#5-part-2-database-schema--seed-users)
6. [Part 3: Auth Service](#6-part-3-auth-service)
7. [Part 4: Task Service](#7-part-4-task-service)
8. [Part 5: Log Service](#8-part-5-log-service)
9. [Part 6: Docker Compose](#9-part-6-docker-compose)
10. [Part 7: Frontend — Task Board UI](#10-part-7-frontend--task-board-ui)
11. [Part 8: Frontend — Log Dashboard](#11-part-8-frontend--log-dashboard)
12. [Test Cases และ Screenshots](#12-test-cases-และ-screenshots)
13. [วิธีการส่งงาน](#13-วิธีการส่งงาน)
14. [การประเมินผล](#14-การประเมินผล)
15. [เอกสารบังคับ (TEAM_SPLIT / INDIVIDUAL_REPORT)](#15-เอกสารบังคับ)
16. [หลักฐาน Git Contribution](#16-หลักฐาน-git-contribution)
17. [แนวทางการสัมภาษณ์รายบุคคล](#17-แนวทางการสัมภาษณ์รายบุคคล)

---

## 1. ภาพรวมและวัตถุประสงค์

Final Lab ชุดที่ 1 สร้างระบบ **Task Board Microservices** แบบ **ไม่มี Register** (ใช้ Seed Users เท่านั้น) พร้อม HTTPS, JWT Authentication และ **Lightweight Logging ที่เก็บลงฐานข้อมูลผ่าน REST API** (ไม่ใช้ Loki/Grafana)

### วัตถุประสงค์การเรียนรู้

| วัตถุประสงค์ | CLO |
|---|---|
| ตั้งค่า HTTPS ด้วย Self-Signed Certificate ใน Nginx ได้ | CLO6 |
| ออกแบบ Auth Service ด้วย Seed Users + JWT ได้ | CLO3, CLO6 |
| ออกแบบ Lightweight Logging เก็บลง DB ด้วย REST API ได้ | CLO14 |
| ต่อ Frontend กับ Backend ผ่าน HTTPS ได้ | CLO5, CLO7 |
| จัดโครงสร้าง Microservices Repository ได้ถูกต้อง | CLO5 |

### ข้อกำหนดหลัก

- **ไม่มี Register** — ใช้เฉพาะ Seed Users ที่กำหนดไว้ล่วงหน้า
- **HTTPS** — Nginx ใช้ Self-Signed Certificate (port 443), redirect HTTP → HTTPS
- **Logging** — เก็บลง PostgreSQL ผ่าน Log Service REST API (ไม่ใช้ Loki/Grafana)
- **Frontend** — 2 หน้า: `index.html` (Task Board) และ `logs.html` (Log Dashboard สำหรับ admin)

---

## 2. สถาปัตยกรรมที่ต้องสร้าง

```
Browser / Postman
       │
       │ HTTPS :443  (HTTP :80 → redirect HTTPS)
       ▼
┌──────────────────────────────────────────────────────────────┐
│  🛡️ Nginx (API Gateway + TLS Termination + Rate Limiter)     │
│                                                              │
│  /api/auth/*         → auth-service:3001  (ไม่ต้องมี JWT)       │
│  /api/tasks/*        → task-service:3002  [JWT required]     │
│  /api/logs/internal  → BLOCKED (403 จาก Nginx)               │
│  /api/logs/*         → log-service:3003   [JWT + admin only] │
│  /                   → frontend:80        (Static HTML)      │
└──────┬──────────────┬─────────────────┬──────────────────────┘
       │              │                 │
       ▼              ▼                 ▼
┌──────────────┐ ┌───────────────┐ ┌──────────────────┐
│ 🔑 Auth Svc  │ │ 📋 Task Svc   │ │ 📝 Log Service   │
│   :3001      │ │   :3002       │ │   :3003          │
│              │ │               │ │                  │
│ • POST login │ │ • CRUD Tasks  │ │ • POST /internal │
│ • GET verify │ │ • JWT Guard   │ │ • GET  /         │
│ • GET me     │ │ • logEvent()→ │ │ • GET  /stats    │
│ • logEvent() │ │   log-service │ │ • เก็บลง DB       │
└──────┬───────┘ └───────┬───────┘ └──────────────────┘
       │                 │                    │
       └─────────────────┴────────────────────┘
                         │
               ┌─────────────────────┐
               │  🗄️ PostgreSQL      │
               │  (1 shared DB)      │
               │  • users   table    │
               │  • tasks   table    │
               │  • logs    table    │
               └─────────────────────┘
```

### Services ที่ต้องสร้าง

| Service | Port | หน้าที่ |
|---|---|---|
| **nginx** | 80 (→443), 443 | TLS termination, reverse proxy, rate limit |
| **frontend** | 80 | Nginx serve static HTML/CSS/JS |
| **auth-service** | 3001 | Login (seed users only), ออก JWT |
| **task-service** | 3002 | CRUD Tasks + JWT middleware |
| **log-service** | 3003 | รับ log (internal), เก็บ DB, API ดึง log (admin only) |
| **postgres** | 5432 | ฐานข้อมูลเดียวใช้ร่วมกัน |

---

## 3. โครงสร้าง Repository

```
final-lab-set1/
├── README.md
├── docker-compose.yml
├── .env.example
├── .gitignore
│
├── nginx/
│   ├── nginx.conf              ← HTTPS + reverse proxy config
│   ├── Dockerfile
│   └── certs/                  ← Self-signed cert (generate ด้วย script)
│       └── key.pem
│
├── frontend/
│   ├── Dockerfile
│   ├── index.html              ← Task Board UI (Login + CRUD Tasks + JWT inspector)
│   └── logs.html               ← Log Dashboard (ดึงจาก /api/logs)
│
├── auth-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── routes/auth.js
│       ├── middleware/jwtUtils.js
│       └── db/db.js
│
├── task-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── routes/tasks.js
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   └── jwtUtils.js
│       └── db/db.js
│
├── log-service/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── index.js
│
├── db/
│   └── init.sql            ← Schema + Seed Users
│
├── scripts/
│   └── gen-certs.sh        ← สร้าง self-signed cert
│
└── screenshots/
    ├── 01_docker_running.png
    ├── 02_https_browser.png
    ├── 03_login_success.png
    ├── 04_login_fail.png
    ├── 05_create_task.png
    ├── 06_get_tasks.png
    ├── 07_update_task.png
    ├── 08_delete_task.png
    ├── 09_no_jwt_401.png
    ├── 10_logs_api.png
    ├── 11_rate_limit.png
    └── 12_frontend_screenshot.png
```

---

## 4. Part 1: HTTPS Nginx (API Gateway)

### 4.1 สร้าง Self-Signed Certificate

**`scripts/gen-certs.sh`:**
```bash
#!/bin/bash
# สร้าง self-signed certificate สำหรับ development
mkdir -p nginx/certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/certs/key.pem \
  -out    nginx/certs/cert.pem \
  -subj "/C=TH/ST=ChiangMai/L=ChiangMai/O=RMUTL/OU=ENGSE207/CN=localhost"
echo "✅ Certificate created in nginx/certs/"
```

```bash
# รันก่อน docker compose up ครั้งแรก
chmod +x scripts/gen-certs.sh
./scripts/gen-certs.sh
```

### 4.2 Nginx Config

**`nginx/nginx.conf`:**
```nginx
# ── Rate limiting zones ──────────────────────────────────────────────
limit_req_zone $binary_remote_addr zone=login_limit:10m   rate=5r/m;
limit_req_zone $binary_remote_addr zone=api_limit:10m     rate=30r/m;

# ── HTTP → HTTPS redirect ─────────────────────────────────────────────
server {
    listen 80;
    server_name localhost;
    return 301 https://$host$request_uri;
}

# ── HTTPS server ──────────────────────────────────────────────────────
server {
    listen 443 ssl;
    server_name localhost;

    ssl_certificate     /etc/nginx/certs/cert.pem;
    ssl_certificate_key /etc/nginx/certs/key.pem;
    ssl_protocols             TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_session_cache         shared:SSL:10m;
    ssl_session_timeout       1d;

    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options           DENY;
    add_header X-Content-Type-Options    nosniff;
    add_header X-XSS-Protection          "1; mode=block";

    # ── Frontend (static files) ────────────────────────────────────
    location / {
        proxy_pass         http://frontend:80;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
    }

    # ── Auth: Login (rate-limited) ────────────────────────────────
    location /api/auth/login {
        limit_req zone=login_limit burst=3 nodelay;
        limit_req_status 429;
        proxy_pass         http://auth-service:3001;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    # ── Auth: Other endpoints ─────────────────────────────────────
    location /api/auth/ {
        limit_req zone=api_limit burst=10 nodelay;
        proxy_pass         http://auth-service:3001;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    # ── Task Service ───────────────────────────────────────────────
    location /api/tasks/ {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass         http://task-service:3002;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    # ── Block /api/logs/internal จากภายนอก ───────────────────────
    location = /api/logs/internal {
        return 403;
    }

    # ── Log Service (admin only ผ่าน JWT) ─────────────────────────
    location /api/logs/ {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass         http://log-service:3003;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }

    # ── 429 custom response ───────────────────────────────────────
    error_page 429 /429.json;
    location = /429.json {
        return 429 '{"error":"Too Many Requests","retryAfter":60}';
        add_header Content-Type application/json;
    }
}
```

**`nginx/Dockerfile`:**
```dockerfile
FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY certs/     /etc/nginx/certs/
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
```

---

## 5. Part 2: Database Schema + Seed Users

**`db/init.sql`:**
```sql
-- ═══════════════════════════════════════════════
--  USERS TABLE
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(50)  UNIQUE NOT NULL,
  email         VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  DEFAULT 'member',
  created_at    TIMESTAMP    DEFAULT NOW(),
  last_login    TIMESTAMP
);

-- ═══════════════════════════════════════════════
--  TASKS TABLE
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  status      VARCHAR(20)  DEFAULT 'TODO'   CHECK (status IN ('TODO','IN_PROGRESS','DONE')),
  priority    VARCHAR(10)  DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
  created_at  TIMESTAMP    DEFAULT NOW(),
  updated_at  TIMESTAMP    DEFAULT NOW()
);

-- ═══════════════════════════════════════════════
--  LOGS TABLE (log-service ใช้)
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS logs (
  id          SERIAL       PRIMARY KEY,
  service     VARCHAR(50)  NOT NULL,
  level       VARCHAR(10)  NOT NULL CHECK (level IN ('INFO','WARN','ERROR')),
  event       VARCHAR(100) NOT NULL,
  user_id     INTEGER,
  ip_address  VARCHAR(45),
  method      VARCHAR(10),
  path        VARCHAR(255),
  status_code INTEGER,
  message     TEXT,
  meta        JSONB,
  created_at  TIMESTAMP    DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_logs_service    ON logs(service);
CREATE INDEX IF NOT EXISTS idx_logs_level      ON logs(level);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at DESC);

-- ═══════════════════════════════════════════════
--  SEED USERS
--  alice@lab.local  / alice123
--  bob@lab.local    / bob456
--  admin@lab.local  / adminpass
--
--  ✅ ค่า password_hash ด้านล่างเป็น bcrypt hash จริง พร้อมใช้งาน
--  นักศึกษาสามารถสร้าง hash ใหม่ด้วยคำสั่ง:
--    node -e "const b=require('bcryptjs'); console.log(b.hashSync('alice123',10))"
-- ═══════════════════════════════════════════════
INSERT INTO users (username, email, password_hash, role) VALUES
  ('alice', 'alice@lab.local',
   '$2b$10$PjnT4Aw1VHdFD89uFMsbtOunaa8XXNtp.8aGFlC4Rf2F1zAp3V.KC',
   'member'),
  ('bob', 'bob@lab.local',
   '$2b$10$RdE50VVxFllAA71b/HJuPOIY8PQKujO4zWWTb0bJ3OsaeGNXTbSbu',
   'member'),
  ('admin', 'admin@lab.local',
   '$2b$10$ZFSu9jujm16MjmDzk3fIYO36TyW7tNXJl3MGQuDkWBoiaiNJ2iFca',
   'admin')
ON CONFLICT (username) DO UPDATE SET
  email         = EXCLUDED.email,
  password_hash = EXCLUDED.password_hash,
  role          = EXCLUDED.role;

-- Seed tasks (ข้อมูลตั้งต้น)
INSERT INTO tasks (user_id, title, description, status, priority)
SELECT u.id, 'ออกแบบ UI หน้า Login', 'ใช้ Figma ออกแบบ mockup', 'TODO', 'high'
FROM users u WHERE u.username = 'alice' ON CONFLICT DO NOTHING;

INSERT INTO tasks (user_id, title, description, status, priority)
SELECT u.id, 'เขียน API สำหรับ Task CRUD', 'Express.js + PostgreSQL', 'IN_PROGRESS', 'high'
FROM users u WHERE u.username = 'alice' ON CONFLICT DO NOTHING;

INSERT INTO tasks (user_id, title, description, status, priority)
SELECT u.id, 'ทดสอบ JWT Authentication', 'ใช้ Postman ทดสอบทุก endpoint', 'TODO', 'medium'
FROM users u WHERE u.username = 'bob' ON CONFLICT DO NOTHING;
```

> ### 🔑 Seed Users — บัญชีสำหรับทดสอบ
>
> | Username | Email | Password | Role |
> |---|---|---|---|
> | alice | alice@lab.local | `alice123` | member |
> | bob | bob@lab.local | `bob456` | member |
> | admin | admin@lab.local | `adminpass` | admin |
>
> ✅ **hash ใน `db/init.sql` เป็นค่าจริงที่ใช้งานได้ทันที**
>
> หากต้องการ reset ฐานข้อมูล (ล้างข้อมูลเก่าทั้งหมด):
> ```bash
> docker compose down -v
> docker compose up --build
> ```

---

## 6. Part 3: Auth Service

> **พื้นฐาน:** ใช้ code จาก Week 12 `auth-service` เป็นฐาน
> **เปลี่ยน:** ลบ `/register` route ออก, เพิ่ม `logEvent()` ส่ง log ไปที่ Log Service

### ไฟล์ที่ต้องสร้าง

**`auth-service/package.json`:**
```json
{
  "name": "auth-service",
  "version": "1.0.0",
  "scripts": { "start": "node src/index.js" },
  "dependencies": {
    "bcryptjs":  "^2.4.3",
    "cors":      "^2.8.5",
    "dotenv":    "^16.3.1",
    "express":   "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "pg":        "^8.11.3"
  }
}
```

**`auth-service/Dockerfile`:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY src/ ./src/
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/auth/health || exit 1
CMD ["node", "src/index.js"]
```

**`auth-service/src/db/db.js`:**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.DB_HOST     || 'postgres',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'taskboard',
  user:     process.env.DB_USER     || 'admin',
  password: process.env.DB_PASSWORD || 'secret123',
});

module.exports = { pool };
```

**`auth-service/src/middleware/jwtUtils.js`:**
```javascript
const jwt = require('jsonwebtoken');
const SECRET  = process.env.JWT_SECRET  || 'dev-secret';
const EXPIRES = process.env.JWT_EXPIRES || '1h';

function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
```

**`auth-service/src/index.js`:**
```javascript
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { pool } = require('./db/db');
const authRouter = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

async function start() {
  let retries = 10;
  while (retries > 0) {
    try { await pool.query('SELECT 1'); break; }
    catch (e) {
      console.log(`[auth] Waiting DB... (${retries} left)`);
      retries--;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  app.listen(PORT, () => console.log(`[auth-service] Running on :${PORT}`));
}
start();
```

**`auth-service/src/routes/auth.js`:**
```javascript
const express  = require('express');
const bcrypt   = require('bcryptjs');
const { pool } = require('../db/db');
const { generateToken, verifyToken } = require('../middleware/jwtUtils');

const router = express.Router();

// Dummy hash สำหรับ timing-safe compare (ป้องกัน timing attack)
const DUMMY_HASH = '$2b$10$CwTycUXWue0Thq9StjUM0uJ8y0R6VQwWi4KFOeFHrgb3R04QLbL7a';

// ── Helper: ส่ง log ไปที่ Log Service ──────────────────────────────────
async function logEvent({ level, event, userId, ip, method, path, statusCode, message, meta }) {
  try {
    await fetch('http://log-service:3003/api/logs/internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'auth-service',
        level, event,
        user_id:    userId    || null,
        ip_address: ip        || null,
        method:     method    || null,
        path:       path      || null,
        status_code: statusCode || null,
        message:    message   || null,
        meta:       meta      || null
      })
    });
  } catch (_) { /* ถ้า log service ไม่ตอบ ไม่ต้องหยุดการทำงาน */ }
}

// ── POST /api/auth/login ───────────────────────────────────────────────
// ❌ ไม่มี /register — ใช้ Seed Users เท่านั้น
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const ip = req.headers['x-real-ip'] || req.ip;

  if (!email || !password)
    return res.status(400).json({ error: 'กรุณากรอก email และ password' });

  const normalizedEmail = String(email).trim().toLowerCase();

  try {
    const result = await pool.query(
      'SELECT id, username, email, password_hash, role FROM users WHERE email = $1',
      [normalizedEmail]
    );
    const user = result.rows[0] || null;
    const hash = user ? user.password_hash : DUMMY_HASH;
    const isValid = await bcrypt.compare(password, hash);

    if (!user || !isValid) {
      await logEvent({
        level: 'WARN', event: 'LOGIN_FAILED',
        userId: user?.id || null, ip,
        method: 'POST', path: '/api/auth/login', statusCode: 401,
        message: `Login failed: ${normalizedEmail}`,
        meta: { email: normalizedEmail }
      });
      return res.status(401).json({ error: 'Email หรือ Password ไม่ถูกต้อง' });
    }

    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    const token = generateToken({
      sub:      user.id,
      email:    user.email,
      role:     user.role,
      username: user.username
    });

    await logEvent({
      level: 'INFO', event: 'LOGIN_SUCCESS',
      userId: user.id, ip,
      method: 'POST', path: '/api/auth/login', statusCode: 200,
      message: `User ${user.username} logged in`,
      meta: { username: user.username, role: user.role }
    });

    res.json({
      message: 'Login สำเร็จ',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error('[auth] Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ── GET /api/auth/verify ───────────────────────────────────────────────
router.get('/verify', (req, res) => {
  const token = (req.headers['authorization'] || '').split(' ')[1];
  if (!token) return res.status(401).json({ valid: false, error: 'No token' });
  try {
    const decoded = verifyToken(token);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, error: err.message });
  }
});

// ── GET /api/auth/me ───────────────────────────────────────────────────
router.get('/me', async (req, res) => {
  const token = (req.headers['authorization'] || '').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = verifyToken(token);
    const result  = await pool.query(
      'SELECT id, username, email, role, created_at, last_login FROM users WHERE id = $1',
      [decoded.sub]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'User not found' });
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// ── GET /api/auth/health ───────────────────────────────────────────────
router.get('/health', (_, res) =>
  res.json({ status: 'ok', service: 'auth-service', time: new Date() })
);

module.exports = router;
```

---

## 7. Part 4: Task Service

> **พื้นฐาน:** ใช้ code จาก Week 12 `task-service` เป็นฐาน
> **เพิ่ม:** `logEvent()` ส่งไปที่ Log Service เช่นเดียวกับ Auth Service

### ไฟล์ที่ต้องสร้าง

**`task-service/package.json`:**
```json
{
  "name": "task-service",
  "version": "1.0.0",
  "scripts": { "start": "node src/index.js" },
  "dependencies": {
    "cors":      "^2.8.5",
    "dotenv":    "^16.3.1",
    "express":   "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "pg":        "^8.11.3"
  }
}
```

**`task-service/Dockerfile`:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY src/ ./src/
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
EXPOSE 3002
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3002/api/tasks/health || exit 1
CMD ["node", "src/index.js"]
```

**`task-service/src/db/db.js`** — ใช้ code เดียวกับ auth-service/src/db/db.js (แก้ port เป็น 3002 แต่ host เดียวกัน)

**`task-service/src/middleware/jwtUtils.js`** — copy จาก auth-service/src/middleware/jwtUtils.js ทุกอย่างเหมือนกัน

**`task-service/src/middleware/authMiddleware.js`:**
```javascript
const { verifyToken } = require('./jwtUtils');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token)
    return res.status(401).json({ error: 'Unauthorized: No token provided' });

  try {
    req.user = verifyToken(token);  // { sub, email, role, username }
    next();
  } catch (err) {
    // Fire-and-forget log JWT error
    fetch('http://log-service:3003/api/logs/internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'task-service', level: 'ERROR', event: 'JWT_INVALID',
        ip_address: req.headers['x-real-ip'] || req.ip,
        message: 'Invalid JWT: ' + err.message,
        meta: { error: err.message }
      })
    }).catch(() => {});
    return res.status(401).json({ error: 'Unauthorized: ' + err.message });
  }
};
```

**`task-service/src/index.js`:**
```javascript
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { pool } = require('./db/db');
const tasksRouter = require('./routes/tasks');

const app  = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

async function start() {
  let retries = 10;
  while (retries > 0) {
    try { await pool.query('SELECT 1'); break; }
    catch (e) {
      console.log(`[task] Waiting DB... (${retries} left)`);
      retries--;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  app.listen(PORT, () => console.log(`[task-service] Running on :${PORT}`));
}
start();
```

**`task-service/src/routes/tasks.js`:**
```javascript
const express     = require('express');
const { pool }    = require('../db/db');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();

// Helper: ส่ง log ไปที่ Log Service
async function logEvent({ level, event, userId, ip, method, path, statusCode, message, meta }) {
  try {
    await fetch('http://log-service:3003/api/logs/internal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'task-service',
        level, event,
        user_id:    userId    || null,
        ip_address: ip        || null,
        method, path,
        status_code: statusCode || null,
        message, meta
      })
    });
  } catch (_) {}
}

// GET /api/tasks/health (ไม่ต้อง JWT)
router.get('/health', (_, res) => res.json({ status: 'ok', service: 'task-service' }));

// ── ทุก route ต่อจากนี้ต้องผ่าน JWT ──
router.use(requireAuth);

// GET /api/tasks/ — admin เห็นทั้งหมด, member เห็นเฉพาะของตัวเอง
router.get('/', async (req, res) => {
  try {
    let result;
    if (req.user.role === 'admin') {
      result = await pool.query(
        `SELECT t.*, u.username FROM tasks t
         JOIN users u ON t.user_id = u.id
         ORDER BY t.created_at DESC`
      );
    } else {
      result = await pool.query(
        `SELECT t.*, u.username FROM tasks t
         JOIN users u ON t.user_id = u.id
         WHERE t.user_id = $1 ORDER BY t.created_at DESC`,
        [req.user.sub]
      );
    }
    res.json({ tasks: result.rows, count: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/tasks/ — สร้าง task ใหม่
router.post('/', async (req, res) => {
  const { title, description, status = 'TODO', priority = 'medium' } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });

  try {
    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, status, priority)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [req.user.sub, title, description, status, priority]
    );
    const task = result.rows[0];
    await logEvent({
      level: 'INFO', event: 'TASK_CREATED', userId: req.user.sub,
      method: 'POST', path: '/api/tasks', statusCode: 201,
      message: `Task created: "${title}"`, meta: { task_id: task.id, title }
    });
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/tasks/:id — แก้ไข task (เฉพาะเจ้าของหรือ admin)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const check = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (!check.rows[0]) return res.status(404).json({ error: 'Task not found' });
    if (check.rows[0].user_id !== req.user.sub && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Forbidden' });

    const { title, description, status, priority } = req.body;
    const result = await pool.query(
      `UPDATE tasks
       SET title       = COALESCE($1, title),
           description = COALESCE($2, description),
           status      = COALESCE($3, status),
           priority    = COALESCE($4, priority),
           updated_at  = NOW()
       WHERE id = $5 RETURNING *`,
      [title, description, status, priority, id]
    );
    res.json({ task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/tasks/:id — ลบ task (เฉพาะเจ้าของหรือ admin)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const check = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (!check.rows[0]) return res.status(404).json({ error: 'Task not found' });
    if (check.rows[0].user_id !== req.user.sub && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Forbidden' });

    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    await logEvent({
      level: 'INFO', event: 'TASK_DELETED', userId: req.user.sub,
      method: 'DELETE', path: `/api/tasks/${id}`, statusCode: 200,
      message: `Task ${id} deleted`
    });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
```

---

## 8. Part 5: Log Service

> Log Service เป็น **service ใหม่** ที่ไม่ได้มาจาก Week 12 — สร้างใหม่ทั้งหมด
>
> **หน้าที่:**
> - รับ log จาก Auth/Task Service ผ่าน `POST /api/logs/internal` (ภายใน Docker network เท่านั้น — Nginx บล็อก endpoint นี้)
> - ให้ admin ดูผ่าน `GET /api/logs/` และ `GET /api/logs/stats` (ต้องมี JWT + role=admin)

**`log-service/package.json`:**
```json
{
  "name": "log-service",
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

**`log-service/Dockerfile`:**
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
  CMD wget -qO- http://localhost:3003/api/logs/health || exit 1
CMD ["node", "src/index.js"]
```

**`log-service/src/index.js`:**
```javascript
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const jwt     = require('jsonwebtoken');
const { Pool } = require('pg');

const app  = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host:     process.env.DB_HOST     || 'postgres',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'taskboard',
  user:     process.env.DB_USER     || 'admin',
  password: process.env.DB_PASSWORD || 'secret123',
});

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// ── Middleware: ตรวจ JWT ที่ต้องเป็น admin ────────────────────────────
function requireAdmin(req, res, next) {
  const token = (req.headers['authorization'] || '').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const user = jwt.verify(token, JWT_SECRET);
    if (user.role !== 'admin')
      return res.status(403).json({ error: 'Forbidden: admin only' });
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ══════════════════════════════════════════════════════════════════════
// POST /api/logs/internal — รับ log จาก services อื่น
// (ไม่ต้องมี JWT เพราะเรียกภายใน Docker network)
// Nginx บล็อก path นี้จากภายนอก → return 403)
// ══════════════════════════════════════════════════════════════════════
app.post('/api/logs/internal', async (req, res) => {
  const { service, level, event, user_id, ip_address,
          method, path, status_code, message, meta } = req.body;

  if (!service || !level || !event)
    return res.status(400).json({ error: 'service, level, event are required' });

  try {
    await pool.query(
      `INSERT INTO logs
         (service, level, event, user_id, ip_address,
          method, path, status_code, message, meta)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [service, level, event,
       user_id || null, ip_address || null,
       method || null, path || null, status_code || null,
       message || null, meta ? JSON.stringify(meta) : null]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('[log] Insert error:', err.message);
    res.status(500).json({ error: 'DB error' });
  }
});

// ══════════════════════════════════════════════════════════════════════
// GET /api/logs/ — ดึง logs (admin only)
// Query params: ?service=auth-service&level=ERROR&limit=100&offset=0
// ══════════════════════════════════════════════════════════════════════
app.get('/api/logs/', requireAdmin, async (req, res) => {
  const { service, level, event, limit = 100, offset = 0 } = req.query;

  const conditions = [];
  const values     = [];
  let   idx = 1;

  if (service) { conditions.push(`service = $${idx++}`); values.push(service); }
  if (level)   { conditions.push(`level = $${idx++}`);   values.push(level);   }
  if (event)   { conditions.push(`event = $${idx++}`);   values.push(event);   }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

  try {
    const countRes = await pool.query(`SELECT COUNT(*) FROM logs ${where}`, values);
    const total    = parseInt(countRes.rows[0].count);

    values.push(parseInt(limit));
    values.push(parseInt(offset));
    const result = await pool.query(
      `SELECT * FROM logs ${where} ORDER BY created_at DESC LIMIT $${idx} OFFSET $${idx + 1}`,
      values
    );
    res.json({ logs: result.rows, total, limit: parseInt(limit), offset: parseInt(offset) });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

// ══════════════════════════════════════════════════════════════════════
// GET /api/logs/stats — สถิติ logs (admin only)
// ══════════════════════════════════════════════════════════════════════
app.get('/api/logs/stats', requireAdmin, async (req, res) => {
  try {
    const [byLevel, byService, byEvent, recent] = await Promise.all([
      pool.query(`SELECT level, COUNT(*) as count FROM logs GROUP BY level`),
      pool.query(`SELECT service, COUNT(*) as count FROM logs GROUP BY service`),
      pool.query(`SELECT event, COUNT(*) as count FROM logs GROUP BY event ORDER BY count DESC LIMIT 10`),
      pool.query(`SELECT COUNT(*) as count FROM logs WHERE created_at > NOW() - INTERVAL '24 hours'`)
    ]);
    res.json({
      by_level:   byLevel.rows,
      by_service: byService.rows,
      top_events: byEvent.rows,
      last_24h:   parseInt(recent.rows[0].count)
    });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

// GET /api/logs/health
app.get('/api/logs/health', (_, res) =>
  res.json({ status: 'ok', service: 'log-service' })
);

// ── Start ──────────────────────────────────────────────────────────────
async function start() {
  let retries = 10;
  while (retries > 0) {
    try { await pool.query('SELECT 1'); break; }
    catch (e) {
      console.log(`[log-service] Waiting DB... (${retries} left)`);
      retries--;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  app.listen(PORT, () => console.log(`[log-service] Running on :${PORT}`));
}
start();
```

### Log Events ที่ต้องบันทึก (บังคับ)

| Event | Service | Level | เมื่อไหร่ |
|---|---|---|---|
| `LOGIN_SUCCESS` | auth-service | INFO | login ถูกต้อง |
| `LOGIN_FAILED` | auth-service | WARN | username/password ผิด |
| `JWT_INVALID` | task-service | ERROR | token ผิดหรือหมดอายุ |
| `TASK_CREATED` | task-service | INFO | สร้าง task สำเร็จ |
| `TASK_DELETED` | task-service | INFO | ลบ task |

---

## 9. Part 6: Docker Compose

**`docker-compose.yml`:**
```yaml
services:

  # ── PostgreSQL (Shared DB) ─────────────────────────────────────────
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB:       ${POSTGRES_DB}
      POSTGRES_USER:     ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout:  5s
      retries:  5
    networks: [taskboard-net]

  # ── Auth Service ───────────────────────────────────────────────────
  auth-service:
    build: ./auth-service
    environment:
      DB_HOST:      postgres
      DB_PORT:      5432
      DB_NAME:      ${POSTGRES_DB}
      DB_USER:      ${POSTGRES_USER}
      DB_PASSWORD:  ${POSTGRES_PASSWORD}
      JWT_SECRET:   ${JWT_SECRET}
      JWT_EXPIRES:  ${JWT_EXPIRES}
      PORT:         3001
    depends_on:
      postgres: { condition: service_healthy }
    networks: [taskboard-net]
    restart: unless-stopped

  # ── Task Service ───────────────────────────────────────────────────
  task-service:
    build: ./task-service
    environment:
      DB_HOST:      postgres
      DB_PORT:      5432
      DB_NAME:      ${POSTGRES_DB}
      DB_USER:      ${POSTGRES_USER}
      DB_PASSWORD:  ${POSTGRES_PASSWORD}
      JWT_SECRET:   ${JWT_SECRET}
      PORT:         3002
    depends_on:
      postgres:     { condition: service_healthy }
      auth-service: { condition: service_started }
    networks: [taskboard-net]
    restart: unless-stopped

  # ── Log Service ────────────────────────────────────────────────────
  log-service:
    build: ./log-service
    environment:
      DB_HOST:      postgres
      DB_PORT:      5432
      DB_NAME:      ${POSTGRES_DB}
      DB_USER:      ${POSTGRES_USER}
      DB_PASSWORD:  ${POSTGRES_PASSWORD}
      JWT_SECRET:   ${JWT_SECRET}
      PORT:         3003
    depends_on:
      postgres: { condition: service_healthy }
    networks: [taskboard-net]
    restart: unless-stopped

  # ── Frontend (Static HTML) ─────────────────────────────────────────
  frontend:
    build: ./frontend
    networks: [taskboard-net]

  # ── Nginx (API Gateway + TLS) ──────────────────────────────────────
  nginx:
    build: ./nginx
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - auth-service
      - task-service
      - log-service
      - frontend
    networks: [taskboard-net]
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  taskboard-net:
    driver: bridge
```

**`.env.example`** (copy เป็น `.env` แล้วแก้ค่า):
```env
# Database
POSTGRES_DB=taskboard
POSTGRES_USER=admin
POSTGRES_PASSWORD=secret123

# JWT (เปลี่ยนก่อนส่งงานจริงเสมอ)
JWT_SECRET=engse207-super-secret-change-in-production-abc123
JWT_EXPIRES=1h
```

**`.gitignore`:**
```
node_modules/
.env
nginx/certs/*.pem
*.log
```

### วิธีรันระบบ

```bash
# 1. สร้าง SSL certificate
chmod +x scripts/gen-certs.sh
./scripts/gen-certs.sh

# 2. สร้างไฟล์ .env
cp .env.example .env

# 3. Build และรัน
docker compose up --build

# 4. ทดสอบ (เปิด browser)
#    https://localhost  (จะมี cert warning — กด Advanced → Proceed)
#    http://localhost   (จะ redirect ไป HTTPS)

# รีเซ็ต DB (ถ้าต้องการเริ่มใหม่)
docker compose down -v
docker compose up --build
```

---

## 10. Part 7: Frontend — Task Board UI

> **พื้นฐาน:** ใช้ code จาก Week 12 `index.html` เป็นฐาน
> **เปลี่ยน:** ลบ Register tab ออก, เพิ่มลิงก์ไปหน้า logs.html

**`frontend/Dockerfile`:**
```dockerfile
FROM nginx:1.25-alpine
COPY index.html /usr/share/nginx/html/index.html
COPY logs.html  /usr/share/nginx/html/logs.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**`frontend/index.html`** — โครงสร้างหลักที่ต้องมี (สร้างต่อจาก Week 12):

```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🔐 Task Board — Final Lab Set 1</title>
  <style>
    /* copy CSS ทั้งหมดจาก Week 12 index.html */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0f172a; --surface: #1e293b; --surface2: #273448;
      --border: #334155; --text: #e2e8f0; --muted: #94a3b8;
      --blue: #3b82f6; --green: #22c55e; --yellow: #f59e0b;
      --red: #ef4444; --purple: #a855f7;
    }
    /* ... (copy CSS จาก Week 12) ... */
  </style>
</head>
<body>

<!-- ════ AUTH PAGE ════ (Login เท่านั้น ไม่มี Register tab) -->
<div id="auth-page">
  <div class="auth-box">
    <div class="auth-logo">🔐</div>
    <div class="auth-title">Task Board — Final Lab</div>

    <div id="login-form">
      <div class="form-group">
        <label>Email</label>
        <input id="login-email" type="email" value="alice@lab.local">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input id="login-password" type="password" value="alice123">
      </div>
      <button class="btn-primary" onclick="doLogin()">เข้าสู่ระบบ</button>
    </div>

    <div id="auth-msg"></div>

    <!-- Seed users hint -->
    <div style="margin-top:1rem;padding:.75rem;background:rgba(59,130,246,.1);border-radius:.5rem;font-size:.82rem">
      <strong>🔑 Seed Users:</strong><br>
      alice@lab.local / alice123 (member)<br>
      bob@lab.local / bob456 (member)<br>
      admin@lab.local / adminpass (admin)
    </div>
  </div>
</div>

<!-- ════ MAIN APP ════ -->
<div id="app-page" class="hidden">
  <nav class="sidebar">
    <div class="sidebar-logo">📋 Task Board</div>
    <div class="sidebar-nav">
      <button class="nav-item active" data-page="tasks" onclick="showPage('tasks')">
        <span class="nav-icon">✅</span> Tasks
      </button>
      <button class="nav-item" data-page="profile" onclick="showPage('profile')">
        <span class="nav-icon">👤</span> Profile & JWT
      </button>
      <!-- Log Dashboard — เปิดหน้าใหม่ (admin เท่านั้น) -->
      <a href="logs.html" target="_blank" class="nav-item" style="text-decoration:none">
        <span class="nav-icon">📊</span> Log Dashboard
        <span style="margin-left:auto;font-size:.7rem;color:var(--muted)">↗</span>
      </a>
    </div>
    <div class="sidebar-footer">
      <!-- User info + logout button -->
      <div class="user-chip">
        <div class="user-avatar" id="sidebar-avatar">?</div>
        <div>
          <div id="sidebar-name">—</div>
          <span class="role-badge" id="sidebar-role-badge">—</span>
        </div>
        <button onclick="doLogout()">✕</button>
      </div>
    </div>
  </nav>

  <div class="main-content">
    <div id="page-tasks"><!-- Task list + create/edit modal --></div>
    <div id="page-profile" class="hidden"><!-- Profile + JWT inspector --></div>
  </div>
</div>

<script>
const API = '';  // relative URL — Nginx จัดการ routing
let token = localStorage.getItem('jwt_token');
let currentUser = null;

async function doLogin() {
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  if (!email || !password) { showAuthMsg('กรุณากรอกข้อมูลให้ครบ','error'); return; }

  const res  = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  if (res.ok) {
    token = data.token;
    localStorage.setItem('jwt_token', token);
    initApp(data.user);
  } else {
    showAuthMsg('❌ ' + (data.error || 'Login ล้มเหลว'), 'error');
  }
}

function showAuthMsg(msg, type) {
  const el = document.getElementById('auth-msg');
  el.className = `auth-msg ${type}`;
  el.textContent = msg;
}

function doLogout() {
  localStorage.removeItem('jwt_token');
  token = null; currentUser = null;
  document.getElementById('app-page').classList.add('hidden');
  document.getElementById('auth-page').classList.remove('hidden');
}

function initApp(user) {
  currentUser = user;
  document.getElementById('auth-page').classList.add('hidden');
  document.getElementById('app-page').classList.remove('hidden');
  document.getElementById('sidebar-avatar').textContent = (user.username||'?').charAt(0).toUpperCase();
  document.getElementById('sidebar-name').textContent   = user.username || user.email;
  const rb = document.getElementById('sidebar-role-badge');
  rb.textContent = user.role;
  rb.className   = `role-badge role-${user.role}`;
  showPage('tasks');
}

function showPage(page) {
  ['tasks','profile'].forEach(p => {
    document.getElementById(`page-${p}`).classList.toggle('hidden', p !== page);
    const btn = document.querySelector(`[data-page="${p}"]`);
    if (btn) btn.classList.toggle('active', p === page);
  });
  if (page === 'tasks')   loadTasks();
  if (page === 'profile') loadProfile();
}

/* ── loadTasks, renderTasks, openCreateModal, submitTask,
       confirmDelete, loadProfile, renderJwtInspector, escHtml
   ── copy ทั้งหมดจาก Week 12 index.html ── */

// Auto-login ถ้ามี token เก่า
if (token) {
  (async () => {
    const res  = await fetch(`${API}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.valid) initApp(data.user);
    else { localStorage.removeItem('jwt_token'); token = null; }
  })();
}
</script>
</body>
</html>
```

---

## 11. Part 8: Frontend — Log Dashboard

> Log Dashboard อ่านข้อมูลจาก **`GET /api/logs/`** — สิทธิ์เฉพาะ **admin** เท่านั้น
> หาก login ด้วย member แล้วเรียก `/api/logs/` ต้องได้ **403 Forbidden**

**`frontend/logs.html`:**
```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>📊 Log Dashboard — Final Lab</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #0f172a; --surface: #1e293b; --border: #334155;
      --text: #e2e8f0; --muted: #94a3b8;
      --blue: #3b82f6; --green: #22c55e; --yellow: #f59e0b; --red: #ef4444; --purple: #a855f7;
    }
    body { font-family:'Segoe UI',system-ui,sans-serif; background:var(--bg); color:var(--text); min-height:100vh; }
    .header { background:var(--surface); border-bottom:1px solid var(--border); padding:1rem 1.5rem; display:flex; justify-content:space-between; align-items:center; }
    .header h1 { font-size:1.2rem; font-weight:700; }
    .container { max-width:1400px; margin:0 auto; padding:1.5rem; }
    .stats { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:1.5rem; }
    .stat-card { background:var(--surface); border:1px solid var(--border); border-radius:.75rem; padding:1rem 1.25rem; }
    .stat-label { color:var(--muted); font-size:.75rem; text-transform:uppercase; }
    .stat-value { font-size:1.75rem; font-weight:700; margin-top:.25rem; }
    .filter-bar { display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:1rem; }
    .filter-bar input, .filter-bar select {
      background:var(--surface); border:1px solid var(--border); color:var(--text);
      padding:.45rem .75rem; border-radius:.5rem; font-size:.85rem; outline:none;
    }
    .filter-bar input { flex:1; min-width:200px; }
    .btn { padding:.45rem 1rem; border-radius:.5rem; border:none; cursor:pointer; font-size:.85rem; font-weight:600; }
    .btn-primary   { background:var(--blue); color:#fff; }
    .btn-secondary { background:var(--surface); color:var(--text); border:1px solid var(--border); }
    .log-table { background:var(--surface); border:1px solid var(--border); border-radius:.75rem; overflow:hidden; }
    .log-table-header { display:grid; grid-template-columns:160px 100px 75px 140px 1fr; gap:.5rem; padding:.6rem 1rem; background:#1a2d45; font-size:.72rem; color:var(--muted); font-weight:700; text-transform:uppercase; }
    .log-row { display:grid; grid-template-columns:160px 100px 75px 140px 1fr; gap:.5rem; padding:.65rem 1rem; border-top:1px solid var(--border); font-size:.82rem; align-items:center; }
    .log-row:hover { background:rgba(255,255,255,.03); }
    .badge { padding:.15rem .55rem; border-radius:.3rem; font-size:.7rem; font-weight:700; }
    .badge-INFO  { background:rgba(34,197,94,.15);  color:#4ade80; }
    .badge-WARN  { background:rgba(245,158,11,.15); color:#fbbf24; }
    .badge-ERROR { background:rgba(239,68,68,.15);  color:#f87171; }
    .service-tag { font-size:.72rem; padding:.1rem .45rem; border-radius:.3rem; background:rgba(59,130,246,.15); color:var(--blue); }
    .time-text { color:var(--muted); font-size:.75rem; font-family:'Courier New',monospace; }
    .empty { text-align:center; padding:3rem; color:var(--muted); }
    /* Login overlay */
    #login-overlay { position:fixed; inset:0; background:var(--bg); display:flex; align-items:center; justify-content:center; z-index:100; }
    .login-box { background:var(--surface); border:1px solid var(--border); border-radius:1rem; padding:2rem; width:340px; }
    .login-box h2 { margin-bottom:1.25rem; }
    .form-group { margin-bottom:1rem; }
    .form-group label { display:block; font-size:.82rem; color:var(--muted); margin-bottom:.35rem; }
    .form-group input { width:100%; background:#0f172a; border:1px solid var(--border); color:var(--text); padding:.6rem .75rem; border-radius:.5rem; font-size:.9rem; outline:none; }
  </style>
</head>
<body>

<!-- Login overlay -->
<div id="login-overlay">
  <div class="login-box">
    <h2>📊 Log Dashboard</h2>
    <p style="font-size:.82rem;color:var(--muted);margin-bottom:1rem">ต้องใช้บัญชี admin เท่านั้น</p>
    <div class="form-group">
      <label>Email</label>
      <input id="l-email" type="email" value="admin@lab.local">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input id="l-pass" type="password" value="adminpass">
    </div>
    <button class="btn btn-primary" style="width:100%" onclick="dashLogin()">เข้าสู่ระบบ</button>
    <p id="l-err" style="color:var(--red);font-size:.82rem;margin-top:.5rem"></p>
  </div>
</div>

<!-- Main Dashboard -->
<div class="header">
  <h1>📊 Log Dashboard — Task Board Final Lab</h1>
  <div style="display:flex;gap:1rem;align-items:center">
    <span id="logged-as" style="font-size:.82rem;color:var(--muted)"></span>
    <button class="btn btn-secondary" onclick="toggleAutoRefresh()" id="refresh-btn">⏸ Auto ON</button>
    <a href="index.html" style="color:var(--blue);font-size:.85rem;text-decoration:none">← Task Board</a>
  </div>
</div>

<div class="container">
  <div class="stats">
    <div class="stat-card">
      <div class="stat-label">Total Logs</div>
      <div class="stat-value" id="stat-total">—</div>
    </div>
    <div class="stat-card">
      <div class="stat-label" style="color:var(--green)">INFO</div>
      <div class="stat-value" style="color:var(--green)" id="stat-info">—</div>
    </div>
    <div class="stat-card">
      <div class="stat-label" style="color:var(--yellow)">WARN</div>
      <div class="stat-value" style="color:var(--yellow)" id="stat-warn">—</div>
    </div>
    <div class="stat-card">
      <div class="stat-label" style="color:var(--red)">ERROR</div>
      <div class="stat-value" style="color:var(--red)" id="stat-error">—</div>
    </div>
  </div>

  <div class="filter-bar">
    <input id="f-search" type="text" placeholder="🔍 ค้นหา event / message...">
    <select id="f-service">
      <option value="">Service: ทั้งหมด</option>
      <option value="auth-service">auth-service</option>
      <option value="task-service">task-service</option>
    </select>
    <select id="f-level">
      <option value="">Level: ทั้งหมด</option>
      <option value="INFO">INFO</option>
      <option value="WARN">WARN</option>
      <option value="ERROR">ERROR</option>
    </select>
    <button class="btn btn-primary" onclick="loadLogs()">🔄 โหลดใหม่</button>
    <button class="btn btn-secondary" onclick="clearFilters()">✕ ล้าง Filter</button>
  </div>

  <div class="log-table">
    <div class="log-table-header">
      <div>เวลา</div><div>Service</div><div>Level</div><div>Event</div><div>Message</div>
    </div>
    <div id="log-rows"><div class="empty">⏳ กำลังโหลด...</div></div>
  </div>
  <p id="last-refresh" style="font-size:.75rem;color:var(--muted);text-align:right;margin-top:.5rem"></p>
</div>

<script>
const API = '';
let token = localStorage.getItem('jwt_token');
let autoRefresh = true;
let refreshTimer = null;
let allLogs = [];

async function dashLogin() {
  const email    = document.getElementById('l-email').value.trim();
  const password = document.getElementById('l-pass').value;
  const res  = await fetch(`${API}/api/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok) {
    if (data.user.role !== 'admin') {
      document.getElementById('l-err').textContent = 'หน้านี้สำหรับ admin เท่านั้น';
      return;
    }
    token = data.token;
    localStorage.setItem('jwt_token', token);
    document.getElementById('login-overlay').style.display = 'none';
    document.getElementById('logged-as').textContent = `👤 ${data.user.username} (${data.user.role})`;
    loadStats();
    loadLogs();
    startAutoRefresh();
  } else {
    document.getElementById('l-err').textContent = data.error || 'Login ล้มเหลว';
  }
}

function authHeaders() {
  return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
}

async function loadStats() {
  const res  = await fetch(`${API}/api/logs/stats`, { headers: authHeaders() });
  if (!res.ok) return;
  const data = await res.json();
  const total = data.by_level.reduce((s, r) => s + parseInt(r.count), 0);
  document.getElementById('stat-total').textContent = total;
  const find = lv => { const r = data.by_level.find(r => r.level === lv); return r ? r.count : 0; };
  document.getElementById('stat-info').textContent  = find('INFO');
  document.getElementById('stat-warn').textContent  = find('WARN');
  document.getElementById('stat-error').textContent = find('ERROR');
}

async function loadLogs() {
  const service = document.getElementById('f-service').value;
  const level   = document.getElementById('f-level').value;
  const search  = document.getElementById('f-search').value.trim();
  const params  = new URLSearchParams({ limit: 200 });
  if (service) params.set('service', service);
  if (level)   params.set('level',   level);

  const res = await fetch(`${API}/api/logs/?${params}`, { headers: authHeaders() });
  if (res.status === 401) { document.getElementById('login-overlay').style.display = 'flex'; return; }
  if (res.status === 403) {
    document.getElementById('log-rows').innerHTML = '<div class="empty" style="color:#f87171">⛔ หน้านี้สำหรับ admin เท่านั้น</div>';
    return;
  }
  if (!res.ok) return;
  const data = await res.json();
  allLogs = data.logs || [];

  let filtered = allLogs;
  if (search) {
    const q = search.toLowerCase();
    filtered = allLogs.filter(l =>
      (l.event||'').toLowerCase().includes(q) ||
      (l.message||'').toLowerCase().includes(q) ||
      (l.service||'').toLowerCase().includes(q)
    );
  }
  renderLogs(filtered);
  document.getElementById('last-refresh').textContent =
    `อัปเดต: ${new Date().toLocaleTimeString('th-TH')} | ${filtered.length}/${data.total} รายการ`;
  loadStats();
}

function renderLogs(logs) {
  const container = document.getElementById('log-rows');
  if (!logs.length) { container.innerHTML = '<div class="empty">📭 ไม่พบ log</div>'; return; }
  container.innerHTML = logs.map(log => {
    const time = new Date(log.created_at).toLocaleString('th-TH', { dateStyle:'short', timeStyle:'medium' });
    return `<div class="log-row">
      <div class="time-text">${escHtml(time)}</div>
      <div><span class="service-tag">${escHtml(log.service)}</span></div>
      <div><span class="badge badge-${log.level}">${log.level}</span></div>
      <div style="font-family:'Courier New',monospace;font-size:.75rem;color:var(--purple)">${escHtml(log.event)}</div>
      <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escHtml(log.message||'')}">
        ${escHtml(log.message||'—')}
        ${log.meta ? `<span style="color:var(--muted);font-size:.72rem"> • ${escHtml(JSON.stringify(log.meta))}</span>` : ''}
      </div>
    </div>`;
  }).join('');
}

function escHtml(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function startAutoRefresh() {
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(() => { if (autoRefresh) loadLogs(); }, 5000);
}

function toggleAutoRefresh() {
  autoRefresh = !autoRefresh;
  document.getElementById('refresh-btn').textContent = autoRefresh ? '⏸ Auto ON' : '▶ Auto OFF';
}

function clearFilters() {
  document.getElementById('f-service').value = '';
  document.getElementById('f-level').value   = '';
  document.getElementById('f-search').value  = '';
  loadLogs();
}

// Auto-login ถ้ามี token เก่า
if (token) {
  (async () => {
    const res  = await fetch(`${API}/api/auth/verify`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.valid && data.user.role === 'admin') {
      document.getElementById('login-overlay').style.display = 'none';
      document.getElementById('logged-as').textContent = `👤 ${data.user.username} (${data.user.role})`;
      loadStats(); loadLogs(); startAutoRefresh();
    } else {
      localStorage.removeItem('jwt_token'); token = null;
      document.getElementById('l-err').textContent = 'หน้านี้สำหรับ admin เท่านั้น';
    }
  })();
}
</script>
</body>
</html>
```

---

## 12. Test Cases และ Screenshots

ทดสอบด้วย **Postman หรือ curl** บน **`https://localhost`** — screenshot ทุกข้อ

### curl Commands สำหรับทดสอบ

```bash
BASE="https://localhost"   # ใช้ -k หรือ --insecure เพราะ self-signed cert

# T3: Login สำเร็จ — เก็บ token
TOKEN=$(curl -sk -X POST $BASE/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@lab.local","password":"alice123"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
echo "TOKEN: $TOKEN"

# T4: Login ผิด password → 401
curl -sk -X POST $BASE/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@lab.local","password":"wrong"}'

# T5: Create Task
curl -sk -X POST $BASE/api/tasks/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"ทดสอบระบบ Final Lab","description":"from curl","priority":"high"}'

# T6: Get Tasks
curl -sk $BASE/api/tasks/ -H "Authorization: Bearer $TOKEN"

# T7: Update Task (แทน TASK_ID ด้วย id จริง)
curl -sk -X PUT $BASE/api/tasks/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"IN_PROGRESS"}'

# T8: Delete Task
curl -sk -X DELETE $BASE/api/tasks/1 \
  -H "Authorization: Bearer $TOKEN"

# T9: ไม่มี JWT → 401
curl -sk $BASE/api/tasks/

# T10A: Member เรียก /api/logs/ → 403
curl -sk -i $BASE/api/logs/ -H "Authorization: Bearer $TOKEN"

# T10B: Admin เรียก /api/logs/ → 200
ADMIN_TOKEN=$(curl -sk -X POST $BASE/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lab.local","password":"adminpass"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")
curl -sk $BASE/api/logs/ -H "Authorization: Bearer $ADMIN_TOKEN"

# T11: Rate Limit → 429 (ลอง login ผิดเร็วๆ > 5 ครั้ง/นาที)
for i in {1..8}; do
  echo -n "Attempt $i: "
  curl -sk -o /dev/null -w "%{http_code}\n" -X POST $BASE/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"alice@lab.local","password":"wrong"}'
  sleep 0.1
done
```

### Test Cases และคะแนน

| Test | รายการ | คะแนน |
|---|---|---:|
| T1 | `docker compose up --build` สำเร็จ ทุก container healthy | 10 |
| T2 | Browser เข้า `https://localhost` ได้ (แม้มี cert warning) และ HTTP → HTTPS redirect | 10 |
| T3 | POST `/api/auth/login` (alice/bob/admin) → 200 + JWT token | 10 |
| T4 | POST `/api/auth/login` (ผิด password) → 401 | 5 |
| T5 | POST `/api/tasks/` (มี JWT) → 201 Created | 10 |
| T6 | GET `/api/tasks/` (มี JWT) → 200 + task list | 10 |
| T7 | PUT `/api/tasks/:id` (มี JWT) → 200 Updated | 5 |
| T8 | DELETE `/api/tasks/:id` (มี JWT) → 200 Deleted | 5 |
| T9 | GET `/api/tasks/` (ไม่มี JWT) → 401 Unauthorized | 10 |
| T10A | Login เป็น member แล้วเรียก `/api/logs/` → 403 Forbidden | 5 |
| T10B | Login เป็น admin แล้วเรียก `/api/logs/` → เห็น log entries ใน DB | 10 |
| T11 | ส่ง login ผิดเร็วๆ > 5 ครั้ง/นาที → 429 Too Many Requests | 5 |
| **รวม** | | **95** |
| Bonus | README มี Architecture diagram + อธิบาย HTTPS/JWT/Logging flow ชัดเจน | 5 |
| **รวมสูงสุด** | | **100** |

> ⚠️ **หมายเหตุ:** คะแนนรวมสูงสุดไม่เกิน 100 คะแนน

---

## 13. วิธีการส่งงาน

ส่งผ่าน Git Repository เท่านั้น

### Git Repository

Repository ต้องมีอย่างน้อย:
- Source code ของทุก service
- `docker-compose.yml`
- ไฟล์ Nginx config และ certificate script
- `README.md`
- `TEAM_SPLIT.md`
- `INDIVIDUAL_REPORT_[studentid].md` ของสมาชิกแต่ละคน
- โฟลเดอร์ `screenshots/` พร้อมหลักฐานตามรายการตรวจ

### รายการตรวจสอบก่อนส่ง

- [ ] รันด้วย Docker Compose ได้ (`docker compose up --build`)
- [ ] เข้าถึงระบบผ่าน HTTPS ได้ (https://localhost)
- [ ] Login ด้วย seed users ได้ทั้ง 3 บัญชี
- [ ] Task Board CRUD ทำงานได้ครบ
- [ ] Log Dashboard เปิดได้เฉพาะ admin (member → 403)
- [ ] Screenshots ครบ 12 รูป
- [ ] README อธิบายวิธีรันระบบ, HTTPS flow, JWT flow ชัดเจน
- [ ] มีไฟล์ `TEAM_SPLIT.md` และ `INDIVIDUAL_REPORT` ครบทุกคน

### ข้อห้าม

- ห้ามส่งงานเป็นไฟล์ zip โดยไม่มี Git Repository
- ห้ามใช้ภาพหน้าจอจากโปรเจกต์อื่นหรือสัปดาห์ก่อนหน้า
- ห้ามคัดลอก README หรือรายงานรายบุคคลจากกลุ่มอื่น
- ห้ามลบประวัติ Git เพื่อซ่อนการแบ่งงาน

### สิ่งที่ `README.md` ต้องมี

- ชื่อวิชา ชื่องาน รายชื่อสมาชิก
- ภาพรวมและวัตถุประสงค์
- Architecture diagram
- โครงสร้าง repository
- วิธีสร้าง certificate และรันระบบ
- รายชื่อ seed users
- วิธีทดสอบ API
- คำอธิบาย HTTPS, JWT, Logging flow
- Known limitations

---

## 14. การประเมินผล

คะแนนหลักยึดตาม **Test Cases ในหัวข้อ 12** (95 คะแนน + Bonus 5 คะแนน = สูงสุด 100 คะแนน)

เพื่อให้การประเมินสะท้อนทั้งทีมและรายบุคคล ผู้สอนจะใช้หลักฐานเพิ่มเติม:
- `TEAM_SPLIT.md`
- `INDIVIDUAL_REPORT_[studentid].md`
- commit history
- การตอบคำถามรายบุคคล

### หลักเกณฑ์รายกลุ่ม

- ระบบทำงานครบตามโจทย์และทดสอบได้จริง
- Architecture และการเชื่อมต่อ services ถูกต้อง
- มี HTTPS, JWT, Logging และ Frontend ครบ
- README, screenshots ครบถ้วน

### หลักเกณฑ์รายบุคคล

- ขอบเขตงานที่รับผิดชอบใน `TEAM_SPLIT.md`
- รายงานรายบุคคลใน `INDIVIDUAL_REPORT`
- commit history และคุณภาพของการเปลี่ยนแปลง
- ความสามารถในการอธิบาย flow และ config ของส่วนที่รับผิดชอบ

> หากระบบกลุ่มทำงานได้ แต่สมาชิกบางคนไม่สามารถแสดงหลักฐานหรืออธิบายงานได้ ผู้สอนอาจปรับลดคะแนนรายบุคคล

---

## 15. เอกสารบังคับ

### `TEAM_SPLIT.md`

```markdown
# TEAM_SPLIT.md

## Team Members
- 650000001 นาย A
- 650000002 นางสาว B

## Work Allocation

### Student 1: นาย A (650000001)
- Auth Service (login route, JWT utils, logEvent)
- HTTPS Certificate + Nginx config
- db/init.sql + Seed Users

### Student 2: นางสาว B (650000002)
- Task Service (CRUD routes, authMiddleware)
- Log Service
- Frontend (index.html + logs.html)
- Docker Compose integration

## Shared Responsibilities
- Architecture diagram
- End-to-end testing
- README + screenshots

## Integration Notes
อธิบายว่างานของทั้งสองคนเชื่อมต่อกันอย่างไร
```

### `INDIVIDUAL_REPORT_[studentid].md`

ต้องมีหัวข้ออย่างน้อย:
1. ข้อมูลผู้จัดทำ
2. ส่วนที่รับผิดชอบ
3. สิ่งที่ลงมือพัฒนาด้วยตนเอง
4. ปัญหาที่พบและวิธีแก้ไข
5. สิ่งที่ได้เรียนรู้
6. **แนวทางที่จะพัฒนาต่อใน Set 2**

---

## 16. หลักฐาน Git Contribution

### ข้อกำหนดขั้นต่ำ

- สมาชิกแต่ละคนต้องมี commit ของตนเองอย่างน้อย **3 commits**
- commit message ต้องสื่อความหมาย เช่น `feat(auth): add login route` หรือ `fix(nginx): update https proxy config`

### แนะนำเพิ่มเติม

- หากใช้ Pull Request ควรมี comment review ระหว่างสมาชิก
- หากไม่ใช้ PR ให้ระบุใน `TEAM_SPLIT.md` ว่าใครตรวจสอบส่วนใด

---

## 17. แนวทางการสัมภาษณ์รายบุคคล

ผู้สอนอาจสุ่มถามสมาชิกแต่ละคน:

- Auth Service ตรวจสอบรหัสผ่านด้วย bcrypt อย่างไร
- JWT ถูกสร้างและ verify อย่างไร — อะไรอยู่ใน payload
- Nginx มีบทบาทอย่างไรในระบบนี้ — ทำไม self-signed cert ถึงมี warning
- เหตุใดในงานชุดนี้จึงยังใช้ shared database
- Log Service รับ log จาก services อื่นอย่างไร — ทำไม Nginx ต้อง block `/api/logs/internal`
- Frontend เรียก API ผ่าน path ใด — ทำไม URL เป็น relative แทน absolute
- **หากจะต่อยอดเป็น Set 2 ควรปรับ/เพิ่มอะไรบ้าง**

---

> **โชคดีกับ Final Lab Set 1 ครับ! เตรียมพร้อมสำหรับ Set 2 ที่จะ Deploy ขึ้น Cloud**
>
> *ENGSE207 Software Architecture | มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*
> *อาจารย์ธนิต เกตุแก้ว*

---

## 🔧 ภาคผนวก: คู่มือปรับ Frontend จาก Week 12

### สิ่งที่ Copy จาก Week 12 ได้โดยตรง

| ส่วน | วิธี |
|---|---|
| CSS ทั้งหมด (`<style>`) | copy ทั้งก้อน ไม่ต้องแก้ |
| HTML layout (sidebar, modals, toast container) | copy ได้ ต้องลบ Users nav ออก |
| `toast()`, `escHtml()`, `closeModal()`, `closeConfirm()` | copy ได้ทั้งหมด |
| `renderJwtInspector()` | copy ได้ทั้งหมด |
| `quickStatusUpdate()`, `openEditModal()`, `openCreateModal()`, `submitTask()`, `confirmDelete()` | copy ได้ ใช้ `fetch` แทน `apiFetch` |

### สิ่งที่ **ห้าม** Copy มาตรงๆ และต้องแก้

#### 1. `const API` และ `apiFetch()`

Week 12 มี `apiFetch()` wrapper ที่บันทึก log ลง localStorage — ใน Set 1 ให้ใช้ `fetch()` ธรรมดาแทน เพราะมี Log Service บน DB แล้ว

```javascript
// ❌ Week 12 (มี localStorage log — ไม่จำเป็นใน Set 1)
const res = await apiFetch(`${API}/api/tasks/`, { headers: authHeaders() });

// ✅ Set 1 (ใช้ fetch ธรรมดา)
const API = '';  // relative URL — Nginx จัดการ routing
const res = await fetch(`${API}/api/tasks/`, { headers: authHeaders() });
```

#### 2. `user.name` → `user.username`

Week 12 auth-service ส่ง field ชื่อ `name` แต่ Set 1 auth-service ส่ง `username`

```javascript
// ❌ Week 12
const initials = (user.name || user.email || '?').charAt(0).toUpperCase();
document.getElementById('sidebar-name').textContent = user.name || user.email;

// ✅ Set 1 (แก้ทุกที่ที่ใช้ user.name)
const initials = (user.username || user.email || '?').charAt(0).toUpperCase();
document.getElementById('sidebar-name').textContent = user.username || user.email;
```

#### 3. `initApp()` — ลบ Users nav

```javascript
// ✅ Set 1 — initApp() ที่แก้แล้ว (ลบ Users nav ออก)
function initApp(user) {
  currentUser = user;
  document.getElementById('auth-page').classList.add('hidden');
  document.getElementById('app-page').classList.remove('hidden');

  const initials = (user.username || user.email || '?').charAt(0).toUpperCase();
  document.getElementById('sidebar-avatar').textContent = initials;
  document.getElementById('sidebar-name').textContent   = user.username || user.email;
  const rb = document.getElementById('sidebar-role-badge');
  rb.textContent = user.role;
  rb.className   = `role-badge role-${user.role}`;

  // ❌ ลบออก: Week 12 มี Users nav แต่ Set 1 ไม่มี user-service
  // document.getElementById('nav-users').style.display = ...

  showPage('tasks');
}
```

#### 4. `showPage()` — ลบ users page

```javascript
// ✅ Set 1 (เฉพาะ tasks และ profile)
function showPage(page) {
  ['tasks', 'profile'].forEach(p => {   // ❌ ลบ 'users' ออก
    document.getElementById(`page-${p}`).classList.toggle('hidden', p !== page);
    const btn = document.querySelector(`[data-page="${p}"]`);
    if (btn) btn.classList.toggle('active', p === page);
  });
  if (page === 'tasks')   loadTasks();
  if (page === 'profile') loadProfile();
  // ❌ ลบออก: if (page === 'users') loadUsers();
}
```

#### 5. `loadProfile()` — เรียก `/api/auth/me` ไม่ใช่ `/api/users/me`

Set 1 ไม่มี User Service — profile data มาจาก Auth Service

```javascript
// ❌ Week 12
async function loadProfile() {
  const res  = await apiFetch(`${API}/api/users/me`, { headers: authHeaders() });
  const data = await res.json();
  const u    = data.user || currentUser;
  document.getElementById('prof-name').textContent = u.name || '—';  // ❌ .name
  ...
}

// ✅ Set 1 (แก้ endpoint และ field name)
async function loadProfile() {
  const res  = await fetch(`${API}/api/auth/me`, { headers: authHeaders() });
  if (!res.ok) { renderJwtInspector(); return; }
  const data = await res.json();
  const u    = data.user || currentUser;

  const initial = (u.username || u.email || '?').charAt(0).toUpperCase();
  document.getElementById('prof-avatar').textContent  = initial;
  document.getElementById('prof-name').textContent    = u.username || '—';  // ✅ .username
  document.getElementById('prof-email').textContent   = u.email;
  document.getElementById('prof-id').textContent      = u.id || '—';
  document.getElementById('prof-role').textContent    = u.role;
  document.getElementById('prof-created').textContent =
    u.created_at ? new Date(u.created_at).toLocaleDateString('th-TH') : '—';
  const rb = document.getElementById('prof-role-badge');
  rb.textContent = u.role;
  rb.className   = `role-badge role-${u.role}`;
  renderJwtInspector();
}
```

#### 6. `renderTasks()` — แก้ field ที่แสดงเจ้าของ task

Week 12 task-service ส่ง `owner_id` / `created_by` แต่ Set 1 task JOIN query ส่ง `username` มาด้วย

```javascript
// ❌ Week 12
<span class="chip chip-owner">👤 ${escHtml(t.owner_id || t.created_by || '?')}</span>

// ✅ Set 1 (ใช้ username จาก JOIN)
<span class="chip chip-owner">👤 ${escHtml(t.username || '?')}</span>
```

#### 7. ลบฟังก์ชันที่ไม่ต้องการ

ฟังก์ชันต่อไปนี้มีใน Week 12 แต่ **ไม่ใช้ใน Set 1** — ลบออกได้เลย:
- `doRegister()` — ไม่มี register ใน Set 1
- `switchTab()` — ไม่มี tab switch ใน Set 1
- `loadUsers()` — ไม่มี user-service ใน Set 1
- `logApiCall()` + `apiFetch()` — ไม่จำเป็น ใช้ plain `fetch()` แทน

### logs.html — ต้องสร้างใหม่ทั้งหมด

> ⚠️ **Week 12 `logs.html` ใช้ไม่ได้กับ Set 1** เพราะ Week 12 อ่าน log จาก localStorage  
> Set 1 ใช้ `GET /api/logs/` จาก Log Service (DB-backed)

`logs.html` สำหรับ Set 1 ได้เขียนไว้ครบแล้วในหัวข้อ **Part 8** ของเอกสารนี้ — ใช้โค้ดนั้นได้โดยตรง ไม่ต้อง copy จาก Week 12

