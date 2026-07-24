"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

const navLinks = [
  { name: "Film", href: "/film" },
  { name: "Honeyverse", href: "/honeyverse" },
  { name: "Teach", href: "/teach" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const marqueeWords = [
  { text: "Story", accent: false },
  { text: "Woman", accent: false },
  { text: "Teach", accent: false },
  { text: "Film", accent: false },
  { text: "Same Honesty At Speed", accent: true },
  { text: "Story", accent: false },
  { text: "Woman", accent: false },
  { text: "Teach", accent: false },
  { text: "Film", accent: false },
  { text: "Same Honesty At Speed", accent: true },
  { text: "Story", accent: false },
  { text: "Woman", accent: false },
  { text: "Teach", accent: false },
  { text: "Film", accent: false },
  { text: "Same Honesty At Speed", accent: true },
  { text: "Story", accent: false },
  { text: "Woman", accent: false },
  { text: "Teach", accent: false },
  { text: "Film", accent: false },
  { text: "Same Honesty At Speed", accent: true },
];

const MarqueeContent = ({ innerRef }) => (
  <div className={styles["marquee-group"]} ref={innerRef}>
    {marqueeWords.map((word, index) => (
      <span key={index} className={styles["marquee-item"]}>
        <span
          className={
            word.accent ? styles["text-accent"] : styles["text-white"]
          }
        >
          {word.text}
        </span>

        <span className={styles["dot"]}>·</span>
      </span>
    ))}
  </div>
);

const MagneticButton = ({ href, children, className }) => {
  const btnRef = useRef(null);

  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const el = btnRef.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();

    const relX =
      e.clientX - (rect.left + rect.width / 2);

    const relY =
      e.clientY - (rect.top + rect.height / 2);

    const strength = 0.35;

    setIsHovering(true);

    setPos({
      x: relX * strength,
      y: relY * strength,
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    setPos({
      x: 0,
      y: 0,
    });
  };

  return (
    <Link
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
    </Link>
  );
};

const Navbar = () => {
  const groupRef = useRef(null);

  const [distance, setDistance] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  const lastScrollY = useRef(0);

  // ─────────────────────────────
  // MARQUEE WIDTH MEASUREMENT
  // ─────────────────────────────

  useEffect(() => {
    const measure = () => {
      if (groupRef.current) {
        setDistance(groupRef.current.offsetWidth);
      }
    };

    measure();

    const observer = new ResizeObserver(measure);

    if (groupRef.current) {
      observer.observe(groupRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ─────────────────────────────
  // SCROLL DETECTION
  // ─────────────────────────────

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      const scrollDiff =
        currentScrollY - lastScrollY.current;

      const tolerance = 25;

      // Page top par navbar hamesha visible rahegi
      if (currentScrollY <= 80) {
        setIsHidden(false);
      }

      // Downward scroll
      else if (scrollDiff > tolerance) {
        setIsHidden(false);

        lastScrollY.current = currentScrollY;
      }

      // Upward scroll
      else if (scrollDiff < -tolerance) {
        setIsHidden(true);

        lastScrollY.current = currentScrollY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);

        ticking = true;
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <div
      className={`${styles["navbar-container"]} ${
        isHidden
          ? styles["navbar-hidden"]
          : ""
      }`}
    >
      {/* ── HEADER ── */}

      <div className={styles["header-wrapper"]}>
        <header className={styles["header-main"]}>

          <Link
            href="/"
            className={styles["logo"]}
          >
            honey oh honey
          </Link>

          <div className={styles["nav-actions"]}>

            <nav className={styles["nav"]}>

              {navLinks.map((link) => (
                <Link
                  href={link.href}
                  className={styles["nav-link"]}
                  key={link.name}
                >
                  {link.name}
                </Link>
              ))}

            </nav>

            <MagneticButton
              href="#subscribe"
              className={styles["subscribe-btn"]}
            >
              Subscribe ↗
            </MagneticButton>

          </div>

        </header>
      </div>

      {/* ── MARQUEE ── */}

      <div className={styles["marquee-wrapper"]}>

        <div
          className={styles["marquee-track"]}
          style={{
            "--marquee-distance": `${distance}px`,
            animationPlayState: distance
              ? "running"
              : "paused",
          }}
        >

          <MarqueeContent
            innerRef={groupRef}
          />

          <MarqueeContent />

        </div>

      </div>

    </div>
  );
};

export default Navbar;