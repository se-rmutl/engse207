# ENGSE207 Software Architecture — Final Lab

README ฉบับนี้ใช้เป็นหน้าเริ่มต้นของชุดงาน **Final Lab** รายวิชา **ENGSE207 Software Architecture** โดยแบ่งงานออกเป็น 2 ชุด ดังนี้

- [Set 1: Final Lab — Microservices + HTTPS + Lightweight Logging](./set1/README.md)
- [Set 2: Final Lab — Microservices Scale-Up + Cloud Deployment (Railway)](./set2/README.md)

---

## ภาพรวมของการจัดชุดงาน

Final Lab ถูกออกแบบให้มีความต่อเนื่องกัน 2 ระยะ เพื่อให้นักศึกษาได้พัฒนาความเข้าใจจากระบบ microservices ระดับพื้นฐาน ไปสู่ระบบที่มีการขยาย service, แยกฐานข้อมูล และ deploy ขึ้น cloud ได้จริง

### Set 1 — Take-home
เน้นการสร้างระบบพื้นฐานที่ประกอบด้วย
- Auth Service
- Task Service
- Log Service
- Frontend
- Nginx API Gateway
- HTTPS ด้วย Self-Signed Certificate
- JWT Authentication
- Lightweight Logging

ลิงก์เอกสารชุดที่ 1:
- [เปิด README ของ Set 1](./set1/README.md)

### Set 2 — Final Exam
เป็นการต่อยอดจาก Set 1 โดยเน้น
- เพิ่ม Register API
- เพิ่ม User Service
- เปลี่ยนจาก shared database ไปเป็น database-per-service
- ใช้ JWT shared secret ระหว่างหลาย services
- deploy ระบบขึ้น Railway Cloud
- ทดสอบระบบแบบ end-to-end บน cloud

ลิงก์เอกสารชุดที่ 2:
- [เปิด README ของ Set 2](./set2/README.md)

---

## โครงสร้างโฟลเดอร์

```text
.
├── README.md
├── set1/
│   └── README.md
└── set2/
    └── README.md
```

---

## ลำดับการใช้งานเอกสาร

1. อ่าน [README ของ Set 1](./set1/README.md) เพื่อทำความเข้าใจโจทย์ take-home และแนวทางการส่งงาน
2. เมื่อผ่าน Set 1 แล้ว จึงอ่าน [README ของ Set 2](./set2/README.md) เพื่อเตรียมงานสอบ final lab ในวันสอบจริง
3. ใช้เอกสารของแต่ละชุดควบคู่กับไฟล์โจทย์หลัก, แบบฟอร์ม `TEAM_SPLIT.md`, และ `INDIVIDUAL_REPORT_[studentid].md`

---

## หมายเหตุ

- Set 1 และ Set 2 มีความต่อเนื่องกันในเชิงสถาปัตยกรรม
- Set 2 ถูกออกแบบให้ต่อยอดจากแนวคิดและโครงสร้างหลักของ Set 1
- นักศึกษาควรจัดเก็บหลักฐานการทำงานของทีมและรายบุคคลให้ครบถ้วนตั้งแต่ Set 1 เพื่อใช้ต่อยอดในการประเมินผลงานใน Set 2