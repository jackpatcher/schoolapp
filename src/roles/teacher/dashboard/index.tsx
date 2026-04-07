import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">แดชบอร์ดครู</h1>
        <p className="text-sm text-muted mb-6">จัดการชั้นเรียน, ตรวจงาน, และส่งข้อความให้ผู้ปกครองได้เร็วขึ้น</p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={() => navigate("/teacher/apps")}>App Store ครู</Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/teacher/timetable")}>ดูตารางสอน</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">ชั้นเรียนวันนี้</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>สอนคณิตศาสตร์ ม.3</li>
            <li>ส่งรายงานการบ้าน 4 ชุด</li>
            <li>นัดประชุมผู้ปกครอง 1 ครั้ง</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">แจ้งเตือนสำคัญ</h2>
          <p className="text-sm text-muted">ตรวจสอบการแจ้งเตือนจากฝ่ายบริหาร และตอบกลับข้อความจากผู้ปกครองภายในวันนี้</p>
        </div>
      </div>
    </div>
  );
}
