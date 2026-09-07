export type ArticleCategory =
  | "Architecture & Cloud"
  | "Fintech & M-Pesa"
  | "Quality Assurance"
  | "Frontend Engineering"
  | "Backend & Databases"
  | "AI & Emerging Tech";

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar: string;
  github?: string;
  linkedin?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown formatted content
  category: ArticleCategory;
  tags: string[];
  coverGradient?: string;
  coverImage?: string;
  readTimeMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  isPublished: boolean;
  featured: boolean;
  author: ArticleAuthor;
  views: number;
  likes: number;
}
