# 📚 เอกสารสถาปัตยกรรมระบบ (Software Architecture Documentation)
## ระบบจองห้องประชุมออนไลน์ (Meeting Room Booking System)

**เวอร์ชัน:** 1.0  
**วันที่:** 6 มกราคม 2025  
**ผู้จัดทำ:** ทีมพัฒนา ENGSE207  
**สถานะ:** Approved

---

## 📋 สารบัญ

1. [ภาพรวมระบบ](#1-ภาพรวมระบบ)
2. [Architecture Decision Records (ADR)](#2-architecture-decision-records-adr)
3. [Architecture Diagrams](#3-architecture-diagrams)
4. [Architecture Description](#4-architecture-description)
5. [Implementation Guidelines](#5-implementation-guidelines)
6. [Quality Attributes](#6-quality-attributes)
7. [Risks and Technical Debt](#7-risks-and-technical-debt)

---

## 1. ภาพรวมระบบ

### 1.1 วัตถุประสงค์

ระบบจองห้องประชุมออนไลน์เป็นเว็บแอปพลิเคชันที่ช่วยให้พนักงานในองค์กรสามารถ:
- ค้นหาห้องประชุมที่ว่างตามวันและเวลาที่ต้องการ
- จองห้องประชุมล่วงหน้า
- ดูรายการการจองของตนเอง
- ยกเลิกการจอง
- ดูปฏิทินการใช้งานห้องประชุม

### 1.2 ขอบเขตระบบ

**ผู้ใช้งาน:**
- พนักงาน (Employee): สามารถจองห้องประชุมได้
- ผู้ดูแลระบบ (Admin): จัดการห้องประชุมและดูรายงาน

**ฟีเจอร์หลัก:**
1. Authentication & Authorization
2. ค้นหาห้องประชุม
3. จองห้องประชุม
4. จัดการการจอง (ดู, แก้ไข, ยกเลิก)
5. ดูปฏิทิน
6. จัดการห้องประชุม (Admin)
7. รายงานการใช้งาน (Admin)

**ข้อจำกัด:**
- รองรับผู้ใช้งานพร้อมกัน ~200 คน
- ต้องทำงานบน browser สมัยใหม่ (Chrome, Firefox, Safari, Edge)
- ต้องใช้งานได้ผ่าน mobile
- เวลาตอบสนองไม่เกิน 2 วินาที

### 1.3 Stakeholders

| Stakeholder | ความสนใจ/ความต้องการ |
|-------------|------------------------|
| พนักงาน | ใช้งานง่าย, รวดเร็ว, เห็นห้องว่างได้ชัดเจน |
| ผู้บริหาร | ดูสถิติการใช้งานห้อง, ประหยัดค่าใช้จ่าย |
| IT Admin | ดูแลระบบง่าย, ปลอดภัย, maintain ง่าย |
| ทีมพัฒนา | Code maintainable, มี documentation ดี |

---

## 2. Architecture Decision Records (ADR)

### ADR-001: เลือกใช้ 3-Tier Layered Architecture

**Status:** Accepted  
**Date:** 2025-12-15  
**Decision Makers:** ทีมสถาปนิก, Lead Developer

#### Context

ต้องตัดสินใจเลือก architectural style สำหรับระบบที่:
- มีขนาดเล็กถึงกลาง (~200 users พร้อมกัน)
- ทีมพัฒนามีประสบการณ์กับ web development แบบดั้งเดิม
- ต้องการ maintainability และ scalability ระดับกลาง
- งบประมาณและเวลาจำกัด

#### Decision

เลือกใช้ **3-Tier Layered Architecture** ประกอบด้วย:
- **Presentation Layer:** React.js frontend
- **Business Logic Layer:** Node.js + Express.js backend
- **Data Access Layer:** PostgreSQL database

#### Consequences

**Positive:**
- ✅ แยก concerns ชัดเจน ง่ายต่อการพัฒนาและทดสอบ
- ✅ ทีมคุ้นเคย สามารถเริ่มงานได้เร็ว
- ✅ Maintainability ดี แต่ละ layer แก้ไขได้อิสระ
- ✅ เหมาะกับขนาดระบบและทีม

**Negative:**
- ⚠️ Monolithic deployment (ถ้า scale ต้อง scale ทั้งหมด)
- ⚠️ Inter-layer communication overhead เล็กน้อย
- ⚠️ ถ้าระบบโตมาก อาจต้อง refactor เป็น microservices

**Alternatives Considered:**
- Microservices: ซับซ้อนเกินไปสำหรับระบบขนาดนี้
- Monolithic single-file: ยาก maintain ในระยะยาว

---

### ADR-002: เลือกใช้ PostgreSQL เป็น Database

**Status:** Accepted  
**Date:** 2025-12-16

#### Context

ต้องเลือก database ที่เหมาะสมสำหรับ:
- ข้อมูลที่มีความสัมพันธ์ชัดเจน (rooms, bookings, users)
- ต้องการ ACID transactions
- จำนวน concurrent users ~200 คน
- ทีมคุ้นเคยกับ relational database

#### Decision

เลือกใช้ **PostgreSQL** เป็น relational database หลัก

#### Consequences

**Positive:**
- ✅ ACID compliance เต็มรูปแบบ
- ✅ รองรับ complex queries และ joins ได้ดี
- ✅ Foreign keys และ constraints ช่วยรักษา data integrity
- ✅ ทีมคุ้นเคยกับ SQL
- ✅ Open source, ไม่มีค่าใช้จ่าย license
- ✅ มี features ครบ (JSON support, full-text search)

**Negative:**
- ⚠️ Vertical scaling มีข้อจำกัด
- ⚠️ ถ้า traffic สูงมาก อาจต้องใช้ read replicas

**Alternatives Considered:**
- MySQL: คล้ายกัน แต่ PostgreSQL มี features มากกว่า
- MongoDB: NoSQL ไม่เหมาะกับข้อมูลที่มี relationships ชัดเจน
- SQLite: ไม่รองรับ concurrent writes ได้ดีพอ

---

### ADR-003: เลือกใช้ JWT สำหรับ Authentication

**Status:** Accepted  
**Date:** 2025-12-17

#### Context

ต้องเลือกวิธี authentication ที่:
- รองรับ stateless architecture
- ใช้งานง่ายกับ REST API
- ปลอดภัยเพียงพอสำหรับข้อมูลทั่วไป (ไม่ใช่ข้อมูลสำคัญมาก)
- ทีมสามารถ implement ได้

#### Decision

ใช้ **JSON Web Tokens (JWT)** สำหรับ authentication และ authorization

**Implementation Details:**
- ใช้ access token (expires ใน 1 ชั่วโมง)
- ใช้ refresh token (expires ใน 7 วัน)
- เก็บ tokens ใน httpOnly cookies

#### Consequences

**Positive:**
- ✅ Stateless - ไม่ต้องเก็บ session บน server
- ✅ Scalable - เพิ่ม server ได้โดยไม่ต้อง share session
- ✅ Self-contained - มีข้อมูล user อยู่ใน token
- ✅ รองรับ CORS ได้ดี

**Negative:**
- ⚠️ Token size ใหญ่กว่า session ID
- ⚠️ ยกเลิก token ก่อนหมดอายุยาก (แก้ด้วย short-lived access token)
- ⚠️ ต้องระวังเรื่อง XSS (แก้ด้วย httpOnly cookies)

**Alternatives Considered:**
- Session-based: ต้อง share session store, ไม่ scalable
- OAuth2: ซับซ้อนเกินไปสำหรับระบบภายในองค์กร

---

### ADR-004: เลือกใช้ React.js สำหรับ Frontend

**Status:** Accepted  
**Date:** 2025-12-18

#### Context

ต้องเลือก frontend framework ที่:
- มี ecosystem และ community ใหญ่
- ทีมมีประสบการณ์
- รองรับ responsive design
- มี component reusability ดี

#### Decision

ใช้ **React.js** พร้อมกับ:
- **React Router** สำหรับ routing
- **Axios** สำหรับ HTTP requests
- **Material-UI (MUI)** สำหรับ UI components
- **React Query** สำหรับ data fetching และ caching

#### Consequences

**Positive:**
- ✅ Component-based architecture - reusable
- ✅ Virtual DOM - performance ดี
- ✅ Ecosystem ใหญ่ มี libraries เยอะ
- ✅ ทีมคุ้นเคย
- ✅ MUI ช่วยให้ UI สวยและ responsive

**Negative:**
- ⚠️ Bundle size ค่อนข้างใหญ่
- ⚠️ Learning curve สำหรับ hooks และ state management

**Alternatives Considered:**
- Vue.js: ง่ายกว่า แต่ทีมไม่คุ้นเคย
- Angular: หนักเกินไป, ซับซ้อน
- Vanilla JS: ต้องเขียนเองเยอะ

---

### ADR-005: เลือกใช้ RESTful API แทน GraphQL

**Status:** Accepted  
**Date:** 2025-12-19

#### Context

ต้องเลือกรูปแบบ API ระหว่าง RESTful กับ GraphQL

#### Decision

ใช้ **RESTful API** เป็น API design pattern

**Endpoints หลัก:**
- GET /api/rooms - ดูห้องทั้งหมด
- GET /api/rooms/:id/availability - ดูความว่างของห้อง
- POST /api/bookings - สร้างการจอง
- GET /api/bookings/my - ดูการจองของฉัน
- DELETE /api/bookings/:id - ยกเลิกการจอง

#### Consequences

**Positive:**
- ✅ ง่ายต่อการเข้าใจและ implement
- ✅ HTTP methods มีความหมายชัดเจน (GET, POST, PUT, DELETE)
- ✅ Caching ทำได้ง่าย
- ✅ Tools และ documentation มีเยอะ

**Negative:**
- ⚠️ Over-fetching หรือ under-fetching data บางครั้ง
- ⚠️ ต้องทำหลาย requests ถ้าต้องการข้อมูลจากหลาย resources

**Alternatives Considered:**
- GraphQL: ยืดหยุ่นกว่า แต่ซับซ้อนเกินไปสำหรับระบบนี้

---

## 3. Architecture Diagrams

### 3.1 Context Diagram (C4 Level 1)

**วัตถุประสงค์:** แสดงภาพรวมระบบและ external entities ที่เกี่ยวข้อง

```
[Draw.io XML Code - Context Diagram]

แผนภาพแสดง:
- ระบบ Meeting Room Booking (กลาง)
- Actors: พนักงาน, ผู้ดูแลระบบ
- External Systems: Email Service (สำหรับส่งแจ้งเตือน)
```

**คำอธิบาย:**

**Actors:**
1. **พนักงาน (Employee)**
   - ค้นหาและจองห้องประชุม
   - ดูและจัดการการจองของตนเอง
   - รับ email แจ้งเตือนการจอง

2. **ผู้ดูแลระบบ (Admin)**
   - จัดการข้อมูลห้องประชุม
   - ดูรายงานการใช้งาน
   - จัดการผู้ใช้

**External Systems:**
1. **Email Service (SendGrid/AWS SES)**
   - รับ request ส่ง email confirmation
   - ส่งแจ้งเตือนก่อนเวลาประชุม

**System Boundaries:**
- ภายในระบบ: การจัดการ bookings, rooms, users
- ภายนอกระบบ: Email delivery, การ authenticate ผ่าน company AD (future)

---

### 3.2 Container Diagram (C4 Level 2)

**วัตถุประสงค์:** แสดง containers (applications/services) ที่ประกอบกันเป็นระบบ

```
[Draw.io XML Code - Container Diagram]

แผนภาพแสดง:
- Web Browser (React App)
- API Server (Node.js + Express)
- Database (PostgreSQL)
- Email Service (External)
```

**คำอธิบาย:**

**Containers:**

1. **Web Application (React SPA)**
   - Technology: React.js, Material-UI, React Router
   - Port: 80/443 (HTTPS)
   - Responsibilities:
     - Render UI components
     - จัดการ user interactions
     - เรียก API endpoints
     - แสดงผลข้อมูล
   - Communication:
     - REST API calls ไปยัง Backend API (HTTPS)
     - ใช้ JWT tokens สำหรับ authentication

2. **Backend API (Node.js Application)**
   - Technology: Node.js, Express.js, JWT
   - Port: 3000
   - Responsibilities:
     - รับ HTTP requests จาก frontend
     - Validate input data
     - ดำเนินการ business logic
     - เข้าถึง database
     - จัดการ authentication/authorization
     - ส่ง requests ไปยัง Email Service
   - Communication:
     - รับ HTTPS requests จาก Web App
     - Query PostgreSQL database
     - REST API calls ไปยัง Email Service

3. **Database (PostgreSQL)**
   - Technology: PostgreSQL 14
   - Port: 5432
   - Responsibilities:
     - เก็บข้อมูล users, rooms, bookings
     - รักษา data integrity ด้วย constraints
     - ประมวลผล queries
   - Tables หลัก:
     - users (id, email, name, role)
     - rooms (id, name, capacity, floor, equipment)
     - bookings (id, room_id, user_id, start_time, end_time, status)

4. **Email Service (External - SendGrid)**
   - Technology: SendGrid API
   - Responsibilities:
     - รับ email requests จาก Backend
     - จัดการ email templates
     - ส่ง emails ไปยังผู้ใช้
   - Communication:
     - REST API (HTTPS)

---

### 3.3 Component Diagram (C4 Level 3)

**วัตถุประสงค์:** แสดง components ภายใน Backend API container

```
[Draw.io XML Code - Component Diagram สำหรับ Backend API]

แผนภาพแสดง:
- Controllers (Routes)
- Services (Business Logic)
- Repositories (Data Access)
- Middleware (Auth, Validation)
```

**คำอธิบาย:**

**Backend API Components:**

**1. API Layer (Controllers/Routes)**
- `authController.js` - Login, Logout, Refresh Token
- `roomController.js` - CRUD operations สำหรับห้อง
- `bookingController.js` - CRUD operations สำหรับการจอง
- `userController.js` - จัดการข้อมูล user

**2. Business Logic Layer (Services)**
- `authService.js`
  - Validate credentials
  - Generate JWT tokens
  - Refresh token logic
  
- `roomService.js`
  - ตรวจสอบความว่างของห้อง
  - คำนวณ available time slots
  
- `bookingService.js`
  - Business rules: ห้ามจองซ้อนเวลา
  - Business rules: ห้ามจองย้อนหลัง
  - Business rules: ห้ามจองเกิน 30 วันล่วงหน้า
  - ส่ง email confirmation
  
- `emailService.js`
  - สร้าง email templates
  - เรียก SendGrid API

**3. Data Access Layer (Repositories)**
- `userRepository.js` - Database queries สำหรับ users
- `roomRepository.js` - Database queries สำหรับ rooms
- `bookingRepository.js` - Database queries สำหรับ bookings

**4. Middleware**
- `authMiddleware.js` - Verify JWT tokens
- `validationMiddleware.js` - Validate request body
- `errorMiddleware.js` - Handle errors globally

**5. Models**
- `User.js` - User entity model
- `Room.js` - Room entity model
- `Booking.js` - Booking entity model

**Data Flow Example (สร้างการจอง):**
```
1. POST /api/bookings
2. authMiddleware → ตรวจสอบ JWT
3. validationMiddleware → validate input
4. bookingController.create()
5. bookingService.createBooking()
   - ตรวจสอบห้องว่าง
   - ตรวจสอบ business rules
   - bookingRepository.create()
   - emailService.sendConfirmation()
6. Return response → Client
```

---

### 3.4 Deployment Diagram

**วัตถุประสงค์:** แสดงการ deploy ระบบบน infrastructure จริง

```
[Draw.io XML Code - Deployment Diagram]

แผนภาพแสดง:
- Production Environment (Cloud)
  - Load Balancer
  - Web Server instances (2)
  - Application Server instances (2)
  - Database Server (Primary + Replica)
- Development Environment (Local)
```

**คำอธิบาย:**

**Production Environment (AWS Cloud)**

**1. Client Layer**
- User's Web Browser
- Location: Internet
- Protocol: HTTPS (port 443)

**2. Load Balancer (AWS ALB)**
- Type: Application Load Balancer
- Purpose: 
  - กระจาย traffic ไปยัง web servers
  - SSL termination
  - Health checks

**3. Web Server Tier (EC2 instances)**
- Instances: 2 x t3.medium
- OS: Ubuntu 22.04 LTS
- Software:
  - Nginx (reverse proxy)
  - React build (static files)
- Auto Scaling: 2-4 instances based on CPU
- Availability: 2 Availability Zones

**4. Application Server Tier (EC2 instances)**
- Instances: 2 x t3.medium
- OS: Ubuntu 22.04 LTS
- Software:
  - Node.js 20
  - PM2 (process manager)
  - Backend API
- Auto Scaling: 2-6 instances based on requests/sec
- Availability: 2 Availability Zones

**5. Database Tier (RDS PostgreSQL)**
- Instance: db.t3.medium
- Storage: 100GB SSD
- Configuration:
  - Primary instance (writes)
  - Read replica (reads)
  - Automated backups (daily)
  - Multi-AZ deployment
  
**6. Supporting Services**
- AWS S3: Static assets (images, uploads)
- AWS CloudWatch: Monitoring และ logs
- AWS Route 53: DNS
- SendGrid: Email service (external)

**Network Configuration:**
- VPC: 10.0.0.0/16
- Public Subnets: Web servers (10.0.1.0/24, 10.0.2.0/24)
- Private Subnets: App servers + DB (10.0.10.0/24, 10.0.11.0/24)
- Security Groups:
  - Web SG: Allow 443 from internet
  - App SG: Allow 3000 from Web SG
  - DB SG: Allow 5432 from App SG

---

**Development Environment**

**Developer Workstation:**
- OS: Windows/Mac/Linux
- Docker Desktop
- Containers:
  - Frontend: React dev server (port 3000)
  - Backend: Node.js dev server (port 3001)
  - Database: PostgreSQL (port 5432)
  - Mailhog: Email testing (port 8025)

**CI/CD Pipeline (GitHub Actions):**
1. Push to GitHub
2. Run tests
3. Build Docker images
4. Push to AWS ECR
5. Deploy to staging
6. Manual approval
7. Deploy to production

---

## 4. Architecture Description

### 4.1 Architectural Drivers

**Functional Requirements (ความต้องการเชิงหน้าที่):**

1. **FR-1: User Authentication**
   - Users ต้องสามารถ login ด้วย email/password
   - ระบบต้องรองรับ role-based access (Employee, Admin)

2. **FR-2: Room Management**
   - Admin ต้องสามารถ CRUD ข้อมูลห้องประชุม
   - แสดงรายละเอียดห้อง (capacity, equipment, location)

3. **FR-3: Booking Management**
   - Users ต้องค้นหาห้องว่างตาม date/time
   - สร้างการจองได้
   - ดูการจองของตนเอง
   - ยกเลิกการจองได้ (ถ้ายังไม่เริ่มประชุม)

4. **FR-4: Calendar View**
   - แสดงปฏิทินการใช้งานห้องแต่ละห้อง
   - สามารถกรองตาม date range

5. **FR-5: Email Notifications**
   - ส่ง email confirmation เมื่อจองสำเร็จ
   - ส่ง reminder 30 นาทีก่อนประชุม

**Quality Attributes (คุณสมบัติเชิงคุณภาพ):**

1. **Performance**
   - Response time < 2 วินาทีสำหรับ 95% ของ requests
   - รองรับ 200 concurrent users
   - Database queries ต้องใช้ indexes

2. **Availability**
   - Uptime 99.5% (ยอมรับ downtime ~3.6 ชม/เดือน)
   - Graceful degradation เมื่อ email service ล่ม

3. **Security**
   - Authentication ด้วย JWT
   - HTTPS บังคับทุก requests
   - Input validation ทุก endpoints
   - SQL injection protection
   - XSS protection

4. **Usability**
   - ออกแบบตาม Material Design principles
   - Responsive สำหรับ mobile/tablet/desktop
   - เวลาเรียนรู้ < 30 นาทีสำหรับ basic tasks

5. **Maintainability**
   - Code coverage > 80%
   - Clear separation of concerns (Layered Architecture)
   - API documentation (OpenAPI/Swagger)
   - Logging และ monitoring

6. **Scalability**
   - Horizontal scaling สำหรับ web และ app tiers
   - Database read replicas สำหรับ read-heavy operations

**Constraints (ข้อจำกัด):**

1. **Technical Constraints:**
   - ต้องใช้ JavaScript ecosystem (Node.js + React)
   - Deploy บน AWS cloud
   - ใช้ PostgreSQL เป็น database

2. **Business Constraints:**
   - งบประมาณ development 3 เดือน
   - ทีมพัฒนา 4 คน (2 frontend, 2 backend)
   - ต้อง go-live ภายใน 4 เดือน

3. **Organizational Constraints:**
   - ต้องใช้ SendGrid สำหรับ emails (มี contract อยู่แล้ว)
   - ต้อง integrate กับ existing user directory (future)

---

### 4.2 Architectural Styles และ Patterns

**4.2.1 หลัก Architectural Style: Layered (3-Tier) Architecture**

**ทำไมเลือก:**
- เหมาะกับ web applications
- แยก concerns ชัดเจน
- ง่ายต่อการพัฒนาและ maintain
- ทีมคุ้นเคย

**Layers:**

```
┌─────────────────────────────────────┐
│   Presentation Layer (React)        │  ← User Interface
│   - Components                      │
│   - State Management                │
│   - API Integration                 │
└─────────────────────────────────────┘
              ↓ REST API
┌─────────────────────────────────────┐
│   Business Logic Layer (Node.js)    │  ← Application Logic
│   - Controllers (Routes)            │
│   - Services (Business Rules)       │
│   - Middleware (Auth, Validation)   │
└─────────────────────────────────────┘
              ↓ SQL Queries
┌─────────────────────────────────────┐
│   Data Access Layer                 │  ← Data Persistence
│   - Repositories                    │
│   - Database (PostgreSQL)           │
└─────────────────────────────────────┘
```

**Rules:**
- การสื่อสารเป็น top-down เท่านั้น
- แต่ละ layer ไม่รู้รายละเอียดของ layer ที่สูงกว่า
- Business logic อยู่ใน Service layer เท่านั้น

---

**4.2.2 Design Patterns ที่ใช้**

**1. Repository Pattern (Data Access Layer)**

**วัตถุประสงค์:** แยก business logic ออกจาก data access logic

**Implementation:**
```javascript
// bookingRepository.js
class BookingRepository {
    async findById(id) {
        const query = 'SELECT * FROM bookings WHERE id = $1';
        return await db.query(query, [id]);
    }
    
    async findByRoomAndDateRange(roomId, startDate, endDate) {
        const query = `
            SELECT * FROM bookings 
            WHERE room_id = $1 
            AND start_time >= $2 
            AND end_time <= $3
            AND status != 'CANCELLED'
        `;
        return await db.query(query, [roomId, startDate, endDate]);
    }
    
    async create(booking) {
        const query = `
            INSERT INTO bookings (room_id, user_id, start_time, end_time) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        return await db.query(query, [
            booking.roomId, 
            booking.userId, 
            booking.startTime, 
            booking.endTime
        ]);
    }
}
```

**ข้อดี:**
- Business logic ไม่ต้องรู้รายละเอียด SQL
- เปลี่ยน database ได้ง่าย (เปลี่ยนเฉพาะ repository)
- ทดสอบง่าย (mock repository ได้)

---

**2. Service Layer Pattern (Business Logic Layer)**

**วัตถุประสงค์:** รวม business logic ไว้ที่เดียว

**Implementation:**
```javascript
// bookingService.js
class BookingService {
    constructor(bookingRepo, roomRepo, emailService) {
        this.bookingRepo = bookingRepo;
        this.roomRepo = roomRepo;
        this.emailService = emailService;
    }
    
    async createBooking(userId, roomId, startTime, endTime) {
        // Business Rule 1: ไม่ให้จองย้อนหลัง
        if (new Date(startTime) < new Date()) {
            throw new Error('Cannot book in the past');
        }
        
        // Business Rule 2: ไม่ให้จองเกิน 30 วัน
        const maxDays = 30;
        const diffDays = (new Date(startTime) - new Date()) / (1000 * 60 * 60 * 24);
        if (diffDays > maxDays) {
            throw new Error('Cannot book more than 30 days in advance');
        }
        
        // Business Rule 3: ตรวจสอบความว่าง
        const existingBookings = await this.bookingRepo
            .findByRoomAndDateRange(roomId, startTime, endTime);
        
        if (existingBookings.length > 0) {
            throw new Error('Room is not available at this time');
        }
        
        // สร้างการจอง
        const booking = await this.bookingRepo.create({
            userId, roomId, startTime, endTime
        });
        
        // ส่ง email confirmation
        await this.emailService.sendBookingConfirmation(booking);
        
        return booking;
    }
}
```

**ข้อดี:**
- Business rules อยู่ที่เดียว
- Reusable (เรียกได้จากหลาย controllers)
- ทดสอบง่าย (unit test business logic)

---

**3. Middleware Pattern (Cross-cutting Concerns)**

**วัตถุประสงค์:** จัดการ concerns ที่ใช้ร่วมกัน

**Implementation:**
```javascript
// authMiddleware.js
const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// validationMiddleware.js
const validateBooking = (req, res, next) => {
    const { roomId, startTime, endTime } = req.body;
    
    if (!roomId || !startTime || !endTime) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (new Date(startTime) >= new Date(endTime)) {
        return res.status(400).json({ error: 'Invalid time range' });
    }
    
    next();
};

// Usage
app.post('/api/bookings', 
    authMiddleware,      // ตรวจสอบ authentication
    validateBooking,     // validate input
    bookingController.create  // ดำเนินการจริง
);
```

**ข้อดี:**
- DRY (Don't Repeat Yourself)
- Separation of concerns
- ลำดับการทำงานชัดเจน

---

**4. Dependency Injection Pattern**

**วัตถุประสงค์:** ลด coupling, ทำให้ test ง่าย

**Implementation:**
```javascript
// app.js (Dependency Injection Container)
const bookingRepo = new BookingRepository(db);
const roomRepo = new RoomRepository(db);
const emailService = new EmailService(sendGridClient);

const bookingService = new BookingService(
    bookingRepo, 
    roomRepo, 
    emailService
);

const bookingController = new BookingController(bookingService);

// routes
app.post('/api/bookings', bookingController.create);
```

**ข้อดี:**
- Mock dependencies ได้ง่ายในการ test
- เปลี่ยน implementation ได้โดยไม่แก้ code ที่ใช้
- ชัดเจนว่า class ต้องการอะไร

---

**5. DTO (Data Transfer Object) Pattern**

**วัตถุประสงค์:** แยก database schema ออกจาก API response

**Implementation:**
```javascript
// bookingDTO.js
class BookingDTO {
    static fromDatabase(dbBooking, room, user) {
        return {
            id: dbBooking.id,
            roomName: room.name,
            roomFloor: room.floor,
            userName: user.name,
            userEmail: user.email,
            startTime: dbBooking.start_time,
            endTime: dbBooking.end_time,
            status: dbBooking.status,
            createdAt: dbBooking.created_at
        };
    }
}

// Usage in controller
const booking = await bookingService.getById(id);
res.json(BookingDTO.fromDatabase(booking, room, user));
```

**ข้อดี:**
- API response ไม่ผูกติดกับ database schema
- ซ่อนข้อมูลที่ไม่ควรส่งไป client
- เปลี่ยน database ได้โดย API ไม่เสีย

---

### 4.3 Trade-offs และความเสี่ยง

**Trade-off 1: Layered Architecture vs Microservices**

| ด้าน | Layered (เลือกใช้) | Microservices |
|------|-------------------|---------------|
| Complexity | ต่ำ ✅ | สูง ❌ |
| Development Speed | เร็ว ✅ | ช้า ❌ |
| Deployment | ง่าย ✅ | ซับซ้อน ❌ |
| Scalability | Limited ⚠️ | ดีมาก ✅ |
| Independent Deploy | ไม่ได้ ❌ | ได้ ✅ |
| Team Size Required | เล็ก ✅ | ใหญ่ ❌ |

**สรุป:** เลือก Layered เพราะ:
- ระบบขนาดเล็ก-กลาง
- ทีมเล็ก (4 คน)
- ต้องการ time-to-market เร็ว
- ถ้าระบบโตมาก สามารถ refactor เป็น microservices ได้ทีหลัง

---

**Trade-off 2: JWT vs Session-based Authentication**

| ด้าน | JWT (เลือกใช้) | Session |
|------|----------------|---------|
| Stateless | ใช่ ✅ | ไม่ ❌ |
| Scalability | ดี ✅ | ต้อง share session store ⚠️ |
| Revocation | ยาก ⚠️ | ง่าย ✅ |
| Token Size | ใหญ่ ⚠️ | เล็ก (session ID) ✅ |
| CSRF | ป้องกันได้ง่าย ✅ | ต้องมี CSRF token ⚠️ |

**สรุป:** เลือก JWT เพราะ:
- ต้องการ scalability (เพิ่ม server ได้โดยไม่ต้อง share state)
- ระบบไม่มีความต้องการ instant revocation สูง
- แก้ปัญหา revocation ด้วย short-lived access tokens (1 ชม)

---

**Trade-off 3: PostgreSQL vs MongoDB**

| ด้าน | PostgreSQL (เลือกใช้) | MongoDB |
|------|----------------------|---------|
| Data Structure | Structured ✅ | Flexible ✅ |
| ACID | เต็มรูปแบบ ✅ | Limited ⚠️ |
| Joins | ดี ✅ | ต้อง denormalize ⚠️ |
| Schema Changes | ต้อง migration ⚠️ | ยืดหยุ่น ✅ |
| Complex Queries | ดี ✅ | ต้องใช้ aggregation ⚠️ |

**สรุป:** เลือก PostgreSQL เพราะ:
- ข้อมูลมี relationships ชัดเจน (users ↔ bookings ↔ rooms)
- ต้องการ ACID transactions
- ไม่คาดว่า schema จะเปลี่ยนบ่อย
- ทีมคุ้นเคยกับ SQL

---

**ความเสี่ยงและการจัดการ:**

**Risk 1: Scalability Bottleneck at Database**

- **Likelihood:** Medium
- **Impact:** High
- **Mitigation:**
  - ใช้ database indexes อย่างเหมาะสม
  - ใช้ connection pooling
  - เตรียม read replicas สำหรับ read-heavy queries
  - Monitor slow queries และ optimize
  - ถ้าจำเป็น: implement caching layer (Redis)

**Risk 2: Email Service Dependency**

- **Likelihood:** Low
- **Impact:** Medium
- **Mitigation:**
  - Implement retry logic with exponential backoff
  - Store failed emails ใน queue
  - Graceful degradation (booking ยังสำเร็จแม้ email ล้ม)
  - Monitor SendGrid status dashboard

**Risk 3: Concurrent Booking Conflicts**

- **Likelihood:** Medium
- **Impact:** High (จองซ้อน)
- **Mitigation:**
  - ใช้ database transactions
  - Implement optimistic locking
  - Lock row เวลา check availability และ create booking
  - Add unique constraint: (room_id, time_range) ใน database

**Risk 4: Security Vulnerabilities**

- **Likelihood:** Medium
- **Impact:** High
- **Mitigation:**
  - Regular security updates (dependencies)
  - Input validation และ sanitization
  - SQL injection protection (parameterized queries)
  - HTTPS บังคับ
  - Security headers (helmet.js)
  - Regular penetration testing

---

## 5. Implementation Guidelines

### 5.1 Coding Standards

**5.1.1 General Principles**

1. **SOLID Principles**
   - Single Responsibility: แต่ละ class/function มีหน้าที่เดียว
   - Open/Closed: เปิดรับการ extend, ปิดการแก้ไข
   - Liskov Substitution: subclass ใช้แทน parent ได้
   - Interface Segregation: แยก interfaces ตาม client
   - Dependency Inversion: ขึ้นกับ abstractions ไม่ใช่ concrete

2. **DRY (Don't Repeat Yourself)**
   - Extract repeated code เป็น functions/classes
   - ใช้ configuration files แทน hardcode

3. **KISS (Keep It Simple, Stupid)**
   - เลือกวิธีที่ง่ายที่สุดที่ทำงานได้
   - หลีกเลี่ยง premature optimization

---

**5.1.2 JavaScript/Node.js Standards**

**Naming Conventions:**
```javascript
// ✅ ถูกต้อง
const userName = 'John';                    // camelCase สำหรับ variables
const MAX_RETRIES = 3;                      // UPPER_CASE สำหรับ constants
class BookingService { }                     // PascalCase สำหรับ classes
function calculateTotalHours() { }           // camelCase สำหรับ functions
const bookingRepository = require('./repositories/bookingRepository');

// ❌ ผิด
const username = 'John';                     // ไม่ชัดเจน
const max_retries = 3;                       // snake_case (ไม่ใช้ใน JS)
class bookingservice { }                     // ไม่ใช้ PascalCase
function CalculateTotalHours() { }           // PascalCase ใช้กับ class เท่านั้น
```

**File Structure:**
```
src/
├── controllers/        # API endpoints
│   ├── authController.js
│   ├── bookingController.js
│   └── roomController.js
├── services/          # Business logic
│   ├── authService.js
│   ├── bookingService.js
│   └── emailService.js
├── repositories/      # Data access
│   ├── userRepository.js
│   ├── roomRepository.js
│   └── bookingRepository.js
├── models/           # Data models
│   ├── User.js
│   ├── Room.js
│   └── Booking.js
├── middleware/       # Express middleware
│   ├── authMiddleware.js
│   ├── validationMiddleware.js
│   └── errorMiddleware.js
├── utils/           # Helper functions
│   ├── logger.js
│   └── dateUtils.js
├── config/          # Configuration
│   ├── database.js
│   └── app.js
└── app.js          # Entry point
```

**Code Style:**
```javascript
// ✅ ดี: ใช้ async/await แทน callbacks
async function createBooking(bookingData) {
    try {
        const booking = await bookingRepository.create(bookingData);
        await emailService.sendConfirmation(booking);
        return booking;
    } catch (error) {
        logger.error('Failed to create booking:', error);
        throw error;
    }
}

// ❌ เลี่ยง: callback hell
function createBooking(bookingData, callback) {
    bookingRepository.create(bookingData, (err, booking) => {
        if (err) return callback(err);
        emailService.sendConfirmation(booking, (err) => {
            if (err) return callback(err);
            callback(null, booking);
        });
    });
}

// ✅ ดี: Error handling ชัดเจน
if (!roomId) {
    throw new ValidationError('Room ID is required');
}

// ✅ ดี: Early returns
function validateBooking(booking) {
    if (!booking.roomId) {
        throw new Error('Room ID required');
    }
    
    if (!booking.startTime) {
        throw new Error('Start time required');
    }
    
    // ... ดำเนินการต่อ
}

// ❌ เลี่ยง: Nested ifs
function validateBooking(booking) {
    if (booking.roomId) {
        if (booking.startTime) {
            if (booking.endTime) {
                // ... ดำเนินการ
            }
        }
    }
}
```

**Comments:**
```javascript
// ✅ ดี: อธิบายทำไม ไม่ใช่ทำอะไร
// ใช้ exponential backoff เพราะ SendGrid มี rate limit
const delay = Math.pow(2, retryCount) * 1000;

// ❌ ไม่จำเป็น: อธิบายสิ่งที่โค้ดบอกอยู่แล้ว
// เพิ่มค่า count ขึ้น 1
count = count + 1;

// ✅ ดี: JSDoc สำหรับ functions
/**
 * สร้างการจองห้องประชุม
 * @param {number} userId - ID ของผู้ใช้
 * @param {number} roomId - ID ของห้อง
 * @param {Date} startTime - เวลาเริ่ม
 * @param {Date} endTime - เวลาสิ้นสุด
 * @returns {Promise<Booking>} การจองที่สร้างแล้ว
 * @throws {ValidationError} ถ้าข้อมูลไม่ถูกต้อง
 * @throws {ConflictError} ถ้าห้องไม่ว่าง
 */
async function createBooking(userId, roomId, startTime, endTime) {
    // ...
}
```

---

**5.1.3 React/Frontend Standards**

**Component Structure:**
```javascript
// ✅ ดี: Functional components + hooks
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

function BookingForm({ roomId, onSuccess }) {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await api.createBooking({ roomId, startTime, endTime });
            onSuccess();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {/* form fields */}
        </form>
    );
}

export default BookingForm;
```

**File Naming:**
```
src/
├── components/
│   ├── BookingForm.jsx        # PascalCase สำหรับ components
│   ├── RoomCard.jsx
│   └── Calendar.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── BookingsPage.jsx
│   └── RoomsPage.jsx
├── hooks/
│   ├── useAuth.js            # camelCase + 'use' prefix
│   └── useBookings.js
├── utils/
│   ├── api.js                # camelCase สำหรับ utilities
│   └── dateFormatter.js
└── styles/
    └── theme.js
```

**State Management:**
```javascript
// ✅ ดี: Custom hooks สำหรับ reusable logic
function useBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await api.getMyBookings();
            setBookings(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchBookings();
    }, []);
    
    return { bookings, loading, error, refetch: fetchBookings };
}

// Usage
function MyBookingsPage() {
    const { bookings, loading, error } = useBookings();
    
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage message={error} />;
    
    return <BookingList bookings={bookings} />;
}
```

---

**5.1.4 Database Standards**

**Naming Conventions:**
```sql
-- Tables: plural, snake_case
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL DEFAULT 'employee',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    floor INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    equipment TEXT[],  -- Array ของอุปกรณ์
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    room_id INTEGER NOT NULL REFERENCES rooms(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT valid_time_range CHECK (end_time > start_time),
    CONSTRAINT no_overlapping_bookings UNIQUE (room_id, start_time, end_time)
);

-- Indexes
CREATE INDEX idx_bookings_room_time ON bookings(room_id, start_time, end_time);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
```

**Migration Files:**
```javascript
// migrations/001_create_users_table.js
exports.up = async (db) => {
    await db.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            full_name VARCHAR(255),
            role VARCHAR(50) NOT NULL DEFAULT 'employee',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

exports.down = async (db) => {
    await db.query('DROP TABLE users');
};
```

---

### 5.2 Deployment Procedures

**5.2.1 Environment Setup**

**Development:**
```bash
# Clone repository
git clone https://github.com/company/meeting-room-booking.git
cd meeting-room-booking

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# แก้ไข .env ตามต้องการ

# Setup database
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

**Environment Variables (.env):**
```bash
# Application
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=meeting_room_dev
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

# Email
SENDGRID_API_KEY=your-sendgrid-key
EMAIL_FROM=noreply@company.com

# Logging
LOG_LEVEL=debug
```

---

**5.2.2 Build Process**

**Frontend Build:**
```bash
cd frontend

# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build

# Output: build/ directory with static files
```

**Backend Build:**
```bash
cd backend

# Install dependencies (production only)
npm install --production

# Run tests
npm test

# Build (if using TypeScript)
npm run build

# Output: dist/ directory
```

---

**5.2.3 Deployment Steps**

**Manual Deployment to AWS:**

```bash
#!/bin/bash
# deploy.sh

# 1. Build frontend
cd frontend
npm run build

# 2. Upload frontend to S3
aws s3 sync build/ s3://meeting-room-app-frontend/

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation \
    --distribution-id E1234567890 \
    --paths "/*"

# 4. Build and push backend Docker image
cd ../backend
docker build -t meeting-room-api:latest .
docker tag meeting-room-api:latest \
    123456789.dkr.ecr.us-east-1.amazonaws.com/meeting-room-api:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/meeting-room-api:latest

# 5. Update ECS service
aws ecs update-service \
    --cluster meeting-room-cluster \
    --service meeting-room-api-service \
    --force-new-deployment

# 6. Run database migrations
npm run db:migrate

echo "Deployment complete!"
```

**CI/CD with GitHub Actions:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build frontend
        run: |
          cd frontend
          npm install
          npm run build
      
      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: 'frontend/build'
      
      - name: Build and push Docker image
        run: |
          docker build -t meeting-room-api:${{ github.sha }} .
          docker push meeting-room-api:${{ github.sha }}
      
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster meeting-room-cluster \
            --service meeting-room-api \
            --force-new-deployment
```

---

**5.2.4 Rollback Procedure**

**กรณีที่ deployment ล้มเหลว:**

```bash
# 1. Identify last working version
git log --oneline

# 2. Rollback code
git revert <commit-hash>
git push origin main

# 3. Rollback database (ถ้ามี migrations)
npm run db:rollback

# 4. Rollback ECS service
aws ecs update-service \
    --cluster meeting-room-cluster \
    --service meeting-room-api \
    --task-definition meeting-room-api:previous-version

# 5. Verify rollback
curl https://api.company.com/health
```

**Database Rollback:**
```bash
# ดู migrations ที่รันแล้ว
npm run db:migrate:status

# Rollback migration ล่าสุด
npm run db:migrate:undo

# Rollback หลาย migrations
npm run db:migrate:undo --count 3
```

---

### 5.3 Testing Strategies

**5.3.1 Testing Pyramid**

```
         /\
        /  \         E2E Tests (10%)
       /────\        - User flows
      /      \       - Critical paths
     /────────\      
    /          \     Integration Tests (30%)
   /────────────\    - API endpoints
  /              \   - Database interactions
 /────────────────\  
/                  \ Unit Tests (60%)
────────────────────  - Functions, classes
                      - Business logic
```

**Coverage Goals:**
- Overall code coverage: > 80%
- Unit tests: > 90% (business logic)
- Integration tests: > 70% (API endpoints)
- E2E tests: Critical user flows only

---

**5.3.2 Unit Tests**

**Backend Unit Tests (Jest):**

```javascript
// bookingService.test.js
const BookingService = require('../services/bookingService');

describe('BookingService', () => {
    let bookingService;
    let mockBookingRepo;
    let mockEmailService;
    
    beforeEach(() => {
        // Setup mocks
        mockBookingRepo = {
            create: jest.fn(),
            findByRoomAndDateRange: jest.fn()
        };
        
        mockEmailService = {
            sendBookingConfirmation: jest.fn()
        };
        
        bookingService = new BookingService(
            mockBookingRepo,
            mockEmailService
        );
    });
    
    describe('createBooking', () => {
        it('should create booking when room is available', async () => {
            // Arrange
            const bookingData = {
                userId: 1,
                roomId: 1,
                startTime: new Date('2025-01-10T09:00:00'),
                endTime: new Date('2025-01-10T10:00:00')
            };
            
            mockBookingRepo.findByRoomAndDateRange.mockResolvedValue([]);
            mockBookingRepo.create.mockResolvedValue({ id: 1, ...bookingData });
            
            // Act
            const result = await bookingService.createBooking(bookingData);
            
            // Assert
            expect(result).toBeDefined();
            expect(mockBookingRepo.create).toHaveBeenCalledWith(bookingData);
            expect(mockEmailService.sendBookingConfirmation).toHaveBeenCalled();
        });
        
        it('should throw error when booking in the past', async () => {
            // Arrange
            const pastDate = new Date('2020-01-01T09:00:00');
            const bookingData = {
                userId: 1,
                roomId: 1,
                startTime: pastDate,
                endTime: new Date('2020-01-01T10:00:00')
            };
            
            // Act & Assert
            await expect(
                bookingService.createBooking(bookingData)
            ).rejects.toThrow('Cannot book in the past');
        });
        
        it('should throw error when room is not available', async () => {
            // Arrange
            const bookingData = {
                userId: 1,
                roomId: 1,
                startTime: new Date('2025-01-10T09:00:00'),
                endTime: new Date('2025-01-10T10:00:00')
            };
            
            // Mock existing booking
            mockBookingRepo.findByRoomAndDateRange.mockResolvedValue([
                { id: 999, roomId: 1, startTime: bookingData.startTime }
            ]);
            
            // Act & Assert
            await expect(
                bookingService.createBooking(bookingData)
            ).rejects.toThrow('Room is not available');
        });
    });
});
```

**Running Tests:**
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific file
npm test -- bookingService.test.js

# Run in watch mode
npm test -- --watch
```

---

**5.3.3 Integration Tests**

**API Integration Tests:**

```javascript
// api/bookings.integration.test.js
const request = require('supertest');
const app = require('../app');
const db = require('../config/database');

describe('Bookings API', () => {
    let authToken;
    let testUser;
    let testRoom;
    
    beforeAll(async () => {
        // Setup test database
        await db.migrate.latest();
        await db.seed.run();
        
        // Create test user and get token
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@company.com', password: 'test123' });
        
        authToken = response.body.token;
        testUser = response.body.user;
        
        // Get test room
        const roomResponse = await request(app)
            .get('/api/rooms')
            .set('Authorization', `Bearer ${authToken}`);
        
        testRoom = roomResponse.body.data[0];
    });
    
    afterAll(async () => {
        await db.destroy();
    });
    
    describe('POST /api/bookings', () => {
        it('should create booking successfully', async () => {
            const bookingData = {
                roomId: testRoom.id,
                startTime: '2025-01-10T09:00:00Z',
                endTime: '2025-01-10T10:00:00Z'
            };
            
            const response = await request(app)
                .post('/api/bookings')
                .set('Authorization', `Bearer ${authToken}`)
                .send(bookingData)
                .expect(201);
            
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.roomId).toBe(testRoom.id);
        });
        
        it('should return 401 without authentication', async () => {
            const bookingData = {
                roomId: testRoom.id,
                startTime: '2025-01-10T09:00:00Z',
                endTime: '2025-01-10T10:00:00Z'
            };
            
            await request(app)
                .post('/api/bookings')
                .send(bookingData)
                .expect(401);
        });
        
        it('should return 400 for invalid data', async () => {
            const invalidData = {
                roomId: testRoom.id,
                // missing startTime and endTime
            };
            
            const response = await request(app)
                .post('/api/bookings')
                .set('Authorization', `Bearer ${authToken}`)
                .send(invalidData)
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBeDefined();
        });
    });
});
```

---

**5.3.4 E2E Tests (Cypress)**

```javascript
// cypress/e2e/booking-flow.cy.js
describe('Booking Flow', () => {
    beforeEach(() => {
        // Login before each test
        cy.visit('/login');
        cy.get('[data-testid="email"]').type('test@company.com');
        cy.get('[data-testid="password"]').type('test123');
        cy.get('[data-testid="login-btn"]').click();
        
        cy.url().should('include', '/dashboard');
    });
    
    it('should complete full booking flow', () => {
        // 1. Navigate to rooms page
        cy.get('[data-testid="nav-rooms"]').click();
        cy.url().should('include', '/rooms');
        
        // 2. Select a room
        cy.get('[data-testid="room-card"]').first().click();
        
        // 3. Select date and time
        cy.get('[data-testid="date-picker"]').click();
        cy.get('.MuiPickersDay-today').click();
        
        cy.get('[data-testid="start-time"]').type('09:00');
        cy.get('[data-testid="end-time"]').type('10:00');
        
        // 4. Submit booking
        cy.get('[data-testid="book-btn"]').click();
        
        // 5. Verify success
        cy.get('[data-testid="success-message"]')
            .should('be.visible')
            .and('contain', 'Booking confirmed');
        
        // 6. Verify booking appears in my bookings
        cy.get('[data-testid="nav-my-bookings"]').click();
        cy.get('[data-testid="booking-list"]')
            .should('contain', '09:00')
            .and('contain', '10:00');
    });
    
    it('should prevent double booking', () => {
        // Create first booking
        cy.createBooking({
            roomId: 1,
            date: '2025-01-10',
            startTime: '09:00',
            endTime: '10:00'
        });
        
        // Try to create conflicting booking
        cy.visit('/rooms/1');
        cy.get('[data-testid="date-picker"]').click();
        cy.contains('10').click(); // January 10
        
        cy.get('[data-testid="start-time"]').type('09:30');
        cy.get('[data-testid="end-time"]').type('10:30');
        cy.get('[data-testid="book-btn"]').click();
        
        // Verify error message
        cy.get('[data-testid="error-message"]')
            .should('be.visible')
            .and('contain', 'not available');
    });
});
```

**Running E2E Tests:**
```bash
# Run in headless mode
npm run cypress:run

# Open Cypress GUI
npm run cypress:open

# Run specific test
npm run cypress:run -- --spec "cypress/e2e/booking-flow.cy.js"
```

---

**5.3.5 Performance Tests**

**Load Testing with Artillery:**

```yaml
# load-test.yml
config:
  target: "https://api.company.com"
  phases:
    - duration: 60
      arrivalRate: 5  # 5 users/sec
      name: "Warm up"
    - duration: 120
      arrivalRate: 20 # 20 users/sec
      name: "Sustained load"
    - duration: 60
      arrivalRate: 50 # 50 users/sec
      name: "Stress test"

scenarios:
  - name: "Browse and book room"
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "test{{ $randomNumber() }}@company.com"
            password: "test123"
          capture:
            - json: "$.token"
              as: "token"
      
      - get:
          url: "/api/rooms"
          headers:
            Authorization: "Bearer {{ token }}"
      
      - get:
          url: "/api/rooms/1/availability"
          qs:
            date: "2025-01-10"
          headers:
            Authorization: "Bearer {{ token }}"
      
      - post:
          url: "/api/bookings"
          headers:
            Authorization: "Bearer {{ token }}"
          json:
            roomId: 1
            startTime: "2025-01-10T{{ $randomNumber(9, 17) }}:00:00"
            endTime: "2025-01-10T{{ $randomNumber(10, 18) }}:00:00"
```

**Running Performance Tests:**
```bash
# Run load test
artillery run load-test.yml

# Generate HTML report
artillery run --output report.json load-test.yml
artillery report report.json
```

**Performance Metrics to Monitor:**
- Response time (p95, p99)
- Requests per second
- Error rate
- CPU usage
- Memory usage
- Database connections

---

## 6. Quality Attributes

### 6.1 Performance Requirements

**Response Times:**
| Operation | Target | Maximum |
|-----------|--------|---------|
| Page Load | < 1s | 2s |
| API Calls | < 500ms | 1s |
| Database Queries | < 100ms | 300ms |
| Search Results | < 1s | 2s |

**Throughput:**
- Support 200 concurrent users
- Handle 1000 requests/minute
- Process 500 bookings/day

**Optimization Strategies:**
- Database indexing on frequently queried fields
- Connection pooling (max 20 connections)
- Frontend code splitting
- Image optimization
- CDN for static assets
- Caching frequently accessed data (Redis)

---

### 6.2 Security Requirements

**Authentication & Authorization:**
- JWT with RS256 algorithm
- Access tokens expire in 1 hour
- Refresh tokens expire in 7 days
- Role-based access control (RBAC)

**Data Protection:**
- HTTPS only (TLS 1.2+)
- Password hashing with bcrypt (cost factor 12)
- SQL injection prevention (parameterized queries)
- XSS protection (input sanitization)
- CSRF protection (SameSite cookies)

**Security Headers:**
```javascript
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"]
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true
    }
}));
```

**Audit Logging:**
- Log all booking creations/cancellations
- Log authentication attempts
- Log admin actions
- Retain logs for 90 days

---

### 6.3 Availability Requirements

**Uptime:**
- Target: 99.5% uptime
- Allowed downtime: ~3.6 hours/month
- Planned maintenance: weekends only

**Backup Strategy:**
- Database backups: Daily (retained 30 days)
- Point-in-time recovery: 7 days
- Backup testing: Monthly

**Disaster Recovery:**
- RTO (Recovery Time Objective): 4 hours
- RPO (Recovery Point Objective): 1 hour
- Multi-AZ deployment for high availability

---

### 6.4 Maintainability Requirements

**Code Quality:**
- Code coverage > 80%
- No critical code smells (SonarQube)
- Max cyclomatic complexity: 10
- Follow ESLint rules

**Documentation:**
- API documentation (OpenAPI/Swagger)
- Architecture diagrams (C4 model)
- README for each module
- Inline comments for complex logic

**Monitoring:**
- Application monitoring (CloudWatch)
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Uptime monitoring (Pingdom)

---

## 7. Risks and Technical Debt

### 7.1 Known Technical Debt

**TD-1: No Caching Layer**
- **Impact:** Database queries เยอะเกินไป
- **Plan:** Implement Redis สำหรับ cache room availability
- **Timeline:** Phase 2 (Month 6)

**TD-2: Monolithic Deployment**
- **Impact:** ไม่สามารถ scale แยกส่วนได้
- **Plan:** Refactor เป็น microservices ถ้า traffic เพิ่ม 10x
- **Timeline:** Phase 3 (Month 12) ถ้าจำเป็น

**TD-3: No Real-time Updates**
- **Impact:** Users ไม่เห็นการจองของคนอื่น real-time
- **Plan:** Implement WebSocket สำหรับ real-time calendar
- **Timeline:** Phase 2 (Month 6)

**TD-4: Limited Mobile Experience**
- **Impact:** Mobile UX ไม่ optimize
- **Plan:** Develop React Native app
- **Timeline:** Phase 3 (Month 9)

---

### 7.2 Risks

**R-1: Database Scalability**
- **Probability:** Medium
- **Impact:** High
- **Mitigation:** 
  - Monitor query performance
  - Implement read replicas
  - Add indexes as needed
  
**R-2: Third-party Service Dependencies**
- **Probability:** Low
- **Impact:** Medium
- **Mitigation:**
  - Implement retry logic
  - Have fallback email provider
  - Monitor service status

**R-3: Security Vulnerabilities**
- **Probability:** Medium
- **Impact:** High
- **Mitigation:**
  - Regular security audits
  - Dependency updates
  - Penetration testing

---

## 8. Appendix

### 8.1 Glossary

- **Booking:** การจองห้องประชุม
- **Room:** ห้องประชุม
- **Availability:** ความว่างของห้อง
- **Time Slot:** ช่วงเวลาที่สามารถจองได้
- **Conflict:** การจองซ้อนกัน

### 8.2 References

- **C4 Model:** https://c4model.com/
- **Architecture Decision Records:** https://adr.github.io/
- **REST API Design:** https://restfulapi.net/
- **PostgreSQL Documentation:** https://www.postgresql.org/docs/

### 8.3 Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-01-06 | Initial version | ENGSE207 Team |

---

**Document Status:** ✅ Approved for Teaching  
**Next Review:** 2025-02-01

---

**หมายเหตุสำหรับนักศึกษา:**

เอกสารนี้เป็นตัวอย่างของ Software Architecture Documentation ที่สมบูรณ์ ครอบคลุมทั้ง:
- ✅ Architecture Decisions (ADR) พร้อมเหตุผล
- ✅ Architecture Diagrams (C4 Model) ทั้ง 4 levels
- ✅ Architecture Description พร้อม trade-offs
- ✅ Implementation Guidelines ที่ใช้งานได้จริง

ในโปรเจกต์จริง นักศึกษาควร:
1. ปรับเนื้อหาให้เหมาะกับระบบของตนเอง
2. เพิ่ม diagrams จริงด้วย draw.io
3. อัพเดท documentation เมื่อมีการเปลี่ยนแปลง
4. ใช้เป็น living document ไม่ใช่เขียนครั้งเดียวแล้วทิ้ง

**สิ่งสำคัญ:** Documentation ต้องมีประโยชน์ ไม่ใช่แค่ทำเพื่อส่ง!
