'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./classessection.module.css";

const sessionsData = [
  {
    meta: "Tue / Thu · 7:00am · In-studio",
    title: "Surya Namaskar flow",
    description:
      "A 60-min breath-led Hatha flow built on sun salutations, before the day gets its hands on you. All levels.",
    priceLabel: "Drop-in · ",
    price: "$[00]",
    variant: "light",
  },
  {
    meta: "Sat · 10:00am · In-studio",
    title: "Chandra Namaskar + breathwork",
    description:
      "75 minutes of moon salutations at half the speed, all of the attention. Closes with 15 minutes of guided breath. The one to start with.",
    priceLabel: "Drop-in · ",
    price: "$[00]",
    variant: "accent",
  },
  {
    meta: "DAy/NIGHT · 45 minutes",
    title: "Pranayama breathwork",
    description:
      `no poses, just the breath doing the work it usually does in the background. For people who "don't have time to meditate.`,
    priceLabel: "Drop-in · ",
    price: "$[00]",
    variant: "light",
  },
  {
    meta: "By request · In-studio or virtual",
    title: "1:1 private session",
    description:
      `By request, in-studio or virtual · Built around your body and whatever your mind won't drop. Singles or packs.`,
    priceLabel: "From ·",
    price: "$[00]",
    variant: "light",
  },
];

const Sessions = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealClass = inView ? styles["is-visible"] : "";

  return (
    <section
      ref={sectionRef}
      className={`${styles["sessions-wrapper"]} ${revealClass}`}
    >
      <div className={styles["sessions-main"]}>
        <p className={styles["sessions-eyebrow"]}>Classes &amp; Sessions</p>

        <div className={styles["sessions-grid"]}>
          {sessionsData.map((item, index) => (
            <div
              key={index}
              className={`${styles["session-card"]} ${
                item.variant === "accent" ? styles["session-card-accent"] : ""
              }`}
              style={{ animationDelay: `${0.15 + index * 0.15}s` }}
            >
              <div className={styles["session-top"]}>
                <p className={styles["session-meta"]}>{item.meta}</p>
                <h3 className={styles["session-title"]}>{item.title}</h3>
                <p className={styles["session-desc"]}>{item.description}</p>
              </div>

              <div className={styles["session-bottom"]}>
                <span className={styles["session-divider"]}></span>
                <p className={styles["session-price-row"]}>
                  <span className={styles["session-price-label"]}>
                    {item.priceLabel} ·
                  </span>{" "}
                  <span className={styles["session-price"]}>{item.price}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sessions;