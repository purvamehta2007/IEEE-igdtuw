import { Award, Users, Zap, Trophy, Target, Sparkles } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { GradientText } from '../ui/GradientText';

export function MembershipSection() {
  const benefits = [
    {
      icon: Zap,
      title: 'Exclusive Events',
      description: 'Access to workshops, hackathons, and tech talks',
      color: 'blue' as const,
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Network with like-minded tech enthusiasts',
      color: 'purple' as const,
    },
    {
      icon: Trophy,
      title: 'Competitions',
      description: 'Participate in coding challenges and win prizes',
      color: 'violet' as const,
    },
    {
      icon: Target,
      title: 'Skill Development',
      description: 'Learn from industry experts and mentors',
      color: 'pink' as const,
    },
    {
      icon: Award,
      title: 'Certifications',
      description: 'Get IEEE certificates for participation',
      color: 'blue' as const,
    },
    {
      icon: Sparkles,
      title: 'Early Access',
      description: 'Be first to know about opportunities',
      color: 'purple' as const,
    },
  ];

  const journeySteps = [
    { step: 1, title: 'Sign Up', description: 'Create your account' },
    { step: 2, title: 'Complete Profile', description: 'Tell us about yourself' },
    { step: 3, title: 'Join Events', description: 'Participate in activities' },
    { step: 4, title: 'Contribute', description: 'Share your knowledge' },
    { step: 5, title: 'Grow', description: 'Level up your skills' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16">
        <GradientText className="text-5xl mb-4">IEEE Membership</GradientText>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Join the world's largest technical professional organization and unlock endless possibilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <GlassCard
              key={index}
              className="p-6 text-center"
              neonColor={benefit.color}
              hover3d
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00D9FF] to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,217,255,0.4)]">
                <Icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="p-8 mb-16" neonColor="blue">
        <h2 className="text-3xl font-bold text-center mb-12">
          <GradientText>Your Journey with IEEE</GradientText>
        </h2>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00D9FF] via-purple-500 to-violet-600 transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-8">
            {journeySteps.map((step, index) => (
              <div
                key={step.step}
                className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D9FF] to-purple-500 flex items-center justify-center font-bold text-white text-xl shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                    {step.step}
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="text-center">
        <GlassCard className="p-8 max-w-2xl mx-auto" neonColor="purple">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Join?</h3>
          <p className="text-gray-400 mb-6">
            Become part of a global community of technology professionals and students
          </p>
          <div className="flex gap-4 justify-center">
            <NeonButton size="lg" neonColor="blue">
              Become a Member
            </NeonButton>
            <NeonButton size="lg" variant="outline" neonColor="purple">
              Learn More
            </NeonButton>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
