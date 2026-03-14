# 🚀 คู่มือปฏิบัติการ ENGCE301 - สัปดาห์ที่ 7
## Deploy TaskBoard to Cloud: 3-Tier Architecture บน Railway

**สัปดาห์:** 7 | **ระยะเวลา:** 3 ชั่วโมง | **ระดับความยาก:** ⭐⭐⭐

---

## 📋 สารบัญ

1. [วัตถุประสงค์การเรียนรู้](#-วัตถุประสงค์การเรียนรู้)
2. [ภาพรวม: Week 6 (Docker) → Week 7 (Cloud)](#-ภาพรวม-week-6-docker--week-7-cloud)
3. [Railway คืออะไร?](#-railway-คืออะไร)
4. [สิ่งที่ต้องเตรียม](#-สิ่งที่ต้องเตรียม)
5. [Part 1: สมัคร Railway และเตรียม Project](#part-1-สมัคร-railway-และเตรียม-project-30-นาที)
6. [Part 2: Deploy PostgreSQL Database](#part-2-deploy-postgresql-database-20-นาที)
7. [Part 3: Deploy Backend API](#part-3-deploy-backend-api-45-นาที)
8. [Part 4: Deploy Frontend](#part-4-deploy-frontend-45-นาที)
9. [Part 5: ทดสอบระบบและสำรวจ Cloud Features](#part-5-ทดสอบระบบและสำรวจ-cloud-features-30-นาที)
10. [Part 6: เชื่อมโยงกับ Concepts ที่เรียน](#part-6-เชื่อมโยงกับ-concepts-ที่เรียน-20-นาที)
11. [ใบงาน: Cloud Deployment Analysis](#-ใบงาน-cloud-deployment-analysis)
12. [Cleanup - สำคัญมาก!](#-cleanup---สำคัญมาก)
13. [แก้ปัญหาเบื้องต้น](#-แก้ปัญหาเบื้องต้น)

---

## 🎯 วัตถุประสงค์การเรียนรู้

เมื่อจบ Lab นี้ นักศึกษาจะสามารถ:

| ✅ | วัตถุประสงค์ | CLO |
|---|------------|-----|
| ☐ | Deploy แอปพลิเคชัน 3-Tier ที่พัฒนาไว้ใน Week 6 ขึ้น Cloud ได้ | CLO4, CLO14 |
| ☐ | อธิบายความแตกต่างระหว่าง Docker Local กับ Cloud PaaS ได้ | CLO4 |
| ☐ | ตั้งค่า Environment Variables และเชื่อมต่อ Services บน Cloud ได้ | CLO14 |
| ☐ | ใช้งาน Cloud Dashboard เพื่อดู Logs, Metrics ได้ | CLO14 |
| ☐ | เชื่อมโยงประสบการณ์กับหลักการ 12-Factor App ได้ | CLO4 |
| ☐ | อธิบายข้อดี/ข้อเสียของ PaaS เทียบกับ IaaS ได้ | CLO2, CLO3 |

---

## 🔄 ภาพรวม: Week 6 (Docker) → Week 7 (Cloud)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Week 6 → Week 7: จาก Local สู่ Cloud                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   WEEK 6: Docker on Local Machine              WEEK 7: Railway Cloud        │
│   ─────────────────────────────────            ─────────────────────────    │
│                                                                             │
│   ┌────────────────────────────┐            ┌─────────────────────────────┐ │
│   │     Your Laptop/PC         │            │        Railway Cloud        │ │
│   │                            │            │                             │ │
│   │  ┌───────┐ ┌───────┐       │            │  ┌───────┐ ┌───────┐        │ │
│   │  │Nginx  │ │ API   │       │    ───►    │  │Frontend│ │ API   │       │ │
│   │  │:443   │ │:3000  │       │            │  │Service │ │Service│       │ │
│   │  └───┬───┘ └───┬───┘       │            │  └───┬───┘ └───┬───┘        │ │
│   │      │         │           │            │      │         │            │ │
│   │      └────┬────┘           │            │      │    ┌────┘            │ │
│   │           │                │            │      │    │                 │ │
│   │      ┌────▼────┐           │            │      │ ┌──▼─────┐           │ │
│   │      │PostgreSQL│          │            │      │ │PostgreSQL│         │ │
│   │      │  :5432  │           │            │      │ │ Managed │          │ │
│   │      └─────────┘           │            │      │ └─────────┘          │ │
│   │                            │            │                             │ │
│   │  docker-compose up         │            │  Push to GitHub → Auto Deploy │
│   │  localhost:443             │            │  xxx.railway.app            │ │
│   └────────────────────────────┘            └─────────────────────────────┘ │
│                                                                             │
│   📝 สิ่งที่เปลี่ยน:                                                              │
│   • docker-compose.yml  →  Railway Services                                 │
│   • Docker Network      →  Railway Internal Network                         │
│   • .env file           →  Railway Variables                                │
│   • localhost           →  Public URLs (.railway.app)                       │
│   • Manual SSL          →  Auto SSL (HTTPS)                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🏗️ Architecture ที่จะสร้างวันนี้

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    TaskBoard on Railway (3 Services)                       │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│                              🌐 Internet                                   │
│                                   │                                        │
│               ┌───────────────────┼──────────────────┐                     │
│               │                   │                  │                     │
│               ▼                   ▼                  │                     │
│   ┌───────────────────┐  ┌───────────────────┐       │                     │
│   │  🎨 FRONTEND      │  │  ⚙️ BACKEND API   │       │                     │
│   │  (Static Site)    │  │  (Node.js)        │       │                     │
│   │                   │  │                   │       │                     │
│   │  • index.html     │  │  • Express Server │       │                     │
│   │  • css/style.css  │──│  • REST API       │       │                     │
│   │  • js/app.js      │  │  • /api/tasks     │       │                     │
│   │                   │  │                   │       │                     │
│   │  📍 Public URL    │  │  📍 Public URL    │       │                     │
│   │  frontend-xxx.    │  │  api-xxx.         │       │                     │
│   │  railway.app      │  │  railway.app      │       │                     │
│   └───────────────────┘  └─────────┬─────────┘       │                     │
│                                     │                │                     │
│                          Railway Internal Network    │                     │
│                                     │                │                     │
│                          ┌──────────▼──────────┐     │                     │
│                          │  🐘 POSTGRESQL      │     │                     │
│                          │  (Managed Database) │     │                     │
│                          │                     │     │                     │
│                          │  • Auto backup      │     │                     │
│                          │  • Auto scaling     │     │                     │
│                          │  • Internal only    │     │                     │
│                          │                     │     │                     │
│                          │  📍 Internal URL    │     │                     │
│                          │  postgres.railway.  │     │                     │
│                          │  internal:5432      │     │                     │
│                          └─────────────────────┘     │                     │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚂 Railway คืออะไร?

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Railway - Modern PaaS                               │
│                    https://railway.app                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Railway เป็น Platform as a Service (PaaS) ที่:                               │
│                                                                             │
│   ✅ Deploy จาก GitHub ได้ทันที                                                │
│   ✅ ไม่ต้องใส่ Credit Card (ใช้ GitHub Login)                                  │
│   ✅ Free $5/เดือน (พอสำหรับ Lab นี้)                                           │
│   ✅ มี Managed Database (PostgreSQL, MySQL, Redis)                          │
│   ✅ Auto SSL, Auto Deploy, Real-time Logs                                  │
│                                                                             │
│   🏷️ Service Model: PaaS (Platform as a Service)                            │
│                                                                             │
│   ┌───────────────────────────────────────────────────────────────────┐     │
│   │  สิ่งที่เราจัดการ                │  สิ่งที่ Railway จัดการ                  │     │
│   ├───────────────────────────────────────────────────────────────────┤     │
│   │  ✅ Application Code       │  ☁️ Runtime (Node.js, Python)        │     │
│   │  ✅ Data                   │  ☁️ OS, Servers, Network             │     │
│   │                            │  ☁️ SSL Certificates                 │     │
│   │                            │  ☁️ Load Balancing, Scaling          │     │
│   └───────────────────────────────────────────────────────────────────┘     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📚 สิ่งที่ต้องเตรียม

### ก่อนเริ่ม Lab ต้องมี:

| ✅ | รายการ | หมายเหตุ |
|---|--------|---------|
| ☐ | **GitHub Account** | ต้องมี และ login ได้ |
| ☐ | **Week 6 Project บน GitHub** | TaskBoard project ที่ push ไว้แล้ว |
| ☐ | **Web Browser** | Chrome หรือ Firefox |
| ☐ | **Internet** | ความเร็วปานกลางขึ้นไป |

### ตรวจสอบ Week 6 Project บน GitHub:

```bash
# ตรวจสอบว่า repository มีไฟล์ครบ:
week6-ntier-docker/
├── api/                    # ✅ ต้องมี
│   ├── package.json
│   ├── server.js
│   └── src/
├── frontend/               # ✅ ต้องมี
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── database/               # ✅ ต้องมี
│   └── init.sql
└── docker-compose.yml      # มีหรือไม่มีก็ได้
```

---

## Part 1: สมัคร Railway และเตรียม Project (30 นาที)

### 🎯 เป้าหมาย: สมัคร Railway และสร้าง Project ใหม่

### Step 1.1: สมัคร Railway Account

1. เปิด Browser ไปที่ **https://railway.app**

2. คลิก **"Login"** → เลือก **"Login with GitHub"**
   ```
   ┌─────────────────────────────────────┐
   │         Login to Railway            │
   │                                     │
   │   ┌─────────────────────────────┐   │
   │   │  🐙 Login with GitHub       │   │  ← คลิกนี้
   │   └─────────────────────────────┘   │
   └─────────────────────────────────────┘
   ```

3. **Authorize Railway** ให้เข้าถึง GitHub

4. เข้าสู่ **Dashboard** สำเร็จ! 🎉

### Step 1.2: ตรวจสอบ Free Credits

1. คลิก **Avatar** (มุมขวาบน) → **Settings** → **Billing**
2. ตรวจสอบว่ามี **$5.00 Free Credits**

```
┌─────────────────────────────────────────────────────────────────┐
│  💰 Billing - Free Trial                                        │
├─────────────────────────────────────────────────────────────────┤
│  Credits: $5.00 / month                                         │
│  Usage:   $0.00                                                 │
│                                                                 │
│  ⚠️ หมายเหตุ: Lab นี้ใช้ 3 services                                 │
│     ประมาณ $0.50-1.00 ถ้าใช้ 3-4 ชั่วโมง                            │
│     ต้อง CLEANUP หลังเสร็จ!                                        │
└─────────────────────────────────────────────────────────────────┘
```

### Step 1.3: สร้าง Project ใหม่

1. กลับไปที่ **Dashboard**
2. คลิก **"+ New Project"**
3. เลือก **"Empty Project"**

```
┌─────────────────────────────────────────────────────────────────┐
│  Start a New Project                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  📦 Deploy a Template                                   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  🔗 Deploy from GitHub repo                             │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  📁 Empty Project                                       │   │  ← เลือกนี้
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

4. ตั้งชื่อ Project: **"taskboard-cloud"** (หรือชื่ออื่นที่ต้องการ)

### ✅ Checkpoint 1
- [ ] สมัคร Railway Account สำเร็จ
- [ ] มี $5 Free Credits
- [ ] สร้าง Empty Project แล้ว

---

## Part 2: Deploy PostgreSQL Database (20 นาที)

### 🎯 เป้าหมาย: สร้าง Managed PostgreSQL Database

### Step 2.1: เพิ่ม PostgreSQL Service

1. ใน Project ที่สร้าง คลิก **"+ New"**
2. เลือก **"Database"** → **"Add PostgreSQL"**

```
┌─────────────────────────────────────────────────────────────────┐
│  Add a Service                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Databases:                                                    │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  🐘 PostgreSQL                                          │   │  ← เลือกนี้
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

3. รอสักครู่... PostgreSQL จะถูกสร้างขึ้นโดยอัตโนมัติ

### Step 2.2: ดู Connection Details

1. คลิกที่ **PostgreSQL Service** ที่เพิ่งสร้าง
2. ไปที่แท็บ **"Data"** หรือ **"Variables"**
3. จะเห็น Connection Information:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PostgreSQL - Variables                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   DATABASE_URL = postgresql://postgres:xxxxxx@xxxxxx.railway.internal:5432/ │
│                  railway                                                    │
│                                                                             │
│   PGHOST       = xxxxxx.railway.internal                                    │
│   PGPORT       = 5432                                                       │
│   PGUSER       = postgres                                                   │
│   PGPASSWORD   = xxxxxx (auto-generated)                                    │
│   PGDATABASE   = railway                                                    │
│                                                                             │
│   💡 Railway สร้าง credentials ให้อัตโนมัติ และปลอดภัย!                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Step 2.3: สร้างตาราง tasks

1. คลิกแท็บ **"Data"** ใน PostgreSQL Service
2. คลิก **"Query"** tab
3. วาง SQL นี้แล้วกด **Run**:

```sql
-- สร้างตาราง tasks (เหมือน Week 6)
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'TODO' CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE')),
    priority VARCHAR(10) DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- เพิ่มข้อมูลตัวอย่าง
INSERT INTO tasks (title, description, status, priority) VALUES
('Setup Cloud Environment', 'Deploy TaskBoard to Railway', 'DONE', 'HIGH'),
('Test API Endpoints', 'Verify all CRUD operations work', 'IN_PROGRESS', 'HIGH'),
('Update Documentation', 'Write deployment guide', 'TODO', 'MEDIUM');

-- ตรวจสอบข้อมูล
SELECT * FROM tasks;
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Query Result                                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   id │ title                    │ status      │ priority │ created_at       │
│   ───┼──────────────────────────┼─────────────┼──────────┼──────────────────│
│   1  │ Setup Cloud Environment  │ DONE        │ HIGH     │ 2024-01-15 10:00 │
│   2  │ Test API Endpoints       │ IN_PROGRESS │ HIGH     │ 2024-01-15 10:00 │
│   3  │ Update Documentation     │ TODO        │ MEDIUM   │ 2024-01-15 10:00 │
│                                                                             │
│   ✅ 3 rows returned                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### ✅ Checkpoint 2
- [ ] PostgreSQL Service สร้างสำเร็จ
- [ ] เห็น DATABASE_URL ใน Variables
- [ ] รัน SQL สร้างตาราง tasks สำเร็จ
- [ ] มีข้อมูลตัวอย่าง 3 rows

---

## Part 3: Deploy Backend API (45 นาที)

### 🎯 เป้าหมาย: Deploy Node.js API และเชื่อมต่อกับ Database

### Step 3.1: เตรียม Code สำหรับ Railway

ก่อน Deploy ต้องแก้ไข code เล็กน้อยเพื่อรองรับ Railway

#### 3.1.1 แก้ไข `api/src/config/database.js`

เปิดไฟล์ `api/src/config/database.js` ใน GitHub (หรือ local แล้ว push) และแก้เป็น:

```javascript
// src/config/database.js
// PostgreSQL Database Connection - Support both Docker and Railway

const { Pool } = require('pg');

// Railway ใช้ DATABASE_URL, Docker ใช้ตัวแปรแยก
const pool = process.env.DATABASE_URL 
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      })
    : new Pool({
        host: process.env.DB_HOST || 'db',
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || 'taskboard_db',
        user: process.env.DB_USER || 'taskboard',
        password: process.env.DB_PASSWORD || 'taskboard123',
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
      });

// Connection events
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ PostgreSQL pool error:', err.message);
});

// Query helper
const query = async (text, params) => {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log(`📊 Query: ${duration}ms | Rows: ${result.rowCount}`);
        return result;
    } catch (error) {
        console.error('❌ Query error:', error.message);
        throw error;
    }
};

// Health check
const healthCheck = async () => {
    try {
        const result = await pool.query('SELECT NOW() as time, current_database() as database');
        return {
            status: 'healthy',
            database: result.rows[0].database,
            timestamp: result.rows[0].time,
            poolSize: pool.totalCount,
            idleCount: pool.idleCount
        };
    } catch (error) {
        return {
            status: 'unhealthy',
            error: error.message
        };
    }
};

module.exports = { pool, query, healthCheck };
```

#### 3.1.2 แก้ไข `api/server.js` เพิ่ม CORS

เปิดไฟล์ `api/server.js` และตรวจสอบว่ามี CORS config ที่รองรับ Railway:

```javascript
// server.js - ส่วน CORS (เพิ่ม/แก้ไข)
const cors = require('cors');

// CORS configuration - รองรับทั้ง Local และ Railway
const corsOptions = {
    origin: function (origin, callback) {
        // อนุญาต requests ที่ไม่มี origin (เช่น mobile apps, curl)
        // และ origins ที่อนุญาต
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:8080',
            'https://localhost',
            /\.railway\.app$/  // อนุญาตทุก subdomain ของ railway.app
        ];
        
        if (!origin) return callback(null, true);
        
        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed instanceof RegExp) return allowed.test(origin);
            return allowed === origin;
        });
        
        if (isAllowed) {
            callback(null, true);
        } else {
            console.log('CORS blocked:', origin);
            callback(null, true); // อนุญาตทุก origin สำหรับ Lab
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
```

#### 3.1.3 Commit และ Push การเปลี่ยนแปลง

```bash
# ถ้าแก้ไขใน local
git add .
git commit -m "Update config for Railway deployment"
git push origin main
```

หรือแก้ไขโดยตรงบน GitHub:
1. ไปที่ repository บน GitHub
2. คลิกไฟล์ที่ต้องการแก้
3. คลิก ✏️ Edit
4. แก้ไข code
5. คลิก "Commit changes"

### Step 3.2: Deploy Backend จาก GitHub

1. กลับมาที่ **Railway Project**
2. คลิก **"+ New"** → **"GitHub Repo"**
3. เลือก repository **week6-ntier-docker** (หรือชื่อที่ใช้)
4. **สำคัญ:** ตั้งค่า **Root Directory** เป็น `/api`

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Deploy from GitHub                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Repository: your-username/week6-ntier-docker                              │
│                                                                             │
│   Branch: main                                                              │
│                                                                             │
│   ⚠️ Root Directory: /api                    ← สำคัญ! ต้องใส่                  │
│                                                                             │
│   [Deploy]                                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Step 3.3: ตั้งค่า Environment Variables

หลัง Deploy เริ่มต้น ให้ตั้งค่า Variables:

1. คลิกที่ **API Service** ที่เพิ่งสร้าง
2. ไปที่แท็บ **"Variables"**
3. คลิก **"+ Add Variable"** หรือ **"Add Reference"**
4. เพิ่ม Variables ดังนี้:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  API Service - Variables                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Variable Name       │  Value                                              │
│   ────────────────────┼─────────────────────────────────────────────────────│
│   DATABASE_URL        │  ${{Postgres.DATABASE_URL}}        ← Reference!     │
│   NODE_ENV            │  production                                         │
│   PORT                │  3000                                               │
│                                                                             │
│   💡 ${{Postgres.DATABASE_URL}} = อ้างอิงค่าจาก PostgreSQL Service             │
│      Railway จะแทนค่าให้อัตโนมัติ                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Step 3.4: ตั้งค่า Service Settings

1. ไปที่แท็บ **"Settings"** ของ API Service
2. ตรวจสอบและตั้งค่า:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  API Service - Settings                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Service Name:  api  (หรือเปลี่ยนเป็น taskboard-api)                           │
│                                                                             │
│   Build:                                                                    │
│   ├── Builder: Nixpacks (auto-detected) ✅                                  │
│   ├── Build Command: npm install                                            │
│   └── Start Command: npm start                                              │
│                                                                             │
│   Networking:                                                               │
│   ├── Public Networking: ✅ Enable (ต้องเปิด!)                                │
│   └── Generate Domain: คลิกเพื่อสร้าง URL                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

3. คลิก **"Generate Domain"** เพื่อสร้าง Public URL
4. **จดบันทึก URL** เช่น: `https://taskboard-api-production-xxxx.up.railway.app`

### Step 3.5: ทดสอบ API

เปิด Browser หรือใช้ curl ทดสอบ:

```bash
# ทดสอบ Health Check
curl https://YOUR-API-URL.railway.app/api/health

# ทดสอบ Get Tasks
curl https://YOUR-API-URL.railway.app/api/tasks
```

ควรเห็น Response:

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "database": "railway",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### ✅ Checkpoint 3
- [ ] Deploy API Service จาก GitHub สำเร็จ
- [ ] ตั้งค่า DATABASE_URL Reference แล้ว
- [ ] Generate Public Domain แล้ว
- [ ] ทดสอบ /api/health ผ่าน
- [ ] ทดสอบ /api/tasks เห็นข้อมูล 3 tasks

---

## Part 4: Deploy Frontend (45 นาที)

### 🎯 เป้าหมาย: Deploy Static Frontend และเชื่อมต่อกับ API

### Step 4.1: แก้ไข Frontend เพื่อเชื่อมต่อ API

ต้องแก้ไข `frontend/js/app.js` ให้ชี้ไป API URL บน Railway

#### 4.1.1 แก้ไข `frontend/js/app.js`

```javascript
// ============================================
// Task Board Frontend Application
// ENGCE301 - Week 7 Cloud Version
// ============================================

// ⚠️ เปลี่ยน URL นี้เป็น API URL ของคุณบน Railway
const API_BASE = 'https://YOUR-API-URL.railway.app/api';

// ตัวอย่าง:
// const API_BASE = 'https://taskboard-api-production-abc123.up.railway.app/api';

// ============================================
// API Functions
// ============================================

async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || 'API Error');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ... (rest of the code remains the same)
```

#### 4.1.2 (ทางเลือก) ใช้ Environment Variable แทน Hardcode

สร้างไฟล์ `frontend/config.js`:

```javascript
// config.js - สามารถเปลี่ยน URL ได้ง่าย
const CONFIG = {
    // เปลี่ยน URL นี้เป็น API URL ของคุณ
    API_URL: 'https://YOUR-API-URL.railway.app/api'
};
```

แล้วใน `index.html` เพิ่ม:
```html
<script src="config.js"></script>
<script src="js/app.js"></script>
```

และใน `app.js`:
```javascript
const API_BASE = CONFIG.API_URL;
```

#### 4.1.3 Commit และ Push

```bash
git add .
git commit -m "Update frontend API URL for Railway"
git push origin main
```

### Step 4.2: Deploy Frontend Service

1. กลับมาที่ **Railway Project**
2. คลิก **"+ New"** → **"GitHub Repo"**
3. เลือก repository เดียวกัน
4. **สำคัญ:** ตั้งค่า **Root Directory** เป็น `/frontend`

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Deploy Frontend                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Repository: your-username/week6-ntier-docker                              │
│                                                                             │
│   Branch: main                                                              │
│                                                                             │
│   ⚠️ Root Directory: /frontend               ← สำคัญ!                        │
│                                                                             │
│   [Deploy]                                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Step 4.3: ตั้งค่า Frontend เป็น Static Site

Railway ต้องรู้ว่านี่คือ Static Site ไม่ใช่ Node.js app

**วิธีที่ 1: สร้างไฟล์ `frontend/nixpacks.toml`**

```toml
[phases.setup]
nixPkgs = ["nodejs-18_x"]

[phases.install]
cmds = ["npm init -y && npm install serve"]

[phases.build]
cmds = ["echo 'Static site - no build needed'"]

[start]
cmd = "npx serve -s . -l $PORT"
```

**วิธีที่ 2: สร้าง `frontend/package.json`** (แนะนำ)

```json
{
  "name": "taskboard-frontend",
  "version": "1.0.0",
  "scripts": {
    "start": "npx serve -s . -l $PORT"
  },
  "dependencies": {
    "serve": "^14.2.0"
  }
}
```

Commit และ Push:
```bash
git add frontend/package.json
git commit -m "Add package.json for frontend static hosting"
git push origin main
```

### Step 4.4: Generate Frontend Domain

1. ไปที่ **Frontend Service** → **Settings**
2. Networking → **Generate Domain**
3. จดบันทึก URL เช่น: `https://taskboard-frontend-production-xxxx.up.railway.app`

### Step 4.5: ทดสอบ Frontend

1. เปิด Browser ไปที่ Frontend URL
2. ควรเห็น TaskBoard UI
3. ตรวจสอบว่า Tasks แสดงผลจาก Database

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🌐 Browser: https://taskboard-frontend-xxxx.up.railway.app                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                    📋 Task Board                                            │
│           N-Tier Architecture on Railway Cloud                              │
│                                                                             │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                           │
│   │    TODO     │ │ IN PROGRESS │ │    DONE     │                           │
│   ├─────────────┤ ├─────────────┤ ├─────────────┤                           │
│   │ Update Docs │ │ Test API    │ │ Setup Cloud │                           │
│   │ 🟡 MEDIUM   │ │ 🔴 HIGH     │ │ 🔴 HIGH     │                           │
│   └─────────────┘ └─────────────┘ └─────────────┘                           │
│                                                                             │
│   🎉 ถ้าเห็น Tasks = เชื่อมต่อ Cloud DB สำเร็จ!                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### ✅ Checkpoint 4
- [ ] แก้ไข app.js ใส่ API URL แล้ว
- [ ] Deploy Frontend Service สำเร็จ
- [ ] Generate Frontend Domain แล้ว
- [ ] เปิด Frontend URL แล้วเห็น TaskBoard
- [ ] Tasks แสดงผลจาก Database (3 items)

---

## Part 5: ทดสอบระบบและสำรวจ Cloud Features (30 นาที)

### 🎯 เป้าหมาย: ทดสอบ CRUD และเรียนรู้ Cloud Dashboard

### 5.1 ทดสอบ CRUD Operations

ทดสอบผ่าน Frontend UI:

| ทดสอบ | วิธีทำ | คาดหวัง |
|------|------|--------|
| **Create** | กรอกฟอร์ม Add Task แล้วกด Create | Task ใหม่ปรากฏในบอร์ด |
| **Read** | Refresh หน้า | Tasks ยังอยู่ (มาจาก DB จริง) |
| **Update** | คลิกปุ่ม Status บน Task | Status เปลี่ยน |
| **Delete** | คลิกปุ่ม Delete บน Task | Task หายไป |

### 5.2 สำรวจ Cloud Features

#### 5.2.1 ดู Real-time Logs

1. คลิกที่ **API Service**
2. ไปที่แท็บ **"Logs"**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Logs - API Service                                                  [Live] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  10:30:15 │ ✅ Connected to PostgreSQL database                             │
│  10:30:16 │ 🚀 Server running on port 3000                                  │
│  10:30:45 │ 📊 Query: 5ms | Rows: 3                                         │
│  10:30:45 │ GET /api/tasks 200 15ms                                         │
│  10:31:02 │ POST /api/tasks 201 25ms                                        │
│  10:31:15 │ 📊 Query: 3ms | Rows: 1                                         │
│                                                                             │
│  💡 Logs แสดงแบบ Real-time                                                  │
│     เหมือน `docker logs -f` แต่บน Cloud!                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 5.2.2 ดู Metrics

1. ไปที่แท็บ **"Metrics"**
2. ดู CPU, Memory, Network usage

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Metrics - API Service                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   CPU Usage          Memory Usage         Network I/O                       │
│   ┌──────────┐      ┌──────────┐         ┌──────────┐                       │
│   │   5%     │      │  120MB   │         │  In: 2KB │                       │
│   │  ╱╲      │      │ ────     │         │ Out: 5KB │                       │
│   │ ╱  ╲     │      │ /512MB   │         └──────────┘                       │
│   └──────────┘      └──────────┘                                            │
│                                                                             │
│   💡 ข้อมูลเหล่านี้ช่วยวางแผน:                                                    │
│   • ต้องเพิ่ม resources ไหม?                                                   │
│   • App มีปัญหา memory leak ไหม?                                              │
│   • Traffic pattern เป็นอย่างไร?                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 5.2.3 ดู Deployments History

1. ไปที่แท็บ **"Deployments"**
2. ดูประวัติการ Deploy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Deployments                                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   🟢 #3  │  Variable change         │  10 min ago  │  Active                │
│   🟢 #2  │  Code update (main)      │  30 min ago  │  Succeeded             │
│   🟢 #1  │  Initial deployment      │  1 hour ago  │  Succeeded             │
│                                                                             │
│   💡 ทุกการเปลี่ยนแปลงสร้าง Deployment ใหม่                                      │
│      สามารถ Rollback กลับ version เก่าได้!                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 ดู Project Overview

กลับมาที่หน้า Project จะเห็นภาพรวม 3 Services:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Project: taskboard-cloud                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐           │
│   │  🎨 Frontend    │   │  ⚙️ API         │   │  🐘 PostgreSQL  │           │
│   │  (Static)       │   │  (Node.js)      │   │  (Database)     │           │
│   │                 │   │                 │   │                 │           │
│   │  🟢 Active      │   │  🟢 Active      │   │  🟢 Active      │           │
│   │  Public URL ✓   │──▶│  Public URL ✓   │──▶│  Internal ✓     │           │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘           │
│                                                                             │
│   🎉 3-Tier Architecture บน Cloud!                                          │
│      เหมือน Week 6 Docker แต่อยู่บน Internet จริง                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### ✅ Checkpoint 5
- [ ] ทดสอบ Create Task สำเร็จ
- [ ] ทดสอบ Update Status สำเร็จ
- [ ] ทดสอบ Delete Task สำเร็จ
- [ ] ดู Logs แบบ Real-time แล้ว
- [ ] ดู Metrics แล้ว
- [ ] เห็นภาพรวม 3 Services

---

## Part 6: เชื่อมโยงกับ Concepts ที่เรียน (20 นาที)

### 🎯 เป้าหมาย: เชื่อมโยงประสบการณ์กับทฤษฎี

### 6.1 Cloud Service Models - Railway อยู่ตรงไหน?

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    Railway = PaaS (Platform as a Service)                  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│         IaaS                    PaaS                    SaaS               │
│        (EC2)                 (Railway) ⬅️              (Gmail)             │
│                                                                            │
│   ┌───────────┐           ┌───────────┐           ┌───────────┐            │
│   │Application│           │Application│           │███████████│            │
│   ├───────────┤           ├───────────┤           ├───────────┤            │
│   │   Data    │           │   Data    │           │███████████│            │
│   ├───────────┤           ├───────────┤           ├───────────┤            │
│   │  Runtime  │           │███████████│           │███████████│            │
│   ├───────────┤           ├───████████│           ├───────────┤            │
│   │    O/S    │           │███████████│           │███████████│            │
│   ├───────────┤           ├───────────┤           ├───────────┤            │
│   │  Server   │           │███████████│           │███████████│            │
│   └───────────┘           └───────────┘           └───────────┘            │
│                                                                            │
│   เราจัดการ:              เราจัดการ:              เราจัดการ:                  │
│   OS ขึ้นไป                App + Data              แค่ใช้งาน                   │
│                                                                            │
│   📝 วันนี้เราสัมผัส PaaS:                                                      │
│   • ไม่ต้องติดตั้ง Node.js → Railway จัดการ                                      │
│   • ไม่ต้องตั้งค่า Server → Railway จัดการ                                       │
│   • ไม่ต้องจัดการ SSL → Railway จัดการ                                         │
│   • เราแค่ Push Code → Deploy อัตโนมัติ!                                       │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 12-Factor App - Railway รองรับอะไรบ้าง?

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    12-Factor App บน Railway                                │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   Factor                  │ Railway Support      │ เห็นจากไหน?              │
│   ────────────────────────┼──────────────────────┼─────────────────────────│
│   1. Codebase             │ ✅ GitHub repo       │ Deploy จาก GitHub       │
│   2. Dependencies         │ ✅ package.json      │ Auto npm install        │
│   3. Config               │ ✅ Variables tab     │ DATABASE_URL, NODE_ENV  │
│   4. Backing Services     │ ✅ Add PostgreSQL    │ DB เป็น attached resource│
│   5. Build, Release, Run  │ ✅ Deployments       │ ประวัติ deployments       │
│   6. Stateless Processes  │ ✅ Containers        │ Scale ได้                │
│   7. Port Binding         │ ✅ Auto PORT         │ Railway จัดการ           │
│   8. Concurrency          │ ✅ Replicas          │ เพิ่ม instances ได้        │
│   9. Disposability        │ ✅ Fast deploy       │ Deploy ใหม่เร็ว           │
│   10. Dev/Prod Parity     │ ✅ Same env          │ ใช้ Docker-like          │
│   11. Logs                │ ✅ Logs tab          │ stdout → Dashboard      │
│   12. Admin Processes     │ ✅ Railway CLI       │ One-off commands        │
│                                                                            │
│   💡 PaaS ออกแบบมาให้รองรับ 12-Factor โดยธรรมชาติ!                            │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 6.3 เปรียบเทียบ: Week 6 (Docker) vs Week 7 (Railway)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Docker Local vs Railway Cloud                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ด้าน                  │  Week 6 (Docker)       │  Week 7 (Railway)         │
│   ─────────────────────┼────────────────────────┼───────────────────────────│
│   ที่ตั้ง                  │  เครื่องตัวเอง            │  Cloud (Global)           │
│   URL                  │  localhost             │  xxx.railway.app          │
│   SSL/HTTPS            │  Self-signed (⚠️)      │  Valid cert (✅)          │
│   Database             │  Docker container      │  Managed service          │
│   Backup               │  ต้องทำเอง              │  อัตโนมัติ                   │
│   Deploy               │  docker compose up     │  git push                 │
│   Scaling              │  Manual config         │  UI slider                │
│   Monitoring           │  ต้อง setup เอง         │  Built-in                 │
│   Cost                 │  ฟรี (ใช้เครื่องตัวเอง)     │  $5/เดือน                  │
│   Uptime               │  เปิดเครื่องเมื่อไหร่        │  24/7 (99.9%)             │
│   Access               │  Local network         │  ทุกที่ทั่วโลก                 │
│                                                                             │
│   📝 Docker = Development, Testing                                          │
│      Cloud = Production, Real Users                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📝 ใบงาน: Cloud Deployment Analysis

### คำชี้แจง
ตอบคำถามจากประสบการณ์ที่ทำ Lab เขียนลงในไฟล์ `CLOUD_DEPLOYMENT.md`

---

### ส่วนที่ 1: ข้อมูล Deployment (10 คะแนน)

```markdown
# Cloud Deployment Analysis
## ENGCE301 - Week 7 Lab

**ชื่อ-นามสกุล:** _______________
**รหัสนักศึกษา:** _______________

### 1.1 URLs ของระบบที่ Deploy

| Service | URL |
|---------|-----|
| Frontend | https://_________________________.railway.app |
| Backend API | https://_________________________.railway.app |
| Database | (Internal - ไม่มี public URL) |

### 1.2 Screenshot หลักฐาน (5 รูป)

1. [ ] Railway Dashboard แสดง 3 Services
2. [ ] Frontend ทำงานบน Browser
3. [ ] API Health check response
4. [ ] Logs แสดง requests
5. [ ] Metrics แสดง CPU/Memory
```

---

### ส่วนที่ 2: เปรียบเทียบ Docker vs Cloud (15 คะแนน)

```markdown
### 2.1 ความแตกต่างที่สังเกตเห็น (10 คะแนน)

| ด้าน | Docker (Week 6) | Railway (Week 7) |
|------|-----------------|------------------|
| เวลา Deploy | _______________ | _______________ |
| การตั้งค่า Network | _______________ | _______________ |
| การจัดการ ENV | _______________ | _______________ |
| การดู Logs | _______________ | _______________ |
| การ Scale | _______________ | _______________ |

### 2.2 ข้อดี/ข้อเสีย ของแต่ละแบบ (5 คะแนน)

**Docker Local:**
- ข้อดี: _______________
- ข้อเสีย: _______________

**Railway Cloud:**
- ข้อดี: _______________
- ข้อเสีย: _______________
```

---

### ส่วนที่ 3: Cloud Service Models (10 คะแนน)

```markdown
### 3.1 Railway เป็น Service Model แบบไหน?

[ ] IaaS   [x] PaaS   [ ] SaaS

เพราะ: ________________________________________________

### 3.2 ถ้าใช้ IaaS (เช่น AWS EC2) ต้องทำอะไรเพิ่มอีก? (ยกตัวอย่าง 4 ข้อ)

1. _______________
2. _______________
3. _______________
4. _______________
```

---

### ส่วนที่ 4: 12-Factor App Analysis (15 คะแนน)

```markdown
### 4.1 Factors ที่เห็นจาก Lab (10 คะแนน)

เลือก 5 Factors และอธิบายว่าเห็นจากไหนใน Railway:

| Factor | เห็นจากไหน? | ทำไมสำคัญ? |
|--------|------------|-----------|
| Factor 3: Config | Variables tab | _______________ |
| Factor ___: ___ | _______________ | _______________ |
| Factor ___: ___ | _______________ | _______________ |
| Factor ___: ___ | _______________ | _______________ |
| Factor ___: ___ | _______________ | _______________ |

### 4.2 ถ้าไม่ทำตาม 12-Factor จะมีปัญหาอะไร? (5 คะแนน)

ยกตัวอย่าง 2 ปัญหา:

**ปัญหา 1:** ถ้าไม่ทำตาม Factor ___ (_________)
- สิ่งที่จะเกิด: _______________

**ปัญหา 2:** ถ้าไม่ทำตาม Factor ___ (_________)
- สิ่งที่จะเกิด: _______________
```

---

### ส่วนที่ 5: Reflection (10 คะแนน)

```markdown
### 5.1 สิ่งที่เรียนรู้จาก Lab นี้

1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### 5.2 ความท้าทาย/ปัญหาที่พบ และวิธีแก้ไข

ปัญหา: _______________________________________________
วิธีแก้: _______________________________________________

### 5.3 จะเลือกใช้ Docker หรือ Cloud เมื่อไหร่?

- ใช้ Docker เมื่อ: _______________________________________________
- ใช้ Cloud (PaaS) เมื่อ: _______________________________________________
```

---

## 📤 การส่งงานและเกณฑ์การให้คะแนน

### สิ่งที่ต้องส่ง:

| รายการ | คะแนน |
|--------|-------|
| `CLOUD_DEPLOYMENT.md` (ตอบครบทุกส่วน) | 50 |
| Screenshots (5 รูป) | 10 |
| **รวม** | **60** |

### วิธีการส่ง:

```bash
# สร้าง folder และไฟล์
mkdir week7-cloud-lab
cd week7-cloud-lab

# สร้าง CLOUD_DEPLOYMENT.md และใส่คำตอบ
# สร้าง folder screenshots และใส่รูป

# Push ขึ้น GitHub
git init
git add .
git commit -m "Week 7: Cloud Deployment Lab"
git push
```

---

## 🧹 Cleanup - สำคัญมาก!

### ⚠️ ต้องลบ Project หลังทำ Lab เสร็จ!

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ⚠️ CLEANUP - อย่าลืม!                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   เหตุผล:                                                                    │
│   • 3 Services รันตลอด 24/7 = หมด $5 ใน ~3 วัน                                │
│   • ถ้าไม่ลบ Credits จะหมดก่อนสิ้นเดือน                                           │
│                                                                             │
│   วิธีลบ:                                                                     │
│   1. ไปที่ Project Settings (⚙️ icon)                                         │
│   2. Scroll ลงล่างสุด                                                         │
│   3. คลิก "Delete Project"                                                   │
│   4. พิมพ์ชื่อ Project เพื่อยืนยัน                                                  │
│   5. คลิก Delete                                                             │
│                                                                             │
│   ✅ หลังลบ:                                                                 │
│   • Credits หยุดถูกใช้ทันที                                                      │
│   • ยังเหลือ Credits สำหรับ Lab ครั้งหน้า                                         │
│                                                                             │
│   📸 อย่าลืม Screenshot ก่อนลบ!                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ แก้ปัญหาเบื้องต้น

### ปัญหา: API ไม่สามารถเชื่อมต่อ Database

```
สาเหตุ: DATABASE_URL ไม่ถูกต้อง
แก้ไข:
1. ตรวจสอบว่าใช้ Reference: ${{Postgres.DATABASE_URL}}
2. ตรวจสอบว่า PostgreSQL service รันอยู่
3. ลอง Redeploy API service
```

### ปัญหา: Frontend ไม่แสดง Tasks

```
สาเหตุ: API_BASE URL ผิด หรือ CORS
แก้ไข:
1. ตรวจสอบ app.js ว่าใส่ API URL ถูกต้อง
2. เปิด Browser Console (F12) ดู errors
3. ตรวจสอบว่า API service มี Public URL
```

### ปัญหา: Deploy ไม่สำเร็จ

```
สาเหตุ: Root Directory ผิด หรือ code มี error
แก้ไข:
1. ตรวจสอบ Root Directory (/api หรือ /frontend)
2. ดู Build Logs หา error
3. ตรวจสอบ package.json มีครบ
```

### ปัญหา: CORS Error

```
สาเหตุ: Backend ไม่อนุญาต Frontend origin
แก้ไข:
1. ตรวจสอบ CORS config ใน server.js
2. เพิ่ม railway.app ใน allowed origins
3. หรือใช้ cors({ origin: true }) สำหรับ Lab
```

---

## 🎉 ยินดีด้วย!

คุณได้สำเร็จ:

- ✅ Deploy **3-Tier Architecture** ขึ้น Cloud จริง
- ✅ ใช้งาน **PaaS (Railway)** และเข้าใจความแตกต่างจาก Docker
- ✅ ตั้งค่า **Environment Variables** และเชื่อมต่อ Services
- ✅ ใช้งาน **Cloud Dashboard** (Logs, Metrics, Deployments)
- ✅ เข้าใจ **12-Factor App** ผ่านประสบการณ์จริง
- ✅ เห็น **TaskBoard ทำงานบน Internet** จริง!

---

## 📚 อ่านเพิ่มเติม

- [Railway Documentation](https://docs.railway.app)
- [12-Factor App](https://12factor.net)
- [NIST Cloud Computing Definition](https://csrc.nist.gov/publications/detail/sp/800-145/final)

---

*ENGCE301 - Software Design and Development*  
*มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*
