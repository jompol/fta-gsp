# Deployment Protocol - FTA-GSP Intelligence Portal

เอกสารนี้อธิบายขั้นตอนการนำระบบ FTA-GSP Intelligence Portal ไปติดตั้งและเปิดใช้งานจริงบน Staging / Production Server 

## ข้อมูลเซิร์ฟเวอร์ (Staging)
- **IP Address:** `119.59.103.211`
- **Username:** `root`
- **Path:** `/root/repo/fta-gsp`
- **Port:** `6001` (หลีกเลี่ยง Port 6000 เนื่องจากเป็น Unsafe Port บนเบราว์เซอร์)

## Requirements
- Git
- Docker & Docker Compose
- UFW หรือ iptables (สำหรับจัดการ Firewall)

## ขั้นตอนการแทรกแซงครั้งแรก (Initial Setup)

1. Clone โปรเจกต์ไปยัง Server:
   ```bash
   git clone git@github.com:jompol/fta-gsp.git /root/repo/fta-gsp
   cd /root/repo/fta-gsp
   ```

2. เปิด Firewall ให้ครอบคลุมการเชื่อมต่อ Port `6001`:
   ```bash
   # สำหรับ UFW (Ubuntu/Debian)
   ufw allow 6001/tcp
   
   # สำหรับ iptables
   iptables -A INPUT -p tcp --dport 6001 -j ACCEPT
   ```

3. รัน Docker Compose เพื่อบิลด์และเริ่มการทำงาน:
   ```bash
   docker compose up -d --build
   ```

## ขั้นตอนการอัปเดตระบบ (Continuous Deployment)

สำหรับการนำอัปเดตใหม่ๆ (Updates) ขึ้นระบบหลังจากที่มีการแก้ไขโค้ดและ Push ขึ้นไปบน GitHub ให้ทำตามขั้นตอนดังนี้:

1. **SSH เข้าสู่ระบบ**
   ```bash
   ssh root@119.59.103.211
   ```

2. **ดึงอัปเดตล่าสุดจาก GitHub และสั่ง Build ใหม่**
   ```bash
   cd /root/repo/fta-gsp
   git pull origin main
   docker compose up -d --build
   ```

ระบบจะทำการดึงโค้ดล่าสุด บิลด์ Nginx+React image ใหม่ และเริ่ม Container ทันทีโดยไม่เกิด Downtime นาน

## โครงสร้างระบบ Container 

- โค้ดมีการใช้ **Multi-stage build**
  1. **Builder Stage:** ใช้ Node.js เพื่อติดตั้ง dependency และรัน `npm run build`
  2. **Production Stage:** ใช้ Nginx (Alpine) เสิร์ฟไฟล์ static ภายใน `/dist` ที่ถูกบิลด์ออกมา
- Container เปิดภายในผ่าน Port 80 และถูกส่งออกมายัง Port 6001 ของ Server

## เครื่องมือตรวจสอบ

- เช็คสถานะการทำงานของ Container:
  ```bash
  docker ps
  ```
- ดู Log หากเกิดข้อผิดพลาด:
  ```bash
  docker logs fta-gsp-web -f
  ```
