import { Briefcase, Target } from 'lucide-react';
import { TechCard } from '../TechCard';
import { TechCardSkeleton } from '../TechCardSkeleton';
import { GradientText } from '../../../../components/ui/GradientText';
import type { TechFeedArticle } from '../../types';

interface OpportunitiesProps {
  articles: TechFeedArticle[];
  bookmarkedArticles: Set<string>;
  onBookmark: (articleId: string) => void;
  loading: boolean;
  showTldr: boolean;
}

export function Opportunities({
  articles,
  bookmarkedArticles,
  onBookmark,
  loading,
  showTldr,
}: OpportunitiesProps) {
  const opportunityArticles = articles.filter(a => a.category === 'opportunities').slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Briefcase size={32} className="text-green-400" />
        <GradientText className="text-3xl" gradient="blue-violet">
          Opportunities
        </GradientText>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <TechCardSkeleton key={i} />
            ))}
        </div>
      ) : opportunityArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunityArticles.map(article => (
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
          <p>No opportunities listed at the moment</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-2xl">
          <Target size={32} className="text-green-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Internships</h3>
          <p className="text-gray-400 text-sm mb-4">Gain real-world experience with leading tech companies.</p>
          <div className="text-xs text-green-400 font-semibold">Updated Today</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl">
          <Briefcase size={32} className="text-purple-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Hackathons</h3>
          <p className="text-gray-400 text-sm mb-4">Compete and showcase your skills to win prizes.</p>
          <div className="text-xs text-purple-400 font-semibold">5 Active Events</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-[#00D9FF]/30 rounded-2xl">
          <Target size={32} className="text-[#00D9FF] mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Competitions</h3>
          <p className="text-gray-400 text-sm mb-4">Challenge yourself in tech competitions.</p>
          <div className="text-xs text-[#00D9FF] font-semibold">Ongoing</div>
        </div>
      </div>
    </div>
  );
}
