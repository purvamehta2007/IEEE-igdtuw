import { useState, useMemo } from 'react';
import { Brain } from 'lucide-react';
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

/* ==============================
   DATA DEFINITIONS
================================= */

const subcategories: ArticleSubcategory[] = [
  'Artificial Intelligence',
  'Cybersecurity',
  'Robotics',
  'Quantum Computing',
  'Software Engineering',
];

// Using Partial to fix the ts(2740) error
const subcategoryInfo: Partial<Record<ArticleSubcategory, string>> = {
  'Artificial Intelligence': 'Explore AI breakthroughs, machine learning, generative AI and future intelligence systems.',
  'Cybersecurity': 'Latest security trends, ethical hacking, privacy protection and cyber defense innovations.',
  'Robotics': 'Autonomous systems, robotics research and real-world automation applications.',
  'Quantum Computing': 'Quantum algorithms, quantum hardware and next-gen computing paradigms.',
  'Software Engineering': 'Modern development practices, scalable architectures and emerging dev tools.',
};

/* ==============================
   ANIMATED BACKGROUNDS
================================= */

const NeuralNetworkBg = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
    <svg className="w-full h-full">
      <defs>
        <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {Array.from({ length: 15 }).map((_, i) => (
        <circle
          key={`node-${i}`}
          cx={`${(i % 5) * 25 + 10}%`}
          cy={`${Math.floor(i / 5) * 33 + 20}%`}
          r="3"
          fill="url(#neuralGrad)"
          className="animate-pulse"
          style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }}
        />
      ))}
    </svg>
  </div>
);

const GlitchBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`glitch-${i}`}
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-glitch"
          style={{ top: `${i * 12.5}%`, animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </div>
  </div>
);

const RoboticBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="grid grid-cols-8 grid-rows-8 h-full w-full opacity-10">
      {Array.from({ length: 64 }).map((_, i) => (
        <div key={i} className="border border-purple-400/30" />
      ))}
    </div>
  </div>
);

const QuantumBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-quantum opacity-50"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: '4px',
          height: '4px',
          backgroundColor: '#a855f7',
          boxShadow: '0 0 15px #a855f7',
          animationDelay: `${i * 0.1}s`
        }}
      />
    ))}
  </div>
);

const SoftwareBg = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none font-mono text-[10px] text-purple-400">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="animate-codeScroll whitespace-nowrap">
        {`export const useLogic = () => { return { status: 'stable' }; }; `.repeat(5)}
      </div>
    ))}
  </div>
);

const backgroundComponents: Partial<Record<ArticleSubcategory, React.FC>> = {
  'Artificial Intelligence': NeuralNetworkBg,
  'Cybersecurity': GlitchBg,
  'Robotics': RoboticBg,
  'Quantum Computing': QuantumBg,
  'Software Engineering': SoftwareBg,
};

/* ==============================
   MAIN COMPONENT
================================= */

export function AIAndTech({
  articles,
  bookmarkedArticles,
  onBookmark,
  loading,
  onCategorySelect,
  showTldr,
}: AIAndTechProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<ArticleSubcategory | null>(null);

  // Memoized filtering for performance
  const filteredArticles = useMemo(() => {
    const aiBase = articles.filter(a => a.category === 'ai');
    if (!selectedSubcategory) return aiBase.slice(0, 6);
    
    return aiBase.filter(a => a.subcategory === selectedSubcategory).slice(0, 6);
  }, [articles, selectedSubcategory]);

  const handleSubcategoryClick = (subcategory: ArticleSubcategory) => {
    const newValue = selectedSubcategory === subcategory ? null : subcategory;
    setSelectedSubcategory(newValue);
    if (newValue) onCategorySelect(newValue);
  };

  const ActiveBackground = selectedSubcategory ? backgroundComponents[selectedSubcategory] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Brain size={32} className="text-purple-400" />
        <GradientText className="text-3xl" gradient="purple-pink">
          AI & Emerging Tech
        </GradientText>
      </div>

      {/* Pill Navigation */}
      <div className="flex flex-wrap gap-3">
        {subcategories.map(sub => (
          <button
            key={sub}
            onClick={() => handleSubcategoryClick(sub)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all border ${
              selectedSubcategory === sub
                ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-black/40 text-gray-400 border-purple-500/20 hover:border-purple-500/50'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Dynamic Info Box */}
      {selectedSubcategory && (
        <div className="relative p-5 bg-purple-900/10 border border-purple-500/30 rounded-2xl overflow-hidden min-h-[80px] flex items-center">
          {ActiveBackground && <ActiveBackground />}
          <p className="relative z-10 text-purple-200 text-sm leading-relaxed">
            {subcategoryInfo[selectedSubcategory]}
          </p>
        </div>
      )}

      {/* Grid Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
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
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <p className="text-gray-500">No articles found in this subcategory.</p>
        </div>
      )}
    </div>
  );
}