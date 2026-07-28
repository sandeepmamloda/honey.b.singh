"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./herofilm.module.css";
import { LoaderLink } from "@/components/common/loader/loader";

/* Same fade-in-on-scroll utility used across the site (see Manifesto). */
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

const Herofilm = () => {
  return (
    <section className={styles["hero"]}>
      <div className={styles["hero-body"]}>
        <div className={styles["hero-copy"]}>
          <Reveal className={styles["eyebrow-row"]} direction="left">
            <span className={styles["eyebrow-dash"]}>&mdash;</span>
            <span className={styles["eyebrow"]}>
              THE QUIET ROOM &ndash; DIRECTION &amp; WRITING
            </span>
          </Reveal>

          <Reveal as="h1" className={styles["title"]} direction="left" delay={80}>
            Films about the exact second she stops performing.
          </Reveal>

          <Reveal
            as="p"
            className={styles["subtitle"]}
            direction="left"
            delay={200}
          >
            Shorts, a feature in development, and fiction novel.
            <br />
            For screeners, EPK, or reps, use the{" "}
            <LoaderLink href="/contact" className={styles["subtitle-link"]}>
              press &amp; industry channel.
            </LoaderLink>
          </Reveal>
        </div>

        <Reveal className={styles["hero-frame"]} direction="right" delay={150}>
          <img
            src="/images/film/herofilm.png"
            alt="A woman looking out of a train window at dusk"
            className={styles["hero-image"]}
          />
          <span className={styles["frame-overlay"]}></span>
          <span className={styles["frame-quote"]}>
            &ldquo;Honesty in every single frame.&rdquo;
          </span>
        </Reveal>
      </div>
    </section>
  );
};

export default Herofilm;