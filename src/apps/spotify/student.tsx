import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAppMode } from "@/shared/models/roles";
import AppPageShell from "@/components/AppPageShell";
import { Music } from "lucide-react";

export default function SpotifyStudentApp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canViewTeacher = user ? canAccessAppMode(user.role, 'teacher') : false;

  return (
    <AppPageShell
      title="Spotify for Students"
      description="เพลย์ลิสต์สำหรับโฟกัสการเรียนและพักผ่อนหลังเลิกเรียน"
      modeLabel="นักเรียน"
      action={
        canViewTeacher ? (
          <Button onClick={() => navigate('/app/spotify/teacher')} variant="outline">ดูโหมดครู</Button>
        ) : null
      }
      tabs={[
        {
          id: 'dashboard',
          label: 'Dashboard',
          content: (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">สรุปการใช้งาน</h2>
                <p className="text-sm text-muted">ฟังเพลง 24 ชั่วโมงในสัปดาห์นี้ พร้อมเพลย์ลิสต์ช่วยโฟกัส 5 รายการ</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">เป้าหมายวันนี้</h2>
                <p className="text-sm text-muted">สร้างเพลย์ลิสต์ใหม่และเพิ่มโหมดเรียนเพื่อโฟกัสสูงสุด</p>
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
                <h2 className="font-semibold text-lg mb-3">เพลย์ลิสต์แนะนำ</h2>
                <ul className="space-y-3 text-sm text-muted">
                  <li>Study Beats</li>
                  <li>Morning Focus</li>
                  <li>Relaxing Piano</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">กิจกรรม</h2>
                <p className="text-sm text-muted">เปิดเพลงช่วยโฟกัสก่อนสอบ และแชร์เพลย์ลิสต์กับเพื่อนในห้องเรียน</p>
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
                <h2 className="font-semibold text-lg mb-3">การตั้งค่าเสียง</h2>
                <p className="text-sm text-muted">ปรับความดังและเปิดโหมดเงียบสำหรับการเรียน</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">การแจ้งเตือน</h2>
                <p className="text-sm text-muted">เปิดการแจ้งเตือนเพลย์ลิสต์ใหม่เฉพาะเวลาที่เหมาะสม</p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
