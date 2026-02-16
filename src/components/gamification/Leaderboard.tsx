import { Trophy, Medal, Award, TrendingUp, Star } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

const DUMMY_LEADERBOARD = [
  { id: '1', full_name: 'Ananya Sharma', total_points: 2450, level: 25 },
  { id: '2', full_name: 'Priya Singh', total_points: 2100, level: 21 },
  { id: '3', full_name: 'Riya Kapoor', total_points: 1950, level: 19 },
  { id: '4', full_name: 'Isha Verma', total_points: 1800, level: 18 },
  { id: '5', full_name: 'Sneha Reddy', total_points: 1650, level: 16 },
];

export function Leaderboard() {
  const topThree = [DUMMY_LEADERBOARD[1], DUMMY_LEADERBOARD[0], DUMMY_LEADERBOARD[2]];

  const getRankStyles = (index: number) => {
    // index 0 = Rank 2, index 1 = Rank 1, index 2 = Rank 3 (due to podium layout)
    if (index === 1) return { 
      icon: Trophy, 
      color: 'text-yellow-400', 
      border: 'border-yellow-500/50',
      bg: 'bg-yellow-500/10',
      height: 'h-[420px]',
      label: 'Champion'
    };
    if (index === 0) return { 
      icon: Medal, 
      color: 'text-slate-300', 
      border: 'border-slate-400/30',
      bg: 'bg-slate-400/5',
      height: 'h-[350px]',
      label: 'Runner Up'
    };
    return { 
      icon: Medal, 
      color: 'text-orange-500', 
      border: 'border-orange-600/30',
      bg: 'bg-orange-600/5',
      height: 'h-[320px]',
      label: 'Finalist'
    };
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-transparent">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]">
          Current Season: Genesis
        </div>
        <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
          The <GradientText>Elite</GradientText>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* --- DYNAMIC PODIUM --- */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 mb-16">
          {topThree.map((user, index) => {
            const styles = getRankStyles(index);
            const Icon = styles.icon;
            const isFirst = index === 1;

            return (
              <div key={user.id} className={`w-full md:w-1/3 transition-all duration-500 hover:z-20`}>
                <GlassCard
                  className={`relative flex flex-col items-center justify-center p-8 overflow-hidden border-2 ${styles.border} ${styles.bg} ${styles.height}`}
                  neonColor={isFirst ? 'blue' : 'purple'}
                  hover3d
                >
                  {/* Visual Flourish for #1 */}
                  {isFirst && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent shadow-[0_0_20px_rgba(234,179,8,0.8)]" />
                  )}

                  <div className={`mb-6 p-4 rounded-full bg-black/40 border border-white/10 shadow-2xl`}>
                    <Icon size={isFirst ? 64 : 48} className={styles.color} />
                  </div>

                  <span className={`font-mono text-[10px] uppercase tracking-[0.4em] mb-2 ${styles.color}`}>
                    {styles.label}
                  </span>
                  
                  <h3 className={`font-black uppercase italic tracking-tighter mb-1 transition-all ${isFirst ? 'text-3xl' : 'text-xl'} text-white`}>
                    {user.full_name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <Star size={14} className="text-cyan-400 fill-cyan-400" />
                    <span className="text-cyan-400 font-mono text-sm tracking-widest font-bold">
                      {user.total_points.toLocaleString()} XP
                    </span>
                  </div>

                  <div className="mt-auto w-full py-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Neural Level</span>
                    <p className="text-white font-black text-xl">{user.level}</p>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* --- FULL RANKINGS --- */}
        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.5em] mb-2 ml-4 flex items-center gap-2">
            <TrendingUp size={14} /> Pipeline Rankings
          </h3>
          {DUMMY_LEADERBOARD.slice(3).map((user, index) => (
            <div
              key={user.id}
              className="group flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all"
            >
              <div className="font-mono text-2xl font-black italic text-gray-700 group-hover:text-cyan-500 transition-colors">
                {String(index + 4).padStart(2, '0')}
              </div>
              
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">
                  {user.full_name}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: `${(user.total_points/2500)*100}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono uppercase">Lvl {user.level}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-black text-white italic">{user.total_points}</div>
                <div className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">XP_CREDITS</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}