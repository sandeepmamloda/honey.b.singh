"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./awards.module.css";

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

const AWARDS = [
  {
    id: "red-dot",
    name: "Red Dot Design Award",
    for: "Best UI Design",
    year: "2024",
    by: "Red Dot",
  },
  {
    id: "awwwards",
    name: "Awwwards Site of the Day",
    for: "Interactive Experience",
    year: "2023",
    by: "Awwwards",
  },
  {
    id: "fwa",
    name: "FWA of the Month",
    for: "Website of the Month",
    year: "2023",
    by: "FWA",
  },
  {
    id: "webby",
    name: "Webby Award Honoree",
    for: "Best Visual Design",
    year: "2022",
    by: "The Webby Awards",
  },
  {
    id: "cssda",
    name: "CSS Design Awards Winner",
    for: "Best UX Design",
    year: "2022",
    by: "CSSDA",
  },
];

const Awards = () => {
  return (
    <section className={styles["awards"]}>
      <Reveal as="div" direction="up" className={styles["section-header"]}>
        <span className={styles["eyebrow"]}>Awards</span>
        <span className={styles["header-line"]} />
        <span className={styles["counter"]}>§ 02</span>
      </Reveal>

      <div className={styles["table"]}>
        <Reveal as="div" direction="up" className={styles["table-head"]}>
          <span className={styles["col-label"]}>Award Name</span>
          <span className={styles["col-label"]}>Award For</span>
          <span className={`${styles["col-label"]} ${styles["col-label-right"]}`}>
            Year &amp; Awarded By
          </span>
        </Reveal>

        {AWARDS.map((award, i) => (
          <Reveal
            key={award.id}
            as="div"
            direction="up"
            delay={i * 60}
            className={styles["row"]}
          >
            <span className={styles["award-name"]}>{award.name}</span>
            <span className={styles["award-for"]}>{award.for}</span>
            <span className={styles["award-meta"]}>
              {award.year} &middot; {award.by}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Awards;