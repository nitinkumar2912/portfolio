"use client";

import { useEffect, useRef } from "react";

export function ScrollBlurEffect() {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topEl = topRef.current;
    const bottomEl = bottomRef.current;
    if (!topEl || !bottomEl) return;

    let lastY = window.scrollY;
    let raf = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const y = window.scrollY;
      const speed = Math.abs(y - lastY);
      const k = Math.min(speed / 25, 1);
      const down = y > lastY;

      topEl!.style.opacity = String(down ? k * 0.85 : k * 0.35);
      bottomEl!.style.opacity = String(down ? k * 0.35 : k * 0.85);

      lastY = y;
      raf = false;

      clearTimeout(timer);
      timer = setTimeout(() => {
        topEl!.style.opacity = "0";
        bottomEl!.style.opacity = "0";
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

  return (
    <>
      <div
        ref={topRef}
        className="scroll-blur-top pointer-events-none fixed inset-x-0 top-16 z-40 h-24 opacity-0"
        aria-hidden="true"
      />
      <div
        ref={bottomRef}
        className="scroll-blur-bottom pointer-events-none fixed inset-x-0 bottom-0 z-40 h-24 opacity-0"
        aria-hidden="true"
      />
    </>
  );
}
