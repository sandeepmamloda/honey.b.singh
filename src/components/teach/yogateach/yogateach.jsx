"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./yogateach.module.css";

/* Same fade-in-on-scroll utility used across the site. */
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

const YogaHero = () => {
  return (
    <section className={styles["yoga-hero"]}>
      <div className={styles["hero-body"]}>
        <div className={styles["hero-copy"]}>
          <Reveal as="span" className={styles["eyebrow"]} direction="left">
            RYT 200 &middot; Trauma-informed &middot; Hatha & Pranayama
          </Reveal>

          <Reveal as="h1" className={styles["title"]} direction="left" delay={80}>
            Movement as the third honest room.
          </Reveal>

          <Reveal
            as="p"
            className={styles["description"]}
            direction="left"
            delay={180}
          >
            Trauma-informed breath-led hatha for people who've been composed on purpose for years. No performance, no "just relax," no touching your toes on day one. Beginners are the point.
          </Reveal>
        </div>

        <Reveal className={styles["circle-wrap"]} direction="right" delay={150}>
          <div className={styles["circle-outer"]}>
            <div className={styles["circle-inner"]}>
              <span className={styles["circle-label"]}>inhale</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default YogaHero;