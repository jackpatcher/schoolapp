import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ParentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">แดชบอร์ดผู้ปกครอง</h1>
        <p className="text-sm text-muted mb-6">ติดตามผลการเรียน, การบ้าน และข่าวสารของบุตรหลานได้ในที่เดียว</p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={() => navigate("/parent/apps")}>App Store ผู้ปกครอง</Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/parent/timetable")}>ดูตารางของบุตร</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">สถานะเรียน</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>คะแนนเฉลี่ย 3.4</li>
            <li>งานที่ต้องติดตาม 2 รายการ</li>
            <li>ประกาศครู 1 ข่าว</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">คำแนะนำ</h2>
          <p className="text-sm text-muted">เช็คการบ้านและกิจกรรมพิเศษของบุตรทุกสัปดาห์เพื่อให้ไม่พลาดข่าวสารสำคัญ</p>
        </div>
      </div>
    </div>
  );
}
