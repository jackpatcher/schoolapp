const messages = [
  { name: "สมชาย", msg: "ส่งรายงานให้แล้วครับ", time: "10:30" },
  { name: "สมหญิง", msg: "นัดประชุมพรุ่งนี้บ่ายโมงนะคะ", time: "09:15" },
  { name: "วิชัย", msg: "โปรเจกต์ใหม่เริ่มได้เลย", time: "เมื่อวาน" },
];

const MessagesPage = () => (
  <div className="space-y-3">
    {messages.map((c) => (
      <button key={c.name} className="info-card w-full rounded-2xl p-4 flex items-center gap-4 text-left">
        <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold bg-accent text-accent-foreground">
          {c.name[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm">{c.name}</p>
          <p className="text-xs truncate text-muted">{c.msg}</p>
        </div>
        <span className="text-xs flex-shrink-0 font-semibold text-muted">{c.time}</span>
      </button>
    ))}
  </div>
);

export default MessagesPage;
