# ENGSE207 Software Architecture

## 📝 Homework Lab สัปดาห์ที่ 4 (งานกลุ่ม): Microservices Design & Mini-Debate (ส่งสัปดาห์ถัดไป)

### Assignment: "Extend Task Board with New Feature"

**โจทย์:** เพิ่ม Feature ใหม่ **"Team Chat"** เข้าไปใน Task Board System

**Requirements:**
1. Real-time Chat ในแต่ละ Board
2. แจ้งเตือนเมื่อมีข้อความใหม่
3. ค้นหา Chat History
4. File Sharing

**ให้ออกแบบ:**

### 1. Service Design (20 คะแนน)
```
✅ ตอบคำถาม:
1. ควรสร้าง Service ใหม่ (Chat Service) หรือเพิ่มใน Task Service?
2. ถ้าสร้าง Service ใหม่ → Technology Stack อะไร? เพราะอะไร?
3. Database ควรใช้อะไร? (SQL/NoSQL/Cache) เพราะอะไร?
4. Real-time ใช้ WebSocket หรือ Polling? Trade-offs?
```

### 2. Architecture Diagram (30 คะแนน)
```
✅ วาดแผนภาพแสดง:
• Chat Service และ Components
• การเชื่อมต่อกับ Services อื่นๆ
• Database Design (Tables/Collections)
• WebSocket Connection Flow
```

### 3. Event Design (20 คะแนน)
```
✅ ออกแบบ Events:
• MessageSent
• UserJoinedChat
• UserLeftChat
• FileUploaded

✅ Event Flow Diagram
```

### 4. API Design (20 คะแนน)
```
✅ ออกแบบ REST API:
POST   /api/boards/:boardId/messages
GET    /api/boards/:boardId/messages
GET    /api/boards/:boardId/messages/:messageId
DELETE /api/boards/:boardId/messages/:messageId

✅ WebSocket Events:
• join_room
• leave_room
• send_message
• message_received
```

### 5. Challenges & Solutions (10 คะแนน)
```
✅ วิเคราะห์:
• Challenge 1: Message Order (ลำดับข้อความ)
• Challenge 2: Message Delivery Guarantee
• Challenge 3: Scalability (เมื่อมีผู้ใช้หลายพัน)
• Challenge 4: Chat History (เก็บอย่างไร? เก็บนานแค่ไหน?)

✅ แต่ละ Challenge เสนอ Solution พร้อมเหตุผล
```

### 📤 รูปแบบการส่ง

**ส่งเป็น ZIP File ประกอบด้วย:**
```
📦 week4_homework_GroupX.zip
├── 📄 README.md (สรุปภาพรวม)
├── 📊 architecture_diagram.png
├── 📊 event_flow_diagram.png
├── 📄 service_design.pdf
├── 📄 api_design.yaml (OpenAPI Spec - ถ้าทำได้)
└── 📄 challenges_solutions.pdf
```

**Deadline:** สัปดาห์หน้า (ก่อนคาบเรียน)

**แหล่งเรียนรู้เพิ่มเติม:**
- 📚 C4 Model: https://c4model.com
- 🎬 Microservices Tutorial: https://microservices.io
- 📖 Event-Driven Architecture: Martin Fowler's Blog

---

## 💡 Tips สำหรับการออกแบบ

### ✅ DO's

1. **เริ่มจาก Business Requirements**
   - Feature อะไรสำคัญที่สุด?
   - User Journey เป็นอย่างไร?

2. **คิดถึง Scale จากตอนเริ่ม**
   - ถ้ามีผู้ใช้ 10,000 คน → Service ไหนจะ Bottleneck?
   - Database ไหวหรือไม่?

3. **ใช้ Standard Patterns**
   - API Gateway Pattern
   - Database per Service
   - Event Sourcing

4. **วาดแผนภาพให้ชัดเจน**
   - ใช้สีแยก Service Types
   - ระบุ Technology Stack
   - แสดง Data Flow

### ❌ DON'Ts

1. **อย่า Over-Engineer**
   - ไม่จำเป็นต้องมี 20 Services
   - เริ่มจาก 5-7 Services ก่อน

2. **อย่าลืม Trade-offs**
   - ทุก Decision มี Pros & Cons
   - ไม่มี "Perfect Architecture"

3. **อย่าละเลย Failure Scenarios**
   - Service ล่มทำอย่างไร?
   - Network Timeout จัดการยังไง?

4. **อย่าเลียนแบบ Netflix 100%**
   - Netflix มี 1000+ Engineers
   - Context ของเราต่างกัน

---

**🎉 Good Luck!**

*หากมีคำถาม ติดต่ออาจารย์ที่ thanit@rmutl.ac.th*

---

*Workshop Guide จัดทำโดย: นายธนิต เกตุแก้ว*  
*หลักสูตรวิศวกรรมซอฟต์แวร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*  
*ปรับปรุงล่าสุด: พ.ศ. 2568*
