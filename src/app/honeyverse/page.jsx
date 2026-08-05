import HoneyverseHero from "@/components/honeyverse/honeyversehero/honeyversehero";
import Honeyversefilterbar from "@/components/honeyverse/honeyversefilterbar/honeyversefilterbar";
import Honeyversegrid from "@/components/honeyverse/honeyversegrid/honeyversegrid";
import Honeyversesection from "@/components/honeyverse/honeyversesection/honeyversesection";
import Newslatter from "@/components/common/newslatter/newslatter";
export default function Page() {
  return (
    <main style={{backgroundColor:"rgba(255, 251, 242, 1)"}}>
       <HoneyverseHero/>
       {/* <Honeyversefilterbar/>
       <Honeyversegrid/> */}
       <Honeyversesection/>
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