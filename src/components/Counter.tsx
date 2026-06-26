"use client";

import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export default function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <span ref={ref} className="font-mono">
      {count}{suffix}
    </span>
  );
}
