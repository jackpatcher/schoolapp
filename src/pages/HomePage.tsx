

import { useEffect, useState } from "react";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { APP_CONFIG } from "@/config";
import { googleLogin } from "@/lib/googleAuth";
import { Smartphone, RefreshCw, CreditCard, BarChart2, Repeat, FolderSearch } from "lucide-react";

const features = [
  {
    title: "ใช้งานง่ายทุกอุปกรณ์",
    desc: "เข้าถึงข้อมูลได้จากทุกที่ ไม่ว่าจะเป็นมือถือ แท็บเล็ต หรือคอมพิวเตอร์ ด้วย UI ที่ลื่นไหล",
    icon: <Smartphone className="w-10 h-10 text-[#5B2C83] mb-2" />,
  },
  {
    title: "สรุปยอดแบบเรียลไทม์",
    desc: "อัปเดตข้อมูลทันทีที่มีการบันทึก ข้อมูลตรงกันทุกเครื่อง",
    icon: <RefreshCw className="w-10 h-10 text-[#5B2C83] mb-2" />,
  },
  {
    title: "จัดการหนี้สินและผ่อนชำระ",
    desc: "ติดตามหนี้สินและแจ้งเตือนให้คุณจัดการได้อย่างเป็นระบบ",
    icon: <CreditCard className="w-10 h-10 text-[#5B2C83] mb-2" />,
  },
  {
    title: "กราฟและสถิติอัจฉริยะ",
    desc: "วิเคราะห์พฤติกรรมผ่านกราฟแบบโต้ตอบได้ เลือกดูได้ทั้งแบบรายวัน รายเดือน รายปี",
    icon: <BarChart2 className="w-10 h-10 text-[#5B2C83] mb-2" />,
  },
  {
    title: "ระบบรายการประจำ",
    desc: "ตั้งค่ารายรับหรือรายจ่ายที่เกิดขึ้นประจำ เช่น เงินเดือน หรือค่าเน็ต",
    icon: <Repeat className="w-10 h-10 text-[#5B2C83] mb-2" />,
  },
  {
    title: "ค้นหาขั้นสูงและจัดหมวดหมู่",
    desc: "ค้นหารายการย้อนหลังได้รวดเร็ว พร้อมหมวดหมู่ครอบคลุมทุกการใช้ชีวิต",
    icon: <FolderSearch className="w-10 h-10 text-[#5B2C83] mb-2" />,
  },
];

const primary = "#5B2C83";
const secondary = "#F9B233";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Auto-login effect
  useEffect(() => {
    const autoLogin = async () => {
      setLoading(true);
      setError(null);
      try {
        await googleLogin();
        // Redirect or reload after login if needed
        window.location.reload();
      } catch (e) {
        setError("Google Login ล้มเหลวหรือถูกยกเลิก");
      }
      setLoading(false);
    };
    // Try auto-login if not already logged in
    // (You may want to check firebase.auth().currentUser or similar here)
    // For demo, always try auto-login
    autoLogin();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await googleLogin();
      window.location.reload();
    } catch (e) {
      setError("Google Login ล้มเหลวหรือถูกยกเลิก");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* School Logo and Name in Hero Section */}
      {/* Hero Section with image card */}
      <section className="relative min-h-screen flex flex-col justify-center px-4 py-8 bg-[#f7f8fa] w-full overflow-x-clip">
        <div className="absolute inset-0 w-full h-full bg-[#f7f8fa] z-0"></div>
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12 max-w-screen-xl mx-auto px-0">
          {/* Left: Image Card */}
          <div className="flex-1 flex items-center justify-center w-full relative min-h-[340px] order-1 md:order-none">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white flex items-center justify-center aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&q=80&w=600"
                alt="School Students Preview"
                className="object-cover w-full h-full"
              />
              {/* Floating Card: Latest Announcement */}
              <div className="absolute left-4 bottom-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 min-w-[220px] max-w-[90%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-700 text-sm">ประกาศล่าสุด</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#5B2C83]"></span>
                </div>
                <div className="font-bold text-base text-[#5B2C83] mb-1 truncate">แจ้งปิดเรียนวันที่ 12 เม.ย. เนื่องจากปรับปรุงระบบไฟฟ้า</div>
                <div className="text-xs text-gray-500">ประกาศเมื่อ 9 เม.ย. 2026</div>
              </div>
            </div>
          </div>
          {/* Right: Text & Login */}
          <div className="flex-1 flex flex-col justify-center items-start md:items-start max-w-xl w-full">
            {/* Logo and School Name as a group */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={APP_CONFIG.logoUrl || "/logo192.png"}
                alt="School Logo"
                className="w-20 h-20 md:w-28 md:h-28 rounded-2xl shadow-lg border-4 border-white bg-white object-contain"
              />
              <span className="text-2xl md:text-4xl font-extrabold text-[#2d3a8c] drop-shadow-sm">
                {APP_CONFIG.schoolName || "SchoolApp"}
              </span>
            </div>
            <span className="inline-flex items-center mb-4 px-4 py-1 rounded-full bg-white shadow text-xs font-semibold text-gray-700 border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              SCHOOL MANAGEMENT PLATFORM
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-gray-900">
              จัดการโรงเรียนของคุณง่ายๆ<br />
              <span className="text-[#2d3a8c]">ในที่เดียว</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 mb-8 font-medium">
              ระบบติดตามข้อมูลโรงเรียน ตารางเรียน ตารางสอน และระบบแจ้งเตือนครบวงจร ช่วยให้คุณเห็นภาพรวมทุกอย่างได้อย่างรวดเร็ว แม่นยำ และปลอดภัย
            </p>
            <GoogleLoginButton onClick={loading ? () => {} : handleGoogleLogin} />
            {loading && <div className="mt-4 text-accent animate-pulse">กำลังเข้าสู่ระบบ...</div>}
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {!loading && !error && <div className="mt-4 text-gray-500 text-base">เข้าสู่ระบบด้วย Google</div>}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full relative min-h-screen flex flex-col justify-center items-center py-16 px-4 bg-[#ede7f6] overflow-x-clip">
        <div className="absolute inset-0 w-full h-full bg-[#ede7f6] z-0"></div>
        <h2 className="relative z-10 text-2xl md:text-3xl font-bold text-center mb-8 text-[#5B2C83]">ฟีเจอร์ที่เราออกแบบเพื่อคุณ</h2>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-screen-2xl mx-auto px-0">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg p-10 border border-gray-100 hover:shadow-2xl transition-shadow duration-200 h-full min-h-[320px] w-full"
              style={{ boxSizing: 'border-box' }}
            >
              {f.icon}
              <div className="font-bold text-xl mb-3 text-[#5B2C83] text-center">{f.title}</div>
              <div className="text-gray-700 text-center text-base leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full relative min-h-screen flex flex-col justify-center items-center py-16 px-4 bg-gradient-to-r from-[#5B2C83] to-[#F9B233] mt-auto overflow-x-clip">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#5B2C83] to-[#F9B233] z-0"></div>
        <h2 className="relative z-10 text-2xl md:text-3xl font-bold text-center mb-4 text-white">เริ่มต้นใช้งานฟรีวันนี้</h2>
        <p className="relative z-10 text-white/90 mb-6 text-center max-w-xl">
          เข้าร่วมกับผู้ใช้งานมากมายที่เปลี่ยนการจัดการโรงเรียนให้เป็นเรื่องง่ายและโปร่งใส
        </p>
        <div className="relative z-10">
          <GoogleLoginButton onClick={loading ? () => {} : handleGoogleLogin} />
          {loading && <div className="mt-4 text-accent animate-pulse">กำลังเข้าสู่ระบบ...</div>}
          {error && <div className="mt-4 text-red-200">{error}</div>}
          {!loading && !error && <div className="mt-4 text-white/80 text-sm">เข้าสู่ระบบด้วย Google</div>}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-white/80 bg-[#5B2C83]">
        &copy; 2026 SchoolApp. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
