"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./moviesinproduction.module.css";

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
      style={{
        transitionDelay: `${delay}ms`,
        // extra smoothness — pure inline, koi CSS class add nahi ki
        transitionDuration: "1s",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </Tag>
  );
};

// card ke image pe hover par halka zoom + tilt — design same rehta hai,
// bas image thodi si "alive" feel deti hai
const MovieCard = ({ movie, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal
      as="article"
      direction="up"
      delay={delay}
      className={styles["card"]}
    >
      <div
        className={styles["card-image-wrap"]}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ overflow: "hidden" }}
      >
        <img
          src={movie.image}
          alt={movie.title}
          className={styles["card-image"]}
          style={{
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>

      <div className={styles["card-header"]}>
        <h3 className={styles["card-title"]}>{movie.title}</h3>
        <span className={styles["badge"]}>In development</span>
      </div>

      <p className={styles["logline-label"]}>Logline</p>
      <p className={styles["description"]}>{movie.logline}</p>

      <p className={styles["tagline"]}>&ldquo;{movie.tagline}&rdquo;</p>
    </Reveal>
  );
};

const MOVIES = [
  {
    id: "happy-baisakhi",
    title: "Happy Baisakhi!!!",
    image: "/images/newhoneyverse/happy-baisakhi.jpg",
    logline:
      "Four best-friends return to their hometown of Toronto to celebrate the Popular harvest-centric Sikh festival of Baisakhi with their family & Friends which leads to them finally admitting uncomfortable truths, revisiting memories and forging new relationships amidst the backdrop of festivities.",
    tagline: "a sikh-canadian festival story",
  },
  {
    id: "arrange-me",
    title: "Arrange Me",
    image: "/images/newhoneyverse/arrange-me.jpg",
    logline:
      "Four best-friends return to their hometown of Toronto to celebrate the Popular harvest-centric Sikh festival of Baisakhi with their family & Friends which leads to them finally admitting uncomfortable truths, revisiting memories and forging new relationships amidst the backdrop of festivities.",
    tagline: "a sikh-canadian festival story",
  },
  {
    id: "brie",
    title: "Brie!",
    image: "/images/newhoneyverse/brie!.jpg",
    logline:
      "Four best-friends return to their hometown of Toronto to celebrate the Popular harvest-centric Sikh festival of Baisakhi with their family & Friends which leads to them finally admitting uncomfortable truths, revisiting memories and forging new relationships amidst the backdrop of festivities.",
    tagline: "a sikh-canadian festival story",
  },
  
];

const MoviesInProduction = () => {
  return (
    <section className={styles["movies"]}>
      <Reveal as="div" direction="up" className={styles["section-header"]}>
        <span className={styles["eyebrow"]}>Movies in Production</span>
        <span className={styles["counter"]}>§ 01</span>
      </Reveal>

      <div className={styles["grid"]}>
        {MOVIES.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} delay={i * 130} />
        ))}
      </div>
    </section>
  );
};

export default MoviesInProduction;