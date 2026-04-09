import { useState } from "react";
import { BookOpen, User, Users, Shield, ChevronLeft } from "lucide-react";
import { useAuth, type Role } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const roles: { role: Role; icon: React.ReactNode; label: string; sub: string }[] = [
  { role: "teacher", icon: <BookOpen className="w-10 h-10 text-accent" />, label: "ครู", sub: "Teacher" },
  { role: "student", icon: <User className="w-10 h-10 text-accent" />, label: "นักเรียน", sub: "Student" },
  { role: "parent", icon: <Users className="w-10 h-10 text-accent" />, label: "ผู้ปกครอง", sub: "Parent" },
  { role: "admin", icon: <Shield className="w-10 h-10 text-accent" />, label: "ผู้บริหาร", sub: "Admin" },
];

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const roleParam = params.get("role") as Role | null;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleParam) return;
    const ok = login(roleParam, username, password);
    if (!ok) setError(true);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-accent">AppName</h1>
          <p className="text-sm text-muted">School Management System</p>
        </div>

        <div className="mb-8 text-center relative">
          <button
            onClick={handleBack}
            className="absolute left-0 top-0 px-4 py-2 rounded-full font-bold bg-secondary transition text-sm flex items-center gap-1"
            style={{ minWidth: 64 }}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <h2 className="font-bold text-lg mb-6">กรุณาเข้าสู่ระบบด้วย Google จากหน้าแรก</h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
