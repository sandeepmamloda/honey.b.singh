import Substackhero from "@/components/substack/substackhero/substackhero";
import Substackarticles from "@/components/substack/substackarticles/substackarticles";
import Newslatter from "@/components/common/newslatter/newslatter";
export default function Page() {
  return (
    <main style={{backgroundColor:"rgba(255, 251, 242, 1)"}}>
       <Substackhero/>
       <Substackarticles/>
       <Newslatter
        label="The Newsletter"
        description="What’s currently making me a rage monster, how I’m unlearning the bs of (frankly) everything and how I want to change the world (usually in that order of honesty). Free, most weeks, on Substack."
        buttonText="Subscribe ↗"
        buttonHref = "https://ohhoneyhoney.substack.com/subscribe"
        note="Free · Paid Tier"
      />
    </main>
  );
}