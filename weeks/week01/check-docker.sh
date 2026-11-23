#!/usr/bin/env bash
# ENGSE207 · T01 · ตรวจความพร้อมของ Docker
# วิธีใช้:  bash check-docker.sh
#   Windows: รันในเทอร์มินัล Ubuntu (WSL)   macOS: รันใน Terminal
# สคริปต์นี้อ่านค่าอย่างเดียว ไม่แก้ไขอะไรในเครื่อง (ยกเว้นรัน hello-world แบบ --rm)

set -u
pass=0
total=0

ok()   { total=$((total+1)); pass=$((pass+1)); printf '  [ OK ] %s\n' "$1"; }
fail() { total=$((total+1)); printf '  [FAIL] %s\n         -> %s\n' "$1" "$2"; }

os_name="$(uname -s)"
is_wsl=0
case "$os_name" in
  Linux)
    if grep -qi microsoft /proc/version 2>/dev/null; then
      is_wsl=1
      distro="Linux"
      if [ -r /etc/os-release ]; then . /etc/os-release; distro="${PRETTY_NAME:-Linux}"; fi
      if uname -r | grep -qi 'wsl2'; then os_label="Windows (WSL 2) · $distro"; else os_label="Windows (WSL) · $distro"; fi
    else
      os_label="Linux"
    fi
    ;;
  Darwin)
    os_label="macOS $(sw_vers -productVersion 2>/dev/null) · $(uname -m)"
    ;;
  *)
    os_label="$os_name"
    ;;
esac

echo "ENGSE207 · T01 · check-docker"
echo "วันที่: $(date '+%Y-%m-%d %H:%M')"
echo "เครื่อง: $os_label"
echo

# 1) docker CLI
if command -v docker >/dev/null 2>&1; then
  ok "พบคำสั่ง docker ($(docker --version 2>/dev/null))"
  have_docker=1
else
  if [ "$is_wsl" -eq 1 ]; then
    fail "ไม่พบคำสั่ง docker" "เปิด Docker Desktop > Settings > Resources > WSL Integration เปิด Ubuntu แล้วเปิดเทอร์มินัลใหม่"
  else
    fail "ไม่พบคำสั่ง docker" "ติดตั้ง Docker Desktop แล้วเปิดโปรแกรมหนึ่งครั้ง จากนั้นเปิด Terminal ใหม่"
  fi
  have_docker=0
fi

# 2) Docker Engine
if [ "$have_docker" -eq 1 ] && docker info >/dev/null 2>&1; then
  ok "Docker Engine ทำงานอยู่ (server $(docker version --format '{{.Server.Version}}' 2>/dev/null))"
  engine=1
else
  fail "ติดต่อ Docker Engine ไม่ได้" "เปิด Docker Desktop แล้วรอจนขึ้น Engine running (ถ้าขึ้น permission denied ดูตารางแก้ปัญหาในใบงาน)"
  engine=0
fi

# 3) Docker Compose
if [ "$have_docker" -eq 1 ] && docker compose version >/dev/null 2>&1; then
  ok "Docker Compose ($(docker compose version --short 2>/dev/null))"
else
  fail "ไม่พบ docker compose" "อัปเดต Docker Desktop เป็นรุ่นล่าสุด"
fi

# 4) hello-world
if [ "$engine" -eq 1 ] && docker run --rm hello-world 2>/dev/null | grep -q "Hello from Docker!"; then
  ok "รัน hello-world ได้"
else
  fail "รัน hello-world ไม่สำเร็จ" "ตรวจอินเทอร์เน็ต แล้วลอง docker run hello-world เพื่อดูข้อความ error"
fi

# 5) WSL version (Windows only)
if [ "$is_wsl" -eq 1 ]; then
  if uname -r | grep -qi 'wsl2'; then
    ok "WSL เวอร์ชัน 2"
  else
    fail "ดูเหมือนเป็น WSL 1" "PowerShell: wsl -l -v แล้ว wsl --set-version <ชื่อ distro> 2"
  fi
fi

echo
echo "สรุป: ผ่าน $pass จาก $total"
if [ "$pass" -eq "$total" ]; then
  echo "พร้อมสำหรับแล็บ A–D แล้ว คัดลอกผลทั้งหมดนี้เก็บไว้ส่งงาน"
else
  echo "ยังไม่ผ่านทุกข้อ แก้ตามคำแนะนำด้านบน แล้วรันสคริปต์นี้อีกครั้ง"
fi
