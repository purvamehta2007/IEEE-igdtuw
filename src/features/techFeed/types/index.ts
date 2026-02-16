export type ArticleCategory = 'trending' | 'ai' | 'research' | 'developer' | 'ieee_updates' | 'opportunities';

export type ArticleSubcategory =
  | 'Artificial Intelligence'
  | 'Cybersecurity'
  | 'Robotics'
  | 'Quantum Computing'
  | 'Software Engineering'
  | 'Standards'
  | 'Student Achievement'
  | 'Workshops'
  | 'Programming Tips'
  | 'Developer Tools'
  | 'Internships'
  | 'Hackathons'
  | 'Tech Competitions';

export interface TechFeedArticle {
  id: string;
  title: string;
  summary: string;
  full_content?: string;
  category: ArticleCategory;
  subcategory?: ArticleSubcategory;
  image_url?: string;
  source_url?: string;
  source_name?: string;
  tags: string[];
  is_trending: boolean;
  view_count: number;
  ai_tldr?: string;
  published_date: string;
  created_at: string;
}

export interface TechFeedBookmark {
  id: string;
  user_id: string;
  article_id: string;
  bookmarked_at: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string[];
  starter_code?: string;
  solution?: string;
  test_cases?: Record<string, any>;
  published_date: string;
  created_at: string;
}

export interface TechFeedState {
  articles: TechFeedArticle[];
  challenges: CodingChallenge[];
  bookmarkedArticles: Set<string>;
  selectedCategory: ArticleCategory | 'all';
  loading: boolean;
  error: string | null;
}

export interface TechFeedResponse {
  articles: TechFeedArticle[];
  total: number;
  hasMore: boolean;
}
