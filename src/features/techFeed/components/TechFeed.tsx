import { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import { useTechFeed } from '../hooks/useTechFeed';
import { TrendingToday } from './sections/TrendingToday';
import { AIAndTech } from './sections/AIAndTech';
import { IEEEUpdates } from './sections/IEEEUpdates';
import { DeveloperCorner } from './sections/DeveloperCorner';
import { Opportunities } from './sections/Opportunities';
import { GradientText } from '../../../components/ui/GradientText';
import { GlassCard } from '../../../components/ui/GlassCard';
import type { ArticleSubcategory } from '../types';

export function TechFeed() {
  const {
    articles,
    challenges,
    bookmarkedArticles,
    loading,
    error,
    toggleBookmark,
    searchArticles,
  } = useTechFeed();

  const [searchQuery, setSearchQuery] = useState('');
  const [showTldr, setShowTldr] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchArticles(query);
  };

  const handleCategorySelect = (category: ArticleSubcategory) => {
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Zap size={40} className="text-[#00D9FF]" />
          <GradientText className="text-5xl">Tech Feed</GradientText>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl">
          Stay updated with the latest in technology, AI, research, and career opportunities
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tech articles..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-6 py-4 bg-black/50 backdrop-blur-sm border border-[#00D9FF]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00D9FF] transition-colors"
          />
          <Search
            size={24}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00D9FF] pointer-events-none"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <label className="text-gray-300 font-semibold flex items-center gap-2">
              <input
                type="checkbox"
                checked={showTldr}
                onChange={(e) => setShowTldr(e.target.checked)}
                className="w-5 h-5 rounded bg-black/50 border-[#00D9FF]/30 text-[#00D9FF] focus:ring-[#00D9FF]"
              />
              <span>Show AI TLDR</span>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <GlassCard className="p-4 mb-8" neonColor="pink">
          <p className="text-red-400">{error}</p>
        </GlassCard>
      )}

      <div className="space-y-20">
        <TrendingToday
          articles={articles}
          bookmarkedArticles={bookmarkedArticles}
          onBookmark={toggleBookmark}
          loading={loading}
          showTldr={showTldr}
        />

        <div className="border-t border-[#00D9FF]/20 pt-20">
          <AIAndTech
            articles={articles}
            bookmarkedArticles={bookmarkedArticles}
            onBookmark={toggleBookmark}
            loading={loading}
            onCategorySelect={handleCategorySelect}
            showTldr={showTldr}
          />
        </div>

        <div className="border-t border-[#00D9FF]/20 pt-20">
          <DeveloperCorner
            challenges={challenges}
            loading={loading}
          />
        </div>

        <div className="border-t border-[#00D9FF]/20 pt-20">
          <IEEEUpdates
            articles={articles}
            bookmarkedArticles={bookmarkedArticles}
            onBookmark={toggleBookmark}
            loading={loading}
            showTldr={showTldr}
          />
        </div>

        <div className="border-t border-[#00D9FF]/20 pt-20">
          <Opportunities
            articles={articles}
            bookmarkedArticles={bookmarkedArticles}
            onBookmark={toggleBookmark}
            loading={loading}
            showTldr={showTldr}
          />
        </div>
      </div>

      <div className="mt-20 text-center text-gray-400">
        <p className="text-sm">
          Content updates daily. Follow us for the latest in tech and innovation.
        </p>
      </div>
    </div>
  );
}
