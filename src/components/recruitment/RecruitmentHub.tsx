import { useState } from 'react';
import { Users, Code, Palette, Megaphone, Settings, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { GradientText } from '../ui/GradientText';

interface RecruitmentFormData {
  role: string;
  domain: string;
  why_join: string;
  experience: string;
  skills: string[];
  portfolio_link: string;
  availability: string;
}

export function RecruitmentHub() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RecruitmentFormData>({
    role: '',
    domain: '',
    why_join: '',
    experience: '',
    skills: [],
    portfolio_link: '',
    availability: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();

  const roles = [
    { id: 'core_team', name: 'Core Team', icon: Users, requirements: 'Leadership experience, 3rd/4th year' },
    { id: 'associate', name: 'Associate', icon: Users, requirements: '2nd/3rd year, active participation' },
    { id: 'coordinator', name: 'Coordinator', icon: Settings, requirements: '1st/2nd year, enthusiasm to learn' },
  ];

  const domains = [
    { id: 'technical', name: 'Technical', icon: Code, color: 'blue' },
    { id: 'design', name: 'Design', icon: Palette, color: 'purple' },
    { id: 'content', name: 'Content', icon: Megaphone, color: 'violet' },
    { id: 'management', name: 'Management', icon: Settings, color: 'pink' },
  ];

  const skillOptions = {
    technical: ['Web Development', 'App Development', 'AI/ML', 'IoT', 'Blockchain', 'Cloud Computing'],
    design: ['UI/UX Design', 'Graphic Design', 'Video Editing', 'Animation', '3D Modeling'],
    content: ['Content Writing', 'Social Media', 'Public Speaking', 'Event Coverage', 'Photography'],
    management: ['Event Planning', 'Team Management', 'Sponsorship', 'Public Relations', 'Finance'],
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('recruitment_applications')
        .insert({
          user_id: user.id,
          role: formData.role,
          domain: formData.domain,
          application_data: formData,
        });

      if (!error) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <GlassCard className="p-12 text-center max-w-2xl mx-auto">
          <GradientText className="text-3xl mb-4">Join Our Team</GradientText>
          <p className="text-gray-400 mb-6">Please sign in to apply for recruitment</p>
        </GlassCard>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <GlassCard className="p-12 text-center max-w-2xl mx-auto" neonColor="blue">
          <CheckCircle size={64} className="mx-auto text-[#00D9FF] mb-6" />
          <GradientText className="text-3xl mb-4">Application Submitted!</GradientText>
          <p className="text-gray-400 mb-6">
            Thank you for your interest in joining IEEE IGDTUW. We'll review your application and get back to you soon!
          </p>
          <NeonButton onClick={() => window.location.reload()}>
            Submit Another Application
          </NeonButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <GradientText className="text-5xl mb-4">Join IEEE IGDTUW</GradientText>
        <p className="text-gray-400 text-lg">Be part of something extraordinary</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Step {step} of {totalSteps}</span>
          <span className="text-sm text-[#00D9FF]">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-black/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00D9FF] to-purple-500 transition-all duration-500 shadow-[0_0_10px_rgba(0,217,255,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <GlassCard className="p-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Select Your Role</h2>
            <div className="space-y-4">
              {roles.map(role => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => setFormData({ ...formData, role: role.id })}
                    className={`
                      w-full p-6 rounded-xl border-2 transition-all text-left
                      ${formData.role === role.id
                        ? 'border-[#00D9FF] bg-[#00D9FF]/10 shadow-[0_0_20px_rgba(0,217,255,0.3)]'
                        : 'border-[#00D9FF]/30 hover:border-[#00D9FF]/50'
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <Icon size={32} className="text-[#00D9FF]" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{role.name}</h3>
                        <p className="text-gray-400 text-sm">{role.requirements}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Choose Your Domain</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domains.map(domain => {
                const Icon = domain.icon;
                return (
                  <button
                    key={domain.id}
                    onClick={() => setFormData({ ...formData, domain: domain.id })}
                    className={`
                      p-6 rounded-xl border-2 transition-all
                      ${formData.domain === domain.id
                        ? 'border-[#00D9FF] bg-[#00D9FF]/10 shadow-[0_0_20px_rgba(0,217,255,0.3)]'
                        : 'border-[#00D9FF]/30 hover:border-[#00D9FF]/50'
                      }
                    `}
                  >
                    <Icon size={48} className="text-[#00D9FF] mb-4 mx-auto" />
                    <h3 className="text-xl font-bold text-white text-center">{domain.name}</h3>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Skills</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Select your skills (multiple selection allowed)
                </label>
                <div className="flex flex-wrap gap-3">
                  {(formData.domain && skillOptions[formData.domain as keyof typeof skillOptions] || []).map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`
                        px-4 py-2 rounded-lg transition-all font-semibold
                        ${formData.skills.includes(skill)
                          ? 'bg-[#00D9FF] text-black shadow-[0_0_10px_rgba(0,217,255,0.5)]'
                          : 'bg-black/50 text-gray-400 border border-[#00D9FF]/30'
                        }
                      `}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Experience & Projects
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                  placeholder="Tell us about your experience and projects..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Portfolio / GitHub Link
                </label>
                <input
                  type="url"
                  value={formData.portfolio_link}
                  onChange={(e) => setFormData({ ...formData, portfolio_link: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Final Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Why do you want to join IEEE IGDTUW?
                </label>
                <textarea
                  value={formData.why_join}
                  onChange={(e) => setFormData({ ...formData, why_join: e.target.value })}
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                  placeholder="Share your motivation..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Availability (hours per week)
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                >
                  <option value="">Select availability</option>
                  <option value="5-10">5-10 hours/week</option>
                  <option value="10-15">10-15 hours/week</option>
                  <option value="15+">15+ hours/week</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <NeonButton
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Previous
            </NeonButton>
          )}
          {step < totalSteps ? (
            <NeonButton
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !formData.role) ||
                (step === 2 && !formData.domain) ||
                (step === 3 && formData.skills.length === 0)
              }
              className="flex-1"
            >
              Next
            </NeonButton>
          ) : (
            <NeonButton
              onClick={handleSubmit}
              disabled={loading || !formData.why_join || !formData.availability}
              className="flex-1"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </NeonButton>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
