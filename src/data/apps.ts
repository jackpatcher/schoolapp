export interface AppData {
  id: number;
  name: string;
  dev: string;
  icon: string;
  desc: string;
  features: string[];
  size: string;
  version: string;
}

export const appsData: AppData[] = [
  { id: 1, name: "Spotify", dev: "Spotify AB", icon: "🎵", desc: "แอปฟังเพลงออนไลน์ที่ใหญ่ที่สุด", features: ["ฟังเพลงนับล้านเพลง", "ทำรายการเพลงของตัวเอง", "ฟังเพลงแบบออฟไลน์"], size: "152 MB", version: "8.9.0" },
  { id: 2, name: "Instagram", dev: "Meta Platforms", icon: "📷", desc: "แชร์ภาพและวิดีโอกับเพื่อน", features: ["โพสต์ภาพ/วิดีโอ", "ตรวจสอบเรื่องราวของเพื่อน", "ถ่ายทำ Reels"], size: "203 MB", version: "342.0" },
  { id: 3, name: "WhatsApp", dev: "Meta Platforms", icon: "💬", desc: "แอปส่งข้อความและวิดีโอคอล", features: ["ส่งข้อความฉัน", "วิดีโอคอล HD", "ข้อความเสียง"], size: "98 MB", version: "24.1" },
  { id: 4, name: "Google Maps", dev: "Google LLC", icon: "🗺️", desc: "นำทางและสำรวจโลก", features: ["นำทาง GPS", "ค้นหาสถานที่", "ข้อมูลการจราจร"], size: "187 MB", version: "12.5" },
  { id: 5, name: "YouTube", dev: "Google LLC", icon: "📹", desc: "ดูวิดีโอจาก YouTube", features: ["ดูวิดีโอ 4K", "โหลดเพื่อดูออฟไลน์", "ไม่มีโฆษณา"], size: "178 MB", version: "19.24" },
  { id: 6, name: "Telegram", dev: "Telegram Messenger LLP", icon: "✈️", desc: "แอปแชทที่รวดเร็วและปลอดภัย", features: ["แชทไม่มีขีดจำกัด", "ไฟล์ขนาดใหญ่", "ลบข้อความ"], size: "142 MB", version: "10.12" },
  { id: 7, name: "Canva", dev: "Canva Inc", icon: "🎨", desc: "ออกแบบกราฟิกอย่างง่ายดาย", features: ["แม่แบบการออกแบบ", "ตัวอักษรมากมาย", "ภาพ 1 ล้านภาพ"], size: "234 MB", version: "3.65" },
  { id: 8, name: "Dropbox", dev: "Dropbox Inc", icon: "☁️", desc: "บริการฝากเก็บไฟล์บนคลาวด์", features: ["ซิงค์ไฟล์อัตโนมัติ", "แชร์ไฟล์", "การทำงานร่วมกัน"], size: "156 MB", version: "12.4" },
  { id: 9, name: "Notion", dev: "Notion Labs Inc", icon: "📝", desc: "จดบันทึกและปรับปรุงข้อมูล", features: ["สร้างฐานข้อมูล", "วางแผนโครงการ", "ทำงานเป็นทีม"], size: "167 MB", version: "3.8" },
  { id: 10, name: "Adobe Creative Cloud", dev: "Adobe Inc", icon: "🎬", desc: "แอปออกแบบและแก้ไขได้", features: ["แก้ไขรูปภาพ", "สร้างวิดีโอ", "ออกแบบกราฟิก"], size: "512 MB", version: "6.7" },
];
