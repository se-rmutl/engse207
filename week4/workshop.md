# ENGSE207 Software Architecture
## Workshop สัปดาห์ที่ 4: Microservices Design & Mini-Debate

---

**ระยะเวลา:** 3 ชั่วโมง  
**รูปแบบ:** กลุ่ม 4-5 คน  
**เครื่องมือ:** กระดาษ, ปากกา, Draw.io, Miro/FigJam

---

## 📋 วัตถุประสงค์ Workshop

1. **ฝึกออกแบบระบบด้วย Microservices Architecture** ระดับ Overview
2. **เข้าใจ Bounded Context และการแบ่ง Services**
3. **ออกแบบการสื่อสารระหว่าง Services** (Sync/Async)
4. **วิเคราะห์ Trade-offs** ระหว่าง Monolithic และ Microservices
5. **พัฒนาทักษะการนำเสนอและ Debate**

---

## ⏱️ ตารางเวลา (180 นาที)

| เวลา | กิจกรรม | ระยะเวลา |
|------|---------|---------|
| 0:00-0:15 | แนะนำ Workshop + แบ่งกลุ่ม | 15 นาที |
| 0:15-1:15 | **Activity 1**: ออกแบบ Task Board Microservices | 60 นาที |
| 1:15-2:00 | **Activity 2**: Mini-Debate (Monolith vs Microservices) | 45 นาที |
| 2:00-2:45 | **Activity 3**: Event-Driven Design | 45 นาที |
| 2:45-3:00 | สรุปและ Q&A | 15 นาที |

---

## 🎯 Activity 1: ออกแบบ Task Board System แบบ Microservices (60 นาที)

### 📝 โจทย์

**Task Board System** เป็นระบบจัดการงานแบบ Kanban (คล้าย Trello, Asana)

**Features หลัก:**
1. 👤 **User Management**
   - ลงทะเบียน/Login
   - จัดการ Profile
   - Authentication & Authorization

2. 📋 **Board Management**
   - สร้าง Board (โครงการ)
   - เพิ่มสมาชิกเข้า Board
   - จัดการสิทธิ์ (Owner, Member, Viewer)

3. ✅ **Task Management**
   - สร้าง/แก้ไข/ลบ Task
   - เปลี่ยนสถานะ (TODO, IN PROGRESS, DONE)
   - กำหนด Assignee, Due Date, Priority
   - เพิ่ม Comments

4. 🔔 **Notification**
   - แจ้งเตือนเมื่อมีการ Mention
   - แจ้งเตือนเมื่อ Task ใกล้ Deadline
   - แจ้งเตือนเมื่อมีการ Assign งาน

5. 📊 **Analytics**
   - Dashboard แสดงสถิติการทำงาน
   - Progress Tracking
   - Time Tracking

### 🎨 ขั้นตอนการออกแบบ

#### Step 1: Identify Bounded Contexts (15 นาที)

**คำถาม:** ระบบนี้ควรแบ่งเป็น Services อะไรบ้าง?

**คำแนะนำ:**
- แต่ละ Service ควรมี **Single Responsibility**
- ดูที่ **Business Capabilities**
- **Domain-Driven Design**: แต่ละ Service = Bounded Context

**ตัวอย่าง Services ที่เป็นไปได้:**

```
📦 Candidate Services:

1️⃣  User Service
    • จัดการ Users, Authentication
    • Profile Management
    • ข้อมูล: users, profiles, auth_tokens

2️⃣  Board Service
    • จัดการ Boards
    • Board Members, Permissions
    • ข้อมูล: boards, board_members, permissions

3️⃣  Task Service
    • จัดการ Tasks
    • Task Status, Priority
    • ข้อมูล: tasks, task_status, priorities

4️⃣  Comment Service
    • จัดการ Comments
    • Mentions
    • ข้อมูล: comments, mentions

5️⃣  Notification Service
    • ส่งการแจ้งเตือน
    • Email, Push Notification
    • ข้อมูล: notifications, notification_settings

6️⃣  Analytics Service
    • สถิติ, Dashboard
    • Reports
    • ข้อมูล: aggregated_data, reports
```

**🤔 Discussion Points:**
- Task Service กับ Comment Service ควรแยกหรือรวมกัน?
- Notification Service เป็น Microservice หรือ Background Worker?
- Analytics Service ควรมี Database แยกหรือไม่?

**💡 Tips:**
- เริ่มจาก **ขนาดใหญ่** ก่อน แล้วค่อยแยกตามความจำเป็น
- หลีกเลี่ยง "Micro" เกินไป (Nano-services)
- **ถาม:** ถ้า Service นี้ล่ม → กระทบอะไรบ้าง?

#### Step 2: วาดแผนภาพสถาปัตยกรรม (25 นาที)

**วาด High-Level Architecture Diagram**

```
📐 สิ่งที่ต้องมีในแผนภาพ:

1️⃣  Client/Frontend
    • Web App
    • Mobile App

2️⃣  API Gateway
    • Single Entry Point
    • Authentication
    • Routing

3️⃣  Services (วาดเป็นกล่อง)
    • User Service
    • Board Service
    • Task Service
    • ฯลฯ

4️⃣  Databases (แยกตาม Service)
    • User DB
    • Board DB
    • Task DB

5️⃣  Message Bus/Event Stream
    • Kafka, RabbitMQ
    • สำหรับ Async Communication

6️⃣  External Services
    • Email Service (SendGrid)
    • Push Notification (Firebase)
```

**ตัวอย่างแผนภาพ:**

```
┌───────────────────────────────────────────────────┐
│       TASK BOARD MICROSERVICES ARCHITECTURE       │
└───────────────────────────────────────────────────┘

       [Web App]         [Mobile App]
           │                  │
           └─────────┬────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  API Gateway    │
            │  (Kong/Nginx)   │
            └────────┬────────┘
                     │
     ┌───────────────┼───────────────┬─────────────┐
     │               │               │             │
     ▼               ▼               ▼             ▼
┌─────────┐     ┌─────────┐    ┌─────────┐    ┌─────────┐
│ User    │     │ Board   │    │ Task    │    │ Comment │
│ Service │     │ Service │    │ Service │    │ Service │
│         │     │         │    │         │    │         │
│ [DB]    │     │ [DB]    │    │ [DB]    │    │ [DB]    │
└────┬────┘     └────┬────┘    └────┬────┘    └────┬────┘
     │               │              │              │
     └───────────────┴──────────────┴──────────────┘
                            │
                   ┌────────▼────────┐
                   │  Message Bus    │
                   │  (Apache Kafka) │
                   └────────┬────────┘
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
           ┌────────┐  ┌─────────┐  ┌────────┐
           │Notific.│  │Analytics│  │ Email  │
           │Service │  │Service  │  │Service │
           └────────┘  └─────────┘  └────────┘
```

**🎨 Tools สำหรับวาด:**
- กระดาษ + ปากกา (ง่ายสุด)
- Draw.io (https://app.diagrams.net)
- Miro (https://miro.com)
- FigJam (https://www.figma.com/figjam)

#### Step 3: ออกแบบการสื่อสาร (Sync vs Async) (15 นาที)

**Synchronous Communication (REST API)**

```
Use Cases ที่เหมาะสม:
✅ User Login → User Service
✅ Get Board Details → Board Service
✅ Create Task → Task Service
✅ Real-time Query (ต้องการ Response ทันที)
```

**Asynchronous Communication (Message Queue/Event)**

```
Use Cases ที่เหมาะสม:
✅ Task Assigned → Notification Service
✅ Task Completed → Analytics Service
✅ Comment Added → Update Board Timeline
✅ Background Processing (ไม่ต้องการ Response ทันที)
```

**ตารางการสื่อสาร:**

| Scenario | From Service | To Service | Sync/Async | Protocol |
|----------|-------------|-----------|------------|----------|
| Get User Profile | API Gateway | User Service | Sync | REST |
| Create Task | API Gateway | Task Service | Sync | REST |
| Task Created | Task Service | Notification | Async | Event |
| Task Created | Task Service | Analytics | Async | Event |
| Send Notification | Notification | Email Service | Async | Event |

**🎨 วาดลูกศรในแผนภาพ:**
- **Sync** → ลูกศรตรง (───→)
- **Async** → ลูกศรผ่าน Message Bus (┈→ Bus →┈→)

#### Step 4: ระบุ Database per Service (5 นาที)

**แต่ละ Service มี Database ของตัวเอง!**

| Service | Database Type | เหตุผล |
|---------|--------------|--------|
| **User Service** | PostgreSQL (SQL) | ACID Transaction, Authentication |
| **Board Service** | PostgreSQL | Relational Data (Boards ↔ Members) |
| **Task Service** | PostgreSQL | Complex Queries, Relations |
| **Comment Service** | MongoDB (NoSQL) | Flexible Schema, High Write |
| **Notification** | Redis (Cache) | Temporary Data, Fast Access |
| **Analytics** | ClickHouse/BigQuery | Time-Series, Aggregation |

**💡 Benefits of Database per Service:**
- ✅ แต่ละ Service เลือก Database ที่เหมาะสมได้
- ✅ Scale Database แยกกัน
- ✅ Schema Changes ไม่กระทบ Service อื่น

**❌ Challenges:**
- ข้อมูลกระจาย (ไม่มี JOIN ข้าม Service)
- Distributed Transactions ซับซ้อน
- Data Consistency (Eventual Consistency)

---

## 🗣️ Activity 2: Mini-Debate "Monolith ที่ดี vs Microservices ที่ไม่พร้อม" (45 นาที)

### 🎯 วัตถุประสงค์

- เข้าใจ **Trade-offs** อย่างลึกซึ้ง
- ฝึกการ **วิเคราะห์และโต้แย้ง** อย่างมีเหตุผล
- เห็นว่า Microservices **ไม่ใช่คำตอบเดียว**

### 📜 Format

**แบ่งชั้นเรียนเป็น 2 ฝ่าย:**

**ฝ่าย A: "Monolithic is Better!"** (15 คน)
- Argue ว่า Monolithic ดีกว่า Microservices
- Focus: Simplicity, Speed, Cost

**ฝ่าย B: "Microservices is the Future!"** (15 คน)
- Argue ว่า Microservices ดีกว่า Monolithic
- Focus: Scalability, Flexibility, Fault Isolation

### 🎮 กติกา

1. **เตรียมตัว (10 นาที)**
   - แต่ละฝ่ายปรึกษากัน
   - เตรียม Arguments พร้อมหลักฐาน

2. **Opening Statement (5 นาที/ฝ่าย)**
   - ฝ่ายละ 5 นาที แสดงจุดยืน
   - ใช้ตัวอย่างจากบริษัทจริง

3. **Rebuttal (5 นาที/ฝ่าย)**
   - โต้แย้งข้อความของฝ่ายตรงข้าม
   - ชี้จุดอ่อนของฝ่ายตรงข้าม

4. **Audience Questions (10 นาที)**
   - นักศึกษาที่เหลือถามคำถามยาก
   - แต่ละฝ่ายตอบ

5. **Closing Statement (3 นาที/ฝ่าย)**
   - สรุปจุดยืนสุดท้าย

### 📊 Debate Framework

#### **Scenario: Startup ทำ E-Commerce MVP**

**ข้อมูล:**
- 💰 Budget: 2 ล้านบาท
- 👥 Team: 5 developers
- ⏰ Timeline: 3 เดือน
- 🎯 Goal: Launch MVP, รับ Funding ต่อ

**ฝ่าย A (Monolithic):**

```
✅ ARGUMENTS:

1️⃣  เร็วกว่า (Time to Market)
    • Setup ง่าย, Deploy รวดเร็ว
    • ไม่ต้องจัดการ Service Registry, API Gateway
    • 3 เดือน → เพียงพอ

2️⃣  ต้นทุนต่ำกว่า
    • 1 Server ก็พอ
    • ไม่ต้อง DevOps Team
    • Infrastructure Cost ต่ำ

3️⃣  Developer Productivity สูงกว่า
    • Codebase เดียว → Debug ง่าย
    • No Network Latency
    • Testing ง่ายกว่า

4️⃣  เหมาะกับ MVP
    • ยังไม่รู้ว่า Feature ไหนจะได้ใช้
    • Premature Optimization = Evil
    • Focus ที่ Business Logic ก่อน

📚 ตัวอย่างบริษัท:
• Shopify เริ่มจาก Monolith (ปี 2004)
• Etsy เริ่มจาก Monolith
• Stack Overflow ใช้ Monolith จนถึงปัจจุบัน!
```

**ฝ่าย B (Microservices):**

```
✅ ARGUMENTS:

1️⃣  เตรียมพร้อมสำหรับอนาคต
    • ถ้า MVP สำเร็จ → Scale ได้ง่าย
    • ไม่ต้อง Refactor ใหม่ทั้งหมด
    • "Build for Scale from Day 1"

2️⃣  Team Autonomy
    • แต่ละคนรับผิดชอบ Service
    • Deploy อิสระกัน → เร็วขึ้น
    • ไม่ต้องรอกัน

3️⃣  Fault Isolation
    • Payment Service ล่ม → ยังดูสินค้าได้
    • Better User Experience
    • High Availability

4️⃣  Technology Freedom
    • Payment Service → Java (Secure)
    • Analytics → Python (ML-ready)
    • เลือกได้ตามความเหมาะสม

📚 ตัวอย่างบริษัท:
• Netflix ใช้ Microservices ตั้งแต่เริ่มต้น (2007)
• Uber เริ่มจาก Microservices
• ความยืดหยุ่น → Success
```

### 🎯 คำถามท้าทาย (สำหรับ Moderator)

**ถามฝ่าย A (Monolithic):**
1. "ถ้า Monolith โตเกิน 500K lines of code - ทำอย่างไร?"
2. "Developer ใหม่เข้ามา - เข้าใจระบบได้ง่ายเหรอ?"
3. "ถ้า Feature หนึ่ง Load สูง - Scale ทั้งระบบเลยเหรอ?"

**ถามฝ่าย B (Microservices):**
1. "5 developers จะดูแล 10 services ไหวเหรอ?"
2. "Debug ข้าม 5 services ยังไง? Network timeout จัดการอย่างไร?"
3. "Budget 2 ล้าน - พอทำ Infrastructure, DevOps, Monitoring เหรอ?"

### 🏆 การตัดสิน

**ไม่มีฝ่ายชนะ!** 🎯

**อาจารย์สรุป:**
```
💡 "Both are Right!"

✅ Monolithic ดีสำหรับ:
   • Startup MVP
   • Team เล็ก
   • Budget จำกัด
   • Speed to Market

✅ Microservices ดีสำหรับ:
   • Scale ต้องการสูง
   • Team ใหญ่
   • Complex Domain
   • Long-term Investment

🎯 คำตอบที่ถูกต้อง:
   "Start with Monolith, Evolve to Microservices"
   • เริ่มจาก Monolithic (Layered)
   • เมื่อโต → แยกเป็น Microservices
   • Netflix, Amazon, Uber ก็ทำแบบนี้!
```

---

## 🎨 Activity 3: Event-Driven Design (45 นาที)

### 📝 โจทย์

**ออกแบบ Event Flow** สำหรับ Scenario ต่อไปนี้:

**Scenario: "Task Assignment & Notification"**

```
👤 User A สร้าง Task ใหม่ และ Assign ให้ User B

ผลที่ควรเกิด:
1. Task ถูกสร้างในระบบ
2. User B ได้รับ Email Notification
3. User B ได้รับ Push Notification
4. Timeline ของ Board ถูกอัปเดต
5. Analytics บันทึก Event
```

### 🎯 ขั้นตอน

#### Step 1: ระบุ Events (10 นาที)

**Events ที่เกิดขึ้น:**

```
1️⃣  TaskCreated
    {
      "eventType": "TaskCreated",
      "taskId": "task-123",
      "boardId": "board-456",
      "title": "Implement Login Feature",
      "createdBy": "user-A",
      "assignedTo": "user-B",
      "timestamp": "2025-01-15T10:00:00Z"
    }

2️⃣  TaskAssigned
    {
      "eventType": "TaskAssigned",
      "taskId": "task-123",
      "assignedTo": "user-B",
      "assignedBy": "user-A",
      "timestamp": "2025-01-15T10:00:01Z"
    }
```

**💡 Question:** ควรเป็น 1 Event หรือ 2 Events?

#### Step 2: วาด Event Flow Diagram (20 นาที)

```
┌─────────────────────────────────────────────────────┐
│         EVENT-DRIVEN TASK ASSIGNMENT FLOW           │
└─────────────────────────────────────────────────────┘

       [User A: Create & Assign Task]
            │
            ▼
       [API Gateway]
            │
            ▼
       [Task Service]
            │
            ├─ บันทึก Task ใน Database
            │
            ▼
Publish Event: "TaskCreated"
            │
            ▼
    ┌──────────────────┐
    │  Message Broker  │
    │  (Apache Kafka)  │
    │                  │
    │  Topic: tasks    │
    └────────┬─────────┘
             │
     ┌───────┴──┬─────────┬───────────┬──────────┐
     ▼          ▼         ▼           ▼          ▼
┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐
│Email    ││Push     ││Timeline ││Analytics││Webhook  │
│Service  ││Notif.   ││Service  ││Service  ││Service  │
│         ││Service  ││         ││         ││         │
│Send     ││Send     ││Update   ││Log      ││Notify   │
│Email    ││Push     ││Board    ││Event    ││External │
│         ││         ││Timeline ││         ││System   │
└─────────┘└─────────┘└─────────┘└─────────┘└─────────┘
```

#### Step 3: จัดการ Failure Scenarios (10 นาที)

**What if?**

**Scenario 1: Email Service ล่ม**
```
❌ ปัญหา: User B ไม่ได้รับ Email

✅ วิธีแก้:
• Event ยังอยู่ใน Queue
• Email Service กลับมา → Process Event อีกครั้ง
• Retry Mechanism (Exponential Backoff)
• Dead Letter Queue (DLQ) หลัง 3 ครั้ง
```

**Scenario 2: Message Broker ล่ม**
```
❌ ปัญหา: Events หายหมด

✅ วิธีแก้:
• Message Broker มี Replication
• High Availability (3+ Brokers)
• Events ถูก Persist บน Disk
```

**Scenario 3: Duplicate Events**
```
❌ ปัญหา: ส่ง Email 2 ครั้ง

✅ วิธีแก้:
• Idempotency
• ตรวจสอบ Event ID ก่อนประมวลผล
• เก็บ Processed Event IDs
```

#### Step 4: เปรียบเทียบ Request-Response vs Event-Driven (5 นาที)

| Aspect | Request-Response | Event-Driven |
|--------|-----------------|--------------|
| **Response Time** | 2-3 วินาที (รอทุกขั้นตอน) | < 500ms (Response ทันที) |
| **Coupling** | Tight (รู้จักทุก Service) | Loose (ไม่รู้จักกัน) |
| **Fault Tolerance** | ถ้า 1 Service ล่ม → ทั้งหมดล่ม | Service ล่ม → Events ยังอยู่ |
| **Scalability** | จำกัด (ต้องรอ Sync) | สูง (Process แยกกัน) |
| **Complexity** | ต่ำ | สูง |

---

## 📊 Deliverables (สิ่งที่ต้องส่ง)

แต่ละกลุ่มต้องส่ง:

### 1. Architecture Diagram (PDF/PNG)
```
✅ ต้องมี:
• Client (Web/Mobile App)
• API Gateway
• Services (อย่างน้อย 5 Services)
• Databases (แยกตาม Service)
• Message Bus
• External Services

📐 ขนาด: A4 หรือ Letter
🎨 เครื่องมือ: Draw.io, Miro, FigJam, หรือวาดมือ (สแกน)
```

### 2. Service Description Table (Excel/Google Sheets)

| Service Name | Responsibilities | Technology | Database | API Endpoints |
|-------------|-----------------|------------|----------|---------------|
| User Service | Authentication, Profile Management | Node.js + Express | PostgreSQL | GET /users/:id<br>POST /users<br>PUT /users/:id |
| Board Service | Board CRUD, Members | Python + FastAPI | PostgreSQL | GET /boards<br>POST /boards<br>GET /boards/:id/members |
| Task Service | Task Management | Go + Gin | PostgreSQL | GET /tasks<br>POST /tasks<br>PUT /tasks/:id |

### 3. Communication Matrix (Excel/Google Sheets)

| From | To | Scenario | Sync/Async | Protocol | Reason |
|------|----|---------|-----------|---------| -------|
| API Gateway | User Service | Login | Sync | REST | ต้องการ Response ทันที |
| Task Service | Notification | Task Assigned | Async | Event | ไม่ต้องรอ Response |

### 4. Event Flow Diagram (PDF/PNG)
```
✅ ต้องมี:
• Event Types
• Message Broker
• Consumers
• Failure Handling
```

### 5. Trade-offs Analysis (1-2 หน้า)
```
✅ เปรียบเทียบ:
• Monolithic vs Microservices (สำหรับ Task Board)
• Request-Response vs Event-Driven
• ข้อดี-ข้อเสีย ของ Architecture ที่เลือก
• แนวทางแก้ไข Challenges
```
---

## 🎯 เกณฑ์การให้คะแนน Workshop

**คะแนนเต็ม: 100 คะแนน**

### Activity 1: Architecture Design (40 คะแนน)
- Bounded Context ถูกต้อง (10 คะแนน)
- Architecture Diagram ครบถ้วน (15 คะแนน)
- Communication Design (Sync/Async) (10 คะแนน)
- Database per Service (5 คะแนน)

### Activity 2: Mini-Debate (30 คะแนน)
- Arguments มีหลักฐาน (10 คะแนน)
- Rebuttal มีประสิทธิภาพ (10 คะแนน)
- การนำเสนอ (5 คะแนน)
- การทำงานเป็นทีม (5 คะแนน)

### Activity 3: Event-Driven Design (30 คะแนน)
- Event Types ถูกต้อง (10 คะแนน)
- Event Flow Diagram (10 คะแนน)
- Failure Handling (10 คะแนน)

---

**🎉 Good Luck!**

*หากมีคำถาม ติดต่ออาจารย์ที่ thanit@rmutl.ac.th*

---

*Workshop Guide จัดทำโดย: นายธนิต เกตุแก้ว*  
*หลักสูตรวิศวกรรมซอฟต์แวร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*  
*ปรับปรุงล่าสุด: พ.ศ. 2568*
