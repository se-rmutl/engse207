# 🌐 คู่มือ Nginx Web Server ฉบับสมบูรณ์
## สำหรับ ENGSE207 Software Architecture

**ระยะเวลาศึกษา:** 60-90 นาที | **ระดับ:** เริ่มต้น-กลาง

---

## 📋 สารบัญ

1. [Nginx คืออะไร?](#1-nginx-คืออะไร)
2. [การติดตั้ง Nginx](#2-การติดตั้ง-nginx)
3. [โครงสร้างและ Configuration พื้นฐาน](#3-โครงสร้างและ-configuration-พื้นฐาน)
4. [การ Serve Static Files](#4-การ-serve-static-files)
5. [HTTPS และ SSL/TLS](#5-https-และ-ssltls)
6. [Reverse Proxy](#6-reverse-proxy)
7. [Load Balancing](#7-load-balancing)
8. [Configuration สำหรับ Week 6-7](#8-configuration-สำหรับ-week-6-7)
9. [Performance Tuning](#9-performance-tuning)
10. [Security Best Practices](#10-security-best-practices)
11. [การทดสอบ Nginx](#11-การทดสอบ-nginx)
12. [แก้ปัญหาที่พบบ่อย](#12-แก้ปัญหาที่พบบ่อย)

---

## 1. Nginx คืออะไร?

### 1.1 คำจำกัดความ

**Nginx** (อ่านว่า "Engine-X") คือ High-performance Web Server และ Reverse Proxy Server ที่ออกแบบมาเพื่อรองรับ concurrent connections จำนวนมาก

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Nginx Overview                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Nginx สามารถทำหน้าที่เป็น:                                         │
│                                                                     │
│   1. 🌐 Web Server                                                  │
│      ├── Serve static files (HTML, CSS, JS, Images)                │
│      └── High performance, low memory                              │
│                                                                     │
│   2. 🔄 Reverse Proxy                                               │
│      ├── Forward requests to backend servers                       │
│      ├── SSL termination                                           │
│      └── Hide backend infrastructure                               │
│                                                                     │
│   3. ⚖️ Load Balancer                                               │
│      ├── Distribute traffic across servers                         │
│      ├── Health checks                                             │
│      └── Session persistence                                       │
│                                                                     │
│   4. 📮 Mail Proxy                                                  │
│      └── IMAP, POP3, SMTP proxy                                    │
│                                                                     │
│   5. 🎥 Media Streaming                                             │
│      └── HLS, RTMP streaming                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Nginx vs Apache

| Feature | Nginx | Apache |
|---------|-------|--------|
| **Architecture** | Event-driven, Async | Process/Thread-based |
| **Concurrent Connections** | ✅ สูงมาก (10K+) | ⚠️ จำกัด |
| **Memory Usage** | ✅ ต่ำ | ❌ สูง |
| **Static Content** | ✅ เร็วมาก | ⚠️ ปานกลาง |
| **Dynamic Content** | ต้องใช้ proxy | ✅ mod_php |
| **Configuration** | Single file | .htaccess |
| **Flexibility** | Reverse proxy เก่ง | Module system เยอะ |

### 1.3 Nginx Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Nginx Process Model                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                    Master Process                            │  │
│   │  • อ่าน configuration                                        │  │
│   │  • Bind ports (80, 443)                                      │  │
│   │  • จัดการ Worker processes                                   │  │
│   └─────────────────────┬───────────────────────────────────────┘  │
│                         │                                          │
│           ┌─────────────┼─────────────┐                           │
│           │             │             │                           │
│           ▼             ▼             ▼                           │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                 │
│   │  Worker 1   │ │  Worker 2   │ │  Worker 3   │  ...           │
│   │             │ │             │ │             │                 │
│   │ Event Loop  │ │ Event Loop  │ │ Event Loop  │                 │
│   │             │ │             │ │             │                 │
│   │ [conn][conn]│ │ [conn][conn]│ │ [conn][conn]│                 │
│   │ [conn][conn]│ │ [conn][conn]│ │ [conn][conn]│                 │
│   └─────────────┘ └─────────────┘ └─────────────┘                 │
│                                                                     │
│   แต่ละ Worker รองรับ connections หลายพันพร้อมกัน                   │
│   (Event-driven, Non-blocking I/O)                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.4 Use Cases ใน Week 6-7

| Week | Use Case | Nginx Role |
|------|----------|------------|
| **Week 6 v1** | Single VM N-Tier | Web Server + Reverse Proxy + SSL |
| **Week 6 v2** | Multi-VM N-Tier | Dedicated Web Tier + Reverse Proxy |
| **Week 7** | Docker N-Tier | Container Proxy + Load Balancer |

---

## 2. การติดตั้ง Nginx

### 2.1 ติดตั้งบน Ubuntu/Debian

```bash
# Update packages
sudo apt update

# ติดตั้ง Nginx
sudo apt install -y nginx

# ตรวจสอบ version
nginx -v
# nginx version: nginx/1.24.0 (Ubuntu)

# ตรวจสอบ status
sudo systemctl status nginx

# Enable auto-start
sudo systemctl enable nginx
```

### 2.2 ติดตั้งบน CentOS/RHEL

```bash
# ติดตั้ง EPEL repository
sudo yum install -y epel-release

# ติดตั้ง Nginx
sudo yum install -y nginx

# Start และ Enable
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2.3 ติดตั้งด้วย Docker

```bash
# Pull image
docker pull nginx:alpine

# Run container
docker run -d \
    --name nginx \
    -p 80:80 \
    -p 443:443 \
    -v /path/to/html:/usr/share/nginx/html:ro \
    -v /path/to/nginx.conf:/etc/nginx/nginx.conf:ro \
    nginx:alpine
```

### 2.4 คำสั่งพื้นฐาน

```bash
# ═══════════════════════════════════════════════════════
#                 NGINX COMMANDS
# ═══════════════════════════════════════════════════════

# ─────────── Service Management ───────────
sudo systemctl start nginx      # Start
sudo systemctl stop nginx       # Stop
sudo systemctl restart nginx    # Restart (มี downtime)
sudo systemctl reload nginx     # Reload config (ไม่มี downtime)
sudo systemctl status nginx     # Check status

# ─────────── Configuration ───────────
sudo nginx -t                   # Test configuration
sudo nginx -T                   # Test และแสดง config ทั้งหมด
sudo nginx -s reload            # Reload (alternative)
sudo nginx -s stop              # Stop (alternative)
sudo nginx -s quit              # Graceful stop

# ─────────── Logs ───────────
sudo tail -f /var/log/nginx/access.log    # Access logs
sudo tail -f /var/log/nginx/error.log     # Error logs

# ─────────── Info ───────────
nginx -v                        # Version
nginx -V                        # Version + compile options
```

---

## 3. โครงสร้างและ Configuration พื้นฐาน

### 3.1 โครงสร้างไฟล์

```
/etc/nginx/
├── nginx.conf                 # Main configuration
├── mime.types                 # MIME type definitions
├── conf.d/                    # Additional configs (*.conf)
├── sites-available/           # Available site configs
│   ├── default
│   └── taskboard              # Custom site
├── sites-enabled/             # Enabled sites (symlinks)
│   └── taskboard -> ../sites-available/taskboard
├── snippets/                  # Reusable config snippets
│   ├── ssl-params.conf
│   └── proxy-params.conf
├── modules-available/         # Available modules
├── modules-enabled/           # Enabled modules
└── ssl/                       # SSL certificates (custom)
    ├── taskboard.crt
    └── taskboard.key

/var/www/                      # Default web root
├── html/                      # Default site
└── taskboard/                 # Custom site
    ├── index.html
    ├── css/
    └── js/

/var/log/nginx/                # Logs
├── access.log
├── error.log
├── taskboard_access.log       # Custom site logs
└── taskboard_error.log
```

### 3.2 โครงสร้าง nginx.conf

```nginx
# /etc/nginx/nginx.conf

# ═══════════════════════════════════════════════════════
# MAIN CONTEXT (Global settings)
# ═══════════════════════════════════════════════════════
user www-data;                          # User ที่รัน worker
worker_processes auto;                   # จำนวน workers (auto = ตาม CPU)
pid /run/nginx.pid;                     # PID file
include /etc/nginx/modules-enabled/*.conf;  # Load modules

# ═══════════════════════════════════════════════════════
# EVENTS CONTEXT (Connection handling)
# ═══════════════════════════════════════════════════════
events {
    worker_connections 1024;            # Max connections per worker
    multi_accept on;                    # Accept multiple connections
    use epoll;                          # Event method (Linux)
}

# ═══════════════════════════════════════════════════════
# HTTP CONTEXT (Web server settings)
# ═══════════════════════════════════════════════════════
http {
    # ─────────── Basic Settings ───────────
    sendfile on;                        # Efficient file transfer
    tcp_nopush on;                      # Optimize TCP packets
    tcp_nodelay on;                     # Don't delay small packets
    keepalive_timeout 65;               # Keep connection alive
    types_hash_max_size 2048;           # MIME types hash size

    # ─────────── MIME Types ───────────
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # ─────────── Logging ───────────
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # ─────────── Gzip Compression ───────────
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript 
               text/xml application/xml application/xml+rss text/javascript;

    # ─────────── Include Site Configs ───────────
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

### 3.3 Server Block (Virtual Host)

```nginx
# /etc/nginx/sites-available/taskboard

# ═══════════════════════════════════════════════════════
# SERVER BLOCK - Virtual Host Configuration
# ═══════════════════════════════════════════════════════
server {
    # ─────────── Listen ───────────
    listen 80;                          # HTTP port
    listen [::]:80;                     # IPv6
    
    # ─────────── Server Name ───────────
    server_name taskboard.local www.taskboard.local;
    
    # ─────────── Root & Index ───────────
    root /var/www/taskboard;
    index index.html index.htm;
    
    # ─────────── Logging ───────────
    access_log /var/log/nginx/taskboard_access.log;
    error_log /var/log/nginx/taskboard_error.log;
    
    # ─────────── Locations ───────────
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Static assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
```

### 3.4 Enable Site

```bash
# สร้าง symlink
sudo ln -s /etc/nginx/sites-available/taskboard /etc/nginx/sites-enabled/

# ลบ default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload
sudo systemctl reload nginx
```

---

## 4. การ Serve Static Files

### 4.1 Basic Static File Server

```nginx
server {
    listen 80;
    server_name static.example.com;
    
    root /var/www/static;
    
    # Default file serving
    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 4.2 Optimized Static File Configuration

```nginx
server {
    listen 80;
    server_name taskboard.local;
    
    root /var/www/taskboard;
    index index.html;
    
    # ─────────── HTML Files ───────────
    location / {
        try_files $uri $uri/ /index.html;
        
        # Don't cache HTML (SPA routing)
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
    
    # ─────────── CSS & JavaScript ───────────
    location ~* \.(css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        
        # Gzip
        gzip_static on;
    }
    
    # ─────────── Images ───────────
    location ~* \.(png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        
        # Don't log image requests
        access_log off;
    }
    
    # ─────────── Fonts ───────────
    location ~* \.(woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Access-Control-Allow-Origin "*";
    }
    
    # ─────────── Error Pages ───────────
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

### 4.3 SPA (Single Page Application) Configuration

```nginx
server {
    listen 80;
    server_name app.example.com;
    
    root /var/www/spa;
    index index.html;
    
    # SPA: ทุก route redirect ไป index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy (ถ้ามี)
    location /api/ {
        proxy_pass http://localhost:3000;
    }
}
```

---

## 5. HTTPS และ SSL/TLS

### 5.1 Basic HTTPS Configuration

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name taskboard.local;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name taskboard.local;
    
    # ─────────── SSL Certificate ───────────
    ssl_certificate /etc/nginx/ssl/taskboard.crt;
    ssl_certificate_key /etc/nginx/ssl/taskboard.key;
    
    # ─────────── SSL Settings ───────────
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    
    # ... rest of configuration
}
```

### 5.2 Complete SSL Configuration (Production-Ready)

```nginx
# /etc/nginx/snippets/ssl-params.conf
# Reusable SSL parameters

# ─────────── Protocol ───────────
ssl_protocols TLSv1.2 TLSv1.3;

# ─────────── Ciphers ───────────
ssl_prefer_server_ciphers on;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

# ─────────── Diffie-Hellman ───────────
ssl_dhparam /etc/nginx/ssl/dhparam.pem;

# ─────────── Session ───────────
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_session_tickets off;

# ─────────── OCSP Stapling ───────────
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;

# ─────────── Security Headers ───────────
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;
```

```nginx
# /etc/nginx/sites-available/taskboard-ssl

server {
    listen 80;
    server_name taskboard.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name taskboard.local;
    
    # SSL Certificate
    ssl_certificate /etc/nginx/ssl/taskboard.crt;
    ssl_certificate_key /etc/nginx/ssl/taskboard.key;
    
    # Include SSL params
    include snippets/ssl-params.conf;
    
    root /var/www/taskboard;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:3000;
        include snippets/proxy-params.conf;
    }
}
```

### 5.3 Generate DH Parameters

```bash
# สร้าง Diffie-Hellman parameters (ใช้เวลานาน)
sudo openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048
```

### 5.4 Let's Encrypt (Production)

```bash
# ติดตั้ง Certbot
sudo apt install -y certbot python3-certbot-nginx

# ขอ certificate
sudo certbot --nginx -d example.com -d www.example.com

# Auto-renewal (crontab)
sudo crontab -e
# เพิ่ม: 0 12 * * * /usr/bin/certbot renew --quiet

# Test renewal
sudo certbot renew --dry-run
```

---

## 6. Reverse Proxy

### 6.1 Reverse Proxy คืออะไร?

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Reverse Proxy                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Without Reverse Proxy:           With Reverse Proxy (Nginx):     │
│   ──────────────────────           ────────────────────────────    │
│                                                                     │
│   Client ─────────► Backend        Client ─────► Nginx ─────► Backend│
│   (Direct connection)                     (Proxy connection)        │
│                                                                     │
│   ❌ Backend exposed                ✅ Backend hidden               │
│   ❌ No SSL termination            ✅ SSL termination              │
│   ❌ No caching                    ✅ Response caching             │
│   ❌ No load balancing             ✅ Load balancing               │
│                                                                     │
│   ┌─────────┐                      ┌─────────┐     ┌─────────┐    │
│   │ Client  │──────────────────────│ Backend │     │ Backend │    │
│   └─────────┘        :3000         │  :3000  │     │  :3000  │    │
│                                    └─────────┘     └─────────┘    │
│                                          ▲               ▲         │
│                                          │               │         │
│                                    ┌─────┴───────────────┴─────┐  │
│   ┌─────────┐                      │         Nginx            │  │
│   │ Client  │─────────────────────►│    (Reverse Proxy)       │  │
│   └─────────┘     :443 (HTTPS)     │    SSL Termination       │  │
│                                    │    Load Balancing        │  │
│                                    └───────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Basic Reverse Proxy

```nginx
server {
    listen 80;
    server_name api.example.com;
    
    location / {
        proxy_pass http://localhost:3000;
    }
}
```

### 6.3 Complete Reverse Proxy Configuration

```nginx
# /etc/nginx/snippets/proxy-params.conf
# Reusable proxy parameters

proxy_http_version 1.1;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Port $server_port;

# WebSocket support
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";

# Timeouts
proxy_connect_timeout 60s;
proxy_send_timeout 60s;
proxy_read_timeout 60s;

# Buffers
proxy_buffer_size 128k;
proxy_buffers 4 256k;
proxy_busy_buffers_size 256k;
```

```nginx
# /etc/nginx/sites-available/taskboard

server {
    listen 443 ssl http2;
    server_name taskboard.local;
    
    ssl_certificate /etc/nginx/ssl/taskboard.crt;
    ssl_certificate_key /etc/nginx/ssl/taskboard.key;
    
    root /var/www/taskboard;
    
    # ─────────── Static Files ───────────
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # ─────────── API Reverse Proxy ───────────
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        include snippets/proxy-params.conf;
    }
    
    # ─────────── WebSocket (if needed) ───────────
    location /ws/ {
        proxy_pass http://127.0.0.1:3000;
        include snippets/proxy-params.conf;
        
        # WebSocket specific
        proxy_read_timeout 86400;
    }
}
```

### 6.4 Proxy to External Service

```nginx
# Proxy to external API
location /external-api/ {
    proxy_pass https://api.external-service.com/;
    proxy_ssl_server_name on;
    
    # Remove /external-api prefix
    rewrite ^/external-api/(.*) /$1 break;
    
    # Add authentication
    proxy_set_header Authorization "Bearer YOUR_API_KEY";
}
```

### 6.5 Proxy Headers Explained

| Header | Purpose | Example Value |
|--------|---------|---------------|
| `Host` | Original host | taskboard.local |
| `X-Real-IP` | Client's IP | 192.168.1.100 |
| `X-Forwarded-For` | Proxy chain IPs | 192.168.1.100, 10.0.0.1 |
| `X-Forwarded-Proto` | Original protocol | https |
| `X-Forwarded-Host` | Original host header | taskboard.local |

---

## 7. Load Balancing

### 7.1 Load Balancing คืออะไร?

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Load Balancing                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                        ┌─────────────┐                             │
│                        │   Client    │                             │
│                        └──────┬──────┘                             │
│                               │                                     │
│                               ▼                                     │
│                    ┌───────────────────┐                           │
│                    │      Nginx        │                           │
│                    │  (Load Balancer)  │                           │
│                    └─────────┬─────────┘                           │
│                              │                                      │
│              ┌───────────────┼───────────────┐                     │
│              │               │               │                      │
│              ▼               ▼               ▼                      │
│       ┌───────────┐   ┌───────────┐   ┌───────────┐               │
│       │ Backend 1 │   │ Backend 2 │   │ Backend 3 │               │
│       │  :3001    │   │  :3002    │   │  :3003    │               │
│       └───────────┘   └───────────┘   └───────────┘               │
│                                                                     │
│   Load Balancing Methods:                                          │
│   • Round Robin (default) - วนรอบ                                  │
│   • Least Connections - เลือก server ที่ connections น้อยสุด       │
│   • IP Hash - ยึดติด client IP กับ server                         │
│   • Weighted - กำหนดน้ำหนัก                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 7.2 Upstream Configuration

```nginx
# /etc/nginx/conf.d/upstream.conf

# ─────────── Round Robin (Default) ───────────
upstream backend_servers {
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

# ─────────── Weighted Round Robin ───────────
upstream backend_weighted {
    server 127.0.0.1:3001 weight=5;    # 50% traffic
    server 127.0.0.1:3002 weight=3;    # 30% traffic
    server 127.0.0.1:3003 weight=2;    # 20% traffic
}

# ─────────── Least Connections ───────────
upstream backend_least_conn {
    least_conn;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

# ─────────── IP Hash (Session Persistence) ───────────
upstream backend_ip_hash {
    ip_hash;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
    server 127.0.0.1:3003;
}

# ─────────── With Health Checks ───────────
upstream backend_health {
    server 127.0.0.1:3001 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:3002 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:3003 backup;      # Backup server
}
```

### 7.3 Server Directive Options

| Option | Description | Example |
|--------|-------------|---------|
| `weight=n` | Server weight | `weight=5` |
| `max_fails=n` | Max failures before marking down | `max_fails=3` |
| `fail_timeout=n` | Timeout for failures | `fail_timeout=30s` |
| `backup` | Backup server (used when others fail) | `backup` |
| `down` | Mark server as down | `down` |
| `max_conns=n` | Max connections | `max_conns=100` |

### 7.4 Load Balancer Configuration

```nginx
# /etc/nginx/sites-available/taskboard-lb

upstream taskboard_api {
    least_conn;
    
    server 127.0.0.1:3001 weight=5 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:3002 weight=5 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:3003 weight=2 backup;
    
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name taskboard.local;
    
    ssl_certificate /etc/nginx/ssl/taskboard.crt;
    ssl_certificate_key /etc/nginx/ssl/taskboard.key;
    
    root /var/www/taskboard;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://taskboard_api;
        include snippets/proxy-params.conf;
        
        # Keep alive connections to upstream
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }
}
```

### 7.5 Load Balancing Methods Comparison

| Method | Use Case | Pros | Cons |
|--------|----------|------|------|
| **Round Robin** | Equal servers | Simple, fair | ไม่คำนึง load |
| **Weighted** | Servers ไม่เท่ากัน | Flexible | ต้อง config manual |
| **Least Conn** | Long-running requests | Even load | Overhead tracking |
| **IP Hash** | Session persistence | Sticky sessions | Uneven distribution |

---

## 8. Configuration สำหรับ Week 6-7

### 8.1 Week 6 Version 1: Single VM N-Tier

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Week 6 V1 Architecture                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                        Single VM                                    │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                                                             │  │
│   │   Browser ──► Nginx (:443) ──► Node.js (:3000) ──► PostgreSQL │
│   │                 │                                           │  │
│   │                 ├── SSL Termination                         │  │
│   │                 ├── Static Files                            │  │
│   │                 └── Reverse Proxy /api/                     │  │
│   │                                                             │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

```nginx
# /etc/nginx/sites-available/week6-v1

# HTTP → HTTPS Redirect
server {
    listen 80;
    listen [::]:80;
    server_name taskboard.local;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name taskboard.local;

    # ═══════════════════════════════════════════
    # SSL Configuration
    # ═══════════════════════════════════════════
    ssl_certificate /etc/nginx/ssl/taskboard.crt;
    ssl_certificate_key /etc/nginx/ssl/taskboard.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # ═══════════════════════════════════════════
    # Security Headers
    # ═══════════════════════════════════════════
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000" always;

    # ═══════════════════════════════════════════
    # Root & Logging
    # ═══════════════════════════════════════════
    root /var/www/taskboard;
    index index.html;
    
    access_log /var/log/nginx/taskboard_access.log;
    error_log /var/log/nginx/taskboard_error.log;

    # ═══════════════════════════════════════════
    # Gzip Compression
    # ═══════════════════════════════════════════
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css application/json application/javascript;

    # ═══════════════════════════════════════════
    # Static Files
    # ═══════════════════════════════════════════
    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # ═══════════════════════════════════════════
    # API Reverse Proxy (to Node.js)
    # ═══════════════════════════════════════════
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
    }

    # ═══════════════════════════════════════════
    # Health Check Endpoint
    # ═══════════════════════════════════════════
    location /nginx-health {
        access_log off;
        return 200 'OK';
        add_header Content-Type text/plain;
    }
}
```

### 8.2 Week 6 Version 2: Multi-VM N-Tier

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Week 6 V2 Architecture                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   VM1 (Web Tier)         VM2 (App Tier)        VM3 (Data Tier)    │
│   ┌─────────────┐        ┌─────────────┐       ┌─────────────┐    │
│   │   Nginx     │───────►│   Node.js   │──────►│ PostgreSQL  │    │
│   │   :443      │        │   :3000     │       │   :5432     │    │
│   │ 10.0.0.10   │        │ 10.0.0.20   │       │ 10.0.0.30   │    │
│   └─────────────┘        └─────────────┘       └─────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

```nginx
# /etc/nginx/sites-available/week6-v2 (on VM1: 10.0.0.10)

upstream app_server {
    server 10.0.0.20:3000;
    keepalive 32;
}

server {
    listen 80;
    server_name taskboard.local;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name taskboard.local;

    # SSL
    ssl_certificate /etc/nginx/ssl/taskboard.crt;
    ssl_certificate_key /etc/nginx/ssl/taskboard.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    root /var/www/taskboard;
    index index.html;

    # Static Files
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API Proxy to App Server (VM2)
    location /api/ {
        proxy_pass http://app_server;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Connection "";
        
        # Health check
        proxy_next_upstream error timeout http_500 http_502 http_503;
    }
}
```

### 8.3 Week 7: Docker N-Tier with Load Balancing

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Week 7 Architecture (Docker)                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                    Docker Network                            │  │
│   │                                                             │  │
│   │   Browser ──► Nginx ──┬──► Node.js (1) ──┐                 │  │
│   │               :443    │                   │                 │  │
│   │                       ├──► Node.js (2) ───┼──► PostgreSQL   │  │
│   │                       │                   │                 │  │
│   │                       └──► Node.js (3) ──┘                 │  │
│   │                                                             │  │
│   │               Load Balancer               Replicas          │  │
│   │                                                             │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

```nginx
# nginx/nginx.conf (for Docker)

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$upstream_addr" $upstream_response_time';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;

    # ═══════════════════════════════════════════
    # Upstream - Load Balancing to Node.js containers
    # ═══════════════════════════════════════════
    upstream api_servers {
        least_conn;
        
        # Docker service name resolution
        server api:3000 max_fails=3 fail_timeout=30s;
        
        # หรือถ้ามีหลาย replicas
        # server api_1:3000;
        # server api_2:3000;
        # server api_3:3000;
        
        keepalive 32;
    }

    # ═══════════════════════════════════════════
    # HTTP → HTTPS Redirect
    # ═══════════════════════════════════════════
    server {
        listen 80;
        server_name taskboard.local;
        return 301 https://$server_name$request_uri;
    }

    # ═══════════════════════════════════════════
    # HTTPS Server
    # ═══════════════════════════════════════════
    server {
        listen 443 ssl http2;
        server_name taskboard.local;

        # SSL
        ssl_certificate /etc/nginx/ssl/taskboard.crt;
        ssl_certificate_key /etc/nginx/ssl/taskboard.key;
        ssl_protocols TLSv1.2 TLSv1.3;

        # Gzip
        gzip on;
        gzip_types text/plain text/css application/json application/javascript;

        # Static Files
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # ═══════════════════════════════════════════
        # API Load Balancing
        # ═══════════════════════════════════════════
        location /api/ {
            proxy_pass http://api_servers;
            proxy_http_version 1.1;
            
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Connection "";
            
            # Load balancing settings
            proxy_next_upstream error timeout http_500 http_502 http_503;
            proxy_connect_timeout 5s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }

        # Health Check
        location /health {
            access_log off;
            return 200 'OK';
            add_header Content-Type text/plain;
        }
    }
}
```

### 8.4 Docker Compose with Nginx

```yaml
# docker-compose.yml

version: '3.8'

services:
  # ═══════════════════════════════════════════
  # Nginx (Web Tier + Load Balancer)
  # ═══════════════════════════════════════════
  nginx:
    image: nginx:alpine
    container_name: taskboard-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./public:/usr/share/nginx/html:ro
    depends_on:
      - api
    networks:
      - taskboard-network
    restart: unless-stopped

  # ═══════════════════════════════════════════
  # API (App Tier) - Multiple Replicas
  # ═══════════════════════════════════════════
  api:
    build: ./api
    # Scale with: docker-compose up -d --scale api=3
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=taskboard_db
      - DB_USER=taskboard
      - DB_PASSWORD=taskboard123
    depends_on:
      - postgres
    networks:
      - taskboard-network
    restart: unless-stopped

  # ═══════════════════════════════════════════
  # PostgreSQL (Data Tier)
  # ═══════════════════════════════════════════
  postgres:
    image: postgres:16-alpine
    container_name: taskboard-postgres
    environment:
      - POSTGRES_DB=taskboard_db
      - POSTGRES_USER=taskboard
      - POSTGRES_PASSWORD=taskboard123
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - taskboard-network
    restart: unless-stopped

networks:
  taskboard-network:
    driver: bridge

volumes:
  postgres_data:
```

---

## 9. Performance Tuning

### 9.1 Worker Configuration

```nginx
# /etc/nginx/nginx.conf

# Worker processes = CPU cores
worker_processes auto;

# Worker connections
events {
    worker_connections 4096;
    multi_accept on;
    use epoll;
}
```

### 9.2 Buffer Optimization

```nginx
http {
    # ─────────── Client Buffers ───────────
    client_body_buffer_size 10K;
    client_header_buffer_size 1k;
    client_max_body_size 10M;
    large_client_header_buffers 4 8k;
    
    # ─────────── Proxy Buffers ───────────
    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;
    proxy_temp_file_write_size 256k;
}
```

### 9.3 Caching

```nginx
http {
    # ─────────── Proxy Cache ───────────
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m 
                     max_size=1g inactive=60m use_temp_path=off;
    
    server {
        location /api/ {
            proxy_pass http://backend;
            
            # Enable caching
            proxy_cache api_cache;
            proxy_cache_valid 200 10m;
            proxy_cache_valid 404 1m;
            proxy_cache_use_stale error timeout http_500 http_502 http_503;
            proxy_cache_lock on;
            
            # Cache headers
            add_header X-Cache-Status $upstream_cache_status;
        }
    }
}
```

### 9.4 Connection Keep-Alive

```nginx
http {
    # Client keep-alive
    keepalive_timeout 65;
    keepalive_requests 100;
    
    # Upstream keep-alive
    upstream backend {
        server 127.0.0.1:3000;
        keepalive 32;
    }
    
    server {
        location /api/ {
            proxy_pass http://backend;
            proxy_http_version 1.1;
            proxy_set_header Connection "";
        }
    }
}
```

---

## 10. Security Best Practices

### 10.1 Security Configuration

```nginx
# /etc/nginx/snippets/security.conf

# ─────────── Hide Nginx Version ───────────
server_tokens off;

# ─────────── Security Headers ───────────
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self';" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# ─────────── Rate Limiting ───────────
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_conn_zone $binary_remote_addr zone=conn_limit:10m;
```

```nginx
server {
    include snippets/security.conf;
    
    # Rate limiting
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        limit_conn conn_limit 10;
        
        proxy_pass http://backend;
    }
    
    # Block bad bots
    if ($http_user_agent ~* (bot|crawler|spider)) {
        return 403;
    }
    
    # Deny hidden files
    location ~ /\. {
        deny all;
    }
    
    # Deny sensitive files
    location ~* \.(env|git|htaccess)$ {
        deny all;
    }
}
```

### 10.2 DDoS Protection

```nginx
http {
    # Limit connections
    limit_conn_zone $binary_remote_addr zone=conn_limit:10m;
    limit_req_zone $binary_remote_addr zone=req_limit:10m rate=5r/s;
    
    server {
        # Apply limits
        limit_conn conn_limit 10;
        limit_req zone=req_limit burst=10 nodelay;
        
        # Timeout settings
        client_body_timeout 10s;
        client_header_timeout 10s;
        send_timeout 10s;
    }
}
```

---

## 11. การทดสอบ Nginx

### 11.1 Test Configuration

```bash
# Test syntax
sudo nginx -t
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# Test and show full config
sudo nginx -T
```

### 11.2 Test Script

**สร้างไฟล์ `scripts/test-nginx.sh`:**

```bash
#!/bin/bash
# test-nginx.sh - Nginx Test Script

HOST="taskboard.local"
PASSED=0
FAILED=0

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "═══════════════════════════════════════════════════════"
echo "  🌐 Nginx Test Suite"
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

# Test 1: Nginx running
echo "1. Nginx Service"
systemctl is-active --quiet nginx
test_result $? "Nginx is running"

# Test 2: Port 80
echo ""
echo "2. Port 80 (HTTP)"
nc -z localhost 80 2>/dev/null
test_result $? "Port 80 is open"

# Test 3: Port 443
echo ""
echo "3. Port 443 (HTTPS)"
nc -z localhost 443 2>/dev/null
test_result $? "Port 443 is open"

# Test 4: HTTP Redirect
echo ""
echo "4. HTTP to HTTPS Redirect"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://$HOST 2>/dev/null)
[ "$HTTP_CODE" = "301" ]
test_result $? "HTTP redirects to HTTPS (got: $HTTP_CODE)"

# Test 5: HTTPS Response
echo ""
echo "5. HTTPS Response"
HTTPS_CODE=$(curl -sk -o /dev/null -w "%{http_code}" https://$HOST 2>/dev/null)
[ "$HTTPS_CODE" = "200" ]
test_result $? "HTTPS returns 200 (got: $HTTPS_CODE)"

# Test 6: SSL Certificate
echo ""
echo "6. SSL Certificate"
openssl s_client -connect $HOST:443 -servername $HOST </dev/null 2>/dev/null | grep -q "Verify return code: 0\|self-signed"
test_result $? "SSL certificate valid"

# Test 7: Static Files
echo ""
echo "7. Static Files"
curl -sk https://$HOST/index.html 2>/dev/null | grep -q "html"
test_result $? "Static files served"

# Test 8: API Proxy
echo ""
echo "8. API Reverse Proxy"
API_RESPONSE=$(curl -sk https://$HOST/api/health 2>/dev/null)
echo "$API_RESPONSE" | grep -q "success\|healthy"
test_result $? "API proxy works"

# Test 9: Gzip
echo ""
echo "9. Gzip Compression"
curl -skH "Accept-Encoding: gzip" -I https://$HOST 2>/dev/null | grep -qi "gzip"
test_result $? "Gzip enabled"

# Test 10: Security Headers
echo ""
echo "10. Security Headers"
curl -skI https://$HOST 2>/dev/null | grep -qi "X-Frame-Options"
test_result $? "Security headers present"

# Summary
echo ""
echo "═══════════════════════════════════════════════════════"
echo -e "  Results: ${GREEN}$PASSED passed${NC}, ${RED}$FAILED failed${NC}"
echo "═══════════════════════════════════════════════════════"
```

### 11.3 Load Testing

```bash
# Install Apache Bench
sudo apt install -y apache2-utils

# Basic load test
ab -n 1000 -c 100 https://taskboard.local/

# Test API endpoint
ab -n 1000 -c 50 -H "Content-Type: application/json" https://taskboard.local/api/tasks

# Output explained:
# Requests per second: Higher is better
# Time per request: Lower is better
# Failed requests: Should be 0
```

---

## 12. แก้ปัญหาที่พบบ่อย

### 12.1 502 Bad Gateway

```bash
# สาเหตุ: Backend ไม่ทำงาน
# ตรวจสอบ
pm2 status
curl http://localhost:3000/api/health

# แก้ไข
pm2 restart all
```

### 12.2 Permission Denied

```bash
# สาเหตุ: Nginx ไม่มีสิทธิ์อ่านไฟล์
# ตรวจสอบ
ls -la /var/www/taskboard/
ls -la /etc/nginx/ssl/

# แก้ไข
sudo chown -R www-data:www-data /var/www/taskboard/
sudo chmod 644 /etc/nginx/ssl/taskboard.crt
sudo chmod 600 /etc/nginx/ssl/taskboard.key
```

### 12.3 Address Already in Use

```bash
# ตรวจสอบว่า port ถูกใช้
sudo lsof -i :80
sudo lsof -i :443

# หยุด process ที่ใช้ port
sudo fuser -k 80/tcp
sudo fuser -k 443/tcp
```

### 12.4 Configuration Errors

```bash
# Test config
sudo nginx -t

# ดู error log
sudo tail -50 /var/log/nginx/error.log

# Common errors:
# - Missing semicolon ;
# - Unclosed brackets {}
# - Invalid directive
# - Duplicate server_name
```

---

## 📚 Quick Reference

```
┌─────────────────────────────────────────────────────────────────────┐
│                    NGINX QUICK REFERENCE                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📁 Files:                                                          │
│  /etc/nginx/nginx.conf           # Main config                     │
│  /etc/nginx/sites-available/     # Site configs                    │
│  /etc/nginx/sites-enabled/       # Enabled sites (symlinks)        │
│  /var/log/nginx/                 # Logs                            │
│                                                                     │
│  🔧 Commands:                                                       │
│  sudo nginx -t                   # Test config                     │
│  sudo systemctl reload nginx     # Reload (no downtime)            │
│  sudo systemctl restart nginx    # Restart                         │
│                                                                     │
│  📝 Basic Server Block:                                             │
│  server {                                                          │
│      listen 80;                                                    │
│      server_name example.com;                                      │
│      root /var/www/html;                                           │
│      location / { try_files $uri $uri/ =404; }                     │
│  }                                                                 │
│                                                                     │
│  🔄 Reverse Proxy:                                                  │
│  location /api/ {                                                  │
│      proxy_pass http://localhost:3000;                             │
│      proxy_set_header Host $host;                                  │
│      proxy_set_header X-Real-IP $remote_addr;                      │
│  }                                                                 │
│                                                                     │
│  ⚖️ Load Balancing:                                                 │
│  upstream backend {                                                │
│      least_conn;                                                   │
│      server 127.0.0.1:3001;                                        │
│      server 127.0.0.1:3002;                                        │
│  }                                                                 │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

*ENGSE207 - Software Architecture*  
*เอกสารประกอบ: Nginx Web Server*
