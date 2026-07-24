import styles from "./footer.module.css";

const socialLinks = ["TikTok", "Instagram", "Substack"];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles["footer-wrapper"]}>
      <div className={styles["footer-inner"]}>
        <p className={styles["footer-copyright"]}>
          © Honey B Singh {year} honeybsingh.com
        </p>

        <nav className={styles["footer-nav"]}>
          {socialLinks.map((link, index) => (
            <a href="#" className={styles["footer-link"]} key={index}>
              {link}
            </a>
          ))}
        </nav>

        <p className={styles["footer-copyright"]}>
          © Honey B Singh {year} honeybsingh.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;