import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  neonColor?: 'blue' | 'purple' | 'violet' | 'pink';
  hover3d?: boolean;
}

export function GlassCard({ children, className = '', neonColor = 'blue', hover3d = false }: GlassCardProps) {
  const neonColors = {
    blue: 'shadow-[0_0_20px_rgba(0,217,255,0.3)] border-[#00D9FF]/30 hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]',
    purple: 'shadow-[0_0_20px_rgba(138,43,226,0.3)] border-purple-500/30 hover:shadow-[0_0_30px_rgba(138,43,226,0.5)]',
    violet: 'shadow-[0_0_20px_rgba(148,0,211,0.3)] border-violet-500/30 hover:shadow-[0_0_30px_rgba(148,0,211,0.5)]',
    pink: 'shadow-[0_0_20px_rgba(255,20,147,0.3)] border-pink-500/30 hover:shadow-[0_0_30px_rgba(255,20,147,0.5)]',
  };

  const transform3d = hover3d ? 'hover:scale-[1.02] hover:-translate-y-2' : '';

  return (
    <div
      className={`
        backdrop-blur-md bg-black/40 border rounded-2xl
        transition-all duration-500 ease-out
        ${neonColors[neonColor]}
        ${transform3d}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
