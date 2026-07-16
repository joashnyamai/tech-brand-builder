import { Mail, Phone, MapPin, Linkedin, Github, ArrowLeft, Printer } from "lucide-react";
import { Link } from "react-router-dom";

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:p-0 print:py-0">
      {/* Action Header (Hidden during Print) */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 no-print print:hidden">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all hover-glow shadow-lg"
          >
            <Printer size={16} />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Main CV Container */}
      <article className="max-w-4xl mx-auto bg-navy-surface/40 border border-navy-border rounded-3xl p-8 sm:p-12 shadow-2xl print-cv-container">
        
        {/* Header Block */}
        <header className="border-b border-navy-border pb-8 mb-8 print-header-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display text-gradient print-text-name">
                Malila Nyamai
              </h1>
              <p className="text-lg sm:text-xl text-cyan mt-2 font-medium tracking-wide print-text-title">
                Software Engineer · QA Engineer · IT Consultant
              </p>
            </div>
            
            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 text-xs text-muted-foreground print:text-neutral-700 print:gap-1.5">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-cyan print:text-neutral-600" />
                <a href="mailto:jamesmnyamai9@gmail.com" className="hover:text-cyan transition-colors">
                  jamesmnyamai9@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-cyan print:text-neutral-600" />
                <a href="tel:+254745806761" className="hover:text-cyan transition-colors">
                  0745 806 761
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan print:text-neutral-600" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin size={14} className="text-cyan print:text-neutral-600" />
                <a
                  href="https://www.linkedin.com/in/malila-nyamai-0b2711221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan transition-colors"
                >
                  linkedin.com/in/malila-nyamai-0b2711221
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github size={14} className="text-cyan print:text-neutral-600" />
                <a
                  href="https://github.com/joashnyamai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan transition-colors"
                >
                  github.com/joashnyamai
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-8 print:mb-6 print-break-inside-avoid">
          <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-3 print-section-title">
            Professional Summary
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed print:text-neutral-600 print:text-sm">
            Motivated IT professional and BSc Information Technology finalist with 3+ years of hands-on experience in software development, quality assurance, IT support, cloud exposure (AWS), and digital training. Proven ability to monitor systems, document workflows, troubleshoot application issues, and support end users in fast-paced technology environments. Experienced in application testing (Jest & Postman), bug tracking (Jira), data management (MySQL, PostgreSQL), and prototyping web solutions using React, TypeScript, Node.js, and PHP. Familiar with AI/ML concepts through LangChain, RAG, and Generative AI certifications. A fast learner and collaborative team player eager to contribute to Jubilee Life Insurance's digital transformation agenda and J-Hub innovation initiatives.
          </p>
        </section>

        {/* Two-Column Grid for Skills / Experience */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print-grid">
          
          {/* Left Column: Skills, Education, Certifications */}
          <div className="md:col-span-1 space-y-8 print-col-sidebar print:space-y-6">
            
            {/* Core Skills */}
            <section className="print-break-inside-avoid">
              <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-4 print-section-title">
                Technical Skills
              </h2>
              <div className="space-y-4 text-xs">
                <div>
                  <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider print:text-neutral-800 text-[10px]">
                    Cloud & Infrastructure
                  </h3>
                  <p className="text-muted-foreground print:text-neutral-600 leading-normal">
                    AWS · Azure · Cloud provisioning · Performance monitoring · Docker · CI/CD
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider print:text-neutral-800 text-[10px]">
                    Testing & QA
                  </h3>
                  <p className="text-muted-foreground print:text-neutral-600 leading-normal">
                    Manual & Automated Testing · Postman (API) · Jira · UAT · Load Testing · TDD
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider print:text-neutral-800 text-[10px]">
                    Frontend Development
                  </h3>
                  <p className="text-muted-foreground print:text-neutral-600 leading-normal">
                    React · TypeScript · JavaScript · HTML5 · CSS3 · Tailwind CSS · Bootstrap · Vite
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider print:text-neutral-800 text-[10px]">
                    Backend & Databases
                  </h3>
                  <p className="text-muted-foreground print:text-neutral-600 leading-normal">
                    Node.js · PHP · ASP.NET Core / C# · MySQL · PostgreSQL · Firebase · REST APIs · Data Migration
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider print:text-neutral-800 text-[10px]">
                    Architecture & Systems
                  </h3>
                  <p className="text-muted-foreground print:text-neutral-600 leading-normal">
                    System design · Technical docs · Workflow mapping · Architecture repositories · Roadmaps
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider print:text-neutral-800 text-[10px]">
                    AI, ML & Automation
                  </h3>
                  <p className="text-muted-foreground print:text-neutral-600 leading-normal">
                    LangChain · RAG · Agent Architectures · Generative AI (SAP) · n8n Automation
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-foreground mb-1 uppercase tracking-wider print:text-neutral-800 text-[10px]">
                    IT Support & Docs
                  </h3>
                  <p className="text-muted-foreground print:text-neutral-600 leading-normal">
                    User support · Technical writing · Manuals · Cybersecurity (CCNA) · Wireshark
                  </p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="print-break-inside-avoid">
              <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-4 print-section-title">
                Education
              </h2>
              <div className="space-y-4 text-xs text-muted-foreground print:text-neutral-700">
                <div className="relative pl-3 border-l border-navy-border print-border-l">
                  <h3 className="font-semibold text-foreground print:text-neutral-900">BSc Information Technology</h3>
                  <p>Zetech University</p>
                  <p className="text-[10px] text-muted-foreground/75 mt-0.5 print-exp-period">Jan 2023 – Dec 2025 (Graduation: Nov 2026)</p>
                </div>
                <div className="relative pl-3 border-l border-navy-border print-border-l">
                  <h3 className="font-semibold text-foreground print:text-neutral-900">Diploma — Computer Software Engineering</h3>
                  <p>Zetech University</p>
                  <p className="text-[10px] text-muted-foreground/75 mt-0.5 print-exp-period">Jan 2022 – Nov 2023</p>
                </div>
                <div className="relative pl-3 border-l border-navy-border print-border-l">
                  <h3 className="font-semibold text-foreground print:text-neutral-900">Software Development Certification</h3>
                  <p>Power Learn Project (PLP Africa)</p>
                  <p className="text-[10px] text-muted-foreground/75 mt-0.5 print-exp-period">Mar 2025 – Aug 2025</p>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section className="print-break-inside-avoid">
              <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-4 print-section-title">
                Certifications
              </h2>
              <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4 print:text-neutral-700 print:pl-3">
                <li>CCNA: Enterprise Networking, Security & Automation (Cisco)</li>
                <li>Cybersecurity Fundamentals (Q1 Masterclass)</li>
                <li>The Complete Cyber Security Course (Udemy)</li>
                <li>Generative AI (SAP)</li>
                <li>Hashgraph Developer (Hedera / Attendance)</li>
                <li>Software Engineering (Power Learn Africa)</li>
                <li>.NET Fundamentals (Microsoft Student Learn)</li>
                <li>Microsoft Office Suite (Microsoft)</li>
              </ul>
            </section>

            {/* Languages */}
            <section className="print-break-inside-avoid">
              <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-2 print-section-title">
                Languages
              </h2>
              <p className="text-xs text-muted-foreground print:text-neutral-700">
                <strong>English</strong> — Full Professional Proficiency <br />
                <strong>Swahili</strong> — Native / Full Professional Proficiency
              </p>
            </section>
          </div>

          {/* Right Column: Experience & Projects */}
          <div className="md:col-span-2 space-y-6 print-col-main print:space-y-5">
            <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-2 print-section-title">
              Work Experience
            </h2>

            <div className="space-y-6 print:space-y-5">
              
              {/* Annex Technologies */}
              <div className="print-break-inside-avoid print-exp-item">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-foreground print-exp-title">Senior Software Quality Assurance Engineer</h3>
                    <p className="text-xs text-cyan print-exp-meta">Annex Technologies Limited · Kenya · Hybrid</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border print-exp-period">
                    Jan 2024 – Present
                  </span>
                </div>
                <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1 print-bullet-list">
                  <li>Performed API testing using Postman and validated backend functionality with SQL queries, ensuring data integrity and system compliance.</li>
                  <li>Assisted in automation testing, reducing manual testing effort and contributing to CI/CD quality pipelines.</li>
                  <li>Provided first-line application support to internal users, escalating complex incidents through proper channels.</li>
                  <li>Documented workflows, test procedures, and QA processes to support knowledge retention and operational continuity.</li>
                </ul>
              </div>

              {/* Kiwami Intern */}
              <div className="print-break-inside-avoid print-exp-item">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-foreground print-exp-title">Software Testing Intern</h3>
                    <p className="text-xs text-cyan print-exp-meta">Kiwami Tech Solutions · Nairobi, Kenya · Part-time</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border print-exp-period">
                    Aug 2025 – Present
                  </span>
                </div>
                <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1 print-bullet-list">
                  <li>Designed and maintained reusable test case management components, execution workflow interfaces, and real-time analytics dashboards to support performance monitoring.</li>
                  <li>Collaborated with backend engineers to validate REST API integrations, verifying accurate display of live test execution results, logs, and dashboards.</li>
                  <li>Performed frontend testing, debugging, and defect reporting; participated in Agile sprints to ensure quality across iterative releases.</li>
                </ul>
              </div>

              {/* RemboGlow */}
              <div className="print-break-inside-avoid print-exp-item">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-foreground print-exp-title">Co-Founder & Lead Engineer</h3>
                    <p className="text-xs text-cyan print-exp-meta">RemboGlow · Nairobi, Kenya</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border print-exp-period">
                    Aug 2025 – Present
                  </span>
                </div>
                <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1 print-bullet-list">
                  <li>Co-founded and engineered a beauty-tech digital platform owning architecture design, frontend development, deployment, and monitoring of pilot solutions.</li>
                  <li>Conducted user research and feedback collection to iterate UI/UX and align product development with user needs.</li>
                  <li>Documented learnings, case studies, and operational processes to support knowledge transfer and future scaling.</li>
                </ul>
              </div>

              {/* Tari Africa */}
              <div className="print-break-inside-avoid print-exp-item">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-foreground print-exp-title">Software Engineer</h3>
                    <p className="text-xs text-cyan print-exp-meta">Tari Africa Platforms · Nairobi, Kenya · Contract</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border print-exp-period">
                    Jan 2025 – Jun 2025
                  </span>
                </div>
                <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1 print-bullet-list">
                  <li>Designed and managed relational databases in MySQL, supporting data entry, cleanup, and migration tasks.</li>
                  <li>Built real-time dashboards centralizing compliance and financial reporting supporting performance monitoring responsibilities.</li>
                  <li>Maintained configuration and integration documentation ensuring compliance and knowledge continuity.</li>
                  <li>Managed Agile sprint delivery during peak transaction periods, contributing to parallel project execution.</li>
                </ul>
              </div>

              {/* Malila Tech Consultancies */}
              <div className="print-break-inside-avoid print-exp-item">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-foreground print-exp-title">Freelance IT Consultant & Developer</h3>
                    <p className="text-xs text-cyan print-exp-meta">Malila Tech Consultancies · Kenya · Full-time</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border print-exp-period">
                    Apr 2023 – Oct 2025
                  </span>
                </div>
                <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1 print-bullet-list">
                  <li>Provided remote and on-site IT support, handling low-to-medium complexity technical issues and escalating complex incidents appropriately.</li>
                  <li>Supported SMEs in data migration from manual to digital systems, improving data accuracy and cutting processing time by up to 40%.</li>
                  <li>Advised clients on cybersecurity best practices password policies, phishing awareness, and endpoint protection.</li>
                  <li>Delivered digital literacy workshops for community groups and NGOs, building capacity in IT tools and web technologies.</li>
                  <li>Researched and recommended emerging technologies and digital tools aligned with client operational needs.</li>
                </ul>
              </div>

              {/* Kiwami Attache */}
              <div className="print-break-inside-avoid print-exp-item">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-foreground print-exp-title">Quality Assurance Attaché</h3>
                    <p className="text-xs text-cyan print-exp-meta">Kiwami Tech Solutions · Nairobi, Kenya</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border print-exp-period">
                    Jun 2025 – Aug 2025
                  </span>
                </div>
                <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1 print-bullet-list">
                  <li>Designed manual test cases for a mobile banking app and created automated test scripts, cutting QA task time by 35%.</li>
                  <li>Identified and documented critical bugs in mobile UI flows, preventing a flawed release to 10,000+ users.</li>
                  <li>Participated in sprint reviews, presenting QA findings and contributing to technology roadmap and release decisions.</li>
                  <li>Developed a post-release monitoring checklist enabling early detection of post-launch issues.</li>
                </ul>
              </div>

              {/* Remotasks */}
              <div className="print-break-inside-avoid print-exp-item">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-foreground print-exp-title">Image Annotator & AI Data Specialist</h3>
                    <p className="text-xs text-cyan print-exp-meta">Remotasks · Nairobi, Kenya</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border print-exp-period">
                    Jun 2021 – Apr 2024
                  </span>
                </div>
                <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1 print-bullet-list">
                  <li>Applied data annotation, QA, and image processing skills to support AI/ML model training contributing to machine learning pipelines at scale.</li>
                  <li>Maintained high accuracy across object detection, segmentation, and classification tasks relevant to AI/ML knowledge advantage.</li>
                </ul>
              </div>

              {/* JKUAT */}
              <div className="print-break-inside-avoid print-exp-item">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-foreground print-exp-title">IT Attaché</h3>
                    <p className="text-xs text-cyan print-exp-meta">JKUAT (Jomo Kenyatta University) · Juja, Kenya</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-navy-elevated px-2 py-0.5 rounded border border-navy-border print-exp-period">
                    Sep 2023 – Nov 2023
                  </span>
                </div>
                <ul className="mt-2 text-xs text-muted-foreground list-disc pl-4 space-y-1 print-bullet-list">
                  <li>Assisted in upgrading computer lab infrastructure, improving system stability and boot-up times by 50%.</li>
                  <li>Conducted digital literacy training sessions; authored IT support guides that reduced repeat service requests.</li>
                  <li>Audited system logs for unauthorized access attempts and reported vulnerabilities supporting compliance and security documentation.</li>
                </ul>
              </div>

            </div>

            {/* Key Projects */}
            <section className="pt-6 border-t border-navy-border print:border-neutral-300 print:pt-4">
              <h2 className="text-sm font-semibold tracking-widest text-cyan uppercase mb-4 print-section-title">
                Key Projects
              </h2>
              <div className="space-y-4 text-xs text-muted-foreground print:text-neutral-700">
                <div className="print-break-inside-avoid">
                  <h3 className="font-bold text-foreground print-exp-title">
                    Kiwami TestCloud <span className="font-normal text-muted-foreground/80">· React · TypeScript · Vite</span>
                  </h3>
                  <p className="mt-1">Production cloud-based software testing platform. Built full frontend with real-time dashboards, secure auth flows, and API integration.</p>
                </div>
                <div className="print-break-inside-avoid">
                  <h3 className="font-bold text-foreground print-exp-title">
                    RemboGlow <span className="font-normal text-muted-foreground/80">· React · Node.js · PostgreSQL</span>
                  </h3>
                  <p className="mt-1">Beauty-tech e-commerce platform — co-founded and engineered end-to-end, including architecture design, pilot deployment, and user research iteration.</p>
                </div>
                <div className="print-break-inside-avoid">
                  <h3 className="font-bold text-foreground print-exp-title">
                    Tari Digital Nexus <span className="font-normal text-muted-foreground/80">· Node.js · PHP · MySQL · KRA eTIMS · M-Pesa</span>
                  </h3>
                  <p className="mt-1">Full-stack platform integrating KRA eTIMS and M-Pesa for SME digital tax compliance — included data migration, dashboard build, and compliance documentation.</p>
                </div>
                <div className="print-break-inside-avoid">
                  <h3 className="font-bold text-foreground print-exp-title">
                    Skymed Life <span className="font-normal text-muted-foreground/80">· React · Node.js · Load Testing</span>
                  </h3>
                  <p className="mt-1">Healthcare web application with load-tested infrastructure supporting 500+ concurrent users and workflow documentation.</p>
                </div>
                <div className="print-break-inside-avoid">
                  <h3 className="font-bold text-foreground print-exp-title">
                    ECONEST <span className="font-normal text-muted-foreground/80">· React · Node.js · Firebase</span>
                  </h3>
                  <p className="mt-1">Eco-focused digital platform — supported prototype development, UI/UX iteration, and pilot solution deployment.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

      </article>
    </div>
  );
}
