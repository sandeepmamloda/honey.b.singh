import styles from "./notfound.module.css";

const NotFound = () => {
  return (
    <section className={styles["notfound-wrapper"]}>
      <span className={styles["notfound-bignum"]} aria-hidden="true">
        404
      </span>

      <div className={styles["notfound-main"]}>
        <p className={styles["notfound-eyebrow"]}>Wrong door</p>

        <h1 className={styles["notfound-heading"]}>
          Even I couldn&apos;t find this one.
        </h1>

        <p className={styles["notfound-desc"]}>
          The link&apos;s broken, the page moved, or you typed something a
          little too creative. Whatever happened — it&apos;s not here.
          Everything else still is.
        </p>

        <div className={styles["notfound-actions"]}>
          <a href="/" className={styles["notfound-cta"]}>
            Take me home →
          </a>
          <a href="/honeyverse" className={styles["notfound-secondary"]}>
            Or wander the Honeyverse
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;