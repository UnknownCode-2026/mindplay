"use client";
import { useEffect,useState } from "react";
import { BrandMark,Icon } from "../components/MindPlayUI";
import HomeStats from "../components/HomeStats";
import { games as fallbackGames } from "../data/games";
import { getPublicConfig,type PublicConfig } from "../lib/mindplayApi";

const metaById=Object.fromEntries(fallbackGames.map(g=>[g.id,g]));

export default function Home(){
 const[config,setConfig]=useState<PublicConfig|null>(null);
 useEffect(()=>{getPublicConfig().then(setConfig).catch(()=>{})},[]);
 const site=config?.site;
 const dynamicGames=(config?.games??[]).filter(g=>g.enabled).sort((a,b)=>a.sort_order-b.sort_order);
 const games=dynamicGames.length?dynamicGames.map(g=>({...metaById[g.game_id],...g})):fallbackGames;

 if(site?.maintenance_mode)return <main className="system-page"><BrandMark/><p className="eyebrow">Maintenance</p><h1>MindPlay กำลังปรับปรุง</h1><p>{site.maintenance_message}</p></main>;

 return <main className="site-shell">
  <div className="ambient-bg" aria-hidden="true"><span/><span/><span/></div>
  <header className="site-header">
   <a className="brand" href="#top" aria-label="MindPlay หน้าแรก"><BrandMark/><span>{site?.site_name??"MindPlay"}</span></a>
   <nav className="site-nav" aria-label="เมนูหลัก"><a href="#games">เกม</a>{site?.public_stats_enabled!==false&&<a href="/stats">สถิติ</a>}<a href="#about">เกี่ยวกับ</a></nav>
  </header>
  {config?.announcement&&<div className="site-announcement"><strong>{config.announcement.title}</strong><span>{config.announcement.body}</span></div>}
  <section className="hero" id="top">
   <div className="hero-mark" aria-hidden="true"><i/><i/><div><Icon name="brand"/></div></div>
   <p className="eyebrow">เกมมายากลและทายใจ</p>
   <h1>{site?.hero_title??"คิดอะไรไว้ในใจ แล้วลองซ่อนมันจากเรา"}</h1>
   <p>{site?.hero_description??"เลือกไพ่ ตัวเลข สัญลักษณ์ หรือคำหนึ่งคำไว้ในหัว แล้วทำตามวิธีเล่นของแต่ละเกมเพื่อดูว่า MindPlay จะทายสิ่งที่คุณคิดได้หรือไม่"}</p>
   <div className="hero-actions"><a className="button primary" href="#games">เลือกเกม <Icon name="arrowRight"/></a>{site?.public_stats_enabled!==false&&<a className="button secondary" href="/stats">ดูสถิติการเล่น</a>}</div>
   <div className="trust-row"><span><Icon name="shield"/>ไม่ใช้กล้องหรือไมค์</span><span>เล่นฟรี</span><span>ไม่ต้องสมัคร</span></div>
  </section>
  {site?.home_stats_enabled!==false&&<HomeStats/>}
  <section className="section" id="games">
   <div className="section-heading"><div><p className="eyebrow">เลือกเกม</p><h2>เกมอ่านใจของ MindPlay</h2></div><p>เกมที่เปิดให้เล่นจะถูกควบคุมจาก Admin Control Center โดยไม่ต้อง Deploy เว็บไซต์ใหม่ทุกครั้ง</p></div>
   <div className="game-grid">
    {games.map((game:any,index)=><a className={"game-card card-"+game.tone+(game.maintenance?" is-maintenance":"")} href={game.maintenance?"#games":game.href} key={game.id??game.game_id}>
      <div className="game-card-top"><span className="game-icon"><Icon name={game.icon}/></span><span className="game-index">{String(index+1).padStart(2,"0")}</span></div>
      <span className="badge">{game.maintenance?"กำลังปรับปรุง":game.badge}</span><h3>{game.title}</h3><p>{game.maintenance?game.maintenance_message:game.description}</p>
      <div className="game-card-meta"><span>{game.duration}</span><span>{game.play}</span></div>
      <span className="game-cta">{game.maintenance?"ยังไม่เปิดให้เล่น":"เริ่มเล่น"} <Icon name="arrowRight"/></span>
    </a>)}
   </div>
  </section>
  <section className="privacy-panel"><span className="privacy-icon"><Icon name="shield"/></span><div><p className="eyebrow">เล่นได้อย่างสบายใจ</p><h2>ความลึกลับอยู่ในตัวเกม ไม่ใช่การแอบดูอุปกรณ์</h2><p>MindPlay ไม่เปิดกล้อง ไม่เปิดไมค์ และไม่ต้องใช้บัญชีผู้เล่น ระบบหลังบ้านใช้ Supabase สำหรับการตั้งค่าและสถิติแบบไม่ระบุตัวตน</p></div></section>
  <section className="section" id="about"><div className="section-heading"><div><p className="eyebrow">V1.9</p><h2>เว็บไซต์ที่บริหารได้จาก Control Center</h2></div><p>เปิด/ปิดเกม, Maintenance, Announcement, Feature Flags และข้อความหลักของเว็บไซต์ได้จาก Admin Panel</p></div></section>
  <footer className="site-footer"><div><BrandMark compact/><strong>{site?.site_name??"MindPlay"}</strong></div><p>ศูนย์รวมเกมมายากลและทายใจภาษาไทย</p></footer>
 </main>;
}
