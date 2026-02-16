import { Home, Calendar, Users, Award, MessageSquare, Sparkles, User, LogOut, Trophy, Zap } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'techfeed', icon: Zap, label: 'Tech Feed' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'recruitment', icon: Users, label: 'Recruitment' },
    { id: 'gallery', icon: Award, label: 'Gallery' },
    { id: 'membership', icon: Sparkles, label: 'Membership' },
    { id: 'feedback', icon: MessageSquare, label: 'Feedback' },
    { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
    ...(user ? [{ id: 'dashboard', icon: User, label: 'Dashboard' }] : []),
  ];

  return (
    <>
      <div
        className={`
          fixed left-4 top-1/2 -translate-y-1/2 z-50
          transition-all duration-500 ease-out
          ${isExpanded ? 'w-56' : 'w-16'}
        `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="backdrop-blur-md bg-black/40 border border-[#00D9FF]/30 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,217,255,0.3)]">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`
                    flex items-center gap-4 p-3 rounded-xl
                    transition-all duration-300
                    ${isActive
                      ? 'bg-[#00D9FF]/20 text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.4)]'
                      : 'text-gray-400 hover:text-[#00D9FF] hover:bg-[#00D9FF]/10'
                    }
                  `}
                >
                  <Icon size={24} className="flex-shrink-0" />
                  <span
                    className={`
                      whitespace-nowrap font-semibold
                      transition-all duration-300
                      ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}

            {user && (
              <>
                <div className="h-px bg-[#00D9FF]/30 my-2" />
                <button
                  onClick={signOut}
                  className="
                    flex items-center gap-4 p-3 rounded-xl
                    text-red-400 hover:text-red-300 hover:bg-red-500/10
                    transition-all duration-300
                  "
                >
                  <LogOut size={24} className="flex-shrink-0" />
                  <span
                    className={`
                      whitespace-nowrap font-semibold
                      transition-all duration-300
                      ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}
                    `}
                  >
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
