"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./baisakhi.module.css";
import { LoaderLink } from "@/components/common/loader/loader";

/* Same fade-in-on-scroll utility used across the site (see Manifesto / Herofilm). */
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

const FeaturedFilm = () => {
  return (
    <section className={styles["featured-film"]}>
      <div className={styles["row"]}>
        <Reveal className={styles["badge-col"]} direction="left">
          <span className={styles["badge"]}>Feature &middot; In development</span>
        </Reveal>

        <Reveal className={styles["text-col"]} direction="up" delay={100}>
          <h3 className={styles["title"]}>Happy Baisakhi!</h3>

          <p className={styles["logline-label"]}>Logline</p>
          <p className={styles["description"]}>
            Four best-friends return to their hometown of Toronto to
            celebrate the popular harvest-centric Sikh festival of Baisakhi
            with their family & friends which leads to them finally admitting
            uncomfortable truths, revisiting memories and forging new
            relationships amidst the backdrop of festivities.
          </p>

          <h4 className={styles["story-heading"]}>A Sikh-Canadian Festival Story</h4>
        </Reveal>

        <Reveal className={styles["cta-col"]} direction="right" delay={150}>
          <LoaderLink href="/contact" className={styles["cta"]}>
            Request the deck
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="12"
              viewBox="0 0 11 12"
              fill="none"
            >
              <path
                d="M-1.95093e-05 6.13406V4.94906H8.68498L4.30498 0.809062L5.09998 -0.000937879L10.5 5.18906V5.84906L5.09998 11.0541L4.28998 10.2291L8.63998 6.13406H-1.95093e-05Z"
                fill="#17110f"
              />
            </svg>
          </LoaderLink>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedFilm;