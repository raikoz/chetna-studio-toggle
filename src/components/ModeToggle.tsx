import { useMode } from "@/contexts/ModeContext";

export function ModeToggle() {
  const { mode, setMode } = useMode();

  return (
    <div className="flex items-center border border-foreground/30 transition-mode">
      <button
        onClick={() => setMode("studio")}
        className={`px-4 py-2 text-sm tracking-widest uppercase transition-mode ${
          mode === "studio"
            ? "bg-foreground text-background"
            : "bg-transparent text-foreground hover:bg-foreground/10"
        }`}
      >
        TheChet&Co
      </button>
      <button
        onClick={() => setMode("personal")}
        className={`px-4 py-2 text-sm tracking-widest uppercase transition-mode ${
          mode === "personal"
            ? "bg-foreground text-background"
            : "bg-transparent text-foreground hover:bg-foreground/10"
        }`}
      >
        Chetna
      </button>
    </div>
  );
}
