import { Calendar, Users, Award, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { GradientText } from '../ui/GradientText';
import { AuthModal } from '../auth/AuthModal';
import { useAuth } from '../../contexts/AuthContext';

export function Home({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: 'Events & Workshops',
      description: 'Explore cutting-edge tech events, hackathons, and workshops',
      color: 'blue' as const,
      action: () => onNavigate('events'),
    },
    {
      icon: Users,
      title: 'Join Our Team',
      description: 'Apply for core team, associate, and coordinator positions',
      color: 'purple' as const,
      action: () => onNavigate('recruitment'),
    },
    {
      icon: Award,
      title: 'Event Gallery',
      description: 'Relive the best moments from our past events',
      color: 'violet' as const,
      action: () => onNavigate('gallery'),
    },
    {
      icon: Sparkles,
      title: 'Membership',
      description: 'Unlock exclusive benefits and opportunities',
      color: 'pink' as const,
      action: () => onNavigate('membership'),
    },
  ];

  const stats = [
    { value: '500+', label: 'Active Members', icon: Users },
    { value: '50+', label: 'Events Organized', icon: Calendar },
    { value: '100+', label: 'Workshops', icon: Award },
    { value: '95%', label: 'Satisfaction', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mb-8 animate-fade-in">
          <div className="inline-block mb-6">
            <Zap size={80} className="text-[#00D9FF] animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <GradientText gradient="blue-purple">
              IEEE IGDTUW
            </GradientText>
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            Welcome to the Future of Tech Education
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            A next-generation student engagement platform featuring events, recruitment,
            gamification, and community interaction
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {!user ? (
              <>
                <NeonButton
                  size="lg"
                  onClick={() => setShowAuthModal(true)}
                >
                  Get Started
                </NeonButton>
                <NeonButton
                  size="lg"
                  variant="outline"
                  neonColor="purple"
                  onClick={() => onNavigate('events')}
                >
                  Explore Events
                </NeonButton>
              </>
            ) : (
              <>
                <NeonButton
                  size="lg"
                  onClick={() => onNavigate('dashboard')}
                >
                  Go to Dashboard
                </NeonButton>
                <NeonButton
                  size="lg"
                  variant="outline"
                  neonColor="purple"
                  onClick={() => onNavigate('events')}
                >
                  Browse Events
                </NeonButton>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <GlassCard
                key={index}
                className="p-6 text-center"
                neonColor="blue"
                hover3d
              >
                <Icon size={32} className="mx-auto mb-3 text-[#00D9FF]" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </GlassCard>
            );
          })}
        </div>

        <div className="text-center mb-12">
          <GradientText className="text-4xl mb-4">Explore Features</GradientText>
          <p className="text-gray-400 text-lg">Everything you need in one cyberpunk ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <GlassCard
                key={index}
                className="p-6 cursor-pointer"
                neonColor={feature.color}
                hover3d
                onClick={feature.action}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00D9FF] to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm text-center">{feature.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <GlassCard className="p-12 text-center max-w-4xl mx-auto" neonColor="purple">
          <GradientText className="text-4xl mb-6">
            Ready to Level Up?
          </GradientText>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join IEEE IGDTUW today and become part of an innovative tech community.
            Participate in events, earn points, unlock achievements, and grow your skills!
          </p>
          {!user ? (
            <NeonButton
              size="lg"
              neonColor="purple"
              onClick={() => setShowAuthModal(true)}
            >
              Join the Community
            </NeonButton>
          ) : (
            <NeonButton
              size="lg"
              neonColor="purple"
              onClick={() => onNavigate('events')}
            >
              Start Exploring
            </NeonButton>
          )}
        </GlassCard>
      </section>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
