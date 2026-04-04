import { ChevronRight } from "lucide-react";
import { useTheme, themeColors } from "@/contexts/ThemeContext";

const settingsItems = ["โปรไฟล์", "การแจ้งเตือน", "ความเป็นส่วนตัว", "ภาษา", "เกี่ยวกับ"];

const SettingsPage = () => {
  const { currentAccent, setTheme } = useTheme();

  return (
    <div>
      <div className="info-card rounded-2xl p-6 mb-6">
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
                boxShadow: currentAccent === theme.accent ? "0 0 0 3px white, 0 0 12px rgba(0,0,0,0.3)" : undefined,
              }}
              title={theme.name}
            />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {settingsItems.map((s) => (
          <button key={s} className="info-card w-full rounded-2xl p-4 flex items-center justify-between">
            <span className="font-semibold text-sm">{s}</span>
            <ChevronRight className="w-4 h-4 text-muted" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
