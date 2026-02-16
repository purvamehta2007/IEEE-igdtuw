import { ReactNode, ButtonHTMLAttributes } from 'react';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  neonColor?: 'blue' | 'purple' | 'violet' | 'pink';
  size?: 'sm' | 'md' | 'lg';
}

export function NeonButton({
  children,
  variant = 'primary',
  neonColor = 'blue',
  size = 'md',
  className = '',
  ...props
}: NeonButtonProps) {
  const colors = {
    blue: {
      primary: 'bg-[#00D9FF] text-black hover:bg-[#00B8D4] shadow-[0_0_20px_rgba(0,217,255,0.5)] hover:shadow-[0_0_30px_rgba(0,217,255,0.8)]',
      secondary: 'bg-[#00D9FF]/20 text-[#00D9FF] hover:bg-[#00D9FF]/30 shadow-[0_0_15px_rgba(0,217,255,0.3)]',
      outline: 'border-2 border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/10 shadow-[0_0_15px_rgba(0,217,255,0.3)]',
    },
    purple: {
      primary: 'bg-purple-500 text-white hover:bg-purple-600 shadow-[0_0_20px_rgba(138,43,226,0.5)] hover:shadow-[0_0_30px_rgba(138,43,226,0.8)]',
      secondary: 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 shadow-[0_0_15px_rgba(138,43,226,0.3)]',
      outline: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 shadow-[0_0_15px_rgba(138,43,226,0.3)]',
    },
    violet: {
      primary: 'bg-violet-500 text-white hover:bg-violet-600 shadow-[0_0_20px_rgba(148,0,211,0.5)] hover:shadow-[0_0_30px_rgba(148,0,211,0.8)]',
      secondary: 'bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 shadow-[0_0_15px_rgba(148,0,211,0.3)]',
      outline: 'border-2 border-violet-500 text-violet-400 hover:bg-violet-500/10 shadow-[0_0_15px_rgba(148,0,211,0.3)]',
    },
    pink: {
      primary: 'bg-pink-500 text-white hover:bg-pink-600 shadow-[0_0_20px_rgba(255,20,147,0.5)] hover:shadow-[0_0_30px_rgba(255,20,147,0.8)]',
      secondary: 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 shadow-[0_0_15px_rgba(255,20,147,0.3)]',
      outline: 'border-2 border-pink-500 text-pink-400 hover:bg-pink-500/10 shadow-[0_0_15px_rgba(255,20,147,0.3)]',
    },
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`
        ${colors[neonColor][variant]}
        ${sizes[size]}
        rounded-lg font-semibold
        transition-all duration-300
        transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
