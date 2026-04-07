import { type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Role, roleAppsPath } from "@/shared/models/roles";

interface AppAccessGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

export default function AppAccessGuard({ allowedRoles, children }: AppAccessGuardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  if (!user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-lg">
          <p className="text-lg font-semibold mb-4">กรุณาเข้าสู่ระบบก่อน</p>
          <p className="text-sm text-muted mb-6">คุณต้องเข้าสู่ระบบเพื่อเข้าถึงหน้าแอปนี้</p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => navigate("/login", { state: { from: currentPath } })}>ไปหน้าล็อกอิน</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-lg">
          <p className="text-lg font-semibold mb-4">คุณไม่มีสิทธิ์เข้าถึงโหมดนี้</p>
          <p className="text-sm text-muted mb-6">กลับไปยัง App Store ของคุณหรือเลือกโหมดที่เหมาะสมกับบทบาทของคุณ</p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => navigate(roleAppsPath[user.role])}>กลับไป App Store</Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
