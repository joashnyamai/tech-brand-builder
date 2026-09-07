import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  PenSquare,
  Eye,
  Columns,
  Save,
  Trash2,
  Download,
  Sparkles,
  Tag,
  Clock,
  CheckCircle2,
  FileText,
  Code,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Minus,
  Table,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  CheckSquare,
  Image as ImageIcon,
  LayoutTemplate,
  ChevronDown
} from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import SafeMarkdownRenderer from "@/components/articles/SafeMarkdownRenderer";
import { useArticles } from "@/hooks/use-articles";
import { ArticleCategory } from "@/types/article";
import { toast } from "sonner";

const CATEGORIES: ArticleCategory[] = [
  "Architecture & Cloud",
  "Fintech & M-Pesa",
  "Quality Assurance",
  "Frontend Engineering",
  "Backend & Databases",
  "AI & Emerging Tech",
];

const GRADIENTS = [
  { name: "Cyan & Indigo", value: "from-cyan-500/30 via-indigo-500/20 to-purple-600/30" },
  { name: "Emerald & Cyan", value: "from-emerald-500/30 via-cyan-500/20 to-blue-600/30" },
  { name: "Amber & Red", value: "from-amber-500/30 via-orange-500/20 to-red-600/30" },
  { name: "Blue & Teal", value: "from-blue-500/30 via-teal-500/20 to-emerald-600/30" },
  { name: "Purple & Pink", value: "from-purple-500/30 via-pink-500/20 to-rose-600/30" },
];

const ARTICLE_TEMPLATES = [
  {
    name: "System Architecture Case Study",
    icon: "🏗️",
    category: "Architecture & Cloud" as ArticleCategory,
    tags: ["Architecture", "High Concurrency", "PostgreSQL", "System Design"],
    coverGradient: "from-emerald-500/30 via-cyan-500/20 to-blue-600/30",
    excerpt: "An architectural deep-dive into resolving concurrency bottlenecks and maintaining zero state corruption under high user load.",
    content: `## Executive Summary

A concise summary of the architectural challenge, why traditional approaches failed under heavy load, and the core philosophy of the solution.

> [!STAT] 99.98% | Uptime Maintained Across 120,000+ Concurrent Transactions

---

## 1. The Core Engineering Challenge

Explain the technical bottleneck, distributed race condition, or concurrency collision.

> [!WARNING]
> Unsynchronized state transitions across microservices lead to double-booking, over-allocation, and silent data corruption.

### Data Flow Architecture

\`\`\`
Client ──▶ [Edge Gateway / Rate Limiter]
              │
              ├──▶ [In-Memory Cache (Redis)] ──▶ Fast Read (<5ms)
              └──▶ [Distributed Queue] ──▶ Async Worker ──▶ [PostgreSQL Cluster]
\`\`\`

---

## 2. Technical Implementation & Safeguards

\`\`\`typescript
// Atomic reservation using optimistic locking and mutex barriers
export async function reserveAtomicSlot(slotId: string, checkoutId: string) {
  const query = \`
    UPDATE appointment_slots 
    SET status = 'PENDING_PAYMENT', 
        locked_until = NOW() + INTERVAL '3 minutes',
        checkout_request_id = $2
    WHERE id = $1 AND (status = 'AVAILABLE' OR locked_until < NOW())
    RETURNING id;
  \`;
  return await db.query(query, [slotId, checkoutId]);
}
\`\`\`

> [!TIP]
> Always pair short-lived distributed mutex locks with atomic database row operations for financial-grade consistency.

---

## 3. Benchmarks & Results

| Metric | Before Optimization | After Redesign | Improvement |
| --- | --- | --- | --- |
| P99 API Latency | 820ms | 45ms | 18x Faster |
| Peak Concurrency | 1,200 req/s | 24,000 req/s | 20x Capacity |
| Collisions / Double-Books | 4.2% | 0% (Absolute Zero) | 100% Resolved |

---

## Key Takeaways

- [x] Decouple synchronous client checkout requests from heavy background database writes.
- [x] Protect state transitions with atomic database locks and idempotency keys.
- [x] Test your services against simulated 3G latency profiles to reflect real-world mobile conditions.
`
  },
  {
    name: "QA & Automated Testing Blueprint",
    icon: "🧪",
    category: "Quality Assurance" as ArticleCategory,
    tags: ["Automated QA", "Jest", "CI/CD", "API Testing", "Test Automation"],
    coverGradient: "from-cyan-500/30 via-indigo-500/20 to-purple-600/30",
    excerpt: "How we replaced manual QA bottlenecks with automated API contract tests and component suites, slashing release cycles by 35%.",
    content: `## The Problem: Slow Manual Regression Cycles

When deploying code frequently, manual QA testing becomes the primary bottleneck on engineering sprint velocity.

> [!NOTE]
> Testing contracts at the API layer catches payload and schema drifts before frontend UI components even mount.

---

## Automated Testing Pyramid Strategy

| Testing Layer | Coverage Focus | Framework | Execution Speed |
| --- | --- | --- | --- |
| End-to-End Smoke | Critical user payment & login journeys | Playwright / Cypress | ~2 mins |
| Component & Integration | Stateful forms, dialogs, button state | Vitest & React Testing Library | ~15 secs |
| REST API Contracts | Payload schemas, HTTP codes, auth headers | Postman / Newman & Jest | ~4 secs |

---

## Code Example: Automated Schema Validation

\`\`\`typescript
import { describe, it, expect } from "vitest";

describe("Payment STK Push Webhook Contract", () => {
  it("rejects untrusted signatures with 401 Unauthorized", async () => {
    const response = await request(app)
      .post("/api/v1/payments/webhook")
      .set("x-signature", "invalid-key")
      .send({ transactionId: "TX123" });

    expect(response.status).toBe(401);
    expect(response.body.error).toMatch(/unauthorized/i);
  });
});
\`\`\`

> [!TIP]
> Run your API contract tests in headless mode on every pull request before code reaches staging.

---

## Measurable Results

> [!STAT] 35% | Reduction in Total QA Turnaround Time per Release Cycle

- [x] Zero critical regressions leaked to production over 6 months of continuous deployment.
- [x] Automated test feedback delivered in under 90 seconds in CI/CD pipeline.
`
  },
  {
    name: "Performance & Low-Bandwidth Guide",
    icon: "⚡",
    category: "Frontend Engineering" as ArticleCategory,
    tags: ["React", "Performance", "Vite", "Mobile First", "Optimization"],
    coverGradient: "from-blue-500/30 via-teal-500/20 to-emerald-600/30",
    excerpt: "Practical techniques for optimizing web performance on mobile devices and 3G networks in emerging tech markets.",
    content: `## The Performance Reality

Your high-speed fiber connection does not represent your real user's browsing conditions. Mid-range mobile phones on 3G connections require aggressive optimization.

> [!IMPORTANT]
> A 5MB uncompressed JavaScript bundle can freeze a budget mobile phone for 8 to 12 seconds during initial execution.

---

## 1. Route-Based Code Splitting

\`\`\`tsx
import { lazy, Suspense } from "react";

// Defer non-critical routes
const HeavyDashboard = lazy(() => import("./pages/HeavyDashboard"));

export function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyDashboard />
    </Suspense>
  );
}
\`\`\`

---

## 2. Before vs After Performance

| Metric | Before Optimization | Optimized | Difference |
| --- | --- | --- | --- |
| Initial JS Bundle | 1.8 MB | 145 KB | 92% Smaller |
| First Contentful Paint | 3.6s | 0.8s | 78% Faster |
| Mobile CPU Time | 4,200ms | 380ms | 91% Saved |

> [!TIP]
> Always compress SVG icons into an inline symbol set to avoid dozens of redundant HTTP requests.
`
  }
];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ArticleStudio() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles, publishArticle, updateArticle, deleteArticle } = useArticles();

  const isEditing = Boolean(id);
  const existingArticle = useMemo(() => {
    if (!id) return undefined;
    return articles.find((a) => a.id === id);
  }, [id, articles]);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<ArticleCategory>("Architecture & Cloud");
  const [tags, setTags] = useState<string[]>(["TypeScript", "Architecture"]);
  const [tagInput, setTagInput] = useState("");
  const [coverGradient, setCoverGradient] = useState(GRADIENTS[0].value);
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [featured, setFeatured] = useState(false);

  // Editor View Mode
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "split">("split");
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const handleApplyTemplate = (tpl: typeof ARTICLE_TEMPLATES[0]) => {
    if (content.trim() && !window.confirm(`Replace current draft with "${tpl.name}" starter template?`)) {
      return;
    }
    setTitle(tpl.name);
    setSlug(generateSlug(tpl.name));
    setCategory(tpl.category);
    setCoverGradient(tpl.coverGradient);
    setExcerpt(tpl.excerpt);
    setTags(tpl.tags);
    setContent(tpl.content);
    setShowTemplateMenu(false);
    toast.success(`Loaded "${tpl.name}" starter template!`);
  };

  // Load existing article for editing
  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title);
      setSlug(existingArticle.slug);
      setIsCustomSlug(true);
      setExcerpt(existingArticle.excerpt);
      setCategory(existingArticle.category);
      setTags(existingArticle.tags);
      setCoverGradient(existingArticle.coverGradient || GRADIENTS[0].value);
      setContent(existingArticle.content);
      setIsPublished(existingArticle.isPublished);
      setFeatured(existingArticle.featured);
    }
  }, [existingArticle]);

  // Auto-generate slug as title changes
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isCustomSlug) {
      setSlug(generateSlug(val));
    }
  };

  // Estimated read time (200 words per minute)
  const estimatedReadTime = useMemo(() => {
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }, [content]);

  // Tag Handling
  const handleAddTag = () => {
    const clean = tagInput.trim().replace(/^#/, "");
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Insert formatting snippet into markdown content
  const insertSnippet = (prefix: string, suffix = "") => {
    const textarea = document.getElementById("article-markdown-editor") as HTMLTextAreaElement | null;
    if (!textarea) {
      setContent((prev) => prev + prefix + suffix);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = prefix + (selected || "text") + suffix;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected || "text").length);
    }, 50);
  };

  // Export current article to .md file
  const handleExportMarkdown = () => {
    const mdContent = `---
title: "${title}"
slug: "${slug}"
category: "${category}"
publishedAt: "${new Date().toISOString().split("T")[0]}"
readTime: ${estimatedReadTime}
tags: [${tags.map((t) => `"${t}"`).join(", ")}]
---

${content}
`;
    const blob = new Blob([mdContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug || "article"}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Article exported as Markdown file!");
  };

  // Submit / Publish
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please provide an article title.");
      return;
    }

    if (!content.trim()) {
      toast.error("Please write some article content.");
      return;
    }

    const finalSlug = slug.trim() || generateSlug(title);

    if (isEditing && existingArticle) {
      updateArticle(existingArticle.id, {
        title,
        slug: finalSlug,
        excerpt: excerpt || content.slice(0, 150) + "...",
        category,
        tags,
        coverGradient,
        content,
        readTimeMinutes: estimatedReadTime,
        isPublished,
        featured,
      });
      toast.success("Article updated successfully!");
      navigate(`/articles/${finalSlug}`);
    } else {
      const created = publishArticle({
        title,
        slug: finalSlug,
        excerpt: excerpt || content.slice(0, 150) + "...",
        category,
        tags,
        coverGradient,
        content,
        readTimeMinutes: estimatedReadTime,
        isPublished,
        featured,
      });
      toast.success("Article published publicly!");
      navigate(`/articles/${created.slug}`);
    }
  };

  const handleDelete = () => {
    if (!existingArticle) return;
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticle(existingArticle.id);
      toast.info("Article deleted.");
      navigate("/articles");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative overflow-x-hidden selection:bg-cyan/20">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24">
        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link
              to="/articles"
              className="p-2 rounded-xl border border-navy-border hover:border-cyan/50 text-muted-foreground hover:text-cyan transition-colors"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1 className="font-display font-bold text-xl sm:text-2xl text-foreground flex items-center gap-2">
                <PenSquare size={20} className="text-cyan" />
                {isEditing ? "Edit Article" : "Write & Publish Article"}
              </h1>
              <p className="text-xs text-muted-foreground">
                Compose technical posts, architectural diagrams, and engineering guides.
              </p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-navy-border hover:border-cyan/40 bg-navy-surface text-muted-foreground hover:text-cyan text-xs font-semibold transition-all cursor-pointer"
              title="Download as .md"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Export .md</span>
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-500/20 hover:border-red-500/40 bg-red-500/10 text-red-400 hover:text-red-300 text-xs font-semibold transition-all cursor-pointer"
                title="Delete this article"
              >
                <Trash2 size={13} />
                <span className="hidden sm:inline">Delete</span>
              </button>
            )}

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl gradient-accent text-primary-foreground text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:opacity-95 transition-all cursor-pointer"
            >
              <Save size={14} />
              <span>{isEditing ? "Save Changes" : "Publish Now"}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* Metadata Card */}
          <div className="card-glass rounded-3xl p-6 sm:p-8 border border-navy-border/60 space-y-6">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-cyan flex items-center gap-2">
              <FileText size={14} />
              Article Metadata
            </h3>

            {/* Title Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Article Title <span className="text-cyan">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Architecting Distributed M-Pesa Queues in East Africa"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full bg-navy-surface border border-navy-border rounded-xl px-4 py-3 text-base font-display font-bold text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/60 focus:outline-none transition-all"
              />
            </div>

            {/* Slug & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                  URL Slug
                </label>
                <div className="flex items-center bg-navy-surface border border-navy-border rounded-xl px-3 py-2 text-xs">
                  <span className="text-muted-foreground font-mono">/articles/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setIsCustomSlug(true);
                      setSlug(generateSlug(e.target.value));
                    }}
                    placeholder="my-article-slug"
                    className="flex-1 bg-transparent text-cyan font-mono outline-none px-1"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                  className="w-full bg-navy-surface border border-navy-border rounded-xl px-3.5 py-2.5 text-xs text-foreground focus:border-cyan/50 focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Summary / Excerpt (displayed on preview cards)
              </label>
              <textarea
                rows={2}
                placeholder="A concise 1-2 sentence overview of the technical concepts covered..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full bg-navy-surface border border-navy-border rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-cyan/50 focus:outline-none resize-none"
              />
            </div>

            {/* Tags Creator */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
                <span>Tags & Tech Stack</span>
                <span className="text-[10px] text-muted-foreground font-normal">
                  Press Enter or Add Tag
                </span>
              </label>
              <div className="flex flex-wrap items-center gap-2 p-2.5 bg-navy-surface border border-navy-border rounded-xl">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-elevated text-xs font-mono text-cyan border border-navy-border"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-muted-foreground hover:text-red-400 cursor-pointer ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="flex-1 min-w-[120px] bg-transparent text-xs text-foreground placeholder:text-muted-foreground/40 outline-none px-2 py-1"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-cyan text-muted-foreground hover:text-cyan font-semibold transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Gradient Theme Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Cover Gradient Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {GRADIENTS.map((g) => (
                  <button
                    key={g.name}
                    type="button"
                    onClick={() => setCoverGradient(g.value)}
                    className={`h-12 rounded-xl bg-gradient-to-r ${g.value} p-2 flex items-end justify-between border transition-all ${
                      coverGradient === g.value
                        ? "border-cyan ring-2 ring-cyan/40 scale-[1.02]"
                        : "border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <span className="text-[10px] font-bold text-foreground bg-navy/80 px-1.5 py-0.5 rounded backdrop-blur-sm">
                      {g.name}
                    </span>
                    {coverGradient === g.value && (
                      <CheckCircle2 size={12} className="text-cyan" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility & Read Time */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-navy-border/60">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-foreground">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded border-navy-border text-cyan focus:ring-cyan accent-cyan"
                  />
                  <span>Published Publicly</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-foreground">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded border-navy-border text-cyan focus:ring-cyan accent-cyan"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                <Clock size={13} className="text-cyan" />
                <span>Estimated reading time: ~{estimatedReadTime} min</span>
              </div>
            </div>
          </div>

          {/* Content Editor Section */}
          <div className="card-glass rounded-3xl p-6 sm:p-8 border border-navy-border/60 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-navy-border/60">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-cyan flex items-center gap-2">
                <Code size={14} />
                Article Body (Markdown Supported)
              </h3>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Template Selector Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan/30 bg-cyan/10 hover:bg-cyan/20 text-cyan text-xs font-bold transition-all cursor-pointer"
                  >
                    <LayoutTemplate size={13} />
                    <span>Starter Templates</span>
                    <ChevronDown size={12} className={`transition-transform duration-200 ${showTemplateMenu ? "rotate-180" : ""}`} />
                  </button>

                  {showTemplateMenu && (
                    <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-2 w-72 p-2 rounded-2xl bg-[#090e1c] border border-cyan/30 shadow-2xl z-30 space-y-1 backdrop-blur-md">
                      <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-b border-navy-border/60">
                        Choose an Engineering Scaffold
                      </div>
                      {ARTICLE_TEMPLATES.map((tpl) => (
                        <button
                          key={tpl.name}
                          type="button"
                          onClick={() => handleApplyTemplate(tpl)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-cyan/10 hover:text-cyan text-xs font-semibold text-foreground flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <span className="text-base">{tpl.icon}</span>
                          <div>
                            <span className="block leading-tight">{tpl.name}</span>
                            <span className="text-[10px] text-muted-foreground font-normal">{tpl.category}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 bg-navy-surface border border-navy-border rounded-xl p-1 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setViewMode("edit")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === "edit"
                        ? "bg-cyan text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Write Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("split")}
                    className={`hidden md:block px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === "split"
                        ? "bg-cyan text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Split View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("preview")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      viewMode === "preview"
                        ? "bg-cyan text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Live Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Markdown Toolbar */}
            {viewMode !== "preview" && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-navy-surface border border-navy-border rounded-xl text-muted-foreground text-xs">
                <button
                  type="button"
                  onClick={() => insertSnippet("## ", "")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors"
                  title="Heading 2"
                >
                  <Heading2 size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("### ", "")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors"
                  title="Heading 3"
                >
                  <Heading3 size={15} />
                </button>
                <span className="text-navy-border">|</span>
                <button
                  type="button"
                  onClick={() => insertSnippet("**", "**")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors"
                  title="Bold"
                >
                  <Bold size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("*", "*")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors"
                  title="Italic"
                >
                  <Italic size={15} />
                </button>
                <span className="text-navy-border">|</span>
                <button
                  type="button"
                  onClick={() => insertSnippet("```typescript\n", "\n```")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors"
                  title="Code Block"
                >
                  <Code size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("> ", "")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors"
                  title="Quote Callout"
                >
                  <Quote size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("> [!NOTE]\n> ", "")}
                  className="px-2 py-1 rounded hover:bg-white/5 hover:text-cyan text-[11px] font-mono font-semibold text-cyan transition-colors cursor-pointer"
                  title="Callout Note"
                >
                  📌 Note
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("> [!TIP]\n> ", "")}
                  className="px-2 py-1 rounded hover:bg-white/5 hover:text-emerald-400 text-[11px] font-mono font-semibold text-emerald-400 transition-colors cursor-pointer"
                  title="Callout Pro Tip"
                >
                  💡 Tip
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("> [!WARNING]\n> ", "")}
                  className="px-2 py-1 rounded hover:bg-white/5 hover:text-amber-400 text-[11px] font-mono font-semibold text-amber-400 transition-colors cursor-pointer"
                  title="Callout Warning"
                >
                  ⚠️ Warn
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("> [!STAT] 120,000+ | Bookings Executed with Zero Collisions\n\n", "")}
                  className="px-2 py-1 rounded hover:bg-white/5 hover:text-cyan text-[11px] font-mono font-semibold text-cyan flex items-center gap-1 transition-colors cursor-pointer"
                  title="Key Stat Metric Card"
                >
                  <TrendingUp size={12} />
                  <span>Stat</span>
                </button>
                <span className="text-navy-border">|</span>
                <button
                  type="button"
                  onClick={() => insertSnippet("\n| Benchmark | Before | After |\n| --- | --- | --- |\n| Latency | 450ms | 38ms |\n| P99 | 1.2s | 92ms |\n\n", "")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors flex items-center gap-1 cursor-pointer"
                  title="Markdown Table"
                >
                  <Table size={14} />
                  <span className="text-[11px] font-mono hidden sm:inline">Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("- [ ] ", "")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors cursor-pointer"
                  title="Checklist / Task"
                >
                  <CheckSquare size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("![Architecture Diagram](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800)\n\n", "")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors cursor-pointer"
                  title="Image with Caption"
                >
                  <ImageIcon size={14} />
                </button>
                <span className="text-navy-border">|</span>
                <button
                  type="button"
                  onClick={() => insertSnippet("- ", "")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors cursor-pointer"
                  title="Bullet List"
                >
                  <List size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("1. ", "")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors cursor-pointer"
                  title="Numbered List"
                >
                  <ListOrdered size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("[", "](https://example.com)")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors cursor-pointer"
                  title="Link"
                >
                  <LinkIcon size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("\n---\n", "")}
                  className="p-1.5 rounded hover:bg-white/5 hover:text-cyan transition-colors cursor-pointer"
                  title="Divider"
                >
                  <Minus size={15} />
                </button>
              </div>
            )}

            {/* Split / Single Viewport Area */}
            <div
              className={`grid gap-6 ${
                viewMode === "split" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {/* Markdown Editor Pane */}
              {viewMode !== "preview" && (
                <div className="space-y-1">
                  <textarea
                    id="article-markdown-editor"
                    rows={22}
                    required
                    placeholder="Write your article in Markdown here...

## Getting Started
Introduce the technical problem and architectural context...

```typescript
// Sample implementation code
const result = await processTransaction();
```"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-[#080d19] border border-navy-border rounded-2xl p-4 font-mono text-xs text-foreground placeholder:text-muted-foreground/30 focus:border-cyan/60 focus:outline-none leading-relaxed resize-y scrollbar-thin shadow-inner"
                  />
                </div>
              )}

              {/* Live Preview Pane */}
              {viewMode !== "edit" && (
                <div className="space-y-2">
                  <div className="rounded-2xl border border-navy-border bg-[#080d19]/80 p-5 sm:p-6 min-h-[420px] max-h-[600px] overflow-y-auto scrollbar-thin shadow-inner">
                    {content.trim() ? (
                      <SafeMarkdownRenderer content={content} />
                    ) : (
                      <div className="h-full py-20 text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
                        <Eye size={24} className="opacity-40" />
                        <span>Live rendered preview will appear here as you type...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Submit Bar */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <Link
              to="/articles"
              className="text-xs font-semibold text-muted-foreground hover:text-cyan transition-colors"
            >
              Cancel and Return
            </Link>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-primary-foreground font-display font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-90 transition-all cursor-pointer"
            >
              <Save size={15} />
              <span>{isEditing ? "Update Article" : "Publish Article"}</span>
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
