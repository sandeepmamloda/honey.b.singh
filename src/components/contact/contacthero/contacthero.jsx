import styles from "./contacthero.module.css";

const ContactHero = () => {
  return (
    <section className={styles["contacthero-wrapper"]}>
      <div className={styles["contacthero-main"]}>
        <p className={styles["contacthero-eyebrow"]}>Contact</p>

        <h1 className={styles["contacthero-heading"]}>
          <span className={styles["contacthero-heading-line-wrap"]}>
            <span
              className={styles["contacthero-heading-line"]}
              style={{ animationDelay: "0.3s" }}
            >
              Three doors, three
            </span>
          </span>
          <span className={styles["contacthero-heading-line-wrap"]}>
            <span
              className={styles["contacthero-heading-line"]}
              style={{ animationDelay: "0.55s" }}
            >
              asks.
            </span>
          </span>
        </h1>

        <p className={styles["contacthero-desc"]}>
          Different rooms attract different people, and you&apos;re probably
          here for one specific thing — so pick the door that matches.
          Everything gets read; the right door just gets read faster.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;