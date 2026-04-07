import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAppMode } from "@/shared/models/roles";
import AppPageShell from "@/components/AppPageShell";
import { ShieldCheck, Newspaper } from "lucide-react";

export default function NoticeAdminApp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canViewTeacher = user ? canAccessAppMode(user.role, 'teacher') : false;

  return (
    <AppPageShell
      title="School Notice (Admin)"
      description="จัดการประกาศสำคัญของโรงเรียนและตั้งค่าการเผยแพร่"
      modeLabel="ผู้บริหาร"
      action={
        canViewTeacher ? (
          <Button onClick={() => navigate('/app/notice/teacher')} variant="outline">ดูโหมดครู</Button>
        ) : null
      }
      tabs={[
        {
          id: 'dashboard',
          label: 'Dashboard',
          content: (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">สรุปการประกาศ</h2>
                <p className="text-sm text-muted">ประกาศ 7 รายการเผยแพร่ในสัปดาห์นี้ พร้อมรายงานการเข้าถึง</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">การเผยแพร่</h2>
                <p className="text-sm text-muted">ควบคุมการแจ้งเตือนฉุกเฉินและข่าวสารโรงเรียนได้ทันที</p>
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
                <h2 className="font-semibold text-lg mb-3">การเผยแพร่</h2>
                <p className="text-sm text-muted">เปิด/ปิดการแจ้งเตือนสถานการณ์ฉุกเฉินและข่าวสารโรงเรียน</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Newspaper className="w-5 h-5" /> ประกาศถูกเผยแพร่ 7 รายการในสัปดาห์นี้
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
                <h2 className="font-semibold text-lg mb-3">ตั้งค่าการเผยแพร่</h2>
                <p className="text-sm text-muted">กำหนดระดับการแจ้งเตือนสำหรับผู้ปกครองและครู</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">การอนุมัติประกาศ</h2>
                <p className="text-sm text-muted">จัดการกระบวนการอนุมัติประกาศก่อนเผยแพร่</p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
