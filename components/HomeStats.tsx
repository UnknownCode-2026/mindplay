"use client";
import { useEffect,useState } from "react";
import { getStats,type MindPlayStats } from "../lib/mindplayApi";
import { Icon } from "./MindPlayUI";
const number=new Intl.NumberFormat("th-TH");
export default function HomeStats(){
  const[stats,setStats]=useState<MindPlayStats|null>(null);
  useEffect(()=>{let active=true;getStats(30).then(data=>{if(active)setStats(data)}).catch(()=>{});return()=>{active=false}},[]);
  if(!stats)return null;
  const popular=stats.games.find(game=>game.starts>0);
  return <section className="home-stats" aria-label="สถิติ MindPlay 30 วันล่าสุด">
    <div><span className="home-stat-value">{number.format(stats.summary.game_starts)}</span><span className="home-stat-label">รอบที่เริ่มเล่นใน 30 วัน</span></div>
    <div><span className="home-stat-value">{number.format(stats.summary.visitors)}</span><span className="home-stat-label">ผู้เข้าชมแบบไม่ระบุตัวตน</span></div>
    <div><span className="home-stat-value">{popular?popular.title:"กำลังเก็บข้อมูล"}</span><span className="home-stat-label">เกมที่มีคนเริ่มเล่นมากที่สุด</span></div>
    <a href="/stats">ดูสถิติทั้งหมด <Icon name="arrowRight"/></a>
  </section>;
}
