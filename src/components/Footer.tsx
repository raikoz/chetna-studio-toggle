export function Footer() {
  const marqueeText = "THECHETANDCO • DESIGN STUDIO • CREATIVE DIRECTION • BRAND IDENTITY • ";
  const repeatedText = marqueeText.repeat(4);

  return (
    <footer className="py-12 border-t border-foreground/10 overflow-hidden transition-mode">
      {/* Marquee Animation */}
      <div className="relative mb-12">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tight opacity-10">
            {repeatedText}
          </span>
          <span className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tight opacity-10">
            {repeatedText}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm opacity-60">
            © {new Date().getFullYear()} Chetna Pattnaik. All rights reserved.
          </div>

          <div className="flex items-center gap-8 text-sm">
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
              Privacy
            </a>
            <a href="#" className="opacity-60 hover:opacity-100 transition-opacity">
              Terms
            </a>
            <span className="opacity-40">
              Crafted with intention
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
