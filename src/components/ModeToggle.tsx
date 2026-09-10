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
    <div className="flex items-center rounded-[8px] overflow-hidden border border-foreground/20 transition-mode">
      <button
        onClick={() => handleModeSwitch("studio")}
        className={`px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase transition-mode font-medium ${
          mode === "studio"
            ? "bg-foreground text-background"
            : "bg-transparent text-foreground hover:bg-foreground/10"
        }`}
      >
        TheChet&amp;Co
      </button>
      <button
        onClick={() => handleModeSwitch("personal")}
        className={`px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase transition-mode font-medium ${
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
