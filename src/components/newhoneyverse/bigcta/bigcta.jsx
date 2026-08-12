"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./bigcta.module.css";

const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "up",
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionClass =
    direction === "left"
      ? styles["reveal-left"]
      : direction === "right"
      ? styles["reveal-right"]
      : styles["reveal-up"];

  return (
    <Tag
      ref={ref}
      className={`${className} ${directionClass} ${
        visible ? styles["reveal-visible"] : ""
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        // pure inline — CSS file untouched
        transitionDuration: "1.1s",
        transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)",
      }}
    >
      {children}
    </Tag>
  );
};

// button ke andar arrow ko thoda "alive" banaya — hover pe slide karta hai,
// baaki button ka design (colors, padding, radius) bilkul same rehta hai
const CTAButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://honeyverse.com"
      target="_blank"
      rel="noopener noreferrer"
      className={styles["cta-button"]}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "scale(1.035)" : "scale(1)",
        transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      Visit Honeyverse Now
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          transform: hovered ? "translateX(6px)" : "translateX(0)",
          transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        →
      </span>
    </a>
  );
};

const BigCTA = () => {
  return (
    <section className={styles["big-cta"]}>
      <div className={styles["content"]}>
        <Reveal as="h2" direction="up" className={styles["heading"]}>
          Tired of the slow lane?
        </Reveal>

        <Reveal as="p" direction="up" delay={130} className={styles["description"]}>
          Jump straight into the full Honeyverse web experience. Instant skits,
          louder opinions, and unhinged design.
        </Reveal>

        <Reveal direction="up" delay={280}>
          <CTAButton />
        </Reveal>

        <Reveal as="p" direction="up" delay={380} className={styles["microcopy"]}>
          Opens in a new tab &middot; same honesty, zero speed limit
        </Reveal>
      </div>
    </section>
  );
};

export default BigCTA;