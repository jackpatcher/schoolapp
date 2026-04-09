
import { useState } from "react";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { APP_CONFIG } from "@/config";
import { useAuth } from "@/contexts/AuthContext";
// TODO: Replace with real Google login logic


const HomePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    // TODO: Integrate real Google login here
    setTimeout(() => {
      setLoading(false);
      alert("(Demo) Google Login Success!\nควรเชื่อมต่อระบบจริงที่นี่");
    }, 1200);
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-accent/10 via-purple-100/10 to-blue-100/10">
      <div className="w-full max-w-xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-gray-100 px-8 py-12 flex flex-col items-center">
        <img
          src={APP_CONFIG.logoUrl}
          alt="School Logo"
          className="w-24 h-24 mb-4 drop-shadow-lg rounded-full bg-white p-2 border"
        />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight drop-shadow-sm text-center text-accent">
          {APP_CONFIG.schoolName || "SchoolApp"}
        </h1>
        <p className="text-base font-medium mb-1 text-center text-purple-500">
          {APP_CONFIG.schoolDesc || "ระบบบริหารจัดการโรงเรียนออนไลน์"}
        </p>
        <p className="text-sm font-semibold text-center mb-4 text-accent">
          "เชื่อมต่อทุกคนในโรงเรียน สะดวก รวดเร็ว ปลอดภัย"
        </p>
        <ul className="mb-6 text-gray-700 text-sm list-disc list-inside text-left max-w-xs mx-auto">
          <li>แจ้งข่าวสารและประกาศสำคัญแบบเรียลไทม์</li>
          <li>ตารางเรียน ตารางสอน และปฏิทินกิจกรรม</li>
          <li>ส่งข้อความระหว่างครู นักเรียน ผู้ปกครอง</li>
          <li>ติดตามผลการเรียนและพฤติกรรม</li>
          <li>เข้าถึงข้อมูลโรงเรียนได้ทุกที่ ทุกเวลา</li>
        </ul>
        <div className="w-full flex flex-col items-center mt-8">
          <GoogleLoginButton onClick={handleGoogleLogin} />
          {loading && <div className="mt-3 text-accent">กำลังเข้าสู่ระบบ...</div>}
        </div>
        <div className="mt-10 w-full max-w-lg">
          <h2 className="text-lg font-bold mb-2 text-accent">วิธีใช้งาน</h2>
          <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
            <li>กดปุ่ม "Sign in with Google" เพื่อเข้าสู่ระบบ</li>
            <li>หากยังไม่เคยลงทะเบียน จะมีขั้นตอนเลือกบทบาทและกรอกข้อมูล</li>
            <li>หลังจากเข้าสู่ระบบ จะเข้าสู่แดชบอร์ดของแต่ละบทบาท</li>
          </ol>
          <h2 className="text-lg font-bold mt-6 mb-2 text-accent">คู่มือการใช้งาน</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>ดูประกาศ ข่าวสาร และกิจกรรมต่าง ๆ ได้จากหน้าแรก</li>
            <li>เข้าถึงแอปต่าง ๆ เช่น ตารางเรียน ปฏิทิน ผลการเรียน ฯลฯ ผ่านเมนู</li>
            <li>เปลี่ยนบทบาท/ตั้งค่าบัญชีได้ที่เมนูโปรไฟล์</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
