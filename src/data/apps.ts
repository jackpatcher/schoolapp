import React from "react";
import { LucideIcon, Music, FileText, Bell } from "lucide-react";

export interface AppData {
  id: number;
  slug: string;
  name: string;
  dev: string;
  icon: LucideIcon;
  iconColor: string;
  desc: string;
  features: string[];
  size: string;
  version: string;
  roles: string[];
}

export const appsData: AppData[] = [
  {
    id: 1,
    slug: "spotify",
    name: "Spotify",
    dev: "Spotify AB",
    icon: Music,
    iconColor: "text-green-500",
    desc: "แอปฟังเพลงสำหรับนักเรียนและครู ใช้งานง่าย พร้อม playlist สำเร็จรูป",
    features: ["ฟังเพลงนับล้านเพลง", "บันทึกเพลย์ลิสต์", "โหมดเรียนเงียบ"],
    size: "152 MB",
    version: "8.9.0",
    roles: ["student", "teacher"],
  },
  {
    id: 2,
    slug: "homework",
    name: "Homework",
    dev: "School Labs",
    icon: FileText,
    iconColor: "text-blue-500",
    desc: "จัดการบ้านและงานโรงเรียนสำหรับนักเรียนและครู พร้อมแจ้งเตือนครบทุกชั้นเรียน",
    features: ["บันทึกงาน", "ตั้งกำหนดส่ง", "ติดตามสถานะ"],
    size: "98 MB",
    version: "2.4.1",
    roles: ["student", "teacher"],
  },
  {
    id: 3,
    slug: "notice",
    name: "Notice",
    dev: "EduComm",
    icon: Bell,
    iconColor: "text-amber-500",
    desc: "ระบบประกาศและแจ้งเตือนสำหรับครูและผู้บริหาร ให้ข่าวสารถึงผู้ปกครองทันที",
    features: ["ประกาศข่าวด่วน", "แจ้งเตือนคลาส", "สรุปรายงาน"],
    size: "64 MB",
    version: "1.3.8",
    roles: ["teacher", "admin"],
  },
];
