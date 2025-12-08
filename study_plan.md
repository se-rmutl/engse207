# แผนการสอนรายวิชา ENGSE207 สถาปัตยกรรมซอฟต์แวร์ (Software Architecture)

## ข้อมูลรายวิชา

- **รหัสวิชา:** ENGSE207  
- **ชื่อวิชา:** สถาปัตยกรรมซอฟต์แวร์ (Software Architecture)  
- **จำนวนหน่วยกิต:** 3 (ทฤษฎี 2 ชม. + ปฏิบัติ 3 ชม.)  
- **ระดับชั้น:** ปีที่ 2  
- **ระยะเวลาเรียน:** 17 สัปดาห์ (เรียน 15 สัปดาห์ + สอบ 2 สัปดาห์)  
- **ผู้สอน:** นายธนิต เกตุแก้ว – อาจารย์ประจำหลักสูตรวิศวกรรมซอฟต์แวร์  
- **หลักสูตร:** วิศวกรรมซอฟต์แวร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา (ดอยสะเก็ด)

---

## คำอธิบายรายวิชา

ศึกษาและฝึกปฏิบัติเกี่ยวกับพื้นฐานของสถาปัตยกรรมซอฟต์แวร์ หลักการพื้นฐานและแนวทางในการออกแบบสถาปัตยกรรมซอฟต์แวร์ รูปแบบและกรอบแนวคิดต่าง ๆ ของสถาปัตยกรรมซอฟต์แวร์ วิธีการ เทคนิคและเครื่องมือสำหรับการใช้เอกสารอธิบายสถาปัตยกรรมซอฟต์แวร์อย่างสมเหตุสมผล การออกแบบสถาปัตยกรรมซอฟต์แวร์และกระบวนการประเมินผล รวมถึงการประยุกต์ใช้กับเทคโนโลยีที่ทันสมัย เช่น Cloud Computing และ Mobile Computing

---

## วัตถุประสงค์รายวิชา

เมื่อสิ้นสุดการเรียนรายวิชานี้ นักศึกษาจะสามารถ:

1. เข้าใจหลักการพื้นฐานของสถาปัตยกรรมซอฟต์แวร์และความสำคัญในวงจรการพัฒนาซอฟต์แวร์  
2. วิเคราะห์และเลือกใช้ Architectural Patterns และ Styles ที่เหมาะสมกับความต้องการของระบบ  
3. ออกแบบสถาปัตยกรรมซอฟต์แวร์ที่มีคุณภาพสูงโดยคำนึงถึง Quality Attributes  
4. ใช้เครื่องมือและเทคนิคสมัยใหม่ในการสร้างเอกสารและนำเสนอสถาปัตยกรรม  
5. ประเมินและปรับปรุงสถาปัตยกรรมซอฟต์แวร์อย่างเป็นระบบ  

---

## แผนการเรียนรายสัปดาห์ ENGSE207 (17 สัปดาห์)

> ทุกสัปดาห์ปกติ: 5 ชั่วโมง/สัปดาห์ (บรรยาย 2 ชม. + ปฏิบัติ 3 ชม.)  
> สัปดาห์สอบกลางภาค / ปลายภาค: 3 ชั่วโมง ตามตารางสอบมหาวิทยาลัย  

### ตารางแผนการสอนรายสัปดาห์

| สัปดาห์ที่ | หัวข้อ / รายละเอียด | จำนวนชั่วโมง | กิจกรรมการเรียนการสอนและสื่อ | CLO | ผู้สอน |
|-----------:|----------------------|:------------:|----------------------------------|:---:|:------|
| 1 | **บทนำสถาปัตยกรรมซอฟต์แวร์และภาพรวมระบบสมัยใหม่**<br>วัตถุประสงค์: ให้นักศึกษาเข้าใจนิยาม บทบาทของ Software Architecture, ความแตกต่างระหว่าง Architecture vs Design vs Implementation และตัวอย่างสถาปัตยกรรมของระบบยอดนิยม (เช่น ระบบสตรีมมิ่ง ระบบ Chat ระบบ E-Commerce) | 5 | **บรรยาย (2 ชม.)**: ภาพรวม Software Architecture, Stakeholders, Views & Viewpoints, ตัวอย่างสถาปัตยกรรมจากอุตสาหกรรม<br>**ปฏิบัติ (3 ชม.)**: กิจกรรมกลุ่ม “วิเคราะห์ระบบที่คุ้นเคย” ให้แต่ละกลุ่มเลือกระบบจริง (เช่น LINE, Shopee, YouTube) แล้วร่างกล่องใหญ่ ๆ ของ System Context แบบไม่เป็นทางการบนกระดาน/ออนไลน์<br>**สื่อ:** สไลด์ประกอบ, วิดีโอสั้น, บทความตัวอย่างสถาปัตยกรรมระดับสูง | CLO1, CLO2, CLO5 | อาจารย์ประจำวิชา |
| 2 | **Quality Attributes & Architectural Drivers**<br>วัตถุประสงค์: ให้นักศึกษาระบุและอธิบาย Quality Attributes ที่สำคัญ และเข้าใจแนวคิด Quality Attribute Scenarios, Architectural Drivers สำหรับระบบขนาดกลาง | 5 | **บรรยาย:** Quality Attributes (Performance, Scalability, Reliability, Security, Modifiability, Usability ฯลฯ), Trade-offs เบื้องต้น, ตัวอย่าง Scenario Template<br>**ปฏิบัติ:** Workshop เขียน Quality Attribute Scenarios สำหรับ “Cloud-based Task Board System” (ระบบจัดการงานบนคลาวด์) ของรายวิชา ใช้แบบฟอร์ม Scenario และระบุ Architectural Drivers หลักของระบบร่วมกันทั้งชั้น<br>**สื่อ:** Handout แบบฟอร์ม Scenario, สไลด์, ตัวอย่างจาก SWEBOK / หนังสือ | CLO2, CLO3, CLO5, CLO7 | อาจารย์ประจำวิชา |
| 3 | **Architectural Styles & Patterns (1): Monolith, Layered, Client–Server, N-Tier, Pipe-and-Filter**<br>วัตถุประสงค์: ให้นักศึกษารู้จักและเปรียบเทียบ Style พื้นฐาน และมองเห็นข้อดีข้อจำกัดของแต่ละแบบ | 5 | **บรรยาย:** ภาพรวม Architectural Styles พื้นฐาน, ตัวอย่างการใช้งาน, ผลต่อ Quality Attributes<br>**ปฏิบัติ:** กิจกรรม “Refactor สถาปัตยกรรมจาก Monolith → Layered” แบบเชิงแนวคิด (ใช้กล่อง/ลูกศร) ให้แต่ละกลุ่มออกแบบรูป Layered Architecture สำหรับ Task Board System และเขียนข้อดีข้อเสียเทียบ Monolith<br>**สื่อ:** สไลด์, แผ่นงานเปรียบเทียบ Styles, เครื่องมือวาดแผนภาพ (Draw.io / Lucidchart) | CLO2, CLO5, CLO6, CLO7 | อาจารย์ประจำวิชา |
| 4 | **Architectural Styles & Patterns (2): Microservices, Event-Driven, Service-Oriented, Serverless**<br>วัตถุประสงค์: ให้นักศึกษาเข้าใจแนวคิดสถาปัตยกรรมสมัยใหม่ และทราบบริบทที่ควร/ไม่ควรใช้ Microservices, Event Bus, Serverless | 5 | **บรรยาย:** แนวคิด Microservices, Bounded Context, API Gateway, Event-Driven Architecture, Pub/Sub, Serverless Functions, ตัวอย่างจากอุตสาหกรรม<br>**ปฏิบัติ:** กิจกรรมกลุ่ม “ออกแบบ Task Board แบบ Microservices ระดับ Overview” ระบุบริการหลัก (เช่น User Service, Board Service, Notification Service) และวาดแผนภาพการสื่อสารแบบ Sync/Async; ทำ Mini-Debate “Monolith ที่ดี vs Microservices ที่ไม่พร้อม” เน้น Trade-offs<br>**สื่อ:** สไลด์, ตัวอย่าง Diagram, กระดานออนไลน์ (Miro / FigJam) | CLO2, CLO3, CLO4, CLO6, CLO7 | อาจารย์ประจำวิชา |
| 5 | **C4 Model & Architecture Views (Context/Container)**<br>วัตถุประสงค์: ให้นักศึกษาใช้ C4 Model ระดับ C1–C2 เพื่อสื่อสารสถาปัตยกรรมภาพรวมและ Container ของระบบได้ | 5 | **บรรยาย:** แนะนำ C4 Model (C1–C4), View/Viewpoint, การเลือกมุมมองให้เหมาะกับ Stakeholder แต่ละกลุ่ม<br>**ปฏิบัติ:** Lab ใช้ Draw.io / Structurizr วาด C1 (System Context) และ C2 (Container Diagram) สำหรับ Task Board System; กิจกรรม Peer Review แบบง่าย ๆ: กลุ่ม A อธิบาย Diagram ให้กลุ่ม B ฟังแล้วรับ Feedback<br>**สื่อ:** C4 Model Docs (ย่อ), Template Diagram, เครื่องมือ Modeling | CLO1, CLO3, CLO5, CLO6, CLO8, CLO9 | อาจารย์ประจำวิชา |
| 6 | **Architectural Design Process & Attribute-Driven Design (ADD-Lite)**<br>วัตถุประสงค์: ให้นักศึกษามองเห็นขั้นตอนออกแบบสถาปัตยกรรมตั้งแต่ Requirements → Drivers → Candidate Architectures แบบง่าย | 5 | **บรรยาย:** กระบวนการออกแบบสถาปัตยกรรม, แนวคิด Attribute-Driven Design, การเลือก Style/Pattern จาก Drivers และ Scenario<br>**ปฏิบัติ:** Workshop เดินตามขั้นตอน ADD-Lite สำหรับ Task Board System: เลือก Quality Attribute Scenarios สำคัญ → เสนอ Candidate Architectures 2 แบบ → เปรียบเทียบข้อดีข้อเสียและเลือกแนวทางหลักของเทอมโปรเจกต์; เขียน Architecture Decision Record (ADR) ฉบับแรกของทีม | CLO3, CLO5, CLO6, CLO7, CLO8 | อาจารย์ประจำวิชา |
| 7 | **สถาปัตยกรรมสำหรับ Cloud & Containerization**<br>วัตถุประสงค์: ให้นักศึกษารู้จักแนวคิด Cloud Service Models (IaaS/PaaS/SaaS), Deployment Models, Container & Orchestrator และวางภาพ Deployment ระดับเบื้องต้นได้ | 5 | **บรรยาย:** Cloud Fundamentals, 12-Factor App (ระดับแนวคิด), Containers & Orchestration (Docker, Kubernetes – overview), Basic Deployment Topologies (Single Server, Auto-Scaling Group, Managed DB ฯลฯ)<br>**ปฏิบัติ:** Lab ใช้ Cloud Architecture Icons วาด Diagram Deployment คร่าว ๆ สำหรับ Task Board System บน Cloud Provider สมมติ (เช่น Web App + API + DB + Message Broker); กิจกรรมเล็ก ๆ ประเมิน Latency/Throughput คร่าว ๆ ของระบบภายใต้โหลดที่ต่างกัน (เชิงแนวคิด ไม่คำนวณยาก) | CLO2, CLO3, CLO4, CLO6, CLO13, CLO14 | อาจารย์ประจำวิชา |
| 8 | **สอบกลางภาค (Midterm Examination)**<br>ครอบคลุมเนื้อหา: สัปดาห์ที่ 1–7 | 3 | **รูปแบบข้อสอบ** (ปรับตาม มคอ.3):<br>– ข้อเขียนเน้นแนวคิด (ประมาณ 60%) เช่น อธิบาย Style / Quality Attributes / Trade-offs<br>– ปฏิบัติ (ประมาณ 40%): อ่าน/วาด C1–C2 Diagram ง่าย ๆ, วิเคราะห์ Drivers ของสถานการณ์สั้น ๆ | CLO1–CLO7 | อาจารย์ประจำวิชา |
| 9 | **สถาปัตยกรรมสำหรับ Mobile, Edge และ Offline-First**<br>วัตถุประสงค์: ให้นักศึกษามองเห็นรูปแบบสถาปัตยกรรมที่รองรับ Mobile App, Offline-Sync, Push Notification และ Backend-for-Frontend (BFF) | 5 | **บรรยาย:** Mobile Architecture Patterns (Online-Only vs Offline-First), Sync Strategies, BFF Pattern, Push Notification Flow, Edge Caching (พื้นฐาน)<br>**ปฏิบัติ:** ให้แต่ละทีมออกแบบ Container/Component สำหรับ Mobile Client + BFF + Backend ของ Task Board System พร้อมกำหนด Flow การ Sync ข้อมูลเมื่อ Offline/Online; ฝึกเขียน Sequence Diagram อย่างง่ายสำหรับ Use Case “อัปเดตสถานะ Task เมื่อ Offline” | CLO2, CLO3, CLO4, CLO6, CLO9, CLO10 | อาจารย์ประจำวิชา |
| 10 | **Data-Intensive & Integration Architectures**<br>วัตถุประสงค์: ให้นักศึกษารู้จักแนวคิด Data-centric Architectures, API Gateway, Message Queue, Event Streaming แบบพื้นฐาน | 5 | **บรรยาย:** Data-Intensive Systems Overview, Transaction vs Analytics Workload, API Gateway, Message Broker, Basic CQRS/Read-Model แยกระดับแนวคิด<br>**ปฏิบัติ:** Workshop ออกแบบ Logical Data Flow และ Integration Diagram สำหรับ Task Board System ที่ต้องเชื่อมกับบริการอื่น (เช่น ระบบบัญชี / ระบบแจ้งเตือน); วิเคราะห์คอขวดด้าน Data และประเมิน Load คร่าว ๆ จากจำนวนผู้ใช้ / Task | CLO2, CLO3, CLO6, CLO7, CLO13 | อาจารย์ประจำวิชา |
| 11 | **Architecture Evaluation & Technical Debt**<br>วัตถุประสงค์: ให้นักศึกษารู้จักแนวคิดการประเมินสถาปัตยกรรม (เช่น Scenario-Based Review, ATAM-Lite) และตระหนักเรื่อง Technical Debt | 5 | **บรรยาย:** หลักการ Architecture Evaluation, Risk & Sensitivity Points, Technical Debt, Architecture Smells ทั่วไป<br>**ปฏิบัติ:** กิจกรรม “Architecture Review Meeting จำลอง” – แต่ละทีมเตรียม C2 + Drivers ของตัวเอง จากนั้นเพื่อนทีมอื่นสวมบท Reviewer ถาม-ตอบตาม Scenario; ใช้ Checklist ง่าย ๆ ในการให้คะแนน/Feedback; สรุป Risk/Improvement ของทีมตัวเอง | CLO3, CLO5, CLO7, CLO11, CLO13 | อาจารย์ประจำวิชา |
| 12 | **Security-Aware Software Architecture**<br>วัตถุประสงค์: ให้ตระหนักและออกแบบสถาปัตยกรรมที่คำนึงถึง Security ตั้งแต่แรก เช่น Authentication/Authorization, Threat Modeling, Zero-Trust (พื้นฐาน) | 5 | **บรรยาย:** Threat Modeling เบื้องต้น (STRIDE แบบง่าย), Security Architecture Components (Auth Service, Token, API Gateway, WAF), หลักการ Zero-Trust แบบ high-level<br>**ปฏิบัติ:** ทำ Threat Modeling แบบกลุ่มสำหรับ Task Board System วาด Data Flow Diagram (DFD) high-level เล็ก ๆ แล้วระบุ Threat หลักและ Mitigation; ปรับ C2/C3 เพื่อสะท้อนกลไก Security ที่เพิ่มขึ้น (เช่น แยก Auth Service, เพิ่ม Gateway, Log Centralization) | CLO3, CLO5, CLO6, CLO7, CLO10, CLO14 | อาจารย์ประจำวิชา |
| 13 | **Architecture, DevOps & Observability**<br>วัตถุประสงค์: เชื่อมโยงสถาปัตยกรรมกับ CI/CD, Logging, Monitoring, Alerting เพื่อรองรับการปฏิบัติการระบบจริง | 5 | **บรรยาย:** DevOps Overview, CI/CD Pipeline Components, Observability (Logs, Metrics, Traces), Basic SLO/SLI, Blue-Green / Canary Deployments แนวคิด<br>**ปฏิบัติ:** กิจกรรม “ออกแบบ Deployment & Operations View” – แต่ละทีมวาด Diagram ที่แสดง Pipeline คร่าว ๆ, Environment ต่าง ๆ (Dev / Test / Prod), จุดที่วัด Metric สำคัญของ Task Board System; ถ้าเวลาเอื้อ อาจสาธิตสร้าง Pipeline ง่าย ๆ หรือใช้เครื่องมือจำลอง | CLO4, CLO7, CLO8, CLO9, CLO14 | อาจารย์ประจำวิชา |
| 14 | **Project Architecture Workshop (1): High-Level Architecture & C4 Integration**<br>วัตถุประสงค์: รวมและปรับสถาปัตยกรรมระดับสูงของทีมให้สอดคล้องครบทั้ง Context, Containers, Components พร้อม Drivers/Scenarios | 5 | **บรรยายสั้น:** แนวทางจัดโครงเอกสาร Software Architecture Document (SAD) และตัวอย่างจากอุตสาหกรรม<br>**ปฏิบัติ:** (ส่วนใหญ่ของคาบ) แต่ละทีมทำงาน workshop ปรับปรุง C1–C3 + ADR (จากสัปดาห์ก่อน) ให้ครบและสอดคล้อง; อาจารย์และผู้ช่วยเดินให้คำปรึกษารายทีม; ปิดคาบด้วย checkpoint mini-presentation 5 นาที/ทีมเพื่ออธิบายภาพรวมสถาปัตยกรรม | CLO5, CLO6, CLO8, CLO9, CLO11 | อาจารย์ประจำวิชา |
| 15 | **Project Architecture Workshop (2): Detail, Trade-offs & Documentation**<br>วัตถุประสงค์: เติมรายละเอียด Design Decisions, Quality Attribute Mapping และเตรียมเอกสาร/สไลด์สำหรับการนำเสนอปลายเทอม | 5 | **บรรยายสั้น:** ตัวอย่าง section ใน SAD/ADR ที่ดี, แนวทางเขียน Rationale และ Trade-offs ให้ชัดเจน<br>**ปฏิบัติ:** แต่ละทีมจัดทำเอกสาร SAD ฉบับสมบูรณ์ (ร่างแรก) + Slide นำเสนอสถาปัตยกรรม; Peer Review SAD ข้ามทีม (ใช้ Checklist ด้านความชัดเจน/ความครบถ้วน/ความสอดคล้องกับ Drivers); เก็บคะแนนจากคุณภาพเอกสารและการให้ Feedback | CLO3, CLO7, CLO8, CLO9, CLO11, CLO12 | อาจารย์ประจำวิชา |
| 16 | **Final Project Presentation & Reflection**<br>วัตถุประสงค์: ให้นักศึกษาฝึกการนำเสนอแบบสถาปัตยกรรมซอฟต์แวร์อย่างมืออาชีพ และสะท้อนการเรียนรู้จากโครงงาน | 5 | **กิจกรรมหลัก:** การนำเสนอ Final Architecture ของแต่ละทีม (10–15 นาที/ทีม + Q&A) ต่อเพื่อนในชั้น / อาจารย์; เน้นการอธิบาย Drivers, Quality Attributes, Architectural Styles ที่เลือกใช้ และ Trade-offs สำคัญ<br>**Reflection:** แบบสอบถาม / อภิปรายสั้น ๆ เรื่อง “เราได้เรียนรู้อะไรจากการออกแบบสถาปัตยกรรมจริง” และ “ถ้ามีเวลาอีก 6 เดือนจะปรับสถาปัตยกรรมอย่างไร” | CLO8, CLO9, CLO11, CLO12, CLO13, CLO14 | อาจารย์ประจำวิชา |
| 17 | **สอบปลายภาค (Final Examination)**<br>ครอบคลุมเนื้อหา: ภาพรวมทั้งรายวิชา โดยเน้นส่วนที่ไม่สามารถวัดได้จากโครงงาน เช่น การประเมินสถาปัตยกรรมจากเคสใหม่ | 3 | **รูปแบบข้อสอบ** (ปรับตาม มคอ.3):<br>– ข้อเขียน/วิเคราะห์สถานการณ์ (เช่น เคสสถาปัตยกรรมใหม่ที่นักศึกษาไม่เคยเห็น แล้วให้วิเคราะห์ Drivers / Styles / Trade-offs, เสนอการปรับปรุง ฯลฯ)<br>– อาจมีข้อปฏิบัติสั้น ๆ เช่น วาด Context / Container Diagram จากคำอธิบาย, เขียน Quality Attribute Scenario หรือ ADR สั้น ๆ | CLO1–CLO14 | อาจารย์ประจำวิชา |

---

## Course Learning Outcomes (CLOs) – ENGSE207 สถาปัตยกรรมซอฟต์แวร์

### ด้านความรู้ (Knowledge – K)

- **CLO1 (K)**  
  อธิบายบทบาท ความสำคัญ และแนวคิดพื้นฐานของสถาปัตยกรรมซอฟต์แวร์ รวมถึงความแตกต่างระหว่าง Architecture, Design และ Implementation ได้อย่างถูกต้อง  

- **CLO2 (K)**  
  อธิบายสถาปัตยกรรมซอฟต์แวร์รูปแบบหลัก (Architectural Styles & Patterns) เช่น Layered, Client–Server, Microservices, Event-Driven, Serverless พร้อมตัวอย่างการนำไปใช้ได้  

- **CLO3 (K)**  
  อธิบายคุณลักษณะคุณภาพของซอฟต์แวร์ (Quality Attributes) เช่น Performance, Scalability, Availability, Security, Modifiability และแนวคิด Quality Attribute Scenario ได้อย่างเป็นระบบ  

- **CLO4 (K)**  
  อธิบายแนวคิดพื้นฐานของสถาปัตยกรรมสำหรับเทคโนโลยีสมัยใหม่ เช่น Cloud Computing, Containerization, Serverless, Mobile/Edge Computing และ Backend-for-Frontend ได้  

---

### ด้านทักษะทางปัญญา (Cognitive Skills – C)

- **CLO5 (C)**  
  วิเคราะห์ Architectural Drivers และ Architectural Requirements ที่ได้จาก SRS โดยระบุข้อจำกัด (Constraints) และ Quality Attribute Scenarios ที่สำคัญของระบบได้  

- **CLO6 (C)**  
  ออกแบบสถาปัตยกรรมระดับสูงของระบบซอฟต์แวร์โดยใช้ C4 Model (Context, Container, Component, Code Overview) และเลือกใช้ Architectural Styles / Patterns ที่เหมาะสมกับปัญหาได้  

- **CLO7 (C)**  
  ประเมินและเปรียบเทียบทางเลือกสถาปัตยกรรม โดยพิจารณา Trade-offs ด้าน Quality Attributes, Risk และ Cost และสามารถสะท้อนผลกระทบต่อ Stakeholders ได้อย่างมีเหตุผล  

---

### ด้านทักษะปฏิบัติ (Practical Skills – P)

- **CLO8 (P)**  
  สร้างเอกสาร Software Architecture Document / Architecture Decision Record (ADR) ที่ครบถ้วน ประกอบด้วยสถาปัตยกรรมภาพรวม แผนภาพ C4 คุณลักษณะคุณภาพ และ Design Rationale  

- **CLO9 (P)**  
  ใช้เครื่องมือสมัยใหม่ในการสร้างและจัดการแบบสถาปัตยกรรม เช่น Draw.io, Lucidchart, PlantUML, Structurizr หรือ Cloud Architecture Diagram Tools ได้อย่างมีประสิทธิภาพ  

- **CLO10 (P)**  
  พัฒนา Prototype หรือ Proof-of-Concept ขนาดเล็ก (เช่น บริการ REST API, Microservice, Event Consumer) เพื่อทดสอบแนวคิดสถาปัตยกรรมสำหรับ Web / Cloud / Mobile ได้ในระดับพื้นฐาน  

---

### ด้านทักษะความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ (Interpersonal – I)

- **CLO11 (I)**  
  ทำงานร่วมกันเป็นทีมสถาปัตยกรรมซอฟต์แวร์ (เช่น สถาปนิก, Tech Lead, Dev, Ops) โดยแบ่งบทบาทหน้าที่ รับผิดชอบงาน และจัดการความขัดแย้งในทีมได้อย่างเหมาะสม  

- **CLO12 (I)**  
  สื่อสารและนำเสนอแบบสถาปัตยกรรมซอฟต์แวร์ต่อ Stakeholders (เช่น ผู้บริหาร ทีมพัฒนา ฝ่ายปฏิบัติการ) ได้อย่างชัดเจน ทั้งในรูปแบบเอกสาร แผนภาพ และการนำเสนอปากเปล่า  

---

### ด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสารและการใช้เทคโนโลยีสารสนเทศ (A)

- **CLO13 (A)**  
  วิเคราะห์ข้อมูลเชิงปริมาณที่เกี่ยวข้องกับสถาปัตยกรรม เช่น Load, Throughput, Response Time, Utilization เพื่อประเมินความเพียงพอของสถาปัตยกรรมและวางแผนคร่าว ๆ ด้าน Capacity ได้  

- **CLO14 (A)**  
  ใช้เครื่องมือ DevOps พื้นฐาน (เช่น Git, CI/CD Pipeline, Logging/Monitoring Dashboard) เพื่อเชื่อมโยงสถาปัตยกรรมกับการ Deployment และการปฏิบัติการระบบจริงในระดับเบื้องต้นได้  
