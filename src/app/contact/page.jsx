
import Newslatter from "@/components/common/newslatter/newslatter";
import Contacthero from "@/components/contact/contacthero/contacthero";
import Contactdoors from "@/components/contact/contactdoors/contactdoors";
export default function Page() {
  return (
    <main style={{backgroundColor:"rgba(255, 251, 242, 1)"}}>
       <Contacthero/>
       <Contactdoors/>
       <Newslatter/>
    </main>
  );
}