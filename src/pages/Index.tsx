import { useState } from "react";
import ResumeModal from "@/components/portfolio/ResumeModal";
import OperatingSystem from "@/components/portfolio/OperatingSystem";

export default function Index() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <>
      <OperatingSystem onOpenResume={() => setResumeOpen(true)} />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
