import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Play, CheckCircle, Trash2, Check, Star, Bell, RefreshCw, AppWindow } from "lucide-react";
import { appsData, type AppData } from "@/data/apps";

interface RoleAppStoreProps {
  role: string;
  roleName: string;
  roleLabel: string;
}

const StarRating = ({ rating = 5, max = 5 }: { rating?: number; max?: number }) => (
  <div className="flex gap-0.5">
    {Array(max)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted/30"}`}
        />
      ))}
  </div>
);

export function RoleAppStore({ role, roleName, roleLabel }: RoleAppStoreProps) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"store" | "installed">("store");
  const [detailApp, setDetailApp] = useState<AppData | null>(null);
  const [openedApp, setOpenedApp] = useState<AppData | null>(null);
  const [appTab, setAppTab] = useState(0);
  const [installedApps, setInstalledApps] = useState<string[]>([]);

  const availableApps = appsData.filter((app) => app.roles.includes(role));
  const getAppPath = (app: AppData) => `/app/${app.slug}/${role}`;

  const isInstalled = (id: number) => installedApps.includes(String(id));

  const installApp = (app: AppData) => {
    if (isInstalled(app.id)) {
      setDetailApp(null);
      navigate(getAppPath(app));
      return;
    }
    setInstalledApps((prev) => [...prev, String(app.id)]);
  };

  const uninstallApp = (id: number) => {
    setInstalledApps((prev) => prev.filter((appId) => appId !== String(id)));
    setOpenedApp(null);
  };

  if (openedApp) {
    const tabs = ["ข้อมูล", "ฟีเจอร์", "รีวิว", "ตั้งค่า"];
    const AppIcon = openedApp.icon;

    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
          <button onClick={() => setOpenedApp(null)} className="text-sm font-semibold text-accent flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
          </button>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <AppWindow className="w-4 h-4" /> {roleName} App Store
          </span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent/10">
            <AppIcon className={`w-6 h-6 ${openedApp.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-xl">{openedApp.name}</h2>
            <p className="text-xs text-muted">{openedApp.dev}</p>
          </div>
          <button onClick={() => uninstallApp(openedApp.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-destructive">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {tabs.map((tabLabel, index) => (
            <button
              key={tabLabel}
              onClick={() => setAppTab(index)}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap flex-shrink-0 transition ${
                index === appTab ? "bg-accent text-accent-foreground shadow-md" : "hover:bg-secondary"
              }`}
            >
              {tabLabel}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto">
          {appTab === 0 && (
            <div className="space-y-4">
              <div className="info-card rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3">เกี่ยวกับแอป</h3>
                <p className="text-sm leading-relaxed">{openedApp.desc}</p>
              </div>
              <div className="info-card rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">รายละเอียด</h3>
                {[
                  ["ขนาด", openedApp.size],
                  ["เวอร์ชัน", openedApp.version],
                  ["ผู้พัฒนา", openedApp.dev],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between py-3 border-b border-border last:border-0">
                    <span className="text-sm text-muted">{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {appTab === 1 && (
            <div className="info-card rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">ฟีเจอร์หลัก</h3>
              <ul className="space-y-3">
                {openedApp.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {appTab === 2 && (
            <div className="space-y-4">
              {[
                { user: "สมชาย ก.", rating: 5, text: "แอปที่ดีมากครับ ใช้งานง่ายและเร็ว", date: "2 วันที่แล้ว" },
                { user: "จุมพล ร.", rating: 5, text: "ชอบมากครับ แนะนำให้เพื่อนๆ", date: "1 สัปดาห์ที่ผ่านมา" },
                { user: "สกุลทิพย์ ร.", rating: 4, text: "ดีแต่ยังต้องปรับปรุงบ้าง", date: "2 สัปดาห์ที่ผ่านมา" },
              ].map((review) => (
                <div key={review.user} className="info-card rounded-2xl p-6">
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm">{review.user}</p>
                      <div className="mt-1">
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <span className="text-xs text-muted">{review.date}</span>
                  </div>
                  <p className="text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {appTab === 3 && (
            <div className="space-y-3">
              {[
                { label: "การแจ้งเตือน", icon: Bell },
                { label: "อัปเดตอัตโนมัติ", icon: RefreshCw },
              ].map((setting) => {
                const Icon = setting.icon;
                return (
                  <div key={setting.label} className="info-card w-full rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-sm">{setting.label}</span>
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
              <div className="mb-4">
                <StarRating />
              </div>
              <button
                onClick={() => {
                  if (installed) {
                    navigate(getAppPath(detailApp));
                  } else {
                    installApp(detailApp);
                  }
                }}
                className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-accent text-accent-foreground hover:opacity-90 flex items-center gap-2"
              >
                {installed ? (
                  <>
                    <Play className="w-4 h-4" /> เปิดแอป
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> ติดตั้ง
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-3">รายละเอียด</p>
              <p className="text-sm leading-relaxed">{detailApp.desc}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-muted mb-3">ฟีเจอร์</p>
              <ul className="text-sm space-y-2">
                {detailApp.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const installedAppsList = installedApps
    .map((appId) => appsData.find((app) => String(app.id) === appId))
    .filter(Boolean) as AppData[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted uppercase tracking-[0.2em] mb-1">App Store</p>
          <h2 className="text-3xl font-bold">{roleName} {roleLabel}</h2>
          <p className="text-sm text-muted">รวมแอปที่เหมาะกับ {roleLabel.toLowerCase()} ของโรงเรียน</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTab("store")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition ${
              tab === "store" ? "border-accent text-accent bg-accent/10" : "border-transparent text-muted"
            }`}
          >
            Store
          </button>
          <button
            onClick={() => setTab("installed")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition ${
              tab === "installed" ? "border-accent text-accent bg-accent/10" : "border-transparent text-muted"
            }`}
          >
            ที่ติดตั้ง
          </button>
        </div>
      </div>

      {availableApps.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-muted mb-4">ยังไม่มีแอปสำหรับบทบาทนี้</p>
          <p className="text-sm">ทีมพัฒนากำลังเพิ่มแอปใหม่สำหรับ {roleLabel}.</p>
        </div>
      ) : tab === "store" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableApps.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => setDetailApp(app)}
                className="info-card rounded-2xl p-4 flex flex-col items-center text-center hover:-translate-y-1 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-accent/10 mb-3 group-hover:scale-110 transition-transform">
                  <Icon className={`w-8 h-8 ${app.iconColor}`} />
                </div>
                <h3 className="font-bold text-sm mb-1 line-clamp-2">{app.name}</h3>
                <p className="text-xs text-muted mb-3">{app.dev}</p>
                <div className="mb-3">
                  <StarRating rating={4} />
                </div>
                <span className="text-xs px-2.5 py-1.5 rounded-lg bg-accent/10 text-accent">ดูเพิ่มเติม</span>
              </button>
            );
          })}
        </div>
      ) : installedAppsList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-muted mb-4">ยังไม่มีแอปที่ติดตั้ง</p>
          <button onClick={() => setTab("store")} className="px-4 py-2 rounded-xl text-sm font-semibold bg-accent text-accent-foreground">
            ไปที่ Store
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {installedAppsList.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => navigate(getAppPath(app))}
                className="info-card rounded-2xl p-4 flex flex-col items-center text-center hover:-translate-y-1 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-accent/10 mb-3">
                  <Icon className={`w-8 h-8 ${app.iconColor}`} />
                </div>
                <h3 className="font-bold text-sm mb-1">{app.name}</h3>
                <p className="text-xs text-muted mb-3">{app.dev}</p>
                <span className="installed-badge inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                  <CheckCircle className="w-3.5 h-3.5" /> เปิดแอป
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
