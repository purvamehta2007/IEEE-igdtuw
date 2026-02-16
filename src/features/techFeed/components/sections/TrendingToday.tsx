import { Flame } from 'lucide-react';
import { TechCard } from '../TechCard';
import { TechCardSkeleton } from '../TechCardSkeleton';
import { GradientText } from '../../../../components/ui/GradientText';
import type { TechFeedArticle } from '../../types';

interface TrendingTodayProps {
  articles: TechFeedArticle[];
  bookmarkedArticles: Set<string>;
  onBookmark: (articleId: string) => void;
  loading: boolean;
  showTldr: boolean;
}

export function TrendingToday({
  articles,
  bookmarkedArticles,
  onBookmark,
  loading,
  showTldr,
}: TrendingTodayProps) {
  const trendingArticles = articles.filter(a => a.is_trending).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Flame size={32} className="text-[#FF6B35]" />
        <GradientText className="text-3xl">Trending Today</GradientText>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <TechCardSkeleton key={i} />
            ))}
        </div>
      ) : trendingArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingArticles.map(article => (
            <TechCard
              key={article.id}
              article={article}
              isBookmarked={bookmarkedArticles.has(article.id)}
              onBookmark={onBookmark}
              showTldr={showTldr}
            />
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
