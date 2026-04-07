import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">แดชบอร์ดนักเรียน</h1>
        <p className="text-sm text-muted mb-6">เข้าถึงตารางเรียน, คะแนน, และข่าวสารที่สำคัญสำหรับนักเรียนของโรงเรียน</p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={() => navigate("/student/apps")}>App Store นักเรียน</Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/student/timetable")}>ดูตารางเรียน</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">สรุปวันนี้</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>ตารางเรียน 6 วิชา</li>
            <li>งานที่ต้องส่ง 2 รายการ</li>
            <li>ประกาศใหม่ 3 เรื่อง</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">กิจกรรมแนะนำ</h2>
          <p className="text-sm text-muted">เข้าร่วมชมรมดนตรีหรือกิจกรรมภาษาต่างประเทศเพื่อเพิ่มคะแนนและสนุกกับเพื่อนในโรงเรียน</p>
        </div>
      </div>
    </div>
  );
}
