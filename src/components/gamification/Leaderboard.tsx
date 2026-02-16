import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

export function Leaderboard() {
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, total_points, level')
      .order('total_points', { ascending: false })
      .limit(50);

    if (!error && data) {
      setTopUsers(data);
    }
    setLoading(false);
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return { icon: Trophy, color: 'text-yellow-400', glow: 'shadow-[0_0_20px_rgba(250,204,21,0.6)]' };
    if (index === 1) return { icon: Medal, color: 'text-gray-300', glow: 'shadow-[0_0_20px_rgba(209,213,219,0.6)]' };
    if (index === 2) return { icon: Medal, color: 'text-orange-400', glow: 'shadow-[0_0_20px_rgba(251,146,60,0.6)]' };
    return { icon: Award, color: 'text-[#00D9FF]', glow: 'shadow-[0_0_15px_rgba(0,217,255,0.4)]' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#00D9FF] text-xl">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <GradientText className="text-5xl mb-4">Leaderboard</GradientText>
        <p className="text-gray-400 text-lg">Top contributors and achievers</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {topUsers.slice(0, 3).map((user, index) => {
            const { icon: Icon, color, glow } = getRankIcon(index);
            const heights = ['md:h-80', 'md:h-64', 'md:h-72'];

            return (
              <div
                key={user.id}
                className={`
                  ${index === 1 ? 'order-first md:order-none' : ''}
                  ${index === 0 ? 'md:col-start-2' : ''}
                `}
              >
                <GlassCard
                  className={`
                    p-6 text-center
                    ${heights[index]}
                    flex flex-col justify-center
                    ${glow}
                  `}
                  neonColor={index === 0 ? 'blue' : index === 1 ? 'purple' : 'violet'}
                  hover3d
                >
                  <div className="mb-4">
                    <Icon size={48} className={`mx-auto ${color}`} />
                  </div>
                  <div className={`
                    text-6xl font-bold mb-3
                    ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : 'text-orange-400'}
                  `}>
                    #{index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {user.full_name || 'Anonymous'}
                  </h3>
                  <div className="text-[#00D9FF] text-2xl font-bold mb-1">
                    {user.total_points} pts
                  </div>
                  <div className="text-gray-400 text-sm">
                    Level {user.level}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        <GlassCard className="p-6" neonColor="blue">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <TrendingUp className="text-[#00D9FF]" />
            Full Rankings
          </h3>

          <div className="space-y-3">
            {topUsers.slice(3).map((user, index) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-black/30 border border-[#00D9FF]/20 hover:border-[#00D9FF]/40 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D9FF] to-purple-500 flex items-center justify-center font-bold text-white">
                  #{index + 4}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold">
                    {user.full_name || 'Anonymous'}
                  </h4>
                  <p className="text-gray-400 text-sm">Level {user.level}</p>
                </div>
                <div className="text-right">
                  <div className="text-[#00D9FF] font-bold text-lg">
                    {user.total_points}
                  </div>
                  <div className="text-gray-400 text-sm">points</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 mt-6" neonColor="purple">
          <h3 className="text-xl font-bold text-white mb-4">How to Earn Points</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00D9FF]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#00D9FF] font-bold">+10</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Event Participation</h4>
                <p className="text-gray-400 text-sm">Attend events and workshops</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 font-bold">+5</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Feedback Submission</h4>
                <p className="text-gray-400 text-sm">Share your event feedback</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-violet-400 font-bold">+20</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Recruitment Success</h4>
                <p className="text-gray-400 text-sm">Join the team</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-pink-400 font-bold">+15</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Content Contribution</h4>
                <p className="text-gray-400 text-sm">Share knowledge and help others</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
