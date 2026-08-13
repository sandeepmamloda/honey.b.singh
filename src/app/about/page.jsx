import Heroabout from '@/components/about/heroabout/heroabout';
import Threadsection from "@/components/about/threadsection/threadsection";
import Newslatter from '@/components/common/newslatter/newslatter';

export const metadata = {
  title: "About",
  description:
    "One director, one internet, one mat — and one question asked at three speeds. How the film work, the Honeyverse and the yoga belong to the same person.",
  openGraph: {
    title: "About — Honey B. Singh",
    description: "One question, asked at three speeds.",
  },
  alternates: { canonical: "/about" },
};
export default function Page() {
  return (
    <main style={{backgroundColor:"rgba(251, 249, 244, 1)"}}>
      <Heroabout />
      <Threadsection/>
      <Newslatter
        label="The Newsletter"
        description="This page, but ongoing. Most weeks, on Substack."
        buttonText="Read on Substack ↗"
        buttonHref="#subscribe"
        note="Free · Paid Tier"
      />
    </main>
  );
}