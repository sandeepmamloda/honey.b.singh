"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./honeyversesection.module.css";

const filters = ["All", "Story", "Woman", "Teach", "Film", "Gym"];

// Card colors rotate ho jaate hain — existing design se liye gaye
const cardStyles = [
  { bg: "rgba(255, 197, 234, 1)", color: "rgba(10, 10, 10, 1)" },
  { bg: "rgba(180, 162, 237, 1)", color: "rgba(251, 249, 244, 1)" },
  { bg: "rgba(255, 237, 168, 1)", color: "rgba(10, 10, 10, 1)" },
  { bg: "rgba(255, 161, 162, 1)", color: "rgba(251, 249, 244, 1)" },
];

const formatDate = (dateStr) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const HoneyverseSection = () => {
  const [active, setActive] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetch("/api/substack")
      .then((res) => res.json())
      .then((data) => {
        const rawPosts = data.posts || [];

        const mappedPosts = rawPosts.map((post, index) => {
          const style = cardStyles[index % cardStyles.length];
          return {
            // Substack RSS se by-default tag nahi aata, isliye fallback "Story"
            tag: post.tag || "Story",
            title: post.title || "Untitled",
            meta: formatDate(post.date),
            href: post.link,
            bg: style.bg,
            color: style.color,
          };
        });

        setPosts(mappedPosts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load Substack posts:", err);
        setLoading(false);
      });
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
        {!loading && filteredPosts.length === 0 ? (
          <p style={{ textAlign: "center", padding: "2rem" }}>
            No posts yet.
          </p>
        ) : (
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
                      <a
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.title}
                      </a>
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
        )}
      </div>
    </section>
  );
};

export default HoneyverseSection;