import React from "react";
import { Sparkles, Paintbrush, GitBranch, FileText, Settings2, UploadCloud, Users, Home, Layers, LogIn, Star } from "lucide-react";
import { APP_CONFIG } from "@/data/config";
import type { DevLogEntry } from "@/data/devlog";

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

const iconMap: Record<NonNullable<DevLogEntry["icon"]>, React.ComponentType<React.ComponentProps<typeof Sparkles>>> = {
  UploadCloud,
  Paintbrush,
  GitBranch,
  FileText,
  Settings2,
  Users,
  Home,
  Layers,
  LogIn,
  Star,
};

function getIconForEntry(entry: DevLogEntry) {
  const iconProps = { className: "w-12 h-12 md:w-16 md:h-16", strokeWidth: 1.8 };
  if (entry.icon && iconMap[entry.icon]) {
    const IconComponent = iconMap[entry.icon];
    return <IconComponent {...iconProps} />;
  }
  return <Sparkles {...iconProps} />;
}

  interface Props {
    entries: DevLogEntry[];
    emblaRef?: (el: HTMLDivElement | null) => void;
  }

  export default function DevLogCards({ entries, emblaRef }: Props) {
    const { primary, accent, pale } = APP_CONFIG.schoolColors;
    if (!entries || entries.length === 0) return <p className="text-sm" style={{ color: "#6b7280" }}>ยังไม่มีบันทึก dev log</p>;

    return (
      <div className="w-full">
        <div className="mb-4">
          <h2 className="text-lg font-bold" style={{ color: accent }}>Dev Log</h2>
        </div>

        <div className="relative shadow-lg rounded-3xl overflow-hidden" style={{ backgroundColor: pale }}>
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {entries.map((entry) => (
                <div key={entry.date} className="embla__slide basis-full pl-4 pr-4" style={{ minWidth: "100%" }}>
                  <div className="w-full h-full rounded-3xl p-6 mx-auto flex gap-6 items-start" style={{ boxSizing: "border-box", backgroundColor: "#ffffff" }}>
                    <div className="w-1/3 flex items-center justify-center">
                      <div
                        className="rounded-full shadow-lg flex items-center justify-center"
                        style={{ background: APP_CONFIG.schoolColors.pale, width: 160, height: 160 }}
                      >
                        <span style={{ color: APP_CONFIG.schoolColors.accent }}>{getIconForEntry(entry)}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-bold text-base md:text-lg" style={{ color: primary }}>{formatThaiDate(entry.date)}</div>
                          <div className="text-xs mt-1" style={{ color: "#6b7280" }}>{formatShortDate(entry.date)}</div>
                        </div>
                        <div>
                          <span
                            className="rounded-full px-3 py-1 text-xs font-semibold"
                            style={{ backgroundColor: `${accent}20`, color: accent }}
                          >
                            {entry.items.length} รายการ
                          </span>
                        </div>
                      </div>

                      <ul className="list-disc pl-5 text-xs md:text-sm space-y-2" style={{ color: "#6b7280" }}>
                        {entry.items.map((it, i) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }