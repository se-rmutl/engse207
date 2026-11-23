# S04 · T04 · Layered และ Modular Monolith

> **ENGSE207 สถาปัตยกรรมซอฟต์แวร์** · ภาคการศึกษาที่ 2/2569 · CLO1, CLO2, CLO4
> บรรยาย 2 ชม. · ปฏิบัติ 3 ชม. · ศึกษาด้วยตนเอง 5 ชม.
> **สถานะ:** สรุปจากแผนการสอน ใบงานฉบับเต็มจะเผยแพร่ก่อนคาบ

[← หน้าหลักรายวิชา](../../README.md) · [← S03](../week03/README.md) · [S05 →](../week05/README.md)

---

## แนวคิดหลัก

- เปรียบเทียบ Client–Server, Layered และ Modular Monolith
- layer คือขอบเขตหน้าที่ในโค้ด ส่วน tier คือการแยกการติดตั้ง
- dependency direction, interface และต้นทุนการเปลี่ยน

## กิจกรรมในแล็บ

- ดูผู้สอน refactor หนึ่ง flow แล้วแยก route/service/repository เองใน flow ใกล้เคียงจาก snapshot
- ตรวจว่าพฤติกรรมเดิมยังผ่าน เปรียบเทียบ diff และผลกระทบเมื่อเปลี่ยน business rule

## เสริมพื้นฐาน (30–45 นาทีในเวลาปฏิบัติ)

import/export ของ module, Express Router และ middleware, ทดสอบ regression ด้วย HTTP client

## หลักฐานและการประเมิน

- รุ่นแบ่งโมดูลและผลตรวจใน **ARCH-04**
- เหตุผลหนึ่งย่อหน้าสำหรับ ARCH-03 (งานฝึก)

## ศึกษาด้วยตนเอง 5 ชั่วโมง

- อ่านโครงสร้างก่อน–หลัง 1 ชม.
- ปรับ flow ที่กำหนดพร้อม regression check 3 ชม.
- สรุปข้อแลกเปลี่ยน 1 ชม.

## เชื่อมกับ Term Project

งานที่เกี่ยวข้อง: **ARCH-03, ARCH-04** · ดูขอบเขตแต่ละชิ้นใน[หน้า Term Project](../../term-project/README.md)

---

[← หน้าหลักรายวิชา](../../README.md) · [← S03](../week03/README.md) · [S05 →](../week05/README.md)
