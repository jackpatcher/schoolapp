import React, { useEffect, useMemo, useState } from "react";
import DevLogCards from "@/components/DevLogCards";
import type { DevLogEntry } from "@/data/devlog";
import { devLogEntries } from "@/data/devlog";
import useEmblaCarousel from "embla-carousel-react";

import { GoogleLoginButton } from "@/components/GoogleLoginButton";

function CarouselDots({ count, current, accent, onSelect }: { count: number; current: number; accent: string; onSelect: (i: number) => void }) {
  return (
    <div className="flex justify-center gap-3 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          style={
            i === current
              ? { backgroundColor: accent, width: 12, height: 12, transform: "scale(1.1)" }
              : { backgroundColor: "#ffffff", border: "1px solid #cbd5e1", opacity: 0.7, width: 12, height: 12 }
          }
          className="rounded-full transition-all"
          aria-label={`ไปที่สไลด์ ${i + 1}`}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}

function DevLogSection() {
  const entries = useMemo<DevLogEntry[]>(() => devLogEntries, []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIdx(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      if (emblaApi) emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || entries.length <= 1) return;
    const interval = window.setInterval(() => {
      const nextIndex = (emblaApi.selectedScrollSnap() + 1) % entries.length;
      emblaApi.scrollTo(nextIndex);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [emblaApi, entries.length]);

  return (
    <div>
      <DevLogCards entries={entries} emblaRef={emblaRef} />
      <div className="mt-4">
        <CarouselDots
          count={entries.length}
          current={selectedIdx}
          accent={accent}
          onSelect={(i) => {
            emblaApi?.scrollTo(i);
            setSelectedIdx(i);
          }}
        />
      </div>
    </div>
  );
}
import { APP_CONFIG } from "@/data/config";
const { primary, secondary, accent, pale } = APP_CONFIG.schoolColors;
import { googleLogin } from "@/lib/googleAuth";
import { Smartphone, RefreshCw, CreditCard, BarChart2, Repeat, FolderSearch } from "lucide-react";

const features = [
  {
    title: "ใช้งานง่ายทุกอุปกรณ์",
    desc: "เข้าถึงข้อมูลได้จากทุกที่ ไม่ว่าจะเป็นมือถือ แท็บเล็ต หรือคอมพิวเตอร์ ด้วย UI ที่ลื่นไหล",
    icon: <Smartphone className="w-10 h-10 mb-2" style={{ color: primary }} />,
  },
  {
    title: "สรุปยอดแบบเรียลไทม์",
    desc: "อัปเดตข้อมูลทันทีที่มีการบันทึก ข้อมูลตรงกันทุกเครื่อง",
    icon: <RefreshCw className="w-10 h-10 mb-2" style={{ color: primary }} />,
  },
  {
    title: "จัดการหนี้สินและผ่อนชำระ",
    desc: "ติดตามหนี้สินและแจ้งเตือนให้คุณจัดการได้อย่างเป็นระบบ",
    icon: <CreditCard className="w-10 h-10 mb-2" style={{ color: primary }} />,
  },
  {
    title: "กราฟและสถิติอัจฉริยะ",
    desc: "วิเคราะห์พฤติกรรมผ่านกราฟแบบโต้ตอบได้ เลือกดูได้ทั้งแบบรายวัน รายเดือน รายปี",
    icon: <BarChart2 className="w-10 h-10 mb-2" style={{ color: primary }} />,
  },
  {
    title: "ระบบรายการประจำ",
    desc: "ตั้งค่ารายรับหรือรายจ่ายที่เกิดขึ้นประจำ เช่น เงินเดือน หรือค่าเน็ต",
    icon: <Repeat className="w-10 h-10 mb-2" style={{ color: primary }} />,
  },
  {
    title: "ค้นหาขั้นสูงและจัดหมวดหมู่",
    desc: "ค้นหารายการย้อนหลังได้รวดเร็ว พร้อมหมวดหมู่ครอบคลุมทุกการใช้ชีวิต",
    icon: <FolderSearch className="w-10 h-10 mb-2" style={{ color: primary }} />,
  },
];

// Removed hardcoded colors, use config

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pricing plans
  const plans = [
    {
      name: "ฟรี",
      price: "0",
      desc: "สำหรับโรงเรียนขนาดเล็ก ทดลองใช้งานฟีเจอร์พื้นฐานได้ทันที",
      features: [
        "บัญชีผู้ใช้ไม่จำกัด",
        "ประกาศข่าวสาร",
        "ตารางเรียน/สอน",
        "ส่งข้อความ",
      ],
      highlight: false,
    },
    {
      name: "โปร",
      price: "1,200",
      desc: "เหมาะกับโรงเรียนขนาดกลาง-ใหญ่ ใช้งานฟีเจอร์ครบถ้วน พร้อมซัพพอร์ต",
      features: [
        "ทุกฟีเจอร์ในแพลนฟรี",
        "ระบบรายงานผลการเรียน",
        "ระบบผู้ปกครอง",
        "ซัพพอร์ตพิเศษ",
      ],
      highlight: true,
    },
    {
      name: "องค์กร",
      price: "Custom",
      desc: "สำหรับองค์กรหรือเครือข่ายโรงเรียนที่ต้องการฟีเจอร์เฉพาะ",
      features: [
        "ปรับแต่งระบบตามต้องการ",
        "API เชื่อมต่อ",
        "ทีมงานดูแลเฉพาะ",
      ],
      highlight: false,
    },
  ];
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
      <section
        className="relative min-h-screen flex flex-col justify-center px-4 py-8 w-full overflow-x-clip"
        style={{
          background: `linear-gradient(120deg, ${primary} 0%, #fff 30%, #fff 100%)`,
        }}
      >
        {/* Optional: subtle white overlay for readability */}
 
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12 max-w-screen-xl mx-auto px-0">
          {/* Left: Image Card */}
          <div className="flex-1 flex items-center justify-center w-full relative min-h-[340px] order-1 md:order-none">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white flex items-center justify-center aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Bougainvillea flower ดอกเฟื่องฟ้า"
                className="object-cover w-full h-full"
              />
              {/* Floating Card: Latest Announcement */}
              <div className="absolute left-4 bottom-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 min-w-[220px] max-w-[90%]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-700 text-sm">ประกาศล่าสุด</span>
                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: accent }}></span>
                </div>
                <div className="font-bold text-base" style={{ color: primary }}>แจ้งปิดเรียนวันที่ 12 เม.ย. เนื่องจากปรับปรุงระบบไฟฟ้า</div>
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
              <span className="text-2xl md:text-4xl font-extrabold drop-shadow-sm" style={{ color: primary, textShadow: '0 2px 8px #fff8' }}>
                {APP_CONFIG.schoolName || "SchoolApp"}
              </span>
            </div>
            <span className="inline-flex items-center mb-4 px-4 py-1 rounded-full bg-white shadow text-xs font-semibold text-gray-700 border border-gray-200">
              <span className="w-2 h-2 rounded-full" style={{ background: accent, marginRight: 8 }}></span>
              SCHOOL MANAGEMENT PLATFORM
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-neutral-900">
              จัดการโรงเรียนของคุณง่ายๆ&nbsp;
              <span style={{ color: primary }}>ในที่เดียว</span>
            </h1>
            <p className="text-lg md:text-2xl mb-8 font-medium" style={{ color: '#22292f' }}>
              ระบบติดตามข้อมูลโรงเรียน ตารางเรียน ตารางสอน และระบบแจ้งเตือนครบวงจร<br className="hidden md:block" />
              ช่วยให้คุณเห็นภาพรวมทุกอย่างได้อย่างรวดเร็ว แม่นยำ และปลอดภัย
            </p>
            <GoogleLoginButton onClick={loading ? () => {} : handleGoogleLogin} />
            {loading && <div className="mt-4 animate-pulse" style={{ color: accent }}>กำลังเข้าสู่ระบบ...</div>}
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {!loading && !error && <div className="mt-4 text-gray-500 text-base">เข้าสู่ระบบด้วย Google</div>}
          </div>
        </div>
      </section>

      

      {/* Features Section */}
      <section className="w-full relative min-h-screen flex flex-col justify-center items-center py-16 px-4 overflow-x-clip"
        style={{ background: pale }}>
        <div className="absolute inset-0 w-full h-full z-0" style={{ background: pale }}></div>
        <h2 className="relative z-10 text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: primary }}>ฟีเจอร์ที่เราออกแบบเพื่อคุณ</h2>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-screen-2xl mx-auto px-0">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg p-10 border border-gray-100 hover:shadow-2xl transition-shadow duration-200 h-full min-h-[320px] w-full"
              style={{ boxSizing: 'border-box' }}
            >
              {f.icon}
              <div className="font-bold text-xl mb-3 text-center" style={{ color: primary }}>{f.title}</div>
              <div className="text-gray-700 text-center text-base leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full relative min-h-screen flex flex-col justify-center items-center py-16 px-4 mt-auto overflow-x-clip"
        style={{ background: accent }}>
        <div className="absolute inset-0 w-full h-full z-0" style={{ background: accent }}></div>
        <h2 className="relative z-10 text-2xl md:text-3xl font-bold text-center mb-4" style={{ color: primary }}>เริ่มต้นใช้งานฟรีวันนี้</h2>
        <p className="relative z-10 mb-6 text-center max-w-xl" style={{ color: primary, opacity: 0.9 }}>
          เข้าร่วมกับผู้ใช้งานมากมายที่เปลี่ยนการจัดการโรงเรียนให้เป็นเรื่องง่ายและโปร่งใส
        </p>
        <div className="relative z-10 mb-12">
          <GoogleLoginButton onClick={loading ? () => {} : handleGoogleLogin} />
          {loading && <div className="mt-4 animate-pulse" style={{ color: accent }}>กำลังเข้าสู่ระบบ...</div>}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          {!loading && !error && <div className="mt-4 text-sm" style={{ color: primary, opacity: 0.8 }}>เข้าสู่ระบบด้วย Google</div>}
        </div>

        {/* Pricing Plans Section */}
        <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`flex flex-col rounded-3xl shadow-xl border border-gray-200 bg-white p-8 items-center justify-between h-full ${plan.highlight ? 'ring-4' : ''} transition-transform`}
              style={plan.highlight ? { borderColor: accent, boxShadow: `0 0 0 4px ${accent}40`, transform: 'scale(1.05)' } : {}}>
              <div className="w-full">
                <div className="text-2xl font-bold mb-2 text-center" style={{ color: primary }}>{plan.name}</div>
                <div className="text-4xl font-extrabold mb-2 text-center" style={{ color: primary }}>{plan.price === 'Custom' ? 'Custom' : `฿${plan.price}`}</div>
                <div className="text-gray-500 mb-4 text-center">{plan.desc}</div>
                <ul className="mb-6 text-gray-700 text-sm list-disc list-inside">
                  {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <a
                href="mailto:iam.geradt@gmail.com"
                className="mt-2 px-6 py-2 rounded-lg font-bold text-white shadow transition focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-95"
                style={{
                  background: accent,
                  transition: 'background 0.2s, box-shadow 0.2s, transform 0.1s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#FFB97B')}
                onMouseOut={e => (e.currentTarget.style.background = accent)}
                onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 4px #FFD9B3')}
                onBlur={e => (e.currentTarget.style.boxShadow = '')}
              >
                ติดต่อสอบถาม
              </a>
            </div>
          ))}
        </div>
      </section>


      {/* Dev Log Section */}
      <section className="w-full relative flex flex-col justify-center items-center py-16 px-4 bg-white border-t border-border">
        <div className="w-full max-w-4xl mx-auto">
          {/* DevLog carousel controlled from HomePage */}
          <DevLogSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-white/80" style={{ background: primary }}>
        &copy; 2026 SchoolApp. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
