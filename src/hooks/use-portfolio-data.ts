import { useState, useEffect } from "react";

export interface Project {
  name: string;
  period: string;
  url: string | null;
  objective: string;
  stack: string[];
  summary: string;
  value: string;
  highlight: boolean;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  overview: string;
  highlights: string[];
  tech: string[];
}

export interface SkillGroup {
  iconName: string;
  category: string;
  tagline: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  icon: string;
  category: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  status: string;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    name: "E-Foleni",
    period: "Sep 2025 – Present",
    url: "https://efoleni.co.ke/",
    objective: "A queue-free booking platform replacing walk-in lines, WhatsApp threads, and double-booked spreadsheets with an M-Pesa native time-slot scheduler.",
    stack: ["React", "TypeScript", "Tailwind CSS", "M-Pesa API (Daraja)", "Role-Aware Dashboards"],
    summary: "Co-founded and engineered a booking platform serving schools, clinics, and banks. Built multi-person back-to-back booking logic, M-Pesa STK push integration, and fast mobile-first web views for low-bandwidth networks.",
    value: "Saved an average of 42 minutes of queue time per visitor, with over 120,000+ slots booked locally and 99.9% uptime.",
    highlight: true,
  },
  {
    name: "Kiwami TestCloud",
    period: "Sep 2025 – Jan 2026",
    url: "https://www.kiwamitestcloud.com",
    objective: "Production cloud-based software testing platform for professional QA teams.",
    stack: ["React", "TypeScript", "Vite", "REST APIs", "Dashboards"],
    summary: "Built the complete frontend architecture of Kiwami TestCloud, implementing reusable test case management components, execution workflow interfaces, and real-time analytics dashboards.",
    value: "Protected 10,000+ users from faulty releases and saved QA testing time by 35% through automated workflows.",
    highlight: false,
  },
  {
    name: "RemboGlow",
    period: "Aug 2025 – Present",
    url: "https://remboglow.com",
    objective: "Beauty-tech e-commerce platform — co-founded and engineered end-to-end.",
    stack: ["React", "Node.js", "PostgreSQL", "System Architecture", "UI/UX Research"],
    summary: "Co-founded and engineered the platform end-to-end, owning architecture design, pilot deployment, and user research iteration to align product with user needs.",
    value: "Co-founded and shipped a beautiful skincare routing portal with secure checkout flows.",
    highlight: false,
  },
  {
    name: "Tari Digital Nexus",
    period: "Jan 2025 – Jun 2025",
    url: null,
    objective: "Full-stack platform integrating KRA eTIMS and M-Pesa for SME digital tax compliance.",
    stack: ["Node.js", "PHP", "MySQL", "KRA eTIMS", "M-Pesa API"],
    summary: "Designed MySQL database structures, migrated data from spreadsheet systems, built real-time compliance dashboards, and handled parallel sprint delivery.",
    value: "Automated VAT submissions and mobile wallet integrations, saving local businesses hours of manual compliance work.",
    highlight: false,
  },
  {
    name: "Skymed Life",
    period: "Mar 2025 – Jun 2025",
    url: null,
    objective: "Healthcare web application with load-tested infrastructure.",
    stack: ["React", "Node.js", "Firebase", "Load Testing"],
    summary: "Built key web application modules and load-tested infrastructure supporting 500+ concurrent users with comprehensive workflow documentation.",
    value: "Ensured high application availability and transaction-ready reliability for healthcare appointments.",
    highlight: false,
  },
  {
    name: "ECONEST",
    period: "Jun 2025 – Sep 2025",
    url: null,
    objective: "Eco-focused digital platform — supported prototype development.",
    stack: ["React", "Node.js", "Firebase", "UI/UX Iteration", "Pilot Deployment"],
    summary: "Supported prototype development, UI/UX iteration, and pilot solution deployment for an eco-focused digital marketplace.",
    value: "Delivered a responsive product discovery prototype that showcases green options.",
    highlight: false,
  },
];

const DEFAULT_EXPERIENCES: Experience[] = [
  {
    role: "Senior Software Quality Assurance Engineer",
    company: "Annex Technologies Limited",
    location: "Kenya",
    period: "Jan 2024 – Present",
    type: "Hybrid",
    overview: "Performed API testing using Postman and validated backend functionality with SQL queries, ensuring data integrity and system compliance.",
    highlights: [
      "Performed API testing using Postman and validated backend functionality with SQL queries, ensuring data integrity and system compliance.",
      "Assisted in automation testing, reducing manual testing effort and contributing to CI/CD quality pipelines.",
      "Provided first-line application support to internal users, escalating complex incidents through proper channels.",
      "Documented workflows, test procedures, and QA processes to support knowledge retention and operational continuity."
    ],
    tech: ["Postman", "SQL Database Testing", "Automation Testing", "Jira", "CI/CD Pipelines", "Technical Support"],
  },
  {
    role: "Software Testing Intern",
    company: "Kiwami Tech Solutions",
    location: "Nairobi, Kenya",
    period: "Aug 2025 – Present",
    type: "Part-time",
    overview: "Designed and maintained reusable test case management components, execution workflow interfaces, and real-time analytics dashboards to support performance monitoring.",
    highlights: [
      "Designed and maintained reusable test case management components, execution workflow interfaces, and real-time analytics dashboards to support performance monitoring.",
      "Collaborated with backend engineers to validate REST API integrations, verifying accurate display of live test execution results, logs, and dashboards.",
      "Performed frontend testing, debugging, and defect reporting; participated in Agile sprints to ensure quality across iterative releases."
    ],
    tech: ["React", "TypeScript", "REST APIs", "Test Case Management", "Agile Sprints", "Analytics Dashboards"],
  },
  {
    role: "Co-Founder & Lead Engineer",
    company: "RemboGlow",
    location: "Nairobi, Kenya",
    period: "Aug 2025 – Present",
    type: "Full-time",
    overview: "Co-founded and engineered a beauty-tech digital platform owning architecture design, frontend development, deployment, and monitoring of pilot solutions.",
    highlights: [
      "Co-founded and engineered a beauty-tech digital platform owning architecture design, frontend development, deployment, and monitoring of pilot solutions.",
      "Conducted user research and feedback collection to iterate UI/UX and align product development with user needs.",
      "Documented learnings, case studies, and operational processes to support knowledge transfer and future scaling."
    ],
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "System Architecture", "UI/UX Research"],
  },
  {
    role: "Software Engineer",
    company: "Tari Africa Platforms",
    location: "Nairobi, Kenya",
    period: "Jan 2025 – Jun 2025",
    type: "Contract",
    overview: "Designed and managed relational databases in MySQL, supporting data entry, cleanup, and migration tasks.",
    highlights: [
      "Designed and managed relational databases in MySQL, supporting data entry, cleanup, and migration tasks.",
      "Built real-time dashboards centralizing compliance and financial reporting supporting performance monitoring responsibilities.",
      "Maintained configuration and integration documentation ensuring compliance and knowledge continuity.",
      "Managed Agile sprint delivery during peak transaction periods, contributing to parallel project execution."
    ],
    tech: ["MySQL", "Node.js", "PHP", "Agile Sprint", "KRA eTIMS", "M-Pesa API"],
  },
  {
    role: "Freelance IT Consultant & Software Developer",
    company: "Malila Tech Consultancies",
    location: "Kenya",
    period: "Apr 2023 – Oct 2025",
    type: "Full-time",
    overview: "Provided remote and on-site IT support, handling low-to-medium complexity technical issues and escalating complex incidents appropriately.",
    highlights: [
      "Provided remote and on-site IT support, handling low-to-medium complexity technical issues and escalating complex incidents appropriately.",
      "Supported SMEs in data migration from manual to digital systems, improving data accuracy and cutting processing time by up to 40%.",
      "Advised clients on cybersecurity best practices password policies, phishing awareness, and endpoint protection.",
      "Delivered digital literacy workshops for community groups and NGOs, building capacity in IT tools and web technologies.",
      "Researched and recommended emerging technologies and digital tools aligned with client operational needs."
    ],
    tech: ["IT Support", "Data Migration", "Cybersecurity", "Digital Literacy", "Emerging Tech"],
  },
  {
    role: "Quality Assurance Attaché",
    company: "Kiwami Tech Solutions",
    location: "Nairobi, Kenya",
    period: "Jun 2025 – Aug 2025",
    type: "Attachment",
    overview: "Conducted manual and automated testing, defect reporting, and release readiness planning for mobile banking applications.",
    highlights: [
      "Designed manual test cases for a mobile banking app and created automated test scripts, cutting QA task time by 35%.",
      "Identified and documented critical bugs in mobile UI flows, preventing a flawed release to 10,000+ users.",
      "Participated in sprint reviews, presenting QA findings and contributing to technology roadmap and release decisions.",
      "Developed a post-release monitoring checklist enabling early detection of post-launch issues."
    ],
    tech: ["Manual Testing", "Automated Scripting", "Mobile UI Testing", "Jira", "Roadmap Decisions"],
  },
  {
    role: "Image Annotator & AI Data Specialist",
    company: "Remotasks",
    location: "Nairobi, Kenya",
    period: "Jun 2021 – Apr 2024",
    type: "Freelance",
    overview: "Applied data annotation, QA, and image processing skills to support AI/ML model training contributing to machine learning pipelines at scale.",
    highlights: [
      "Applied data annotation, QA, and image processing skills to support AI/ML model training contributing to machine learning pipelines at scale.",
      "Maintained high accuracy across object detection, segmentation, and classification tasks relevant to AI/ML knowledge advantage."
    ],
    tech: ["Data Annotation", "QA", "Image Processing", "Object Detection", "Machine Learning Pipelines"],
  },
  {
    role: "IT Attaché",
    company: "JKUAT (Jomo Kenyatta University)",
    location: "Juja, Kenya",
    period: "Sep 2023 – Nov 2023",
    type: "Attachment",
    overview: "Assisted in upgrading computer lab infrastructure, improving system stability and boot-up times by 50%.",
    highlights: [
      "Assisted in upgrading computer lab infrastructure, improving system stability and boot-up times by 50%.",
      "Conducted digital literacy training sessions; authored IT support guides that reduced repeat service requests.",
      "Audited system logs for unauthorized access attempts and reported vulnerabilities supporting compliance and security documentation."
    ],
    tech: ["Infrastructure Upgrades", "Digital Literacy", "IT Support Guides", "Security Audit", "Compliance Docs"],
  },
];

const DEFAULT_SKILLS: SkillGroup[] = [
  {
    iconName: "Code2",
    category: "Frontend Development",
    tagline: "Building highly responsive user interfaces",
    skills: ["React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Vite"],
  },
  {
    iconName: "Shield",
    category: "Application Testing & QA",
    tagline: "Ensuring software stability and reliability",
    skills: ["Manual & Automated Testing", "Postman (API)", "Jira (bug tracking)", "UAT", "Load Testing", "TDD", "Jest"],
  },
  {
    iconName: "Building2",
    category: "Cloud & Infrastructure",
    tagline: "Provisioning resources and deployment automation",
    skills: ["AWS (exposure)", "Azure (exposure)", "Cloud resource provisioning", "Performance monitoring", "Docker", "CI/CD Pipelines"],
  },
  {
    iconName: "TestTube2",
    category: "Backend & Databases",
    tagline: "Data architectures and secure REST API services",
    skills: ["Node.js", "ASP.NET Core / C#", "MySQL", "PostgreSQL", "Firebase", "REST APIs", "Data Migration", "PHP"],
  },
  {
    iconName: "Wrench",
    category: "AI, ML & IT Support",
    tagline: "Agent models, system logs, and user support",
    skills: ["LangChain", "RAG", "Agent Architectures", "Generative AI (SAP certified)", "n8n Automation", "First-line user support", "Technical writing", "Cybersecurity (CCNA)", "Wireshark"],
  },
];

const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    name: "CCNA: Enterprise Networking, Security & Automation",
    issuer: "Cisco Networking Academy",
    icon: "🔐",
    category: "Networking",
  },
  {
    name: "Cybersecurity Fundamentals",
    issuer: "Q1 Masterclass",
    icon: "🛡️",
    category: "Security",
  },
  {
    name: "The Complete Cyber Security Course",
    issuer: "Udemy",
    icon: "🛡️",
    category: "Security",
  },
  {
    name: "Generative AI",
    issuer: "SAP",
    icon: "🤖",
    category: "AI/ML",
  },
  {
    name: "Hashgraph Developer",
    issuer: "Hedera / Attendance",
    icon: "⚡",
    category: "Development",
  },
  {
    name: "Software Engineering",
    issuer: "Power Learn Africa",
    icon: "💻",
    category: "Development",
  },
  {
    name: " .NET Fundamentals",
    issuer: "Microsoft Student Learn",
    icon: "⚡",
    category: "Development",
  },
  {
    name: "Microsoft Office Suite",
    issuer: "Microsoft",
    icon: "📊",
    category: "Productivity",
  },
];

const DEFAULT_EDUCATION: Education[] = [
  {
    degree: "BSc Information Technology",
    institution: "Zetech University",
    period: "Jan 2023 – Dec 2025 (Graduation: Nov 2026)",
    status: "Finalist",
  },
  {
    degree: "Diploma — Computer Software Engineering",
    institution: "Zetech University",
    period: "Jan 2022 – Nov 2023",
    status: "Completed",
  },
  {
    degree: "Software Development Certification",
    institution: "Power Learn Project (PLP Africa)",
    period: "Mar 2025 – Aug 2025",
    status: "Completed",
  },
];

const EVENT_NAME = "portfolio-data-updated";

export function usePortfolioData() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [education, setEducation] = useState<Education[]>([]);

  // Function to load everything from localStorage or fall back to defaults
  const loadData = () => {
    const localProjects = localStorage.getItem("portfolio_projects");
    const localExperiences = localStorage.getItem("portfolio_experiences");
    const localSkills = localStorage.getItem("portfolio_skills");
    const localCertifications = localStorage.getItem("portfolio_certifications");
    const localEducation = localStorage.getItem("portfolio_education");

    if (localProjects) setProjects(JSON.parse(localProjects));
    else {
      localStorage.setItem("portfolio_projects", JSON.stringify(DEFAULT_PROJECTS));
      setProjects(DEFAULT_PROJECTS);
    }

    if (localExperiences) setExperiences(JSON.parse(localExperiences));
    else {
      localStorage.setItem("portfolio_experiences", JSON.stringify(DEFAULT_EXPERIENCES));
      setExperiences(DEFAULT_EXPERIENCES);
    }

    if (localSkills) setSkills(JSON.parse(localSkills));
    else {
      localStorage.setItem("portfolio_skills", JSON.stringify(DEFAULT_SKILLS));
      setSkills(DEFAULT_SKILLS);
    }

    if (localCertifications) setCertifications(JSON.parse(localCertifications));
    else {
      localStorage.setItem("portfolio_certifications", JSON.stringify(DEFAULT_CERTIFICATIONS));
      setCertifications(DEFAULT_CERTIFICATIONS);
    }

    if (localEducation) setEducation(JSON.parse(localEducation));
    else {
      localStorage.setItem("portfolio_education", JSON.stringify(DEFAULT_EDUCATION));
      setEducation(DEFAULT_EDUCATION);
    }
  };

  useEffect(() => {
    loadData();

    // Listen for custom events to trigger updates
    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
    };
  }, []);

  const notifyChange = () => {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  };

  const addProject = (project: Project) => {
    const updated = [project, ...projects];
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
    setProjects(updated);
    notifyChange();
  };

  const addExperience = (exp: Experience) => {
    const updated = [exp, ...experiences];
    localStorage.setItem("portfolio_experiences", JSON.stringify(updated));
    setExperiences(updated);
    notifyChange();
  };

  const addCertification = (cert: Certification) => {
    const updated = [cert, ...certifications];
    localStorage.setItem("portfolio_certifications", JSON.stringify(updated));
    setCertifications(updated);
    notifyChange();
  };

  const addSkill = (categoryName: string, newSkillName: string) => {
    const updated = skills.map((g) => {
      if (g.category.toLowerCase().includes(categoryName.toLowerCase())) {
        if (!g.skills.includes(newSkillName)) {
          return { ...g, skills: [...g.skills, newSkillName] };
        }
      }
      return g;
    });
    localStorage.setItem("portfolio_skills", JSON.stringify(updated));
    setSkills(updated);
    notifyChange();
  };

  const resetToDefaults = () => {
    localStorage.setItem("portfolio_projects", JSON.stringify(DEFAULT_PROJECTS));
    localStorage.setItem("portfolio_experiences", JSON.stringify(DEFAULT_EXPERIENCES));
    localStorage.setItem("portfolio_skills", JSON.stringify(DEFAULT_SKILLS));
    localStorage.setItem("portfolio_certifications", JSON.stringify(DEFAULT_CERTIFICATIONS));
    localStorage.setItem("portfolio_education", JSON.stringify(DEFAULT_EDUCATION));
    loadData();
    notifyChange();
  };

  return {
    projects,
    experiences,
    skills,
    certifications,
    education,
    addProject,
    addExperience,
    addCertification,
    addSkill,
    resetToDefaults,
  };
}
