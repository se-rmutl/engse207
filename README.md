# ENGSE207 สถาปัตยกรรมซอฟต์แวร์ (Software Architecture) 🏗️

**หลักสูตรวิศวกรรมซอฟต์แวร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา (ดอยสะเก็ด)** **ภาคเรียนที่:** [ระบุภาคเรียน/ปีการศึกษา]  
**ผู้สอน:** อ.ธนิต เกตุแก้ว [cite: 58]

![Software Architecture Banner](https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3)
*(ภาพประกอบ: Software Architecture Concept)*

---

## 📖 เกี่ยวกับรายวิชา [cite: 60, 61]
รายวิชานี้มุ่งเน้นการศึกษาและฝึกปฏิบัติเกี่ยวกับพื้นฐานของสถาปัตยกรรมซอฟต์แวร์ (Software Architecture) ครอบคลุมเนื้อหาสำคัญดังนี้:
* หลักการพื้นฐานและแนวทางในการออกแบบสถาปัตยกรรม
* รูปแบบ (Patterns) และกรอบแนวคิด (Styles) ต่างๆ
* การเขียนเอกสารอธิบายสถาปัตยกรรม (Documentation)
* การประเมินผลสถาปัตยกรรม (Evaluation)
* การประยุกต์ใช้กับเทคโนโลยีสมัยใหม่ เช่น Cloud Computing, Microservices และ Serverless

## 🎯 วัตถุประสงค์การเรียนรู้ (Course Objectives) [cite: 63-68]
เมื่อสิ้นสุดการเรียนรายวิชานี้ นักศึกษาจะสามารถ:
1.  **เข้าใจ:** หลักการพื้นฐานและความสำคัญของ Software Architecture
2.  **วิเคราะห์:** เลือกใช้ Architectural Patterns ที่เหมาะสมกับความต้องการ
3.  **ออกแบบ:** สถาปัตยกรรมที่มีคุณภาพสูงโดยคำนึงถึง Quality Attributes
4.  **สื่อสาร:** ใช้เครื่องมือ (C4 Model, Diagrams) ในการนำเสนอสถาปัตยกรรม
5.  **ประเมิน:** ปรับปรุงสถาปัตยกรรมอย่างเป็นระบบ

---

## 🛠️ เครื่องมือที่ใช้ (Tools & Technologies) [cite: 73]
* **Modeling:** [Draw.io](https://app.diagrams.net/), [Structurizr](https://structurizr.com/), Lucidchart
* **Collaboration:** Miro / FigJam
* **Development/DevOps:** Docker, Kubernetes (Basic), Git

---

## 📅 แผนการเรียนการสอน (Weekly Schedule) [cite: 69-73]

| สัปดาห์ | หัวข้อ (Topic) | เนื้อหา (Materials) | งานปฏิบัติ (Labs/Workshops) |
| :---: | :--- | :---: | :---: |
| **01** | **บทนำสถาปัตยกรรมซอฟต์แวร์** <br> (Introduction & Modern Systems) | [📺 Lecture](./week01/lecture.md) | [💻 Lab: System Analysis](./week01/lab.md) |
| **02** | **คุณภาพซอฟต์แวร์ & ปัจจัยขับเคลื่อน** <br> (Quality Attributes & Architectural Drivers) | [📺 Lecture](./week02/lecture.md) | [💻 Workshop: QA Scenarios](./week02/lab.md) |
| **03** | **รูปแบบสถาปัตยกรรมพื้นฐาน (Part 1)** <br> (Monolith, Layered, Client-Server, Pipe-Filter) | [📺 Lecture](./week03/lecture.md) | [💻 Lab: Refactoring to Layered](./week03/lab.md) |
| **04** | **รูปแบบสถาปัตยกรรมสมัยใหม่ (Part 2)** <br> (Microservices, Event-Driven, Serverless) | [📺 Lecture](./week04/lecture.md) | [💻 Lab: Microservices Design](./week04/lab.md) |
| **05** | **การจำลองแบบด้วย C4 Model** <br> (Architecture Views: Context/Container) | [📺 Lecture](./week05/lecture.md) | [💻 Lab: Draw C1-C2 Diagrams](./week05/lab.md) |
| **06** | **กระบวนการออกแบบสถาปัตยกรรม** <br> (Design Process & ADD-Lite) | [📺 Lecture](./week06/lecture.md) | [💻 Workshop: Decision Record (ADR)](./week06/lab.md) |
| **07** | **สถาปัตยกรรมสำหรับ Cloud** <br> (Cloud & Containerization) | [📺 Lecture](./week07/lecture.md) | [💻 Lab: Cloud Deployment Diagram](./week07/lab.md) |
| **08** | 📝 **สอบกลางภาค (Midterm Exam)** | - | - |
| **09** | **สถาปัตยกรรมสำหรับ Mobile & Edge** <br> (Offline-First, BFF Pattern) | [📺 Lecture](./week09/lecture.md) | [💻 Lab: Mobile/BFF Design](./week09/lab.md) |
| **10** | **สถาปัตยกรรมข้อมูล & การเชื่อมต่อ** <br> (Data-Intensive & Integration) | [📺 Lecture](./week10/lecture.md) | [💻 Lab: Data Flow & Integration](./week10/lab.md) |
| **11** | **การประเมินสถาปัตยกรรม** <br> (Evaluation & Technical Debt) | [📺 Lecture](./week11/lecture.md) | [💻 Activity: Architecture Review](./week11/lab.md) |
| **12** | **ความปลอดภัยในสถาปัตยกรรม** <br> (Security-Aware Architecture) | [📺 Lecture](./week12/lecture.md) | [💻 Lab: Threat Modeling](./week12/lab.md) |
| **13** | **DevOps & Observability** <br> (CI/CD, Logging, Monitoring) | [📺 Lecture](./week13/lecture.md) | [💻 Lab: Deployment Pipeline](./week13/lab.md) |
| **14** | **Project Workshop 1** <br> (High-Level Arch & C4 Integration) | - | [💻 Project: SAD Draft](./week14/project.md) |
| **15** | **Project Workshop 2** <br> (Detail, Trade-offs & Documentation) | - | [💻 Project: Finalize SAD](./week15/project.md) |
| **16** | 🎤 **นำเสนอโครงงาน (Final Presentation)** | - | [📂 Submission](./week16/submission.md) |
| **17** | 📝 **สอบปลายภาค (Final Exam)** | - | - |

---

## 📚 แหล่งข้อมูลอ้างอิง (References)
* *Software Architecture in Practice (3rd/4th Edition)* - Bass, Clements, Kazman
* *Fundamentals of Software Architecture* - Richards, Ford
* [C4 Model Website](https://c4model.com/)
* [AWS Architecture Center](https://aws.amazon.com/architecture/)

---

> **Note for Students:** กรุณาตรวจสอบ GitHub Issues และ Announcements ใน Class เป็นประจำเพื่อติดตามการอัปเดตและส่งงาน