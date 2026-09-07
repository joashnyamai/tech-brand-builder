import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  PenSquare,
  BookOpen,
  Eye,
  Heart,
  Edit,
  Trash2,
  ExternalLink,
  LogOut,
  Sparkles,
  Download,
  Database,
  Plus,
  ArrowRight,
  FileCheck,
  Clock,
  RotateCcw,
  Settings,
  UploadCloud,
  CheckCircle2,
  X,
  AlertTriangle,
  Key
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useArticles } from "@/hooks/use-articles";
import {
  isFirebaseConfigured,
  getStoredFirebaseConfig,
  saveFirebaseConfig,
  clearFirebaseConfig,
  FirebaseConfigParams
} from "@/lib/firebase";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { adminUser, logout } = useAuth();
  const {
    articles,
    updateArticle,
    deleteArticle,
    exportArticlesJSON,
    syncAllToFirestore,
    isFirestoreActive,
    firestoreStatus,
    firestoreError,
  } = useArticles();

  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Form state for Firebase config modal
  const existingConfig = getStoredFirebaseConfig();
  const [apiKey, setApiKey] = useState(existingConfig?.apiKey || "");
  const [projectId, setProjectId] = useState(existingConfig?.projectId || "");
  const [authDomain, setAuthDomain] = useState(existingConfig?.authDomain || "");
  const [storageBucket, setStorageBucket] = useState(existingConfig?.storageBucket || "");
  const [appId, setAppId] = useState(existingConfig?.appId || "");

  const totalViews = useMemo(() => articles.reduce((acc, a) => acc + (a.views || 0), 0), [articles]);
  const totalLikes = useMemo(() => articles.reduce((acc, a) => acc + (a.likes || 0), 0), [articles]);
  const publishedCount = useMemo(() => articles.filter((a) => a.isPublished).length, [articles]);
  const draftCount = useMemo(() => articles.filter((a) => !a.isPublished).length, [articles]);

  const filteredArticles = useMemo(() => {
    if (filter === "published") return articles.filter((a) => a.isPublished);
    if (filter === "draft") return articles.filter((a) => !a.isPublished);
    return articles;
  }, [articles, filter]);

  const handleTogglePublish = (id: string, currentStatus: boolean) => {
    updateArticle(id, { isPublished: !currentStatus });
    toast.success(currentStatus ? "Article moved to Drafts." : "Article published publicly!");
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteArticle(id);
      toast.info("Article deleted.");
    }
  };

  const handleSyncToFirestore = async () => {
    setSyncing(true);
    toast.info("Syncing articles to Firebase Firestore...");
    const res = await syncAllToFirestore();
    setSyncing(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(`Successfully uploaded ${res.count} articles to Firebase Firestore!`);
    }
  };

  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim() || !projectId.trim()) {
      toast.error("API Key and Project ID are required.");
      return;
    }

    const newConfig: FirebaseConfigParams = {
      apiKey: apiKey.trim(),
      projectId: projectId.trim(),
      authDomain: authDomain.trim() || `${projectId.trim()}.firebaseapp.com`,
      storageBucket: storageBucket.trim() || `${projectId.trim()}.appspot.com`,
      appId: appId.trim(),
    };

    saveFirebaseConfig(newConfig);
    toast.success("Firebase configuration saved! Reconnecting...");
  };

  const handleClearFirebaseConfig = () => {
    if (window.confirm("Disconnect Firebase configuration and return to default?")) {
      clearFirebaseConfig();
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.info("Signed out of admin session.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative overflow-x-hidden selection:bg-cyan/20">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-24">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-navy-border/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl sm:text-2xl text-foreground flex items-center gap-2">
                Admin Articles Console
                <span className="text-[10px] font-mono bg-cyan/10 border border-cyan/30 text-cyan px-2 py-0.5 rounded-full">
                  Authenticated
                </span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Signed in as <span className="text-cyan font-mono">{adminUser?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              to="/articles/write"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl gradient-accent text-primary-foreground text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:opacity-95 transition-all"
            >
              <Plus size={14} />
              <span>Create New Article</span>
            </Link>

            <button
              onClick={() => setShowConfigModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-navy-border hover:border-cyan/40 bg-navy-surface text-muted-foreground hover:text-cyan text-xs font-semibold transition-all cursor-pointer"
              title="Firebase Settings"
            >
              <Settings size={13} />
              <span className="hidden sm:inline">Firebase Config</span>
            </button>

            <button
              onClick={exportArticlesJSON}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-navy-border hover:border-cyan/40 bg-navy-surface text-muted-foreground hover:text-cyan text-xs font-semibold transition-all cursor-pointer"
              title="Download articles backup"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-500/20 hover:border-red-500/40 bg-red-500/10 text-red-400 hover:text-red-300 text-xs font-semibold transition-all cursor-pointer"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Firestore Security Rules Helper Banner */}
        {firestoreStatus === "permission-denied" && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                    Firebase Project Connected — Security Rules Update Required
                  </h3>
                  <a
                    href="https://console.firebase.google.com/project/portfolio-9cc1a/firestore/rules"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan hover:underline font-mono text-[11px]"
                  >
                    Open Firebase Console Rules <ExternalLink size={12} />
                  </a>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Your project <span className="text-foreground font-mono font-semibold">portfolio-9cc1a</span> is connected, but Firestore's default security rules are currently denying read/write requests. To activate public reading and writing, copy and paste this rule set into your Firebase Console:
                </p>
                <div className="relative mt-2">
                  <pre className="p-3 rounded-xl bg-black/60 border border-amber-500/20 text-cyan font-mono text-[11px] overflow-x-auto leading-relaxed">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articles/{articleId} {
      allow read: if true;
      allow write: if true;
    }
  }
}`}
                  </pre>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /articles/{articleId} {\n      allow read: if true;\n      allow write: if true;\n    }\n  }\n}`
                      );
                      toast.success("Firestore rules copied to clipboard!");
                    }}
                    className="absolute top-2.5 right-2.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] text-foreground font-mono transition-colors cursor-pointer"
                  >
                    Copy Rules
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Notification & Sync Action Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-navy-surface border border-navy-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <Database size={18} className="text-cyan flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">Database Storage: </span>
                {firestoreStatus === "connected" ? (
                  <span className="text-emerald-400 font-semibold font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Firebase Firestore Live
                  </span>
                ) : firestoreStatus === "permission-denied" ? (
                  <span className="text-amber-400 font-semibold font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Connected (Rules Denied)
                  </span>
                ) : isFirestoreActive ? (
                  <span className="text-cyan font-semibold font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                    Connecting to Firestore...
                  </span>
                ) : (
                  <span className="text-amber-400 font-semibold font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Local Storage Mode
                  </span>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {firestoreStatus === "connected"
                  ? "All published articles are synced live across devices via Firebase collection 'articles'."
                  : firestoreStatus === "permission-denied"
                  ? "Update your Firestore Security Rules in Firebase Console to enable remote database synchronization."
                  : "Connecting with credentials from portfolio-9cc1a..."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto flex-shrink-0">
            {isFirestoreActive ? (
              <button
                onClick={handleSyncToFirestore}
                disabled={syncing}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl gradient-accent text-primary-foreground text-xs font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:opacity-90 disabled:opacity-50 cursor-pointer"
              >
                <UploadCloud size={13} />
                <span>{syncing ? "Syncing..." : "Push All to Firestore"}</span>
              </button>
            ) : (
              <button
                onClick={() => setShowConfigModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-cyan/40 bg-cyan/10 text-cyan text-xs font-bold hover:bg-cyan/20 transition-all cursor-pointer"
              >
                <Database size={13} />
                <span>Connect Firebase DB</span>
              </button>
            )}

            <Link
              to="/articles"
              className="text-muted-foreground hover:text-cyan font-semibold flex items-center gap-1 text-xs"
            >
              <span>Public View</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Metrics Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="card-glass rounded-2xl p-4 sm:p-5 border border-navy-border/60">
            <span className="text-muted-foreground text-xs uppercase font-mono tracking-wider block mb-1">
              Total Articles
            </span>
            <span className="font-display font-black text-2xl sm:text-3xl text-foreground">
              {articles.length}
            </span>
          </div>

          <div className="card-glass rounded-2xl p-4 sm:p-5 border border-navy-border/60">
            <span className="text-muted-foreground text-xs uppercase font-mono tracking-wider block mb-1">
              Published Live
            </span>
            <span className="font-display font-black text-2xl sm:text-3xl text-emerald-400">
              {publishedCount}
            </span>
          </div>

          <div className="card-glass rounded-2xl p-4 sm:p-5 border border-navy-border/60">
            <span className="text-muted-foreground text-xs uppercase font-mono tracking-wider block mb-1">
              Total Views
            </span>
            <span className="font-display font-black text-2xl sm:text-3xl text-cyan flex items-center gap-1.5">
              <Eye size={20} className="opacity-80" />
              {totalViews.toLocaleString()}
            </span>
          </div>

          <div className="card-glass rounded-2xl p-4 sm:p-5 border border-navy-border/60">
            <span className="text-muted-foreground text-xs uppercase font-mono tracking-wider block mb-1">
              Total Applauds
            </span>
            <span className="font-display font-black text-2xl sm:text-3xl text-pink-400 flex items-center gap-1.5">
              <Heart size={20} className="opacity-80 fill-pink-400/20" />
              {totalLikes.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Articles Table & Filters */}
        <div className="card-glass rounded-3xl p-6 border border-navy-border/60 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-navy-border/60">
            <h2 className="font-display font-bold text-lg text-foreground">
              Article Inventory ({filteredArticles.length})
            </h2>

            {/* Filter Tabs */}
            <div className="flex rounded-xl bg-navy-surface border border-navy-border p-1 gap-1 self-start sm:self-auto text-xs">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  filter === "all" ? "bg-cyan text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All ({articles.length})
              </button>
              <button
                onClick={() => setFilter("published")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  filter === "published" ? "bg-cyan text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Published ({publishedCount})
              </button>
              <button
                onClick={() => setFilter("draft")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  filter === "draft" ? "bg-cyan text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Drafts ({draftCount})
              </button>
            </div>
          </div>

          {/* Table / List */}
          <div className="space-y-3">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="p-4 sm:p-5 rounded-2xl bg-navy-surface/50 border border-navy-border/60 hover:border-cyan/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                        art.isPublished
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {art.isPublished ? "Published" : "Draft"}
                    </span>
                    <span className="text-cyan text-xs font-mono font-semibold">
                      {art.category}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-muted-foreground text-xs font-mono">
                      {art.publishedAt}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-foreground truncate">
                    {art.title}
                  </h3>

                  <p className="text-xs text-muted-foreground truncate max-w-xl">
                    {art.excerpt}
                  </p>
                </div>

                {/* Metrics & Actions */}
                <div className="flex items-center gap-3 self-end sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-navy-border/40 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mr-2">
                    <span className="flex items-center gap-1" title="Views">
                      <Eye size={12} className="text-cyan" /> {art.views}
                    </span>
                    <span className="flex items-center gap-1" title="Likes">
                      <Heart size={12} className="text-pink-400" /> {art.likes}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleTogglePublish(art.id, art.isPublished)}
                      className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                        art.isPublished
                          ? "border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                          : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                      }`}
                      title={art.isPublished ? "Unpublish to Draft" : "Publish to Live Site"}
                    >
                      {art.isPublished ? "Draft" : "Publish"}
                    </button>

                    <Link
                      to={`/articles/edit/${art.id}`}
                      className="p-2 rounded-lg border border-navy-border hover:border-cyan text-muted-foreground hover:text-cyan transition-colors"
                      title="Edit Article"
                    >
                      <Edit size={14} />
                    </Link>

                    {art.isPublished && (
                      <Link
                        to={`/articles/${art.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg border border-navy-border hover:border-cyan text-muted-foreground hover:text-cyan transition-colors"
                        title="View Live"
                      >
                        <ExternalLink size={14} />
                      </Link>
                    )}

                    <button
                      onClick={() => handleDelete(art.id, art.title)}
                      className="p-2 rounded-lg border border-red-500/20 hover:border-red-500 text-muted-foreground hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No articles found matching the "{filter}" filter.
            </div>
          )}
        </div>
      </main>

      {/* Firebase Configuration Modal */}
      <AnimatePresence>
        {showConfigModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg card-glass rounded-3xl p-6 sm:p-8 border border-navy-border shadow-2xl relative space-y-6"
            >
              <div className="flex items-center justify-between border-b border-navy-border pb-4">
                <div className="flex items-center gap-2.5">
                  <Database size={20} className="text-cyan" />
                  <h3 className="font-display font-bold text-lg text-foreground">
                    Firebase Firestore Configuration
                  </h3>
                </div>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveFirebaseConfig} className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Enter your Firebase Web App credentials below to store articles permanently in your Firestore database. You can find these in{" "}
                  <strong className="text-foreground">Firebase Console → Project Settings → General</strong>.
                </p>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">
                    Firebase API Key <span className="text-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="AIzaSy..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-navy-surface border border-navy-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-cyan/50 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">
                      Project ID <span className="text-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="my-portfolio-project"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                      className="w-full bg-navy-surface border border-navy-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-cyan/50 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">
                      Auth Domain
                    </label>
                    <input
                      type="text"
                      placeholder="my-project.firebaseapp.com"
                      value={authDomain}
                      onChange={(e) => setAuthDomain(e.target.value)}
                      className="w-full bg-navy-surface border border-navy-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-cyan/50 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">
                      Storage Bucket
                    </label>
                    <input
                      type="text"
                      placeholder="my-project.appspot.com"
                      value={storageBucket}
                      onChange={(e) => setStorageBucket(e.target.value)}
                      className="w-full bg-navy-surface border border-navy-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-cyan/50 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">
                      App ID
                    </label>
                    <input
                      type="text"
                      placeholder="1:123456789:web:abcdef"
                      value={appId}
                      onChange={(e) => setAppId(e.target.value)}
                      className="w-full bg-navy-surface border border-navy-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-cyan/50 font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan/5 border border-cyan/15 text-[11px] text-muted-foreground leading-relaxed">
                  💡 <strong>Tip:</strong> In Firestore, make sure your Security Rules permit reading for all visitors and writing for authenticated users:
                  <pre className="mt-1 p-2 rounded bg-black/40 text-[10px] font-mono text-cyan overflow-x-auto">
                    {`allow read: if true;
allow write: if request.auth != null;`}
                  </pre>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-navy-border">
                  {existingConfig ? (
                    <button
                      type="button"
                      onClick={handleClearFirebaseConfig}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                    >
                      Reset / Disconnect
                    </button>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowConfigModal(false)}
                      className="px-4 py-2 rounded-xl border border-navy-border text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl gradient-accent text-primary-foreground text-xs font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)] hover:opacity-90 cursor-pointer"
                    >
                      Save & Connect
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
