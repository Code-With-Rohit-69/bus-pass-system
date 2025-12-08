import Banner from "@/components/ui/banner/page";
import { Cards } from "@/components/ui/cards/page";
import Footer from "@/components/ui/footer/page";
import { Works } from "@/components/ui/how it works/page";
import Navbar from "@/components/ui/navbar/page";

export default function Home() {
  return <div className="bg-[#f1f1f1] w-full">
    <Navbar />
    <Banner />
    <Cards />
    <Works />
    <Footer />
  </div>;
}
