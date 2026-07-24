import Hero from '@/components/home/hero/hero';
import Manifesto from "@/components/home/manifesto/manifesto";
import Room from "@/components/home/room/room";
import Newslatter from "@/components/common/newslatter/newslatter";

export const metadata = {
  title: 'Honey B. Singh — Films about Girlhood & Womanhood',
  description:
    'Directing and writing by South Asian women, mostly. One honest scene at a time — and the internet side, four times the volume.',
};

export default function Page() {
  return (
    <main>
      <Hero />
      <Manifesto/>
      <Room/>
      <Newslatter/>
    </main>
  );
}