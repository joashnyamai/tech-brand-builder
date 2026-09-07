import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  PenSquare,
  Clock,
  ArrowRight,
  ArrowLeft,
  Tag,
  Download,
  Eye,
  Heart,
  Sparkles,
  SlidersHorizontal,
  RotateCcw
} from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { useArticles } from "@/hooks/use-articles";
import { ArticleCategory } from "@/types/article";

const CATEGORIES: ("All" | ArticleCategory)[] = [
  "All",
  "Fintech & M-Pesa",
  "Quality Assurance",
  "Backend & Databases",
  "Frontend Engineering",
  "Architecture & Cloud",
];

export default function ArticlesHub() {
  const { articles, exportArticlesJSON, resetToDefaultArticles } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | ArticleCategory>("All");
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "readTime">("newest");

  const publishedArticles = useMemo(() => {
    return articles.filter((a) => a.isPublished);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return publishedArticles
      .filter((art) => {
        const matchesCat = selectedCategory === "All" || art.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          art.title.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.tags.some((t) => t.toLowerCase().includes(q));
        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.views - a.views;
        if (sortBy === "readTime") return b.readTimeMinutes - a.readTimeMinutes;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  }, [publishedArticles, selectedCategory, searchQuery, sortBy]);

  const totalReadTime = useMemo(() => {
    return publishedArticles.reduce((acc, a) => acc + a.readTimeMinutes, 0);
  }, [publishedArticles]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative overflow-x-hidden selection:bg-cyan/20">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-cyan transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={exportArticlesJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-navy-border hover:border-cyan/40 bg-navy-surface text-muted-foreground hover:text-cyan text-xs font-medium transition-all cursor-pointer"
              title="Backup articles as JSON"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Export JSON</span>
            </button>
            <Link
              to="/articles/write"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg gradient-accent text-primary-foreground text-xs font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:opacity-95 transition-all"
            >
              <PenSquare size={13} />
              <span>Write Article</span>
            </Link>
          </div>
        </div>

        {/* Hero Section Banner */}
        <div className="card-glass rounded-3xl p-6 sm:p-10 mb-10 sm:mb-12 relative overflow-hidden border border-navy-border/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono font-semibold mb-4">
              <Sparkles size={12} className="animate-pulse" />
              <span>Engineering Publications & Knowledge Base</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight leading-tight">
              Articles & <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
              Explore in-depth technical breakdowns of real-world software architecture, high-concurrency fintech engines, automated QA frameworks, and low-bandwidth web performance in African tech ecosystems.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 pt-6 border-t border-navy-border/60">
              <div>
                <span className="font-display font-bold text-xl sm:text-2xl text-foreground">
                  {publishedArticles.length}
                </span>
                <p className="text-[11px] text-muted-foreground uppercase font-mono tracking-wider mt-0.5">
                  Published Posts
                </p>
              </div>
              <div>
                <span className="font-display font-bold text-xl sm:text-2xl text-cyan">
                  ~{totalReadTime}m
                </span>
                <p className="text-[11px] text-muted-foreground uppercase font-mono tracking-wider mt-0.5">
                  Total Reading Time
                </p>
              </div>
              <div>
                <span className="font-display font-bold text-xl sm:text-2xl text-foreground">
                  {CATEGORIES.length - 1}
                </span>
                <p className="text-[11px] text-muted-foreground uppercase font-mono tracking-wider mt-0.5">
                  Tech Domains
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by topic, keyword, or tech (#M-Pesa, #Jest)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-surface border border-navy-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-cyan/50 focus:outline-none transition-all"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SlidersHorizontal size={14} className="text-muted-foreground hidden sm:block" />
            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">Sort:</span>
            <div className="flex rounded-xl bg-navy-surface border border-navy-border p-1 gap-1">
              <button
                onClick={() => setSortBy("newest")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  sortBy === "newest" ? "bg-cyan text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setSortBy("popular")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  sortBy === "popular" ? "bg-cyan text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Most Read
              </button>
              <button
                onClick={() => setSortBy("readTime")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  sortBy === "readTime" ? "bg-cyan text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Duration
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0 mb-8 max-w-full flex-nowrap sm:flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-cyan border-cyan text-primary-foreground shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                  : "bg-navy-surface border-navy-border text-muted-foreground hover:text-cyan hover:border-cyan/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="card-glass rounded-2xl overflow-hidden flex flex-col justify-between hover-glow group border border-navy-border/60 hover:border-cyan/30 transition-all duration-300"
            >
              <div>
                {/* Gradient Header Banner */}
                <div
                  className={`h-28 sm:h-32 bg-gradient-to-r ${
                    article.coverGradient || "from-cyan-500/30 via-indigo-500/20 to-purple-600/30"
                  } p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-[#070b13]/40 backdrop-blur-[2px]" />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-navy/80 text-cyan border border-cyan/20 backdrop-blur-md">
                      {article.category}
                    </span>
                    {article.featured && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-cyan/20 text-cyan border border-cyan/30">
                        <Sparkles size={11} className="animate-pulse" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="relative z-10 flex items-center gap-3 text-[11px] text-foreground/80 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-cyan" />
                      {article.readTimeMinutes} min read
                    </span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <h2 className="font-display font-bold text-lg sm:text-xl text-foreground group-hover:text-cyan transition-colors duration-200 leading-snug line-clamp-2">
                    <Link to={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-navy text-[10px] text-muted-foreground border border-navy-border font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 sm:px-6 py-4 border-t border-navy-border/50 bg-navy-surface/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1" title="Views">
                    <Eye size={13} className="text-cyan/70" />
                    {article.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1" title="Applauds">
                    <Heart size={13} className="text-pink-400/80" />
                    {article.likes}
                  </span>
                </div>

                <Link
                  to={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan hover:text-cyan-glow group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-20 card-glass rounded-2xl p-8 max-w-lg mx-auto">
            <BookOpen size={32} className="mx-auto text-muted-foreground mb-3" />
            <h3 className="text-base font-semibold text-foreground">
              {publishedArticles.length === 0 ? "No Articles Published Yet" : "No articles match your search"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {publishedArticles.length === 0
                ? "Malila is currently writing new engineering articles and system breakdowns. Stay tuned or check back soon!"
                : `We couldn't find any articles matching "${searchQuery}" under ${selectedCategory}. Try resetting your filters.`}
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              {publishedArticles.length > 0 && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-4 py-2 rounded-xl border border-navy-border hover:border-cyan text-xs font-semibold text-muted-foreground hover:text-cyan transition-colors"
                >
                  Clear Filters
                </button>
              )}
              <Link
                to="/articles/write"
                className="px-4 py-2 rounded-xl gradient-accent text-primary-foreground text-xs font-bold"
              >
                {publishedArticles.length === 0 ? "Write First Article" : "Write This Topic"}
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
