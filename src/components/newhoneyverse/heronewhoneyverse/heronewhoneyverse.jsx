"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./heronewhoneyverse.module.css";

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

const Hero = () => {
  return (
    <section className={styles["hero"]}>
      <video
        className={styles["hero-video"]}
        src="/videos/newhoneyverse.mp4"
        poster="/images/hero/honeyverse-hero-bg.jpg"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className={styles["hero-content"]}>
        <Reveal direction="up">
          <span className={styles["badge"]}>Welcome to the Honeyverse preview</span>
        </Reveal>

        <Reveal direction="up" delay={100} as="h1" className={styles["heading"]}>
          THE INTERNET SIDE. <span className={styles["highlight"]}>FAST, FUNNY,</span> SAME
          HONESTY AT SPEED.
        </Reveal>

        <Reveal direction="up" delay={200} as="p" className={styles["description"]}>
          The sister platform to my slow cinema. This is my digital playground —
          a chaotic space for fast-cut video essays, loud internet humor, and
          unrefined creative impulses.
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;