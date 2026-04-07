import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAppMode } from "@/shared/models/roles";
import AppPageShell from "@/components/AppPageShell";
import { Music, BarChart3 } from "lucide-react";

export default function SpotifyTeacherApp() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canViewStudent = user ? canAccessAppMode(user.role, 'student') : false;

  return (
    <AppPageShell
      title="Spotify for Teachers"
      description="จัดเพลย์ลิสต์ให้เหมาะกับบรรยากาศการสอนและช่วยนักเรียนโฟกัส"
      modeLabel="ครู"
      action={
        canViewStudent ? (
          <Button onClick={() => navigate('/app/spotify/student')} variant="outline">กลับไปดูโหมดนักเรียน</Button>
        ) : null
      }
      tabs={[
        {
          id: 'dashboard',
          label: 'Dashboard',
          content: (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">สรุปชั่วโมงเรียน</h2>
                <p className="text-sm text-muted">เพลย์ลิสต์สำหรับการสอน 5 ชุด และกิจกรรมโฟกัส 3 แบบ</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">การนำไปใช้</h2>
                <p className="text-sm text-muted">แชร์เพลย์ลิสต์กับนักเรียนเพื่อช่วยให้บรรยากาศคาบเรียนดีขึ้น</p>
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
                <h2 className="font-semibold text-lg mb-3">การใช้งาน</h2>
                <p className="text-sm text-muted">สร้างเพลย์ลิสต์สำหรับชั่วโมงเรียนและแบ่งปันกับนักเรียนของคุณ</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">สถิติ</h2>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <BarChart3 className="w-5 h-5" /> เพลย์ลิสต์ยอดนิยม 8 เพลย์ลิสต์
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
                <h2 className="font-semibold text-lg mb-3">โหมดเสียงในชั้นเรียน</h2>
                <p className="text-sm text-muted">ปรับโหมดเสียงเพื่อให้เหมาะกับการเรียนหรือกิจกรรมกลุ่ม</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5">
                <h2 className="font-semibold text-lg mb-3">แชร์เพลย์ลิสต์</h2>
                <p className="text-sm text-muted">เผยแพร่เพลย์ลิสต์ให้กับนักเรียนหรือทีมงานได้ทันที</p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
