import { useMode } from "@/contexts/ModeContext";

export function DancingGradient() {
  const { mode } = useMode();
  const isStudio = mode === "studio";

  return (
    <div
      className="relative w-full overflow-hidden select-none pointer-events-none"
      style={{
        height: "clamp(160px, 22vw, 320px)",
        background: isStudio
          ? "linear-gradient(to bottom, #3a0201 0%, #3a0201 15%, #4f0302 32%, #730e0e 52%, #a32d2d 70%, #d87d7d 84%, #f8e5e5 94%, #ffffff 100%)"
          : "linear-gradient(to bottom, #ffffff 0%, #fff5f5 50%, #ffffff 100%)",
      }}
    />
  );
}
