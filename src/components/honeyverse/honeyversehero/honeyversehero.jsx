import styles from "./honeyverse.module.css";

const HoneyverseHero = () => {
  return (
    <section className={styles["honeyversehero-wrapper"]}>
      <div className={styles["honeyversehero-main"]}>
        <p className={styles["honeyversehero-eyebrow"]}>new drop weekly</p>
        <h1 className={styles["honeyversehero-heading"]}>
          <span className={styles["honeyversehero-heading-line-wrap"]}>
            <span
              className={styles["honeyversehero-heading-line"]}
              style={{ animationDelay: "0.3s" }}
            >
              Oh Honey,
            </span>
          </span>
          <span className={styles["honeyversehero-heading-line-wrap"]}>
            <span
              className={styles["honeyversehero-heading-line"]}
              style={{ animationDelay: "0.55s" }}
            >
              Honey.
            </span>
          </span>
        </h1>
        <p className={styles["honeyversehero-desc"]}>
          Deadpan videos about being a woman who was raised to be a raging unapologetic bold and outspoken and is currently, actively, trying to get everyone on board with that. Filter by pillar, or don't, chaos is a valid setting.
        </p>
      </div>
    </section>
  );
};

export default HoneyverseHero;