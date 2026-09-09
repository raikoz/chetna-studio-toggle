import { useMode } from "@/contexts/ModeContext";
import { useNavigate } from "react-router-dom";

export function ModeToggle() {
  const { mode, setMode } = useMode();
  const navigate = useNavigate();

  const handleModeSwitch = (newMode: "studio" | "personal") => {
    setMode(newMode);
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex items-center border border-foreground/30 transition-mode">
      <button
        onClick={() => handleModeSwitch("studio")}
        className={`px-4 py-2 text-sm tracking-widest uppercase transition-mode ${
          mode === "studio"
            ? "bg-foreground text-background"
            : "bg-transparent text-foreground hover:bg-foreground/10"
        }`}
      >
        TheChet&Co
      </button>
      <button
        onClick={() => handleModeSwitch("personal")}
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
