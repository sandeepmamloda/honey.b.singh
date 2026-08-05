
import Newslatter from "@/components/common/newslatter/newslatter";
import Contacthero from "@/components/contact/contacthero/contacthero";
import Contactdoors from "@/components/contact/contactdoors/contactdoors";
export default function Page() {
  return (
    <main style={{backgroundColor:"rgba(255, 251, 242, 1)"}}>
       <Contacthero/>
       <Contactdoors/>
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