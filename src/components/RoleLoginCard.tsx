import { type ReactNode } from "react";
import { APP_CONFIG } from "@/data/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";

interface RoleLoginCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  username: string;
  password: string;
  error: boolean;
  onUsername: (value: string) => void;
  onPassword: (value: string) => void;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function RoleLoginCard({
  title,
  subtitle,
  icon,
  username,
  password,
  error,
  onUsername,
  onPassword,
  onBack,
  onSubmit,
}: RoleLoginCardProps) {
  const primary = APP_CONFIG.schoolColors?.primary || "#1B78E2";
  const secondary = APP_CONFIG.schoolColors?.secondary || "#F9F7F4";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        background: `radial-gradient(circle at 80px 100px, rgba(255,255,255,0.85), transparent 28%), linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-10 top-20 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute right-10 top-1/4 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 shadow-2xl backdrop-blur-xl">
        <CardHeader className="relative flex flex-col items-center gap-4 bg-white/90 px-10 pt-10 pb-6 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-[2rem] bg-gradient-to-br from-white to-slate-100 shadow-lg ring-1 ring-slate-200">
            {icon ?? <Shield className="h-10 w-10 text-blue-600" />}
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-semibold text-slate-900">{title}</CardTitle>
            <CardDescription className="text-sm text-slate-600">{subtitle}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-10 pb-10 pt-4">
          <div className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm text-slate-700">
              ใช้บัญชีทดสอบ: <span className="font-semibold">username = {title.toLowerCase()}</span>, <span className="font-semibold">password = pass123</span>
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => onUsername(e.target.value)}
                placeholder="Enter username"
                className="bg-white"
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => onPassword(e.target.value)}
                placeholder="Enter password"
                className="bg-white"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">Username หรือ Password ไม่ถูกต้อง</p>}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="outline" size="lg" type="button" onClick={onBack} className="border-slate-200 text-slate-700 hover:bg-slate-100">
                <ArrowLeft className="h-4 w-4" /> ย้อนกลับ
              </Button>
              <Button size="lg" type="submit" className="bg-slate-900 text-white hover:bg-slate-800">
                เข้าสู่ระบบ
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
