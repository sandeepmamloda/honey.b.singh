"use client";

import { useRef, useState } from "react";
import styles from "./contactdoors.module.css";
import { LoaderLink } from "@/components/common/loader/loader";

/* Magnetic hover — same interaction as the Newsletter "Subscribe" button.
   The button drifts toward the cursor on hover, then springs back with
   a bounce when the mouse leaves. */
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

const doors = [
  {
    variant: "press",
    eyebrow: "Press & industry",
    heading: (
      <>
        Producers,
        <br />
        programmers,
        <br />
        reps.
      </>
    ),
    sub: "The quiet-room channel.",
    items: [
      "Screener & EPK requests",
      "Festival programming",
      "Representation inquiries",
      "Press & interviews",
    ],
    cta: "Get in touch →",
    email: "industry@honeybsingh.com",
  },
  {
    variant: "brand",
    eyebrow: "Brand partnerships",
    heading: (
      <>
        Collabs &amp;
        <br />
        campaigns.
      </>
    ),
    sub: "The loud-room channel — sponsored content and partnerships across the Honeyverse pillars.",
    items: [
      "Sponsored videos & series",
      "Campaigns across pillars",
      "Media kit & rates on request",
      
    ],
    cta: "Media kit + rates →",
    email: "partners@honeybsingh.com",
  },
  {
    variant: "yoga",
    eyebrow: "Yoga students",
    heading: (
      <>
        Book a mat, ask
        <br />
        anything.
      </>
    ),
    sub: "The warm-room channel — first-timers especially welcome.",
    items: ["Book a drop-in class", "1:1 private sessions", "Beginner series waitlist"],
    cta: "Book now →",
    email: "mat@honeybsingh.com",
  },
  
];

const footerInfo = [
  {
    eyebrow: "Response time",
    body: (
      <>
        Usually within 3–4 days. Festival deadlines and class bookings jump
        the queue — say so in the subject line.
      </>
    ),
  },
  {
    eyebrow: "Not sure which door?",
    body: (
      <>
        Use the press &amp; industry address and it&apos;ll get routed. No
        wrong answers, only slower ones.
      </>
    ),
  },
  {
    eyebrow: "Just want to say hi?",
    body: (
      <>
  The comments in the{" "}
  <LoaderLink href="/honeyverse">
    Honeyverse
  </LoaderLink>{" "}
  or a reply to the{" "}
  <LoaderLink
    href="/newsletter"
    className={styles["link-olive"]}
  >
    newsletter
  </LoaderLink>{" "}
  is the fastest way to actually reach me.
</>
    ),
  },
  
];

const ContactDoors = () => {
  return (
    <section className={styles["doors-wrapper"]}>
      <div className={styles["doors-main"]}>
        <div className={styles["doors-grid"]}>
          {doors.map((door) => (
            <div
              key={door.variant}
              className={`${styles["door-card"]} ${
                styles[`door-card-${door.variant}`]
              }`}
            >
              <div className={styles["door-top"]}>
                <p className={styles["door-eyebrow"]}>{door.eyebrow}</p>
                <h3 className={styles["door-heading"]}>{door.heading}</h3>
                <p className={styles["door-sub"]}>{door.sub}</p>

                <ul className={styles["door-items"]}>
                  {door.items.map((item) => (
                    <li key={item} className={styles["door-item"]}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles["door-bottom"]}>
                <MagneticButton
                  href={`mailto:${door.email}`}
                  className={styles["door-cta"]}
                >
                  {door.cta}
                </MagneticButton>
                <p className={styles["door-email"]}>{door.email}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles["doors-footer"]}>
          {footerInfo.map((col) => (
            <div key={col.eyebrow} className={styles["footer-col"]}>
              <p className={styles["footer-eyebrow"]}>{col.eyebrow}</p>
              <p className={styles["footer-body"]}>{col.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactDoors;