import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, AppWindow, MessageCircle, CalendarDays, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { id: "/", icon: Home, label: "หน้าหลัก" },
  { id: "/analytics", icon: AppWindow, label: "App Store", badge: 0 },
  { id: "/messages", icon: MessageCircle, label: "ข้อความ", badge: 3 },
  { id: "/calendar", icon: CalendarDays, label: "ปฏิทิน", badge: 0 },
  { id: "/settings", icon: Settings, label: "ตั้งค่า", badge: 0 },
];

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const currentNav = navItems.find((n) => n.id === currentPath);
  const pageTitle = currentNav?.label ?? "หน้าหลัก";

  // ถ้าเป็นหน้า LandingPage (path '/') หรือหน้า LoginPage (path '/login') ให้ render เฉพาะ <Outlet />
  if (currentPath === "/" || currentPath === "/login") {
    return <Outlet />;
  }

  return (
    <div className="h-screen w-full flex bg-background overflow-hidden">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-card border-r border-border flex-shrink-0 h-full shadow-sm">
        <div className="p-6 pb-4 border-b border-border">
          <h1 className="text-2xl font-bold tracking-tight text-accent">AppName</h1>
          <p className="text-xs mt-1.5 text-muted">Dashboard</p>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-auto py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${active ? "active bg-secondary font-semibold text-accent" : "hover:bg-secondary font-medium"}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.badge ? <span className="ml-auto bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{item.badge}</span> : null}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-secondary">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-accent text-accent-foreground font-semibold text-sm flex-shrink-0">
              {user?.name?.[0] ?? "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{user?.name ?? "User"}</p>
              <p className="text-xs text-muted">{user?.role}@school.edu</p>
            </div>
          </div>
          <button onClick={logout} className="w-full mt-3 px-4 py-2 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 transition flex items-center gap-2 justify-center">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-full min-w-0">
        <header className="flex items-center gap-3 px-5 py-4 md:px-8 md:py-5 border-b border-border flex-shrink-0 bg-card shadow-sm">
          <h2 className="text-2xl font-bold flex-1">{pageTitle}</h2>
        </header>
        <div className="flex-1 overflow-auto p-5 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </div>
      </main>

      {/* Bottom nav mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-stretch z-50 shadow-2xl" style={{ height: 64 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPath === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`nav-item flex-1 flex flex-col items-center justify-center gap-1.5 relative transition ${active ? "active text-accent" : "text-muted"}`}
            >
              <span className="relative">
                <Icon className="w-5 h-5" />
                {item.badge ? <span className="absolute -top-1 -right-2 bg-destructive text-destructive-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{item.badge}</span> : null}
              </span>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
