import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useTheme, themeColors } from "@/contexts/ThemeContext";
import DevLogCards from "@/components/DevLogCards";

const settingsItems = [
  { key: "profile", label: "โปรไฟล์" },
  { key: "notifications", label: "การแจ้งเตือน" },
  { key: "privacy", label: "ความเป็นส่วนตัว" },
  { key: "language", label: "ภาษา" },
  { key: "about", label: "เกี่ยวกับ" },
];

const aboutSubItems = [{ key: "devlog", label: "Dev Log" }];

const SettingsPage = () => {
  const { currentAccent, setTheme } = useTheme();
  const [selected, setSelected] = useState("profile");
  const [selectedAboutTab, setSelectedAboutTab] = useState("devlog");

  const renderContent = () => {
    if (selected === "about") {
      return (
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)]">
            <div className="space-y-2 rounded-3xl border border-border bg-card p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-muted">เกี่ยวกับ</p>
              {aboutSubItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSelectedAboutTab(item.key)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    selectedAboutTab === item.key
                      ? "bg-accent/10 text-accent"
                      : "hover:bg-muted text-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              {selectedAboutTab === "devlog" ? (
                <>
                  <div className="mb-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-muted">เกี่ยวกับ</p>
                    <h2 className="text-2xl font-bold">Dev Log</h2>
                    <p className="mt-2 text-sm text-muted">บันทึกการพัฒนาในแต่ละวัน ที่อ่านง่ายและดูเรียบร้อย</p>
                  </div>
                  <DevLogCards />
                </>
              ) : null}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold">{settingsItems.find((item) => item.key === selected)?.label}</p>
        <p className="mt-3 text-sm text-muted">เนื้อหาในหมวดนี้ยังไม่มี แต่สามารถเพิ่มรายละเอียดได้ตามต้องการ</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="info-card rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-4">เลือกธีมสี</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
          {themeColors.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setTheme(theme.accent, theme.bg)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full transition-all border-4 cursor-pointer hover:scale-110"
              style={{
                backgroundColor: theme.accent,
                borderColor: theme.accent,
                boxShadow:
                  currentAccent === theme.accent
                    ? "0 0 0 3px white, 0 0 12px rgba(0,0,0,0.3)"
                    : undefined,
              }}
              title={theme.name}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <div className="space-y-3">
          {settingsItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelected(item.key)}
              className={`info-card w-full rounded-2xl p-4 text-left transition ${
                selected === item.key ? "border-accent bg-accent/10" : "hover:bg-muted"
              }`}
            >
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
