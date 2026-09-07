import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Eye,
  Heart,
  Share2,
  Check,
  Copy,
  Linkedin,
  Twitter,
  ExternalLink,
  BookOpen,
  PenSquare,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Hash
} from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import SafeMarkdownRenderer from "@/components/articles/SafeMarkdownRenderer";
import { useArticles } from "@/hooks/use-articles";
import { useAuth } from "@/context/AuthContext";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    articles,
    loading,
    getArticleBySlug,
    fetchSingleArticleBySlug,
    likeArticle,
    incrementView
  } = useArticles();
  const { isAdmin } = useAuth();
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [directArticle, setDirectArticle] = useState<any>(null);
  const [fetchingDirect, setFetchingDirect] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const existing = getArticleBySlug(slug);
    if (existing) {
      setDirectArticle(existing);
    } else {
      setFetchingDirect(true);
      fetchSingleArticleBySlug(slug).then((res) => {
        if (res) setDirectArticle(res);
        setFetchingDirect(false);
      });
    }
  }, [slug, articles, getArticleBySlug, fetchSingleArticleBySlug]);

  const article = directArticle || (slug ? getArticleBySlug(slug) : undefined);
  const isPageLoading = (loading && !article) || fetchingDirect;

  // Scroll Progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Increment view count on mount
  useEffect(() => {
    if (article) {
      incrementView(article.id);
    }
  }, [article?.id]);

  // Related articles in same category
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter((a) => a.id !== article.id && a.isPublished)
      .slice(0, 2);
  }, [article, articles]);

  // Extract ## headings for interactive Table of Contents
  const headings = useMemo(() => {
    if (!article?.content) return [];
    const lines = article.content.split("\n");
    const list: { title: string; id: string }[] = [];
    for (const line of lines) {
      if (line.startsWith("## ")) {
        const title = line.slice(3).replace(/[*`_#]/g, "").trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        if (title && id) {
          list.push({ title, id });
        }
      }
    }
    return list;
  }, [article?.content]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareTwitter = () => {
    if (!article) return;
    const text = encodeURIComponent(`Reading "${article.title}" by @joashnyamai`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const handleShareWhatsApp = () => {
    if (!article) return;
    const text = encodeURIComponent(`Check out this article by Malila Nyamai: ${article.title} - ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleLike = () => {
    if (!article || hasLiked) return;
    likeArticle(article.id);
    setHasLiked(true);
  };

  if (isPageLoading && !article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-3xl mx-auto px-6 pt-40 pb-20 w-full space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan mx-auto animate-pulse">
            <BookOpen size={24} />
          </div>
          <h2 className="font-display text-lg font-bold text-foreground">
            Loading Article...
          </h2>
          <p className="text-xs text-muted-foreground font-mono">
            Fetching content from database...
          </p>
          <div className="space-y-4 max-w-md mx-auto pt-6 opacity-40">
            <div className="h-4 bg-navy-surface rounded-full animate-pulse" />
            <div className="h-4 bg-navy-surface rounded-full animate-pulse w-5/6 mx-auto" />
            <div className="h-4 bg-navy-surface rounded-full animate-pulse w-4/6 mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-6 pt-40 pb-20 text-center">
          <BookOpen size={40} className="mx-auto text-cyan mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground">Article Not Found</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-2">
            The article you requested could not be located. It might have been moved or unpublished.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <Link
              to="/articles"
              className="px-4 py-2 rounded-xl gradient-accent text-primary-foreground text-xs font-bold"
            >
              Browse All Articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative overflow-x-hidden selection:bg-cyan/20">
      {/* Scroll Progress Bar at very top */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan via-blue-500 to-indigo-500 z-[100] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-cyan transition-colors"
          >
            <ArrowLeft size={14} />
            <span>All Articles</span>
          </Link>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                to={`/articles/edit/${article.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-navy-border hover:border-cyan/40 bg-navy-surface text-muted-foreground hover:text-cyan text-xs font-semibold transition-all"
              >
                <PenSquare size={13} />
                <span>Edit Article</span>
              </Link>
            )}
          </div>
        </div>

        {/* Article Header Card */}
        <header className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan/10 text-cyan border border-cyan/20">
              {article.category}
            </span>
            {article.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-cyan/20 text-cyan border border-cyan/30">
                <Sparkles size={11} className="animate-pulse" />
                Featured Post
              </span>
            )}
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl md:text-5xl text-foreground tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed pt-1">
            {article.excerpt}
          </p>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-navy-border/60 py-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-xl object-cover border border-cyan/30"
              />
              <div>
                <span className="font-display font-bold text-sm text-foreground block">
                  {article.author.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-cyan" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-cyan" />
                {article.readTimeMinutes} min read
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Eye size={13} className="text-cyan" />
                {article.views} views
              </span>
            </div>
          </div>
        </header>

        {/* 2-Column Content Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start mb-16">
          <div className="min-w-0">
            {/* Article Body Renderer */}
            <article className="card-glass rounded-3xl p-6 sm:p-10 border border-navy-border/60 shadow-xl mb-10">
              <SafeMarkdownRenderer content={article.content} />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-8 mt-10 border-t border-navy-border/60">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-navy text-xs text-cyan border border-navy-border font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Engagement & Share Bar */}
            <div className="card-glass rounded-2xl p-5 border border-navy-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    hasLiked
                      ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                      : "bg-navy-surface border border-navy-border hover:border-pink-500/40 text-muted-foreground hover:text-pink-400"
                  }`}
                >
                  <Heart size={15} className={hasLiked ? "fill-pink-400" : ""} />
                  <span>{article.likes} Applauds</span>
                </button>

                <span className="text-xs text-muted-foreground hidden sm:inline">
                  Found this valuable? Share with your network:
                </span>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleShareTwitter}
                  className="p-2 rounded-xl bg-navy-surface border border-navy-border hover:border-cyan text-muted-foreground hover:text-cyan transition-colors"
                  title="Share on X / Twitter"
                >
                  <Twitter size={15} />
                </button>
                <button
                  onClick={handleShareLinkedIn}
                  className="p-2 rounded-xl bg-navy-surface border border-navy-border hover:border-cyan text-muted-foreground hover:text-cyan transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={15} />
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="p-2 rounded-xl bg-navy-surface border border-navy-border hover:border-cyan text-muted-foreground hover:text-cyan transition-colors"
                  title="Share on WhatsApp"
                >
                  <MessageSquare size={15} />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-navy-surface border border-navy-border hover:border-cyan text-muted-foreground hover:text-cyan text-xs font-semibold transition-all cursor-pointer"
                  title="Copy URL"
                >
                  {copiedLink ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Desktop Sidebar */}
          <aside className="hidden lg:block sticky top-28 space-y-6">
            {headings.length > 0 && (
              <div className="card-glass rounded-2xl p-5 border border-navy-border/60 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan border-b border-navy-border/60 pb-2.5">
                  <Hash size={14} />
                  <span>On This Page</span>
                </div>
                <nav className="space-y-1 text-xs max-h-[50vh] overflow-y-auto scrollbar-thin pr-1">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="block text-muted-foreground hover:text-cyan transition-colors py-1 leading-snug truncate"
                    >
                      {h.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Reading Status & Actions Widget */}
            <div className="card-glass rounded-2xl p-5 border border-navy-border/60 space-y-3 text-xs shadow-xl">
              <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground uppercase">
                <span>Reading Progress</span>
                <span className="text-cyan font-bold">{Math.round(scrollProgress)}%</span>
              </div>
              <div className="w-full bg-navy-surface rounded-full h-1.5 overflow-hidden border border-navy-border/60">
                <div
                  className="bg-gradient-to-r from-cyan to-blue-500 h-full rounded-full transition-all duration-100"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <div className="pt-2 border-t border-navy-border/60 flex items-center justify-between">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    hasLiked
                      ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                      : "bg-navy-surface border border-navy-border hover:border-pink-500/40 text-muted-foreground hover:text-pink-400"
                  }`}
                >
                  <Heart size={13} className={hasLiked ? "fill-pink-400" : ""} />
                  <span>{article.likes} Applauds</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-cyan font-mono transition-colors cursor-pointer"
                  title="Copy link"
                >
                  <Copy size={12} />
                  <span>{copiedLink ? "Copied" : "Share"}</span>
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Author Profile Card */}
        <div className="card-glass rounded-3xl p-6 sm:p-8 border border-navy-border/60 mb-16 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          ></img>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Written by {article.author.name}
                </h3>
                <p className="text-xs text-cyan font-mono">{article.author.role} • Nairobi, Kenya</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Software Engineer, QA Specialist, and IT Consultant with 3+ years engineering scalable web platforms, automated testing frameworks, and M-Pesa integrated cloud systems.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={article.author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan hover:underline font-semibold flex items-center gap-1"
              >
                GitHub Profile <ExternalLink size={11} />
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href={article.author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan hover:underline font-semibold flex items-center gap-1"
              >
                LinkedIn <ExternalLink size={11} />
              </a>
              <span className="text-muted-foreground">•</span>
              <Link to="/#contact" className="text-xs text-cyan hover:underline font-semibold">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-foreground">
                Related Technical Writings
              </h3>
              <Link
                to="/articles"
                className="text-xs text-cyan hover:underline font-semibold inline-flex items-center gap-1"
              >
                View all articles <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/articles/${rel.slug}`}
                  className="card-glass rounded-2xl p-5 border border-navy-border hover:border-cyan/30 transition-all hover-glow group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan font-mono">
                      {rel.category}
                    </span>
                    <h4 className="font-display font-bold text-base text-foreground group-hover:text-cyan transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-navy-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{rel.readTimeMinutes} min read</span>
                    <span className="text-cyan font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
