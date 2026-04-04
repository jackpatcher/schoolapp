import React, { createContext, useContext, useState, useCallback } from "react";

interface ThemeColor {
  name: string;
  accent: string;
  bg: string;
}

export const themeColors: ThemeColor[] = [
  { name: "Indigo", accent: "#6366f1", bg: "#f8f9fb" },
  { name: "Purple", accent: "#a855f7", bg: "#faf5ff" },
  { name: "Pink", accent: "#ec4899", bg: "#fdf2f8" },
  { name: "Red", accent: "#ef4444", bg: "#fef2f2" },
  { name: "Orange", accent: "#f97316", bg: "#fff7ed" },
  { name: "Amber", accent: "#f59e0b", bg: "#fffbeb" },
  { name: "Lime", accent: "#84cc16", bg: "#f7fee7" },
  { name: "Green", accent: "#10b981", bg: "#f0fdf4" },
  { name: "Emerald", accent: "#059669", bg: "#f0fdf4" },
  { name: "Cyan", accent: "#06b6d4", bg: "#ecf0ff" },
  { name: "Blue", accent: "#3b82f6", bg: "#eff6ff" },
  { name: "Slate", accent: "#64748b", bg: "#f8fafc" },
];

interface ThemeContextType {
  currentAccent: string;
  setTheme: (accent: string, bg: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

function hexToHSL(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAccent, setCurrentAccent] = useState("#6366f1");

  const setTheme = useCallback((accent: string, bg: string) => {
    setCurrentAccent(accent);
    const root = document.documentElement;
    root.style.setProperty("--accent", hexToHSL(accent));
    root.style.setProperty("--primary", hexToHSL(accent));
    root.style.setProperty("--ring", hexToHSL(accent));
    root.style.setProperty("--background", hexToHSL(bg));
  }, []);

  return <ThemeContext.Provider value={{ currentAccent, setTheme }}>{children}</ThemeContext.Provider>;
};
