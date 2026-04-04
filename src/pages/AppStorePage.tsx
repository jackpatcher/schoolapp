import { useState } from "react";
import { ArrowLeft, Download, Play, CheckCircle, Trash2, Check, Star, Bell, RefreshCw } from "lucide-react";
import { appsData, type AppData } from "@/data/apps";

interface InstalledApp {
  app_id: string;
  app_name: string;
  installed_at: string;
}

const StarRating = ({ rating = 5, max = 5 }: { rating?: number; max?: number }) => (
  <div className="flex gap-0.5">
    {Array(max).fill(0).map((_, i) => (
      <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted/30"}`} />
    ))}
  </div>
);

const AppStorePage = () => {
  const [tab, setTab] = useState<"store" | "installed">("store");
  const [detailApp, setDetailApp] = useState<AppData | null>(null);
  const [installedApps, setInstalledApps] = useState<InstalledApp[]>([]);
  const [openedApp, setOpenedApp] = useState<AppData | null>(null);
  const [appTab, setAppTab] = useState(0);

  const isInstalled = (id: number) => installedApps.some((a) => a.app_id === String(id));

  const installApp = (app: AppData) => {
    if (isInstalled(app.id)) {
      setOpenedApp(app);
      setDetailApp(null);
      return;
    }
    setInstalledApps((prev) => [...prev, { app_id: String(app.id), app_name: app.name, installed_at: new Date().toISOString() }]);
  };

  const uninstallApp = (id: number) => {
    setInstalledApps((prev) => prev.filter((a) => a.app_id !== String(id)));
    setOpenedApp(null);
  };

  // Opened app detail view
  if (openedApp) {
    const tabs = ["ข้อมูล", "ฟีเจอร์", "รีวิว", "ตั้งค่า"];
    const AppIcon = openedApp.icon;
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <button onClick={() => setOpenedApp(null)} className="text-sm font-semibold text-accent flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
          </button>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-accent/10`}>
            <AppIcon className={`w-6 h-6 ${openedApp.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg">{openedApp.name}</h2>
            <p className="text-xs text-muted">{openedApp.dev}</p>
          </div>
          <button onClick={() => uninstallApp(openedApp.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setAppTab(i)} className={`px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap flex-shrink-0 transition ${i === appTab ? "bg-accent text-accent-foreground shadow-md" : "hover:bg-secondary"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto">
          {appTab === 0 && (
            <div className="space-y-4">
              <div className="info-card rounded-2xl p-6"><h3 className="font-bold text-lg mb-3">เกี่ยวกับแอป</h3><p className="text-sm leading-relaxed">{openedApp.desc}</p></div>
              <div className="info-card rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">รายละเอียด</h3>
                {[["ขนาด", openedApp.size], ["เวอร์ชัน", openedApp.version], ["ผู้พัฒนา", openedApp.dev]].map(([l, v]) => (
                  <div key={l} className="flex justify-between py-3 border-b border-border last:border-0"><span className="text-sm text-muted">{l}</span><span className="font-semibold">{v}</span></div>
                ))}
              </div>
            </div>
          )}
          {appTab === 1 && (
            <div className="info-card rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">ฟีเจอร์หลัก</h3>
              <ul className="space-y-3">
                {openedApp.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {appTab === 2 && (
            <div className="space-y-4">
              {[{ user: "สมชาย ก.", rating: 5, text: "แอปที่ดีมากครับ ใช้งานง่ายและเร็ว", date: "2 วันที่แล้ว" }, { user: "จุมพล ร.", rating: 5, text: "ชอบมากครับ แนะนำให้เพื่อนๆ", date: "1 สัปดาห์ที่แล้ว" }, { user: "สกุลทิพย์ ร.", rating: 4, text: "ดีแต่ยังต้องปรับปรุงบ้าง", date: "2 สัปดาห์ที่แล้ว" }].map((r) => (
                <div key={r.user} className="info-card rounded-2xl p-6">
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm">{r.user}</p>
                      <div className="mt-1"><StarRating rating={r.rating} /></div>
                    </div>
                    <span className="text-xs text-muted">{r.date}</span>
                  </div>
                  <p className="text-sm">{r.text}</p>
                </div>
              ))}
            </div>
          )}
          {appTab === 3 && (
            <div className="space-y-3">
              {[
                { label: "การแจ้งเตือน", icon: Bell },
                { label: "อัปเดตอัตโนมัติ", icon: RefreshCw },
              ].map((s) => {
                const SIcon = s.icon;
                return (
                  <div key={s.label} className="info-card w-full rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SIcon className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-sm">{s.label}</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer accent-accent" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Detail view
  if (detailApp) {
    const installed = isInstalled(detailApp.id);
    const DetailIcon = detailApp.icon;
    return (
      <div>
        <button onClick={() => setDetailApp(null)} className="flex items-center gap-2 text-sm font-semibold text-accent mb-6 pb-4 border-b border-border">
          <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
        </button>
        <div className="info-card rounded-2xl p-8">
          <div className="flex items-start gap-6 mb-8 pb-8 border-b border-border">
            <div className="w-24 h-24 rounded-2xl flex-shrink-0 flex items-center justify-center bg-accent/10">
              <DetailIcon className={`w-12 h-12 ${detailApp.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-3xl mb-2">{detailApp.name}</h2>
              <p className="text-sm text-muted mb-3">{detailApp.dev}</p>
              <div className="mb-4"><StarRating /></div>
              <button
                onClick={() => { installed ? (setOpenedApp(detailApp), setDetailApp(null)) : installApp(detailApp); }}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-accent text-accent-foreground hover:opacity-90 flex items-center gap-2"
              >
                {installed ? <><Play className="w-4 h-4" /> เปิดแอป</> : <><Download className="w-4 h-4" /> ติดตั้ง</>}
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div><p className="text-xs uppercase tracking-widest font-semibold text-muted mb-3">รายละเอียด</p><p className="text-sm leading-relaxed">{detailApp.desc}</p></div>
            <div><p className="text-xs uppercase tracking-widest font-semibold text-muted mb-3">ฟีเจอร์</p>
              <ul className="text-sm space-y-2">{detailApp.features.map((f) => (
                <li key={f} className="flex items-start gap-2"><Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />{f}</li>
              ))}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view
  const installedAppsList = installedApps.map((r) => appsData.find((a) => a.id === parseInt(r.app_id))).filter(Boolean) as AppData[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg">แอปพลิเคชั่นที่ได้รับความนิยม</h3>
        <div className="flex gap-2">
          <button onClick={() => setTab("store")} className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition ${tab === "store" ? "border-accent text-accent bg-accent/10" : "border-transparent text-muted"}`}>Store</button>
          <button onClick={() => setTab("installed")} className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition ${tab === "installed" ? "border-accent text-accent bg-accent/10" : "border-transparent text-muted"}`}>ที่ติดตั้ง</button>
        </div>
      </div>

      {tab === "store" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {appsData.map((app) => {
            const Icon = app.icon;
            return (
              <button key={app.id} onClick={() => setDetailApp(app)} className="info-card rounded-2xl p-4 flex flex-col items-center text-center hover:-translate-y-1 transition-all group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-accent/10 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className={`w-8 h-8 ${app.iconColor}`} />
                </div>
                <h3 className="font-bold text-sm mb-1 line-clamp-2">{app.name}</h3>
                <p className="text-xs text-muted mb-3">{app.dev}</p>
                <div className="mb-3"><StarRating rating={4} /></div>
                <span className="text-xs px-2.5 py-1.5 rounded-lg bg-accent/10 text-accent">ดูเพิ่มเติม</span>
              </button>
            );
          })}
        </div>
      ) : (
        installedAppsList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted mb-4">ยังไม่มีแอปที่ติดตั้ง</p>
            <button onClick={() => setTab("store")} className="px-4 py-2 rounded-xl text-sm font-semibold bg-accent text-accent-foreground">ไปที่ Store</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {installedAppsList.map((app) => {
              const Icon = app.icon;
              return (
                <button key={app.id} onClick={() => { setOpenedApp(app); setAppTab(0); }} className="info-card rounded-2xl p-4 flex flex-col items-center text-center hover:-translate-y-1 transition-all group">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-accent/10 mb-3">
                    <Icon className={`w-8 h-8 ${app.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{app.name}</h3>
                  <p className="text-xs text-muted mb-3">{app.dev}</p>
                  <span className="installed-badge"><CheckCircle className="w-3.5 h-3.5" /> เปิดแอป</span>
                </button>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

export default AppStorePage;
