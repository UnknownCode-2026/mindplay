# MindPlay V1.8

Supabase Game Platform & Analytics

## Main upgrade
- เชื่อม MindPlay กับ Supabase Project จริง
- Anonymous analytics โดยไม่ต้องสมัครสมาชิก
- เก็บ Page Views, Visitors, Game Start, Completion, Correct/Wrong, Replay และ Share
- เพิ่มหน้า /stats พร้อมช่วง วันนี้ / 7 วัน / 30 วัน / 90 วัน / ทั้งหมด
- เพิ่ม Game Session สำหรับทุกเกม
- ย้าย Game Engine ของ Number / Symbol / Word ไปประมวลผลฝั่ง Supabase Edge Function

## Game architecture
- Number Mind: Candidate state และคำถามถัดไปอยู่ฝั่ง Game Engine
- Symbol Mind: Client ได้เฉพาะรายการสัญลักษณ์และคำถามปัจจุบัน
- Word Mind: Client ได้เฉพาะรายการคำและคำถามปัจจุบัน
- Card Mind / Sealed Prediction: เกมยังตอบสนองฝั่ง Client แต่มี Supabase session + analytics
- Analytics ล้มเหลวไม่ทำให้เกม Client-side พัง
- Server-assisted games จะแสดง Retry หาก Game Engine ขัดข้อง แทนการเฉลยแบบเดาสุ่ม

## Privacy / Security
- ไม่มี Login
- ไม่ใช้กล้องหรือไมค์
- Anonymous visitor ID หมุนใหม่ทุกประมาณ 24 ชั่วโมง
- ไม่เก็บชื่อ อีเมล หรือข้อมูลระบุตัวตน
- ตาราง Supabase เปิด RLS และปฏิเสธ anon/authenticated โดยตรง
- Browser ติดต่อผ่าน Edge Function เท่านั้น
- Secret/service role ไม่อยู่ใน GitHub หรือ frontend

## Supabase
- Project: MindPlay
- Region: ap-southeast-1
- Tables: visitor_sessions, game_sessions, analytics_events, game_configs
- RPC: get_mindplay_stats
- Edge Function: mindplay-api

## UI
- หน้า Home แสดงภาพรวมสถิติแบบกระชับ
- หน้า Stats responsive บน Mobile / Tablet / Desktop
- คงดีไซน์ V1.7 และ Custom SVG icon
- package version 1.8.0
