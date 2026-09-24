import type { SVGProps } from "react";

export type IconName =
  | "brand" | "cards" | "math" | "number" | "symbol" | "prediction"
  | "mobile" | "tablet" | "desktop" | "speed" | "shield" | "arrowRight"
  | "arrowLeft" | "check" | "close" | "spark" | "moon" | "flame"
  | "diamond" | "bolt" | "butterfly" | "clover" | "star" | "crown"
  | "heart" | "eye" | "wave" | "sun" | "orb" | "candle" | "key" | "rose"
  | "door" | "palette" | "spade" | "club";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, className, ...props }: IconProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className,
    ...props,
  };

  const body = (() => {
    switch (name) {
      case "brand":
        return <><path d="M8.2 4.7C5.8 5.7 4.3 8 4.3 10.6c0 1.8.7 3.4 1.9 4.6"/><path d="M15.8 4.7c2.4 1 3.9 3.3 3.9 5.9 0 1.8-.7 3.4-1.9 4.6"/><path d="M8.2 4.7c.5-1.2 1.9-2.1 3.8-2.1s3.3.9 3.8 2.1"/><path d="M6.2 15.2c.4 3.7 2.6 6.2 5.8 6.2s5.4-2.5 5.8-6.2"/><path d="M9.2 7.3c-1.2.5-2 1.6-2 2.9M14.8 7.3c1.2.5 2 1.6 2 2.9M9 13c.8.8 1.8 1.2 3 1.2s2.2-.4 3-1.2"/><path d="M12 2.8v18.4"/></>;
      case "cards":
        return <><rect x="5" y="4" width="12" height="16" rx="2.4"/><path d="M9 8.2h4M9 11h4M8 20l9.5-3.1a2 2 0 0 0 1.3-2.5L15.6 4.7"/></>;
      case "math":
        return <><circle cx="12" cy="12" r="8.4"/><path d="M8.4 9.1h3.2M10 7.5v3.2M14.1 15.2h3.1M8.6 15.5l2.4-2.4M11 15.5l-2.4-2.4"/></>;
      case "number":
        return <><path d="M8.2 3.8 6.5 20.2M17.5 3.8l-1.7 16.4M4 9h16M3.4 15h16"/></>;
      case "symbol":
        return <><path d="M2.9 12s3.3-5.5 9.1-5.5 9.1 5.5 9.1 5.5-3.3 5.5-9.1 5.5S2.9 12 2.9 12Z"/><circle cx="12" cy="12" r="2.8"/></>;
      case "prediction":
        return <><circle cx="12" cy="11" r="7"/><path d="M8.5 18h7M10 21h4M8.2 11.2c1.1-2 2.4-3.1 3.8-3.1s2.7 1.1 3.8 3.1c-1.1 2-2.4 3.1-3.8 3.1s-2.7-1.1-3.8-3.1Z"/><circle cx="12" cy="11.2" r="1.1"/></>;
      case "mobile":
        return <><rect x="7.2" y="2.8" width="9.6" height="18.4" rx="2.2"/><path d="M10.3 5.5h3.4M11.4 18.4h1.2"/></>;
      case "tablet":
        return <><rect x="4.2" y="3.1" width="15.6" height="17.8" rx="2.2"/><circle cx="12" cy="17.8" r=".7"/></>;
      case "desktop":
        return <><rect x="2.8" y="4" width="18.4" height="12.2" rx="2"/><path d="M8.3 20h7.4M10 16.2 9.3 20M14 16.2l.7 3.8"/></>;
      case "speed":
        return <><path d="M4.4 17.2a8 8 0 1 1 15.2 0"/><path d="m12 12 4.3-4.3"/><circle cx="12" cy="12" r="1.2"/></>;
      case "shield":
        return <><path d="M12 2.8 19 5.6v5.3c0 4.7-2.7 8.4-7 10.3-4.3-1.9-7-5.6-7-10.3V5.6L12 2.8Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>;
      case "arrowRight":
        return <><path d="M5 12h14M14 7l5 5-5 5"/></>;
      case "arrowLeft":
        return <><path d="M19 12H5M10 7l-5 5 5 5"/></>;
      case "check":
        return <path d="m5 12.5 4.2 4.1L19 6.8"/>;
      case "close":
        return <><path d="m6 6 12 12M18 6 6 18"/></>;
      case "spark":
        return <><path d="M12 2.8 13.8 9l6.2 1.8-6.2 1.8L12 19l-1.8-6.4L4 10.8 10.2 9 12 2.8Z"/><path d="m18.5 16 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"/></>;
      case "moon":
        return <path d="M18.9 15.6A8.3 8.3 0 0 1 8.4 5.1 8.4 8.4 0 1 0 18.9 15.6Z"/>;
      case "flame":
        return <path d="M12.2 2.8c.6 3.1-2.8 4.1-2.2 7.2.3 1.6 1.5 2.2 2.2 3.5.8-1.1 2.5-2 2.3-4.7 2.7 2.2 4.1 4.5 3.6 7.1-.6 3.2-3.2 5.3-6.2 5.3-3.5 0-6.4-2.8-6.4-6.4 0-4.7 4.1-7.5 6.7-12Z"/>;
      case "diamond":
        return <path d="m12 3 7 9-7 9-7-9 7-9Z"/>;
      case "bolt":
        return <path d="m13.5 2.8-7 10h5L10.5 21l7-10h-5l1-8.2Z"/>;
      case "butterfly":
        return <><path d="M11 12C8 6.2 4.5 5.2 3.5 7.7c-.9 2.3 1.5 5.1 5.1 5.7-3.2.7-4.8 3.1-3.5 5 1.4 2 4.7.6 5.9-3.7"/><path d="M13 12c3-5.8 6.5-6.8 7.5-4.3.9 2.3-1.5 5.1-5.1 5.7 3.2.7 4.8 3.1 3.5 5-1.4 2-4.7.6-5.9-3.7"/><path d="M12 9v8"/></>;
      case "clover":
        return <><path d="M12 11.5C8.9 8.8 8.3 5.8 10.2 4.8c1.6-.9 3.1.5 3.8 2 .7-1.5 2.2-2.9 3.8-2 2 1.1 1.3 4.1-1.8 6.7 3 .2 5.1 1.9 4.4 3.9-.8 2.1-3.7 1.6-6.4-.2-2.7 1.8-5.6 2.3-6.4.2-.7-2 1.4-3.7 4.4-3.9Z"/><path d="M14 15.2 12.5 21"/></>;
      case "star":
        return <path d="m12 3 2.6 5.4 6 .8-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.3-4.2 6-.8L12 3Z"/>;
      case "crown":
        return <><path d="m4 8 4.2 3L12 5l3.8 6L20 8l-1.5 10h-13L4 8Z"/><path d="M6.5 15.5h11"/></>;
      case "heart":
        return <path d="M12 20.2 4.7 13c-3.7-3.7 1.6-9.4 5.6-5.5L12 9.2l1.7-1.7c4-3.9 9.3 1.8 5.6 5.5L12 20.2Z"/>;
      case "eye":
        return <><path d="M2.9 12s3.3-5.5 9.1-5.5 9.1 5.5 9.1 5.5-3.3 5.5-9.1 5.5S2.9 12 2.9 12Z"/><circle cx="12" cy="12" r="2.5"/></>;
      case "wave":
        return <><path d="M3 9.5c2.2 0 2.2 1.5 4.5 1.5S9.8 9.5 12 9.5s2.2 1.5 4.5 1.5S18.8 9.5 21 9.5"/><path d="M3 14c2.2 0 2.2 1.5 4.5 1.5S9.8 14 12 14s2.2 1.5 4.5 1.5S18.8 14 21 14"/></>;
      case "sun":
        return <><circle cx="12" cy="12" r="3.8"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></>;
      case "orb":
        return <><circle cx="12" cy="10.5" r="6.5"/><path d="M8 17h8M9.5 20h5"/><path d="M8.8 10.5c.8-1.5 1.9-2.3 3.2-2.3s2.4.8 3.2 2.3c-.8 1.5-1.9 2.3-3.2 2.3s-2.4-.8-3.2-2.3Z"/></>;
      case "candle":
        return <><rect x="8.5" y="10" width="7" height="10" rx="1.5"/><path d="M12 9c-2-1.4-1.7-3.9.3-6 2.2 2.4 2.1 4.8-.3 6Z"/></>;
      case "key":
        return <><circle cx="8" cy="12" r="3.5"/><path d="M11.5 12H21M17 12v3M19.5 12v2"/></>;
      case "rose":
        return <><path d="M12 4.5c2.9-2 6.2.7 4.3 3.5 3.4.4 3.7 4.6.6 5.8-1.4 3.5-6 4.2-8.6 1.6-2.7-2.7-2.1-7.1 1-8.8.4-.9 1.3-1.7 2.7-2.1Z"/><path d="M12 15.8V21M12 18c-2.6-.2-4.1-1.1-5-2.6M12 18c2.6-.2 4.1-1.1 5-2.6"/></>;
      case "door":
        return <><path d="M6 21V4.8c0-1 .8-1.8 1.8-1.8h8.4c1 0 1.8.8 1.8 1.8V21"/><path d="M4 21h16M14.8 12h.1"/></>;
      case "palette":
        return <><path d="M12 3a9 9 0 1 0 0 18h1.4c1.3 0 1.9-1.6 1-2.5-.9-.8-.3-2.3.9-2.3H18a3 3 0 0 0 3-3C21 7.6 17 3 12 3Z"/><circle cx="7.8" cy="9" r=".8"/><circle cx="11" cy="6.7" r=".8"/><circle cx="15" cy="7.6" r=".8"/></>;
      case "spade":
        return <><path d="M12 3.5C9.8 7.2 5.5 9 5.5 13c0 2.2 1.7 3.8 3.8 3.8 1.2 0 2.2-.5 2.7-1.4.5.9 1.5 1.4 2.7 1.4 2.1 0 3.8-1.6 3.8-3.8 0-4-4.3-5.8-6.5-9.5Z"/><path d="M12 15v5M9.5 20h5"/></>;
      case "club":
        return <><circle cx="12" cy="7.2" r="3"/><circle cx="8.4" cy="12" r="3"/><circle cx="15.6" cy="12" r="3"/><path d="M12 13.5V20M9.5 20h5"/></>;
    }
  })();

  return <svg {...common}>{body}</svg>;
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? "brand-logo brand-logo-compact" : "brand-logo"}><Icon name="brand" /></span>;
}

export function GameHeader({ title }: { title: string }) {
  return (
    <header className="game-header">
      <a href="/" className="icon-button" aria-label="กลับหน้าหลัก"><Icon name="arrowLeft" /></a>
      <div className="game-header-title"><BrandMark compact /><span>{title}</span></div>
      <span className="game-live-dot" aria-hidden="true" />
    </header>
  );
}

export type SuitName = "spade" | "heart" | "diamond" | "club";
export function SuitMark({ suit }: { suit: SuitName }) {
  return <Icon name={suit === "diamond" ? "diamond" : suit} className="suit-icon" />;
}
