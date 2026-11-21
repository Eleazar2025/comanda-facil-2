"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const STATE_STYLES = {
  hidden: "opacity-0",
  visible: "animate-fade-up",
};

interface RevealProps {
  children?: ReactNode;
  className?: string;
}

/** Fades the content in (opacity + small translate) when it scrolls into view. */
export default function Reveal({ children, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? STATE_STYLES.visible : STATE_STYLES.hidden} ${className}`}
    >
      {children}
    </div>
  );
}
