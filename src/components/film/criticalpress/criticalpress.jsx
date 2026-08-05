"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./criticalpress.module.css";

/* Same scroll reveal utility */
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
      {
        threshold: 0.15,
        rootMargin: "0px 0px -5% 0px",
      }
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

const reviews = [
  {
    quote:
      "“Handles arranged-marriage plots with more restraint than the genre usually allows.”",
    author: "— Placeholder, publication TBD",
  },
  {
    quote:
      "“One to watch.”",
    author: "— Placeholder, publication TBD",
  },
  {
    quote: "“A director interested in the pause, not the punchline.”",
    author: "— Placeholder, publication TBD",
  },
];

const CriticalPress = () => {
  return (
    <section className={styles["press-section"]}>
      {/* HEADER */}
      <div className={styles["press-header"]}>
        <Reveal as="h2" className={styles["title"]}>
          CRITICAL PRESS
        </Reveal>

        <div className={styles["header-line"]}></div>

        <Reveal as="span" className={styles["section-number"]}>
          §03
        </Reveal>
      </div>

      {/* REVIEWS */}
      <div className={styles["grid"]}>
        {reviews.map((review, index) => (
          <Reveal
            key={index}
            className={styles["card"]}
            direction="up"
            delay={index * 100}
          >
            <blockquote className={styles["quote"]}>
              {review.quote}
            </blockquote>

            <cite className={styles["author"]}>
              {review.author}
            </cite>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default CriticalPress;