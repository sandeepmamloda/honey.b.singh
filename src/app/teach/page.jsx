import Herofilm from '@/components/teach/yogateach/yogateach';
import Featurepillars from "@/components/teach/featurepillars/featurepillars";
import Breath from "@/components/teach/breath/breath";
import Classessection from "@/components/teach/classessection/classessection";
import Reservecta from "@/components/teach/reserve-cta/reserve-cta";
import Expectfaqsection from "@/components/teach/expectfaqsection/expectfaqsection";
import Newslatter from "@/components/common/newslatter/newslatter";
export default function Page() {
  return (
    <main style={{overflowX:"hidden"}}>
       <Herofilm />
       <Featurepillars/>
       <Breath/>
       <Classessection/>
       <Reservecta/>
       <Expectfaqsection/>
       <Newslatter/>
    </main>
  );
}