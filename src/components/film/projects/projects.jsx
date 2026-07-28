"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./projects.module.css";

/* Same fade-in-on-scroll utility used across the site. */
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

const projects = [
  {
    id: "heer",
    title: "Heer",
    image: "/images/film/heer.png",
    alt: "Crew filming a rainy night street scene for Heer",
  },
  {
    id: "keys",
    title: "Keys (Haagen Dazs)",
    image: "/images/film/keys.png",
    alt: "Editing suite with film reels for the Keys edit",
  },
  
];

const SelectedProjects = () => {
  return (
    <section className={styles["projects"]}>
      <Reveal className={styles["top-row"]}>
        <span className={styles["eyebrow"]}>Selected Projects</span>
        <span className={styles["top-rule"]}></span>
        <span className={styles["section-mark"]}>&sect; 02</span>
      </Reveal>

      <div className={styles["grid"]}>
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            className={styles["card"]}
            direction={index % 2 === 0 ? "left" : "right"}
            delay={index * 120}
          >
            <div className={styles["card-frame"]}>
              <img
                src={project.image}
                alt={project.alt}
                className={styles["card-image"]}
              />
            </div>
            <h3 className={styles["card-title"]}>{project.title}</h3>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default SelectedProjects;