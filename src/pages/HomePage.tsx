import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { roleAppsPath } from "@/shared/models/roles";
import { Users, TrendingUp, ShoppingCart, Sparkles, CheckCircle, Bell, Package, CalendarDays, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const recentActivity: { icon: LucideIcon; title: string; desc: string; time: string; colorClass: string; bgClass: string }[] = [
  { icon: Sparkles, title: "สมัครสมาชิกใหม่ 5 คน", desc: "เพิ่มเข้าสู่ระบบแล้ว", time: "2 นาทีที่แล้ว", colorClass: "text-emerald-500", bgClass: "bg-emerald-500/10" },
  { icon: CheckCircle, title: "ออเดอร์ #1042 สำเร็จ", desc: "จัดส่งเสร็จแล้ว", time: "15 นาทีที่แล้ว", colorClass: "text-blue-500", bgClass: "bg-blue-500/10" },
  { icon: Bell, title: "รายงานประจำสัปดาห์พร้อม", desc: "เตรียมสำหรับอนุมัติ", time: "1 ชม.ที่แล้ว", colorClass: "text-amber-500", bgClass: "bg-amber-500/10" },
];

const stats: { icon: LucideIcon; label: string; value: string; colorClass: string; bgClass: string }[] = [
  { icon: Users, label: "ผู้ใช้ทั้งหมด", value: "2,481", colorClass: "text-accent", bgClass: "bg-accent/10" },
  { icon: TrendingUp, label: "รายได้", value: "฿84.2K", colorClass: "text-emerald-500", bgClass: "bg-emerald-500/10" },
  { icon: ShoppingCart, label: "ออเดอร์", value: "364", colorClass: "text-blue-500", bgClass: "bg-blue-500/10" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const appStorePath = user ? roleAppsPath[user.role] : "/";

  return (
    <div className="h-full flex flex-col">
      <div className="relative overflow-hidden -mx-5 md:-mx-8 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-purple-500/5 to-blue-500/5" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <div className="relative z-10 px-5 md:px-8 py-8 h-full overflow-auto">
          {/* Welcome */}
          <div className="mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-3 leading-tight">
              <span className="bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
                ยินดีต้อนรับ
              </span>
            </h2>
            <p className="text-lg text-muted">มาเริ่มต้นวันที่ยอดเยี่ยมของคุณ</p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="info-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${s.bgClass}`}>
                        <Icon className={`w-7 h-7 ${s.colorClass}`} />
                      </div>
                      <div>
                        <p className="text-xs text-muted">{s.label}</p>
                        <p className="text-2xl font-bold mt-1">{s.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Cards */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">มาทำต่อไป</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => navigate(appStorePath)} className="info-card rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border-l-4 border-l-accent">
                <Package className="w-5 h-5 text-muted mb-3" />
                <h4 className="font-bold text-lg group-hover:text-accent transition">ดูแอปพลิเคชั่น</h4>
                <p className="text-sm mt-2 text-muted">ค้นหาและติดตั้งแอปใหม่</p>
              </button>
              <button onClick={() => navigate("/calendar")} className="info-card rounded-2xl p-6 text-left hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border-l-4 border-l-success">
                <CalendarDays className="w-5 h-5 text-muted mb-3" />
                <h4 className="font-bold text-lg group-hover:text-success transition">ดูปฏิทิน</h4>
                <p className="text-sm mt-2 text-muted">ตรวจสอบกิจกรรมที่จะมา</p>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">กิจกรรมล่าสุด</h3>
              <button onClick={() => navigate("/messages")} className="text-sm font-semibold text-accent hover:opacity-75 transition flex items-center gap-1">
                ดูทั้งหมด <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {recentActivity.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="info-card w-full rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${item.bgClass}`}>
                      <Icon className={`w-5 h-5 ${item.colorClass}`} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-semibold truncate">{item.title}</p>
                      <p className="text-xs mt-1 text-muted">{item.desc}</p>
                    </div>
                    <span className="text-xs font-semibold text-muted flex-shrink-0">{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
