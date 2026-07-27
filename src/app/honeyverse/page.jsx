import HoneyverseHero from "@/components/honeyverse/honeyversehero/honeyversehero";
import Honeyversefilterbar from "@/components/honeyverse/honeyversefilterbar/honeyversefilterbar";
import Honeyversegrid from "@/components/honeyverse/honeyversegrid/honeyversegrid"
export default function Page() {
  return (
    <main style={{backgroundColor:"rgba(255, 251, 242, 1)"}}>
       <HoneyverseHero/>
       <Honeyversefilterbar/>
       <Honeyversegrid/>
    </main>
  );
}