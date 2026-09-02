import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onEnterLink = () => {
      dotRef.current?.classList.add("scale-0");
      ringRef.current?.classList.add("!w-10", "!h-10", "!border-text", "!opacity-60");
    };

    const onLeaveLink = () => {
      dotRef.current?.classList.remove("scale-0");
      ringRef.current?.classList.remove("!w-10", "!h-10", "!border-text", "!opacity-60");
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.85;
      dotY += (mouseY - dotY) * 0.85;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (dotRef.current)
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;

      raf = requestAnimationFrame(animate);
    };

    const attachListeners = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    window.addEventListener("mousemove", onMove);
    animate();
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-text z-[9999] pointer-events-none transition-transform duration-75 will-change-transform"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-text/25 z-[9998] pointer-events-none opacity-40 transition-all duration-200 will-change-transform"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </>
  );
}
