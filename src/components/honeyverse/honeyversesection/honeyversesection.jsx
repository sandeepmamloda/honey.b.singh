"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./honeyversesection.module.css";

const filters = ["All", "Story", "Woman", "Teach", "Film", "Gym"];

const posts = [
  {
    tag: "Story",
    title: "POV: you’re single and childfree",
    meta: "TikTok · 0:34",
    bg: "rgba(255, 197, 234, 1)",
    color: "rgba(10, 10, 10, 1)",
  },
  {
    tag: "Film",
    title: "Trying to find my perfect cast for a feature",
    meta: "Reel · 0:58",
    bg: "rgba(180, 162, 237, 1)",
    color: "rgba(251, 249, 244, 1)",
  },
  {
    tag: "Teach",
    title: "Not interested in making friends season",
    meta: "TikTok · 0:41",
    bg: "rgba(255, 237, 168, 1)",
    color: "rgba(10, 10, 10, 1)",
  },
  {
    tag: "Woman",
    title: "5 things that I’ve learned in my 30s",
    meta: "Carousel · IG",
    bg: "rgba(255, 161, 162, 1)",
    color: "rgba(251, 249, 244, 1)",
  },
  {
    tag: "Story",
    title: "3 reasons why my Dad believes that men are not natural-born leaders",
    meta: "TikTok · 0:29",
    bg: "rgba(255, 237, 168, 1)",
    color: "rgba(35, 31, 24, 1)",
  },
  {
    tag: "Woman",
    title: "Unlearning everything. Ever.",
    meta: "Reel · 1:12",
    bg: "rgba(180, 162, 237, 1)",
    color: "rgba(251, 249, 244, 1)",
  },
  {
    tag: "Teach",
    title: 'Book the real thing',
    meta: "honeybsingh.com/teach",
    bg: "rgba(255, 197, 234, 1)",
    color: "rgba(10, 10, 10, 1)",
  },
  // {
  //   tag: "Teach",
  //   title: "Book the real thing → the mat",
  //   href: "/teach",
  //   meta: "honeyoheney.com/teach",
  //   bg: "rgba(255, 237, 168, 1)",
  //   color: "rgba(10, 10, 10, 1)",
  // },
  {
    tag: "Film",
    title: "What festivals actually feel like when you’re there with your work",
    meta: "TikTok · 0:52",
    bg: "rgba(255, 161, 162, 1)",
    color: "rgba(251, 249, 244, 1)",
  },
  {
    tag: "Gym",
    title: "I love the gym when its done",
    meta: "Reel · 0:44",
    bg: "rgba(255, 237, 168, 1)",
    color: "rgba(35, 31, 24, 1)",
  },
  {
    tag: "Story",
    title: "Pickmes are everywhere",
    meta: "TikTok · 1:03",
    bg: "rgba(255, 197, 234, 1)",
    color: "rgba(10, 10, 10, 1)",
  },
  {
    tag: "Teach",
    title: "All you need is humming bee breathwork",
    meta: "TikTok · 0:38",
    bg: "rgba(180, 162, 237, 1)",
    color: "rgba(251, 249, 244, 1)",
  },
];

const HoneyverseSection = () => {
  const [active, setActive] = useState("All");
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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const filteredPosts =
    active === "All" ? posts : posts.filter((post) => post.tag === active);

  const revealClass = inView ? styles["is-visible"] : "";

  return (
    <section
      ref={sectionRef}
      className={`${styles["honeyversegrid-wrapper"]} ${revealClass}`}
    >
      {/* ── filter bar ── */}
      <div className={styles["filterbar-wrapper"]}>
        <div className={styles["filterbar-main"]}>
          <div className={styles["filterbar-pills"]}>
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                style={{ animationDelay: `${index * 0.07}s` }}
                className={`${styles["filterbar-pill"]} ${
                  active === filter ? styles.active : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <p
            className={styles["filterbar-count"]}
            style={{ animationDelay: `${filters.length * 0.07 + 0.1}s` }}
          >
            {filteredPosts.length} Posts
          </p>
        </div>
      </div>

      {/* ── grid ── */}
      <div className={styles["honeyversegrid-main"]}>
        <div className={styles["honeyversegrid-list"]} key={active}>
          {filteredPosts.map((post, index) => (
            <div
              key={`${active}-${post.title}-${index}`}
              className={styles["post-card-wrap"]}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div
                className={styles["post-card"]}
                style={{ background: post.bg }}
              >
                <span className={styles["post-badge"]}>{post.tag}</span>

                <h3
                  className={styles["post-title"]}
                  style={{ color: post.color }}
                >
                  {post.href ? (
                    <a href={post.href}>{post.title}</a>
                  ) : (
                    post.title
                  )}
                </h3>

                <p
                  className={styles["post-meta"]}
                  style={{ color: post.color }}
                >
                  {post.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoneyverseSection;