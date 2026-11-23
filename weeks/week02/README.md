# S02 · T02 · ความรับผิดชอบขององค์ประกอบและเส้นทางข้อมูล

> **ENGSE207 สถาปัตยกรรมซอฟต์แวร์** · ภาคการศึกษาที่ 2/2569 · CLO1, CLO3, CLO4, CLO6
> บรรยาย 2 ชม. · ปฏิบัติ 3 ชม. · ศึกษาด้วยตนเอง 5 ชม.
> **สถานะ:** สรุปจากแผนการสอน ใบงานฉบับเต็มจะเผยแพร่ก่อนคาบ

[← หน้าหลักรายวิชา](../../README.md) · [← S01](../week01/README.md) · [S03 →](../week03/README.md)

---

## แนวคิดหลัก

- Client–Server, separation of concerns, cohesion/coupling และ modularity
- อ่าน event/state/fetch, HTTP/JSON/status code และ async/await เท่าที่ใช้ใน flow
- แยก C4 Container ซึ่งเป็นหน่วยซอฟต์แวร์ ออกจาก Docker container

## กิจกรรมในแล็บ

- รันระบบ Task Board ครั้งแรกด้วย Docker Compose และใช้คำสั่ง start/stop/logs
- ตามค่าจาก React ผ่าน route → service → query แล้วกลับมาที่ UI
- แก้ field หรือ validation หนึ่งจุดด้วยใบชี้ตำแหน่ง ระบุ API, DB และ port ที่เกี่ยวข้อง
- ฝึก Git diff/commit เป็นคู่ ทุกคนผลัดกันลงมือ

## เสริมพื้นฐาน (30–45 นาทีในเวลาปฏิบัติ)

HTTP/JSON/status, fetch + async/await, อ่าน React component (props, state, event), git diff/branch, docker compose up/down/logs

## หลักฐานและการประเมิน

- หลักฐานฝึกก่อน A1: อธิบาย input/output ระบุไฟล์ที่แก้ และตรวจทั้งกรณีปกติและผิดพลาด
- เริ่ม **ARCH-04** (ระบบของทีม)

## ศึกษาด้วยตนเอง 5 ชั่วโมง

- ทบทวน request/response 1 ชม.
- ทำโจทย์ใกล้เคียงและตรวจผล 3 ชม.
- บันทึก diff และคำอธิบาย 1 ชม.

## เชื่อมกับ Term Project

งานที่เกี่ยวข้อง: **ARCH-04** · ดูขอบเขตแต่ละชิ้นใน[หน้า Term Project](../../term-project/README.md)

---

[← หน้าหลักรายวิชา](../../README.md) · [← S01](../week01/README.md) · [S03 →](../week03/README.md)
