"use client";
import { useState } from "react";
import styles from "./expectfaqsection.module.css";

const expectItems = [
  "60 minutes Hatha, breath-paced, all levels",
  "15 minutes Pranayama, lying down, all levels",
  "Props provided",
  "Modification offered for every pose, every time, no negotiation",
  `No adjustments without consent (ever), not once, not "just this time"`,
  `Phones are left in your bag. You will survive.`,
];

const faqItems = [
  {
    question: "I'm not flexible. Is that a problem?",
    answer:
      "It's the opposite of a problem. Flexibility is what practice produces, not what it requires.",
  },
  {
    question: "Is this spiritual, fitness, or trauma work?",
    answer:
      "It's breath and movement. What shows up on the mat is yours to keep, I'm not prescribing anything, including enlightenment.",
  },
  {
    question: "Do you teach online?",
    answer:
      "Privates can go virtual. A self-paced beginner series is in the works, waitlist gets first access.",
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