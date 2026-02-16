import { useState, useEffect } from 'react';
import { Calendar, Trophy, Target, TrendingUp, Award, BookOpen } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

export function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    const [profileData, regsData, achievementsData] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
      supabase
        .from('event_registrations')
        .select('*, events(*)')
        .eq('user_id', user.id)
        .order('registration_date', { ascending: false })
        .limit(5),
      supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false })
        .limit(6),
    ]);

    if (profileData.data) setProfile(profileData.data);
    if (regsData.data) setRegistrations(regsData.data);
    if (achievementsData.data) setAchievements(achievementsData.data);

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <GlassCard className="p-12 text-center max-w-2xl mx-auto">
          <GradientText className="text-3xl mb-4">Personal Dashboard</GradientText>
          <p className="text-gray-400">Please sign in to view your dashboard</p>
        </GlassCard>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#00D9FF] text-xl">Loading dashboard...</div>
      </div>
    );
  }

  const stats = [
    {
      icon: Calendar,
      label: 'Events Registered',
      value: registrations.length,
      color: 'blue' as const,
    },
    {
      icon: Trophy,
      label: 'Total Points',
      value: profile?.total_points || 0,
      color: 'purple' as const,
    },
    {
      icon: Target,
      label: 'Current Level',
      value: profile?.level || 1,
      color: 'violet' as const,
    },
    {
      icon: Award,
      label: 'Achievements',
      value: achievements.length,
      color: 'pink' as const,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <GradientText className="text-4xl mb-2">
          Welcome back, {profile?.full_name || 'User'}!
        </GradientText>
        <p className="text-gray-400">Here's your activity overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <GlassCard
              key={index}
              className="p-6"
              neonColor={stat.color}
              hover3d
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D9FF] to-purple-500 flex items-center justify-center">
                  <Icon size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <GlassCard className="p-6" neonColor="blue">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Calendar className="text-[#00D9FF]" />
            Upcoming Events
          </h3>
          <div className="space-y-3">
            {registrations.filter(r => r.events?.status === 'upcoming').slice(0, 5).map(reg => (
              <div
                key={reg.id}
                className="p-4 rounded-xl bg-black/30 border border-[#00D9FF]/20"
              >
                <h4 className="text-white font-semibold mb-1">{reg.events?.title}</h4>
                <p className="text-gray-400 text-sm">
                  {new Date(reg.events?.event_date).toLocaleDateString()}
                </p>
              </div>
            ))}
            {registrations.filter(r => r.events?.status === 'upcoming').length === 0 && (
              <p className="text-gray-400 text-center py-8">No upcoming events</p>
            )}
          </div>
        </GlassCard>

        <GlassCard className="p-6" neonColor="purple">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Award className="text-purple-400" />
            Recent Achievements
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className="p-4 rounded-xl bg-black/30 border border-purple-500/20 text-center"
              >
                <div className="text-3xl mb-2">{achievement.icon || '🏆'}</div>
                <h4 className="text-white text-sm font-semibold mb-1">
                  {achievement.achievement_name}
                </h4>
                <p className="text-[#00D9FF] text-xs">+{achievement.points_earned} pts</p>
              </div>
            ))}
            {achievements.length === 0 && (
              <p className="text-gray-400 text-center py-8 col-span-2">
                No achievements yet
              </p>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6" neonColor="violet">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <TrendingUp className="text-violet-400" />
          Skill Growth
        </h3>
        <div className="space-y-4">
          {profile?.interests?.map((interest: string) => (
            <div key={interest}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">{interest}</span>
                <span className="text-[#00D9FF]">{Math.floor(Math.random() * 30 + 60)}%</span>
              </div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00D9FF] to-purple-500"
                  style={{ width: `${Math.floor(Math.random() * 30 + 60)}%` }}
                />
              </div>
            </div>
          ))}
          {!profile?.interests?.length && (
            <p className="text-gray-400 text-center py-8">
              Update your profile to track skill growth
            </p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
