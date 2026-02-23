# ENGSE207 สถาปัตยกรรมซอฟต์แวร์ (Software Architecture)
## เอกสารประกอบการสอน — ทฤษฎีก่อนปฏิบัติ Term Project Week 7

---

## หน่วยเรียน: Event-Driven Architecture, Message Broker และ Pub/Sub Pattern

### ข้อมูลทั่วไป
- **จำนวนชั่วโมง:** บรรยาย 2 ชม. (ก่อนเข้า Lab 3 ชม.)
- **ระดับชั้น:** ปีที่ 2 วิศวกรรมซอฟต์แวร์
- **CLO ที่เกี่ยวข้อง:** CLO2, CLO3, CLO4, CLO5, CLO6, CLO7, CLO13
- **ผู้สอน:** นายธนิต เกตุแก้ว
- **เอกสาร Lab ที่สอดคล้อง:** `week7_lab_event_driven_rabbitmq.md`

---

## ชื่อบทเรียน

### 1.1 Synchronous vs Asynchronous Communication: สองวิธีที่ Services คุยกัน
### 1.2 Event-Driven Architecture: หลักการและ Core Concepts
### 1.3 Message Broker & RabbitMQ: ตัวกลางส่งข้อความระหว่าง Services
### 1.4 Pub/Sub Pattern & Event Contract: ข้อตกลงของระบบ
### 1.5 Quality Attributes, Trade-offs & เมื่อไหร่ควร/ไม่ควรใช้

---

## วัตถุประสงค์การสอน

### 1.1 Synchronous vs Asynchronous Communication

**1.1.1** นักศึกษาสามารถอธิบายความแตกต่างระหว่างการสื่อสารแบบ Synchronous (Request/Response) กับ Asynchronous (Event-Based) ได้ พร้อมระบุข้อดีข้อเสียของแต่ละแบบ

**1.1.2** นักศึกษาสามารถวิเคราะห์สถานการณ์และระบุได้ว่ากรณีใดควรใช้ Sync และกรณีใดควรใช้ Async

### 1.2 Event-Driven Architecture

**1.2.1** นักศึกษาสามารถอธิบายหลักการ Event-Driven Architecture ว่าคืออะไร ประกอบด้วยองค์ประกอบอะไรบ้าง และแตกต่างจาก Request-Driven อย่างไร

**1.2.2** นักศึกษาสามารถอธิบายแนวคิด Loose Coupling ที่ Event-Driven สร้างขึ้น และอธิบายว่าทำไมมันสำคัญ

### 1.3 Message Broker & RabbitMQ

**1.3.1** นักศึกษาสามารถอธิบายบทบาทของ Message Broker ในฐานะตัวกลางระหว่าง Services ได้

**1.3.2** นักศึกษาสามารถอธิบายองค์ประกอบหลักของ RabbitMQ (Producer, Exchange, Queue, Consumer, Binding) และความสัมพันธ์ระหว่างกันได้

### 1.4 Pub/Sub Pattern & Event Contract

**1.4.1** นักศึกษาสามารถอธิบาย Publish/Subscribe Pattern และเปรียบเทียบกับ Point-to-Point (Direct) Pattern ได้

**1.4.2** นักศึกษาสามารถออกแบบ Event Contract/Schema ที่ชัดเจนเพื่อให้ Services สื่อสารกันได้อย่างถูกต้อง

### 1.5 Quality Attributes & Trade-offs

**1.5.1** นักศึกษาสามารถวิเคราะห์ผลกระทบของ Event-Driven Architecture ต่อ Quality Attributes (Scalability, Availability, Performance, Debuggability) ได้

**1.5.2** นักศึกษาสามารถระบุสถานการณ์ที่ควรและไม่ควรใช้ Event-Driven Architecture ได้

---

## สรุป CLO ที่เกี่ยวข้อง

### 🎯 CLO2 (Knowledge - K)
**อธิบาย Architectural Styles และ Patterns พื้นฐาน** — Event-Driven เป็น Style ที่แตกต่างจาก Request-Driven อย่างสิ้นเชิง

> **ความเชื่อมโยง:** สัปดาห์นี้เปลี่ยนจาก "ถาม-ตอบ" (Synchronous) ไปเป็น "ประกาศ-รับฟัง" (Publish/Subscribe) ทำให้เห็นว่า Communication Pattern เปลี่ยน สถาปัตยกรรมก็เปลี่ยนตาม

### 🎯 CLO3 (Knowledge - K)
**อธิบาย Quality Attributes** — Loose Coupling, Scalability, Fault Tolerance จาก Event-Driven

> **ความเชื่อมโยง:** การแยก Services ให้สื่อสารผ่าน Events ทำให้ระบบ Fault Tolerant มากขึ้น ถ้า Service หนึ่งล่ม Events ยังอยู่ใน Queue รอ

### 🎯 CLO4 (Cognitive Skill - C)
**ประยุกต์ใช้เครื่องมือ** — RabbitMQ, Docker, Multi-Service Deployment

### 🎯 CLO5 (Cognitive Skill - C)
**ออกแบบ Architecture Documentation** — Event Flow Diagram, Event Contract

### 🎯 CLO6 (Cognitive Skill - C)
**ประเมินและเปรียบเทียบ** — N-Tier (Sync) vs Event-Driven (Async)

### 🎯 CLO7 (Practical Skill - P)
**ออกแบบสถาปัตยกรรม** — กำหนด Event Types, Exchange, Queues, Consumer Services

### 🎯 CLO13 (Attitude - A)
**ตระหนักถึงความสำคัญของ Non-Functional Requirements** — เข้าใจว่า Async ไม่ได้ดีกว่า Sync เสมอไป ขึ้นกับบริบท

---

## ส่วนที่ 1: ทบทวนสัปดาห์ที่แล้ว (5 นาที)

### 📋 จากที่เราเรียนมา...

| สัปดาห์ | Architecture Style | Communication | สิ่งที่ได้เรียน |
|:--:|:--|:--|:--|
| 3 | Monolith | Function Call (ภายใน) | ทุกอย่างอยู่ใน 1 Process |
| 4 | Layered | Function Call (ภายใน) | แบ่ง Code เป็น Layer |
| 5 | Client-Server | HTTP (Sync) | แยก FE/BE คุยผ่าน API |
| 6 | N-Tier + Cache + LB | HTTP (Sync) | แยก Tier + Cache + Scale |
| **7** | **Event-Driven** | **Message Queue (Async)** | **Services คุยผ่าน Events** |

### 🔗 เชื่อมโยงกับสัปดาห์นี้

สัปดาห์ที่ 6 เราทำ N-Tier ที่สื่อสารแบบ **Synchronous** ทั้งหมด:

```
สัปดาห์ที่ 6: สิ่งที่ทำได้ดีแล้ว + ปัญหาที่เหลืออยู่
───────────────────────────────────────────────────────
✅ Scale App ได้หลาย Instance (Horizontal Scaling)
✅ Cache ลด DB Load (Redis)
✅ Load Balance กระจาย Request (Nginx)

❌ ทุก Request ยัง Synchronous — Client ต้อง "รอ" จนทุกอย่างเสร็จ
❌ ถ้าต้อง "ส่ง Email + บันทึก Log + อัพเดท Stats" หลังสร้าง Task?
   → Client ต้องรอทุกขั้นตอน → ช้า!
❌ ถ้าบริการส่ง Email ล่ม → ทั้ง API ล่ม (Tight Coupling)
❌ เพิ่ม Feature ใหม่ (เช่น ส่ง Push Notification) = ต้องแก้ Task API
```

สัปดาห์นี้เราจะแก้ปัญหาเหล่านี้ด้วย **Event-Driven Architecture**:
- Task Service ทำ CRUD เสร็จ → **Publish Event** → Client ได้ Response ทันที
- Notification Service, Audit Service **Subscribe** รับ Event → ทำงานเอง
- **ไม่มีใครต้องรอใคร** (Asynchronous)

---

## ส่วนที่ 2: เนื้อหาบทเรียน (90 นาที)

---

## 1.1 Synchronous vs Asynchronous Communication

### 🔄 Synchronous (Request/Response) — สิ่งที่เราใช้มาตลอด

**หลักการ:** ผู้ส่ง (Client) ส่ง Request → **รอ** → ผู้รับ (Server) ประมวลผล → ส่ง Response กลับ

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Synchronous Communication (Week 3-6)                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Client                          Server                                 │
│    │                               │                                    │
│    │── POST /api/tasks ───────────►│                                    │
│    │   "สร้าง Task ใหม่"             │                                    │
│    │                               │── INSERT INTO tasks                │
│    │                               │── Send email ⏳                    │
│    │   🧍 Client กำลังรอ...         │── Write audit log ⏳               │
│    │   🧍 ยังรออยู่...                │── Update statistics ⏳             │
│    │                               │                                    │
│    │◄── 201 Created ───────────────│                                    │
│    │   "เสร็จแล้วครับ"                │                                    │
│    │                               │                                    │
│    ⏱️ Total: 50 + 100 + 30 + 20 = 200ms                                 │
│                                                                         │
│    📌 Client ต้องรอทุกขั้นตอนเสร็จ ก่อนได้ Response                            │
│    📌 ถ้า Email Service ล่ม → ทั้ง Request fail!                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**เปรียบเทียบในชีวิตจริง:**
> Sync = โทรศัพท์ 📞
> - ต้องรอให้อีกฝ่ายรับสาย
> - ถ้าไม่รับ → ไม่ได้คุย (fail)
> - ต้องจบเรื่องหนึ่งก่อน ถึงจะไปทำเรื่องต่อไป

---

### ⚡ Asynchronous (Event-Based) — สิ่งที่เราจะเรียนวันนี้

**หลักการ:** ผู้ส่ง Publish Event → **ไม่รอ** → ผู้รับ Subscribe แล้วทำงานเอง

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Asynchronous Communication (Week 7)                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Client          Task Service      RabbitMQ       Notif / Audit         │
│    │                  │                │               │                │
│    │── POST /tasks ──►│                │               │                │
│    │                  │── INSERT DB    │               │                │
│    │                  │── Publish ────►│               │                │
│    │◄── 201 Created ──│   Event        │               │                │
│    │                  │                │               │                │
│    ⏱️ 50ms (Client เสร็จแล้ว!)           │               │                │
│    🎉 Client ทำอย่างอื่นต่อได้              │               │                │
│                                        │               │                │
│    ──────── ✂️ Async Boundary ─────────│───────────────│────────        │
│                                        │               │                │
│                                        │── Deliver ───►│                │
│                                        │   Event       │── Send email   │
│                                        │               │── Write audit  │
│                                        │               │── Update stats │
│                                        │               │                │
│    ⏱️ +100-500ms (Client ไม่รู้ ไม่ต้องรอ)                                   │
│                                                                         │
│    📌 Client ได้ Response ทันทีหลัง INSERT DB                               │
│    📌 ถ้า Email Service ล่ม → Task ยังสร้างสำเร็จ! Events รอใน Queue         │
│    📌 เมื่อ Email Service กลับมา → ทำงานต่อจาก Queue                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**เปรียบเทียบในชีวิตจริง:**
> Async = ส่ง LINE 💬
> - ส่งข้อความแล้วก็จบ ไม่ต้องรอ
> - อีกฝ่ายมาอ่านเมื่อไหร่ก็ได้
> - ถ้าอีกฝ่ายปิดเครื่อง → ข้อความยังอยู่ รอจนเปิดมาอ่าน

---

### 📊 เปรียบเทียบ Sync vs Async แบบละเอียด

```
┌──────────────────┬────────────────────────┬────────────────────────────┐
│   หัวข้อ           │  Synchronous           │  Asynchronous              │
│                  │  (Request/Response)    │  (Event-Driven)            │
├──────────────────┼────────────────────────┼────────────────────────────┤
│  การทำงาน        │  ส่ง → รอ → รับ          │  ส่ง → ทำต่อเลย              │ 
│  Coupling        │  Tight (ผูกแน่น)         │  Loose (แยกจากกัน)          │
│  Response Time   │  รวมทุกขั้นตอน            │  แค่งานหลัก (เร็วกว่า)         │
│  Failure Impact  │  1 ล่ม = ทั้งหมดล่ม        │  1 ล่ม = ที่เหลือยังทำงาน       │
│  ลำดับการทำงาน    │  แน่นอน (กำหนดได้)       │  ไม่แน่นอน (ใครเสร็จก่อนก็ได้)   │
│  Data Consistency│  Strong (ทันที)          │  Eventual (สุดท้ายจะตรงกัน)   │
│  Debugging       │  ง่าย (ตาม Request)     │  ยาก (ตาม Event flow)      │
│  Scalability     │  ปานกลาง               │  สูง (แยก Scale ได้)         │
│  Complexity      │  ต่ำ                    │  สูง                        │
├──────────────────┼────────────────────────┼────────────────────────────┤
│  เหมาะกับ         │  CRUD ทั่วไป             │  Notification, Logging     │
│                  │  ต้องการผลลัพธ์ทันที        │  Background jobs           │
│                  │  Transaction สำคัญ      │  ระบบที่ต้อง Scale ใหญ่        │
├──────────────────┼────────────────────────┼────────────────────────────┤
│  ตัวอย่าง          │  โอนเงิน (ต้องรู้ผลทันที)    │  ส่ง Email (ช้าหน่อยไม่เป็นไร)  │
│                  │  ค้นหาสินค้า              │  ใบเสร็จ (สร้างทีหลังได้)       │
│                  │  Login                 │  Push Notification         │
└──────────────────┴────────────────────────┴────────────────────────────┘
```

---

### 🤔 เมื่อไหร่ใช้ Sync / เมื่อไหร่ใช้ Async?

**ใช้ Synchronous เมื่อ:**
1. Client **ต้องรู้ผลลัพธ์ทันที** — "โอนเงินสำเร็จหรือไม่?"
2. ต้องการ **Strong Consistency** — ข้อมูลต้องตรงกัน 100% ทันที
3. ขั้นตอนถัดไป **ขึ้นกับผลลัพธ์ก่อนหน้า** — "ถ้า login สำเร็จ ค่อยโหลดหน้า dashboard"

**ใช้ Asynchronous เมื่อ:**
1. Client **ไม่ต้องรอผลลัพธ์** — "ส่ง email แจ้งเตือน" (ผู้ใช้ไม่ต้องรอ)
2. งานใช้เวลานาน — "สร้างรายงาน PDF" (ทำ background แล้วแจ้งเมื่อเสร็จ)
3. ต้อง **กระจายงานไปหลาย Services** — "สร้าง Order → แจ้งคลังสินค้า + ส่ง Email + อัพเดทสถิติ"
4. ต้องการ **Fault Tolerance** — ถ้า Service ปลายทางล่ม งานเข้าคิวรอ

---

## 1.2 Event-Driven Architecture: หลักการและ Core Concepts

### 📡 Event-Driven Architecture (EDA) คืออะไร?

**Event-Driven Architecture** คือรูปแบบสถาปัตยกรรมที่ Services สื่อสารกันผ่าน **Events** (เหตุการณ์ที่เกิดขึ้น) แทนที่จะเรียกกันโดยตรง

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Event-Driven Architecture — Core Idea                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  แนวคิดหลัก:                                                              │
│  ─────────                                                              │
│  ❌ แบบเก่า:  "Service A เรียก Service B โดยตรง"                          │
│               Service A ──HTTP──► Service B                             │
│               (A ต้องรู้จัก B, ต้องรู้ว่า B อยู่ที่ไหน)                             │
│                                                                         │
│  ✅ แบบใหม่:  "Service A ประกาศว่ามีอะไรเกิดขึ้น ใครสนใจก็รับไป"                │
│               Service A ──Event──► Message Broker ──► Service B         │
│               (A ไม่ต้องรู้จัก B เลย!)                 ──► Service C         │
│                                                   ──► Service D         │
│                                                                         │
│  📌 "Don't call us, we'll call you" (Hollywood Principle)               │
│     Service A ไม่ต้องโทรหา B, C, D ทีละตัว                                  │
│     แค่ "ประกาศ Event" แล้ว B, C, D จะรับฟังเอง                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 🧩 องค์ประกอบหลักของ EDA

```
┌─────────────────────────────────────────────────────────────────────────┐
│  3 องค์ประกอบหลัก                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. EVENT (เหตุการณ์)                                                     │
│     ─────────────                                                       │
│     = "สิ่งที่เกิดขึ้นแล้ว" — เป็นข้อเท็จจริงของอดีต                                 │
│                                                                         │
│     ตัวอย่าง:                                                             │
│     • TaskCreated = "Task ถูกสร้างแล้ว"                                    │
│     • TaskCompleted = "Task ถูกทำเสร็จแล้ว"                                │
│     • OrderPlaced = "มีคนสั่งซื้อแล้ว"                                        │
│     • PaymentReceived = "ได้รับเงินแล้ว"                                    │
│                                                                         │
│     📌 Event ใช้ Past Tense (อดีตกาล) → เพราะเกิดขึ้นแล้ว                     │
│     📌 Event เป็น Immutable → ไม่สามารถแก้ไขได้ (เหมือนประวัติศาสตร์)           │
│                                                                         │
│  2. EVENT PRODUCER (ผู้ส่ง)                                                │
│     ──────────────────                                                  │
│     = Service ที่ "ประกาศ" ว่ามี Event เกิดขึ้น                                │
│     = ไม่ต้องรู้ว่าใครจะรับ (ไม่สนใจ)                                          │
│                                                                         │
│     ใน Lab นี้: Task Service = Producer                                   │
│     (เมื่อสร้าง/แก้ไข/ลบ Task → Publish Event)                              │
│                                                                         │
│  3. EVENT CONSUMER (ผู้รับ)                                                │
│     ──────────────────                                                  │
│     = Service ที่ "สมัครรับฟัง" Events ที่สนใจ                                 │
│     = ไม่ต้องรู้ว่า Event มาจากไหน (ไม่สนใจ)                                  │
│                                                                         │
│     ใน Lab นี้:                                                           │
│     • Notification Service = Consumer (รับ Event → แจ้งเตือน)              │
│     • Audit Service = Consumer (รับ Event → บันทึก Log)                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 🔗 Loose Coupling — ข้อดีที่สำคัญที่สุดของ EDA

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Tight Coupling (Week 6)                vs   Loose Coupling (Week 7)     │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ❌ Task API รู้จักทุก Service:            ✅ Task API ไม่รู้จักใครเลย:          │
│                                                                          │
│  // ต้องเรียกทุก Service ด้วยมือ           // แค่ Publish Event                │
│  async function createTask(data) {      async function createTask(data){ │
│    const task = await db.insert(data);   const task = await db.insert(); │
│    await emailService.send(task);  ←     publish('TASK_CREATED', task);  │
│    await auditService.log(task);   ←     return task;                    │
│    await statsService.update(task);←   }                                 │
│    return task;                                                          │
│  }                                       Producer ไม่สนใจว่า               │
│                                          ใครจะรับ Event ไปทำอะไร          │
│  ถ้าเพิ่ม Push Notification:                                                │
│  → ต้องแก้ Task API!                     ถ้าเพิ่ม Push Notification:          │
│  await pushService.notify(task);  ←     → แค่สร้าง Consumer ใหม่!           │
│                                          → Task API ไม่ต้องแก้เลย!          │
│                                                                          │
│  ⚠️ ปัญหา Tight Coupling:                ✅ ข้อดี Loose Coupling:           │
│  • เพิ่ม Service = แก้ Task API           • เพิ่ม Service = เพิ่ม Consumer      │
│  • 1 Service ล่ม = ทุกอย่าง fail          • 1 Service ล่ม = Event รอใน Q     │
│  • ทดสอบยาก (ต้อง Mock ทุก Service)      • ทดสอบง่าย (แต่ละตัวแยกกัน)          │
│  • Deploy ต้องพร้อมกัน                   • Deploy อิสระ                      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### 🏪 ตัวอย่างจริง: Event-Driven ในระบบที่คุ้นเคย

#### Shopee — สั่งซื้อสินค้า (Order Flow)

```
ลูกค้ากด "สั่งซื้อ" → OrderService สร้าง Order สำเร็จ
                      → Publish: OrderPlaced Event
                      → Client เห็น "สั่งซื้อสำเร็จ" ทันที ✅

พร้อมกัน (Async):
  OrderPlaced ──► InventoryService:  ตัดสต็อกสินค้า
               ──► PaymentService:   เรียกเก็บเงิน
               ──► EmailService:     ส่ง Email ยืนยัน
               ──► NotificationService: Push แจ้งเตือน
               ──► AnalyticsService: บันทึกสถิติ
               ──► SellerService:    แจ้งร้านค้า

ถ้า EmailService ล่ม? → Order ยังสำเร็จ!
                        → Email Event รอใน Queue
                        → เมื่อ EmailService กลับมา → ส่ง Email ได้
```

#### LINE — ส่งข้อความ

```
ผู้ใช้ส่งข้อความ "สวัสดี" → MessageService บันทึก
                          → Publish: MessageSent Event
                          → ผู้ส่งเห็น ✓ (ส่งแล้ว) ทันที

Async:
  MessageSent ──► DeliveryService:  ส่งไปยังผู้รับ
              ──► PushNotification: แจ้งเตือนบนมือถือ
              ──► ReadReceiptService: เตรียม tracking ✓✓
              ──► AnalyticsService:  นับจำนวนข้อความ
```

#### หมอพร้อม — จองนัดฉีดวัคซีน

```
ลงทะเบียนจองสำเร็จ → BookingService สร้าง Appointment
                    → Publish: AppointmentBooked Event

Async:
  AppointmentBooked ──► SMSService:      ส่ง SMS ยืนยัน
                    ──► CalendarService: เพิ่มปฏิทิน
                    ──► StockService:    จอง Vaccine dose
                    ──► ReportService:   อัพเดทสถิติการจอง
```

---

## 1.3 Message Broker & RabbitMQ

### 🐰 Message Broker คืออะไร?

**Message Broker** = ตัวกลาง (Middleware) ที่รับ-ส่ง-จัดการ Messages ระหว่าง Services

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ทำไมต้องมี Message Broker?                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ❌ ไม่มี Broker (Direct Communication):                                  │
│                                                                         │
│     Producer ──────► Consumer A      Producer ต้องรู้ว่า                    │ 
│     Producer ──────► Consumer B      Consumer อยู่ที่ไหน                    │
│     Producer ──────► Consumer C      ถ้า Consumer C ล่ม → Message หาย     │
│                                                                         │
│  ✅ มี Broker (Indirect Communication):                                  │
│                                                                         │
│     Producer ──► [ Message Broker ] ──► Consumer A                      │
│                        │            ──► Consumer B                      │
│                        │            ──► Consumer C (ล่ม → Message รอ)    │
│                        │                                                │
│                   Message Broker ทำหน้าที่:                                │
│                   ① รับ Message จาก Producer                            │
│                   ② เก็บ Message ไว้ใน Queue (ไม่หาย)                     │
│                   ③ ส่ง Message ไปยัง Consumer ที่สมัครรับ                   │
│                   ④ รับประกันว่า Message ถูกส่งถึง (Acknowledge)             │
│                                                                         │
│  เปรียบเทียบ:                                                             │
│  ❌ ไม่มี Broker = ส่งจดหมายด้วยมือ (ต้องเดินไปส่งเอง)                          │
│  ✅ มี Broker = ส่งผ่านไปรษณีย์ (ไปรษณีย์จัดการให้)                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 🐰 RabbitMQ Architecture — องค์ประกอบทั้ง 5

```
┌─────────────────────────────────────────────────────────────────────────┐
│  RabbitMQ Internal Architecture                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ① Producer                                                            │
│  ──────────                                                             │
│  Service ที่ส่ง Message (เช่น Task Service)                                 │
│  ส่ง Message ไปที่ Exchange (ไม่ส่งตรงไป Queue!)                             │
│                                                                         │
│        ┌───────────────┐          ┌──────────────┐                      │
│        │  ① Producer  │ ──msg──► │  ② Exchange  │                      │
│        │  Task Service │          │  task.events │                      │
│        └───────────────┘          └──────┬───────┘                      │
│                                          │                              │
│  ② Exchange                             │ ④ Binding                    │
│  ──────────                              │ (กฎการ route)                │
│  ตัวกระจาย Message → ส่งไป Queue ตาม Rules │                              │
│  เหมือน "ตู้ไปรษณีย์ส่วนกลาง"                  │                              │
│                                          │                              │
│  Exchange Types:                   ┌─────┴────┐                         │
│  • fanout  = ส่งทุก Queue            │          │                         │
│  • direct  = ส่งตาม routing key     ▼          ▼                         │
│  • topic   = ส่งตาม pattern    ┌─────────┐ ┌────────┐                    │
│                               │③ Queue │ │③ Queue │                    │
│  ③ Queue                     │ notif   │ │ audit   │                   │
│  ──────                       └───┬─────┘ └───┬────┘                    │
│  คิวเก็บ Message รอ Consumer        │           │                         │
│  เหมือน "ตู้จดหมายหน้าบ้าน"            ▼           ▼                         │
│                               ┌─────────┐ ┌──────────┐                  │
│  ④ Binding                   │⑤Consumer│ │⑤Consumer│                  │
│  ──────────                   │ Notif   │ │ Audit    │                  │
│  กฎที่บอกว่า Exchange            │ Service │ │ Service  │                  │
│  ส่ง Message ไป Queue ไหน      └─────────┘ └──────────┘                  │
│                                                                         │
│  ⑤ Consumer                                                            │
│  ──────────                                                             │
│  Service ที่รับ Message จาก Queue                                          │
│  ทำงานเสร็จ → ส่ง ACK (Acknowledge) กลับ → Queue ลบ Message                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 📡 Exchange Types — ละเอียด

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Exchange Type: fanout ⭐ (ใช้ใน Lab สัปดาห์นี้)                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  "ส่ง Message ไปทุก Queue ที่ bind"                                         │
│  เหมือน: วิทยุ FM — ออกอากาศ ใครเปิดฟังก็ได้ยิน                                 │
│                                                                         │
│  Producer ──► Exchange (fanout) ──► Queue A ──► Consumer A              │
│                                 ──► Queue B ──► Consumer B              │
│                                 ──► Queue C ──► Consumer C              │
│                                                                         │
│  ใช้เมื่อ: ทุก Consumer ต้องรู้ทุก Event (เหมือน Lab → Notif + Audit)            │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  Exchange Type: direct                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  "ส่ง Message ไป Queue ที่ routing key ตรงกัน"                              │
│  เหมือน: ส่งจดหมายใส่ซอง เขียนชื่อผู้รับ ไปรษณีย์ส่งให้ถูกคน                           │
│                                                                         │
│  Producer ──► Exchange (direct)                                         │
│     msg: routing_key="error"    ──► Queue "errors"  ──► Error Handler   │
│     msg: routing_key="info"     ──► Queue "logs"    ──► Log Viewer      │
│     msg: routing_key="email"    ──► Queue "emails"  ──► Email Service   │
│                                                                         │
│  ใช้เมื่อ: ต้องการส่งไปเฉพาะ Consumer ที่เกี่ยวข้อง                               │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  Exchange Type: topic                                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  "ส่งตาม pattern ของ routing key (ใช้ *, # wildcard)"                     │
│  เหมือน: สมัครข่าว — "ฉันสนใจข่าว กีฬา.ฟุตบอล.*"                               │
│                                                                         │
│  Producer ──► Exchange (topic)                                          │
│     msg: "task.created"    ──► Queue (bind: "task.*")     ──► Service A │
│     msg: "task.completed"  ──► Queue (bind: "task.*")     ──► Service A │
│     msg: "user.registered" ──► Queue (bind: "user.*")     ──► Service B │
│     msg: "task.created"    ──► Queue (bind: "*.created")  ──► Service C │
│                                                                         │
│  ใช้เมื่อ: ต้องการ flexible routing ตามหมวดหมู่                               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### ✅ Message Acknowledgement (ACK) — การรับประกันว่า Message ถูกประมวลผล

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ACK Flow                                                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ① Queue ส่ง Message ให้ Consumer                                        │
│  ② Consumer ประมวลผล Message                                           │
│  ③ Consumer ส่ง ACK กลับ → Queue ลบ Message ✅                           │
│                                                                         │
│  ถ้า Consumer ล่มก่อนส่ง ACK?                                               │
│  → Queue รู้ว่า Message ยังไม่ถูกประมวลผล                                     │
│  → Queue ส่ง Message ให้ Consumer ตัวอื่น (หรือตัวเดิมเมื่อกลับมา)                 │
│  → Message ไม่มีวันหาย! 🛡️                                                 │
│                                                                         │
│  Timeline:                                                              │
│  Queue ──[msg]──► Consumer ──► ประมวลผล ──► ACK ✓ ──► Queue ลบ msg      │
│                                                                         │
│  Queue ──[msg]──► Consumer ──► 💥 ล่ม!                                   │
│  Queue ──[msg]──► Consumer B ──► ประมวลผล ──► ACK ✓ ──► Queue ลบ msg    │
│                                                                         │
│  ถ้าประมวลผลไม่สำเร็จ?                                                     │
│  Consumer ส่ง NACK (Negative Acknowledge) → Queue เก็บ Message ไว้         │
│  อาจส่งไป Dead Letter Queue (DLQ) สำหรับวิเคราะห์ปัญหา                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 1.4 Pub/Sub Pattern & Event Contract

### 📰 Publish/Subscribe Pattern

**Pub/Sub** = Producer "ตีพิมพ์" (Publish) ข่าว → Subscriber "สมัครรับ" (Subscribe) ข่าวที่สนใจ

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Pub/Sub ใน Lab สัปดาห์นี้                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Publisher: Task Service                                                │
│  ─────────────────────                                                  │
│  เมื่อ Task ถูก Create/Update/Complete/Delete                              │
│  → Publish Event ไปที่ Exchange "task.events"                             │
│                                                                         │
│  Subscriber 1: Notification Service                                     │
│  ──────────────────────────────────                                     │
│  สมัครรับทุก Event จาก "task.events"                                       │
│  → TASK_CREATED    → สร้าง Notification "📝 Task ใหม่ถูกสร้าง"              │
│  → TASK_COMPLETED  → สร้าง Notification "🎉 Task เสร็จแล้ว!"               │
│  → TASK_DELETED    → สร้าง Notification "🗑️ Task ถูกลบ"                   │
│                                                                         │
│  Subscriber 2: Audit Service                                            │
│  ──────────────────────────                                             │
│  สมัครรับทุก Event จาก "task.events"                                       │
│  → ทุก Event → บันทึก Audit Log พร้อม timestamp, ข้อมูล, source               │
│                                                                         │
│  ──────────────────────────────────────────────────                     │
│  Subscriber 3: (อนาคต) Statistics Service                               │
│  → แค่สร้าง Consumer ใหม่ที่ bind กับ Exchange เดิม                            │
│  → ไม่ต้องแก้ Task Service เลย! ✅                                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 📋 Event Contract (สัญญา) — ข้อตกลงว่า Event หน้าตาเป็นยังไง

เมื่อ Services คุยกันผ่าน Events ต้องมี **"สัญญา" (Contract)** ว่า Event แต่ละประเภทมีข้อมูลอะไรบ้าง

```
┌───────────────────────────────────────────────────────────────────────┐
│  Event Contract ที่ดี                                                    │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ทุก Event ต้องมี:                                                       │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │  {                                                             │   │
│  │    "id": "evt-1708600001-abc123",   ← Unique ID                │   │
│  │    "type": "TASK_CREATED",          ← Event Type (สำคัญมาก!)    │   │
│  │    "data": {                        ← ข้อมูลจริงของ Event         │   │
│  │      "id": 8,                                                  │   │
│  │      "title": "ทำ Lab Week 7",                                 │   │
│  │      "status": "TODO",                                         │   │
│  │      "priority": "HIGH"                                        │   │
│  │    },                                                          │   │
│  │    "metadata": {                    ← ข้อมูลเกี่ยวกับ Event         │   │
│  │      "timestamp": "2025-02-22T10:30:00Z",  ← เกิดเมื่อไหร่         │   │
│  │      "source": "task-service",             ← มาจาก Service ไหน │   │
│  │      "version": "1.0"                      ← เวอร์ชันของ Schema  │   │
│  │    }                                                           │   │
│  │  }                                                             │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  📌 ทำไมต้องมี Contract?                                                │
│  • Producer และ Consumer ไม่ได้คุยกันโดยตรง                               │
│  • ถ้า Producer เปลี่ยนโครงสร้าง Event โดยไม่บอก → Consumer พัง!            │
│  • Contract = "ข้อตกลงที่ทุกฝ่ายต้องทำตาม"                                  │
│                                                                       │
│  เปรียบเทียบ: เหมือน API Endpoint                                        │
│  REST API มี: POST /api/tasks + JSON body schema                       │
│  Event มี: TASK_CREATED + Event data schema                            │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

### ⚠️ Eventual Consistency — ความสอดคล้องแบบ "สุดท้าย"

```
┌───────────────────────────────────────────────────────────────────────┐
│  Strong Consistency (Sync)   vs    Eventual Consistency (Async)       │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Strong (Week 6):                   Eventual (Week 7):                │
│  ─────────────────                  ─────────────────                 │
│  t=0  สร้าง Task ✅                  t=0   สร้าง Task ✅                │
│  t=0  Notification ✅ (ทันที)         t=0   Notification ⏳ (ยังไม่เกิด)   │
│  t=0  Audit Log ✅ (ทันที)            t=0   Audit Log ⏳ (ยังไม่เกิด)      │
│  ───── ทุกอย่างตรงกัน 100% ─────       t=0.1 Notification ✅ (เกิดแล้ว!)   │
│                                     t=0.2 Audit Log ✅ (เกิดแล้ว!)      │
│                                     ─── สุดท้ายก็ตรงกัน แต่ไม่พร้อมกัน ──     │
│                                                                       │
│  📌 Eventual Consistency หมายความว่า:                                  │
│     "ถ้าไม่มี Event ใหม่เข้ามา → สุดท้ายทุก Service จะมีข้อมูลตรงกัน"             │
│     "แต่อาจมีช่วงเวลาสั้นๆ ที่ข้อมูลไม่ตรงกัน" (Inconsistency Window)            │
│                                                                       │
│  ตัวอย่างจริง:                                                           │
│  • สั่งของ Shopee → เห็น "สั่งซื้อสำเร็จ" ทันที                                 │
│  • แต่ Email ยืนยันมาถึงอีก 30 วินาทีหลัง (Eventual)                          │
│  • ไม่ได้หมายความว่า Order ไม่สำเร็จ แค่ Email ยังมาไม่ถึง                     │
│                                                                       │
│  ⚠️ ข้อระวัง: ไม่ใช่ทุกงานยอมรับ Eventual Consistency ได้                    │
│  • โอนเงิน → ต้อง Strong Consistency (ยอดเงินต้องตรงทันที)                  │
│  • ส่ง Email → Eventual ก็ได้ (ช้าหน่อยไม่เป็นไร)                            │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 1.5 Quality Attributes, Trade-offs & เมื่อไหร่ควร/ไม่ควรใช้

### 📊 Quality Attributes ที่เปลี่ยนแปลง

```
┌─────────────────┬───────────┬───────────────┬────────────────────────┐
│  Quality        │  Week 6   │  Week 7       │  สิ่งที่ทำให้เปลี่ยน          │
│  Attribute      │  (N-Tier) │ (Event-Driven)│                        │
├─────────────────┼───────────┼───────────────┼────────────────────────┤
│  Response Time  │  ★★★★☆    │  ★★★★★        │  Client ไม่ต้องรอ        │
│  (Client)       │  ~2ms     │  ~50ms        │  background tasks      │
├─────────────────┼───────────┼───────────────┼────────────────────────┤
│  Scalability    │  ★★★★☆    │  ★★★★★        │  แต่ละ Service Scale    │
│                 │           │               │  อิสระตาม Workload      │
├─────────────────┼───────────┼───────────────┼────────────────────────┤
│  Availability   │  ★★★★☆    │  ★★★★★        │  Service ล่ม = Event    │
│                 │           │               │  รอใน Queue (ไม่หาย)    │
├─────────────────┼───────────┼───────────────┼────────────────────────┤
│  Extensibility  │  ★★☆☆☆    │  ★★★★★        │  เพิ่ม Consumer ใหม่ได้    │
│                 │           │               │  ไม่ต้องแก้ Producer      │
├─────────────────┼───────────┼───────────────┼────────────────────────┤
│  Consistency    │  ★★★★★    │  ★★★☆☆        │  ❌ ลดลง เป็น Eventual  │
│                 │  Strong   │  Eventual     │  (ข้อมูลอาจไม่ Sync ทันที)  │
├─────────────────┼───────────┼───────────────┼────────────────────────┤
│  Debuggability  │  ★★★☆☆    │  ★★☆☆☆        │  ❌ ลดลง ต้อง trace     │
│                 │           │               │  ผ่าน Event flow        │
├─────────────────┼───────────┼───────────────┼────────────────────────┤
│  Complexity     │  ★★★☆☆    │  ★★★★☆        │  ❌ เพิ่มขึ้น (B roker,    │
│                 │  ปานกลาง  │  สูง           │  Event Contract, ACK)  │
├─────────────────┼───────────┼───────────────┼────────────────────────┤
│  Cost           │  ★★★☆☆    │  ★★☆☆☆        │  ❌ เพิ่มขึ้น (RabbitMQ,   │
│                 │           │               │  หลาย Services)        │
└─────────────────┴───────────┴───────────────┴────────────────────────┘
```

---

### ⚖️ Trade-offs ของ Event-Driven Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Trade-offs: What You Gain vs What You Pay                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ✅ ได้อะไร                           ❌ เสียอะไร                         │
│  ──────────                          ──────────                         │
│  Loose Coupling                      Eventual Consistency               │
│  (เพิ่ม Service ไม่ต้องแก้ Producer)    (ข้อมูลอาจไม่ตรงกันชั่วขณะ)                │
│                                                                         │
│  Fault Tolerance                     Debugging Complexity               │
│  (Service ล่ม → Event รอใน Queue)     (ต้อง trace ข้าม Services)           │
│                                                                         │
│  Independent Scalability             Operational Overhead               │
│  (Scale แต่ละ Service ตาม Load)       (ต้อง Monitor: Broker + Services)   │
│                                                                         │
│  Better Response Time for Client     Message Ordering ไม่รับประกัน         │
│  (ไม่ต้องรอ Side Effects)              (Event A อาจมาถึงหลัง Event B)       │
│                                                                         │
│  Easy Extension                      Duplicate Messages เป็นไปได้         │
│  (เพิ่ม Consumer = เพิ่ม Feature)      (Consumer ต้อง Idempotent)            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### ✅ / ❌ เมื่อไหร่ควร / ไม่ควรใช้ Event-Driven

```
┌────────────────────────────────────────────────────────────────────────┐
│  ✅ เหมาะกับ:                          ❌ ไม่เหมาะกับ:                    │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  • ระบบ Notification/แจ้งเตือน         • CRUD ธรรมดาที่ไม่มี Side Effect     │
│  • Audit/Logging ทุกเหตุการณ์           • ระบบเล็กมาก (1-2 Services)       │
│  • Workflow ที่มีหลายขั้นตอน              • ต้อง Strong Consistency ทุกที่      │
│    (Order → Pay → Ship → Deliver)    • ทีมเล็ก ไม่คุ้นเคยกับ Async           │
│  • ต้องเพิ่ม Feature บ่อย                • Latency ต้องต่ำมากๆ (<1ms)        │
│    (เพิ่ม Consumer ไม่กระทบระบบเดิม)     │                                 │
│  • ระบบที่ต้อง Scale ใหญ่                │                                 │
│  • ระบบ IoT (Sensor Events)          │                                 │
│  • Real-time Analytics               │                                 │
│                                                                        │
│  📌 กฎทอง:                                                             │
│  "ใช้ Sync สำหรับสิ่งที่ Client ต้องรู้ผลทันที                                    │
│   ใช้ Async สำหรับสิ่งที่เป็น Side Effect (ผลข้างเคียง)"                        │
│                                                                        │
│  ตัวอย่าง POST /tasks:                                                   │
│  ├─ Sync: INSERT INTO tasks (Client ต้องรู้ว่าสร้างสำเร็จ)                   │
│  ├─ Async: ส่ง Email แจ้งเตือน (Client ไม่ต้องรอ)                           │
│  ├─ Async: บันทึก Audit Log (Client ไม่ต้องรอ)                             │
│  └─ Async: อัพเดท Statistics (Client ไม่ต้องรอ)                           │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 🏗️ Architecture Evolution — จาก Monolith สู่ Event-Driven

```
Week 3          Week 4          Week 5             Week 6                Week 7
Monolith    →   Layered     →   Client-Server  →   N-Tier+Cache+LB   →   Event-Driven
  📦              🏛️              🖥️               🏗️                    📡

 1 ไฟล์          3 Layers        2 Projects         4 Tiers               4 Services
 1 Process      1 Process       FE + BE            Nginx+App×3           + RabbitMQ
                                HTTP (Sync)        +Redis+PG             Pub/Sub
                                                   HTTP (Sync)           Async Events
 
 Coupling:       Coupling:       Coupling:         Coupling:             Coupling:
 ████████████    ███████████     ████████          ██████                ██
 (สูงมาก)         (สูง)            (ปานกลาง)         (ปานกลาง)             (ต่ำ — Loose!)

 Scale:          Scale:          Scale:            Scale:                Scale:
 ❌              ❌              ❌ vert.         ✅ horiz.             ✅✅ per-service
```

---

## ส่วนที่ 3: สรุปบทเรียนก่อนเข้า Lab (5 นาที)

### 📋 Checklist: สิ่งที่ต้องเข้าใจก่อนลงมือ

| ✅ | หัวข้อ | เข้าใจแล้ว? |
|:--:|:--|:--:|
| ☐ | Sync = ส่ง-รอ-รับ / Async = ส่ง-ทำต่อเลย ใครรับก็รับ | |
| ☐ | Event = "สิ่งที่เกิดขึ้นแล้ว" เช่น TASK_CREATED | |
| ☐ | Producer (ส่ง Event) ไม่ต้องรู้ว่าใครจะรับ (Loose Coupling) | |
| ☐ | Consumer (รับ Event) ไม่ต้องรู้ว่าใครส่ง | |
| ☐ | Message Broker (RabbitMQ) = ตัวกลางที่เก็บและส่ง Message | |
| ☐ | Exchange (fanout) = กระจาย Message ไปทุก Queue ที่ bind | |
| ☐ | Queue = คิวเก็บ Message รอ Consumer มารับ | |
| ☐ | ACK = Consumer บอก Queue ว่า "ประมวลผลสำเร็จแล้ว ลบได้" | |
| ☐ | Event Contract = โครงสร้าง Event ที่ Producer/Consumer ตกลงกัน | |
| ☐ | Eventual Consistency = "สุดท้ายข้อมูลจะตรงกัน แต่ไม่ใช่ทันที" | |
| ☐ | Trade-off: ได้ Loose Coupling + Scalability แต่เสีย Consistency + Simplicity | |

### 🗺️ แผนผัง Lab ที่จะทำต่อ (3 ชั่วโมง)

```
Part 1: สร้างโครงสร้าง                 (15 นาที) ← 4 Services + Shared Events
Part 2: Shared Event Contracts       (15 นาที) ← กำหนด Event Types + Schema
Part 3: Task Service + Publisher     (45 นาที) ← CRUD + Publish Events
Part 4: Notification Service         (30 นาที) ← Subscribe + สร้าง Notifications
Part 5: Audit Service                (20 นาที) ← Subscribe + สร้าง Audit Log
Part 6: API Gateway                  (15 นาที) ← Single Entry Point → Route
Part 7: Docker Compose + RabbitMQ    (20 นาที) ← 6 Containers ทำงานร่วมกัน
Part 8: Testing End-to-End           (20 นาที) ← ทดสอบ Event Flow ทั้งระบบ
Part 9: สรุปเปรียบเทียบ                 (  นาที ) ← N-Tier vs Event-Driven
```

---

*ENGSE207 Software Architecture — Term Project Week 7 Theory*
*Instructor: นายธนิต เกตุแก้ว — มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*
