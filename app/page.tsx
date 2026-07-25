import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden w-full relative max-w-[100vw] bg-[#FAFAF8]">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Process />
      <Contact />
    </main>
  );
}
