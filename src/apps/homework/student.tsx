import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAppMode } from "@/shared/models/roles";
import AppPageShell from "@/components/AppPageShell";
import { BookOpen, CheckSquare } from "lucide-react";

export default function HomeworkStudentApp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canViewTeacher = user ? canAccessAppMode(user.role, 'teacher') : false;

  return (
    <AppPageShell
      title="Homework Hub (Student)"
      description="ติดตามการบ้าน, ส่งงาน, และดูคะแนนจากครู"
      modeLabel="นักเรียน"
      action={
        canViewTeacher ? (
          <Button onClick={() => navigate('/app/homework/teacher')} variant="outline">ดูโหมดครู</Button>
        ) : null
      }
      tabs={[
        {
          id: 'dashboard',
          label: 'Dashboard',
          content: (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">สรุปงาน</h2>
                <p className="text-sm text-muted">เหลืองาน 3 รายการ และมีคะแนนจากครูรอเช็ค 1 ชิ้น</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">กำหนดส่ง</h2>
                <p className="text-sm text-muted">ข้อสอบคณิตวันพรุ่งนี้ และโครงงานวิทย์ส่งวันอังคารหน้า</p>
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
                  <CheckSquare className="w-5 h-5" /> งานที่ต้องส่ง 3 รายการ
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">ล่าสุด</h2>
                <p className="text-sm text-muted">ส่งโครงงานวิทย์เรียบร้อยแล้ว และมีงานคณิตที่กำลังจะมาถึง</p>
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
                <h2 className="font-semibold text-lg mb-3">การแจ้งเตือน</h2>
                <p className="text-sm text-muted">เลือกแจ้งเตือนการบ้านก่อนกำหนดส่ง</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">การนำส่ง</h2>
                <p className="text-sm text-muted">ตรวจสอบว่าไฟล์ส่งสำเร็จและได้คะแนนหรือยัง</p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
