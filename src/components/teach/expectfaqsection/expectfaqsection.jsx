"use client";
import { useState } from "react";
import styles from "./expectfaqsection.module.css";

const expectItems = [
  "60–75 minutes, breath-paced, all levels",
  "Props provided — mats, blocks, straps",
  "Modifications offered for every pose, every time",
  "No adjustments without consent, ever",
  "Phones sleep in the cubby. You won't miss them.",
];

const faqItems = [
  {
    question: "I'm not flexible. Is that a problem?",
    answer:
      "It's the opposite of a problem — flexibility is an outcome of practice, not an entry requirement. Breath-led pacing means you work at your range, not the room's.",
  },
  {
    question: "Is this spiritual, fitness, or what?",
    answer:
      "It's a movement practice built on breath. If something bigger shows up for you on the mat, that's yours to keep — nothing is prescribed.",
  },
  {
    question: "Do you teach online?",
    answer:
      "Private sessions can be virtual, and a self-paced beginner series is in the works — the waitlist gets it first.",
  },
];

const ExpectFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className={styles["expect-wrapper"]}>
      <div className={styles["expect-main"]}>
        <div className={styles["expect-col"]}>
          <p className={styles["expect-eyebrow"]}>What to expect</p>
          <ul className={styles["expect-list"]}>
            {expectItems.map((item) => (
              <li key={item} className={styles["expect-item"]}>
                <span className={styles["expect-dash"]} />
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles["expect-col"]}>
          <p className={styles["expect-eyebrow"]}>Questions people actually ask</p>
          <div className={styles["faq-list"]}>
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className={`${styles["faq-item"]} ${isOpen ? styles.open : ""}`}
                >
                  <button
                    className={styles["faq-question"]}
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                  >
                    {item.question}
                    <span className={styles["faq-icon"]} />
                  </button>
                  <div
                    className={styles["faq-answer"]}
                    style={{ maxHeight: isOpen ? "10rem" : 0 }}
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpectFaqSection;