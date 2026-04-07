
import { useState } from "react";
import { Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { roleDashboardPath } from "@/shared/models/roles";
import { RoleLoginCard } from "@/components/RoleLoginCard";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = login("admin", username, password);
    if (ok) {
      navigate(roleDashboardPath["admin"]);
    } else {
      setError(true);
    }
  };

  return (
    <RoleLoginCard
      title="Admin"
      subtitle="เข้าสู่ระบบสำหรับผู้บริหาร"
      icon={<Shield className="h-10 w-10 text-primary" />}
      username={username}
      password={password}
      error={error}
      onUsername={(value) => { setUsername(value); setError(false); }}
      onPassword={(value) => { setPassword(value); setError(false); }}
      onBack={() => navigate("/")}
      onSubmit={handleSubmit}
    />
  );
}
