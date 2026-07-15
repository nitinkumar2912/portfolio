"use client";

import { useEffect, useRef } from "react";

export function ScrollBlurEffect() {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const y = window.scrollY;
      const speed = Math.abs(y - lastY);
      const k = Math.min(speed / 25, 1);
      const down = y > lastY;

      if (topRef.current) topRef.current.style.opacity = String(down ? k * 0.85 : k * 0.35);
      if (bottomRef.current) bottomRef.current.style.opacity = String(down ? k * 0.35 : k * 0.85);

      lastY = y;
      raf = false;

      clearTimeout(timer);
      timer = setTimeout(() => {
        if (topRef.current) topRef.current.style.opacity = "0";
        if (bottomRef.current) bottomRef.current.style.opacity = "0";
      }, 100);
    }

    const onScroll = () => {
      if (!raf) {
        raf = true;
        requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  const blurCSS = (dir: "top" | "bottom"): React.CSSProperties => ({
    background:
      dir === "top"
        ? "linear-gradient(to bottom, rgba(10,10,10,0.8), transparent)"
        : "linear-gradient(to top, rgba(10,10,10,0.8), transparent)",
    backdropFilter: "blur(5px)",
    WebkitBackdropFilter: "blur(5px)",
    maskImage:
      dir === "top"
        ? "linear-gradient(to bottom, black 15%, transparent)"
        : "linear-gradient(to top, black 15%, transparent)",
    WebkitMaskImage:
      dir === "top"
        ? "linear-gradient(to bottom, black 15%, transparent)"
        : "linear-gradient(to top, black 15%, transparent)",
    transition: "opacity 0.2s ease-out",
  });

  return (
    <>
      <div
        ref={topRef}
        className="pointer-events-none fixed inset-x-0 top-16 z-40 h-24 opacity-0"
        style={blurCSS("top")}
        aria-hidden="true"
      />
      <div
        ref={bottomRef}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-24 opacity-0"
        style={blurCSS("bottom")}
        aria-hidden="true"
      />
    </>
  );
}
