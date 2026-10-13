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
    id: "best-short-film",
    name: "Best Short Film",
    for: "18th Annual London Asian Film Festival, London England",
    year: "March 2016",
    // by: "Red Dot",
  },
  {
    id: "awwwards",
    name: "Best Emerging Female Filmmaker",
    for: "7th Annual Dadasaheb Phalke Film Festival, New Delhi",
    year: " April 2015",
    // by: "Awwwards",
  },
  {
    id: "producer-craft-award",
    name: "Producer Craft Award",
    for: "New York University Tisch School of the Arts Asia Craft Awards",
    year: "April 2015",
    // by: "FWA",
  },
  {
    id: "best-cinematography,-jury-award",
    name: "Best Cinematography, Jury Award",
    for: "7th Annual Dadasaheb Phalke Film Festival, New Delhi",
    year: " April 2015",
    // by: "The Webby Awards",
  },
  {
    id: "production-design-craft-award",
    name: "Production Design Craft Award",
    for: "New York University Tisch School of the Arts Asia Craft Awards",
    year: " April 2015",
    // by: "CSSDA",
  },
  {
    id: " best-editing,-jury-award",
    name: " Best Editing, Jury Award",
    for: "7th Annual Dadasaheb Phalke Film Festival, New Delhi",
    year: "April 2015",
    // by: "CSSDA",
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