import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PainSection } from "@/components/PainSection";
import { ServiceComparison } from "@/components/ServiceComparison";
import { ProcessSection } from "@/components/ProcessSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactInterest, setContactInterest] = useState<"ops" | "landing" | "both" | "undecided">("undecided");

  const handleOpenContact = (interest: "ops" | "landing" | "both" | "undecided" = "undecided") => {
    setContactInterest(interest);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onOpenContact={() => handleOpenContact("undecided")} />
      
      <main className="flex-grow">
        <Hero onOpenContact={handleOpenContact} />
        <PainSection onOpenContact={handleOpenContact} />
        <ServiceComparison onOpenContact={handleOpenContact} />
        <ProcessSection />
        <CTASection onOpenContact={() => handleOpenContact("undecided")} />
      </main>

      <Footer />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        defaultInterest={contactInterest}
      />
    </div>
  );
}
