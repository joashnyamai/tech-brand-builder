import React, { useState } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import AiLabTeaser from "@/components/portfolio/AiLabTeaser";
import Impact from "@/components/portfolio/Impact";
import Certifications from "@/components/portfolio/Certifications";
import Community from "@/components/portfolio/Community";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import ResumeModal from "@/components/portfolio/ResumeModal";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import CommandPalette from "@/components/portfolio/CommandPalette";
import GlobalAvaChat from "@/components/portfolio/GlobalAvaChat";

const Index = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden transition-all duration-500 animate-fadeIn">
          <Navbar />
          <Hero onViewResume={() => {
            setIsResumeOpen(true);
          }} />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <AiLabTeaser />
          <Impact />
          <Certifications />
          <Community />
          <Contact onViewResume={() => setIsResumeOpen(true)} />
          <Footer />

          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

          <GlobalAvaChat onOpenResume={() => setIsResumeOpen(true)} />

          <CommandPalette
            isOpen={isPaletteOpen}
            onClose={() => setIsPaletteOpen(false)}
            onTriggerResume={() => setIsResumeOpen(true)}
            onTriggerAva={() => {
              const btn = document.querySelector('[aria-label="Toggle Ava Assistant"]') as HTMLButtonElement;
              btn?.click();
            }}
          />

          {/* Hidden triggers for external access */}
          <button
            id="trigger-command-palette"
            onClick={() => setIsPaletteOpen(true)}
            className="hidden"
          />
        </main>
      )}
    </>
  );
};

export default Index;
