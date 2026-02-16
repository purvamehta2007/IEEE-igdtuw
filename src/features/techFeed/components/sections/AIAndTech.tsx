import { useState } from 'react';
import { Brain, Zap } from 'lucide-react';
import { TechCard } from '../TechCard';
import { TechCardSkeleton } from '../TechCardSkeleton';
import { GradientText } from '../../../../components/ui/GradientText';
import type { TechFeedArticle, ArticleSubcategory } from '../../types';

interface AIAndTechProps {
  articles: TechFeedArticle[];
  bookmarkedArticles: Set<string>;
  onBookmark: (articleId: string) => void;
  loading: boolean;
  onCategorySelect: (category: ArticleSubcategory) => void;
  showTldr: boolean;
}

const subcategories: ArticleSubcategory[] = [
  'Artificial Intelligence',
  'Cybersecurity',
  'Robotics',
  'Quantum Computing',
  'Software Engineering',
];

export function AIAndTech({
  articles,
  bookmarkedArticles,
  onBookmark,
  loading,
  onCategorySelect,
  showTldr,
}: AIAndTechProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<ArticleSubcategory | null>(null);

  const filteredArticles = selectedSubcategory
    ? articles.filter(a => a.subcategory === selectedSubcategory).slice(0, 6)
    : articles.filter(a => a.category === 'ai').slice(0, 6);

  const handleSubcategoryClick = (subcategory: ArticleSubcategory) => {
    setSelectedSubcategory(subcategory);
    onCategorySelect(subcategory);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain size={32} className="text-purple-400" />
        <GradientText className="text-3xl" gradient="purple-pink">
          AI & Emerging Tech
        </GradientText>
      </div>

      <div className="flex flex-wrap gap-3">
        {subcategories.map(subcategory => (
          <button
            key={subcategory}
            onClick={() => handleSubcategoryClick(subcategory)}
            className={`
              px-4 py-2 rounded-xl font-semibold transition-all
              ${selectedSubcategory === subcategory
                ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(138,43,226,0.6)]'
                : 'bg-black/50 text-gray-300 border border-purple-500/30 hover:border-purple-500'
              }
            `}
          >
            {subcategory}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <TechCardSkeleton key={i} />
            ))}
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
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
          <p>No articles found for this category</p>
        </div>
      )}
    </div>
  );
}
