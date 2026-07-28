"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./manifesto.module.css";
import { LoaderLink } from "@/components/common/loader/loader";

const rows = [
  {
    number: "01",
    quiet: ["I direct films about women who", "are creating their own path."],
    loud: [
      "I POST VIDEOS ABOUT THE SAME WOMEN",
      "DEALING WITH THE AFTERMATH OF THAT.",
    ],
  },
  {
    number: "02",
    quiet: ["One is subtitled."],
    loud: ["THE OTHER HAS A TRENDING SOUND."],
  },
  {
    number: "03",
    quiet: ["Ink, laurels, a script in Punjabi", "I'm still finishing."],
    loud: ["HOT PINK, A FUZZY MIC, AND NO", "CHILL WHATSOEVER."],
  },
];

/* Fades an element into place the first time it scrolls into view.
   direction: "up" (fade + rise), "left" (fade in from the left),
   "right" (fade in from the right). `delay` (ms) staggers siblings. */
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

const Manifesto = () => {
  return (
    <div className={styles["manifesto-wrapper"]}>
      <section className={styles["manifesto-main"]}>
        <Reveal className={styles["top-row"]}>
          <span className={styles["eyebrow"]}>The Manifesto</span>
          <span className={styles["top-rule"]}></span>
          <span className={styles["section-mark"]}>§ 02</span>
        </Reveal>

        <div className={styles["rows"]}>
          {rows.map((row, index) => (
            <div className={styles["row"]} key={index}>
              <span className={styles["number"]}>{row.number}</span>

              <Reveal
                as="p"
                className={styles["quiet"]}
                direction="left"
                delay={index * 150}
              >
                {row.quiet.map((line, i) => (
                  <span className={styles["line"]} key={i}>
                    {line}
                  </span>
                ))}
              </Reveal>

              <span className={styles["divider"]}></span>

              <Reveal
                as="p"
                className={styles["loud"]}
                direction="right"
                delay={index * 150}
              >
                {row.loud.map((line, i) => (
                  <span className={styles["line"]} key={i}>
                    {line}
                  </span>
                ))}
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal className={styles["quote"]} as="p" delay={rows.length * 150}>
          <span className={styles["quote-muted"]}>
            None of it is a pivot. It&apos;s one question, asked at three
            speeds &mdash;{" "}
          </span>
          <span className={styles["quote-accent"]}>
            when does she stop performing and start telling the truth?
          </span>
        </Reveal>

        <Reveal
          className={styles["cta-wrap"]}
          delay={rows.length * 150 + 150}
        >
          <LoaderLink href="/about" className={styles["cta"]}>
            Read the whole story
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="12"
              viewBox="0 0 11 12"
              fill="none"
            >
              <path
                d="M-1.95093e-05 6.13406V4.94906H8.68498L4.30498 0.809062L5.09998 -0.000937879L10.5 5.18906V5.84906L5.09998 11.0541L4.28998 10.2291L8.63998 6.13406H-1.95093e-05Z"
                fill="#fff"
              />
            </svg>
          </LoaderLink>
        </Reveal>
      </section>
    </div>
  );
};

export default Manifesto;