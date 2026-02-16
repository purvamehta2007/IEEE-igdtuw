import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { techFeedAPI } from '../services/techFeedAPI';
import type { TechFeedArticle, TechFeedState, ArticleCategory, CodingChallenge } from '../types';

export function useTechFeed() {
  const [state, setState] = useState<TechFeedState>({
    articles: [],
    challenges: [],
    bookmarkedArticles: new Set(),
    selectedCategory: 'all',
    loading: true,
    error: null,
  });

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id || null);
    };

    checkUser();
  }, []);

  const loadArticles = async (category: ArticleCategory | 'all' = 'all') => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const articles = await techFeedAPI.getArticles(category as ArticleCategory);
      setState(prev => ({ ...prev, articles, selectedCategory: category, loading: false }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to load articles',
      }));
    }
  };

  const loadChallenges = async () => {
    try {
      const challenges = await techFeedAPI.getCodingChallenges();
      setState(prev => ({ ...prev, challenges }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to load challenges',
      }));
    }
  };

  const loadBookmarks = async (uid: string) => {
    try {
      const bookmarkedArticles = await techFeedAPI.getBookmarkedArticles(uid);
      setState(prev => ({ ...prev, bookmarkedArticles }));
    } catch (error: any) {
      console.error('Failed to load bookmarks:', error);
    }
  };

  const toggleBookmark = async (articleId: string) => {
    if (!userId) return;

    try {
      if (state.bookmarkedArticles.has(articleId)) {
        await techFeedAPI.removeBookmark(userId, articleId);
        setState(prev => {
          const newBookmarks = new Set(prev.bookmarkedArticles);
          newBookmarks.delete(articleId);
          return { ...prev, bookmarkedArticles: newBookmarks };
        });
      } else {
        await techFeedAPI.bookmarkArticle(userId, articleId);
        setState(prev => ({
          ...prev,
          bookmarkedArticles: new Set([...prev.bookmarkedArticles, articleId]),
        }));
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to update bookmark',
      }));
    }
  };

  const getTrendingArticles = async () => {
    setState(prev => ({ ...prev, loading: true }));

    try {
      const articles = await techFeedAPI.getTrendingArticles();
      setState(prev => ({ ...prev, articles, loading: false }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to load trending articles',
      }));
    }
  };

  const getArticlesByCategory = async (category: ArticleCategory, subcategory?: string) => {
    setState(prev => ({ ...prev, loading: true }));

    try {
      const articles = await techFeedAPI.getArticlesByCategory(category, subcategory);
      setState(prev => ({ ...prev, articles, selectedCategory: category, loading: false }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to load articles',
      }));
    }
  };

  const searchArticles = async (query: string) => {
    if (!query.trim()) {
      loadArticles();
      return;
    }

    setState(prev => ({ ...prev, loading: true }));

    try {
      const articles = await techFeedAPI.searchArticles(query);
      setState(prev => ({ ...prev, articles, loading: false }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to search articles',
      }));
    }
  };

  useEffect(() => {
    loadArticles();
    loadChallenges();

    if (userId) {
      loadBookmarks(userId);
    }
  }, [userId]);

  return {
    ...state,
    loadArticles,
    loadChallenges,
    loadBookmarks,
    toggleBookmark,
    getTrendingArticles,
    getArticlesByCategory,
    searchArticles,
    userId,
  };
}
