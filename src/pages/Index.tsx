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

const Index = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero onViewResume={() => setIsResumeOpen(true)} />
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
    </main>
  );
};

export default Index;
