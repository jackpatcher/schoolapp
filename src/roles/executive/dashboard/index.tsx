import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ExecutiveDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">แดชบอร์ดผู้บริหารระดับสูง</h1>
        <p className="text-sm text-muted mb-6">ดูแนวโน้มผลการเรียน, การจัดสรรทรัพยากร, และยุทธศาสตร์ของโรงเรียนในภาพรวม</p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={() => navigate("/executive/apps")}>App Store ผู้บริหารระดับสูง</Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/executive/timetable")}>ตารางเยี่ยมชม</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">ตัวชี้วัดสำคัญ</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>ระดับความพึงพอใจของผู้ปกครอง 88%</li>
            <li>อัตราการเข้าเรียน 94%</li>
            <li>โครงการใหม่ 3 โครงการ</li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">แนวทางการพัฒนา</h2>
          <p className="text-sm text-muted">วางแผนโครงการพัฒนาทักษะดิจิทัล และปรับปรุงโครงสร้างพื้นฐานภายในโรงเรียน</p>
        </div>
      </div>
    </div>
  );
}
