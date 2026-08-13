import Heronewhoneyverse from "@/components/newhoneyverse/heronewhoneyverse/heronewhoneyverse";
import Moviesinproduction from "@/components/newhoneyverse/moviesinproduction/moviesinproduction";
import Awards from "@/components/newhoneyverse/awards/awards";
import Bigcta from "@/components/newhoneyverse/bigcta/bigcta";
import Newslatter from "@/components/common/newslatter/newslatter";
export const metadata = {
  title: "The Honeyverse",
  description:
    "The loud room. Deadpan internet things across five pillars — story, woman, teach, film, gym. Same woman, same honesty, four times the volume.",
  openGraph: {
    title: "The Honeyverse — Honey B. Singh",
    description:
      "The loud room. Same woman, same honesty, four times the volume.",
  },
  alternates: { canonical: "/newhoneyverse" },
};
const Newhoneyverse=function(){
    return (
        <>
           <main>
              <Heronewhoneyverse/>
              <Moviesinproduction/>
              <Awards/>
              <Bigcta/>
              <Newslatter
                label="The Newsletter"
                description="What’s currently making me a rage monster, how I’m unlearning the bs of (frankly) everything and how I want to change the world (usually in that order of honesty). Free, most weeks, on Substack."
                buttonText="Subscribe ↗"
                buttonHref="#subscribe"
                note="Free · Paid Tier"
              />
           </main>
        </>
    );
}
export default Newhoneyverse;