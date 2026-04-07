# Copilot Memo

## สถานะปัจจุบันของโปรเจค
- แยก `roles` และ `apps` ให้ชัดเจน
  - `src/roles/<role>/...` สำหรับหน้าของแต่ละบทบาท
  - `src/apps/<appName>/<role>.tsx` สำหรับโหมดแอปที่ต่างกัน
- `src/routes/index.ts` รวมทุก route ทั้ง role-specific และ app-specific
- `src/apps/routes.ts` เป็นตัวรวบรวม route ของแอปทั้งหมด
- `src/components/AppPageShell.tsx` ใช้สำหรับทุกแอป ให้มี tab control: `Dashboard`, `App`, `Settings`
- `src/components/AppAccessGuard.tsx` ตรวจสอบการเข้าถึงตาม role
- `src/shared/models/roles.ts` เก็บ statics และ access rules

## กฎบทบาทที่ต้องจำ
- `student` ดูได้เฉพาะโหมด `student`
- `teacher` ดูได้ทั้ง `student` และ `teacher`
- `parent` ดูได้ทั้ง `student` และ `parent`
- `admin` ดูได้ทุกโหมด (ทุก role)
- `executive` ดูได้เฉพาะ `executive`

## สิ่งสำคัญที่ทำไปแล้ว
- สร้างโครงสร้าง app-first: `src/apps/<appName>/<role>.tsx`
- แยก dashboard role-specific ออกจาก app pages
- ทำให้ทุกแอปมี tab control และ section ครบ
- ปรับ route guard พร้อม `canAccessAppMode`
- อัปเดต `appRoleAccess` ให้ตรงกับเงื่อนไขล่าสุด

## วิธีสรุป Dev Log สำหรับ Copilot
- อ่าน `devlog.md` ทุกครั้งก่อนสรุป
- เมื่อสรุป devlog ต้องเขียนเพิ่มเติมลงในไฟล์ `devlog.md`
- ต้องให้ Dev Log ปรากฏในเมนู About ของหน้า Settings
- แปลงรายการเป็นประโยคสั้น ๆ อ่านง่ายสำหรับผู้บริหาร
- เลือกเฉพาะงานสำคัญและผลลัพธ์ที่เกิดขึ้น
- ใช้คำไทยทางการ ไม่ลงรายละเอียดโค้ด
- ระบุการเปลี่ยนแปลงหลักอย่างชัดเจน เช่น สิทธิ์บทบาท, โครงสร้าง route, หน้า Settings, และหน้า About
- ถ้ามีงานหลายส่วน ให้จัดแบ่งเป็นหัวข้อย่อยสั้น ๆ

## ถ้าจะขยายเพิ่ม
1. เพิ่มแอปใหม่ใน `src/apps/<newApp>`
2. สร้าง `routes.tsx` ในโฟลเดอร์แอป
3. สร้างหน้าโหมด role ที่รองรับ เช่น `student.tsx`, `teacher.tsx`, `admin.tsx`, `executive.tsx`
4. ใช้ `AppPageShell` ในหน้าแอป
5. ถ้าต้องการสิทธิ์พิเศษ ให้แก้ `src/shared/models/roles.ts`

## คำสั่งตรวจสอบ
- `npm exec -- tsc --noEmit`
- ถ้าเพิ่ม route ใหม่ ให้ตรวจ `src/routes/index.ts` และ `src/apps/routes.ts`
