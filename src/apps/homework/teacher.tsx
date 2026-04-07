import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAppMode } from "@/shared/models/roles";
import AppPageShell from "@/components/AppPageShell";
import { BookOpen, ClipboardList } from "lucide-react";

export default function HomeworkTeacherApp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canViewStudent = user ? canAccessAppMode(user.role, 'student') : false;

  return (
    <AppPageShell
      title="Homework Hub (Teacher)"
      description="แจกการบ้าน, ตรวจงาน, และให้ feedback ได้ง่ายขึ้น"
      modeLabel="ครู"
      action={
        canViewStudent ? (
          <Button onClick={() => navigate('/app/homework/student')} variant="outline">ดูโหมดนักเรียน</Button>
        ) : null
      }
      tabs={[
        {
          id: 'dashboard',
          label: 'Dashboard',
          content: (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">นักเรียนทั้งหมด</h2>
                <p className="text-sm text-muted">กำลังติดตามงานของนักเรียน 18 คน และกำหนดส่งวันนี้ 3 รายการ</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">ปฏิทิน</h2>
                <p className="text-sm text-muted">ตั้งค่าการบ้านใหม่สำหรับสัปดาห์หน้า และตรวจงานให้เสร็จทันเวลา</p>
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
                <div className="flex items-center gap-3 text-sm text-muted">
                  <ClipboardList className="w-5 h-5" /> ติดตามงานของนักเรียน 18 คน
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">ปฏิทิน</h2>
                <p className="text-sm text-muted">กำหนดส่งงานใหม่ในสัปดาห์หน้า และส่งคะแนนภายในวันพรุ่งนี้</p>
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
                <h2 className="font-semibold text-lg mb-3">ตั้งค่าแจ้งเตือน</h2>
                <p className="text-sm text-muted">แจ้งเตือนการส่งงานและสถานะตรวจงานให้ครูทราบทันที</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">การแชร์กับนักเรียน</h2>
                <p className="text-sm text-muted">แก้ไขวิธีส่งและการสื่อสารผลตอบรับกับนักเรียน</p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
