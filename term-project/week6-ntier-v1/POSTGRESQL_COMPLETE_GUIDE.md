# 🗄️ คู่มือ PostgreSQL Database ฉบับสมบูรณ์
## สำหรับ ENGSE207 Software Architecture

**ระยะเวลาศึกษา:** 60-90 นาที | **ระดับ:** เริ่มต้น-กลาง

---

## 📋 สารบัญ

1. [PostgreSQL คืออะไร?](#1-postgresql-คืออะไร)
2. [การติดตั้ง PostgreSQL](#2-การติดตั้ง-postgresql)
3. [Basic Configuration](#3-basic-configuration)
4. [การจัดการ Database และ Users](#4-การจัดการ-database-และ-users)
5. [SQL พื้นฐาน](#5-sql-พื้นฐาน)
6. [Security และ Authentication](#6-security-และ-authentication)
7. [pgAdmin - GUI Client](#7-pgadmin---gui-client)
8. [การใช้งานผ่าน Node.js](#8-การใช้งานผ่าน-nodejs)
9. [Connection Pooling](#9-connection-pooling)
10. [Backup และ Restore](#10-backup-และ-restore)
11. [Performance Tuning](#11-performance-tuning)
12. [การทดสอบ PostgreSQL](#12-การทดสอบ-postgresql)
13. [Docker PostgreSQL](#13-docker-postgresql)
14. [แก้ปัญหาที่พบบ่อย](#14-แก้ปัญหาที่พบบ่อย)

---

## 1. PostgreSQL คืออะไร?

### 1.1 คำจำกัดความ

**PostgreSQL** (อ่านว่า "Post-gres-Q-L") คือ Open-source Object-Relational Database Management System (ORDBMS) ที่เน้นความถูกต้องของข้อมูลและรองรับ SQL standards

```
┌─────────────────────────────────────────────────────────────────────┐
│                      PostgreSQL Overview                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Key Features:                                                     │
│                                                                     │
│   ✅ ACID Compliant                                                 │
│      • Atomicity - ทำสำเร็จทั้งหมดหรือไม่ทำเลย                      │
│      • Consistency - ข้อมูลถูกต้องเสมอ                              │
│      • Isolation - Transaction แยกกัน                               │
│      • Durability - เก็บข้อมูลถาวร                                  │
│                                                                     │
│   ✅ Advanced Features                                              │
│      • Complex queries, CTEs, Window functions                     │
│      • Full-text search                                            │
│      • JSON/JSONB support                                          │
│      • Extensions (PostGIS, pg_trgm, etc.)                         │
│      • Stored procedures (PL/pgSQL)                                │
│                                                                     │
│   ✅ Scalability                                                    │
│      • Partitioning                                                │
│      • Replication (Streaming, Logical)                            │
│      • Connection pooling                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 PostgreSQL vs Other Databases

| Feature | PostgreSQL | MySQL | SQLite | MongoDB |
|---------|------------|-------|--------|---------|
| **Type** | ORDBMS | RDBMS | Embedded | NoSQL |
| **ACID** | ✅ Full | ✅ (InnoDB) | ✅ | ⚠️ Partial |
| **JSON Support** | ✅ JSONB | ✅ JSON | ❌ | ✅ Native |
| **Full-text Search** | ✅ Built-in | ⚠️ Limited | ❌ | ✅ |
| **Concurrency** | MVCC | Locking | Limited | MVCC |
| **Scalability** | ✅ Excellent | ✅ Good | ❌ | ✅ Excellent |
| **Use Case** | Enterprise | Web Apps | Mobile/Embedded | Big Data |

### 1.3 Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                   PostgreSQL Architecture                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                    Client Applications                       │  │
│   │  (psql, pgAdmin, Node.js, Python, Java, etc.)               │  │
│   └─────────────────────────┬───────────────────────────────────┘  │
│                             │ TCP/IP (Port 5432)                   │
│                             ▼                                       │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                    Postmaster (Main Process)                 │  │
│   │  • Accept connections                                        │  │
│   │  • Spawn backend processes                                   │  │
│   └─────────────────────────┬───────────────────────────────────┘  │
│                             │                                       │
│           ┌─────────────────┼─────────────────┐                    │
│           ▼                 ▼                 ▼                    │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐            │
│   │  Backend 1  │   │  Backend 2  │   │  Backend 3  │            │
│   │  (Session)  │   │  (Session)  │   │  (Session)  │            │
│   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘            │
│          │                 │                 │                     │
│          └─────────────────┼─────────────────┘                     │
│                            ▼                                        │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                    Shared Memory                             │  │
│   │  • Shared Buffers (cache)                                   │  │
│   │  • WAL Buffers                                              │  │
│   │  • Lock tables                                              │  │
│   └─────────────────────────┬───────────────────────────────────┘  │
│                             │                                       │
│                             ▼                                       │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                    Storage                                   │  │
│   │  • Data files                                               │  │
│   │  • WAL (Write-Ahead Log)                                    │  │
│   │  • Indexes                                                  │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. การติดตั้ง PostgreSQL

### 2.1 ติดตั้งบน Ubuntu/Debian

```bash
# Update packages
sudo apt update

# ติดตั้ง PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# ตรวจสอบ version
psql --version
# psql (PostgreSQL) 16.1 (Ubuntu 16.1-1.pgdg22.04+1)

# ตรวจสอบ status
sudo systemctl status postgresql

# Enable auto-start
sudo systemctl enable postgresql
```

### 2.2 ติดตั้ง Specific Version

```bash
# เพิ่ม PostgreSQL repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# เพิ่ม key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update และติดตั้ง version ที่ต้องการ
sudo apt update
sudo apt install -y postgresql-16 postgresql-contrib-16
```

### 2.3 คำสั่งพื้นฐาน

```bash
# ═══════════════════════════════════════════════════════
#              POSTGRESQL SERVICE COMMANDS
# ═══════════════════════════════════════════════════════

# ─────────── Service Management ───────────
sudo systemctl start postgresql      # Start
sudo systemctl stop postgresql       # Stop
sudo systemctl restart postgresql    # Restart
sudo systemctl reload postgresql     # Reload config
sudo systemctl status postgresql     # Status

# ─────────── Connect to PostgreSQL ───────────
sudo -u postgres psql               # Connect as postgres user
psql -h localhost -U username -d dbname  # Connect with credentials

# ─────────── psql Commands ───────────
\l                  # List databases
\c dbname           # Connect to database
\dt                 # List tables
\d tablename        # Describe table
\du                 # List users/roles
\q                  # Quit

# ─────────── Info ───────────
psql --version                      # Version
pg_config --version                 # Full version info
```

---

## 3. Basic Configuration

### 3.1 ไฟล์ Configuration หลัก

```
/etc/postgresql/16/main/
├── postgresql.conf     # Main configuration
├── pg_hba.conf        # Client authentication
├── pg_ident.conf      # User mapping
└── conf.d/            # Additional configs
```

### 3.2 postgresql.conf (Key Settings)

```bash
# ดูตำแหน่งไฟล์
sudo -u postgres psql -c "SHOW config_file;"

# แก้ไข
sudo nano /etc/postgresql/16/main/postgresql.conf
```

```ini
# /etc/postgresql/16/main/postgresql.conf

# ═══════════════════════════════════════════════════════
# CONNECTION SETTINGS
# ═══════════════════════════════════════════════════════
listen_addresses = 'localhost'          # IP addresses to listen on
                                        # '*' = all interfaces
                                        # 'localhost' = local only
port = 5432                             # Default port
max_connections = 100                   # Max concurrent connections

# ═══════════════════════════════════════════════════════
# MEMORY SETTINGS
# ═══════════════════════════════════════════════════════
shared_buffers = 256MB                  # Memory for caching (25% of RAM)
effective_cache_size = 768MB            # Expected OS cache (50-75% of RAM)
work_mem = 4MB                          # Per-operation memory
maintenance_work_mem = 64MB             # For VACUUM, CREATE INDEX

# ═══════════════════════════════════════════════════════
# WRITE-AHEAD LOG
# ═══════════════════════════════════════════════════════
wal_level = replica                     # minimal, replica, logical
max_wal_senders = 3                     # Max replication connections

# ═══════════════════════════════════════════════════════
# LOGGING
# ═══════════════════════════════════════════════════════
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_statement = 'all'                   # none, ddl, mod, all
log_min_duration_statement = 1000       # Log queries > 1 second

# ═══════════════════════════════════════════════════════
# LOCALE
# ═══════════════════════════════════════════════════════
datestyle = 'iso, mdy'
timezone = 'Asia/Bangkok'
lc_messages = 'en_US.UTF-8'
```

### 3.3 pg_hba.conf (Authentication)

```bash
# แก้ไข
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

```ini
# /etc/postgresql/16/main/pg_hba.conf
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# ═══════════════════════════════════════════════════════
# LOCAL CONNECTIONS
# ═══════════════════════════════════════════════════════
# "local" = Unix domain socket connections
local   all             postgres                                peer
local   all             all                                     peer

# ═══════════════════════════════════════════════════════
# IPv4 LOCAL CONNECTIONS
# ═══════════════════════════════════════════════════════
# localhost only
host    all             all             127.0.0.1/32            scram-sha-256

# Allow from specific network
host    all             all             192.168.1.0/24          scram-sha-256

# ═══════════════════════════════════════════════════════
# IPv6 LOCAL CONNECTIONS
# ═══════════════════════════════════════════════════════
host    all             all             ::1/128                 scram-sha-256

# ═══════════════════════════════════════════════════════
# SPECIFIC DATABASE ACCESS
# ═══════════════════════════════════════════════════════
# Allow taskboard user to access taskboard_db from any host
host    taskboard_db    taskboard       0.0.0.0/0               scram-sha-256
```

**Authentication Methods:**

| Method | Description |
|--------|-------------|
| `trust` | No password (ไม่แนะนำ) |
| `peer` | OS username = DB username (local only) |
| `md5` | MD5 password hash |
| `scram-sha-256` | SCRAM-SHA-256 (แนะนำ) |
| `reject` | Reject connection |

### 3.4 Apply Changes

```bash
# Reload configuration
sudo systemctl reload postgresql

# หรือ
sudo -u postgres psql -c "SELECT pg_reload_conf();"
```

---

## 4. การจัดการ Database และ Users

### 4.1 สร้าง Database และ User

```bash
# เข้า psql shell
sudo -u postgres psql
```

```sql
-- ═══════════════════════════════════════════════════════
-- สร้าง User/Role
-- ═══════════════════════════════════════════════════════
CREATE USER taskboard WITH PASSWORD 'taskboard123';

-- หรือสร้างพร้อม options
CREATE USER taskboard WITH 
    PASSWORD 'taskboard123'
    CREATEDB
    LOGIN;

-- ═══════════════════════════════════════════════════════
-- สร้าง Database
-- ═══════════════════════════════════════════════════════
CREATE DATABASE taskboard_db 
    OWNER taskboard
    ENCODING 'UTF8'
    LC_COLLATE 'en_US.UTF-8'
    LC_CTYPE 'en_US.UTF-8';

-- ═══════════════════════════════════════════════════════
-- ให้สิทธิ์
-- ═══════════════════════════════════════════════════════
GRANT ALL PRIVILEGES ON DATABASE taskboard_db TO taskboard;

-- เข้า database เพื่อให้สิทธิ์ schema
\c taskboard_db

GRANT ALL ON SCHEMA public TO taskboard;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taskboard;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taskboard;

-- ให้สิทธิ์สำหรับ tables ที่สร้างในอนาคต
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
    GRANT ALL ON TABLES TO taskboard;
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
    GRANT ALL ON SEQUENCES TO taskboard;

-- ออก
\q
```

### 4.2 ตรวจสอบ Users และ Databases

```sql
-- List users/roles
\du

-- หรือ
SELECT usename, usecreatedb, usesuper FROM pg_user;

-- List databases
\l

-- หรือ
SELECT datname, datowner, encoding FROM pg_database;

-- Current user and database
SELECT current_user, current_database();
```

### 4.3 แก้ไข User

```sql
-- เปลี่ยน password
ALTER USER taskboard WITH PASSWORD 'newpassword123';

-- ให้สิทธิ์เพิ่ม
ALTER USER taskboard CREATEDB;
ALTER USER taskboard SUPERUSER;

-- ลบสิทธิ์
ALTER USER taskboard NOSUPERUSER;

-- ลบ user
DROP USER taskboard;

-- ลบ database
DROP DATABASE taskboard_db;
```

---

## 5. SQL พื้นฐาน

### 5.1 สร้าง Table

```sql
-- เข้า database
\c taskboard_db

-- ═══════════════════════════════════════════════════════
-- สร้าง Tasks Table
-- ═══════════════════════════════════════════════════════
CREATE TABLE tasks (
    -- Primary key
    id SERIAL PRIMARY KEY,
    
    -- Fields
    title VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'TODO',
    priority VARCHAR(10) NOT NULL DEFAULT 'MEDIUM',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT chk_status CHECK (status IN ('TODO', 'IN_PROGRESS', 'DONE')),
    CONSTRAINT chk_priority CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
    CONSTRAINT chk_title_length CHECK (LENGTH(title) >= 3)
);

-- ═══════════════════════════════════════════════════════
-- สร้าง Indexes
-- ═══════════════════════════════════════════════════════
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);

-- ═══════════════════════════════════════════════════════
-- สร้าง Trigger สำหรับ updated_at
-- ═══════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════
-- ตรวจสอบ
-- ═══════════════════════════════════════════════════════
\d tasks
\di             -- List indexes
```

### 5.2 CRUD Operations

```sql
-- ═══════════════════════════════════════════════════════
-- CREATE (Insert)
-- ═══════════════════════════════════════════════════════
INSERT INTO tasks (title, description, status, priority)
VALUES ('Setup PostgreSQL', 'Install and configure PostgreSQL', 'DONE', 'HIGH');

INSERT INTO tasks (title, description, status, priority)
VALUES 
    ('Create API', 'Build REST API endpoints', 'IN_PROGRESS', 'HIGH'),
    ('Write Tests', 'Unit and integration tests', 'TODO', 'MEDIUM'),
    ('Deploy', 'Deploy to production', 'TODO', 'HIGH');

-- Insert และ return ค่า
INSERT INTO tasks (title, status, priority)
VALUES ('New Task', 'TODO', 'LOW')
RETURNING id, title, created_at;

-- ═══════════════════════════════════════════════════════
-- READ (Select)
-- ═══════════════════════════════════════════════════════
-- All tasks
SELECT * FROM tasks;

-- Specific columns
SELECT id, title, status FROM tasks;

-- With condition
SELECT * FROM tasks WHERE status = 'TODO';

-- With multiple conditions
SELECT * FROM tasks 
WHERE status = 'TODO' AND priority = 'HIGH';

-- With ordering
SELECT * FROM tasks 
ORDER BY 
    CASE priority 
        WHEN 'HIGH' THEN 1 
        WHEN 'MEDIUM' THEN 2 
        WHEN 'LOW' THEN 3 
    END,
    created_at DESC;

-- With limit
SELECT * FROM tasks LIMIT 10 OFFSET 0;

-- Count
SELECT COUNT(*) FROM tasks;
SELECT status, COUNT(*) FROM tasks GROUP BY status;

-- ═══════════════════════════════════════════════════════
-- UPDATE
-- ═══════════════════════════════════════════════════════
UPDATE tasks 
SET status = 'IN_PROGRESS' 
WHERE id = 1;

UPDATE tasks 
SET status = 'DONE', priority = 'LOW' 
WHERE id = 2
RETURNING *;

-- ═══════════════════════════════════════════════════════
-- DELETE
-- ═══════════════════════════════════════════════════════
DELETE FROM tasks WHERE id = 3;

DELETE FROM tasks WHERE status = 'DONE';

DELETE FROM tasks WHERE id = 4 RETURNING *;
```

### 5.3 Advanced Queries

```sql
-- ═══════════════════════════════════════════════════════
-- Aggregation
-- ═══════════════════════════════════════════════════════
SELECT 
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE status = 'TODO') as todo,
    COUNT(*) FILTER (WHERE status = 'IN_PROGRESS') as in_progress,
    COUNT(*) FILTER (WHERE status = 'DONE') as done,
    COUNT(*) FILTER (WHERE priority = 'HIGH') as high_priority
FROM tasks;

-- ═══════════════════════════════════════════════════════
-- JSON/JSONB
-- ═══════════════════════════════════════════════════════
-- Return as JSON
SELECT json_agg(tasks) FROM tasks;

-- Return single row as JSON
SELECT row_to_json(tasks) FROM tasks WHERE id = 1;

-- ═══════════════════════════════════════════════════════
-- CTE (Common Table Expression)
-- ═══════════════════════════════════════════════════════
WITH high_priority_tasks AS (
    SELECT * FROM tasks WHERE priority = 'HIGH'
)
SELECT * FROM high_priority_tasks WHERE status != 'DONE';

-- ═══════════════════════════════════════════════════════
-- Window Functions
-- ═══════════════════════════════════════════════════════
SELECT 
    id,
    title,
    status,
    ROW_NUMBER() OVER (PARTITION BY status ORDER BY created_at) as row_num
FROM tasks;
```

---

## 6. Security และ Authentication

### 6.1 Authentication Methods

```
┌─────────────────────────────────────────────────────────────────────┐
│                   PostgreSQL Security Layers                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Layer 1: Network (pg_hba.conf)                                   │
│   ────────────────────────────────                                 │
│   • IP-based access control                                        │
│   • Connection type (local/host/hostssl)                           │
│                                                                     │
│   Layer 2: Authentication                                          │
│   ────────────────────────────                                     │
│   • Password (scram-sha-256, md5)                                  │
│   • Certificate (SSL)                                              │
│   • LDAP, Kerberos                                                 │
│                                                                     │
│   Layer 3: Authorization (Privileges)                              │
│   ─────────────────────────────────                                │
│   • Database-level: CONNECT, CREATE                                │
│   • Schema-level: USAGE, CREATE                                    │
│   • Table-level: SELECT, INSERT, UPDATE, DELETE                    │
│   • Column-level: SELECT(col), UPDATE(col)                         │
│                                                                     │
│   Layer 4: Row Level Security (RLS)                                │
│   ─────────────────────────────────                                │
│   • Row-level access policies                                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Secure pg_hba.conf

```ini
# /etc/postgresql/16/main/pg_hba.conf

# ═══════════════════════════════════════════════════════
# SECURE CONFIGURATION
# ═══════════════════════════════════════════════════════

# Reject all by default (place at end)
# host    all             all             0.0.0.0/0               reject

# Local connections (Unix socket)
local   all             postgres                                peer
local   all             all                                     scram-sha-256

# Localhost only
host    all             all             127.0.0.1/32            scram-sha-256
host    all             all             ::1/128                 scram-sha-256

# Specific application database
host    taskboard_db    taskboard       10.0.0.0/24             scram-sha-256

# SSL required for external connections
hostssl all             all             0.0.0.0/0               scram-sha-256
```

### 6.3 Password Encryption

```sql
-- ตรวจสอบ password encryption method
SHOW password_encryption;

-- ตั้งค่าใน postgresql.conf
-- password_encryption = 'scram-sha-256'

-- สร้าง user ด้วย encrypted password
CREATE USER secure_user WITH PASSWORD 'SecureP@ssw0rd!';

-- เปลี่ยน password
ALTER USER secure_user WITH PASSWORD 'NewSecureP@ssw0rd!';
```

### 6.4 SSL/TLS Configuration

```bash
# สร้าง SSL certificate
sudo -u postgres openssl req -new -x509 -days 365 -nodes \
    -out /var/lib/postgresql/16/main/server.crt \
    -keyout /var/lib/postgresql/16/main/server.key \
    -subj "/CN=postgres-server"

# ตั้งค่า permissions
sudo -u postgres chmod 600 /var/lib/postgresql/16/main/server.key
```

```ini
# postgresql.conf
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'
```

### 6.5 Role-Based Access Control

```sql
-- ═══════════════════════════════════════════════════════
-- สร้าง Roles
-- ═══════════════════════════════════════════════════════
-- Read-only role
CREATE ROLE readonly;
GRANT CONNECT ON DATABASE taskboard_db TO readonly;
GRANT USAGE ON SCHEMA public TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;

-- Read-write role
CREATE ROLE readwrite;
GRANT CONNECT ON DATABASE taskboard_db TO readwrite;
GRANT USAGE ON SCHEMA public TO readwrite;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO readwrite;

-- Admin role
CREATE ROLE admin;
GRANT ALL PRIVILEGES ON DATABASE taskboard_db TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;

-- ═══════════════════════════════════════════════════════
-- Assign roles to users
-- ═══════════════════════════════════════════════════════
CREATE USER report_user WITH PASSWORD 'report123';
GRANT readonly TO report_user;

CREATE USER app_user WITH PASSWORD 'app123';
GRANT readwrite TO app_user;

CREATE USER admin_user WITH PASSWORD 'admin123';
GRANT admin TO admin_user;
```

---

## 7. pgAdmin - GUI Client

### 7.1 pgAdmin คืออะไร?

**pgAdmin** คือ GUI tool สำหรับจัดการ PostgreSQL databases ที่ได้รับความนิยมมากที่สุด

### 7.2 ติดตั้ง pgAdmin 4 (Web Mode)

```bash
# เพิ่ม repository
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg

sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'

# Update และติดตั้ง
sudo apt update
sudo apt install -y pgadmin4-web

# Setup
sudo /usr/pgadmin4/bin/setup-web.sh
# จะถาม email และ password สำหรับ login

# เข้าใช้งานผ่าน browser
# http://localhost/pgadmin4
```

### 7.3 ติดตั้ง pgAdmin 4 (Desktop Mode)

```bash
# Desktop mode (standalone application)
sudo apt install -y pgadmin4-desktop

# รันจาก Applications menu หรือ
pgadmin4
```

### 7.4 ติดตั้งบน Windows/Mac

1. Download จาก https://www.pgadmin.org/download/
2. Run installer
3. Follow setup wizard

### 7.5 เชื่อมต่อ Database

```
┌─────────────────────────────────────────────────────────────────────┐
│                   pgAdmin Connection Setup                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   1. เปิด pgAdmin                                                   │
│   2. Right-click "Servers" → "Register" → "Server..."             │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │  General Tab:                                                │  │
│   │  ────────────                                                │  │
│   │  Name: Task Board DB                                         │  │
│   │                                                              │  │
│   │  Connection Tab:                                             │  │
│   │  ───────────────                                             │  │
│   │  Host: localhost (หรือ VM IP)                                │  │
│   │  Port: 5432                                                  │  │
│   │  Maintenance database: taskboard_db                          │  │
│   │  Username: taskboard                                         │  │
│   │  Password: taskboard123                                      │  │
│   │  ☑ Save password                                             │  │
│   │                                                              │  │
│   │  SSH Tunnel Tab (ถ้าเชื่อมต่อผ่าน SSH):                       │  │
│   │  ──────────────                                              │  │
│   │  ☑ Use SSH tunneling                                         │  │
│   │  Host: VM_IP                                                 │  │
│   │  Port: 22                                                    │  │
│   │  Username: devlab                                            │  │
│   │  Identity file: path/to/private_key                          │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   3. Click "Save"                                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.6 pgAdmin Features

```
┌─────────────────────────────────────────────────────────────────────┐
│                     pgAdmin Key Features                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   📊 Dashboard                                                      │
│   • Server activity                                                 │
│   • Session statistics                                              │
│   • Lock information                                                │
│                                                                     │
│   📝 Query Tool                                                     │
│   • Write and execute SQL                                          │
│   • Query history                                                  │
│   • Export results (CSV, JSON)                                     │
│                                                                     │
│   🗂️ Object Browser                                                 │
│   • Navigate databases, schemas, tables                            │
│   • View/edit table data                                           │
│   • Manage indexes, constraints                                    │
│                                                                     │
│   📈 Monitoring                                                     │
│   • Active queries                                                 │
│   • Server logs                                                    │
│   • Performance metrics                                            │
│                                                                     │
│   🔧 Maintenance                                                    │
│   • Backup/Restore                                                 │
│   • VACUUM, ANALYZE                                                │
│   • Import/Export data                                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.7 Alternative GUI Tools

| Tool | Platform | Price | Features |
|------|----------|-------|----------|
| **pgAdmin 4** | All | Free | Official, Full-featured |
| **DBeaver** | All | Free/Paid | Multi-database, ERD |
| **DataGrip** | All | Paid | JetBrains, Powerful |
| **TablePlus** | Mac/Win/Linux | Paid | Modern UI, Fast |
| **Postico** | Mac | Paid | Simple, Beautiful |

---

## 8. การใช้งานผ่าน Node.js

### 8.1 ติดตั้ง pg Package

```bash
npm install pg
npm install dotenv
```

### 8.2 Basic Connection

```javascript
// db-basic.js
const { Client } = require('pg');

// สร้าง client
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'taskboard_db',
    user: 'taskboard',
    password: 'taskboard123'
});

async function main() {
    try {
        // Connect
        await client.connect();
        console.log('Connected to PostgreSQL');

        // Query
        const result = await client.query('SELECT NOW() as current_time');
        console.log('Current time:', result.rows[0].current_time);

        // Query with parameters
        const tasks = await client.query(
            'SELECT * FROM tasks WHERE status = $1',
            ['TODO']
        );
        console.log('Tasks:', tasks.rows);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        // Disconnect
        await client.end();
        console.log('Disconnected');
    }
}

main();
```

### 8.3 Connection Pool (แนะนำสำหรับ Production)

```javascript
// src/config/database.js
const { Pool } = require('pg');
require('dotenv').config();

// ═══════════════════════════════════════════════════════
// Connection Pool Configuration
// ═══════════════════════════════════════════════════════
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'taskboard_db',
    user: process.env.DB_USER || 'taskboard',
    password: process.env.DB_PASSWORD || 'taskboard123',
    
    // Pool settings
    max: 20,                      // Maximum connections
    idleTimeoutMillis: 30000,     // Close idle connections after 30s
    connectionTimeoutMillis: 5000, // Error if can't connect in 5s
    maxUses: 7500                 // Close connection after 7500 queries
});

// ═══════════════════════════════════════════════════════
// Event Handlers
// ═══════════════════════════════════════════════════════
pool.on('connect', (client) => {
    console.log('✅ New client connected');
});

pool.on('error', (err, client) => {
    console.error('❌ Unexpected error on idle client:', err.message);
});

pool.on('remove', (client) => {
    console.log('🔌 Client removed from pool');
});

// ═══════════════════════════════════════════════════════
// Query Helper
// ═══════════════════════════════════════════════════════
const query = async (text, params) => {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        
        console.log('📊 Query executed', {
            text: text.substring(0, 50) + '...',
            duration: `${duration}ms`,
            rows: result.rowCount
        });
        
        return result;
    } catch (error) {
        console.error('❌ Query error:', error.message);
        throw error;
    }
};

// ═══════════════════════════════════════════════════════
// Transaction Helper
// ═══════════════════════════════════════════════════════
const transaction = async (callback) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// ═══════════════════════════════════════════════════════
// Health Check
// ═══════════════════════════════════════════════════════
const healthCheck = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                NOW() as time,
                current_database() as database,
                current_user as user,
                version() as version
        `);
        
        return {
            status: 'healthy',
            ...result.rows[0],
            pool: {
                totalCount: pool.totalCount,
                idleCount: pool.idleCount,
                waitingCount: pool.waitingCount
            }
        };
    } catch (error) {
        return {
            status: 'unhealthy',
            error: error.message
        };
    }
};

// ═══════════════════════════════════════════════════════
// Graceful Shutdown
// ═══════════════════════════════════════════════════════
const closePool = async () => {
    console.log('🔄 Closing database pool...');
    await pool.end();
    console.log('✅ Database pool closed');
};

module.exports = {
    pool,
    query,
    transaction,
    healthCheck,
    closePool
};
```

### 8.4 Repository Pattern

```javascript
// src/repositories/taskRepository.js
const { query, transaction } = require('../config/database');

class TaskRepository {
    
    // ═══════════════════════════════════════════════════════
    // Find All
    // ═══════════════════════════════════════════════════════
    async findAll(filters = {}) {
        let sql = `
            SELECT id, title, description, status, priority, 
                   created_at, updated_at 
            FROM tasks
        `;
        const params = [];
        const conditions = [];

        if (filters.status) {
            conditions.push(`status = $${params.length + 1}`);
            params.push(filters.status);
        }

        if (filters.priority) {
            conditions.push(`priority = $${params.length + 1}`);
            params.push(filters.priority);
        }

        if (conditions.length > 0) {
            sql += ` WHERE ${conditions.join(' AND ')}`;
        }

        sql += ` ORDER BY created_at DESC`;

        const result = await query(sql, params);
        return result.rows;
    }

    // ═══════════════════════════════════════════════════════
    // Find By ID
    // ═══════════════════════════════════════════════════════
    async findById(id) {
        const sql = `
            SELECT id, title, description, status, priority, 
                   created_at, updated_at 
            FROM tasks 
            WHERE id = $1
        `;
        const result = await query(sql, [id]);
        return result.rows[0] || null;
    }

    // ═══════════════════════════════════════════════════════
    // Create
    // ═══════════════════════════════════════════════════════
    async create(data) {
        const sql = `
            INSERT INTO tasks (title, description, status, priority)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const params = [
            data.title,
            data.description || '',
            data.status || 'TODO',
            data.priority || 'MEDIUM'
        ];
        
        const result = await query(sql, params);
        return result.rows[0];
    }

    // ═══════════════════════════════════════════════════════
    // Update
    // ═══════════════════════════════════════════════════════
    async update(id, data) {
        const fields = [];
        const params = [];
        let paramIndex = 1;

        if (data.title !== undefined) {
            fields.push(`title = $${paramIndex++}`);
            params.push(data.title);
        }
        if (data.description !== undefined) {
            fields.push(`description = $${paramIndex++}`);
            params.push(data.description);
        }
        if (data.status !== undefined) {
            fields.push(`status = $${paramIndex++}`);
            params.push(data.status);
        }
        if (data.priority !== undefined) {
            fields.push(`priority = $${paramIndex++}`);
            params.push(data.priority);
        }

        if (fields.length === 0) {
            return this.findById(id);
        }

        params.push(id);
        const sql = `
            UPDATE tasks 
            SET ${fields.join(', ')}
            WHERE id = $${paramIndex}
            RETURNING *
        `;

        const result = await query(sql, params);
        return result.rows[0];
    }

    // ═══════════════════════════════════════════════════════
    // Delete
    // ═══════════════════════════════════════════════════════
    async delete(id) {
        const sql = 'DELETE FROM tasks WHERE id = $1 RETURNING id';
        const result = await query(sql, [id]);
        return result.rowCount > 0;
    }

    // ═══════════════════════════════════════════════════════
    // Bulk Create (with Transaction)
    // ═══════════════════════════════════════════════════════
    async bulkCreate(tasks) {
        return await transaction(async (client) => {
            const results = [];
            
            for (const task of tasks) {
                const result = await client.query(`
                    INSERT INTO tasks (title, description, status, priority)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *
                `, [
                    task.title,
                    task.description || '',
                    task.status || 'TODO',
                    task.priority || 'MEDIUM'
                ]);
                results.push(result.rows[0]);
            }
            
            return results;
        });
    }

    // ═══════════════════════════════════════════════════════
    // Statistics
    // ═══════════════════════════════════════════════════════
    async getStatistics() {
        const sql = `
            SELECT 
                COUNT(*)::int as total,
                COUNT(*) FILTER (WHERE status = 'TODO')::int as todo,
                COUNT(*) FILTER (WHERE status = 'IN_PROGRESS')::int as in_progress,
                COUNT(*) FILTER (WHERE status = 'DONE')::int as done
            FROM tasks
        `;
        const result = await query(sql);
        return result.rows[0];
    }
}

module.exports = new TaskRepository();
```

### 8.5 Parameterized Queries (Prevent SQL Injection)

```javascript
// ❌ BAD - SQL Injection vulnerable
const badQuery = `SELECT * FROM users WHERE name = '${userInput}'`;

// ✅ GOOD - Parameterized query
const goodQuery = await pool.query(
    'SELECT * FROM users WHERE name = $1',
    [userInput]
);

// ✅ GOOD - Multiple parameters
const result = await pool.query(
    'SELECT * FROM tasks WHERE status = $1 AND priority = $2',
    ['TODO', 'HIGH']
);

// ✅ GOOD - Named parameters (not supported directly, but can simulate)
const params = {
    status: 'TODO',
    priority: 'HIGH'
};
const query = 'SELECT * FROM tasks WHERE status = $1 AND priority = $2';
const result = await pool.query(query, [params.status, params.priority]);
```

---

## 9. Connection Pooling

### 9.1 ทำไมต้องใช้ Connection Pool?

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Connection Pooling                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Without Pool:                     With Pool:                     │
│   ─────────────                     ──────────                     │
│                                                                     │
│   Request 1 ─► Connect ─► Query ─► Disconnect                      │
│   Request 2 ─► Connect ─► Query ─► Disconnect                      │
│   Request 3 ─► Connect ─► Query ─► Disconnect                      │
│                                                                     │
│   ❌ Connect/Disconnect overhead    ┌───────────────┐              │
│   ❌ Resource waste                 │  Connection   │              │
│   ❌ Limited scalability            │     Pool      │              │
│                                     │  ┌─┐ ┌─┐ ┌─┐ │              │
│                                     │  │1│ │2│ │3│ │  Reuse!     │
│                                     │  └─┘ └─┘ └─┘ │              │
│                                     └───────┬───────┘              │
│                                             │                       │
│   Request 1 ─────────────────────────►  Use conn 1                 │
│   Request 2 ─────────────────────────►  Use conn 2                 │
│   Request 3 ─────────────────────────►  Use conn 3                 │
│                                                                     │
│   ✅ Fast (reuse connections)                                       │
│   ✅ Efficient (limit connections)                                  │
│   ✅ Scalable                                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.2 Pool Configuration Options

```javascript
const pool = new Pool({
    // Connection settings
    host: 'localhost',
    port: 5432,
    database: 'taskboard_db',
    user: 'taskboard',
    password: 'taskboard123',
    
    // Pool settings
    max: 20,                      // Max connections in pool
    min: 5,                       // Min connections to maintain
    idleTimeoutMillis: 30000,     // Close idle connections after 30s
    connectionTimeoutMillis: 5000, // Error if can't connect in 5s
    maxUses: 7500,                // Close after N queries
    
    // Statement timeout
    statement_timeout: 30000,     // Query timeout 30s
    
    // SSL
    ssl: {
        rejectUnauthorized: false
    }
});
```

### 9.3 External Pool: PgBouncer

```bash
# ติดตั้ง PgBouncer
sudo apt install -y pgbouncer

# Configuration
sudo nano /etc/pgbouncer/pgbouncer.ini
```

```ini
# /etc/pgbouncer/pgbouncer.ini

[databases]
taskboard_db = host=127.0.0.1 port=5432 dbname=taskboard_db

[pgbouncer]
listen_addr = 127.0.0.1
listen_port = 6432
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
```

---

## 10. Backup และ Restore

### 10.1 pg_dump (Backup)

```bash
# ═══════════════════════════════════════════════════════
# Backup Single Database
# ═══════════════════════════════════════════════════════

# Plain SQL format
pg_dump -h localhost -U taskboard -d taskboard_db > backup.sql

# Custom format (recommended)
pg_dump -h localhost -U taskboard -d taskboard_db -Fc > backup.dump

# With compression
pg_dump -h localhost -U taskboard -d taskboard_db -Fc -Z9 > backup.dump.gz

# Schema only
pg_dump -h localhost -U taskboard -d taskboard_db --schema-only > schema.sql

# Data only
pg_dump -h localhost -U taskboard -d taskboard_db --data-only > data.sql

# Specific tables
pg_dump -h localhost -U taskboard -d taskboard_db -t tasks > tasks.sql
```

### 10.2 pg_restore (Restore)

```bash
# ═══════════════════════════════════════════════════════
# Restore
# ═══════════════════════════════════════════════════════

# From SQL file
psql -h localhost -U taskboard -d taskboard_db < backup.sql

# From custom format
pg_restore -h localhost -U taskboard -d taskboard_db backup.dump

# Create database and restore
createdb -h localhost -U postgres new_taskboard_db
pg_restore -h localhost -U postgres -d new_taskboard_db backup.dump

# Restore specific tables
pg_restore -h localhost -U taskboard -d taskboard_db -t tasks backup.dump
```

### 10.3 Automated Backup Script

```bash
#!/bin/bash
# backup-postgres.sh

# Configuration
DB_HOST="localhost"
DB_NAME="taskboard_db"
DB_USER="taskboard"
BACKUP_DIR="/var/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup
export PGPASSWORD='taskboard123'
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME -Fc -Z9 > $BACKUP_DIR/${DB_NAME}_${DATE}.dump

# Check if backup succeeded
if [ $? -eq 0 ]; then
    echo "✅ Backup completed: ${DB_NAME}_${DATE}.dump"
else
    echo "❌ Backup failed"
    exit 1
fi

# Delete old backups
find $BACKUP_DIR -name "*.dump" -mtime +$RETENTION_DAYS -delete
echo "🧹 Old backups cleaned (older than $RETENTION_DAYS days)"

# List backups
echo "📁 Current backups:"
ls -lh $BACKUP_DIR
```

```bash
# Add to crontab
crontab -e
# Daily backup at 2 AM
0 2 * * * /path/to/backup-postgres.sh >> /var/log/pg_backup.log 2>&1
```

---

## 11. Performance Tuning

### 11.1 postgresql.conf Tuning

```ini
# ═══════════════════════════════════════════════════════
# MEMORY (Server with 4GB RAM)
# ═══════════════════════════════════════════════════════
shared_buffers = 1GB                    # 25% of RAM
effective_cache_size = 3GB              # 75% of RAM
work_mem = 16MB                         # Per operation
maintenance_work_mem = 256MB            # For VACUUM, INDEX

# ═══════════════════════════════════════════════════════
# CONNECTIONS
# ═══════════════════════════════════════════════════════
max_connections = 100

# ═══════════════════════════════════════════════════════
# WAL
# ═══════════════════════════════════════════════════════
wal_buffers = 64MB
checkpoint_completion_target = 0.9
max_wal_size = 2GB
min_wal_size = 1GB

# ═══════════════════════════════════════════════════════
# QUERY PLANNER
# ═══════════════════════════════════════════════════════
random_page_cost = 1.1                  # SSD (default 4.0 for HDD)
effective_io_concurrency = 200          # SSD (default 1 for HDD)
```

### 11.2 EXPLAIN ANALYZE

```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM tasks WHERE status = 'TODO';

-- Output:
-- Seq Scan on tasks  (cost=0.00..1.07 rows=1 width=100) (actual time=0.012..0.013 rows=3 loops=1)
--   Filter: (status = 'TODO'::text)
--   Rows Removed by Filter: 4
-- Planning Time: 0.051 ms
-- Execution Time: 0.024 ms

-- With more details
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) 
SELECT * FROM tasks WHERE status = 'TODO';
```

### 11.3 Index Optimization

```sql
-- Create indexes for common queries
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_created ON tasks(created_at DESC);

-- Composite index
CREATE INDEX idx_tasks_status_priority ON tasks(status, priority);

-- Partial index
CREATE INDEX idx_tasks_active ON tasks(created_at) 
WHERE status != 'DONE';

-- Check unused indexes
SELECT 
    schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0;

-- Check index size
SELECT 
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) as size
FROM pg_indexes
WHERE tablename = 'tasks';
```

### 11.4 VACUUM และ ANALYZE

```sql
-- Vacuum specific table
VACUUM tasks;

-- Vacuum and analyze
VACUUM ANALYZE tasks;

-- Full vacuum (locks table)
VACUUM FULL tasks;

-- Analyze (update statistics)
ANALYZE tasks;

-- Auto-vacuum settings (postgresql.conf)
-- autovacuum = on
-- autovacuum_vacuum_threshold = 50
-- autovacuum_analyze_threshold = 50
```

---

## 12. การทดสอบ PostgreSQL

### 12.1 Test Script

```bash
#!/bin/bash
# test-postgresql.sh

DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="taskboard_db"
DB_USER="taskboard"
export PGPASSWORD='taskboard123'

PASSED=0
FAILED=0

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "═══════════════════════════════════════════════════════"
echo "  🗄️ PostgreSQL Test Suite"
echo "═══════════════════════════════════════════════════════"
echo ""

test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "   ${GREEN}✓ PASSED${NC}: $2"
        ((PASSED++))
    else
        echo -e "   ${RED}✗ FAILED${NC}: $2"
        ((FAILED++))
    fi
}

# Test 1: Service running
echo "1. PostgreSQL Service"
systemctl is-active --quiet postgresql
test_result $? "PostgreSQL is running"

# Test 2: Port open
echo ""
echo "2. Port 5432"
nc -z $DB_HOST $DB_PORT 2>/dev/null
test_result $? "Port 5432 is open"

# Test 3: Connection
echo ""
echo "3. Database Connection"
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "SELECT 1" > /dev/null 2>&1
test_result $? "Can connect to database"

# Test 4: Database exists
echo ""
echo "4. Database Exists"
psql -h $DB_HOST -U $DB_USER -d postgres -c "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1
test_result $? "Database '$DB_NAME' exists"

# Test 5: Table exists
echo ""
echo "5. Tasks Table"
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "\d tasks" > /dev/null 2>&1
test_result $? "Table 'tasks' exists"

# Test 6: CRUD - Create
echo ""
echo "6. CRUD - Create"
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "INSERT INTO tasks (title, status, priority) VALUES ('Test Task', 'TODO', 'LOW') RETURNING id" > /dev/null 2>&1
test_result $? "Can INSERT into tasks"

# Test 7: CRUD - Read
echo ""
echo "7. CRUD - Read"
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "SELECT * FROM tasks WHERE title = 'Test Task'" | grep -q "Test Task"
test_result $? "Can SELECT from tasks"

# Test 8: CRUD - Update
echo ""
echo "8. CRUD - Update"
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "UPDATE tasks SET status = 'DONE' WHERE title = 'Test Task'" > /dev/null 2>&1
test_result $? "Can UPDATE tasks"

# Test 9: CRUD - Delete
echo ""
echo "9. CRUD - Delete"
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "DELETE FROM tasks WHERE title = 'Test Task'" > /dev/null 2>&1
test_result $? "Can DELETE from tasks"

# Test 10: Version
echo ""
echo "10. PostgreSQL Version"
VERSION=$(psql -h $DB_HOST -U $DB_USER -d $DB_NAME -t -c "SELECT version()" 2>/dev/null)
if [ -n "$VERSION" ]; then
    test_result 0 "Version: $(echo $VERSION | cut -d' ' -f1-2)"
else
    test_result 1 "Cannot get version"
fi

# Summary
echo ""
echo "═══════════════════════════════════════════════════════"
echo -e "  Results: ${GREEN}$PASSED passed${NC}, ${RED}$FAILED failed${NC}"
echo "═══════════════════════════════════════════════════════"
```

### 12.2 Test from Node.js

```javascript
// test-db.js
const { pool, healthCheck, closePool } = require('./src/config/database');

async function runTests() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  🗄️ PostgreSQL Node.js Test');
    console.log('═══════════════════════════════════════════════════════');
    
    try {
        // Test 1: Health check
        console.log('\n1. Health Check');
        const health = await healthCheck();
        console.log('   Status:', health.status);
        console.log('   Database:', health.database);
        console.log('   Pool:', health.pool);
        
        // Test 2: Query
        console.log('\n2. Simple Query');
        const result = await pool.query('SELECT NOW() as time');
        console.log('   Time:', result.rows[0].time);
        
        // Test 3: Parameterized query
        console.log('\n3. Parameterized Query');
        const tasks = await pool.query(
            'SELECT COUNT(*) as count FROM tasks WHERE status = $1',
            ['TODO']
        );
        console.log('   TODO tasks:', tasks.rows[0].count);
        
        // Test 4: Transaction
        console.log('\n4. Transaction');
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(
                'INSERT INTO tasks (title, status, priority) VALUES ($1, $2, $3)',
                ['Test Transaction', 'TODO', 'LOW']
            );
            await client.query('ROLLBACK'); // Rollback test data
            console.log('   Transaction: OK (rolled back)');
        } finally {
            client.release();
        }
        
        console.log('\n✅ All tests passed!');
        
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
    } finally {
        await closePool();
    }
}

runTests();
```

---

## 13. Docker PostgreSQL

### 13.1 Basic Docker Run

```bash
# Run PostgreSQL container
docker run -d \
    --name postgres \
    -e POSTGRES_DB=taskboard_db \
    -e POSTGRES_USER=taskboard \
    -e POSTGRES_PASSWORD=taskboard123 \
    -p 5432:5432 \
    -v postgres_data:/var/lib/postgresql/data \
    postgres:16-alpine

# Connect
docker exec -it postgres psql -U taskboard -d taskboard_db
```

### 13.2 Docker Compose

```yaml
# docker-compose.yml

version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: taskboard-postgres
    environment:
      POSTGRES_DB: taskboard_db
      POSTGRES_USER: taskboard
      POSTGRES_PASSWORD: taskboard123
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U taskboard -d taskboard_db"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  postgres_data:
```

### 13.3 Custom Dockerfile

```dockerfile
# Dockerfile.postgres

FROM postgres:16-alpine

# Set locale
RUN localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

# Copy initialization scripts
COPY ./database/init.sql /docker-entrypoint-initdb.d/

# Custom configuration
COPY ./postgres/postgresql.conf /etc/postgresql/postgresql.conf

# Health check
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB
```

---

## 14. แก้ปัญหาที่พบบ่อย

### 14.1 Connection Refused

```bash
# ตรวจสอบ service
sudo systemctl status postgresql

# ตรวจสอบ port
sudo ss -tlnp | grep 5432

# ตรวจสอบ listen_addresses ใน postgresql.conf
# listen_addresses = 'localhost' หรือ '*'

# Restart
sudo systemctl restart postgresql
```

### 14.2 Authentication Failed

```bash
# ตรวจสอบ pg_hba.conf
sudo cat /etc/postgresql/16/main/pg_hba.conf

# Reset password
sudo -u postgres psql
ALTER USER taskboard WITH PASSWORD 'newpassword';
\q

# Reload config
sudo systemctl reload postgresql
```

### 14.3 Permission Denied

```sql
-- ให้สิทธิ์
GRANT ALL PRIVILEGES ON DATABASE taskboard_db TO taskboard;
GRANT ALL ON SCHEMA public TO taskboard;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taskboard;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taskboard;
```

### 14.4 Too Many Connections

```sql
-- ดู current connections
SELECT count(*) FROM pg_stat_activity;

-- ดู max connections
SHOW max_connections;

-- Kill idle connections
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE state = 'idle' 
AND query_start < now() - interval '1 hour';
```

### 14.5 Slow Queries

```sql
-- ดู slow queries
SELECT 
    pid,
    now() - pg_stat_activity.query_start AS duration,
    query,
    state
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';

-- Kill slow query
SELECT pg_terminate_backend(pid);

-- ดู query plan
EXPLAIN ANALYZE SELECT * FROM tasks WHERE status = 'TODO';
```

---

## 📚 Quick Reference

```
┌─────────────────────────────────────────────────────────────────────┐
│                  POSTGRESQL QUICK REFERENCE                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📁 Files:                                                          │
│  /etc/postgresql/16/main/postgresql.conf  # Main config            │
│  /etc/postgresql/16/main/pg_hba.conf      # Authentication         │
│                                                                     │
│  🔧 Commands:                                                       │
│  sudo -u postgres psql                    # Connect as postgres    │
│  psql -h host -U user -d dbname           # Connect                │
│  sudo systemctl reload postgresql         # Reload config          │
│                                                                     │
│  📝 psql Commands:                                                  │
│  \l          # List databases                                      │
│  \c dbname   # Connect to database                                 │
│  \dt         # List tables                                         │
│  \d table    # Describe table                                      │
│  \du         # List users                                          │
│  \q          # Quit                                                │
│                                                                     │
│  👤 User Management:                                                │
│  CREATE USER name WITH PASSWORD 'pass';                            │
│  CREATE DATABASE db OWNER user;                                    │
│  GRANT ALL ON DATABASE db TO user;                                 │
│                                                                     │
│  💾 Backup:                                                         │
│  pg_dump -Fc dbname > backup.dump                                  │
│  pg_restore -d dbname backup.dump                                  │
│                                                                     │
│  🔌 Node.js:                                                        │
│  const { Pool } = require('pg');                                   │
│  const pool = new Pool({ host, port, database, user, password });  │
│  const result = await pool.query('SELECT $1', [param]);            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

*ENGSE207 - Software Architecture*  
*เอกสารประกอบ: PostgreSQL Database*
