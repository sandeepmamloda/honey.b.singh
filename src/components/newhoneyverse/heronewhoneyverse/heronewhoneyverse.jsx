"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./heronewhoneyverse.module.css";

const Reveal = ({
  children,
  className = "",
  delay = 0,
  as = "div",
  direction = "up",
  scale = false,
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

  // extra scale punch on top of existing CSS transform,
  // added purely via inline style so CSS file stays untouched
  const scaleStyle = scale
    ? { transform: visible ? "scale(1)" : "scale(0.9)" }
    : {};

  return (
    <Tag
      ref={ref}
      className={`${className} ${directionClass} ${
        visible ? styles["reveal-visible"] : ""
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: "1s",
        ...scaleStyle,
      }}
    >
      {children}
    </Tag>
  );
};

// word-by-word stagger reveal — heading ke har word ka apna
// mini fade+slide animation, sab kuch inline style se control hota hai
const WordReveal = ({ text, className = "", startDelay = 0, stagger = 60 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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

  const words = text.split(" ");

  return (
    <h1 ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(0.9em)",
            transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)`,
            transitionDelay: `${startDelay + i * stagger}ms`,
            marginRight: "0.28em",
            willChange: "opacity, transform",
          }}
        >
          {word === "FAST," || word === "FUNNY," ? (
            <span className={styles["highlight"]}>{word} </span>
          ) : (
            word
          )}
        </span>
      ))}
    </h1>
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
        <Reveal direction="up" scale>
          <span className={styles["badge"]}>Welcome to the Honeyverse preview</span>
        </Reveal>

        <WordReveal
          text="THE INTERNET SIDE. FAST, FUNNY, SAME HONESTY AT SPEED."
          className={styles["heading"]}
          startDelay={150}
          stagger={55}
        />

        <Reveal direction="up" delay={550} as="p" className={styles["description"]}>
          The sister platform to my slow cinema. This is my digital playground —
          a chaotic space for fast-cut video essays, loud internet humor, and
          unrefined creative impulses.
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;