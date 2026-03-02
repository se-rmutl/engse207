# 🔐 ความเข้าใจ JWT (JSON Web Token) อย่างละเอียด
## สำหรับนักศึกษา ENGSE207 Software Architecture

---

## 📋 สารบัญ

1. [JWT คืออะไร? ทำไมต้องใช้?](#1-jwt-คืออะไร-ทำไมต้องใช้)
2. [โครงสร้าง JWT ทั้ง 3 ส่วน](#2-โครงสร้าง-jwt-ทั้ง-3-ส่วน)
3. [Algorithm ที่ใช้ Sign Token](#3-algorithm-ที่ใช้-sign-token)
4. [การทำงาน: สร้าง ส่ง และตรวจสอบ JWT](#4-การทำงาน-สร้าง-ส่ง-และตรวจสอบ-jwt)
5. [JWT ใน Microservices Architecture](#5-jwt-ใน-microservices-architecture)
6. [ข้อดี ข้อเสีย และ Security Considerations](#6-ข้อดี-ข้อเสีย-และ-security-considerations)
7. [Best Practices](#7-best-practices)
8. [ตัวอย่างโค้ด Node.js ครบวงจร](#8-ตัวอย่างโค้ด-nodejs-ครบวงจร)
9. [ฝึกทำ: JWT Debug Workshop](#9-ฝึกทำ-jwt-debug-workshop)

---

## 1. JWT คืออะไร? ทำไมต้องใช้?

### ปัญหาก่อนมี JWT: Session-Based Authentication

ก่อนจะเข้าใจ JWT ต้องเข้าใจปัญหาที่ JWT มาแก้ไขก่อน:

```
┌─────────────────────────────────────────────────────────────────────┐
│           Session-Based Authentication (แบบเก่า)                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Browser             Server               Session Store (Redis/DB) │
│      │                  │                        │                  │
│      │── POST /login ──►│                        │                  │
│      │   {user,pass}    │── สร้าง Session ───────►│                  │
│      │                  │   Session ID: "abc123" │                  │
│      │◄── Set-Cookie ───│◄── OK ─────────────────│                  │
│      │   session=abc123 │                        │                  │
│      │                  │                        │                  │
│      │── GET /tasks ───►│                        │                  │
│      │   Cookie:        │─── ตรวจสอบ Session ───►│                  │
│      │   session=abc123 │                        │── SELECT * ─────►│
│      │                  │◄── User data ──────────│                  │
│      │◄── 200 OK ───────│                        │                  │
│                                                                     │
│  ⚠️  ปัญหา:                                                          │
│  • Server ต้อง Query Session Store ทุก Request → ช้า                   │
│  • Scale ยาก: Server ต้องเชื่อมต่อ Session Store เดียวกัน                 │
│  • Session Store อาจเป็น Single Point of Failure                     │
│  • Microservices แต่ละ Service ต้องเข้าถึง Session Store เดียวกัน         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### JWT แก้ปัญหาได้อย่างไร?

```
┌──────────────────────────────────────────────────────────────────────┐
│              JWT-Based Authentication (แบบใหม่ — Stateless)           │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Browser          Auth Service        Task Service                  │
│      │                 │                   │                         │
│      │── POST /login ─►│                   │                         │
│      │                 │ jwt.sign(payload, secret)                   │
│      │◄── 200 + Token ─│                   │                         │
│      │   "eyJhbGci..." │                   │                         │
│      │                 │                   │                         │
│      │── GET /tasks ──────────────────────►│                         │
│      │   Bearer eyJhbGci...                │                         │
│      │                                     │ jwt.verify(token,secret)│
│      │                                     │ ✅ Valid! User=John,    │
│      │                                     │    Role=member          │
│      │                                     │ ไม่ต้องถาม Auth Service!  │
│      │◄── 200 OK {tasks} ──────────────────│                         │
│                                                                      │
│  ✅ ข้อดี:                                                             │
│  • Stateless: ไม่ต้อง Session Store                                    │
│  • Service ตรวจสอบ Token เองได้ (มีแค่ Secret Key)                      │
│  • Scale ง่าย: Services อิสระกัน                                        │
│  • ข้ามภาษาได้: Node.js, Python, Go ใช้ Library เดียวกัน                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### JWT คืออะไรในเชิง Technical

**JWT (JSON Web Token)** คือ Standard เปิด (RFC 7519) สำหรับส่งข้อมูลระหว่างระบบอย่างปลอดภัยในรูปแบบ JSON ที่ถูก **Sign** ด้วย Secret หรือ Public/Private Key

```
นิยามสั้นๆ:
JWT = "ใบผ่านทาง" ดิจิทัลที่ยืนยันตัวตนและสิทธิ์ของผู้ถือ

เหมือน: Passport ระหว่างประเทศ
- เจ้าหน้าที่ตรวจ Passport (Auth Service) ออกเอกสารให้
- ทุกประเทศปลายทาง (Services) ตรวจสอบเอกสารเองได้
- ไม่ต้องโทรถามประเทศต้นทางทุกครั้ง
```

---

## 2. โครงสร้าง JWT ทั้ง 3 ส่วน

### Token Format: `header.payload.signature`

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
          .
eyJzdWIiOiI1IiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4iLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNzA1ODM4NDAwLCJleHAiOjE3MDU5MjQ4MDB9
          .
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

```
┌──────────────────────────────────────────────────────────────────────┐
│                       JWT Token Anatomy                              │
├────────────────────────┬─────────────────────────────────────────────┤
│     ส่วนที่ 1: HEADER  │  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9          │
├────────────────────────┼─────────────────────────────────────────────┤
│  Decode (Base64Url) →  │  {                                          │
│                        │    "alg": "HS256",  ← Algorithm ที่ใช้ Sign    │
│                        │    "typ": "JWT"                             │
│                        │  }                                          │
├────────────────────────┼─────────────────────────────────────────────┤
│    ส่วนที่ 2: PAYLOAD  │  eyJzdWIiOiI1IiwiZW1haWwiOiJqb2huQGV...        │
├────────────────────────┼─────────────────────────────────────────────┤
│  Decode (Base64Url) →  │  {                                          │
│                        │    "sub":   "5",          ← User ID         │
│                        │    "email": "john@...",                     │
│                        │    "name":  "John",                         │
│                        │    "role":  "member",                       │
│                        │    "iat":   1705838400,  ← Issued At        │
│                        │    "exp":   1705924800   ← Expiry (24h)     │
│                        │  }                                          │
├────────────────────────┼─────────────────────────────────────────────┤
│  ส่วนที่ 3: SIGNATURE  │  SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV...         │
├────────────────────────┼─────────────────────────────────────────────┤
│  คำนวณจาก:             │  HMACSHA256(                                │
│                        │    base64Url(header) + "." +                │
│                        │    base64Url(payload),                      │
│                        │    secret_key          ← ต้องรู้ Secret!       │
│                        │  )                                          │
└────────────────────────┴─────────────────────────────────────────────┘
```

### ⚠️ ความเข้าใจผิดที่พบบ่อยมาก!

```
┌──────────────────────────────────────────────────────────────────────┐
│                    COMMON MISCONCEPTIONS                             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ❌ "JWT มีการ Encrypt ข้อมูล ทำให้อ่านไม่ได้"                              │
│                                                                      │
│  ✅ ความจริง: Header และ Payload เป็นแค่ Base64Url                      │
│              ใครก็ Decode ได้! (ลองที่ https://jwt.io)                   │
│                                                                      │
│  ตัวอย่าง: Decode Payload                                              │
│  eyJzdWIiOiI1Iiw... → {"sub":"5","email":"john@example.com",...}     │
│                                                                      │
│  💡 สรุป:                                                             │
│  • JWT ไม่ได้ "ซ่อน" ข้อมูล แต่ "รับประกัน" ว่าข้อมูลไม่ถูกแก้ไข                   │
│  • Signature คือหลักฐานว่า "ใครเป็นคนออก Token"                          │
│  • ห้ามใส่ Password, Credit Card, ข้อมูลลับใน Payload!                    │
│                                                                      │
│  ❌ "JWT ปลอดภัยจาก Man-in-the-Middle Attack"                         │
│                                                                      │
│  ✅ ความจริง: ต้องใช้ HTTPS ด้วย ไม่งั้น Token ถูก Intercept ได้              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Claims ใน Payload

JWT Payload ประกอบด้วย "Claims" หรือข้อมูลที่ระบุใน Token มี 3 ประเภท:

```
┌────────────────────────────────────────────────────────────────────┐
│                     JWT Claims Types                               │
├────────────────────┬───────────────────────────────────────────────┤
│  Registered Claims │   ชื่อ   │  ความหมาย              │  ตัวอย่าง     │
│  (มาตรฐาน RFC 7519)│────────┼────────────────────────┼─────────────┤
│                    │  iss   │  Issuer: ใครออก Token  │ "auth-svc"  │
│                    │  sub   │  Subject: User ID      │ "123"       │
│                    │  aud   │  Audience: ใช้กับใคร     │ "api-server"│
│                    │  exp   │  Expiration: หมดอายุเมื่อ │ 1705924800  │
│                    │  iat   │  Issued At: ออกเมื่อ     │ 1705838400  │
│                    │  nbf   │  Not Before: ใช้ได้หลัง   │ 1705838400  │
│                    │  jti   │  JWT ID: unique id     │ "abc-123"   │
├────────────────────┼───────────────────────────────────────────────┤
│  Public Claims     │  ชื่อที่ประกาศ/ลงทะเบียนกับ IANA                    │
│                    │  เช่น: email, name, roles                      │
├────────────────────┼───────────────────────────────────────────────┤
│  Private Claims    │  ชื่อที่ตกลงกันเองระหว่างระบบ                       │
│  (Custom)          │  เช่น: role, department, permissions           │
└────────────────────┴───────────────────────────────────────────────┘
```

---

## 3. Algorithm ที่ใช้ Sign Token

### HS256 vs RS256 — อะไรแตกต่างกัน?

```
┌──────────────────────────────────────────────────────────────────────┐
│                  Signing Algorithms Comparison                       │
├────────────────────────────┬─────────────────────────────────────────┤
│     HS256 (HMAC SHA-256)   │     RS256 (RSA SHA-256)                 │
│     Symmetric              │     Asymmetric                          │
├────────────────────────────┼─────────────────────────────────────────┤
│                            │                                         │
│  Sign:   secret_key        │  Sign:   private_key                    │
│  Verify: secret_key        │  Verify: public_key                     │
│                            │                                         │
│  (ใช้ Key เดียวกัน!)          │  (Key ต่างกัน!)                           │
│                            │                                         │
│  ✅ ง่าย ใช้ง่าย              │  ✅ ปลอดภัยกว่า                           │
│  ✅ เร็ว                    │  ✅ Services ไม่ต้องรู้ Private Key         │
│  ❌ ทุก Service ต้องรู้        │  ❌ ซับซ้อนกว่า                            │
│     Secret Key             │  ❌ ช้ากว่า HS256                         │
│  ❌ ถ้า Key รั่ว ทุก           │                                         │
│     Service อันตราย         │                                         │
│                            │                                         │
│  ใช้เมื่อ:                    │  ใช้เมื่อ:                                 │
│  • Monolith หรือ ระบบเล็ก    │  • Services ต่างทีม/บริษัท                  │
│  • Internal microservices  │  • 3rd party ต้องตรวจสอบ Token           │
│    ที่เชื่อถือกัน                │  • Enterprise-scale systems             │
│                            │                                         │
└────────────────────────────┴─────────────────────────────────────────┘
```

### สำหรับ Task Board Week 12: ใช้ HS256

เหมาะสมเพราะ:
- Services ทั้งหมดเป็นของเราเอง (ไม่มี 3rd party)
- ง่ายกว่า เหมาะกับการเรียนรู้
- Secret Key ส่งผ่าน Docker Environment Variables

---

## 4. การทำงาน: สร้าง ส่ง และตรวจสอบ JWT

### ขั้นตอนที่ 1: สร้าง Token (jwt.sign)

```
┌──────────────────────────────────────────────────────────────────────┐
│                   Token Creation Process                             │
└──────────────────────────────────────────────────────────────────────┘

   ข้อมูลที่ใช้สร้าง Token:
  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────────┐
  │ Payload (Claims)│ + │  Secret Key     │ + │  Options            │
  │ {               │   │ "super-secret-  │   │ {                   │
  │   sub: "5",     │   │  key-32-chars"  │   │   expiresIn: "24h", │
  │   email: "...", │   │                 │   │   issuer: "auth-svc"│
  │   role: "member"│   │ (เก็บเป็น ความลับ!)│   │ }                   │
  │ }               │   │                 │   │                     │
  └────────┬────────┘   └────────┬────────┘   └─────────┬───────────┘
           │                     │                      │
           └─────────────────────┴──────────────────────┘
                                 │
                                 ▼
                  jwt.sign(payload, secret, options)
                                 │
                                 ▼
              "eyJhbGciOiJIUzI1NiJ9.eyJzdWI..." ← Token

ลำดับการคำนวณ:
1. Base64Url({alg:"HS256",typ:"JWT"})     → headerEncoded
2. Base64Url(payload + iat + exp)         → payloadEncoded
3. HMACSHA256(headerEncoded.payloadEncoded, secret) → signature
4. Token = headerEncoded + "." + payloadEncoded + "." + signature
```

### ขั้นตอนที่ 2: ส่ง Token ใน Request

```
┌──────────────────────────────────────────────────────────────────────┐
│              วิธีส่ง JWT Token ใน HTTP Request                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ✅ วิธีที่ถูกต้องและแนะนำ: Authorization Header (Bearer Token)            │
│  ──────────────────────────────────────────────────────────────      │
│  GET /api/tasks HTTP/1.1                                             │
│  Host: api.taskboard.com                                             │
│  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIi...              │
│                         ^^^^^^^^ คำสำคัญ!                             │
│                                                                      │
│  ทำไมต้องมีคำว่า "Bearer"?                                              │
│  → เป็น Token Type ตามมาตรฐาน RFC 6750                                │
│  → "Bearer" = "ผู้ถือ" (ใครถือ Token นี้ก็ใช้ได้)                             │
│  → มี Token Type อื่นด้วย เช่น "Basic" สำหรับ username:password            │
│                                                                      │
│  ❌ วิธีที่ไม่แนะนำ: Query Parameter                                      │
│  ──────────────────────────────────                                  │
│  GET /api/tasks?token=eyJhbGciOiJIUzI1NiJ9...                        │
│  ⚠️  ปัญหา: Token จะถูกบันทึกใน Server Logs → Security Risk!             │
│                                                                      │
│  ❌ วิธีที่ไม่แนะนำ: Request Body                                         │
│  ──────────────────────────────                                      │
│  { "token": "eyJhbGci..." }                                          │
│  ⚠️  ปัญหา: GET Request ไม่มี Body, ต้องส่งทุก Request                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### ขั้นตอนที่ 3: ตรวจสอบ Token (jwt.verify)

```
┌──────────────────────────────────────────────────────────────────────┐
│                  Token Verification Process                          │
└──────────────────────────────────────────────────────────────────────┘

รับ Token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWI...SflK..."
                    │
                    ▼
         แยก Token เป็น 3 ส่วน
         [header] [payload] [signature]
                    │
                    ▼
         ┌──────────────────────────────┐
         │  Step 1: ตรวจสอบ Algorithm   │
         │  header.alg === "HS256"?     │
         │  ✅ ใช่ → ไปต่อ                │
         │  ❌ ไม่ใช่ → Reject            │
         └──────────────────────────────┘
                    │
                    ▼
         ┌──────────────────────────────┐
         │  Step 2: ตรวจสอบ Signature   │
         │  คำนวณ Signature ใหม่:        │
         │  expected = HMACSHA256(      │
         │    header + "." + payload,   │
         │    secret_key                │
         │  )                           │
         │  expected === signature?     │
         │  ✅ ตรงกัน → ไปต่อ             │
         │  ❌ ไม่ตรง → "Invalid Token"  │
         └──────────────────────────────┘
                    │
                    ▼
         ┌──────────────────────────────┐
         │  Step 3: ตรวจสอบ Expiry      │
         │  payload.exp > Date.now()?   │
         │  ✅ ยังไม่ Expire → ผ่าน!       │
         │  ❌ Expire แล้ว →             │
         │    "TokenExpiredError"       │
         └──────────────────────────────┘
                    │
                    ▼
         ✅ Token Valid!
         Return decoded payload:
         { sub: "5", email: "...", role: "member" }
```

---

## 5. JWT ใน Microservices Architecture

### Pattern: Centralized Auth + Distributed Verification

```
┌──────────────────────────────────────────────────────────────────────┐
│          JWT Pattern ใน Task Board Microservices                     │
└──────────────────────────────────────────────────────────────────────┘

                               ┌────────────────┐
                               │ 🔑 Auth Svc    │  ← ออก Token เท่านั้น
                               │  (Centralized) │     (Issuer)
                               └──────┬─────────┘
                           Issues JWT │
                    ┌─────────────────┴───────────────────┐
                    │                                     │
          ┌─────────▼──────────┐             ┌────────────▼──────────┐
          │  📋 Task Service   │             │  👥 User Service      │
          │  (ตรวจสอบเอง)      │             │  (ตรวจสอบเอง)         │
          │                    │             │                       │
          │  jwt.verify(token, │             │  jwt.verify(token,    │
          │    JWT_SECRET)     │             │    JWT_SECRET)        │
          │  ✅ Valid → ทำงาน  │             │  ✅ Valid → ทำงาน     │
          │  ❌ Invalid → 401  │             │  ❌ Invalid → 401     │
          └────────────────────┘             └───────────────────────┘

  💡 Key Insight:
  • Auth Service เป็นคนเดียวที่ออก Token (สิทธิ์สูงสุด)
  • Task Service และ User Service ตรวจสอบ Token เองได้ด้วย JWT_SECRET
  • ไม่มีการติดต่อระหว่าง Services เพื่อตรวจสอบ (Stateless!)
  • JWT_SECRET ต้องเป็นค่าเดียวกันในทุก Service!
```

### Token Lifetime Management

```
┌──────────────────────────────────────────────────────────────────────┐
│              Access Token + Refresh Token Pattern                    │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Access Token (อายุสั้น: 15min - 24h)                                   │
│  ├── ใช้เรียก API ทุก Request                                           │
│  ├── ถ้าหมดอายุ → ใช้ Refresh Token เพื่อขอ Access Token ใหม่              │
│  └── ถ้ารั่ว → เสียหายแค่ช่วงสั้น                                            │
│                                                                      │
│  Refresh Token (อายุยาว: 7-30 วัน)                                     │
│  ├── เก็บในที่ปลอดภัยกว่า (httpOnly Cookie)                               │
│  ├── ใช้แค่ตอนขอ Access Token ใหม่                                      │
│  └── ถ้ารั่ว → ต้อง Invalidate ทันที (บันทึกไว้ใน Blacklist)                  │
│                                                                      │
│  Timeline:                                                           │
│  ├── t=0h:   Login → ได้ Access(24h) + Refresh(7d)                    │
│  ├── t=24h:  Access หมดอายุ → เรียก /auth/refresh ด้วย Refresh Token    │
│  ├── t=24h:  ได้ Access Token ใหม่                                     │
│  └── t=7d:   Refresh หมดอายุ → ต้อง Login ใหม่                          │
│                                                                      │
│  Task Board Week 12 ใช้:                                              │
│  • Access Token:  24 ชั่วโมง (เหมาะกับ Dev/Education)                   │
│  • Refresh Token: 7 วัน                                               │
│  (Production จริง ควรลดลงเป็น Access 15min, Refresh 7-30d)             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 6. ข้อดี ข้อเสีย และ Security Considerations

### ข้อดีของ JWT

```
┌──────────────────────────────────────────────────────────────────────┐
│                         JWT Advantages                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. Stateless — ไม่ต้อง Session Store                                  │
│     → Server ไม่ต้องจำ "ใคร Login อยู่"                                  │
│     → Horizontal Scale ง่ายมาก (เพิ่ม Server ได้เลย)                     │
│                                                                      │
│  2. Self-Contained — ข้อมูลอยู่ใน Token เลย                              │
│     → ไม่ต้อง Query DB เพื่อหาข้อมูล user ทุก Request                       │
│     → ลด Latency                                                     │
│                                                                      │
│  3. Cross-Domain / CORS Friendly                                     │
│     → ส่ง Token ผ่าน Header → ไม่ติดปัญหา Cookie cross-domain             │
│     → เหมาะกับ Mobile App, SPA, API-first design                      │
│                                                                      │
│  4. Language/Framework Agnostic                                      │
│     → ใช้กับ Node.js, Python, Java, Go, .NET ได้เหมือนกัน                 │
│     → Library มีในทุกภาษา                                              │
│                                                                      │
│  5. Compact                                                          │
│     → ขนาดเล็กกว่า XML-based tokens (SAML)                             │
│     → เหมาะส่งผ่าน HTTP Header                                         │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### ข้อเสียและ Challenges

```
┌──────────────────────────────────────────────────────────────────────┐
│                      JWT Challenges                                  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. Token Revocation ยาก! ⚠️                                         │
│     ─────────────────────────                                        │
│     ปัญหา: ถ้า User logout หรือบัญชีถูก suspend                            │
│            Token ที่ออกไปแล้ว ยังใช้ได้จนกว่าจะ Expire!                     │
│                                                                      │
│     แนวทางแก้:                                                        │
│     a. Blacklist: เก็บ Token ที่ Revoke ใน Redis                        │
│        → แต่กลายเป็น Stateful อีกครั้ง                                    │
│     b. Short Expiry: Access Token อายุสั้น (15min)                      │
│        → ความเสียหายน้อยลง ถ้า Token รั่ว                                 │
│     c. Token Rotation: ทุก Request ออก Token ใหม่                      │
│        → แพงเพราะต้อง Sign ทุกครั้ง                                      │
│                                                                      │
│  2. Token Size                                                       │
│     ─────────────────────────                                        │
│     ปัญหา: JWT ใหญ่กว่า Session Cookie (Session ID แค่ ~16 bytes)        │
│     ผลกระทบ: ทุก Request ส่ง Token 200-500 bytes → ใหญ่กว่า              │
│     แนวทาง: ใส่ Payload น้อยที่สุดเท่าที่จำเป็น                               │
│                                                                      │
│  3. Secret Key Management                                            │
│     ─────────────────────────                                        │
│     ปัญหา: ถ้า JWT_SECRET รั่ว ทุกคนสร้าง Token ได้!                        │
│     แนวทาง:                                                          │
│     • ใช้ Random String ยาวพอ (min 256-bit)                           │
│     • เก็บใน Environment Variable / Secret Manager                    │
│     • ไม่ Hardcode ใน Source Code                                     │
│     • Rotate Key เป็นระยะ                                             │
│                                                                      │
│  4. Payload ไม่ได้ Encrypted                                           │
│     ─────────────────────────                                        │
│     ปัญหา: Payload อ่านได้โดยใครก็ตาม (Base64 ไม่ใช่ Encryption)           │
│     แนวทาง: ไม่ใส่ข้อมูลลับใน Payload                                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Security Threats และ Mitigations

```
┌──────────────────────────────────────────────────────────────────────┐
│              JWT Security Threats & Mitigations                      │
├────────────────────────────────┬─────────────────────────────────────┤
│         Threat                 │      Mitigation                     │
├────────────────────────────────┼─────────────────────────────────────┤
│ Algorithm "none" Attack        │ ✅ Whitelist algorithms ที่ยอมรับ      │
│ ส่ง Token ที่ alg="none"          │    jwtOptions.algorithms = ["HS256"]│
│ เพื่อ bypass verification        │                                     │
├────────────────────────────────┼─────────────────────────────────────┤
│ Brute Force Secret Key         │ ✅ ใช้ Secret Key ยาว ≥32 chars      │
│ ลองเดา Secret Key              │ ✅ Random + Complex string          │
│                                │ ✅ ไม่ใช้ default/weak keys           │
├────────────────────────────────┼─────────────────────────────────────┤
│ Token Theft / Hijacking        │ ✅ ใช้ HTTPS เสมอ                    │
│ ขโมย Token จาก localStorage    │ ✅ httpOnly Cookie สำหรับ Refresh    │
│                                │ ✅ Token อายุสั้น                      │
│                                │ ✅ Bind Token กับ IP/User-Agent      │
├────────────────────────────────┼─────────────────────────────────────┤
│ Replay Attack                  │ ✅ ใช้ jti (JWT ID) Claim            │
│ นำ Token เก่ามาใช้ซ้ำ             │ ✅ ตรวจสอบ jti ว่าใช้แล้วหรือยัง         │
│                                │ ✅ Token Expiry สั้น                  │
├────────────────────────────────┼─────────────────────────────────────┤
│ Payload Manipulation           │ ✅ jwt.verify() ตรวจ Signature      │
│ แก้ไข role ใน Payload           │    อยู่แล้ว                            │
│ เช่น role:"user" → "admin"      │ ✅ ไม่ Trust payload โดยไม่ verify    │
└────────────────────────────────┴─────────────────────────────────────┘
```

---

## 7. Best Practices

### ✅ รายการ Best Practices ที่ควรทำ

```
┌──────────────────────────────────────────────────────────────────────┐
│                    JWT Best Practices                                │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  SECRET KEY                                                          │
│  ✅ ใช้ Secret Key อย่างน้อย 256-bit (32 characters ขึ้นไป)               │
│  ✅ Generate ด้วย random tool: node -e "console.log(require           │
│     ('crypto').randomBytes(32).toString('hex'))"                     │
│  ✅ เก็บใน Environment Variable ห้าม Hardcode!                         │
│  ✅ ใช้ Secret ต่างกันสำหรับ Access Token และ Refresh Token              │
│                                                                      │
│  TOKEN CONTENT                                                       │
│  ✅ ใส่เฉพาะข้อมูลที่จำเป็น (user_id, role, email)                         │
│  ❌ ห้ามใส่ password, SSN, credit card, secrets                        │
│  ✅ ใส่ issuer (iss) เพื่อยืนยันว่าออกจาก Service เรา                      │
│                                                                      │
│  TOKEN LIFETIME                                                      │
│  ✅ Access Token: 15 นาที - 24 ชั่วโมง                                  │
│  ✅ Refresh Token: 7 - 30 วัน                                         │
│  ❌ ห้ามทำ Token ไม่หมดอายุ (expiresIn: "100y")                         │
│                                                                      │
│  TRANSPORT                                                           │
│  ✅ ส่งผ่าน HTTPS เท่านั้น                                                │
│  ✅ ใช้ Authorization: Bearer <token> Header                          │
│  ❌ ห้ามส่งผ่าน URL Query String (/api?token=...)                       │
│  ❌ ห้ามเก็บใน LocalStorage สำหรับ Sensitive Apps (ใช้ httpOnly Cookie)  │
│                                                                      │
│  VERIFICATION                                                        │
│  ✅ ตรวจสอบ algorithm ว่าตรงกับที่คาดหวัง                                 │
│  ✅ ตรวจสอบ expiry เสมอ                                              │
│  ✅ ใช้ Library ที่ Maintain ดี (jsonwebtoken สำหรับ Node.js)             │
│  ❌ ห้าม Decode แล้วใช้โดยไม่ verify Signature!                          │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 8. ตัวอย่างโค้ด Node.js ครบวงจร

### ติดตั้ง library

```bash
npm install jsonwebtoken bcryptjs
```

### สร้าง Token

```javascript
const jwt = require('jsonwebtoken');

// ─────────────────────────────────────────────────────────────
// สร้าง JWT Token หลังจาก Login สำเร็จ
// ─────────────────────────────────────────────────────────────
function createToken(user) {
  const payload = {
    sub:   user.id,            // User ID (ใช้ "sub" ตามมาตรฐาน)
    email: user.email,
    name:  user.name,
    role:  user.role
    // ❌ ห้ามใส่ password หรือข้อมูลลับ!
  };

  const options = {
    expiresIn: '24h',                    // หมดอายุใน 24 ชั่วโมง
    issuer:    'task-board-auth-service', // ระบุว่าใครออก Token
    algorithm: 'HS256'                   // Algorithm ที่ใช้
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

// ตัวอย่างการใช้งาน
const user = { id: 5, email: 'john@example.com', name: 'John', role: 'member' };
const token = createToken(user);
console.log('Token:', token);
// → eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwiZW1haW...
```

### ตรวจสอบ Token (Middleware)

```javascript
const jwt = require('jsonwebtoken');

// ─────────────────────────────────────────────────────────────
// Express Middleware สำหรับตรวจสอบ JWT
// ─────────────────────────────────────────────────────────────
function authenticateToken(req, res, next) {
  // 1. ดึง Token จาก Authorization Header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({
      error: 'Token required',
      hint:  'Add header: Authorization: Bearer <your_token>'
    });
  }

  // 2. Verify Token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],       // ✅ Whitelist algorithms
      issuer: 'task-board-auth-service'
    });

    // 3. ใส่ User Info ใน req.user สำหรับ Handler ต่อๆ ไป
    req.user = {
      id:    decoded.sub,
      email: decoded.email,
      name:  decoded.name,
      role:  decoded.role
    };

    next(); // ✅ ผ่านแล้ว → ไปต่อ

  } catch (err) {
    // จัดการ Error ต่างๆ
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        error:   'Token has expired',
        expiredAt: err.expiredAt,
        hint:    'Please login again or use refresh token'
      });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
        hint:  'Token may be tampered or malformed'
      });
    }

    // Unknown error
    console.error('Token verification error:', err.message);
    return res.status(401).json({ error: 'Token verification failed' });
  }
}

// ─────────────────────────────────────────────────────────────
// ใช้ Middleware ใน Router
// ─────────────────────────────────────────────────────────────
const express = require('express');
const router  = express.Router();

// Route ที่ต้องการ Authentication
router.get('/tasks', authenticateToken, (req, res) => {
  // req.user พร้อมใช้แล้ว!
  console.log('User accessing tasks:', req.user.email, 'Role:', req.user.role);
  res.json({ message: `Hello ${req.user.name}! Here are your tasks...` });
});
```

### Role-Based Authorization

```javascript
// ─────────────────────────────────────────────────────────────
// Middleware สำหรับตรวจสอบ Role
// ใช้หลัง authenticateToken เสมอ
// ─────────────────────────────────────────────────────────────
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    // req.user ต้องมีอยู่แล้ว (จาก authenticateToken)
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error:         'Access denied: insufficient permissions',
        yourRole:      req.user.role,
        allowedRoles:  allowedRoles
      });
    }

    next(); // ✅ มีสิทธิ์!
  };
}

// ─────────────────────────────────────────────────────────────
// ตัวอย่าง: ใช้ทั้ง authenticate + authorize
// ─────────────────────────────────────────────────────────────

// ทุกคน Login แล้วดูได้
router.get('/tasks', authenticateToken, taskController.getAllTasks);

// เฉพาะ member และ admin สร้างได้
router.post('/tasks', authenticateToken, requireRole('admin', 'member'), taskController.createTask);

// เฉพาะ admin ลบได้
router.delete('/tasks/:id', authenticateToken, requireRole('admin'), taskController.deleteTask);

// เฉพาะ admin ดู user list ได้
router.get('/users', authenticateToken, requireRole('admin'), userController.getAllUsers);
```

### Decode Token (ไม่ Verify — ระวังใช้!)

```javascript
// ─────────────────────────────────────────────────────────────
// jwt.decode() → Decode โดยไม่ Verify Signature
// ⚠️  ใช้แค่ตอนต้องการดูข้อมูลใน Token เช่น ตรวจสอบ expiry
//    ห้ามใช้สำหรับ Authentication!
// ─────────────────────────────────────────────────────────────
const decoded = jwt.decode(token); // ไม่ throw error ถ้า Token ผิด
console.log(decoded);
// → { sub: "5", email: "...", exp: 1705924800, ... }

// ตรวจสอบว่า expire เมื่อไหร่
const expiryDate = new Date(decoded.exp * 1000);
console.log('Token expires at:', expiryDate.toLocaleString());

// ⚠️ ห้ามทำ:
// const userId = jwt.decode(token).sub;  ← ไม่ได้ Verify! อันตราย!
// ใช้ jwt.verify() เสมอสำหรับ Authentication
```

### ทดสอบใน Node.js REPL

```javascript
// รัน: node
// แล้วลอง:

const jwt = require('jsonwebtoken');
const secret = 'my-super-secret-key-32-characters';

// สร้าง Token
const token = jwt.sign(
  { sub: '5', email: 'test@example.com', role: 'member' },
  secret,
  { expiresIn: '1h' }
);
console.log('Token:', token);

// Decode (ดูข้อมูล)
const decoded = jwt.decode(token);
console.log('Decoded:', decoded);
console.log('Expires:', new Date(decoded.exp * 1000));

// Verify (ตรวจสอบจริงๆ)
const verified = jwt.verify(token, secret);
console.log('Verified:', verified);

// ทดสอบ Token ผิด
try {
  jwt.verify(token + 'XXXXX', secret);
} catch (err) {
  console.log('Error:', err.name, '-', err.message);
  // → JsonWebTokenError - invalid signature
}
```

---

## 9. ฝึกทำ: JWT Debug Workshop

### Workshop 1: Decode Token ด้วยมือ

Token ตัวอย่าง:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6Im1lbWJlciIsImlhdCI6MTcwNTgzODQwMCwiZXhwIjoxNzA1OTI0ODAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**คำถาม:**
1. Decode Payload ด้วย Base64 → ข้อมูลใน Token คืออะไร?
2. Token หมดอายุเมื่อไหร่?
3. User มี Role อะไร?

**วิธี Decode:**
```bash
# Method 1: ใช้ command line
echo "eyJzdWIiOiI1IiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6Im1lbWJlciIsImlhdCI6MTcwNTgzODQwMCwiZXhwIjoxNzA1OTI0ODAwfQ" | base64 -d

# Method 2: เปิด jwt.io ใน Browser
# https://jwt.io
# วาง Token ทั้ง string ใน "Encoded" box ซ้าย

# Method 3: Node.js
const jwt = require('jsonwebtoken');
const decoded = jwt.decode('PASTE_TOKEN_HERE');
console.log(JSON.stringify(decoded, null, 2));
```

### Workshop 2: Security Test

ทดสอบว่า JWT ปลอดภัยจาก Tampering:

```javascript
const jwt = require('jsonwebtoken');
const secret = 'test-secret-key-for-workshop';

// สร้าง Token สำหรับ User ธรรมดา
const token = jwt.sign({ sub: '1', role: 'member' }, secret, { expiresIn: '1h' });
console.log('Original Token:', token);

// ─────────────────────────────────────────────────────────────
// แบบฝึกหัด: ลองแก้ไข Role จาก "member" เป็น "admin"
// ─────────────────────────────────────────────────────────────

// 1. Decode Payload
const decoded = jwt.decode(token);
console.log('Decoded payload:', decoded);

// 2. แก้ไข role
decoded.role = 'admin';

// 3. สร้าง Payload ใหม่เป็น Base64
const tamperedPayload = Buffer.from(JSON.stringify(decoded)).toString('base64url');

// 4. รวม Token ใหม่ (ใช้ signature เดิม)
const tokenParts = token.split('.');
const tamperedToken = `${tokenParts[0]}.${tamperedPayload}.${tokenParts[2]}`;

console.log('Tampered Token:', tamperedToken);

// 5. ลอง Verify Token ที่แก้ไข
try {
  const result = jwt.verify(tamperedToken, secret);
  console.log('✅ Token valid:', result); // ← ต้องไม่เกิดขึ้น!
} catch (err) {
  console.log('❌ Verification failed:', err.message);
  // ✅ ควรได้: "invalid signature"
  // นี่คือหลักฐานว่า JWT ป้องกัน Tampering ได้!
}
```

### Workshop 3: Expiry Test

```javascript
const jwt = require('jsonwebtoken');
const secret = 'test-secret';

// สร้าง Token ที่หมดอายุใน 2 วินาที
const shortToken = jwt.sign({ sub: '1', role: 'member' }, secret, { expiresIn: '2s' });
console.log('Short-lived token created');

// รอ 3 วินาที
setTimeout(() => {
  try {
    jwt.verify(shortToken, secret);
    console.log('Token still valid');
  } catch (err) {
    console.log('Expected error:', err.name);
    // → TokenExpiredError
    console.log('Expired at:', err.expiredAt);
  }
}, 3000);
```

---

## 📊 สรุป: JWT Flow ทั้งหมดในหนึ่งภาพ

```
┌──────────────────────────────────────────────────────────────────────┐
│                    JWT Complete Flow Summary                         │
└──────────────────────────────────────────────────────────────────────┘

  ① User ส่ง email + password
  Browser ────────────────────────────────► Auth Service
                                                 │
  ② ตรวจสอบ Password (bcrypt.compare)           │
     สร้าง Token (jwt.sign)                       │
                                                 │
  ③ ส่ง Token กลับ                                │
  Browser ◄────────────────────────────────────  │
     │
     │ เก็บ Token ไว้
     │ (localStorage/memory)
     │
  ④ ส่ง Request พร้อม Token
  Browser ────────────────────────────────► Task Service
     Authorization: Bearer eyJhbGci...          │
                                                │
  ⑤ ตรวจสอบ Token (jwt.verify)                 │
     ✅ Signature ถูก?                           │
     ✅ ยังไม่ Expired?                           │
     → req.user = { id, email, role }           │
                                                │
  ⑥ ตรวจสอบ Role (RBAC)                        │
     req.user.role === 'member'                 │
     ✅ → ทำ Business Logic                     │
     ❌ → 403 Forbidden                         │
                                                │
  ⑦ Response                                   │
  Browser ◄──────────────────────────────────── │

┌──────────────────────────────────────────────────────────────────────┐
│  Key Points to Remember:                                             │
│  1. JWT = Header.Payload.Signature (3 ส่วน คั่นด้วย .)                   │
│  2. Payload ≠ Encrypted (Base64 อ่านได้ทุกคน)                           │
│  3. Signature = หลักฐานว่า "ใครออก Token" และ "ไม่ถูกแก้ไข"               │
│  4. ต้องใช้ jwt.verify() เสมอ ไม่ใช่แค่ jwt.decode()                      │
│  5. เก็บ JWT_SECRET ปลอดภัย — ห้าม commit ลง Git!                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 📖 แหล่งอ้างอิงเพิ่มเติม

1. **JWT.io** — Interactive Debugger: https://jwt.io
2. **RFC 7519** — JWT Standard: https://datatracker.ietf.org/doc/html/rfc7519
3. **jsonwebtoken (Node.js)** — https://github.com/auth0/node-jsonwebtoken
4. **OWASP JWT Security** — https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html

---

*Document Version: 1.0*
*Course: ENGSE207 Software Architecture — Week 12*
*Instructor: นายธนิต เกตุแก้ว*
*มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*
