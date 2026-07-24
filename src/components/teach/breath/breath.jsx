"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./breath.module.css";

gsap.registerPlugin(ScrollTrigger);

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

const YogaBreath = () => {
  const sectionRef = useRef(null);
  const outerCircleRef = useRef(null);
  const innerCircleRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const outerCircle = outerCircleRef.current;
    const innerCircle = innerCircleRef.current;
    const label = labelRef.current;

    if (!section || !outerCircle || !innerCircle || !label) {
      return;
    }

    const ctx = gsap.context(() => {
      const breathTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: "+=2800", // Increased scroll length for ultra-slow & gradual breathing pace
          pin: true,
          pinSpacing: true,
          scrub: 2, // Smooth 2s catch-up lag for very gentle momentum
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* 
        EXPANSION RADII:
        Outer Circle:  25rem -> 32rem (+7rem)
        Inner Circle:  19.5rem -> 26.5rem (+7rem)
        Difference/Gap bilkul constant rehta hai (2.75rem spacing)!
      */

      /* 1. INHALE (Radius Expansion) */
      breathTimeline
        .to(
          outerCircle,
          {
            width: "32rem",
            height: "32rem",
            duration: 5,
            ease: "sine.inOut",
          },
          "inhale"
        )
        .to(
          innerCircle,
          {
            width: "27rem",
            height: "27rem",
            duration: 5,
            ease: "sine.inOut",
          },
          "inhale"
        )
        .to(
          label,
          {
            scale: 1.1,
            duration: 2,
            ease: "sine.inOut",
          },
          "inhale"
        )

      /* 2. PEAK TEXT SWITCH */
      breathTimeline
        .to(
          label,
          {
            opacity: 0,
            duration: 0.2,
            ease: "sine.out",
            onComplete: () => {
              if (label) label.innerText = "exhale";
            },
            onReverseComplete: () => {
              if (label) label.innerText = "inhale";
            },
          },
          "peak-=0.1"
        )
        .to(
          label,
          {
            opacity: 1,
            duration: 0.2,
            ease: "sine.in",
          },
          "peak+=0.1"
        )

      /* 3. EXHALE (Radius Shrink Back) */
        .to(
          outerCircle,
          {
            width: "25rem",
            height: "25rem",
            duration: 2,
            ease: "sine.inOut",
          },
          "exhale"
        )
        .to(
          innerCircle,
          {
            width: "19.5rem",
            height: "19.5rem",
            duration: 2,
            ease: "sine.inOut",
          },
          "exhale"
        )
        .to(
          label,
          {
            scale: 1,
            duration: 2,
            ease: "sine.inOut",
          },
          "exhale"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles["yoga-breath"]}>
      <div className={styles["breath-body"]}>
        <div className={styles["breath-sticky"]}>
          <Reveal className={styles["breath-circle-wrap"]} direction="up">
            <div className={styles["breath-circle-container"]}>
              <div
                ref={outerCircleRef}
                className={styles["breath-circle-outer"]}
              />
              <div
                ref={innerCircleRef}
                className={styles["breath-circle-inner"]}
              >
                <span ref={labelRef} className={styles["breath-label"]}>
                  inhale
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal
            as="p"
            className={styles["breath-instruction"]}
            direction="up"
            delay={150}
          >
            SCROLL SLOWLY — THIS IS THE PACE OF CLASS
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default YogaBreath;