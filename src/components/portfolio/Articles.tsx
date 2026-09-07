import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ArrowRight, PenSquare, Tag, Eye, Heart, Sparkles } from "lucide-react";
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

export default function Articles({ isOs = false }: { isOs?: boolean }) {
  const { articles } = useArticles();
  const [selectedCategory, setSelectedCategory] = useState<"All" | ArticleCategory>("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const publishedArticles = articles.filter((a) => a.isPublished);

  const filteredArticles = publishedArticles.filter((art) => {
    if (selectedCategory === "All") return true;
    return art.category === selectedCategory;
  });

  return (
    <div
      id="articles"
      ref={ref}
      className={isOs ? "p-4 md:p-8 max-h-[75vh] overflow-y-auto" : "py-16 sm:py-28 px-4 sm:px-6 bg-navy-surface/30 relative"}
    >
      <div className="max-w-6xl mx-auto">
        {!isOs && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-cyan text-xs tracking-widest uppercase font-medium">07 / Articles & Insights</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
                Engineering <span className="text-gradient">Writings</span>
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-3 max-w-xl leading-relaxed">
                Technical write-ups, architectural blueprints, and lessons learned engineering high-concurrency fintech platforms, QA pipelines, and resilient web systems.
              </p>
              <div className="section-divider mt-4 sm:mt-6" />
            </motion.div>

            {/* Action Buttons: Write & View Archive */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <Link
                to="/articles/write"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-accent text-primary-foreground text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:opacity-95 transition-all"
              >
                <PenSquare size={14} />
                <span>Write Article</span>
              </Link>
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-navy-border hover:border-cyan/40 bg-navy-surface text-foreground text-xs font-semibold hover:text-cyan transition-all"
              >
                <BookOpen size={14} />
                <span>Browse All ({publishedArticles.length})</span>
              </Link>
            </motion.div>
          </div>
        )}

        {/* Empty State when no articles published yet */}
        {publishedArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="card-glass rounded-2xl p-8 sm:p-14 text-center max-w-xl mx-auto border border-navy-border/60"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan mx-auto mb-4">
              <BookOpen size={26} />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              Technical Articles Coming Soon
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
              In-depth technical write-ups, fintech architecture case studies, and engineering insights will appear here soon.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <Link
                to="/articles/write"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-primary-foreground text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:opacity-95 transition-all"
              >
                <PenSquare size={13} />
                <span>Write First Article</span>
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Category Filters */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0 mb-8 sm:mb-10 max-w-full flex-nowrap sm:flex-wrap"
            >
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
            </motion.div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article, idx) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
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
                      <h3 className="font-display font-bold text-lg sm:text-xl text-foreground group-hover:text-cyan transition-colors duration-200 leading-snug line-clamp-2">
                        <Link to={`/articles/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {article.tags.slice(0, 4).map((tag) => (
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

            {/* If a category filter returned 0 results */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-16 card-glass rounded-2xl p-8">
                <BookOpen size={28} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-semibold text-foreground">No articles in this category yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Be the first to publish a technical post under this topic.
                </p>
                <Link
                  to="/articles/write"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl gradient-accent text-primary-foreground text-xs font-bold"
                >
                  <PenSquare size={13} />
                  <span>Write Post Now</span>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
