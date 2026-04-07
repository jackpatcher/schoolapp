import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAppMode } from "@/shared/models/roles";
import AppPageShell from "@/components/AppPageShell";
import { MessageCircle, Megaphone } from "lucide-react";

export default function NoticeTeacherApp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canViewAdmin = user ? canAccessAppMode(user.role, 'admin') : false;

  return (
    <AppPageShell
      title="School Notice (Teacher)"
      description="ส่งประกาศห้องเรียนและแจ้งข่าวสารถึงผู้ปกครองได้ทันที"
      modeLabel="ครู"
      action={
        canViewAdmin ? (
          <Button onClick={() => navigate('/app/notice/admin')} variant="outline">ดูโหมดผู้บริหาร</Button>
        ) : null
      }
      tabs={[
        {
          id: 'dashboard',
          label: 'Dashboard',
          content: (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">ประกาศล่าสุด</h2>
                <p className="text-sm text-muted">แจ้งนักเรียนและผู้ปกครองเรื่องการบ้านและกิจกรรมพิเศษ</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">สถานะการประกาศ</h2>
                <p className="text-sm text-muted">ประกาศ 5 รายการเผยแพร่แล้วในสัปดาห์นี้</p>
              </div>
            </div>
          ),
        },
        {
          id: 'app',
          label: 'App',
          content: (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">ประกาศล่าสุด</h2>
                <p className="text-sm text-muted">เตือนนักเรียนเรื่องการบ้านและกิจกรรมพิเศษในสัปดาห์นี้</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Megaphone className="w-5 h-5" /> ส่งประกาศใหม่ได้ในคลิกเดียว
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'settings',
          label: 'Settings',
          content: (
            <div className="space-y-4">
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">การตั้งค่าแจ้งเตือน</h2>
                <p className="text-sm text-muted">เลือกให้แจ้งข่าวสำคัญเฉพาะผู้ปกครองหรือทั้งโรงเรียน</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">สิทธิ์ประกาศ</h2>
                <p className="text-sm text-muted">จัดการการอนุมัติประกาศก่อนเผยแพร่</p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
