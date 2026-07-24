"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./room.module.css";

const schedule = [
  {
    label: "Saluting the Sunrise flow:",
    time: "Tue / Thu · 7:00 am",
  },
  {
    label: "Calming the Voices slow flow + breathwork",
    time: "Sat · 10:00 am",
  },
  {
    label: "1:1 private session",
    time: "By request",
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

const MagneticButton = ({ href, children, className }) => {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const el = btnRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    const strength = 0.35;

    setIsHovering(true);
    setPos({ x: relX * strength, y: relY * strength });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setPos({ x: 0, y: 0 });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      className={`${className} ${styles["magnetic"]}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: isHovering
          ? "transform 0.15s ease-out, background 0.2s ease, color 0.2s ease, box-shadow 0.25s ease"
          : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, color 0.2s ease, box-shadow 0.25s ease",
      }}
    >
      {children}
    </a>
  );
};

const Room = () => {
  return (
    <div className={styles["room-wrapper"]}>
      <section className={styles["room-main"]}>
        <div className={styles["room-grid"]}>
          {/* ── LEFT COLUMN ── */}
          <div className={styles["room-left"]}>
            <Reveal direction="left" delay={0}>
              <div className={styles["eyebrow-row"]}>
                <span className={styles["section-num"]}>§ 03</span>
                <span className={styles["eyebrow-rule"]}></span>
                <span className={styles["eyebrow-label"]}>Room III — The Mat</span>
              </div>
            </Reveal>

            <Reveal direction="left" delay={150}>
              <h2 className={styles["heading"]}>
                <span className={styles["heading-line"]}>Where both voices</span>
                <span className={styles["heading-line"]}>finally just shhh..</span>
              </h2>
            </Reveal>

            <Reveal direction="left" delay={300}>
              <p className={styles["description"]}>
                Trauma-informed, breath-led yin and vinyasa for people whose
                bodies have been performing calm for years. RYT 200. Weekly
                drop-ins, private sessions, self-paced beginner series.
              </p>
            </Reveal>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className={styles["room-right"]}>
            <div className={styles["schedule-list"]}>
              {schedule.map((item, index) => (
                <Reveal key={index} direction="right" delay={index * 150}>
                  <div className={styles["schedule-row"]}>
                    <p className={styles["schedule-label"]}>{item.label}</p>
                    <p className={styles["schedule-time"]}>{item.time}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal direction="right" delay={schedule.length * 150}>
                <div className={styles["schedule-divider-end"]}></div>
              </Reveal>
            </div>

            <Reveal
              direction="right"
              delay={schedule.length * 150 + 150}
              className={styles["cta-wrapper"]}
            >
              <MagneticButton href="#book" className={styles["cta-book"]}>
                Book a class →
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Room;