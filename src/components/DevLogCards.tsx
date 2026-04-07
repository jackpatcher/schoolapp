import { useMemo, useState } from "react";
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
  const [selectedDate, setSelectedDate] = useState(entries[0]?.date || "");

  if (entries.length === 0) {
    return <p className="text-sm text-muted">ยังไม่มีบันทึก dev log</p>;
  }

  const selectedEntry = entries.find((entry) => entry.date === selectedDate) ?? entries[0];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Dev Log</p>
            <h2 className="text-2xl font-bold">ประวัติการพัฒนา</h2>
            <p className="mt-2 text-sm text-muted max-w-2xl">
              เลือกวันที่เพื่อดูงานที่ทำในแต่ละวัน โดยแสดงปริมาณงานและรายละเอียดอย่างชัดเจน
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {entries.length} วัน
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-4 xl:grid-cols-5">
          {entries.map((entry) => (
            <button
              key={entry.date}
              onClick={() => setSelectedDate(entry.date)}
              className={cn(
                "group flex flex-col rounded-3xl border-l-4 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                selectedEntry.date === entry.date
                  ? "border-accent bg-accent/5"
                  : "border-border bg-white"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                  {formatShortDate(entry.date)}
                </p>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                  {entry.items.length}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold leading-tight text-foreground">
                {formatThaiDate(entry.date)}
              </h3>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted">รายละเอียดวันที่</p>
            <h3 className="text-2xl font-bold text-foreground">{formatThaiDate(selectedEntry.date)}</h3>
          </div>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {selectedEntry.items.length} รายการ
          </span>
        </div>
        <div className="space-y-3">
          {selectedEntry.items.map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-sm text-muted">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
