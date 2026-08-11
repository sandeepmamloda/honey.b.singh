// import styles from "./heroabout.module.css";

// const HeroAbout = () => {
//   return (
//     <section className={styles["about-wrapper"]}>
//       <div className={styles["about-main"]}>
//         <p className={styles["about-eyebrow"]}>About</p>
//         <h2 className={styles["about-heading"]}>
//           <span className={styles["about-heading-line-wrap"]}>
//             <span
//               className={styles["about-heading-line"]}
//               style={{ animationDelay: "0.35s" }}
//             >
//               Why one person
//             </span>
//           </span>
//           <span className={styles["about-heading-line-wrap"]}>
//             <span
//               className={styles["about-heading-line"]}
//               style={{ animationDelay: "0.65s" }}
//             >
//               <em>does all of this.</em>
//             </span>
//           </span>
//         </h2>
//       </div>
//     </section>
//   );
// };

// export default HeroAbout;


// ======================================================================================================


import styles from "./heroabout.module.css";

const HeroAbout = () => {
  return (
    <section className={styles["about-wrapper"]}>
      <div className={styles["about-main"]}>
        <p className={styles["about-eyebrow"]}>About</p>
        <h2 className={styles["about-heading"]}>
          <span className={styles["about-heading-line-wrap"]}>
            <span
              className={styles["about-heading-line"]}
              style={{ animationDelay: "0.35s" }}
            >
              Why one person does all of this.
            </span>
          </span>
          <span className={styles["about-heading-line-wrap"]}>
            <span
              className={styles["about-heading-line"]}
              style={{ animationDelay: "0.65s" }}
            >
              {/* <em></em> */}
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
};

export default HeroAbout;