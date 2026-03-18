import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { WhyArcova } from "@/components/sections/why-arcova";
import { LocalComparison } from "@/components/sections/local-comparison";
import { Auditor } from "@/components/sections/auditor";
import { TrustMarquee } from "@/components/ui/trust-marquee";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden w-full relative max-w-[100vw]">
      <Hero />
      <div className="section-border">
        <TrustMarquee />
      </div>
      <div className="section-border">
        <WhyArcova />
      </div>

      <div className="section-border">
        <LocalComparison />
      </div>

      <div className="section-border">
        <Auditor />
      </div>

      <div className="section-border">
        <Services />
      </div>

      <div className="section-border">
        <Portfolio />
      </div>

      <div className="section-border">
        <Testimonials />
      </div>

      <div className="section-border">
        <Process />
      </div>

      <div className="section-border">
        <Contact />
      </div>
    </main>
  );
}
