// "use client";

// import { useEffect, useRef, useState } from "react";
// import styles from "./newslatter.module.css";

// /* Fades an element into place the first time it scrolls into view.
//     direction: "up" (fade + rise), "left" (fade in from the left),
//     "right" (fade in from the right). `delay` (ms) staggers siblings. */
// const Reveal = ({
//   children,
//   className = "",
//   delay = 0,
//   as = "div",
//   direction = "up",
// }) => {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   const Tag = as;

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.unobserve(el);
//         }
//       },
//       { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   const directionClass =
//     direction === "left"
//       ? styles["reveal-left"]
//       : direction === "right"
//       ? styles["reveal-right"]
//       : styles["reveal-up"];

//   return (
//     <Tag
//       ref={ref}
//       className={`${className} ${directionClass} ${
//         visible ? styles["reveal-visible"] : ""
//       }`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </Tag>
//   );
// };

// const MagneticButton = ({ href, children, className }) => {
//   const btnRef = useRef(null);
//   const [pos, setPos] = useState({ x: 0, y: 0 });
//   const [isHovering, setIsHovering] = useState(false);

//   const handleMouseMove = (e) => {
//     const el = btnRef.current;
//     if (!el) return;

//     const rect = el.getBoundingClientRect();
//     const relX = e.clientX - (rect.left + rect.width / 2);
//     const relY = e.clientY - (rect.top + rect.height / 2);

//     const strength = 0.35;

//     setIsHovering(true);
//     setPos({ x: relX * strength, y: relY * strength });
//   };

//   const handleMouseLeave = () => {
//     setIsHovering(false);
//     setPos({ x: 0, y: 0 });
//   };

//   return (
//     <a
//       ref={btnRef}
//       href={href}
//       className={`${className} ${styles["magnetic"]}`}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         transform: `translate(${pos.x}px, ${pos.y}px)`,
//         transition: isHovering
//           ? "transform 0.15s ease-out, background 0.2s ease, color 0.2s ease, box-shadow 0.25s ease"
//           : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease, color 0.2s ease, box-shadow 0.25s ease",
//       }}
//     >
//       {children}
//     </a>
//   );
// };

// const Newslatter = () => {
//   return (
//     <section className={styles["newslatter-section"]}>
//       <div className={styles["newslatter-wrapper"]}>
//         <div className={styles["newslatter-left"]}>
//           <Reveal direction="left" delay={0}>
//             <p className={styles["newslatter-label"]}>The Newsletter</p>
//           </Reveal>

//           <Reveal direction="left" delay={150}>
//             <h1 className={styles["newslatter-heading"]}>
//               OH <span className={styles["newslatter-heading-accent"]}>HONEY</span>,
//               <br />
//               HONEY.
//             </h1>
//           </Reveal>

//           <Reveal direction="left" delay={300}>
//             <p className={styles["newslatter-desc"]}>
//               What&apos;s currently making me a rage monster, how I&apos;m
//               unlearning the bs of (frankly) everything and how I want to
//               change the world (usually in that order of honesty). Free, most
//               weeks, on Substack.
//             </p>
//           </Reveal>
//         </div>

//         <div className={styles["newslatter-right"]}>
//           <Reveal direction="right" delay={200}>
//             <MagneticButton href="#subscribe" className={styles["newslatter-subscribe-btn"]}>
//               Subscribe ↗
//             </MagneticButton>
//           </Reveal>
          
//           <Reveal direction="right" delay={350}>
//             <p className={styles["newslatter-note"]}>Free · Cancel Anytime</p>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Newslatter;


// ----------------------------------------------------------------------------------------------------------


"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./newslatter.module.css";
import { LoaderLink } from "@/components/common/loader/loader";

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

const Newslatter = () => {
  return (
    <section className={styles["newslatter-section"]}>
      <div className={styles["newslatter-wrapper"]}>
        <div className={styles["newslatter-left"]}>
          <Reveal direction="left" delay={0}>
            <p className={styles["newslatter-label"]}>The Newsletter</p>
          </Reveal>

          <Reveal direction="left" delay={150}>
            <LoaderLink href="/">
              <img
                src="/images/logo/logo.png"
                alt="Oh Honey Honey"
                className={styles["newslatter-logo"]}
              />
            </LoaderLink>
          </Reveal>

          <Reveal direction="left" delay={300}>
            <p className={styles["newslatter-desc"]}>
              What’s currently making me a rage monster, how I’m unlearning the bs of (frankly) everything and how I want to change the world (usually in that order of honesty). Free, most weeks, on Substack.
            </p>
          </Reveal>
        </div>

        <div className={styles["newslatter-right"]}>
          <Reveal direction="right" delay={200}>
            <MagneticButton href="#subscribe" className={styles["newslatter-subscribe-btn"]}>
              Subscribe ↗
            </MagneticButton>
          </Reveal>
          
          <Reveal direction="right" delay={350}>
            <p className={styles["newslatter-note"]}>Free .  Paid Tier</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Newslatter;