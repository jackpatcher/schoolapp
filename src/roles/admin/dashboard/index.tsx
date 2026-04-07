import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">แดชบอร์ดผู้บริหาร</h1>
        <p className="text-sm text-muted mb-6">ติดตามภาพรวมโรงเรียน, ประสิทธิภาพสอน, และข้อมูลสำคัญสำหรับการตัดสินใจ</p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={() => navigate("/admin/apps")}>App Store ผู้บริหาร</Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/admin/timetable")}>ดูตารางงาน</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">สรุปภาพรวม</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>นักเรียน 1,200 คน</li>
            <li>ครู 95 คน</li>
            <li>กิจกรรมวันนี้ 4 รายการ</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">เรื่องที่ต้องติดตาม</h2>
          <p className="text-sm text-muted">ตรวจสอบรายงานสภาพแวดล้อมและกำหนดการประชุมฝ่ายต่าง ๆ ในสัปดาห์นี้</p>
        </div>
      </div>
    </div>
  );
}
