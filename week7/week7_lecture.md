# ENGSE207 สถาปัตยกรรมซอฟต์แวร์ (Software Architecture)
## เอกสารประกอบการสอน สัปดาห์ที่ 7

---

## หน่วยเรียน: สถาปัตยกรรมสำหรับ Cloud & Containerization

### ข้อมูลทั่วไป
- **จำนวนชั่วโมง:** 5 ชั่วโมง (บรรยาย 2 ชม. + ปฏิบัติ 3 ชม.)
- **ระดับชั้น:** ปีที่ 2 วิศวกรรมซอฟต์แวร์
- **CLO ที่เกี่ยวข้อง:** CLO2, CLO3, CLO4, CLO6, CLO13, CLO14
- **ผู้สอน:** นายธนิต เกตุแก้ว

---

## ชื่อบทเรียน

### 1.1 Cloud Computing Fundamentals และ Service Models (IaaS/PaaS/SaaS)
### 1.2 The 12-Factor App: หลักการออกแบบ Cloud-Native Applications
### 1.3 Containers, Orchestration และ Basic Deployment Topologies

---

## วัตถุประสงค์การสอน

### 1.1 Cloud Computing Fundamentals และ Service Models

**1.1.1** นักศึกษาสามารถอธิบายความหมายและคุณลักษณะสำคัญ 5 ประการของ Cloud Computing ตามมาตรฐาน NIST ได้

**1.1.2** นักศึกษาสามารถแยกแยะและเปรียบเทียบ Cloud Service Models ทั้ง 3 แบบ (IaaS, PaaS, SaaS) พร้อมยกตัวอย่างผู้ให้บริการจริงได้

**1.1.3** นักศึกษาสามารถอธิบาย Cloud Deployment Models (Public, Private, Hybrid) และเลือกใช้ให้เหมาะสมกับบริบทได้

### 1.2 The 12-Factor App

**1.2.1** นักศึกษาสามารถอธิบายหลักการ 12-Factor App และความสำคัญในการออกแบบ Cloud-Native Applications ได้

**1.2.2** นักศึกษาสามารถระบุปัญหาจากการไม่ปฏิบัติตามหลัก 12-Factor และเสนอแนวทางแก้ไขได้

### 1.3 Containers, Orchestration และ Deployment Topologies

**1.3.1** นักศึกษาสามารถอธิบายแนวคิด Containerization และความแตกต่างระหว่าง Containers กับ Virtual Machines ได้

**1.3.2** นักศึกษาสามารถอธิบายบทบาทของ Docker และ Kubernetes ในระดับ Overview ได้

**1.3.3** นักศึกษาสามารถออกแบบ Basic Deployment Topologies (Single Server, Auto-Scaling, Managed DB) สำหรับระบบบน Cloud ได้

---

## สรุป CLO ที่เกี่ยวข้อง

### 🎯 CLO2 (Knowledge - K)
**อธิบาย Architectural Styles และ Patterns พื้นฐาน** รวมถึง Trade-offs และ Use Cases ที่เหมาะสมของแต่ละ Style ได้

> **ความเชื่อมโยง:** สัปดาห์นี้เรียนรู้ Cloud-Native Architectural Patterns เช่น Microservices on Cloud, Serverless Architecture ซึ่งเป็น Styles ที่ออกแบบมาเพื่อทำงานบน Cloud โดยเฉพาะ

### 🎯 CLO3 (Knowledge - K)
**อธิบายคุณลักษณะคุณภาพของซอฟต์แวร์ (Quality Attributes)** เช่น Performance, Scalability, Availability, Security, Modifiability ได้อย่างเป็นระบบ

> **ความเชื่อมโยง:** Cloud Architecture ส่งผลโดยตรงต่อ Quality Attributes โดยเฉพาะ Scalability (Auto-scaling), Availability (Multi-AZ), และ Performance (CDN, Caching)

### 🎯 CLO4 (Knowledge - K)
**อธิบายแนวคิดพื้นฐานของสถาปัตยกรรมสำหรับเทคโนโลยีสมัยใหม่** เช่น Cloud Computing, Containerization, Serverless ได้

> **ความเชื่อมโยง:** นี่คือ CLO หลักของสัปดาห์นี้ ครอบคลุม Cloud Fundamentals, Containers, และ Modern Deployment Patterns

### 🎯 CLO6 (Cognitive - C)
**ออกแบบสถาปัตยกรรมระดับสูงของระบบซอฟต์แวร์** โดยใช้ C4 Model และเลือกใช้ Architectural Styles/Patterns ที่เหมาะสมได้

> **ความเชื่อมโยง:** การวาด Cloud Deployment Diagram เป็นส่วนหนึ่งของ Architecture Documentation ที่แสดง Infrastructure และ Deployment View

### 🎯 CLO13 (Analytical - A)
**วิเคราะห์ข้อมูลเชิงปริมาณที่เกี่ยวข้องกับสถาปัตยกรรม** เช่น Load, Throughput, Response Time เพื่อวางแผน Capacity ได้

> **ความเชื่อมโยง:** การประเมิน Latency/Throughput ของ Cloud Deployment และการเลือกขนาด Instance ที่เหมาะสม

### 🎯 CLO14 (Analytical - A)
**ใช้เครื่องมือ DevOps พื้นฐาน** (เช่น Git, CI/CD, Monitoring) เพื่อเชื่อมโยงสถาปัตยกรรมกับการ Deployment ได้

> **ความเชื่อมโยง:** Docker, Kubernetes และ CI/CD เป็นเครื่องมือ DevOps ที่สำคัญในการ Deploy Cloud Applications

---

## 📚 ทบทวนสัปดาห์ที่แล้ว (สัปดาห์ที่ 6)

### สรุปสั้นๆ: Architectural Design Process & ADD-Lite

ในสัปดาห์ที่ 6 เราได้เรียนรู้เกี่ยวกับ:

```
┌─────────────────────────────────────────────────────────────┐
│           Architectural Design Process                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Gather Requirements                                      │
│           ↓                                                  │
│  2. Identify Architectural Drivers                           │
│           ↓                                                  │
│  3. Design Architecture (ADD-Lite)                           │
│           ↓                                                  │
│  4. Evaluate & Compare Candidates                            │
│           ↓                                                  │
│  5. Document (ADR)                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**สิ่งที่เรียนรู้:**
1. **ADD-Lite Process** - 5 ขั้นตอนในการออกแบบสถาปัตยกรรม
2. **Candidate Architectures** - การสร้างทางเลือก 2-3 แบบและเปรียบเทียบ
3. **Architecture Decision Record (ADR)** - การบันทึกการตัดสินใจ

### 🔗 เชื่อมโยงกับสัปดาห์นี้

สัปดาห์ที่แล้วเราเรียนรู้ **"วิธีการออกแบบสถาปัตยกรรม"** 

สัปดาห์นี้เราจะเรียนรู้ **"จะ Deploy สถาปัตยกรรมที่ออกแบบไว้อย่างไร?"** บน Cloud Platform

```
สัปดาห์ที่ 6                    สัปดาห์ที่ 7
┌────────────────┐            ┌────────────────┐
│ ออกแบบ          │            │ Deploy         │
│ Architecture    │  ────────► │ บน Cloud       │
│ (ADD-Lite)      │            │ (IaaS/PaaS)    │
└────────────────┘            └────────────────┘
```

---

# ส่วนที่ 1: เนื้อหาบทเรียน (90 นาที)

---

## 1.1 Cloud Computing Fundamentals และ Service Models

### ☁️ Cloud Computing คืออะไร?

**Cloud Computing** คือ การให้บริการทรัพยากรคอมพิวเตอร์ (เช่น Servers, Storage, Databases, Networking, Software) ผ่านอินเทอร์เน็ต โดยผู้ใช้จ่ายตามการใช้งานจริง (Pay-as-you-go)

### 📋 5 Essential Characteristics ตามมาตรฐาน NIST

**NIST (National Institute of Standards and Technology)** กำหนดคุณลักษณะสำคัญ 5 ประการของ Cloud Computing:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    5 Essential Characteristics of Cloud                  │
│                         (NIST SP 800-145)                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  1. 🔄 On-demand Self-service                                            │
│     ผู้ใช้สามารถจัดสรรทรัพยากรได้เองโดยอัตโนมัติ                               │
│     ไม่ต้องติดต่อผู้ให้บริการ                                                │
│                                                                          │
│  2. 🌐 Broad Network Access                                              │
│     เข้าถึงผ่านเครือข่ายได้จากทุกที่ ทุกอุปกรณ์                                │
│     (Laptop, Mobile, Tablet)                                            │
│                                                                          │
│  3. 🏊 Resource Pooling                                                  │
│     ทรัพยากรถูกรวมกันเพื่อให้บริการหลายผู้ใช้ (Multi-tenant)                   │
│     ผู้ใช้ไม่ต้องรู้ว่าทรัพยากรอยู่ที่ไหน                                      │
│                                                                          │
│  4. ⚡ Rapid Elasticity                                                  │
│     สามารถขยาย/ลดทรัพยากรได้อย่างรวดเร็ว                                     │
│     ตามความต้องการที่เปลี่ยนแปลง                                             │
│                                                                          │
│  5. 📊 Measured Service                                                  │
│     ติดตามและวัดการใช้ทรัพยากรได้อย่างละเอียด                                 │
│     จ่ายตามการใช้งานจริง (Pay-per-use)                                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 📊 Cloud Service Models: IaaS vs PaaS vs SaaS

**"Pizza as a Service"** - เปรียบเทียบให้เข้าใจง่าย:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        Cloud Service Models                                 │
│                    "Pizza as a Service" Analogy                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   On-Premises      IaaS           PaaS           SaaS                      │
│   (ทำเองทั้งหมด)     (ซื้อวัตถุดิบ)    (ซื้อพิซซ่าสำเร็จ)   (กินที่ร้าน)            │
│                                                                             │
│  ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐            │
│  │Application│   │Application│   │Application│   │███████████│ ◄─ Managed │
│  ├───────────┤   ├───────────┤   ├───────────┤   ├───────────┤            │
│  │  Data     │   │  Data     │   │  Data     │   │███████████│            │
│  ├───────────┤   ├───────────┤   ├───────────┤   ├───────────┤            │
│  │ Runtime   │   │ Runtime   │   │███████████│   │███████████│            │
│  ├───────────┤   ├───────────┤   ├───────────┤   ├───────────┤            │
│  │Middleware │   │Middleware │   │███████████│   │███████████│            │
│  ├───────────┤   ├───────────┤   ├───────────┤   ├───────────┤            │
│  │   O/S     │   │   O/S     │   │███████████│   │███████████│            │
│  ├───────────┤   ├───────────┤   ├───────────┤   ├───────────┤            │
│  │Virtualize │   │███████████│   │███████████│   │███████████│            │
│  ├───────────┤   ├───────────┤   ├───────────┤   ├───────────┤            │
│  │  Server   │   │███████████│   │███████████│   │███████████│            │
│  ├───────────┤   ├───────────┤   ├───────────┤   ├───────────┤            │
│  │ Storage   │   │███████████│   │███████████│   │███████████│            │
│  ├───────────┤   ├───────────┤   ├───────────┤   ├───────────┤            │
│  │ Network   │   │███████████│   │███████████│   │███████████│            │
│  └───────────┘   └───────────┘   └───────────┘   └───────────┘            │
│                                                                             │
│  █ = You Manage     ███ = Provider Manages                                 │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

### 🔍 รายละเอียด Service Models

#### 1️⃣ IaaS (Infrastructure as a Service)

**คำจำกัดความ:** บริการโครงสร้างพื้นฐาน เช่น Virtual Machines, Storage, Network

```
┌─────────────────────────────────────────────────────────────┐
│                    IaaS - คุณจัดการ                          │
├─────────────────────────────────────────────────────────────┤
│  ✅ Applications    - คุณติดตั้งและจัดการ                      │
│  ✅ Data           - คุณจัดการ                               │
│  ✅ Runtime        - คุณติดตั้ง (Node.js, Python, Java)       │
│  ✅ Middleware     - คุณติดตั้ง (Web Server, Message Queue)   │
│  ✅ O/S            - คุณเลือกและอัพเดต (Ubuntu, Windows)      │
├─────────────────────────────────────────────────────────────┤
│                    IaaS - Provider จัดการ                    │
├─────────────────────────────────────────────────────────────┤
│  ☁️ Virtualization - Provider จัดการ                        │
│  ☁️ Servers        - Provider จัดการ                        │
│  ☁️ Storage        - Provider จัดการ                        │
│  ☁️ Networking     - Provider จัดการ                        │
└─────────────────────────────────────────────────────────────┘
```

**ตัวอย่างผู้ให้บริการ:**
| Provider | Service Name | ราคาเริ่มต้น |
|----------|-------------|-------------|
| AWS | EC2 | ~$0.01/hr (t3.micro) |
| Azure | Virtual Machines | ~$0.01/hr |
| GCP | Compute Engine | ~$0.01/hr |
| DigitalOcean | Droplets | $4/month |

**Use Cases:**
- ต้องการควบคุมเต็มที่ (Custom configurations)
- Legacy applications ที่ต้องการ specific OS
- High-performance computing
- การทดสอบและพัฒนา

#### 2️⃣ PaaS (Platform as a Service)

**คำจำกัดความ:** บริการ Platform สำหรับพัฒนาและ Deploy แอปพลิเคชัน โดยไม่ต้องจัดการ Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│                    PaaS - คุณจัดการ                          │
├─────────────────────────────────────────────────────────────┤
│  ✅ Applications    - คุณพัฒนาและ Deploy                      │
│  ✅ Data           - คุณจัดการข้อมูล                          │
├─────────────────────────────────────────────────────────────┤
│                    PaaS - Provider จัดการ                    │
├─────────────────────────────────────────────────────────────┤
│  ☁️ Runtime        - Provider จัดการ (Node.js, Python)       │
│  ☁️ Middleware     - Provider จัดการ                        │
│  ☁️ O/S            - Provider จัดการ                        │
│  ☁️ Virtualization - Provider จัดการ                        │
│  ☁️ Servers        - Provider จัดการ                        │
│  ☁️ Storage        - Provider จัดการ                        │
│  ☁️ Networking     - Provider จัดการ                        │
└─────────────────────────────────────────────────────────────┘
```

**ตัวอย่างผู้ให้บริการ:**
| Provider | Service Name | จุดเด่น |
|----------|-------------|--------|
| AWS | Elastic Beanstalk, Lambda | Enterprise-grade |
| Azure | App Service | .NET integration |
| GCP | App Engine, Cloud Run | Auto-scaling |
| Heroku | Heroku | ง่ายสุด, เหมาะ Startups |
| Vercel | Vercel | Frontend/Next.js |
| Railway | Railway | Modern, ราคาถูก |

**Use Cases:**
- พัฒนา Web Applications อย่างรวดเร็ว
- ไม่ต้องการจัดการ Infrastructure
- Startups ที่ต้องการ Time-to-market เร็ว
- CI/CD และ DevOps workflows

#### 3️⃣ SaaS (Software as a Service)

**คำจำกัดความ:** บริการซอฟต์แวร์สำเร็จรูปที่ใช้งานผ่าน Web Browser

```
┌─────────────────────────────────────────────────────────────┐
│                    SaaS - คุณจัดการ                          │
├─────────────────────────────────────────────────────────────┤
│  ✅ ใช้งาน Application ผ่าน Browser                          │
│  ✅ จัดการข้อมูลของตัวเอง (บางส่วน)                            │
├─────────────────────────────────────────────────────────────┤
│                    SaaS - Provider จัดการทุกอย่าง             │
├─────────────────────────────────────────────────────────────┤
│  ☁️ Application, Data, Runtime, Middleware                   │
│  ☁️ O/S, Virtualization, Servers, Storage, Networking        │
└─────────────────────────────────────────────────────────────┘
```

**ตัวอย่างผู้ให้บริการ:**
| หมวด | ผู้ให้บริการ |
|------|------------|
| **Productivity** | Google Workspace, Microsoft 365 |
| **CRM** | Salesforce, HubSpot |
| **Communication** | Slack, Zoom, Teams, LINE |
| **Project Management** | Jira, Trello, Notion |
| **ในไทย** | PDPA Pro, FlowAccount |

### 📊 เปรียบเทียบ Service Models

| ด้าน | IaaS | PaaS | SaaS |
|------|------|------|------|
| **Control** | สูงสุด | ปานกลาง | ต่ำสุด |
| **Flexibility** | สูงสุด | ปานกลาง | ต่ำสุด |
| **Management Effort** | สูงสุด | ปานกลาง | ต่ำสุด |
| **Cost Predictability** | ต่ำ | ปานกลาง | สูง |
| **Time-to-Deploy** | ช้า | เร็ว | ทันที |
| **Customization** | ไม่จำกัด | จำกัด | น้อยมาก |

### ☁️ Cloud Deployment Models

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        Cloud Deployment Models                              │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │   Public Cloud   │  │  Private Cloud   │  │   Hybrid Cloud   │          │
│  │                  │  │                  │  │                  │          │
│  │  ┌────────────┐  │  │  ┌────────────┐  │  │ ┌─────┐ ┌─────┐  │          │
│  │  │ ☁️☁️☁️☁️   │  │  │  │ 🏢         │  │  │ │ ☁️  │ │ 🏢  │  │          │
│  │  │ Shared     │  │  │  │ Dedicated  │  │  │ │     │═│     │  │          │
│  │  │ Resources  │  │  │  │ Resources  │  │  │ └─────┘ └─────┘  │          │
│  │  └────────────┘  │  │  └────────────┘  │  │                  │          │
│  │                  │  │                  │  │  Connected       │          │
│  │  AWS, Azure, GCP │  │  On-premises     │  │  Public+Private  │          │
│  │  DigitalOcean    │  │  VMware, OpenStack│ │                  │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                             │
│  ✅ Cost-effective      ✅ Security & Control  ✅ Best of Both Worlds       │
│  ✅ Scalability         ✅ Compliance          ✅ Flexibility               │
│  ❌ Less Control        ❌ High Cost           ❌ Complexity                │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

### 🌏 ตัวอย่างการใช้งานจริงในประเทศไทย

```
┌─────────────────────────────────────────────────────────────────────────┐
│              ตัวอย่างการใช้ Cloud ในประเทศไทย                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  🏥 หมอพร้อม (MorPrompt)                                                 │
│     └─► AWS Thailand Region                                             │
│     └─► Auto-scaling รับมือช่วงวัคซีน COVID-19                            │
│     └─► รองรับผู้ใช้หลายล้านคนพร้อมกัน                                      │
│                                                                          │
│  🛒 Shopee Thailand                                                      │
│     └─► Multi-cloud (AWS + GCP)                                         │
│     └─► รองรับ 11.11, 12.12 Flash Sales                                  │
│     └─► CDN กระจายทั่วเอเชีย                                               │
│                                                                          │
│  🏦 SCB Easy / K PLUS                                                    │
│     └─► Hybrid Cloud (Private + AWS)                                    │
│     └─► ข้อมูลสำคัญอยู่ Private Cloud (Compliance)                        │
│     └─► Non-sensitive workloads บน Public Cloud                         │
│                                                                          │
│  💬 LINE Thailand                                                        │
│     └─► Private Data Centers + Cloud                                    │
│     └─► รองรับผู้ใช้ 50+ ล้านคน                                            │
│     └─► Real-time messaging infrastructure                              │
│                                                                          │
│  🚗 Grab Thailand                                                        │
│     └─► AWS เป็นหลัก                                                      │
│     └─► Real-time location tracking                                     │
│     └─► Machine Learning for matching                                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 1.2 The 12-Factor App: หลักการออกแบบ Cloud-Native Applications

### 📋 12-Factor App คืออะไร?

**12-Factor App** คือชุดหลักการ 12 ข้อสำหรับการสร้างแอปพลิเคชันที่:
- ใช้งานบน Cloud ได้อย่างมีประสิทธิภาพ
- Scale ได้ง่าย
- Deploy ได้อัตโนมัติ
- Portable ข้าม Cloud Providers

> **ที่มา:** พัฒนาโดยทีม Heroku ในปี 2011 จากประสบการณ์การ Deploy แอปพลิเคชันหลายล้าน Apps
> **Reference:** https://12factor.net

### 🔢 หลักการ 12 ข้อ (Overview)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        The 12-Factor App Methodology                         │
│                    https://12factor.net (Adam Wiggins, 2011)                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ 1. CODEBASE        │ One codebase, many deploys                     │   │
│   │                    │ หนึ่ง Git repo = หนึ่ง App                        │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 2. DEPENDENCIES    │ Explicitly declare & isolate                   │   │
│   │                    │ ใช้ package.json, requirements.txt             │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 3. CONFIG          │ Store config in environment                    │   │
│   │                    │ ใช้ ENV variables ไม่ hardcode ⭐               │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 4. BACKING SERVICES│ Treat as attached resources                    │   │
│   │                    │ DB, Queue, Cache เปลี่ยนได้โดยไม่แก้ Code         │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 5. BUILD, RELEASE, │ Strictly separate stages                       │   │
│   │    RUN             │ Build → Release → Run แยกชัดเจน                 │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 6. PROCESSES       │ Execute as stateless processes                 │   │
│   │                    │ ไม่เก็บ State ใน Memory/Disk ของ App ⭐          │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 7. PORT BINDING    │ Export services via port binding               │   │
│   │                    │ App ฟังที่ Port และ serve HTTP เอง               │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 8. CONCURRENCY     │ Scale out via the process model                │   │
│   │                    │ Scale โดยเพิ่มจำนวน Process                      │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 9. DISPOSABILITY   │ Fast startup & graceful shutdown               │   │
│   │                    │ เริ่ม/หยุดได้เร็ว รองรับ Auto-scaling ⭐          │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 10. DEV/PROD PARITY│ Keep dev, staging, prod similar                │   │
│   │                    │ Environment เหมือนกันมากที่สุด ⭐                 │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 11. LOGS           │ Treat logs as event streams                    │   │
│   │                    │ เขียน Log ไป stdout ไม่เขียนไฟล์ ⭐               │   │
│   ├────────────────────┼────────────────────────────────────────────────┤   │
│   │ 12. ADMIN PROCESSES│ Run admin/management tasks as one-off          │   │
│   │                    │ งาน Admin รันเป็น one-time command              │   │
│   └────────────────────┴────────────────────────────────────────────────┘   │
│                                                                              │
│   ⭐ = Factors ที่สำคัญที่สุดสำหรับ Cloud-Native Apps                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🎯 5 Factors ที่สำคัญที่สุดสำหรับนักศึกษา (Deep Dive)

#### Factor 3: Config - Store config in the environment

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Factor 3: CONFIG                                      │
│                    เก็บ Configuration ใน Environment Variables           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ❌ BAD - Hardcoded Config                                               │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  // config.js                                                    │    │
│  │  const config = {                                                │    │
│  │    database: "mongodb://localhost:27017/myapp",  // ❌ Hardcoded │    │
│  │    apiKey: "sk-12345-secret-key",                // ❌ Secret!   │    │
│  │    port: 3000                                    // ❌ Fixed     │    │
│  │  };                                                              │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ปัญหา:                                                                   │
│  • Secret keys อยู่ใน Git history ตลอดไป                                  │
│  • ต้องแก้ code เมื่อเปลี่ยน environment                                    │
│  • ไม่สามารถ deploy codebase เดียวกันหลาย environments                     │
│                                                                          │
│  ✅ GOOD - Environment Variables                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  // config.js                                                    │    │
│  │  const config = {                                                │    │
│  │    database: process.env.DATABASE_URL,           // ✅ From ENV  │    │
│  │    apiKey: process.env.API_KEY,                  // ✅ Secure    │    │
│  │    port: process.env.PORT || 3000                // ✅ Flexible  │    │
│  │  };                                                              │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  # .env file (ไม่ commit ไป Git! ใส่ใน .gitignore)                 │    │
│  │  DATABASE_URL=mongodb://prod-server:27017/myapp                  │    │
│  │  API_KEY=sk-prod-secret-key                                      │    │
│  │  PORT=8080                                                       │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ข้อดี:                                                                   │
│  • Secrets ไม่อยู่ใน code                                                 │
│  • Deploy codebase เดียวกันได้หลาย environments                          │
│  • เปลี่ยน config โดยไม่ต้อง rebuild                                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Factor 6: Processes - Stateless Applications

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Factor 6: PROCESSES                                   │
│                    แอปพลิเคชันต้อง Stateless                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ❌ STATEFUL - เก็บ Session ใน Memory                                    │
│                                                                          │
│     User A ─────► [App Instance 1] ◄─── Session อยู่ที่นี่               │
│                        │                                                 │
│       (Load Balancer routes to different instance)                      │
│                        ↓                                                 │
│     User A ─────► [App Instance 2] ◄─── ❌ Session หาย!                  │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  // ❌ Bad - Session in memory                                   │    │
│  │  const sessions = {};  // หายเมื่อ restart หรือ scale           │    │
│  │  app.post('/login', (req, res) => {                              │    │
│  │    sessions[userId] = { loggedIn: true, cart: [] };              │    │
│  │  });                                                             │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ✅ STATELESS - เก็บ Session ใน External Store                           │
│                                                                          │
│     User A ─────► [App Instance 1] ────┐                                │
│                                         ├───► [Redis] ◄─── Session      │
│     User A ─────► [App Instance 2] ────┘         ✅ ทุก Instance เข้าถึงได้ │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  // ✅ Good - Session in Redis                                   │    │
│  │  const session = require('express-session');                     │    │
│  │  const RedisStore = require('connect-redis').default;            │    │
│  │  app.use(session({                                               │    │
│  │    store: new RedisStore({ client: redisClient }),               │    │
│  │    secret: process.env.SESSION_SECRET                            │    │
│  │  }));                                                            │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  External Stores สำหรับ State:                                           │
│  • Redis - Sessions, Caching                                            │
│  • Database - User data, Application state                              │
│  • S3/Cloud Storage - Files, Images                                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Factor 9: Disposability - Fast Startup & Graceful Shutdown

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Factor 9: DISPOSABILITY                               │
│                    เริ่มต้นเร็ว หยุดอย่างสง่างาม                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ทำไมสำคัญ?                                                               │
│  • Auto-scaling ต้องเพิ่ม/ลด instances เร็ว                               │
│  • Rolling deployments ต้องเริ่ม instance ใหม่เร็ว                        │
│  • Crash recovery ต้อง restart ได้ทันที                                   │
│  • Kubernetes kills pods ที่ไม่ healthy                                  │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │              Lifecycle of a Cloud-Native App                  │       │
│  │                                                               │       │
│  │   ┌─────────┐    ┌─────────┐    ┌─────────┐                  │       │
│  │   │ Startup │───►│ Running │───►│Shutdown │                  │       │
│  │   │  < 10s  │    │  ....   │    │ < 30s   │                  │       │
│  │   └─────────┘    └─────────┘    └─────────┘                  │       │
│  │       │              │              │                         │       │
│  │   - Load config     SIGTERM     - Stop accepting requests    │       │
│  │   - Connect DB      received    - Finish current requests    │       │
│  │   - Ready to serve              - Close DB connections       │       │
│  │                                  - Exit with code 0          │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  // Graceful shutdown example (Node.js)                          │    │
│  │  process.on('SIGTERM', async () => {                             │    │
│  │    console.log('SIGTERM received, shutting down gracefully');    │    │
│  │                                                                  │    │
│  │    // 1. Stop accepting new requests                             │    │
│  │    server.close(() => {                                          │    │
│  │      console.log('HTTP server closed');                          │    │
│  │                                                                  │    │
│  │      // 2. Close database connections                            │    │
│  │      mongoose.connection.close(false, () => {                    │    │
│  │        console.log('MongoDB connection closed');                 │    │
│  │        process.exit(0);  // 3. Exit cleanly                      │    │
│  │      });                                                         │    │
│  │    });                                                           │    │
│  │                                                                  │    │
│  │    // Force exit after 30 seconds                                │    │
│  │    setTimeout(() => process.exit(1), 30000);                     │    │
│  │  });                                                             │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Factor 10: Dev/Prod Parity - Keep Environments Similar

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Factor 10: DEV/PROD PARITY                            │
│                    ทำให้ Development และ Production เหมือนกัน             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  3 Gaps ที่ต้องลด:                                                       │
│                                                                          │
│  1. TIME GAP (ระยะเวลา)                                                  │
│     ❌ Bad:  Code เขียนเสร็จ → Deploy หลังจากนั้น 2 สัปดาห์                 │
│     ✅ Good: Code เขียนเสร็จ → Deploy ภายในวันเดียว (CI/CD)                │
│                                                                          │
│  2. PERSONNEL GAP (คนทำ)                                                 │
│     ❌ Bad:  Dev เขียน code, Ops เป็นคน deploy                           │
│     ✅ Good: Dev เขียน code และ deploy เอง (DevOps culture)              │
│                                                                          │
│  3. TOOLS GAP (เครื่องมือ)                                                │
│     ❌ Bad:  Dev ใช้ SQLite, Prod ใช้ PostgreSQL                         │
│     ✅ Good: Dev และ Prod ใช้ PostgreSQL เหมือนกัน                        │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │                    Environment Parity Example                   │     │
│  │                                                                 │     │
│  │   Development              Staging              Production     │     │
│  │  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐ │     │
│  │  │ Docker       │      │ Docker       │      │ Docker       │ │     │
│  │  │ PostgreSQL 15│      │ PostgreSQL 15│      │ PostgreSQL 15│ │     │
│  │  │ Redis 7      │      │ Redis 7      │      │ Redis 7      │ │     │
│  │  │ Node.js 18   │      │ Node.js 18   │      │ Node.js 18   │ │     │
│  │  └──────────────┘      └──────────────┘      └──────────────┘ │     │
│  │         ✅                    ✅                    ✅          │     │
│  │      Same Stack            Same Stack           Same Stack    │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  เครื่องมือที่ช่วย:                                                        │
│  • Docker & Docker Compose - ทำให้ทุก environment เหมือนกัน               │
│  • Infrastructure as Code (Terraform) - กำหนด infra เป็น code            │
│  • CI/CD Pipelines - อัตโนมัติการ deploy                                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Factor 11: Logs - Treat logs as event streams

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Factor 11: LOGS                                       │
│                    Logs เป็น Event Streams                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ❌ BAD - เขียน Log ลงไฟล์                                               │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  // ❌ Bad - Writing to file                                     │    │
│  │  const fs = require('fs');                                       │    │
│  │  fs.appendFileSync('/var/log/app.log', message);                 │    │
│  │                                                                  │    │
│  │  // ปัญหา:                                                       │    │
│  │  // - ไฟล์เต็ม disk                                               │    │
│  │  // - ต้องจัดการ log rotation                                     │    │
│  │  // - ไม่ work กับ containers (ไฟล์หายเมื่อ restart)               │    │
│  │  // - ไม่สามารถ aggregate logs จากหลาย instances                  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ✅ GOOD - เขียน Log ไป stdout                                           │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  // ✅ Good - Write to stdout (structured JSON)                  │    │
│  │  const log = (level, message, data = {}) => {                    │    │
│  │    console.log(JSON.stringify({                                  │    │
│  │      timestamp: new Date().toISOString(),                        │    │
│  │      level,                                                      │    │
│  │      message,                                                    │    │
│  │      ...data                                                     │    │
│  │    }));                                                          │    │
│  │  };                                                              │    │
│  │                                                                  │    │
│  │  // Usage                                                        │    │
│  │  log('info', 'User logged in', { userId: 123, ip: '1.2.3.4' }); │    │
│  │                                                                  │    │
│  │  // Output:                                                      │    │
│  │  // {"timestamp":"2024-01-15T10:30:00Z","level":"info",          │    │
│  │  //  "message":"User logged in","userId":123,"ip":"1.2.3.4"}    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  Log Aggregation Flow:                                                   │
│                                                                          │
│  ┌─────┐   stdout    ┌─────────────┐    ┌─────────────────────┐        │
│  │ App │ ──────────► │ Docker/K8s  │───►│   Log Aggregator    │        │
│  └─────┘             │ Log Driver  │    │  ┌───────────────┐  │        │
│                      └─────────────┘    │  │ CloudWatch    │  │        │
│  ┌─────┐   stdout                       │  │ Datadog       │  │        │
│  │ App │ ───────────────────────────────►  │ ELK Stack     │  │        │
│  └─────┘                                │  │ Loki+Grafana  │  │        │
│                                          │  └───────────────┘  │        │
│                                          └─────────────────────┘        │
│                                                 │                        │
│                                                 ▼                        │
│                                          ┌─────────────┐                │
│                                          │  Dashboard  │                │
│                                          │  Alerting   │                │
│                                          │  Search     │                │
│                                          └─────────────┘                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 🆚 เปรียบเทียบ: Traditional vs 12-Factor App

| ด้าน | Traditional App | 12-Factor App |
|------|-----------------|---------------|
| **Config** | Hardcoded หรือ config files | Environment variables |
| **State** | เก็บใน memory/disk | Stateless, ใช้ external stores |
| **Logs** | เขียนลงไฟล์ | stdout stream |
| **Scaling** | Scale up (เครื่องใหญ่ขึ้น) | Scale out (เพิ่ม instances) |
| **Deploy** | Manual, มี downtime | Zero-downtime, automated |
| **Dependencies** | Global install | Isolated per app |
| **Startup** | ช้า (นาที) | เร็ว (วินาที) |

---

## 1.3 Containers, Orchestration และ Basic Deployment Topologies

### 📦 Containerization คืออะไร?

**Container** คือ เทคโนโลยีที่ทำให้แอปพลิเคชันและ dependencies ทั้งหมดถูก "บรรจุ" ไว้ในหน่วยเดียว ที่สามารถรันได้เหมือนกันทุก Environment

> **"It works on my machine" → "It works in a container"**

### 🆚 Containers vs Virtual Machines

```
┌────────────────────────────────────────────────────────────────────────────┐
│              Virtual Machines vs Containers                                 │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│     VIRTUAL MACHINES                      CONTAINERS                        │
│                                                                             │
│  ┌─────────┬─────────┬─────────┐    ┌─────────┬─────────┬─────────┐       │
│  │  App A  │  App B  │  App C  │    │  App A  │  App B  │  App C  │       │
│  ├─────────┼─────────┼─────────┤    ├─────────┼─────────┼─────────┤       │
│  │ Bins/   │ Bins/   │ Bins/   │    │ Bins/   │ Bins/   │ Bins/   │       │
│  │ Libs    │ Libs    │ Libs    │    │ Libs    │ Libs    │ Libs    │       │
│  ├─────────┼─────────┼─────────┤    └─────────┴─────────┴─────────┘       │
│  │Guest OS │Guest OS │Guest OS │              │                            │
│  │(Ubuntu) │(CentOS) │(Windows)│    ┌─────────┴─────────────────┐         │
│  │ ~1GB    │ ~1GB    │ ~4GB    │    │    Container Runtime      │         │
│  └─────────┴─────────┴─────────┘    │    (Docker Engine)        │         │
│              │                       │         ~100MB            │         │
│  ┌───────────┴───────────────┐      └───────────────────────────┘         │
│  │       Hypervisor          │                  │                          │
│  │   (VMware, VirtualBox)    │      ┌───────────┴───────────────┐         │
│  └───────────────────────────┘      │       Host OS             │         │
│              │                       │      (Linux)              │         │
│  ┌───────────┴───────────────┐      └───────────────────────────┘         │
│  │       Host OS             │                  │                          │
│  └───────────────────────────┘      ┌───────────┴───────────────┐         │
│              │                       │    Infrastructure         │         │
│  ┌───────────┴───────────────┐      └───────────────────────────┘         │
│  │    Infrastructure         │                                             │
│  └───────────────────────────┘                                             │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

### 📊 เปรียบเทียบ VMs vs Containers

| ด้าน | Virtual Machines | Containers |
|------|------------------|------------|
| **ขนาด** | GB (รวม Guest OS) | MB (แค่ App + Libs) |
| **Start time** | นาที | วินาที |
| **Performance** | Overhead จาก Hypervisor | Near-native |
| **Isolation** | Strong (แยก OS) | Process-level |
| **Density** | 10s per host | 100s per host |
| **Portability** | พอใช้ได้ | สูงมาก |
| **Use Case** | Different OS, Legacy apps | Microservices, Cloud-native |

### 🐳 Docker Overview

**Docker** คือ Container Platform ที่ได้รับความนิยมมากที่สุด

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Docker Architecture                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Developer                                                              │
│       │                                                                  │
│       ▼                                                                  │
│  ┌─────────────┐                                                        │
│  │ Dockerfile  │  ◄─── คำสั่งในการสร้าง Image (Recipe)                    │
│  └──────┬──────┘                                                        │
│         │ docker build -t myapp:1.0 .                                    │
│         ▼                                                                │
│  ┌─────────────┐      ┌─────────────────────────────────┐               │
│  │   Image     │ ────►│      Docker Registry            │               │
│  │ (Blueprint) │ push │  (Docker Hub, ECR, GCR, ACR)    │               │
│  └──────┬──────┘      └─────────────────────────────────┘               │
│         │ docker run -p 3000:3000 myapp:1.0                              │
│         ▼                                                                │
│  ┌─────────────┐                                                        │
│  │ Container   │  ◄─── Running instance ของ Image                       │
│  │ (Instance)  │       (สร้างได้หลาย containers จาก 1 image)              │
│  └─────────────┘                                                        │
│                                                                          │
│  Key Concepts:                                                           │
│  • Image = Template/Blueprint (read-only)                                │
│  • Container = Running instance (read-write layer)                       │
│  • Dockerfile = Instructions to build image                              │
│  • Registry = Storage for images                                         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Dockerfile ตัวอย่าง (Node.js App)

```dockerfile
# Dockerfile สำหรับ Node.js Application
# ใช้ Node.js 18 บน Alpine Linux (image เล็ก)
FROM node:18-alpine

# ตั้ง working directory ใน container
WORKDIR /app

# Copy package files ก่อน (สำหรับ caching)
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --only=production

# Copy source code
COPY . .

# Document ว่า app ฟังที่ port อะไร
EXPOSE 3000

# คำสั่งเริ่มต้น app
CMD ["node", "server.js"]
```

#### Docker Commands พื้นฐาน

```bash
# Build image จาก Dockerfile
docker build -t myapp:1.0 .

# Run container จาก image
docker run -d -p 3000:3000 --name myapp myapp:1.0

# ดู containers ที่กำลังรัน
docker ps

# ดู logs
docker logs myapp

# หยุด container
docker stop myapp

# Push image ไป registry
docker push myregistry/myapp:1.0
```

### ☸️ Kubernetes (K8s) Overview

**Kubernetes** คือ Container Orchestration Platform สำหรับ:
- จัดการ Containers จำนวนมากโดยอัตโนมัติ
- Auto-scaling ตาม load
- Load balancing
- Self-healing (restart failed containers)
- Rolling updates (zero-downtime deployments)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Kubernetes Architecture (Simplified)                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                        KUBERNETES CLUSTER                            │   │
│   │                                                                      │   │
│   │  ┌──────────────────────────────────────────────────────────────┐   │   │
│   │  │                     Control Plane (Master)                    │   │   │
│   │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐    │   │   │
│   │  │  │API Server│ │Scheduler │ │Controller│ │    etcd      │    │   │   │
│   │  │  │ (kubectl)│ │ (จัดวาง   │ │ Manager  │ │ (Key-Value   │    │   │   │
│   │  │  │          │ │  Pods)   │ │ (ดูแล    │ │  Database)   │    │   │   │
│   │  │  │          │ │          │ │  state)  │ │              │    │   │   │
│   │  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘    │   │   │
│   │  └──────────────────────────────────────────────────────────────┘   │   │
│   │                              │                                       │   │
│   │                              ▼                                       │   │
│   │  ┌────────────────────────────────────────────────────────────┐     │   │
│   │  │                     Worker Nodes                            │     │   │
│   │  │                                                             │     │   │
│   │  │   Node 1                    Node 2                          │     │   │
│   │  │  ┌───────────────────┐    ┌───────────────────┐            │     │   │
│   │  │  │ ┌─────┐ ┌─────┐   │    │ ┌─────┐ ┌─────┐   │            │     │   │
│   │  │  │ │Pod A│ │Pod B│   │    │ │Pod C│ │Pod D│   │            │     │   │
│   │  │  │ │ 🐳  │ │ 🐳  │   │    │ │ 🐳  │ │ 🐳  │   │            │     │   │
│   │  │  │ └─────┘ └─────┘   │    │ └─────┘ └─────┘   │            │     │   │
│   │  │  │   kubelet         │    │   kubelet         │            │     │   │
│   │  │  │   kube-proxy      │    │   kube-proxy      │            │     │   │
│   │  │  └───────────────────┘    └───────────────────┘            │     │   │
│   │  └────────────────────────────────────────────────────────────┘     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Key Concepts:                                                              │
│   • Pod = หน่วยย่อยสุด (1+ containers ที่ทำงานด้วยกัน)                         │
│   • Service = Load balancer + DNS ภายใน cluster                              │
│   • Deployment = จัดการ replicas ของ Pods + rolling updates                  │
│   • Ingress = External access point (รับ traffic จากภายนอก)                  │
│   • ConfigMap/Secret = จัดการ configuration                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Managed Kubernetes Services

| Provider | Service | จุดเด่น |
|----------|---------|--------|
| AWS | EKS (Elastic Kubernetes Service) | Integration กับ AWS services |
| Azure | AKS (Azure Kubernetes Service) | ฟรี control plane |
| GCP | GKE (Google Kubernetes Engine) | ดีที่สุดสำหรับ K8s (Google สร้าง K8s) |
| DigitalOcean | DOKS | ราคาถูก, ง่าย |

### 🏗️ Basic Deployment Topologies

#### Topology 1: Single Server (เรียบง่ายที่สุด)

```
┌─────────────────────────────────────────────────────────────────────────┐
│              Topology 1: SINGLE SERVER                                   │
│              เหมาะสำหรับ: Development, Small apps, Prototypes            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Users (Internet)                                                       │
│         │                                                                │
│         ▼                                                                │
│  ┌─────────────────────────────────────────────────┐                    │
│  │              Single Server (EC2/VM)             │                    │
│  │                                                 │                    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────────────┐  │                    │
│  │  │  Web    │  │  API    │  │    Database     │  │                    │
│  │  │ Server  │  │ Server  │  │   (PostgreSQL)  │  │                    │
│  │  │ (Nginx) │  │(Node.js)│  │                 │  │                    │
│  │  └─────────┘  └─────────┘  └─────────────────┘  │                    │
│  │                                                 │                    │
│  │         IP: 203.0.113.50 (Elastic IP)          │                    │
│  └─────────────────────────────────────────────────┘                    │
│                                                                          │
│  ✅ ข้อดี:                     ❌ ข้อเสีย:                                │
│  • ง่าย ราคาถูก                • Single Point of Failure                 │
│  • Deploy ง่าย                 • ไม่สามารถ Scale                          │
│  • เหมาะกับเรียนรู้             • Downtime เมื่อ update                   │
│  • Latency ต่ำ (ทุกอย่างอยู่ด้วยกัน) • ถ้า server ล่ม ทุกอย่างล่ม              │
│                                                                          │
│  💰 Cost: ~$5-20/month (t3.micro/small)                                  │
│  📊 Capacity: ~100-1000 concurrent users                                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Topology 2: Separated Database (แยก Database)

```
┌─────────────────────────────────────────────────────────────────────────┐
│              Topology 2: SEPARATED DATABASE                              │
│              เหมาะสำหรับ: Small production apps                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Users (Internet)                                                       │
│         │                                                                │
│         ▼                                                                │
│  ┌─────────────────────────────┐    ┌─────────────────────────┐         │
│  │     Application Server      │    │     Managed Database    │         │
│  │        (EC2/VM)             │    │    (RDS/Cloud SQL)      │         │
│  │  ┌─────────┐  ┌─────────┐  │    │                         │         │
│  │  │  Nginx  │  │  API    │  │    │  ┌─────────────────┐    │         │
│  │  │ (Proxy) │  │(Node.js)│  │───►│  │   PostgreSQL    │    │         │
│  │  └─────────┘  └─────────┘  │    │  │   (Managed)     │    │         │
│  └─────────────────────────────┘    │  └─────────────────┘    │         │
│                                      │                         │         │
│                                      │  Features:              │         │
│                                      │  • Auto backup (daily)  │         │
│                                      │  • Point-in-time recovery│        │
│                                      │  • Security patches     │         │
│                                      │  • Monitoring           │         │
│                                      └─────────────────────────┘         │
│                                                                          │
│  ✅ ข้อดี:                     ❌ ข้อเสีย:                                │
│  • DB มี backup/recovery       • Cost สูงขึ้น (~$15-50/mo for DB)        │
│  • แยก concern ชัดเจน          • App ยังเป็น SPOF                        │
│  • ง่ายต่อการ scale DB         • Network latency เพิ่มเล็กน้อย            │
│  • DB maintenance อัตโนมัติ                                               │
│                                                                          │
│  💰 Cost: ~$30-100/month                                                 │
│  📊 Capacity: ~500-2000 concurrent users                                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Topology 3: Load Balanced (High Availability)

```
┌─────────────────────────────────────────────────────────────────────────┐
│              Topology 3: LOAD BALANCED                                   │
│              เหมาะสำหรับ: Production apps ที่ต้องการ HA                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   Users (Internet)                                                       │
│         │                                                                │
│         ▼                                                                │
│  ┌─────────────────────────────────────────────┐                        │
│  │      Load Balancer (ALB/NLB/Cloud LB)       │                        │
│  │  • Health checks ทุก 30 วินาที                │                        │
│  │  • SSL termination                          │                        │
│  │  • Auto-remove unhealthy instances          │                        │
│  └─────────────────────┬───────────────────────┘                        │
│                        │                                                 │
│          ┌─────────────┼─────────────┐                                  │
│          ▼             ▼             ▼                                  │
│     ┌─────────┐   ┌─────────┐   ┌─────────┐                            │
│     │ App #1  │   │ App #2  │   │ App #3  │   Auto Scaling Group       │
│     │(Node.js)│   │(Node.js)│   │(Node.js)│   • Min: 2 instances       │
│     │  AZ-a   │   │  AZ-b   │   │  AZ-c   │   • Max: 10 instances      │
│     └────┬────┘   └────┬────┘   └────┬────┘   • Scale at CPU > 70%     │
│          │             │             │                                  │
│          └─────────────┼─────────────┘                                  │
│                        │                                                 │
│                        ▼                                                 │
│  ┌─────────────────────────────────────────────┐                        │
│  │        Managed Database (RDS Multi-AZ)      │                        │
│  │  ┌─────────────┐      ┌─────────────┐       │                        │
│  │  │   Primary   │ ───► │   Standby   │       │                        │
│  │  │    (AZ-a)   │ sync │    (AZ-b)   │       │                        │
│  │  └─────────────┘      └─────────────┘       │                        │
│  │  Auto failover if primary fails             │                        │
│  └─────────────────────────────────────────────┘                        │
│                                                                          │
│  ✅ ข้อดี:                     ❌ ข้อเสีย:                                │
│  • High Availability (99.9%+)  • Cost สูง (~$200-500/mo)                │
│  • Auto-scaling               • Complexity สูง                          │
│  • No single point of failure • ต้องการ DevOps skills                   │
│  • Zero-downtime deployments                                            │
│                                                                          │
│  💰 Cost: ~$200-500/month                                                │
│  📊 Capacity: ~5000-50000 concurrent users                              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Topology 4: Full Production (Enterprise Grade)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│              Topology 4: FULL PRODUCTION (Enterprise)                         │
│              เหมาะสำหรับ: Large-scale production, Microservices               │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│   Users ──► CDN (CloudFront/CloudFlare)                                      │
│             • Cache static assets (images, CSS, JS)                          │
│             • DDoS protection                                                │
│             • Global edge locations                                          │
│                       │                                                       │
│                       ▼                                                       │
│              ┌─────────────────┐                                             │
│              │  WAF (Firewall) │  • SQL injection protection                 │
│              │                 │  • XSS protection                           │
│              └────────┬────────┘  • Rate limiting                            │
│                       │                                                       │
│                       ▼                                                       │
│              ┌─────────────────┐                                             │
│              │  Load Balancer  │                                             │
│              └────────┬────────┘                                             │
│                       │                                                       │
│     ┌─────────────────┼─────────────────┐                                    │
│     ▼                 ▼                 ▼                                    │
│  ┌──────┐         ┌──────┐         ┌──────┐                                 │
│  │Web/SPA│        │ API  │         │ API  │     Auto Scaling                │
│  │(Static)│       │  #1  │         │  #2  │     Groups                      │
│  └───┬───┘        └──┬───┘         └──┬───┘                                 │
│      │               │                 │                                      │
│      │   ┌───────────┼─────────────────┤                                     │
│      │   │           │                 │                                      │
│      │   ▼           ▼                 ▼                                      │
│      │ ┌──────┐  ┌───────────┐   ┌──────────────┐                           │
│      │ │Redis │  │  Message  │   │   Database   │                           │
│      │ │Cache │  │   Queue   │   │  (RDS/Aurora)│                           │
│      │ │(ElastiCache) (SQS/    │   │  Multi-AZ    │                           │
│      │ └──────┘  │ RabbitMQ) │   │  + Read      │                           │
│      │           └─────┬─────┘   │   Replicas   │                           │
│      │                 │         └──────────────┘                           │
│      │                 ▼                                                     │
│      │         ┌──────────────┐                                             │
│      │         │   Workers    │   Background Jobs                           │
│      │         │  (Consumers) │   • Email sending                           │
│      │         └──────────────┘   • Report generation                       │
│      │                            • Data processing                          │
│      ▼                                                                       │
│  ┌──────────────┐                                                           │
│  │ S3 / Cloud   │  Static files, User uploads                               │
│  │   Storage    │                                                           │
│  └──────────────┘                                                           │
│                                                                               │
│  Additional Services:                                                         │
│  • Secrets Manager (credentials)  • CloudWatch/Datadog (Monitoring)         │
│  • Route 53 (DNS)                 • CloudTrail (Audit logs)                 │
│                                                                               │
│  💰 Cost: ~$500-5000+/month                                                   │
│  📊 Capacity: 100K+ concurrent users                                         │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 📊 Topology Comparison Matrix

| Topology | Availability | Scalability | Cost/mo | Complexity | Best For |
|----------|-------------|-------------|---------|------------|----------|
| **Single Server** | Low (~95%) | None | $5-20 | Very Low | Dev, Learning |
| **Separated DB** | Medium (~99%) | Limited | $30-100 | Low | Small Production |
| **Load Balanced** | High (~99.9%) | Horizontal | $200-500 | Medium | Medium Production |
| **Full Production** | Very High (~99.99%) | Unlimited | $500-5000+ | High | Enterprise |

### 🎯 เลือก Topology อย่างไร?

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Decision Tree: Choosing Topology                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                         Start                                            │
│                           │                                              │
│                           ▼                                              │
│            ┌──────────────────────────────┐                             │
│            │ Development/Learning only?   │                             │
│            └──────────────┬───────────────┘                             │
│                   Yes     │      No                                      │
│            ┌──────────────┴───────────────┐                             │
│            ▼                              ▼                              │
│     Single Server              ┌──────────────────────────┐             │
│                                │ < 1000 users expected?   │             │
│                                └──────────────┬───────────┘             │
│                                       Yes     │      No                  │
│                                ┌──────────────┴───────────┐             │
│                                ▼                          ▼             │
│                         Separated DB         ┌───────────────────────┐  │
│                                              │ Need 99.9%+ uptime?   │  │
│                                              └───────────┬───────────┘  │
│                                                   Yes    │     No       │
│                                              ┌───────────┴───────────┐  │
│                                              ▼                       ▼  │
│                                       Full Production        Load Balanced │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# ส่วนที่ 2: สรุปและเตรียม Lab (15 นาที)

### ✅ สรุปสิ่งที่เรียนวันนี้

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Key Takeaways - สัปดาห์ที่ 7                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  1️⃣ CLOUD SERVICE MODELS                                                │
│     • IaaS = คุณจัดการ OS ขึ้นไป (EC2, VMs)                              │
│     • PaaS = คุณจัดการแค่ App + Data (Heroku, App Engine)               │
│     • SaaS = ใช้งานอย่างเดียว (Gmail, Salesforce)                        │
│                                                                          │
│  2️⃣ 12-FACTOR APP (5 ข้อสำคัญ)                                          │
│     • Config in ENV (ไม่ hardcode)                                       │
│     • Stateless processes (ใช้ Redis สำหรับ session)                     │
│     • Disposability (start/stop เร็ว)                                    │
│     • Logs to stdout (ไม่เขียนไฟล์)                                       │
│     • Dev/Prod parity (environment เหมือนกัน)                            │
│                                                                          │
│  3️⃣ CONTAINERS                                                          │
│     • Lightweight กว่า VMs (MB vs GB)                                    │
│     • Docker = Container platform (build, ship, run)                    │
│     • Kubernetes = Orchestration (manage at scale)                      │
│                                                                          │
│  4️⃣ DEPLOYMENT TOPOLOGIES                                               │
│     • Single Server → Dev/Small ($5-20/mo)                              │
│     • Separated DB → Small Prod ($30-100/mo)                            │
│     • Load Balanced → HA Required ($200-500/mo)                         │
│     • Full Production → Enterprise ($500-5000+/mo)                      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔜 สัปดาห์หน้า: สอบกลางภาค (Midterm Examination)

### 📝 ขอบเขตการสอบ: สัปดาห์ที่ 1-7

**เนื้อหาที่ครอบคลุม:**

| สัปดาห์ | หัวข้อ | น้ำหนัก |
|--------|--------|--------|
| 1 | บทนำ Software Architecture | 10% |
| 2 | Quality Attributes & Drivers | 15% |
| 3-4 | Architectural Styles & Patterns | 25% |
| 5 | C4 Model | 20% |
| 6 | ADD-Lite & ADR | 15% |
| 7 | Cloud & Containerization | 15% |

**รูปแบบข้อสอบ:**
- **ข้อเขียนเน้นแนวคิด (~60%)** - อธิบาย, เปรียบเทียบ, วิเคราะห์
- **ปฏิบัติ (~40%)** - อ่าน/วาด Diagrams, วิเคราะห์ Scenarios

---

## 📚 แหล่งอ้างอิง (References)

### หนังสือและเอกสารหลัก

1. **NIST SP 800-145** - The NIST Definition of Cloud Computing (2011)
   - https://csrc.nist.gov/publications/detail/sp/800-145/final
   - *ใช้อ้างอิง: 5 Essential Characteristics, Service Models, Deployment Models*

2. **The Twelve-Factor App** - Adam Wiggins, Heroku (2011)
   - https://12factor.net
   - *ใช้อ้างอิง: หลักการ 12-Factor ทั้งหมด*

3. **Software Architecture in Practice** (4th Edition) - Len Bass, Paul Clements, Rick Kazman
   - Addison-Wesley, 2021
   - Chapter 17: Cloud and Distributed Computing
   - *ใช้อ้างอิง: Cloud Architecture Patterns, Quality Attributes*

4. **Cloud Native Patterns** - Cornelia Davis
   - O'Reilly Media, 2019
   - *ใช้อ้างอิง: Cloud-Native Application Design*

5. **Kubernetes: Up and Running** (3rd Edition) - Brendan Burns, Joe Beda, Kelsey Hightower
   - O'Reilly Media, 2022
   - *ใช้อ้างอิง: Kubernetes Architecture, Container Orchestration*

### เอกสาร Cloud Providers

6. **AWS Well-Architected Framework**
   - https://aws.amazon.com/architecture/well-architected/
   - *ใช้อ้างอิง: Best Practices for Cloud Architecture*

7. **Azure Architecture Center**
   - https://docs.microsoft.com/en-us/azure/architecture/
   - *ใช้อ้างอิง: Cloud Design Patterns*

8. **Google Cloud Architecture Framework**
   - https://cloud.google.com/architecture/framework
   - *ใช้อ้างอิง: Deployment Topologies*

### Documentation

9. **Docker Documentation**
   - https://docs.docker.com/
   - *ใช้อ้างอิง: Dockerfile, Container Concepts*

10. **Kubernetes Documentation**
    - https://kubernetes.io/docs/
    - *ใช้อ้างอิง: K8s Architecture, Components*

### บทความและแหล่งเรียนรู้เพิ่มเติม

11. **Martin Fowler - Microservices**
    - https://martinfowler.com/articles/microservices.html

12. **AWS Pricing Calculator**
    - https://calculator.aws/
    - *ใช้ประเมินค่าใช้จ่าย*

### วิดีโอแนะนำ

13. **"What is Cloud Computing?"** - AWS Official (YouTube)
14. **"Docker in 100 Seconds"** - Fireship (YouTube)
15. **"Kubernetes Explained"** - IBM Technology (YouTube)
16. **"The Twelve-Factor App"** - Heroku (YouTube)

---

## 📝 เตรียมตัวสำหรับ Lab (3 ชั่วโมง)

ในชั่วโมงปฏิบัติ เราจะ:

### Lab 1: Cloud Architecture Diagram (90 นาที)
- วาด Deployment Diagram สำหรับ **Task Board System**
- ใช้ Cloud Architecture Icons ใน Draw.io
- ประกอบด้วย: Web App, API Server, Database, Message Broker, Cache

### Lab 2: Deployment Topology Analysis (60 นาที)
- วิเคราะห์ Trade-offs ของแต่ละ Topology
- เลือก Topology ที่เหมาะสมตาม Requirements
- เขียน ADR สำหรับการตัดสินใจ

### Lab 3: Capacity Estimation (30 นาที)
- ประเมิน Latency/Throughput คร่าวๆ
- เลือกขนาด Resources ที่เหมาะสม
- คำนวณค่าใช้จ่ายโดยประมาณ

---

**พบกันใน Lab! 🚀**

---

*เอกสารนี้จัดทำโดย: นายธนิต เกตุแก้ว*  
*วิชา ENGSE207 สถาปัตยกรรมซอฟต์แวร์*  
*มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*  
*ปรับปรุงล่าสุด: มกราคม 2568*
