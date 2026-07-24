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
      "No. Flexibility is a result of practice, not a requirement to start. Every pose has a modification, and you'll move at your own range from day one.",
  },
  {
    question: "Is this spiritual, fitness, or what?",
    answer:
      "Both, in the proportions you want. Classes are breath-paced and physically real, and you're free to take as much or as little of the reflective side as feels right for you.",
  },
  {
    question: "Do you teach online?",
    answer:
      "Not currently. Classes run in the studio only, so adjustments and pacing can stay hands-on and personal.",
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