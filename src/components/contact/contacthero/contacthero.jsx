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
              Three doors, pick the one that's 
            </span>
          </span>
          <span className={styles["contacthero-heading-line-wrap"]}>
            <span
              className={styles["contacthero-heading-line"]}
              style={{ animationDelay: "0.55s" }}
            >
              actually yours.
            </span>
          </span>
        </h1>

        <p className={styles["contacthero-desc"]}>
          Different rooms attract different people, and you already know which one sent you here, so use that door. Everything gets read; the right door just gets read faster than you replying "just checking in" to your own email.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;