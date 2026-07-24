import styles from "./classessection.module.css";

const sessionsData = [
  {
    meta: "Tue / Thu · 7:00am · In-studio",
    title: "Sunrise flow",
    description:
      "A 60-minute breath-led vinyasa to start the day before the day starts you. All levels.",
    priceLabel: "Drop-in",
    price: "$[00]",
    variant: "light",
  },
  {
    meta: "Sat · 10:00am · In-studio",
    title: "Slow flow + breathwork",
    description:
      "75 minutes, half the speed, twice the attention. Ends with 15 minutes of guided breath. The one to start with.",
    priceLabel: "Drop-in",
    price: "$[00]",
    variant: "accent",
  },
  {
    meta: "By request · In-studio or virtual",
    title: "1:1 private session",
    description:
      "Built around your body, schedule, and whatever your mind won't shut up about. Singles or packs.",
    priceLabel: "From",
    price: "$[00]",
    variant: "light",
  },
];

const Sessions = () => {
  return (
    <section className={styles["sessions-wrapper"]}>
      <div className={styles["sessions-main"]}>
        <p className={styles["sessions-eyebrow"]}>Classes &amp; Sessions</p>

        <div className={styles["sessions-grid"]}>
          {sessionsData.map((item, index) => (
            <div
              key={index}
              className={`${styles["session-card"]} ${
                item.variant === "accent" ? styles["session-card-accent"] : ""
              }`}
            >
              <div className={styles["session-top"]}>
                <p className={styles["session-meta"]}>{item.meta}</p>
                <h3 className={styles["session-title"]}>{item.title}</h3>
                <p className={styles["session-desc"]}>{item.description}</p>
              </div>

              <div className={styles["session-bottom"]}>
                <span className={styles["session-divider"]}></span>
                <p className={styles["session-price-row"]}>
                  <span className={styles["session-price-label"]}>
                    {item.priceLabel} ·
                  </span>{" "}
                  <span className={styles["session-price"]}>{item.price}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sessions;