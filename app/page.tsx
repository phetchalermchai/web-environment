import Carousel from "@/components/Carousel/Carousel";
import Service from "@/components/E-Service/Service";
import Hero from "@/components/Hero/Hero";
import News from "@/components/News/News";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      {/* Carousel */}
      <Carousel/>
      <Hero/>
      <Service/>
      <News/>
      <Footer/>
    </>
  );
}
