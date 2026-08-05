// import Hero from '@/components/home/hero/hero';
// import Manifesto from "@/components/home/manifesto/manifesto";
// import Room from "@/components/home/room/room";
// import Newslatter from "@/components/common/newslatter/newslatter";

// export const metadata = {
//   title: 'Honey B. Singh — Films about Girlhood & Womanhood',
//   description:
//     'Directing and writing by South Asian women, mostly. One honest scene at a time — and the internet side, four times the volume.',
// };

// export default function Page() {
//   return (
//     <main>
//       <Hero />
//       <Manifesto/>
//       <Room/>
//       <Newslatter/>
//     </main>
//   );
// }

// -----------------------------------------------------------------------------------------------------------

import Hero from "@/components/home/hero/hero";
import Manifesto from "@/components/home/manifesto/manifesto";
import Room from "@/components/home/room/room";
import Newslatter from "@/components/common/newslatter/newslatter";

export const metadata = {
  title: "Honey B. Singh — Films about Girlhood & Womanhood",
  description:
    "Directing and writing by South Asian women, mostly. One honest scene at a time — and the internet side, four times the volume.",
};

export default function Page() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Room />

      <Newslatter
        label="The Newsletter"
        description="What’s currently making me a rage monster, how I’m unlearning the bs of (frankly) everything and how I want to change the world (usually in that order of honesty). Free, most weeks, on Substack."
        buttonText="Subscribe ↗"
        buttonHref="#subscribe"
        note="Free · Paid Tier"
      />
    </main>
  );
}