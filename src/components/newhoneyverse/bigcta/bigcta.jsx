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
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

const BigCTA = () => {
  return (
    <section className={styles["big-cta"]}>
      <div className={styles["content"]}>
        <Reveal as="h2" direction="up" className={styles["heading"]}>
          Tired of the slow lane?
        </Reveal>

        <Reveal as="p" direction="up" delay={100} className={styles["description"]}>
          Jump straight into the full Honeyverse web experience. Instant skits,
          louder opinions, and unhinged design.
        </Reveal>

        <Reveal direction="up" delay={200}>
          <a
            href="https://honeyverse.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["cta-button"]}
          >
            Visit Honeyverse Now
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>

        <Reveal as="p" direction="up" delay={280} className={styles["microcopy"]}>
          Opens in a new tab &middot; same honesty, zero speed limit
        </Reveal>
      </div>
    </section>
  );
};

export default BigCTA;