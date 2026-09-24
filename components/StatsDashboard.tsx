"use client";
import { useEffect,useMemo,useState } from "react";
import { getStats,type MindPlayStats } from "../lib/mindplayApi";
type Period=0|1|7|30|90;
const periods:{value:Period;label:string}[]=[
 {value:1,label:"วันนี้"},{value:7,label:"7 วัน"},{value:30,label:"30 วัน"},{value:90,label:"90 วัน"},{value:0,label:"ทั้งหมด"}
];
const number=new Intl.NumberFormat("th-TH");
const percent=(value:number)=>number.format(Number(value||0))+"%";
export default function StatsDashboard(){
 const[days,setDays]=useState<Period>(30);
 const[stats,setStats]=useState<MindPlayStats|null>(null);
 const[loading,setLoading]=useState(true);
 const[error,setError]=useState(false);
 useEffect(()=>{let active=true;setLoading(true);setError(false);getStats(days).then(data=>{if(active)setStats(data)}).catch(()=>{if(active)setError(true)}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[days]);
 const maxViews=useMemo(()=>Math.max(1,...(stats?.daily.map(item=>item.page_views)??[1])),[stats]);
 return <div className="stats-dashboard">
  <div className="stats-periods" role="group" aria-label="ช่วงเวลาสถิติ">{periods.map(period=><button key={period.value} className={days===period.value?"active":""} type="button" onClick={()=>setDays(period.value)}>{period.label}</button>)}</div>
  {loading&&!stats&&<div className="stats-state"><span className="system-loader"><span/></span><p>กำลังโหลดข้อมูลจาก Supabase...</p></div>}
  {error&&!stats&&<div className="stats-state"><h2>โหลดสถิติไม่สำเร็จ</h2><p>เกมยังเล่นได้ตามปกติ ลองเปิดหน้านี้ใหม่อีกครั้งในอีกสักครู่</p></div>}
  {stats&&<>
   <section className="stats-summary">
    <article><span>ผู้เข้าชม</span><strong>{number.format(stats.summary.visitors)}</strong><small>Anonymous visitors</small></article>
    <article><span>Page Views</span><strong>{number.format(stats.summary.page_views)}</strong><small>การเปิดหน้าเว็บ</small></article>
    <article><span>เริ่มเล่นเกม</span><strong>{number.format(stats.summary.game_starts)}</strong><small>{percent(stats.summary.completion_rate)} เล่นจนจบ</small></article>
    <article><span>ทายตรง</span><strong>{percent(stats.summary.correct_rate)}</strong><small>{number.format(stats.summary.correct_guesses)} ครั้ง</small></article>
   </section>
   <section className="stats-panel">
    <div className="stats-panel-head"><div><p className="eyebrow">แนวโน้ม</p><h2>การเข้าชมรายวัน</h2></div><span>{number.format(stats.active_now)} เซสชันกำลังใช้งานในช่วง 15 นาทีล่าสุด</span></div>
    {stats.daily.length?<div className="stats-chart" aria-label="กราฟ Page Views รายวัน">{stats.daily.map(item=>{
      const height=Math.max(6,(item.page_views/maxViews)*100);
      const label=new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short"}).format(new Date(item.day+"T00:00:00+07:00"));
      return <div className="stats-bar-wrap" key={item.day} title={item.page_views+" Page Views"}><div className="stats-bar-track"><span style={{height:height+"%"}}/></div><b>{number.format(item.page_views)}</b><small>{label}</small></div>
    })}</div>:<p className="stats-empty">ยังไม่มีข้อมูลในช่วงเวลานี้</p>}
   </section>
   <section className="stats-panel">
    <div className="stats-panel-head"><div><p className="eyebrow">เกมฮิต</p><h2>สถิติแยกตามเกม</h2></div><span>เรียงตามจำนวนครั้งที่เริ่มเล่น</span></div>
    <div className="game-stats-list">{stats.games.map((game,index)=><article key={game.game_id}>
      <span className="game-stats-rank">{String(index+1).padStart(2,"0")}</span>
      <div className="game-stats-name"><strong>{game.title}</strong><small>{number.format(game.starts)} เริ่มเล่น</small></div>
      <div><span>เล่นจบ</span><b>{percent(game.completion_rate)}</b></div>
      <div><span>ทายตรง</span><b>{percent(game.correct_rate)}</b></div>
      <div><span>เล่นซ้ำ</span><b>{number.format(game.replays)}</b></div>
      <div><span>แชร์</span><b>{number.format(game.shares)}</b></div>
    </article>)}</div>
   </section>
   <section className="stats-mini-grid">
    <article><span>เล่นจบทั้งหมด</span><strong>{number.format(stats.summary.game_completions)}</strong></article>
    <article><span>เล่นซ้ำ</span><strong>{number.format(stats.summary.replays)}</strong></article>
    <article><span>แชร์</span><strong>{number.format(stats.summary.shares)}</strong></article>
    <article><span>ทายไม่ตรง</span><strong>{number.format(stats.summary.wrong_guesses)}</strong></article>
   </section>
  </>}
 </div>;
}
