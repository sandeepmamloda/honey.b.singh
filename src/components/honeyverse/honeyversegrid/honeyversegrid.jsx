import styles from "./honeyversegrid.module.css";

const posts = [
  {
    tag: "Story",
    title: "POV: The group chat finds out",
    meta: "TikTok · 0:34",
    bg: "rgba(255, 197, 234, 1)",
    color: "rgba(10, 10, 10, 1)",
  },
  {
    tag: "Film",
    title: "Directing my own audition tape (badly)",
    meta: "Reel · 0:58",
    bg: "rgba(180, 162, 237, 1)",
    color: "rgba(251, 249, 244, 1)",
  },
  {
    tag: "Teach",
    title: "Breathe like your notifications are off",
    meta: "TikTok · 0:41",
    bg: "rgba(255, 237, 168, 1)",
    color: "rgba(10, 10, 10, 1)",
  },
  {
    tag: "Woman",
    title: "Things my grandmother said, ranked",
    meta: "Carousel · IG",
    bg: "rgba(255, 161, 162, 1)",
    color: "rgba(251, 249, 244, 1)",
  },
  {
    tag: "Gym",
    title: "Leg day, narrated like a nature doc",
    meta: "TikTok · 0:47",
    bg: "rgba(255, 237, 168, 1)",
    color: "rgba(35, 31, 24, 1)",
  },
  {
    tag: "Story",
    title: "A three-act structure for canceling plans",
    meta: "TikTok · 0:29",
    bg: "rgba(180, 162, 237, 1)",
    color: "rgba(251, 249, 244, 1)",
  },
  {
    tag: "Woman",
    title: 'Unlearning "effortless" — a series',
    meta: "Reel · 1:12",
    bg: "rgba(255, 197, 234, 1)",
    color: "rgba(10, 10, 10, 1)",
  },
  {
    tag: "Teach",
    title: "Book the real thing → the mat",
    href: "/teach",
    meta: "honeyoheney.com/teach",
    bg: "rgba(255, 237, 168, 1)",
    color: "rgba(10, 10, 10, 1)",
  },
  {
    tag: "Film",
    title: "What festivals actually smell like",
    meta: "TikTok · 0:52",
    bg: "rgba(255, 161, 162, 1)",
    color: "rgba(251, 249, 244, 1)",
  },
  {
    tag: "Gym",
    title: "Progressive overload for people-pleasers",
    meta: "Reel · 0:44",
    bg: "rgba(255, 237, 168, 1)",
    color: "rgba(35, 31, 24, 1)",
  },
  {
    tag: "Story",
    title: "The eulogy I'd give my old apartment",
    meta: "TikTok · 1:03",
    bg: "rgba(255, 197, 234, 1)",
    color: "rgba(10, 10, 10, 1)",
  },
  {
    tag: "Teach",
    title: "Yoga cues, translated from polite",
    meta: "TikTok · 0:38",
    bg: "rgba(180, 162, 237, 1)",
    color: "rgba(251, 249, 244, 1)",
  },
];

const HoneyverseGrid = () => {
  return (
    <section className={styles["honeyversegrid-wrapper"]}>
      <div className={styles["honeyversegrid-main"]}>
        <div className={styles["honeyversegrid-list"]}>
          {posts.map((post, index) => (
            <div
              key={index}
              className={styles["post-card"]}
              style={{ background: post.bg }}
            >
              <span className={styles["post-badge"]}>{post.tag}</span>

              <h3 className={styles["post-title"]} style={{ color: post.color }}>
                {post.href ? <a href={post.href}>{post.title}</a> : post.title}
              </h3>

              <p className={styles["post-meta"]} style={{ color: post.color }}>
                {post.meta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoneyverseGrid;