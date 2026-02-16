import { Code, Zap, Award } from 'lucide-react';
import { GlassCard } from '../../../../components/ui/GlassCard';
import { GradientText } from '../../../../components/ui/GradientText';
import type { CodingChallenge } from '../../types';

interface DeveloperCornerProps {
  challenges: CodingChallenge[];
  loading: boolean;
  onChallengeSelect?: (challenge: CodingChallenge) => void;
}

const difficultyColors: Record<string, { bg: string; text: string }> = {
  easy: { bg: 'bg-green-500/20', text: 'text-green-400' },
  medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  hard: { bg: 'bg-red-500/20', text: 'text-red-400' },
};

export function DeveloperCorner({ challenges, loading, onChallengeSelect }: DeveloperCornerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Code size={32} className="text-pink-400" />
        <GradientText className="text-3xl" gradient="blue-violet">
          Developer Corner
        </GradientText>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6" neonColor="blue" hover3d>
          <div className="flex items-center gap-3 mb-4">
            <Zap size={24} className="text-[#00D9FF]" />
            <h3 className="text-xl font-bold text-white">Daily Challenge</h3>
          </div>
          {loading ? (
            <div className="h-40 bg-gray-800/50 rounded-lg animate-pulse" />
          ) : challenges.length > 0 ? (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">{challenges[0].title}</h4>
              <p className="text-gray-400 text-sm line-clamp-3">{challenges[0].description}</p>
              <div className="flex flex-wrap gap-2">
                {challenges[0].language.map(lang => (
                  <span key={lang} className="px-2 py-1 bg-[#00D9FF]/20 text-[#00D9FF] text-xs rounded">
                    {lang}
                  </span>
                ))}
              </div>
              <div
                className={`
                  inline-block px-3 py-1 rounded-full text-sm font-semibold
                  ${difficultyColors[challenges[0].difficulty].bg}
                  ${difficultyColors[challenges[0].difficulty].text}
                `}
              >
                {challenges[0].difficulty.charAt(0).toUpperCase() + challenges[0].difficulty.slice(1)}
              </div>
              <button
                onClick={() => onChallengeSelect?.(challenges[0])}
                className="w-full mt-4 px-4 py-2 bg-[#00D9FF]/20 text-[#00D9FF] rounded-lg hover:bg-[#00D9FF]/30 transition-colors font-semibold"
              >
                Try Challenge
              </button>
            </div>
          ) : (
            <p className="text-gray-400">No challenges available</p>
          )}
        </GlassCard>

        <GlassCard className="p-6" neonColor="purple" hover3d>
          <div className="flex items-center gap-3 mb-4">
            <Award size={24} className="text-purple-400" />
            <h3 className="text-xl font-bold text-white">Tips & Tricks</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-300">
                Master recursion by thinking about the base case first. Every recursive function needs a stopping point.
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-300">
                Time complexity matters! Always aim for O(n) when possible, not O(n²).
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-300">
                Test edge cases: empty inputs, single elements, and maximum constraints.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {challenges.length > 1 && (
        <GlassCard className="p-6" neonColor="violet">
          <h3 className="text-xl font-bold text-white mb-4">More Challenges</h3>
          <div className="space-y-3">
            {challenges.slice(1, 5).map(challenge => (
              <div
                key={challenge.id}
                onClick={() => onChallengeSelect?.(challenge)}
                className="p-4 rounded-lg bg-black/30 border border-violet-500/30 hover:border-violet-500 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-semibold group-hover:text-[#00D9FF] transition-colors">
                      {challenge.title}
                    </h4>
                    <div className="flex gap-2 mt-2">
                      {challenge.language.slice(0, 2).map(lang => (
                        <span key={lang} className="text-xs text-gray-400">{lang}</span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`
                      px-2 py-1 rounded text-xs font-semibold flex-shrink-0
                      ${difficultyColors[challenge.difficulty].bg}
                      ${difficultyColors[challenge.difficulty].text}
                    `}
                  >
                    {challenge.difficulty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
