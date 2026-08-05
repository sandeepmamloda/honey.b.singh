import Herofilm from '@/components/teach/yogateach/yogateach';
import Featurepillars from "@/components/teach/featurepillars/featurepillars";
import Breath from "@/components/teach/breath/breath";
import Classessection from "@/components/teach/classessection/classessection";
import Reservecta from "@/components/teach/reserve-cta/reserve-cta";
import Expectfaqsection from "@/components/teach/expectfaqsection/expectfaqsection";
import Newslatter from "@/components/common/newslatter/newslatter";
export default function Page() {
  return (
    <main style={{overflowX:"hidden",
                  backgroundColor:"rgba(255, 251, 242, 1)"
    }}>
       <Herofilm />
       <Featurepillars/>
       <Breath/>
       <Classessection/>
       <Reservecta/>
       <Expectfaqsection/>
       <Newslatter
        label="The Newsletter"
        description="Class updates land here first, plus the thinking behind the practice."
        buttonText="Read on Substack ↗"
        buttonHref="#subscribe"
        note="Free · Paid Tier"
      />
    </main>
  );
}