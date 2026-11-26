# S01 · T01 · ใบงาน: รู้จัก Docker ก่อนรันระบบ

> **ENGSE207 สถาปัตยกรรมซอฟต์แวร์** · ภาคการศึกษาที่ 2/2569 · CLO1, CLO6
> ทำในห้องประมาณ 3 ชั่วโมง (ส่วนลงมือประมาณ 85 นาที) · ส่วนที่ทำไม่ทันเป็นการบ้านก่อน T02
> **ใบงานนี้ไม่คิดคะแนน** ใช้ตรวจความพร้อมของเครื่องและจัดการช่วยเหลือ

[← หน้าหลักรายวิชา](../../README.md) · [สไลด์ภาพรวม](../../slides/course-overview.html) · [S02 · T02 →](../week02/README.md)

---

## เป้าหมาย

เมื่อจบใบงานนี้ นักศึกษาจะ

1. ติดตั้ง Docker Desktop บนเครื่องของตัวเอง และตรวจได้ว่าพร้อมใช้งาน
2. อธิบายความต่างของ **image** กับ **container** ได้ด้วยคำของตัวเอง
3. เปิดบริการใน container ผ่าน **port** ของเครื่องตัวเอง และอ่าน error เมื่อ port ชนกันได้
4. ใช้ **volume** ทำให้ข้อมูลไม่หายเมื่อ container ถูกลบ
5. เข้าใจว่า container ใน **network** เดียวกันเรียกกันด้วยชื่อได้ ซึ่งเป็นพื้นฐานของ Docker Compose ใน T02

ครั้งนี้ยังไม่ใช้โค้ดของระบบ Task Board ระบบจะรันครั้งแรกใน T02

## ลำดับคาบ

| เวลา | กิจกรรม |
|---|---|
| 0:00–0:45 | สไลด์ภาพรวมรายวิชา **เริ่มดาวน์โหลด Docker Desktop ไปพร้อมกัน** (ส่วนที่ 0) |
| 0:45–0:55 | ทำแบบสำรวจเครื่อง |
| 0:55–1:30 | ติดตั้ง Docker Desktop (ส่วนที่ 1A หรือ 1B) และตรวจความพร้อม (ส่วนที่ 2) |
| 1:30–1:40 | พัก |
| 1:40–2:30 | แล็บ A–C ทำเอง · แล็บ D ผู้สอนสาธิต |
| 2:30–2:50 | จับคู่ แล้วรวมเป็นทีม 3–4 คน · ส่ง GitHub username |
| 2:50–3:00 | สรุป แจ้งการบ้าน และทำ exit ticket |

## สิ่งที่ต้องมีก่อนเริ่ม

| | Windows | macOS |
|---|---|---|
| ระบบปฏิบัติการ | Windows 10/11 แบบ 64-bit และติดตั้ง **WSL 2** แล้ว | macOS รุ่นปัจจุบัน หรือย้อนหลังไม่เกิน 2 รุ่นหลัก |
| RAM | 8 GB ขึ้นไป | 8 GB ขึ้นไป (แนะนำ) |
| พื้นที่ว่าง | อย่างน้อย 20 GB | อย่างน้อย 20 GB |
| อื่น ๆ | เปิด virtualization ใน BIOS/UEFI แล้ว | รหัสผ่านผู้ดูแลเครื่อง (admin) |
| เทอร์มินัลที่ใช้ทำแล็บ | **Ubuntu (WSL)** | **Terminal** |

> ถ้าเครื่องไม่ผ่านเงื่อนไข ให้ใช้เครื่องของเพื่อนในทีมทำแล็บไปก่อน แล้วแจ้งผู้สอนเพื่อนัดแก้ไข

---

## ส่วนที่ 0 · เริ่มดาวน์โหลดทันที

ตัวติดตั้งมีขนาดใหญ่ ให้เริ่มดาวน์โหลดตั้งแต่ต้นคาบ

- **Windows:** <https://docs.docker.com/desktop/setup/install/windows-install/>
  เครื่องส่วนใหญ่ใช้ตัวติดตั้ง **x86_64** ถ้าเครื่องเป็นชิป Arm (เช่น Snapdragon) ให้เลือกรุ่น Arm
  ดูได้ที่ Settings › System › About › System type
- **macOS:** <https://docs.docker.com/desktop/setup/install/mac-install/>
  เลือกให้ตรงชิป: **Apple silicon** (M1, M2, …) หรือ **Intel chip**

ถ้าอินเทอร์เน็ตในห้องช้า ให้ขอไฟล์ติดตั้งจากผู้สอน

---

## ส่วนที่ 1A · ติดตั้งบน Windows (WSL 2)

### ขั้นที่ 1 · ตรวจ WSL (PowerShell)

```powershell
wsl --version
wsl -l -v
```

ผลที่ต้องได้

- `WSL version` ต้องเป็น **2.1.5 ขึ้นไป** ถ้าต่ำกว่าให้รัน `wsl --update`
- ในคอลัมน์ `VERSION` ของ Ubuntu ต้องเป็น **2** ถ้าเป็น 1 ให้รัน (ใช้ชื่อ distro ตามที่เห็นในรายการ)

```powershell
wsl --set-version Ubuntu 2
```

### ขั้นที่ 2 · ถ้าเคยลง Docker ใน Ubuntu เอง ให้ถอนออกก่อน

Docker แนะนำให้ถอน Docker Engine หรือ Docker CLI ที่ลงไว้ใน WSL เองก่อนติดตั้ง Docker Desktop เพราะจะขัดกัน ตรวจในเทอร์มินัล **Ubuntu**

```bash
dpkg -l | grep -E 'docker|containerd'
```

ถ้าไม่มีผลลัพธ์ ข้ามขั้นนี้ได้ ถ้ามี ให้ถอน

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc \
           docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin; do
  sudo apt-get remove -y "$pkg"
done
```

(แพ็กเกจที่ไม่ได้ติดตั้งไว้จะขึ้นข้อความว่าไม่พบ ไม่เป็นไร)

### ขั้นที่ 3 · ติดตั้ง Docker Desktop

1. ดับเบิลคลิก `Docker Desktop Installer.exe`
2. ในหน้า Configuration ให้เลือก **Use WSL 2 instead of Hyper-V** (ถ้ามีตัวเลือกนี้)
3. รอจนติดตั้งเสร็จ ถ้าโปรแกรมขอให้ sign out หรือ restart ให้ทำตาม
4. เปิด Docker Desktop จาก Start menu ยอมรับเงื่อนไขการใช้งาน (sign in ข้ามได้)
5. รอจนมุมล่างซ้ายขึ้น **Engine running**

### ขั้นที่ 4 · เปิด WSL Integration

ใน Docker Desktop ไปที่ **Settings › Resources › WSL Integration**

- เปิด **Enable integration with my default WSL distro**
- เปิดสวิตช์ของ **Ubuntu**
- กด **Apply & restart**

### ขั้นที่ 5 · ทดสอบในเทอร์มินัล Ubuntu

ปิดเทอร์มินัล Ubuntu เดิมแล้วเปิดใหม่ จากนั้นรัน

```bash
docker version
docker run hello-world
```

ต้องเห็นทั้งส่วน `Client` และ `Server` และข้อความ `Hello from Docker!`

> **เคล็ดลับ:** ทำงานใน home ของ Linux (`~/`) ไม่ใช่ใน `/mnt/c/...` ระบบจะเร็วกว่ามากเมื่อเริ่มรันโปรเจกต์ใน T02

---

## ส่วนที่ 1B · ติดตั้งบน macOS

### ขั้นที่ 1 · ตรวจชิปและรุ่น macOS

เมนู Apple › About This Mac หรือรันใน Terminal

```bash
uname -m              # arm64 = Apple silicon, x86_64 = Intel
sw_vers -productVersion
```

### ขั้นที่ 2 · (เฉพาะ Apple silicon) ติดตั้ง Rosetta 2

```bash
softwareupdate --install-rosetta
```

### ขั้นที่ 3 · ติดตั้ง Docker Desktop

1. เปิดไฟล์ `Docker.dmg` แล้วลากไอคอน Docker ไปที่โฟลเดอร์ **Applications**
2. เปิด Docker จาก Applications ใส่รหัสผ่านเมื่อระบบขอสิทธิ์
3. ยอมรับเงื่อนไขการใช้งาน เลือกการตั้งค่าที่แนะนำ (sign in ข้ามได้)
4. รอจนขึ้น **Engine running**

### ขั้นที่ 4 · ทดสอบใน Terminal

```bash
docker version
docker run hello-world
```

ต้องเห็นทั้งส่วน `Client` และ `Server` และข้อความ `Hello from Docker!`

---

## ส่วนที่ 2 · ตรวจความพร้อมด้วยสคริปต์

รันสคริปต์ตรวจเครื่องในเทอร์มินัล Ubuntu (Windows) หรือ Terminal (macOS)

```bash
curl -fsSL https://raw.githubusercontent.com/se-rmutl/engse207/main/weeks/week01/check-docker.sh -o check-docker.sh
bash check-docker.sh
```

ผลที่ควรได้ (ตัวเลขเวอร์ชันอาจต่างกัน)

```text
ENGSE207 · T01 · check-docker
เครื่อง: Windows (WSL 2) · Ubuntu 24.04 LTS
  [ OK ] พบคำสั่ง docker
  [ OK ] Docker Engine ทำงานอยู่
  [ OK ] Docker Compose
  [ OK ] รัน hello-world ได้
  [ OK ] WSL เวอร์ชัน 2
สรุป: ผ่าน 5 จาก 5
```

**คัดลอกผลทั้งหมดเก็บไว้ส่งงาน** ถ้ามีบรรทัด `[FAIL]` ให้ดูคำแนะนำที่สคริปต์พิมพ์ออกมา และดูตารางแก้ปัญหาท้ายใบงาน

---

## ส่วนที่ 3 · คำศัพท์ 5 คำที่ใช้ทั้งเทอม

| คำ | ความหมาย | เปรียบเทียบ | ใช้ในแล็บ | ใช้ต่อใน |
|---|---|---|---|---|
| **image** | แม่แบบของโปรแกรม อ่านอย่างเดียว ดึงมาจาก registry เช่น Docker Hub | class | A | ทุกสัปดาห์ |
| **container** | โปรแกรมที่กำลังรันจาก image หนึ่ง image สร้างได้หลายตัว ลบทิ้งแล้วสร้างใหม่ได้ | object | A, B | T02 เป็นต้นไป |
| **port** | ช่องที่เปิดให้เครื่องเราเข้าถึงบริการใน container เช่น `-p 8080:80` | เลขห้องที่ส่งต่อไปอีกห้อง | B | T02, T05 |
| **volume** | ที่เก็บข้อมูลแยกจาก container ข้อมูลจึงไม่หายเมื่อ container ถูกลบ | ฮาร์ดดิสก์ภายนอก | C | T03 (ข้อมูลหลัง restart), T08 |
| **network** | เครือข่ายเสมือนที่ container ในวงเดียวกันเรียกกันด้วยชื่อได้ | วง LAN ภายใน | D | T02 (Compose), T10–T11 |

> **อย่าสับสน:** *C4 Container* ในแผนภาพสถาปัตยกรรมคือหน่วยซอฟต์แวร์ เช่น Web App หรือ API ส่วน *Docker container* คือหน่วยที่รันจริง สองคำนี้ไม่ใช่สิ่งเดียวกัน (จะเจออีกครั้งใน T02 และ T05)

---

## แล็บ A · Hello: image กับ container

**คาดการณ์ก่อนรัน:** ถ้ารัน `docker run hello-world` ครั้งที่สอง จะเหมือนหรือต่างจากครั้งแรกอย่างไร

```bash
docker version
docker run hello-world
docker run hello-world      # รันซ้ำ
docker images
docker ps -a
```

**ผลที่ควรเห็น**

- ครั้งแรกมีบรรทัด `Unable to find image 'hello-world:latest' locally` แล้วตามด้วยการ pull
- ครั้งที่สองไม่มีการ pull
- `docker images` มี `hello-world` หนึ่งรายการ
- `docker ps -a` มี container สองตัวที่ชื่อถูกตั้งแบบสุ่ม และสถานะเป็น `Exited`

**คำถาม**

- **A1** ครั้งที่สองต่างจากครั้งแรกอย่างไร เพราะอะไร
- **A2** ทำไม container ทั้งสองตัวจึงอยู่ในสถานะ `Exited`
- **A3** อธิบายความต่างของ image กับ container ใน 1–2 ประโยคด้วยคำของตัวเอง

---

## แล็บ B · Web: port mapping

**คาดการณ์ก่อนรัน:** ใน `-p 8080:80` ตัวเลขไหนเป็นของเครื่องเรา

```bash
docker run -d --name web -p 8080:80 nginx:stable-alpine
```

เปิดเบราว์เซอร์ไปที่ <http://localhost:8080> ต้องเห็นหน้า **Welcome to nginx!**

```bash
docker ps
docker logs web             # ต้องเห็นบรรทัด GET / จากการเปิดเว็บเมื่อครู่
```

ลองรันตัวที่สองบน port เดิม

```bash
docker run -d --name web2 -p 8080:80 nginx:stable-alpine
```

จะเกิด error ทำนอง `port is already allocated` จากนั้นแก้ด้วยการใช้ port อื่น

```bash
docker rm -f web2
docker run -d --name web2 -p 8081:80 nginx:stable-alpine
```

เปิด <http://localhost:8081> ได้ จากนั้นลองหยุดและเปิดใหม่

```bash
docker stop web             # รีเฟรช localhost:8080 จะเปิดไม่ได้
docker start web            # รีเฟรชอีกครั้ง จะกลับมาได้
```

**คำถาม**

- **B1** `8080:80` หมายถึงอะไร ตัวเลขไหนเป็นของเครื่องเรา ตัวไหนเป็นของ container
- **B2** ทำไม `web2` ตัวแรกจึงรันไม่ได้ และทำไมยังเห็นชื่อ `web2` ใน `docker ps -a` ก่อนเราสั่งลบ
- **B3** ตัวเลือก `-d` ทำอะไร (ลองรันโดยไม่ใส่ `-d` แล้วกด Ctrl+C เพื่อดูความต่าง)

ล้างก่อนไปแล็บถัดไป

```bash
docker rm -f web web2
```

---

## แล็บ C · ข้อมูลไม่หาย: volume

**คาดการณ์ก่อนรัน:** ถ้าลบ container ฐานข้อมูลทิ้ง ข้อมูลในตารางจะหายไปด้วยหรือไม่

> **สำคัญ:** ใช้ image `postgres:17-alpine` และ mount ที่ `/var/lib/postgresql/data` ตามใบงาน
> ตั้งแต่ PostgreSQL 18 ขึ้นไป image เปลี่ยนตำแหน่งเก็บข้อมูลเป็น `/var/lib/postgresql`
> ถ้าใช้ tag `latest` ตามตัวอย่างเก่าบนเว็บ ข้อมูลอาจไม่ถูกเก็บใน volume ที่ตั้งใจ

### C1 · มี volume

```bash
docker volume create pgdata
docker run -d --name db -e POSTGRES_PASSWORD=lab1234 \
  -v pgdata:/var/lib/postgresql/data postgres:17-alpine
```

รอประมาณ 5 วินาที หรือรัน `docker logs db` จนเห็น `database system is ready to accept connections` แล้วสร้างข้อมูล

```bash
docker exec -it db psql -U postgres \
  -c "CREATE TABLE tasks(id serial PRIMARY KEY, title text);" \
  -c "INSERT INTO tasks(title) VALUES ('เรียน Docker');" \
  -c "SELECT * FROM tasks;"
```

ลบ container ทิ้ง แล้วดูว่า volume ยังอยู่

```bash
docker rm -f db
docker ps -a                # ไม่มี db แล้ว
docker volume ls            # pgdata ยังอยู่
```

สร้าง container ใหม่ด้วย volume เดิม แล้วตรวจข้อมูล (รอให้พร้อมเหมือนเดิม)

```bash
docker run -d --name db -e POSTGRES_PASSWORD=lab1234 \
  -v pgdata:/var/lib/postgresql/data postgres:17-alpine
docker exec -it db psql -U postgres -c "SELECT * FROM tasks;"
```

ต้องเห็นแถว `เรียน Docker` อยู่ครบ

### C2 · ไม่มี volume

```bash
docker run -d --name db2 -e POSTGRES_PASSWORD=lab1234 postgres:17-alpine
# รอให้พร้อม
docker exec -it db2 psql -U postgres -c "CREATE TABLE t(x int);" -c "INSERT INTO t VALUES (1);"
docker rm -f db2
docker run -d --name db2 -e POSTGRES_PASSWORD=lab1234 postgres:17-alpine
# รอให้พร้อม
docker exec -it db2 psql -U postgres -c "SELECT * FROM t;"
docker volume ls
```

คำสั่ง `SELECT` จะขึ้น error ว่าไม่พบตาราง `t` และใน `docker volume ls` จะมี volume ชื่อยาว ๆ เพิ่มขึ้น

**คำถาม**

- **C1** ทำไมข้อมูลใน C1 ยังอยู่หลังจากลบ container
- **C2** ข้อมูลของ `db2` ตัวแรกไปอยู่ที่ไหน และทำไม container ตัวใหม่จึงมองไม่เห็น
- **C3** ใน T03 เราจะ "ตรวจข้อมูลหลัง restart" ของระบบ Task Board ผลจากแล็บนี้บอกอะไรเกี่ยวกับการตั้งค่าที่ต้องตรวจ

---

## แล็บ D · network (ผู้สอนสาธิต นักศึกษาลองตามได้)

ใช้ container `db` จากแล็บ C ที่ยังรันอยู่

```bash
docker network create labnet
docker network connect labnet db
docker run --rm -it --network labnet -e PGPASSWORD=lab1234 \
  postgres:17-alpine psql -h db -U postgres -c "SELECT * FROM tasks;"
```

container ตัวใหม่เรียกฐานข้อมูลด้วยชื่อ `db` ได้ ลองอีกครั้งโดยไม่ระบุ network

```bash
docker run --rm -it -e PGPASSWORD=lab1234 \
  postgres:17-alpine psql -h db -U postgres -c "SELECT 1;"
```

จะขึ้น error ทำนอง `could not translate host name "db"`

**คำถาม**

- **D1** ทำไมชื่อ `db` ใช้ได้เฉพาะตอนอยู่ใน `labnet`
- **D2** ตัวเลือก `--rm` ทำอะไร และทำไมจึงเหมาะกับ container ที่ใช้ครั้งเดียว
- **D3** ใน T02 เราจะใช้ Docker Compose ซึ่งสร้าง network ให้ทุกบริการในไฟล์เดียวกันโดยอัตโนมัติ คิดว่าจะช่วยลดงานส่วนไหนจากแล็บนี้

---

## ล้างเครื่องหลังส่งงานแล้ว

ทำ **หลังจาก** ส่งงานแล้วเท่านั้น

```bash
docker rm -f db db2 web web2 2>/dev/null
docker network rm labnet
docker volume rm pgdata
docker system df            # ดูพื้นที่ที่ Docker ใช้
```

volume นิรนามจากแล็บ C2 ลบได้ด้วย `docker volume prune` (คำสั่งนี้ลบ volume นิรนามที่ไม่มี container ใช้ ให้อ่านคำเตือนก่อนกดยืนยัน)

---

## ตารางแก้ปัญหา

| อาการ | สาเหตุที่พบบ่อย | วิธีแก้ |
|---|---|---|
| Docker Desktop แจ้งว่า WSL ต้องอัปเดต หรือติดตั้งไม่ครบ | WSL รุ่นเก่า | PowerShell: `wsl --update` แล้วเปิด Docker Desktop ใหม่ |
| แจ้งว่าไม่พบ virtualization | ยังไม่เปิดใน BIOS/UEFI | เปิด Intel VT-x หรือ AMD-V (SVM) ใน BIOS แล้วรีสตาร์ต |
| `wsl -l -v` ขึ้น VERSION 1 | Ubuntu ยังเป็น WSL 1 | `wsl --set-version Ubuntu 2` |
| ใน Ubuntu พิมพ์ `docker` แล้วไม่พบคำสั่ง | ยังไม่เปิด WSL Integration | Settings › Resources › WSL Integration เปิด Ubuntu แล้วเปิดเทอร์มินัลใหม่ |
| `Cannot connect to the Docker daemon` | Docker Desktop ยังไม่เปิด หรือ engine ยังไม่พร้อม | เปิด Docker Desktop รอจนขึ้น Engine running |
| `permission denied` ที่ `docker.sock` ใน Ubuntu | มี Docker ที่ลงเองใน Ubuntu ค้างอยู่ หรือ integration ยังไม่ทำงาน | ทำขั้นที่ 2 ของส่วนที่ 1A แล้วปิดเปิด Docker Desktop **ไม่ต้องใช้ `sudo` กับคำสั่ง docker** |
| macOS ขึ้นว่า "Docker.app is damaged" | ปัญหาการตรวจสอบแอปของ macOS | ทำตามหัวข้อ Fix "Docker.app is damaged" ในหน้าติดตั้งของ Docker (ลิงก์ในส่วนที่ 0) |
| Mac ติดตั้งแล้วเปิดไม่ได้ | ดาวน์โหลดตัวติดตั้งผิดชิป | ลบแอปออก แล้วติดตั้งรุ่นที่ตรงกับผล `uname -m` |
| `port is already allocated` | มี container หรือโปรแกรมอื่นใช้ port นั้นอยู่ | `docker ps` หาตัวที่ใช้อยู่ หรือเปลี่ยนเป็น port อื่น เช่น `8081:80` |
| `The container name "/web" is already in use` | เคยสร้าง container ชื่อนี้ไว้แล้ว | `docker rm -f web` แล้วรันใหม่ |
| psql ขึ้น `the database system is starting up` | ฐานข้อมูลยังเริ่มไม่เสร็จ | รอ 5 วินาที หรือดู `docker logs db` |
| ข้อมูลหายหลังสร้าง container ใหม่ | ไม่ได้ใส่ `-v` หรือ mount ผิดตำแหน่ง | ตรวจคำสั่งให้ตรงกับใบงาน และใช้ `postgres:17-alpine` |
| ดาวน์โหลด image ช้ามาก | หลายคนดึงพร้อมกัน | รอสักครู่ หรือทำแล็บพร้อมเพื่อนบนเครื่องที่ดึง image แล้ว |
| พื้นที่ดิสก์เต็ม | image และ volume สะสม | `docker system df` ดูการใช้พื้นที่ แล้วลบสิ่งที่ไม่ใช้ |

ถ้ายังแก้ไม่ได้ ให้บันทึกข้อความ error ทั้งหมดและผลจาก `check-docker.sh` แล้วแจ้งผู้สอน

---

## Checklist ส่งงาน

รวมทุกอย่างไว้ในไฟล์เดียว แล้ว push เป็น `individual/T01-<รหัสนักศึกษา>.md` เข้า `main` ของ repo ทีม **ก่อนเริ่มคาบ T02** (แม่แบบอยู่ที่ `templates/T01-result.md` ใน repo ทีม · ดูขั้นตอนสร้าง repo ที่[หน้าลงทะเบียนทีม](https://se-rmutl.github.io/engse207/register.html))

- [ ] ผลจาก `check-docker.sh` (คัดลอกข้อความทั้งหมด)
- [ ] ภาพหน้าจอ <http://localhost:8080> ที่เห็น **Welcome to nginx!**
- [ ] ผล `SELECT * FROM tasks;` จากแล็บ C1 หลังสร้าง container ใหม่ (ต้องเห็นแถว `เรียน Docker`)
- [ ] ผลจากแล็บ C2 ที่แสดงว่าไม่พบตาราง `t`
- [ ] คำตอบคำถาม A1–A3, B1–B3, C1–C3 และ D1–D3 สั้น ๆ ด้วยคำของตัวเอง
- [ ] exit ticket: เข้าใจอะไร และยังสับสนอะไร อย่างละ 1 ข้อ
- [ ] (ตัวแทนทีมทำครั้งเดียว) กรอก[แบบลงทะเบียนทีม](https://se-rmutl.github.io/engse207/register.html) และสร้าง repo ทีมจากแม่แบบ

แม่แบบสำหรับคัดลอกไปเริ่มเขียน

```markdown
# T01 · <รหัสนักศึกษา> <ชื่อ-นามสกุล>

## ผลตรวจเครื่อง
<วางผลจาก check-docker.sh>

## แล็บ A–D
- ภาพหน้าจอ nginx: <แนบภาพ>
- ผล C1 (หลังสร้าง container ใหม่):
- ผล C2:

## คำตอบ
A1:
A2:
A3:
B1:
B2:
B3:
C1:
C2:
C3:
D1:
D2:
D3:

## Exit ticket
- เข้าใจ:
- ยังสับสน:
```

> **การใช้ AI:** ใช้ช่วยแก้ปัญหาการติดตั้งได้ แต่ให้ระบุว่าใช้ในส่วนไหน และตอบคำถามด้วยคำของตัวเอง ดูกติกาเต็มในหัวข้อ "การใช้ AI และความซื่อตรง" ของ[หน้าหลักรายวิชา](../../README.md)

---

## การบ้านก่อน T02

1. ติดตั้งและทำแล็บให้ครบตาม checklist
2. ตั้งค่า Git (ใช้อีเมลเดียวกับบัญชี GitHub)

   ```bash
   git config --global user.name "ชื่อ นามสกุล"
   git config --global user.email "อีเมลที่ใช้กับ GitHub"
   ```

3. ติดตั้ง VS Code พร้อม extension **Docker**
   Windows ติดตั้ง extension **WSL** เพิ่ม แล้วเปิดโปรเจกต์จากเทอร์มินัล Ubuntu ด้วยคำสั่ง `code .`
4. ทำแบบวัดพื้นฐานออนไลน์ (ไม่คิดคะแนน) ตามลิงก์ที่ผู้สอนประกาศ
5. เขียน team charter ร่วมกับทีมที่ `docs/team-charter.md` ใน repo ทีม (คัดลอกจาก `templates/team-charter.md`)
6. อ่าน[หน้าหลักรายวิชา](../../README.md) และ[ภาพรวม term project](../../term-project/README.md)

## ต่อไปใน T02

รันระบบ Task Board ครั้งแรกด้วย `docker compose up` แล้วตามค่าจากหน้าจอ React ผ่าน API ไปถึงฐานข้อมูลหนึ่งเส้น
image, container, port, volume และ network จากใบงานนี้จะถูกรวมไว้ในไฟล์ Compose ไฟล์เดียว

[← หน้าหลักรายวิชา](../../README.md) · [S02 · T02 →](../week02/README.md)
