import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { GradientText } from '../ui/GradientText';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const interestOptions = ['AI', 'Robotics', 'Coding', 'Workshops', 'Hackathons', 'IoT', 'ML', 'Web Dev'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, {
          full_name: fullName,
          year: parseInt(year),
          branch,
          phone,
          interests,
        });
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <GlassCard className="w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto" neonColor="blue">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <GradientText className="text-3xl">{isLogin ? 'Welcome Back' : 'Join IEEE'}</GradientText>
          <p className="text-gray-400 mt-2">
            {isLogin ? 'Sign in to continue' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EE">EE</option>
                    <option value="MAE">MAE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`
                        px-3 py-1 rounded-full text-sm transition-all
                        ${interests.includes(interest)
                          ? 'bg-[#00D9FF] text-black shadow-[0_0_10px_rgba(0,217,255,0.5)]'
                          : 'bg-black/50 text-gray-400 border border-[#00D9FF]/30'
                        }
                      `}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 bg-black/50 border border-[#00D9FF]/30 rounded-lg text-white focus:outline-none focus:border-[#00D9FF] transition-colors"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              {error}
            </div>
          )}

          <NeonButton
            type="submit"
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </NeonButton>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#00D9FF] hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
