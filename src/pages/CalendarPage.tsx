import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock, MapPin, Users, Edit3, Briefcase, Gift, UserCheck, GraduationCap, Presentation, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const eventDays = [5, 12, 15, 18, 22, 28];

const events: { d: number; t: string; ti: string; icon: LucideIcon; colorClass: string; bgClass: string }[] = [
  { d: 5, t: "ประชุมทีม", ti: "09:00", icon: Briefcase, colorClass: "text-indigo-500", bgClass: "bg-indigo-500" },
  { d: 12, t: "งานส่งมอบโปรเจกต์", ti: "14:00", icon: Presentation, colorClass: "text-blue-500", bgClass: "bg-blue-500" },
  { d: 15, t: "วันเกิดของคุณ", ti: "ทั้งวัน", icon: Gift, colorClass: "text-pink-500", bgClass: "bg-pink-500" },
  { d: 18, t: "นัดกับลูกค้า", ti: "10:30", icon: Handshake, colorClass: "text-amber-500", bgClass: "bg-amber-500" },
  { d: 22, t: "สัมมนา", ti: "13:00", icon: UserCheck, colorClass: "text-emerald-500", bgClass: "bg-emerald-500" },
  { d: 28, t: "ปิดสำเร็จการศึกษา", ti: "16:00", icon: GraduationCap, colorClass: "text-violet-500", bgClass: "bg-violet-500" },
];

const eventDetails: Record<number, { title: string; time: string; desc: string; location: string; attendees: string }> = {
  5: { title: "ประชุมทีม", time: "09:00", desc: "ประชุมวางแผนโปรเจกต์ใหม่", location: "ห้องประชุม A", attendees: "8 คน" },
  12: { title: "งานส่งมอบโปรเจกต์", time: "14:00", desc: "นำเสนอผลการทำงานต่อทีมหลัก", location: "ห้องนำเสนอ", attendees: "12 คน" },
  15: { title: "วันเกิดของคุณ", time: "ทั้งวัน", desc: "วันพิเศษของคุณ", location: "สำนักงาน", attendees: "ทีมงาน" },
  18: { title: "นัดกับลูกค้า", time: "10:30", desc: "อภิปรายข้อเสนอสัญญาใหม่", location: "ออนไลน์", attendees: "3 คน" },
  22: { title: "สัมมนา", time: "13:00", desc: "สัมมนาเรื่องการพัฒนาทักษะ", location: "ห้องประชุม B", attendees: "25 คน" },
  28: { title: "ปิดสำเร็จการศึกษา", time: "16:00", desc: "งานพิธีปิดสำเร็จการศึกษา", location: "ห้องสัญจร", attendees: "50 คน" },
};

const CalendarPage = () => {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [calTab, setCalTab] = useState<"upcoming" | "all">("upcoming");

  const openDetail = (day: number) => {
    setSelectedDay(day);
    setView("detail");
  };

  const detail = selectedDay ? eventDetails[selectedDay] : null;

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="mb-6 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setView("list")} className="text-sm font-semibold text-accent">ปฏิทิน</button>
            {view === "detail" && (
              <>
                <span className="text-muted">›</span>
                <span className="text-sm font-semibold text-muted">รายละเอียด</span>
              </>
            )}
          </div>
          {view === "list" && (
            <div className="flex gap-2">
              <button onClick={() => setCalTab("upcoming")} className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition ${calTab === "upcoming" ? "border-accent text-accent bg-accent/10" : "border-transparent text-muted"}`}>กำลังจะมา</button>
              <button onClick={() => setCalTab("all")} className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition ${calTab === "all" ? "border-accent text-accent bg-accent/10" : "border-transparent text-muted"}`}>ทั้งหมด</button>
            </div>
          )}
        </div>
      </div>

      {view === "list" ? (
        <div className="flex-1 overflow-auto">
          <h3 className="font-bold text-lg mb-4">มิถุนายน 2025</h3>
          <div className="info-card rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-muted mb-4">
              {days.map((d) => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold">
              {Array.from({ length: 30 }, (_, i) => {
                const d = i + 1;
                const isToday = d === 15;
                const hasEvent = eventDays.includes(d);
                return (
                  <button key={d} onClick={() => hasEvent && openDetail(d)} className={`py-3 rounded-lg font-bold transition-all hover:bg-secondary relative ${isToday ? "bg-accent text-accent-foreground" : ""}`}>
                    {d}
                    {hasEvent && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent" />}
                  </button>
                );
              })}
            </div>
          </div>
          <h4 className="font-bold text-lg mb-4">กิจกรรมที่กำลังจะมา</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((e) => {
              const Icon = e.icon;
              return (
                <button key={e.d} onClick={() => openDetail(e.d)} className="info-card rounded-2xl p-5 text-left hover:-translate-y-1 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${e.bgClass} text-accent-foreground`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm">{e.t}</p>
                      <p className="text-xs mt-1 text-muted">{e.ti}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : detail ? (
        <div className="flex-1 overflow-auto">
          <div className="info-card rounded-2xl p-8">
            <div className="flex items-start gap-6 mb-8 pb-8 border-b border-border">
              <div className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-2xl bg-accent text-accent-foreground">{selectedDay}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-3xl mb-2">{detail.title}</h3>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted" /><p className="text-sm text-muted">{detail.time}</p></div>
              </div>
            </div>
            <div className="space-y-6">
              <div><p className="text-xs uppercase tracking-widest font-semibold text-muted mb-3">รายละเอียด</p><p className="text-sm leading-relaxed">{detail.desc}</p></div>
              <div className="flex items-center gap-2 mb-2"><MapPin className="w-4 h-4 text-accent" /><p className="text-xs uppercase tracking-widest font-semibold text-muted">ที่ตั้ง</p></div>
              <p className="text-sm ml-6">{detail.location}</p>
              <div className="flex items-center gap-2 mb-2"><Users className="w-4 h-4 text-accent" /><p className="text-xs uppercase tracking-widest font-semibold text-muted">ผู้เข้าร่วม</p></div>
              <p className="text-sm ml-6">{detail.attendees}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-8 pt-8 border-t border-border">
              <button onClick={() => setView("list")} className="py-3 px-4 rounded-xl font-semibold text-sm bg-secondary flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
              </button>
              <button className="py-3 px-4 rounded-xl font-semibold text-sm bg-accent text-accent-foreground flex items-center justify-center gap-2">
                <Edit3 className="w-4 h-4" /> แก้ไข
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CalendarPage;
