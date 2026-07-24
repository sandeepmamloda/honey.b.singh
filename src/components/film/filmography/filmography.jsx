"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./filmography.module.css";

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

const films = [
  {
    year: "2015",
    title: "Keys (Haagen Dazs)",
    role: "Director & Writer",
    note: "Singapore",
    status: "Completed",
    href: "#keys",
  },
  {
    year: "2015",
    title: "Arrange Me",
    role: "Writer/Director",
    note: "National Association of Latino Independent Producers (NALIP) Diverse Women in Media Residency Lab",
    status: "In development",
    href: "#arrange-me",
  },
  {
    year: "2016",
    title: "Heer",
    role: "Director",
    note: "Best Short, London South Asian Film Festival",
    status: "Completed",
    href: "#heer",
  },
  {
    year: "2017",
    title: "Olivia Lee of Shophouse 333",
    role: "Director & Co-Writer",
    note: "Hong Kong Asia Film Financing Forum and winner of G2D Post-Production Sound Award",
    status: "In development",
    href: "#olivia-lee",
  },
  {
    year: "2018",
    title: "Brie!",
    role: "Writer/Director",
    note: "Selected for Torino Film Lab Extended",
    status: "In development",
    href: "#brie",
  },
  {
    year: "2023",
    title: "Happy Baisakhi!",
    role: "Writer/Director",
    note: "Cine Qua Non Storylines Lab Selection",
    status: "In development",
    href: "#happy-baisakhi",
  },
];

const Filmography = () => {
  return (
    <section className={styles["filmography"]}>
      <Reveal as="h2" className={styles["title"]}>
        Complete Filmography
      </Reveal>

      <div className={styles["table"]}>
        {films.map((film, index) => (
          <Reveal
            key={film.title}
            as="a"
            href={film.href}
            className={`${styles["row"]} ${
              index === 0 ? styles["row-first"] : ""
            }`}
            direction="up"
            delay={index * 70}
          >
            <span className={styles["year"]}>{film.year}</span>
            <span className={styles["film-title"]}>{film.title}</span>
            <span className={styles["role"]}>{film.role}</span>
            <span className={styles["note"]}>{film.note}</span>
            <span
              className={`${styles["badge"]} ${
                film.status === "Completed"
                  ? styles["badge-completed"]
                  : styles["badge-development"]
              }`}
            >
              {film.status}
            </span>
            <span className={styles["arrow"]}>&#8599;</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Filmography;