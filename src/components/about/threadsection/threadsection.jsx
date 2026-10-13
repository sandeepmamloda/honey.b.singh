'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./threadsection.module.css";
import { LoaderLink } from "@/components/common/loader/loader";

const pillars = [
  {
    title: "Film",
    dot: "rgba(116, 96, 175, 1)",
    desc: "slow, structured, subtitled. One honest scene at a time.",
  },
  {
    title: "Honeyverse",
    dot: "rgba(255, 150, 216, 1)",
    desc: "fast, deadpan, same honesty at a trending BPM.",
  },
  {
    title: "Teach",
    dot: "rgba(193, 101, 47, 1)",
    desc: "slow again, honesty with a body attached.",
  },
];

const links = [
  { label: "See the films →", href: "/film" },
  { label: "Enter the Honeyverse →", href: "/honeyverse" },
  { label: "Book a class →", href: "/teach" },
];

const tempos = [
  {
    label: "Largo",
    color: "rgba(25, 25, 25, 1)",
    desc: "Film. Slow, structured, subtitled honesty.",
  },
  {
    label: "Presto",
    color: "rgba(255, 46, 126, 1)",
    desc: "The Honeyverse. Same honesty, posted before you can overthink it.",
  },
  {
    label: "4·4 breath",
    color: "rgba(193, 101, 47, 1)",
    desc: "The mat. Where both voices finally shush.",
  },
];

const ThreadSection = () => {
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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealClass = inView ? styles["is-visible"] : "";

  return (
    <section
      ref={sectionRef}
      className={`${styles["thread-wrapper"]} ${revealClass}`}
    >
      <div className={styles["thread-main"]}>

        <aside className={styles["thread-aside"]}>
          <p className={styles["thread-eyebrow"]}>The thread, named:</p>

          <ul className={styles["thread-items"]}>
            {pillars.map((item, i) => (
              <li
                key={item.title}
                className={styles["thread-item"]}
                style={{ animationDelay: `${0.35 + i * 0.15}s` }}
              >
                <span className={styles["thread-item-title"]}>
                  <span
                    className={styles["thread-dot"]}
                    style={{ background: item.dot }}
                  />
                  {item.title}
                </span>
                <p className={styles["thread-item-desc"]}>{item.desc}</p>
              </li>
            ))}
          </ul>

          <div className={styles["thread-links"]}>
            {links.map((link, i) => (
              <LoaderLink
                key={link.label}
                href={link.href}
                className={styles["thread-link"]}
                style={{ animationDelay: `${0.9 + i * 0.12}s` }}
              >
                {link.label}
              </LoaderLink>
            ))}
          </div>
        </aside>

        <article className={styles["thread-article"]}>
          <div
            className={styles["thread-portrait"]}
            style={{ animationDelay: "0.2s" }}
          >
            <span>Portrait — TBD</span>
          </div>

          <p
            className={styles["thread-lede"]}
            style={{ animationDelay: "0.45s" }}
          >
            If you clicked here trying to figure out how these three add up to one person, fair. Let me save you the math.
          </p>

          <p style={{ animationDelay: "0.6s" }}>
            I direct film because I'm obsessed with the exact second someone stops performing and starts being honest. Not the confession, not the monologue, the half-breath right before it, when the face hasn't caught up to the decision yet. Every short I've made is built around getting a camera close to that second without scaring it off.
          </p>

          <p style={{ animationDelay: "0.7s" }}>
            I post deadpan videos on the internet for the same reason, just faster and messier. The Honeyverse looks like chaos, five pillars, hot pink, a joke every thirty seconds, but the joke only works when it's true. Comedy is honesty on a shot clock. The internet taught me more about pacing than film school ever admitted it would.
          </p>

          <blockquote
            className={styles["thread-quote"]}
            style={{ animationDelay: "0.85s" }}
          >
            "I want to alchemize all that is inside of me and create art that will make you laugh and cry (at the same time)."
          </blockquote>

          <p style={{ animationDelay: "0.95s" }}>
            I teach yoga because the body gets there before the script does. I did my RYT 200 the year I couldn't finish writing anything and realized a room of people breathing on purpose is the same moment I keep chasing with a camera,  people getting honest, minus the lens. Now I teach it on purpose, for people who think in run-on sentences. Takes one to cue one.
          </p>

          <h3
            className={styles["thread-subheading"]}
            style={{ animationDelay: "1.05s" }}
          >
            The same question, three tempos:
          </h3>

          {/* <p style={{ animationDelay: "1.15s" }}>
            None of it is a pivot, and nothing here is a side hustle waiting
            to be trimmed. It's one question asked at three speeds:
          </p> */}

          <div className={styles["tempo-list"]}>
            {tempos.map((tempo, i) => (
              <div
                key={tempo.label}
                className={styles["tempo-row"]}
                style={{ animationDelay: `${1.25 + i * 0.12}s` }}
              >
                <span
                  className={styles["tempo-label"]}
                  style={{ color: tempo.color }}
                >
                  {tempo.label}
                </span>
                <p className={styles["tempo-desc"]}>{tempo.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ animationDelay: "1.6s" }}>
            None of it's a side hustle waiting to get cut. If you're a producer, the quiet room is{" "}
            <LoaderLink href="/film">this way</LoaderLink>. If you found me through a video about being a rage monster, the loud room is{" "}
            <LoaderLink href="/honeyverse">that way</LoaderLink>. If you just want to breathe for an hour, <LoaderLink href="/teach">the mat is waiting</LoaderLink>.
          </p>

          <p
            className={styles["thread-signature"]}
            style={{ animationDelay: "1.7s" }}
          >
            — Honey
          </p>
        </article>

      </div>
    </section>
  );
};

export default ThreadSection;