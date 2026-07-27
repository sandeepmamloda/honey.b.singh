import styles from "./honeyverse.module.css";

const HoneyverseHero = () => {
  return (
    <section className={styles["honeyversehero-wrapper"]}>
      <div className={styles["honeyversehero-main"]}>
        <p className={styles["honeyversehero-eyebrow"]}>The Honeyverse</p>
        <h1 className={styles["honeyversehero-heading"]}>
          Oh Honey,
          <br />
          Honey.
        </h1>
        <p className={styles["honeyversehero-desc"]}>
          Deadpan internet things, cut like a reel. Filter by pillar, or
          don't — chaos is a valid setting.
        </p>
      </div>
    </section>
  );
};

export default HoneyverseHero;