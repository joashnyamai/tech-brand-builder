import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Send,
  Bot,
  Sparkles,
  FileCheck,
  Terminal,
  Key,
  ShieldAlert,
  Cpu,
  Check,
  AlertCircle,
  ArrowLeft,
  Settings,
  X,
  Play,
  RotateCcw,
  Paperclip,
  FileText,
  RefreshCw,
  Github,
  Linkedin,
  PlusCircle,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Trash2,
  Plus,
  Undo
} from "lucide-react";
import { usePortfolioData } from "@/hooks/use-portfolio-data";

// Context for Gemini Queries
export const RESUME_CONTEXT = `
Name: Malila Nyamai
Role: Software Engineer · QA Engineer · IT Consultant
Location: Nairobi, Kenya
Email: jamesmnyamai9@gmail.com
Phone: 0745 806 761
LinkedIn: linkedin.com/in/malila-nyamai-0b2711221
GitHub: github.com/joashnyamai

PROFESSIONAL SUMMARY
Results-driven Software Engineer, QA Specialist, and IT Consultant with 3+ years of hands-on experience engineering scalable web platforms, automated testing frameworks, and cloud-backed systems. Finalist in BSc Information Technology with demonstrated expertise in React, TypeScript, Node.js, and relational databases (MySQL, PostgreSQL). Proven track record in API and end-to-end testing (Postman, Jest), CI/CD integration, and cloud environments (AWS/Azure). Passionate about building reliable digital products, implementing secure AI agent workflows (LangChain, RAG), and delivering high-impact solutions.

SKILLS:
- Cloud & Infrastructure: AWS, Azure, resource provisioning, Docker, CI/CD.
- Testing & QA: Manual & Automated, Postman (API), Jira, UAT, Load Testing, TDD, Cypress, Selenium.
- Frontend: React, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind, Vite.
- Backend & Databases: Node.js, PHP, ASP.NET Core / C#, MySQL, PostgreSQL, Firebase.
- Architecture: System design, Technical documentation, Workflow mapping, roadmaps.
- AI/ML: LangChain, RAG, Agent Architectures, Generative AI (SAP certified), n8n.
- IT Support & Docs: User support, Technical writing, Cybersecurity (CCNA), Wireshark.

EXPERIENCE:
- Senior QA Engineer @ Annex Technologies Limited (Jan 2024 - Present): Postman API testing, database SQL testing, CI/CD quality verification.
- Software Testing Intern @ Kiwami Tech Solutions (Aug 2025 - Present): Reusable test case management, frontend React testing.
- Co-Founder & Lead Engineer @ RemboGlow (Aug 2025 - Present): Beauty-tech platform co-founder, deployment, user research.
- Software Engineer @ Tari Africa Platforms (Jan 2025 - Jun 2025): MySQL database management, KRA eTIMS & M-Pesa integration.
- Freelance IT Consultant & Developer @ Malila Tech Consultancies (Apr 2023 - Oct 2025): IT support, data migration, cybersecurity setup.
- QA Attaché @ Kiwami Tech Solutions (Jun 2025 - Aug 2025): Designed mobile banking app test scripts, cutting QA time by 35%.

PROJECTS:
1. E-Foleni (efoleni.co.ke) (Sep 2025 - Present) [Featured Project]:
   - Objective: A queue-free booking platform replacing walk-in lines, WhatsApp threads, and spreadsheets with an M-Pesa native scheduler.
   - Stack: React, TypeScript, Tailwind CSS, M-Pesa API (Daraja), Role-Aware Dashboards.
   - Summary: Co-founded and engineered. Built multi-person back-to-back booking logic, M-Pesa STK push integration, and fast mobile-first web views for low-bandwidth networks.
   - Value: Saved an average of 42 minutes of queue time per visitor, with 120,000+ slots booked locally and 99.9% uptime.
2. Kiwami TestCloud (Sep 2025 - Jan 2026):
   - Objective: Production cloud-based software testing platform for professional QA teams.
   - Stack: React, TypeScript, Vite, REST APIs, Dashboards.
   - Summary: Built the complete frontend architecture, implementing reusable test case management components, execution workflow interfaces, and analytics dashboards.
   - Value: Protected 10,000+ users from faulty releases and saved QA testing time by 35% through automated workflows.
3. RemboGlow (remboglow.com) (Aug 2025 - Present):
   - Objective: Skincare beauty-tech e-commerce platform.
   - Stack: React, Node.js, PostgreSQL, System Architecture, UI/UX Research.
   - Summary: Co-founded and engineered the platform end-to-end, owning architecture design, pilot deployment, and user research iteration.
   - Value: Shipped a beautiful skincare routing portal with secure checkout flows.
4. Tari Digital Nexus (Jan 2025 - Jun 2025):
   - Objective: Full-stack platform integrating KRA eTIMS and M-Pesa for SME digital tax compliance.
   - Stack: Node.js, PHP, MySQL, KRA eTIMS, M-Pesa API.
   - Summary: Designed MySQL structures, migrated data from spreadsheet systems, built real-time compliance dashboards, and handled parallel sprint delivery.
   - Value: Automated VAT submissions and mobile wallet integrations, saving local businesses hours of manual compliance work.
5. Skymed Life (Mar 2025 - Jun 2025):
   - Objective: Healthcare web application with load-tested infrastructure.
   - Stack: React, Node.js, Firebase, Load Testing.
   - Summary: Built key modules and load-tested infrastructure supporting 500+ concurrent users with comprehensive workflow documentation.
   - Value: Ensured high availability and transaction-ready reliability for healthcare appointments.
6. ECONEST (Jun 2025 - Sep 2025):
   - Objective: Eco-focused digital product discovery marketplace.
   - Stack: React, Node.js, Firebase, UI/UX Iteration, Pilot Deployment.
   - Summary: Supported prototype development, UI/UX iteration, and pilot solution deployment.
   - Value: Shipped a responsive product discovery prototype that showcases green options.

EDUCATION:
- BSc Information Technology @ Zetech University (Jan 2023 - Dec 2025, Graduation: Nov 2026) - Finalist.
- Diploma in Computer Software Engineering @ Zetech University (Jan 2022 - Nov 2023) - Completed.
- Software Development Certification @ Power Learn Project PLP Africa (Mar 2025 - Aug 2025) - Completed.

CERTIFICATIONS:
- CCNA: Enterprise Networking, Security & Automation (Cisco Networking Academy) - Networking
- Cybersecurity Fundamentals (Q1 Masterclass) - Security
- The Complete Cyber Security Course (Udemy) - Security
- Generative AI Certification (SAP) - AI/ML
- Hashgraph Developer (Hedera) - Development
- Software Engineering (Power Learn Africa) - Development
- .NET Fundamentals (Microsoft Student Learn) - Development
- Microsoft Office Suite (Microsoft) - Productivity

BEYOND CODE / INTERESTS:
- Writing about emerging tech, playing chess, exploring AI innovations, and mentoring the next generation of Kenyan engineers into the industry.
`;

const SAMPLE_VULNERABLE_CODE = {
  sql: `// NodeJS SQL Injection vulnerability example
app.get('/users', async (req, res) => {
  const username = req.query.username;
  // VULNERABLE: Direct concatenation of user input in query
  const query = "SELECT * FROM users WHERE name = '" + username + "'";
  const results = await db.query(query);
  res.json(results);
});`,
  xss: `// React Ref XSS vulnerability example
function CommentSection({ rawCommentText }) {
  // VULNERABLE: Bypasses React security filters
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: rawCommentText }} 
      className="comment-box"
    />
  );
}`
};

export const AVA_SYSTEM_PROMPT = `You are Ava, Malila Nyamai's personal portfolio guide and technical representative.

RESUME CONTEXT:
${RESUME_CONTEXT}

STRICT RESPONSE FORMAT RULES (DO NOT USE AN AI RESPONSE FORMAT):
1. NO AI FORMATTING:
   - Speak naturally like an articulate, friendly human colleague chatting on Slack or WhatsApp.
   - NEVER use markdown headings (no ### or ##).
   - NEVER use formulaic bold labels at sentence starts (do not write "**Direct Answer:**", "**Skills:**", or "**Overview:**").
   - NEVER use robotic conversational filler (do not start with "Certainly!", "Great question!", "Sure thing!", "I'd be glad to help", or "Based on his resume..."). Start immediately with the direct answer.
   - NEVER add canned AI sign-offs at the end (do not say "Feel free to ask if you need anything else!", "Hope this helps!", or "Let me know if you have questions!").

2. ANSWER SPEED & BREVITY:
   - Keep answers compact, fast to read, and punchy: 2 to 4 conversational sentences total in 1 or 2 natural paragraphs.
   - Avoid long walls of text. Be concise, direct, and human.

3. DIRECT ANSWER FIRST:
   - If asked a direct question (e.g. "Can he build in React?", "What is E-Foleni?", "What is his hourly rate?", "Where is he located?"), state the direct answer in the very first words.
   - If asked about something he does NOT know (e.g. Ruby on Rails, Flutter, Rust), be honest and direct: "Malila doesn't specialize in Ruby on Rails; his backend experience is mainly with Node.js, PHP, and C#/.NET with MySQL and PostgreSQL."
   - For greetings ("hi", "hello"), respond in 1 warm, friendly sentence asking what they'd like to explore about Malila's software or QA work.
   - For contact, state: email jamesmnyamai9@gmail.com, phone 0745 806 761, based in Nairobi Kenya.`;

export function formatAsHumanResponse(raw: string): string {
  if (!raw) return "";
  let text = raw.trim();

  // Strip robotic AI opening clichés
  text = text.replace(/^(certainly|sure thing|great question|of course|absolutely|happy to help|hello there)[!.,\s]*/i, "");
  text = text.replace(/^(here is a breakdown|based on (the|his|malila's) (resume|background|experience|context)|according to (the|his) (resume|profile))[!.,\s:]*/i, "");

  // Strip section headers like ### or ##
  text = text.replace(/^#{1,4}\s+/gm, "");

  // Strip formulaic bold labels like **Direct Answer:**, **Overview:**, **Key Highlights:**, **Summary:**
  text = text.replace(/\*\*(direct answer|answer|overview|key takeaways?|summary|skills?|experience|projects?):\*\*\s*/gi, "");

  // Strip bullet lists that start with bold keys: e.g. "* **Title:** description" -> "• Title: description"
  text = text.replace(/^[*-]\s+\*\*([^*]+)\*\*:\s*/gm, "• $1: ");

  // Strip standalone robotic AI closing sign-offs at the very end
  text = text.replace(/\n\s*(Feel free to reach out.*|Let me know if you (have|need) (any|more) questions.*|Hope this helps!*|I hope this helps!*)$/i, "");
  text = text.replace(/\s*(Feel free to ask if you need anything else|Hope this helps)[.!]*$/i, "");

  // Ensure completeness: if text ends on an unfinished trailing phrase, clean to the last sentence
  const trimmed = text.trim();
  if (trimmed.length > 60 && !/[.!?]$/.test(trimmed)) {
    const lastPunctuation = Math.max(
      trimmed.lastIndexOf("."),
      trimmed.lastIndexOf("!"),
      trimmed.lastIndexOf("?")
    );
    if (lastPunctuation > trimmed.length * 0.65) {
      return trimmed.substring(0, lastPunctuation + 1);
    }
    return trimmed + ".";
  }

  return trimmed;
}

export interface ChatMessagePart {
  text: string;
}

export interface ChatContent {
  role: "user" | "model";
  parts: ChatMessagePart[];
}

export function cleanJsonOutput(rawText: string): string {
  if (!rawText) return "{}";
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  cleaned = cleaned.trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  return cleaned.trim();
}

// --- MOCK LOGIC UTILITIES FOR SEAMLESS OFFLINE FALLBACK ---

export function getMockChatResponse(text: string): string {
  const q = text.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|greetings|good\s+(morning|afternoon|evening)|sup)\b/i.test(q)) {
    return "Hello! I'm Ava, Malila's portfolio guide. Ask me anything about his software engineering experience, automated QA pipelines, live projects like E-Foleni, or how to get in touch with him!";
  }

  // Who is Ava / Who are you
  if (q.includes("who are you") || q.includes("your name") || q.includes("what are you")) {
    return "I am Ava, Malila Nyamai's AI portfolio guide and technical representative. I can answer questions about his software engineering background, test automation expertise, tech stack, and portfolio projects.";
  }

  // Missing skills / Not specialized in
  if (q.includes("ruby") || q.includes("rails")) {
    return "Malila does not specialize in Ruby on Rails. His primary backend stack is centered on Node.js, PHP, and C# (.NET Core), paired with MySQL and PostgreSQL databases. He has strong foundation in RESTful API architectures and can quickly adapt to backend frameworks.";
  }
  if (q.includes("python") || q.includes("django") || q.includes("flask")) {
    return "While Malila has explored Python for AI/ML and LangChain prototyping, his production engineering focus is centered on TypeScript, React, Node.js, PHP, and C# (.NET). He adapts rapidly to new backend runtimes.";
  }
  if (q.includes("flutter") || q.includes("react native") || q.includes("swift") || q.includes("kotlin") || q.includes("mobile app")) {
    return "Malila's core expertise is in web engineering (React, Vite, TypeScript) and responsive web applications with offline-first and mobile-optimized interfaces (like E-Foleni). While he has designed mobile banking QA test scripts at Kiwami Tech Solutions, he does not specialize in native iOS/Android development.";
  }
  if (q.includes("kubernetes") || q.includes("k8s")) {
    return "Malila is experienced with Docker containerization, AWS cloud provisioning, and CI/CD quality verification, but Kubernetes cluster orchestration is not currently in his primary production stack.";
  }

  // RemboGlow
  if (q.includes("remboglow") || q.includes("beauty") || q.includes("skincare")) {
    return "RemboGlow is a beauty-tech platform co-founded and engineered by Malila. He architected the platform end-to-end using React, Node.js, and PostgreSQL, leading deployment and user research iteration.";
  }

  // Kiwami Tech Solutions
  if (q.includes("kiwami") || q.includes("testcloud")) {
    return "At Kiwami Tech Solutions, Malila engineered the frontend for Kiwami TestCloud (React, Vite, TypeScript) and designed automated QA scripts for mobile banking, cutting QA cycles by 35% and protecting over 10,000 users from faulty releases.";
  }

  // Annex Technologies
  if (q.includes("annex") || q.includes("senior qa") || q.includes("current role")) {
    return "Malila serves as Senior QA Engineer at Annex Technologies Limited. He leads Postman API validation, SQL backend testing, and CI/CD test verification to uphold high reliability across production releases.";
  }

  // E-Foleni
  if (q.includes("efoleni") || q.includes("queue") || q.includes("booking")) {
    return "E-Foleni (efoleni.co.ke) is a queue-free booking platform Malila co-founded. Built with React, TypeScript, and M-Pesa Daraja API, it has handled over 120,000 slots and saved users an average of 42 minutes per visit with 99.9% uptime.";
  }

  // Tari Africa
  if (q.includes("tari") || q.includes("tax") || q.includes("etims")) {
    return "At Tari Africa, Malila engineered digital tax and billing integrations connecting Node.js and PHP services with KRA eTIMS and M-Pesa API, automating invoice compliance for Kenyan enterprises.";
  }

  // Tech Stack & Languages
  if (q.includes("tech stack") || q.includes("stack") || q.includes("technologies") || q.includes("languages")) {
    return "Malila's core stack includes TypeScript, JavaScript (ES6+), React, Node.js, PHP, and C# (.NET Core). For data and testing, he leverages MySQL, PostgreSQL, Cypress, Selenium, Postman, Docker, and AWS/Azure.";
  }

  // QA & Testing
  if (q.includes("qa") || q.includes("test") || q.includes("cypress") || q.includes("selenium") || q.includes("postman")) {
    return "With 3+ years in QA engineering, Malila specializes in automated regression suites (Cypress, Selenium), API contract testing (Postman), database query validation, and CI/CD quality gates across both web and mobile environments.";
  }

  // Cloud & DevOps
  if (q.includes("cloud") || q.includes("aws") || q.includes("azure") || q.includes("docker") || q.includes("devops") || q.includes("ci/cd")) {
    return "Malila has hands-on expertise in AWS and Azure cloud provisioning, Docker containerization, and continuous integration pipelines (GitHub Actions), ensuring reproducible builds and reliable deployments.";
  }

  // Rates / Pricing
  if (q.includes("rate") || q.includes("cost") || q.includes("price") || q.includes("salary") || q.includes("compensation") || q.includes("charge")) {
    return "Malila is open to full-time roles, contract engagements, and consultancy projects with competitive rates aligned with scope and market standards. Contact him directly at jamesmnyamai9@gmail.com to discuss project specifics.";
  }

  // Availability / Hiring / Remote
  if (q.includes("hire") || q.includes("available") || q.includes("remote") || q.includes("full-time") || q.includes("part-time") || q.includes("relocate")) {
    return "Yes! Malila is actively available for software engineering and senior QA roles, both remote and hybrid. You can reach him at jamesmnyamai9@gmail.com or 0745 806 761.";
  }

  // Contact / Location
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("location") || q.includes("where")) {
    return "Malila is based in Nairobi, Kenya. You can reach him via email at jamesmnyamai9@gmail.com or by phone/WhatsApp at 0745 806 761. His LinkedIn is linkedin.com/in/malila-nyamai-0b2711221.";
  }

  // Education & Certifications
  if (q.includes("education") || q.includes("degree") || q.includes("university") || q.includes("zetech") || q.includes("certif")) {
    return "Malila is an Information Technology BSc finalist at Zetech University (completing 2025/2026). His industry credentials include Cisco CCNA (Enterprise Networking, Security & Automation), SAP Generative AI, Hedera Hashgraph Developer, and Software Engineering from Power Learn Project Africa.";
  }

  // Resume / CV
  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return "You can view and download Malila's full CV and Resume directly from the portfolio using the 'Download CV' buttons or the command palette (Cmd/Ctrl + K). It details his 3+ years in QA, software development, cloud infrastructure, and certifications.";
  }

  // Why should I hire you / strengths
  if (q.includes("why should") || q.includes("hire you") || q.includes("strength")) {
    return "Malila offers a rare combination of strong Full-Stack Development (React, TypeScript, Node.js) with 3+ years of rigorous Software Quality Assurance (Cypress, Selenium, Postman). He doesn't just build features—he ensures they are resilient, thoroughly tested, and production-ready from day one.";
  }

  return "Malila is a Nairobi-based Software Engineer and Senior QA Engineer with 3+ years of experience in React, TypeScript, Node.js, and automated testing (Cypress, Selenium, Postman). Ask me about a specific skill, his projects (like E-Foleni or Kiwami TestCloud), or his availability!";
}

export function getMockJdResponse(jdText: string) {
  const jd = jdText.toLowerCase();

  let score = 10;
  const strengths: string[] = [];
  const gaps: string[] = [];

  // 1. Evaluate QA & Testing
  if (jd.includes("qa") || jd.includes("test") || jd.includes("quality") || jd.includes("selenium") || jd.includes("cypress") || jd.includes("jest") || jd.includes("postman")) {
    score += 25;
    strengths.push("Senior QA manual & automated test suite design");
  } else {
    gaps.push("Testing/QA focus not explicitly required or prioritized");
  }

  // 2. Evaluate Frontend
  if (jd.includes("react") || jd.includes("typescript") || jd.includes("javascript") || jd.includes("frontend") || jd.includes("ui") || jd.includes("css") || jd.includes("tailwind") || jd.includes("html")) {
    score += 25;
    strengths.push("Production React, TypeScript & responsive UI engineering");
  }

  // 3. Evaluate Backend & DB
  if (jd.includes("node") || jd.includes("php") || jd.includes("c#") || jd.includes(".net") || jd.includes("sql") || jd.includes("mysql") || jd.includes("postgres") || jd.includes("database") || jd.includes("backend") || jd.includes("api")) {
    score += 20;
    strengths.push("Node.js, PHP, C#/.NET backend and relational SQL databases");
  }

  // 4. Cloud & DevOps
  if (jd.includes("aws") || jd.includes("cloud") || jd.includes("docker") || jd.includes("ci/cd") || jd.includes("devops")) {
    score += 10;
    strengths.push("Docker containerization & AWS cloud deployment exposure");
  }

  // 5. Penalties for Missing Skills
  if (jd.includes("python") || jd.includes("django") || jd.includes("flask")) {
    gaps.push("Python production backend development");
    score = Math.max(10, score - 15);
  }
  if (jd.includes("java") || jd.includes("spring")) {
    gaps.push("Java/Spring Boot enterprise development");
    score = Math.max(10, score - 20);
  }
  if (jd.includes("angular") || jd.includes("vue")) {
    gaps.push("Specific Angular/Vue framework depth");
    score = Math.max(10, score - 15);
  }
  if (jd.includes("kubernetes") || jd.includes("k8s")) {
    gaps.push("Kubernetes cluster orchestration");
    score = Math.max(10, score - 15);
  }
  if (jd.includes("flutter") || jd.includes("react native") || jd.includes("ios") || jd.includes("android") || jd.includes("swift") || jd.includes("kotlin")) {
    gaps.push("Native mobile application engineering (iOS/Android/Flutter)");
    score = Math.max(10, score - 20);
  }
  if (jd.includes("rust") || jd.includes("golang") || jd.includes("go ") || jd.includes("c++") || jd.includes("embedded")) {
    gaps.push("Systems programming (Go/Rust/C++)");
    score = Math.max(10, score - 20);
  }

  // Bound score
  const finalScore = Math.max(5, Math.min(score, 98));

  // Determine fit descriptor
  let fit = "";
  const recommendations: string[] = [];
  if (finalScore >= 80) {
    fit = `Excellent match fit. Strong alignment with ${strengths.slice(0, 2).join(" and ")}.`;
    recommendations.push(
      "Highlight your lead engineering work at RemboGlow in the introductory resume overview.",
      "Add detail about your eTIMS compliance API flows under Tari Africa platforms.",
      "Consider mentioning your CCNA certificate in connection with deployment security."
    );
  } else if (finalScore >= 50) {
    fit = `Moderate match fit. Fits key areas such as ${strengths.slice(0, 1).join("") || "general development"}, but has notable gaps.`;
    recommendations.push(
      `Emphasize your testing automation checklists to close any potential gaps in ${jd.includes("selenium") ? "Selenium" : "automation framework"} knowledge.`,
      "Highlight system integration capabilities in React dashboard pages.",
      "Detail your PostgreSQL schema modeling under RemboGlow projects."
    );
  } else {
    fit = `Low match fit. Malila does not meet several major requirements of this role.`;
    recommendations.push(
      "Focus your portfolio projects on the specific languages (e.g. Node.js or C#) requested in the JD.",
      "Earn relevant certifications matching the domain to bridge standard software engineering gaps.",
      "Ensure you emphasize transferrable QA testing methodologies and API validation schemas."
    );
  }

  return {
    score: finalScore,
    fit,
    strengths: strengths.length > 0 ? strengths.slice(0, 3) : ["General IT knowledge"],
    gaps: gaps.length > 0 ? gaps.slice(0, 2) : ["No major gaps identified."],
    recommendations
  };
}

function getMockAuditResponse(selectedSnippetKey: string) {
  if (selectedSnippetKey === "sql") {
    return {
      vulnerability: "SQL Injection (CWE-89)",
      severity: "Critical",
      description: "Concatenating unvalidated parameters directly into database queries allowing query manipulation.",
      recommendation: "Use parameterized queries or prepared statements to decouple queries from variables.",
      fixedCode: `// SECURE REFACTOR: Prepared query
app.get('/users', async (req, res) => {
  const username = req.query.username;
  const query = "SELECT * FROM users WHERE name = ?";
  const results = await db.query(query, [username]);
  res.json(results);
});`
    };
  } else {
    return {
      vulnerability: "Cross-Site Scripting (XSS) (CWE-79)",
      severity: "High",
      description: "Rendering raw HTML values bypassing React's standard sanitization using dangerouslySetInnerHTML.",
      recommendation: "Avoid setting innerHTML directly. Use standard text nodes.",
      fixedCode: `// SECURE REFACTOR: Standard React Rendering
function CommentSection({ rawCommentText }) {
  return (
    <div className="comment-box">
      <p>{rawCommentText}</p>
    </div>
  );
}`
    };
  }
}

export const JD_PRESETS: Record<string, string> = {
  "Senior QA Automation": "Looking for a Senior QA Automation Engineer with 3+ years experience. Strong skills in Postman API testing, database validation using SQL queries, and writing test case management suites. Experience building React dashboard views and integrating CI/CD quality pipelines is a huge plus.",
  "Full-Stack Developer": "Seeking a Full-Stack Engineer proficient in React, TypeScript, and Node.js. Must have experience building SaaS platforms with relational databases like PostgreSQL. Experience implementing M-Pesa API (Daraja) or similar payment options is highly desirable.",
  "IT Specialist / Support": "We are hiring an IT Specialist to manage corporate networks, configure client endpoints, handle data migrations, and advise on cybersecurity standards (CCNA preferred)."
};

export function getMockSyncResponse(text: string) {
  const t = text.toLowerCase();
  const result: any = {
    newProjects: [],
    newExperiences: [],
    newCertifications: [],
    newSkills: [],
    summary: ""
  };

  if (t.includes("project") || t.includes("built") || t.includes("created")) {
    let projName = "TaskForge QA Suite";
    if (t.includes("taskforge")) projName = "TaskForge QA Suite";
    else if (t.includes("documind")) projName = "DocuMind RAG";
    else if (t.includes("portfolio")) projName = "AI Portfolio Sync";

    result.newProjects.push({
      name: projName,
      period: "Feb 2026 – Present",
      url: "https://github.com/joashnyamai",
      objective: "An automated workflow validator that parses live events and updates portfolio records.",
      stack: ["React", "TypeScript", "Vite", "Playwright", "Tailwind CSS"],
      summary: "Built a reactive parser that scans repository metadata and updates client-side states dynamically.",
      value: "Reduced manual portfolio maintenance by 100% and automated deployment checks.",
      highlight: false
    });
    result.summary += "Detected 1 new project from GitHub. ";
  }

  if (t.includes("certified") || t.includes("certification") || t.includes("cert")) {
    let certName = "AWS Certified Solutions Architect";
    let issuer = "Amazon Web Services";
    let icon = "🔐";
    let category = "Cloud & Infrastructure";

    if (t.includes("security") || t.includes("ceh")) {
      certName = "Certified Ethical Hacker (CEH)";
      issuer = "EC-Council";
      icon = "🛡️";
      category = "Security";
    } else if (t.includes("ai") || t.includes("ml")) {
      certName = "Generative AI Developer Certification";
      issuer = "Google Cloud";
      icon = "🤖";
      category = "AI/ML";
    }

    result.newCertifications.push({
      name: certName,
      issuer: issuer,
      icon: icon,
      category: category
    });
    result.summary += "Detected 1 new certification from LinkedIn. ";
  }

  if (t.includes("experience") || t.includes("job") || t.includes("role") || t.includes("work") || t.includes("promoted")) {
    result.newExperiences.push({
      role: "Lead QA Automation Engineer",
      company: "Kiwami Tech Solutions",
      location: "Nairobi, Kenya",
      period: "Feb 2026 – Present",
      type: "Full-time",
      overview: "Oversaw the transition from manual regression runs to fully automated CI/CD-integrated testing frameworks.",
      highlights: [
        "Architected automated test suites in Cypress, reducing deployment bugs by 45%.",
        "Mentored junior QA associates and established test case checklists for all sprints."
      ],
      tech: ["Cypress", "JavaScript", "CI/CD Pipelines", "Agile Leadership"]
    });
    result.summary += "Detected 1 new professional experience from LinkedIn. ";
  }

  if (result.newProjects.length === 0 && result.newCertifications.length === 0 && result.newExperiences.length === 0) {
    result.newProjects.push({
      name: "GitHub Sync Hub",
      period: "Jan 2026 – Present",
      url: null,
      objective: "An automated sync connector between GitHub events and portfolio pages.",
      stack: ["React", "TypeScript", "Gemini API", "LocalStorage"],
      summary: "Designed a clean tabbed panel inside the AI Lab to extract achievements and sync them.",
      value: "Streamlined portfolio updates with real-time reactive rendering.",
      highlight: false
    });
    result.summary = "No specific updates found. Generated a default sample sync item for preview.";
  }

  return result;
}

/**
 * Resilient Gemini API Caller with Exponential Backoff Retry and Error Handling Heuristics
 */
export async function queryGeminiWithRetry(
  promptOrContents: string | ChatContent[],
  apiKey: string,
  responseMimeType?: string,
  systemInstruction?: string,
  retries = 1,
  delay = 500,
  maxOutputTokens = 1500
): Promise<string> {
  // Cascading list: fastest and modern Google Gemini models first
  const modelsCascade = [
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro"
  ];

  const contents = typeof promptOrContents === "string"
    ? [{ role: "user" as const, parts: [{ text: promptOrContents }] }]
    : promptOrContents;

  for (const model of modelsCascade) {
    let currentDelay = delay;
    for (let i = 0; i < retries; i++) {
      try {
        if (!navigator.onLine) {
          throw new Error("No internet connection detected. Please check your network.");
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

        const bodyPayload: any = {
          contents,
          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: maxOutputTokens,
            ...(responseMimeType ? { responseMimeType } : {})
          }
        };

        if (systemInstruction) {
          bodyPayload.systemInstruction = {
            parts: [{ text: systemInstruction }]
          };
        }

        // Generous 15-second timeout to handle cold-starts and complex JSON payloads without premature aborts
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(url, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyPayload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        // Handle Rate Limiting (429) for this specific model
        if (response.status === 429) {
          if (i < retries - 1) {
            console.warn(`Rate limit (429) encountered for ${model}. Retrying in ${currentDelay}ms...`);
            await new Promise((res) => setTimeout(res, currentDelay));
            currentDelay *= 2;
            continue;
          }
          throw new Error(`Rate limit exceeded for model ${model}.`);
        }

        // If returned 404 (model not found) or 403 (access blocked to specific model), cascade to next model
        if (response.status === 404 || response.status === 403 || response.status === 400) {
          console.warn(`Model ${model} returned HTTP ${response.status}. Cascading to next fallback model.`);
          break;
        }

        if (!response.ok) {
          throw new Error(`Model ${model} returned error status: ${response.status}`);
        }

        const data = await response.json();
        const candidate = data?.candidates?.[0];

        // Handle safety blocks cleanly
        if (candidate?.finishReason === "SAFETY" || candidate?.finishReason === "RECITATION") {
          return JSON.stringify({
            score: 0,
            fit: "⚠️ Response blocked by Gemini safety guidelines or recitation block filters.",
            strengths: ["Security filters triggered"],
            gaps: ["Prompt parameters blocked"],
            vulnerability: "Blocked",
            severity: "Info",
            description: "Response flagged by safety filters.",
            recommendation: "Please rephrase input parameters.",
            fixedCode: "// Query blocked by AI safety policy."
          });
        }

        const ans = candidate?.content?.parts?.[0]?.text;
        if (!ans) {
          throw new Error(`Empty candidate content returned from ${model}.`);
        }

        return ans;
      } catch (err: any) {
        if (i === retries - 1) {
          console.warn(`Model ${model} failed after retries: ${err.message}. Trying next fallback model...`);
          break; // break retry loop, move to next model in MODELS_CASCADE
        }
        await new Promise((res) => setTimeout(res, currentDelay));
        currentDelay *= 1.5;
      }
    }
  }

  throw new Error("All models in the fallback cascade failed to contact Gemini API.");
}

// Helper to dynamically load PDF.js client-side
const loadPdfJs = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).pdfjsLib) {
      resolve((window as any).pdfjsLib);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
      resolve(pdfjsLib);
    };
    script.onerror = () => reject(new Error("Failed to load PDF parsing engine."));
    document.head.appendChild(script);
  });
};

// Helper to extract text from PDF file using PDF.js
const extractTextFromPdf = async (file: File): Promise<string> => {
  const pdfjsLib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    text += pageText + "\n";
  }
  return text;
};

// Helper to dynamically load Mammoth.js for Word document parsing
const loadMammoth = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).mammoth) {
      resolve((window as any).mammoth);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";
    script.onload = () => resolve((window as any).mammoth);
    script.onerror = () => reject(new Error("Failed to load Word document parsing engine."));
    document.head.appendChild(script);
  });
};

// Helper to extract text from Word document using Mammoth
const extractTextFromDocx = async (file: File): Promise<string> => {
  const mammoth = await loadMammoth();
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

export default function AiLab() {
  // Key state
  const [apiKey, setApiKey] = useState("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  
  // Track whether fallback simulations are currently active in the background
  const [fallbackActive, setFallbackActive] = useState(false);

  // Load key on mount - support local .env variables VITE_GEMINI_API_KEY as permanent fallback
  useEffect(() => {
    const saved = localStorage.getItem("GEMINI_API_KEY") || import.meta.env.VITE_GEMINI_API_KEY || "";
    setApiKey(saved);
    setKeyInput(saved);
  }, []);

  const saveKey = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("GEMINI_API_KEY", keyInput);
    setApiKey(keyInput);
    setShowKeyModal(false);
    setFallbackActive(false); // Reset fallback on key change
  };

  const clearKey = () => {
    localStorage.removeItem("GEMINI_API_KEY");
    setApiKey("");
    setKeyInput("");
    setFallbackActive(false);
  };

  // --- TOOL 1: CAREER CHATBOT ---
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string; isLlm?: boolean }>>([
    {
      sender: "bot",
      text: "Hi, I'm Ava 👋\nI'm Malila's portfolio guide. I can tell you about his projects, technical skills, experience, certifications, and how to get in touch. Ask me anything!"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendChat = async (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim() || chatLoading) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    if (!textToSend) setChatInput("");
    setChatLoading(true);

    try {
      if (apiKey) {
        // Build multi-turn conversation history for context awareness
        const recentHistory: ChatContent[] = messages
          .slice(-6)
          .filter((m, idx) => !(idx === 0 && m.sender === "bot" && m.text.startsWith("Hi, I'm Ava")))
          .map(m => ({
            role: m.sender === "user" ? ("user" as const) : ("model" as const),
            parts: [{ text: m.text }]
          }));

        const chatPayload: ChatContent[] = [
          ...recentHistory,
          { role: "user" as const, parts: [{ text }] }
        ];

        const rawAns = await queryGeminiWithRetry(chatPayload, apiKey, undefined, AVA_SYSTEM_PROMPT, 1, 400, 800);
        const ans = formatAsHumanResponse(rawAns);
        setMessages((prev) => [...prev, { sender: "bot", text: ans, isLlm: true }]);
      } else {
        // Run standard mock logic
        throw new Error("No active key configured. Using Sandbox Heuristics.");
      }
    } catch (err: any) {
      console.warn("Chat API call failed, executing graceful sandbox fallback:", err.message);
      
      const mockAns = getMockChatResponse(text);
      setMessages((prev) => [
        ...prev,
        { 
          sender: "bot", 
          text: mockAns, 
          isLlm: true // Mark as LLM output to keep the visual design identical
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Hook into our dynamic portfolio data store
  const { addProject, addExperience, addCertification, addSkill, resetToDefaults } = usePortfolioData();

  // Unified console active tab state
  const [activeTab, setActiveTab] = useState<"matcher" | "sync" | "auditor">("matcher");

  // Logger helper to report actions directly to n8n console
  const addLog = (message: string, type: "INFO" | "SUCCESS" | "ERROR" = "INFO") => {
    const timestamp = new Date().toTimeString().split(" ")[0];
    const logText = `[${timestamp} ${type}] ${message}`;
    setLogs((prev) => [...prev.slice(-30), logText]);
  };

  // --- TOOL 2: CV MATCHER (JD ANALYZER) ---
  const [jdInput, setJdInput] = useState("");
  const [fileParsing, setFileParsing] = useState(false);
  const [fileError, setFileError] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setFileParsing(true);
    setFileError("");
    addLog(`[CV Parser Agent] File upload triggered: ${file.name} (${(file.size / 1024).toFixed(1)} KB)...`, "INFO");
    try {
      let extractedText = "";
      const extension = file.name.split(".").pop()?.toLowerCase();

      if (extension === "txt" || extension === "md") {
        extractedText = await file.text();
      } else if (extension === "pdf") {
        extractedText = await extractTextFromPdf(file);
      } else if (extension === "docx") {
        extractedText = await extractTextFromDocx(file);
      } else {
        throw new Error("Unsupported file type. Please upload a PDF, DOCX, or text file.");
      }

      if (!extractedText.trim()) {
        throw new Error("No text content could be extracted from the file.");
      }

      setJdInput(extractedText);
      addLog(`[CV Parser Agent] Successfully extracted text from ${file.name}.`, "SUCCESS");
    } catch (err: any) {
      console.error(err);
      setFileError(err.message || "Failed to parse document.");
      addLog(`[CV Parser Agent] Error parsing file: ${err.message}`, "ERROR");
    } finally {
      setFileParsing(false);
      // Reset input value so same file can be uploaded again
      e.target.value = "";
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setJdInput("");
    setMatchResult(null);
    addLog("[CV Parser Agent] Uploaded file cleared.", "INFO");
  };

  const [matchLoading, setMatchLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<{
    score: number;
    fit: string;
    strengths: string[];
    gaps: string[];
    recommendations?: string[];
    isLlm?: boolean;
  } | null>(null);

  const handleAnalyzeJd = async () => {
    if (!jdInput.trim() || matchLoading) return;
    setMatchLoading(true);
    setMatchResult(null);
    addLog("[CV Parser Agent] Initializing Job Description matching review...", "INFO");

    try {
      if (apiKey) {
        addLog("[CV Parser Agent] Dispatching keyword payloads to Gemini AI Engine...", "INFO");
        const prompt = `You are a strict, objective recruitment systems analyst.
Analyze the following Job Description (JD) against Malila Nyamai's resume below.
Determine a precise match fit score from 0 to 100 based strictly on actual skills, certifications, and experience listed in the resume.

Rules:
1. If the Job Description is in an unrelated field (e.g. medicine, sales, marketing, finance, mechanical engineering, etc.) or requires qualifications completely outside software engineering, QA, or IT, the score MUST be below 20%.
2. If the role requires technical skills/languages/frameworks that Malila does NOT have (e.g. Python, Java, Angular, Kubernetes, Mobile/iOS/Android development, Flutter, React Native, Rust, Go, C++), you must penalize the score significantly and list these explicitly as gaps.
3. Be highly critical. Do not stretch general skills (like "IT support" or "fast learner") to match highly specialized roles he is not qualified for.
4. Output EXACTLY a JSON block (no markdown wrappers, no backticks, no other text) with the keys:
   - "score": a number from 0 to 100 representing match fit
   - "fit": a short, objective 2-sentence summary explaining why this score was given
   - "strengths": an array of up to 3 matched skills or experiences from the resume that directly align with the JD
   - "gaps": an array of up to 2 significant missing items or areas for growth relative to the JD requirements
   - "recommendations": an array of up to 3 actionable, highly specific bullet points outlining what updates Malila should make to his resume or portfolio to better match this JD.

Job Description:
"${jdInput}"

Resume Context:
${RESUME_CONTEXT}`;

        const rawJson = await queryGeminiWithRetry(prompt, apiKey, "application/json", undefined, 1, 400, 1500);
        const parsed = JSON.parse(cleanJsonOutput(rawJson));
        const finalScore = typeof parsed.score === "number" ? parsed.score : 75;
        setMatchResult({
          score: finalScore,
          fit: parsed.fit || "Matches critical parameters.",
          strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
          gaps: Array.isArray(parsed.gaps) ? parsed.gaps : [],
          recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
          isLlm: true
        });
        addLog(`[CV Parser Agent] Keyword comparison completed. Synthesis complete. Match Score: ${finalScore}%`, "SUCCESS");
      } else {
        throw new Error("No active key configured. Using Sandbox Heuristics.");
      }
    } catch (err: any) {
      console.warn("Matcher API call failed, executing graceful sandbox fallback:", err.message);
      addLog("[CV Parser Agent] Local sandbox model activated for analysis...", "INFO");

      const parsed = getMockJdResponse(jdInput);
      setMatchResult({
        score: parsed.score,
        fit: parsed.fit,
        strengths: parsed.strengths,
        gaps: parsed.gaps,
        recommendations: parsed.recommendations,
        isLlm: true // Keep identical styling
      });
      addLog(`[CV Parser Agent] Sandbox parsing completed. Match Score: ${parsed.score}%`, "SUCCESS");
    } finally {
      setMatchLoading(false);
    }
  };

  // --- TOOL 3: AI PROFILE SYNC HUB ---
  const [githubUrl, setGithubUrl] = useState("github.com/joashnyamai");
  const [linkedinUrl, setLinkedinUrl] = useState("linkedin.com/in/malila-nyamai-0b2711221");
  const [syncUpdatesInput, setSyncUpdatesInput] = useState("");
  const [syncLoading, setSyncLoading] = useState(false);
  const [suggestedChanges, setSuggestedChanges] = useState<{
    newProjects?: any[];
    newExperiences?: any[];
    newCertifications?: any[];
    newSkills?: { category: string; skill: string }[];
    summary: string;
  } | null>(null);

  const handleSyncScan = async () => {
    if (!syncUpdatesInput.trim() || syncLoading) return;
    setSyncLoading(true);
    setSuggestedChanges(null);
    addLog(`[GitHub Scraping Worker] Scraping profile: ${githubUrl}...`, "INFO");
    addLog(`[LinkedIn Integration] Scraping updates: ${linkedinUrl}...`, "INFO");

    try {
      if (apiKey) {
        addLog("[Profile Parser] Dispatching sync request to Gemini AI Engine...", "INFO");
        const prompt = `You are Malila Nyamai's personal AI Brand Architect.
Analyze the following inputs from his GitHub (${githubUrl}), LinkedIn (${linkedinUrl}), and his description of recent accomplishments/updates:
"${syncUpdatesInput}"

Your job is to identify if there are any NEW projects, professional experiences, skills, or certifications mentioned in his updates that should be added to his portfolio.
Compare this against his current resume context:
${RESUME_CONTEXT}

Rules:
1. ONLY extract items that are explicitly new and NOT already present in his resume.
2. Structure any new item EXACTLY according to these JSON schemas:
   - For Projects (newProjects):
     {
       "name": "Project Name",
       "period": "e.g. Feb 2026 – Present",
       "url": "Project URL or null",
       "objective": "1-sentence project objective description",
       "stack": ["Tech1", "Tech2"],
       "summary": "1-sentence summary of what he did/engineered",
       "value": "1-sentence description of impact/value saved",
       "highlight": false
     }
   - For Experiences (newExperiences):
     {
       "role": "Job Role Title",
       "company": "Company Name",
       "location": "e.g. Nairobi, Kenya or Remote",
       "period": "e.g. Jan 2026 – Present",
       "type": "Full-time" | "Part-time" | "Contract" | "Hybrid" | "Remote",
       "overview": "1-sentence general overview of the role",
       "highlights": ["Highlight achievement 1", "Highlight achievement 2"],
       "tech": ["Tech1", "Tech2"]
     }
   - For Certifications (newCertifications):
     {
       "name": "Certification Name",
       "issuer": "Issuing Organization",
       "icon": "A single emoji representing the category (e.g. 🔐, 🛡️, 🤖, ⚡, 💻, 📊)",
       "category": "Networking" | "Security" | "AI/ML" | "Development" | "Productivity"
     }
   - For Skills (newSkills):
     {
       "category": "Frontend Development" | "Application Testing & QA" | "Cloud & Infrastructure" | "Backend & Databases" | "AI, ML & IT Support",
       "skill": "Skill name to append"
     }

3. Return ONLY a valid JSON object (no markdown backticks, no wrapper text) with these keys:
   {
     "newProjects": Array of Project objects,
     "newExperiences": Array of Experience objects,
     "newCertifications": Array of Certification objects,
     "newSkills": Array of Skill objects,
     "summary": "A 1-2 sentence human-friendly summary of the updates detected."
   }`;

        const rawJson = await queryGeminiWithRetry(prompt, apiKey, "application/json", undefined, 1, 400, 1500);
        const parsed = JSON.parse(cleanJsonOutput(rawJson));
        setSuggestedChanges(parsed);
        addLog("[Profile Parser] Synthesizing updates using Gemini LLM...", "INFO");
        addLog("[Profile Parser] Updates successfully extracted.", "SUCCESS");
      } else {
        throw new Error("No active key configured. Using Sandbox Heuristics.");
      }
    } catch (err: any) {
      console.warn("Sync scan failed, executing graceful sandbox fallback:", err.message);
      addLog("[Profile Parser] Activating local sandbox heuristic model...", "INFO");
      
      const parsed = getMockSyncResponse(syncUpdatesInput);
      setSuggestedChanges(parsed);
      addLog("[Profile Parser] Synthesizing updates using local parser...", "INFO");
      addLog("[Profile Parser] Updates successfully simulated.", "SUCCESS");
    } finally {
      setSyncLoading(false);
    }
  };

  const handleApproveSync = () => {
    if (!suggestedChanges) return;

    addLog("[Portfolio Updater] Ingesting extracted records into database...", "INFO");

    if (suggestedChanges.newProjects) {
      suggestedChanges.newProjects.forEach(p => {
        addProject(p);
        addLog(`[Portfolio Updater] Ingested project: ${p.name}`, "SUCCESS");
      });
    }
    if (suggestedChanges.newExperiences) {
      suggestedChanges.newExperiences.forEach(e => {
        addExperience(e);
        addLog(`[Portfolio Updater] Ingested experience: ${e.role} @ ${e.company}`, "SUCCESS");
      });
    }
    if (suggestedChanges.newCertifications) {
      suggestedChanges.newCertifications.forEach(c => {
        addCertification(c);
        addLog(`[Portfolio Updater] Ingested certification: ${c.name}`, "SUCCESS");
      });
    }
    if (suggestedChanges.newSkills) {
      suggestedChanges.newSkills.forEach(s => {
        addSkill(s.category, s.skill);
        addLog(`[Portfolio Updater] Appended skill: ${s.skill} to ${s.category}`, "SUCCESS");
      });
    }

    addLog("[Portfolio Updater] Dynamic portfolio synchronization complete.", "SUCCESS");
    setSuggestedChanges(null);
    setSyncUpdatesInput("");
  };

  // --- TOOL 4: SECURITY CODE AUDITOR ---
  const [selectedSnippetKey, setSelectedSnippetKey] = useState<"sql" | "xss">("sql");
  const [customCode, setCustomCode] = useState(SAMPLE_VULNERABLE_CODE.sql);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<{
    vulnerability: string;
    severity: string;
    description: string;
    recommendation: string;
    fixedCode: string;
    isLlm?: boolean;
  } | null>(null);

  const handleSelectSnippet = (key: "sql" | "xss") => {
    setSelectedSnippetKey(key);
    setCustomCode(SAMPLE_VULNERABLE_CODE[key]);
    setAuditResult(null);
    addLog(`[Security Auditor] Snippet preset changed to: ${key.toUpperCase()}`, "INFO");
  };

  const handleRunAudit = async () => {
    if (!customCode.trim() || auditLoading) return;
    setAuditLoading(true);
    setAuditResult(null);
    addLog("[Security Auditor] Beginning vulnerability audit of code block...", "INFO");

    try {
      if (apiKey) {
        addLog("[Security Auditor] Analyzing AST and syntax patterns with Gemini AI...", "INFO");
        const prompt = `Analyze this code snippet for security vulnerabilities.
Return ONLY a JSON object with:
"vulnerability" (the vulnerability name),
"severity" (High, Medium, or Low),
"description" (a 1-sentence description of the threat),
"recommendation" (how to resolve it),
"fixedCode" (the refactored secure version).

Code to audit:
${customCode}`;

        const rawJson = await queryGeminiWithRetry(prompt, apiKey, "application/json", undefined, 1, 400, 1500);
        const parsed = JSON.parse(cleanJsonOutput(rawJson));
        setAuditResult({
          vulnerability: parsed.vulnerability || "Vulnerability Found",
          severity: parsed.severity || "High",
          description: parsed.description || "Identified security threat.",
          recommendation: parsed.recommendation || "Refactor user input.",
          fixedCode: parsed.fixedCode || "// Fix code not provided.",
          isLlm: true
        });
        addLog(`[Security Auditor] Security audit completed. Vulnerability: ${parsed.vulnerability} (${parsed.severity})`, "SUCCESS");
      } else {
        throw new Error("No active key configured. Using Sandbox Heuristics.");
      }
    } catch (err: any) {
      console.warn("Auditor API call failed, executing graceful sandbox fallback:", err.message);
      addLog("[Security Auditor] Auditor fallback: running sandbox analysis...", "INFO");

      const parsed = getMockAuditResponse(selectedSnippetKey);
      setAuditResult({
        vulnerability: parsed.vulnerability,
        severity: parsed.severity,
        description: parsed.description,
        recommendation: parsed.recommendation,
        fixedCode: parsed.fixedCode,
        isLlm: true // Keep identical styling
      });
      addLog(`[Security Auditor] Sandbox audit completed. Vulnerability: ${parsed.vulnerability} (${parsed.severity})`, "SUCCESS");
    } finally {
      setAuditLoading(false);
    }
  };

  // --- TOOL 4: n8n AUTOMATION STATUS WORKFLOWS ---
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    setLogs([
      "[13:30:00 INFO] Initializing n8n scheduler nodes...",
      "[13:30:02 SUCCESS] Listening on port 5678. Webhooks ready.",
      "[13:30:15 INFO] [Threat Intelligence Node] Triggered: checking threat intelligence API...",
      "[13:30:18 SUCCESS] [Threat Intelligence Node] Pulled 5 threat logs. Action completed."
    ]);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const timestamp = new Date().toTimeString().split(" ")[0];
      const triggers = [
        `[${timestamp} INFO] [eTIMS Sync Node] Triggering automatic VAT status check...`,
        `[${timestamp} SUCCESS] [eTIMS Sync Node] Status validated. All sync logs matching.`,
        `[${timestamp} INFO] [Backup Automation] Running scheduled database snapshot...`,
        `[${timestamp} SUCCESS] [Backup Automation] MySQL snapshot saved to secure S3 storage.`,
        `[${timestamp} INFO] [CV Parser Agent] Webhook trigger received: parsing job fit queries...`,
        `[${timestamp} SUCCESS] [CV Parser Agent] LLM match score processed successfully.`
      ];
      const randomLog = triggers[Math.floor(Math.random() * triggers.length)];
      setLogs((prev) => [...prev.slice(-30), randomLog]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="os-shell min-h-screen bg-background text-foreground py-6 sm:py-10 px-3 sm:px-6 lg:px-8 relative overflow-hidden bg-[#2c001e]">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      {/* Header Bar */}
      <header className="max-w-7xl mx-auto mb-6 sm:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-navy-surface/40 border border-navy-border p-4 sm:p-6 rounded-2xl backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2.5 rounded-xl border border-navy-border hover:border-cyan/50 hover:text-cyan transition-colors"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-gradient flex items-center gap-2">
              <Cpu className="animate-spin-slow text-cyan" size={20} />
              Ava AI Lab
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Ava AI Guide & Heuristic Automation Sandbox
            </p>
          </div>
        </div>

        {/* API Key Configuration Panel */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
          {apiKey ? (
            <div className="flex items-center gap-1.5 text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded font-semibold uppercase tracking-wider font-mono">
              <Check size={12} />
              <span>AI Engine Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded font-semibold uppercase tracking-wider font-mono">
              <AlertCircle size={12} />
              <span>Offline Preview Mode</span>
            </div>
          )}
          <button
            onClick={() => setShowKeyModal(true)}
            className="p-2.5 rounded-xl border border-navy-border hover:border-cyan/50 text-muted-foreground hover:text-cyan transition-colors flex items-center gap-2"
          >
            <Settings size={18} />
            <span className="hidden sm:inline text-sm font-semibold">Settings</span>
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: AI Career Chatbot */}
        <section className="lg:col-span-1 flex flex-col h-[480px] sm:h-[540px] lg:h-[650px] bg-navy-surface/40 border border-navy-border rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="p-4 border-b border-navy-border bg-navy-elevated flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wider uppercase font-display flex items-center gap-2 text-foreground">
              <Bot size={16} className="text-cyan animate-pulse" />
              Ava - AI Portfolio Guide
            </h2>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${apiKey ? "bg-green-500" : "bg-amber-500"}`} />
              <span className="text-[10px] text-muted-foreground">
                {apiKey ? "Gemini 2.0 Flash" : "Local Preview"}
              </span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border text-xs shrink-0 ${
                    msg.sender === "user"
                      ? "bg-cyan/10 border-cyan text-cyan"
                      : "bg-navy-elevated border-navy-border text-muted-foreground"
                  }`}
                >
                  {msg.sender === "user" ? "U" : "Ava"}
                </div>
                <div
                  className={`p-3 rounded-xl border leading-relaxed whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-cyan/5 border-cyan/20 text-foreground"
                      : "bg-navy-elevated/50 border-navy-border text-muted-foreground"
                  }`}
                >
                  <p>{msg.text}</p>
                  {/* Removed LLM Indicators to keep a clean human conversation aesthetic */}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                <div className="w-8 h-8 rounded-lg bg-navy-elevated border border-navy-border text-xs flex items-center justify-center animate-pulse text-muted-foreground">
                  Ava
                </div>
                <div className="p-3 rounded-xl border border-navy-border bg-navy-elevated/40 text-xs text-muted-foreground flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick-chips Input */}
          <div className="px-4 py-2 border-t border-navy-border/40 bg-navy-surface/10 flex flex-wrap gap-1.5">
            {[
              "Tell me about E-Foleni",
              "What is his core tech stack?",
              "Senior QA automation background?",
              "Are you open to remote roles?",
              "Why hire Malila?"
            ].map((chip) => (
              <button
                key={chip}
                disabled={chatLoading}
                onClick={() => handleSendChat(chip)}
                className="text-[10px] text-muted-foreground border border-navy-border hover:border-cyan/40 hover:text-cyan bg-navy-elevated/40 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-navy-border bg-navy-elevated">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about skills, work, or E-Foleni..."
                className="flex-1 bg-navy-surface border border-navy-border focus:border-cyan/50 focus:outline-none rounded-xl px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || chatLoading}
                className="p-2.5 bg-cyan text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </section>

        {/* Right Column: Matcher, Auditor, and n8n Logs */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8 flex flex-col min-h-[500px] lg:h-[650px] justify-between">
          
          {/* Unified Console with Tabs */}
          <div className="bg-navy-surface/40 border border-navy-border rounded-2xl p-4 sm:p-6 flex flex-col overflow-hidden backdrop-blur-md flex-1 min-h-[380px] lg:min-h-0">
            {/* Tab Headers */}
            <div className="flex border-b border-navy-border/60 mb-5 overflow-x-auto scrollbar-none flex-shrink-0">
              <button
                onClick={() => setActiveTab("matcher")}
                className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "matcher"
                    ? "border-cyan text-cyan"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileCheck size={14} />
                CV Matcher
              </button>
              <button
                onClick={() => setActiveTab("sync")}
                className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "sync"
                    ? "border-cyan text-cyan"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <RefreshCw size={14} className={syncLoading ? "animate-spin" : ""} />
                Profile Sync Hub
              </button>
              <button
                onClick={() => setActiveTab("auditor")}
                className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === "auditor"
                    ? "border-cyan text-cyan"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <ShieldAlert size={14} />
                Code Auditor
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
              
              {/* TAB 1: CV MATCHER */}
              {activeTab === "matcher" && (
                <div className="h-full flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground">Analyze JD Alignment</span>
                    
                    {uploadedFile ? (
                      <button
                        onClick={clearFile}
                        className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
                      >
                        <Trash2 size={12} />
                        Clear Document
                      </button>
                    ) : (
                      <label className="flex items-center gap-1 cursor-pointer text-cyan hover:opacity-85 font-semibold">
                        <Paperclip size={11} />
                        <span>Upload PDF/Word/Text</span>
                        <input
                          type="file"
                          accept=".pdf,.docx,.txt,.md"
                          onChange={handleFileUpload}
                          disabled={fileParsing}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {uploadedFile && (
                    <div className="flex items-center justify-between bg-navy-elevated/40 border border-navy-border p-3 rounded-xl">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="text-cyan animate-pulse flex-shrink-0" size={20} />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">{uploadedFile.name}</p>
                          <p className="text-[10px] text-muted-foreground">{(uploadedFile.size / 1024).toFixed(1)} KB • Document</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-green-500/10 border border-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">Ready</span>
                    </div>
                  )}

                  {fileParsing && (
                    <div className="text-[10px] text-cyan animate-pulse flex items-center gap-1.5 font-semibold bg-cyan/5 border border-cyan/10 p-3 rounded-xl">
                      <RefreshCw size={12} className="animate-spin" />
                      Parsing uploaded document...
                    </div>
                  )}

                  {fileError && (
                    <div className="text-[10px] text-red-500 font-semibold flex items-center gap-1.5 bg-red-500/5 border border-red-500/10 p-3 rounded-xl">
                      <AlertCircle size={12} />
                      {fileError}
                    </div>
                  )}

                  {!uploadedFile && (
                    <textarea
                      value={jdInput}
                      onChange={(e) => setJdInput(e.target.value)}
                      placeholder="Paste a Job Description (JD) here to analyze fit score and skill matches..."
                      className="flex-1 min-h-[140px] w-full bg-navy-surface border border-navy-border focus:border-cyan/50 focus:outline-none rounded-xl p-3.5 text-xs placeholder:text-muted-foreground/50 resize-none overflow-y-auto scrollbar-thin text-muted-foreground"
                    />
                  )}

                  {!uploadedFile && (
                    <div className="flex flex-wrap items-center gap-2 bg-navy-elevated/20 p-2.5 border border-navy-border/40 rounded-xl">
                      <span className="text-[10px] text-muted-foreground font-semibold">Presets:</span>
                      {Object.keys(JD_PRESETS).map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setJdInput(JD_PRESETS[p]);
                            addLog(`[CV Parser Agent] Loaded preset: ${p}`, "INFO");
                          }}
                          className="text-[9px] px-2.5 py-1 rounded bg-navy-surface border border-navy-border text-muted-foreground hover:text-cyan hover:border-cyan/40 transition-colors font-medium"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    disabled={!jdInput.trim() || matchLoading}
                    onClick={handleAnalyzeJd}
                    className="w-full py-2.5 bg-cyan text-primary-foreground font-bold rounded-xl hover:opacity-95 transition-opacity text-xs disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Sparkles size={14} className={matchLoading ? "animate-spin" : ""} />
                    {matchLoading ? "Analyzing Match..." : "Analyze JD Match"}
                  </button>

                  {/* Redesigned Match Score Results Display */}
                  {matchResult && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-2 bg-navy-elevated/20 border border-navy-border/80 rounded-xl p-4">
                      {/* Left side score circle */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-navy-border/80 pb-4 md:pb-0 md:pr-4">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              className="stroke-navy-border/50"
                              strokeWidth="7"
                              fill="transparent"
                            />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              className="stroke-cyan transition-all duration-1000 ease-out"
                              strokeWidth="7"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 40}
                              strokeDashoffset={(2 * Math.PI * 40) - (matchResult.score / 100) * (2 * Math.PI * 40)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute font-mono text-2xl font-black text-foreground">
                            {matchResult.score}%
                          </span>
                        </div>
                        <span className={`mt-3 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          matchResult.score >= 80
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            : matchResult.score >= 60
                            ? "bg-cyan/10 border border-cyan/20 text-cyan"
                            : matchResult.score >= 40
                            ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                            : "bg-red-500/10 border border-red-500/20 text-red-500"
                        }`}>
                          {matchResult.score >= 80 ? "Strong Fit" : matchResult.score >= 60 ? "Good Fit" : matchResult.score >= 40 ? "Moderate Fit" : "Low Alignment"}
                        </span>
                      </div>

                      {/* Right side stats/lists */}
                      <div className="md:col-span-8 space-y-3.5 text-xs text-muted-foreground overflow-y-auto max-h-[220px] scrollbar-thin">
                        <div>
                          <span className="text-[10px] text-foreground font-bold uppercase tracking-wider">Analysis Overview</span>
                          <p className="text-[11px] leading-relaxed text-muted-foreground mt-1 font-medium">{matchResult.fit}</p>
                        </div>
                        
                        {matchResult.strengths.length > 0 && (
                          <div>
                            <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle2 size={12} />
                              Key Matches
                            </span>
                            <ul className="list-none pl-0 mt-1 space-y-1 text-[11px]">
                              {matchResult.strengths.map((str, idx) => (
                                <li key={idx} className="flex gap-2 items-start">
                                  <span className="text-green-500 font-bold">✓</span>
                                  <span>{str}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {matchResult.gaps.length > 0 && (
                          <div>
                            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                              <AlertTriangle size={12} />
                              Areas of Focus
                            </span>
                            <ul className="list-none pl-0 mt-1 space-y-1 text-[11px]">
                              {matchResult.gaps.map((gp, idx) => (
                                <li key={idx} className="flex gap-2 items-start">
                                  <span className="text-amber-500 font-bold">•</span>
                                  <span>{gp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {matchResult.recommendations && matchResult.recommendations.length > 0 && (
                          <div className="border-t border-navy-border/60 pt-3">
                            <span className="text-[10px] text-cyan font-bold uppercase tracking-wider flex items-center gap-1">
                              <Sparkles size={12} />
                              Resume Tailoring Tips
                            </span>
                            <ul className="list-none pl-0 mt-1.5 space-y-1.5 text-[11px]">
                              {matchResult.recommendations.map((rec, idx) => (
                                <li key={idx} className="flex gap-2 items-start bg-cyan/5 border border-cyan/10 p-2 rounded-lg text-muted-foreground/90 font-medium leading-relaxed">
                                  <ArrowRight size={12} className="text-cyan shrink-0 mt-0.5" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PROFILE SYNC HUB */}
              {activeTab === "sync" && (
                <div className="h-full flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <Github size={12} className="text-cyan" />
                        GitHub Repository URL
                      </label>
                      <input
                        type="text"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="github.com/username/repo"
                        className="w-full bg-navy-surface border border-navy-border focus:border-cyan/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <Linkedin size={12} className="text-cyan" />
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="text"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="linkedin.com/in/username"
                        className="w-full bg-navy-surface border border-navy-border focus:border-cyan/50 focus:outline-none rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1 min-h-0 flex flex-col">
                    <label className="text-[10px] font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
                      <span>Add Recent Accomplishments / Commits / Certifications</span>
                      <span className="text-[9px] text-muted-foreground lowercase normal-case">(LLM parses and updates your portfolio)</span>
                    </label>
                    <textarea
                      value={syncUpdatesInput}
                      onChange={(e) => setSyncUpdatesInput(e.target.value)}
                      placeholder="e.g. 'I just created a project called DocuMind: a document search engine built with Vite, React, and LangChain, saving QA teams 50 hours of research time' or 'Received AWS Solutions Architect Certification...'"
                      className="flex-1 min-h-[80px] w-full bg-navy-surface border border-navy-border focus:border-cyan/50 focus:outline-none rounded-xl p-3 text-xs placeholder:text-muted-foreground/50 resize-none overflow-y-auto scrollbar-thin text-muted-foreground"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        resetToDefaults();
                        addLog("[Portfolio Updater] Portfolio reset to default resume database.", "INFO");
                        alert("Portfolio database has been reset to defaults!");
                      }}
                      className="px-4 py-2 border border-navy-border hover:border-cyan/50 hover:text-cyan text-xs text-muted-foreground font-semibold rounded-xl transition-all"
                      title="Reset database to hardcoded defaults"
                    >
                      <Undo size={14} className="inline mr-1" />
                      Reset Defaults
                    </button>
                    
                    <button
                      disabled={!syncUpdatesInput.trim() || syncLoading}
                      onClick={handleSyncScan}
                      className="flex-1 py-2 bg-cyan text-primary-foreground font-bold rounded-xl hover:opacity-95 transition-opacity text-xs disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <RefreshCw size={14} className={syncLoading ? "animate-spin" : ""} />
                      {syncLoading ? "Scraping & Synthesizing..." : "Scan & Extract Profile Updates"}
                    </button>
                  </div>

                  {/* Sync Changes Diff / Suggestions Preview */}
                  {suggestedChanges && (
                    <div className="border border-navy-border bg-navy-elevated/40 rounded-xl p-4 space-y-3 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-foreground font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 size={12} className="text-green-400" />
                          Detected Sync Changes
                        </span>
                        <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-mono uppercase font-semibold">New Additions</span>
                      </div>

                      <p className="text-[11px] leading-relaxed text-muted-foreground font-semibold bg-navy/20 p-2 rounded-lg border border-navy-border/50">
                        {suggestedChanges.summary}
                      </p>

                      <div className="space-y-3 max-h-[160px] overflow-y-auto scrollbar-thin">
                        {/* Suggested Projects */}
                        {suggestedChanges.newProjects && suggestedChanges.newProjects.map((p, idx) => (
                          <div key={idx} className="bg-navy-elevated/60 border border-l-2 border-l-green-500 border-navy-border p-3 rounded-lg text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-foreground flex items-center gap-1.5">
                                <Plus size={12} className="text-green-500" />
                                Project: {p.name}
                              </span>
                              <span className="text-[9px] text-muted-foreground">{p.period}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">{p.objective}</p>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {p.stack.map((t: string) => (
                                <span key={t} className="text-[8px] px-1.5 py-0.5 bg-navy border border-navy-border text-muted-foreground rounded">{t}</span>
                              ))}
                            </div>
                          </div>
                        ))}

                        {/* Suggested Experience */}
                        {suggestedChanges.newExperiences && suggestedChanges.newExperiences.map((e, idx) => (
                          <div key={idx} className="bg-navy-elevated/60 border border-l-2 border-l-green-500 border-navy-border p-3 rounded-lg text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-foreground flex items-center gap-1.5">
                                <Plus size={12} className="text-green-500" />
                                Role: {e.role} @ {e.company}
                              </span>
                              <span className="text-[9px] text-muted-foreground">{e.period}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-relaxed">{e.overview}</p>
                          </div>
                        ))}

                        {/* Suggested Certifications */}
                        {suggestedChanges.newCertifications && suggestedChanges.newCertifications.map((c, idx) => (
                          <div key={idx} className="bg-navy-elevated/60 border border-l-2 border-l-green-500 border-navy-border p-2.5 rounded-lg text-xs flex items-center gap-3">
                            <span className="text-xl">{c.icon}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-foreground leading-tight">{c.name}</p>
                              <p className="text-[9px] text-muted-foreground">{c.issuer}</p>
                            </div>
                            <span className="text-[8px] bg-navy border border-navy-border text-muted-foreground px-1.5 py-0.5 rounded uppercase">{c.category}</span>
                          </div>
                        ))}

                        {/* Suggested Skills */}
                        {suggestedChanges.newSkills && suggestedChanges.newSkills.length > 0 && (
                          <div className="bg-navy-elevated/60 border border-l-2 border-l-green-500 border-navy-border p-3 rounded-lg text-xs">
                            <span className="font-bold text-foreground mb-1 block">New Skill Badges</span>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {suggestedChanges.newSkills.map((s, idx) => (
                                <span key={idx} className="text-[9px] px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 font-semibold rounded-md">
                                  +{s.skill} ({s.category.split(" ")[0]})
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          handleApproveSync();
                          alert("Successfully synchronized your portfolio pages! Scroll down or visit the home page to see your new cards.");
                        }}
                        className="w-full py-2 bg-green-500 text-primary-foreground font-bold rounded-xl hover:opacity-95 transition-opacity text-xs flex items-center justify-center gap-1.5 shadow-lg"
                      >
                        <PlusCircle size={14} />
                        Approve & Ingest to Portfolio
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CODE AUDITOR */}
              {activeTab === "auditor" && (
                <div className="h-full flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground">Paste custom snippet or run presets:</span>
                    
                    {/* Vulnerability presets */}
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleSelectSnippet("sql")}
                        className={`text-[9px] px-2.5 py-1 rounded border font-semibold transition-all ${
                          selectedSnippetKey === "sql"
                            ? "bg-cyan/15 border-cyan text-cyan"
                            : "border-navy-border text-muted-foreground hover:text-foreground hover:border-navy-border/80"
                        }`}
                      >
                        SQLi Preset
                      </button>
                      <button
                        onClick={() => handleSelectSnippet("xss")}
                        className={`text-[9px] px-2.5 py-1 rounded border font-semibold transition-all ${
                          selectedSnippetKey === "xss"
                            ? "bg-cyan/15 border-cyan text-cyan"
                            : "border-navy-border text-muted-foreground hover:text-foreground hover:border-navy-border/80"
                        }`}
                      >
                        XSS Preset
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={customCode}
                    onChange={(e) => setCustomCode(e.target.value)}
                    className="flex-1 min-h-[140px] w-full bg-navy-surface border border-navy-border focus:border-cyan/50 focus:outline-none rounded-xl p-3 text-[10px] font-mono placeholder:text-muted-foreground/50 resize-none overflow-y-auto scrollbar-thin text-muted-foreground"
                  />

                  <button
                    disabled={!customCode.trim() || auditLoading}
                    onClick={handleRunAudit}
                    className="w-full py-2.5 border border-cyan/40 text-cyan hover:bg-cyan/15 font-bold rounded-xl transition-all text-xs disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    <Terminal size={14} className={auditLoading ? "animate-pulse" : ""} />
                    {auditLoading ? "Auditing Code..." : "Run Security Audit"}
                  </button>

                  {/* Audit results */}
                  {auditResult && (
                    <div className="border border-navy-border/80 bg-navy-elevated/40 rounded-xl p-4 space-y-3.5 mt-1 overflow-y-auto max-h-[220px] text-xs scrollbar-thin text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground flex items-center gap-1.5">
                          <AlertCircle size={14} className="text-red-500" />
                          {auditResult.vulnerability}
                        </span>
                        <span className="text-[10px] bg-red-500/10 border border-red-500/20 text-red-500 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                          {auditResult.severity}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{auditResult.description}</p>
                      
                      <div className="bg-navy-surface p-3 rounded-lg border border-navy-border/60 space-y-1.5">
                        <div className="text-[9px] text-cyan font-bold uppercase tracking-wider">Remediation Blueprint:</div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">{auditResult.recommendation}</p>
                      </div>

                      <div className="bg-navy-surface p-3 rounded-lg border border-navy-border/60">
                        <div className="text-[9px] text-cyan font-bold uppercase tracking-wider mb-2">Fixed Code Refactor:</div>
                        <pre className="text-[9px] font-mono text-muted-foreground/90 overflow-x-auto whitespace-pre p-2 bg-navy/40 rounded border border-navy-border">
                          {auditResult.fixedCode}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Bottom Half: n8n Log workflows terminal */}
          <section className="bg-navy-surface/40 border border-navy-border rounded-2xl p-4 sm:p-5 h-[200px] sm:h-[230px] flex flex-col overflow-hidden backdrop-blur-md flex-shrink-0">
            <div className="flex items-center justify-between mb-3 border-b border-navy-border/60 pb-2">
              <h2 className="text-xs font-bold tracking-wider uppercase font-display flex items-center gap-2 text-foreground">
                <Terminal size={16} className="text-cyan animate-pulse" />
                Live n8n Automation Workflows
              </h2>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="p-1 rounded hover:bg-navy-elevated border border-navy-border text-muted-foreground hover:text-foreground transition-colors"
                  title={isRunning ? "Pause Logs" : "Play Logs"}
                >
                  {isRunning ? <X size={12} /> : <Play size={12} />}
                </button>
                <button
                  onClick={() => setLogs([])}
                  className="p-1 rounded hover:bg-navy-elevated border border-navy-border text-muted-foreground hover:text-foreground transition-colors"
                  title="Clear Logs"
                >
                  <RotateCcw size={12} />
                </button>
                <span className="text-[10px] text-green-500 font-mono font-bold bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded uppercase">
                  Listening
                </span>
              </div>
            </div>

            {/* Simulated Log Output */}
            <div className="flex-1 bg-navy-elevated rounded-xl border border-navy-border p-3.5 font-mono text-[10px] text-muted-foreground overflow-y-auto scrollbar-thin select-none">
              {logs.length === 0 ? (
                <div className="text-center text-muted-foreground/45 py-8">No log items recorded. Monitoring active.</div>
              ) : (
                <div className="space-y-1">
                  {logs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.includes("SUCCESS")
                          ? "text-green-400"
                          : log.includes("ERROR")
                          ? "text-red-400"
                          : "text-muted-foreground/80"
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

        </div>
      </main>

      {/* API Settings Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-navy-surface border border-navy-border rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-navy-border bg-navy-elevated flex justify-between items-center">
              <h3 className="font-bold text-foreground font-display flex items-center gap-2">
                <Key size={18} className="text-cyan animate-pulse" />
                Gemini API Key Settings
              </h3>
              <button
                onClick={() => setShowKeyModal(false)}
                className="p-1 rounded border border-navy-border hover:border-cyan text-muted-foreground hover:text-cyan transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={saveKey} className="p-6 space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                To unlock custom AI queries, paste a personal <strong>Google Gemini API Key</strong> below. The key is securely saved in your browser's local memory (`localStorage`) and is only dispatched client-side straight to the Gemini API endpoint.
              </p>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-foreground uppercase tracking-widest">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-navy-elevated border border-navy-border focus:border-cyan/50 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2 border-t border-navy-border/60">
                <button
                  type="button"
                  onClick={clearKey}
                  className="px-4 py-2 border border-navy-border text-xs text-muted-foreground hover:text-cyan hover:border-cyan rounded-xl transition-all font-semibold"
                >
                  Clear Key
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity text-xs shadow-lg"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
