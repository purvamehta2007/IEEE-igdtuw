import { useState, useEffect } from 'react';
import { Linkedin, Instagram, Globe, Twitter } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

export function SocialLinksHub() {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    loadSocialLinks();
  }, []);

  const loadSocialLinks = async () => {
    const { data } = await supabase
      .from('social_links')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (data) {
      setSocialLinks(data);
    }
  };

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return Linkedin;
      case 'instagram': return Instagram;
      case 'twitter': return Twitter;
      case 'website': return Globe;
      default: return Globe;
    }
  };

  const getColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return { bg: 'bg-[#0A66C2]', glow: 'shadow-[0_0_30px_rgba(10,102,194,0.6)]' };
      case 'instagram': return { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', glow: 'shadow-[0_0_30px_rgba(193,53,132,0.6)]' };
      case 'twitter': return { bg: 'bg-[#1DA1F2]', glow: 'shadow-[0_0_30px_rgba(29,161,242,0.6)]' };
      case 'website': return { bg: 'bg-[#00D9FF]', glow: 'shadow-[0_0_30px_rgba(0,217,255,0.6)]' };
      default: return { bg: 'bg-[#00D9FF]', glow: 'shadow-[0_0_30px_rgba(0,217,255,0.6)]' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16">
        <GradientText className="text-5xl mb-4">Connect With Us</GradientText>
        <p className="text-gray-400 text-lg">Join our community across platforms</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {socialLinks.map((link) => {
            const Icon = getIcon(link.platform);
            const colors = getColor(link.platform);
            const isHovered = hoveredLink === link.id;

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
                className="block"
              >
                <GlassCard
                  className={`
                    p-8 text-center cursor-pointer
                    transition-all duration-500
                    ${isHovered ? colors.glow : ''}
                  `}
                  hover3d
                >
                  <div className={`
                    w-20 h-20 mx-auto mb-4 rounded-full
                    ${colors.bg}
                    flex items-center justify-center
                    transform transition-transform duration-500
                    ${isHovered ? 'scale-110 rotate-12' : ''}
                  `}>
                    <Icon size={40} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 capitalize">
                    {link.platform}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {link.preview_description || 'Follow us'}
                  </p>
                </GlassCard>
              </a>
            );
          })}
        </div>

        <GlassCard className="p-8" neonColor="blue">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Follow us on social media to get the latest updates about events, workshops, and opportunities
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {socialLinks.map((link) => {
                const Icon = getIcon(link.platform);
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#00D9FF]/20 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] hover:bg-[#00D9FF] hover:text-black transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
