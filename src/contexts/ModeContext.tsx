import { createContext, useContext, useState, ReactNode } from "react";

type Mode = "personal" | "studio";

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("personal");

  const toggleMode = () => {
    setMode((prev) => (prev === "personal" ? "studio" : "personal"));
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      <div className={mode === "studio" ? "mode-studio" : ""}>
        {children}
      </div>
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
