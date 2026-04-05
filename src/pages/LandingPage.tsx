import React, { useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft, BookOpen, User, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { APP_CONFIG } from "@/config";

// ใช้ค่าจาก config
const roles = [
  { key: "teacher", label: "ครู", en: "Teacher", icon: <BookOpen className="w-7 h-7 text-accent" /> },
  { key: "student", label: "นักเรียน", en: "Student", icon: <User className="w-7 h-7 text-accent" /> },
  { key: "parent", label: "ผู้ปกครอง", en: "Parent", icon: <Users className="w-7 h-7 text-accent" /> },
  { key: "admin", label: "ผู้บริหาร", en: "Admin", icon: <Shield className="w-7 h-7 text-accent" /> },
];



const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleRoleClick = (roleKey: string) => {
    navigate(`/login?role=${roleKey}`);
  };

  const [showStaff, setShowStaff] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  // แยกบทบาท
  const studentParentRoles = roles.filter(r => r.key === "student" || r.key === "parent");
  const staffRoles = roles.filter(r => r.key === "teacher" || r.key === "admin");

  // ใช้สีจาก config
  const primary = APP_CONFIG.schoolColors?.primary || '#5B2C83';
  const secondary = APP_CONFIG.schoolColors?.secondary || '#F9B233';

  return (
    <>
      <style>{`
        @keyframes slide-x-in {
          from {
            opacity: 0;
            transform: translateX(32px);
            max-width: 0;
          }
          to {
            opacity: 1;
            transform: translateX(0);
            max-width: 500px;
          }
        }
        @keyframes slide-x-out {
          from {
            opacity: 1;
            transform: translateX(0);
            max-width: 500px;
          }
          to {
            opacity: 0;
            transform: translateX(32px);
            max-width: 0;
          }
        }
        .animate-slide-x {
          animation-duration: 0.3s;
          animation-timing-function: ease;
        }
      `}</style>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 70% 20%, #fff8, transparent 60%), linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
        }}
      >
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl px-4">
        <div
          className="bg-white/90 rounded-3xl shadow-2xl border border-gray-100 px-6 py-8 md:px-10 md:py-12 flex flex-col items-center"
          style={{ borderColor: primary }}
        >
          <img
            src={APP_CONFIG.logoUrl}
            alt="School Logo"
            className="w-24 h-24 mb-4 drop-shadow-lg rounded-full bg-white p-2 border"
            style={{ borderColor: secondary }}
          />
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight drop-shadow-sm text-center"
            style={{ color: primary }}
          >
            {APP_CONFIG.schoolName}
          </h1>
          <p className="text-base font-medium mb-1 text-center" style={{ color: secondary }}>
            {APP_CONFIG.schoolDesc}
          </p>
          {/* สโลแกน */}
          <p className="text-sm font-semibold text-center mb-4" style={{ color: primary }}>
            "เชื่อมต่อทุกคนในโรงเรียน สะดวก รวดเร็ว ปลอดภัย"
          </p>
          {/* ฟีเจอร์/ประโยชน์ */}
          <ul className="mb-6 text-gray-700 text-sm list-disc list-inside text-left max-w-xs mx-auto">
            <li>แจ้งข่าวสารและประกาศสำคัญแบบเรียลไทม์</li>
            <li>ตารางเรียน ตารางสอน และปฏิทินกิจกรรม</li>
            <li>ส่งข้อความระหว่างครู นักเรียน ผู้ปกครอง</li>
            <li>ติดตามผลการเรียนและพฤติกรรม</li>
            <li>เข้าถึงข้อมูลโรงเรียนได้ทุกที่ ทุกเวลา</li>
          </ul>
          {!showRoleSelect ? (
            <Button
              className="mt-8 px-8 py-3 text-lg font-bold rounded-xl shadow-lg"
              style={{ background: primary, color: '#fff' }}
              onClick={() => setShowRoleSelect(true)}
            >
              Login
            </Button>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="flex w-full justify-end mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs px-3 py-1"
                  style={{ color: primary, background: 'transparent' }}
                  onClick={() => setShowRoleSelect(false)}
                >
                  ย้อนกลับ
                </Button>
              </div>
              <h2 className="text-lg font-semibold mb-3" style={{ color: primary }}>
                เลือกบทบาทเพื่อเข้าสู่ระบบ
              </h2>
              <div className="flex gap-3 flex-wrap justify-center mb-2 items-center w-full">
                {studentParentRoles.map((role) => (
                  <Button
                    key={role.key}
                    variant="outline"
                    size="sm"
                    className={`flex flex-col items-center w-20 h-20 p-2 shadow hover:shadow-lg transition text-xs border-2 bg-white focus:ring-2 focus:ring-offset-2 focus:ring-[${primary}]`}
                    style={{
                      borderColor: primary,
                      background: '#fff',
                      color: primary,
                    }}
                    onClick={() => handleRoleClick(role.key)}
                  >
                    <span className="mb-1">{role.icon}</span>
                    <span className="font-bold text-xs" style={{ color: primary }}>{role.label}</span>
                    <span className="text-[10px] text-gray-500">{role.en}</span>
                  </Button>
                ))}
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-20 ml-2 rounded-xl border-2 shadow bg-white/90 hover:bg-white focus:outline-none transition-all"
                  style={{
                    borderColor: secondary,
                    color: primary,
                    background: '#fff',
                  }}
                  onClick={() => setShowStaff((v) => !v)}
                  aria-expanded={showStaff}
                  title="สำหรับครู/ผู้บริหาร"
                >
                  {showStaff ? (
                    <ChevronLeft className="w-6 h-6" style={{ color: primary }} />
                  ) : (
                    <ChevronRight className="w-6 h-6" style={{ color: primary }} />
                  )}
                </button>
                <div
                  className={`flex items-center transition-all duration-300 ${showStaff ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'} animate-slide-x`}
                  style={{
                    minWidth: showStaff ? 0 : undefined,
                    overflow: 'visible',
                    transitionProperty: 'opacity, transform',
                  }}
                >
                  {staffRoles.map((role) => (
                    <Button
                      key={role.key}
                      variant="outline"
                      size="sm"
                      className={`flex flex-col items-center w-20 h-20 p-2 shadow-lg hover:shadow-xl transition text-xs border-2 bg-white/95 focus:ring-2 focus:ring-offset-2 focus:ring-[${secondary}] ml-2`}
                      style={{
                        borderColor: secondary,
                        background: '#fff',
                        color: primary,
                        zIndex: 1,
                      }}
                      onClick={() => handleRoleClick(role.key)}
                    >
                      <span className="mb-1">{role.icon}</span>
                      <span className="font-bold text-xs" style={{ color: primary }}>{role.label}</span>
                      <span className="text-[10px] text-gray-500">{role.en}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
      </div>
    </>
  );
};

export default LandingPage;
