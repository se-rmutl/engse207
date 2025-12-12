# ENGSE207 Software Architecture
## สัปดาห์ที่ 4: Architectural Styles & Patterns (2)
### Microservices, Event-Driven, Service-Oriented, Serverless

---

**อาจารย์ผู้สอน:** นายธนิต เกตุแก้ว  
**หลักสูตร:** วิศวกรรมซอฟต์แวร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา  
**ระยะเวลา:** 2 ชั่วโมงบรรยาย + 3 ชั่วโมง Workshop  
**ปีการศึกษา:** 2568

---

## 📋 สารบัญ

1. [ทบทวนสัปดาห์ที่แล้ว](#review)
2. [1.1 Microservices Architecture](#microservices)
3. [1.2 Event-Driven Architecture](#event-driven)
4. [1.3 Service-Oriented Architecture (SOA)](#soa)
5. [1.4 Serverless Architecture](#serverless)
6. [การเปรียบเทียบและเลือกใช้](#comparison)
7. [สรุปและเตรียมพร้อมสัปดาห์หน้า](#summary)

---

## <a id="review"></a>🔄 ทบทวนสัปดาห์ที่แล้ว

### สิ่งที่เราได้เรียนรู้ในสัปดาห์ที่ 3

ในสัปดาห์ที่แล้ว เราได้เรียนรู้เกี่ยวกับ **Architectural Styles & Patterns พื้นฐาน** 5 รูปแบบ:

1. **Monolithic Architecture** 🏢
   - ทุก components รวมอยู่ใน codebase เดียว
   - Deploy เป็นหน่วยเดียว
   - **ข้อดี**: ง่าย เร็ว เหมาะกับโปรเจกต์เล็ก
   - **ข้อเสีย**: ยาก Scale, Maintainability ต่ำเมื่อโตขึ้น

2. **Layered (N-Layer) Architecture** 📚
   - แบ่งระบบเป็นชั้นๆ ตามหน้าที่
   - Presentation → Business Logic → Data Access
   - **ข้อดี**: Separation of Concerns ดี, Maintainable
   - **ข้อเสีย**: Performance อาจลดลงจากการผ่านหลาย layers

3. **Client-Server Architecture** 🖥️↔️💻
   - แยกระหว่างผู้ใช้ (Client) กับเซิร์ฟเวอร์ (Server)
   - Client ขอข้อมูล → Server ประมวลผลและส่งกลับ

4. **N-Tier Architecture** 🏗️
   - ขยายจาก 2-tier เป็น 3-tier หรือมากกว่า
   - แยก physical deployment ของแต่ละ tier
   - **ข้อดี**: Highly Scalable
   - **ข้อเสีย**: Complex, Network Latency

5. **Pipe-and-Filter Architecture** 🚰
   - ประมวลผลข้อมูลแบบท่อและฟิลเตอร์
   - Data → Filter 1 → Filter 2 → Filter N → Output
   - เหมาะกับงานประมวลผลข้อมูลแบบ batch

### 🤔 คำถามสำคัญจากสัปดาห์ที่แล้ว

**Q: เมื่อไหร่ควรเปลี่ยนจาก Monolithic เป็น Layered?**  
A: เมื่อทีมโตขึ้น, โค้ดซับซ้อนขึ้น, ต้องการ maintainability ที่ดีขึ้น

**Q: Monolithic กับ Layered แตกต่างกันอย่างไร?**  
A: Monolithic = ลักษณะการ deploy (ก้อนเดียว)  
   Layered = ลักษณะการจัดโครงสร้างโค้ด (แบ่งเป็นชั้น)  
   **สามารถใช้ร่วมกันได้!** → Monolithic + Layered

### 🎯 สัปดาห์นี้: สถาปัตยกรรมสมัยใหม่

วันนี้เราจะเรียนรู้ **Architectural Styles ที่ทันสมัย** ซึ่งถูกใช้กันอย่างแพร่หลายในระบบ Cloud-Native และ Distributed Systems:

- ✅ Microservices Architecture
- ✅ Event-Driven Architecture  
- ✅ Service-Oriented Architecture (SOA)
- ✅ Serverless Architecture

**ทำไมต้องเรียนรู้?**
- บริษัทเทคโนโลยีใหญ่ๆ เช่น Netflix, Uber, Grab, LINE ใช้สถาปัตยกรรมเหล่านี้
- รองรับระบบขนาดใหญ่ที่มีผู้ใช้หลายล้านคน
- Scale ได้ดี มีความยืดหยุ่นสูง
- แต่มี **Trade-offs** ที่ต้องเข้าใจ!

---

## <a id="microservices"></a>1.1 Microservices Architecture

### 📘 ชื่อบทเรียน 1.1: Microservices Architecture - สถาปัตยกรรมแบบแยกส่วนอิสระ

### 🎯 วัตถุประสงค์การสอน

**1.1.1 ให้นักศึกษาเข้าใจแนวคิดและหลักการของ Microservices Architecture** 
- อธิบายคำนิยามและลักษณะสำคัญของ Microservices ได้
- เปรียบเทียบความแตกต่างระหว่าง Monolithic และ Microservices
- ระบุองค์ประกอบหลักของ Microservices Architecture (API Gateway, Service Discovery, etc.)

**1.1.2 ให้นักศึกษาสามารถวิเคราะห์และประเมินความเหมาะสมในการใช้ Microservices**
- วิเคราะห์ข้อดีและข้อเสียของ Microservices
- ระบุสถานการณ์ที่เหมาะสมและไม่เหมาะสมกับการใช้ Microservices
- เข้าใจ Trade-offs ที่สำคัญในการตัดสินใจเลือกใช้ Microservices

---

### 💡 คำนิยาม

**Microservices Architecture** คือสถาปัตยกรรมที่แบ่งแอปพลิเคชันออกเป็น **บริการเล็กๆ (services) ที่อิสระต่อกัน** โดยแต่ละบริการ:

- 🎯 **มีหน้าที่เฉพาะ (Single Responsibility)** - ทำงานเฉพาะด้าน
- 🔧 **Deploy อิสระ (Independently Deployable)** - สามารถ deploy แยกกันได้
- 💾 **มีฐานข้อมูลของตัวเอง (Own Database)** - ไม่แชร์ database กับ service อื่น
- 🔌 **สื่อสารผ่าน API (Communicate via APIs)** - ใช้ REST API, gRPC, Message Queue
- 👥 **ดูแลโดยทีมเล็กๆ (Small Team Ownership)** - "Two Pizza Team" (8-12 คน)

### 🏗️ ลักษณะสำคัญของ Microservices

```
┌──────────────────────────────────────────────────────────────┐
│              MICROSERVICES ARCHITECTURE                      │
└──────────────────────────────────────────────────────────────┘

                    [Client/User]
                          │
                          ▼
              ┌────────────────────┐
              │   API Gateway      │ ← จุดเข้าเดียว (Single Entry Point)
              │  (Kong, Nginx)     │
              └─────────┬──────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
  ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ User     │    │ Order    │    │ Payment  │
  │ Service  │    │ Service  │    │ Service  │
  │          │    │          │    │          │
  │   [DB1]  │    │   [DB2]  │    │   [DB3]  │
  └────┬─────┘    └────┬─────┘    └────┬─────┘
       │               │               │
       └───────────────┴───────────────┘
                       │
              ┌────────▼─────────┐
              │  Message Bus     │ ← Event Communication
              │ (Kafka, RabbitMQ)│
              └──────────────────┘
```

### 🎨 Text Infographic: องค์ประกอบหลักของ Microservices

```
╔═══════════════════════════════════════════════════════════╗
║         MICROSERVICES KEY COMPONENTS                      ║
╚═══════════════════════════════════════════════════════════╝

1️⃣  API GATEWAY (ประตูเข้า)
    ┌─────────────────────────────────────┐
    │ • Single Entry Point                │
    │ • Routing                           │
    │ • Authentication/Authorization      │
    │ • Rate Limiting                     │
    │ • Load Balancing                    │
    └─────────────────────────────────────┘
    ตัวอย่าง: Kong, AWS API Gateway, Nginx

2️⃣  SERVICE REGISTRY & DISCOVERY (ค้นหาบริการ)
    ┌─────────────────────────────────────┐
    │ • Service เมื่อเริ่มทำงาน               │
    │   → ลงทะเบียนตัวเอง                   │
    │ • Service อื่นๆ                       │
    │   → ค้นหาว่าบริการอยู่ที่ไหน               │
    └─────────────────────────────────────┘
    ตัวอย่าง: Consul, Eureka, Zookeeper

3️⃣  SERVICES (บริการหลัก)
    ┌─────────────────────────────────────┐
    │ • แต่ละ Service อิสระกัน               │
    │ • มี Database ของตัวเอง               │
    │ • Deploy แยกกันได้                    │
    │ • เลือก Technology Stack ได้เอง       │
    └─────────────────────────────────────┘

4️⃣  MESSAGE BUS/EVENT STREAM (ช่องทางสื่อสาร)
    ┌─────────────────────────────────────┐
    │ • Asynchronous Communication        │
    │ • Event-Driven                      │
    │ • Decoupling Services               │
    └─────────────────────────────────────┘
    ตัวอย่าง: Apache Kafka, RabbitMQ, AWS SQS

5️⃣  MONITORING & LOGGING (ติดตามระบบ)
    ┌─────────────────────────────────────┐
    │ • Centralized Logging               │
    │ • Distributed Tracing               │
    │ • Metrics & Alerting                │
    └─────────────────────────────────────┘
    ตัวอย่าง: ELK Stack, Prometheus, Grafana
```

### 🌟 หลักการสำคัญของ Microservices

#### 1. **Domain-Driven Design (DDD) & Bounded Context**

แต่ละ Microservice ควร represent **Bounded Context** ที่ชัดเจน

**ตัวอย่าง: ระบบ E-Commerce เช่น Shopee**

```
┌─────────────────────────────────────────────────┐
│            Shopee E-Commerce System             │
└─────────────────────────────────────────────────┘

Bounded Context 1: USER MANAGEMENT
  → User Service
  → เก็บข้อมูล: profile, authentication, preferences

Bounded Context 2: PRODUCT CATALOG
  → Product Service
  → เก็บข้อมูล: สินค้า, หมวดหมู่, คลังสินค้า

Bounded Context 3: SHOPPING CART
  → Cart Service
  → เก็บข้อมูล: สินค้าในตะกร้า (ชั่วคราว)

Bounded Context 4: ORDER MANAGEMENT
  → Order Service
  → เก็บข้อมูล: คำสั่งซื้อ, สถานะ, ประวัติ

Bounded Context 5: PAYMENT
  → Payment Service
  → เก็บข้อมูล: ธุรกรรม, บัตรเครดิต (encrypted)

Bounded Context 6: SHIPPING
  → Shipping Service
  → เก็บข้อมูล: ที่อยู่จัดส่ง, ติดตามพัสดุ

Bounded Context 7: NOTIFICATION
  → Notification Service
  → ส่ง email, SMS, push notification
```

**💡 Golden Rule**: แต่ละ Service ควรทำงานในโดเมนของตัวเองเท่านั้น!

#### 2. **Database per Service Pattern**

แต่ละ Microservice **มี database ของตัวเอง** - ไม่แชร์ database กับ service อื่น

**✅ ทำไม?**
- **ความอิสระ (Independence)**: เปลี่ยน schema ได้โดยไม่กระทบ service อื่น
- **Technology Freedom**: เลือกใช้ database ที่เหมาะกับงาน (SQL, NoSQL, Graph DB)
- **Scalability**: Scale database แยกตามความต้องการ

**❌ ปัญหา: แล้วถ้าต้องการข้อมูลจากหลาย services?**

**วิธีแก้:**
1. **API Composition**: เรียก API หลายตัวแล้ว combine ข้อมูล
2. **Event Sourcing**: บันทึก events และ sync ข้อมูลผ่าน message bus
3. **CQRS (Command Query Responsibility Segregation)**: แยก database สำหรับ read และ write

#### 3. **Decentralized Data Management**

```
┌───────────────────────────────────────────────────────────┐
│        TRADITIONAL MONOLITHIC (SHARED DATABASE)           │
└───────────────────────────────────────────────────────────┘

  [User Module] ─┐
  [Order Module] ├──→  [ Single Database ]
  [Payment Module]┘

  ✅ ข้อดี: Transaction ง่าย (ACID)
  ❌ ข้อเสีย: Tight Coupling, Bottleneck


┌───────────────────────────────────────────────────────────┐
│        MICROSERVICES (DATABASE PER SERVICE)               │
└───────────────────────────────────────────────────────────┘

  [User Service] ──→ [User DB]
  [Order Service] ──→ [Order DB]
  [Payment Service] ──→ [Payment DB]

  ✅ ข้อดี: Independence, Scalability
  ❌ ข้อเสีย: Distributed Transactions ซับซ้อน
```

#### 4. **Communication Patterns**

**A. Synchronous Communication (RESTful API, gRPC)**

```
Client Request → API Gateway → Service A → Service B
                                    ↓
                              Wait for Response
                                    ↓
                              Response ← Service B
```

**ข้อดี:**
- ง่ายต่อการเข้าใจ
- Real-time response
- Error handling ตรงไปตรงมา

**ข้อเสีย:**
- Service B ต้อง available
- Latency สูงถ้าเรียกหลาย services
- Cascading failures

**B. Asynchronous Communication (Message Queue, Event Bus)**

```
Service A → Publish Event → Message Broker → Subscribe → Service B
                                ↓
                        Event stored in queue
                                ↓
                        Service B process เมื่อพร้อม
```

**ข้อดี:**
- Loose coupling
- Service B ไม่ต้อง available ในขณะนั้น
- Better resilience

**ข้อเสีย:**
- ซับซ้อนกว่า
- Eventual consistency
- Harder to debug

### 📊 กรณีศึกษา: LINE - Messaging Platform

**LINE** เป็น messaging platform ที่มีผู้ใช้มากกว่า **200 ล้านคน** ทั่วโลก โดยเฉพาะในญี่ปุ่น, ไทย, ไต้หวัน

#### 🏗️ สถาปัตยกรรม LINE (Simplified)

```
┌────────────────────────────────────────────────────────┐
│              LINE Microservices Architecture           │
└────────────────────────────────────────────────────────┘

                    [LINE App/Web]
                          │
                          ▼
              ┌────────────────────┐
              │   API Gateway      │
              │  (Load Balancer)   │
              └─────────┬──────────┘
                        │
        ┌───────────────┼───────────────┬──────────────┐
        │               │               │              │
        ▼               ▼               ▼              ▼
  ┌──────────┐    ┌──────────┐    ┌──────────┐  ┌──────────┐
  │ User     │    │ Message  │    │ Timeline │  │ Sticker  │
  │ Service  │    │ Service  │    │ Service  │  │ Service  │
  │          │    │          │    │          │  │          │
  │  [DB]    │    │  [DB]    │    │  [Cache] │  │  [S3]    │
  └────┬─────┘    └────┬─────┘    └────┬─────┘  └────┬─────┘
       │               │               │              │
       └───────────────┴───────────────┴──────────────┘
                       │
              ┌────────▼────────┐
              │  Apache Kafka   │ ← Real-time Event Streaming
              └─────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
  ┌──────────┐   ┌──────────┐   ┌──────────┐
  │ Push     │   │ Analytics│   │ Backup   │
  │ Notif.   │   │ Service  │   │ Service  │
  └──────────┘   └──────────┘   └──────────┘
```

#### 🎯 ทำไม LINE ใช้ Microservices?

**1. Scale ตาม Feature**
- **Message Service**: ต้อง handle ข้อความหลายพันล้านข้อความต่อวัน
- **Sticker Service**: ไม่ได้ใช้บ่อยเท่า → Scale น้อยกว่าก็ได้
- **Payment Service (LINE Pay)**: ต้องมี security สูง → แยกออกมา

**2. Team Autonomy**
- ทีม Messaging ดูแล Message Service
- ทีม Payment ดูแล Payment Service
- แต่ละทีมเลือก Technology Stack ได้เอง

**3. Release Independently**
- อัปเดต Sticker ใหม่ → Deploy เฉพาะ Sticker Service
- ไม่กระทบ Messaging หรือ Payment

**4. Technology Diversity**
- Message Service: ใช้ Cassandra (เก็บข้อมูลจำนวนมหาศาล)
- Timeline Service: ใช้ Redis (Cache เพื่อความเร็ว)
- Analytics Service: ใช้ Apache Spark (ประมวลผล Big Data)

#### 📊 ตัวเลขที่น่าสนใจ

- **200+ microservices** ทำงานร่วมกัน
- **Billions of messages** ต่อวัน
- **99.99% Availability** (downtime น้อยกว่า 1 ชั่วโมง/ปี)
- **Global CDN** สำหรับ stickers และรูปภาพ

### 📊 กรณีศึกษา: Grab - Super App

**Grab** เป็น Super App ที่รวมบริการ Ride-Hailing, Food Delivery, Payment, Delivery ในแอปเดียว

#### 🏗️ วิวัฒนาการของ Grab

**Phase 1: Monolithic (2012-2014)**
```
[Single Application]
  ├─ Booking
  ├─ Driver Management
  ├─ Payment
  └─ Matching Algorithm
     ↓
[Single Database]
```

**ปัญหา:**
- Scale ยาก (ทุก feature ต้อง scale พร้อมกัน)
- Deploy ช้า (รอทุก feature พร้อม)
- Bug ใน feature หนึ่ง → ระบบทั้งหมดล่ม

**Phase 2: Microservices (2015-Present)**
```
[API Gateway]
     │
     ├─ [Passenger Service] → แอป Passenger
     ├─ [Driver Service] → แอป Driver
     ├─ [Matching Service] → จับคู่ passenger-driver
     ├─ [Payment Service] → GrabPay
     ├─ [Food Service] → GrabFood
     ├─ [Delivery Service] → GrabExpress
     ├─ [Rewards Service] → GrabRewards
     └─ [Notification Service] → Push, SMS, Email
```

#### 🎯 Benefits ที่ Grab ได้รับ

**1. Independent Scaling**
- **Peak Hours (7-9am, 5-7pm)**: Scale Matching Service มากขึ้น
- **Lunch Time**: Scale GrabFood Service
- **Late Night**: Scale GrabDelivery (ส่งของกลางคืน)

**2. Technology Choice**
- **Matching Service**: ใช้ Go (Performance สูง)
- **Payment Service**: ใช้ Java (Mature, Secure)
- **Analytics**: ใช้ Python + Spark

**3. Fault Isolation**
- GrabFood ล่ม → GrabCar ยังใช้งานได้ปกติ
- Payment มีปัญหา → ยังจองรถได้ (จ่ายเงินทีหลัง)

**4. Faster Development**
- ทีม GrabFood พัฒนา feature ใหม่ได้เร็ว
- ไม่ต้องรอทีม GrabCar หรือ Payment

#### 📈 ตัวเลขความสำเร็จ

- **8+ ประเทศในเอเชียตะวันออกเฉียงใต้**
- **100+ microservices**
- **Deploy หลายครั้งต่อวัน** (CI/CD Pipeline)
- **Millions of bookings** ต่อวัน

### ✅ ข้อดีของ Microservices

```
╔════════════════════════════════════════════════════════╗
║           MICROSERVICES ADVANTAGES                     ║
╚════════════════════════════════════════════════════════╝

1️⃣  INDEPENDENT SCALABILITY (ปรับขนาดแยกกันได้)
    ┌─────────────────────────────────────────────┐
    │ • Scale เฉพาะ service ที่มี traffic สูง         │
    │ • ประหยัดทรัพยากร (ไม่ต้อง scale ทั้งหมด).        │
    │ • ตัวอย่าง: Netflix scale Streaming Service.  │
    │   ในช่วง Prime Time                          │
    └─────────────────────────────────────────────┘

2️⃣  TECHNOLOGY DIVERSITY (เลือกเทคโนโลยีได้หลากหลาย)
    ┌─────────────────────────────────────────────┐
    │ • แต่ละ service เลือก tech stack เหมาะกับ      │
    │   งานของตัวเอง                               │
    │ • User Service → Node.js                    │
    │ • Payment Service → Java                    │
    │ • Analytics → Python                        │
    └─────────────────────────────────────────────┘

3️⃣  FAULT ISOLATION (แยกความล้มเหลว)
    ┌─────────────────────────────────────────────┐
    │ • Service หนึ่งล่ม ไม่ทำให้ระบบทั้งหมดล่ม.          │
    │ • ตัวอย่าง: Recommendation Service ล่ม         │
    │   → ยังซื้อของได้ (แค่ไม่มีแนะนำสินค้า)              │
    └─────────────────────────────────────────────┘

4️⃣  FASTER DEPLOYMENT (Deploy เร็วขึ้น)
    ┌─────────────────────────────────────────────┐
    │ • Deploy เฉพาะ service ที่เปลี่ยนแปลง           │
    │ • ไม่ต้องรอทั้งระบบ                             │
    │ • Release ได้บ่อยขึ้น (Continuous Delivery).    │
    └─────────────────────────────────────────────┘

5️⃣  TEAM AUTONOMY (ทีมทำงานอิสระ)
    ┌─────────────────────────────────────────────┐
    │ • แต่ละทีมรับผิดชอบ service ของตัวเอง            │
    │ • "Two Pizza Team" (8-12 คน/service)        │
    │ • ตัดสินใจได้เร็ว ไม่ต้องขอ approve ทุกที           │
    └─────────────────────────────────────────────┘

6️⃣  BETTER MAINTAINABILITY (ดูแลรักษาง่ายขึ้น)
    ┌─────────────────────────────────────────────┐
    │ • Codebase เล็ก เข้าใจง่าย                     │
    │ • แก้ไข refactor ได้เร็ว                       │
    │ • Developer ใหม่เข้ามา onboard เร็ว            │
    └─────────────────────────────────────────────┘

7️⃣  CONTINUOUS DELIVERY (ส่งมอบต่อเนื่อง)
    ┌─────────────────────────────────────────────┐
    │ • สามารถ release feature ใหม่ได้เร็ว           │
    │ • A/B Testing ง่ายขึ้น                         │
    │ • Rollback ได้เร็ว                            │
    └─────────────────────────────────────────────┘
```

### ❌ ข้อเสียและความท้าทายของ Microservices

```
╔════════════════════════════════════════════════════════╗
║        MICROSERVICES CHALLENGES & DISADVANTAGES        ║
╚════════════════════════════════════════════════════════╝

1️⃣  COMPLEXITY (ความซับซ้อนสูง)
    ┌─────────────────────────────────────────────┐
    │ • ระบบมีหลาย components                      │
    │ • ยากต่อการ debug และ trace                  │
    │ • ต้องใช้เครื่องมือเฉพาะ (Distributed            │
    │   Tracing, Centralized Logging)             │
    └─────────────────────────────────────────────┘

2️⃣  DISTRIBUTED SYSTEM PROBLEMS (ปัญหาระบบกระจาย)
    ┌─────────────────────────────────────────────┐
    │ • Network Latency → ช้ากว่า function call     │
    │ • Network Failure → service ติดต่อไม่ได้        │
    │ • Partial Failures → บาง service ล่ม         │
    │ • Time Synchronization → เวลาไม่ตรงกัน        │
    └─────────────────────────────────────────────┘

3️⃣  DATA CONSISTENCY (ความสอดคล้องของข้อมูล)
    ┌─────────────────────────────────────────────┐
    │ • ไม่มี ACID Transaction ข้าม services         │
    │ • Eventual Consistency (ข้อมูลจะตรงกัน         │
    │   ในที่สุด แต่ไม่ใช่ทันที)                          │
    │ • ต้องใช้ Saga Pattern, 2PC                   │
    └─────────────────────────────────────────────┘

4️⃣  OPERATIONAL OVERHEAD (ภาระการดูแลระบบ)
    ┌─────────────────────────────────────────────┐
    │ • ต้อง monitor หลาย services                 │
    │ • Deploy & Manage ซับซ้อน                     │
    │ • ต้องมี DevOps Team ที่แข็งแรง                  │
    │ • Infrastructure Cost สูงขึ้น                  │
    └─────────────────────────────────────────────┘

5️⃣  TESTING COMPLEXITY (การทดสอบยาก)
    ┌─────────────────────────────────────────────┐
    │ • Integration Testing ซับซ้อน                 │
    │ • End-to-End Testing ต้องรัน หลาย services.   │
    │ • ต้องใช้ Service Virtualization/Mocking      │
    └─────────────────────────────────────────────┘

6️⃣  ORGANIZATIONAL CHALLENGES (ความท้าทายด้านองค์กร)
    ┌─────────────────────────────────────────────┐
    │ • ต้องเปลี่ยน Team Structure                   │
    │ • ต้องมี DevOps Culture                       │
    │ • Communication Overhead ระหว่างทีม           │
    │ • ต้องมี Service Contracts ชัดเจน              │
    └─────────────────────────────────────────────┘

7️⃣  INITIAL OVERHEAD (ต้นทุนเริ่มต้นสูง)
    ┌─────────────────────────────────────────────┐
    │ • Setup Infrastructure ซับซ้อน                │
    │ • ต้องมี Monitoring, Logging, CI/CD           │
    │ • ทีมต้องเรียนรู้ Technology ใหม่ๆ                │
    │ • เหมาะกับองค์กรขนาดใหญ่                       │
    └─────────────────────────────────────────────┘
```

### 🎯 เมื่อไหร่ควรใช้ Microservices?

#### ✅ เหมาะสม (Good Fit)

```
┌─────────────────────────────────────────────────────┐
│ ควรใช้ Microservices เมื่อ:                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 1️⃣  ระบบขนาดใหญ่และซับซ้อน                             │
│    • หลายโดเมน, หลายฟีเจอร์                           │
│    • ต้องการ scalability สูง                          │
│                                                     │
│ 2️⃣  ทีมพัฒนาขนาดใหญ่ (50+ developers)                  │
│    • แบ่งเป็นหลายทีม                                   │
│    • แต่ละทีมดูแล service ของตัวเอง                     │
│                                                     │
│ 3️⃣  ต้องการ Release บ่อย                              │
│    • Continuous Deployment                          │
│    • Deploy หลายครั้งต่อวัน                             │
│                                                     │
│ 4️⃣  Scale ไม่เท่ากันในแต่ละส่วน                          │
│    • บาง feature ใช้งานเยอะกว่า                       │
│    • ต้องการ scale เฉพาะส่วน                          │
│                                                     │
│ 5️⃣  ต้องการ Technology Diversity                     │
│    • ใช้ tech stack ที่เหมาะกับแต่ละงาน                  │
│    • มีทีมที่มีความเชี่ยวชาญต่างกัน                          │
│                                                     │
│ 6️⃣  มีทรัพยากร DevOps                                 │
│    • มีทีม DevOps ที่แข็งแรง                             │
│    • มี Infrastructure Automation                    │
│    • มี Monitoring & Logging ที่ดี                      │
│                                                     │
│ 7️⃣  Business ต้องการความยืดหยุ่นสูง                      │
│    • Fault Tolerance สำคัญ                           │
│    • ระบบบางส่วนล่มได้ แต่ส่วนอื่นยังทำงาน                  │
└─────────────────────────────────────────────────────┘
```

**ตัวอย่างระบบที่เหมาะสม:**
- 🛒 **E-Commerce ขนาดใหญ่**: Shopee, Lazada, Amazon
- 🚗 **Ride-Hailing/Delivery**: Grab, Uber, Foodpanda
- 💬 **Social Media/Messaging**: LINE, Facebook, Twitter
- 🎬 **Streaming Service**: Netflix, Disney+, YouTube
- 💰 **Fintech**: ทรูมันนี่, พร้อมเพย์, GrabPay

#### ❌ ไม่เหมาะสม (Poor Fit)

```
┌─────────────────────────────────────────────────────┐
│ ไม่ควรใช้ Microservices เมื่อ:                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 1️⃣  ระบบเล็ก CRUD Application                        │
│    • Simple CRUD operations                         │
│    • ไม่มี Business Logic ซับซ้อน                       │
│                                                     │
│ 2️⃣  ทีมเล็ก (< 10 developers)                         │
│    • Overhead จากการดูแล Microservices มากเกินไป      │
│    • Monolith ดีกว่า                                  │
│                                                     │
│ 3️⃣  Startup ระยะแรก (MVP)                           │
│    • ต้องการ Speed to Market                         │
│    • ยังไม่แน่ใจว่า Product-Market Fit                  │
│    • Focus ที่ Features ก่อน                           │
│                                                     │
│ 4️⃣  ไม่มีทีม DevOps                                    │
│    • ไม่มีความรู้เรื่อง Container, Orchestration          │
│    • ไม่มี CI/CD Pipeline                             │
│                                                     │
│ 5️⃣  Requirements ยังไม่ชัดเจน                          │
│    • Domain Boundaries ยังไม่แน่นอน                    │
│    • Service อาจต้อง refactor บ่อย                    │
│                                                     │
│ 6️⃣  Tight Coupling Requirements                     │
│    • Transaction ต้องเป็น ACID                        │
│    • ข้อมูลต้องสอดคล้องกันทันที (Strong                    │
│      Consistency)                                   │
│                                                     │
│ 7️⃣  งบประมาณจำกัด                                    │
│    • Infrastructure Cost สูง                         │
│    • ต้องการ monitoring, logging, APM tools          │
└─────────────────────────────────────────────────────┘
```

**ตัวอย่างระบบที่ไม่เหมาะสม:**
- 📝 **Blog/CMS เล็กๆ**: WordPress, Personal Blog
- 📊 **Internal Dashboard**: Admin Dashboard, Reporting Tool
- 🏫 **ระบบจัดการห้องเรียน**: ระบบมหาวิทยาลัยขนาดเล็ก
- 📄 **Document Management**: เก็บเอกสารภายในองค์กร
- 🔐 **Simple API**: Single-purpose API Service

### 💭 คำถามชวนคิด

1. **Shopee ใช้ Microservices แต่ร้านค้าเล็กใน Facebook ใช้ Monolith - เพราะอะไร?**
   - Scale ต่างกัน
   - Complexity ต่างกัน
   - Team Size ต่างกัน

2. **ถ้า Service A ต้องการข้อมูลจาก Service B เสมอ - ควรรวมเป็น Service เดียวหรือไม่?**
   - พิจารณา Coupling
   - ดู Bounded Context
   - ประเมิน Trade-offs

3. **Netflix มี Microservices มากกว่า 700 ตัว - จัดการอย่างไร?**
   - Strong DevOps Culture
   - Automation Tools
   - Service Mesh
   - Monitoring & Observability

---

## <a id="event-driven"></a>1.2 Event-Driven Architecture (EDA)

### 📘 ชื่อบทเรียน 1.2: Event-Driven Architecture - สถาปัตยกรรมที่ขับเคลื่อนด้วย Events

### 🎯 วัตถุประสงค์การสอน

**1.2.1 ให้นักศึกษาเข้าใจแนวคิดและหลักการของ Event-Driven Architecture**
- อธิบายคำนิยามและองค์ประกอบของ Event-Driven Architecture
- เข้าใจความแตกต่างระหว่าง Request-Response และ Event-Driven
- อธิบาย Pub/Sub Pattern และ Message Queue

**1.2.2 ให้นักศึกษาสามารถวิเคราะห์และออกแบบระบบด้วย Event-Driven**
- ระบุสถานการณ์ที่เหมาะสมกับ Event-Driven Architecture
- ออกแบบ Event Flow และ Event Types
- เข้าใจ Event Sourcing และ CQRS Pattern

---

### 💡 คำนิยาม

**Event-Driven Architecture (EDA)** คือสถาปัตยกรรมที่ระบบต่างๆ **สื่อสารกันผ่าน Events** แทนการเรียก API โดยตรง

**Event** คือ "เหตุการณ์ที่เกิดขึ้น" ในระบบ เช่น:
- ✅ "ผู้ใช้สร้างบัญชีใหม่" (UserRegistered)
- ✅ "สั่งซื้อสินค้า" (OrderPlaced)
- ✅ "ชำระเงินสำเร็จ" (PaymentCompleted)
- ✅ "สินค้าจัดส่งแล้ว" (OrderShipped)

### 🏗️ โครงสร้างพื้นฐาน

```
╔═══════════════════════════════════════════════════════╗
║         EVENT-DRIVEN ARCHITECTURE OVERVIEW            ║
╚═══════════════════════════════════════════════════════╝

┌──────────────┐                    ┌──────────────┐
│  Producer    │                    │  Consumer    │
│  (Publisher) │                    │ (Subscriber) │
│              │                    │              │
│  Publish     │                    │  Subscribe   │
│  Events      │                    │  to Events   │
└───────┬──────┘                    └──────▲───────┘
        │                                  │
        │ 1. Publish Event                 │ 3. Deliver Event
        │    (Fire and Forget)             │    (When Ready)
        │                                  │
        ▼                                  │
┌──────────────────────────────────────────┴───────┐
│         EVENT BUS / MESSAGE BROKER               │
│                                                  │
│  • รับ Events จาก Producers                       │
│  • เก็บ Events ในคิว (Queue)                       │
│  • ส่ง Events ไปยัง Subscribers                    │
│                                                  │
│  ตัวอย่าง: Kafka, RabbitMQ, AWS SNS/SQS            │
└──────────────────────────────────────────────────┘
                    │
                    │ 2. Store Event
                    ▼
          [Event Store/Log]
```

### 🎨 Text Infographic: Request-Response vs Event-Driven

```
╔═══════════════════════════════════════════════════════╗
║    REQUEST-RESPONSE (Traditional/Synchronous)         ║
╚═══════════════════════════════════════════════════════╝

[Service A] ──Request──→ [Service B]
     ↓                        │
   Waiting...              Process
     ↓                        │
   Blocked                    │
     ↓                        ▼
[Service A] ←──Response── [Service B]
     ↓
  Continue

✅ ข้อดี:
   • เข้าใจง่าย
   • Real-time response
   • Error handling ตรงไปตรงมา

❌ ข้อเสีย:
   • Service A ต้องรอ Service B
   • Service B ต้อง available
   • Tight Coupling
   • Cascading Failures


╔═══════════════════════════════════════════════════════╗
║        EVENT-DRIVEN (Asynchronous)                    ║
╚═══════════════════════════════════════════════════════╝

[Service A] ──Publish Event──→ [Event Bus]
     │                              ↓
  Continue                    Store Event
     │                              ↓
     │                   ┌──────────┴──────────┐
     │                   ▼                     ▼
     │            [Service B]          [Service C]
     │             Process              Process
     │              Event                Event
     │                                      
     └─ No waiting, No blocking!

✅ ข้อดี:
   • Loose Coupling (แยกส่วนได้ดี)
   • Scalability สูง
   • Resilience (ทน fault ได้ดี)
   • Multiple consumers ได้

❌ ข้อเสีย:
   • ซับซ้อนกว่า
   • Eventual Consistency
   • Debugging ยากขึ้น
   • ต้องจัดการ Message Order
```

### 🔄 Pub/Sub Pattern (Publish-Subscribe)

**Publish-Subscribe Pattern** คือรูปแบบการสื่อสารที่:
- **Publisher** (ผู้ส่ง): ส่ง Event โดยไม่รู้ว่าใครจะรับ
- **Subscriber** (ผู้รับ): Subscribe Event ที่สนใจ

```
┌────────────────────────────────────────────────────┐
│              PUB/SUB EXAMPLE: E-COMMERCE           │
└────────────────────────────────────────────────────┘

                   [Event: OrderPlaced]
                          │
                          ▼
              ┌────────────────────┐
              │  MESSAGE BROKER    │
              │  (Topic: orders)   │
              └─────────┬──────────┘
                        │
          ┌─────────────┼─────────────┬──────────────┐
          │             │             │              │
          ▼             ▼             ▼              ▼
    ┌─────────┐   ┌─────────┐   ┌─────────┐    ┌─────────┐
    │Payment  │   │Inventory│   │Shipping │    │Email    │
    │Service  │   │Service  │   │Service  │    │Service  │
    │         │   │         │   │         │    │         │
    │Reserve  │   │Reduce   │   │Prepare  │    │Send     │
    │Payment  │   │Stock    │   │Package  │    │Receipt  │
    └─────────┘   └─────────┘   └─────────┘    └─────────┘
```

**ข้อดี:**
- ✅ **Decoupling**: Payment Service ไม่รู้ว่ามี Email Service
- ✅ **Extensibility**: เพิ่ม Service ใหม่ได้ง่าย (เช่น Analytics Service)
- ✅ **Scalability**: แต่ละ Service scale อิสระกัน

### 🎯 องค์ประกอบสำคัญ

#### 1. **Event Types**

**A. Domain Events** (Business Events)
```
• UserRegistered
• OrderPlaced
• PaymentProcessed
• OrderShipped
• OrderCancelled
```

**B. System Events** (Technical Events)
```
• CacheInvalidated
• DatabaseBackupCompleted
• ServiceStarted
• HealthCheckFailed
```

#### 2. **Message Broker/Event Bus**

**ตัวอย่าง Technology:**

| Technology | ข้อดี | ข้อเสีย | ใช้กับ |
|------------|------|---------|--------|
| **Apache Kafka** | • Throughput สูงมาก<br>• Scalability ดีเยี่ยม<br>• Fault Tolerant | • Setup ซับซ้อน<br>• Learning Curve สูง | Event Streaming, Big Data, Real-time Analytics |
| **RabbitMQ** | • ง่ายต่อการใช้งาน<br>• Flexible Routing<br>• Community ใหญ่ | • Throughput ต่ำกว่า Kafka | Traditional Message Queue, Job Queue |
| **AWS SNS/SQS** | • Managed Service<br>• No Ops<br>• Integrate กับ AWS ง่าย | • Vendor Lock-in<br>• Cost สูงถ้าใช้เยอะ | AWS-based Applications |
| **Redis Pub/Sub** | • เร็วมาก<br>• Simple | • ไม่ persist message<br>• ไม่ reliable | Real-time Notifications, Cache Invalidation |

#### 3. **Event Store**

```
┌────────────────────────────────────────────────────┐
│              EVENT STORE CONCEPT                   │
└────────────────────────────────────────────────────┘

การเก็บ Events ทั้งหมดที่เกิดขึ้นในระบบ:

Event ID | Timestamp           | Event Type      | Payload
---------|---------------------|-----------------|------------------
001      | 2025-01-15 10:00:00 | UserRegistered  | {userId: 123}
002      | 2025-01-15 10:05:00 | OrderPlaced     | {orderId: 456}
003      | 2025-01-15 10:10:00 | PaymentProcessed| {orderId: 456}
004      | 2025-01-15 10:15:00 | OrderShipped    | {orderId: 456}

✅ ข้อดี:
• Audit Trail สมบูรณ์ (รู้ว่าเกิดอะไรขึ้นเมื่อไหร่)
• Time Travel (สามารถ replay events ได้)
• Event Sourcing Pattern
```

### 📊 กรณีศึกษา: ระบบธนาคารออนไลน์ (Mobile Banking)

**ระบบ: แอปธนาคารกรุงไทย, กสิกรไทย, ไทยพาณิชย์**

#### 🏦 Scenario: โอนเงิน (Money Transfer)

**แบบ Request-Response (แบบเก่า):**

```
[Mobile App]
     │
     ▼
"โอนเงิน 1,000 บาท"
     │
     ▼
[Transfer Service] ──→ ตรวจสอบยอดเงิน
     │
     ▼
[Transfer Service] ──→ หักเงินบัญชีต้นทาง
     │
     ▼
[Transfer Service] ──→ เพิ่มเงินบัญชีปลายทาง
     │
     ▼
[Transfer Service] ──→ ส่ง SMS แจ้งเตือน
     │
     ▼
[Transfer Service] ──→ บันทึก Transaction Log
     │
     ▼
Response: "โอนเงินสำเร็จ"

⏱️ ต้องรอทุกขั้นตอนเสร็จ → ช้า!
❌ ถ้าขั้นตอนใดล้ม → ทั้งหมดล้ม
```

**แบบ Event-Driven (แบบใหม่):**

```
[Mobile App]
     │
     ▼
"โอนเงิน 1,000 บาท"
     │
     ▼
[Transfer Service]
     │
     ├─ ตรวจสอบยอดเงิน
     ├─ หักเงินบัญชีต้นทาง
     ├─ เพิ่มเงินบัญชีปลายทาง
     │
     ▼
Publish Event: "TransferCompleted"
     │
     └─ Response ทันที: "กำลังดำเนินการ"

                   [Event Bus]
                        │
        ┌───────────────┼───────────────┬──────────────┐
        ▼               ▼               ▼              ▼
   [SMS Service]  [Email Service]  [Analytics]  [Log Service]
   ส่ง SMS        ส่ง Email        วิเคราะห์    บันทึก Log
   (ทำงานแยก)     (ทำงานแยก)      (ทำงานแยก)   (ทำงานแยก)

✅ Response เร็ว (ไม่ต้องรอ SMS, Email)
✅ ถ้า SMS ล่ม → ไม่กระทบการโอนเงิน
✅ เพิ่ม Service ใหม่ได้ง่าย (เช่น LINE Notify)
```

#### 📈 ประโยชน์ที่ได้รับ

1. **ประสบการณ์ผู้ใช้ดีขึ้น**
   - Response เร็ว (ไม่ต้องรอ SMS)
   - App ไม่ค้าง

2. **Reliability สูงขึ้น**
   - SMS Service ล่ม → ยังโอนเงินได้
   - Retry ได้ง่าย (เก็บ event ไว้ใน queue)

3. **Scalability**
   - SMS Service รับ load สูง → Scale แค่ SMS Service
   - Transfer Service ไม่กระทบ

4. **Extensibility**
   - ต้องการส่ง LINE Notify → เพิ่ม LINE Service Subscribe event เท่านั้น
   - ไม่ต้องแก้ Transfer Service

### 📊 กรณีศึกษา: หมอพร้อม (Mor Prom) - Healthcare Platform

**หมอพร้อม** เป็นแพลตฟอร์มการแพทย์ออนไลน์ ให้บริการ:
- 💊 ปรึกษาแพทย์ออนไลน์
- 📅 จองคิวพบแพทย์
- 💳 ชำระค่ารักษา
- 📦 จัดส่งยา

#### 🏗️ Event-Driven Flow

```
┌────────────────────────────────────────────────────┐
│     SCENARIO: นัดหมายแพทย์ออนไลน์                 │
└────────────────────────────────────────────────────┘

[Patient App] → จองนัดหมาย
     │
     ▼
[Appointment Service]
     │
     ├─ สร้าง Appointment
     ├─ Reserve Doctor's Time Slot
     │
     ▼
Publish: "AppointmentCreated"
     │
     ▼
[Event Bus: appointments]
     │
     ├──→ [Notification Service]
     │    • ส่ง SMS ยืนยันการนัด
     │    • ส่ง Email รายละเอียด
     │    • ส่ง Push Notification
     │
     ├──→ [Doctor App]
     │    • แจ้งเตือนแพทย์
     │    • อัปเดตตารางนัด
     │
     ├──→ [Payment Service]
     │    • สร้าง Payment Link
     │    • รอชำระเงิน
     │
     └──→ [Analytics Service]
          • เก็บสถิติการจอง
          • วิเคราะห์ Peak Hours
```

#### 🔄 Event Flow เมื่อถึงเวลานัด

```
[Scheduler Service] → ตรวจสอบเวลา
     │
     ▼
Publish: "AppointmentStarting" (30 นาทีก่อนนัด)
     │
     ▼
[Event Bus]
     │
     ├──→ [Notification Service]
     │    • ส่ง SMS เตือน 30 นาทีก่อน
     │
     ├──→ [Video Call Service]
     │    • สร้าง Meeting Room
     │    • ส่ง Link ไปหาคนไข้และแพทย์
     │
     └──→ [Medical Records Service]
          • เตรียมประวัติคนไข้
          • ส่งให้แพทย์ดูก่อนพบ
```

#### 📊 ประโยชน์

1. **Decoupling**
   - Appointment Service ไม่ต้องรู้ว่ามี Video Call Service
   - เพิ่ม Service ใหม่ได้ง่าย (เช่น Prescription Service)

2. **Reliability**
   - SMS ส่งไม่ได้ → ยังจองนัดได้
   - Video Call Service ล่ม → ไม่กระทบการจองนัด

3. **User Experience**
   - จองนัดเร็ว (ไม่ต้องรอส่ง SMS)
   - Notification หลายช่องทาง (SMS, Email, Push)

### 🎨 Event Sourcing Pattern

**Event Sourcing** คือการเก็บ **Events ทั้งหมด** แทนการเก็บ **State ปัจจุบัน**

```
╔═══════════════════════════════════════════════════════╗
║           TRADITIONAL vs EVENT SOURCING               ║
╚═══════════════════════════════════════════════════════╝

TRADITIONAL (State-Based):
┌──────────────────────────────────────┐
│  Orders Table                        │
├──────────────────────────────────────┤
│ OrderID | Status    | Amount         │
│ 123     | SHIPPED   | 1000 บาท       │  ← เก็บแค่สถานะปัจจุบัน
└──────────────────────────────────────┘

❌ ปัญหา: ไม่รู้ว่าเปลี่ยนสถานะมายังไง?


EVENT SOURCING:
┌──────────────────────────────────────────────────────┐
│  Events Table                                        │
├──────────────────────────────────────────────────────┤
│ EventID | OrderID | Event Type      | Timestamp      │
│ 1       | 123     | OrderPlaced     | 10:00:00       │
│ 2       | 123     | PaymentReceived | 10:05:00       │
│ 3       | 123     | OrderShipped    | 10:30:00       │  ← เก็บทุก Event
└──────────────────────────────────────────────────────┘

✅ ข้อดี:
• Complete Audit Trail (รู้ประวัติทั้งหมด)
• Time Travel (replay events ได้)
• Event Replay (rebuild state ใหม่ได้)
```

**Use Cases ที่เหมาะสม:**
- 💰 **Banking**: ต้องรู้ประวัติการทำธุรกรรมทั้งหมด
- 🏥 **Healthcare**: ประวัติการรักษา
- 📦 **E-Commerce**: ติดตามการสั่งซื้อและจัดส่ง
- 🎮 **Gaming**: Event Replay, Analytics

### 🎨 CQRS Pattern (Command Query Responsibility Segregation)

**CQRS** แยก **การเขียน (Write)** กับ **การอ่าน (Read)** ออกจากกัน

```
╔═══════════════════════════════════════════════════════╗
║               CQRS ARCHITECTURE                       ║
╚═══════════════════════════════════════════════════════╝

[Client/User]
     │
     ├────── Write (Command) ────→ [Command Handler]
     │                                    │
     │                                    ▼
     │                            [Write Database]
     │                                    │
     │                                    ▼
     │                            Publish Events
     │                                    │
     │                                    ▼
     │                            [Read Database Sync]
     │
     └────── Read (Query) ─────→ [Query Handler]
                                         │
                                         ▼
                                 [Read Database]
                                 (Optimized for Read)
```

**ตัวอย่าง: ระบบ E-Commerce**

**Write Side (Commands):**
- `PlaceOrder`
- `UpdateInventory`
- `ProcessPayment`
→ เขียนลง Write Database (Normalized, ACID)

**Read Side (Queries):**
- `GetOrderHistory`
- `SearchProducts`
- `GetRecommendations`
→ อ่านจาก Read Database (Denormalized, Cache)

**ข้อดี:**
- ✅ **Performance**: Read Database optimize สำหรับ query
- ✅ **Scalability**: Scale Read/Write แยกกัน
- ✅ **Flexibility**: ใช้ tech stack ต่างกัน (Write: PostgreSQL, Read: Elasticsearch)

### ✅ ข้อดีของ Event-Driven Architecture

```
╔════════════════════════════════════════════════════════╗
║         EVENT-DRIVEN ADVANTAGES                        ║
╚════════════════════════════════════════════════════════╝

1️⃣  LOOSE COUPLING (แยกส่วนได้ดี)
    ┌─────────────────────────────────────────────┐
    │ • Services ไม่ต้องรู้จักกัน                       │
    │ • Publisher ไม่รู้ว่าใครจะ subscribe            │
    │ • เพิ่ม/ลด Subscriber ได้ง่าย                   │
    └─────────────────────────────────────────────┘

2️⃣  SCALABILITY (ขยายระบบได้ดี)
    ┌─────────────────────────────────────────────┐
    │ • แต่ละ Service scale อิสระกัน                 │
    │ • Message Broker handle load ได้สูง           │
    │ • Horizontal Scaling ง่าย                    │
    └─────────────────────────────────────────────┘

3️⃣  RESILIENCE (ทนต่อ Failure)
    ┌─────────────────────────────────────────────┐
    │ • Service ล่ม → Events ยังอยู่ใน Queue          │
    │ • Auto Retry เมื่อ Service กลับมา              │
    │ • No Cascading Failures                     │
    └─────────────────────────────────────────────┘

4️⃣  FLEXIBILITY (ความยืดหยุ่นสูง)
    ┌─────────────────────────────────────────────┐
    │ • เพิ่ม Feature ใหม่ได้ง่าย (Subscribe)          │
    │ • ไม่ต้องแก้ Code เดิม                          │
    │ • Support Real-time Processing              │
    └─────────────────────────────────────────────┘

5️⃣  AUDIT & REPLAY (ติดตามและย้อนกลับได้)
    ┌─────────────────────────────────────────────┐
    │ • เก็บ Event Log ทั้งหมด                       │
    │ • Replay Events ได้ (Time Travel)            │
    │ • Complete Audit Trail                      │
    └─────────────────────────────────────────────┘
```

### ❌ ข้อเสียและความท้าทาย

```
╔════════════════════════════════════════════════════════╗
║        EVENT-DRIVEN CHALLENGES                         ║
╚════════════════════════════════════════════════════════╝

1️⃣  COMPLEXITY (ซับซ้อนขึ้น)
    ┌─────────────────────────────────────────────┐
    │ • ยากต่อการ Debug                            │
    │ • ต้องใช้ Distributed Tracing                 │
    │ • Event Flow ซับซ้อน                          │
    └─────────────────────────────────────────────┘

2️⃣  EVENTUAL CONSISTENCY (ข้อมูลไม่ตรงกันทันที)
    ┌─────────────────────────────────────────────┐
    │ • ข้อมูลจะตรงกันในที่สุด (แต่ไม่ใช่ทันที)              │
    │ • ไม่เหมาะกับระบบที่ต้องการ Strong               │
    │   Consistency                               │
    └─────────────────────────────────────────────┘

3️⃣  EVENT ORDERING (ลำดับ Event)
    ┌─────────────────────────────────────────────┐
    │ • Event อาจมาไม่ตามลำดับ                      │
    │ • ต้องจัดการ Out-of-Order Events              │
    │ • Idempotency สำคัญ                          │
    └─────────────────────────────────────────────┘

4️⃣  OPERATIONAL OVERHEAD
    ┌─────────────────────────────────────────────┐
    │ • ต้องดูแล Message Broker                     │
    │ • Monitoring ซับซ้อนขึ้น                        │
    │ • ต้องจัดการ Dead Letter Queue                │
    └─────────────────────────────────────────────┘

5️⃣  TESTING DIFFICULTY
    ┌─────────────────────────────────────────────┐
    │ • Integration Test ยาก                      │
    │ • ต้อง Mock Message Broker                   │
    │ • Event Flow ทดสอบยาก                       │
    └─────────────────────────────────────────────┘
```

### 🎯 เมื่อไหร่ควรใช้ Event-Driven?

#### ✅ เหมาะสม

- 🚗 **Real-time Location Tracking**: Grab, Uber (ตำแหน่งรถเปลี่ยนบ่อย)
- 💬 **Chat/Messaging**: LINE, Facebook Messenger (ข้อความเรียลไทม์)
- 📊 **IoT Monitoring**: Smart Home, Industrial Sensors
- 💰 **Financial Systems**: Transaction Processing, Fraud Detection
- 🎮 **Gaming**: Multiplayer Games, Leaderboards
- 📦 **E-Commerce**: Order Processing, Inventory Updates

#### ❌ ไม่เหมาะสม

- 📝 **Simple CRUD**: ระบบเก็บข้อมูลเบื้องต้น
- 🔐 **Synchronous Requirements**: ต้องการ Response ทันที
- 💳 **Strong Consistency Required**: Banking Transactions (ACID)
- 👤 **Single User Systems**: Personal Tools, Admin Dashboards

---

## <a id="soa"></a>1.3 Service-Oriented Architecture (SOA)

### 📘 ชื่อบทเรียน 1.3: Service-Oriented Architecture - สถาปัตยกรรมที่มุ่งเน้นบริการ

### 🎯 วัตถุประสงค์การสอน

**1.3.1 ให้นักศึกษาเข้าใจแนวคิดและหลักการของ SOA**
- อธิบายคำนิยามและองค์ประกอบของ SOA
- เข้าใจความแตกต่างระหว่าง SOA และ Microservices
- อธิบาย Web Services (SOAP, REST)

---

### 💡 คำนิยาม

**Service-Oriented Architecture (SOA)** คือสถาปัตยกรรมที่เน้นการสร้าง **Services ที่ใช้ร่วมกันได้ (Reusable Services)** และเชื่อมต่อผ่าน **Standard Protocols** (SOAP, REST)

**SOA กับ Microservices ต่างกันอย่างไร?**

```
╔═══════════════════════════════════════════════════════╗
║          SOA vs MICROSERVICES                         ║
╚═══════════════════════════════════════════════════════╝

┌────────────────────┬────────────────┬────────────────┐
│    Aspect          │     SOA        │ Microservices  │
├────────────────────┼────────────────┼────────────────┤
│ Service Size       │ ใหญ่ (Coarse).  │ เล็ก (Fine)     │
│ Communication      │ SOAP, ESB      │ REST, Message  │
│ Database           │ แชร์ได้          │ แยกกัน          │
│ Governance         │ Centralized    │ Decentralized  │
│ Deployment         │ Shared Server  │ Independent    │
│ Team Structure     │ Cross-function │ Small Teams    │
│ Focus              │ Reusability    │ Independence   │
└────────────────────┴────────────────┴────────────────┘
```

### 🏗️ องค์ประกอบของ SOA

```
┌────────────────────────────────────────────────────┐
│            SOA ARCHITECTURE                        │
└────────────────────────────────────────────────────┘

[Client/Consumer]
     │
     ▼
┌──────────────┐
│ Service      │ ← ค้นหา Services ที่ต้องการ
│ Registry     │
│ (UDDI)       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Enterprise   │ ← จัดการการเชื่อมต่อ, Routing
│ Service Bus  │   Transformation, Monitoring
│ (ESB)        │
└──────┬───────┘
       │
       ├───────────────┬───────────────┐
       ▼               ▼               ▼
┌──────────┐     ┌──────────┐     ┌──────────┐
│ Service  │     │ Service  │     │ Service  │
│    A     │     │    B     │     │    C     │
│          │     │          │     │          │
│ SOAP/REST│     │ SOAP/REST│     │ SOAP/REST│
└──────────┘     └──────────┘     └──────────┘
```

#### 1. **Services**
- มี interface ที่ชัดเจน (Contract)
- Loosely Coupled
- Reusable
- Platform-independent

#### 2. **Enterprise Service Bus (ESB)**
```
┌────────────────────────────────────────────────────┐
│             ESB CAPABILITIES                       │
├────────────────────────────────────────────────────┤
│ • Message Routing                                  │
│ • Protocol Translation (SOAP ↔ REST)               │
│ • Data Transformation (XML ↔ JSON)                 │
│ • Service Orchestration                            │
│ • Monitoring & Logging                             │
│ • Security & Authentication                        │
└────────────────────────────────────────────────────┘

ตัวอย่าง ESB: 
• MuleSoft
• IBM Integration Bus
• Oracle Service Bus
• Apache Camel
```

#### 3. **Service Registry**
- เก็บ Service Metadata
- Service Discovery
- Service Contract

### 📊 กรณีศึกษา: ระบบสาธารณสุขไทย (e-Health)

**ปัญหา**: โรงพยาบาลแต่ละแห่งมีระบบของตัวเอง ข้อมูลคนไข้ไม่เชื่อมกัน

**วิธีแก้: ใช้ SOA**

```
┌────────────────────────────────────────────────────┐
│       THAILAND e-HEALTH SOA ARCHITECTURE           │
└────────────────────────────────────────────────────┘

                [หมอพร้อม App]
                [โรงพยาบาล App]
                [เจ้าหน้าที่ App]
                     │
                     ▼
            ┌────────────────┐
            │  API Gateway   │
            └───────┬────────┘
                    │
                    ▼
            ┌────────────────┐
            │ Enterprise     │
            │ Service Bus    │ ← กระทรวงสาธารณสุข
            └───────┬────────┘
                    │
      ┌─────────────┼─────────────┬─────────────┐
      ▼             ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Patient  │  │ Medicine │  │ Lab      │  │ Payment  │
│ Service  │  │ Service  │  │ Service  │  │ Service  │
│          │  │          │  │          │  │          │
│ ข้อมูล     │  │ ข้อมูล     │  │ ผลแลป    │  │ เบิก30บาท │
│ คนไข้     │  │ ยา       │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
      │              │             │             │
      └──────────────┴─────────────┴─────────────┘
                          │
                ┌─────────┴─────────┐
                ▼                   ▼
          [โรงพยาบาล A]        [โรงพยาบาล B]
          [ระบบเก่า HIS]       [ระบบเก่า HIS]
```

**ประโยชน์:**
- ✅ โรงพยาบาลแต่ละแห่งยังใช้ระบบเดิม (ไม่ต้องเปลี่ยนหมด)
- ✅ เชื่อมต่อผ่าน Standard Interface (Web Service)
- ✅ ข้อมูลคนไข้เข้าถึงได้จากทุกโรงพยาบาล
- ✅ ESB จัดการ Transformation (ระบบเก่า → ระบบใหม่)

### 🌐 Web Services

#### A. SOAP (Simple Object Access Protocol)

**ลักษณะ:**
- ใช้ XML ในการส่งข้อมูล
- มี WSDL (Web Services Description Language) เป็น Contract
- Protocol-heavy (มีมาตรฐานเยอะ)
- Enterprise-grade Security

**ตัวอย่าง SOAP Request:**
```xml
<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Body>
    <GetPatientInfo>
      <PatientID>1234567890</PatientID>
    </GetPatientInfo>
  </soap:Body>
</soap:Envelope>
```

**Use Cases:**
- 🏦 Banking Systems
- 🏥 Healthcare Systems
- 🏢 Enterprise Applications
- 💳 Payment Gateways

#### B. REST (REpresentational State Transfer)

**ลักษณะ:**
- ใช้ HTTP Methods (GET, POST, PUT, DELETE)
- ใช้ JSON (เบากว่า XML)
- Stateless
- Simple และ Popular

**ตัวอย่าง REST API:**
```http
GET /api/patients/1234567890
Host: ehealth.moph.go.th
Authorization: Bearer eyJhbGc...

Response:
{
  "patientId": "1234567890",
  "name": "นายสมชาย ใจดี",
  "birthDate": "1990-01-15",
  "bloodType": "O+"
}
```

**Use Cases:**
- 📱 Mobile Apps
- 🌐 Web Applications
- 🔌 Modern APIs
- ☁️ Cloud Services

### ✅ ข้อดีของ SOA

```
1️⃣  REUSABILITY (ใช้ซ้ำได้)
    • สร้าง Service ครั้งเดียว ใช้ได้หลายที่
    • ประหยัดเวลาพัฒนา

2️⃣  INTEROPERABILITY (เชื่อมต่อได้หลายระบบ)
    • Platform-independent
    • ระบบเก่าเชื่อมกับระบบใหม่ได้

3️⃣  MAINTAINABILITY (ดูแลรักษาง่าย)
    • แก้ไข Service เดียว กระทบหลายที่
    • Versioning ชัดเจน

4️⃣  SCALABILITY (ขยายได้)
    • Scale Service ที่ใช้บ่อย
    • Load Balancing ผ่าน ESB
```

### ❌ ข้อเสียของ SOA

```
1️⃣  COMPLEXITY (ซับซ้อน)
    • ESB เป็น Single Point of Failure
    • Configuration ยุ่งยาก

2️⃣  PERFORMANCE OVERHEAD
    • XML/SOAP ใหญ่และช้า
    • ESB เพิ่ม Latency

3️⃣  VENDOR LOCK-IN
    • ESB แต่ละยี่ห้อต่างกัน
    • ค่าใช้จ่ายสูง

4️⃣  GOVERNANCE OVERHEAD
    • ต้องมีทีมกลางดูแล
    • Change Management ซับซ้อน
```

---

## <a id="serverless"></a>1.4 Serverless Architecture

### 📘 ชื่อบทเรียน 1.4: Serverless Architecture - สถาปัตยกรรมไร้เซิร์ฟเวอร์

### 🎯 วัตถุประสงค์การสอน

**1.4.1 ให้นักศึกษาเข้าใจแนวคิดและหลักการของ Serverless**
- อธิบายคำนิยามและลักษณะของ Serverless Architecture
- เข้าใจ Functions as a Service (FaaS)
- เปรียบเทียบ Serverless กับ Traditional Server

---

### 💡 คำนิยาม

**Serverless Architecture** = "มีเซิร์ฟเวอร์" แต่เราไม่ต้องจัดการเอง!

**ลักษณะสำคัญ:**
- ⚡ **No Server Management**: ไม่ต้องจัดการเซิร์ฟเวอร์
- 💰 **Pay-per-Use**: จ่ายตามการใช้งานจริง (ไม่ใช้ไม่เสียเงิน)
- 🚀 **Auto-Scaling**: Scale อัตโนมัติ
- ⏱️ **Event-Driven**: ทำงานเมื่อมี Event/Request

### 🏗️ Functions as a Service (FaaS)

```
╔═══════════════════════════════════════════════════════╗
║        TRADITIONAL vs SERVERLESS                      ║
╚═══════════════════════════════════════════════════════╝

TRADITIONAL:
┌────────────────────────────────────────┐
│  [Application]                         │
│    • รันตลอด 24/7                       │
│    • จ่ายค่าเซิร์ฟเวอร์ทั้งเดือน               │
│    • ต้องจัดการ Server, OS, Security     │
│    • ต้อง Scale เอง                     │
└────────────────────────────────────────┘
Cost: ฿10,000/เดือน (ไม่ว่าจะใช้หรือไม่ใช้)


SERVERLESS (FaaS):
┌────────────────────────────────────────┐
│  [Function 1] [Function 2] [Function 3]│
│    • รันเมื่อมี Request เท่านั้น              │
│    • จ่ายตามจำนวน Request               │
│    • ไม่ต้องจัดการ Server                 │
│    • Auto-Scale อัตโนมัติ                 │
└────────────────────────────────────────┘
Cost: ฿500/เดือน (จ่ายแค่ที่ใช้)
```

### ☁️ แพลตฟอร์ม Serverless ยอดนิยม

| Platform | Provider | ภาษาที่รองรับ | Use Cases |
|----------|----------|--------------|-----------|
| **AWS Lambda** | Amazon | Node.js, Python, Java, Go, .NET | Automation, APIs, Data Processing |
| **Google Cloud Functions** | Google | Node.js, Python, Go, Java | Firebase Integration, Web Hooks |
| **Azure Functions** | Microsoft | C#, JavaScript, Python, Java | Office 365 Integration, IoT |
| **Vercel Functions** | Vercel | Node.js, Go, Python, Ruby | Next.js, Static Sites |
| **Cloudflare Workers** | Cloudflare | JavaScript, Rust, C++, Python | Edge Computing, CDN |

### 📊 กรณีศึกษา: LINE Notify - ส่งการแจ้งเตือนผ่าน LINE

**LINE Notify** ให้บริการส่งการแจ้งเตือนผ่าน LINE ฟรี

```
┌────────────────────────────────────────────────────┐
│       LINE NOTIFY SERVERLESS ARCHITECTURE          │
└────────────────────────────────────────────────────┘

[External Service] → Webhook
     │
     ▼
┌──────────────────┐
│ API Gateway      │ ← รับ HTTP Request
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ AWS Lambda       │ ← Function ทำงานเมื่อมี Request
│ (Node.js)        │
│                  │
│ 1. รับ Payload    │
│ 2. Validate Token│
│ 3. Call LINE API │
│ 4. ส่งการแจ้งเตือน  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ LINE Platform    │ → ส่งข้อความหาผู้ใช้
└──────────────────┘
```

**ตัวอย่าง Code (AWS Lambda):**

```javascript
// Lambda Function: send-line-notify
exports.handler = async (event) => {
    const { message, token } = JSON.parse(event.body);
    
    // เรียก LINE Notify API
    const response = await fetch('https://notify-api.line.me/api/notify', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `message=${encodeURIComponent(message)}`
    });
    
    return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
    };
};
```

**ประโยชน์:**
- 💰 **ประหยัด**: จ่ายแค่ตอนมีคนใช้ (Free Tier: 1M requests/month)
- 🚀 **Scale อัตโนมัติ**: ถ้ามี 1,000 requests พร้อมกัน → สร้าง 1,000 instances
- ⚡ **Deploy เร็ว**: แค่อัปโหลด Code
- 🔒 **Security**: AWS จัดการให้

### 📊 กรณีศึกษา: Image Resizing - ปรับขนาดรูปภาพอัตโนมัติ

**Scenario**: เว็บไซต์ E-Commerce อัปโหลดรูปสินค้า → ต้องปรับขนาด (Thumbnail, Medium, Large)

```
┌────────────────────────────────────────────────────┐
│       IMAGE RESIZING SERVERLESS FLOW               │
└────────────────────────────────────────────────────┘

[Admin Upload รูปภาพ]
     │
     ▼
┌──────────────────┐
│ S3 Bucket        │ ← เก็บรูปต้นฉบับ
│ /original/       │
└────────┬─────────┘
         │
         │ Trigger Event
         ▼
┌───────────────────┐
│ Lambda Function   │
│ (Python)          │
│                   │
│ 1. ดาวน์โหลดรูป     │
│ 2. Resize (3 ขนาด)│
│    • 100x100px    │
│    • 500x500px    │
│    • 1200x1200px  │
│ 3. อัปโหลดกลับ S3   │
└────────┬──────────┘
         │
         ▼
┌──────────────────┐
│ S3 Bucket        │ ← เก็บรูปที่ปรับขนาดแล้ว
│ /thumbnails/     │
│ /medium/         │
│ /large/          │
└──────────────────┘
```

**ประโยชน์:**
- ⚡ **ทำงานทันทีที่อัปโหลด**: ไม่ต้องรอ Batch Processing
- 💰 **ประหยัด**: จ่ายแค่ตอนมีรูปใหม่
- 🚀 **Scale ได้**: อัปโหลด 100 รูปพร้อมกัน → ประมวลผล 100 รูปพร้อมกัน

### ✅ ข้อดีของ Serverless

```
╔════════════════════════════════════════════════════════╗
║           SERVERLESS ADVANTAGES                        ║
╚════════════════════════════════════════════════════════╝

1️⃣  NO SERVER MANAGEMENT (ไม่ต้องจัดการเซิร์ฟเวอร์)
    ┌─────────────────────────────────────────────┐
    │ • ไม่ต้อง Setup, Patch, Update OS             │
    │ • ไม่ต้องกังวลเรื่อง Security                    │
    │ • Provider ดูแลให้หมด                         │
    └─────────────────────────────────────────────┘

2️⃣  COST-EFFECTIVE (ประหยัดค่าใช้จ่าย)
    ┌─────────────────────────────────────────────┐
    │ • จ่ายตามการใช้งานจริง (Pay-per-Use)           │
    │ • ไม่ใช้ = ไม่เสียเงิน                           │
    │ • ไม่มีค่า Idle Server                         │
    │ • Free Tier สูง (1M requests/month)          │
    └─────────────────────────────────────────────┘

3️⃣  AUTO-SCALING (ปรับขนาดอัตโนมัติ)
    ┌─────────────────────────────────────────────┐
    │ • Scale Up/Down อัตโนมัติ                      │
    │ • รองรับ Traffic ระดับล้าน                     │
    │ • ไม่ต้องคาดการณ์ Load                         │
    └─────────────────────────────────────────────┘

4️⃣  FASTER TIME TO MARKET (ออก Production เร็ว)
    ┌─────────────────────────────────────────────┐
    │ • Focus ที่ Business Logic เท่านั้น              │
    │ • ไม่ต้องเสียเวลา Setup Infrastructure         │
    │ • Deploy ง่าย (แค่อัปโหลด Code)                │
    └─────────────────────────────────────────────┘

5️⃣  HIGH AVAILABILITY (พร้อมใช้งานสูง)
    ┌─────────────────────────────────────────────┐
    │ • Built-in Redundancy                       │
    │ • Multi-AZ Deployment                       │
    │ • Provider รับประกัน SLA 99.95%+              │
    └─────────────────────────────────────────────┘
```

### ❌ ข้อเสียและข้อจำกัด

```
╔════════════════════════════════════════════════════════╗
║        SERVERLESS CHALLENGES & LIMITATIONS             ║
╚════════════════════════════════════════════════════════╝

1️⃣  COLD START (เริ่มต้นช้า)
    ┌─────────────────────────────────────────────┐
    │ • Request แรก ช้า (100-500ms)                │
    │ • ต้องรอ Initialize Function                 │
    │ • ไม่เหมาะกับ Real-time Critical              │
    └─────────────────────────────────────────────┘

2️⃣  EXECUTION TIME LIMIT (จำกัดเวลาทำงาน)
    ┌─────────────────────────────────────────────┐
    │ • AWS Lambda: Max 15 นาที                    │
    │ • Google Cloud Functions: Max 9 นาที         │
    │ • ไม่เหมาะกับงาน Long-Running                 │
    └─────────────────────────────────────────────┘

3️⃣  VENDOR LOCK-IN (ติดกับ Provider)
    ┌─────────────────────────────────────────────┐
    │ • ย้าย Provider ยาก                          │
    │ • API แต่ละที่ต่างกัน                            │
    │ • Code ไม่ Portable                          │
    └─────────────────────────────────────────────┘

4️⃣  DEBUGGING & MONITORING (Debug ยาก)
    ┌─────────────────────────────────────────────┐
    │ • ไม่มี Shell Access                          │
    │ • Logging กระจัด กระจาย                      │
    │ • ต้องใช้เครื่องมือเฉพาะ                         │
    └─────────────────────────────────────────────┘

5️⃣  STATELESS (ไม่เก็บสถานะ)
    ┌─────────────────────────────────────────────┐
    │ • Function แต่ละครั้งเป็น Independent           │
    │ • ไม่สามารถเก็บ In-Memory Data                │
    │ • ต้องใช้ External Storage (S3, DB)           │
    └─────────────────────────────────────────────┘

6️⃣  COST AT SCALE (แพงเมื่อใช้เยอะ)
    ┌─────────────────────────────────────────────┐
    │ • ถ้ารัน 24/7 อาจแพงกว่า EC2                   │
    │ • ต้องคำนวณ Cost ดีๆ                          │
    │ • ไม่เหมาะกับ High Traffic ตลอดเวลา           │
    └─────────────────────────────────────────────┘
```

### 🎯 เมื่อไหร่ควรใช้ Serverless?

#### ✅ เหมาะสม

```
✅ Event-Driven Tasks
   • อัปโหลดรูป → Resize
   • File Upload → Process
   • Webhook → Notification

✅ APIs ที่ใช้ไม่บ่อย
   • Admin APIs
   • Cron Jobs
   • Scheduled Tasks

✅ Prototyping & MVP
   • สร้าง Prototype เร็ว
   • ทดสอบ Idea
   • Startup ระยะแรก

✅ Microservices
   • Function เล็กๆ
   • Single Responsibility
   • Event-Driven Flow
```

#### ❌ ไม่เหมาะสม

```
❌ Long-Running Tasks
   • Video Encoding (> 15 นาที)
   • Big Data Processing
   • ML Training

❌ High-Traffic 24/7
   • ถ้ารันตลอดเวลา → EC2 ถูกกว่า
   • Predictable Load → Reserved Instance

❌ Low Latency Requirements
   • Trading Systems
   • Gaming (Real-time)
   • Cold Start ไม่ได้

❌ Stateful Applications
   • WebSocket Servers
   • Game Servers
   • Chat Servers
```

---

## <a id="comparison"></a>🔍 การเปรียบเทียบและเลือกใช้

### 📊 เปรียบเทียบทั้ง 4 Architectures

```
╔═══════════════════════════════════════════════════════════════════════╗
║           ARCHITECTURE COMPARISON MATRIX                              ║
╚═══════════════════════════════════════════════════════════════════════╝

┌──────────────┬─────────────┬───────────┬───────┬────────────┐
│ Aspect       │Microservices│ Event     │ SOA   │ Serverless │
├──────────────┼─────────────┼───────────┼───────┼────────────┤
│ Scalability  │ ⭐⭐⭐⭐⭐ │ ⭐⭐⭐⭐⭐│ ⭐⭐⭐│ ⭐⭐⭐⭐⭐ │
│ Performance  │ ⭐⭐⭐⭐   │ ⭐⭐⭐    │ ⭐⭐  │ ⭐⭐⭐     │
│ Cost         │ ⭐⭐⭐     │ ⭐⭐⭐    │ ⭐⭐  │ ⭐⭐⭐⭐⭐ │
│ Maintenance  │ ⭐⭐⭐     │ ⭐⭐      │ ⭐⭐⭐│ ⭐⭐⭐⭐⭐ │
│ DevOps Needed│ ⭐⭐⭐⭐⭐ │ ⭐⭐⭐⭐  │ ⭐⭐⭐│ ⭐         │
│ Team Size    │ Large      │ Medium    │ Large  │ Small-Med  │
│ Learning     │ ⭐⭐⭐⭐⭐ │ ⭐⭐⭐⭐ │ ⭐⭐⭐ │ ⭐⭐       │
│ Curve        │            │           │        │            │
└──────────────┴────────────┴───────────┴────────┴────────────┘

⭐ = ระดับความยาก/ต้นทุน/ความซับซ้อน
```

### 🎯 Decision Tree: เลือก Architecture ยังไง?

```
                    [เริ่มต้นโปรเจกต์]
                           │
                           ▼
                  ทีมเล็กหรือใหญ่?
                     │         │
              ┌──────┘         └──────┐
              │                       │
          ทีมเล็ก                  ทีมใหญ่
          (< 10)                  (50+)
              │                       │
              ▼                       ▼
        Traffic สูงหรือไม่?      ต้องการ Scale
              │                  แยกส่วนหรือไม่?
      ┌───────┴───────┐                │
      │               │                │
    ต่ำ-กลาง        สูงมาก            ▼
      │               │              ใช่
      ▼               ▼                │
  SERVERLESS     MICROSERVICES         │
                                       ▼
                        ┌──────────────┴──────────────┐
                        │                             │
                  Real-time Events?             Reuse Services?
                        │                             │
                        ▼                             ▼
                  EVENT-DRIVEN                       SOA


แต่ละ Use Case:

1️⃣  Startup MVP
    → Start: Serverless
    → Scale: Microservices

2️⃣  E-Commerce
    → Microservices + Event-Driven

3️⃣  Government Integration
    → SOA (Legacy Systems)

4️⃣  IoT/Real-time
    → Event-Driven + Serverless

5️⃣  Enterprise App
    → SOA or Microservices
```

### 💡 ข้อควรระวัง (Trade-offs)

```
╔═══════════════════════════════════════════════════════╗
║              KEY TRADE-OFFS                           ║
╚═══════════════════════════════════════════════════════╝

1️⃣  MICROSERVICES
    ✅ Scalability, Independence
    ❌ Complexity, Distributed Tracing ยาก

2️⃣  EVENT-DRIVEN
    ✅ Loose Coupling, Scalability
    ❌ Eventual Consistency, Debugging ยาก

3️⃣  SOA
    ✅ Reusability, Legacy Integration
    ❌ ESB Bottleneck, Heavy Protocol

4️⃣  SERVERLESS
    ✅ No Ops, Cost-Effective
    ❌ Cold Start, Vendor Lock-in
```

### 🔄 Hybrid Approach (ผสมผสาน)

**ระบบจริงมักใช้หลาย Architectures ร่วมกัน!**

```
┌────────────────────────────────────────────────────┐
│       SHOPEE HYBRID ARCHITECTURE (ตัวอย่าง)          │
└────────────────────────────────────────────────────┘

[Frontend: Next.js + Vercel Functions]
                    │
                    ▼
         [API Gateway: Kong]
                    │
        ┌───────────┴───────────┬───────────────┐
        │                       │               │
        ▼                       ▼               ▼
  [Microservices]       [Event-Driven]    [Serverless]
  • User Service        • Order Events    • Image Resize
  • Product Service     • Kafka           • Email Sender
  • Cart Service        • Analytics       • Scheduled Jobs
        │                       │               │
        └───────────────────────┴───────────────┘
                            │
                            ▼
                  [Legacy SOA Services]
                  • Payment Gateway (SOAP)
                  • Bank Integration (ESB)
```

**ทำไมผสมกัน?**
- 🎯 **Microservices**: Core Business Logic
- 📊 **Event-Driven**: Real-time Notifications, Analytics
- ⚡ **Serverless**: Background Tasks, Image Processing
- 🏦 **SOA**: Legacy Integration (Banks, Government)

---

## <a id="summary"></a>📝 สรุปและเตรียมพร้อมสัปดาห์หน้า

### สรุปสัปดาห์ที่ 4

**สิ่งที่เราได้เรียนรู้:**

**1. Microservices Architecture** 🔧
- แบ่งระบบเป็น Services เล็กๆ อิสระกัน
- แต่ละ Service มี Database ของตัวเอง
- Deploy แยกกันได้
- **Use Cases**: Netflix, Grab, LINE, Shopee

**2. Event-Driven Architecture** 📊
- สื่อสารผ่าน Events
- Pub/Sub Pattern
- Asynchronous, Loose Coupling
- **Use Cases**: Real-time Systems, IoT, Banking

**3. Service-Oriented Architecture (SOA)** 🌐
- Reusable Services
- Enterprise Service Bus (ESB)
- SOAP/REST Web Services
- **Use Cases**: Enterprise Integration, Healthcare

**4. Serverless Architecture** ⚡
- Functions as a Service (FaaS)
- No Server Management
- Pay-per-Use
- **Use Cases**: Event Processing, APIs, Automation

### 🔑 Key Takeaways

```
1️⃣  ไม่มี "Perfect Architecture"
    • แต่ละแบบมี Trade-offs
    • เลือกตาม Context ของโปรเจกต์

2️⃣  Modern Systems = Hybrid
    • ผสมหลาย Architectures
    • Microservices + Event-Driven
    • เลือกให้เหมาะกับแต่ละส่วน

3️⃣  Start Simple, Evolve
    • เริ่มจาก Monolith/Serverless
    • ค่อยๆ แยกเป็น Microservices
    • เมื่อทีมและระบบโตขึ้น

4️⃣  Focus on Business Value
    • Architecture เป็นเครื่องมือ
    • ไม่ใช่เป้าหมาย
    • Deliver Value to Users First
```

### 🔜 สัปดาห์หน้า: C4 Model & Architecture Views

**เนื้อหาที่จะเรียน:**

**1. C4 Model** 📐
- Context Diagram (C1)
- Container Diagram (C2)
- Component Diagram (C3)
- Code Diagram (C4)

**2. Architecture Views** 👁️
- Logical View
- Physical View
- Process View
- Development View

**3. Architecture Documentation** 📄
- ทำไมต้องมีเอกสาร?
- เขียนยังไงให้ชัดเจน?
- Template และ Best Practices

**สิ่งที่ต้องเตรียม:**
- ทบทวน Architectural Styles ทั้งหมด (Week 3-4)
- เตรียมโปรเจกต์ "Task Board System" ที่จะใช้ตลอดเทอม
- ติดตั้ง Draw.io หรือ Lucidchart
- อ่านเพิ่มเติมเกี่ยวกับ C4 Model: https://c4model.com

---

## 🤔 คำถามชวนคิดท้ายบท

### คำถามเชิงวิเคราะห์

1. **Shopee มี 100+ microservices แต่ร้านค้าเล็กใน Facebook ใช้ Monolith - เหมาะสมหรือไม่? เพราะอะไร?**

2. **ระบบโอนเงินธนาคาร ควรใช้ Event-Driven หรือ Request-Response? อธิบายพร้อม Trade-offs**

3. **Startup ใหม่ทำ Food Delivery App ควรเริ่มจาก Architecture แบบไหน? วางแผนการ evolve ยังไง?**

4. **LINE มีผู้ใช้ 200 ล้านคน ถ้าใช้ Monolithic จะเกิดปัญหาอะไรบ้าง? แก้ไขด้วย Microservices อย่างไร?**

5. **Serverless เหมาะกับทุก Use Case หรือไม่? ให้ตัวอย่าง 3 กรณีที่เหมาะสม และ 3 กรณีที่ไม่เหมาะสม**

6. **ถ้า Service A ต้องเรียก Service B, C, D ทุกครั้ง - ควรรวมเป็น Service เดียวหรือไม่? เพราะอะไร?**

7. **Event-Driven Architecture ทำให้ Debugging ยาก - มีวิธีแก้ไขหรือลดปัญหาอย่างไร?**

### คำถามเชิงออกแบบ

8. **ออกแบบ Order Processing System สำหรับ E-Commerce ด้วย Event-Driven Architecture (วาดแผนภาพพร้อมอธิบาย Events)**

9. **เปรียบเทียบ Architecture ของ Netflix (Streaming) กับ Grab (Ride-Hailing) - เหมือนหรือต่างกันอย่างไร?**

10. **ถ้าคุณเป็น Software Architect ของหมอพร้อม - จะเลือก Architecture แบบไหน? เพราะอะไร? (ตอบพร้อมเหตุผล)**

---

## 📚 CLOs ที่เกี่ยวข้อง

สัปดาห์นี้เราได้ฝึกฝนและบรรลุ Course Learning Outcomes ดังนี้:

**CLO2 (K)**: อธิบายสถาปัตยกรรมซอฟต์แวร์รูปแบบหลัก (Microservices, Event-Driven, SOA, Serverless) พร้อมตัวอย่างการนำไปใช้

**CLO3 (K)**: อธิบายคุณลักษณะคุณภาพของซอฟต์แวร์ (Scalability, Performance, Cost) และ Trade-offs

**CLO4 (K)**: อธิบายแนวคิดพื้นฐานของสถาปัตยกรรมสำหรับเทคโนโลยีสมัยใหม่ (Cloud, Serverless, Event-Driven)

**CLO6 (C)**: ออกแบบสถาปัตยกรรมระดับสูงและเลือกใช้ Architectural Styles ที่เหมาะสมกับปัญหา

**CLO7 (C)**: ประเมินและเปรียบเทียบทางเลือกสถาปัตยกรรม โดยพิจารณา Trade-offs ด้าน Quality Attributes

---

**🙏 จบการบรรยายสัปดาห์ที่ 4**

**📌 อย่าลืม:**
- ทำ Workshop "ออกแบบ Task Board แบบ Microservices" (3 ชั่วโมง)
- ทำ Homework Lab ส่งสัปดาห์หน้า
- อ่านเพิ่มเติมเกี่ยวกับ C4 Model

**เจอกันสัปดาห์หน้าสำหรับ:**
**C4 Model & Architecture Views (Context/Container)**

---

*เอกสารนี้จัดทำโดย: นายธนิต เกตุแก้ว*  
*หลักสูตรวิศวกรรมซอฟต์แวร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*  
*ปรับปรุงล่าสุด: พ.ศ. 2568*
