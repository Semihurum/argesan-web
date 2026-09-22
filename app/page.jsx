import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Catalog from "@/components/Catalog";
import References from "@/components/References";
import Faq from "@/components/Faq";
import InstagramFeed from "@/components/InstagramFeed";
import Contact from "@/components/Contact";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Catalog />
      <References />
      <Faq />
      <InstagramFeed />
      <Contact />
      <Partners />
    </>
  );
}