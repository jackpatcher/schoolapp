
import { useState } from "react";
import { User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { roleDashboardPath } from "@/shared/models/roles";
import { RoleLoginCard } from "@/components/RoleLoginCard";

export default function StudentLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = login("student", username, password);
    if (ok) {
      navigate(roleDashboardPath["student"]);
    } else {
      setError(true);
    }
  };

  return (
    <RoleLoginCard
      title="Student"
      subtitle="เข้าสู่ระบบสำหรับนักเรียน"
      icon={<User className="h-10 w-10 text-primary" />}
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
