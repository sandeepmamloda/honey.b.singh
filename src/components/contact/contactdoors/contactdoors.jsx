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
        Producers, programmers, reps.
      </>
    ),
    sub: "The quiet-room channel. If you've seen HEER or are interested in something else I’m working on and want the deck, the reel, or a meeting, well this is it.",
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
        Collabs & campaigns.
      </>
    ),
    sub: "The loud-room channel, sponsored content across Story, Woman, Teach, or Film. Tell me the pillar; I'll tell you if it's a yes or a very fast no.",
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
        Book a mat, ask anything.
      </>
    ),
    sub: "The warm-room channel. First-timers, people who've never held a pose past four seconds, and people who just want to breathe without an agenda, start here.",
    items: ["Book a drop-in class", "1:1 private sessions", "Beginner series waitlist"],
    cta: "Book now →",
    email: "	hsingh@northvale.ae",
  },
  
];

const footerInfo = [
  {
    eyebrow: "Response time",
    body: (
      <>
        Usually 3–4 days. Festival deadlines and class bookings jump the queue, say so in the subject line, not three follow-up emails later.
      </>
    ),
  },
  {
    eyebrow: "Not sure which door?",
    body: (
      <>
        Use the press & industry address. It gets routed. No wrong doors, only slower ones, much like everything else in this industry.
      </>
    ),
  },
  {
    eyebrow: "Just want to say hi?",
    body: (
      <>
        Comments on the socials or a ping on Oh Honey Honey is the fastest way to actually reach a human. This inbox is read by me; it just isn't read fast.
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
                  href={`/contact/${door.variant}`}
                  className={styles["door-cta"]}
                >
                  {door.cta}
                </MagneticButton>
                <a
                  href={`/contact/${door.variant}`}
                  className={styles["door-email"]}
                >
                  {door.email}
                </a>
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