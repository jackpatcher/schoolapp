import { useState } from "react";
import { BookOpen, User, Users, Shield } from "lucide-react";
import { useAuth, type Role } from "@/contexts/AuthContext";

const roles: { role: Role; icon: React.ReactNode; label: string; sub: string }[] = [
  { role: "teacher", icon: <BookOpen className="w-10 h-10 text-accent" />, label: "ครู", sub: "Teacher" },
  { role: "student", icon: <User className="w-10 h-10 text-accent" />, label: "นักเรียน", sub: "Student" },
  { role: "parent", icon: <Users className="w-10 h-10 text-accent" />, label: "ผู้ปกครอง", sub: "Parent" },
  { role: "admin", icon: <Shield className="w-10 h-10 text-accent" />, label: "ผู้บริหาร", sub: "Admin" },
];

const LoginPage = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    const ok = login(selectedRole, username, password);
    if (!ok) setError(true);
  };

  const backToRoles = () => {
    setSelectedRole(null);
    setUsername("");
    setPassword("");
    setError(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-accent">AppName</h1>
          <p className="text-sm text-muted">School Management System</p>
        </div>

        {!selectedRole ? (
          <div className="mb-8">
            <h2 className="font-bold text-lg mb-6 text-center">เลือกบทบาท</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {roles.map((r) => (
                <button
                  key={r.role}
                  onClick={() => setSelectedRole(r.role)}
                  className="info-card rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer"
                >
                  <div className="mb-3">{r.icon}</div>
                  <p className="font-bold text-sm">{r.label}</p>
                  <p className="text-xs mt-1 text-muted">{r.sub}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(false); }}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            {error && (
              <p className="text-destructive text-xs text-center">Invalid username or password</p>
            )}
            <button type="submit" className="w-full py-3 rounded-xl font-bold bg-accent text-accent-foreground hover:opacity-90 transition">
              Login
            </button>
            <button type="button" onClick={backToRoles} className="w-full py-3 rounded-xl font-bold bg-secondary transition">
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
