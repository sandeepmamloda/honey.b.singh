import HoneyverseHero from "@/components/honeyverse/honeyversehero/honeyversehero";
import Honeyversefilterbar from "@/components/honeyverse/honeyversefilterbar/honeyversefilterbar";
import Honeyversegrid from "@/components/honeyverse/honeyversegrid/honeyversegrid";
import Honeyversesection from "@/components/honeyverse/honeyversesection/honeyversesection"
export default function Page() {
  return (
    <main style={{backgroundColor:"rgba(255, 251, 242, 1)"}}>
       <HoneyverseHero/>
       {/* <Honeyversefilterbar/>
       <Honeyversegrid/> */}
       <Honeyversesection/>
    </main>
  );
}