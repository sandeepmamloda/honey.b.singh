import styles from "./reserve-cta.module.css";
import {
  LoaderLink,
} from "@/components/common/loader/loader";

const ReserveCta = () => {
  return (
    <section className={styles["reserve-wrapper"]}>
      <div className={styles["reserve-main"]}>
        <div className={styles["reserve-left"]}>
          <h2 className={styles["reserve-heading"]}>
            Reserve a mat, or just ask a question.
          </h2>
          <p className={styles["reserve-desc"]}>
            First-class nerves are normal,  say it's your first and I'll put you near the back with the good props. Beginner series waitlist is open.
          </p>
        </div>

        <div className={styles["reserve-right"]}>
          <LoaderLink href="/contact" className={styles["reserve-cta-btn"]}>
            Book a class →
          </LoaderLink>
          <p className={styles["reserve-waitlist"]}>
            or{" "}
            <LoaderLink href="/contact" className={styles["reserve-waitlist-link"]}>
              Join the beginner series waitlist
            </LoaderLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReserveCta;