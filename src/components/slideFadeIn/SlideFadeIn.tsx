import React, { useRef } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

interface SlideFadeInProps {
  children: React.ReactNode;
  className?: string;
  direction: "left" | "right";
}
const SlideFadeIn = ({ children, className, direction }: SlideFadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref);

  return (
    <div
      ref={ref}
      className={`${className} ${
        isIntersecting ? "animate-slide-fade-" + direction : ""
      }`}
    >
      {children}
    </div>
  );
};

export default SlideFadeIn;
