import { Sparkles, Paintbrush, GitBranch, FileText, Settings2, UploadCloud, Users, Home, Layers, LogIn, Star } from "lucide-react";
import { APP_CONFIG } from "@/config";
// เลือกไอคอนตามเนื้อหา dev log
function pickIcon(entry: DevLogEntry) {
  const txt = entry.items.join(" ");
  const iconProps = { className: "w-10 h-10 md:w-12 md:h-12", strokeWidth: 2 };
  if (/deploy|github|gh\-pages|ออนไลน์|homepage/i.test(txt)) return <UploadCloud {...iconProps} />;
  if (/theme|สี|ดีไซน์|ui|design|layout|card|carousel|shadow|เงา|พื้นหลัง/i.test(txt)) return <Paintbrush {...iconProps} />;
  if (/dev\s*log|บันทึก|about|settings|สรุป/i.test(txt)) return <FileText {...iconProps} />;
  if (/role|บทบาท|สิทธิ์|guard/i.test(txt)) return <Users {...iconProps} />;
  if (/route|โครงสร้าง|structure|app|component/i.test(txt)) return <Layers {...iconProps} />;
  if (/login|เข้าสู่ระบบ|auth/i.test(txt)) return <LogIn {...iconProps} />;
  if (/home\s?page|landing/i.test(txt)) return <Home {...iconProps} />;
  if (/pwa|manifest|service\s*worker|icon/i.test(txt)) return <Star {...iconProps} />;
  if (/test|ตรวจสอบ|commit|push|git/i.test(txt)) return <GitBranch {...iconProps} />;
  if (/ตั้งค่า|config|option|parameter/i.test(txt)) return <Settings2 {...iconProps} />;
  return <Sparkles {...iconProps} />;
}
import { useMemo, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import devLogRaw from "../../devlog.md?raw";

interface DevLogEntry {
  date: string;
  items: string[];
}

function parseDevLog(raw: string): DevLogEntry[] {
  return raw
    .split(/^##\s+/m)
    .map((section) => section.trim())
    .filter(Boolean)
    .map((section) => {
      const [titleLine, ...rest] = section.split("\n");
      const date = titleLine.trim();
      const items = rest
        .map((line) => line.trim())
        .filter((line) => line.startsWith("- "))
        .map((line) => line.replace(/^-\s+/, ""));
      return { date, items };
    })
    .filter((entry) => /^\d{4}-\d{2}-\d{2}$/.test(entry.date))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function formatThaiDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatShortDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
  });
}

export default function DevLogCards() {
  const entries = useMemo<DevLogEntry[]>(() => parseDevLog(devLogRaw), []);
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (entries.length === 0) {
    return <p className="text-sm text-muted">ยังไม่มีบันทึก dev log</p>;
  }

  const selectedEntry = entries[selectedIdx] ?? entries[0];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-accent drop-shadow-sm">Dev Log</h2>
      </div>
      <div className="relative shadow-lg rounded-3xl bg-card">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {entries.map((entry) => (
              <CarouselItem key={entry.date} className="pl-0 basis-full">
                <div
                  className={cn(
                    "w-full h-full rounded-3xl bg-card p-6 mx-auto flex flex-col justify-center"
                  )}
                >
                  <div className="flex items-center mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-base md:text-lg text-foreground truncate drop-shadow-sm">{formatThaiDate(entry.date)}</div>
                    </div>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent ml-2">
                      {entry.items.length} รายการ
                    </span>
                  </div>
                  <div className="flex flex-row gap-4 items-start">
                    <div className="flex flex-col items-center pt-2 min-w-[33%] max-w-[33%]">
                      <span
                        className="flex items-center justify-center rounded-full shadow-lg border-2 border-white"
                        style={{ background: APP_CONFIG.schoolColors.pale, width: '100%', aspectRatio: '1/1', minWidth: 80, maxWidth: 160 }}
                      >
                        <span style={{ color: APP_CONFIG.schoolColors.accent, width: '60%', height: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{pickIcon(entry)}</span>
                      </span>
                    </div>
                    <ul className="flex-1 pl-2 md:pl-4 space-y-2 mt-2 list-disc text-xs md:text-sm text-muted">
                      {entry.items.map((item, i) => (
                        <li key={i} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
