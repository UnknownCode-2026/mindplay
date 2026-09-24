# MindPlay V1.7

Magic Mind Reading Rebuild

## Main games
- ไพ่ในความคิด — ไพ่ 21 ใบและการตามรอยผ่าน 3 ช่วง
- เลขที่คุณกำลังคิด — เลข 1–50 และคำถามเบาะแสแบบ adaptive
- สัญลักษณ์ในใจ — ชุด SVG ของ MindPlay และคำถามลักษณะของรูป
- คำที่ซ่อนอยู่ในหัว — เกมทายคำจากคลังคำควบคุมและ semantic questions
- คำทำนายที่ปิดผนึก — เส้นทางตัวเลือกแบบมายากลและ reveal

## UX
- ทุกเกมมีหน้าวิธีเล่นก่อนเริ่ม
- ปุ่ม ? เปิดวิธีเล่นซ้ำได้ตลอด
- Flow กลาง: วิธีเล่น → คิด/จำ → interaction → focus → reveal → reaction
- เพิ่มหน้าตรง/ไม่ตรง เล่นใหม่ และ Web Share
- หน้า Home ไม่เปิดเผยชื่อ algorithm หรือกลไกเชิงเทคนิค
- ภาษาไทยเป็นหลัก และไม่มี Emoji เป็นไอคอนหลัก

## UI / Responsive
- คงแบรนด์ Custom SVG จาก V1.5
- ลด motion ที่ทำงานพร้อมกันและเน้นช่วง reveal
- แยก CSS เป็น tokens/base/home/game/motion/responsive
- Mobile / Tablet / Desktop และ prefers-reduced-motion

## Internal
- สร้าง engine ใหม่ใน lib/games/*V17.ts
- Math trick เดิมออกจาก Main Collection และ route เดิม redirect ไปเกมทายคำ
- package version 1.7.0
