# S03 · T03 · คุณลักษณะคุณภาพและการวิเคราะห์ข้อขัดข้อง

> **ENGSE207 สถาปัตยกรรมซอฟต์แวร์** · ภาคการศึกษาที่ 2/2569 · CLO1, CLO4, CLO5, CLO7
> บรรยาย 2 ชม. · ปฏิบัติ 3 ชม. · ศึกษาด้วยตนเอง 5 ชม.
> **สถานะ:** สรุปจากแผนการสอน ใบงานฉบับเต็มจะเผยแพร่ก่อนคาบ

[← หน้าหลักรายวิชา](../../README.md) · [← S02](../week02/README.md) · [S04 →](../week04/README.md)

---

## แนวคิดหลัก

- functional requirement กับ quality attribute: modifiability, reliability, performance และ scalability
- เขียน quality scenario ที่มีสิ่งกระตุ้น สภาพแวดล้อม ผลตอบสนอง และตัววัด
- Docker image, container, port, volume และ network ผ่านระบบที่รันแล้ว

## กิจกรรมในแล็บ

- ใช้ Network panel, API log และฐานข้อมูลแยกจุดเสียจากโจทย์ validation/status/query
- ตรวจข้อมูลหลัง restart
- ทีมตั้ง 2 สถานการณ์: เปลี่ยนกฎงาน และเครือข่ายหรือบริการขัดข้อง
- ตรวจพื้นฐานรายคนแบบฝึก พร้อม feedback ไม่คิดคะแนน

## เสริมพื้นฐาน (30–45 นาทีในเวลาปฏิบัติ)

DevTools Network panel, การอ่าน log, คำสั่ง SELECT ผ่าน psql ใน container

## หลักฐานและการประเมิน

- **ARCH-01** รุ่นแรกและบันทึก debug แยกข้อมูลที่วัดได้ ข้อสมมติ และข้อมูลจากโจทย์ออกจากกัน

## ศึกษาด้วยตนเอง 5 ชั่วโมง

- อ่านตัวอย่าง quality scenario 1 ชม.
- ฝึก debug 2 ชม.
- ปรับ ARCH-01 และเงื่อนไขทดลอง 2 ชม.

## เชื่อมกับ Term Project

งานที่เกี่ยวข้อง: **ARCH-01** · ดูขอบเขตแต่ละชิ้นใน[หน้า Term Project](../../term-project/README.md)

---

[← หน้าหลักรายวิชา](../../README.md) · [← S02](../week02/README.md) · [S04 →](../week04/README.md)
