import Herofilm from '@/components/film/herofilm/herofilm';
import Baisakhi from "@/components/film/baisakhi/baisakhi";
import styles from "./page.module.css";
import Projects from "@/components/film/projects/projects";
import Filmography from "@/components/film/filmography/filmography";
import Criticalpress from "@/components/film/criticalpress/criticalpress";
import Newslatter from "@/components/common/newslatter/newslatter";
export const metadata = {
  title: "Film",
  description:
    "Shorts, a feature in development, and a novel — films about the exact second she stops performing. Screeners, EPK and representation inquiries.",
  openGraph: {
    title: "Film — Honey B. Singh",
    description:
      "Shorts, a feature in development, and a novel — films about the exact second she stops performing.",
  },
  alternates: { canonical: "/film" },
};
export default function Page() {
  return (
    <main className={styles["main"]}>
       <Herofilm />
       <Baisakhi/>
       <Projects/>
       <Filmography/>
       <Criticalpress/>
       <Newslatter
        label="The Newsletter"
        description="Behind the work, the quieter voice. Same honesty, on Substack."
        buttonText="Read on Substack ↗"
        buttonHref="#subscribe"
        note="Free · Paid Tier"
      />
    </main>
  );
}