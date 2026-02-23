# 📡 คู่มือปฏิบัติการ ENGSE207 - Term Project Week 7
## Event-Driven Architecture: RabbitMQ Pub/Sub + Microservices

**สัปดาห์:** 7 | **ระยะเวลา:** 3 ชั่วโมง | **ระดับความยาก:** ⭐⭐⭐⭐⭐

> **ต่อยอดจาก:** Week 6 (N-Tier + Redis + Load Balancing) → เพิ่ม Event-Driven Pattern + RabbitMQ + แยก Services

---

## 📋 สารบัญ

1. [วัตถุประสงค์การเรียนรู้](#-วัตถุประสงค์การเรียนรู้)
2. [ทฤษฎี: Event-Driven Architecture](#-ทฤษฎี-event-driven-architecture)
3. [ภาพรวมสถาปัตยกรรม](#-ภาพรวมสถาปัตยกรรม)
4. [Part 1: สร้างโครงสร้างโปรเจกต์ (15 นาที)](#part-1-สร้างโครงสร้างโปรเจกต์-15-นาที)
5. [Part 2: Shared Event Contracts (15 นาที)](#part-2-shared-event-contracts-15-นาที)
6. [Part 3: Task Service + Event Publisher (45 นาที)](#part-3-task-service--event-publisher-45-นาที)
7. [Part 4: Notification Service (30 นาที)](#part-4-notification-service-consumer-30-นาที)
8. [Part 5: Audit Service (20 นาที)](#part-5-audit-service-consumer-20-นาที)
9. [Part 6: API Gateway (15 นาที)](#part-6-api-gateway-15-นาที)
10. [Part 7: Docker Compose + RabbitMQ (20 นาที)](#part-7-docker-compose--rabbitmq-20-นาที)
11. [Part 8: ทดสอบ End-to-End (20 นาที)](#part-8-ทดสอบ-end-to-end-20-นาที)
12. [Part 9: สรุปและเปรียบเทียบ](#part-9-สรุปและเปรียบเทียบ)
13. [Challenge: ทำต่อเอง](#-challenge-ทำต่อเอง)
14. [การส่งงาน](#-การส่งงานทาง-git)

---

## 🎯 วัตถุประสงค์การเรียนรู้

เมื่อจบ Lab นี้ นักศึกษาจะสามารถ:

| ✅ | วัตถุประสงค์ | CLO |
|---|------------|-----|
| ☐ | อธิบายหลักการ Event-Driven Architecture และความแตกต่างจาก Synchronous (Request/Response) ได้ | CLO2 |
| ☐ | ตั้งค่า RabbitMQ เป็น Message Broker ใน Docker ได้ | CLO4, CLO6 |
| ☐ | Implement Pub/Sub Pattern — Publisher (Task Service) ส่ง Event ไปยัง Exchange ได้ | CLO6 |
| ☐ | Implement Consumer Services (Notification, Audit) ที่รับ Event จาก Queue ได้ | CLO6 |
| ☐ | ออกแบบ Event Contract/Schema ที่ชัดเจนสำหรับ services สื่อสารกันได้ | CLO2, CLO5 |
| ☐ | ทดสอบ Event Flow แบบ End-to-End และเข้าใจ Asynchronous Communication ได้ | CLO3, CLO7 |

---

## 📚 ทฤษฎี: Event-Driven Architecture

### Synchronous vs Asynchronous — ความแตกต่างที่สำคัญ

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ❌ Synchronous (Request/Response)     ✅ Asynchronous (Event-Driven)       │
│  ใช้ใน Week 3-6                         ใช้ใน Week 7                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Client ──► Task API ──► DB             Client ──► Task API ──► DB          │
│         ◄── response ◄──                         ◄── response (เร็ว!)        │
│                                                      │                      │
│  ถ้าต้องส่ง Email + Log:                                ▼ (ส่ง Event แบบ Async) │
│  Client ──► Task API ──► DB             Task API ──► RabbitMQ               │
│                       ──► Email (รอ!)                  │       │            │
│                       ──► Log   (รอ!)       ┌──────────┘       └────────┐   │
│         ◄── response (ช้ามาก!)               ▼                           ▼   │
│                                      Notification                   Audit   │
│  ⏱️ Total: 50+100+50 = 200ms          Service                    Service    │
│  🔗 Tight Coupling: ผูกกันแน่น           (ส่ง email)               (เขียน log)   │
│  💀 ถ้า Email ล่ม → ทุกอย่างล่ม                                                  │
│                                         ⏱️ Total: 50ms (Client ไม่ต้องรอ)     │
│                                         🔗 Loose Coupling: แยกกันทำงาน       │
│                                         💪 ถ้า Email ล่ม → Task ยังสร้างได้      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **เปรียบเทียบง่ายๆ:**
> - **Synchronous** = สั่งกาแฟแล้วยืนรอที่เคาน์เตอร์ ☕🧍
> - **Asynchronous** = สั่งกาแฟ → ได้บัตรคิว → ไปนั่งรอ → เรียกเมื่อเสร็จ ☕🪑📱

### RabbitMQ: Message Broker คืออะไร?

```
┌──────────────────────────────────────────────────────────────────────────┐
│                   RabbitMQ — Message Broker (ตัวกลางส่งข้อความ)             │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  คำสำคัญที่ต้องรู้:                                                            │
│                                                                          │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌───────────┐  │
│  │  Producer    │──►│  Exchange    │──►│    Queue     │──►│ Consumer  │  │
│  │  (ผู้ส่ง)       │   │  (ตัวกระจาย)  │   │  (คิวรอ)      │   │ (ผู้รับ)     │  │
│  └──────────────┘   └──────────────┘   └──────────────┘   └───────────┘  │
│                                                                          │
│  Producer  = Service ที่ส่ง Event (เช่น Task Service)                        │
│  Exchange  = ตัวกลางที่รับ Event แล้วกระจายไปยัง Queue ที่เกี่ยวข้อง                │
│  Queue     = คิวเก็บ Event รอให้ Consumer มาอ่าน                             │
│  Consumer  = Service ที่รับ Event มาทำงาน (เช่น Notification, Audit)         │
│                                                                          │
│  Exchange Types:                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │  fanout   = ส่งไปทุก Queue (Broadcast) ← เราใช้แบบนี้!                   │ │
│  │  direct   = ส่งไป Queue ที่ routing key ตรงกัน                          │ │
│  │  topic    = ส่งไป Queue ที่ routing key match pattern                  │ │
│  │                                                                     │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  เปรียบเทียบ:                                                              │
│  Exchange = ไปรษณีย์ (รับจดหมายแล้วกระจายไปตามที่อยู่)                           │
│  Queue    = ตู้จดหมาย (เก็บจดหมายรอเจ้าของบ้านมาเปิดอ่าน)                       │
│  fanout   = ใบปลิว (ส่งไปทุกบ้าน!)                                           │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Pub/Sub Pattern ใน Lab นี้

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   TaskBoard Event Flow                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  นักศึกษาสร้าง Task ใหม่:                                                       │
│                                                                             │
│  ① POST /api/tasks { title: "ทำ Lab Week 7" }                              │
│       │                                                                     │
│       ▼                                                                     │
│  ② Task Service:                                                           │
│     • INSERT INTO tasks → สร้างสำเร็จ (id: 8)                                 │
│     • Publish Event → RabbitMQ                                              │
│       │                                                                     │
│       ▼                                                                     │
│  ③ RabbitMQ Exchange (task.events):                                        │
│     Event: {                                                                │
│       type: "TASK_CREATED",                                                 │
│       data: { id: 8, title: "ทำ Lab Week 7", ... },                         │
│       timestamp: "2025-02-22T10:30:00Z"                                     │
│     }                                                                       │
│       │                                                                     │
│       ├────────────────────────────────┐                                    │
│       ▼                                ▼                                    │
│  ④ notification_queue              ⑤ audit_queue                           │
│      │                                 │                                    │
│      ▼                                 ▼                                    │
│  Notification Service:             Audit Service:                           │
│  "📧 [TASK_CREATED] ทำ Lab Week 7"  "📝 AUDIT: TASK_CREATED by system       │
│                                      at 2025-02-22T10:30:00Z"               │
│                                                                             │
│  ⏱️ Client ได้ response ตั้งแต่ขั้นตอน ② (ไม่ต้องรอ ④ ⑤)                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ ภาพรวมสถาปัตยกรรม

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Term Project Week 7: Event-Driven Architecture                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                              Browser (Client)                               │
│                                   │                                         │
│                              Port 3000                                      │
│                                   ▼                                         │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  API Gateway (Express.js :3000)                                       │  │
│  │  • Route /api/tasks/* → Task Service                                  │  │
│  │  • Route /api/notifications/* → Notification Service                  │  │
│  │  • Route /api/audit/* → Audit Service                                 │  │
│  └──────┬──────────────────────┬──────────────────────┬──────────────────┘  │
│         │ HTTP                 │ HTTP                 │ HTTP                │
│         ▼                      ▼                      ▼                     │
│  ┌───────────────┐   ┌──────────────────┐   ┌────────────────┐              │
│  │ Task Service  │   │ Notification Svc │   │  Audit Service │              │
│  │ (Express:3001)│   │ (Express:3002)   │   │ (Express:3003) │              │
│  │               │   │                  │   │                │              │
│  │ ┌──────────┐  │   │ ┌─────────────┐  │   │ ┌────────────┐ │              │
│  │ │CRUD Tasks│  │   │ │Read notifs  │  │   │ │Read audit  │ │              │
│  │ │Publish   │  │   │ │Consume      │  │   │ │Consume     │ │              │
│  │ │Events  ──┼──┼──►│ │Events       │  │   │ │Events      │ │              │
│  │ └──────────┘  │   │ └─────────────┘  │   │ └────────────┘ │              │
│  └───────┬───────┘   └────────┬─────────┘   └───────┬────────┘              │
│          │                    │                     │                       │
│          │ SQL                │ Subscribe           │ Subscribe             │
│          ▼                    ▼                     ▼                       │
│  ┌──────────────┐     ┌──────────────────────────────────────────────────┐  │
│  │  PostgreSQL  │     │              RabbitMQ (Message Broker)           │  │
│  │  (tasks DB)  │     │                                                  │  │
│  │              │     │  Exchange: task.events (fanout)                  │  │
│  └──────────────┘     │        │                    │                    │  │
│                       │        ▼                    ▼                    │  │
│                       │  notification_queue    audit_queue               │  │
│                       │                                                  │  │
│                       │  Management UI: http://localhost:15672           │  │
│                       └──────────────────────────────────────────────────┘  │
│                                                                             │
│  Docker Network: taskboard-events                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Event Flow Summary

```
┌────────────────────────────────────────────────────────────────────┐
│  Events ที่ Task Service Publish                                     │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Action          Event Type        Consumers                       │
│  ───────         ──────────        ─────────                       │
│  POST /tasks     TASK_CREATED   →  Notification ✅  Audit ✅       │
│  PUT /tasks/:id  TASK_UPDATED   →  Notification ✅  Audit ✅       │
│  PUT (→DONE)     TASK_COMPLETED →  Notification ✅  Audit ✅       │
│  DELETE /tasks   TASK_DELETED   →  Notification ✅  Audit ✅       │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Part 1: สร้างโครงสร้างโปรเจกต์ (15 นาที)

### 1.1 สร้างโฟลเดอร์

```bash
# สร้างโฟลเดอร์หลัก
mkdir -p ~/term-project/week7-event-driven
cd ~/term-project/week7-event-driven

# สร้างโครงสร้าง Services
mkdir -p api-gateway/src
mkdir -p task-service/src/{config,controllers,services,repositories,models,routes,events}
mkdir -p notification-service/src/{config,events}
mkdir -p audit-service/src/{config,events}
mkdir -p shared/events
mkdir -p database
mkdir -p docs

echo "✅ โครงสร้างพร้อม!"
find . -type d | sort
```

**โครงสร้างที่คาดหวัง:**

```
week7-event-driven/
├── api-gateway/            ← Entry point (รับ request จาก Client)
│   └── src/
├── task-service/           ← CRUD + Publish Events
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── models/
│       ├── routes/
│       └── events/         ← Publisher logic
├── notification-service/   ← Consumer #1 (รับ Event → แจ้งเตือน)
│   └── src/
├── audit-service/          ← Consumer #2 (รับ Event → บันทึก log)
│   └── src/
├── shared/                 ← Event contracts (ใช้ร่วมกัน)
│   └── events/
├── database/               ← SQL init scripts
├── docs/                   ← Diagrams, screenshots
├── docker-compose.yml
└── .env
```

### 1.2 สร้างไฟล์ .gitignore และ .env

```bash
cat > .gitignore << 'EOF'
node_modules/
.env
*.log
.DS_Store
.vscode/
EOF
```

```bash
cat > .env << 'EOF'
# === Database ===
POSTGRES_DB=taskboard_db
POSTGRES_USER=taskboard
POSTGRES_PASSWORD=taskboard123

# === RabbitMQ ===
RABBITMQ_DEFAULT_USER=guest
RABBITMQ_DEFAULT_PASS=guest
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672

# === Services ===
TASK_SERVICE_URL=http://task-service:3001
NOTIFICATION_SERVICE_URL=http://notification-service:3002
AUDIT_SERVICE_URL=http://audit-service:3003
EOF
```

---

## Part 2: Shared Event Contracts (15 นาที)

> **📌 ทำไมต้องมี Event Contract?**
> เมื่อ Services สื่อสารผ่าน Event — ทุก Service ต้อง "ตกลงกัน" ว่า Event หน้าตาเป็นยังไง
> เหมือนกับการตกลงว่าจดหมายต้องมี: ผู้ส่ง, วันที่, หัวเรื่อง, เนื้อหา

### 2.1 Event Types & Definitions

```bash
cat > shared/events/eventTypes.js << 'EOF'
// shared/events/eventTypes.js
// === Event Contract ===
// ทุก Service ใช้ไฟล์นี้เป็น "สัญญา" ว่า Event หน้าตาเป็นยังไง

const EVENT_TYPES = {
    TASK_CREATED: 'TASK_CREATED',
    TASK_UPDATED: 'TASK_UPDATED',
    TASK_COMPLETED: 'TASK_COMPLETED',
    TASK_DELETED: 'TASK_DELETED'
};

// Exchange name สำหรับ RabbitMQ
const EXCHANGE_NAME = 'task.events';
const EXCHANGE_TYPE = 'fanout';   // ส่งไปทุก queue ที่ bind

// Queue names
const QUEUES = {
    NOTIFICATION: 'notification_queue',
    AUDIT: 'audit_queue'
};

// สร้าง Event object มาตรฐาน
function createEvent(type, data, metadata = {}) {
    return {
        id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: type,
        data: data,
        metadata: {
            timestamp: new Date().toISOString(),
            source: metadata.source || 'task-service',
            version: '1.0',
            ...metadata
        }
    };
}

module.exports = { EVENT_TYPES, EXCHANGE_NAME, EXCHANGE_TYPE, QUEUES, createEvent };
EOF
```

### 2.2 RabbitMQ Connection Helper

```bash
cat > shared/events/rabbitmq.js << 'EOF'
// shared/events/rabbitmq.js
// RabbitMQ Connection + Channel Helper
// ใช้ร่วมกันทั้ง Publisher และ Consumer

const amqplib = require('amqplib');
const { EXCHANGE_NAME, EXCHANGE_TYPE } = require('./eventTypes');

let connection = null;
let channel = null;

// เชื่อมต่อ RabbitMQ (พร้อม retry)
async function connect(retries = 10, delay = 3000) {
    const url = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';

    for (let i = 1; i <= retries; i++) {
        try {
            console.log(`🐰 Connecting to RabbitMQ... (attempt ${i}/${retries})`);
            connection = await amqplib.connect(url);
            channel = await connection.createChannel();

            // สร้าง Exchange (ถ้ายังไม่มี)
            await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, {
                durable: true   // Exchange ยังอยู่แม้ RabbitMQ restart
            });

            console.log(`✅ Connected to RabbitMQ | Exchange: ${EXCHANGE_NAME} (${EXCHANGE_TYPE})`);

            // Handle connection close
            connection.on('close', () => {
                console.log('⚠️  RabbitMQ connection closed');
                channel = null;
                connection = null;
            });

            return channel;
        } catch (error) {
            console.error(`❌ RabbitMQ attempt ${i} failed: ${error.message}`);
            if (i < retries) {
                console.log(`⏳ Retrying in ${delay / 1000}s...`);
                await new Promise(r => setTimeout(r, delay));
            }
        }
    }
    throw new Error('Failed to connect to RabbitMQ after all retries');
}

function getChannel() {
    return channel;
}

async function close() {
    if (channel) await channel.close();
    if (connection) await connection.close();
}

module.exports = { connect, getChannel, close };
EOF
```

### ✅ Checkpoint 2: Event Contract พร้อม!

---

## Part 3: Task Service + Event Publisher (45 นาที)

> **📌 Task Service = หัวใจของระบบ**
> ทำ CRUD เหมือนเดิม + Publish Events ทุกครั้งที่ข้อมูลเปลี่ยน

### 3.1 package.json

```bash
cat > task-service/package.json << 'EOF'
{
  "name": "task-service",
  "version": "1.0.0",
  "description": "Task Service - CRUD + Event Publisher",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "amqplib": "^0.10.3",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "morgan": "^1.10.0",
    "pg": "^8.11.3"
  }
}
EOF
```

### 3.2 Dockerfile

```bash
cat > task-service/Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
# Copy shared events (จะ mount ผ่าน Docker volume)
EXPOSE 3001
HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1
CMD ["node", "server.js"]
EOF
```

### 3.3 Database Config

```bash
cat > task-service/src/config/database.js << 'EOF'
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.POSTGRES_DB || 'taskboard_db',
    user: process.env.POSTGRES_USER || 'taskboard',
    password: process.env.POSTGRES_PASSWORD || 'taskboard123',
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => console.log('✅ Task Service → PostgreSQL connected'));
pool.on('error', (err) => console.error('❌ DB error:', err.message));

const query = async (text, params) => {
    const start = Date.now();
    const result = await pool.query(text, params);
    console.log(`📊 DB: ${Date.now() - start}ms | ${result.rowCount} rows`);
    return result;
};

module.exports = { pool, query };
EOF
```

### 3.4 Event Publisher

```bash
cat > task-service/src/events/publisher.js << 'EOF'
// src/events/publisher.js
// Publish events to RabbitMQ Exchange
//
// เมื่อ Task ถูกสร้าง/แก้ไข/ลบ → Publish Event ไปที่ Exchange
// Exchange จะ fanout (กระจาย) ไปทุก Queue ที่ bind อยู่

const { getChannel } = require('../../shared/events/rabbitmq');
const { EXCHANGE_NAME, createEvent } = require('../../shared/events/eventTypes');

async function publishEvent(eventType, data) {
    const channel = getChannel();
    if (!channel) {
        console.error('⚠️  Cannot publish event: RabbitMQ not connected');
        return false;
    }

    try {
        const event = createEvent(eventType, data, { source: 'task-service' });
        const message = Buffer.from(JSON.stringify(event));

        channel.publish(EXCHANGE_NAME, '', message, {
            persistent: true,        // Event ยังอยู่แม้ RabbitMQ restart
            contentType: 'application/json'
        });

        console.log(`📤 EVENT PUBLISHED: ${eventType} | ID: ${event.id}`);
        console.log(`   Data: ${JSON.stringify(data).slice(0, 100)}...`);

        return true;
    } catch (error) {
        console.error(`❌ Publish failed: ${error.message}`);
        return false;
    }
}

module.exports = { publishEvent };
EOF
```

### 3.5 Task Model

```bash
cat > task-service/src/models/Task.js << 'EOF'
class Task {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description || '';
        this.status = data.status || 'TODO';
        this.priority = data.priority || 'MEDIUM';
        this.createdAt = data.created_at || data.createdAt;
        this.updatedAt = data.updated_at || data.updatedAt;
    }
    static STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'];
    static PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];
    static validate(data) {
        const errors = [];
        if (!data.title || data.title.trim().length === 0) errors.push('Title is required');
        if (data.title && data.title.length > 200) errors.push('Title max 200 chars');
        if (data.status && !Task.STATUSES.includes(data.status)) errors.push(`Invalid status`);
        if (data.priority && !Task.PRIORITIES.includes(data.priority)) errors.push(`Invalid priority`);
        return { isValid: errors.length === 0, errors };
    }
    toJSON() {
        return { id: this.id, title: this.title, description: this.description, status: this.status, priority: this.priority, createdAt: this.createdAt, updatedAt: this.updatedAt };
    }
}
module.exports = Task;
EOF
```

### 3.6 Repository

```bash
cat > task-service/src/repositories/taskRepository.js << 'EOF'
const { query } = require('../config/database');
const Task = require('../models/Task');

class TaskRepository {
    async findAll() {
        const sql = `SELECT * FROM tasks ORDER BY CASE priority WHEN 'HIGH' THEN 1 WHEN 'MEDIUM' THEN 2 WHEN 'LOW' THEN 3 END, created_at DESC`;
        const result = await query(sql);
        return result.rows.map(row => new Task(row));
    }
    async findById(id) {
        const result = await query('SELECT * FROM tasks WHERE id = $1', [id]);
        return result.rows.length > 0 ? new Task(result.rows[0]) : null;
    }
    async create(data) {
        const sql = `INSERT INTO tasks (title, description, status, priority) VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await query(sql, [data.title, data.description || '', data.status || 'TODO', data.priority || 'MEDIUM']);
        return new Task(result.rows[0]);
    }
    async update(id, data) {
        const sql = `UPDATE tasks SET title=COALESCE($1,title), description=COALESCE($2,description), status=COALESCE($3,status), priority=COALESCE($4,priority), updated_at=CURRENT_TIMESTAMP WHERE id=$5 RETURNING *`;
        const result = await query(sql, [data.title, data.description, data.status, data.priority, id]);
        return result.rows.length > 0 ? new Task(result.rows[0]) : null;
    }
    async delete(id) {
        const result = await query('DELETE FROM tasks WHERE id = $1 RETURNING id', [id]);
        return result.rowCount > 0;
    }
    async countByStatus() {
        const result = await query('SELECT status, COUNT(*)::int as count FROM tasks GROUP BY status');
        return result.rows.reduce((acc, r) => { acc[r.status] = r.count; return acc; }, { TODO: 0, IN_PROGRESS: 0, DONE: 0 });
    }
}
module.exports = new TaskRepository();
EOF
```

### 3.7 Service Layer + Event Publishing — ⭐ หัวใจสำคัญ!

```bash
cat > task-service/src/services/taskService.js << 'EOF'
// src/services/taskService.js
// Business Logic + Publish Events เมื่อ data เปลี่ยน!

const taskRepository = require('../repositories/taskRepository');
const Task = require('../models/Task');
const { publishEvent } = require('../events/publisher');
const { EVENT_TYPES } = require('../../shared/events/eventTypes');

class TaskService {

    async getAllTasks() {
        const tasks = await taskRepository.findAll();
        return tasks.map(t => t.toJSON());
    }

    async getTaskById(id) {
        const task = await taskRepository.findById(id);
        if (!task) { const e = new Error('Task not found'); e.statusCode = 404; throw e; }
        return task.toJSON();
    }

    // ⭐ สร้าง Task + Publish TASK_CREATED Event
    async createTask(data) {
        const validation = Task.validate(data);
        if (!validation.isValid) {
            const e = new Error(validation.errors.join(', ')); e.statusCode = 400; throw e;
        }

        const task = await taskRepository.create(data);
        const taskJson = task.toJSON();

        // 📤 Publish Event!
        await publishEvent(EVENT_TYPES.TASK_CREATED, taskJson);

        return taskJson;
    }

    // ⭐ อัพเดท Task + Publish TASK_UPDATED / TASK_COMPLETED Event
    async updateTask(id, data) {
        const existing = await taskRepository.findById(id);
        if (!existing) { const e = new Error('Task not found'); e.statusCode = 404; throw e; }

        const task = await taskRepository.update(id, data);
        const taskJson = task.toJSON();

        // ตรวจว่าเปลี่ยน status เป็น DONE หรือไม่
        if (data.status === 'DONE' && existing.status !== 'DONE') {
            // 📤 Publish TASK_COMPLETED Event (พิเศษ!)
            await publishEvent(EVENT_TYPES.TASK_COMPLETED, {
                ...taskJson,
                previousStatus: existing.status
            });
        } else {
            // 📤 Publish TASK_UPDATED Event
            await publishEvent(EVENT_TYPES.TASK_UPDATED, {
                ...taskJson,
                changes: data
            });
        }

        return taskJson;
    }

    // ⭐ ลบ Task + Publish TASK_DELETED Event
    async deleteTask(id) {
        const existing = await taskRepository.findById(id);
        if (!existing) { const e = new Error('Task not found'); e.statusCode = 404; throw e; }

        if (existing.status === 'IN_PROGRESS') {
            const e = new Error('Cannot delete in-progress task'); e.statusCode = 400; throw e;
        }

        await taskRepository.delete(id);

        // 📤 Publish TASK_DELETED Event
        await publishEvent(EVENT_TYPES.TASK_DELETED, existing.toJSON());

        return true;
    }

    async getStatistics() {
        const counts = await taskRepository.countByStatus();
        const total = counts.TODO + counts.IN_PROGRESS + counts.DONE;
        return { total, byStatus: counts, completionRate: total > 0 ? Math.round((counts.DONE / total) * 100) : 0 };
    }
}

module.exports = new TaskService();
EOF
```

### 3.8 Controller

```bash
cat > task-service/src/controllers/taskController.js << 'EOF'
const taskService = require('../services/taskService');

class TaskController {
    async getAll(req, res, next) {
        try { const tasks = await taskService.getAllTasks(); res.json({ success: true, data: tasks, count: tasks.length }); }
        catch (e) { next(e); }
    }
    async getById(req, res, next) {
        try { const task = await taskService.getTaskById(parseInt(req.params.id)); res.json({ success: true, data: task }); }
        catch (e) { next(e); }
    }
    async create(req, res, next) {
        try { const task = await taskService.createTask(req.body); res.status(201).json({ success: true, data: task }); }
        catch (e) { next(e); }
    }
    async update(req, res, next) {
        try { const task = await taskService.updateTask(parseInt(req.params.id), req.body); res.json({ success: true, data: task }); }
        catch (e) { next(e); }
    }
    async delete(req, res, next) {
        try { await taskService.deleteTask(parseInt(req.params.id)); res.json({ success: true, message: 'Deleted' }); }
        catch (e) { next(e); }
    }
    async stats(req, res, next) {
        try { const s = await taskService.getStatistics(); res.json({ success: true, data: s }); }
        catch (e) { next(e); }
    }
}
module.exports = new TaskController();
EOF
```

### 3.9 Routes

```bash
cat > task-service/src/routes/taskRoutes.js << 'EOF'
const express = require('express');
const router = express.Router();
const c = require('../controllers/taskController');
router.get('/tasks', (req, res, next) => c.getAll(req, res, next));
router.get('/tasks/stats', (req, res, next) => c.stats(req, res, next));
router.get('/tasks/:id', (req, res, next) => c.getById(req, res, next));
router.post('/tasks', (req, res, next) => c.create(req, res, next));
router.put('/tasks/:id', (req, res, next) => c.update(req, res, next));
router.delete('/tasks/:id', (req, res, next) => c.delete(req, res, next));
module.exports = router;
EOF
```

### 3.10 Task Service Entry Point

```bash
cat > task-service/server.js << 'EOF'
// task-service/server.js
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const taskRoutes = require('./src/routes/taskRoutes');
const { connect: connectRabbitMQ } = require('./shared/events/rabbitmq');

const app = express();
const PORT = process.env.TASK_SERVICE_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('short'));

// Health check
app.get('/health', (req, res) => {
    res.json({ service: 'task-service', status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', taskRoutes);

// Error handler
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(status).json({ success: false, error: err.message });
});

// Start
async function start() {
    try {
        await connectRabbitMQ();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`\n🚀 Task Service running on port ${PORT}`);
            console.log(`📤 Event Publisher ready\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start Task Service:', error.message);
        process.exit(1);
    }
}
start();
EOF
```

### ✅ Checkpoint 3: Task Service + Publisher พร้อม!

---

## Part 4: Notification Service (Consumer) (30 นาที)

> **📌 Notification Service รับ Events จาก RabbitMQ แล้ว "แจ้งเตือน"**
> ในตัวอย่างนี้จะ log ข้อความแจ้งเตือน (จำลองการส่ง email/push notification)
> และเก็บ notifications ไว้ให้ query ได้ผ่าน API

### 4.1 package.json

```bash
cat > notification-service/package.json << 'EOF'
{
  "name": "notification-service",
  "version": "1.0.0",
  "description": "Notification Service - Event Consumer",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "amqplib": "^0.10.3",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "morgan": "^1.10.0"
  }
}
EOF
```

### 4.2 Dockerfile

```bash
cat > notification-service/Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3002
HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3002/health || exit 1
CMD ["node", "server.js"]
EOF
```

### 4.3 Event Consumer

```bash
cat > notification-service/src/events/consumer.js << 'EOF'
// notification-service/src/events/consumer.js
// Subscribe to task.events exchange → notification_queue
//
// เมื่อมี Event เข้ามา → สร้าง Notification (จำลองส่ง email)

const { getChannel } = require('../../shared/events/rabbitmq');
const { EXCHANGE_NAME, QUEUES, EVENT_TYPES } = require('../../shared/events/eventTypes');

// In-memory notification store (จำลอง — production จะเก็บใน DB)
const notifications = [];

// Template สำหรับ Notification แต่ละ Event Type
const TEMPLATES = {
    [EVENT_TYPES.TASK_CREATED]: (data) => ({
        icon: '📝',
        title: 'Task Created',
        message: `New task "${data.title}" has been created with ${data.priority} priority`
    }),
    [EVENT_TYPES.TASK_UPDATED]: (data) => ({
        icon: '✏️',
        title: 'Task Updated',
        message: `Task "${data.title}" has been updated`
    }),
    [EVENT_TYPES.TASK_COMPLETED]: (data) => ({
        icon: '🎉',
        title: 'Task Completed!',
        message: `Task "${data.title}" has been completed! (was: ${data.previousStatus})`
    }),
    [EVENT_TYPES.TASK_DELETED]: (data) => ({
        icon: '🗑️',
        title: 'Task Deleted',
        message: `Task "${data.title}" has been deleted`
    })
};

async function startConsumer() {
    const channel = getChannel();
    if (!channel) throw new Error('RabbitMQ channel not available');

    // สร้าง Queue (ถ้ายังไม่มี)
    await channel.assertQueue(QUEUES.NOTIFICATION, { durable: true });

    // Bind Queue กับ Exchange
    await channel.bindQueue(QUEUES.NOTIFICATION, EXCHANGE_NAME, '');

    console.log(`📥 Notification Service: Listening on queue "${QUEUES.NOTIFICATION}"`);

    // Consume messages
    channel.consume(QUEUES.NOTIFICATION, (msg) => {
        if (!msg) return;

        try {
            const event = JSON.parse(msg.content.toString());
            console.log(`\n📨 EVENT RECEIVED: ${event.type}`);

            // สร้าง Notification จาก Template
            const template = TEMPLATES[event.type];
            if (template) {
                const notif = {
                    id: notifications.length + 1,
                    eventId: event.id,
                    ...template(event.data),
                    eventType: event.type,
                    timestamp: event.metadata.timestamp,
                    read: false
                };

                notifications.push(notif);
                console.log(`${notif.icon} NOTIFICATION: ${notif.message}`);
                console.log(`   Total notifications: ${notifications.length}`);
            }

            // Acknowledge message (บอก RabbitMQ ว่าประมวลผลสำเร็จ)
            channel.ack(msg);

        } catch (error) {
            console.error('❌ Failed to process event:', error.message);
            // Reject and don't requeue (ป้องกัน infinite loop)
            channel.nack(msg, false, false);
        }
    });
}

function getNotifications() {
    return [...notifications].reverse();  // ใหม่สุดก่อน
}

function getUnreadCount() {
    return notifications.filter(n => !n.read).length;
}

module.exports = { startConsumer, getNotifications, getUnreadCount };
EOF
```

### 4.4 Notification Service Entry Point

```bash
cat > notification-service/server.js << 'EOF'
// notification-service/server.js
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect: connectRabbitMQ } = require('./shared/events/rabbitmq');
const { startConsumer, getNotifications, getUnreadCount } = require('./src/events/consumer');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(morgan('short'));

// Health check
app.get('/health', (req, res) => {
    res.json({ service: 'notification-service', status: 'ok', timestamp: new Date().toISOString() });
});

// GET all notifications
app.get('/api/notifications', (req, res) => {
    const notifications = getNotifications();
    res.json({
        success: true,
        data: notifications,
        count: notifications.length,
        unread: getUnreadCount()
    });
});

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({ success: false, error: err.message });
});

// Start
async function start() {
    try {
        await connectRabbitMQ();
        await startConsumer();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`\n🔔 Notification Service running on port ${PORT}`);
            console.log(`📥 Consuming events from RabbitMQ\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start:', error.message);
        process.exit(1);
    }
}
start();
EOF
```

### ✅ Checkpoint 4: Notification Service พร้อม!

---

## Part 5: Audit Service (Consumer) (20 นาที)

> **📌 Audit Service = บันทึกทุก Event เป็น Audit Trail**
> ใช้สำหรับ Security, Compliance, Debugging

### 5.1 package.json

```bash
cat > audit-service/package.json << 'EOF'
{
  "name": "audit-service",
  "version": "1.0.0",
  "description": "Audit Service - Event Consumer for Audit Trail",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "amqplib": "^0.10.3",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "morgan": "^1.10.0"
  }
}
EOF
```

### 5.2 Dockerfile

```bash
cat > audit-service/Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3003
HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3003/health || exit 1
CMD ["node", "server.js"]
EOF
```

### 5.3 Audit Consumer

```bash
cat > audit-service/src/events/consumer.js << 'EOF'
// audit-service/src/events/consumer.js
// Subscribe to task.events → audit_queue
// บันทึกทุก Event เป็น Audit Log

const { getChannel } = require('../../shared/events/rabbitmq');
const { EXCHANGE_NAME, QUEUES } = require('../../shared/events/eventTypes');

// In-memory audit log (production จะเก็บใน DB/Elasticsearch)
const auditLogs = [];

async function startConsumer() {
    const channel = getChannel();
    if (!channel) throw new Error('RabbitMQ channel not available');

    await channel.assertQueue(QUEUES.AUDIT, { durable: true });
    await channel.bindQueue(QUEUES.AUDIT, EXCHANGE_NAME, '');

    console.log(`📥 Audit Service: Listening on queue "${QUEUES.AUDIT}"`);

    channel.consume(QUEUES.AUDIT, (msg) => {
        if (!msg) return;
        try {
            const event = JSON.parse(msg.content.toString());

            const auditEntry = {
                id: auditLogs.length + 1,
                eventId: event.id,
                eventType: event.type,
                entityType: 'Task',
                entityId: event.data.id,
                action: event.type.replace('TASK_', '').toLowerCase(),
                data: event.data,
                source: event.metadata.source,
                timestamp: event.metadata.timestamp,
                processedAt: new Date().toISOString()
            };

            auditLogs.push(auditEntry);

            console.log(`📝 AUDIT LOG #${auditEntry.id}: ${event.type} | Task #${event.data.id} "${event.data.title}" | ${event.metadata.timestamp}`);

            channel.ack(msg);
        } catch (error) {
            console.error('❌ Audit processing failed:', error.message);
            channel.nack(msg, false, false);
        }
    });
}

function getAuditLogs(filters = {}) {
    let logs = [...auditLogs].reverse();
    if (filters.eventType) logs = logs.filter(l => l.eventType === filters.eventType);
    if (filters.entityId) logs = logs.filter(l => l.entityId === parseInt(filters.entityId));
    return logs;
}

module.exports = { startConsumer, getAuditLogs };
EOF
```

### 5.4 Audit Service Entry Point

```bash
cat > audit-service/server.js << 'EOF'
require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect: connectRabbitMQ } = require('./shared/events/rabbitmq');
const { startConsumer, getAuditLogs } = require('./src/events/consumer');

const app = express();
const PORT = 3003;

app.use(cors());
app.use(express.json());
app.use(morgan('short'));

app.get('/health', (req, res) => {
    res.json({ service: 'audit-service', status: 'ok', timestamp: new Date().toISOString() });
});

// GET audit logs (with optional filters)
app.get('/api/audit', (req, res) => {
    const logs = getAuditLogs({
        eventType: req.query.eventType,
        entityId: req.query.entityId
    });
    res.json({ success: true, data: logs, count: logs.length });
});

app.use((err, req, res, next) => {
    res.status(500).json({ success: false, error: err.message });
});

async function start() {
    try {
        await connectRabbitMQ();
        await startConsumer();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`\n📋 Audit Service running on port ${PORT}`);
            console.log(`📥 Consuming events from RabbitMQ\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start:', error.message);
        process.exit(1);
    }
}
start();
EOF
```

### ✅ Checkpoint 5: Audit Service พร้อม!

---

## Part 6: API Gateway (15 นาที)

> **📌 API Gateway = จุดเข้าเดียว (Single Entry Point)**
> Client ส่ง request มาที่ Gateway → Gateway route ไปยัง Service ที่ถูกต้อง

### 6.1 package.json

```bash
cat > api-gateway/package.json << 'EOF'
{
  "name": "api-gateway",
  "version": "1.0.0",
  "description": "API Gateway - Routes requests to services",
  "main": "server.js",
  "scripts": { "start": "node server.js" },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "http-proxy-middleware": "^2.0.6",
    "morgan": "^1.10.0"
  }
}
EOF
```

### 6.2 Dockerfile

```bash
cat > api-gateway/Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
EOF
```

### 6.3 Gateway Server

```bash
cat > api-gateway/server.js << 'EOF'
// api-gateway/server.js
// Single entry point — routes requests to correct service
//
// /api/tasks/*          → task-service:3001
// /api/notifications/*  → notification-service:3002
// /api/audit/*          → audit-service:3003

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('short'));

// Serve frontend static files
app.use(express.static('public'));

// ===== Route Configuration =====

// /api/tasks/* → Task Service
app.use('/api/tasks', createProxyMiddleware({
    target: process.env.TASK_SERVICE_URL || 'http://task-service:3001',
    changeOrigin: true,
    pathRewrite: { '^/api/tasks': '/api/tasks' }
}));

// /api/notifications/* → Notification Service
app.use('/api/notifications', createProxyMiddleware({
    target: process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3002',
    changeOrigin: true,
    pathRewrite: { '^/api/notifications': '/api/notifications' }
}));

// /api/audit/* → Audit Service
app.use('/api/audit', createProxyMiddleware({
    target: process.env.AUDIT_SERVICE_URL || 'http://audit-service:3003',
    changeOrigin: true,
    pathRewrite: { '^/api/audit': '/api/audit' }
}));

// Gateway health — aggregate all services
app.get('/api/health', async (req, res) => {
    const services = {};
    const urls = {
        'task-service': 'http://task-service:3001/health',
        'notification-service': 'http://notification-service:3002/health',
        'audit-service': 'http://audit-service:3003/health'
    };

    for (const [name, url] of Object.entries(urls)) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            services[name] = data.status || 'ok';
        } catch {
            services[name] = 'unreachable';
        }
    }

    res.json({
        gateway: 'api-gateway',
        status: 'ok',
        services,
        timestamp: new Date().toISOString()
    });
});

// Fallback — serve index.html
app.get('*', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🌐 API Gateway running on port ${PORT}`);
    console.log(`   /api/tasks/*          → task-service:3001`);
    console.log(`   /api/notifications/*  → notification-service:3002`);
    console.log(`   /api/audit/*          → audit-service:3003\n`);
});
EOF
```

### 6.4 Frontend UI (วางใน Gateway)

```bash
mkdir -p api-gateway/public/css api-gateway/public/js
```

```bash
cat > api-gateway/public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TaskBoard — Event-Driven Architecture</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>📡 TaskBoard <small>Event-Driven Architecture</small></h1>
        <div class="header-badges">
            <span id="notif-badge" class="badge">🔔 0</span>
            <span id="audit-badge" class="badge">📋 0</span>
        </div>
    </header>

    <main>
        <section id="stats-panel"></section>

        <section id="add-task">
            <h2>➕ Add Task</h2>
            <form id="task-form">
                <input type="text" id="title" placeholder="Task title..." required>
                <select id="priority">
                    <option value="LOW">Low</option>
                    <option value="MEDIUM" selected>Medium</option>
                    <option value="HIGH">High</option>
                </select>
                <button type="submit">Add</button>
            </form>
        </section>

        <div class="grid-3">
            <section id="board">
                <h2>📋 Task Board</h2>
                <div class="columns">
                    <div class="column" id="todo"><h3>📝 TODO</h3><div class="tasks"></div></div>
                    <div class="column" id="in_progress"><h3>🔄 IN PROGRESS</h3><div class="tasks"></div></div>
                    <div class="column" id="done"><h3>✅ DONE</h3><div class="tasks"></div></div>
                </div>
            </section>
        </div>

        <div class="grid-2">
            <section id="notifications-panel">
                <h2>🔔 Notifications <small>(from Event Consumer)</small></h2>
                <div id="notifications-list" class="log-box"></div>
            </section>

            <section id="audit-panel">
                <h2>📋 Audit Log <small>(from Event Consumer)</small></h2>
                <div id="audit-list" class="log-box"></div>
            </section>
        </div>
    </main>

    <script src="js/app.js"></script>
</body>
</html>
EOF
```

```bash
cat > api-gateway/public/css/style.css << 'EOF'
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; color: #333; }
header { background: linear-gradient(135deg, #6b21a8, #7c3aed); color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
header h1 small { font-size: 0.5em; opacity: 0.8; display: block; }
.header-badges { display: flex; gap: 0.5rem; }
.badge { background: rgba(255,255,255,0.2); padding: 0.3rem 0.8rem; border-radius: 12px; font-size: 0.85rem; }
main { max-width: 1400px; margin: 1rem auto; padding: 0 1rem; }
#stats-panel { display: flex; gap: 0.8rem; margin-bottom: 1rem; }
.stat-card { background: white; padding: 0.8rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); flex: 1; text-align: center; }
.stat-card .number { font-size: 1.8rem; font-weight: bold; color: #6b21a8; }
#add-task { background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
#task-form { display: flex; gap: 0.5rem; }
#task-form input { flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; }
#task-form select, #task-form button { padding: 0.5rem 1rem; border-radius: 4px; border: 1px solid #ddd; }
#task-form button { background: #6b21a8; color: white; border: none; cursor: pointer; }
.columns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem; }
.column { background: #ebecf0; border-radius: 8px; padding: 0.6rem; min-height: 200px; }
.column h3 { font-size: 0.85rem; margin-bottom: 0.5rem; }
.task-card { background: white; padding: 0.6rem; border-radius: 6px; margin-bottom: 0.4rem; box-shadow: 0 1px 2px rgba(0,0,0,0.08); font-size: 0.85rem; }
.task-card .meta { font-size: 0.7rem; color: #888; display: flex; justify-content: space-between; margin-top: 0.3rem; }
.task-actions { margin-top: 0.3rem; }
.task-actions button { font-size: 0.7rem; padding: 0.15rem 0.4rem; border: 1px solid #ddd; border-radius: 3px; cursor: pointer; background: #f8f9fa; }
.priority-HIGH { border-left: 3px solid #ea4335; }
.priority-MEDIUM { border-left: 3px solid #fbbc04; }
.priority-LOW { border-left: 3px solid #34a853; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
.grid-2 section { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.grid-2 h2 { font-size: 1rem; margin-bottom: 0.5rem; }
.grid-2 h2 small { font-size: 0.7em; color: #888; }
.log-box { max-height: 300px; overflow-y: auto; font-size: 0.8rem; }
.log-entry { padding: 0.4rem 0.5rem; border-bottom: 1px solid #f0f0f0; }
.log-entry .time { color: #aaa; font-size: 0.7rem; }
section#board { background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 0; }
section#board h2 { font-size: 1rem; margin-bottom: 0.5rem; }
EOF
```

```bash
cat > api-gateway/public/js/app.js << 'EOF'
const API = '/api';

async function api(path, options = {}) {
    const res = await fetch(`${API}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options });
    return res.json();
}

async function loadTasks() {
    try {
        const data = await api('/tasks');
        const tasks = data.data || [];
        ['todo', 'in_progress', 'done'].forEach(status => {
            const container = document.querySelector(`#${status} .tasks`);
            container.innerHTML = tasks.filter(t => t.status === status.toUpperCase()).map(t => `
                <div class="task-card priority-${t.priority}">
                    <strong>${t.title}</strong>
                    <div class="meta"><span>${t.priority}</span><span>#${t.id}</span></div>
                    <div class="task-actions">
                        ${t.status !== 'DONE' ? `<button onclick="moveTask(${t.id},'${t.status === 'TODO' ? 'IN_PROGRESS' : 'DONE'}')">➡️</button>` : ''}
                        ${t.status !== 'IN_PROGRESS' ? `<button onclick="deleteTask(${t.id})">🗑️</button>` : ''}
                    </div>
                </div>
            `).join('');
        });
        const s = (await api('/tasks/stats')).data;
        document.getElementById('stats-panel').innerHTML = `
            <div class="stat-card"><div class="number">${s.total}</div>Total</div>
            <div class="stat-card"><div class="number">${s.byStatus.TODO}</div>TODO</div>
            <div class="stat-card"><div class="number">${s.byStatus.IN_PROGRESS}</div>In Progress</div>
            <div class="stat-card"><div class="number">${s.byStatus.DONE}</div>Done</div>
            <div class="stat-card"><div class="number">${s.completionRate}%</div>Completion</div>`;
    } catch (e) { console.error('Load error:', e); }
}

async function loadNotifications() {
    try {
        const data = await api('/notifications');
        document.getElementById('notif-badge').textContent = `🔔 ${data.unread || 0}`;
        document.getElementById('notifications-list').innerHTML = (data.data || []).slice(0, 20).map(n => `
            <div class="log-entry">${n.icon} <strong>${n.title}</strong>: ${n.message}<br><span class="time">${n.timestamp}</span></div>
        `).join('') || '<div class="log-entry">No notifications yet...</div>';
    } catch (e) { console.error('Notif error:', e); }
}

async function loadAudit() {
    try {
        const data = await api('/audit');
        document.getElementById('audit-badge').textContent = `📋 ${data.count || 0}`;
        document.getElementById('audit-list').innerHTML = (data.data || []).slice(0, 20).map(a => `
            <div class="log-entry"><strong>${a.eventType}</strong> — Task #${a.entityId} "${a.data.title}"<br><span class="time">${a.timestamp}</span></div>
        `).join('') || '<div class="log-entry">No audit logs yet...</div>';
    } catch (e) { console.error('Audit error:', e); }
}

document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await api('/tasks', { method: 'POST', body: JSON.stringify({ title: document.getElementById('title').value, priority: document.getElementById('priority').value }) });
    document.getElementById('title').value = '';
    await refreshAll();
});

async function moveTask(id, status) {
    await api(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify({ status }) });
    await refreshAll();
}

async function deleteTask(id) {
    if (!confirm('ลบ Task นี้?')) return;
    await api(`/tasks/${id}`, { method: 'DELETE' });
    await refreshAll();
}

async function refreshAll() {
    await loadTasks();
    // รอ 500ms ให้ events ประมวลผลเสร็จ แล้วโหลด notifications/audit
    setTimeout(async () => {
        await loadNotifications();
        await loadAudit();
    }, 500);
}

// Initial load
refreshAll();
// Auto-refresh every 5 seconds
setInterval(async () => { await loadNotifications(); await loadAudit(); }, 5000);
EOF
```

### ✅ Checkpoint 6: API Gateway + Frontend พร้อม!

---

## Part 7: Docker Compose + RabbitMQ (20 นาที)

### 7.1 Database Init SQL

```bash
cat > database/init.sql << 'EOF'
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT DEFAULT '',
    status VARCHAR(20) DEFAULT 'TODO' CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE')),
    priority VARCHAR(10) DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status, priority) VALUES
    ('ออกแบบ Database Schema', 'สร้าง ER Diagram', 'DONE', 'HIGH'),
    ('สร้าง REST API', 'CRUD endpoints', 'IN_PROGRESS', 'HIGH'),
    ('สร้าง Frontend UI', 'Kanban board', 'TODO', 'MEDIUM'),
    ('เขียน Unit Tests', 'Coverage > 80%', 'TODO', 'LOW'),
    ('Setup RabbitMQ', 'Event-Driven Pattern', 'TODO', 'HIGH');
EOF
```

### 7.2 Docker Compose — ⭐ ทุกอย่างรวมกัน!

```bash
cat > docker-compose.yml << 'EOF'
# ==============================================================
# Docker Compose — Event-Driven Architecture
# ENGSE207 Term Project Week 7
#
# Services:
#   1. db                    — PostgreSQL
#   2. rabbitmq              — RabbitMQ Message Broker ← NEW!
#   3. task-service          — CRUD + Event Publisher
#   4. notification-service  — Event Consumer (Notifications)
#   5. audit-service         — Event Consumer (Audit Log)
#   6. api-gateway           — Single Entry Point
#
# Usage:
#   docker compose up -d --build
#   docker compose logs -f task-service notification-service audit-service
#   Open: http://localhost:3000 (App) | http://localhost:15672 (RabbitMQ UI)
# ==============================================================

services:

  # === PostgreSQL ===
  db:
    image: postgres:16-alpine
    container_name: taskboard-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-taskboard_db}
      POSTGRES_USER: ${POSTGRES_USER:-taskboard}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-taskboard123}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/01-init.sql:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-taskboard}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - taskboard-events

  # === RabbitMQ Message Broker — NEW! ===
  rabbitmq:
    image: rabbitmq:3-management-alpine
    container_name: taskboard-rabbitmq
    restart: unless-stopped
    environment:
      RABBITMQ_DEFAULT_USER: ${RABBITMQ_DEFAULT_USER:-guest}
      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_DEFAULT_PASS:-guest}
    ports:
      - "15672:15672"   # Management UI
      # - "5672:5672"   # AMQP (ไม่ต้อง expose ออกนอก)
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "check_port_connectivity"]
      interval: 15s
      timeout: 10s
      retries: 5
      start_period: 30s
    networks:
      - taskboard-events

  # === Task Service (Publisher) ===
  task-service:
    build:
      context: ./task-service
      dockerfile: Dockerfile
    container_name: taskboard-task-svc
    restart: unless-stopped
    environment:
      - DB_HOST=db
      - DB_PORT=5432
      - POSTGRES_DB=${POSTGRES_DB:-taskboard_db}
      - POSTGRES_USER=${POSTGRES_USER:-taskboard}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-taskboard123}
      - RABBITMQ_URL=amqp://${RABBITMQ_DEFAULT_USER:-guest}:${RABBITMQ_DEFAULT_PASS:-guest}@rabbitmq:5672
      - TASK_SERVICE_PORT=3001
    volumes:
      - ./shared:/app/shared:ro
    depends_on:
      db:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy
    networks:
      - taskboard-events

  # === Notification Service (Consumer) ===
  notification-service:
    build:
      context: ./notification-service
      dockerfile: Dockerfile
    container_name: taskboard-notif-svc
    restart: unless-stopped
    environment:
      - RABBITMQ_URL=amqp://${RABBITMQ_DEFAULT_USER:-guest}:${RABBITMQ_DEFAULT_PASS:-guest}@rabbitmq:5672
    volumes:
      - ./shared:/app/shared:ro
    depends_on:
      rabbitmq:
        condition: service_healthy
    networks:
      - taskboard-events

  # === Audit Service (Consumer) ===
  audit-service:
    build:
      context: ./audit-service
      dockerfile: Dockerfile
    container_name: taskboard-audit-svc
    restart: unless-stopped
    environment:
      - RABBITMQ_URL=amqp://${RABBITMQ_DEFAULT_USER:-guest}:${RABBITMQ_DEFAULT_PASS:-guest}@rabbitmq:5672
    volumes:
      - ./shared:/app/shared:ro
    depends_on:
      rabbitmq:
        condition: service_healthy
    networks:
      - taskboard-events

  # === API Gateway ===
  api-gateway:
    build:
      context: ./api-gateway
      dockerfile: Dockerfile
    container_name: taskboard-gateway
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - TASK_SERVICE_URL=http://task-service:3001
      - NOTIFICATION_SERVICE_URL=http://notification-service:3002
      - AUDIT_SERVICE_URL=http://audit-service:3003
    depends_on:
      - task-service
      - notification-service
      - audit-service
    networks:
      - taskboard-events

networks:
  taskboard-events:
    driver: bridge

volumes:
  postgres_data:
EOF
```

### 7.3 Build และ Start!

```bash
cd ~/term-project/week7-event-driven

# 🚀 Build + Start ทุก Services
docker compose up -d --build

# ตรวจสอบสถานะ
docker compose ps

# ดู logs ของ services (เฉพาะ event-related)
docker compose logs -f task-service notification-service audit-service
```

**ผลลัพธ์ที่คาดหวัง:**

```
NAME                     SERVICE                 STATUS     PORTS
taskboard-db             db                      running    5432/tcp
taskboard-rabbitmq       rabbitmq                running    0.0.0.0:15672->15672/tcp
taskboard-task-svc       task-service            running    3001/tcp
taskboard-notif-svc      notification-service    running    3002/tcp
taskboard-audit-svc      audit-service           running    3003/tcp
taskboard-gateway        api-gateway             running    0.0.0.0:3000->3000/tcp
```

### 7.4 เปิด RabbitMQ Management UI

```
🌐 เปิด Browser: http://localhost:15672
   Username: guest
   Password: guest
```

จะเห็น:
- **Exchange:** task.events (type: fanout)
- **Queues:** notification_queue, audit_queue
- ทั้งสอง Queue bind กับ Exchange

### ✅ Checkpoint 7: ระบบทั้งหมดทำงาน!

---

## Part 8: ทดสอบ End-to-End (20 นาที)

### 8.1 ทดสอบสร้าง Task → ดู Events Flow

```bash
echo "==== TEST 1: Create Task → Should trigger TASK_CREATED event ===="
curl -s -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"ทดสอบ Event-Driven","priority":"HIGH"}' | python3 -m json.tool
echo ""

# รอ 1 วินาที ให้ events ประมวลผล
sleep 1

echo "==== Check Notifications ===="
curl -s http://localhost:3000/api/notifications | python3 -m json.tool
echo ""

echo "==== Check Audit Logs ===="
curl -s http://localhost:3000/api/audit | python3 -m json.tool
```

### 8.2 ทดสอบ Update Task → TASK_COMPLETED

```bash
echo "==== TEST 2: Complete Task → Should trigger TASK_COMPLETED event ===="
curl -s -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"DONE"}' | python3 -m json.tool

sleep 1

echo "==== Check Notifications (should show 🎉 Task Completed!) ===="
curl -s http://localhost:3000/api/notifications | python3 -m json.tool
```

### 8.3 ทดสอบ Delete Task → TASK_DELETED

```bash
echo "==== TEST 3: Delete Task → Should trigger TASK_DELETED event ===="
# ลบ task ที่ status ไม่ใช่ IN_PROGRESS
curl -s -X DELETE http://localhost:3000/api/tasks/4 | python3 -m json.tool

sleep 1

echo "==== Final Audit Log ===="
curl -s http://localhost:3000/api/audit | python3 -m json.tool
```

### 8.4 ดู Gateway Health (ทุก Service status)

```bash
echo "==== Gateway Health Check ===="
curl -s http://localhost:3000/api/health | python3 -m json.tool
```

**ผลลัพธ์ที่คาดหวัง:**

```json
{
    "gateway": "api-gateway",
    "status": "ok",
    "services": {
        "task-service": "ok",
        "notification-service": "ok",
        "audit-service": "ok"
    }
}
```

### 8.5 ดู Docker Logs (เห็น Event Flow)

```bash
# ดู logs ของทุก service (event flow)
docker compose logs --tail=30 task-service notification-service audit-service
```

**Log ที่คาดหวัง:**

```
task-service        | 📤 EVENT PUBLISHED: TASK_CREATED | ID: evt-1708600001-abc123
notification-service| 📨 EVENT RECEIVED: TASK_CREATED
notification-service| 📝 NOTIFICATION: New task "ทดสอบ Event-Driven" has been created
audit-service       | 📨 EVENT RECEIVED: TASK_CREATED
audit-service       | 📝 AUDIT LOG #1: TASK_CREATED | Task #8 "ทดสอบ Event-Driven"
```

### ✅ Checkpoint 8: End-to-End ทำงานสมบูรณ์!

---

## Part 9: สรุปและเปรียบเทียบ

### Week 6 (N-Tier) vs Week 7 (Event-Driven)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Week 6: N-Tier + Redis               Week 7: Event-Driven + RabbitMQ       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Communication: Synchronous            Communication: Asynchronous          │
│  (Request/Response)                    (Publish/Subscribe)                  │
│                                                                             │
│  Services: 1 (×3 instances)            Services: 4 (แยกหน้าที่ชัดเจน)           │
│  API → DB                              Task → RabbitMQ → Notif + Audit      │
│                                                                             │
│  Coupling: Moderate                    Coupling: Loose (แยกจากกัน)           │
│  (App ต้องรู้จัก Redis + DB)               (Publisher ไม่ต้องรู้ว่าใครรับ)            │
│                                                                             │
│  Scaling: Scale App instances          Scaling: Scale แต่ละ Service แยกกัน    │
│                                                                             │
│  Fault Tolerance: ถ้า DB ล่ม=ทุกอย่างล่ม  Fault Tolerance: ถ้า Notif ล่ม           │
│                                          → Task ยังสร้างได้ (Event รอใน Queue) │
│                                                                             │
│  Complexity: ★★★☆☆                    Complexity: ★★★★☆                     │
│  Debugging: ง่าย (ตาม Request)         Debugging: ยากขึ้น (ตาม Event)          │
│                                                                             │
│  Use Cases:                            Use Cases:                           │
│  • Web app ทั่วไป                       • ระบบแจ้งเตือน                         │
│  • CRUD-heavy apps                     • Order processing                   │
│  • Read-heavy (cache ช่วยได้)          • Logging/Auditing                     │
│  • เช่น: Shopee หน้าแรก                • เช่น: LINE notification               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Architecture Evolution Timeline

```
Week 3      Week 4       Week 5        Week 6           Week 7
Monolith → Layered → Client-Server → N-Tier+Redis → Event-Driven
  📦         🏛️          🖥️             🏗️               📡

1 File    3 Layers    2 Projects    4 Tiers +        4 Services +
                      (FE + BE)     Redis Cache      RabbitMQ
                                    3 Instances      Pub/Sub
                                    Load Balance     Async Events
```

---

## 🏆 Challenge: ทำต่อเอง

| ระดับ | Challenge | คำแนะนำ |
|:--:|:--|:--|
| ⭐ | เพิ่ม Event Type ใหม่ `TASK_PRIORITY_CHANGED` เมื่อเปลี่ยน priority | เพิ่มใน eventTypes.js + publisher |
| ⭐⭐ | เพิ่ม Statistics Service ที่นับจำนวน events แต่ละประเภท | สร้าง consumer ใหม่ + queue ใหม่ |
| ⭐⭐⭐ | Implement Dead Letter Queue (DLQ) สำหรับ events ที่ process ไม่สำเร็จ | ศึกษา RabbitMQ DLQ pattern |

---

## 📤 การส่งงานทาง Git

```bash
cd ~/term-project/week7-event-driven

git add -A
git commit -m "Week 7: Event-Driven Architecture with RabbitMQ

- Task Service publishes events (TASK_CREATED/UPDATED/COMPLETED/DELETED)
- Notification Service consumes events and creates notifications
- Audit Service consumes events and creates audit trail
- API Gateway routes to all services
- RabbitMQ as message broker with fanout exchange
- Docker Compose with 6 services
- Shared event contracts for service communication"

git push origin main
```

### Deliverables Checklist

| ✅ | รายการ |
|---|-------|
| ☐ | `docker compose up -d --build` ทำงานครบทุก service |
| ☐ | สร้าง Task แล้ว Notification + Audit Service ได้รับ Event |
| ☐ | RabbitMQ Management UI แสดง Exchange + Queues ที่ bind |
| ☐ | API Gateway route ไปทุก service ถูกต้อง |
| ☐ | Frontend แสดง Task Board + Notifications + Audit Log |
| ☐ | Docker logs แสดง Event flow (Published → Received → Processed) |
| ☐ | Git commit พร้อม message อธิบาย |

---

*ENGSE207 Software Architecture — Term Project Week 7*
*Instructor: นายธนิต เกตุแก้ว — มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*
