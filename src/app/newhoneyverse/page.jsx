import Heronewhoneyverse from "@/components/newhoneyverse/heronewhoneyverse/heronewhoneyverse";
import Moviesinproduction from "@/components/newhoneyverse/moviesinproduction/moviesinproduction";
import Awards from "@/components/newhoneyverse/awards/awards";
import Bigcta from "@/components/newhoneyverse/bigcta/bigcta";
import Newslatter from "@/components/common/newslatter/newslatter";
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