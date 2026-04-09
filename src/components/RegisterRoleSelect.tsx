import { useState } from "react";

export type RegisterRole = "student" | "teacher" | "parent" | "admin";

export function RegisterRoleSelect({ onSelect }: { onSelect: (role: RegisterRole) => void }) {
  const [selected, setSelected] = useState<RegisterRole | null>(null);
  const roles: { key: RegisterRole; label: string }[] = [
    { key: "student", label: "นักเรียน" },
    { key: "teacher", label: "ครู" },
    { key: "parent", label: "ผู้ปกครอง" },
    { key: "admin", label: "ผู้บริหาร" },
  ];

  return (
    <div className="flex flex-col items-center p-8">
      <h2 className="text-xl font-bold mb-4">เลือกบทบาทของคุณ</h2>
      <div className="flex gap-4 mb-6">
        {roles.map((role) => (
          <button
            key={role.key}
            className={`px-6 py-3 rounded-xl border font-semibold text-lg ${selected === role.key ? "bg-accent text-white" : "bg-white text-accent border-accent"}`}
            onClick={() => setSelected(role.key)}
          >
            {role.label}
          </button>
        ))}
      </div>
      <button
        className="mt-4 px-8 py-3 rounded-xl bg-accent text-white font-bold disabled:opacity-50"
        disabled={!selected}
        onClick={() => selected && onSelect(selected)}
      >
        ถัดไป
      </button>
    </div>
  );
}
