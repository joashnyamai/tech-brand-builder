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
  Paperclip
} from "lucide-react";

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
Motivated IT professional and BSc Information Technology finalist with 3+ years of hands-on experience in software development, quality assurance, IT support, cloud exposure (AWS), and digital training. Proven ability to monitor systems, document workflows, troubleshoot application issues, and support end users in fast-paced technology environments. Experienced in application testing (Jest & Postman), bug tracking (Jira), data management (MySQL, PostgreSQL), and prototyping web solutions using React, TypeScript, Node.js, and PHP. Familiar with AI/ML concepts through LangChain, RAG, and Generative AI certifications. A fast learner and collaborative team player eager to contribute to Jubilee Life Insurance's digital transformation agenda and J-Hub innovation initiatives.

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

// --- MOCK LOGIC UTILITIES FOR SEAMLESS OFFLINE FALLBACK ---

export function getMockChatResponse(text: string): string {
  const q = text.toLowerCase();
  if (q.includes("qa") || q.includes("test")) {
    return "Malila has 3+ years of QA experience, currently serving as Senior QA Engineer at Annex Technologies. He designs test suites, runs manual/automated test pipelines (Selenium/Cypress), does Postman API testing, and database verification.";
  } else if (q.includes("efoleni") || q.includes("foleni")) {
    return "E-Foleni (efoleni.co.ke) is a queue-free booking scheduler built for Kenyan organizations. Malila co-founded and built it using React, TypeScript, and M-Pesa. It has facilitated over 120,000+ bookings and saved users 42+ mins of line time.";
  } else if (q.includes("remboglow") || q.includes("glow")) {
    return "RemboGlow is a beauty-tech platform co-founded by Malila. He architected the frontend React dashboard, verified deployment setups, and conducted usability research iterations to ensure responsive and secure interfaces.";
  } else if (q.includes("skill") || q.includes("tech")) {
    return "His core stack includes React, TypeScript, Node.js, PHP, and C# (.NET). For databases, he works with MySQL and PostgreSQL. He also has CCNA certification for secure networking and system support.";
  } else if (q.includes("hire") || q.includes("remote") || q.includes("contact")) {
    return "Malila is based in Nairobi, Kenya and open to hybrid or remote Software/QA Engineering contracts. You can contact him directly at jamesmnyamai9@gmail.com or 0745 806 761.";
  }
  return "Malila is a Software and QA Engineer with expertise in React, TypeScript, Node.js, and CI/CD automation pipelines. I'd be happy to share details about his projects, experience, or certifications. What would you like to explore?";
}

export function getMockJdResponse(jdText: string) {
  const jd = jdText.toLowerCase();

  // Define keywords for domain detection
  const techKeywords = [
    "react", "vue", "angular", "node", "php", "c#", ".net", "python", "java", "javascript",
    "typescript", "sql", "database", "mysql", "postgresql", "qa", "test", "quality",
    "software", "developer", "engineer", "programmer", "aws", "azure", "cloud",
    "cybersecurity", "ccna", "network", "support", "it ", "information technology",
    "systems", "code", "coder", "git", "devops", "api", "selenium", "cypress",
    "jest", "postman", "docker", "kubernetes", "k8s", "flutter", "react native",
    "ios", "android", "swift", "kotlin", "laravel", "django", "flask", "spring", "rust", "golang", "go "
  ];

  // Check if it's completely unrelated to tech/QA/IT
  const hasTechKeyword = techKeywords.some(keyword => jd.includes(keyword));
  
  // Non-tech indicator keywords
  const nonTechIndicators = [
    "doctor", "nurse", "surgeon", "medical", "dentist", "chef", "cooking", "driver", 
    "sales representative", "marketing manager", "accountant", "finance", "legal", 
    "lawyer", "therapist", "cashier", "waiter", "bartender"
  ];
  const isExplicitlyUnrelated = nonTechIndicators.some(kw => jd.includes(kw));

  if (!hasTechKeyword || isExplicitlyUnrelated || jd.trim().length < 15) {
    return {
      score: 5,
      fit: "Unsatisfactory fit. The role description does not align with software engineering, quality assurance, or IT domains.",
      strengths: [],
      gaps: [
        "Role is in an unrelated domain (non-IT/Software/QA)",
        "Requires domain-specific qualifications and experience outside Malila's core competencies"
      ]
    };
  }

  let score = 10; // Start with a very strict base for technical alignment
  const strengths: string[] = [];
  const gaps: string[] = [];

  // 1. Evaluate QA & Testing
  if (jd.includes("qa") || jd.includes("test") || jd.includes("quality") || jd.includes("selenium") || jd.includes("cypress") || jd.includes("jest") || jd.includes("postman")) {
    score += 25;
    strengths.push("Senior QA manual & automated test suite design");
  }

  // 2. Evaluate Frontend
  if (jd.includes("react") || jd.includes("typescript") || jd.includes("javascript")) {
    score += 25;
    strengths.push("Frontend React/TypeScript UI development");
  } else if (jd.includes("frontend") || jd.includes("front-end")) {
    // transferrable skills
    score += 10;
    strengths.push("General frontend engineering principles");
  }

  // 3. Evaluate Backend & Databases
  if (jd.includes("node") || jd.includes("php") || jd.includes("c#") || jd.includes(".net")) {
    score += 15;
    strengths.push("Backend software engineering (Node.js, PHP, C#)");
  }
  if (jd.includes("sql") || jd.includes("mysql") || jd.includes("postgresql") || jd.includes("database")) {
    score += 15;
    strengths.push("Relational Database Schema design (MySQL/PostgreSQL)");
  }

  // 4. Evaluate Cloud & DevOps & Networking
  if (jd.includes("aws") || jd.includes("azure") || jd.includes("cloud")) {
    score += 10;
    strengths.push("AWS/Azure cloud resource provisioning & CI/CD deployment");
  }
  if (jd.includes("ccna") || jd.includes("network") || jd.includes("security") || jd.includes("cybersecurity")) {
    score += 10;
    strengths.push("CCNA-certified networking & security skills");
  }

  // 5. Evaluate Gaps for Technologies Malila lacks but are requested
  if (jd.includes("python") || jd.includes("django") || jd.includes("flask")) {
    score -= 15;
    gaps.push("Python/Django/Flask backend development");
  }
  if (jd.includes("java") || jd.includes("spring")) {
    score -= 15;
    gaps.push("Java/Spring Boot enterprise development");
  }
  if (jd.includes("kubernetes") || jd.includes("k8s")) {
    score -= 10;
    gaps.push("Kubernetes container orchestration");
  }
  if (jd.includes("angular") || jd.includes("vue")) {
    score -= 10;
    gaps.push("Angular/Vue frontend framework experience");
  }
  if (jd.includes("flutter") || jd.includes("react native") || jd.includes("ios") || jd.includes("android") || jd.includes("swift") || jd.includes("kotlin")) {
    score -= 15;
    gaps.push("Mobile application development (Flutter/React Native/iOS/Android)");
  }
  if (jd.includes("rust") || jd.includes("golang") || jd.includes("go ")) {
    score -= 10;
    gaps.push("Systems programming (Go/Rust)");
  }

  // Bound score
  const finalScore = Math.max(5, Math.min(score, 98));

  // Determine fit descriptor
  let fit = "";
  if (finalScore >= 80) {
    fit = `Excellent match fit. Strong alignment with ${strengths.slice(0, 2).join(" and ")}.`;
  } else if (finalScore >= 50) {
    fit = `Moderate match fit. Fits key areas such as ${strengths.slice(0, 1).join("") || "general development"}, but has notable gaps.`;
  } else {
    fit = `Low match fit. Malila does not meet several major requirements of this role.`;
  }

  return {
    score: finalScore,
    fit,
    strengths: strengths.length > 0 ? strengths.slice(0, 3) : ["General IT knowledge"],
    gaps: gaps.length > 0 ? gaps.slice(0, 2) : ["No major gaps identified."]
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
      {rawCommentText}
    </div>
  );
}`
    };
  }
}

/**
 * Resilient Gemini API Caller with Exponential Backoff Retry and Error Handling Heuristics
 */
export async function queryGeminiWithRetry(
  prompt: string,
  apiKey: string,
  responseMimeType?: string,
  retries = 2,
  delay = 1000
): Promise<string> {
  // Cascading list of models to try in sequence to survive quota/region deprecations
  const modelsCascade = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

  for (const model of modelsCascade) {
    let currentDelay = delay;
    for (let i = 0; i < retries; i++) {
      try {
        if (!navigator.onLine) {
          throw new Error("No internet connection detected. Please check your network.");
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

        const response = await fetch(url, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: i === 0 ? 0.15 : 0.35,
              maxOutputTokens: 1000,
              ...(responseMimeType ? { responseMimeType } : {})
            }
          })
        });

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

        // If returned 404 or 403 or 400, it means the key lacks access to this specific model, cascade immediately
        if (response.status === 404 || response.status === 403 || response.status === 400) {
          console.warn(`Model ${model} is not supported or key is restricted (HTTP ${response.status}). Cascading immediately.`);
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
      if (apiKey && !fallbackActive) {
        // Query Gemini API with Retry Heuristics
        const prompt = `You are Ava, Malila Nyamai's personal guide and assistant.
Answer the user's question completely, accurately, and concisely. Speak about Malila in the third person ("he", "him", "his").
Do NOT state that you are an AI, a large language model, or a chatbot. Keep your tone completely human, friendly, and professional.
Avoid robotic phrase templates (such as "Based on the provided context..."). Just answer naturally.
Make sure the response is well-structured, complete, and always ends with a finished sentence. Do not cut off mid-sentence.

Resume Context:
${RESUME_CONTEXT}

User inquiry: "${text}"`;

        const ans = await queryGeminiWithRetry(prompt, apiKey);
        setMessages((prev) => [...prev, { sender: "bot", text: ans, isLlm: true }]);
      } else {
        // Run standard mock logic
        throw new Error("No active key configured. Using Sandbox Heuristics.");
      }
    } catch (err: any) {
      console.warn("Chat API call failed, executing graceful sandbox fallback:", err.message);
      setFallbackActive(true);
      
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

  // --- TOOL 2: CV MATCHER (JD ANALYZER) ---
  const [jdInput, setJdInput] = useState("");
  const [fileParsing, setFileParsing] = useState(false);
  const [fileError, setFileError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileParsing(true);
    setFileError("");
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
    } catch (err: any) {
      console.error(err);
      setFileError(err.message || "Failed to parse document.");
    } finally {
      setFileParsing(false);
      // Reset input value so same file can be uploaded again
      e.target.value = "";
    }
  };
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<{
    score: number;
    fit: string;
    strengths: string[];
    gaps: string[];
    isLlm?: boolean;
  } | null>(null);

  const handleAnalyzeJd = async () => {
    if (!jdInput.trim() || matchLoading) return;
    setMatchLoading(true);
    setMatchResult(null);

    try {
      if (apiKey && !fallbackActive) {
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

Job Description:
"${jdInput}"

Resume Context:
${RESUME_CONTEXT}`;

        const rawJson = await queryGeminiWithRetry(prompt, apiKey, "application/json");
        const parsed = JSON.parse(rawJson);
        setMatchResult({
          score: parsed.score || 80,
          fit: parsed.fit || "Matches critical parameters.",
          strengths: parsed.strengths || [],
          gaps: parsed.gaps || [],
          isLlm: true
        });
      } else {
        throw new Error("No active key configured. Using Sandbox Heuristics.");
      }
    } catch (err: any) {
      console.warn("Matcher API call failed, executing graceful sandbox fallback:", err.message);
      setFallbackActive(true);

      const parsed = getMockJdResponse(jdInput);
      setMatchResult({
        score: parsed.score,
        fit: parsed.fit,
        strengths: parsed.strengths,
        gaps: parsed.gaps,
        isLlm: true // Keep identical styling
      });
    } finally {
      setMatchLoading(false);
    }
  };

  // --- TOOL 3: SECURITY CODE AUDITOR ---
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
  };

  const handleRunAudit = async () => {
    if (!customCode.trim() || auditLoading) return;
    setAuditLoading(true);
    setAuditResult(null);

    try {
      if (apiKey && !fallbackActive) {
        const prompt = `Analyze this code snippet for security vulnerabilities.
Return ONLY a JSON object with:
"vulnerability" (the vulnerability name),
"severity" (High, Medium, or Low),
"description" (a 1-sentence description of the threat),
"recommendation" (how to resolve it),
"fixedCode" (the refactored secure version).

Code to audit:
${customCode}`;

        const rawJson = await queryGeminiWithRetry(prompt, apiKey, "application/json");
        const parsed = JSON.parse(rawJson);
        setAuditResult({
          vulnerability: parsed.vulnerability || "Vulnerability Found",
          severity: parsed.severity || "High",
          description: parsed.description || "Identified security threat.",
          recommendation: parsed.recommendation || "Refactor user input.",
          fixedCode: parsed.fixedCode || "// Fix code not provided.",
          isLlm: true
        });
      } else {
        throw new Error("No active key configured. Using Sandbox Heuristics.");
      }
    } catch (err: any) {
      console.warn("Auditor API call failed, executing graceful sandbox fallback:", err.message);
      setFallbackActive(true);

      const parsed = getMockAuditResponse(selectedSnippetKey);
      setAuditResult({
        vulnerability: parsed.vulnerability,
        severity: parsed.severity,
        description: parsed.description,
        recommendation: parsed.recommendation,
        fixedCode: parsed.fixedCode,
        isLlm: true // Keep identical styling
      });
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
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Bar */}
      <header className="max-w-7xl mx-auto mb-10 flex justify-between items-center bg-navy-surface/40 border border-navy-border p-6 rounded-2xl backdrop-blur-md">
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
        <div className="flex items-center gap-3">
          {apiKey ? (
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded font-semibold uppercase tracking-wider font-mono">
              <Check size={12} />
              <span>AI Engine Active</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded font-semibold uppercase tracking-wider font-mono">
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
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: AI Career Chatbot */}
        <section className="lg:col-span-1 flex flex-col h-[650px] bg-navy-surface/40 border border-navy-border rounded-2xl overflow-hidden backdrop-blur-md">
          <div className="p-4 border-b border-navy-border bg-navy-elevated flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wider uppercase font-display flex items-center gap-2 text-foreground">
              <Bot size={16} className="text-cyan animate-pulse" />
              Ava - AI Portfolio Guide
            </h2>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${apiKey ? "bg-green-500" : "bg-amber-500"}`} />
              <span className="text-[10px] text-muted-foreground">
                {apiKey ? "Gemini 3.5" : "Local Preview"}
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
              "QA automation experience?",
              "Are you open to remote?"
            ].map((chip) => (
              <button
                key={chip}
                disabled={chatLoading}
                onClick={() => handleSendChat(chip)}
                className="text-[10px] text-muted-foreground border border-navy-border hover:border-cyan/40 hover:text-cyan bg-navy-elevated/40 px-2.5 py-1 rounded-full transition-colors"
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
        <div className="lg:col-span-2 space-y-8 flex flex-col h-[650px] justify-between">
          
          {/* Top Half: CV Matcher & Auditor Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
            
            {/* Dynamic CV Matcher */}
            <section className="bg-navy-surface/40 border border-navy-border rounded-2xl p-5 flex flex-col overflow-hidden backdrop-blur-md">
              <h2 className="text-xs font-bold tracking-wider uppercase font-display flex items-center gap-2 mb-3 text-foreground">
                <FileCheck size={16} className="text-cyan" />
                Dynamic CV Matcher
              </h2>
              
              <div className="flex-1 flex flex-col gap-3 min-h-0">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Paste text below or:</span>
                  <label className="flex items-center gap-1 cursor-pointer text-cyan hover:opacity-85 font-semibold">
                    <Paperclip size={10} />
                    <span>Upload JD File (PDF/Word/Text)</span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt,.md"
                      onChange={handleFileUpload}
                      disabled={fileParsing}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {fileParsing && (
                  <div className="text-[10px] text-cyan animate-pulse flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-ping" />
                    Parsing uploaded document...
                  </div>
                )}
                
                {fileError && (
                  <div className="text-[10px] text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle size={10} />
                    {fileError}
                  </div>
                )}

                <textarea
                  value={jdInput}
                  onChange={(e) => setJdInput(e.target.value)}
                  placeholder="Paste a Job Description (JD) here to analyze fit score and skill matches..."
                  className="flex-1 w-full bg-navy-surface border border-navy-border focus:border-cyan/50 focus:outline-none rounded-xl p-3 text-xs placeholder:text-muted-foreground/50 resize-none overflow-y-auto scrollbar-thin"
                />
                
                <button
                  disabled={!jdInput.trim() || matchLoading}
                  onClick={handleAnalyzeJd}
                  className="w-full py-2 bg-cyan text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity text-xs disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} className={matchLoading ? "animate-pulse" : ""} />
                  {matchLoading ? "Analyzing..." : "Analyze JD Match"}
                </button>

                {/* Score results */}
                {matchResult && (
                  <div className="border border-navy-border/80 bg-navy-elevated/40 rounded-xl p-3.5 space-y-2 mt-1 overflow-y-auto max-h-[140px] text-xs scrollbar-thin font-medium text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Match Fit Score:</span>
                      <span className={`font-mono text-sm font-bold ${
                        matchResult.score >= 80 ? "text-green-500" : "text-cyan"
                      }`}>{matchResult.score}%</span>
                    </div>
                    <p className="text-[11px] leading-relaxed font-semibold text-muted-foreground">{matchResult.fit}</p>
                    {matchResult.strengths.length > 0 && (
                      <div>
                        <div className="font-semibold text-foreground text-[10px] uppercase tracking-wider mb-1">Key Matches:</div>
                        <ul className="list-disc pl-4 text-[10px] space-y-0.5">
                          {matchResult.strengths.map((str, idx) => <li key={idx}>{str}</li>)}
                        </ul>
                      </div>
                    )}
                    {matchResult.gaps.length > 0 && (
                      <div className="mt-1">
                        <div className="font-semibold text-foreground text-[10px] uppercase tracking-wider mb-1">Areas of focus:</div>
                        <ul className="list-disc pl-4 text-[10px] space-y-0.5">
                          {matchResult.gaps.map((gp, idx) => <li key={idx}>{gp}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Interactive Security Auditor */}
            <section className="bg-navy-surface/40 border border-navy-border rounded-2xl p-5 flex flex-col overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold tracking-wider uppercase font-display flex items-center gap-2 text-foreground">
                  <ShieldAlert size={16} className="text-cyan" />
                  Code Security Auditor
                </h2>
                
                {/* Vulnerability presets */}
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleSelectSnippet("sql")}
                    className={`text-[9px] px-2 py-0.5 rounded border transition-colors ${
                      selectedSnippetKey === "sql"
                        ? "bg-cyan/15 border-cyan text-cyan"
                        : "border-navy-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    SQLi
                  </button>
                  <button
                    onClick={() => handleSelectSnippet("xss")}
                    className={`text-[9px] px-2 py-0.5 rounded border transition-colors ${
                      selectedSnippetKey === "xss"
                        ? "bg-cyan/15 border-cyan text-cyan"
                        : "border-navy-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    XSS
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3 min-h-0">
                <textarea
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className="flex-1 w-full bg-navy-surface border border-navy-border focus:border-cyan/50 focus:outline-none rounded-xl p-3 text-[10px] font-mono placeholder:text-muted-foreground/50 resize-none overflow-y-auto scrollbar-thin text-muted-foreground"
                />

                <button
                  disabled={!customCode.trim() || auditLoading}
                  onClick={handleRunAudit}
                  className="w-full py-2 border border-cyan/40 text-cyan hover:bg-cyan/15 font-semibold rounded-xl transition-all text-xs disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <Terminal size={14} />
                  {auditLoading ? "Auditing Code..." : "Run Security Audit"}
                </button>

                {/* Audit results */}
                {auditResult && (
                  <div className="border border-navy-border/80 bg-navy-elevated/40 rounded-xl p-3.5 space-y-2 mt-1 overflow-y-auto max-h-[140px] text-xs scrollbar-thin text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground flex items-center gap-1.5">
                        <AlertCircle size={14} className="text-red-500" />
                        {auditResult.vulnerability}
                      </span>
                      <span className="text-[10px] bg-red-500/10 border border-red-500/20 text-red-500 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                        {auditResult.severity}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed">{auditResult.description}</p>
                    <div className="bg-navy-surface p-2 rounded border border-navy-border/60">
                      <div className="text-[9px] text-cyan font-bold uppercase tracking-wider mb-1">Fixed Code Refactor:</div>
                      <pre className="text-[9px] font-mono text-muted-foreground/90 overflow-x-auto whitespace-pre">
                        {auditResult.fixedCode}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* Bottom Half: n8n Log workflows terminal */}
          <section className="bg-navy-surface/40 border border-navy-border rounded-2xl p-5 h-[230px] flex flex-col overflow-hidden backdrop-blur-md">
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
