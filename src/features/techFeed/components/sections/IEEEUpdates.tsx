import { Lightbulb, Award, ExternalLink, Calendar, Users, Zap, BookOpen, Trophy, Sparkles } from 'lucide-react';
import { TechCard } from '../TechCard';
import { TechCardSkeleton } from '../TechCardSkeleton';
import { GradientText } from '../../../../components/ui/GradientText';
import type { TechFeedArticle } from '../../types';

interface IEEEUpdatesProps {
  articles: TechFeedArticle[];
  bookmarkedArticles: Set<string>;
  onBookmark: (articleId: string) => void;
  loading: boolean;
  showTldr: boolean;
}

const quickLinks = [
  {
    title: 'Upcoming Workshops',
    description: 'Join expert-led sessions on AI, Web3, Cybersecurity, and Emerging Tech.',
    icon: Award,
    color: 'cyan',
    gradient: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-400/30',
    textColor: 'text-cyan-400',
    glowColor: 'hover:shadow-[0_0_30px_rgba(0,217,255,0.3)]',
    href: 'https://ieee.igdtuw.ac.in',
    tags: ['Hands-on', 'Certified', 'Free']
  },
  {
    title: 'Guest Lectures',
    description: 'Learn directly from industry experts, researchers, and tech innovators.',
    icon: Lightbulb,
    color: 'purple',
    gradient: 'from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-400/30',
    textColor: 'text-purple-400',
    glowColor: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    href: 'https://ieee.igdtuw.ac.in/events',
    tags: ['Industry Experts', 'Q&A', 'Live']
  },
  {
    title: 'Join IEEE Community',
    description: 'Access mentorship, research opportunities, and global tech network.',
    icon: Users,
    color: 'indigo',
    gradient: 'from-indigo-500/10 to-violet-500/10',
    borderColor: 'border-indigo-400/30',
    textColor: 'text-indigo-400',
    glowColor: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]',
    href: 'https://ieee.org',
    tags: ['Networking', 'Mentorship', 'Global']
  },
  {
    title: 'Tech Competitions',
    description: 'Participate in hackathons, coding challenges, and innovation contests.',
    icon: Trophy,
    color: 'yellow',
    gradient: 'from-yellow-500/10 to-orange-500/10',
    borderColor: 'border-yellow-400/30',
    textColor: 'text-yellow-400',
    glowColor: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]',
    href: 'https://ieee.igdtuw.ac.in/competitions',
    tags: ['Prizes', 'Team', 'Recognition']
  },
  {
    title: 'Technical Resources',
    description: 'Access IEEE Xplore, research papers, tutorials, and learning materials.',
    icon: BookOpen,
    color: 'green',
    gradient: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-400/30',
    textColor: 'text-green-400',
    glowColor: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]',
    href: 'https://ieeexplore.ieee.org',
    tags: ['Papers', 'Tutorials', 'Free Access']
  },
  {
    title: 'Special Interest Groups',
    description: 'Join SIGs in AI/ML, Robotics, Web Dev, Blockchain, and more domains.',
    icon: Sparkles,
    color: 'pink',
    gradient: 'from-pink-500/10 to-rose-500/10',
    borderColor: 'border-pink-400/30',
    textColor: 'text-pink-400',
    glowColor: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]',
    href: 'https://ieee.igdtuw.ac.in/sigs',
    tags: ['Specialized', 'Projects', 'Collaborative']
  },
];

export function IEEEUpdates({
  articles,
  bookmarkedArticles,
  onBookmark,
  loading,
  showTldr,
}: IEEEUpdatesProps) {

  const ieeeArticles = articles
    .filter(a => a.category === 'ieee_updates')
    .slice(0, 6);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Lightbulb size={32} className="text-yellow-400 animate-pulse" />
        <GradientText className="text-3xl">
          IEEE IGDTUW Updates
        </GradientText>
      </div>

      {/* HERO BANNER */}
      <div className="relative p-8 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border border-cyan-400/30 rounded-2xl overflow-hidden group">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={28} className="text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">
              Stay Connected with IEEE IGDTUW
            </h2>
          </div>
          <p className="text-gray-300 text-lg mb-6 max-w-3xl">
            Be part of India's largest technical community. Get access to exclusive workshops, 
            networking events, research opportunities, and industry connections. Level up your 
            tech journey with IEEE! 🚀
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://ieee.igdtuw.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,217,255,0.5)]"
            >
              Explore Events
            </a>
            <a
              href="https://ieee.igdtuw.ac.in/join"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-500/20 text-purple-300 font-bold rounded-xl border border-purple-400/50 hover:bg-purple-500/30 transition-all hover:scale-105"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>

      {/* ARTICLES GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <TechCardSkeleton key={i} />
          ))}
        </div>
      ) : ieeeArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ieeeArticles.map(article => (
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
          <p>No IEEE updates at the moment</p>
        </div>
      )}

      {/* QUICK LINKS SECTION */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles size={24} className="text-purple-400" />
          Quick Access
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group relative p-6 bg-gradient-to-br ${link.gradient} 
                  border ${link.borderColor} rounded-2xl 
                  hover:scale-105 transition-all duration-300
                  ${link.glowColor}
                  overflow-hidden
                `}
              >
                {/* Hover glow effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${link.gradient} blur-xl`} />
                
                <div className="relative z-10">
                  <Icon size={32} className={`${link.textColor} mb-3 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-lg font-bold text-white mb-2">
                    {link.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {link.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {link.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 text-xs font-semibold ${link.textColor} bg-black/30 rounded-lg border ${link.borderColor}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={`flex items-center gap-2 ${link.textColor} text-sm font-semibold group-hover:gap-3 transition-all`}>
                    Learn More <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* STATS BANNER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { number: '500+', label: 'Active Members', color: 'text-cyan-400' },
          { number: '50+', label: 'Events/Year', color: 'text-purple-400' },
          { number: '100+', label: 'Workshops', color: 'text-green-400' },
          { number: '20+', label: 'SIGs', color: 'text-yellow-400' },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 bg-black/30 border border-gray-700 rounded-xl text-center hover:border-purple-500/50 transition-all hover:scale-105"
          >
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              {stat.number}
            </div>
            <div className="text-gray-400 text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}