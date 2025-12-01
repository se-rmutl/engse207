# ENGSE207 สถาปัตยกรรมซอฟต์แวร์ (Software Architecture)
## เอกสารประกอบการสอน สัปดาห์ที่ 3

---

## หน่วยเรียน: Architectural Styles & Patterns (ครั้งที่ 1)

### ข้อมูลทั่วไป
- **จำนวนชั่วโมง:** 5 ชั่วโมง (บรรยาย 2 ชม. + ปฏิบัติ 3 ชม.)
- **ระดับชั้น:** ปีที่ 2 วิศวกรรมซอฟต์แวร์
- **CLO ที่เกี่ยวข้อง:** CLO2, CLO5, CLO6, CLO7
- **ผู้สอน:** นายธนิต เกตุแก้ว

---

## ชื่อบทเรียน

### 1.1 ภาพรวม Architectural Styles & Patterns และความสำคัญต่อการออกแบบระบบ
### 1.2 Monolithic Architecture และ Layered Architecture (Multi-tier)
### 1.3 Client-Server, N-Tier และ Pipe-and-Filter Architectures

---

## วัตถุประสงค์การสอน

### 1.1 ภาพรวม Architectural Styles & Patterns และความสำคัญต่อการออกแบบระบบ

**1.1.1** นักศึกษาสามารถอธิบายความแตกต่างระหว่าง Architectural Style และ Architectural Pattern ได้อย่างชัดเจน

**1.1.2** นักศึกษาสามารถอธิบายความสำคัญของ Architectural Styles ต่อการออกแบบระบบซอฟต์แวร์ที่มีคุณภาพได้

**1.1.3** นักศึกษาสามารถระบุ Architectural Styles พื้นฐานที่ใช้กันทั่วไปในอุตสาหกรรมได้อย่างน้อย 5 แบบ

### 1.2 Monolithic Architecture และ Layered Architecture (Multi-tier)

**1.2.1** นักศึกษาสามารถอธิบายโครงสร้าง ข้อดี ข้อเสีย และกรณีการใช้งานของ Monolithic Architecture ได้

**1.2.2** นักศึกษาสามารถออกแบบ Layered Architecture แบบ 3-tier และ 4-tier พร้อมอธิบาย responsibility ของแต่ละ layer ได้

**1.2.3** นักศึกษาสามารถวิเคราะห์ผลกระทบของ Layered Architecture ต่อ Quality Attributes เช่น Modifiability, Testability, และ Performance ได้

### 1.3 Client-Server, N-Tier และ Pipe-and-Filter Architectures

**1.3.1** นักศึกษาสามารถอธิบายหลักการทำงานและรูปแบบของ Client-Server Architecture ได้

**1.3.2** นักศึกษาสามารถเปรียบเทียบ 2-tier กับ N-tier architecture และระบุข้อดีข้อเสียของแต่ละแบบได้

**1.3.3** นักศึกษาสามารถอธิบายแนวคิด Pipe-and-Filter Architecture และยกตัวอย่างการใช้งานจริงได้

---

## สรุป CLO ที่เกี่ยวข้อง

### 🎯 CLO2 (Knowledge - K)
อธิบายสถาปัตยกรรมซอฟต์แวร์รูปแบบหลัก (Architectural Styles & Patterns) เช่น Layered, Client-Server, Monolithic พร้อมตัวอย่างการนำไปใช้ได้

### 🎯 CLO5 (Cognitive - C)
วิเคราะห์ Architectural Drivers และ Architectural Requirements ที่ได้จาก SRS โดยระบุข้อจำกัด (Constraints) และ Quality Attribute Scenarios ที่สำคัญของระบบได้

### 🎯 CLO6 (Cognitive - C)
ออกแบบสถาปัตยกรรมระดับสูงของระบบซอฟต์แวร์โดยเลือกใช้ Architectural Styles/Patterns ที่เหมาะสมกับปัญหาได้

### 🎯 CLO7 (Cognitive - C)
ประเมินและเปรียบเทียบทางเลือกสถาปัตยกรรม โดยพิจารณา Trade-offs ด้าน Quality Attributes, Risk และ Cost และสามารถสะท้อนผลกระทบต่อ Stakeholders ได้อย่างมีเหตุผล

---

## ส่วนที่ 1: ทบทวนสัปดาห์ที่แล้ว (5 นาที)

ในสัปดาห์ที่ 2 เราได้เรียนรู้เกี่ยวกับ:

### 📋 สรุปหลักการ

- **Quality Attributes คืออะไร:** คุณลักษณะที่วัดว่าระบบมีคุณภาพดีเพียงใด เช่น Performance, Scalability, Availability, Security, Modifiability, Usability
  
- **Quality Attribute Scenarios:** วิธีการเขียนความต้องการด้าน Quality ให้เป็นรูปธรรมโดยใช้โครงสร้าง 6 ส่วน (Source, Stimulus, Artifact, Environment, Response, Response Measure)

- **Architectural Drivers:** ปัจจัยสำคัญที่ขับเคลื่อนการตัดสินใจทางสถาปัตยกรรม ประกอบด้วย:
  - Functional Requirements
  - Quality Attributes
  - Constraints (ข้อจำกัด)
  - Assumptions (สมมติฐาน)

- **Trade-offs:** การออกแบบสถาปัตยกรรมมักต้องแลกเปลี่ยน เช่น Performance กับ Security, Scalability กับ Simplicity

### 🔗 เชื่อมโยงกับสัปดาห์นี้

สัปดาห์นี้เราจะเรียนรู้ว่า **"เมื่อเรารู้แล้วว่าระบบต้องการ Quality Attributes อะไร แล้วเราจะเลือก Architectural Style ไหนมาใช้?"** 

นั่นคือ **Architectural Styles & Patterns** ซึ่งเป็นโซลูชันที่พิสูจน์แล้วว่าใช้ได้ผลในการแก้ปัญหาสถาปัตยกรรมแบบต่างๆ

---

## ส่วนที่ 2: เนื้อหาบทเรียน (90 นาที)

---

## 1.1 ภาพรวม Architectural Styles & Patterns และความสำคัญต่อการออกแบบระบบ

### 🏛️ Architectural Style คืออะไร?

**Architectural Style** คือ:
- แนวทางหรือรูปแบบการจัดโครงสร้างระบบซอฟต์แวร์ที่เป็นที่ยอมรับและใช้กันอย่างแพร่หลาย
- กำหนดลักษณะของ **Components** (ส่วนประกอบ), **Connectors** (ตัวเชื่อมต่อ), และ **Constraints** (ข้อจำกัด)
- เป็น "ภาษาร่วม" ที่สถาปนิกซอฟต์แวร์ใช้สื่อสารกัน

### 🧩 Architectural Pattern คืออะไร?

**Architectural Pattern** คือ:
- โซลูชันที่พิสูจน์แล้วว่าใช้ได้ผล (Proven Solution) สำหรับปัญหาสถาปัตยกรรมที่เกิดขึ้นบ่อย
- มีโครงสร้างและแนวทางการแก้ปัญหาที่ชัดเจน
- สามารถนำไปประยุกต์ใช้ได้ในหลายบริบท

### 🔍 ความแตกต่างระหว่าง Style และ Pattern

| **Architectural Style** | **Architectural Pattern** |
|------------------------|---------------------------|
| เป็นแนวทางการออกแบบระดับกว้าง | เป็นโซลูชันเฉพาะสำหรับปัญหา |
| มุ่งเน้นโครงสร้างโดยรวมของระบบ | มุ่งเน้นการแก้ปัญหาเฉพาะด้าน |
| ตัวอย่าง: Layered, Client-Server | ตัวอย่าง: MVC, Repository Pattern |
| ใช้ในระดับ System Architecture | ใช้ในระดับ Component/Module |

**สรุป:** Style = ภาพใหญ่, Pattern = โซลูชันเฉพาะ

### 🎯 ทำไม Architectural Styles จึงสำคัญ?

1. **ลดความซับซ้อน (Reduce Complexity)**
   - ช่วยให้เราไม่ต้องออกแบบระบบตั้งแต่เริ่มต้น
   - ใช้โซลูชันที่พิสูจน์แล้วจากผู้เชี่ยวชาญทั่วโลก

2. **ภาษากลางในการสื่อสาร (Common Vocabulary)**
   - เมื่อบอกว่า "ใช้ Layered Architecture" ทีมเข้าใจทันที
   - ไม่ต้องอธิบายรายละเอียดทุกครั้ง

3. **การตัดสินใจที่รวดเร็วขึ้น (Faster Decision Making)**
   - มีแนวทางให้เลือก ไม่ต้อง reinvent the wheel
   - สามารถเปรียบเทียบ trade-offs ระหว่าง styles ได้

4. **คุณภาพที่คาดการณ์ได้ (Predictable Quality)**
   - รู้ล่วงหน้าว่าแต่ละ style ส่งผลต่อ Quality Attributes อย่างไร
   - เช่น Layered → Modifiability ดี, Performance อาจลดลง

5. **ลด Technical Risk**
   - ใช้สถาปัตยกรรมที่มีคนใช้แล้วหลายล้านระบบ
   - มีเอกสาร best practices, pitfalls ให้ศึกษา

6. **การบำรุงรักษาง่ายขึ้น (Easier Maintenance)**
   - Developer คนใหม่เข้ามาทำงาน เข้าใจโครงสร้างได้เร็ว
   - เพราะเป็นรูปแบบที่รู้จักกันดี

### 📊 Architectural Styles พื้นฐานที่ควรรู้จัก

ในรายวิชานี้เราจะเรียนรู้ Architectural Styles หลัก 10 แบบ:

**สัปดาห์ที่ 3 (วันนี้):**
1. ✅ **Monolithic Architecture** - ระบบทั้งหมดเป็นก้อนเดียว
2. ✅ **Layered (N-tier) Architecture** - แบ่งเป็นชั้นๆ
3. ✅ **Client-Server Architecture** - แยกระหว่างผู้ใช้กับเซิร์ฟเวอร์
4. ✅ **N-Tier Architecture** - ขยายจาก 2-tier เป็น 3-tier, 4-tier
5. ✅ **Pipe-and-Filter Architecture** - ประมวลผลแบบท่อและฟิลเตอร์

**สัปดาห์ที่ 4 (สัปดาห์หน้า):**
6. 🔜 **Microservices Architecture** - แบ่งเป็น services เล็กๆ
7. 🔜 **Event-Driven Architecture** - สื่อสารผ่าน events
8. 🔜 **Service-Oriented Architecture (SOA)** - มุ่งเน้น services และ contracts
9. 🔜 **Serverless Architecture** - ใช้ functions บน cloud
10. 🔜 **Hybrid Architectures** - ผสมผสานหลาย styles

---

## 1.2 Monolithic Architecture และ Layered Architecture (Multi-tier)

### 🏢 Monolithic Architecture

#### 💡 คำนิยาม

**Monolithic Architecture** คือสถาปัตยกรรมที่รวมทุก components ของแอปพลิเคชันไว้ใน **codebase เดียว** และ **deploy เป็นหน่วยเดียว**

#### 🏗️ ลักษณะสำคัญ

1. **Single Codebase**
   - โค้ดทั้งหมดอยู่ใน repository เดียว
   - Compile และ build เป็นไฟล์ executable เดียว

2. **Tightly Coupled Components**
   - ส่วนต่างๆ ของระบบเชื่อมโยงกันแน่น
   - เรียกใช้ฟังก์ชันกันโดยตรงผ่าน function calls

3. **Single Deployment Unit**
   - Deploy ทั้งระบบพร้อมกันครั้งเดียว
   - ไม่สามารถ deploy เฉพาะส่วนได้

4. **Shared Database**
   - ทุก modules ใช้ database เดียวกัน
   - เข้าถึง tables ร่วมกัน

#### 📐 โครงสร้างทั่วไปของ Monolith

```
┌─────────────────────────────────────┐
│     Monolithic Application          │
│                                     │
│  ┌────────────────────────────────┐ │
│  │  User Interface (UI)           │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │  Business Logic                │ │
│  │  - User Management             │ │
│  │  - Order Processing            │ │
│  │  - Payment                     │ │
│  │  - Inventory                   │ │
│  │  - Shipping                    │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │  Data Access Layer             │ │
│  └────────────────────────────────┘ │
└──────────────┬──────────────────────┘
               │
               ▼
         ┌──────────┐
         │ Database │
         └──────────┘
```

#### ✅ ข้อดีของ Monolithic Architecture

1. **🚀 เริ่มต้นง่ายและรวดเร็ว**
   - เหมาะกับโปรเจกต์เล็กๆ หรือ startup
   - Setup ง่าย ไม่ซับซ้อน
   - เริ่มพัฒนาได้เลยทันที

2. **🧪 Testing ง่าย**
   - รันทั้งระบบใน environment เดียว
   - Integration testing ทำได้ตรงไปตรงมา
   - ไม่ต้องจัดการกับ distributed testing

3. **🔍 Debugging ง่าย**
   - ทุกอย่างอยู่ที่เดียว trace ได้ง่าย
   - ใช้ debugger ได้เลย ไม่ต้องข้าม services

4. **⚡ Performance ดีในการเรียกใช้ภายใน**
   - Function calls ภายใน process เดียว (in-process)
   - ไม่มี network latency
   - ไม่มี overhead จาก serialization/deserialization

5. **📦 Deploy ง่าย**
   - Deploy ไฟล์เดียว (JAR, WAR, EXE)
   - Rollback ง่าย กลับไป version เก่าได้เลย

6. **💰 ต้นทุนต่ำในช่วงแรก**
   - ไม่ต้องมี infrastructure ซับซ้อน
   - ไม่ต้องจ้าง DevOps เพิ่ม

#### ❌ ข้อเสียของ Monolithic Architecture

1. **📈 Scalability จำกัด**
   - Scale ทั้งระบบพร้อมกัน ไม่สามารถ scale เฉพาะส่วนที่ต้องการ
   - ถ้า Order Processing ต้องการ scale แต่ต้อง scale ทั้งระบบ
   - สิ้นเปลือง resources

2. **🐌 Slow Development เมื่อระบบใหญ่ขึ้น**
   - Codebase ใหญ่ ยาก maintain
   - Compile ช้า, test suite ช้า
   - Developer ทำงานทับซ้อนกัน เกิด merge conflicts

3. **💥 High Risk Deployment**
   - แก้ไขเล็กน้อย ต้อง deploy ทั้งระบบ
   - Bug ที่ส่วนหนึ่ง อาจทำให้ทั้งระบบล่ม
   - Downtime สูง

4. **🔗 Tight Coupling**
   - Modules ผูกติดกันแน่น แก้ไขส่วนหนึ่งกระทบส่วนอื่น
   - Technical Debt สะสมเร็ว
   - Refactoring ยาก

5. **🧑‍💻 Team Dependency**
   - ทีมต้องรอกันและกัน
   - ไม่สามารถทำงานอิสระได้
   - CI/CD pipeline ติด bottleneck

6. **🆕 เทคโนโลยีใหม่ใช้ยาก**
   - ถูกผูกกับ tech stack เดียว
   - อัพเกรด framework ต้องทั้งระบบ
   - ไม่สามารถทดลองเทคโนโลยีใหม่ในส่วนเล็กๆ ได้

#### 🎯 เหมาะกับกรณีไหน?

**✅ เหมาะกับ:**
- 🏢 แอปพลิเคชันขนาดเล็กถึงกลาง
- 👥 ทีมพัฒนาไม่เกิน 10 คน
- 🚀 โปรเจกต์ MVP หรือ Proof of Concept
- 📊 ระบบที่ complexity ไม่สูงมาก
- 💼 ระบบภายในองค์กร (Internal tools)

**❌ ไม่เหมาะกับ:**
- 🌐 แอปพลิเคชันขนาดใหญ่ที่มีผู้ใช้งานหลายล้านคน
- 👥 ทีมพัฒนามากกว่า 10 คน
- 🔄 ระบบที่ต้อง scale แบบ dynamic
- 🚀 ต้องการ deploy บ่อยๆ (หลายครั้งต่อวัน)
- 🧩 ต้องการใช้เทคโนโลยีหลายแบบ

#### 🏪 ตัวอย่างระบบจริงที่ใช้ Monolithic

1. **Shopify (ในช่วงแรก)**
   - เริ่มต้นเป็น Ruby on Rails monolith
   - ค่อยๆ แยกเป็น services ทีหลัง

2. **Stack Overflow**
   - ยังใช้ monolithic ASP.NET
   - รองรับผู้ใช้หลายล้านคนได้

3. **WordPress**
   - PHP monolithic CMS
   - แต่รองรับ plugins ทำให้ขยายได้

4. **ระบบจัดการลูกค้าสัมพันธ์ (CRM) ขนาดกลาง**
5. **ระบบบัญชีสำหรับ SME**
6. **ระบบจัดการร้านอาหารขนาดเล็ก (POS)**

---

### 🏛️ Layered (N-Tier) Architecture

#### 💡 คำนิยาม

**Layered Architecture** คือการจัดระเบียบซอฟต์แวร์เป็น **ชั้น (Layers)** โดยแต่ละชั้นมีความรับผิดชอบเฉพาะ และสื่อสารกับชั้นที่อยู่ติดกันเท่านั้น

**หลักการสำคัญ:** 
- แต่ละ layer มีหน้าที่เฉพาะ (Separation of Concerns)
- Layer บนเรียกใช้ layer ล่างได้ แต่ layer ล่างไม่รู้จัก layer บน (Dependency Rule)

#### 🎯 Layered Architecture Styles ที่นิยม

**1. Three-Layer (3-Tier) Architecture**

```
┌─────────────────────────────────┐
│  Presentation Layer             │  ← UI, Views, Controllers
│  (User Interface)               │
└─────────────────────────────────┘
           ▲  │
           │  ▼
┌─────────────────────────────────┐
│  Business Logic Layer           │  ← Domain Logic, Rules
│  (Application/Domain Layer)     │
└─────────────────────────────────┘
           ▲  │
           │  ▼
┌─────────────────────────────────┐
│  Data Access Layer              │  ← Repositories, DAOs
│  (Persistence Layer)            │
└─────────────────────────────────┘
           │
           ▼
      ┌──────────┐
      │ Database │
      └──────────┘
```

**ความรับผิดชอบแต่ละ Layer:**

1. **Presentation Layer (ชั้นนำเสนอ)**
   - แสดงผลข้อมูลให้ผู้ใช้
   - รับ input จากผู้ใช้
   - ส่ง request ไปยัง Business Layer
   - **เทคโนโลยี:** HTML/CSS/JavaScript, React, Angular, Vue.js

2. **Business Logic Layer (ชั้นตรรกะทางธุรกิจ)**
   - ประมวลผล business rules
   - จัดการ workflow และ validation
   - ตัดสินใจทางธุรกิจ
   - **ตัวอย่าง:** คำนวณส่วนลด, ตรวจสอบเงื่อนไขการสั่งซื้อ

3. **Data Access Layer (ชั้นการเข้าถึงข้อมูล)**
   - ติดต่อกับ database
   - CRUD operations (Create, Read, Update, Delete)
   - แปลงข้อมูลจาก database เป็น objects (ORM)
   - **เทคโนโลยี:** Hibernate, Entity Framework, Sequelize

**2. Four-Layer (4-Tier) Architecture**

```
┌─────────────────────────────────┐
│  Presentation Layer             │  ← UI
└─────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Application Layer              │  ← Use Cases, Orchestration
│  (Service Layer)                │
└─────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Domain Layer                   │  ← Business Logic, Entities
│  (Business Layer)               │
└─────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│  Infrastructure Layer           │  ← DB, External APIs, Files
│  (Persistence + Integration)    │
└─────────────────────────────────┘
```

**ความแตกต่างจาก 3-tier:**
- แยก **Application Layer** (use cases) ออกจาก **Domain Layer** (business rules)
- เพิ่มความยืดหยุ่น ทำให้ business logic บริสุทธิ์ ไม่ผูกกับ infrastructure

#### ✅ ข้อดีของ Layered Architecture

1. **🧩 Separation of Concerns**
   - แต่ละ layer มีหน้าที่ชัดเจน
   - แก้ไขส่วนหนึ่ง ไม่กระทบส่วนอื่น

2. **🔄 Maintainability สูง**
   - เปลี่ยน UI ได้โดยไม่ต้องแก้ business logic
   - เปลี่ยน database ได้โดยไม่ต้องแก้ business logic

3. **🧪 Testability ดี**
   - Test แต่ละ layer แยกกันได้
   - Mock layer อื่นได้ง่าย

4. **👥 Team Scalability**
   - แบ่งทีมตาม layers ได้
   - Frontend team, Backend team, DBA team

5. **🔁 Reusability**
   - Business logic สามารถใช้กับหลาย UI ได้
   - เช่น Web UI, Mobile UI ใช้ Business Layer เดียวกัน

6. **📚 ง่ายต่อการเรียนรู้**
   - เป็น pattern ที่รู้จักกันดี
   - Developer ส่วนใหญ่เข้าใจ

#### ❌ ข้อเสียของ Layered Architecture

1. **⚡ Performance Overhead**
   - ข้อมูลต้องผ่านหลาย layers
   - เกิด latency จากการเรียกผ่าน layer

2. **🔗 Cascading Changes**
   - เปลี่ยนโครงสร้างข้อมูล อาจต้องแก้ทุก layer
   - เช่น เพิ่ม field ใหม่ใน database ต้องแก้ทั้ง DAO, Service, Controller

3. **🎯 Over-engineering สำหรับระบบเล็ก**
   - ถ้าระบบเล็ก อาจไม่จำเป็นต้องแบ่ง layers มาก
   - สร้าง complexity ที่ไม่จำเป็น

4. **📦 Tight Coupling ระหว่าง Layers**
   - ถึงแม้จะแยก layers แต่ก็ยังมี dependency กัน
   - ยาก reuse layer เดียวแบบอิสระ

#### 🎯 เหมาะกับกรณีไหน?

**✅ เหมาะกับ:**
- 📊 ระบบที่มี business logic ซับซ้อน
- 🏢 Enterprise applications
- 👥 ทีมที่แยกตาม specialization (Frontend, Backend, DBA)
- 🔄 ต้องการ maintainability สูง
- 🧪 ต้องการ testability ดี

**❌ ไม่เหมาะกับ:**
- 🚀 ระบบเล็กๆ ที่ต้องการความเร็วในการพัฒนา
- ⚡ ระบบที่ต้องการ performance สูงมาก
- 🎯 ระบบ real-time ที่ latency ต้องต่ำมาก

#### 🏪 ตัวอย่างระบบจริง

1. **ระบบ E-Commerce (Shopee, Lazada ในช่วงแรก)**
   ```
   UI Layer: Web/Mobile Interface
   Business Layer: Order Processing, Payment, Inventory
   Data Layer: Product DB, User DB, Order DB
   ```

2. **ระบบ Banking**
   ```
   UI Layer: Mobile Banking App, Web Portal, ATM Interface
   Business Layer: Transaction Processing, Account Management
   Data Layer: Account DB, Transaction DB
   ```

3. **ระบบจัดการโรงพยาบาล**
   ```
   UI Layer: Doctor Portal, Patient Portal, Admin Portal
   Business Layer: Appointment, Billing, Medical Records
   Data Layer: Patient DB, Appointment DB, Medical Records DB
   ```

#### 📐 ตัวอย่างโค้ด (Spring Boot - Java)

```java
// Presentation Layer (Controller)
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request);
        return ResponseEntity.ok(order);
    }
}

// Business Layer (Service)
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private InventoryService inventoryService;
    
    @Transactional
    public Order createOrder(OrderRequest request) {
        // Business Logic
        if (!inventoryService.checkStock(request.getProductId())) {
            throw new OutOfStockException();
        }
        
        Order order = new Order();
        order.setProductId(request.getProductId());
        order.setQuantity(request.getQuantity());
        order.calculateTotalPrice(); // Business rule
        
        return orderRepository.save(order);
    }
}

// Data Access Layer (Repository)
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId);
}
```

---

## 1.3 Client-Server, N-Tier และ Pipe-and-Filter Architectures

### 🖥️ Client-Server Architecture

#### 💡 คำนิยาม

**Client-Server Architecture** คือรูปแบบที่แบ่งระบบออกเป็น 2 ส่วนหลัก:
1. **Client** - ฝั่งผู้ใช้ที่ส่ง request
2. **Server** - ฝั่งที่ประมวลผลและส่ง response กลับ

#### 🏗️ โครงสร้างพื้นฐาน

```
┌─────────────┐                     ┌─────────────┐
│   Client 1  │◄───────────────────►│             │
└─────────────┘      Request        │             │
                     Response       │   Server    │
┌─────────────┐                     │             │
│   Client 2  │◄───────────────────►│  - Process  │
└─────────────┘                     │  - Store    │
                                    │  - Manage   │
┌─────────────┐                     │             │
│   Client N  │◄───────────────────►│             │
└─────────────┘                     └─────────────┘
```

#### 🔑 ลักษณะสำคัญ

1. **Request-Response Pattern**
   - Client ส่ง request
   - Server ประมวลผลและตอบกลับ

2. **Server เป็นศูนย์กลาง**
   - จัดการ business logic
   - จัดการข้อมูล
   - ให้บริการแก่หลาย clients

3. **Stateless/Stateful**
   - Stateless: ทุก request เป็นอิสระ (HTTP, REST)
   - Stateful: Server จำ session ของ client (WebSocket)

#### 📊 รูปแบบของ Client-Server

**1. Two-Tier (2-Tier) Architecture**

```
┌────────────────────┐
│   Client (Thick)   │  ← UI + Business Logic
│  - User Interface  │
│  - Business Logic  │
│  - Input Validation│
└────────────────────┘
         │
         ▼
┌────────────────────┐
│   Database Server  │  ← Data Storage
│  - Store Data      │
│  - Execute Queries │
└────────────────────┘
```

**ลักษณะ:**
- Client มี business logic (Thick Client / Fat Client)
- Server เป็นแค่ database
- **ตัวอย่าง:** Desktop applications, ระบบจัดการสต็อกขนาดเล็ก

**ข้อดี:**
- Fast (ไม่มี middle tier)
- ง่ายต่อการพัฒนา

**ข้อเสีย:**
- Business logic กระจัดกระจายใน clients
- แก้ไข logic ต้อง update ทุก clients
- ยาก maintain

**2. Three-Tier (3-Tier) Architecture**

```
┌────────────────────┐
│  Client (Thin)     │  ← UI Only (Web Browser, Mobile App)
│  - User Interface  │
└────────────────────┘
         │
         ▼
┌────────────────────┐
│  Application Server│  ← Business Logic
│  - Business Logic  │
│  - API Endpoints   │
│  - Validation      │
└────────────────────┘
         │
         ▼
┌────────────────────┐
│  Database Server   │  ← Data Storage
│  - Store Data      │
└────────────────────┘
```

**ลักษณะ:**
- Client เบาบาง (Thin Client) มีแค่ UI
- Business logic อยู่ที่ Application Server
- Database Server แยกออกมา

**ข้อดี:**
- Business logic ส่วนกลาง แก้ไขง่าย
- Client เบา รันบน browser ได้
- Scale ได้ดี

**ข้อเสีย:**
- มี latency มากขึ้น
- Infrastructure ซับซ้อนขึ้น

**ตัวอย่าง:**
- 🌐 Web applications ส่วนใหญ่
- 📱 Mobile apps ที่มี backend API
- ☁️ Cloud-based SaaS

#### ✅ ข้อดีของ Client-Server Architecture

1. **🎯 Centralized Management**
   - จัดการข้อมูลและ logic ส่วนกลาง
   - อัพเดท/แก้ไขที่ server ครั้งเดียว

2. **🔒 Security**
   - ควบคุมการเข้าถึงข้อมูลที่ server
   - Client ไม่ได้เข้าถึง database โดยตรง

3. **📈 Scalability**
   - เพิ่ม server resources ได้
   - Load balancing

4. **🔄 Maintainability**
   - แก้ไข business logic ที่ server
   - Clients ไม่ต้อง update

5. **👥 Multi-user Support**
   - รองรับหลาย clients พร้อมกัน
   - Concurrent access ได้

#### ❌ ข้อเสียของ Client-Server Architecture

1. **🌐 Network Dependency**
   - ต้องมี network connection
   - Offline ทำงานไม่ได้

2. **⚡ Server เป็น Bottleneck**
   - ถ้า server ล่ม ทั้งระบบหยุด
   - Server overload → ช้า

3. **💰 ต้นทุน Infrastructure**
   - ต้องมี server, network
   - Maintenance cost

#### 🏪 ตัวอย่างระบบจริง

1. **📧 Email Systems (Gmail)**
   - Client: Web Browser, Mobile App
   - Server: Gmail Servers

2. **🏦 Internet Banking**
   - Client: Web/Mobile
   - Server: Bank Application Server

3. **🛒 E-Commerce (Shopee, Lazada)**
   - Client: Website, Mobile App
   - Server: Backend API Servers

---

### 🏗️ N-Tier Architecture (Multi-Tier)

#### 💡 คำนิยาม

**N-Tier Architecture** คือการขยาย 3-tier ให้มีหลาย tiers (ชั้น) เพิ่มเติมตามความต้องการของระบบ

**ความแตกต่างจาก Layered:**
- **Tier** = Physical separation (แยกกันทาง physical deployment)
- **Layer** = Logical separation (แยกกันทางตรรกะในโค้ด)

#### 📊 ตัวอย่าง N-Tier Architecture

**4-Tier Architecture แบบทั่วไป:**

```
┌─────────────────────────────────┐
│  Tier 1: Client Tier            │  ← Web Browser / Mobile App
│  (Presentation Tier)            │
└─────────────────────────────────┘
         │ HTTP/HTTPS
         ▼
┌─────────────────────────────────┐
│  Tier 2: Web Server Tier        │  ← Nginx, Apache (Serve static)
│  (Web Tier)                     │
└─────────────────────────────────┘
         │ API Calls
         ▼
┌─────────────────────────────────┐
│  Tier 3: Application Server     │  ← Node.js, Java, Python
│  (Business Logic Tier)          │     (Business Logic)
└─────────────────────────────────┘
         │ Database Queries
         ▼
┌─────────────────────────────────┐
│  Tier 4: Database Tier          │  ← MySQL, PostgreSQL, MongoDB
│  (Data Tier)                    │
└─────────────────────────────────┘
```

**5-Tier Architecture (เพิ่ม Caching Tier):**

```
Client → Web Server → Cache (Redis) → App Server → Database
```

#### 🎯 ข้อดีของ N-Tier

1. **📈 Scalability สูง**
   - Scale แต่ละ tier อิสระได้
   - เช่น เพิ่ม app servers แต่ database เดิม

2. **🔒 Security ดีขึ้น**
   - แยก layers ด้วย firewalls
   - Database ไม่ถูกเข้าถึงโดยตรงจาก internet

3. **🧩 Flexibility**
   - เปลี่ยนเทคโนโลยีแต่ละ tier ได้
   - ใช้ cloud services ผสมกับ on-premise

4. **👥 Team Independence**
   - แบ่งทีมตาม tiers
   - Deploy แต่ละ tier แยกกันได้

#### ❌ ข้อเสียของ N-Tier

1. **🔧 Complexity สูง**
   - มี components เยอะ
   - ยาก debug, monitor

2. **💰 ต้นทุนสูง**
   - ต้องมีหลาย servers
   - Network infrastructure

3. **⚡ Latency เพิ่มขึ้น**
   - ข้อมูลต้องผ่านหลาย tiers
   - Network calls เยอะ

#### 🏪 ตัวอย่างระบบจริง

**LINE Messaging Platform (Simplified)**
```
Mobile App → Load Balancer → Web Servers → 
Message Service → User Service → Database Cluster
```

**Shopee E-Commerce (Simplified)**
```
Web/App → CDN → Web Servers → API Gateway → 
Product Service → Order Service → Payment Service → Databases
```

---

### 🔧 Pipe-and-Filter Architecture

#### 💡 คำนิยาม

**Pipe-and-Filter Architecture** คือรูปแบบที่ระบบประกอบด้วย:
- **Filters** - components ที่ทำการประมวลผลข้อมูล (transformations)
- **Pipes** - channels ที่ส่งข้อมูลระหว่าง filters

#### 🏗️ โครงสร้าง

```
Input → [Filter 1] → [Filter 2] → [Filter 3] → Output
           │             │             │
        (Pipe)        (Pipe)        (Pipe)
```

**ตัวอย่างเฉพาะ:**
```
Video File → [Decode] → [Resize] → [Compress] → [Encode] → Output Video
               Pipe        Pipe        Pipe        Pipe
```

#### 🔑 ลักษณะสำคัญ

1. **Independent Filters**
   - แต่ละ filter ทำงานอิสระ
   - ไม่รู้จัก filters อื่น

2. **Data Streaming**
   - ข้อมูลไหลผ่าน pipeline
   - ประมวลผลทีละชุด

3. **Composable**
   - เรียง filters ใหม่ได้
   - เพิ่ม/ลด filters ได้ง่าย

#### ✅ ข้อดีของ Pipe-and-Filter

1. **🔁 Reusability สูง**
   - Filters ใช้ซ้ำได้
   - ประกอบกันใหม่ได้

2. **🧪 Testability ดี**
   - Test แต่ละ filter แยกได้
   - ง่ายต่อการ unit test

3. **🔄 Maintainability**
   - แก้ไข filter หนึ่ง ไม่กระทบอื่น
   - เพิ่ม/ลด filters ง่าย

4. **⚡ Parallel Processing**
   - Filters ทำงานพร้อมกันได้
   - เพิ่ม throughput

#### ❌ ข้อเสียของ Pipe-and-Filter

1. **⏱️ Latency**
   - ต้องรอทุก filters
   - ถ้ามีหลายขั้นตอน ช้า

2. **🔧 Error Handling ยาก**
   - ถ้า filter ตรงกลางพัง
   - ยาก rollback

3. **🎯 ไม่เหมาะกับ Interactive Systems**
   - เหมาะกับ batch processing
   - ไม่เหมาะกับ real-time user interaction

#### 🏪 ตัวอย่างการใช้งานจริง

1. **Unix Shell Pipelines**
   ```bash
   cat file.txt | grep "error" | sort | uniq | wc -l
   ```
   - แต่ละ command = filter
   - Pipe (|) เชื่อมต่อ

2. **Video Processing**
   ```
   Video → Decode → Stabilize → Color Correct → 
   Add Subtitles → Compress → Encode → Upload
   ```

3. **Data ETL Pipelines**
   ```
   Extract from DB → Transform (clean, normalize) → 
   Validate → Enrich → Load to Data Warehouse
   ```

4. **Image Processing (Instagram-like)**
   ```
   Image Upload → Resize → Apply Filter → 
   Compress → Thumbnail Generation → Save
   ```

5. **Log Processing**
   ```
   Raw Logs → Parse → Filter (errors only) → 
   Aggregate → Alert System
   ```

#### 📐 ตัวอย่างโค้ด (Node.js Streams)

```javascript
const fs = require('fs');
const { Transform } = require('stream');

// Filter 1: Convert to uppercase
class UppercaseFilter extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

// Filter 2: Add line numbers
class LineNumberFilter extends Transform {
  constructor() {
    super();
    this.lineNumber = 1;
  }
  
  _transform(chunk, encoding, callback) {
    const numbered = `${this.lineNumber++}: ${chunk}`;
    this.push(numbered);
    callback();
  }
}

// Pipe: Connect filters
fs.createReadStream('input.txt')
  .pipe(new UppercaseFilter())      // Pipe 1
  .pipe(new LineNumberFilter())     // Pipe 2
  .pipe(fs.createWriteStream('output.txt'));  // Output
```

---

## ส่วนที่ 3: เปรียบเทียบ Architectural Styles ที่เรียนวันนี้

### 📊 ตารางเปรียบเทียบ

| **Criteria** | **Monolithic** | **Layered** | **Client-Server** | **N-Tier** | **Pipe-Filter** |
|-------------|----------------|-------------|------------------|-----------|----------------|
| **Complexity** | ต่ำ | กลาง | กลาง | สูง | กลาง |
| **Scalability** | ต่ำ | กลาง | กลาง | สูง | กลาง |
| **Maintainability** | ต่ำ (เมื่อใหญ่) | สูง | สูง | สูง | สูง |
| **Performance** | สูง (in-process) | กลาง | กลาง-ต่ำ | ต่ำ | กลาง |
| **Deployment** | ง่าย | ง่าย | กลาง | ยาก | ง่าย |
| **ต้นทุน** | ต่ำ | กลาง | กลาง | สูง | ต่ำ-กลาง |
| **Use Case** | ระบบเล็ก-กลาง | Enterprise apps | Web/Mobile apps | Large-scale systems | Data processing |

### 🎯 เลือก Style ไหนดี?

**คำถามที่ต้องถาม:**

1. **ขนาดของระบบ?**
   - เล็ก → Monolithic
   - กลาง → Layered
   - ใหญ่ → N-Tier

2. **จำนวนผู้ใช้?**
   - น้อย → Monolithic
   - กลาง → Client-Server
   - เยอะ → N-Tier

3. **ประเภทงาน?**
   - Batch processing → Pipe-and-Filter
   - Interactive → Client-Server
   - Enterprise → Layered

4. **Quality Attributes สำคัญ?**
   - Performance → Monolithic
   - Maintainability → Layered
   - Scalability → N-Tier
   - Reusability → Pipe-and-Filter

---

## ส่วนที่ 4: ตัวอย่างจากระบบไทยที่คุ้นเคย

### 📱 LINE Messaging

**Architecture:**
- Client-Server (3-Tier)
- Monolithic → Microservices (ค่อยๆ แยก)

**โครงสร้าง:**
```
LINE App (Client)
    ↓
API Gateway
    ↓
Application Servers (Business Logic)
- Message Service
- User Service
- Sticker Service
- Timeline Service
    ↓
Database Clusters
```

**Quality Attributes ที่สำคัญ:**
- ⚡ Performance: ส่งข้อความต้องเร็ว (< 100ms)
- 📈 Scalability: รองรับผู้ใช้หลายล้านคนพร้อมกัน
- 🔒 Availability: ต้องทำงาน 24/7

---

### 🛒 Shopee / Lazada

**Architecture:**
- N-Tier Architecture
- Microservices Architecture

**โครงสร้าง:**
```
Mobile App / Web (Client)
    ↓
CDN (Static Content)
    ↓
Load Balancer
    ↓
API Gateway
    ↓
Microservices:
- Product Catalog Service
- Order Service
- Payment Service
- Inventory Service
- Recommendation Service
    ↓
Databases (per service)
```

**Quality Attributes:**
- 📈 Scalability: ต้องรองรับ flash sale
- 🔒 Reliability: การชำระเงินต้องถูกต้อง 100%
- ⚡ Performance: หน้าสินค้าต้องโหลดเร็ว

---

### 🏥 ระบบจัดการโรงพยาบาล

**Architecture:**
- Layered Architecture (3-tier)

**โครงสร้าง:**
```
Doctor Portal / Patient Portal (UI)
    ↓
Business Logic Layer
- Appointment Management
- Medical Records
- Billing
- Pharmacy
    ↓
Data Access Layer
    ↓
Patient DB, Appointment DB, Medical Records DB
```

**Quality Attributes:**
- 🔒 Security: ข้อมูลผู้ป่วยต้องปลอดภัย
- 🔄 Reliability: ต้องพร้อมใช้งานตลอด
- 📝 Auditability: ต้องบันทึกการเข้าถึงข้อมูล

---

## ส่วนที่ 5: Infographic และแผนภาพ Draw.io

### 📊 Infographic: เปรียบเทียบ 5 Styles

(จะสร้างแผนภาพ Draw.io XML ด้านล่าง)

**สรุปใน Infographic:**
```
┌────────────────────────────────────────────────────────┐
│  🏢 Monolithic    🏛️ Layered    🖥️ Client-Server       │
│                                                        │
│  [Single Block]   [Layer 1]     [Client] ↔ [Server]    │
│  [Everything]     [Layer 2]                            │
│                   [Layer 3]                            │
│                                                        │
│  ✅ ง่าย เร็ว      ✅ Maintainable  ✅ Centralized       │
│  ❌ ยาก Scale     ❌ Performance   ❌ Network Depend   │
│                                                        │
│  🏗️ N-Tier                    🔧 Pipe-Filter           │
│                                                        │
│  [Tier 1]                     [Filter 1] →             │
│  [Tier 2]                     [Filter 2] →             │
│  [Tier 3]                     [Filter 3] →             │
│  [Tier N]                     [Output]                 │
│                                                        │
│  ✅ Highly Scalable            ✅ Reusable             │
│  ❌ Complex                    ❌ Latency              │
└────────────────────────────────────────────────────────┘
```

---

## ส่วนที่ 6: สรุปและเตรียมพร้อมสัปดาห์หน้า

### 📝 สรุปสัปดาห์นี้

**สิ่งที่เรียนรู้:**

1. **Architectural Styles & Patterns คืออะไร**
   - Styles = แนวทางการออกแบบระดับกว้าง
   - Patterns = โซลูชันเฉพาะปัญหา

2. **5 Architectural Styles พื้นฐาน:**
   - ✅ Monolithic: ทุกอย่างรวมกันเป็นก้อนเดียว
   - ✅ Layered: แบ่งเป็นชั้นๆ ตามหน้าที่
   - ✅ Client-Server: แยกผู้ใช้กับเซิร์ฟเวอร์
   - ✅ N-Tier: หลาย tiers แยกกันทาง physical
   - ✅ Pipe-and-Filter: ประมวลผลแบบท่อและฟิลเตอร์

3. **การเลือก Style ขึ้นกับ:**
   - ขนาดระบบ
   - จำนวนผู้ใช้
   - Quality Attributes ที่ต้องการ
   - ทรัพยากรที่มี

### 🔜 สัปดาห์หน้า: Architectural Styles & Patterns (ครั้งที่ 2)

เนื้อหาที่จะเรียน:

1. **Microservices Architecture**
   - แยกเป็น services เล็กๆ อิสระกัน
   - API Gateway, Service Discovery
   - ข้อดีข้อเสีย และเมื่อไหร่ควรใช้

2. **Event-Driven Architecture**
   - สื่อสารผ่าน events
   - Pub/Sub pattern
   - Message Queue, Event Bus

3. **Service-Oriented Architecture (SOA)**
   - หลักการ SOA
   - Web Services, SOAP, REST

4. **Serverless Architecture**
   - Functions as a Service (FaaS)
   - AWS Lambda, Google Cloud Functions
   - เมื่อไหร่ควรใช้ serverless

### 📚 สิ่งที่ต้องเตรียม

**สำหรับสัปดาห์หน้า:**
- อ่านเพิ่มเติมเกี่ยวกับ Microservices
- ลองหา case study ของ Netflix, Uber
- ทบทวน Layered Architecture ที่เรียนวันนี้

**สำหรับโครงงาน:**
- เริ่มคิด Architectural Style ที่เหมาะกับโปรเจกต์
- ทำ draft ของ Context Diagram (C4-C1)

---

## แหล่งเรียนรู้เพิ่มเติม

### 📚 Books
1. **Software Architecture in Practice** (4th Edition) - Len Bass, Paul Clements
   - บทที่ 13: Layered Architecture
   - บทที่ 14: Client-Server Architecture

2. **Pattern-Oriented Software Architecture** - Frank Buschmann
   - Pipe-and-Filter Pattern
   - Layered Pattern

### 🌐 Online Resources
- **Martin Fowler's Blog:** https://martinfowler.com/architecture/
- **Microsoft Architecture Guide:** https://docs.microsoft.com/azure/architecture/
- **AWS Architecture Center:** https://aws.amazon.com/architecture/

### 🎥 Videos
- **"Evolutionary Architecture"** by Neal Ford (YouTube)
- **"Microservices vs Monolith"** by Sam Newman
- **"Clean Architecture"** by Robert C. Martin

### 📄 Papers
- "An Introduction to Software Architecture" - David Garlan & Mary Shaw

---

## สิ่งที่ต้องจำ (Key Takeaways)

### 🎯 5 ข้อสำคัญ

1. **Architectural Styles เป็นโซลูชันที่พิสูจน์แล้ว**
   - ไม่ต้อง reinvent the wheel
   - ใช้ประสบการณ์จากผู้เชี่ยวชาญทั่วโลก

2. **ไม่มี "Perfect Architecture"**
   - ทุก style มี trade-offs
   - เลือกให้เหมาะกับ context

3. **Quality Attributes ขับเคลื่อนการเลือก Style**
   - ต้องการ Scalability → N-Tier
   - ต้องการ Maintainability → Layered
   - ต้องการความเร็ว → Monolithic

4. **Styles สามารถผสมกันได้**
   - ระบบจริงมักใช้หลาย styles
   - เช่น Layered + Client-Server

5. **เริ่มจากง่าย แล้วค่อยซับซ้อนขึ้น**
   - เริ่มจาก Monolithic
   - แยกเป็น Layered
   - ค่อยๆ เปลี่ยนเป็น N-Tier/Microservices

---

## คำถามท้ายบท

### 🤔 ทดสอบความเข้าใจ

1. Architectural Style และ Architectural Pattern ต่างกันอย่างไร?

2. Monolithic Architecture เหมาะกับโปรเจกต์แบบไหน? ยกตัวอย่าง

3. อธิบาย Separation of Concerns ใน Layered Architecture

4. 2-Tier กับ 3-Tier Architecture แตกต่างกันอย่างไร?

5. Pipe-and-Filter Architecture เหมาะกับงานประเภทไหน?

6. ระบบ E-Commerce ควรเลือก Architecture แบบไหน? เพราะอะไร?

7. Trade-offs สำคัญระหว่าง Monolithic กับ Layered คืออะไร?

---

**🙏 จบสัปดาห์ที่ 3**

**เจอกันสัปดาห์หน้าสำหรับ:**
**Architectural Styles & Patterns (ครั้งที่ 2): Microservices, Event-Driven, SOA, Serverless**

---

*เอกสารนี้จัดทำโดย: นายธนิต เกตุแก้ว*  
*หลักสูตรวิศวกรรมซอฟต์แวร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*  
*ปรับปรุงล่าสุด: พ.ศ. 2568*
