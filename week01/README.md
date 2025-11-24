# ENGSE207: Software Architecture
## Week 1 - Introduction to Software Architecture & Modern Systems Overview

---

## 📋 Slide 1: Title & Course Information

**ENGSE207: สถาปัตยกรรมซอฟต์แวร์**  
**Software Architecture**

### สัปดาห์ที่ 1
**บทนำสถาปัตยกรรมซอฟต์แวร์และภาพรวมระบบสมัยใหม่**

🎓 **อาจารย์ประจำวิชา**  
🏛️ **คณะวิศวกรรมซอฟต์แวร์**  
🌐 **มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา**

---

## 📋 Slide 2: Learning Objectives (วัตถุประสงค์การเรียนรู้)

### เมื่อจบสัปดาห์นี้ นักศึกษาจะสามารถ:

✅ **อธิบายความหมาย** และบทบาทของ Software Architecture  
✅ **แยกความแตกต่าง** ระหว่าง Architecture vs Design vs Implementation  
✅ **ระบุ Stakeholders** และความต้องการของแต่ละกลุ่ม  
✅ **อธิบายแนวคิด** Views & Viewpoints  
✅ **วิเคราะห์สถาปัตยกรรม** ของระบบยอดนิยมในอุตสาหกรรม

### 🎯 Mapped to CLOs:
- **CLO1 (K)** - ความรู้พื้นฐานเรื่อง Software Architecture
- **CLO2 (K)** - ทำความเข้าใจ Architectural Styles & Patterns
- **CLO5 (C)** - วิเคราะห์ Architectural Drivers

---

## 📋 Slide 3: What is Software Architecture? (สถาปัตยกรรมซอฟต์แวร์คืออะไร?)

### 🏗️ คำนิยามจาก IEEE 1471
> **"Software Architecture** is the fundamental organization of a system, embodied in its components, their relationships to each other and the environment, and the principles governing its design and evolution."

### 🎯 สรุปเป็นภาษาง่าย:
**สถาปัตยกรรมซอฟต์แวร์** คือ "โครงสร้างรากฐานของระบบ" ที่กำหนด:
- 🧩 **ส่วนประกอบหลัก** (Components) ของระบบคืออะไร
- 🔗 **ความสัมพันธ์** ระหว่างส่วนต่างๆ เป็นอย่างไร
- 📐 **หลักการออกแบบ** และการพัฒนาที่สอดคล้องกัน

### 💡 เปรียบเทียบกับอาคาร:
เหมือนแบบแปลนสถาปัตยกรรมอาคาร ที่แสดง โครงสร้าง ห้อง ทางเดิน ระบบไฟฟ้า ประปา

---

## 📋 Slide 4: Why Architecture Matters? (ทำไมสถาปัตยกรรมถึงสำคัญ?)

### 🎯 เหตุผลสำคัญ 6 ข้อ:

1. **💰 ลดต้นทุนการพัฒนา**  
   - สถาปัตยกรรมที่ดี = ประหยัดเวลาและเงิน
   - หลีกเลี่ยง "การเขียนใหม่ทั้งระบบ" ในภายหลัง

2. **⚡ เพิ่มประสิทธิภาพระบบ**  
   - ออกแบบรองรับ Performance, Scalability ตั้งแต่แรก
   - ลด Bottleneck ที่จะเกิดในอนาคต

3. **🔧 ง่ายต่อการแก้ไขและขยาย**  
   - Modular Design ทำให้เพิ่มฟีเจอร์ใหม่ได้ง่าย
   - ลด Risk เมื่อต้องเปลี่ยนแปลง

4. **👥 สื่อสารกับทีมและ Stakeholders**  
   - ภาษากลางสำหรับ Dev, QA, Ops, Business
   - เข้าใจตรงกันตั้งแต่เริ่มโครงการ

5. **🛡️ ความปลอดภัยและเสถียรภาพ**  
   - ออกแบบ Security, Reliability ตั้งแต่ต้น
   - ลด Technical Debt

6. **📈 รองรับการเติบโต**  
   - Scalable Architecture รองรับผู้ใช้เพิ่มขึ้น
   - ง่ายต่อการ Deploy บน Cloud/Multi-region

---

## 📋 Slide 5: Architecture vs Design vs Implementation

### 🔍 ความแตกต่างที่ต้องเข้าใจ:

| Level | Focus | Concerns | Examples |
|-------|-------|----------|----------|
| **🏛️ Architecture** | **โครงสร้างระบบระดับสูง** | - Architectural Patterns<br>- System Components<br>- Quality Attributes<br>- Technology Stack | Microservices vs Monolith<br>REST API vs GraphQL<br>SQL vs NoSQL |
| **📐 Design** | **การออกแบบภายในส่วนประกอบ** | - Design Patterns<br>- Class Diagrams<br>- Module Interfaces<br>- Algorithms | MVC, Observer Pattern<br>Factory, Singleton<br>Database Schema |
| **⚙️ Implementation** | **การเขียนโค้ดจริง** | - Code Quality<br>- Coding Standards<br>- Unit Tests<br>- Performance Tuning | Clean Code<br>Naming Conventions<br>Error Handling |

### 💡 **Analogy (เปรียบเทียบ):**
- **Architecture** = แบบแปลนทั้งอาคาร (Blueprint of entire building)
- **Design** = รายละเอียดห้องแต่ละห้อง (Room interior design)
- **Implementation** = วัสดุและการก่อสร้างจริง (Actual construction materials)

---

## 📋 Slide 6: Architecture Decision Impact Timeline

### ⏰ ผลกระทบของการตัดสินใจในแต่ละระดับ

```
Cost of Change (ต้นทุนในการแก้ไข)
    ↑
    │                                        💥💥💥
    │                                    Implementation
    │                            💥💥
    │                        Design
    │            💥
    │    Architecture
    │
    └──────────────────────────────────────────────→ Time
      Early        Development        Late         Maintenance
```

### 🎯 Key Insights:
- **ระยะเริ่มต้น**: แก้ Architecture ยังไม่แพง
- **ระยะพัฒนา**: แก้ Design พอทำได้
- **ระยะหลัง**: แก้ Implementation มีต้นทุนสูงมาก
- **Maintenance**: แก้ Architecture = เขียนใหม่ทั้งระบบ! 💸

### 📌 **บทเรียน:** 
> "Make architectural decisions early, but keep them flexible enough to adapt."

---

## 📋 Slide 7: Who Cares About Architecture? (Stakeholders)

### 👥 กลุ่ม Stakeholders หลักของ Software Architecture:

#### 1. **💼 Business Stakeholders**
- 🎯 **ความต้องการ**: Time-to-Market, ROI, Cost
- 🔍 **สนใจ**: ระบบพร้อมใช้เมื่อไหร่? ใช้งบเท่าไหร่?

#### 2. **👨‍💻 Development Team**
- 🎯 **ความต้องการ**: Modifiability, Testability, Developer Experience
- 🔍 **สนใจ**: เขียนโค้ดง่าย? เทสง่าย? มี Technical Debt ไหม?

#### 3. **⚙️ Operations Team (DevOps)**
- 🎯 **ความต้องการ**: Deployability, Reliability, Monitorability
- 🔍 **สนใจ**: Deploy ง่าย? Monitor ได้? Rollback ทันไหม?

#### 4. **👤 End Users**
- 🎯 **ความต้องการ**: Performance, Usability, Availability
- 🔍 **สนใจ**: เร็ว? ใช้ง่าย? พังบ่อยไหม?

#### 5. **🔒 Security/Compliance Team**
- 🎯 **ความต้องการ**: Security, Privacy, Compliance
- 🔍 **สนใจ**: ปลอดภัย? ตาม PDPA/GDPR ไหม?

---

## 📋 Slide 8: Architectural Views & Viewpoints

### 🎨 The 4+1 Architectural View Model (Philippe Kruchten)

```
                    📱 Use Case View
                    (User Scenarios)
                          |
                          |
    📦 Logical View ------+------ 🔧 Development View
    (Functionality)       |       (Modules/Libraries)
                          |
                    ⚙️ Process View
                    (Concurrency)
                          |
                    🖥️ Physical View
                    (Hardware/Network)
```

### 🔍 แต่ละ View ตอบคำถามอะไร?

| View | คำถามหลัก | ใช้สำหรับ Stakeholder |
|------|-----------|----------------------|
| **Logical** | ระบบมีฟังก์ชันอะไรบ้าง? | Developers, Architects |
| **Development** | แบ่งโค้ดเป็น Module ยังไง? | Developers |
| **Process** | ระบบทำงานพร้อมกันอย่างไร? | Performance Engineers |
| **Physical** | Deploy บนเซิร์ฟเวอร์ไหน? | Ops, System Admins |
| **Use Case** | User ใช้งานอย่างไร? | Everyone! |

---

## 📋 Slide 9: Modern Architecture Evolution

### 📜 วิวัฒนาการของสถาปัตยกรรมซอฟต์แวร์

```
1990s           2000s           2010s           2020s
  │               │               │               │
  ▼               ▼               ▼               ▼
┌─────┐       ┌─────┐       ┌─────┐       ┌─────┐
│Mono-│       │ SOA │       │Micro│       │Edge │
│lith │  →    │     │  →    │Srv  │  →    │Cloud│
│     │       │N-Tier       │Event│       │AI   │
└─────┘       └─────┘       └─────┘       └─────┘
```

### 🔄 Timeline:
- **1990s**: Monolithic Desktop Applications
- **2000s**: Web Apps, N-Tier, SOA (Service-Oriented)
- **2010s**: Cloud-Native, Microservices, Containers
- **2020s**: Serverless, Edge Computing, AI-Native

### 🎯 ปัจจุบัน (2025):
- ☁️ **Cloud-First** Architecture
- 🎯 **Event-Driven** Systems
- 🤖 **AI/ML Integration**
- 🌍 **Global Distributed** Systems

---

## 📋 Slide 10: Case Study 1 - Netflix Architecture

### 🎬 Netflix: Global Streaming Giant

#### 📊 **Scale ที่ต้องรองรับ:**
- 👥 238+ million subscribers worldwide
- 🌍 190+ countries
- 📺 1+ billion hours streamed per week
- 🎯 99.99% availability requirement

#### 🏗️ **High-Level Architecture:**

```
[Users Worldwide]
        │
        ▼
   ┌──────────┐
   │   CDN    │ (Content Delivery Network)
   │ (AWS     │
   │CloudFront│
   └────┬─────┘
        │
        ▼
   ┌──────────┐
   │ API      │
   │ Gateway  │
   └────┬─────┘
        │
    ┌───┴────┐
    ▼        ▼
┌────────┐ ┌────────┐
│Micro   │ │Micro   │ ... (700+ microservices!)
│Service │ │Service │
│   A    │ │   B    │
└───┬────┘ └───┬────┘
    │          │
    └────┬─────┘
         ▼
   ┌──────────┐
   │Databases │
   │(Cassandra│
   │ DynamoDB)│
   └──────────┘
```

#### 🎯 **Key Architectural Decisions:**
1. **Microservices** แทน Monolith → ทีมทำงานอิสระ
2. **AWS Cloud** → Scale อัตโนมัติ
3. **CDN** → ส่งวิดีโอเร็ว Low Latency
4. **Chaos Engineering** → ทดสอบความทนทาน

---

## 📋 Slide 11: Case Study 2 - LINE Messaging Platform

### 💬 LINE: Real-time Messaging at Scale

#### 📊 **Scale:**
- 👥 200+ million monthly active users
- 💬 Billions of messages per day
- 🌏 Primary markets: Japan, Thailand, Taiwan, Indonesia

#### 🏗️ **Simplified Architecture:**

```
      [Mobile App]
           │
           ▼
   ┌───────────────┐
   │ Load Balancer │
   └───────┬───────┘
           │
   ┌───────┴────────┐
   │  Chat Servers  │ (Stateful WebSocket)
   │  (Clustered)   │
   └───────┬────────┘
           │
   ┌───────┴────────┐
   │  Message Queue │ (Kafka/Redis)
   └───────┬────────┘
           │
    ┌──────┴───────┐
    │              │
    ▼              ▼
┌────────┐    ┌─────────┐
│Message │    │Push     │
│Storage │    │Notif    │
│(DB)    │    │Service  │
└────────┘    └─────────┘
```

#### 🎯 **Key Architectural Patterns:**
1. **WebSocket** → Real-time bidirectional communication
2. **Message Queue** → Decouple services, handle spikes
3. **Horizontal Scaling** → เพิ่ม server ตามจำนวนผู้ใช้
4. **Read-Heavy Optimization** → Caching strategies

---

## 📋 Slide 12: Case Study 3 - Shopee E-Commerce

### 🛒 Shopee: Southeast Asia's Leading E-Commerce

#### 📊 **Scale:**
- 🌏 8 countries in Southeast Asia & Taiwan
- 🎯 343 million app downloads
- 💰 Billions in gross merchandise value

#### 🏗️ **High-Level Architecture:**

```
          [Web/Mobile App]
                 │
                 ▼
         ┌───────────────┐
         │  API Gateway  │
         │  (Kong/NGINX) │
         └───────┬───────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐  ┌────────┐  ┌─────────┐
│Product │  │Order   │  │Payment  │
│Service │  │Service │  │Service  │
└───┬────┘  └───┬────┘  └────┬────┘
    │           │            │
    └───────────┴────────────┘
                │
         ┌──────┴──────┐
         │             │
         ▼             ▼
   ┌──────────┐  ┌──────────┐
   │ Product  │  │ Search   │
   │ Database │  │ Engine   │
   │(Postgres)│  │(Elastic) │
   └──────────┘  └──────────┘
```

#### 🎯 **Key Architectural Challenges:**
1. **Flash Sales** → Handle traffic spikes (10x-100x normal)
2. **Multi-Region** → Different countries, different regulations
3. **Payment Integration** → Multiple payment gateways
4. **Inventory Management** → Real-time stock updates

---

## 📋 Slide 13: Common Architectural Patterns Overview

### 🎨 รูปแบบสถาปัตยกรรมที่ควรรู้จัก:

#### 1. **🏢 Monolithic Architecture**
```
┌─────────────────────────┐
│                         │
│  Single Application     │
│  ┌─────┐ ┌─────┐ ┌─────┤
│  │ UI  │ │Logic│ │ DB  ││
│  └─────┘ └─────┘ └─────┤
│                         │
└─────────────────────────┘
```
✅ **ข้อดี**: ง่าย, เริ่มต้นเร็ว  
❌ **ข้อเสีย**: Scale ยาก, Coupling สูง

#### 2. **🔲 Layered (N-Tier)**
```
┌─────────────────┐
│ Presentation    │
├─────────────────┤
│ Business Logic  │
├─────────────────┤
│ Data Access     │
├─────────────────┤
│ Database        │
└─────────────────┘
```
✅ **ข้อดี**: แยก Concern ชัดเจน  
❌ **ข้อเสีย**: Performance overhead

#### 3. **🎯 Microservices**
```
┌────┐ ┌────┐ ┌────┐
│Svc1│ │Svc2│ │Svc3│
└─┬──┘ └─┬──┘ └─┬──┘
  │      │      │
  └──────┴──────┘
      [API]
```
✅ **ข้อดี**: Scale อิสระ, ทีมแยกได้  
❌ **ข้อเสีย**: ซับซ้อน, Network overhead

#### 4. **⚡ Event-Driven**
```
[Service A] →→ [Event Bus] →→ [Service B]
                   ↓
              [Service C]
```
✅ **ข้อดี**: Loose coupling, Async  
❌ **ข้อเสีย**: Debugging ยาก, Eventual consistency

---

## 📋 Slide 14: Architectural Drivers

### 🎯 อะไรที่ขับเคลื่อนการตัดสินใจด้าน Architecture?

#### 📋 **Architectural Drivers = ปัจจัยหลักที่กำหนดสถาปัตยกรรม**

```
┌────────────────────────────────────────┐
│     Architectural Drivers              │
├────────────────────────────────────────┤
│ 1. Functional Requirements             │
│    - ระบบต้องทำอะไรบ้าง?                │
│                                        │
│ 2. Quality Attributes (NFR)           │
│    - Performance, Scalability, ...    │
│                                        │
│ 3. Technical Constraints               │
│    - Budget, Technology, Skills       │
│                                        │
│ 4. Business Constraints                │
│    - Time-to-Market, Compliance       │
└────────────────────────────────────────┘
```

### 💡 **ตัวอย่าง:**

| Driver | Example | Impact on Architecture |
|--------|---------|----------------------|
| **Performance** | Response time < 200ms | Use caching, CDN |
| **Scalability** | Support 1M users | Microservices, Load balancing |
| **Security** | PDPA compliance | Encryption, Audit logs |
| **Budget** | Limited $$ | Serverless, PaaS instead of custom |

---

## 📋 Slide 15: Quality Attributes Primer

### 🏆 คุณลักษณะคุณภาพที่สำคัญ (Quality Attributes)

#### 📊 **8 Quality Attributes หลัก:**

1. **⚡ Performance**
   - Response Time, Throughput, Latency
   - 📏 Measure: "ระบบต้องตอบสนอง < 1 วินาที"

2. **📈 Scalability**
   - รองรับผู้ใช้เพิ่มขึ้นได้ไหม?
   - 📏 Measure: "รองรับ 100K → 1M users โดยไม่ redesign"

3. **🛡️ Security**
   - ป้องกันการโจมตี, เข้ารหัสข้อมูล
   - 📏 Measure: "ผ่าน OWASP Top 10"

4. **🔧 Modifiability**
   - เปลี่ยนแปลง/เพิ่มฟีเจอร์ง่ายแค่ไหน?
   - 📏 Measure: "เพิ่มฟีเจอร์ใหม่ใน 1 sprint"

5. **💪 Reliability**
   - ระบบพร้อมใช้งาน (Availability)
   - 📏 Measure: "99.9% uptime"

6. **👥 Usability**
   - ใช้งานง่าย UX ดี
   - 📏 Measure: "User สามารถทำงานสำเร็จใน 3 คลิก"

7. **🧪 Testability**
   - ทดสอบได้ง่าย
   - 📏 Measure: "Test coverage > 80%"

8. **🚀 Deployability**
   - Deploy ง่าย, Rollback ได้
   - 📏 Measure: "Deploy ใหม่ < 10 นาที"

---

## 📋 Slide 16: Architecture vs Quality Attributes Matrix

### 🎯 Pattern ไหนตอบโจทย์ Quality ไหน?

| Pattern | Performance | Scalability | Security | Modifiability | Complexity |
|---------|------------|------------|----------|---------------|------------|
| **Monolith** | ⭐⭐⭐ | ⭐ | ⭐⭐ | ⭐ | ⭐ |
| **Layered** | ⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Microservices** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Event-Driven** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Serverless** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |

### 💡 **Key Insights:**
- ⭐ = ต่ำ, ⭐⭐⭐⭐⭐ = สูง
- **ไม่มี Pattern ไหนที่ perfect ทุกด้าน!**
- ต้อง **Trade-off** ตาม context ของโครงการ

---

## 📋 Slide 17: Modern System Examples - Real-Time Collaboration

### 📝 ระบบ Real-Time Collaboration (Google Docs, Notion, Figma)

#### 🎯 **Key Challenges:**
- 👥 Multiple users editing simultaneously
- ⚡ Real-time sync across devices
- 🔄 Conflict resolution
- 📱 Offline capability

#### 🏗️ **Architecture Components:**

```
┌──────────────┐
│ Web Client   │←──────┐
└──────┬───────┘       │ WebSocket
       │               │
       ▼               │
┌──────────────┐       │
│ WebSocket    │←──────┘
│ Server       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ CRDT Engine  │ (Conflict-free Replicated Data Type)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Document     │
│ Store        │
└──────────────┘
```

#### 🎯 **Key Patterns:**
- **WebSocket** → Real-time bidirectional
- **CRDT** → Automatic conflict resolution
- **Event Sourcing** → Store all changes
- **Optimistic UI** → Instant feedback

---

## 📋 Slide 18: Modern System Examples - Video Streaming

### 📺 Video Streaming Architecture (YouTube, TikTok)

#### 🎯 **Key Challenges:**
- 🌍 Global audience, low latency
- 📹 Multiple video qualities (360p-4K)
- 💾 Massive storage requirements
- 💰 Bandwidth costs

#### 🏗️ **Architecture Overview:**

```
[User Upload Video]
       │
       ▼
┌──────────────┐
│ Upload       │
│ Service      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Transcoding  │ (Convert to multiple formats)
│ Pipeline     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Object       │ (S3, Cloud Storage)
│ Storage      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ CDN          │ (Edge Caching)
│ Distribution │
└──────┬───────┘
       │
       ▼
  [Users Watch]
```

#### 🎯 **Key Architectural Decisions:**
1. **Transcoding** → Multiple quality levels
2. **CDN** → Serve from nearest location
3. **Adaptive Streaming** → Auto quality adjustment
4. **Analytics** → Track views, engagement

---

## 📋 Slide 19: System Context Diagram Example

### 🎨 C4 Model - Level 1: System Context

#### 📋 **ตัวอย่าง: E-Commerce System**

```
             ┌─────────────┐
             │  Customer   │
             │  (Person)   │
             └──────┬──────┘
                    │
                    │ Browses, Orders
                    ▼
         ┌──────────────────────┐
         │                      │
         │  E-Commerce System   │
         │  (Software System)   │
         │                      │
         └──────┬───────┬───────┘
                │       │
      ┌─────────┘       └──────────┐
      │                            │
      │ Sends emails               │ Processes payments
      ▼                            ▼
┌──────────────┐           ┌──────────────┐
│ Email System │           │ Payment      │
│ (External)   │           │ Gateway      │
└──────────────┘           │ (External)   │
                           └──────────────┘
```

### 🎯 **Elements:**
- **Person** = ผู้ใช้งาน (Customer, Admin)
- **Software System** = ระบบหลักของเรา
- **External System** = ระบบภายนอก

---

## 📋 Slide 20: Tools for Architecture Modeling

### 🛠️ เครื่องมือสำหรับวาด Architecture Diagrams

#### 📊 **Popular Tools:**

1. **Draw.io (diagrams.net)** ⭐⭐⭐⭐⭐
   - 🆓 Free & Open Source
   - 🌐 Web-based + Desktop
   - 📁 Export: PNG, SVG, PDF
   - ✅ **แนะนำสำหรับวิชานี้!**

2. **Lucidchart** ⭐⭐⭐⭐
   - 💰 Freemium
   - 👥 Collaboration features
   - 📋 Templates

3. **PlantUML** ⭐⭐⭐⭐
   - 📝 Text-to-Diagram
   - 🔄 Version control friendly
   - 🧑‍💻 Great for developers

4. **Structurizr** ⭐⭐⭐⭐
   - 🎯 C4 Model specific
   - 📝 Code-based diagrams
   - 🔗 Architecture as Code

5. **Miro / FigJam** ⭐⭐⭐
   - 🎨 Whiteboard style
   - 👥 Great for brainstorming
   - 🎯 Less formal diagrams

---

## 📋 Slide 21: Draw.io Quick Tutorial

### 🎨 สร้าง Architecture Diagram ด้วย Draw.io

#### 📋 **ขั้นตอนพื้นฐาน:**

1. **เปิด Draw.io**
   - 🌐 Web: https://app.diagrams.net
   - 💻 Desktop: Download ได้ฟรี

2. **เลือก Template**
   - File → New → Blank Diagram
   - หรือใช้ Template "Software Architecture"

3. **ใช้ Shape Libraries**
   - More Shapes → Software → "C4"
   - More Shapes → "AWS" / "Azure" / "GCP"

4. **Best Practices**
   - ✅ ใช้สีแยก Layer/Type
   - ✅ ใส่ Label ชัดเจน
   - ✅ ใช้ Arrow แสดงทิศทาง
   - ✅ Group ส่วนที่เกี่ยวข้อง

5. **Export**
   - File → Export as → PNG/SVG/PDF
   - File → Export as → XML (เก็บแก้ไขต่อ)

---

## 📋 Slide 22: Activity - Analyze a Familiar System

### 🎯 กิจกรรมกลุ่ม: วิเคราะห์ระบบที่คุณใช้ประจำ

#### 📋 **Instructions (30 นาที):**

1. **เลือกระบบ** (เลือก 1 อย่าง):
   - 💬 LINE
   - 🛒 Shopee / Lazada
   - 📺 Netflix / YouTube
   - 🍔 Food Delivery (Grab Food, LINE MAN)
   - 🎮 Online Game ที่เล่น

2. **วิเคราะห์และตอบคำถาม:**
   - ❓ ระบบนี้มี **Stakeholders** หลักคือใกร?
   - ❓ **Quality Attributes** สำคัญ 3 อันดับแรกคืออะไร?
   - ❓ คิดว่าใช้ **Architectural Pattern** แบบไหน?
   - ❓ มี **External Systems** ที่ต้องเชื่อมต่ออะไรบ้าง?

3. **วาด System Context Diagram แบบง่ายๆ**
   - ใช้กระดาษ / Whiteboard / Draw.io
   - แสดง User, System, External Systems

4. **เตรียมนำเสนอ 5 นาที**

---

## 📋 Slide 23: Key Architecture Principles

### 📐 หลักการสำคัญในการออกแบบสถาปัตยกรรม

#### 🎯 **12 Principles ที่ควรจำ:**

1. **🎯 Separation of Concerns**
   - แยกส่วนงานให้ชัดเจน
   - ไม่ผสมปนกันระหว่าง UI, Logic, Data

2. **🔌 Loose Coupling**
   - ส่วนต่างๆ ไม่ depend กันแน่นเกินไป
   - เปลี่ยนแปลงส่วนหนึ่งไม่กระทบทั้งระบบ

3. **🔗 High Cohesion**
   - สิ่งที่เกี่ยวข้องกันอยู่ใกล้กัน
   - Module หนึ่งทำงานสัมพันธ์กัน

4. **🔁 DRY (Don't Repeat Yourself)**
   - หลีกเลี่ยงการเขียนโค้ดซ้ำ
   - Reuse components

5. **💡 KISS (Keep It Simple, Stupid)**
   - เริ่มจากแบบง่ายก่อน
   - อย่าซับซ้อนเกินความจำเป็น

6. **📈 YAGNI (You Aren't Gonna Need It)**
   - อย่าทำฟีเจอร์ที่ "อาจจะใช้ในอนาคต"
   - ทำแค่สิ่งที่ต้องการตอนนี้

---

## 📋 Slide 24: Architecture Anti-Patterns to Avoid

### ⚠️ สิ่งที่ไม่ควรทำ (Anti-Patterns)

#### 🚫 **ข้อผิดพลาดทั่วไป:**

1. **🏢 Big Ball of Mud**
   - ระบบที่ไม่มีโครงสร้าง ยุ่งเหยิง
   - แก้ไขที่ไหน พังที่นั่น

2. **🔧 Premature Optimization**
   - Optimize ก่อนที่จะรู้ว่ามันช้าตรงไหน
   - เสียเวลากับการ optimize ที่ไม่จำเป็น

3. **🎯 Analysis Paralysis**
   - วิเคราะห์มากเกินไป ไม่เริ่มทำ
   - พยายามหา "perfect solution" จนไม่มีวันเริ่ม

4. **🔨 Golden Hammer**
   - "ถือค้อน เห็นทุกอย่างเป็นตะปู"
   - ใช้เทคโนโลยีเดิมๆ กับทุกปัญหา

5. **📦 Vendor Lock-in**
   - ผูกติดกับ Vendor หนึ่งจนเปลี่ยนไม่ได้
   - ไม่มีทางเลือก

6. **🎨 Over-Engineering**
   - ออกแบบซับซ้อนเกินความจำเป็น
   - ทำระบบเล็กๆ ด้วย Microservices 50 services

---

## 📋 Slide 25: The Role of a Software Architect

### 👨‍💼 บทบาทของ Software Architect

#### 🎯 **ความรับผิดชอบหลัก:**

1. **🎨 วิสัยทัศน์ทางเทคนิค (Technical Vision)**
   - กำหนดทิศทางการพัฒนาระบบ
   - เลือกเทคโนโลยีที่เหมาะสม

2. **🏗️ ออกแบบสถาปัตยกรรม (Architecture Design)**
   - สร้าง High-level design
   - กำหนด Patterns และ Principles

3. **👥 สื่อสาร (Communication)**
   - อธิบายสถาปัตยกรรมให้ทีมเข้าใจ
   - เชื่อมระหว่าง Business และ Technical

4. **⚖️ ตัดสินใจทางเทคนิค (Technical Decisions)**
   - ประเมิน Trade-offs
   - รับผิดชอบผลลัพธ์ระยะยาว

5. **🔍 Review และ Mentoring**
   - Code/Design Review
   - แนะนำทีมพัฒนา

#### 💡 **Skills ที่ต้องมี:**
- 🧠 Technical Expertise (รู้จริง)
- 💬 Communication Skills (อธิบายเก่ง)
- 🎯 Business Understanding (เข้าใจธุรกิจ)
- 🤝 Leadership (เป็นผู้นำได้)
- 📊 Analytical Thinking (วิเคราะห์ดี)

---

## 📋 Slide 26: Architecture Documentation

### 📝 การทำเอกสารสถาปัตยกรรม

#### 📋 **Software Architecture Document (SAD) ควรมีอะไร?**

1. **📖 Introduction**
   - Project Overview
   - Stakeholders
   - Goals & Constraints

2. **🎯 Architectural Drivers**
   - Functional Requirements
   - Quality Attribute Scenarios
   - Constraints

3. **🏗️ Architecture Views**
   - Context Diagram (C4-C1)
   - Container Diagram (C4-C2)
   - Component Diagram (C4-C3)
   - Deployment Diagram

4. **📐 Design Decisions**
   - Patterns & Styles used
   - Technology Stack
   - Rationale (เหตุผลที่เลือก)

5. **⚖️ Trade-offs & Risks**
   - Known limitations
   - Technical debt
   - Mitigation strategies

6. **📊 Quality Attributes Analysis**
   - How architecture supports each QA
   - Metrics & Measurements

---

## 📋 Slide 27: Architecture Decision Records (ADR)

### 📋 ADR Template

#### 🎯 **ADR คืออะไร?**
- บันทึกการตัดสินใจสำคัญด้านสถาปัตยกรรม
- มี Context, Decision, Rationale

#### 📝 **Template:**

```markdown
# ADR-001: เลือกใช้ Microservices Architecture

## Status
Accepted / Proposed / Deprecated / Superseded

## Context
เราต้องสร้างระบบ E-Commerce ที่รองรับ:
- 100K concurrent users
- ทีมพัฒนา 5 ทีม ทำงานอิสระ
- Deploy บ่อย (หลายครั้งต่อวัน)

## Decision
ใช้ Microservices แทน Monolith โดย:
- แบ่งเป็น 8 services หลัก
- แต่ละ service มี database ของตัวเอง
- Communication ผ่าน REST API + Event Bus

## Consequences (ผลที่ตามมา)

### Positive (ข้อดี)
✅ Scale แต่ละ service อิสระ
✅ ทีมพัฒนาทำงานไม่ซ้ำซ้อน
✅ Deploy เร็ว, Rollback ง่าย

### Negative (ข้อเสีย)
❌ Complexity สูงขึ้น
❌ ต้องการ DevOps/Monitoring tools
❌ Network latency ระหว่าง services

### Risks (ความเสี่ยง)
⚠️ ทีมไม่คุ้นเคยกับ Microservices
⚠️ ต้องลงทุน infrastructure
```

---

## 📋 Slide 28: Next Week Preview

### 📚 สัปดาห์หน้าเราจะเรียน...

#### 🎯 **สัปดาห์ที่ 2: Quality Attributes & Architectural Drivers**

เนื้อหาที่จะพูดถึง:
1. **Quality Attributes แบบละเอียด**
   - Performance, Scalability, Reliability
   - Security, Modifiability, Usability

2. **Quality Attribute Scenarios**
   - Template การเขียน Scenario
   - ตัวอย่างจากระบบจริง

3. **Architectural Drivers**
   - การระบุ Drivers จาก Requirements
   - Prioritization techniques

4. **Workshop ปฏิบัติ:**
   - เขียน QA Scenarios สำหรับ Task Board System
   - ระบุ Architectural Drivers

#### 📝 **การบ้าน:**
- ศึกษาระบบที่คุณสนใจ (LINE/Shopee/Netflix)
- เตรียม System Context Diagram ง่ายๆ
- อ่านบทความเพิ่มเติมที่แชร์

---

## 📋 Slide 29: Resources & References

### 📚 แหล่งความรู้เพิ่มเติม

#### 📖 **Books (แนะนำ):**
1. **Software Architecture in Practice** (4th Edition)
   - Len Bass, Paul Clements, Rick Kazman
   - 📌 Bible ของ Software Architecture

2. **Designing Data-Intensive Applications**
   - Martin Kleppmann
   - 📌 Modern systems architecture

3. **Building Microservices** (2nd Edition)
   - Sam Newman
   - 📌 Microservices patterns

#### 🌐 **Online Resources:**
- **C4 Model:** https://c4model.com
- **Martin Fowler's Blog:** https://martinfowler.com
- **High Scalability:** http://highscalability.com
- **AWS Architecture Center:** https://aws.amazon.com/architecture

#### 🎥 **YouTube Channels:**
- **InfoQ**
- **GOTO Conferences**
- **NDC Conferences**

---

## 📋 Slide 30: Q&A and Wrap-up

### ❓ Questions & Answers

#### 💭 **คำถามที่พบบ่อย:**

**Q1: Architecture กับ Design ต่างกันอย่างไร?**
- A: Architecture = ภาพรวมระบบ, Design = รายละเอียดภายใน

**Q2: ต้องเป็น Senior Developer ถึงจะเป็น Architect ได้ไหม?**
- A: ไม่จำเป็น แต่ต้องมีประสบการณ์พอที่จะเข้าใจ Trade-offs

**Q3: Microservices ดีกว่า Monolith เสมอไหม?**
- A: ไม่! ขึ้นกับ Context ของโครงการ

**Q4: ต้องรู้ทุก Technology ไหม?**
- A: ไม่ต้อง แต่ต้องรู้ Concept และเลือกเครื่องมือที่เหมาะสมได้

---

### 🎯 **Key Takeaways ของวันนี้:**

✅ Software Architecture = โครงสร้างรากฐานของระบบ  
✅ Architecture ≠ Design ≠ Implementation  
✅ Stakeholders ต่างกัน ต้องการมุมมองต่างกัน  
✅ Quality Attributes ขับเคลื่อนการตัดสินใจ  
✅ ไม่มี Perfect Architecture แต่มี Trade-offs

---

### 📝 **Action Items:**
- [ ] ติดตั้ง Draw.io
- [ ] ศึกษาระบบที่สนใจ
- [ ] อ่าน Resources ที่แนะนำ
- [ ] เตรียมพร้อมสำหรับ Workshop สัปดาห์หน้า

---

### 🙏 **Thank You!**
**See you next week!**

---

# Draw.io XML Codes

## Draw.io Code 1: Architecture vs Design vs Implementation Pyramid

```xml
<mxfile host="app.diagrams.net">
  <diagram name="Arch-Design-Impl">
    <mxGraphModel dx="800" dy="600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Architecture Layer (Top) -->
        <mxCell id="arch" value="🏛️ ARCHITECTURE&lt;br&gt;System Structure&lt;br&gt;Patterns, Components" style="shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=14;fontStyle=1;size=30;" vertex="1" parent="1">
          <mxGeometry x="200" y="100" width="400" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Design Layer (Middle) -->
        <mxCell id="design" value="📐 DESIGN&lt;br&gt;Module Details&lt;br&gt;Classes, Interfaces" style="shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=14;fontStyle=1;size=40;" vertex="1" parent="1">
          <mxGeometry x="160" y="200" width="480" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Implementation Layer (Bottom) -->
        <mxCell id="impl" value="⚙️ IMPLEMENTATION&lt;br&gt;Code, Tests&lt;br&gt;Functions, Variables" style="shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=14;fontStyle=1;size=50;" vertex="1" parent="1">
          <mxGeometry x="120" y="300" width="560" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Labels -->
        <mxCell id="label1" value="High-level&lt;br&gt;Strategic" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="620" y="120" width="80" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="label2" value="Mid-level&lt;br&gt;Tactical" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="660" y="220" width="80" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="label3" value="Low-level&lt;br&gt;Operational" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="700" y="320" width="80" height="40" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

## Draw.io Code 2: Netflix High-Level Architecture

```xml
<mxfile host="app.diagrams.net">
  <diagram name="Netflix-Architecture">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Users -->
        <mxCell id="users" value="👥 Users Worldwide&lt;br&gt;238M+ Subscribers" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=14;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="40" width="200" height="60" as="geometry"/>
        </mxCell>
        
        <!-- CDN -->
        <mxCell id="cdn" value="🌐 CDN Layer&lt;br&gt;AWS CloudFront&lt;br&gt;Open Connect" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="380" y="150" width="240" height="70" as="geometry"/>
        </mxCell>
        
        <!-- API Gateway -->
        <mxCell id="gateway" value="🚪 API Gateway&lt;br&gt;Zuul" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="400" y="270" width="200" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Microservices -->
        <mxCell id="ms1" value="🎬 Video Service" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="200" y="380" width="140" height="50" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms2" value="👤 User Service" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="360" y="380" width="140" height="50" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms3" value="🎯 Recommendation" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="520" y="380" width="140" height="50" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms4" value="💳 Billing Service" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="680" y="380" width="140" height="50" as="geometry"/>
        </mxCell>
        
        <!-- Databases -->
        <mxCell id="db" value="💾 Databases&lt;br&gt;Cassandra, DynamoDB&lt;br&gt;ElasticSearch" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="400" y="500" width="200" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Arrows -->
        <mxCell id="arrow1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;strokeWidth=2;" edge="1" parent="1" source="users" target="cdn">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arrow2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;" edge="1" parent="1" source="cdn" target="gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arrow3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1.5;" edge="1" parent="1" source="gateway" target="ms1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arrow4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1.5;" edge="1" parent="1" source="gateway" target="ms2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arrow5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1.5;" edge="1" parent="1" source="gateway" target="ms3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arrow6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1.5;" edge="1" parent="1" source="gateway" target="ms4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arrow7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;entryPerimeter=0;strokeWidth=1.5;dashed=1;" edge="1" parent="1" source="ms2" target="db">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <!-- Note -->
        <mxCell id="note" value="700+ Microservices&lt;br&gt;Handles billions of requests/day" style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#ffe6cc;strokeColor=#d79b00;size=15;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="40" y="480" width="140" height="60" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

## Draw.io Code 3: System Context Diagram (C4-C1) - E-Commerce

```xml
<mxfile host="app.diagrams.net">
  <diagram name="C4-Context">
    <mxGraphModel dx="1000" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Title -->
        <mxCell id="title" value="System Context Diagram - E-Commerce Platform" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=16;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="200" y="40" width="400" height="30" as="geometry"/>
        </mxCell>
        
        <!-- Customer (Person) -->
        <mxCell id="customer" value="&lt;b&gt;Customer&lt;/b&gt;&lt;br&gt;[Person]&lt;br&gt;&lt;br&gt;Browses products,&lt;br&gt;makes purchases" style="shape=actor;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="80" y="200" width="120" height="140" as="geometry"/>
        </mxCell>
        
        <!-- Admin (Person) -->
        <mxCell id="admin" value="&lt;b&gt;Admin&lt;/b&gt;&lt;br&gt;[Person]&lt;br&gt;&lt;br&gt;Manages products,&lt;br&gt;orders, users" style="shape=actor;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="620" y="200" width="120" height="140" as="geometry"/>
        </mxCell>
        
        <!-- E-Commerce System (Main) -->
        <mxCell id="system" value="&lt;b&gt;E-Commerce System&lt;/b&gt;&lt;br&gt;[Software System]&lt;br&gt;&lt;br&gt;Allows customers to browse&lt;br&gt;and purchase products online.&lt;br&gt;Provides admin interface for&lt;br&gt;managing inventory." style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;align=center;" vertex="1" parent="1">
          <mxGeometry x="280" y="200" width="240" height="140" as="geometry"/>
        </mxCell>
        
        <!-- Email System (External) -->
        <mxCell id="email" value="&lt;b&gt;Email System&lt;/b&gt;&lt;br&gt;[External System]&lt;br&gt;&lt;br&gt;Sends order confirmations,&lt;br&gt;notifications" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="140" y="450" width="180" height="100" as="geometry"/>
        </mxCell>
        
        <!-- Payment Gateway (External) -->
        <mxCell id="payment" value="&lt;b&gt;Payment Gateway&lt;/b&gt;&lt;br&gt;[External System]&lt;br&gt;&lt;br&gt;Processes credit card&lt;br&gt;payments securely" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="480" y="450" width="180" height="100" as="geometry"/>
        </mxCell>
        
        <!-- Arrows with labels -->
        <mxCell id="arr1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="customer" target="system">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr1_label" value="Uses" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=11;" vertex="1" connectable="0" parent="arr1">
          <mxGeometry x="-0.2" y="1" relative="1" as="geometry">
            <mxPoint as="offset"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="arr2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="admin" target="system">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr2_label" value="Manages" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=11;" vertex="1" connectable="0" parent="arr2">
          <mxGeometry x="-0.2" y="1" relative="1" as="geometry">
            <mxPoint as="offset"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="arr3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;endFill=1;dashed=1;" edge="1" parent="1" source="system" target="email">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr3_label" value="Sends emails using" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" vertex="1" connectable="0" parent="arr3">
          <mxGeometry x="-0.1" y="2" relative="1" as="geometry">
            <mxPoint as="offset"/>
          </mxGeometry>
        </mxCell>
        
        <mxCell id="arr4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;endFill=1;dashed=1;" edge="1" parent="1" source="system" target="payment">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr4_label" value="Processes payments via" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" vertex="1" connectable="0" parent="arr4">
          <mxGeometry x="-0.1" y="2" relative="1" as="geometry">
            <mxPoint as="offset"/>
          </mxGeometry>
        </mxCell>
        
        <!-- Legend -->
        <mxCell id="legend_box" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#666666;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="600" width="720" height="80" as="geometry"/>
        </mxCell>
        
        <mxCell id="legend_title" value="Legend:" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="610" width="60" height="20" as="geometry"/>
        </mxCell>
        
        <mxCell id="leg1" value="" style="shape=actor;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="60" y="640" width="30" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="leg1_text" value="Person" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="100" y="645" width="80" height="20" as="geometry"/>
        </mxCell>
        
        <mxCell id="leg2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="200" y="640" width="60" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="leg2_text" value="Our System" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="270" y="645" width="100" height="20" as="geometry"/>
        </mxCell>
        
        <mxCell id="leg3" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="400" y="640" width="60" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="leg3_text" value="External System" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="470" y="645" width="120" height="20" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

## Draw.io Code 4: Architectural Patterns Comparison

```xml
<mxfile host="app.diagrams.net">
  <diagram name="Patterns-Comparison">
    <mxGraphModel dx="1400" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="850">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Title -->
        <mxCell id="title" value="Common Architectural Patterns" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=18;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="20" width="600" height="30" as="geometry"/>
        </mxCell>
        
        <!-- MONOLITH -->
        <mxCell id="mono_title" value="1. Monolithic" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=14;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="80" y="80" width="200" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="mono_box" value="┌─────────────┐&lt;br&gt;│   All-in-One  │&lt;br&gt;│ ┌─────────┐ │&lt;br&gt;│ │   UI    │ │&lt;br&gt;│ ├─────────┤ │&lt;br&gt;│ │ Business│ │&lt;br&gt;│ ├─────────┤ │&lt;br&gt;│ │   Data  │ │&lt;br&gt;│ └─────────┘ │&lt;br&gt;└─────────────┘" style="text;html=1;strokeColor=#6c8ebf;fillColor=#dae8fc;align=center;verticalAlign=top;whiteSpace=wrap;fontSize=11;fontFamily=Courier New;" vertex="1" parent="1">
          <mxGeometry x="50" y="120" width="260" height="180" as="geometry"/>
        </mxCell>
        
        <mxCell id="mono_pros" value="✅ Simple&lt;br&gt;✅ Fast to start&lt;br&gt;✅ Easy deployment" style="text;html=1;strokeColor=#82b366;fillColor=#d5e8d4;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="50" y="310" width="120" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="mono_cons" value="❌ Hard to scale&lt;br&gt;❌ High coupling&lt;br&gt;❌ Long builds" style="text;html=1;strokeColor=#b85450;fillColor=#f8cecc;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="190" y="310" width="120" height="70" as="geometry"/>
        </mxCell>
        
        <!-- LAYERED -->
        <mxCell id="layer_title" value="2. Layered (N-Tier)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=14;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="80" width="200" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer1" value="Presentation Layer" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="380" y="120" width="240" height="35" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer2" value="Business Logic Layer" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="380" y="165" width="240" height="35" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer3" value="Data Access Layer" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffd966;strokeColor=#d6b656;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="380" y="210" width="240" height="35" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer4" value="Database Layer" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffcc99;strokeColor=#d79b00;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="380" y="255" width="240" height="35" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer_pros" value="✅ Clear separation&lt;br&gt;✅ Easy to understand&lt;br&gt;✅ Good for CRUD" style="text;html=1;strokeColor=#82b366;fillColor=#d5e8d4;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="380" y="310" width="120" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer_cons" value="❌ Performance hit&lt;br&gt;❌ Not flexible&lt;br&gt;❌ Monolithic still" style="text;html=1;strokeColor=#b85450;fillColor=#f8cecc;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="520" y="310" width="120" height="70" as="geometry"/>
        </mxCell>
        
        <!-- MICROSERVICES -->
        <mxCell id="micro_title" value="3. Microservices" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=14;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="730" y="80" width="200" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms_gateway" value="API Gateway" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="750" y="120" width="160" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms1_box" value="Service 1&lt;br&gt;DB1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="710" y="180" width="80" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms2_box" value="Service 2&lt;br&gt;DB2" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="805" y="180" width="80" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms3_box" value="Service 3&lt;br&gt;DB3" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="900" y="180" width="80" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms_bus" value="Message Bus / Event Stream" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="710" y="260" width="270" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="micro_pros" value="✅ Independent scaling&lt;br&gt;✅ Team autonomy&lt;br&gt;✅ Tech diversity" style="text;html=1;strokeColor=#82b366;fillColor=#d5e8d4;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="710" y="310" width="130" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="micro_cons" value="❌ Complex ops&lt;br&gt;❌ Network latency&lt;br&gt;❌ Data consistency" style="text;html=1;strokeColor=#b85450;fillColor=#f8cecc;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="860" y="310" width="130" height="70" as="geometry"/>
        </mxCell>
        
        <!-- EVENT-DRIVEN -->
        <mxCell id="event_title" value="4. Event-Driven" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=14;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="1070" y="80" width="200" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="producer1" value="Service A&lt;br&gt;(Producer)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="1050" y="120" width="90" height="50" as="geometry"/>
        </mxCell>
        
        <mxCell id="event_bus" value="Event Bus&lt;br&gt;(Kafka, RabbitMQ)" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="1095" y="190" width="120" height="80" as="geometry"/>
        </mxCell>
        
        <mxCell id="consumer1" value="Service B&lt;br&gt;(Consumer)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="1050" y="290" width="90" height="50" as="geometry"/>
        </mxCell>
        
        <mxCell id="consumer2" value="Service C&lt;br&gt;(Consumer)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="1170" y="290" width="90" height="50" as="geometry"/>
        </mxCell>
        
        <mxCell id="arr_e1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="producer1" target="event_bus">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arr_e2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="event_bus" target="consumer1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arr_e3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="event_bus" target="consumer2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="event_pros" value="✅ Loose coupling&lt;br&gt;✅ Async processing&lt;br&gt;✅ Scalable" style="text;html=1;strokeColor=#82b366;fillColor=#d5e8d4;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="1050" y="360" width="120" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="event_cons" value="❌ Complex debugging&lt;br&gt;❌ Event ordering&lt;br&gt;❌ Eventual consistency" style="text;html=1;strokeColor=#b85450;fillColor=#f8cecc;align=left;verticalAlign=top;whiteSpace=wrap;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="1190" y="360" width="150" height="70" as="geometry"/>
        </mxCell>
        
        <!-- Bottom Summary -->
        <mxCell id="summary" value="💡 Choose based on: Team size, Scale requirements, Complexity tolerance, Budget" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontSize=12;fontStyle=2;align=center;" vertex="1" parent="1">
          <mxGeometry x="50" y="460" width="1290" height="40" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

# Additional Infographics Descriptions

## Infographic 1: Cost of Change Timeline
**Description:** แสดง Graph เส้นโค้งที่แกน Y คือ "Cost of Change" และแกน X คือ "Project Timeline" มี 3 เส้นคือ Architecture (สีน้ำเงิน), Design (สีเหลือง), Implementation (สีเขียว) โดยเส้น Architecture เริ่มต้นต่ำแต่พุ่งขึ้นสูงมากในช่วงปลาย แสดงให้เห็นว่าการแก้ไข Architecture ในช่วงหลังมีต้นทุนสูงมาก

## Infographic 2: Stakeholder Concerns Matrix
**Description:** สร้าง Matrix แสดงความสัมพันธ์ระหว่าง Stakeholders (แถว) กับ Quality Attributes (คอลัมน์) ใช้สีหรือสัญลักษณ์แสดงระดับความสนใจ เช่น:
- Business: 🔥🔥🔥 Time-to-Market, 🔥🔥 Cost
- Developers: 🔥🔥🔥 Modifiability, 🔥🔥 Testability
- Users: 🔥🔥🔥 Performance, 🔥🔥🔥 Usability

## Infographic 3: Architecture Evolution Timeline
**Description:** Timeline แนวนอนแสดงวิวัฒนาการตั้งแต่ปี 1990 - 2025 มีไอคอนและชื่อ Pattern พร้อมตัวอย่างเทคโนโลยี:
- 1990s: Desktop Apps (Windows Forms, VB6)
- 2000s: Web Apps, SOA (J2EE, .NET)
- 2010s: Cloud, Microservices (AWS, Docker, Kubernetes)
- 2020s: Serverless, AI-Native (Lambda, GPT Integration)

---

# End of Week 1 Lecture Material
