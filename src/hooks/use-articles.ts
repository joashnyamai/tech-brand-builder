import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  increment
} from "firebase/firestore";

const STORAGE_KEY = "portfolio_articles";
const EVENT_NAME = "portfolio_articles_updated";

const DEFAULT_AUTHOR = {
  name: "Malila Nyamai",
  role: "Software & QA Engineer",
  avatar: "/lovable-uploads/c7c664b4-d576-464e-bce0-6819a3b6fc97.png",
  github: "https://github.com/joashnyamai",
  linkedin: "https://linkedin.com/in/malila-nyamai-0b2711221",
};

export const PRESEEDED_ARTICLES: Article[] = [];
const DUMMY_IDS = new Set(["art-1", "art-2", "art-3", "art-4"]);

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const isFirestoreActive = isFirebaseConfigured() && Boolean(db);
  const [firestoreStatus, setFirestoreStatus] = useState<
    "connected" | "connecting" | "permission-denied" | "error" | "offline"
  >(isFirestoreActive ? "connecting" : "offline");
  const [firestoreError, setFirestoreError] = useState<string | null>(null);

  // Local storage loader with dummy data purge
  const loadLocalArticles = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter((a: Article) => !DUMMY_IDS.has(a.id));
          if (cleaned.length !== parsed.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
          }
          setArticles(cleaned);
          return cleaned;
        }
      }
      setArticles([]);
      return [];
    } catch (e) {
      setArticles([]);
      return [];
    }
  };

  useEffect(() => {
    if (isFirestoreActive && db) {
      // Set up real-time listener from Firestore collection
      const articlesCol = collection(db, "articles");
      const unsubscribe = onSnapshot(
        articlesCol,
        async (snapshot) => {
          setFirestoreStatus("connected");
          setFirestoreError(null);
          if (!snapshot.empty) {
            const remoteArticles: Article[] = snapshot.docs
              .map((docSnap) => ({
                ...(docSnap.data() as Article),
                id: docSnap.id,
              }))
              .filter((a) => !DUMMY_IDS.has(a.id));
            // Sort by publishedAt descending
            remoteArticles.sort(
              (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            );
            setArticles(remoteArticles);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteArticles));
          } else {
            setArticles([]);
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
          }
          setLoading(false);
        },
        (error: any) => {
          console.warn("Firestore snapshot error, switching to local cache:", error);
          if (error?.code === "permission-denied") {
            setFirestoreStatus("permission-denied");
            setFirestoreError(
              "Firestore Security Rules are denying read access. Update rules in Firebase Console to allow read."
            );
          } else {
            setFirestoreStatus("error");
            setFirestoreError(error?.message || "Failed to sync with Firestore.");
          }
          loadLocalArticles();
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      // Offline or local storage mode
      loadLocalArticles();
      setLoading(false);

      const handleUpdate = () => {
        loadLocalArticles();
      };

      window.addEventListener(EVENT_NAME, handleUpdate);
      window.addEventListener("storage", handleUpdate);
      return () => {
        window.removeEventListener(EVENT_NAME, handleUpdate);
        window.removeEventListener("storage", handleUpdate);
      };
    }
  }, [isFirestoreActive]);

  const notifyLocalChange = () => {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  };

  const publishArticle = async (
    newArticle: Omit<Article, "id" | "publishedAt" | "views" | "likes" | "author">
  ) => {
    const id = "art-" + Date.now();
    const fullArticle: Article = {
      ...newArticle,
      id,
      publishedAt: new Date().toISOString().split("T")[0],
      views: 1,
      likes: 0,
      author: DEFAULT_AUTHOR,
      isPublished: true,
    };

    if (isFirestoreActive && db) {
      try {
        await setDoc(doc(db, "articles", id), fullArticle);
      } catch (e) {
        console.error("Error writing article to Firestore:", e);
      }
    }

    const updated = [fullArticle, ...articles.filter((a) => a.slug !== fullArticle.slug)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setArticles(updated);
    notifyLocalChange();
    return fullArticle;
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    const updatedPayload = {
      ...updates,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    if (isFirestoreActive && db) {
      try {
        await updateDoc(doc(db, "articles", id), updatedPayload);
      } catch (e) {
        console.error("Error updating article in Firestore:", e);
      }
    }

    const updated = articles.map((art) => (art.id === id ? { ...art, ...updatedPayload } : art));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setArticles(updated);
    notifyLocalChange();
  };

  const deleteArticle = async (id: string) => {
    if (isFirestoreActive && db) {
      try {
        await deleteDoc(doc(db, "articles", id));
      } catch (e) {
        console.error("Error deleting article from Firestore:", e);
      }
    }

    const updated = articles.filter((art) => art.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setArticles(updated);
    notifyLocalChange();
  };

  const getArticleBySlug = (slug: string): Article | undefined => {
    return articles.find((a) => a.slug === slug);
  };

  const likeArticle = async (id: string) => {
    if (isFirestoreActive && db) {
      try {
        await updateDoc(doc(db, "articles", id), {
          likes: increment(1),
        });
      } catch (e) {
        console.error("Error incrementing like in Firestore:", e);
      }
    }

    const updated = articles.map((a) => (a.id === id ? { ...a, likes: a.likes + 1 } : a));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setArticles(updated);
    notifyLocalChange();
  };

  const incrementView = async (id: string) => {
    if (isFirestoreActive && db) {
      try {
        await updateDoc(doc(db, "articles", id), {
          views: increment(1),
        });
      } catch (e) {
        // Quiet failure for views
      }
    }

    const updated = articles.map((a) => (a.id === id ? { ...a, views: a.views + 1 } : a));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setArticles(updated);
  };

  const resetToDefaultArticles = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setArticles([]);
    notifyLocalChange();
  };

  const exportArticlesJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(articles, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `malila-articles-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const syncAllToFirestore = async (): Promise<{ count: number; error?: string }> => {
    if (!isFirestoreActive || !db) {
      return { count: 0, error: "Firebase Firestore is not connected. Configure your Firebase keys first." };
    }

    try {
      let count = 0;
      for (const art of articles) {
        await setDoc(doc(db, "articles", art.id), art);
        count++;
      }
      setFirestoreStatus("connected");
      setFirestoreError(null);
      return { count };
    } catch (err: any) {
      console.error("Error syncing articles to Firestore:", err);
      let message = err.message || "Failed to sync articles to Firestore.";
      if (err?.code === "permission-denied") {
        setFirestoreStatus("permission-denied");
        message = "Permission denied: Update your Firestore Security Rules in Firebase Console to allow read & write.";
      }
      return { count: 0, error: message };
    }
  };

  return {
    articles,
    loading,
    isFirestoreActive,
    firestoreStatus,
    firestoreError,
    publishArticle,
    updateArticle,
    deleteArticle,
    getArticleBySlug,
    likeArticle,
    incrementView,
    resetToDefaultArticles,
    exportArticlesJSON,
    syncAllToFirestore,
  };
}

