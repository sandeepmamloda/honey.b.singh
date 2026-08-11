"use client";

import { useState } from "react";
import styles from "./form.module.css";
import { doorsData } from "@/lib/doors-data";

const Form = ({ door }) => {
  const config = doorsData[door];

  const [form, setForm] = useState({
    name: "",
    email: "",
    extra: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  if (!config) {
    return (
      <section className={styles["form-wrapper"]}>
        <div className={styles["form-main"]}>
          <p className={styles["form-eyebrow"]}>Not found</p>
          <h1 className={styles["form-heading"]}>This door doesn&apos;t exist.</h1>
        </div>
      </section>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ door, ...form }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setStatus("success");
      setForm({ name: "", email: "", extra: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className={`${styles["form-wrapper"]} ${styles[`form-${door}`]}`}>
      <div className={styles["form-main"]}>
        <p className={styles["form-eyebrow"]}>{config.eyebrow}</p>
        <h1 className={styles["form-heading"]}>{config.heading}</h1>
        <p className={styles["form-sub"]}>{config.sub}</p>

        {status === "success" ? (
          <div className={styles["form-success"]}>
            <p>Got it — thank you. I&apos;ll get back to you soon.</p>
          </div>
        ) : (
          <form className={styles["form-body"]} onSubmit={handleSubmit}>
            <div className={styles["form-field"]}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles["form-field"]}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {config.extraField && (
              <div className={styles["form-field"]}>
                <label htmlFor="extra">{config.extraField.label}</label>
                <input
                  id="extra"
                  name="extra"
                  type="text"
                  placeholder={config.extraField.placeholder}
                  value={form.extra}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className={styles["form-field"]}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {status === "error" && (
              <p className={styles["form-error"]}>{errorMsg}</p>
            )}

            <button
              type="submit"
              className={styles["form-submit"]}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send message →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Form;