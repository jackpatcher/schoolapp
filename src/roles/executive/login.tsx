
import { useState } from "react";
import { Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { roleDashboardPath } from "@/shared/models/roles";
import { RoleLoginCard } from "@/components/RoleLoginCard";

export default function ExecutiveLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = login("executive", username, password);
    if (ok) {
      navigate(roleDashboardPath["executive"]);
    } else {
      setError(true);
    }
  };

  return (
    <RoleLoginCard
      title="Executive"
      subtitle="เข้าสู่ระบบสำหรับผู้บริหารระดับสูง"
      icon={<Briefcase className="h-10 w-10 text-primary" />}
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
