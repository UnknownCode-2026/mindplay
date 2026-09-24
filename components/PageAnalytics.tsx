"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gameIdFromPath,trackPageView } from "../lib/mindplayApi";
export default function PageAnalytics(){
  const pathname=usePathname();
  useEffect(()=>{void trackPageView(pathname,gameIdFromPath(pathname)).catch(()=>{})},[pathname]);
  return null;
}
