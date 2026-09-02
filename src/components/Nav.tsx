import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#section-about" },
  { label: "Work", href: "#section-postg8" },
  { label: "Contact", href: "#section-contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-14 lg:px-20 py-6 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <a href="#section-hero" className="mono-label text-text/40 hover:text-amber transition-colors duration-300">
        SS
      </a>

      <div className="flex items-center gap-8">
        {links.map(l => (
          <a
            key={l.label}
            href={l.href}
            className="mono-label text-muted hover:text-text transition-colors duration-300"
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
