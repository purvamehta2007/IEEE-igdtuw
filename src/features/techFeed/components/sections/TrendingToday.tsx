import { Flame } from 'lucide-react';
import { TechCard } from '../TechCard';
import { GradientText } from '../../../../components/ui/GradientText';
import type { TechFeedArticle } from '../../types';

interface TrendingTodayProps {
  articles: TechFeedArticle[];
  bookmarkedArticles: Set<string>;
  onBookmark: (articleId: string) => void;
  loading: boolean;
  showTldr: boolean;
}

/* Fallback images */
const trendingImages: Record<string, string> = {
  'Artificial Intelligence': 'https://ieee.igdtuw.ac.in/images/ai.jpg',
  'Cybersecurity': 'https://ieee.igdtuw.ac.in/images/cybersecurity.jpg',
  'Robotics': 'https://ieee.igdtuw.ac.in/images/robotics.jpg',
  'Quantum Computing': 'https://ieee.igdtuw.ac.in/images/quantum.jpg',
  'Software Engineering': 'https://ieee.igdtuw.ac.in/images/software.jpg',
};

export function TrendingToday({
  articles,
  bookmarkedArticles,
  onBookmark,
  loading,
  showTldr,
}: TrendingTodayProps) {

  const trendingArticles = articles.filter(a => a.is_trending);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Flame size={32} className="text-[#FF6B35]" />
        <GradientText className="text-3xl">Trending Today</GradientText>
      </div>

      {/* SCROLLING CARDS */}
      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="min-w-[280px] h-44 bg-gray-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : trendingArticles.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {trendingArticles.map(article => (
            <div key={article.id} className="min-w-[300px] md:min-w-[320px] flex-shrink-0">
              <TechCard
                article={{
                  ...article,
                  image_url: article.image_url || trendingImages[article.subcategory || 'Artificial Intelligence']
                }}
                isBookmarked={bookmarkedArticles.has(article.id)}
                onBookmark={onBookmark}
                showTldr={showTldr}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          <p>No trending articles at the moment</p>
        </div>
      )}
    </div>
  );
}
