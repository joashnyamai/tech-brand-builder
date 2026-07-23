import { useState } from "react";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import ResumeModal from "@/components/portfolio/ResumeModal";
import OperatingSystem from "@/components/portfolio/OperatingSystem";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  return <>
    <LoadingScreen onComplete={() => setLoading(false)} />
    {!loading && <><OperatingSystem onOpenResume={() => setResumeOpen(true)} /><ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} /></>}
  </>;
}
