import { doorsData } from "@/lib/doors-data";
import ContactDoorClient from "./contactdoorclint";  // ✅ ye sahi hai

export async function generateMetadata({ params }) {
  const { door } = await params;
  const doorConfig = doorsData[door];

  if (!doorConfig) {
    return {
      title: "Contact",
      description: "Get in touch.",
    };
  }

  return {
    title: `Contact — ${doorConfig.eyebrow}`,
    description: `Get in touch about ${doorConfig.eyebrow.toLowerCase()}.`,
    alternates: { canonical: `/contact/${door}` },
  };
}

export default async function ContactPage({ params }) {
  const { door } = await params;
  return <ContactDoorClient door={door} />;
}