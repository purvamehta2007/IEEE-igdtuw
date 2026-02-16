import { Lightbulb, Award } from 'lucide-react';
import { TechCard } from '../TechCard';
import { TechCardSkeleton } from '../TechCardSkeleton';
import { GradientText } from '../../../../components/ui/GradientText';
import type { TechFeedArticle } from '../../types';

interface IEEEUpdatesProps {
  articles: TechFeedArticle[];
  bookmarkedArticles: Set<string>;
  onBookmark: (articleId: string) => void;
  loading: boolean;
  showTldr: boolean;
}

export function IEEEUpdates({
  articles,
  bookmarkedArticles,
  onBookmark,
  loading,
  showTldr,
}: IEEEUpdatesProps) {
  const ieeeArticles = articles.filter(a => a.category === 'ieee_updates').slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Lightbulb size={32} className="text-yellow-400" />
        <GradientText className="text-3xl">IEEE IGDTUW Updates</GradientText>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <TechCardSkeleton key={i} />
            ))}
        </div>
      ) : ieeeArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ieeeArticles.map(article => (
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
          <p>No IEEE updates at the moment</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-[#00D9FF]/30 rounded-2xl">
          <Award size={32} className="text-[#00D9FF] mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Upcoming Workshops</h3>
          <p className="text-gray-400 text-sm">Join our expert-led workshops on latest technologies and industry trends.</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl">
          <Lightbulb size={32} className="text-purple-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Guest Lectures</h3>
          <p className="text-gray-400 text-sm">Learn from industry leaders and renowned researchers in tech.</p>
        </div>
      </div>
    </div>
  );
}
