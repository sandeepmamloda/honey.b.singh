import styles from "./heroabout.module.css";

const HeroAbout = () => {
  return (
    <section className={styles["about-wrapper"]}>
      <div className={styles["about-main"]}>
        <p className={styles["about-eyebrow"]}>About</p>
        <h2 className={styles["about-heading"]}>
          Why one person <em>does all of this.</em>
        </h2>
      </div>
    </section>
  );
};

export default HeroAbout;

