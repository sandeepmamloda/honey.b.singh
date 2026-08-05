"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./featurepillars.module.css";

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

const pillars = [
  {
    id: "breath-first",
    title: "Breath first",
    body: "Every sequence is built off the breath, not the pose. If the breath breaks, we scale down — the pose was never the point.",
  },
  {
    id: "zero-performance",
    title: "Trauma-informed, always",
    body: "Trained in Hatha (200-hr, India). Consent-based cueing, no hands-on adjustment without asking, every time.",
  },
  {
    id: "overthinkers-welcome",
    title: "Overthinkers welcome",
    body: "Cues written for people who narrate their own lives. The body gets there first; the mind can catch up when it's ready.",
  },
];

const FeaturePillars = () => {
  return (
    <section className={styles["pillars"]}>
      <div className={styles["row"]}>
        {pillars.map((pillar, index) => (
          <Reveal
            key={pillar.id}
            className={styles["pillar"]}
            direction="up"
            delay={index * 100}
          >
            <h3 className={styles["pillar-title"]}>{pillar.title}</h3>
            <p className={styles["pillar-body"]}>{pillar.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default FeaturePillars;