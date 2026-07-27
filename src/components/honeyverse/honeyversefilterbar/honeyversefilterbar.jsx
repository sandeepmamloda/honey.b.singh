"use client";

import { useState } from "react";
import styles from "./honeyversefilterbar.module.css";

const filters = ["All", "Story", "Woman", "Teach", "Film", "Gym"];

const HoneyverseFilterBar = ({ postsCount = 12 }) => {
  const [active, setActive] = useState("All");

  return (
    <div className={styles["filterbar-wrapper"]}>
      <div className={styles["filterbar-main"]}>
        <div className={styles["filterbar-pills"]}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`${styles["filterbar-pill"]} ${
                active === filter ? styles.active : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className={styles["filterbar-count"]}>{postsCount} Posts</p>
      </div>
    </div>
  );
};

export default HoneyverseFilterBar;