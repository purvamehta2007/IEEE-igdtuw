import { supabase } from '../../../lib/supabase';
import type { TechFeedArticle, TechFeedBookmark, CodingChallenge, ArticleCategory } from '../types';

export const techFeedAPI = {
  async getArticles(category?: ArticleCategory, limit = 20) {
    let query = supabase
      .from('tech_feed_articles')
      .select('*')
      .order('published_date', { ascending: false })
      .limit(limit);

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as TechFeedArticle[];
  },

  async getTrendingArticles(limit = 10) {
    const { data, error } = await supabase
      .from('tech_feed_articles')
      .select('*')
      .eq('is_trending', true)
      .order('view_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as TechFeedArticle[];
  },

  async getArticlesByCategory(category: ArticleCategory, subcategory?: string, limit = 15) {
    let query = supabase
      .from('tech_feed_articles')
      .select('*')
      .eq('category', category)
      .order('published_date', { ascending: false })
      .limit(limit);

    if (subcategory) {
      query = query.eq('subcategory', subcategory);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as TechFeedArticle[];
  },

  async getArticleById(id: string) {
    const { data, error } = await supabase
      .from('tech_feed_articles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      await this.recordView(id);
    }

    return data as TechFeedArticle | null;
  },

  async getCodingChallenges(limit = 5) {
    const { data, error } = await supabase
      .from('coding_challenges')
      .select('*')
      .order('published_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as CodingChallenge[];
  },

  async getChallengeById(id: string) {
    const { data, error } = await supabase
      .from('coding_challenges')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as CodingChallenge | null;
  },

  async getBookmarkedArticles(userId: string) {
    const { data, error } = await supabase
      .from('tech_feed_bookmarks')
      .select('article_id')
      .eq('user_id', userId);

    if (error) throw error;
    return new Set((data || []).map(b => b.article_id));
  },

  async bookmarkArticle(userId: string, articleId: string) {
    const { error } = await supabase
      .from('tech_feed_bookmarks')
      .insert({
        user_id: userId,
        article_id: articleId,
      });

    if (error && error.code !== '23505') throw error;
  },

  async removeBookmark(userId: string, articleId: string) {
    const { error } = await supabase
      .from('tech_feed_bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('article_id', articleId);

    if (error) throw error;
  },

  async recordView(articleId: string, userId?: string) {
    if (!userId) return;

    const { error } = await supabase
      .from('tech_feed_views')
      .insert({
        user_id: userId,
        article_id: articleId,
      });

    if (error && error.code !== '23505') throw error;

    await supabase
      .from('tech_feed_articles')
      .update({ view_count: supabase.rpc('increment_view_count') })
      .eq('id', articleId);
  },

  async searchArticles(query: string, limit = 20) {
    const { data, error } = await supabase
      .from('tech_feed_articles')
      .select('*')
      .or(`title.ilike.%${query}%,summary.ilike.%${query}%,tags.cs.{${query}}`)
      .order('published_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as TechFeedArticle[];
  },

  async getArticlesByTag(tag: string, limit = 20) {
    const { data, error } = await supabase
      .from('tech_feed_articles')
      .select('*')
      .contains('tags', [tag])
      .order('published_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as TechFeedArticle[];
  },
};
