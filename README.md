# MindPlay V1.6

Immersive Motion + Game Engine Rework

## Visual / UX
- รักษาโครง UI/UX ของ V1.5 และเพิ่มสีประจำเกม
- เพิ่ม Aurora, glow, reveal motion, scene transition และ micro-interaction
- ใช้ Custom SVG icon ของ MindPlay ต่อเนื่อง ไม่มี Emoji ใน UI หลัก
- รองรับ prefers-reduced-motion
- Mobile / Tablet / Desktop responsive

## Game Engines
- ไพ่ที่หายไป: 16-card Matrix + intersection decoding 2 รอบ
- อ่านตัวเลขในใจ: Base-5 routing 3 ขั้น สำหรับเลข 1-100
- สัญลักษณ์ลับ: Base-4 visual routing 2 ขั้น สำหรับ 16 symbols
- เลขที่หนีไม่พ้น: Multi-routine engine (1089, 37, 9)
- คำทำนายที่ปิดผนึก: pre-commit SHA-256 + adaptive elimination + client-side verification

## Internal
- แยก logic ไปที่ lib/games/
- package version 1.6.0
- หน้าเว็บไม่แสดงเลขเวอร์ชัน
