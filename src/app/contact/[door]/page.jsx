"use client";

import { useParams } from "next/navigation";
import Form from "@/components/form/Form";

const ContactPage = () => {
  const params = useParams();
  const door = params?.door;

  return <Form door={door} />;
};

export default ContactPage;