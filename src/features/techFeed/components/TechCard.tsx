import { Bookmark, BookmarkCheck, ExternalLink, Zap, Eye, Calendar } from 'lucide-react';
import { GlassCard } from '../../../components/ui/GlassCard';
import type { TechFeedArticle } from '../types';

interface TechCardProps {
  article: TechFeedArticle;
  isBookmarked: boolean;
  onBookmark: (articleId: string) => void;
  showTldr?: boolean;
}

const categoryColors: Record<string, 'blue' | 'purple' | 'violet' | 'pink'> = {
  trending: 'blue',
  ai: 'purple',
  research: 'violet',
  developer: 'pink',
  ieee_updates: 'blue',
  opportunities: 'purple',
};

export function TechCard({ article, isBookmarked, onBookmark, showTldr = false }: TechCardProps) {
  const neonColor = categoryColors[article.category] || 'blue';

  return (
    <GlassCard
      className="p-6 h-full flex flex-col hover:scale-105 transition-transform duration-300"
      neonColor={neonColor}
      hover3d
    >
      {article.image_url && (
        <div className="relative h-40 -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          {article.is_trending && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#00D9FF] text-black px-3 py-1 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(0,217,255,0.6)]">
              <Zap size={16} />
              Trending
            </div>
          )}
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{article.title}</h3>
          <p className="text-xs text-gray-400">{article.source_name || 'Tech News'}</p>
        </div>
        <button
          onClick={() => onBookmark(article.id)}
          className="text-[#00D9FF] hover:scale-110 transition-transform ml-2 flex-shrink-0"
        >
          {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{article.summary}</p>

      {showTldr && article.ai_tldr && (
        <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-xs font-semibold text-purple-400 mb-1">AI TLDR</p>
          <p className="text-xs text-gray-300 line-clamp-2">{article.ai_tldr}</p>
        </div>
      )}

      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-[#00D9FF]/10 text-[#00D9FF] text-xs rounded-full">
              #{tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
              +{article.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <Eye size={14} className="text-[#00D9FF]" />
          <span>{article.view_count} views</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-[#00D9FF]" />
          <span>{new Date(article.published_date).toLocaleDateString()}</span>
        </div>
      </div>

      {article.source_url && (
        <a
          href={article.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#00D9FF]/20 text-[#00D9FF] rounded-lg hover:bg-[#00D9FF]/30 transition-colors border border-[#00D9FF]/30"
        >
          <span className="text-sm font-semibold">Read More</span>
          <ExternalLink size={16} />
        </a>
      )}
    </GlassCard>
  );
}
